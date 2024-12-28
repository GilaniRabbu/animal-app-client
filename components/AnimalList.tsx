type Animal = {
  _id: string;
  name: string;
  imageUrl: string;
  category: {
    name: string;
  };
};

type Props = {
  animals: Animal[];
};

const AnimalList: React.FC<Props> = ({ animals }) => (
  <ul className="flex justify-start flex-wrap gap-4">
    {animals.map((animal) => (
      <li key={animal._id} className="p-4 rounded bg-white shadow-md w-60">
        <img
          src={animal.imageUrl}
          alt={animal.name}
          width={48}
          className="mx-auto block"
        />
        <p className="font-medium text-center mt-4 text-slate-900">
          {animal.name} - {animal.category.name}
        </p>
      </li>
    ))}
  </ul>
);

export default AnimalList;
