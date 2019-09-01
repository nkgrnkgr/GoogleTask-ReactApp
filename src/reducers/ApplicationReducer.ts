import { Reducer } from 'redux';
import { ApplicationAction } from '../actions/Application';
import * as ActionType from '../actions/ApplicationConstants';

export interface User {
  imageUrl: string;
  name: string;
}
export interface ApplicationState {
  selectedTaskListId: string;
  isGapiClientInitialized: boolean;
  isSignIned: boolean;
  user: User;
}
export const initialState: ApplicationState = {
  selectedTaskListId: '',
  isGapiClientInitialized: false,
  isSignIned: false,
  user: {
    imageUrl: '',
    name: '',
  },
};

const applicationReducer: Reducer<ApplicationState, ApplicationAction> = (
  state: ApplicationState = initialState,
  action: ApplicationAction,
): ApplicationState => {
  switch (action.type) {
    case ActionType.SELECT_TASKLIST:
      return {
        ...state,
        selectedTaskListId: action.payload.selectedTaskListId,
      };
    case ActionType.INITIALIZE_GAPI_CLIENT:
      return {
        ...state,
        isGapiClientInitialized: true,
      };
    case ActionType.SIGN_IN:
      return {
        ...state,
        isSignIned: true,
      };
    case ActionType.SIGN_OUT:
      return {
        ...state,
        isSignIned: false,
      };
    case ActionType.SETUP_USER:
      return {
        ...state,
        user: action.playload,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default applicationReducer;
