import Store from "../configureStore";
import produce from "immer";

export const createLeadMiddleware = ({dispatch}) => next => action => {
  if (action.type === "CREATING_LEAD_SUCCESS") {
    const nextState = produce(Store.getState().currentServiceProvider.leads, draftState => {
      draftState.unshift(action.payload.data);
    });
    action.payload.data = nextState;
    console.log(action);
  }
  next(action)
};