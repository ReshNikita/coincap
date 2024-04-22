import { FC, memo } from "react";
import { getYear } from "../utils/getYear";
import { COPYRIGHT } from "../constants/constants";
import { useAppSelector } from "../redux/hooks";

export const Copyright: FC = memo(() => {
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <footer>
      <h2 className={`copyright ${darkTheme && "dark"}`}>
        {COPYRIGHT} {getYear()}
      </h2>
    </footer>
  );
});
