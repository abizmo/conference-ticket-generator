import type { PropsWithChildren } from "preact/compat";
import styles from "./form-message.module.css";

interface FormMessageProps {
  error: boolean;
}

function FormMessage({ children, error }: PropsWithChildren<FormMessageProps>) {
  const classes = [styles.formMessage];
  if (error) classes.push(styles.error);

  return (
    <p className={classes.join(" ")}>
      <span>
        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
          />
          <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.004 10.462V7.596M8 5.569v-.042"
          />
        </svg>
      </span>
      {children}
    </p>
  );
}

export default FormMessage;
