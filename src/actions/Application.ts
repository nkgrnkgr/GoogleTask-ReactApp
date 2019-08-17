import * as ActionType from './ApplicationConstants';

interface SelectToDoListPrams {
  selectedToDoListId: string;
}
export const application = {
  selectToDoList: (params: SelectToDoListPrams) => ({
    type: ActionType.SELECT_TODOLIST,
    payload: params,
  }),
};

export type ApplicationAction = ReturnType<typeof application.selectToDoList>;
