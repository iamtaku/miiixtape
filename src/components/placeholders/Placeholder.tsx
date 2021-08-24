import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const ProfilePlaceholder = (props: IContentLoaderProps): JSX.Element => (
  <ContentLoader
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
    style={{ width: "50px", height: "50px" }}
    {...props}
  >
    <circle cx="25" cy="25" r="25" />
  </ContentLoader>
);

export const InnerGridBottomPlaceholder = (
  props: IContentLoaderProps
): JSX.Element => (
  <ContentLoader
    height={80}
    width={80}
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
    {...props}
  >
    <circle cx="40" cy="40" r="40" />
  </ContentLoader>
);

export const InnerGridTopPlaceholder = (
  props: IContentLoaderProps
): JSX.Element => (
  <ContentLoader
    height={80}
    width={80}
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
    {...props}
  >
    <circle cx="40" cy="40" r="40" />
  </ContentLoader>
);
