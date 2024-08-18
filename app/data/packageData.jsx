import fs from 'fs/promises';


export async function getStoredData() {
    const rawFileContent = await fs.readFile('packageData.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedData = data.packageData ?? [];
    return storedData;
}


export function storeData() {
    return fs.writeFile('packageData.json', JSON.stringify({ notes: notes || [] }));
    
}