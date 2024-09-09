import React from 'react'
import CourseCard from './CourseCard'
import Paginate from '@/components/Pagination'
import InstructorCard from '@/components/InstructorCard'

const instructor =  {
  name: "Darrell Steward",
  field: "Digital Product Designer",
  students: 3232,
  rating: 4.8,
  image: "/public/images/instructor2.png"
}
const Teachers = () => {
  return (
    <div className="space-y-9 *:space-y-5">
      <div className='*:px-5'>
        <h3>Instructors <span className='text-xl'>(323)</span></h3>
        <ul className='grid sm:grid-cols-2 gap-x-4 lg:grid-cols-3 xl:grid-cols-4 gap-y-5'>
          <InstructorCard instructor={{...instructor, isHired: true}}/>
          <InstructorCard instructor={{...instructor, isHired: true}}/>
          <InstructorCard instructor={{...instructor, isHired: true}}/>
          <InstructorCard instructor={{...instructor, isHired: true}}/>
        </ul>
      </div>
    </div>
  )
}

export default Teachers