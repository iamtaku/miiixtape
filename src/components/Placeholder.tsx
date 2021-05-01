import React from "react";
import ContentLoader from "react-content-loader";

export const ProfilePlaceholder = (props: any) => (
  <ContentLoader
    height={80}
    width={80}
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
  >
    <circle cx="40" cy="40" r="40" />
  </ContentLoader>
);
