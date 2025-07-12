'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type RequestStatus = 'Pending' | 'Accepted' | 'Rejected'

interface SwapRequest {
  _id: string
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Fetch real data
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/swapRequests')
        const data = await res.json()
        if (data.success) {
          setRequests(data.requests)
        } else {
          console.error('Failed to fetch swap requests')
        }
      } catch (err) {
        console.error('Error fetching swap requests:', err)
      }
    }

    fetchRequests()
  }, [])

  const handleAction = async (id: string, action: 'Accept' | 'Reject') => {
    const updatedStatus = action === 'Accept' ? 'Accepted' : 'Rejected'

    try {
      const res = await fetch(`/api/swapRequests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: updatedStatus }),
      })

      const result = await res.json()
      if (result.success) {
        setRequests(prev =>
          prev.map(req =>
            req._id === id ? { ...req, status: updatedStatus } : req
          )
        )
      } else {
        console.error('Failed to update request status')
      }
    } catch (err) {
      console.error('Error updating request status:', err)
    }
  }

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filter === 'All' || req.status === filter
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      req.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)

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
        {paginatedRequests.map(req => (
          <div
            key={req._id}
            className="flex justify-between items-center p-4 bg-gray-800 rounded-xl shadow-md text-white"
          >
            <div className="flex items-center gap-4">
              <Image
                src={req.profilePhoto || '/default-avatar.png'}
                alt="Profile"
                width={60}
                height={60}
                className="rounded-full border"
                onError={(e: any) => {
                  e.target.src = '/default-avatar.png'
                }}
              />
              <div>
                <h2 className="text-xl font-semibold">{req.name}</h2>
                <p className="text-sm text-gray-400">Rating: {req.rating}/5</p>
                <p>
                  <span className="text-green-400 font-medium">Skills Offered:</span>{' '}
                  {req.skillsOffered.join(', ')}
                </p>
                <p>
                  <span className="text-blue-400 font-medium">Skills Wanted:</span>{' '}
                  {req.skillsWanted.join(', ')}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold mb-2 ${
                  req.status === 'Pending'
                    ? 'text-yellow-400'
                    : req.status === 'Accepted'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                Status: {req.status}
              </p>

              {req.status === 'Pending' && (
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleAction(req._id, 'Accept')}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req._id, 'Reject')}
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
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-4 text-xl text-white">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="hover:underline disabled:text-gray-500"
          >
            {'<'}
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={currentPage === idx + 1 ? 'font-semibold' : 'text-gray-400'}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="hover:underline disabled:text-gray-500"
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  )
}
