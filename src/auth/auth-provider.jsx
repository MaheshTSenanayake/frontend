import PropTypes from "prop-types";
import { useReducer } from "react";
import { useCallback, useEffect, useMemo } from "react";

import { setSession } from "./utils";
import { AuthContext } from "./auth-context";
import axios, { endpoints } from "../utils/axios";

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      ...state,
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  }

  return state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const user = sessionStorage.getItem("userData");

      if (accessToken) {
        setSession(accessToken, user);

        dispatch({
          type: "INITIAL",
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      dispatch({
        type: "INITIAL",
        payload: {
          user: null,
        },
      });
    }
  }, []);

  // User Login
  const user_login = useCallback(async (data) => {
    const response = await axios.post(endpoints.auth.user_auth, data);
    const { token, userData } = response.data;

    setSession(token, JSON.stringify(userData));

    dispatch({
      type: "LOGIN",
      payload: {
        user: {
          ...userData,
        },
      },
    });
  }, []);

  //User Logout
  const user_logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  //Register User
  const user_register = useCallback(async (data) => {
    const ent = "users";

    const response = await axios.post(
      `${endpoints.auth.register_user}?ent=${ent}`,
      data
    );

    dispatch({
      type: "REGISTER_USER",
    });
  }, []);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",

      user_login,
      user_register,
      user_logout,
    }),
    [user_login, user_register, user_logout, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.prototypes = {
  children: PropTypes.node,
};
