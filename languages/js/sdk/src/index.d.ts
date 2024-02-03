export namespace TriplePlayPayApi {
    export { TriplePlayClient as ApiApi };
}
export type Options = {
    baseUrl?: string;
    bearerToken: string;
    fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};
export type AuthorizeRequest = {
    amount: string;
    cc: string;
    mm: string;
    yy: string;
    cvv: string;
    zip: string;
    ticket: string;
    meta: string;
};
/**
 * @typedef {{
 *     baseUrl? : string,
 *     bearerToken : string,
 *     fetch? : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
 * }} Options
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
export function TriplePlayClient(options: Options): TriplePlayClient;
export class TriplePlayClient {
    /**
     * @typedef {{
     *     baseUrl? : string,
     *     bearerToken : string,
     *     fetch? : (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
     * }} Options
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
    constructor(options: Options);
    options: Options;
    /**
     * @type {Record<string, string>}
     */
    headers: Record<string, string>;
    /**
     * @type {RequestInit}
     */
    postOptions: RequestInit;
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
    authorize(request: AuthorizeRequest): Promise<any>;
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
    charge(request: {
        amount: string;
        terminal: string;
        id: string;
        cc: string;
        mm: string;
        yy: string;
        cvv: string;
        zip: string;
        accountNumber: string;
        routingNumber: string;
        type: string;
        ticket: string;
        items: string;
        meta: string;
    }): Promise<any>;
    /**
     *
     * @param {} request
     * @return {Promise<Response>}
     */
    client(request: any): Promise<Response>;
    enroll(request: any): Promise<any>;
    refund(request: any): Promise<any>;
    report(request: any): Promise<any>;
    settle(request: any): Promise<any>;
    subscription(request: any): Promise<any>;
    terminal(request: any): Promise<any>;
    tokenize(request: any): Promise<any>;
    callVoid(request: any): Promise<any>;
}
export { TriplePlayClient as client };
