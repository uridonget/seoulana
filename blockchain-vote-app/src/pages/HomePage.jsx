import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const connectPhantomWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        console.log("👛 Phantom 지갑 연결 성공:", resp.publicKey.toString());
        return true;
      } catch (err) {
        console.error("❌ Phantom 지갑 연결 실패:", err);
        alert("지갑 연결을 허용해주세요.");
        return false;
      }
    } else {
      alert("Phantom 지갑이 설치되어 있지 않습니다.\nhttps://phantom.app에서 설치해 주세요.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/check-vote/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, code }),
    });

    const result = await response.json();
    console.log(result);

    if (result.message === "투표 가능") {
      const walletConnected = await connectPhantomWallet();

      if (walletConnected) {
        navigate("/vote");
      }
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
          value={code}
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
