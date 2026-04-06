/**
 * Netopia Payments v2 REST API integration
 *
 * Sandbox credentials — obții de pe https://admin.sandbox.netopia-payments.com :
 *   NETOPIA_SIGNATURE  = semnătura POS (ex: "XXXX-XXXX-XXXX-XXXX-XXXX")
 *   NETOPIA_API_KEY    = cheia API generată în contul sandbox
 *   NETOPIA_SANDBOX    = "true" (default) | "false" pentru producție
 *
 * IPN-ul (notificarea serverului) trebuie să fie accesibil public.
 * În development folosește ngrok: `ngrok http 3000`
 * și setează NEXT_PUBLIC_BASE_URL la URL-ul ngrok.
 */

const SANDBOX_URL = "https://secure.sandbox.netopia-payments.com/payment/card/v2";
const LIVE_URL    = "https://secure.netopia-payments.com/payment/card/v2";

export interface NetopiaBrowserData {
  userAgent:    string;
  tz:           string;
  colorDepth:   string;
  javaEnabled:  string;
  language:     string;
  screenHeight: string;
  screenWidth:  string;
}

export interface NetopiaPaymentInput {
  orderID:     string;   // numărul comenzii (ex: "DS-20240101-0001")
  amount:      number;   // suma în RON
  description: string;
  billing: {
    email:      string;
    phone:      string;
    firstName:  string;
    lastName:   string;
    city:       string;
    state:      string;  // județ / sector
    postalCode: string;
    details:    string;  // adresă completă
  };
  products: Array<{
    name:     string;
    code:     string;
    category: string;
    price:    number;
    vat:      number;
    quantity: number;
  }>;
  confirmUrl: string;  // IPN endpoint
  returnUrl:  string;  // redirect după plată
  browser:    NetopiaBrowserData;
}

export interface NetopiaResult {
  paymentUrl: string;
  ntpID:      string;
}

export async function initiateNetopiaPayment(input: NetopiaPaymentInput): Promise<NetopiaResult> {
  const signature = process.env.NETOPIA_SIGNATURE;
  const apiKey    = process.env.NETOPIA_API_KEY;
  const isSandbox = process.env.NETOPIA_SANDBOX !== "false";

  if (!signature || !apiKey) {
    throw new Error("NETOPIA_SIGNATURE și NETOPIA_API_KEY trebuie setate în .env.local");
  }

  const url = isSandbox ? SANDBOX_URL : LIVE_URL;

  const browserBlock = {
    BROWSER_USER_AGENT:        input.browser.userAgent,
    BROWSER_TZ:                input.browser.tz,
    BROWSER_COLOR_DEPTH:       input.browser.colorDepth,
    BROWSER_JAVA_ENABLED:      input.browser.javaEnabled,
    BROWSER_LANGUAGE:          input.browser.language,
    BROWSER_TNS_SCREEN_HEIGHT: input.browser.screenHeight,
    BROWSER_TNS_SCREEN_WIDTH:  input.browser.screenWidth,
    OS: "Linux", OS_VERSION: "x86_64",
  };

  const body = {
    posSignature: signature,
    isLive: !isSandbox,
    order: {
      ntpID:        "",
      posSignature: signature,
      dateTime:     new Date().toISOString().slice(0, 19),
      description:  input.description,
      orderID:      input.orderID,
      amount:       input.amount,
      currency:     "RON",
      billing: {
        ...input.billing,
        country: 642, // RO
        postalCode: input.billing.postalCode || "000000",
      },
      shipping: {
        ...input.billing,
        country: 642,
        postalCode: input.billing.postalCode || "000000",
      },
      products: input.products,
      installments: { selected: 0, available: [0] },
      data: browserBlock,
    },
    payment: {
      options:    { installments: 0, bonus: 0 },
      instrument: { type: "card", account: "", expMonth: 0, expYear: 0, secretCode: "", token: "" },
      data:       browserBlock,
    },
  };

  const res = await fetch(url, {
    method:  "POST",
    headers: {
      Authorization:  apiKey,
      "Content-Type": "application/json",
      Accept:         "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok || !json.payment?.paymentURL) {
    throw new Error(
      `Netopia error [${res.status}]: ${json.error?.message ?? JSON.stringify(json)}`
    );
  }

  return {
    paymentUrl: json.payment.paymentURL,
    ntpID:      json.payment.ntpID ?? "",
  };
}

/** Coduri status Netopia v2 */
export const NETOPIA_STATUS = {
  CONFIRMED: 3,
  PENDING:   5,
  VOIDED:    7,
  DECLINED:  8,
} as const;
