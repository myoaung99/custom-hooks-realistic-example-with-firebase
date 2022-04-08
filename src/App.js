import React, { useEffect, useState, useCallback } from "react";
import useFetchTask from "./hooks/use-fetch";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformData = useCallback((data) => {
    const loadedTasks = [];

    // loop nested objects
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    // function from calling component that will receive and set data
    setTasks(data);
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  const {
    isLoading,
    error,
    sentHTTP: fetchTasks,
  } = useFetchTask(
    { url: "https://react-5826f-default-rtdb.firebaseio.com/tasks.json" },
    transformData
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
