"use client";
import React, { Suspense, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Carousel.module.css"; // Agrega tus estilos aquí
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import required modules
import { Navigation, Pagination } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Skeleton from "@mui/material/Skeleton";
// Lazy-load ProductCard
import ProductCard from "./ProductCard";
const LazyProductCard = React.lazy(() => import("./ProductCard"));

export default function Carousel({ products, carouselId }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={styles.mainContainer}>
      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className={`custom-prev-${carouselId} ${styles.navigationButton}`}
      >
        <ArrowCircleLeftIcon fontSize="large" />
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={Math.min(products.length, 1)} // Ajusta dinámicamente slidesPerView
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        lazy="true"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          630: {
            slidesPerView: Math.min(products.length, 2),
          },
          930: {
            slidesPerView: Math.min(products.length, 3),
          },
          990: {
            slidesPerView: Math.min(products.length, 3),
            pagination: false,
          },
          1320: {
            slidesPerView: Math.min(products.length, 4),
            pagination: false,
          },
          1615: {
            slidesPerView: Math.min(products.length, 5),
            pagination: false,
          },
          1960: {
            slidesPerView: Math.min(products.length, 6),
            pagination: false,
          },
        }}
        style={{ padding: "1em" }}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {/* Suspense Wrapper for Lazy-Loaded Components */}
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Suspense
              key={index}
              fallback={<Skeleton height="330px" width="100%" />}
            >
              <ProductCard product={product} />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={nextRef}
        className={`custom-next-${carouselId} ${styles.navigationButton}`}
      >
        <ArrowCircleRightIcon fontSize="large" />
      </button>
    </div>
  );
}
