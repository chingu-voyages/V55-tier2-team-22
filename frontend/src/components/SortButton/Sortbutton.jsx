import { useState } from 'react';
import styles from './SortButton.module.css';

function SortButton({onSortChange}) {
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortChange = (field) => {
        setSortBy(field);
        onSortChange(field, sortOrder);
    };

    const handleOrderChange = (order) => {
        setSortOrder(order);
        onSortChange(sortBy, order);
    };


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