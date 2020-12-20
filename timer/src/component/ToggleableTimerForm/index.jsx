import React, { memo, useState } from 'react';
import Button from '../Button';
import TimerForm from '../TimerForm';

const ToggleableTimerForm = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (timer) => {
    onSubmit(timer);

    handleFormClose();
  };

  const handleFormClose = () => {
    setIsOpen(false);
  };

  const handleFormOpen = () => {
    setIsOpen(true);
  };
  return (
    <div>
      {isOpen ? (
        <TimerForm onSubmit={handleSubmit} onClose={handleFormClose} />
      ) : (
        <Button
          isFull
          title='+'
          style={{ fontSize: '24px' }}
          onClick={handleFormOpen}
        />
      )}
    </div>
  );
};

export default memo(ToggleableTimerForm);
