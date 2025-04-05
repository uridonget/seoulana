import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");  // <-- code로 변경

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/check-vote/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, code }),  // <-- name과 code 전송
    });

    const result = await response.json();

    console.log(result);

    if (result.message == '투표 가능') {
      navigate("/vote");
    } else {
      alert("인증 실패! 정보를 다시 확인해주세요.");
    }
  };

  return (
    <div className="container">
      <h2 className="header">Vote App</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="4자리 인증코드를 입력하세요"
          value={code}  // <-- code로 변경
          onChange={(e) => setCode(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">
          투표하러 가기
        </button>
      </form>
    </div>
  );
};

export default HomePage;

