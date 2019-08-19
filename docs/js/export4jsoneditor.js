function exportEditorHTML() {
  if (vDataJSON.hasOwnProperty("jsoneditor")) {
    console.log("Create JSON Editor");

    var vTemplate = vDataJSON["jsoneditor"]["template"];
    //var vJSONstring = getEditorValue("iACEinput");
    //var vSCHEMAstring = getEditorValue("iACEoutput");
    var vJSONstring = getValueDOM("jsoninput");
    var vSCHEMAstring = getValueDOM("schemaoutput");
    vTemplate = replaceString(vTemplate,"___JSON_SCHEMA___",vSCHEMAstring);
    vTemplate = replaceString(vTemplate,"___JSON_DATA___",vJSONstring);
    saveFile2HDD("jsoneditor.html",vTemplate);
  } else {
    console.log("Template vDataJSON['jsoneditor'] is not defined/loaded!");
  }
}

function exportEditorZIP(pZIP) {
  var vJSONstring = getValueDOM("jsoninput");
  var vSCHEMAstring = getValueDOM("schemaoutput");
  vSCHEMAstring = "vDataJSON.schema4json =  " + vSCHEMAstring;
  pZIP.file("jsoneditor_app/schema/schema4json.js", vSCHEMAstring , {base64: false});
  var vFilename = "jsoneditor_app.zip";
  pZIP.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
    saveAs(blob, vFilename);                          // 2) trigger the download
  }, function (err) {
    console.error("ERROR: generation of zip-file '" + vFilename + "' - "+err);
  });
}

function createEditorHTML4SchemaJSON(pSchema,pJSON) {
  var iFrameDoc = getIFrameDocument("iTemplate");
  if (iFrameDoc) {
    console.log("Template '"+vFilename+"' loaded");
    var vTemplate = iFrameDoc.getElementsByTagName("html")[0].innerHTML;
    vTemplate = "<!DOCTYPE html>\n</html>\n"+vTemplate+"\n</html>"
    vTemplate = replaceString(vTemplate,"___JSON_SCHEMA___",pSchema);
    vTemplate = replaceString(vTemplate,"___JSON_DATA___",pJSON);
    return vTemplate;
  } else {
    console.log("ERROR: Loading Template '"+vFilename+"' failed");
  }
}
