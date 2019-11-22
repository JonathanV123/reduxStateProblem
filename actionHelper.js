
export const dispatchHelper = (type, dispatch = store.dispatch) => {
    return (response, ...fns) => {
      if (response.status >= 400) {
        dispatch({
          type: `${type}_FAIL`,
          payload: response.data
        });
      } else if (response.status >= 200 && response.status < 400) {
        dispatch({
          type: `${type}_SUCCESS`,
          payload: response.data,
          ...response.middleware
        });
        fns.forEach(fn => fn());
      } else {
        localStorage.setItem(
          "redirectPath",
          store.getState().router.location.pathname
        );
        dispatch(authLogoutAndRedirect());
      }
    };
  };


  export const makeApiCall = async (
    config,
    actionType,
    callback,
    pushTo = null,
    modifyResponseFn = null,
    requiresToken = true
  ) => {
    const dispatching = dispatchHelper(actionType, dispatch);
  
    if (config.headers === undefined) {
      config.headers = {};
    }
  
    if (requiresToken) {
      let token = getToken();
      config.headers.Authorization = "Bearer " + token;
    }
  
    try {
      let response = await axios({
        ...config
      });
      if (modifyResponseFn) {
        response = modifyResponseFn(response);
      }
      dispatching(response, callback);
  
      if (pushTo) {
        // TODO  Refactor below If Statement
        if (pushTo == "/dashboard") {
          if (response.data.service_providers.length === 1) {
            dispatch(push(`/dashboard/${response.data.service_providers[0].id}`));
          } else {
            dispatch(push(`/dashboard`));
          }
        } else {
          dispatch(push(pushTo));
        }
      }
    } catch (error) {
      // Future error handler
      console.log("An error occured in the makeAPICall fn: ⬇️");
      console.log(
        "⭐⭐⭐⭐⭐ This is most likely due to no callback function being provided. Please add a callback and try again ⭐⭐⭐⭐⭐"
      );
      console.log("Error logging from actionHelpers.js catch ⬇️⬇️⬇️⬇️⬇️⬇️⬇️");
      console.error(error);
      return error;
      console.log("Error logging from actionHelpers.js catch ⬆️⬆️⬆️⬆️⬆️⬆️⬆️");
    }
  };