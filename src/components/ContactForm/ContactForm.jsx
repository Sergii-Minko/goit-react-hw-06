import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Zа-яА-ЯїЇіІєЄёЁґҐ\s']+$/,
      "Name should contain only letters"
    )
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(7, "Must be in format XXXXXXX")
    .max(7, "Too long")
    .required("Required"),
});

const initialValues = {
  username: "",
  phone: "",
};

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  const handleSubmit = (values, actions) => {
    const id = nanoid();
    onAdd({ id, ...values });
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
            name="username"
            id={nameFieldId}
          />
          <ErrorMessage
            className={css.error}
            name="username"
            component="span"
          />
        </div>

        <div className={css.formfield}>
          <label htmlFor={phoneFieldId}>Number</label>
          <Field
            placeholder="1234567"
            className={css.field}
            type="number"
            name="phone"
            id={phoneFieldId}
          />
          <ErrorMessage className={css.error} name="phone" component="span" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
