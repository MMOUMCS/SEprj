import React, { useState } from "react";
import axios from "axios";
import "./ReviewEdit.css";

const ReviewEdit = ({ review, fetchReviews, closeEditForm }) => {
  const [rating, setRating] = useState(review.rating);
  const [contents, setContents] = useState(review.contents);
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
        "http://15.164.228.111:8080/review/add", // POST 요청으로 변경
        { productid: review.productid, rating, contents },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("리뷰가 성공적으로 수정되었습니다.");
      fetchReviews(); // 리뷰 목록 갱신
      closeEditForm(); // 수정 폼 닫기
    } catch (error) {
      console.error(error);
      setMessage("리뷰 수정 실패.");
    }
  };

  return (
    <div className="review-edit-container">
      <h2>리뷰 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>평점 (1~5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>내용:</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">수정</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ReviewEdit;
