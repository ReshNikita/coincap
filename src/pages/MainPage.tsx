import { FC, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { getAssets } from "../api/coincapApi";

export const MainPage: FC = () => {
  const [assets, setAssets] = useState();
  getAssets();
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <div className={`main ${darkTheme && "dark"}`}>
      <h1>MAIN</h1>
      <p>sdfd</p>
    </div>
  );
};
