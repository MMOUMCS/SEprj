import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://15.164.228.111:8080"; // API 기본 경로

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 로그인 API 호출
      const response = await axios.post(`${BASE_URL}/user/sign-in`, formData);

      // 토큰 저장 (access 토큰)
      localStorage.setItem("jwtToken", response.data.token);

      // 성공 메시지 및 메인 페이지 이동
      setMessage("로그인 성공!");
      navigate("/main");
    } catch (error) {
      // 오류 처리
      setMessage(error.response?.data?.message || "로그인 실패");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">사용자 ID :</label>
          <input
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="label">비밀번호 :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {message && (
        <p className={`message ${message.includes("실패") ? "error" : ""}`}>
          {message}
        </p>
      )}

      <div className="links">
        <Link to="/signup" className="link">
          회원가입
        </Link>
        <Link to="/find-username" className="link">
          아이디 찾기
        </Link>
        <Link to="/find-password" className="link">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default Login;
