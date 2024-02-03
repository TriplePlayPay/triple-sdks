/**
 * @typedef {{
 *     baseUrl? : string,
 *     bearerToken : string,
 *     fetch? : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
 * }} Options

 * @typedef {{
 *     baseUrl : string,
 *     bearerToken : string,
 *     fetch? : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
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
    this.options.baseUrl = this.options.baseUrl || 'https://www.tripleplaypay.com';
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
 * @param {Record<string, any>} object
 * @return string
 * @private
 */
function _qs(object) {
    return new URLSearchParams(Object.entries(object)).toString()
}

/**
 * @typedef {{
 *     amount : string,
 *     cc : string,
 *     mm : string,
 *     yy : string,
 *     cvv : string,
 *     zip : string,
 *     ticket : string,
 *     meta : string,
 * }} AuthorizeRequest
 */

/**
 * @param {AuthorizeRequest} request
 * @return {Promise<any>}
 */
TriplePlayClient.prototype.authorize = function authorize(request) {
    return this.options.fetch('/api/authorize?' + _qs(request), this.options).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{
 *     amount : string,
 *     terminal : number,
 *     id? : string,
 *     cc : string,
 *     mm : string,
 *     yy : string,
 *     cvv : string,
 *     zip? : string,
 *     accountNumber : string,
 *     routingNumber : string,
 *     type : string,
 *     ticket? : string,
 *     items? : Array,
 *     meta : Record<string, any>,
 * }} ChargeRequest
 */

/**
 *
 * @param {ChargeRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.charge = function charge(request) {
    return this.options.fetch('/api/charge?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{
 *     timezone? : string,
 *     email? : string,
 *     callback? : string,
 *     tax? : string,
 * }} ClientRequest
 */

/**
 * @param {ClientRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.client = function client(request) {
    return this.options.fetch('/api/client?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} EnrollRequest
 */

/**
 * @param {EnrollRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.enroll = function enroll(request) {
    return this.options.fetch('/api/enroll?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} RefundRequest
 */

/**
 * @param {RefundRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.refund = function refund(request) {
    return this.options.fetch('/api/refund?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} ReportRequest
 */

/**
 * @param {ReportRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.report = function report(request) {
    return this.options.fetch('/api/report?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} SettleRequest
 */

/**
 * @param {SettleRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.settle = function settle(request) {
    return this.options.fetch('/api/settle?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} SubscriptionRequest
 */

/**
 * @param {SubscriptionRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.subscription = function subscription(request) {
    return this.options.fetch('/api/subscription?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} TerminalRequest
 */

/**
 * @param {TerminalRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.terminal = function terminal(request) {
    return this.options.fetch('/api/terminal?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} TokenizeRequest
 */

/**
 * @param {TokenizeRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.tokenize = function tokenize(request) {
    return this.options.fetch('/api/tokenize?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

/**
 * @typedef {{ a : true }} VoidRequest
 */

/**
 * @param {VoidRequest} request
 * @return {Promise<ApiResponse>}
 */
TriplePlayClient.prototype.callVoid = function callVoid(request) {
    return this.options.fetch('/api/void?' + _qs(request), this.postOptions).then(_verifyResponseOk).then(_thenJson);
};

// export the thing
module.exports.TriplePlayClient = TriplePlayClient

// export shorthand for the thing
module.exports.client = TriplePlayClient

/**
 * for backwards compatibility:
 */
module.exports.TriplePlayPayApi = { ApiApi: TriplePlayClient };
