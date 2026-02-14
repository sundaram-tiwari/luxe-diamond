import { categories } from "../../data/dummyData";

const Categories = () => {
  return (
    <section className="category-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Shop By Category
        </h2>

        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.id} className="col-md-3 col-6">
              <div className="category-img text-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="img-fluid"
                />
                <h5 className="mt-3">{cat.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
