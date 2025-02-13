import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    seller: string;
    location: string;
  }

  interface Props {
    products: Product[];
    onBorrow: (productId: number) => void;
  }

const products: React.FC<Props> = ({ products, onBorrow }) => {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-md shadow-sm relative">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-md" />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.location}</p>
            <button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded-md mt-2 absolute bottom-4 right-4"
              onClick={() => onBorrow(product.id)}
            >
              Borrow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default products;