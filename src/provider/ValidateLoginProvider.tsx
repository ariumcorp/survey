import { useEffect } from "react";
import { useNavigate } from "react-router";
import { authSelector } from "redux-store/selectors";
import { useSelector } from "redux-store/store";
import { PagePath } from "utils/enums";

interface ValidateLoginProviderProps {
  children: React.ReactNode;
}

export default function ValidateLoginProvider(
  props: ValidateLoginProviderProps
) {
  const { children } = props;
  const { hasLoggedIn } = useSelector(authSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasLoggedIn) navigate(PagePath.Login);
  }, [hasLoggedIn, navigate]);

  return <>{children}</>;
}
