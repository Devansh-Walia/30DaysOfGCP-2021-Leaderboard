const express = require("express");
// const mainroutes = require("./routes/mainroutes");
const fs = require("fs/promises");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

const app = express();
const hostname = "0.0.0.0";
const port = 8080;
app.set("view engine", "ejs");

app.use(express.static("public"));
// app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const puppeteer = require("puppeteer");
const { json } = require("body-parser");

const csvWriter = createCsvWriter({
  header: ["Quests"],
  path: "file.csv",
});

// For testing and development purposes

// const urls = [
//     "https://google.qwiklabs.com/public_profiles/a13186ba-7fef-45ad-a539-cbf589475fa8",
//     "https://google.qwiklabs.com/public_profiles/8b44dc79-6547-4be9-90f6-21a770e42550",
//     "https://www.qwiklabs.com/public_profiles/5ff2c506-64ea-4bc8-b48f-59cfc4152736",
//     "https://google.qwiklabs.com/public_profiles/1b2f781e-5edc-485f-8fe7-1f63735588d2",
//   ];

var finalobj = {};

async function startbrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let i = 0;
  pagesurfer(browser, page, i, finalobj);
}


async function pagesurfer(browser, page, i, finalobj) {
    if (i == urls.length) {
      browser
        .close()
        .then((response) => {
          console.log("Browser Session Closed", finalobj);
        })
        .catch((response) => console.log("Error closing"));
      return;
    }
    console.log(urls[i]);
    page
      .goto(urls[i])
      .then((response) => {
        let names = [];
        page
          .$$eval(
            "body > ql-drawer-container > ql-drawer-content > main > div > h1",
            (name) => {
              wrappedname = name.map((x) => x.innerHTML.trim());
              return wrappedname[0];
            }
          )
          .then((response) => {
            //   username = JSON.stringify(response);
            username = response;
            console.log(username);

            // Crawling Further

            page
            .$$eval(
              "body > ql-drawer-container > ql-drawer-content > main > div > div > div > span.ql-subhead-1.l-mts",
              (names) => {
                return names.map((x) => x.innerHTML.trim());
              }
            )
            .then((result) => {
              names = JSON.stringify(result);
              //   names = result;
              console.log(names);


              // Getting dates
              page
              .$$eval(
                "body > ql-drawer-container > ql-drawer-content > main > div > div > div:nth-child(1) > span.ql-body-2.l-mbs",
                (name) => {
                  wrappedname = name.map((x) => x.innerHTML.trim());
                  return wrappedname[0];
                }
              )


              // exceptions
            
        })
        .catch((err) => console.log("Couldn't get name"));
      
      
            // Aj
        })
      .catch((err) => console.log("Couldn't open page err"));
  }


// setInterval(function () {
//   startbrowser();
// }, 360000);
startbrowser();
// Refresshes Every 6 minutes

app.get("/", (req, res, next) => {
  res.send(finalobj);
});

app.listen(port, () => {
  console.log(`App Running on port ${port || process.env.PORT}.`);
});
