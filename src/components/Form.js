import React, { useState } from 'react';

function Form(props) {
    const [name, setName] = useState('');

    function handleChange(e) {
        setName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(name !== "" && name !== " ") {
            props.addTask(name);
            setName("");
        } else {
            alert("ERROR: Can't add an empty task.")
        }

        e.target.focus();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" id="task-input" value={name} onChange={handleChange} />
            <button type="submit" id="submit-task">Add Task</button>
        </form>
    )
}

export default Form;
