// app/api/users/route.ts

import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    // Optionally support filtering by query params (like availability, search term)
    const users = await User.find({}, 'name profilePhoto skillsOffered skillsWanted rating') // Select only needed fields

    return NextResponse.json({ success: true, users })
  } catch (error) {
    console.error('Fetch users error:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 })
  }
}
