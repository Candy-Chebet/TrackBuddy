import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getStoredData = async () => {
  try {
    const filePath = path.join(__dirname, './packageData.json'); 
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing packageData.json:', error);
    throw error;
  }
};


//failed t load response data: No data found for resource with given identifier



export async function storeData(update) {
  try{
    const rawFileContent = await fs.readFile('packageData.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);

    const storedData = data.packageData ?? [];
    storedData.push(update);
    

    return fs.writeFile('packageData.json', JSON.stringify({ packageData: storedData }, null, 2));
   } catch (error) {
    console.error("Error getting or parsing packageData.json:", error);
    return [];

   }
}



