import React from 'react'

const Spinner = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-black opacity-10 flex items-center justify-center z-40">
      <div className="spinner w-14 h-14 grid border-4 border-double border-y-purple border-x-white"></div>
    </div>
  )
}

export default Spinner
