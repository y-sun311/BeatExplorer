import React, { useState } from 'react';

function SearchArea() {
  const [searchType, setSearchType] = useState('flights'); // 'flights' or 'routes'

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  return (
    <div className="bg-gray-800 flex flex-col min-h-screen">
      <header className="text-white p-4 flex items-center justify-center space-x-8">
           <h1 className="text-xl cursor-pointer">Home</h1>
           <h1 className="text-xl cursor-pointer">About</h1>
    </header>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-green-100 to-green-400 text-transparent bg-clip-text">Flight Tracker App</h2>
          <div className="space-y-4">
          <div className="flex items-center justify-center "> 
              <label className="block text-2xl font-medium text-green-400 mb-1 mr-4" htmlFor="search-type">
                Search by
              </label>
              <select
                id="search-type"
                className="outline-none bg-transparent text-white p-2 border border-3 border-green-300 rounded-md"
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                <option value="flights">Flight</option>
                <option value="routes">Route</option>
              </select>
            </div>

            {searchType === 'flights' ? (
              <>
                <div>
                  <label className="block text-sm text-green-400 font-medium text-gray-700 mb-1" htmlFor="airline">
                    Airline
                  </label>
                  <input
                    type="text"
                    id="airline"
                    className="text-white outline-none bg-transparent w-full p-2 border border-green-400 rounded-md"
                    placeholder="Enter airline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1" htmlFor="flight-number">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    id="flight-number"
                    className="text-white outline-none bg-transparent w-full p-2 border border-3 border-green-400 rounded-md"
                    placeholder="Enter flight number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-1" htmlFor="flight-date">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="flight-date"
                    className="text-white w-full bg-transparent outline-none p-2 border border-3 border-green-400 rounded-md"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="text-green-400 block text-sm font-medium text-gray-700 mb-1" htmlFor="dep-airport">
                      Departure Airport
                    </label>
                    <input
                      type="text"
                      id="dep-airport"
                      className="outline-none text-white bg-transparent w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter departure airport"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-green-400 block text-sm font-medium text-gray-700 mb-1" htmlFor="arr-airport">
                      Arrival Airport
                    </label>
                    <input
                      type="text"
                      id="arr-airport"
                      className="outline-none text-white bg-transparent w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter arrival airport"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-green-400 block text-sm font-medium text-gray-700 mb-1" htmlFor="route-date">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="route-date"
                    className="outline-none text-white bg-transparent w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="text-green-400 block text-sm font-medium text-gray-700 mb-1" htmlFor="route-airline">
                    Airline
                  </label>
                  <input
                    type="text"
                    id="route-airline"
                    className="outline-none text-white bg-transparent focus:outline-green-300 w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter airline"
                  />
                </div>
              </>
            )}
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchArea;

