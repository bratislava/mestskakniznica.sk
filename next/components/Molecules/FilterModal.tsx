import { useEffect, useState } from 'react'

interface FilterModalProps {
  onClose: () => void
  title: React.ReactNode
  children: React.ReactNode
}

export const FilterModal = ({ onClose, children, title }: FilterModalProps) => {
  return (
    <div className="max-w-1180 fixed inset-x-0 top-0 z-30 m-auto h-screen overflow-auto border-gray-900 bg-white">
      <div className="flex h-[61px] items-center justify-between border-b border-gray-900 px-3">
        <div>{title}</div>
        <button onClick={onClose}>X</button>
      </div>
      {children}
    </div>
  )
}
