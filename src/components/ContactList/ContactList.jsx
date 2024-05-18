// import PropTypes from "prop-types";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectContacts, selectFilter } from "../../redux/selectors";

const ContactList = () => {
  const { contacts } = useSelector(selectContacts);
  const { filter } = useSelector(selectFilter);
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map((contact) => (
        <li className={css.item} key={contact.id}>
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
