"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Apartment {
    id: number;
    title: string;
    description?: string;
    price: number;
    city: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    floor: number;
    sqft: number;
    image: string;
}

export default function ApartmentDetails({ id }: { id: number }) {
    const [apartment, setApartment] = useState<Apartment | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchApartment() {
            try {
                const res = await fetch(`http://localhost:4000/apartments/${id}`);
                if (!res.ok) throw new Error("Failed to fetch apartment");
                const data = await res.json();
                setApartment(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchApartment();
    }, [id]);

    if (!apartment) return <p>Loading apartment...</p>;

  return (
    <div className="apartment-details-container">
      <button
        className="btn btn-blue back-btn"
        onClick={() => router.push("/")}
      >
        ← Back to Listings
      </button>

      <div className="apartment-details">
        {apartment?.image && <img src={apartment.image} alt={apartment.title} />}
        <h1 className="apartment-title">{apartment?.title}</h1>
        <p className="apartment-meta">{apartment?.city}, {apartment?.address}</p>
        <p className="apartment-price">${apartment?.price.toLocaleString()}</p>
        {apartment?.description && <p className="apartment-desc">{apartment.description}</p>}

        <div className="details-grid">
          <p><strong>Bedrooms:</strong> {apartment?.bedrooms}</p>
          <p><strong>Bathrooms:</strong> {apartment?.bathrooms}</p>
          <p><strong>Floor:</strong> {apartment?.floor}</p>
          {apartment?.sqft && <p><strong>Sqft:</strong> {apartment.sqft}</p>}
        </div>
      </div>
    </div>
  );
}