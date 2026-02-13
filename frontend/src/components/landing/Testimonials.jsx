import { testimonials } from "../../data/landingData";

const Testimonials = () => {
  return (
    <section className="bg-black text-white py-20 px-6">
      <h2 className="text-3xl font-medium text-center mb-12">
        What Our Customers Say
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="border border-gray-700 p-6 rounded-lg"
          >
            <p className="text-gray-300 italic">
              “{t.review}”
            </p>
            <h4 className="mt-4 text-gold font-medium">
              — {t.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
