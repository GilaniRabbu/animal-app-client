import { useState } from "react";
import axios from "axios";

type Props = {
  onCategoryAdded: () => void;
};

const CategoryForm: React.FC<Props> = ({ onCategoryAdded }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
        name,
      });
      onCategoryAdded();
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-4 p-4 mb-4 rounded bg-slate-900"
    >
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Category Name"
        required
        className="rounded px-4 py-2 flex-1 min-w-[150px] outline-none text-slate-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
