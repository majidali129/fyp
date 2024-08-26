
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import PopularToolCard from "./PopularToolCard"

const items = [1,2,3,4,5,6,7,8,9]

function ReusableCarousal() {
  return (
    <Carousel orientation="horizontal">
      <CarouselContent className=" " >
        {
            items.map(item => (
              <CarouselItem key={item} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                <PopularToolCard  />
              </CarouselItem>
            ))
        }
      </CarouselContent>
      <div className="right-0 absolute -top-2 me-7 w-fit ">
      <CarouselPrevious className=" text-black right-0 focus:text-primary-500 border-none " />
      <CarouselNext className=" text-black left-0 focus:text-primary-500 border-none" />
      </div>
    </Carousel>
  )
}


export default ReusableCarousal