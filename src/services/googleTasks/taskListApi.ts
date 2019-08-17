export const getTaskListsFactory = () => {
  const getTaksLists = async () => {
    try {
      const response = await gapi.client.tasks.tasklists.list({
        maxResults: 10,
      });
      // const taskLists: TaskList[] = response.result.items;
      const taskLists = response.result.items;

      return taskLists;
    } catch (err) {
      throw err;
    }
  };

  return getTaksLists;
};
