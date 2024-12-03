import React, { useState, useEffect } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [originalData, setOriginalData] = useState({
    name: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userid: "",
    name: "",
    user_type: "",
    phoneNumber: "",
  });

  const [recentVisits, setRecentVisits] = useState([]); // 최근 방문 기록
  const [reviews, setReviews] = useState([]); // 사용자가 등록한 리뷰

  const serverAddress = "http://15.164.228.111"; // 서버 주소

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 데이터 가져오기
        const userResponse = await fetch(`${serverAddress}/mypage/user-info`);
        const userData = await userResponse.json();
        setUserData(userData);
        setFormData({
          name: userData.name || "",
          phoneNumber: userData.phonenumber || "",
        });
        setOriginalData({
          name: userData.name || "",
          phoneNumber: userData.phonenumber || "",
        });

        // 최근 방문 기록 가져오기
        const visitsResponse = await fetch(
          `${serverAddress}/mypage/visit-history`
        );
        const visitsData = await visitsResponse.json();
        setRecentVisits(visitsData);

        // 사용자가 등록한 리뷰 가져오기
        const reviewsResponse = await fetch(`${serverAddress}/mypage/reviews`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[a-zA-Z가-힣]{1,10}$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "이름은 한글 또는 영문 문자만 입력 가능하며, 최대 10자까지 가능합니다.";
    }

    const phoneRegex = /^[0-9]{1,20}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "전화번호는 숫자만 입력 가능하며, 최대 20자까지 가능합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      // 이름과 전화번호를 이용한 인증 요청
      const authResponse = await fetch(`${serverAddress}/mypage/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const authData = await authResponse.json();

      if (!authResponse.ok || !authData.success) {
        throw new Error("인증에 실패했습니다.");
      }

      // 인증 성공 시 사용자 정보 수정 요청
      const updateResponse = await fetch(`${serverAddress}/mypage/user-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userData.userid,
          name: formData.name,
          user_type: userData.user_type,
          phonenumber: formData.phoneNumber,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("사용자 정보를 수정하는 데 실패했습니다.");
      }

      const updatedData = await updateResponse.json();
      setUserData(updatedData);
      alert("사용자 정보가 성공적으로 수정되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("사용자 정보를 수정하는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="my-page-container">
      <div className="info-section">
        <div className="my-info-container">
          <h2>내 정보</h2>
          <form className="my-page-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                disabled={!isEditing}
              />
              {isEditing && errors.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                disabled={!isEditing}
              />
              {isEditing && errors.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
            </div>
            {isEditing ? (
              <div className="button-group">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "저장 중..." : "저장"}
                </button>
                <button type="button" onClick={handleCancel}>
                  취소
                </button>
              </div>
            ) : (
              <div className="button-group">
                <button type="button" onClick={handleEdit}>
                  수정
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="history-section">
        <div className="recent-visits-container">
          <h2>최근 방문 기록</h2>
          {recentVisits.length === 0 ? (
            <p>최근 방문한 기록이 없습니다.</p>
          ) : (
            <ul>
              {recentVisits.map((visit, index) => (
                <li key={index}>
                  {visit.pageName} - {visit.visitDate}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="reviews-section">
        <div className="reviews-container">
          <h2>내가 등록한 리뷰</h2>
          {reviews.length === 0 ? (
            <p>등록한 리뷰가 없습니다.</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.reviewid}>
                  <h3>평점: {review.rating}점</h3>
                  <p>내용: {review.contents}</p>
                  <h4>상품 정보</h4>
                  <p>상품명: {review.product.name}</p>
                  <p>브랜드: {review.product.brand}</p>
                  <p>가격: {review.product.price.toLocaleString()}원</p>
                  {review.product.thumbnails.length > 0 && (
                    <img
                      src={review.product.thumbnails[0].img_path}
                      alt={`${review.product.name} 썸네일`}
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    />
                  )}
                  <h4>작성자 정보</h4>
                  <p>이름: {review.user.name}</p>
                  <p>아이디: {review.user.userid}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
