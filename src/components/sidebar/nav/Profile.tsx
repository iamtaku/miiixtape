import React, { useState } from "react";
import styled from "styled-components";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ProfilePlaceholder } from "../../placeholders/Placeholder";
import { useGetSpotifyUser } from "../../../queries/hooks";
import { BasicButton } from "../../Buttons";

const ProfileActionsWrapper = styled.div`
  position: absolute;
  left: -50px;
  z-index: 20;
  border-radius: 8px;
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(83, 83, 83, 0.2);
  backdrop-filter: blur(4px) contrast(0.8);
  padding: 12px;
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

const Item = styled.li`
  margin: 8px 0;
  &:hover {
    cursor: pointer;
  }
`;

export const Profile = (): JSX.Element => {
  const history = useHistory();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data, isLoading } = useGetSpotifyUser();

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
              <Item>
                <a
                  href={data.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  SPOTIFY <FaExternalLinkAlt />
                </a>
              </Item>
            ) : null}
            <Item>SETTINGS</Item>
            <Item onClick={logOut}>LOGOUT</Item>
          </ul>
        </ProfileActionsWrapper>
      ) : null}
    </Wrapper>
  );
};
