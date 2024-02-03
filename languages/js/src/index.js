/**
 * @typedef {{
 *     baseUrl : string,
 *     fetch : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
 * }} ClientOptions
 */

/**
 * @param {ClientOptions} options
 * @constructor
 */
function TriplePlayClient(options) {
    if (!(this instanceof TriplePlayClient)) return new TriplePlayClient(options);

    this.options = options;
    this.options.baseUrl = this.options.baseUrl || 'https://www.tripleplaypay.com';
    this.options.fetch = this.options.fetch || globalThis.fetch;
}

/**
 * @param {Response} response
 * @return {Promise<Response>}
 * @private
 */
TriplePlayClient.prototype._verifyResponseOk = async function verifyResponseOk(response) {
    if (response.ok) return Promise.resolve(response);
    const error = new Error('the api return an error');
    error.code = error.status = response.status;
    error.body = await response.text();
    try {
        error.body = JSON.parse(error.body);
    } catch (ignored) {}
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

function _qs(object) {
    return new URLSearchParams(Object.entries(object)).toString()
}

/**
 * @param {{
 *     amount : string,
 *     cc : string,
 *     mm : string,
 *     yy : string,
 *     cvv : string,
 *     zip : string,
 *     ticket : string,
 *     meta : string,
 * }} request
 */
TriplePlayClient.prototype.authorize = function authorize(request) {
    return this.options.fetch('/api/authorize?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

/**
 * @param {{
 *     amount : string,
 *     terminal : string,
 *     id : string,
 *     cc : string,
 *     mm : string,
 *     yy : string,
 *     cvv : string,
 *     zip : string,
 *     accountNumber : string,
 *     routingNumber : string,
 *     type : string,
 *     ticket : string,
 *     items : string,
 *     meta : string,
 * }} request
 */
TriplePlayClient.prototype.charge = function charge(request) {
    return this.options.fetch('/api/charge?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.client = function client(request) {
    return this.options.fetch('/api/client?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.enroll = function enroll(request) {
    return this.options.fetch('/api/enroll?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.refund = function refund(request) {
    return this.options.fetch('/api/refund?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.report = function report(request) {
    return this.options.fetch('/api/report?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.settle = function settle(request) {
    return this.options.fetch('/api/settle?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.subscription = function subscription(request) {
    return this.options.fetch('/api/subscription?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.terminal = function terminal(request) {
    return this.options.fetch('/api/terminal?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.tokenize = function tokenize(request) {
    return this.options.fetch('/api/tokenize?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};

TriplePlayClient.prototype.void = function void_ (request) {
    return this.options.fetch('/api/void?' + _qs(request), { method: 'POST' }).then(this._verifyResponseOk).then(_thenJson);
};
