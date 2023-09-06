import React from "react";
import NavbarButton from "./NavbarButton";

// Logos
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";

const SideNavbar: React.FC = () => {
  return (
    <div className="w-1/7 lg:ml-40 md:ml-20 sm:ml-10">
      <ul>
        <li>
          <NavbarButton
            text="Documents"
            path="/dashboard"
            logo={<IoDocumentTextOutline size="1.5em" />}
          />
        </li>
        <li>
          <NavbarButton
            text="Create"
            path="/dashboard/create"
            logo={<VscTools size="1.5em" />}
          />
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
