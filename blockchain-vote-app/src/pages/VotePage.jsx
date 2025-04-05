import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const VotePage = () => {
  const navigate = useNavigate();

  const candidates = ["Alice", "Bob", "Charlie", "David"];
  const [selected, setSelected] = useState("");

  const handleVote = async () => {
    if (!selected) {
      alert("후보를 선택해주세요!");
      return;
    }

    const response = await fetch("http://localhost:8000/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: selected }),
    });

    const result = await response.json();
    if (result.success) {
      alert("투표가 완료되었습니다!");
      navigate("/complete");
    } else {
      alert("투표 실패: " + result.message);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Vote App</h2>
      <div className="vote-list">
        {candidates.map((name, index) => (
          <div
            key={index}
            className={`vote-card ${selected === name ? "selected" : ""}`}
            onClick={() => setSelected(name)}
          >
            {name}
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button className="button" onClick={handleVote}>
          투표하기
        </button>
      </div>
    </div>
  );
};

export default VotePage;
