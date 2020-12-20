import React from 'react';
import './style.css';

const Button: React.FC<Props> = ({
  isFull,
  title,
  variant = 'primary',
  ...props
}) => {
  return (
    <button
      className={`button button--${variant} ${isFull ? 'button--full' : ''}`}
      {...props}
    >
      {title}
    </button>
  );
};

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isFull: boolean;
  variant: 'primary' | 'danger' | 'warning';
};

export default Button;
