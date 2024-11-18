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
    dba_name: "dba_name",
    legal_name: "legal_name",
    business_description: "business_description",
    start_date: "2020-01-30",
    ownership_type: "Sole Proprietor",
    business_phone_number: "business_phone_number",
    // email: "email",
    website: "https://google.com",
    avg_ticket: "avg_ticket",
    monthly_volume: "monthly_volume",
    fed_tx_id: "fed_tx_id",
    stock_symbol: "stock_symbol",
    mcc_code: "5047", // medical supplies
    business_address_1: "business_address_1",
    business_address_2: "business_address_2",
    business_city: "business_city",
    business_state_province: "TN",
    business_postal_code: "11111",
    account_number: "account_number",
    routing_number: "routing_number",
    account_type: "checking",
    percent_of_business_type: "ecommerce",
    card_swiped: "card_swiped",
    keyed_card_present_not_imprinted: "keyed_card_present_not_imprinted",
    mail_or_phone_order: "mail_or_phone_order",
    internet: "internet",
    principal_first_name: "principal_first_name",
    principal_last_name: "principal_last_name",
    principal_ssn: "principal_ssn",
    principal_date_of_birth: "1980-06-30",
    principal_ownership_percentage: "100",
    principal_title: "manager",
    principal_phone_number: "principal_phone_number",
    principal_address_line_1: "principal_address_line_1",
    principal_address_line_2: "principal_address_line_2",
    principal_city: "principal_city",
    principal_state_province: "TN",
    principal_postal_code: "11111",
  });

  form.setVisibility({
    dba_name: false,
    mcc_code: false,
  });
}

window.addEventListener("DOMContentLoaded", ready);
