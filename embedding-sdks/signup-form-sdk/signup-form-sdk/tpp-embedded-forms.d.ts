export type MerchantEnrollmentFormConfig = {
    apiKey?: string;
    parentId?: string;
    enrollmentId?: string;
    baseUrl?: "production" | "sandbox" | string;
} & (ElementById | ElementRef);
export type ElementById = {
    elementId: string;
};
export type ElementRef = {
    element: HTMLElement;
};
export type SubmittedEnrollment = {
    enrollmentId: string;
    apiKey?: string;
    publicKey?: string;
};
export type Fields = {
    dba_name?: string;
    legal_name?: string;
    business_description?: string;
    start_date?: string;
    ownership_type?: string;
    business_phone_number?: string;
    email?: string;
    website?: string;
    avg_ticket?: string;
    monthly_volume?: string;
    fed_tx_id?: string;
    stock_symbol?: string;
    mcc_code?: string;
    business_address_1?: string;
    business_address_2?: string;
    business_city?: string;
    business_state_province?: string;
    business_postal_code?: string;
    account_number?: string;
    routing_number?: string;
    account_type?: string;
    percent_of_business_type?: string;
    card_swiped?: string;
    keyed_card_present_not_imprinted?: string;
    mail_or_phone_order?: string;
    internet?: string;
    principal_first_name?: string;
    principal_last_name?: string;
    principal_ssn?: string;
    principal_date_of_birth?: string;
    principal_ownership_percentage?: string;
    principal_title?: string;
    principal_phone_number?: string;
    principal_address_line_1?: string;
    principal_address_line_2?: string;
    principal_city?: string;
    principal_state_province?: string;
    principal_postal_code?: string;
    "2principal_first_name"?: string;
    "2principal_last_name"?: string;
    "2principal_ssn"?: string;
    "2principal_date_of_birth"?: string;
    "2principal_ownership_percentage"?: string;
    "2principal_title"?: string;
    "2principal_phone_number"?: string;
    "2principal_address_line_1"?: string;
    "2principal_address_line_2"?: string;
    "2principal_city"?: string;
    "2principal_state_province"?: string;
    "2principal_postal_code"?: string;
    "3principal_first_name"?: string;
    "3principal_last_name"?: string;
    "3principal_ssn"?: string;
    "3principal_date_of_birth"?: string;
    "3principal_ownership_percentage"?: string;
    "3principal_title"?: string;
    "3principal_phone_number"?: string;
    "3principal_address_line_1"?: string;
    "3principal_address_line_2"?: string;
    "3principal_city"?: string;
    "3principal_state_province"?: string;
    "3principal_postal_code"?: string;
    "4principal_first_name"?: string;
    "4principal_last_name"?: string;
    "4principal_ssn"?: string;
    "4principal_date_of_birth"?: string;
    "4principal_ownership_percentage"?: string;
    "4principal_title"?: string;
    "4principal_phone_number"?: string;
    "4principal_address_line_1"?: string;
    "4principal_address_line_2"?: string;
    "4principal_city"?: string;
    "4principal_state_province"?: string;
    "4principal_postal_code"?: string;
};
/**
 *
 * @param {MerchantEnrollmentFormConfig} config
 * @returns {TppEnrollForm}
 * @constructor
 */
export function TppEnrollForm(config: MerchantEnrollmentFormConfig, ...args: any[]): TppEnrollForm;
export class TppEnrollForm {
    /**
     *
     * @param {MerchantEnrollmentFormConfig} config
     * @returns {TppEnrollForm}
     * @constructor
     */
    constructor(config: MerchantEnrollmentFormConfig, ...args: any[]);
    config: MerchantEnrollmentFormConfig;
    _callbacks: {};
    /**
     * @type {null | HTMLIFrameElement}
     */
    iframe: null | HTMLIFrameElement;
    mount(): void;
    private _postMessageCallback;
    _listenForPostMessage(): void;
    /**
     * @param {"submit", "isFormValid"} eventName
     * @param {((enrollment: SubmittedEnrollment) => void) | ((valid: boolean) => void)} callback
     */
    on(eventName: any, callback: ((enrollment: SubmittedEnrollment) => void) | ((valid: boolean) => void)): void;
    /**
     * @param {"submit", "isFormValid"} eventName
     * @param {(enrollmentId: string) => void} callback
     */
    once(eventName: any, callback: (enrollmentId: string) => void): void;
    /**
     * @typedef {{
     *   enrollmentId: string
     *   apiKey?: string
     *   publicKey?: string
     * }} SubmittedEnrollment
     */
    /**
     * Returns a new enrollment.
     *
     * When an error occurs,
     * such as not a required field not having a value,
     * it returns a falsy value (`null`).
     *
     * This method attempts to fetch the api keys of the new enrollment.
     * If it succeeds, they are present on the returned object.
     * If not, just the enrollmentId is present.
     *
     * @returns {Promise<SubmittedEnrollment | null>}
     */
    submit(): Promise<SubmittedEnrollment | null>;
    /**
     * @param enrollmentId
     * @returns {Promise<SubmittedEnrollment>}
     */
    preGeneratedKeys(enrollmentId: any): Promise<SubmittedEnrollment>;
    /**
     * @returns {Promise<boolean>}
     */
    isFormValid(): Promise<boolean>;
    private _getIframe;
    /**
     * @returns {Promise<HTMLIFrameElement>}
     */
    _getIframePromise(): Promise<HTMLIFrameElement>;
    /**
     * @param {Fields} fieldConfig
     */
    setValues(fieldConfig: Fields): Promise<void>;
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
    setVisibility(fieldConfig: Fields): Promise<void>;
}
