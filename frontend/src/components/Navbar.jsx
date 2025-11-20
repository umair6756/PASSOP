// import React from 'react'

// const Navbar = () => {
//     return (
//         <nav className='bg-slate-800 text-white '>
//             <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

//                 <div className="logo font-bold text-white text-2xl">
//                     <span className='text-green-500'> &lt;</span>
//                     <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
//                 </div>
//                 {/* <ul>
//                     <li className='flex gap-4 '>
//                         <a className='hover:font-bold' href='/'>Home</a>
//                         <a className='hover:font-bold' href='#'>About</a>
//                         <a className='hover:font-bold' href='#'>Contact</a>
//                     </li>
//                 </ul> */}
//                 <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'>
//                     <img className='invert  w-10 p-1' src="/icons/github.svg" alt="github logo" />
//                     <span className='font-bold px-2'>GitHub</span>

//                 </button>
//             </div>
//         </nav>
//     )
// }

// export default Navbar




















import React, { useState, useEffect } from 'react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleGitHubClick = () => {
        window.open('https://github.com', '_blank')
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-700' 
                : 'bg-transparent'
        }`}>
            <div className="mycontainer flex justify-between items-center px-6 py-4 h-16">
                {/* Logo */}
                <div className={`logo font-bold transition-all duration-500 ${
                    isScrolled 
                        ? 'text-2xl text-gray-900 dark:text-white' 
                        : 'text-3xl text-white'
                }`}>
                    <span className='text-green-500 animate-pulse'>&lt;</span>
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        Pass
                    </span>
                    <span className='text-green-500 animate-pulse'>/&gt;</span>
                </div>

                {/* Navigation Links - Hidden on mobile, visible on desktop */}
                <div className="hidden md:flex items-center space-x-8">
                    <a 
                        href='/' 
                        className={`font-semibold transition-all duration-300 hover:text-green-500 ${
                            isScrolled 
                                ? 'text-gray-700 dark:text-gray-300 hover:text-green-600' 
                                : 'text-white hover:text-green-300'
                        }`}
                    >
                        Home
                    </a>
                    <a 
                        href='#features' 
                        className={`font-semibold transition-all duration-300 hover:text-green-500 ${
                            isScrolled 
                                ? 'text-gray-700 dark:text-gray-300 hover:text-green-600' 
                                : 'text-white hover:text-green-300'
                        }`}
                    >
                        Features
                    </a>
                    <a 
                        href='#about' 
                        className={`font-semibold transition-all duration-300 hover:text-green-500 ${
                            isScrolled 
                                ? 'text-gray-700 dark:text-gray-300 hover:text-green-600' 
                                : 'text-white hover:text-green-300'
                        }`}
                    >
                        About
                    </a>
                </div>

                {/* GitHub Button */}
                <button 
                    onClick={handleGitHubClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`group relative overflow-hidden transition-all duration-500 font-semibold rounded-2xl flex items-center justify-center ${
                        isScrolled 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl' 
                            : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                    } hover:scale-105 transform transition-transform`}
                >
                    <div className="flex items-center px-4 py-3">
                        <img 
                            className={`w-6 h-6 transition-all duration-300 ${
                                isScrolled ? 'invert-0' : 'invert'
                            } ${isHovered ? 'scale-110 rotate-12' : ''}`} 
                            src="/icons/github.svg" 
                            alt="github logo" 
                        />
                        <span className='font-bold px-3'>GitHub</span>
                    </div>
                    
                    {/* Animated background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 transition-transform duration-500 ${
                        isHovered ? 'translate-x-0' : '-translate-x-full'
                    }`}></div>
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 opacity-0 transition-opacity duration-300 ${
                        isHovered ? 'opacity-30' : 'opacity-0'
                    } blur-lg`}></div>
                </button>

                {/* Mobile menu button - You can expand this later */}
                <button className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Animated underline effect */}
            <div className={`h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 transition-all duration-1000 ${
                isScrolled ? 'opacity-100' : 'opacity-70'
            }`}></div>
        </nav>
    )
}

export default Navbar