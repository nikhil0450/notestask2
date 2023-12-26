// actions/index.js
export const addNote = (note) => ({
    type: 'ADD_NOTE',
    payload: note,
  });
  
  export const deleteNote = (noteId) => ({
    type: 'DELETE_NOTE',
    payload: noteId,
  });
  
  export const updateNote = (id, updatedNote) => ({
    type: 'UPDATE_NOTE',
    payload: { id, updatedNote },
  });
  