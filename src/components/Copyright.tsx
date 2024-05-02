import { FC, memo } from "react";
import { getYear } from "../utils/getYear";
import { COPYRIGHT } from "../constants";
import { useAppSelector } from "../redux/hooks";
import styles from "../styles/Copyright.module.scss";

export const Copyright: FC = memo(() => {
  const { darkTheme } = useAppSelector(state => state.theme);
  return (
    <footer className={styles.footer}>
      <h2 className={`${styles.copyright} ${darkTheme && styles.dark}`}>
        {COPYRIGHT} {getYear()}
      </h2>
    </footer>
  );
});
