import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-300' >
      <div className="mycontainer flex justify-between p-5 items-center px-4 py-3">

        <div className='logo font-bold hover:cursor-pointer text-2xl' >
          <span className='text-green-700'>&lt;</span>
          <span className='text-black'>Pass</span>
          <span className='text-purple-500'>OP</span>
          <span className='text-green-700'>/&gt;</span>

        </div>
        <ul className='flex gap-8 ' >
          <li className='hover:cursor-pointer hover:font-bold'>Home</li>
          <li className='hover:cursor-pointer hover:font-bold'>About</li>
          <a href="Services.jsx"><li className='hover:cursor-pointer hover:font-bold'>Services</li></a>
        </ul>
      </div>
    </nav>

  )
}

export default Navbar
