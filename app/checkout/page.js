"use client";

import { PaymentForm, CreditCard } from "react-square-web-payments-sdk";
import { useState } from "react";
import { submitPayment } from "../api/process-payment/route";

export default function CheckoutPage() {
  const [paymentStatus, setPaymentStatus] = useState("");

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold">Square Payment</h2>
    <div className="flex justify-center items-center h-[100vh] p-5">
      <PaymentForm
        applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}
        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID}
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const result = await submitPayment(token.token);
          if (result) {
            setPaymentStatus("Payment successful!");
          } else {
            setPaymentStatus("Payment failed.");
          }
        }}
      >
        <CreditCard />
      </PaymentForm>
      {paymentStatus && <p className="mt-3">{paymentStatus}</p>}
      </div>
    </div>
  );
}
