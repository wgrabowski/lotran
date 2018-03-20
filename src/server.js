#!/usr/bin/env node
const express = require('express');
const request = require('request');
const requireGlob = require('require-glob');
const path = require('path');
const cors = require('cors');

const start = (translationsDir, pattern, apiUrl, port) => {
  const normalizedDir = path.normalize(translationsDir);

  const serveCombinedTranslations = (res, req, translationsFromApi) => {
    requireGlob([pattern], {
      cwd: normalizedDir,
      reducer: (options, result, fileObject, i, fileObjects) => {
        result = Object.assign({}, result, fileObject.exports);
        return result;
      }
    }).then(function(localTranslations) {
      res.json(Object.assign({}, localTranslations, translationsFromApi));
    });
  };

  const app = express();
  app.use(cors());

  const serveTranslations = (req, res) => {
    request.get(`${apiUrl}/${req.params.lang}`,
      (error, response, body) => {
        serveCombinedTranslations(res, req, JSON.parse(body));
      });

  };
  app.get('/translations/:lang', serveTranslations);

  app.listen(port, () => {
    console.log('Lotr server is listening on port ${port}.');
    console.log(`Translations from ${pattern} files found in ${normalizedDir} are merged with translations from ${apiUrl} and server under endpoint: translations/{lang}`);
  });
};

module.exports = start;