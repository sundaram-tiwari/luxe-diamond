import { categories } from "../../data/landingData";

const Categories = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-12">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-48 w-full object-cover group-hover:scale-105 transition"
            />
            <h3 className="text-center mt-4 font-medium">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
