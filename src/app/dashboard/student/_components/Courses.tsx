import React from 'react'
import Filters from './Filters'
import CourseCard from './CourseCard'
import Paginate from '@/components/Pagination'

const Courses = () => {
  return (
    <div className="space-y-9 *:space-y-5">
      <div className='*:px-5'>
        <h3 >Courses <span className='text-xl'>(323)</span></h3>
        <Filters />

        <ul className='grid sm:grid-cols-2 gap-x-4 lg:grid-cols-3 xl:grid-cols-4 gap-y-5'>
          <CourseCard isActive={false} />
          <CourseCard isActive={true} />
          <CourseCard isActive={false} />
          <CourseCard isActive={false} />
          <CourseCard isActive={true} />
          <CourseCard isActive={false} />
          <CourseCard isActive={true} />
        </ul>

        <div className='py-4'>
          <Paginate />
        </div>
      </div>
    </div>
  )
}

export default Courses