import { organizations } from "./ner/organizations";
import { LanguageServiceClient } from "@google-cloud/language";
import GooglePosTest from "./pos/GooglePosTest";

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

const testPos = async () => {
  const service = new LanguageServiceClient({
    credentials: {
      private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const testRunner = new GooglePosTest(service);
  await testRunner.verifyPos("The red barn burned brightly.", "ADJ", 1);
  await testRunner.verifyPos("The red barn burned brightly.", "NOUN", 2);
  await testRunner.verifyPos("The red barn burned brightly.", "VERB", 3);
  await testRunner.verifyPos("The red barn burned brightly.", "ADV", 4);
};

const testType = process.argv[2];
if (testType === "--ner") {
  testNer();
} else if (testType === "--pos") {
  testPos();
}
