import React from "react";
import styled from "styled-components";

interface ProfileProps {
  displayName?: string;
  uri?: string;
}

const ProfileWrapper = styled.div`
  img {
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 80px;
    height: 80px;
    /* display: inline-block; */
  }
`;

export const Profile: React.FC<ProfileProps> = ({ displayName, uri }) => {
  return (
    <ProfileWrapper>
      <img src={uri} alt={displayName} />
    </ProfileWrapper>
  );
};
