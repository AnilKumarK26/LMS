import "./index.css";
import { FaPhone, FaEnvelope, FaLinkedin, FaInstagram, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const contactMethods = [
    {
      icon: <FaPhone size={24} />,
      label: "Phone",
      value: "9885593971",
      link: "https://wa.me/9885593971",
      color: "#25D366"
    },
    {
      icon: <FaEnvelope size={24} />,
      label: "Email",
      value: "anilkumarkedarsetty@gmail.com",
      link: "mailto:anilkumarkedarsetty@gmail.com",
      color: "#EA4335"
    },
    {
      icon: <FaLinkedin size={24} />,
      label: "LinkedIn",
      value: "Anil Kumar Kedarsetty",
      link: "https://www.linkedin.com/in/anil-kumar-kedarsetty-626a45271/",
      color: "#0A66C2"
    },
    {
      icon: <FaInstagram size={24} />,
      label: "Instagram",
      value: "anil_kumar_kedarsetty",
      link: "https://www.instagram.com/anil_kumar_kedarsetty/",
      color: "#E4405F"
    },
    {
      icon: <FaMapMarkerAlt size={24} />,
      label: "Location",
      value: "Hyderabad, India",
      link: "https://maps.google.com/?q=Hyderabad,India",
      color: "#4285F4"
    }
  ];

  return (
    <div className="contact-us-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Connect with us through any of these platforms.</p>
        </div>
        
        <div className="contact-methods">
          {contactMethods.map((method, index) => (
            <div className="contact-card" key={index} style={{"--accent-color": method.color}}>
              <div className="icon-container">
                {method.icon}
              </div>
              <div className="contact-details">
                <h3>{method.label}</h3>
                <a href={method.link} target="_blank" rel="noopener noreferrer">
                  {method.value}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Your Message"></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;