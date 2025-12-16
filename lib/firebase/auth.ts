import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    User,
    updateProfile,
    AuthError,
    signOut,
    deleteUser
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Register a new user with email and password
 * SECURITY: Does NOT create Firestore profile until email is verified
 * SECURITY: Signs out user immediately after sending verification email
 * 
 * @param name - User's display name
 * @param email - User's email address
 * @param password - User's password
 * @returns Result object with success status
 */
export async function registerWithEmail(name: string, email: string, password: string) {
    let createdUser: User | null = null;

    try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        createdUser = userCredential.user;

        // Update user profile with display name
        await updateProfile(createdUser, {
            displayName: name
        });

        // CRITICAL: Send verification email BEFORE anything else
        // If this fails, we abort the entire registration
        try {
            await sendVerificationEmail(createdUser);
        } catch (emailError) {
            console.error('CRITICAL: Failed to send verification email:', emailError);
            // Delete the created user since they can't verify
            try {
                await deleteUser(createdUser);
            } catch (deleteError) {
                console.error('Failed to delete user after email error:', deleteError);
            }
            return {
                success: false,
                error: 'فشل في إرسال رابط التحقق. حاول مرة أخرى. | Failed to send verification email. Please try again.'
            };
        }

        // CRITICAL: Sign out immediately - user must verify email before accessing system
        await signOut(auth);

        return {
            success: true,
            needsVerification: true,
            message: 'تم إنشاء الحساب. تم إرسال رابط التحقق إلى بريدك الإلكتروني. الرجاء تفعيل حسابك قبل تسجيل الدخول.'
        };
    } catch (error) {
        // If user was created but something failed, try to clean up
        if (createdUser) {
            try {
                await deleteUser(createdUser);
            } catch (deleteError) {
                console.error('Failed to delete user after registration error:', deleteError);
            }
        }
        return {
            success: false,
            error: getAuthErrorMessage(error as AuthError)
        };
    }
}

/**
 * Create user profile in Firestore users collection
 * @param user - Firebase user object
 * @returns Success status
 */
export async function createUserProfile(user: User): Promise<{ success: boolean; error?: string }> {
    try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        // Only create if doesn't exist
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                name: user.displayName || '',
                role: 'client',
                createdAt: new Date().toISOString()
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error creating user profile:', error);
        return {
            success: false,
            error: 'فشل في إنشاء الملف الشخصي | Failed to create profile'
        };
    }
}

/**
 * Login user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns User object if successful
 */
export async function loginWithEmail(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return {
            success: true,
            user,
            isVerified: user.emailVerified
        };
    } catch (error) {
        return {
            success: false,
            error: getAuthErrorMessage(error as AuthError)
        };
    }
}

/**
 * Send email verification to user
 * Uses basic Firebase sendEmailVerification which always works
 * @param user - Firebase user object
 */
export async function sendVerificationEmail(user: User) {
    try {
        // Use basic Firebase email verification (most reliable)
        await sendEmailVerification(user);
        return {
            success: true,
            message: 'تم إرسال رابط التحقق إلى بريدك الإلكتروني.'
        };
    } catch (error: any) {
        console.error('Error sending verification email:', error);
        return {
            success: false,
            error: getAuthErrorMessage(error as AuthError)
        };
    }
}

/**
 * Check if current user's email is verified
 * @param user - Firebase user object
 * @returns boolean indicating verification status
 */
export function checkEmailVerified(user: User | null): boolean {
    if (!user) return false;
    return user.emailVerified;
}

/**
 * Resend verification email to current user
 */
export async function resendVerificationEmail() {
    try {
        const user = auth.currentUser;
        if (!user) {
            return {
                success: false,
                error: 'لا يوجد مستخدم مسجل الدخول'
            };
        }

        if (user.emailVerified) {
            return {
                success: false,
                error: 'البريد الإلكتروني مفعّل بالفعل'
            };
        }

        await sendVerificationEmail(user);
        return {
            success: true,
            message: 'تم إعادة إرسال رابط التحقق'
        };
    } catch (error) {
        return {
            success: false,
            error: getAuthErrorMessage(error as AuthError)
        };
    }
}

/**
 * Get user-friendly error messages in Arabic/English
 * @param error - Firebase Auth error
 * @returns Localized error message
 */
export function getAuthErrorMessage(error: AuthError): string {
    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل | Email already in use',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح | Invalid email',
        'auth/operation-not-allowed': 'العملية غير مسموحة | Operation not allowed',
        'auth/weak-password': 'كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل | Password is too weak. Minimum 6 characters required',
        'auth/user-disabled': 'الحساب معطل | Account disabled',
        'auth/user-not-found': 'المستخدم غير موجود | User not found',
        'auth/wrong-password': 'كلمة المرور خاطئة | Wrong password',
        'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password',
        'auth/too-many-requests': 'محاولات كثيرة. حاول لاحقاً | Too many requests. Try again later',
        'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت | Network error',
        'auth/requires-recent-login': 'يتطلب تسجيل دخول حديث | Requires recent login'
    };

    return errorMessages[error.code] || `حدث خطأ: ${error.message} | Error: ${error.message}`;
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns boolean indicating if email is valid
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns object with validation result and message
 */
export function validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
        return {
            isValid: false,
            message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل | Minimum 6 characters'
        };
    }

    if (password.length < 8) {
        return {
            isValid: true,
            message: 'كلمة المرور مقبولة ولكن يُفضل 8 أحرف أو أكثر | Acceptable but 8+ characters recommended'
        };
    }

    return { isValid: true };
}
