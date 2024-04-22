import { FC } from "react";
import { Button } from "../components/Button";
import { useNavigateHook } from "../hooks/useNavigateHook";
import { BASE_URL, NOT_FOUND_PAGE } from "../constants/constants";

export const NotFoundPage: FC = () => {
  const { getNavigation } = useNavigateHook();

  return (
    <main>
      <div>
        <h1>{NOT_FOUND_PAGE[404]}</h1>
        <p>{NOT_FOUND_PAGE.OOPS_YOU_LOST}</p>

        <p>{NOT_FOUND_PAGE.GET_BACK}</p>
        <div>
          <Button
            className=""
            text={NOT_FOUND_PAGE.BACK_BUTTON}
            onClick={() => getNavigation(BASE_URL)}
          />
        </div>
      </div>
    </main>
  );
};
