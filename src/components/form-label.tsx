import type { HTMLAttributes } from "preact/compat";
import styles from "./form-label.module.css";

interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {}
function FormLabel({ className, children, ...rest }: FormLabelProps) {
  const classes = [styles.formLabel];
  if (className) classes.push(className as string);

  return (
    <label className={classes.join(" ")} {...rest}>
      {children}
    </label>
  );
}

export default FormLabel;
