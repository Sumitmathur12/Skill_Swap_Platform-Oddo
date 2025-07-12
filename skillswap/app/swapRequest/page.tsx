'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type RequestStatus = 'Pending' | 'Accepted' | 'Rejected'

interface SwapRequest {
  id: string
  name: string
  profilePhoto: string
  rating: number
  skillsOffered: string[]
  skillsWanted: string[]
  status: RequestStatus
}

export default function SwapRequestPage() {
  const [requests, setRequests] = useState<SwapRequest[]>([])
  const [filter, setFilter] = useState<RequestStatus | 'All'>('Pending')
  const [searchTerm, setSearchTerm] = useState('')

  // Fake data for demo (replace with API fetch later)
  useEffect(() => {
    setRequests([
      {
        id: '1',
        name: 'Marc Demo',
        profilePhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 3.9,
        skillsOffered: ['JavaScript'],
        skillsWanted: ['Photoshop'],
        status: 'Pending',
      },
      {
        id: '2',
        name: 'Jane Doe',
        profilePhoto: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 4.2,
        skillsOffered: ['Design'],
        skillsWanted: ['Python'],
        status: 'Rejected',
      },
    ])
  }, [])

  const handleAction = (id: string, action: 'Accept' | 'Reject') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: action === 'Accept' ? 'Accepted' : 'Rejected' } : req
      )
    )
    // TODO: Make API call to update status in DB
  }

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filter === 'All' || req.status === filter
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      req.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded"
            value={filter}
            onChange={e => setFilter(e.target.value as RequestStatus | 'All')}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
        </div>

        
      </div>

      {/* Request Cards */}
      <div className="space-y-6">
        {filteredRequests.map(req => (
          <div
            key={req.id}
            className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow-md"
          >
            <div className="flex items-center gap-4">
              <Image
                src={req.profilePhoto}
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold">{req.name}</h2>
                <p className="text-sm text-gray-600">Rating: {req.rating}/5</p>
                <p>
                  <span className="text-green-600 font-medium">Skills Offered:</span>{' '}
                  {req.skillsOffered.join(', ')}
                </p>
                <p>
                  <span className="text-blue-600 font-medium">Skills Wanted:</span>{' '}
                  {req.skillsWanted.join(', ')}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold mb-2 ${
                  req.status === 'Pending'
                    ? 'text-gray-700'
                    : req.status === 'Accepted'
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                Status: {req.status}
              </p>

              {req.status === 'Pending' && (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleAction(req.id, 'Accept')}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'Reject')}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-4 text-xl">
        <button className="hover:underline">{'<'}</button>
        <span className="font-semibold">1</span>
        <span className="text-gray-400">2</span>
        <span className="text-gray-400">3</span>
        <button className="hover:underline">{'>'}</button>
      </div>
    </div>
  )
}
