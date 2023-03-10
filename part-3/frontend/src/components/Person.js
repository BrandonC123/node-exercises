import React from "react";
import personService from "../services/persons";

const Person = ({ name, number, allPersons, setAllPersons, setMessage }) => {
    const handleDeleteClick = () => {
        const filteredPerson = allPersons.filter((person) => {
            return person.name === name;
        });
        if (window.confirm(`Delete ${name} ?`)) {
            personService.remove(filteredPerson[0]._id);
            console.log(filteredPerson);
            console.log(`${filteredPerson[0].name} successfully deleted`);
            setMessage(`${name} was successfully deleted`);
            setAllPersons(
                allPersons.filter((person) => {
                    return person._id !== filteredPerson[0]._id;
                })
            );
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    return (
        <li>
            {name} {number} <button onClick={handleDeleteClick}>delete</button>
        </li>
    );
};

export default Person;
