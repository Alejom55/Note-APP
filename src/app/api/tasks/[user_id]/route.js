import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    await connectDB();
    try {
        const { title, description } = await req.json();
        const user = await User.findById(params.user_id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const newTask = { title, description };
        user.notes.push(newTask);
        await user.save();
        return NextResponse.json({ data: newTask }, { status: 201 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
export async function GET(req, { params }) {
    await connectDB();
    try {
        const user = await User.findById(params.user_id);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}




