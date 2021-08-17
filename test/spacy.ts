import { organizations } from "./ner/organizations";
import { promisify } from "util";
import cp from "child_process";

const testNer = async () => {
  const exec = promisify(cp.exec);
  for (const org of organizations) {
    console.log("gathering entities");
    console.log("--------------------------------------");
    console.log(org);
    console.log("--------------------------------------");
    const entities = await exec(
      'python C:\\dev\\spacy-nlp\\sent-ent.py --sentence="' + org + '"'
    );
    console.log(entities.stdout);
    console.log("--------------------------------------");
  }
};

const testType = process.argv[2];
if (testType === "--ner") {
  testNer().then((r) => console.log("finished"));
}
