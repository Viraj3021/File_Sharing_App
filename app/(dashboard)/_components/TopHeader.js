import { UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

function TopHeader() {
  return (
    <div className="flex items-center justify-between p-5 border-b">
      {/* Logo aligned to the left */}
      <div className="flex items-center">
        <Image 
          src="/logo.svg" 
          width={40} 
          height={50} 
          alt="my logo"
          className="object-contain md:block hidden"  // Logo visible on medium and larger screens
        />
      </div>

      {/* Heading (visible only on medium and larger screens, centered) */}
      <h1 className="hidden md:flex items-center text-2xl font-bold justify-center flex-grow">
        Welcome to File Sharing 🦑
      </h1>

      {/* Hamburger icon visible on small screens */}
      <div className="md:hidden">
        <AlignJustify />
      </div>

      {/* User button aligned to the right */}
      <div className="flex items-center ml-auto">
        <UserButton />
      </div>
    </div>
  );
}

export default TopHeader;
