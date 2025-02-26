import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { BiSend } from "react-icons/bi";

const MessageForm = ({ scroll, receivedId, productId }) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("메세지가 유효하지 않습니다.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: message,
      createdAt: serverTimestamp(),
      productId,
      receivedId,
      senderId: user.uid,
    });

    setMessage("");

    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)}>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <BiSend />
        <span>전송</span>
      </button>
    </form>
  );
};

export default MessageForm;
