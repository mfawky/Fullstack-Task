"use client";

import { useState } from "react";
import axios from "axios";

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
  image: string; // just one image now
}

export default function CreateApartment({ onCreated }: { onCreated: (apt: Apartment) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    sqft: "",
    image: "", // single image URL
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      floor: parseInt(formData.floor),
      sqft: formData.sqft ? parseInt(formData.sqft) : null,
    };

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/apartments`, payload);
      onCreated(res.data);

      // reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        city: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        floor: "",
        sqft: "",
        image: "",
      });
    } catch (err) {
      console.error("Failed to create apartment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h2 className="form-title">Create New Apartment</h2>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
      <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
      <input type="number" name="floor" placeholder="Floor" value={formData.floor} onChange={handleChange} required />
      <input type="number" name="sqft" placeholder="Square feet" value={formData.sqft} onChange={handleChange} />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Apartment"}
      </button>
    </form>
  );
}