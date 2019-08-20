import * as ActionType from './ApplicationConstants';

interface SelectTaskListPrams {
  selectedTaskListId: string;
}
export const application = {
  selectTaskList: (params: SelectTaskListPrams) => ({
    type: ActionType.SELECT_TASKLIST,
    payload: params,
  }),
};

export type ApplicationAction = ReturnType<typeof application.selectTaskList>;
