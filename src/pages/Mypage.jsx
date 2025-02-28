import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";

const Mypage = () => {
  return (
    <MypageWrapper>
      <UserProfile />

      <Menu>
        <MenuItem>
          <Link to="/product/add">상품 추가</Link>
        </MenuItem>

        <MenuItem>
          <Link to="/product/upload">업로드한 상품 조회</Link>
        </MenuItem>
      </Menu>
    </MypageWrapper>
  );
};

const MypageWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 500px;
  border: 1px solid #d7d7d7;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.li``;

export default Mypage;
