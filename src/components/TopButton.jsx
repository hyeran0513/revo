import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiArrowToTop } from "react-icons/bi";

const Button = styled.button`
  position: fixed;
  right: 40px;
  bottom: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 5px 0 12px #0000001f;
  color: #333;
  opacity: 0;
  z-index: 100;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  svg {
    font-size: 24px;
  }
`;

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button show={showButton} onClick={scrollToTop}>
      <BiArrowToTop />
    </Button>
  );
};

export default TopButton;
