import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import CarCard from '../components/CarCard';
import { useCars } from '../context/CarContext';

export default function Dashboard() {
  const { cars } = useCars();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    location: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique locations for the filter dropdown
  const locations = useMemo(() => {
    const uniqueLocations = new Set(cars.map(car => car.location));
    return Array.from(uniqueLocations);
  }, [cars]);

  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = 
        searchTerm === '' ||
        `${car.make} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        (!filters.minPrice || car.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || car.price <= parseInt(filters.maxPrice));

      const matchesYear =
        (!filters.minYear || car.year >= parseInt(filters.minYear)) &&
        (!filters.maxYear || car.year <= parseInt(filters.maxYear));

      const matchesLocation =
        !filters.location || car.location === filters.location;

      return matchesSearch && matchesPrice && matchesYear && matchesLocation;
    });
  }, [cars, searchTerm, filters]);

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      location: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Available Cars</h1>

        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by make, model, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                showFilters
                  ? 'bg-yellow-500 text-white border-yellow-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Price Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Price Range (₹)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="From"
                      value={filters.minYear}
                      onChange={(e) => setFilters(prev => ({ ...prev, minYear: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="To"
                      value={filters.maxYear}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxYear: e.target.value }))}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="mt-4 text-sm text-gray-600 hover:text-yellow-600"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}