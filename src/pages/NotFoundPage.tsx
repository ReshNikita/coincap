import { FC } from "react";
import { Button } from "../components/Button";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { BASE_URL, NOT_FOUND_PAGE } from "../constants/constants";

export const NotFoundPage: FC = () => {
  const { navigateTo } = useNavigateHook();
  const { OOPS_YOU_LOST, GET_BACK, BACK_BUTTON, ERROR_404 } = NOT_FOUND_PAGE;
  return (
    <main>
      <div>
        <h1>{ERROR_404}</h1>
        <p>{OOPS_YOU_LOST}</p>

        <p>{GET_BACK}</p>
        <div>
          <Button
            className=""
            text={BACK_BUTTON}
            onClick={() => navigateTo(BASE_URL)}
          />
        </div>
      </div>
    </main>
  );
};
