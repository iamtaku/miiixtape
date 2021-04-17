import React from "react";
import { HomeBtn } from "../components/Buttons";
const Landing = () => {
  const handleClick = () => {
    console.log("i was clicked!");
  };
  return (
    <div>
      <h1>this is the landing component!</h1>
      <HomeBtn onClick={handleClick} />
    </div>
  );
};

export default Landing;
