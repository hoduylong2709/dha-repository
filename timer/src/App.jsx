import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

import ToggleableTimerForm from "./component/ToggleableTimerForm";
import EditableTimer from "./component/EditableTimer";
import { newTimer } from "./utils/TimerUtils";
import "./App.css";

const ONE_SEC = 1000;

const App = () => {
  const [timers, setTimers] = useState([
    {
      id: uuidv4(),
      title: "Learn React",
      project: "Internship",
      eslapsed: 0,
      isRunning: false,
    },
    {
      id: uuidv4(),
      title: "Learn NodeJS",
      project: "Internship",
      eslapsed: 0,
      isRunning: false,
    },
  ]);

  // useEffect combine with timeOut will make a infinity loop to increase time
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimers(
        timers.map((timer) => ({
          ...timer,
          eslapsed: timer.isRunning ? timer.eslapsed + ONE_SEC : timer.eslapsed,
        }))
      );
    }, ONE_SEC);

    return () => clearTimeout(timeout);
  }, [timers]);

  // There are many way to add new element to array, here we use SPREAD in ES6
  const handleCreateForm = (timer) => {
    setTimers([newTimer(timer), ...timers]);
  };

  // And there are many to clone an object, here we also use SPREAD, but it can cause bug.
  // Research about shallow copy & deep copy to know more
  const handleUpdateForm = (timer) => {
    setTimers(
      timers.map((item) => {
        if (item.id === timer.id)
          return {
            ...item,
            title: timer.title,
            project: timer.project,
          };

        return item;
      })
    );
  };

  const handleDeleteForm = (timer) => {
    const newTimers = timers.filter((t) => t.id !== timer.id);
    setTimers(newTimers);
  };

  const handleToggleButton = (timer) => {
    const newTimers = [...timers];
    const index = timers.indexOf(timer);
    newTimers[index] = { ...newTimers[index] };
    newTimers[index].isRunning = !newTimers[index].isRunning;
    setTimers(newTimers);
  };

  return (
    <div className="app">
      <p className="app__title">Timers</p>

      <div className="app__body">
        <ToggleableTimerForm isOpen={false} onSubmit={handleCreateForm} />

        {timers.map((timer) => (
          <EditableTimer
            key={timer.id}
            onSubmit={handleUpdateForm}
            onDelete={handleDeleteForm}
            onToggle={handleToggleButton}
            timer={timer}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
