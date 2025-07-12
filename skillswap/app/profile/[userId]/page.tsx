'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface UserProfile {
  _id: string
  name: string
  profilePhoto?: string
  rating?: number
  skillsOffered: string[]
  skillsWanted: string[]
}

export default function ProfileViewPage() {
  const { userId } = useParams()
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/userProfile?id=${userId}`)
      const data = await res.json()
      if (data.success) setUser(data.data)
    }

    fetchUser()
  }, [userId])

  if (!user) return <p className="text-white text-center mt-20">Loading Profile...</p>

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
        <div className="flex gap-4 items-center">
          <Link href="/swap-requests">Swap Requests</Link>
          <Link href="/">Home</Link>
          <Image
            src={user.profilePhoto || '/default-avatar.png'}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border"
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Image
            src={user.profilePhoto || '/default-avatar.png'}
            alt={user.name}
            width={150}
            height={150}
            className="rounded-full border"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{user.name}</h2>

          <div>
            <p className="text-green-400 font-medium">Skills Offered:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.skillsOffered.map(skill => (
                <span key={skill} className="bg-yellow-300 text-black px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-blue-400 font-medium">Skills Wanted:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.skillsWanted.map(skill => (
                <span key={skill} className="bg-blue-300 text-black px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-300">Rating: <span className="text-yellow-400">{user.rating || 'N/A'}</span></p>

          <Link href={`/swap-request/${user._id}`}>
            <button className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded">
              Request
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
