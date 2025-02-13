import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Defbar from './component/Sidebar/Defbar';
import { Cards, DesktopCards } from './component/Card/cards';
import Borrow from './pages/borrow';

const Home: React.FC = () => {
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

  return (
    <div className="content flex-grow p-4 md:p-6">
      <div className="header-container mb-4 md:mb-6 text-center md:text-left">
        <p className="title text-4xl md:text-[70px] font-bold mb-2 mt-10">Offer, lend, borrow.</p>
        <p className="desc text-lg md:text-xl text-gray-500 mt-2 md:mt-4 pr-0 md:pr-[15em]">
          Discover what you desire in a whole new way! Barter your pre-loved items for something fresh, or buy and sell with ease and security.
        </p>
      </div>

      <div className="search-bar flex flex-col md:flex-row gap-2 md:gap-0 mb-4 md:mb-6">
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

      <div className="flex flex-col md:flex-row gap-2 mb-4 md:mb-6">
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
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="dashboard flex flex-col md:flex-row bg-gray-100 min-h-screen">
        <Defbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/borrow/:itemLabel" element={<Borrow />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
