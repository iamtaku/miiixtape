import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ProfilePlaceholder } from "../placeholders/Placeholder";
interface ProfileProps {
  displayName?: string;
  uri?: string;
  isLoading?: boolean;
  href?: string;
}

const ProfileWrapper = styled.div`
  img {
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    object-fit: cover;
    width: 60px;
    height: 60px;
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

export const Profile: React.FC<ProfileProps> = ({
  displayName,
  uri,
  isLoading,
  href,
}) => {
  const history = useHistory();
  const logOut = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };

  const [profileOpen, setProfileOpen] = useState(false);
  const handleClick = () => {
    setProfileOpen(!profileOpen);
  };

  if (isLoading) return <ProfilePlaceholder />;

  return (
    //convert to button
    <ProfileWrapper>
      <img src={uri || ""} alt={displayName} onClick={handleClick} />
      {profileOpen ? (
        <ProfileModal>
          <ul>
            {href ? (
              <li>
                <a href={href} target="_blank" rel="noreferrer">
                  SPOTIFY <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </li>
            ) : null}
            <li>SETTINGS</li>
            <li onClick={logOut}>LOGOUT</li>
          </ul>
        </ProfileModal>
      ) : null}
    </ProfileWrapper>
  );
};
