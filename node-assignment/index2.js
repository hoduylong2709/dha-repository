const csvtojson = require('csvtojson');
const fs = require('fs');

function toCamel(inputString) {
  return inputString.replace(/([-_][a-z])/ig, (s1) => {
    return s1.toUpperCase().replace('-', '').replace('_', '');
  });
};

function isArray(a) {
  return Array.isArray(a);
}

function isObject(o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

function keysToCamel(o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => { n[toCamel(k)] = keysToCamel(o[k]) });

    return n;
  }
  else if (isArray(o)) {
    return o.map((i) => { return keysToCamel(i) });
  }

  return o;
}

function convertDate(o) {
  const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const array = o["date_of_birth"].split("/");
  const monthName = months[parseInt(array[0] - 1)];
  o["date_of_birth"] = array[1] + '-' + monthName + '-' + array[2];
  return o;
}

function convertDateInJsonFile(array) {
  array.map((item) => convertDate(item));
  return array;
}

function createFullName(array) {
  array.map((o) => o.full_name = o["first_name"] + ' ' + o["last_name"]);
  return array;
}

function convertCsvToJson(csvFileName, jsonFileName) {
  csvtojson().fromFile(csvFileName)
    .then((json) => {
      convertDateInJsonFile(json);
      createFullName(json);
      fs.writeFileSync(jsonFileName, JSON.stringify(keysToCamel(json)), "utf-8", (err) => {
        if (err) console.log(err);
      });
    });
}

convertCsvToJson("input.csv", "output.json");