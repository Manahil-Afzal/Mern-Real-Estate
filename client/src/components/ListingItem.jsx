import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id || listing.id}`}>
        <div className='relative'>
          <img
            src={
              listing.imageUrls?.[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
          />
          {/* For Sale / Rent Badge */}
          <span
            className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${
              listing.type === 'rent' ? 'bg-green-600' : 'bg-blue-600'
            } text-white`}
          >
            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>

          {/* Location */}
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address || 'Dubai, UAE'}
            </p>
          </div>

          {/* Description */}
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>

          {/* Price */}
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice?.toLocaleString('en-US')
              : listing.regularPrice?.toLocaleString('en-US') || listing.price?.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>

          {/* Bed / Bath */}
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms || listing.beds || 0} {listing.bedrooms > 1 || listing.beds > 1 ? 'beds' : 'bed'}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms || listing.baths || 0} {listing.bathrooms > 1 || listing.baths > 1 ? 'baths' : 'bath'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
