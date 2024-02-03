export namespace TriplePlayPayApi {
    export { TriplePlayClient as ApiApi };
}
export type Options = {
    baseUrl?: string;
    bearerToken: string;
    fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};
export type ApiResponse = {
    baseUrl: string;
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
export type ChargeRequest = {
    amount: string;
    terminal: number;
    id?: string;
    cc: string;
    mm: string;
    yy: string;
    cvv: string;
    zip?: string;
    accountNumber: string;
    routingNumber: string;
    type: string;
    ticket?: string;
    items?: any[];
    meta: Record<string, any>;
};
export type ClientRequest = {
    timezone?: string;
    email?: string;
    callback?: string;
    tax?: string;
};
export type EnrollRequest = {
    a: true;
};
export type RefundRequest = {
    a: true;
};
export type ReportRequest = {
    a: true;
};
export type SettleRequest = {
    a: true;
};
export type SubscriptionRequest = {
    a: true;
};
export type TerminalRequest = {
    a: true;
};
export type TokenizeRequest = {
    a: true;
};
export type VoidRequest = {
    a: true;
};
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
export function TriplePlayClient(options: Options): TriplePlayClient;
export class TriplePlayClient {
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
    charge(request: ChargeRequest): Promise<ApiResponse>;
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
    client(request: ClientRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} EnrollRequest
     */
    /**
     * @param {EnrollRequest} request
     * @return {Promise<ApiResponse>}
     */
    enroll(request: EnrollRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} RefundRequest
     */
    /**
     * @param {RefundRequest} request
     * @return {Promise<ApiResponse>}
     */
    refund(request: RefundRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} ReportRequest
     */
    /**
     * @param {ReportRequest} request
     * @return {Promise<ApiResponse>}
     */
    report(request: ReportRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} SettleRequest
     */
    /**
     * @param {SettleRequest} request
     * @return {Promise<ApiResponse>}
     */
    settle(request: SettleRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} SubscriptionRequest
     */
    /**
     * @param {SubscriptionRequest} request
     * @return {Promise<ApiResponse>}
     */
    subscription(request: SubscriptionRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} TerminalRequest
     */
    /**
     * @param {TerminalRequest} request
     * @return {Promise<ApiResponse>}
     */
    terminal(request: TerminalRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} TokenizeRequest
     */
    /**
     * @param {TokenizeRequest} request
     * @return {Promise<ApiResponse>}
     */
    tokenize(request: TokenizeRequest): Promise<ApiResponse>;
    /**
     * @typedef {{ a : true }} VoidRequest
     */
    /**
     * @param {VoidRequest} request
     * @return {Promise<ApiResponse>}
     */
    callVoid(request: VoidRequest): Promise<ApiResponse>;
}
export { TriplePlayClient as client };
