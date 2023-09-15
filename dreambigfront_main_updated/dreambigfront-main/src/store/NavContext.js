import React, { createContext } from "react";
import { useState } from "react";

export const Navcontext = React.createContext({});

export function NavcontextProvider(props) {
  const [nav, setNav] = useState(true);
  function hideNavhandler(ID) {
    setNav(false);
  }
  function showNavhandler(ID) {
    setNav(true);
  }
  return (
    <Navcontext.Provider value={{ nav: nav, hideNav: hideNavhandler, showNav:showNavhandler }}>
      {props.children}
    </Navcontext.Provider>
);
}