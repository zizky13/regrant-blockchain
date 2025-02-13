import React from 'react';
import { useNavigate } from 'react-router-dom';
import productData from '../../productData';


const Cards = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productData.map((product) => (
                <div key={product.id} className="border rounded-md shadow-sm relative bg-white flex flex-col h-full">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-md" />
                    <div className="p-4 flex flex-col flex-grow">
                        <p className="font-bold text-lg mb-1">{product.name}</p>
                        <p className="text-sm text-gray-500 mb-4">{product.location}</p>
                        <div className="mt-auto">
                            <button
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded-md"
                                onClick={() => navigate(`/borrow/${product.id}`)}
                            >
                                Borrow
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const DesktopCards = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-4 gap-6 hidden lg:grid">
            {productData.map((product) => (
                <div key={product.id} className="border rounded-md shadow-sm relative flex flex-col h-full">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-md" />
                    <div className="p-4 flex flex-col flex-grow">
                        <p className="font-bold text-lg mb-1">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.location}</p>
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-md mt-auto w-full"
                            onClick={() => navigate(`/borrow/${product.id}`)}
                        >
                            Borrow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export { Cards, DesktopCards };
