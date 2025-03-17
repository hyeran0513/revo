import styled from "styled-components";
import { Link } from "react-router-dom";
import UserProfile from "../../components/mypage/UserProfile";
import { BiCloudUpload, BiBox } from "react-icons/bi";
import SubBanner from "../../components/base/SubBanner";

const Mypage = () => {
  return (
    <>
      {/* 서브 배너 */}
      <SubBanner text="마이페이지" />

      <MypageWrapper>
        {/* 유저 프로필 */}
        <UserProfile />

        {/* 메뉴 */}
        <Menu>
          {/* 상품 추가 */}
          <MenuItem>
            <Link to="/product/add">
              <BiBox />
              <MenuText>상품 추가</MenuText>
            </Link>
          </MenuItem>

          {/* 업로드한 상품 조회 */}
          <MenuItem>
            <Link to="/product/upload">
              <BiCloudUpload />
              <MenuText>업로드한 상품 조회</MenuText>
            </Link>
          </MenuItem>
        </Menu>
      </MypageWrapper>
    </>
  );
};

const MypageWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 500px;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
`;

const MenuItem = styled.li`
  padding: 16px;

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const MenuText = styled.div``;

export default Mypage;
