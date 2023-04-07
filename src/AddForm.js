import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

function AddForm({ formData, onChange }) {
    const handleNameChange = e => {
      onChange({ ...formData, name: e.target.value });
    };
  
    const handleEmailChange = e => {
      onChange({ ...formData, email: e.target.value });
    };
  
    const handleMessageChange = e => {
      onChange({ ...formData, message: e.target.value });
    };
  
    return (
      <div>
        <label>
          Name:
          <input type="text" value={formData.name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={formData.email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Message:
          <textarea value={formData.message} onChange={handleMessageChange} />
        </label>
      </div>
    );
  }
  

export default AddForm;
