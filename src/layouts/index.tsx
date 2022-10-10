import { FC } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout: FC = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
