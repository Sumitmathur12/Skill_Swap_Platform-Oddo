'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface UserCard {
  _id: string
  name: string
  profilePhoto?: string
  rating?: number
  skillsOffered: string[]
  skillsWanted: string[]
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState<UserCard[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()

        if (data.success) {
          setUsers(data.users)
        } else {
          console.error('Failed to fetch users')
        }
      } catch (err) {
        console.error('Error fetching users:', err)
      }
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="text-3xl font-bold text-yellow-300">Skill Swap Platform</h1> */}
        <div className="flex gap-3">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-gray-800 px-3 py-1 rounded"
          >
            <option value="All">Availability</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 px-3 py-1 rounded text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
      </div>

      {/* User Cards */}
      <div className="space-y-6">
        {filteredUsers.map(user => (
          <div key={user._id} className="bg-gray-900 p-4 rounded-xl flex justify-between items-center shadow-md">
            <div className="flex items-center gap-4">
              <Image
                src={user.profilePhoto || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                alt={user.name}
                width={70}
                height={70}
                className="rounded-full border"
              />
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-green-400">Skills Offered: {user.skillsOffered.join(', ')}</p>
                <p className="text-blue-400">Skills Wanted: {user.skillsWanted.join(', ')}</p>
                <p className="text-gray-400 text-sm">Rating: {user.rating || 'N/A'}/5</p>
              </div>
            </div>
            <Link href={`/profile/${user._id}`}>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded">
              Request
            </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4 text-xl text-white">
        <button className="hover:underline">{'<'}</button>
        <span className="text-orange-400 font-semibold">1</span>
        <span className="text-gray-500">2</span>
        <span className="text-gray-500">3</span>
        <button className="hover:underline">{'>'}</button>
      </div>
    </main>
  )
}
