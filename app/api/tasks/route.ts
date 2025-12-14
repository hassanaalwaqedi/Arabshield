/**
 * Tasks API Route
 * GET: List all tasks (with optional projectId filter)
 * POST: Create a new task
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/server';
import { collection, getDocs, addDoc, query, orderBy, where } from 'firebase/firestore';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get('projectId');

        let q;
        if (projectId) {
            q = query(
                collection(db, 'tasks'),
                where('projectId', '==', projectId),
                orderBy('createdAt', 'desc')
            );
        } else {
            q = query(
                collection(db, 'tasks'),
                orderBy('createdAt', 'desc')
            );
        }

        const snapshot = await getDocs(q);
        const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { error: 'فشل في جلب المهام' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, status, deadline, assignedTo, projectId } = body;

        // Validate required fields
        if (!title || !projectId) {
            return NextResponse.json(
                { error: 'عنوان المهمة والمشروع مطلوبان' },
                { status: 400 }
            );
        }

        const taskData = {
            title,
            description: description || '',
            status: status || 'todo',
            deadline: deadline || '',
            assignedTo: assignedTo || '',
            projectId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, 'tasks'), taskData);

        return NextResponse.json({
            id: docRef.id,
            ...taskData
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { error: 'فشل في إنشاء المهمة' },
            { status: 500 }
        );
    }
}
