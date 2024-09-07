import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CreateContact from "./components/CreateContact";
import Contacts from "./components/Contacts";
import Toast from "./components/Toast";
import EditPage from "./components/EditPage";

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
    <div className="container">
      {isEditOpen ? (
        <EditPage
          contacts={contacts}
          setContacts={setContacts}
          setSwitchPage={setSwitchPage}
          setToast={setToast}
          setIsToast={setIsToast}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          editItemDetail={editItemDetail}
          setIsEditOpen={setIsEditOpen}
        />
      ) : !switchPage ? (
        <>
          <Header
            setSwitchPage={setSwitchPage}
            searchedContact={searchedContact}
            setSearchedContact={setSearchedContact}
          />
          <Contacts
            contacts={contacts}
            setContacts={setContacts}
            contactsBasedOnSearch={contactsBasedOnSearch}
            onDelete={deleteHandler}
            editHandler={editHandler}
          />
        </>
      ) : (
        <CreateContact
          contacts={contacts}
          setContacts={setContacts}
          setSwitchPage={setSwitchPage}
          setToast={setToast}
          setIsToast={setIsToast}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <Toast
        toast={toast}
        setToast={setToast}
        isToast={isToast}
        setIsToast={setIsToast}
        selectedImage={selectedImage}
      />
    </div>
  );
}

export default App;
