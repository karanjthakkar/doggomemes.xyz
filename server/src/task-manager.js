const taskQueue = [];
let isTaskQueueStopped = true;

// Save all request related tasks in a queue
const createTask = task => {
  taskQueue.push(task);
};

// Pick the new task from a queue
// invoke the fask function and pick the next task
// If no tasks available, stop the queue processing
const pickNextTask = () => {
  if (taskQueue.length > 0) {
    const nextTask = taskQueue.pop();
    isTaskQueueStopped = false;
    nextTask.taskFn(nextTask.taskData);
    pickNextTask();
  } else {
    isTaskQueueStopped = true;
  }
};

module.exports = {
  createTask,
  pickNextTask,
  isTaskQueueStopped
};
