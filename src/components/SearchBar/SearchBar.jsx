import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(16, "Too Long!")
    .required("Required"),
});

const SearchBar = ({ onSearch }) => {
  const notify = () =>
    toast("Input field is empty. Input words for search images");

  const handleSubmit = (values, actions) => {
    const newValues = values;
    console.log("Input field is empty? - ", !values.username);

    if (!values.username) {
      notify();
      return;
    }

    onSearch(newValues);
    actions.resetForm();
  };
  const initialValues = {
    username: "",
  };

  return (
    <div className={css.header}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ContactSchema}
      >
        <Form className={css.form}>
          <div>
            <label htmlFor={"username"}></label>
            <p>
              <Field
                type="text"
                name="username"
                className={css.field}
                placeholder="Input word for search images "
              />
              <ErrorMessage
                className={css.error}
                name="username"
                component="span"
              />
            </p>
          </div>

          <button type="submit" className={css.btn}>
            Search
          </button>
        </Form>
      </Formik>
      <Toaster />
    </div>
  );
};
export default SearchBar;
