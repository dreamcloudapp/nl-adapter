import { LanguageServiceClient } from "@google-cloud/language";

type GooglePos =
  | "UNKNOWN"
  | "ADJ"
  | "ADP"
  | "ADV"
  | "CONJ"
  | "DET"
  | "NOUN"
  | "NUM"
  | "PRON"
  | "PRT"
  | "PUNCT"
  | "VERB"
  | "X"
  | "AFFIX";

class GooglePosTest {
  service: LanguageServiceClient;

  constructor(service: LanguageServiceClient) {
    this.service = service;
  }

  async verifyPos(sentence: string, pos: GooglePos, index: number) {
    console.log("'" + sentence + "' with " + pos + " at position " + index);
    console.log("============================================================");
    const [syntax] = await this.service.analyzeSyntax({
      document: {
        content: sentence,
        type: "PLAIN_TEXT",
      },
      encodingType: "UTF8",
    });
    if (syntax) {
      const tokens = syntax.tokens;
      const tag =
        tokens &&
        tokens[index] &&
        tokens[index].partOfSpeech &&
        // @ts-ignore
        tokens[index].partOfSpeech.tag;
      if (tag === pos) {
        console.log("result: pass");
      } else {
        console.log("tokens", tokens);
        console.log(
          "result: fail, expected " + pos + "; got " + (tag || "(empty)")
        );
      }

      console.log(
        "============================================================"
      );
      console.log("");
    }
  }
}

export default GooglePosTest;
