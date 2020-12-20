import React from "react";
import { millisecondsToHuman } from "../../utils/TimerUtils";
import Button from "../Button";
import "./styles.css";

const Timer = ({ timer, onEdit, onDelete, onToggle }) => {
  const { isRunning, title, project, eslapsed = 0 } = timer;

  return (
    <div className="timer">
      <p className="timer__title">{title}</p>
      <p className="timer__project">{project}</p>

      <p className="timer__time">{millisecondsToHuman(eslapsed)}</p>

      <div className="timer__button-group">
        <Button variant="warning" title="Edit" onClick={onEdit} />
        <Button
          variant="danger"
          title="Remove"
          onClick={() => onDelete(timer)}
        />
      </div>

      <Button
        isFull
        variant={isRunning ? "danger" : "primary"}
        title={isRunning ? "Stop" : "Start"}
        onClick={() => onToggle(timer)}
      />
    </div>
  );
};

export default Timer;
