'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface UserProfile {
  id: string
  name: string
  skillsOffered: string[]
  skillsWanted: string[]
}

export default function SwapRequestPage() {
  const { data: session } = useSession()
  const { userId } = useParams()

  const [targetUser, setTargetUser] = useState<UserProfile | null>(null)
  const [mySkills, setMySkills] = useState<string[]>([])
  const [selectedMySkill, setSelectedMySkill] = useState('')
  const [selectedTheirSkill, setSelectedTheirSkill] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch target user
      const res = await fetch(`/api/userProfile?id=${userId}`)
      const data = await res.json()
      if (data.success) setTargetUser(data.data)

      // 2. Fetch logged-in user's profile
      if (session?.user?.email) {
        const res2 = await fetch(`/api/userProfile?email=${session.user.email}`)
        const data2 = await res2.json()
        if (data2.success) setMySkills(data2.data.skillsOffered)
      }
    }
    fetchData()
  }, [session, userId])

  const handleSubmit = async () => {
    if (!selectedMySkill || !selectedTheirSkill) {
      alert('Please select both skills.')
      return
    }

    const res = await fetch('/api/swapRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromEmail: session?.user?.email,
        toUserId: userId,
        offeredSkill: selectedMySkill,
        wantedSkill: selectedTheirSkill,
        message,
      }),
    })

    const result = await res.json()
    if (result.success) {
      alert('Request sent!')
    } else {
      alert('Failed to send request.')
    }
  }

  if (!targetUser) return <p className="text-white">Loading...</p>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-6">Send Swap Request to {targetUser.name}</h2>

      {/* Offered Skill */}
      <label className="block mb-1">Choose one of your offered skills</label>
      <select
        value={selectedMySkill}
        onChange={(e) => setSelectedMySkill(e.target.value)}
        className="w-full bg-gray-800 p-2 rounded mb-4"
      >
        <option value="">-- Select --</option>
        {mySkills.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {/* Wanted Skill */}
      <label className="block mb-1">Choose one of their wanted skills</label>
      <select
        value={selectedTheirSkill}
        onChange={(e) => setSelectedTheirSkill(e.target.value)}
        className="w-full bg-gray-800 p-2 rounded mb-4"
      >
        <option value="">-- Select --</option>
        {targetUser.skillsWanted.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {/* Message */}
      <label className="block mb-1">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 bg-gray-800 p-2 rounded mb-6"
        placeholder="Write a short message..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  )
}
