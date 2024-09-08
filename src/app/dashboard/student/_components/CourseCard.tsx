import Image from "next/image"
import courseImg from '../../../../../public/images/courseImg.png'
import { Button } from "@/components/ui/button"

const CourseCard = ({isActive=false}: {isActive?: boolean}) => {
  return (
    <div>
        <Image src={courseImg} alt="course image" className="w-full h-full" width={100} height={100} priority />
        <div className={`*:px-3 border border-gray-100 border-t-0 ${isActive? 'border-b-2  border-b-primary-500': ''}`}>
            <div className="py-2.5 border-b border-b-gray-100">
                <p className="text-sm">Course Title</p>
                <h6>{2}. Intruduction</h6>
            </div>
            {/* LECTURE CARD ACTIONS */}
            <div className="py-2.5">
                <div className={`${isActive && 'flex-between' } `}>
                    <Button size={'sm'} className={`hover:bg-primary-500 hover:text-white ${!isActive&& 'w-full'}`} variant={'secondaryPrimary'}>Watch lecture</Button>
                    {isActive && <div className="text-success-500 text-sm">61% Completed</div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCard