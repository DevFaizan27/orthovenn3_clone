import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Navbar as MTNavbar,
  Typography,
  IconButton,
  MobileNav
} from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'START', path: '/start' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'CLUSTER-VENN', path: '/cluster-venn' },
    { name: 'TASK HISTORY', path: '/task-history' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <MTNavbar className="mx-auto max-w-none rounded-none px-8 py-4 shadow-none">
      <div className="flex border-b-2 border-gray-100  items-center justify-between text-blue-gray-900">
       <img src="/orthovenn3.svg" className='w-30 h-10' alt="" />
        
        {/* Desktop Navigation */}
        <ul className="hidden  items-center gap-4 lg:flex lg:flex-1 lg:justify-center">
          {navItems.map((item) => (
            <Typography
              as="li"
              variant="large"
              className="p-1 font-medium"
              key={item.name}
            >
              <Link
                to={item.path}
                className={`flex items-center  px-3 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'border-b-2 border-purple-400  text-purple-400'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            </Typography>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Mobile Navigation */}
      <MobileNav open={openNav}>
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Typography
              as="li"
              variant="large" 

              className="p-1 text-black font-medium"
              key={item.name}
            >
              <Link
                to={item.path}
                className={`flex items-center  px-3 py-2 transition-colors ${
                  isActive(item.path)
                  ? 'border-b-2 border-purple-400  text-purple-400'
                    : ''
                }`}
                onClick={() => setOpenNav(false)}
              >
                {item.name}
              </Link>
            </Typography>
          ))}
        </ul>
      </MobileNav>
    </MTNavbar>
  );
};

export default Navbar;