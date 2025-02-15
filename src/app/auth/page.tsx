import { createElement } from "react";

export default function Page() {
  let div = createElement("h1");
  div.appendChild(document.createTextNode("Hello Next.js!"));
  return div;
}