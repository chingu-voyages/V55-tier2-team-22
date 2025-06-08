import { useState } from 'react';
import styles from './SortDropdown.module.css';

function SortButton({ onSortChange }) {
  const [showOptions, setShowOptions] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSortField = (field) => {
    setSortBy(field);
    onSortChange(field, sortOrder);
  };

  const handleSortOrder = (order) => {
    setSortOrder(order);
    onSortChange(sortBy, order);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.sort_button}
        onClick={() => setShowOptions(prev => !prev)}
      >
        Sort by
      </button>

      {showOptions && (
        <div className={styles.sortOptions}>
          <button
            className={`${styles.toggleButton} ${sortBy === 'title' ? styles.active : ''}`}
            onClick={() => handleSortField('title')}
          >
            Title
          </button>
          <button
            className={`${styles.toggleButton} ${sortBy === 'date' ? styles.active : ''}`}
            onClick={() => handleSortField('date')}
          >
            Date
          </button>

          <p className={styles.toggleBorder}></p>

          <button
            className={`${styles.toggleButton} ${sortOrder === 'asc' ? styles.active : ''}`}
            onClick={() => handleSortOrder('asc')}
          >
            Asc
          </button>
          <button
            className={`${styles.toggleButton} ${sortOrder === 'desc' ? styles.active : ''}`}
            onClick={() => handleSortOrder('desc')}
          >
            Desc
          </button>
        </div>
      )}
    </div>
  );
}

export default SortButton;