import {  redirect } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";


export const loader = async ({ request }) => {

  const { billing, session } = await authenticate.admin(request);
  let { shop } = session;
  let myShop = shop.replace(".myshopify.com", "");
  const billingCheck = await billing.require({
    plans: [MONTHLY_PLAN],
    onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
  });

  const subscription = billingCheck.appSubscriptions[0];
  const cancelledSubscription = await billing.cancel({
    subscriptionId: subscription.id,
    isTest: true,
    prorate: true,
   });

  // App logic
   return redirect("/app/pricing");
};