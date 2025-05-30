import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {


  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.input_container}>

      <input
        type="text"
        placeholder="Search..."
        className={styles.search_bar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <button
          className={styles.remove_icon}
          onClick={() => setSearchTerm('')}
        >
          ×
        </button>
      )}

    </div>
  );
}

export default SearchBar;