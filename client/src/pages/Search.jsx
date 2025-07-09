import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import dubaiListings from '../components/dubaiListings';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('all');
  const [offer, setOffer] = useState(false);
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    setLoading(true);
    let filtered = [...dubaiListings];

    // Query params
    const typeParam = searchParams.get('type');
    const offerParam = searchParams.get('offer');

    if (typeParam) setType(typeParam);
    if (offerParam === 'true') setOffer(true);

    // Filter from params
    if (typeParam && typeParam !== 'all') {
      filtered = filtered.filter((item) => item.type === typeParam);
    }

    if (offerParam === 'true') {
      filtered = filtered.filter((item) => item.offer === true);
    }

    setListings(filtered);
    setFilteredListings(filtered);
    setLoading(false);
  }, [searchParams]);

  const handleSearch = () => {
    let filtered = [...listings];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter((item) => item.type === type);
    }

    if (offer) {
      filtered = filtered.filter((item) => item.offer === true);
    }

    if (parking) {
      filtered = filtered.filter((item) => item.parking === true);
    }

    if (furnished) {
      filtered = filtered.filter((item) => item.furnished === true);
    }

    if (sort === 'price_desc') {
      filtered.sort((a, b) => b.regularPrice - a.regularPrice);
    } else if (sort === 'price_asc') {
      filtered.sort((a, b) => a.regularPrice - b.regularPrice);
    }

    setFilteredListings(filtered);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Search Filters</h1>

        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="font-medium">Type:</label>
            <select
              className="border p-2 rounded ml-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">Rent & Sale</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          <label>
            <input
              type="checkbox"
              checked={offer}
              onChange={(e) => setOffer(e.target.checked)}
              className="mr-1"
            />
            Offer
          </label>

          <label>
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="mr-1"
            />
            Parking
          </label>

          <label>
            <input
              type="checkbox"
              checked={furnished}
              onChange={(e) => setFurnished(e.target.checked)}
              className="mr-1"
            />
            Furnished
          </label>

          <div>
            <label className="font-medium">Sort:</label>
            <select
              className="border p-2 rounded ml-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest</option>
              <option value="price_asc">Price low to high</option>
              <option value="price_desc">Price high to low</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Listing Results:</h2>
        {loading ? (
          <p>Loading...</p>
        ) : filteredListings.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <ListingItem listing={listing} key={listing.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
