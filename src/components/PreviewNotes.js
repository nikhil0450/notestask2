import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, updateNote } from '../actions/notesAction';

import logo from '../description.png';

const PreviewNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [editingNote, setEditingNote] = useState(null);
  const [editedNote, setEditedNote] = useState({ title: "", description: "" });

  const handleDeleteNote = (noteId) => {
    dispatch(deleteNote(noteId));
  };

  const handleEditNote = (note) => {
    setEditingNote(note.id);
    setEditedNote({ title: note.title, description: note.description });
  };

  const handleSaveEdit = () => {
    dispatch(updateNote(editingNote, editedNote));
    setEditingNote(null);
    setEditedNote({ title: "", description: "" });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditedNote({ title: "", description: "" });
  };

  return (
    <div className="preview-notes mt-4">
      <div className="d-flex align-items-center mb-3">
      <img src={logo} alt="Logo" className="logo" />&nbsp;
        <h2 className="mb-0">My Notes</h2>
      </div>
      {notes.length === 0 ? (
        <p>No notes available. Add a new note to get started.</p>
      ) : (
        <div className="d-flex flex-wrap">
          {notes.map((note) => (
  <div className="card m-2" key={note.id} style={{ width: "200px" }}>
              <div className="card-body">
                {editingNote === note.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Title"
                      value={editedNote.title}
                      onChange={(e) =>
                        setEditedNote({ ...editedNote, title: e.target.value })
                      }
                    />
                    <textarea
                      className="form-control mb-2"
                      placeholder="Description"
                      value={editedNote.description}
                      onChange={(e) =>
                        setEditedNote({
                          ...editedNote,
                          description: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                  </>
                )}
              </div>
              <div
                className="card-footer"
                style={{
    "margin": "auto",
    "width": "100%",
    "textAlign": "center"}}>
                {editingNote === note.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSaveEdit}
                    >
                      <i className="fas fa-check"></i> Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCancelEdit}
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm me-2"
                      onClick={() => handleEditNote(note)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewNotes;