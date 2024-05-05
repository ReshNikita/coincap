import { FC, memo } from "react";
import { useAppSelector } from "../redux/hooks";
import { getYear } from "../utils/getYear";
import { COPYRIGHT } from "../constants";
import styles from "../styles/Copyright.module.scss";

const { footerClass, copyright, dark } = styles;

export const Copyright: FC = memo(() => {
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <footer className={footerClass}>
      <h2 className={`${copyright} ${darkTheme && dark}`}>
        {COPYRIGHT} {getYear()}
      </h2>
    </footer>
  );
});
