import React from "react";
import MessageBox from "../../components/MessageBox";
import Button from "../../components/Button";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const { id } = useParams();

  console.log("chat" + id);

  return (
    <div>
      <Button
        type="button"
        onClick={() => navigate(`/product/${id}?type=${type}`)}
      >
        뒤로가기
      </Button>

      <MessageBox />
    </div>
  );
};

export default Chat;
