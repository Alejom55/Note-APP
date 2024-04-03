import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    await connectDB();
    try {
        const user = await User.findById(params.user_id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const task = user.notes.id(params.task_id);
        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json({ user: task }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    try {
        const user = await User.findById(params.user_id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const taskIndex = user.notes.findIndex(note => note._id == params.task_id);
        if (taskIndex === -1) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        user.notes.splice(taskIndex, 1);
        await user.save();
        return NextResponse.json({ message: 'Eliminado correctamente' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}


export async function PUT(req, { params }) {
    await connectDB();
    try {
        const { title, description } = await req.json();
        const user = await User.findById(params.user_id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const task = user.notes.id(params.task_id);
        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        task.title = title;
        task.description = description;
        await user.save();
        return NextResponse.json({ user: task }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
