import cx from 'classnames'

export interface IPartnerSkeletonProps {
  featured?: boolean
}

export const PartnerSkeleton = ({ featured = false }: IPartnerSkeletonProps) => {
  return (
    <div
      className={cx('flex w-full animate-pulse bg-[#ccc] p-4 lg:p-5', {
        'min-h-[199px] flex-col items-center justify-end': featured,
        'min-h-[66px] flex-row justify-between': !featured,
      })}
    />
  )
}

export default PartnerSkeleton
