function msg_save_zip() {
  alert('Save JSON-Editor with generated schema as ZIP.\n' +
        '(1) Unzip jsoneditor_app.zip e.g. in your download folder and\n' +
        '(2) Start jsoneditor_app/index.html in your browser.');
}

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

function clearPreviousEditor() {
  console.log("CALL: clearPreviousEditor()");
  // clean up previous editor if exists and hide JSON editor DIV
}

function getFilename4Title() {
  return string2filename(getValueDOM("tTitleSchema")) + ".json";
}

function addFiles2ZIP(pZIP,pOptions) {
  var vJSONstring = getValueDOM("jsoninput");
  var vSCHEMAstring = getValueDOM("schemaoutput");
  var vTPLstring = getValueDOM("template4json");
  pOptions.file_json = getFilename4Title();
  var vFilename = "";
  var vBanner = "";
  var vHeader = "// JSON2Schema\n";
  var vTail = "\n// created with JSON2Schema: https://niehausbert.gitlab.io/JSON2Schema\n\n";
  var vKey = "";
  if (pOptions) {
    if (pOptions.hasOwnProperty("app_folder")) {

      vKey = "schema_id";
      if (pOptions.hasOwnProperty(vKey)) {
        vFilename = pOptions.app_folder + "/schema/" + pOptions[vKey] + ".js";
        vBanner = vHeader + "// File for ID '" + vKey + "': " + vFilename + vTail;
        vSCHEMAstring = vBanner + "vDataJSON." + pOptions[vKey] + " =  " + vSCHEMAstring + ";\n";
        pZIP.file(vFilename, vSCHEMAstring , {base64: false});
      } else {
        console.error("ERROR: addFiles2ZIP(pZIP,pOptions) - attribute 'pOption."+vKey+"' not defined");
      }

      vKey = "init_id";
      if (pOptions.hasOwnProperty(vKey)) {
        vFilename = pOptions.app_folder + "/db/" + pOptions[vKey] + ".js";
        vBanner = vHeader + "// File for ID '" + vKey + "': " + vFilename + vTail;
        vJSONstring = vBanner + "vDataJSON." + pOptions[vKey] + " =  " + vJSONstring + ";\n";
        pZIP.file(vFilename, vJSONstring , {base64: false});
      } else {
        console.error("ERROR: addFiles2ZIP(pZIP,pOptions) - attribute 'pOption."+vKey+"' not defined");
      }
      vKey = "template_id";
      if (pOptions.hasOwnProperty(vKey)) {
        vFilename = pOptions.app_folder + "/tpl/" + pOptions[vKey] + "_tpl.js";
        vBanner = vHeader + "// File for ID '" + vKey + "': " + vFilename + vTail;
        vTPLstring = vBanner + "vDataJSON.tpl." + pOptions[vKey] + " =  `\n" + vTPLstring + "`;\n";
        pZIP.file(vFilename, vTPLstring , {base64: false});
      } else {
        console.error("ERROR: addFiles2ZIP(pZIP,pOptions) - attribute 'pOption."+vKey+"' not defined");
        alert("Error")
      }

    } else {
      console.error("ERROR: addFiles2ZIP(pZIP,pOptions) - attribute 'app_folder' not defined in pOptions");
    }
  } else {
    console.error("ERROR: addFiles2ZIP(pZIP,pOptions) - pOptions  not defined");
  }

  return pZIP;
}

function logContentZIP(pZIP) {
  pZIP.forEach(function (relativePath, file){
      console.log("File in ZIP: ", relativePath);
      //vNode.innerHTML = vNode.innerHTML + "<li>" + relativePath + "</li>";
  });
}

function setAppFolderZIP(pZIP,pOptions) {
  // app_folder is a global variable -
  var vPosSlash = 0;
  var vAppFolderFound = false;
  pZIP.forEach(function (relativePath, file){
    // extract App Folder only once if AppFolder was not found yet.
    if (!vAppFolderFound) {
      vPosSlash = relativePath.indexOf("/");
      if (vPosSlash > 0) {
        console.log("CALL: getAppFolder(pZIP,pOptions) App Folder found in file '"+relativePath+"'");
        vAppFolderFound = true;
        pOptions.app_folder = relativePath.substr(0,vPosSlash); // include the slash in app_folder
      }
    }
      //vNode.innerHTML = vNode.innerHTML + "<li>" + relativePath + "</li>";
  });
}

function exportEditorZIP(pZIP,pOptions) {
  //logContentZIP(pZIP);
  pZIP = addFiles2ZIP(pZIP,pOptions);
  var vFilename = pOptions.app_folder + ".zip";
  pZIP.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
    saveAs(blob, vFilename);                          // 2) trigger the download
    console.log("Save ZIP File: '" + vFilename + "'");
  }, function (err) {
    console.error("ERROR: generation of zip-file '" + vFilename + "' - "+err);
  });
}


function getInnerHTML_Editor(pID) {
  pID = pID || "editor_holder";
  var vOut = "<!DOCTYPE html>\n<html>\n<body>\n<div id='editor_holder'>";
  var ed_holder = el(pID);
  if (ed_holder) {
    console.log("Editor holder with ID='editor_holder' exists!");
    vOut += $("#"+pID).html();
  } else {
    console.error("ERROR: Editor holder with ID='editor_holder' does not exist!");
  }
  vOut += "</div>\n</body>\n</html>";
  return style_html(vOut); // defined in string.js
}

function exportTemplate4JSON() {
  var vFilename ='handlebars4' + el('sOutFormat').value + '.tpl';
  saveFile2HDD(vFilename,getValueDOM('template4json'));
}
