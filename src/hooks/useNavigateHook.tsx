import { useNavigate } from "react-router-dom";

export const useNavigateHook = (): { navigateTo: (url: string) => void } => {
  const navigate = useNavigate();
  const navigateTo = (url: string) => navigate(url);
  return { navigateTo };
};
