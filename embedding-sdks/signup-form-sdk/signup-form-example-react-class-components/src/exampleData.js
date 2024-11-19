/**
 * @param timeout
 * @returns {Promise<import("@tripleplaypay/sdk-signup-forms").Fields>}
 */
export async function getExampleData(timeout = 1500) {
  await new Promise(r => setTimeout(r, timeout));

  return {
    email: "test@hey",
    dba_name: "dba_name",
    legal_name: "legal_name",
    business_description: "business_description",
    start_date: "2020-01-30",
    ownership_type: "Sole Proprietor",
    business_phone_number: "business_phone_number",
    // email: "email",
    website: "https://google.com",
    avg_ticket: "avg_ticket",
    monthly_volume: "monthly_volume",
    fed_tx_id: "fed_tx_id",
    stock_symbol: "stock_symbol",
    mcc_code: "5047", // medical supplies
    business_address_1: "business_address_1",
    business_address_2: "business_address_2",
    business_city: "business_city",
    business_state_province: "TN",
    business_postal_code: "11111",
    account_number: "account_number",
    routing_number: "routing_number",
    account_type: "checking",
    percent_of_business_type: "ecommerce",
    card_swiped: "card_swiped",
    keyed_card_present_not_imprinted: "keyed_card_present_not_imprinted",
    mail_or_phone_order: "mail_or_phone_order",
    internet: "internet",
    principal_first_name: "principal_first_name",
    principal_last_name: "principal_last_name",
    principal_ssn: "principal_ssn",
    principal_date_of_birth: "1980-06-30",
    principal_ownership_percentage: "100",
    principal_title: "manager",
    principal_phone_number: "principal_phone_number",
    principal_address_line_1: "principal_address_line_1",
    principal_address_line_2: "principal_address_line_2",
    principal_city: "principal_city",
    principal_state_province: "TN",
    principal_postal_code: "11111",
  };
}
