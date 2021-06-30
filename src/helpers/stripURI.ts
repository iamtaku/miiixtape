export const stripURI = (uri: string) => {
  return uri.split(":")[2];
};

export const stripYoutubeURI = (uri: string) => {
  // debugger;
  return uri.split("v=")[1];
};
