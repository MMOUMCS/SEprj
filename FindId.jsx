import React, { useState } from "react";
import axios from "axios";
import "./FindId.css";

const FindId = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const BASE_URL = "http://15.164.228.111:8080"; // API 기본 경로

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 아이디 찾기 요청
      const response = await axios.post(`${BASE_URL}/user/findUserid`, {
        name,
        phonenumber: phoneNumber,
      });

      // 서버에서 아이디를 찾은 경우, 아이디 출력
      if (response.data) {
        setMessage(`아이디 : ${response.data}`);
      } else {
        // 서버에서 응답이 없거나 잘못된 경우
        setMessage("잘못된 정보입니다.");
      }
    } catch (error) {
      // 오류 발생 시 "잘못된 정보입니다." 메시지 표시
      setMessage("잘못된 정보입니다.");
      console.error(error);
    }
  };

  return (
    <div className="find-id-container">
      <h2>아이디 찾기</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">이름 :</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label">전화번호 :</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">아이디 찾기</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FindId;
