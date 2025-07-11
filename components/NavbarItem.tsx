import React from 'react'

interface NavbarItemProps {
    label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label}) =>  {
  return (
    <div className='text-white cursor-default'>
        {label}
    </div>
  )
}

export default NavbarItem