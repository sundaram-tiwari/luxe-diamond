import { testimonials } from "../../data/dummyData";

const Testimonials = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Testimonials
        </h2>

        <div className="row justify-content-center">
          {testimonials.map((item) => (
            <div key={item.id} className="col-md-6 mb-4">
              <div className="p-4 border text-center bg-white">
                <p className="mb-3">
                  "{item.review}"
                </p>
                <h6 className="fw-bold mb-0">
                  {item.name}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
