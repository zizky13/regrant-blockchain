import React, { useState, useEffect } from 'react';
import Defbar from '../component/Sidebar/Defbar';
import { Cards, DesktopCards } from '../component/Card/cards';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemLabel, setItemLabel] = useState('All');
  const [distance, setDistance] = useState('All');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleItemLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemLabel(event.target.value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDistance(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/borrow/${searchTerm}`);
    }
  };

  const handleAddClick = () => {
    console.log('Menambahkan item baru');
  };
  
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  
  

  return (
    <div className="flex flex-col min-h-screen">
      <Defbar />
          <div className="content flex-grow p-4 md:p-6">
            <div className="header-container mb-4 md:mb-6 text-center md:text-left max-w-full px-4 md:px-0">
              <p className="title font-bold mb-2 mt-6 text-[clamp(24px,5vw,70px)] leading-tight w-full md:w-auto">
                Offer, lend, borrow.
              </p>
              <p className="desc text-base md:text-lg text-gray-500 mt-2 md:mt-4 pr-0 md:pr-[15em] w-full md:w-auto">
                Discover what you desire in a whole new way! Barter your pre-loved items for something fresh, or buy and sell with ease and security.
              </p>
            </div>
      
            <div className="search-bar flex flex-wrap gap-2 md:gap-0 mb-4 md:mb-6">
              <input
                type="text"
                placeholder="Search an Item"
                className="border border-gray-300 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-md" onClick={handleSearchClick}>
                  Search
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={handleAddClick}>
                  Add
                </button>
              </div>
            </div>
      
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <select className="border border-gray-300 rounded-md px-4 py-2" value={itemLabel} onChange={handleItemLabelChange}>
                <option value="All">Item label: All</option>
              </select>
              <select className="border border-gray-300 rounded-md px-4 py-2" value={distance} onChange={handleDistanceChange}>
                <option value="All">Distance: All</option>
              </select>
            </div>
    

        <div className="block lg:hidden">
          <Cards />
        </div>
        <div className="hidden lg:block">
          <DesktopCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
