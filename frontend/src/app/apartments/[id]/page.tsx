"use client";

import { useParams } from "next/navigation";
import ApartmentDetails from "@/components/ApartmentDetails";

export default function ApartmentPage() {
  const { id } = useParams();

  if (!id) return <p>No apartment selected</p>;

  return <ApartmentDetails id={Number(id)} />;
}