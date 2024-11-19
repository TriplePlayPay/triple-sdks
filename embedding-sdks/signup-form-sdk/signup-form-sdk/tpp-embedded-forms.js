/**
 * @typedef {{
 *   parentId?: string
 *   enrollmentId?: string
 *   baseUrl?: "production" | "sandbox" | string
 * } & (ElementById | ElementRef)} MerchantEnrollmentFormConfig
 */

/**
 * @typedef {{
 *   elementId: string
 * }} ElementById
 */

/**
 * @typedef {{
 *   element: HTMLElement
 * }} ElementRef
 */

const knownBaseUrls = {
  production: "https://tripleplaypay.com",
  sandbox: "https://sandbox.tripleplaypay.com",
};

const knownCallbackNames = {
  submit: true,
};

/**
 *
 * @param {MerchantEnrollmentFormConfig} config
 * @returns {TppEnrollForm}
 * @constructor
 */
function TppEnrollForm(config) {
  if (!(this instanceof TppEnrollForm)) return new TppEnrollForm(...arguments);
  this.config = config;
  this._callbacks = {};
  /**
   * @type {null | HTMLIFrameElement}
   */
  this.iframe = null;

  if (this.config.baseUrl in knownBaseUrls) {
    this.config.baseUrl = knownBaseUrls[this.config.baseUrl];
  }

  if (!this.config.baseUrl) {
    this.config.baseUrl = knownBaseUrls.production;
  }

  this.mount();
}

TppEnrollForm.prototype.mount = function () {
  let element;
  if (this.config.elementId) {
    let elementId = this.config.elementId;
    if (!elementId)
      throw new Error("no elementId given in config: " + JSON.stringify(this.config));
    element = document.getElementById(elementId);
    if (!element)
      throw new Error("no element found with elementId " + elementId);
  } else {
    element = this.config.element;
  }

  let url = `${this.config.baseUrl}/enroll`;
  if (this.config.parentId) {
    url += `/${this.config.parentId}`;
    if (this.config.enrollmentId) {
      url += `/${this.config.enrollmentId}`;
    }
  }
  element.innerHTML = `<iframe src="${url}" style="width: 100%; height: 4000px;"></iframe>`;

  // wait for interactivity
  let iframe = element.querySelector("iframe");
  let currentIframeState = iframe.contentDocument.readyState;
  if (currentIframeState !== "interactive") {
    iframe.addEventListener("load", () => {
      // console.log("loaded");
      this.iframe = iframe;
    });
  } else {
    this.iframe = iframe;
  }

  this._listenForPostMessage();
};

/**
 * @param {Object} message
 * @param {Object} message.data
 * @param {Object} message.data.message
 * @param {string?} message.data.resultId
 * @param {MessageEvent} message.event
 * @private
 */
TppEnrollForm.prototype._postMessageCallback = function (message) {
  let messageType = message?.data?.message;
  switch (messageType) {
    case "result": {
      this._callbacks["submit"]?.forEach(c => c(message.data.resultId));
      break;
    }
    case "isFormValid": {
      this._callbacks[messageType]?.forEach(c => c(message.data.isFormValid));
      break;
    }
    default: {
      let error = `unknown message type: ${messageType}`;
      // console.log(error);
      throw new Error(error);
    }
  }
};

// https://stackoverflow.com/a/8849807
TppEnrollForm.prototype._listenForPostMessage = function () {
  let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  let listen = window[eventMethod];
  let messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

  let that = this;

  // Listen to message from child window
  listen(messageEvent,
    /**
     * @param {MessageEvent} event
     */
    function (event) {
      let key = event.data ? "data" : "message";
      let data = event[key];
      that._postMessageCallback({ data, event });
    },
    false,
  );
};

/**
 * @param {"submit", "isFormValid"} eventName
 * @param {(enrollmentId: string) => void} callback
 */
TppEnrollForm.prototype.on = function (eventName, callback) {
  if (!(eventName in knownCallbackNames)) return;
  this._callbacks[eventName] = this._callbacks[eventName] || [];
  this._callbacks[eventName].push(callback);
};

/**
 * @param {"submit", "isFormValid"} eventName
 * @param {(enrollmentId: string) => void} callback
 */
TppEnrollForm.prototype.once = function (eventName, callback) {
  const that = this;

  function newCallbackWrapper(enrollmentId) {
    callback(enrollmentId);
    let index = that._callbacks[eventName].indexOf(newCallbackWrapper);
    if (index !== -1) {
      that._callbacks[eventName].splice(index, 1);
    }
  }

  this.on(eventName, newCallbackWrapper);
};

/**
 * @returns {Promise<string>}
 */
TppEnrollForm.prototype.submit = async function () {
  const iframe = await this._getIframePromise();
  iframe.contentWindow.postMessage({
    message: "submit",
  }, "*");
  return new Promise(r => this.once("submit", r));
};

