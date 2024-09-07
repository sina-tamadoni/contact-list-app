import "./EditPage.css";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import irancell from "../assets/images/irancell.png";
import hamraheAval from "../assets/images/hamrahaval.png";
import rightel from "../assets/images/rightel.png";

function EditPage({
  contacts,
  setContacts,
  setIsEditOpen,
  setToast,
  setIsToast,
  selectedImage,
  setSelectedImage,
  editItemDetail,
}) {
  const pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}";
  const regexPattern = new RegExp(pattern);
  const [operator, setOperator] = useState(null);
  const { id, name, phone, email, label, birthday } = editItemDetail;

  const [contact, setContact] = useState({
    id: id,
    name: name,
    phone: phone,
    email: email,
    label: label,
    birthday: birthday,
    image: selectedImage,
  });

  const [errors, setErrors] = useState({});
  function detectOperator(phone) {
    const mtnPrefixes = [
      "0930",
      "0933",
      "0935",
      "0936",
      "0937",
      "0938",
      "0939",
      "0900",
      "0901",
      "0902",
      "0903",
      "0904",
      "0905",
      "0941",
    ];
    const hamrahPrefixes = [
      "0910",
      "0911",
      "0912",
      "0913",
      "0914",
      "0915",
      "0916",
      "0917",
      "0918",
      "0919",
      "0990",
      "0991",
      "0992",
      "0993",
      "0994",
      "0903",
    ];
    const rightelPrefixes = ["0920", "0921", "0922"];
    if (!phone || phone.length < 4) {
      setOperator(null);
    }
    if (mtnPrefixes.some((prefix) => phone.startsWith(prefix))) {
      setOperator(irancell);
    } else if (hamrahPrefixes.some((prefix) => phone.startsWith(prefix))) {
      setOperator(hamraheAval);
    } else if (rightelPrefixes.some((prefix) => phone.startsWith(prefix))) {
      setOperator(rightel);
    } else null;
  }
  function selectImageHandler(event) {
    const file = event.target.files?.[0];
    setSelectedImage(file ? URL.createObjectURL(file) : undefined);
  }
  function changeHandler(event) {
    setContact((prevContact) => ({
      ...prevContact,
      [event.target.name]: event.target.value,
    }));
  }
  function saveContactHandler(event) {
    event.preventDefault();
    const validationErrors = {};
    if (contact.name.trim() === "" || contact.name == null) {
      validationErrors.nameErr = "This field is required";
    } else if (contact.name.length < 3) {
      validationErrors.nameErr =
        "The entered name must be more than 2 characters";
    }
    if (contact.phone.trim() === "" || contact.phone == null) {
      validationErrors.phoneErr = "This field is required";
    } else if (contact.phone.length > 11) {
      validationErrors.phoneErr =
        "The entered number must be a maximum of 11 digits";
    }

    if (contact.email.trim() === "" || contact.email == null) {
      validationErrors.emailErr = "This field is required";
    } else if (!contact.email.match(regexPattern)) {
      validationErrors.emailErr = "Please enter a valid email address";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const newContacts = [...contacts];
      const finded = newContacts.findIndex((contact) => contact.id === id);
      const newContact = { ...contact, image: selectedImage };
      newContacts[finded] = newContact;
      setContacts(newContacts);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      setToast(`${contact.name} added to your contact list `);
      setIsToast(true);
      setIsEditOpen(false);
    }
  }
  useEffect(() => {
    detectOperator(contact.phone);
  }, [contact.phone]);
  useEffect(() => {
    setSelectedImage(selectedImage);
  }, []);

  return (
    <form autoComplete="off">
      <div className="createContact-header">
        <div className="createContact-header__title-box">
          <svg
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={() => setIsEditOpen(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
          <h3>Edit contact</h3>
        </div>
        <button onClick={saveContactHandler}>Save</button>
      </div>

      <div className="image-picker-container">
        {!selectedImage ? (
          <div className="image-picker">
            <label htmlFor="files" className="btn">
              <div className="photo-icon"></div>
              <div className="plus-icon"></div>
            </label>
            <input
              type="file"
              accept="image/*"
              name=""
              id="files"
              title=""
              onChange={selectImageHandler}
            />
          </div>
        ) : (
          <div className="file-selector">
            <input
              type="file"
              accept="image/*"
              name=""
              id="files"
              title=""
              onChange={selectImageHandler}
            />
            <img src={selectedImage} alt="" className="profile-image__active" />
          </div>
        )}
      </div>
      <div className="add-picture-options">
        {selectedImage && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </span>
        )}
      </div>

      <div className="inputs-container">
        <div className="inputs-container__item">
          <div className="inputs-container__item-icon-and-input">
            <span className="inputs-container__item__icon">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              name="name"
              id=""
              placeholder="Name"
              value={contact.name}
              onChange={changeHandler}
              autoComplete="off"
            />
          </div>
          <div className="errorMessage">{errors.nameErr && errors.nameErr}</div>
        </div>

        <div className="inputs-container__item">
          <div className="inputs-container__item-icon-and-input">
            <span className="inputs-container__item__icon">
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
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                ></path>
              </svg>
            </span>
            <div className="inputs-container__item-icon-and-input__phone-input">
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={contact.phone}
                onChange={changeHandler}
                autoComplete="off"
              />
              {operator && <img src={operator} alt="" />}
            </div>
          </div>
          <div className="errorMessage">
            {errors.phoneErr && errors.phoneErr}
          </div>
        </div>

        <div className="inputs-container__item">
          <div className="inputs-container__item-icon-and-input">
            <span className="inputs-container__item__icon">
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
            </span>
            <input
              type="text"
              name="email"
              id=""
              placeholder="Email"
              value={contact.email}
              onChange={changeHandler}
              autoComplete="off"
            />
          </div>
          <div className="errorMessage">
            {errors.emailErr && errors.emailErr}
          </div>
        </div>

        <div className="inputs-container__item">
          <div className="inputs-container__item-icon-and-input">
            <span className="inputs-container__item__icon">
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
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                ></path>
              </svg>
            </span>
            <select
              name="label"
              id=""
              value={contact.label}
              onChange={changeHandler}
            >
              <option value="family">Family</option>
              <option value="friend">Friend</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>

        <div className="inputs-container__item">
          <div className="inputs-container__item-icon-and-input">
            <span className="inputs-container__item__icon">
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
                  d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                ></path>
              </svg>
            </span>
            <input
              type="date"
              name="birthday"
              id=""
              value={contact.birthday}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditPage;
