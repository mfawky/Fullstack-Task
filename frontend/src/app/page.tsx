"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import CreateApartment from "@/components/CreateApartment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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
  sqft?: number;
  image?: string; // backend has single image string
}

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    q: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/apartments`, {
        params: Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== "")
        ),
      });
      setApartments(data);
    } catch (err) {
      console.error("Failed to fetch apartments", err);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Apartments</h1>

      <div className="button-group">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="btn btn-blue"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="btn btn-green"
        >
          {showCreateForm ? "Hide Create Form" : "Create Apartment"}
        </button>
      </div>

      {showFilters && (
        <div className="filters-grid">
          <input
            type="text"
            name="q"
            placeholder="Search..."
            value={filters.q}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={filters.city}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={filters.bathrooms}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
      )}

      {showCreateForm && (
        <div className="form-wrapper">
          <CreateApartment
            onCreated={(apt) => setApartments((prev) => [apt, ...prev])}
          />
        </div>
      )}

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : apartments.length === 0 ? (
        <p className="no-data-text">No apartments found</p>
      ) : (
        <div className="apartments-grid">
          {apartments.map((apt) => (
            <Link key={apt.id} href={`/apartments/${apt.id}`}>
              <div className="apartment-card">
                {apt.image && (
                  <img
                    src={apt.image}
                    alt={apt.title}
                    className="apartment-img"
                  />
                )}
                <div className="apartment-content">
                  <h2 className="apartment-title">{apt.title}</h2>
                  <p className="apartment-meta">
                    {apt.city}, {apt.address}
                  </p>
                  <p className="apartment-meta">
                    {apt.bedrooms} bd | {apt.bathrooms} ba | {apt.floor} floor
                  </p>
                  {apt.sqft && <p className="apartment-meta">{apt.sqft} sqft</p>}
                  <p className="apartment-price">
                    ${apt.price.toLocaleString()}
                  </p>
                  {apt.description && (
                    <p className="apartment-desc">{apt.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}