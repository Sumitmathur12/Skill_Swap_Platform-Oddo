'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Simulate logged-in state
const isLoggedIn = true  // Replace with real auth logic later

export default function Navbar() {
  const pathname = usePathname()

  const isLoginPage = pathname === '/login'
  const isSignupPage = pathname === '/signup'
  const isUserProfilePage = pathname === '/userProfile'
  const isSwapRequestPage = pathname === '/swapRequest'

  return (
    <nav className="sticky top-0 w-full flex items-center justify-between p-4  bg-transparent backdrop-blur-sm z-50">
      {/* Logo or Title */}
      <Link
        href="/"
        className="text-2xl font-bold bg-[linear-gradient(to_right,#C29226,#B27D0F,#D9B14A,#B27D0F,#C29226,#C7972B,#FADE7B)] bg-clip-text text-transparent"
      >
        Skill Swap
      </Link>

      {/* Right Side Nav Logic */}
      <div className="flex items-center gap-4">
        {isUserProfilePage && (
          <Link href="/swapRequest" className="text-white font-medium hover:underline">
            Swap Request
          </Link>
        )}
        {/* Always show Home except on / */}
        {pathname !== '/' && (
          <Link href="/" className="text-white font-bold text-lg hover:underline">
            Home
          </Link>
        )}

        {/* If user is logged in → Show profile photo */}
        {isLoggedIn ? (
          !isLoginPage && !isSignupPage && (
            <Link href="/userProfile">
              <img
                src="/profile-placeholder.jpg" // replace with user's photo if available
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          )
        ) : (
          // If not logged in → Show Login
          !isLoginPage && (
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          )
        )}

      </div>
    </nav>
  )
}
