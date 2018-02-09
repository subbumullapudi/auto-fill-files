const express = require('express');
const path = require('path');
var pdfFiller   = require('pdffiller');


const app = express();
const port = process.env.PORT || 5000;

//Allow CORS due to cross domain environment
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//GET method to fetch address and fill it in the required smart document.
app.get('/api/filladdress', (req, res) => {

    var srcFDF = `./assets/input_files/smart_pdf_${req.query["filenumber"]}.pdf`;
    var destPDF =  `./assets/output_files/smart_pdf_${req.query["filenumber"]}_completed.pdf`;

    pdfFiller.fillForm( srcFDF, destPDF, req.query, function(err) {
        if (err) res.send({error:"Error updating address in the document."});
        res.sendFile(path.resolve(destPDF));
        //TODO: Write code to delete the generated file.
    });
});
app.listen(port);
