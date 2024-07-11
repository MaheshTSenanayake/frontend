import PropTypes from "prop-types";
import { useCallback, useMemo, useReducer } from "react";
import axios, { endpoints } from "../utils/axios";
import { MainContext } from "./main-context";

const initialState = {
  issues_data: [],
  add_new_issue_open_state: false,
  delete_issue_open_state: false,
  issue_to_be_deleted: {},
};

const reducer = (state, action) => {
  if (action.type === "GET_ALL_ISSUES") {
    return {
      ...state,
      issues_data: action.payload,
    };
  }

  if (action.type === "ADD_NEW_ISSUE_OPEN") {
    return {
      ...state,
      add_new_issue_open_state: true,
    };
  }

  if (action.type === "ADD_NEW_ISSUE_CLOSE") {
    return {
      ...state,
      add_new_issue_open_state: false,
    };
  }

  if (action.type === "SAVE_NEW_ISSUE") {
    return {
      ...state,
      issues_data: action.payload,
    };
  }

  if (action.type === "DELETE_ISSUE_OPEN") {
    return {
      ...state,
      delete_issue_open_state: true,
      issue_to_be_deleted: action.payload,
    };
  }

  if (action.type === "DELETE_ISSUE_CLOSE") {
    return {
      ...state,
      delete_issue_open_state: false,
      issue_to_be_deleted: {},
    };
  }

  if (action.type === "DELETE_ISSUE") {
    return {
      ...state,
      issues_data: action.payload,
    };
  }

  return state;
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

  const add_new_issue_open = useCallback(() => {
    dispatch({
      type: "ADD_NEW_ISSUE_OPEN",
    });
  }, []);

  const add_new_issue_close = useCallback(() => {
    dispatch({
      type: "ADD_NEW_ISSUE_CLOSE",
    });
  }, []);

  const save_new_issue = useCallback(async (issueData) => {
    try {
      const response = await axios.post(endpoints.user.add_issue, issueData);
      dispatch({
        type: "SAVE_NEW_ISSUE",
        payload: response.data.issues,
      });
    } catch (error) {
      console.error("Failed to save issues:", error);
    }
  }, []);

  const open_delete_issue_dialog = useCallback((issue_to_be_deleted) => {
    dispatch({
      type: "DELETE_ISSUE_OPEN",
      payload: issue_to_be_deleted,
    });
  }, []);

  const close_delete_issue_dialog = useCallback(() => {
    dispatch({
      type: "DELETE_ISSUE_CLOSE",
    });
  }, []);

  const delete_issue = useCallback(async (id) => {
    try {
      const response = await axios.delete(
        `${endpoints.user.delete_issue}/${id}`
      );
      dispatch({
        type: "DELETE_ISSUE",
        payload: response.data.issues,
      });
    } catch (error) {
      console.error("Failed to delete issues:", error);
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      get_all_issues,
      add_new_issue_open,
      add_new_issue_close,
      save_new_issue,
      open_delete_issue_dialog,
      close_delete_issue_dialog,
      delete_issue,

      issues_data: state.issues_data,
      add_new_issue_open_state: state.add_new_issue_open_state,
      delete_issue_open_state: state.delete_issue_open_state,
      issue_to_be_deleted: state.issue_to_be_deleted,
    }),
    [
      get_all_issues,
      add_new_issue_open,
      add_new_issue_close,
      save_new_issue,
      open_delete_issue_dialog,
      close_delete_issue_dialog,
      delete_issue,

      state.issues_data,
      state.add_new_issue_open_state,
      state.delete_issue_open_state,
      state.issue_to_be_deleted,
    ]
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
