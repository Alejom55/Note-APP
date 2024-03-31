import { NextResponse } from 'next/server';
import User from '@/models/user';
import { connectDB } from '@/libs/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { fullname, email, password } = await req.json();
    console.log(fullname, email, password);
    if (!fullname || !email || !password) {
        return NextResponse.json({ message: "Todos los campos son requeridos" }, { status: 400 });
    } else if (fullname.length < 3) {
        return NextResponse.json({ message: "El nombre completo es muy corto" }, { status: 400 });
    } else if (fullname.length > 50) {
        return NextResponse.json({ message: "El nombre completo es muy largo" }, { status: 400 });
    } else if (password.length < 6) {
        return NextResponse.json({ message: "La contraseña es muy corta" }, { status: 400 });
    }
    try {
        await connectDB();
        const userFound = await User.findOne({ email });
        if (userFound) {
            return NextResponse.json({ message: "El email ya esta registrado" }, { status: 400 });
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