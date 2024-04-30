import { FC } from "react";
import { CryptoTable } from "../components/CryptoTable";
import { useAppSelector } from "../redux/hooks";

export const MainPage: FC = () => {
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <main className={`main ${darkTheme && "dark"}`}>
      <CryptoTable />
    </main>
  );
};
