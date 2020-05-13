import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List ,Input } from "semantic-ui-react";

import Example from "./example";
// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render( <Example/>,
  document.getElementById("root")
);
