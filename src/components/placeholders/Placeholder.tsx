import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const ProfilePlaceholder = (props: IContentLoaderProps): JSX.Element => (
  <ContentLoader
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
    style={{ width: "100%" }}
    {...props}
  >
    <circle cx="30" cy="30" r="30" />
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
