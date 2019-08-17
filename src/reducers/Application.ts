import { Reducer } from 'redux';
import { ApplicationAction } from '../actions/Application';
import * as ActionType from '../actions/ApplicationConstants';

export interface ApplicationState {
  selectedToDoListId: string;
}
export const initialState: ApplicationState = {
  selectedToDoListId: '',
};

const applicationReducer: Reducer<ApplicationState, ApplicationAction> = (
  state: ApplicationState = initialState,
  action: ApplicationAction,
): ApplicationState => {
  switch (action.type) {
    case ActionType.SELECT_TODOLIST:
      return {
        ...state,
        selectedToDoListId: action.payload.selectedToDoListId,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const _: never = action;

      return state;
    }
  }
};

export default applicationReducer;
