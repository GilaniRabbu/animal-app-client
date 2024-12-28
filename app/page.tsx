"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "@/components/CategoryForm";
import AnimalForm from "@/components/AnimalForm";
import CategoryList from "@/components/CategoryList";
import AnimalList from "@/components/AnimalList";

type Category = {
  _id: string;
  name: string;
};

type Animal = {
  _id: string;
  name: string;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
};

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
      );
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnimals = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/animals`
      );
      setAnimals(data);
      setFilteredAnimals(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilter = (categoryId: string | null) => {
    if (!categoryId) {
      setFilteredAnimals(animals);
    } else {
      setFilteredAnimals(
        animals.filter((animal) => animal.category._id === categoryId)
      );
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAnimals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl mb-4 text-white">Animal App</h1>
      <CategoryForm onCategoryAdded={fetchCategories} />
      <AnimalForm categories={categories} onAnimalAdded={fetchAnimals} />
      <CategoryList categories={categories} onFilter={handleFilter} />
      <AnimalList animals={filteredAnimals} />
    </div>
  );
};

export default Home;
