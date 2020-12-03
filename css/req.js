//ci => request
//npm install request
let request=require("request");
//npm install cheerio
let ch=require("cheerio");
//file system
let fs=require("fs");
request('http://www.espncricinfo.com/series/8048/scorecard/1237181/delhi-capitals-vs-mumbai-indians-final-indian-premeir-league-2020-21', urlKaAns);
function urlKaAns(err,response,html){
    console.log(err);
    //console.log(response);
    //console.log(html);
    // fs.writeFileSync("index.html",html);
    //html page -> selector -> output
    // load file
    // load html
    console.log("Received file");
    let STool=ch.load(html);
      // let outputObj = STool("div.summary");

    //it give html of that matching element
//console.log(outputObj.html());
//it give val
//console.log(outputObj.text());
//select => unique
// html => output -> html
let inningsArr=STool("div.card.content-block.match-scorecard-table");
let fullhtml="<table>";
for(let i=0;i<2;i++){
    let tableBatsMan =
    STool(inningsArr[i]).find("table.table.batsman");
    //extract batsman from the table
fullhtml+=STool(tableBatsMan).html();
    fullhtml+="<table>";
}
fs.writeFileSync("innings.html",fullhtml);
}