import React from "react";
import UserProfile from "../components/UserProfile";
import styled from "styled-components";

const Home = () => {
  return (
    <HomeWrapper>
      <UserProfile />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export default Home;
