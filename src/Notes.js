import React, { useState, useEffect } from 'react';

const StickyNotes = () => {
  // State to store the value of the input field
  const [inputValue, setInputValue] = useState('');
  
  // State to store an array of notes, initialized with data from localStorage
  const [notes, setNotes] = useState(() => {
    // Retrieve the notes from localStorage on component mount
    const savedNotes = localStorage.getItem('stickyNotes');
    return savedNotes ? JSON.parse(savedNotes) : []; // Parse the notes or return an empty array if none are found
  });

  // Function to update inputValue when the user types
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to add a new note
  const handleAddNote = () => {
    if (inputValue.trim() !== '') {
      const newNote = { text: inputValue, isEditing: false };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setInputValue(''); // Clear input field
    }
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Function to toggle edit mode for a note
  const handleEditNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, isEditing: !note.isEditing } : note
    );
    setNotes(updatedNotes);
  };

  // Function to update the note text while editing
  const handleNoteChange = (event, index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, text: event.target.value } : note
    );
    setNotes(updatedNotes);
  };

  // Use useEffect to store notes in localStorage whenever the notes array changes
  useEffect(() => {
    // Store the notes array in localStorage after each change
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]); // Run this effect whenever 'notes' changes

  return (
    <div>
      <h2>Sticky Notes with Add, Edit, and Delete</h2>
      
      {/* Text box for user input */}
      <input 
        type="text" 
        placeholder="Enter note text" 
        value={inputValue} 
        onChange={handleInputChange} 
      />

      {/* Button to add a new note */}
      <button onClick={handleAddNote}>Add Note</button>

      {/* Render all sticky notes */}
      <div>
        {notes.map((note, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px', backgroundColor: '#ffeb3b', width: '200px', position: 'relative' }}>
            {/* Conditional rendering based on whether the note is being edited */}
            {note.isEditing ? (
              <input 
                type="text" 
                value={note.text} 
                onChange={(event) => handleNoteChange(event, index)} 
              />
            ) : (
              <p>{note.text}</p>
            )}

            {/* Buttons to edit and delete the note */}
            <button onClick={() => handleEditNote(index)}>
              {note.isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;
