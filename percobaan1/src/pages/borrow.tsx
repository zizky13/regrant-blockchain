import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productData, { Product } from '../productData'; // Import data produk

interface User {
    name: string;
}

const Borrow: React.FC = () => {
    const { productId } = useParams<{ productId?: string }>(); // productId bisa undefined
    const [product, setProduct] = useState<Product | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isBorrowed, setIsBorrowed] = useState(false);

    useEffect(() => {
        if (!productId) {
            console.error("Product ID is missing");
            return;
        }

        const foundProduct = productData.find((p: Product) => p.id === parseInt(productId, 10));

        if (!foundProduct) {
            console.error("Product not found");
            return;
        }

        setProduct(foundProduct);

        // Mock user data (replace with actual user fetching logic)
        const mockUser: User = { name: "John Doe" };
        setUser(mockUser);
    }, [productId]);

    const handleBorrow = () => {
        if (product && user) {
            setIsBorrowed(true);
        }
    };

    if (!product || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>

            <h2>Detail Peminjam</h2>
            <p>Nama: {user.name}</p>

            {!isBorrowed ? (
                <button onClick={handleBorrow}>Pinjam</button>
            ) : (
                <p>Barang ini sudah dipinjam.</p>
            )}
        </div>
    );
};

export default Borrow;
