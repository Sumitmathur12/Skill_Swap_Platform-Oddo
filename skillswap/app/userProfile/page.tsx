'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function UserProfileEdit() {
  const [profile, setProfile] = useState({
    name: 'Shivam',
    email: 'shivam@example.com', // temporary until auth is added
    location: 'Delhi, India',
    skillsOffered: ['Graphic Design', 'Video Editing', 'Photoshop'],
    skillsWanted: ['Python', 'JavaScript', 'Manager'],
    availability: 'weekends',
    profileType: 'public',
    profilePhoto: '',
  })

  const [originalProfile, setOriginalProfile] = useState(profile)
  const [newSkill, setNewSkill] = useState({ offered: '', wanted: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleRemoveSkill = (type: 'skillsOffered' | 'skillsWanted', skill: string) => {
    setProfile({
      ...profile,
      [type]: profile[type].filter(s => s !== skill),
    })
  }

  const handleAddSkill = (type: 'skillsOffered' | 'skillsWanted', skill: string) => {
    if (skill && !profile[type].includes(skill)) {
      setProfile({
        ...profile,
        [type]: [...profile[type], skill],
      })
    }
  }

  const handleImageUpload = () => {
    const demoPhoto = 'https://randomuser.me/api/portraits/men/75.jpg'
    setProfile({ ...profile, profilePhoto: demoPhoto })
  }

  const handleRemovePhoto = () => {
    setProfile({ ...profile, profilePhoto: '' })
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      const result = await res.json()
      if (result.success) {
        alert('Profile saved successfully!')
        setOriginalProfile(profile)
      } else {
        alert('Failed to save profile.')
      }
    } catch (err) {
      console.error(err)
      alert('Error saving profile.')
    }
  }

  const handleDiscard = () => {
    setProfile(originalProfile)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Save / Discard Buttons */}
      <div className="flex justify-end mb-6 space-x-4">
        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save
        </button>
        <button onClick={handleDiscard} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Discard
        </button>
      </div>

      {/* Main Profile Form */}
      <div className="bg-gray-900 shadow-lg rounded-2xl p-6 space-y-4 text-white">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-3">
            <label className="block font-medium">Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-shadow-gray-400"
            />

            <label className="block font-medium">Location</label>
            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-shadow-gray-400"
            />

            <label className="block font-medium">Skills Offered</label>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered.map(skill => (
                <span key={skill} className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill('skillsOffered', skill)}
                    className="ml-2 text-sm text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newSkill.offered}
                onChange={e => setNewSkill({ ...newSkill, offered: e.target.value })}
                placeholder="Add skill"
                className="flex-1 border rounded px-2 py-1 text-shadow-gray-400"
              />
              <button
                onClick={() => {
                  handleAddSkill('skillsOffered', newSkill.offered)
                  setNewSkill({ ...newSkill, offered: '' })
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

            <label className="block font-medium mt-4">Availability</label>
            <input
              name="availability"
              value={profile.availability}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-shadow-gray-400"
            />

            <label className="block font-medium mt-4">Profile</label>
            <select
              name="profileType"
              value={profile.profileType}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-shadow-gray-400"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Right column */}
          <div className="flex-1 space-y-3">
            <label className="block font-medium">Skills Wanted</label>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.map(skill => (
                <span key={skill} className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full flex items-center">
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill('skillsWanted', skill)}
                    className="ml-2 text-sm text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newSkill.wanted}
                onChange={e => setNewSkill({ ...newSkill, wanted: e.target.value })}
                placeholder="Add skill"
                className="flex-1 border rounded px-2 py-1 text-shadow-gray-400"
              />
              <button
                onClick={() => {
                  handleAddSkill('skillsWanted', newSkill.wanted)
                  setNewSkill({ ...newSkill, wanted: '' })
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>

            {/* Profile photo */}
            <div className="mt-6">
              <label className="block font-medium">Profile Photo</label>
              {profile.profilePhoto ? (
                <div className="space-x-4 flex items-center mt-2">
                  <Image
                    src={profile.profilePhoto}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border"
                  />
                  <button onClick={handleImageUpload} className="text-blue-400 hover:underline">
                    Edit
                  </button>
                  <button onClick={handleRemovePhoto} className="text-red-400 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleImageUpload}
                  className="mt-2 px-4 py-1 bg-yellow-500 text-white rounded"
                >
                  Upload Photo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
