const express = require('express');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
var pdfFiller   = require('pdffiller');

const app = express();
const port = process.env.PORT || 5000;

//Allow CORS due to cross domain environment
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//POST method to fill details and send the completed document.
app.post('/api/fillfields', (req, res) => {

    //Conditions to determine default or custom file.
    if(req.body["fileNumber"]){
      var srcFDF = `./assets/input_files/smart_pdf_${req.body["fileNumber"]}.pdf`;
      var destPDF =  `./assets/output_files/smart_pdf_${req.body["fileNumber"]}_completed.pdf`;
    }
    else{
      var srcFDF = `./assets/uploaded_files/${req.body["fillableFile"]}`;
      var destPDF =  `./assets/output_files/smarter_completed_${req.body["fillableFile"]}`;
    }
    //pdfFiller plugin to fill an FDF file.
    pdfFiller.fillForm( srcFDF, destPDF, req.body, function(err) {
        if (err) res.send({error:"Error updating values in the document."});
        res.sendFile(path.resolve(destPDF));
    });
});

//POST method to extract fields from FDF and return as JSON.
app.post('/api/extractfields', (req, res) => {

    var Storage = multer.diskStorage({
      destination: function(req, file, callback) {
          callback(null, "./assets/uploaded_files");
      },
      filename: function(req, file, callback) {
          callback(null, Date.now() + "_"+ file.originalname );
      }
    });
    var upload = multer({
      storage: Storage
    }).single("pdfFile");//TODO: Update this to allow multiple files
    //pdfFiller plugin method to upload the file to server.
    upload(req, res, function(err) {
       if (err) {
           return res.json({error:"Not a valid document."});
       }
       var sourcePDF = `${req.file.destination}/${req.file.filename}`;
       //pdfFiller plugin method to generate an FDF file.
       var FDF_data = pdfFiller.generateFDFTemplate(sourcePDF, null, function(err, fdfData) {
          if (err) return res.json({errMsg:"Not a fillable document"});
          if(Object.keys(fdfData).length == 0) return res.json({errMsg:"No fillable fields found."});
          fdfData["fillableFile"] = `${req.file.filename}`;//Assuming user uploads FDF only.
          return res.json(fdfData);
       });
     });
});
app.listen(port);
