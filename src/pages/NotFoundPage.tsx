import { FC } from "react";
import { Button } from "../components/Button";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { NOT_FOUND_PAGE } from "../constants";
import { Typography } from "antd";
import styles from "../styles/NotFoundPage.module.scss";

const { Title } = Typography;

const { backButtonBlock, backButton, mainBlock } = styles;
const { OOPS_YOU_LOST, GET_BACK, BACK_BUTTON, ERROR_404 } = NOT_FOUND_PAGE;

export const NotFoundPage: FC = () => {
  const { navigateTo } = useNavigateHook();
  return (
    <main className={mainBlock}>
      <div className={backButtonBlock}>
        <Title level={1} type="danger">
          {ERROR_404}
        </Title>
        <Title level={3} type="danger">
          {OOPS_YOU_LOST}
        </Title>
        <Title level={3} type="danger">
          {GET_BACK}
        </Title>
        <Button
          className={backButton}
          text={BACK_BUTTON}
          onClick={() => navigateTo("/")}
        />
      </div>
    </main>
  );
};
