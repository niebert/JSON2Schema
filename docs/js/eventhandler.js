// event handler for export are defined in "export4jsoneditor.js"

function extension4format(pFormat) {
  var ext = "txt";
  switch (pFormat) {
    case "text":
      ext = "txt";
    break;
    case "latex":
      ext = "tex";
    break;
    case "html":
      ext = "html";
    break;
    case "markdown_github","markdown":
      ext = "md";
    break;
    case "json":
      ext = "";
    break;
    case "javascript":
      ext = "js";
    break;
    case "mediawiki":
      ext = "wiki";
    break;
    /*
    case "":
      ext = ""
    break;
    */
    default:
      ext = "txt";
  }
  return ext;
}

function update4JSONinput() {
  if (vUseACE == true) {
    var vInputJSON = jsoninput_editor.getValue();
    write2value("tTitleSchema",vInputJSON.schematitle);
    write2value("jsoninput",vInputJSON.jsoninput);
  }
}

function onClickTemplate4JSON(pInputID,pOutputID,pTitleID,pOutFormat) {
  var vOutFormat = pOutFormat || "latex";
  update4JSONinput();
  var vRootTitle = getValueDOM(pTitleID);
  //var vStringJSON = getEditorValue(pInputID);
  var vStringJSON = getValueDOM(pInputID);
  var vJSON = getJSON4String(vStringJSON);
  if (vJSON) {
    // getRootTemplate4JSON() defined in json2template.js
    var vTemplate = getRootTemplate4JSON(vJSON,vRootTitle,vOutFormat);
    write2value(pOutputID,vTemplate);
    //setEditorValue(pOutputID,vStringSchema);
    $('#pTemplate4JSON').show();
  } else {
    console.log("ERROR: onClickTemplate4JSON('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
  }
}


function onClickSchema4JSON(pInputID,pOutputID,pTitleID) {
  update4JSONinput();
  var vRootTitle = getValueDOM(pTitleID);

  //var vStringJSON = getEditorValue(pInputID);
  var vStringJSON = getValueDOM(pInputID);
  var vJSON = getJSON4String(vStringJSON);
  if (vJSON) {
    // geSchema4JSON() defined in json2schema.js
    var vSchema = getSchema4JSON(vJSON,vRootTitle);
    vSchema.title = vRootTitle;
    vSchema.options.collapsed = false;
    var vStringSchema = JSON.stringify(vSchema,null,4);
    write2value(pOutputID,vStringSchema);
    //setEditorValue(pOutputID,vStringSchema);
    $('#pSchemaOutput').show();
  } else {
    console.log("ERROR: onClickSchema4JSON('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
  }
}


function onClickOutput4JSON(pInputID,pTemplateID,pOutputID,pTitleID,pOutFormat) {
  console.log("CALL: onClickOutput4JSON(IN='" + pInputID + "',TPL='" + pTemplateID + "',OUT='" + pOutputID + "',TIT="+ pTitleID + ",FMT="+pOutFormat+")");
  update4JSONinput();
  var vOutFormat = pOutFormat || "text";
  var vRootTitle = getValueDOM(pTitleID);

  //var vStringJSON = getEditorValue(pInputID);
  var vStringJSON = getValueDOM(pInputID);
  var vJSON = getJSON4String(vStringJSON);
  if (vJSON) {
    // getRootTemplate4JSON() defined in json2template.js
    var vTemplate = getValueDOM(pTemplateID);
    var vCompiler = Handlebars4Code.create_compiler4template(vTemplate);

    write2value(pOutputID,vCompiler(vJSON));
    //setEditorValue(pOutputID,vStringSchema);
    $('#pOutput4Template').show();
  } else {
    console.log("ERROR: onClickTemplate4JSON('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
  }
}
