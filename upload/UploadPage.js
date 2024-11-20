import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./UploadPage.css";

const UploadPage = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    type: "Air Conditioner",
    details: "",
    price: "",
    brand: "",
    energyEfficiency: "",
    size: "",
    electricityUsage: "",
    weight: "",
    resolution: "",
    capacity: "",
    other: "",
    image: null,
  });

  const navigate = useNavigate(); 

  // 입력 변화 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // 이미지 변화 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이미지 및 제품 세부사항을 위한 폼 데이터 생성
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("type", productDetails.type);
    formData.append("details", productDetails.details);
    formData.append("price", productDetails.price);
    formData.append("brand", productDetails.brand);
    formData.append("energyEfficiency", productDetails.energyEfficiency);
    formData.append("size", productDetails.size);
    formData.append("electricityUsage", productDetails.electricityUsage);
    formData.append("weight", productDetails.weight);
    formData.append("resolution", productDetails.resolution);
    formData.append("capacity", productDetails.capacity);
    formData.append("other", productDetails.other);
    if (productDetails.image) {
      formData.append("image", productDetails.image);
    }

    try {
      // API 호출하여 제품 세부사항을 데이터베이스에 저장
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("제품이 등록되었습니다!");

        // 폼을 초기 상태로 리셋
        setProductDetails({
          name: "",
          type: "Air Conditioner",
          details: "",
          price: "",
          brand: "",
          energyEfficiency: "",
          size: "",
          electricityUsage: "",
          weight: "",
          resolution: "",
          capacity: "",
          other: "",
          image: null,
        });

        // 제품 등록 페이지로 리디렉션
        navigate("/product-registration");
      } else {
        // 오류 메시지 표시
        alert("제품 등록에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("제품 등록 중 오류 발생:", error);
      alert("에러가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="product-registration-container">
      <h1>제품 등록</h1>
      <form onSubmit={handleSubmit} className="product-form">
        {/* 이미지 업로드 섹션 */}
        <div className="form-item">
          <label htmlFor="image">제품 이미지</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {productDetails.image && (
            <div className="image-preview">
              <img
                src={productDetails.image}
                alt="Product Preview"
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        {/* 기타 폼 필드 */}
        <div className="form-item">
          <label htmlFor="name">제품 이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="type">제품 유형</label>
          <select
            id="type"
            name="type"
            value={productDetails.type}
            onChange={handleChange}
          >
            <option value="Air Conditioner">에어컨</option>
            <option value="TV">TV</option>
            <option value="Refrigerator">냉장고</option>
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="details">제품 세부사항</label>
          <input
            type="text"
            id="details"
            name="details"
            value={productDetails.details}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="brand">브랜드</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={productDetails.brand}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="energyEfficiency">에너지 효율</label>
          <input
            type="number"
            id="energyEfficiency"
            name="energyEfficiency"
            value={productDetails.energyEfficiency}
            onChange={handleChange}
            placeholder="1~5단계의 값으로 설정해주세요"
            min="1"
            max="5"
          />
        </div>
        <div className="form-item">
          <label htmlFor="size">크기</label>
          <input
            type="text"
            id="size"
            name="size"
            value={productDetails.size}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="electricityUsage">전기 사용량 (W)</label>
          <input
            type="number"
            id="electricityUsage"
            name="electricityUsage"
            value={productDetails.electricityUsage}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="weight">무게 (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={productDetails.weight}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="resolution">해상도 (TV일 경우)</label>
          <input
            type="text"
            id="resolution"
            name="resolution"
            value={productDetails.resolution}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label htmlFor="capacity">용량 (L)</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={productDetails.capacity}
            onChange={handleChange}
            placeholder="세탁기,냉장고의 경우"
          />
        </div>
        <div className="form-item">
          <label htmlFor="other">기타 정보</label>
          <input
            type="text"
            id="other"
            name="other"
            value={productDetails.other}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          제품 등록
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
