import axios from "axios";

const headers = () => {
  // debugger;
  const token = window.localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: headers(),
});
