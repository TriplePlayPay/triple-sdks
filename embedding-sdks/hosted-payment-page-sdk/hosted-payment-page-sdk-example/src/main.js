import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app").innerHTML = `
    <div>
      <p>
        It Works!
      </p>
      <div id="example"></div>
    </div>
  `;

  const triple = new Triple("71121001-1a58-4b01-ba28-10334bd83cc0");
  triple.generatePaymentForm({
    // payment form container here
    containerSelector: "#example",
    paymentType: "charge",
    description: "\"\"",
    tokenMode: true,
    isMin: true,
    paymentOptions: [ "credit_card" ],
    savePaymentToken: true,
    saveMode: true,
    showEmailField: false,
    zipMode: "disabled",
    fromLink: true,
    isMobileResponsive: true,
    fullName: false,
    fieldClass: "form-control",
    selectFieldClass: "form-control",
    labels: "",
    billingAddress: false,
    optIn: false,
    emailOption: null,
    phoneOption: false,
    showDescription: false,
    allowTip: false,
    address: false,
    newWindow: false,

    // prevents Google Pay from showing
    isMinimalTerminal: true,

    // new values below
    isHorizontal: true,
    hidePaymentDetailsLabel: true,
    hideSubmitButton: true,

    // Callback Embeds
    onError: (id) => {
      alert("An error");
    },
    onSuccess: (data) => {
      console.log(data);
      console.log("data is above");
      alert("success");
    },
  });

  const button = document.querySelector("#btn");
  button.addEventListener("click", () => {
    triple.tokenize();
  });
});
