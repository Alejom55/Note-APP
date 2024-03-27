import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/libs/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { fullname, email, password } = await req.json();
    console.log(fullname, email, password);
    if (!fullname || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    } else if (fullname.length < 3) {
        return NextResponse.json({ message: "Fullname is too short" }, { status: 400 });
    } else if (fullname.length > 50) {
        return NextResponse.json({ message: "Fullname is too long" }, { status: 400 });
    } else if (password.length < 6) {
        return NextResponse.json({ message: "Password is too short" }, { status: 400 });
    }
    try {

        await connectDB();
        const userFound = await User.findOne({ email });
        if (userFound) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        };
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({ fullname, email, password: hashedPassword });
        const savedUser = await user.save();
        console.log(savedUser)
        return NextResponse.json(savedUser);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

}