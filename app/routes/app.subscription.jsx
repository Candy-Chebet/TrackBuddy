import {
  Page,
  Box,
  Button,
  Card,
  CalloutCard,
  Text,
  Grid,
  Divider,
  BlockStack,
  ExceptionList
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate, MONTHLY_PLAN } from "../shopify.server";
import {
  // AcceptMajor
} from '@shopify/polaris-icons';




export async function loader({ request }) {
  const { billing } = await authenticate.admin(request);

  try {
    // Check if the shop has an active payment for any plan
    const billingCheck = await billing.require({
      plans: [MONTHLY_PLAN],
      isTest: true,
      onFailure: () => {
        throw new Error('No active plan');
      },
    });

    // If the shop has an active subscription, log and return the details
    const subscription = billingCheck.appSubscriptions[0];
    console.log(`Shop is on ${subscription.name} (id ${subscription.id})`);
    return json({ billing, plan: subscription });

  } catch (error) {
    // If the shop does not have an active plan, return an empty plan object
    if (error.message === 'No active plan') {
      console.log('Shop does not have any active plans.');
      return json({ billing, plan: { name: "Free" } });
    }
    // If there is another error, rethrow it
    throw error;
  }
}

let planData = [
  {
    title: "Subscription",
    description: "Gives access to the entire service",
    price: "19.99",
    name: "Monthly subscription",
    action: "Subscribe",
    url: "/app/pricing",
    features: [
      "Unlimited package tracking per day",
      // "10000 Products",
      "Advanced analytics"
    ]
  },
];

export default function PricingPage() {
  const { plan } = useLoaderData();

  console.log('plan', plan);
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <CalloutCard
        title="Subscribe to TrackBuddy"
        illustration="https://cdn.shopify.com/s/files/1/0583/6465/7734/files/tag.png?v=1705280535"
        primaryAction={{
          content: plan ? 'Cancel Plan' : 'Subscribe',
          url: plan ? '/app/cancel' : '/app/pricing',
        }}
      >
        { plan ? (
          <p>
            You're currently on the {plan.name}. All features are unlocked.
          </p>
        ) : (
          <p>
            You do not have an active subscription. Please subscribe to access all features.
          </p>
        )}
      </CalloutCard>

      <div style={{ margin: "0.5rem 0"}}>
        <Divider />
      </div>

      <Grid>
        {planData.map((plan_item, index) => (
          <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
            <Card background={ plan_item.name == plan?.name ? "bg-surface-success" : "bg-surface" } sectioned>
              <Box padding="400">
                <Text as="h3" variant="headingMd">
                  {plan_item.title}
                </Text>
                <Box as="p" variant="bodyMd">
                  {plan_item.description}
                  <br />
                  <Text as="p" variant="headingLg" fontWeight="bold">
                    {plan_item.price === "0" ? "" : "$" + plan_item.price}
                  </Text>
                </Box>

                <div style={{ margin: "0.5rem 0"}}>
                  <Divider />
                </div>

                <BlockStack gap={100}>
                  {plan_item.features.map((feature, index) => (
                    <ExceptionList
                      key={index}
                      items={[
                        {
                          // icon: AcceptMajor,
                          description: feature,
                        },
                      ]}
                    />
                  ))}
                </BlockStack>
                <div style={{ margin: "0.5rem 0"}}>
                  <Divider />
                </div>

                { plan_item.name == "Monthly subscription" &&
                  (!plan || plan.name != "Monthly subscription") ? (
                  <Button primary url={plan_item.url}>
                    {plan_item.action}
                  </Button>
                ) : (
                  <Text as="p" variant="bodyMd">
                    You're currently on this plan
                  </Text>
                )}
              </Box>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );
}