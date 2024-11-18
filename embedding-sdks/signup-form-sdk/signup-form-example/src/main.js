import "bootstrap";
import "./style.css";
import "./carousel.css";

import { TppEnrollForm } from "@tripleplaypay/sdk-signup-forms/dist/sdk-signup-forms.es.js";

const ELEMENT_ID = "tpp-signup-form-div";

function ready() {
  document.querySelector(`#${ELEMENT_ID}`).innerHTML = `
    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500"
         height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500"
         preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
      <rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/>
      <text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text>
    </svg>
  `;

  const form = new TppEnrollForm({
    elementId: ELEMENT_ID,
    baseUrl: "http://localhost:8000", // for development
    // baseUrl: "sandbox", // for sandbox usage
  });

  document.getElementById('tpp-signup-form-button').addEventListener("click", async () => {
    let id = await form.submit();
    console.log({ id });
  });

  form.on("submit", (id) => console.log("enrolled a new id:", id));

  form.setValues({
    email: "test@hey",
  });
}

window.addEventListener("DOMContentLoaded", ready);
