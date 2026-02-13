import { products } from "../../data/landingData";

const NewArrivals = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-medium text-center mb-12">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover rounded"
              />
              <h3 className="mt-4 font-medium">{item.name}</h3>
              <p className="text-gold font-semibold mt-1">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
