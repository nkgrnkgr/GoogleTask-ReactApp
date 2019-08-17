export const getTaskListFactory = () => {
  const getTaskList = async (tasklistId: string) => {
    try {
      const response = await gapi.client.tasks.tasks.list({
        tasklist: tasklistId,
      });

      const taskList = response.result.items;

      return taskList;
    } catch (err) {
      throw err;
    }
  };

  return getTaskList;
};
