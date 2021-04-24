import { GetUser } from "../queries";
export const Navbar = () => {
  const { data, isLoading, error } = GetUser();
  console.log(data);
  return (
    <div>
      {/* <h1>{da}</h1> */}
      <h2> {isLoading ? "loading" : "not loading"}</h2>
      <h2>this is a navbar</h2>
    </div>
  );
};
