import classNames from "classnames";
import { useState } from "react";
import Icon from "../icon/Icon";
import styles from "./Input.module.scss";

const Input = ({
  id,
  label,
  name = "",
  labelVisible,
  icon,
  email,
  password,
  placeholder = "",
  readOnly,
  disabled,
  value,
  error: errorProps,
  className = "",
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const checkType = () => {
    if (email) return "email";
    if (password) return isPasswordVisable ? "text" : "password";
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const iconType = isPasswordVisable ? "show" : "hide";
  const iconLabel = `비밀번호 ${isPasswordVisable ? "표시" : "감춤"}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>
      <div
        className={classNames(
          styles.inputWrapper,
          errorProps && styles.inputWrapperError
        )}
      >
        {icon ? <Icon type={icon} /> : null}
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />
        {password ? (
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsPasswordVisable((prev) => !prev)}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>
      {errorProps && (
        <span role="alert" className={styles.error}>
          {errrorProps.message}
        </span>
      )}
    </div>
  );
};

export default Input;
