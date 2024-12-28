import React from "react";

type Category = {
  _id: string;
  name: string;
};

type Props = {
  categories: Category[];
  onFilter: (categoryId: string | null) => void;
};

const CategoryList: React.FC<Props> = ({ categories, onFilter }) => (
  <div className="mb-4">
    <button
      onClick={() => onFilter(null)}
      className="px-4 py-2 rounded mr-2 mb-2 bg-sky-600 text-white hover:bg-sky-700"
    >
      All
    </button>
    {categories.map((category) => (
      <button
        key={category._id}
        onClick={() => onFilter(category._id)}
        className="px-4 py-2 rounded mr-2 mb-2 bg-sky-600 text-white hover:bg-sky-700"
      >
        {category.name}
      </button>
    ))}
  </div>
);

export default CategoryList;
