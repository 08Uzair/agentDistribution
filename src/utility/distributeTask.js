export function distributeTasks(tasks, agents) {
  const baseCount = Math.floor(tasks.length / agents.length);
  let remaining = tasks.length % agents.length;

  let taskIndex = 0;
  const result = [];

  for (let i = 0; i < agents.length; i++) {
    const count = baseCount + (remaining > 0 ? 1 : 0);
    const assignedTasks = tasks.slice(taskIndex, taskIndex + count);

    result.push({
      taskList: assignedTasks,
      assignedTo: agents[i],
    });

    taskIndex += count;
    if (remaining > 0) remaining--;
  }

  return result;
}
