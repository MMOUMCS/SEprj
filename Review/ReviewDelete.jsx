import React from "react";
import axios from "axios";

const ReviewDelete = ({ reviewid, fetchReviews }) => {
  const handleDeleteReview = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(
        `http://15.164.228.111:8080/review/delete?reviewid=${reviewid}`, // 리뷰 삭제 API 엔드포인트
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReviews(); // 리뷰 목록 갱신
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="review-delete-container">
      <button onClick={handleDeleteReview}>삭제</button>
    </div>
  );
};

export default ReviewDelete;
