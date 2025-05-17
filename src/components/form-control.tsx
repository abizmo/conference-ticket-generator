import type { PropsWithChildren } from "preact/compat";
import styles from "./form-control.module.css";

interface FormControlProps {
  className?: string;
}
function FormControl({
  className,
  children,
}: PropsWithChildren<FormControlProps>) {
  const classes = [styles.formControl];
  if (className) classes.push(className);

  return <div className={classes.join(" ")}>{children}</div>;
}

export default FormControl;
