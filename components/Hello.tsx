import React from 'react'

type HelloProps = {
    title: string;
}

export default function Hello({title}: HelloProps) {
  return (
    <div>
          <h2 className='text-3xl sm:text-4xl md:text-5xl tracking-wide font-extrabold'>{ title }</h2>
    </div>
  )
}
