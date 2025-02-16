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
    {
        id: 2,
        name: "Meja Kondangan",
        description: "Meja Kondangan",
        price: 150000,
        imageUrl: "https://example.com/laptop.jpg",
        seller: "Adinda",
        location: "Jakarta"
    },
    {
        id: 3,
        name: "Motor X56R",
        description: "Motor khusus ",
        price: 5500000,
        imageUrl: "https://example.com/laptop.jpg",
        seller: "RaceVRM",
        location: "Bandung"
    },
    
    
];

export default productData;
