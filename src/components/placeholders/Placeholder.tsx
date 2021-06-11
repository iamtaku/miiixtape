import ContentLoader from "react-content-loader";

export const ProfilePlaceholder = (props: any) => (
  <ContentLoader
    height={60}
    width={60}
    speed={2}
    foregroundColor="#f93801"
    backgroundColor="#f9b401"
  >
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
);

export const InnerGridBottomPlaceholder = (props: any) => (
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

export const InnerGridTopPlaceholder = (props: any) => (
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
