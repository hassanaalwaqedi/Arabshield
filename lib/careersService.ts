import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Types
export interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'remote' | 'contract';
    description: string;
    requirements: string[];
    responsibilities: string[];
    status: 'open' | 'closed';
    createdAt: Timestamp;
}

export interface JobApplication {
    id: string;
    jobId: string;
    jobTitle?: string;
    name: string;
    email: string;
    phone?: string;
    cvUrl: string;
    message: string;
    createdAt: Timestamp;
}

// Job type labels in Arabic
export const jobTypeLabels: Record<string, string> = {
    'full-time': 'دوام كامل',
    'part-time': 'دوام جزئي',
    'remote': 'عن بعد',
    'contract': 'عقد مؤقت'
};

// Department labels in Arabic
export const departmentLabels: Record<string, string> = {
    'engineering': 'الهندسة',
    'design': 'التصميم',
    'marketing': 'التسويق',
    'sales': 'المبيعات',
    'support': 'الدعم الفني',
    'hr': 'الموارد البشرية',
    'finance': 'المالية',
    'operations': 'العمليات'
};

// ==================== JOBS ====================

// Get all jobs (public - only open jobs)
export async function getOpenJobs(): Promise<Job[]> {
    try {
        const q = query(
            collection(db, 'careers_jobs'),
            where('status', '==', 'open'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Job));
    } catch (error) {
        console.error('Error fetching open jobs:', error);
        return [];
    }
}

// Get all jobs (admin - all jobs)
export async function getAllJobs(): Promise<Job[]> {
    try {
        const q = query(
            collection(db, 'careers_jobs'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Job));
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        return [];
    }
}

// Get single job by ID
export async function getJobById(jobId: string): Promise<Job | null> {
    try {
        const docRef = doc(db, 'careers_jobs', jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as Job;
        }
        return null;
    } catch (error) {
        console.error('Error fetching job:', error);
        return null;
    }
}

// Create a new job (admin only)
export async function createJob(jobData: Omit<Job, 'id' | 'createdAt'>): Promise<string | null> {
    try {
        const docRef = await addDoc(collection(db, 'careers_jobs'), {
            ...jobData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating job:', error);
        return null;
    }
}

// Update a job (admin only)
export async function updateJob(jobId: string, jobData: Partial<Omit<Job, 'id' | 'createdAt'>>): Promise<boolean> {
    try {
        const docRef = doc(db, 'careers_jobs', jobId);
        await updateDoc(docRef, jobData as Record<string, unknown>);
        return true;
    } catch (error) {
        console.error('Error updating job:', error);
        return false;
    }
}

// Delete a job (admin only)
export async function deleteJob(jobId: string): Promise<boolean> {
    try {
        const docRef = doc(db, 'careers_jobs', jobId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error('Error deleting job:', error);
        return false;
    }
}

// Toggle job status
export async function toggleJobStatus(jobId: string, currentStatus: 'open' | 'closed'): Promise<boolean> {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    return updateJob(jobId, { status: newStatus });
}

// ==================== APPLICATIONS ====================

// Upload CV file
export async function uploadCV(file: File, applicantEmail: string): Promise<string | null> {
    try {
        const storage = getStorage();
        const timestamp = Date.now();
        const fileName = `cvs/${timestamp}_${applicantEmail.replace('@', '_at_')}_${file.name}`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    } catch (error) {
        console.error('Error uploading CV:', error);
        return null;
    }
}

// Submit job application
export async function submitApplication(
    applicationData: Omit<JobApplication, 'id' | 'createdAt' | 'cvUrl'>,
    cvFile: File
): Promise<{ success: boolean; error?: string }> {
    try {
        // Upload CV first
        const cvUrl = await uploadCV(cvFile, applicationData.email);
        if (!cvUrl) {
            return { success: false, error: 'فشل رفع السيرة الذاتية' };
        }

        // Save application to Firestore
        await addDoc(collection(db, 'job_applications'), {
            ...applicationData,
            cvUrl,
            createdAt: serverTimestamp()
        });

        return { success: true };
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: 'حدث خطأ أثناء إرسال الطلب' };
    }
}

// Get applications for a specific job (admin only)
export async function getApplicationsByJob(jobId: string): Promise<JobApplication[]> {
    try {
        const q = query(
            collection(db, 'job_applications'),
            where('jobId', '==', jobId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as JobApplication));
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
}

// Get all applications (admin only)
export async function getAllApplications(): Promise<JobApplication[]> {
    try {
        const q = query(
            collection(db, 'job_applications'),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as JobApplication));
    } catch (error) {
        console.error('Error fetching all applications:', error);
        return [];
    }
}

// Get application count for a job
export async function getApplicationCount(jobId: string): Promise<number> {
    try {
        const q = query(
            collection(db, 'job_applications'),
            where('jobId', '==', jobId)
        );
        const snapshot = await getDocs(q);
        return snapshot.size;
    } catch (error) {
        console.error('Error counting applications:', error);
        return 0;
    }
}
