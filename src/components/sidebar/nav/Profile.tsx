import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { ProfilePlaceholder } from "../../placeholders/Placeholder";
import { useGetSpotifyUser } from "../../../queries/hooks";
import { BasicButton } from "../../Buttons";

const ProfileActionsWrapper = styled.div`
  position: absolute;
  left: -50px;
  z-index: 20;
  width: 100%;
  ul {
    flex-direction: column;
  }
`;

const Button = styled(BasicButton)`
  min-width: initial;
  padding: 4px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  width: 40px;
  height: 40px;
  /* position: relative; */
`;

const Wrapper = styled.div`
  position: relative;
`;

export const Profile = () => {
  const history = useHistory();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data, isLoading, error } = useGetSpotifyUser();
  // const data = {} as any;
  // const isLoading = true;
  //

  const logOut = () => {
    window.localStorage.removeItem("token");
    history.push("/");
  };

  const handleClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  if (!data || isLoading) return <ProfilePlaceholder />;

  return (
    <Wrapper>
      <Button onClick={handleClick} isPressed={isProfileOpen}>
        {data.images ? (
          [0] && (
            <ProfileImage
              src={data.images[0].url || ""}
              alt={data.display_name}
            />
          )
        ) : (
          <ProfileImage src={""} alt={data.display_name} />
        )}
      </Button>
      {isProfileOpen ? (
        <ProfileActionsWrapper>
          <ul>
            {data.href ? (
              <li>
                <a
                  href={data.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  SPOTIFY <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </li>
            ) : null}
            <li>SETTINGS</li>
            <li onClick={logOut}>LOGOUT</li>
          </ul>
        </ProfileActionsWrapper>
      ) : null}
    </Wrapper>
  );
};
