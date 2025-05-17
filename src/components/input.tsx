import type { HTMLAttributes } from "preact/compat";
import type { Key } from "../schemas/ticket-schema";
import styles from "./input.module.css";

interface InputProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onInput" | "id"> {
  onInput: (key: Key, value: string) => void;
  id: Key;
  error?: boolean;
}

function Input({ id, onInput, error }: InputProps) {
  const classes = [styles.input];
  if (error) classes.push(styles.error);
  return (
    <input
      className={classes.join(" ")}
      onInput={(e) => onInput(id, (e.target as HTMLInputElement).value)}
    />
  );
}

export default Input;
