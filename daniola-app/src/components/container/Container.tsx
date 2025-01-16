import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-[1rem]'>{children}</div>
  )
}

export default Container