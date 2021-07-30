import React, { useRef } from "react";
import styled from "styled-components";

interface ISeekerProps {
  value: number;
  duration: number;
  updateSeek: (seekValue: number) => void;
}

const Range = styled.input.attrs({ type: "range" })`
  position: absolute;
  width: 100%;
  background-color: transparent;
  -webkit-appearance: none;
  margin: 0;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    border-radius: 25px;
    width: 100%;
    height: 5px;
    cursor: pointer;
  }

  &::-webkit-slider-thumb {
    margin-top: -1.5px;
    z-index: 50;
    width: 10px;
    height: 5px;
    cursor: pointer;
    -webkit-appearance: none;
  }

  &::-moz-range-track {
    border: 4.2px solid rgba(0, 1, 1, 0);
    border-radius: 25px;
    width: 100%;
    height: 29.4px;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 35px;
    height: 34px;
    border: 7.1px solid rgba(226, 49, 0, 0.57);
    border-radius: 50px;
    cursor: pointer;
  }
  &::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 14.1px 0;
    color: transparent;
    width: 100%;
    height: 29.4px;
    cursor: pointer;
  }
  &::-ms-fill-lower {
    border: 4.2px solid rgba(0, 1, 1, 0);
    border-radius: 50px;
  }
  &::-ms-fill-upper {
    border: 4.2px solid rgba(0, 1, 1, 0);
    border-radius: 50px;
  }
  &::-ms-thumb {
    width: 35px;
    height: 34px;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 0px;
  }
  @supports (-ms-ime-align: auto) {
    margin: 0;
  }
`;

const Elapsed = styled.div<{ width: number }>`
  position: absolute;
  background: var(--accent);
  height: 5px;
  width: ${(props) => props.width}%;
  border-radius: 15px;
  background: rgb(223, 30, 30);
  background: linear-gradient(
    90deg,
    rgba(223, 30, 30, 1) 0%,
    rgba(226, 83, 21, 1) 100%
  );
`;

export const Seeker: React.FC<ISeekerProps> = ({
  updateSeek,
  duration,
  value,
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const seekValue = Math.floor(+e.currentTarget.value);
    updateSeek(seekValue);
    console.log(e.currentTarget.value, duration);
  };

  const calcPercentage = () => (value === 0 ? 0 : (value / duration) * 100);
  return (
    <>
      <Elapsed width={calcPercentage()} />
      <Range
        name="seeker"
        max={duration}
        id=""
        onChange={handleChange}
        value={value}
      />
    </>
  );
};
