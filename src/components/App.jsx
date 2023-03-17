import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import styles from "./App.module.css"

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    setFilter(e.target.value);
  }

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase()===normalizedName;
    })
    return Boolean(result);
  }

  const formSubmitHandler = data => {
    if (isDublicate(data.name)) {
      return alert(`${data.name} is already in contacts`);
    }

    setContacts(contacts => {
      const newContact = {
        id: nanoid(),
        name: data.name,
        number: data.number
      }

      return [newContact, ...contacts];
    });
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return (name.toLowerCase().includes(normalizedFilter))
    })
    return result;
  }

  const removeContact = id => {
    setContacts(contacts => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return newContacts;
    })
  }

  return <div className={styles.app}>
      <h1>Phonebook</h1>
      <Form
        onSubmit={formSubmitHandler}
      />
      <h2>Contacts:</h2>
      <Filter handleInput={handleChange}/>
      <ContactList
        contacts={getFilteredContacts()}
        removeContact={removeContact}
      />
    </div>;
}
