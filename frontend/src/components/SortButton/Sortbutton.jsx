import styles from './SortButton.module.css';

function SortButton() {
  return (
    <>
        <div className={styles.container}> 
            <button className={styles.sort_button}>
                Sort by
            
            </button>
        </div>
    </>
  );
}

export default SortButton;