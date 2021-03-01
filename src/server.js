#!/usr/bin/env node
const express = require("express");
const request = require("request");
const path = require("path");
const cors = require("cors");
const glob = require("glob");
const jsonConcat = require("json-concat");


const start = (translationsDir, pattern, apiUrl, port) => {
  const normalizedDir = path.normalize(translationsDir);

  const serveCombinedTranslations = (res, req, translationsFromApi) => {
    const files = glob.sync(`${normalizedDir}/${pattern}`);

    jsonConcat(
      {
        src: files,
        dest: null,
      },
      function (error, localTranslations) {
        res.json(Object.assign({}, localTranslations, translationsFromApi));
      }
    );
  };

  const serveStatus = (req, res) => {
    const files = glob.sync(`${normalizedDir}/${pattern}`);

    res.send(getStatusContent(files));
  };

  const getStatusContent = (files)=>{
    return `<h1>Lotran status page</h1>
    <h2>Params:</h2>
    <pre>
    ${"dir".padEnd(20)}: ${translationsDir}
    ${"pattern".padEnd(20)}: ${pattern}
    ${"port".padEnd(20)}:${port}
    ${"url".padEnd(20)}:${apiUrl}
    </pre>
    <h2>Found files (${files.length}):</h2>
    <pre>${files.join("<br>")}</pre>`
  }

  const app = express();
  app.use(cors());

  const serveTranslations = (req, res) => {
    request.get(`${apiUrl}/${req.params.lang}`, (error, response, body) => {
      serveCombinedTranslations(res, req, JSON.parse(body));
    });
  };
  app.get("/translations/:lang", serveTranslations);
  app.get("/status", serveStatus);

  app.listen(port, () => {
    console.log(`Lotran server is listening on port ${port}.`);
    console.log(
      `Translations from ${pattern} files found in ${normalizedDir} are merged with translations from ${apiUrl} and served under endpoint: http://localhost:${port}/translations/{lang}`
    );
    console.log(`Current configuration and found local files are listed under http://localhost:${port}/status endpoint`)
  });
};

module.exports = start;
