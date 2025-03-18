import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import styled from "styled-components";

const SwiperComponent = ({ products }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      swiperInstance.on("slideChange", () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
      });
    }
  }, [swiperRef.current]);

  const handlePrev = () => {
    if (!isBeginning) swiperRef.current.swiper.slidePrev();
  };

  const handleNext = () => {
    if (!isEnd) swiperRef.current.swiper.slideNext();
  };

  return (
    <SwiperWrapper>
      <Swiper
        ref={swiperRef}
        spaceBetween={16}
        slidesPerView={4}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = { swiper };
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          swiper.on("slideChange", () => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          });
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} type={product.category} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperButton
        type="button"
        $left={true}
        onClick={handlePrev}
        disabled={isBeginning}
      >
        <BiChevronLeft />
      </SwiperButton>

      <SwiperButton
        type="button"
        $right={true}
        onClick={handleNext}
        disabled={isEnd}
      >
        <BiChevronRight />
      </SwiperButton>
    </SwiperWrapper>
  );
};

const SwiperWrapper = styled.div`
  position: relative;
`;

const SwiperButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.$left ? "left: -20px;" : "right: -20px;")};
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);

  svg {
    font-size: 24px;
  }

  &:disabled {
    display: none;
  }
`;

export default SwiperComponent;
