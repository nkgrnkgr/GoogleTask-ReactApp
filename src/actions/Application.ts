import * as ActionType from './ApplicationConstants';

interface SelectTaskListPrams {
  selectedTaskListId: string;
}
export const application = {
  selectTaskList: (param: SelectTaskListPrams) => ({
    type: ActionType.SELECT_TASKLIST,
    payload: param,
  }),
  initializeGapiClient: () => ({
    type: ActionType.INITIALIZE_GAPI_CLIENT,
  }),
  signIn: () => ({
    type: ActionType.SIGN_IN,
  }),
  signOut: () => ({
    type: ActionType.SIGN_OUT,
  }),
};

export type ApplicationAction = ReturnType<typeof application.selectTaskList>;
