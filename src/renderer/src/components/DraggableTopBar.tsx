import React from 'react'
import { FaPenAlt } from 'react-icons/fa'

const DraggableTopBar: React.FC = () => {
  const handleClose = () => {
    window.electronAPI.closeWindow()
  }

  const handleMinimize = () => {
    window.electronAPI.minimizeWindow()
  }

  const handleMaximize = () => {
    window.electronAPI.maximizeWindow()
  }

  return (
    <header className="absolute inset-0 h-8 bg-transparent flex items-center justify-between px-2 py-1">
      <div className="px-2 rounded-md flex gap-2 items-center justify-center">
        <FaPenAlt className="text-xs" />
        <h3 className="text-[#f2f2f2] leading-tight text-md"> Pomodoro </h3>
      </div>
      <h3 className="text-zinc-700 absolute left-1/2 -translate-x-1/2">click and drag</h3>
      <div
        id="window-control-butttons"
        className="w-fit bg-transparent px-2 rounded-full text-[#010101] flex gap-2"
      >
        <button
          onClick={handleMinimize}
          id="traffic-light-btn minimize-btn"
          className="leading-none bg-[#28C941] rounded-full px-1 w-3 h-3 hover:bg-[#1d9730] focus:outline-none active:bg-[#006500]"
        ></button>

        <button
          onClick={handleMaximize}
          id="traffic-light-btn minimize-btn"
          className="leading-none bg-[#FFBD2E] rounded-full px-1 w-3 h-3 hover:bg-[#bf8e22] focus:outline-none active:bg-[#995700]"
        ></button>

        <button
          onClick={handleClose}
          id="traffic-light-btn minimize-btn"
          className="leading-none bg-[#FF6159] rounded-full px-1 w-3 h-3 hover:bg-[#bf4942] focus:outline-none active:bg-[#4d0000]"
        ></button>
      </div>
    </header>
  )
}


export default DraggableTopBar