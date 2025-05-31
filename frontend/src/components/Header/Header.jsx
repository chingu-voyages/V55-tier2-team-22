import styles from './Header.module.css';


function Header({ total }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className={styles.header}>
       <div className={`${styles.container} ${styles.header_bar}`}>
            <p className={styles.logo_name}>AppName</p>
            <p className={styles.header_date}>{currentDate}</p>
        </div>
        <div className={`${styles.container} ${styles.header_mid}`}>
            <h1>Welcome to AppName </h1>
            <p>A collection of <b>{total}</b> resources for Developers and Designers, all in one place</p>
        </div>
    </header>
  );
}

export default Header;