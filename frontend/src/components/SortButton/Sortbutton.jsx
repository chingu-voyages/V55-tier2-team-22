import { useState } from 'react';
import styles from './SortButton.module.css';

function SortButton() {


  return (
    <>
        <div className={styles.container}> 
            <button className={styles.sort_button}>
                Sort by
            
            </button>
            <div className={styles.sortOptions}>
                <button className={styles.toggleButton}>Title</button>
                <button className={styles.toggleButton}>Date</button>
                <button className={styles.toggleButton}>Asc</button>
                <button className={styles.toggleButton}>Desc</button>


                
            </div>
        </div>
    </>
  );
}

export default SortButton;