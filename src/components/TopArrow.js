import React from "react";

const TopArrow = () => {
  return (
    <div>
      <div className="top" onClick={() => window.scrollTo(0, 0)}>
        <img src="./assets/arrow-icon.svg" alt="arrow" />
      </div>
    </div>
  );
};

export default TopArrow;
