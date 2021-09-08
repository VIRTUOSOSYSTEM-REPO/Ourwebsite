import React, { useState } from 'react';
import './contact.css';
const ContactForm = () => {
  const [status, setStatus] = useState('Send');
  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    const { name, email, message, phone } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };
    let response = await fetch('http://localhost:8000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(details),
    });
    setStatus('Send');
    let result = await response.json();
    alert(result.status);
  };
  return (
    <form className="pt-5 mt-5 text-center" onSubmit={handleSubmit}>
      <div>
        <label className="label1" htmlFor="name">
          Name:
        </label>
        <input className="input1" type="text" id="name" required />
      </div>
      <div>
        <label className="label1" htmlFor="email">
          Email:
        </label>
        <input className="input1" type="email" id="email" required />
      </div>
      <div>
        <label className="label1" htmlFor="phone">
          Contact Number:
        </label>
        <input className="input1" type="phone" id="phone" required />
      </div>
      <div>
        <label className="label1" htmlFor="message">
          Message:
        </label>
        <textarea className="textarea1" id="message" required />
      </div>
      <button className="button1" type="submit">
        {status}
      </button>
    </form>
  );
};

export default ContactForm;
