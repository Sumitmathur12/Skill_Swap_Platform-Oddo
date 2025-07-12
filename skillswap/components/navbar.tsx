'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isLoggedIn = !!session?.user
  const isLoginPage = pathname === '/login'
  const isSignupPage = pathname === '/signup'
  const isUserProfilePage = pathname === '/userProfile'
  const isSwapRequestPage = pathname === '/swapRequest'

  return (
    <nav className="sticky top-0 w-full flex items-center justify-between p-4 bg-transparent backdrop-blur-sm z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold bg-[linear-gradient(to_right,#C29226,#B27D0F,#D9B14A,#B27D0F,#C29226,#C7972B,#FADE7B)] bg-clip-text text-transparent"
      >
        Skill Swap
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        {/* Show "Swap Request" only on profile page */}
        {isUserProfilePage && (
          <Link href="/swapRequest" className="text-white font-medium hover:underline">
            Swap Request
          </Link>
        )}

        {/* Show Home button everywhere except home */}
        {pathname !== '/' && (
          <Link href="/" className="text-white font-bold text-lg hover:underline">
            Home
          </Link>
        )}

        {/* Auth Section */}
        {isLoggedIn ? (
          !isLoginPage && !isSignupPage && (
            <Link href="/userProfile">
              <img
                src={session?.user?.image || '/profile-placeholder.jpg'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white"
              />
            </Link>
          )
        ) : (
          !isLoginPage && (
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline border border-blue-600 px-4 py-1 rounded-full"
            >
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  )
}
