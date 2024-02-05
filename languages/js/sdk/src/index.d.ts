export type Options = {
    baseUrl?: string;
    bearerToken: string;
    fetch?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};
export type ApiResponse = {
    id: string;
    status: string;
    method: string;
    message: any;
};
export type BankAccountRequest = {
    routing_number: string;
    account_number: string;
    email?: string;
};
export type CardChargeRequest = {
    amount: string;
    id?: string;
    token?: string;
    email: string;
    meta?: Record<string, any>;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    tip?: string;
    cc: string;
    mm: string;
    yy: string;
    cvv: string;
};
export type BankChargeRequest = {
    amount: string;
    id?: string;
    token?: string;
    email: string;
    meta?: Record<string, any>;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    tip?: string;
    account_number: string;
    routing_number: string;
    type?: string;
};
export type TerminalChargeRequest = {
    amount: string;
    id?: string;
    token?: string;
    email: string;
    meta?: Record<string, any>;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    tip?: string;
    laneId: string;
    surcharge: string;
};
export type ChargeRequest = CardChargeRequest | BankChargeRequest | TerminalChargeRequest;
export type CreditCardRequest = {
    cc?: string;
    cvv: string;
    mm: string;
    yy: string;
    email?: string;
};
export type RefundRequest = {
    id: string;
};
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
export function TriplePlayClient(options: Options): TriplePlayClient;
export class TriplePlayClient {
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
     *     routing_number : string,
     *     account_number : string,
     *     email? : string,
     * }} BankAccountRequest
     */
    /**
     * @param {BankAccountRequest} request
     * @return {Promise<ApiResponse>}
     */
    createBankAccount(request: BankAccountRequest): Promise<ApiResponse>;
    /**
     * @typedef {{
     *     amount : string
     *     id? : string
     *     token? : string
     *     email : string
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
     *     cvv : string
     * }} CardChargeRequest
     */
    /**
     * @typedef {{
     *     amount : string
     *     id? : string
     *     token? : string
     *     email : string
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
     *     id? : string
     *     token? : string
     *     email : string
     *     meta? : Record<string, any>
     *     address1? : string
     *     address2? : string
     *     city? : string
     *     state? : string
     *     zip? : string
     *     tip? : string
     *     laneId : string
     *     surcharge : string
     * }} TerminalChargeRequest
     */
    /**
     * @typedef {CardChargeRequest | BankChargeRequest | TerminalChargeRequest} ChargeRequest
     */
    /**
     *
     * @param {ChargeRequest} request
     * @return {Promise<ApiResponse>}
     */
    charge(request: ChargeRequest): Promise<ApiResponse>;
    /**
     * @typedef {{
     *     cc? : string
     *     cvv : string
     *     mm : string
     *     yy : string
     *     email? : string
     * }} CreditCardRequest
     */
    /**
     * @param {CreditCardRequest} request
     * @return {Promise<ApiResponse>}
     */
    createCreditCard(request: CreditCardRequest): Promise<ApiResponse>;
    /**
     * @typedef {{
     *     id : string
     * }} RefundRequest
     */
    /**
     * @param {RefundRequest} request
     * @return {Promise<ApiResponse>}
     */
    refund(request: RefundRequest): Promise<ApiResponse>;
}
export { TriplePlayClient as client };
