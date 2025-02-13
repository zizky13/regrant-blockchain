// productData.ts
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    seller: string;
    location: string;
}

const productData: Product[] = [
    {
        id: 1,
        name: "Laptop",
        description: "Laptop gaming terbaru",
        price: 15000000,
        imageUrl: "https://example.com/laptop.jpg",
        seller: "Toko Elektronik",
        location: "Jakarta"
    },
    // Tambahkan produk lainnya...
];

export default productData;
