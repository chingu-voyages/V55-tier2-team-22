import styles from "./PaginationBar.module.css";

function PageButton({ children, isCurrent, isDisabled, onClick }) {
  if (isCurrent) {
    return (
      <button className={styles.page_button_current} disabled={true}>
        {children}
      </button>
    );
  } else {
    return (
      <button className={styles.page_button} onClick={onClick} disabled={isDisabled}>
        {children}
      </button>
    );
  }
}

export default PageButton;
