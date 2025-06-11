
import React, { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem"
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY >= TOP_OFFSET){
        setShowBackground(true);
      }else{
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, [])

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(current => !current)
  }, [])


  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center
        ${showBackground ? 'bg-zinc-900 opacity-90' : ''}`}>
        <img src='/images/logo.png' className='h-6 lg:h-7' alt="logo"/>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home"/>
          <NavbarItem label="Series"/>
          <NavbarItem label="Films"/>
          <NavbarItem label="New & Popular"/>
          <NavbarItem label="My List"/>
          <NavbarItem label="Browse by Languages"/>
        </div>
        <div onClick={toggleMobileMenu} className="flex flex-row items-center gap-2 ml-8 lg:hidden cursor-pointer relative">
          <p className="text-white">Browse</p>
          <ChevronDownIcon className={`w-4 text-white fill-white transition duration-300 ${showMobileMenu ? 'rotate-180' : ''}`}/>
          <MobileMenu visible={showMobileMenu}/>
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-400 transition cursor-pointer">
            <MagnifyingGlassIcon className="w-6"/>
          </div>
          <div className="text-gray-200 hover:text-gray-400 transition cursor-pointer">
            <BellIcon className="w-6"/>
          </div>
          <div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 relative hover:cursor-pointer">
            <div className="w-7 h-7 lg:w-9 lg:h-9 rounded-md overflow-hidden">
              <img src='/images/default-red.png' alt='current profile logo'/>
            </div>
             <ChevronDownIcon className={`text-white w-4 fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0' } `} />
             <AccountMenu visible={showAccountMenu} />
          </div>     
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar