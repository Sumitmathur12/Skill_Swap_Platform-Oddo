// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs' // uncomment when hashing

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()
        console.log("🟢 API Hit: /api/register");

        const body = await req.json();
        console.log("📦 Request Body:", body);

        const {
            name,
            email,
            password,
            location,
            availability,
            profileType,
            skillsOffered,
            skillsWanted,
            profilePhoto,
        } = body

        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword, // replace with hashedPassword later
            location,
            skillsOffered: Array.isArray(skillsOffered) ? skillsOffered : [],
            skillsWanted: Array.isArray(skillsWanted) ? skillsWanted : [],
            availability,
            profileType,
            profilePhoto,
        })

        console.log("📤 Saving new user to DB:", newUser);
        await newUser.save();


        return NextResponse.json({ success: true, message: 'User registered successfully' })
    } catch (error: any) {
        console.error('Registration error:', error)
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
}
