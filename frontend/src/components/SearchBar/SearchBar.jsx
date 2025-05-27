import styles from './SearchBar.module.css';

function SearchBar() {

  return (
        <div className= {styles.input_container}>
            <input
                type="text"
                placeholder="Search..."
                className={styles.search_bar}
            />
        </div>
  );
}

export default SearchBar;