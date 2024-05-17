import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import css from "./App.module.css";
import { useState, useEffect } from "react";
import initialContacts from "../Data/initialContacts";

export default function App() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("ContactsState")) || initialContacts
  );

  useEffect(() => {
    localStorage.setItem("ContactsState", JSON.stringify(tasks));
  }, [tasks]);

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

  const [filter, setFilter] = useState("");

  const addTask = ({ id, username: name, phone: number }) => {
    number = modifyphone(number);
    const newTask = { id, name, number };
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId);
    });
  };

  const visibleTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addTask} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleTasks} onDelete={deleteTask} />
    </div>
  );
}
