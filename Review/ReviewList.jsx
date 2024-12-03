import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ReviewList.css"; // CSS 파일 로드
import ReviewAdd from "./ReviewAdd"; // ReviewAdd 컴포넌트 추가

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [isAddReviewVisible, setIsAddReviewVisible] = useState(false); // 리뷰 등록 창을 보일지 말지 상태 관리

  // 리뷰 목록을 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.post(
        "http://15.164.228.111:8080/review/add",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.error("리뷰 목록을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    fetchReviews(); // 초기 렌더링 시 리뷰 목록 가져오기
  }, []);

  // 리뷰 등록 창을 보이게 하는 함수
  const handleAddReviewClick = () => {
    setIsAddReviewVisible(true);
  };

  return (
    <div className="review-list-container">
      <h1>리뷰 목록</h1>
      {reviews.map((review) => (
        <div className="review-item" key={review.id}>
          <p>평점 : {review.rating}</p>
          <p>내용 : {review.contents}</p>
          <div className="button-container">
            <Link to={`/edit/${review.id}`}>
              <button>수정</button>
            </Link>
            <Link to={`/delete/${review.id}`}>
              <button>삭제</button>
            </Link>
          </div>
        </div>
      ))}

      {/* 리뷰 추가 버튼을 클릭하면 등록 창이 보이도록 */}
      <button onClick={handleAddReviewClick}>등록</button>

      {/* 등록 창이 보이도록 설정 */}
      {isAddReviewVisible && <ReviewAdd fetchReviews={fetchReviews} />}
    </div>
  );
};

export default ReviewList;
