import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(_: any, { params }: any) {
    const ref = doc(db, "tasks", params.id);
    const snap = await getDoc(ref);

    return NextResponse.json({ id: snap.id, ...snap.data() });
}

export async function PUT(req: Request, { params }: any) {
    const body = await req.json();
    await updateDoc(doc(db, "tasks", params.id), body);

    return NextResponse.json({ success: true });
}

export async function DELETE(_: any, { params }: any) {
    await deleteDoc(doc(db, "tasks", params.id));
    return NextResponse.json({ success: true });
}
