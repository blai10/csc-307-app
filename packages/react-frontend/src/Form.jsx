// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({ ...prevPerson, [name]: value }));
  }

  function submitForm() {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json(); 
        } else {
          throw new Error("Failed to create user");
        }
      })
      .then((newUser) => {
        props.handleSubmit(newUser); 
        setPerson({ name: "", job: "" }); 
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;