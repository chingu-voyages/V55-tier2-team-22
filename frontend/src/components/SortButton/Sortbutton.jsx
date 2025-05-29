import { useState } from 'react';
import styles from './SortButton.module.css';

function SortButton() {
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
        onSortChange(field, order); // call parent with new values
    };

  return (
    <>
        <div className={styles.container}> 

            <button className={styles.sort_button}>Sort by</button>

            <div className={styles.sortOptions}>
                <button className={styles.toggleButton}>Title</button>



                
                <button className={styles.toggleButton}>Date</button>
                <p className={styles.toggleBorder}></p>
                <button className={styles.toggleButton}>Asc</button>
                <button className={styles.toggleButton}>Desc</button>
            </div>
        </div>
    </>
  );
}

export default SortButton;