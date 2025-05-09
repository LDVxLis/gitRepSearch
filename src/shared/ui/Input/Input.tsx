import React from "react";
import styles from "./Input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return <input className={styles.input} {...props} />;
};
