import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    userid: "",
    passwd: "",
    name: "",
    phonenumber: "",
    userType: "User",
  });

  const [message, setMessage] = useState("");
  const BASE_URL = "http://15.164.228.111:8080"; // API 기본 경로

  // 입력값 변화 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 회원가입 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 사용자 ID, 비밀번호, 이름, 전화번호의 길이 검증 (최대 20자)
    if (
      formData.userid.length > 20 ||
      formData.passwd.length > 20 ||
      formData.name.length > 10 ||
      formData.phonenumber.length > 20
    ) {
      setMessage("입력값은 20자(이름은 10자)를 초과할 수 없습니다.");
      return;
    }

    try {
      // 회원가입 API 호출 (경로 수정)
      const response = await axios.post(`${BASE_URL}/user/regist`, {
        userid: formData.userid,
        password: formData.passwd,
        name: formData.name,
        phoneNumber: formData.phonenumber,
        userType: formData.userType,
      });
      setMessage("회원가입 성공!");
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "회원가입 실패");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">사용자 ID :</label>
          <input
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
            maxLength={20}
          />
        </div>
        <div className="input-group">
          <label className="label">비밀번호 :</label>
          <input
            type="password"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
            required
            maxLength={20}
          />
        </div>
        <div className="input-group">
          <label className="label">이름 :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={10}
          />
        </div>
        <div className="input-group">
          <label className="label">전화번호 :</label>
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            maxLength={20}
          />
        </div>
        <div className="input-group">
          <label className="label">사용자 유형 :</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && (
        <p className={`message ${message.includes("실패") ? "error" : ""}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
