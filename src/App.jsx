import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CreateContact from "./components/CreateContact/CreateContact";
import Contacts from "./components/Contacts/Contacts";
import Toast from "./components/Toast/Toast";
import EditPage from "./components/EditPage/EditPage";

export const MainContext = createContext();

function App() {
  const [switchPage, setSwitchPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [contacts, setContacts] = useState(
    localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts"))
      : []
  );
  const [searchedContact, setSearchedContact] = useState("");
  const [contactsBasedOnSearch, setContactsBasedOnSearch] = useState([]);
  const [toast, setToast] = useState("");
  const [isToast, setIsToast] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItemDetail, setEditItemDetail] = useState(null);
  function searchHandler() {
    if (!searchedContact) {
      setContactsBasedOnSearch(contacts);
    } else {
      const newContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchedContact)
      );
      setContactsBasedOnSearch(newContacts);
    }
  }
  function deleteHandler(id) {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  }
  function editHandler(contact) {
    setEditItemDetail(contact);
    setIsEditOpen(true);
  }
  useEffect(() => {
    setContactsBasedOnSearch(contacts);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    searchHandler();
  }, [searchedContact]);

  return (
    <MainContext.Provider
      value={{
        contacts,
        setContacts,
        setSwitchPage,
        setToast,
        setIsToast,
        selectedImage,
        setSelectedImage,
        editItemDetail,
        setIsEditOpen,
        searchedContact,
        setSearchedContact,
        toast,
        isToast,
        contactsBasedOnSearch,
        editHandler,
        deleteHandler,
      }}
    >
      <div className="container">
        {isEditOpen ? (
          <EditPage />
        ) : !switchPage ? (
          <>
            <Header />
            <Contacts />
          </>
        ) : (
          <CreateContact />
        )}
      </div>
      <Toast />
    </MainContext.Provider>
  );
}

export default App;
