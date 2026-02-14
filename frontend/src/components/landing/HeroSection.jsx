// const HeroSection = () => {
//   return (
//     <section className="banner-section position-relative">
//       <div className="text-center text-white position-absolute top-50 start-50 translate-middle z-2">
//         <h2 className="section-title mb-4">Exquisite Designer Rings</h2>
//         <p className="mb-4">
//           Discover handcrafted luxury jewellery made to perfection.
//         </p>
//         <button className="btn btn-dark px-5 py-2">
//           Shop Now
//         </button>
//       </div>

//       <img
//         src="/assets/img/slider-1.png"
//         alt="banner"
//         className="img-fluid w-100"
//         style={{ height: "80vh", objectFit: "cover" }}
//       />
//     </section>
//   );
// };
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "Exquisite Designer Rings",
      subtitle: "Discover handcrafted luxury jewellery made to perfection.",
      image: "/assets/img/slider-1.png",
    },
    {
      id: 2,
      title: "Timeless Diamond Collection",
      subtitle: "Elegant pieces crafted with brilliance and love.",
      image: "/assets/img/slider-2.webp",
    },
  ];

  return (
    <section className="hero-section position-relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="position-relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-100"
                style={{
                  height: "85vh",
                  objectFit: "cover",
                }}
              />

              {/* Overlay */}
              <div className="hero-overlay"></div>

              {/* Content */}
              <div className="hero-content text-center text-white">
                <h2 className="section-title mb-4">
                  {slide.title}
                </h2>
                <p className="mb-4">
                  {slide.subtitle}
                </p>
                <button className="btn btn-light px-5 py-2">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
