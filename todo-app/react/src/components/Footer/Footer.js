import { Email, GitHub, LinkedIn } from "@material-ui/icons";
import React from "react";
import FooterCSS from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={FooterCSS.Footer}>
      <div className={FooterCSS.footercontainer}>
        <h1>REYMAR | 2022</h1>
        <div className={FooterCSS.icons}>
          {" "}
          <a
            href="https://www.linkedin.com/in/reymar-dela-paz-0a26a0196/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedIn className={FooterCSS.icon} />
          </a>
          <a href="https://github.com/rymrdp" target="_blank" rel="noreferrer">
            <GitHub className={FooterCSS.icon} />
          </a>
          <a href="mailto:contactme.reymar@gmail.com">
            <Email className={FooterCSS.icon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
