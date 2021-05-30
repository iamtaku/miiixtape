import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ProfilePlaceholder } from "../placeholders/Placeholder";
import { ModalWrapper } from "../grid/Modal";
import { GetSpotifyUser } from "../../queries/hooks/GetSpotifyUser";

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

const ProfileActionsWrapper = styled(ModalWrapper)`
  ul {
    flex-direction: column;
  }
`;

export const Profile = () => {
  const history = useHistory();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data, isLoading, error } = GetSpotifyUser();

  const logOut = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };

  const handleClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  if (!data || isLoading) return <ProfilePlaceholder />;

  return (
    <ProfileButton onClick={handleClick}>
      {data.images ? (
        [0] && <img src={data.images[0].url || ""} alt={data.display_name} />
      ) : (
        <img src={""} alt={data.display_name} />
      )}
      {isProfileOpen ? (
        <ProfileActionsWrapper>
          <ul>
            {data.href ? (
              <li>
                <a href={data.href} target="_blank" rel="noreferrer">
                  SPOTIFY <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </li>
            ) : null}
            <li>SETTINGS</li>
            <li onClick={logOut}>LOGOUT</li>
          </ul>
        </ProfileActionsWrapper>
      ) : null}
    </ProfileButton>
  );
};
