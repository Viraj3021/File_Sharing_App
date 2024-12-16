import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

function TopHeader() {
  return (
    <div className='flex items-center justify-between
     p-5 border-b md:justify-end'>
      <AlignJustify className='md:hidden'/>
      <Image src="/logo.svg" width={150} height={100} className='md:hidden' alt='my logo' />
      <UserButton />
    </div>
  )
}

export default TopHeader
