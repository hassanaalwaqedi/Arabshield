import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, limit } from 'firebase/firestore';

// Flag to ensure seeding runs only once
let hasSeeded = false;

/**
 * Initialize Users Collection
 * Creates default user documents
 */
async function seedUsers() {
    const usersRef = collection(db, 'users');

    // Check if users collection already has documents
    const snapshot = await getDocs(query(usersRef, limit(1)));
    if (!snapshot.empty) {
        console.log('Users collection already seeded');
        return;
    }

    const defaultUsers = [
        {
            id: 'admin_001',
            name: 'Admin User',
            email: 'admin@arabshield.com',
            role: 'admin',
            createdAt: new Date().toISOString(),
            isActive: true
        },
        {
            id: 'user_001',
            name: 'Demo User',
            email: 'demo@arabshield.com',
            role: 'user',
            createdAt: new Date().toISOString(),
            isActive: true
        }
    ];

    for (const user of defaultUsers) {
        await setDoc(doc(usersRef, user.id), user);
    }

    console.log('✅ Users collection seeded successfully');
}

/**
 * Initialize Orders Collection
 * Creates sample order documents
 */
async function seedOrders() {
    const ordersRef = collection(db, 'orders');

    // Check if orders collection already has documents
    const snapshot = await getDocs(query(ordersRef, limit(1)));
    if (!snapshot.empty) {
        console.log('Orders collection already seeded');
        return;
    }

    const defaultOrders = [
        {
            id: 'order_001',
            userId: 'user_001',
            serviceType: 'Web Development',
            status: 'in_progress',
            amount: 5000,
            currency: 'SAR',
            description: 'E-commerce website development',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'order_002',
            userId: 'user_001',
            serviceType: 'Mobile App',
            status: 'completed',
            amount: 8000,
            currency: 'SAR',
            description: 'iOS & Android mobile application',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: new Date().toISOString()
        }
    ];

    for (const order of defaultOrders) {
        await setDoc(doc(ordersRef, order.id), order);
    }

    console.log('✅ Orders collection seeded successfully');
}

/**
 * Initialize Activities Collection
 * Creates activity log documents
 */
async function seedActivities() {
    const activitiesRef = collection(db, 'activities');

    // Check if activities collection already has documents
    const snapshot = await getDocs(query(activitiesRef, limit(1)));
    if (!snapshot.empty) {
        console.log('Activities collection already seeded');
        return;
    }

    const defaultActivities = [
        {
            id: 'activity_001',
            userId: 'user_001',
            type: 'order_created',
            description: 'New order created for Web Development',
            orderId: 'order_001',
            timestamp: new Date().toISOString()
        },
        {
            id: 'activity_002',
            userId: 'user_001',
            type: 'order_updated',
            description: 'Order status updated to in_progress',
            orderId: 'order_001',
            timestamp: new Date().toISOString()
        },
        {
            id: 'activity_003',
            userId: 'user_001',
            type: 'order_completed',
            description: 'Order completed successfully',
            orderId: 'order_002',
            timestamp: new Date().toISOString()
        }
    ];

    for (const activity of defaultActivities) {
        await setDoc(doc(activitiesRef, activity.id), activity);
    }

    console.log('✅ Activities collection seeded successfully');
}

/**
 * Initialize Statistics Collection
 * Creates statistics documents
 */
async function seedStatistics() {
    const statsRef = collection(db, 'statistics');

    // Check if statistics collection already has documents
    const snapshot = await getDocs(query(statsRef, limit(1)));
    if (!snapshot.empty) {
        console.log('Statistics collection already seeded');
        return;
    }

    const defaultStats = [
        {
            id: 'dashboard_stats',
            totalProjects: 2,
            activeProjects: 1,
            completedProjects: 1,
            totalRevenue: 13000,
            pendingInvoices: 1500,
            openTickets: 0,
            resolvedTickets: 5,
            systemHealth: 99.9,
            lastUpdated: new Date().toISOString()
        },
        {
            id: 'monthly_stats',
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            newOrders: 2,
            completedOrders: 1,
            revenue: 8000,
            activeUsers: 1,
            lastUpdated: new Date().toISOString()
        }
    ];

    for (const stat of defaultStats) {
        await setDoc(doc(statsRef, stat.id), stat);
    }

    console.log('✅ Statistics collection seeded successfully');
}

/**
 * Main seed function
 * Runs all seed functions only once
 */
export async function seedDatabase() {
    if (hasSeeded) {
        console.log('Database already seeded in this session');
        return;
    }

    try {
        console.log('🌱 Starting database seeding...');

        await seedUsers();
        await seedOrders();
        await seedActivities();
        await seedStatistics();

        hasSeeded = true;
        console.log('🎉 Database seeding completed successfully!');

        return { success: true, message: 'Database seeded successfully' };
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Check if database needs seeding
 * Returns true if any collection is empty
 */
export async function needsSeeding() {
    try {
        const collections = ['users', 'orders', 'activities', 'statistics'];

        for (const collectionName of collections) {
            const snapshot = await getDocs(query(collection(db, collectionName), limit(1)));
            if (snapshot.empty) {
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error('Error checking if seeding needed:', error);
        return true; // If error, assume seeding is needed
    }
}
