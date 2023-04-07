import React, { useState } from 'react';
import AddForm from './AddForm';
import axios from 'axios';

function App() {
  const [forms, setForms] = useState([]);

  const handleAddFormClick = () => {
    setForms([...forms, {}]);
  };

  const handleFormChange = (index, newFormData) => {
    setForms(prevForms => {
      const newForms = [...prevForms];
      newForms[index] = newFormData;
      return newForms;
    });
  };

  const handleConfirmClick = () => {
    console.log(forms);
    setForms([]);
    forms.forEach((form, index) => {
      console.log(`Form ${index + 1}:`);
      console.log(`Name: ${form.name}`);
      console.log(`Email: ${form.email}`);
      console.log(`Message: ${form.message}`);
    });
  };
  

  
  

  return (
    <div>
      <h1>Add Form</h1>
      <button onClick={handleAddFormClick}>Add Form</button>
      {forms.map((formData, index) => (
        <div key={index}>
          <h2>Form {index + 1}</h2>
          <AddForm formData={formData} onChange={newFormData => handleFormChange(index, newFormData)} />
        </div>
      ))}
      {forms.length > 0 && (
        <button onClick={handleConfirmClick}>Confirm</button>
      )}
    </div>
  );
}

export default App;
