# Lotran
Local translations server
# Why?
This project was created to ease working with translations for ```ngx-translate``` and suit some specific needs. 
## Installation 
```npm install -g lotran```

## Usage
``` 
Usage: lotran  [options]

Options:
  --version    Show version number                                     [boolean]
  -d, --dir    Directory to search for translation files              [required]
  -f, --files  Pattern for translation file names
                                             [default: "**/*.translations.json"]
  -u, --url    Remote url for translations (without language parameter!), i.e
               http://my-app.com/translations                         [required]
  -p, --port   Port to serve translations on                     [default: 4300]
  -h, --help   Show help                                               [boolean]

```
## Example
* you use some API endpoint for getting translations in key:value form, i.e ```myapp.com/translations/en``` for english translations, ```myapp.com/translations/pl``` for polish translations etc.
* you have other translations in local JSON files, i.e in directory `/myDir/src`
* all traslation files have  translations.json in their names
To serve both local and remote translations under one endpoint (for development purposes) you can do:
```lotran -d /myDir/src -f **/*.translations.json -u http://myapp.com/translations```
and lotran will merge translations from local files with remote translations and serve them on ```localhost: 4300/translations/{lang}``` where lang is language code
 