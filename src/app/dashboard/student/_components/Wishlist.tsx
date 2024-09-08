
import WishListCard from './WishlistCard';


const Wishlist = () => {
  return (
    <div className="space-y-9 *:space-y-5">
      <div >
        <h3>Wishlist <span className='text-xl'>(323)</span></h3>
        <div className=' border border-gray-100'>
          <div className='grid lg:grid-cols-[3fr_1fr_2fr] py-2 gap-x-4  border-b border-b-gray-100 px-5'>
            <div>Course</div>
            <div>Price</div>
            <div>Action</div>
          </div>
          <div className='px-5'>
            {/* WISHLIST */}
            <ul>
              <WishListCard />
              <WishListCard />
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Wishlist


