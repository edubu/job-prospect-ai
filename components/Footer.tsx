import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <footer className="container flex justify-between p-4 text-white mt-auto text-sm">
      <p>© {new Date().getFullYear()} Job Prospect AI</p>
      <div className="flex items-center text-center">
        <AiOutlineMail className="mr-1" />
        <p>support@jobprospect.ai</p>
      </div>
    </footer>
  );
};

export default Footer;
