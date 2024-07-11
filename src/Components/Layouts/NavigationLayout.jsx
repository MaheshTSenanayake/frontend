import PropTypes from "prop-types";

import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";
import { useAuthContext } from "../../auth/hooks/use-auth-context";

function NavigationLayout({ children }) {
  const { user } = useAuthContext();
  return (
    <div>
      {user === null ? <MainNavigation /> : <UserNavigation />}
      {children}
      <Footer />
    </div>
  );
}

NavigationLayout.propTypes = {
  children: PropTypes.node,
};

export default NavigationLayout;
