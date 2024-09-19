import React from 'react'
import { useToggle } from './_components/NavToggleContext'
import ContentWrapper from './_components/ContentWrapper'

const InstructorHomePage = () => {
  return (
    <section className='py-5'>
      {/* <ContentWrapper> */}
      <div className='min-h-screen '>
        {/* STATS */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 *:h-14 *:bg-white'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* </ContentWrapper> */}
    </section>
  )
}

export default InstructorHomePage