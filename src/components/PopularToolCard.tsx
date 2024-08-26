import { formateNumber } from "@/helpers"



const PopularToolCard = () => {
  return (
    <div className="ring-1 ring-gray-100 hover:ring-0 group  hover:shadow-lg p-5 flex-center flex-col">
        <h4 className="text-gray-800 group-hover:!text-primary-500">{'HTML 5'}</h4>
        <p>{formateNumber(2323)} Courses</p>
    </div>
  )
}

export default PopularToolCard