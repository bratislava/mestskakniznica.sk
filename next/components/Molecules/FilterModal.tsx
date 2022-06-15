import { useEffect, useState } from 'react'

interface FilterModalProps {
  onClose: () => void
  title: React.ReactNode
  children: React.ReactNode
}

export const FilterModal = ({ onClose, children, title }: FilterModalProps) => {
  return (
    <div className="m-auto max-w-1180 fixed bg-white h-screen inset-x-0 top-0 z-30 border-gray-900 overflow-auto">
      <div className="flex justify-between items-center border-b h-[61px] border-gray-900 px-3">
        <div>{title}</div>
        <button onClick={onClose}>X</button>
      </div>
      {children}
    </div>
  )
}
