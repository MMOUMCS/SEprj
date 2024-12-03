import React, { useState } from "react";
import axios from "axios";
import "./ReviewAdd.css"; // 외부 스타일시트 추가

const ReviewAdd = () => {
  const [rating, setRating] = useState("");
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
      setMessage("평점은 1~5 사이의 자연수여야 합니다.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post(
        "http://15.164.228.111:8080/review/add",
        { rating, contents },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("리뷰가 성공적으로 등록되었습니다.");
      setRating("");
      setContents("");
    } catch (error) {
      console.error(error);
      setMessage("리뷰 등록 실패.");
    }
  };

  return (
    <div className="review-container">
      <h2>리뷰 등록</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>평점 (1~5) :</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>내용 :</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          />
        </div>

        <button type="submit">등록</button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("성공") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ReviewAdd;
