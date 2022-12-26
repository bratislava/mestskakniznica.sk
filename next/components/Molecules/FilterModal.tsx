import Button from '@modules/common/Button'
import { ReactNode } from 'react'

interface FilterModalProps {
  onClose: () => void
  title: ReactNode
  children: ReactNode
}

export const FilterModal = ({ onClose, children, title }: FilterModalProps) => {
  return (
    <div className="fixed inset-x-0 top-0 z-30 m-auto h-screen max-w-[1180px] overflow-auto border-border-dark bg-white">
      <div className="flex h-[61px] items-center justify-between border-b border-border-dark px-3">
        <div>{title}</div>
        {/* TODO ARIA: add aria label */}
        <Button variant="unstyled" onPress={onClose}>
          X
        </Button>
      </div>
      {children}
    </div>
  )
}
