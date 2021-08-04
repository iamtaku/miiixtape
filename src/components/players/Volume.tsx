import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs({ type: "range" })`
  display: block;
  place-self: center end;
  width: 50% !important;
  /* margin: 12.85px 0; */
  background-color: transparent;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    background: rgba(0, 0, 0, 0.78);
    border: 2px solid #000101;
    border-radius: 25px;
    width: 100%;
    height: 0.3px;
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    margin-top: -9.85px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border: 0px solid rgba(0, 0, 30, 0);
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #141414;
  }
  &::-moz-range-track {
    background: rgba(0, 0, 0, 0.78);
    border: 2px solid #000101;
    border-radius: 25px;
    width: 100%;
    height: 0.3px;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 26px;
    height: 26px;
    background: #ffffff;
    border: 0px solid rgba(0, 0, 30, 0);
    border: 0;
    border-radius: 15px;
    cursor: pointer;
  }
  &::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 13.75px 0;
    color: transparent;
    width: 100%;
    height: 0.3px;
    cursor: pointer;
  }
  &::-ms-fill-lower {
    background: #000000;
    border: 2px solid #000101;
    border-radius: 50px;
  }
  &::-ms-fill-upper {
    background: rgba(0, 0, 0, 0.78);
    border: 2px solid #000101;
    border-radius: 50px;
  }
  &::-ms-thumb {
    width: 26px;
    height: 26px;
    background: #ffffff;
    border: 0px solid rgba(0, 0, 30, 0);
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  &:focus::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.78);
  }
  &:focus::-ms-fill-upper {
    background: #141414;
  }
  /*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
  @supports (-ms-ime-align: auto) {
    /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
    & {
      margin: 0;
      /*Edge starts the margin from the thumb, not the track as other browsers do*/
    }
  }
`;

export const Volume: React.FC<{
  updateVolume: (volume: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
}> = ({ updateVolume, volume, setVolume }) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(+e.currentTarget.value);
    updateVolume(+e.currentTarget.value);
  };

  return <Input max={100} value={volume} onChange={handleChange} />;
};
