import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-16 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] flex justify-between px-3 md:px-6 items-center text-white'>
      <Link href="/">
        <button className='bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] border-2 border-white/30 hover:border-white/50 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm md:text-base'>
          About US
        </button>
      </Link>
      <ul className='flex justify-center gap-3 md:gap-4 items-center'>
        <Link href="/shorten">
          <button className='bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] border-2 border-white/30 hover:border-white/50 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm md:text-base'>
            Try Now
          </button>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar