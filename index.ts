import { cosmicSync, config } from "@anandchowdhary/cosmic";
import { initializeApp, credential, firestore } from "firebase-admin";
import axios from "axios";

cosmicSync("firebase-airtable");

initializeApp({
  credential: credential.cert(JSON.parse(config("firebaseServiceAccountKey"))),
  databaseURL: config("firebaseDatabaseUrl"),
});

const subscribers = firestore().collection("subscribers-v2");

const sent: string[] = [];
const firebaseAirtable = async () => {
  console.log("Starting...");
  const docs = await subscribers.get();
  docs.forEach((doc) => sent.push(doc.id));
  console.log(sent);
};

firebaseAirtable();
