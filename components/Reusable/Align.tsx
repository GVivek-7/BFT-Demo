import React from 'react'

interface AlignProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isFullScreen?: boolean
  isHeroContent?:boolean
  isMobileFullScreen?: boolean
  className?: string
}

const Align: React.FC<AlignProps> = ({ 
  children, 
  isFullScreen = false, 
  isMobileFullScreen=false,
  isHeroContent = true,
  className = '',
  ...props 
}) => {
  const baseClasses =
  isFullScreen && isHeroContent
    ? 'w-full md:px-[63px]'
    : isFullScreen
    ? 'w-full'
    : `xl:px-[80px] lg:px-[25px] md:px-5 px-8 mx-auto ${isMobileFullScreen ? 'px-0' : 'px-5'}`;


  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

export default Align