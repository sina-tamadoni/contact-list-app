import { useEffect, useState } from "react";
import "./Contacts.css";
import phoneBook from "../assets/images/PhoneBook.png";

function Contacts({
  contacts,
  setContacts,
  contactsBasedOnSearch,
  onDelete,
  editHandler,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(null);
  const [showSelectItem, setshowSelectItem] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const sortedContacts = contactsBasedOnSearch.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  function selectHandler(id) {
    const newContacts = [...contacts];
    const findedItem = contacts.findIndex((item) => item.id === id);
    newContacts[findedItem].isSelected = !newContacts[findedItem].isSelected;
    setSelectedItems((prevItems) => [...prevItems, newContacts[findedItem]]);
    setContacts(newContacts);
  }
  function selectAllHandler() {
    setIsSelectedAll((prevSelectedAll) => !prevSelectedAll);
  }
  function deleteHandler() {
    const filteredItems = contacts.filter((item) => !item.isSelected);
    setContacts(filteredItems);
  }
  function closeSelectedItemsHandler() {
    setshowSelectItem((prev) => !prev);
    setSelectedItems([]);
    setIsSelectedAll(false);
  }

  useEffect(() => {
    const newContacts = [...contacts];
    switch (isSelectedAll) {
      case true:
        newContacts.map((contact) => (contact.isSelected = true));
        setContacts(newContacts);
        setSelectedItems(newContacts);
        break;
      case false:
        newContacts.map((contact) => (contact.isSelected = false));
        setContacts(newContacts);
        setSelectedItems([]);
    }
  }, [isSelectedAll]);

  return (
    <div className="contacts-container">
      <div
        className={`contacts-container__title ${
          isOpen && "contacts-container__title__expanded"
        }`}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      >
        <h4>Contacts</h4>
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            transition: "all 0.2s",
            rotate: isOpen ? "180deg" : "0deg",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </div>

      <div
        className={`contacts-container__content ${
          isOpen && "contacts-container__content__expanded"
        }`}
      >
        {!contacts.length ? (
          <EmptyList />
        ) : (
          <div>
            <Select
              contacts={contacts}
              closeSelectedItemsHandler={closeSelectedItemsHandler}
              showSelectItem={showSelectItem}
              setshowSelectItem={setshowSelectItem}
              selectedItems={selectedItems}
              deleteHandler={deleteHandler}
              selectAllHandler={selectAllHandler}
            />
            {sortedContacts.map((contact) => {
              return (
                <Contact
                  contact={contact}
                  key={contact.id}
                  contactOpen={contactOpen}
                  setContactOpen={setContactOpen}
                  onDelete={onDelete}
                  editHandler={editHandler}
                  showSelectItem={showSelectItem}
                  selectHandler={selectHandler}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Contacts;

function EmptyList() {
  return (
    <figure>
      <img src={phoneBook} alt="" />
      <figcaption>
        Contact list will appear here when a contact is added
      </figcaption>
    </figure>
  );
}

function Contact({
  contact,
  contactOpen,
  setContactOpen,
  onDelete,
  editHandler,
  showSelectItem,
  selectHandler,
}) {
  const isOpen = contact.id === contactOpen;
  return (
    <div className="contact-container">
      <div className="contact-container__header">
        <div className="contact-container__image-and-name">
          <div className="contact-container__image">
            {contact.image ? (
              <img src={contact.image} alt="" />
            ) : (
              <div className="contact-container__image-no-image">
                {contact.name[0]}
              </div>
            )}
          </div>
          <p>{contact.name}</p>
        </div>
        {showSelectItem && (
          <input
            type="checkbox"
            name=""
            id=""
            checked={contact.isSelected}
            className="selectIttemInput"
            onChange={() => selectHandler(contact.id)}
          />
        )}
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            transition: "all 0.2s",
            rotate: isOpen ? "180deg" : "0deg",
          }}
          onClick={() =>
            setContactOpen((prevContactOpen) =>
              contact.id === prevContactOpen ? null : contact.id
            )
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          ></path>
        </svg>
      </div>
      <ContactDetails
        contactOpen={contactOpen}
        contact={contact}
        isOpen={isOpen}
        onDelete={onDelete}
        editHandler={editHandler}
      />
    </div>
  );
}

function ContactDetails({ contact, isOpen, onDelete, editHandler }) {
  return (
    <figure
      className={`contactDetails-container ${
        isOpen && "contactDetails-container__expanded"
      }`}
    >
      <div className="contactDetails-container__icons-box">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={() => editHandler(contact)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          ></path>
        </svg>
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={() => onDelete(contact.id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          ></path>
        </svg>
      </div>
      {contact.image && (
        <div className="contactDetails-container__image">
          <img src={contact.image} alt={contact.name} />
        </div>
      )}
      <figcaption>
        <div className="contactDetails-container__item">
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            ></path>
          </svg>
          <p>{contact.name}</p>
        </div>

        <div className="contactDetails-container__item">
          <a href={`tel:${contact.phone}`}>
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
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              ></path>
            </svg>
          </a>
          <p>{contact.phone}</p>
        </div>

        <div className="contactDetails-container__item">
          <a href={`mailto:${contact.email}`}>
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
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              ></path>
            </svg>
          </a>
          <p title={contact.email}>{contact.email}</p>
        </div>

        <div className="contactDetails-container__item-birthday-and-label">
          <div>
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
                d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
              ></path>
            </svg>
            <p>
              {contact.birthday
                ? new Date(contact.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date of birth not entered"}
            </p>
          </div>
          <span>{contact.label}</span>
        </div>
      </figcaption>
    </figure>
  );
}

function Select({
  contacts,
  closeSelectedItemsHandler,
  showSelectItem,
  setshowSelectItem,
  selectedItems,
  deleteHandler,
  selectAllHandler,
}) {
  return (
    contacts.length &&
    (!showSelectItem ? (
      <div className="select-contact" onClick={closeSelectedItemsHandler}>
        <span className="select-contact__icon"></span>
        <p>Select contacts</p>
      </div>
    ) : (
      <div className="select-contact-items">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          onClick={() => setshowSelectItem(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          ></path>
        </svg>
        <h4>Select contacts</h4>
        <div className="trash-and-selectAll-icons">
          {selectedItems.length ? (
            <svg
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              onClick={deleteHandler}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              ></path>
            </svg>
          ) : null}
          <div className="list-check-icon" onClick={selectAllHandler}></div>
        </div>
      </div>
    ))
  );
}
