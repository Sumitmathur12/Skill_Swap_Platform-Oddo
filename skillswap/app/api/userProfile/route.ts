// app/api/userProfile/route.ts

import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const email = req.nextUrl.searchParams.get("email")
    if (!email) {
      return NextResponse.json({ success: false, message: "Missing email" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json()

    const updatedUser = await User.findOneAndUpdate(
      { email: body.email },
      { $set: body },
      { new: true }
    )

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
