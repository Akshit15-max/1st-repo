// npm install request
// import request -> JS file
// npm install request

let request=require("request");//require tells to include request
let fs=require("fs");// fs=file system (FOr OS)checking for request and responses, it is inbuilt
let cheerio=require("cheerio");//require tells to include cheerio for data extraction or parsing is done
const { table } = require("console");

request("https://www.espncricinfo.com/scores/series/8048/season/2020/indian-premier-league?view=results",getAMurl);

//above is the given link to extract data from the site and a fnc is included as a parameter

function getAMurl(err,resp,html)
{
      let STool=cheerio.load(html);
      let allmatchUrlElem=STool("a[data-hover='Scorecard']");
      for(let i=0;i<allmatchUrlElem.length;i++)
      {
            let href=STool(allmatchUrlElem[i]).attr("href");
            let fUrl="https://espncricinfo.com"+href;
            findDataofAMatch(fUrl);
            console.log("##############################################################")
      }
}

 function findDataofAMatch(url)
 {
      request(url,whenDataArrive);
      function whenDataArrive(err,response,html){//request ka basic outlay hota h - (error,response,html code or file)
{
   console.log(err);//for error check
//    console.log(response);//to check for response;it'll return some number
//    console.log(html);//html code brought from the server
//     // if(err) // if there is some error
    // {
    //         //console.log("Some error",err)

    // }
    // // else{
    // //         //data->scrap
    // //         //console.log(html)//here the recieved html file will be printed
//     //         //console.log("Recieved Input");
//fs.writeFileSync("ipl.html",html)//writeFileSync saara content daal dega(likh dega) in ipl.html which came from the above url
//     }

//below code is for single(1st) entry as we're using html() fnc

//    console.log("Recieved file");
   // let STool=ch.load(html);// load fnc passes the html(jo upar waale request fnc me parameter tha) to cheerio and writes with the help of Stool

   //sTool is itself a fnc

//let outputobj=STool("div.summary");

//       console.log(outputobj.html());//it give html of that matching element
// //       console.log(outputobj.text());//it gives value or the text in it " "

// //       fs.writeFileSync("summary.html",outputobj.text());


// //below code is for multiple entries while we're using html


// //inningsarr is an array in which player names are stored as strings 

//      let inningsarr=STool("div.card.content-block.match-scorecard-table");
//      let fullHTML="<table>";//selected batsman names in the form of table input krawaya h
//      for(let i=0;i<inningsarr.length-1;i++)
//      {
//             let tablebatsman=
//             STool(inningsarr[i]).find("table.table.batsman");

//             fullHTML+=STool(tablebatsman).html();
//             fullHTML="</table>";
//      }

//      fs.writeFileSync("summary.html",fullHTML);     


let STool=cheerio.load(html);//stool is a fnc here
// single
// let outputObj = STool("div.summary");
// // it give html of that matching element
// console.log(outputObj.html());
// // it gives val 
// console.log(outputObj.text());
// innings isolate
// console.log("helo") 
 // let inningsArr=STool("table.tbody");// inningsArr is an array containing string elements
// let fullHtml="<table>"//
 let tableElem=STool("div.card.content-block.match-scorecard-table .Collapsible");
 // upar waali line se 2 collapsible tables aayegi

console.log(tableElem.length);//2

let count=0;

 for(let i=0;i<tableElem.length;i++)
 {
   let teamname = STool(tableElem[i]).find("h5.header-title.label").text();//2 tables se team names aayengi
   //STool(inningsArr[i]).find("td.batsman-cell.text-truncate");// wrapping is done coz array(innarray) is there in which coming data is stored in the form of strings 
    // extract batsman from the table and storing it in fullHtml

   let rowsofateam=STool(tableElem[i]).find("table.table.batsman").find("tbody tr")
   //isse 

   // fullHtml+= STool(tableBatsMan).text();//tablebatsman ki text waali info fullHtml me store ho jayegi
   // fullHtml+="<table>";

   for(let j=0;j<rowsofateam.length;j++)
   {
      let rCols=STool(rowsofateam[j]).find("td");
      let isbatsmanrow=STool(rCols[0]).hasClass("batsman-cell");

      if(isbatsmanrow==true)
      {
            count++;
            let pname=STool(rCols[0]).text();
            let runs=STool(rCols[2]).text();
            let balls=STool(rCols[3]).text();
            let fours=STool(rCols[4]).text();
            let sixes=STool(rCols[5]).text();
            let sr=STool(rCols[6]).text();
            console.log(`Name : ${pname} Runs: ${runs} Balls: ${balls} Fours: ${fours} Sixes: ${sixes} Strike Rate : ${sr} `);
      }

   }
   console.log("Number of batsman in a team ",count);
   console.log(teamname);
   count=0;

   console.log("-------------------------------------------------");
 }
 //fs.writeFileSync("innings.html",fullHtml);//final page pr hum fullhtml ke through innings waali file me likhenge
// fs.writeFileSync("index.html",html);


}


 }
 }