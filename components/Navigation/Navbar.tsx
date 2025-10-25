"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { companyLogo } from '@/assets/home'
import { navContents } from '../Constants'
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className='fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[710px] px-4'>
      <div className='flex flex-row items-center justify-between py-1 px-1 rounded-full
        bg-[#FFFFFF0A] backdrop-blur-xs backdrop-saturate-150
        border-[5.29px] border-[#FFFFFF03] shadow-[0px_2px_20px_0px_#0000001A]
        transition-all duration-300'>
        
        {/* Logo */}
        <Link href='/' className='flex-shrink-0 transition-transform duration-300 hover:scale-105'>
          <Image src={companyLogo} alt='Blind Fold Trips' width={500} height={500} className='w-11 h-11' />
        </Link>

        {/* Desktop Navigation Links */}
        <div className='hidden lg:flex items-center flex-1 justify-center'>
          {navContents.map((nav, index) => (
            <Link
              key={index}
              href={nav.link}
              className='px-4 py-2 text-[13px] font-medium text-white 
                rounded-full transition-all duration-300
                hover:bg-white/10 hover:scale-105
                active:scale-95 whitespace-nowrap'
            >
              {nav.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <Link
          href='/login'
          className='hidden lg:flex flex-shrink-0 px-4 py-2.5 text-sm font-semibold
            bg-[#FFA62B] text-white rounded-full
            transition-all duration-300
            hover:bg-white/90 hover:scale-105 hover:shadow-lg
            active:scale-95'
        >
          LOG IN / ENQ
        </Link>

        {/* Mobile: CTA + Hamburger */}
        <div className='flex lg:hidden items-center gap-2'>
          <Link
            href='/login'
            className='px-3 py-2 text-xs font-semibold
              bg-[#FFA62B] text-white rounded-full
              transition-all duration-300
              hover:bg-white/90 hover:scale-105
              active:scale-95'
          >
            LOG IN
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className='p-2 text-white rounded-full transition-all duration-300
              hover:bg-white/10 active:scale-95'
            aria-label='Toggle menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMenuOpen ? (
                <path d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden mt-2 rounded-3xl overflow-hidden
          bg-[#FFFFFF0A] backdrop-blur-xs backdrop-saturate-150
          border-[5.29px] border-[#FFFFFF03] shadow-[0px_2px_20px_0px_#0000001A]
          transition-all duration-300 origin-top
          ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
      >
        <div className='py-4 px-2 flex flex-col gap-1'>
          {navContents.map((nav, index) => (
            <Link
              key={index}
              href={nav.link}
              onClick={closeMenu}
              className='px-4 py-3 text-sm font-medium text-white 
                rounded-2xl transition-all duration-300
                hover:bg-white/10 active:bg-white/20
                active:scale-95'
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar