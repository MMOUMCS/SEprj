import React, { useState } from "react";
import axios from "axios";
import "./FindPassword.css";

const FindPassword = () => {
  const [userid, setUserid] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const BASE_URL = "http://15.164.228.111:8080"; // API 기본 경로

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 비밀번호 찾기 요청
      const response = await axios.post(`${BASE_URL}/user/findPassword`, {
        userid,
        name,
        phonenumber: phoneNumber,
      });

      // 서버에서 비밀번호를 찾은 경우, 비밀번호 출력
      if (response.data) {
        setMessage(`비밀번호 : ${response.data}`);
      } else {
        // 서버에서 비밀번호를 찾을 수 없을 때
        setMessage("잘못된 정보입니다.");
      }
    } catch (error) {
      // 오류 발생 시 "잘못된 정보입니다." 메시지 처리
      setMessage("잘못된 정보입니다.");
      console.error(error);
    }
  };

  return (
    <div className="find-password-container">
      <h2>비밀번호 찾기</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">사용자 ID :</label>
          <input
            type="text"
            name="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">비밀번호 찾기</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default FindPassword;
