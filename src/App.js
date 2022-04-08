import React, { useEffect, useState } from "react";
import useFetchTask from "./hooks/use-fetch";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const { isLoading, error, sentHTTP: fetchTasks } = useFetchTask();

  useEffect(() => {
    const transformData = (data) => {
      const loadedTasks = [];

      // loop nested objects
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      // function from calling component that will receive and set data
      setTasks(data);
    };

    fetchTasks(
      {
        url: "https://react-5826f-default-rtdb.firebaseio.com/tasks.json",
      },
      transformData
    );
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
