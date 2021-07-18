import { organizations } from "./ner/organizations";
import { LanguageServiceClient } from "@google-cloud/language";

const testNer = () => {
  const service = new LanguageServiceClient({
    credentials: {
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  organizations.forEach(async (org) => {
    const orgEntities = await service.analyzeEntities({
      document: {
        content: org,
        type: "PLAIN_TEXT",
      },
      encodingType: "UTF8",
    });
    console.log("gathering entities");
    console.log("--------------------------------------");
    console.log(org);
    console.log("--------------------------------------");
    console.log(orgEntities[0].entities);
    console.log("--------------------------------------");
  });
};
const testType = process.argv[2];
if (testType === "--ner") {
  testNer();
}
