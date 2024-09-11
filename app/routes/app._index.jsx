import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = []; 
  const variantResponseJson = await variantResponse.json();

  return json({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantUpdate.productVariant,
  });
};

export default function Index() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const shopify = useAppBridge();

  const handleTrackPackage = () => {
    navigate("/app/track");
  };

  const FAQs = () => {
    navigate("/app/FAQs")
  };

  return (
    <Page>
      <TitleBar title="TrackBuddy">
        <Button variant="primary" onClick={handleTrackPackage}>
          Track a package
        </Button>
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    What does TrackBuddy do?
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This app shows the current location of your package, and its travel history so far. 
                    It also lets you know the approximate date of arrival so you can make plans around it.
                  </Text>
                </BlockStack>
             
                <InlineStack gap="300">
                  <Button onClick={handleTrackPackage}>
                    Track a package
                  </Button>
                  <Button variant="primary" onClick={FAQs}>
                    FAQs
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
       
        </Layout>
      </BlockStack>
    </Page>
  );
}
