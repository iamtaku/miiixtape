import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ProfilePlaceholder } from "../placeholders/Placeholder";
import { ModalWrapper } from "../grid/Modal";
interface ProfileProps {
  displayName?: string;
  uri?: string;
  isLoading?: boolean;
  href?: string;
}

const ProfileButton = styled.button`
  background: none;
  border: none;
  border-radius: 50px;
  padding: 12px;
  background: #353535;
  box-shadow: 20px 20px 60px #2d2d2d, -20px -20px 60px #3d3d3d;
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
    <ProfileButton>
      <img src={uri || ""} alt={displayName} onClick={handleClick} />
      {profileOpen ? (
        <ModalWrapper>
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
        </ModalWrapper>
      ) : null}
    </ProfileButton>
  );
};
