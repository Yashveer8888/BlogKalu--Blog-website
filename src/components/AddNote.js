import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        // Check if all fields are valid
        if (note.title.length >= 5 && note.description.length >= 5) {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
            props.showalert("Added Successfully", "success");  // Ensure `showAlert` matches your prop name
        } else {
            props.showalert("Please enter a valid title and description (minimum 5 characters)", "danger");  // Ensure `showAlert` matches your prop name
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-5 gap-1 col-10">
            <h2>Add a Blog</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        placeholder='Enter Title'
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        placeholder='Enter Description'
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                        type="text"
                        placeholder='Enter Tag'
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={note.title.length < 5 || note.description.length < 5}
                >
                    Add Blog
                </button>
            </form>
        </div>
    );
};

export default AddNote;
