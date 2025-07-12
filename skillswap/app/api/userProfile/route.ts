import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongoose'
import User from '@/models/User' // adjust path

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const body = await req.json()

    const updatedUser = await User.findOneAndUpdate(
      { email: body.email }, // or userId/session email
      { $set: body },
      { new: true, upsert: true }
    )

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
  }
}
