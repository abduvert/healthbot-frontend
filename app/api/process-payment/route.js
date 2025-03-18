"use server";

import { randomUUID } from "crypto";
import { SquareClient, SquareEnvironment } from "square";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const paymentsApi  = new SquareClient({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox, 
});

export async function submitPayment(sourceId) {
  console.log("Square Token:", process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN);
  console.log("Square Location ID:", process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
  console.log(sourceId)

  try {
    const { result } = await paymentsApi.payments.create({
      idempotencyKey: randomUUID(),
      customerId: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: BigInt(1000), //the amount is in cents
      },
      autocomplete:true,
      billingAddress: {
        postalCode: "94103", 
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    });
    return result;
  } catch (error) {
    console.error("Payment processing error:", error);
    return null;
  }
}
