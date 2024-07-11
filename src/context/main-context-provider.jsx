import PropTypes from "prop-types";
import { useCallback, useMemo, useReducer } from "react";
import axios, { endpoints } from "../utils/axios";
import { MainContext } from "./main-context";

const initialState = {
  issues_data: [],
};

const reducer = (state, action) => {
  if (action.type === "GET_ALL_ISSUES") {
    return {
      ...state,
      issues_data: action.payload,
    };
  }
  return state; // Ensure reducer always returns a state
};

export function MainContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const get_all_issues = useCallback(async () => {
    try {
      const response = await axios.get(endpoints.user.all_issues);
      dispatch({
        type: "GET_ALL_ISSUES",
        payload: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      get_all_issues,
      issues_data: state.issues_data,
    }),
    [get_all_issues, state.issues_data]
  );

  return (
    <MainContext.Provider value={memoizedValue}>
      {children}
    </MainContext.Provider>
  );
}

MainContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
