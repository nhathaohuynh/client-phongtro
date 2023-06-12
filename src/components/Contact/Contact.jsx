import React from "react";
import "./Contact.scss";
import { dataContact as contact } from "../../utils/order";
import Button from "../Button/Button";
const Contact = () => {
  return (
    <div className="contact">
      <div className="contact_bg">
        <img src={contact.pathImg} alt="" />
      </div>
      <div className="contact_content">
        <span className="contact_title">{contact.title}</span>
        <div className="contact_support">
          <ul>
            {contact.support.map((item) => {
              return (
                <li key={crypto.randomUUID()}>
                  <span className="contact_name">{item.name}</span>
                  <span className="contact_phone">Điện thoại: {item.phone}</span>
                  <span className="contact_zalo">Zalo: {item.zalo}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <Button primary size="sm">
          Gửi liên hệ
        </Button>
      </div>
    </div>
  );
};

export default Contact;
