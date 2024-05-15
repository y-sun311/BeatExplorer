 import React, { useState } from 'react';   
    
    
    
 function searchArea() {
    return (
    
 <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Flight Tracker</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="flight-number">
              Search by Flight Number
            </label>
            <input
              type="text"
              id="flight-number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter flight number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="flight-date">
              Select Date
            </label>
            <input
              type="date"
              id="flight-date"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="airport">
              Enter Airport
            </label>
            <input
              type="text"
              id="airport"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter airport"
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </div>
        
 );
}

export default searchArea;