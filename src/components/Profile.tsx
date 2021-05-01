import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
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
    object-fit: cover;
    width: 80px;
    height: 80px;
  }
  position: relative;
`;

const ProfileModal = styled.div`
  position: absolute;
  left: -25px;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    li {
      margin: 8px;
    }
  }
`;

export const Profile: React.FC<ProfileProps> = ({ displayName, uri }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const handleClick = () => {
    // console.log("i was clicked!");
    setProfileOpen(!profileOpen);
  };
  return (
    <ProfileWrapper>
      <img src={uri} alt={displayName} onClick={handleClick} />
      {profileOpen ? (
        <ProfileModal>
          <ul>
            <li>
              SPOTIFY <FontAwesomeIcon icon={faExternalLinkAlt} />
            </li>
            <li>SETTINGS</li>
            <li>LOGOUT</li>
          </ul>
        </ProfileModal>
      ) : null}
    </ProfileWrapper>
  );
};
