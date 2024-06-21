/**
 * @typedef {{
 *     baseUrl? : string,
 *     bearerToken : string,
 *     fetch? : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
 * }} Options

 * @typedef {{
 *     id : string,
 *     status : string,
 *     method : string,
 *     message : any,
 * }} ApiResponse
 */

/**
 * Triple Play (API) Client
 *
 * This is the main class you can instantiate to interact with the Triple Play Pay API.
 * You can instantiate it with options to specify the base url, token,
 * and override the fetch function if needed.
 *
 * @param {Options} options
 * @constructor
 */
function TriplePlayClient(options) {
    if (!(this instanceof TriplePlayClient)) return new TriplePlayClient(options);

    this.options = options;
    this.options.baseUrl = this.options.baseUrl || 'https://tripleplaypay.com';
    this.options.fetch = this.options.fetch || globalThis.fetch;

    if (!this.options.fetch)
        throw new Error('TriplePlayClient requires options.fetch, ' +
            'which was not supplied and the environment doesn\'t provide one. ' +
            'please use node-fetch or configure your bundler to support ' +
            'the global fetch function (https://mdn.io/fetch, ' +
            'https://nodejs.org/docs/latest/api/globals.html#fetch)');

    if (!this.options.bearerToken)
        throw new Error('TriplePlayClient requires options.bearerToken, ' +
            'to interact with the Triple Play Pay API');

    /**
     * @type {Record<string, string>}
     */
    this.headers = {
        'content-type': 'application/json',
        'authorization': 'bearer ' + this.options.bearerToken,
    };
    /**
     * @type {RequestInit}
     */
    this.postOptions = { method: 'POST', headers: this.headers };

    /**
     * @type {RequestInit}
     */
    this.getOptions = { method: 'GET', headers: this.headers };
}

/**
 * @param {Response} response
 * @return {Promise<Response>}
 * @private
 */
async function _verifyResponseOk(response) {
    if (response.ok) return Promise.resolve(response);
    const error = new Error('the api return an error');
    error.code = error.status = response.status;
    error.body = await response.text();
    try {
        error.body = JSON.parse(error.body);
    } catch (ignored) {
    }
    throw error;
}

/**
 * @param {Response} response
 * @return Promise<Object>
 * @private
 */
function _thenJson(response) {
    return response.json();
}

/**
 * @typedef {{
 *     routing_number : string,
 *     account_number : string,
 *     email? : string,
 * }} BankAccountRequest
 */

/**
 * @param {BankAccountRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.createBankAccount = function createBankAccount(request) {
    return this.options.fetch(this.options.baseUrl + '/api/bankaccount', { ...this.postOptions, body: JSON.stringify(request) }).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{
 *     amount : string
 *     email? : string
 *     meta? : Record<string, any>
 *     address1? : string
 *     address2? : string
 *     city? : string
 *     state? : string
 *     zip? : string
 *     tip? : string
 *     cc : string
 *     mm : string
 *     yy : string
 *     cvv? : string
 * }} CardChargeRequest
 */

/**
 * @typedef {{
 *     amount : string
 *     email? : string
 *     meta? : Record<string, any>
 *     address1? : string
 *     address2? : string
 *     city? : string
 *     state? : string
 *     zip? : string
 *     tip? : string
 *     account_number : string
 *     routing_number : string
 *     type? : string
 * }} BankChargeRequest
 */

/**
 * @typedef {{
 *     amount : string
 *     email? : string
 *     meta? : Record<string, any>
 *     address1? : string
 *     address2? : string
 *     city? : string
 *     state? : string
 *     zip? : string
 *     tip? : string
 *     laneId : string
 *     surcharge? : string
 * }} TerminalChargeRequest
 */

/**
 * @typedef {{
 *     amount : string
 *     token : string
 *     email? : string
 *     meta? : Record<string, any>
 *     address1? : string
 *     address2? : string
 *     city? : string
 *     state? : string
 *     zip? : string
 *     tip? : string
 *     surcharge? : string
 * }} TokenChargeRequest
 */

/**
 * @typedef {CardChargeRequest | BankChargeRequest | TerminalChargeRequest | TokenChargeRequest} ChargeRequest
 */

/**
 *
 * @param {ChargeRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.charge = function charge(request) {
    return this.options.fetch(this.options.baseUrl + '/api/charge', { ...this.postOptions, body: JSON.stringify(request) }).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{
 *     cc : string
 *     cvv? : string
 *     mm : string
 *     yy : string
 *     email? : string
 * }} CreditCardRequest
 */

/**
 * @param {CreditCardRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.createCreditCard = function createCreditCard(request) {
    return this.options.fetch(this.options.baseUrl + '/api/card', { ...this.postOptions, body: JSON.stringify(request) }).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{
 *     id : string
 * }} RefundRequest
 */

/**
 * @param {RefundRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.refund = function refund(request) {
    return this.options.fetch(this.options.baseUrl + '/api/refund', { ...this.postOptions, body: JSON.stringify(request) }).then(_verifyResponseOk).then(_thenJson);
};


/**
 * @typedef {{
 *     start : string,
 *     end : string,
 * }} ReportRequest
 */

/**
 * @param {ReportRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.report = function report(request) {
    return this.options.fetch(this.options.baseUrl + '/api/report?' + new URLSearchParams(request), { ...this.getOptions }).then(_verifyResponseOk).then(_thenJson);
};

// export the thing
module.exports = TriplePlayClient
module.exports.TriplePlayClient = TriplePlayClient

// export shorthand for the thing
module.exports.client = TriplePlayClient
