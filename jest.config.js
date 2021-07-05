module.exports = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  // transform: {
  //   ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
  //     "<rootDir>/jest-config/file-mock.js",
  //   ".(css|less)$": "<rootDir>/jest-config/style-mock.js",
  // },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
};
