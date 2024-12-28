import { useState } from "react";
import axios from "axios";

type Category = {
  _id: string;
  name: string;
};

type Props = {
  categories: Category[];
  onAnimalAdded: () => void;
};

const AnimalForm: React.FC<Props> = ({ categories, onAnimalAdded }) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/animals`, {
        name,
        category,
        imageUrl,
      });
      onAnimalAdded();
      setName("");
      setCategory("");
      setImageUrl("");
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
        placeholder="Enter Animal Name"
        required
        className="rounded px-4 py-2 flex-1 min-w-[150px] outline-none text-slate-900"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="rounded px-4 py-2 flex-1 min-w-[150px] text-slate-900"
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter Image URL"
        required
        className="rounded px-4 py-2 flex-1 min-w-[150px] outline-none text-slate-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Animal
      </button>
    </form>
  );
};

export default AnimalForm;
