import { cosmicSync, config } from "@anandchowdhary/cosmic";
import { initializeApp, credential, firestore } from "firebase-admin";
const airtable = require("airtable");
airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: config("airtableApiKey"),
});
const base = airtable.base(config("airtableBase"));

cosmicSync("firebase-airtable");

initializeApp({
  credential: credential.cert(JSON.parse(config("firebaseServiceAccountKey"))),
  databaseURL: config("firebaseDatabaseUrl"),
});

const subscribers = firestore().collection(config("firebaseCollection"));

const createRecord = (record: any) =>
  new Promise((resolve, reject) => {
    base(config("airtableTable")).create(record, (error: Error) => {
      if (error) return reject(error);
      console.log("Created record");
      return resolve();
    });
  });

const sent: string[] = [];
const firebaseAirtable = async () => {
  console.log("Starting...");
  const docs = await subscribers.get();
  docs.forEach((doc) => sent.push(doc.id));
  console.log(sent);
};

firebaseAirtable();
