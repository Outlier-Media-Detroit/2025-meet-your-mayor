require("dotenv").config();
const fs = require("fs");
const { google } = require("googleapis");
const { docToArchieML } = require("@newswire/doc-to-archieml");

const downloadGoogleDocContent = () => {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/documents.readonly",
    ],
  });

  const fileName = process.env.FILENAME || "page";
  docToArchieML({ documentId: process.env.DOCID, auth })
    .then((json) => {
      if (json.code === 404) {
        console.log(
          `❌ Oops! Download returned a 404 error code: ${json.message} Did you forget to inclue a document id?`
        );
      } else {
        fs.writeFile(
          `src/${fileName}-content.js`,
          `export const ${fileName}Content = ${JSON.stringify(
            Object.fromEntries(
              // Remove element ending in X
              Object.entries(json)
                .filter((element) => !element[0].endsWith("X"))
                .map((rec) => {
                  if (fileName !== "question") return rec;
                  [1, 2, 3, 4, 5, 6].forEach((num) => {
                    if (!rec[`option${num}`]) {
                      rec[`option${num}`] = null;
                    }
                  });
                  return rec;
                })
                .sort(([a, _a], [b, _b]) => {
                  if (fileName !== "question") return 0;
                  // Custom sorting to handle question order
                  const aNum = parseInt(a.replace("question", ""));
                  const bNum = parseInt(b.replace("question", ""));
                  if (aNum !== bNum) {
                    return aNum - bNum;
                  }

                  return a.localeCompare(b);
                })
            )
          )}`,
          (err) => {
            // In case of a error throw err.
            if (err) throw err;
          }
        );
        console.log(
          `✅ Downloaded ${fileName} content from Google Docs and saved it in ${fileName}-content.js`
        );
        if (fileName === "candidate") {
          fs.writeFile(
            `src/candidate-list.json`,
            `${JSON.stringify(
              Object.entries(json)
                .filter((candidate) => candidate[0] !== "candidateX")
                .map((candidate) => ({ name: candidate[1].name }))
            )}`,
            (err) => {
              // In case of a error throw err.
              if (err) throw err;
            }
          );
          console.log(
            `✅ Downloaded candidate list from Google Docs and saved it in candidate-list.json`
          );
        }
      }
    })
    .catch((err) =>
      console.error(`Could not download page content from Google Docs`, err)
    );
};

module.exports = {
  downloadGoogleDocContent,
};
