import fs from 'node:fs';

// interface for the new json object that also contains the properties of the JSON object
export interface Json extends JSON {
    read: (path: string) => any;
}

// the new json object
const json: Json = {
    // method for reading json files
    read(path: string): any {
        const fileBuffer = fs.readFileSync(path);
        const jsonString = fileBuffer.toString();
        const jsonData = JSON.parse(jsonString);
        return jsonData;
    },
    // additional properties of the JSON object
    ...JSON
};

// export the new json object
export default json;