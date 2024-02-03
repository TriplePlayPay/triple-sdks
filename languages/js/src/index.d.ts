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
declare function TriplePlayClient(options: ClientOptions): TriplePlayClient;
declare class TriplePlayClient {
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
    constructor(options: ClientOptions);
    options: ClientOptions;
    private _verifyResponseOk;
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
    authorize(request: {
        amount: string;
        cc: string;
        mm: string;
        yy: string;
        cvv: string;
        zip: string;
        ticket: string;
        meta: string;
    }): Promise<any>;
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
    client(request: any): Promise<any>;
    enroll(request: any): Promise<any>;
    refund(request: any): Promise<any>;
    report(request: any): Promise<any>;
    settle(request: any): Promise<any>;
    subscription(request: any): Promise<any>;
    terminal(request: any): Promise<any>;
    tokenize(request: any): Promise<any>;
    void(request: any): Promise<any>;
}
/**
 * @param {Response} response
 * @return Promise<Object>
 * @private
 */
declare function _thenJson(response: Response): Promise<any>;
declare function _qs(object: any): string;
type ClientOptions = {
    baseUrl: string;
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};
