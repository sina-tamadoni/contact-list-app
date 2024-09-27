import { useContext } from "react";
import "./Header.css";
import { MainContext } from "../../App";
function Header() {
  const { setSwitchPage, searchedContact, setSearchedContact } =
    useContext(MainContext);
  return (
    <header>
      <div className="search-container">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          ></path>
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search contacts"
          value={searchedContact}
          onChange={(event) =>
            setSearchedContact(event.target.value.toLowerCase())
          }
          name=""
          id=""
        />
      </div>
      <div className="create-contact-container">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={() => setSwitchPage(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          ></path>
        </svg>
        <p>Create new contact</p>
      </div>
    </header>
  );
}

export default Header;
