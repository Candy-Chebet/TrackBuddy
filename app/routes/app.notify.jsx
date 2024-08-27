import { json } from "@remix-run/node";
import { storeData } from "../data/packageData";

export const action = async ({ request }) => {
    // const data = await request.json();
    const update = {
        date: new Date().toISOString(),
        ...request.body
      };
      // const fetchedData = await response.json();
      
    
      packageData.push(update);
      await storeData(packageData);

    return json({ status: "success" }, update);
};


