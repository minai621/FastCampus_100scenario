import styles from './Divider.module.scss';
import classNames from "classnames";

const Divider = ({
  space = 22,
  color = "#ccc",
  className = "",
  ...restProps
}) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
  };
  return (
    <div
      role="presentation"
      className={classNames(styles.line, className)}
      style={style}
      {...restProps}
    />
  );
};

export default Divider;
