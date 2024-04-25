import { FC, memo } from "react";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick?: () => Promise<void> | void;
  className: string;
};

export const Button: FC<ButtonProps> = memo(
  ({ text, disabled, onClick, className }) => (
    <button
      type="button"
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {text}
    </button>
  )
);
