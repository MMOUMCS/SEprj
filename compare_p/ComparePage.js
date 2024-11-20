import React, { useState, useEffect } from "react";
import axios from "axios";

const ComparePage = () => {
  const [category, setCategory] = useState("All");
  const [leftSearchQuery, setLeftSearchQuery] = useState("");
  const [rightSearchQuery, setRightSearchQuery] = useState("");
  const [leftProduct, setLeftProduct] = useState(null);
  const [rightProduct, setRightProduct] = useState(null);
  const [products, setProducts] = useState([]);  // 제품 데이터를 저장할 상태

  // 컴포넌트가 마운트될 때 백엔드 API에서 제품을 가져옴
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("./api/products");
        setProducts(response.data);  // API 응답에서 제품 설정
      } catch (error) {
        console.error("제품을 가져오는 중 오류 발생:", error);
      }
    };

    fetchProducts();
  }, []);

  // 카테고리에 따라 제품 필터링
  const filteredProducts = products.filter(
    (product) => category === "All" || product.type === category
  );

  // 왼쪽 및 오른쪽 검색에 따라 제품 필터링
  const filteredLeftProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(leftSearchQuery.toLowerCase())
  );

  const filteredRightProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(rightSearchQuery.toLowerCase())
  );

  const handleProductClick = (side, product) => {
    if (side === "left") {
      setLeftSearchQuery(product.name);
      setLeftProduct(product);
    } else {
      setRightSearchQuery(product.name);
      setRightProduct(product);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>제품 비교</h1>

      <h2>마음에 드는 제품을 선택하여 서로 비교!</h2>

      {/* 카테고리 선택기 */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="category">제품 유형: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">전체</option>
          <option value="Air Conditioner">에어컨</option>
          <option value="TV">TV</option>
          <option value="Refrigerator">냉장고</option>
          {/*제품 종류시 추가 작성*/}
        </select>
      </div>

      {/* 비교 영역 */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* 왼쪽 사이드 */}
        <ProductSearchSection
          title="제품 1"
          searchQuery={leftSearchQuery}
          setSearchQuery={setLeftSearchQuery}
          filteredProducts={filteredLeftProducts}
          onProductClick={(product) => handleProductClick("left", product)}
          selectedProduct={leftProduct}
        />

        {/* 오른쪽 사이드 */}
        <ProductSearchSection
          title="제품 2"
          searchQuery={rightSearchQuery}
          setSearchQuery={setRightSearchQuery}
          filteredProducts={filteredRightProducts}
          onProductClick={(product) => handleProductClick("right", product)}
          selectedProduct={rightProduct}
        />
      </div>

      {/* 비교 세부사항 */}
      <ComparisonDetails leftProduct={leftProduct} rightProduct={rightProduct} />
    </div>
  );
};

//제품 검색 및 표시 섹션 컴포넌트
const ProductSearchSection = ({
  title,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  onProductClick,
  selectedProduct,
}) => (
  <div
    style={{
      flex: "1",
      margin: "0 10px",
      border: "1px solid #ccc",
      padding: "20px",
      borderRadius: "10px"
    }}
  >
    <h3>{title}</h3>
    <input
      type="text"
      placeholder={`${title.toLowerCase()} 검색...`}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        width: "95%",
        marginBottom: "10px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />

    {searchQuery && (
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          marginTop: "5px",
          maxHeight: "150px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderTop: "none",
          backgroundColor: "#fff",
        }}
      >
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            onClick={() => onProductClick(product)}
            style={{
              padding: "8px",
              cursor: "pointer",
              borderBottom: "1px solid #ddd",
            }}
          >
            {product.name}
          </li>
        ))}
      </ul>
    )}

    {selectedProduct ? (
      <ProductCard product={selectedProduct} />
    ) : (
      <p>비교할 제품을 선택하세요.</p>
    )}
  </div>
);

// 제품 카드 컴포넌트 (이미지와 이름만 표시)
const ProductCard = ({ product }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
    }}
  >
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: "300px",
        height: "300px",
        objectFit: "container",
        marginBottom: "10px",
      }}
    />
    <p>
      <strong>{product.name}</strong>
    </p>
  </div>
);

// 추가 비교 세부사항 컴포넌트
const ComparisonDetails = ({ leftProduct, rightProduct }) => {
  const comparisonItems = [
    { label: "유형", key: "type" },
    { label: "세부사항", key: "details" },
    { label: "가격", key: "price" },
    { label: "브랜드", key: "brand" },
    { label: "에너지 효율", key: "energyEfficiency" },
    { label: "전기 사용량", key: "electricityUsage" },
    { label: "무게", key: "weight" },
    { label: "해상도", key: "resolution" },
    { label: "용량", key: "capacity" },
    { label: "크기", key: "size" },
    { label: "기타", key: "other" },
  ];

  return (
    <div style={{ marginTop: "30px", backgroundColor: "beige",borderRadius: "10px",padding: "20px"}}>
      <h2>비교 세부사항</h2>
      {comparisonItems.map((item) => (
        <div
          key={item.key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            border: "1px solid #ddd",
            margin: "5px",
            backgroundColor: "white"
          }}
        >
          <strong style={{ flex: 1 }}>{item.label}</strong>
          <span style={{ flex: 1, textAlign: "center" }}>
            {leftProduct ? leftProduct[item.key] ?? "-" : "-"}
          </span>
          <span style={{ flex: 1, textAlign: "center" }}>
            {rightProduct ? rightProduct[item.key] ?? "-" : "-"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ComparePage;
