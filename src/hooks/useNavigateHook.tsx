import { useNavigate } from "react-router-dom";

export const useNavigateHook = (): { getNavigation: (url: string) => void } => {
  const navigate = useNavigate();

  const getNavigation = (url: string) => navigate(url);
  return { getNavigation };
};
