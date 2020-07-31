import { cosmicSync, config } from "@anandchowdhary/cosmic";
cosmicSync("firebase-airtable");

const firebaseAirtable = async () => {
  console.log("Starting...");
  console.log(config("firebaseDatabaseUrl"));
};

firebaseAirtable();
