import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <RotatingLines
        visible
        height="56"
        width="56"
        strokeWidth="5"
        strokeColor="#9D7DC9"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        className="text-white stroke-white"
      />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  height: 500px;
`;

export default Loading;
