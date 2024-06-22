import {Link} from "react-router-dom";
import "./Logo.css";
import React from "react";

const Logo = ({size}) => {
  const fontSize = size ? `${size}rem` : "4rem";

  return (
    <Link to="/" className="logo" style={{fontSize}}>
      The Movies
    </Link>
  );
};

export default Logo;
