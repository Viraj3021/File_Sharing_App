"use client";
import { Files, Shield, Upload } from 'lucide-react'; // Ensure correct import from lucide-react
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter from App Router

function SideNav() {
    const router = useRouter(); // Initialize router
    const menuList = [
        {
            id: 1,
            name: 'Upload',
            icon: Upload, // This should be a React component from lucide-react
            path: '/upload'
        },
        {
            id: 2,
            name: 'Files',
            icon: Files, // This should be a React component from lucide-react
            path: '/files'
        },
        {
            id: 3,
            name: 'Upgrade',
            icon: Shield, // This should be a React component from lucide-react
            path: '/upgrade'
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavigation = (index, path) => {
        setActiveIndex(index); // Update active index for styling
        router.push(path); // Navigate to the desired path
    };

    return (
        <div className='shadow border-r h-full'>
            <div className="p-5 border-b">
                <Image src="/logo1.gif" width={150} height={150} alt="logo" />
            </div>
            <div className="flex flex-col float-left w-full">
                {menuList.map((item, index) => (
                    <button 
                        key={item.id}  
                        className={`flex gap-2 p-4 hover:bg-gray-100 px-6 w-full text-gray-500
                            ${activeIndex === index ? 'bg-blue-50 text-primary' : ''}`}
                        onClick={() => handleNavigation(index, item.path)}>
                        <item.icon />
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SideNav;
