import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
const Contact = ({ data: { id, name, number } }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <div className={css.contact}>
        <p className={css.text}>
          <FaUser />
          <span>{name}</span>
        </p>
        <p className={css.text}>
          <FaPhoneAlt />
          <span>{number}</span>
        </p>
      </div>
      <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
