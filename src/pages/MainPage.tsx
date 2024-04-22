import { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { CryptoTable } from "../components/CryptoTable";

export const MainPage: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <div className={`main ${darkTheme && "dark"}`}>
      <CryptoTable />
    </div>
  );
};
