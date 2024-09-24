import React from 'react'
import SocialSettingsForm from '../_components/SocialSettingsForm'

const InstructorSettingsPage = () => {

  return (
    <section className="py-5">
      <div className="space-y-8 lg:space-y-5 *:bg-white *:rounded-sm">
        <div></div>
        <div>
          <SocialSettingsForm />
        </div>
        <div className='grid lg:grid-cols-2'>
          <div></div>
          <div></div>
        </div>
        </div>
        </section>
  )
}

export default InstructorSettingsPage