import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import dubaiListings from '../components/dubaiListings';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [showListings, setShowListings] = useState(false);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    setOfferListings(dubaiListings.filter((item) => item.offer).slice(0, 4));
    setRentListings(dubaiListings.filter((item) => item.type === 'rent').slice(0, 4));
    setSaleListings(dubaiListings.filter((item) => item.type === 'sale').slice(0, 4));
  }, []);

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <button
          onClick={() => setShowListings(true)}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline w-fit'
        >
          Let's get started...
        </button>
      </div>

      {/* show search + swiper + listings only when user clicks */}
      {showListings && (
        <>
          {/* search bar & filter UI */}
          <div className='max-w-6xl mx-auto p-4 bg-white rounded shadow mb-6'>
            <input
              type='text'
              placeholder='Search...'
              className='border p-2 w-full mb-4 rounded'
            />
            <div className='flex flex-wrap gap-4 text-sm'>
              <div>
                <label className='font-semibold'>Type:</label>
                <select className='border ml-2 p-1 rounded'>
                  <option>Sale & Rent</option>
                  <option>Rent</option>
                  <option>Sale</option>
                  <option>Offer</option>
                </select>
              </div>
              <div>
                <label className='font-semibold'>Amenities:</label>
                <label className='ml-2'><input type='checkbox' /> Parking</label>
                <label className='ml-2'><input type='checkbox' /> Furnished</label>
              </div>
              <div>
                <label className='font-semibold'>Sort:</label>
                <select className='border ml-2 p-1 rounded'>
                  <option>Latest</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
              <button className='bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800'>
                Search
              </button>
            </div>
          </div>

          {/* swiper */}
          <Swiper navigation>
            {offerListings &&
              offerListings.map((listing) => (
                <SwiperSlide key={listing.id}>
                  <div
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                    className='h-[500px]'
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* listing results */}
          <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {offerListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                    Show more offers
                  </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing.id} />
                  ))}
                </div>
              </div>
            )}

            {rentListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                    Show more places for rent
                  </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing.id} />
                  ))}
                </div>
              </div>
            )}

            {saleListings.length > 0 && (
              <div>
                <div className='my-3'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                    Show more places for sale
                  </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
