import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s']+$/,
      "Name should contain only letters"
    )
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(7, "Must be in format XXXXXXX")
    .max(7, "Too long")
    .required("Required"),
});

const initialValues = { name: "", number: "" };

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const phoneFieldId = useId();
  const modifyphone = (number) => {
    const stringNumber = number.toString();
    return (
      stringNumber.slice(0, 3) +
      "-" +
      stringNumber.slice(3, 5) +
      "-" +
      stringNumber.slice(5)
    );
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: modifyphone(values.number),
      })
    );
    console.log(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <div className={css.formfield}>
          <label htmlFor={nameFieldId}>Username</label>
          <Field
            placeholder="Firstname Lastname"
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.formfield}>
          <label htmlFor={phoneFieldId}>Number</label>
          <Field
            placeholder="1234567"
            className={css.field}
            type="number"
            name="number"
            id={phoneFieldId}
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
