function Header() {

  return (
    <header className="header">
        <div className="container header-bar">
            <p className="logo-name">AppName</p>
        </div>
        <div className="container header-mid">
            <h1>Welcome to AppName </h1>
            <p>A collection of over 200 resources for Developers and Designers, all in one place</p>
        </div>
        <div className="container input-container">
            <input
                type="text"
                placeholder="Search..."
                className="search-bar"
            />
        </div>

      
    </header>
  );
}

export default Header;