/**
 * @returns {Promise<boolean>}
 */
TppEnrollForm.prototype.isFormValid = async function () {
  const iframe = await this._getIframePromise();
  iframe.contentWindow.postMessage({
    message: "isFormValid",
  }, "*");
  return new Promise(r => this.once("isFormValid", r));
};

/**
 * @typedef {{
 *   dba_name?: string
 *   legal_name?: string
 *   business_description?: string
 *   start_date?: string
 *   ownership_type?: string
 *   business_phone_number?: string
 *   email?: string
 *   website?: string
 *   avg_ticket?: string
 *   monthly_volume?: string
 *   fed_tx_id?: string
 *   stock_symbol?: string
 *   mcc_code?: string
 *   business_address_1?: string
 *   business_address_2?: string
 *   business_city?: string
 *   business_state_province?: string
 *   business_postal_code?: string
 *   account_number?: string
 *   routing_number?: string
 *   account_type?: string
 *   percent_of_business_type?: string
 *   card_swiped?: string
 *   keyed_card_present_not_imprinted?: string
 *   mail_or_phone_order?: string
 *   internet?: string
 *   principal_first_name?: string
 *   principal_last_name?: string
 *   principal_ssn?: string
 *   principal_date_of_birth?: string
 *   principal_ownership_percentage?: string
 *   principal_title?: string
 *   principal_phone_number?: string
 *   principal_address_line_1?: string
 *   principal_address_line_2?: string
 *   principal_city?: string
 *   principal_state_province?: string
 *   principal_postal_code?: string
 *   "2principal_first_name"?: string
 *   "2principal_last_name"?: string
 *   "2principal_ssn"?: string
 *   "2principal_date_of_birth"?: string
 *   "2principal_ownership_percentage"?: string
 *   "2principal_title"?: string
 *   "2principal_phone_number"?: string
 *   "2principal_address_line_1"?: string
 *   "2principal_address_line_2"?: string
 *   "2principal_city"?: string
 *   "2principal_state_province"?: string
 *   "2principal_postal_code"?: string
 *   "3principal_first_name"?: string
 *   "3principal_last_name"?: string
 *   "3principal_ssn"?: string
 *   "3principal_date_of_birth"?: string
 *   "3principal_ownership_percentage"?: string
 *   "3principal_title"?: string
 *   "3principal_phone_number"?: string
 *   "3principal_address_line_1"?: string
 *   "3principal_address_line_2"?: string
 *   "3principal_city"?: string
 *   "3principal_state_province"?: string
 *   "3principal_postal_code"?: string
 *   "4principal_first_name"?: string
 *   "4principal_last_name"?: string
 *   "4principal_ssn"?: string
 *   "4principal_date_of_birth"?: string
 *   "4principal_ownership_percentage"?: string
 *   "4principal_title"?: string
 *   "4principal_phone_number"?: string
 *   "4principal_address_line_1"?: string
 *   "4principal_address_line_2"?: string
 *   "4principal_city"?: string
 *   "4principal_state_province"?: string
 *   "4principal_postal_code"?: string
 * }} Fields
 */

/**
 *
 * @param {(error: unknown, iframe?: HTMLIFrameElement) => void} cb
 * @param {number} counter
 * @private
 */
TppEnrollForm.prototype._getIframe = function (cb, counter = 0) {
  let iframe = this.iframe;
  if (!iframe) {
    if (counter >= 10)
      cb(new Error("no iframe for setting values"));
    setTimeout(() => this._getIframe(cb, counter + 1), 1000);
  } else {
    setTimeout(() => cb(null, iframe));
  }
};

/**
 * @returns {Promise<HTMLIFrameElement>}
 */
TppEnrollForm.prototype._getIframePromise = function () {
  return new Promise((r, j) => this._getIframe((e, i) => e ? j(e) : r(i)));
};

/**
 * @param {Fields} fieldConfig
 */
TppEnrollForm.prototype.setValues = async function (fieldConfig) {
  const iframe = await this._getIframePromise();
  iframe.contentWindow.postMessage({
    message: "setValues",
    values: fieldConfig,
  }, "*");
};

/**
 * of note, the following fields are not included in this functionality:
 *
 * business_address_one,
 * dba_name,
 * email,
 * fed_tx_id,
 * legal_name,
 * principal_first_name,
 * principal_last_name,
 * principal_ssn,
 *
 * @param {Fields} fieldConfig
 */
TppEnrollForm.prototype.setVisibility = async function (fieldConfig) {
  const iframe = await this._getIframePromise();
  iframe.contentWindow.postMessage({
    message: "setVisibility",
    visibility: fieldConfig,
  }, "*");
};

export { TppEnrollForm };
