import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import {Link} from "react-router-dom";

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

              <div className="hero-overlay"></div>

              <div className="hero-content text-center text-white">
                <h2 className="section-title mb-4">{slide.title}</h2>
                <p className="mb-4">{slide.subtitle}</p>
                <Link to="product/Rings">
                  <button className="btn btn-light px-5 py-2">Shop Now</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
