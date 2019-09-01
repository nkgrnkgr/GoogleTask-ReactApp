import * as ActionType from './ApplicationConstants';
import { User } from '../reducers/ApplicationReducer';

interface SelectTaskListPrams {
  selectedTaskListId: string;
}
export const application = {
  selectTaskList: (paramForSelect: SelectTaskListPrams) => ({
    type: ActionType.SELECT_TASKLIST as typeof ActionType.SELECT_TASKLIST,
    payload: paramForSelect,
  }),
  initializeGapiClient: () => ({
    type: ActionType.INITIALIZE_GAPI_CLIENT as typeof ActionType.INITIALIZE_GAPI_CLIENT,
  }),
  signIn: () => ({
    type: ActionType.SIGN_IN as typeof ActionType.SIGN_IN,
  }),
  signOut: () => ({
    type: ActionType.SIGN_OUT as typeof ActionType.SIGN_OUT,
  }),
  setUpUser: (user: User) => ({
    type: ActionType.SETUP_USER as typeof ActionType.SETUP_USER,
    playload: user,
  }),
};

export type ApplicationAction =
  | ReturnType<typeof application.selectTaskList>
  | ReturnType<typeof application.initializeGapiClient>
  | ReturnType<typeof application.signIn>
  | ReturnType<typeof application.signOut>
  | ReturnType<typeof application.setUpUser>;
