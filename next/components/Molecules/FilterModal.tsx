import { CloseIcon } from '@assets/icons'
import Button from '@modules/common/Button'
import { ReactNode } from 'react'

interface FilterModalProps {
  onClose: () => void
  title: ReactNode
  children: ReactNode
}

export const FilterModal = ({ onClose, children, title }: FilterModalProps) => {
  // TODO: Use useLockedBody
  return (
    <div className="fixed inset-x-0 top-0 z-30 m-auto flex h-screen max-w-[1180px] flex-col overflow-auto border-border-dark bg-white">
      <div className="flex h-[61px] shrink-0 items-center justify-between border-b border-border-dark px-3">
        <div>{title}</div>
        {/* TODO ARIA: add aria label */}
        <Button variant="unstyled" onPress={onClose}>
          <CloseIcon />
        </Button>
      </div>
      {children}
    </div>
  )
}
