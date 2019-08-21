import * as ActionType from './ApplicationConstants';

interface SelectTaskListPrams {
  selectedTaskListId: string;
}
export const application = {
  selectTaskList: (param: SelectTaskListPrams) => ({
    type: ActionType.SELECT_TASKLIST,
    payload: param,
  }),
};

export type ApplicationAction = ReturnType<typeof application.selectTaskList>;
