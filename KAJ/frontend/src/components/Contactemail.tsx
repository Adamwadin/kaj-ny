import React, { useState } from "react";
import "../index.css";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert("skickat meddelande!");
    } else {
      alert("meeeeeeeeeeeeep!");
    }
  };

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
      <p>
        För att komma i kontakt med oss, skicka ett e-mail. Vi svarar
        förmodligen inte.
      </p>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <p>
        skickar mailet till{" "}
        <a href="https://ethereal.email/">https://ethereal.email/</a> med
        inloggning user: 'ubaldo61@ethereal.email', pass: '6NNEjtwWjme8ecAExw',
        Gå sedan in på messages.
      </p>
      <button id="submit-button" className="btn btn-primary" type="submit">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
