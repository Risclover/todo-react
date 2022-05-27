import React, { useEffect, useRef, useState } from 'react';
var classNames = require('classnames');

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    const importantClasses = classNames({ 
        importantOn: props.important, 
        importantOff: !props.important,
     })

     const checkmarkClasses = classNames({
         taskDone: props.completed,
         taskNotDone: !props.completed
     })
     
    function handleChange(e) {
        setNewName(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }
    const editingTemplate = (
        <form className="task-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input id={props.id} className="todo-title" type="text" value={newName} onChange={handleChange} ref={editFieldRef} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
                    Cancel 
                    <span className="visually-hidden">remaining {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save 
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    )
    const viewTemplate = (
    <div className="task-container">
        <div className="task-left">
            <input 
                id={props.id}
                type="checkbox" className="task-done" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} 
            />
            <p className={checkmarkClasses}>{props.name}</p>
        </div>
        <div className="task-right">
            <button 
                className={importantClasses} 
                onClick={() => props.toggleTaskImportant(props.id)}
            >
                <i className="fa-solid fa-star"></i>
            </button> 
            <button className="edit-task" onClick={() => setEditing(true)} ref={editButtonRef}><i className="fa-solid fa-pen-to-square"></i></button>
            <button className="delete-task" onClick={() => props.deleteTask(props.id)}><i className="fa-solid fa-trash"></i></button>
        </div>
    </div>
    )

    useEffect(() => {
        if(isEditing && !wasEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing])
    return (
        <li className="task">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}
