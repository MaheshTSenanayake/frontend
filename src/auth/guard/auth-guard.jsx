import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

import LoadingScreen from "../../Components/loading/loading-screen";

import { paths } from "../../routes/paths";

import { useRouter } from "../../routes/hooks/use-router";
import { useAuthContext } from "../hooks/use-auth-context";

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <LoadingScreen /> : <Container>{children}</Container>}</>;
}

AuthGuard.propType = {
  children: PropTypes.node,
};

function Container({ children }) {
  const router = useRouter();

  const { authenticated, user } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = paths.login;

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, router, user]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propType = {
  children: PropTypes.node,
};
