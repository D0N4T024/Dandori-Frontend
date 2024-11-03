"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Carousel.module.css'; // Agrega tus estilos aquí
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Carousel( { products, carouselId }){
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className={styles.mainContainer}>
            <button ref={prevRef} className={`custom-prev-${carouselId} ${styles.navigationButton}`}>
                <ArrowCircleLeftIcon fontSize="large" />
            </button>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                // slidesPerView={'auto'}
                slidesPerView= {4}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                lazy
                pagination={{
                    clickable: true,
                    dynamicBullets: true, }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    630: {
                        slidesPerView: 2,
                    },
                    930: {
                        slidesPerView: 3,
                        },
                    1320: {
                        slidesPerView: 4,
                        },
                    1615: {
                        slidesPerView: 5,
                        },
                    1960: {
                        slidesPerView: 6,
                        },
                    // 1024: {
                    // slidesPerView:'auto',
                    // },
                }}
                // loop
                style={{ padding: "1em" }}
                onSwiper={(swiper) => {
                    // Asignar las referencias de los botones a Swiper después de la inicialización
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <ProductCard product={product}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button ref={nextRef} className={`custom-next-${carouselId} ${styles.navigationButton}`}>
                <ArrowCircleRightIcon fontSize="large" />
            </button>
        </div>
    )
}