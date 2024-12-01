//-------------------------------------------------------
// save Init DB
function getEditorValue() {
  var vJSON = null;
  if (editor) {
    vJSON = editor.getValue();
  } else {
    console.error("JSON editor undefined or 'editor' variable not accessible!");
    vJSON = {};
  }
  return vJSON;
}

function saveInitDB() {
  //saveFile2HDD('db_init.js','vDataJSON.db_init = ' + JSON.stringify(editor.getValue(),null,4) + ';')
  var vContent = el("jsoninput").value;
  vContent = 'vDataJSON.db_init = ' + vContent + ';';
  vContent = "// File: db/db_init.js - create with https://niehausbert.gitlab.io/JSON2Schema \n" +
  "// Edit this file for the desired default values and replace: db/db_init.js in jsoneeditor_app.zip \n" +
  "// that is generated with JSON2Schema - see also  https://www.github.com/niebert/jsoneditor_app \n" +
      vContent;
  // Get the value from the editor
  saveFile2HDD("db_init.js",vContent);
  //console.log(editor.getValue());
}

el('exportJSON4DB').addEventListener('click',saveInitDB);
//-------------------------------------------------------


//-------------------------------------------------------
// Hook up the submit button to log to the console
el('bExportEditorContent').addEventListener('click',function() {
  var vContent = getInnerHTML_Editor("editor_holder");
  // Get the value from the editor
  saveFile2HDD("editor_innerhtml.html",vContent);
  console.log("Editors inner HTML exported for debugging!");
  //console.log(editor.getValue());
});
//-------------------------------------------------------


function saveInnerHTML() {
  var vContent = style_html(getEditorInnerHTML("editor_holder"));
  // Get the value from the editor
  saveFile2HDD("editor_innerhtml.html",vContent);
  //console.log(editor.getValue());
}
