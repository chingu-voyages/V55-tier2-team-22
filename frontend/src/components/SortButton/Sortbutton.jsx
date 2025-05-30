import { useState } from 'react';
import styles from './SortButton.module.css';

function SortButton() {
    const [showOptions, setShowOptions] = useState(false);

  return (
    <>
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
            className={styles.toggleButton}
            onClick={() => handleSort('title', sortOrder)}
          >
            Title
          </button>
          <button
            className={styles.toggleButton}
            onClick={() => handleSort('date', sortOrder)}
          >
            Date
          </button>

          <p className={styles.toggleBorder}></p>

          <button
            className={styles.toggleButton}
            onClick={() => handleSort(sortBy, 'asc')}
          >
            Asc
          </button>
          <button
            className={styles.toggleButton}
            onClick={() => handleSort(sortBy, 'desc')}
          >
            Desc
          </button>
        </div>
      )}
        </div>
    </>
  );
}

export default SortButton;