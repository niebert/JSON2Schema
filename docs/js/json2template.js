/* ---------------------------------------
 Exported Function in Module: getTemplate4JSON
 Package:  json2schema4editor
 Version:  0.0.6  Date: 2019/07/30 17:38:08
 Homepage: https://gitlab.com/niehausbert/JSON2Schema#readme
 Author:   Bert Niehaus
 License:  MIT
 Date:     2020/07/22 17:38:08
 Require Module with:
    const getTemplate4JSON = require('json2schema4editor');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */

function displayTemplate(pInputID,pOutputID,pTitleID) {
  // this tool uses ACE currently depricated
  var vRootTitle = getValueDOM(pTitleID);

  //var vStringJSON = getEditorValue(pInputID);
  var vStringJSON = ""; //getValueDOM(pInputID);
  var vJSON = null; //getJSON4String(vStringJSON);
  if (vSchemaEditor) {
    vJSON = vSchemaEditor.getValue();
    if (vJSON) {
      // create the JSON Template and store that into the textarea.
      var vSchema = getSchema4Editor(vJSON,vRootTitle);
      vSchema.title = vRootTitle;
      vSchema.options.collapsed = false;
      var vStringSchema = JSON.stringify(vSchema,null,4);
      write2value(pOutputID,vStringSchema);
      //setEditorValue(pOutputID,vStringSchema);
      $('#pTemplateOutput').show();
    } else {
      console.error("ERROR: displayTemplate('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
    }
  } else {
    console.error("ERROR: displayTemplate() - vTemplateEditor was not defined!");
  }

}


function getRootTemplate4JSON(pJSON,pTitle,pOutFormat) {
  // getSchema4JSON is called for the root element of the JSON file
  var vTitle = pTitle || "MyJSON";
  console.log("getTemplate4JSON(pJSON,'"+vTitle+"',pJSON,'"+pOutFormat+"')");
  var vPath = "";
  //var vTemplate = "getTemplate4JSON() Title: "+pTitle+"\n\n";
  var vTemplate = "";
  var vJSON = cloneJSON(pJSON);
  //vTemplate += getTemplate4JSON(vTemplate,vJSON);
  // vEditorPath is the path to a specific JSON element in the JSON file
  // "root" is the root node of the JSON. "root.name" is addressing the name
  // { "name":"Peter Miller"}. Deeper subelements of the EditorPath will be defined
  // in  a recursive way.
  var vEditorPath = "root";
  // path is keeping track of the JSON schema
  vTemplate += convertJSON2Template(vJSON,vPath,vTemplate,vEditorPath,vTitle,pOutFormat);
  //return vTypeTree;
  return vTemplate;
}

function getTemplate4JSON(pTemplate,pJSON,pOutFormat) {
  // clones the original JSON to get the JSON structure of the TypeTree
  // currently the TypeTree still contains the original default value of pJSON
  // createTypeTree4JSON() replaces the leafs in the TypeTree with the type of leafs
  // arrays and hashes/objects remain untouched
  pTemplate += createTemplate4JSON(vJSON,pTemplate,pOutFormat);
  return pTemplate;
}

function type4json(pJSON) {
  if (pJSON == null){
    // if (pJSON = null) then typeof(pJSON) return "object".
    // therefore this check is necessary to catch case "undefined" and "null"
    return "null";
  } else if (isArray(pJSON)) {
    return "array"
  } else if (isHash(pJSON)) {
    return "object"
  } else if (typeof(pJSON) == "number") {
    if (isInteger(pJSON)) {
      return "integer"
    } else {
      return "number"
    }
  } else {
    var vType = typeof(pJSON);
    if (vType === "string") {
      if (pJSON.indexOf("___SELECT___") == 0) {
        vType = "select";
      }
    }
    return vType;
  }
};


function createTemplate4JSON(pJSON,pTemplate,pOutFormat) {
  var vType = getType4JSON(pJSON);
  var vSubType = "";
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      for (var key in pJSON) {
        if (pJSON.hasOwnProperty(key)) {
          // loop over key value pairs of hash
          vSubType = getType4JSON(pJSON[key]);
          if ((vSubType == "array") || (vSubType == "object")) {
            pTemplate += createTemplate4JSON(pJSON[key],"",pOutFormat);
          }
        }
      }
    break;
    //---- ARRAY -------------
    case "array":
      for (var i = 0; i < pJSON.length; i++) {
        vSubType = getType4JSON(pJSON[i]);
        if ((vSubType == "array") || (vSubType == "object")) {
          pTemplate += createTemplate4JSON(pJSON[i],"",pOutFormat);
        }
      }
    break;
    default:
      console.log("createTemplate4JSON() default - do nothing");
  }
  return pTemplate
}

function getID4Path(pPath) {
  var vID = pPath;
  var vSlashPos = vID.lastIndexOf("/");
  if (vSlashPos>0) {
    vID = pPath.substring(vSlashPos+1);
  }
  return vID;
}


function getOutTPL(pOutFormat) {
  var vChecked = document.getElementById("cTemplateComments").checked

  console.log("CALL: getOutTPL('" + pOutFormat + "')");
  var vOut = {
    "format": "text",
    "comment":{
        "show": vChecked,
        "prefix":" ",
        "postfix":" "
    },
    "item":{
        "prefix":"\n  * ",
        "postfix":" "
    },
    "itemize": {
        "prefix":"\n  ",
        "postfix":"\n "
    },
    "enumerate": {
        "prefix":"\n ",
        "postfix":"\n "
    }
  };
  vOut.format = pOutFormat;
  switch (pOutFormat) {
    case "html":
      vOut = {
        "format": pOutFormat,
        "comment":{
            "show": vChecked,
            "prefix":"<!-- ",
            "postfix":" -->"
        },
        "item":{
            "prefix":"\n<LI class=\"item4list\"> ",
            "postfix":"\n</LI>"
        },
        "itemize": {
          "prefix":"\n<UL class=\"itemlist\"> ",
          "postfix":"\n</UL>"
        },
        "enumerate": {
          "prefix":"\n<OL class=\"enumlist\"> ",
          "postfix":"\n</OL>"
        }
      }
    break;
    case "markdown":
      vOut = {
        "format": pOutFormat,
        "comment":{
            "show": vChecked,
            "prefix":"<!-- ",
            "postfix":" -->"
        },
        "item":{
            "prefix":"\n* ",
            "postfix":" "
        },
        "itemize": {
          "prefix":"\n ",
          "postfix":"\n "
        },
        "enumerate": {
          "prefix":"\n ",
          "postfix":"\n "
        }
      }
    break;
    case "wiki":
      vOut = {
        "format": pOutFormat,
        "comment":{
            "show": vChecked,
            "prefix":"<!-- ",
            "postfix":" -->"
        },
        "item":{
            "prefix":"\n* ",
            "postfix":" "
        },
        "itemize": {
          "prefix":"\n ",
          "postfix":"\n "
        },
        "enumerate": {
          "prefix":"\n ",
          "postfix":"\n "
        }
      }
    break;
    case "latex":
      vOut = {
        "format": pOutFormat,
        "comment":{
          "show": vChecked,
          "prefix":"% ",
          "postfix":" "
        },
        "item":{
          "prefix":"\n  \\item ",
          "postfix":" "
        },
        "itemize": {
          "prefix":"\n\\begin{itemize}",
          "postfix":"\n\\end{itemize}"
        },
        "enumerate": {
          "prefix":"\n\\begin{enumerate}",
          "postfix":"\n\\end{enumerate}"
        }
      };
    break;
    default:
      //vOut.format = "text";
      console.log("Output Default format 'text'");
  }
  return vOut;
}


function getComment4EditorPath(pEditorPath,pType,pTitle,pOutFormat) {
  var vTemplate = "";
  vTitleTPL = getTitle4EditorPath(pEditorPath,pType,pTitle);
  console.log("CALL: getOutTPL('"+pOutFormat+"') in getComment4EditorPath('" + pEditorPath + "')");
  var vOutTPL = getOutTPL(pOutFormat);
  if (vOutTPL.comment.show == true) {
    vComment = "\n" + vOutTPL.comment.prefix + "Title: " + vTitleTPL +"  Type: "+pType + " " + vOutTPL.comment.postfix;
    vComment += "\n" + vOutTPL.comment.prefix + "ID:    " + pEditorPath + " " + vOutTPL.comment.postfix;
  };
  console.log("Title='" + vTitleTPL + "'");
  return vTemplate;
}

function getTemplate4EditorPath(pEditorPath,pType,pTitle,pOutFormat) {
  var vTemplate = "";
  vTemplate += "{{{" + getID4EditorPath(pEditorPath) + "}}}";
  vTemplate += getComment4EditorPath(pEditorPath,pType,pTitle,pOutFormat)
  return vTemplate;
}
// call convertJSON2Template(pJSON,vPath,vTemplate,vEditorPath,vTitle,pOutFormat)
function convertJSON2Template(pJSON,pPath,pTemplate,pEditorPath,pTitle,pOutFormat) {
  //console.log("convertJSON2Schema('"+pPath+"') pTitle='"+pTitle+"'");
  var vTitle = pTitle || "Default Schema Title";
  // vTitle is the Root Title of JSON used for Schema
  // pTypeTree is need for checking deep equal for "oneOf" definition in arrays
  //var vType = getType4JSON(pJSON);
  var vType = type4json(pJSON);
  // check if root node of JSON
  var vID = "ID?";
  var vTitleJSON = "Title";
  if (pPath == "") {
    // replace root ID with a link to JSON
    vID = "";
  } else {
    vID = getID4EditorPath(pPath);
  };

  console.log("CALL: getOutTPL('"+pOutFormat+"') in convertJSON2Template('" + pPath + "')");
  var vOutTPL = getOutTPL(pOutFormat);
  var vComment = "";
  //--- create schema dependent on typo of JSON node ----
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      vTitleTPL = getTitle4EditorPath(pEditorPath,vType,vTitle,pOutFormat);
      console.log("Title for Object='" + vTitleTPL + "'");
      if (vOutTPL.comment.show == true) {
        vComment = vOutTPL.comment.prefix + "Object: " + pEditorPath + vOutTPL.comment.postfix;
      }
      pTemplate += vOutTPL.itemize.prefix + " " + vComment;
      pTemplate += convertObject2Template(pJSON,pPath," ",pEditorPath,vTitle,pOutFormat);
      pTemplate += vOutTPL.itemize.postfix + " " + vComment;
    break;
    //---- ARRAY -------------
    case "array":
      vTitleTPL = getTitle4EditorPath(pEditorPath,vType,vTitle,pOutFormat);
      console.log("Title for Array='" + vTitleTPL + "'");
      if (vOutTPL.comment.show == true) {
        vComment = vOutTPL.comment.prefix  + "Array: "+ pEditorPath + vOutTPL.comment.postfix;
      }
      pTemplate += vOutTPL.enumerate.prefix + " " + vComment;
      pTemplate += convertArray2Template(pJSON,pPath," ",pEditorPath,vTitle,vID,pOutFormat);
      pTemplate += vOutTPL.enumerate.postfix + " " + vComment;
    break;
    //---- STRING ------------
    case "string":
      pTemplate += getTemplate4EditorPath(pEditorPath,vType,vTitle,pOutFormat);
      if (vOutTPL.comment.show == true) {
        pTemplate += "\n " + vOutTPL.comment.prefix + "String Format: " + determineStringFormat4Template(pJSON) + vOutTPL.comment.postfix;
      }
    break;
    //---- SELECT ------------
    case "select":
      var vOptions = getEnumOptions(pJSON);
      if (vOptions.length > 0) {
        console.log("SELECT found for template '" + pJSON + "'");
        for (var i = 0; i < vOptions.length; i++) {
          pTemplate += "\n{{#ifcond " + getID4EditorPath(pEditorPath) + " \"==\" \"" + vOptions[i] + "\"}}"
          pTemplate += "\n  {{{" + getID4EditorPath(pEditorPath) + "}}}";
          if (vOutTPL.comment.show == true) {
            pTemplate += "\n"  + "  " + vOutTPL.comment.prefix + "  Attribute '" + getID4EditorPath(pEditorPath) + "' has value '" + vOptions[i] + "' in output format '" + vOutTPL.format + "'" + vOutTPL.comment.postfix;
          };
          pTemplate += "\n{{/ifcond}}";
        }
        pTemplate += getComment4EditorPath(pEditorPath,"string",pTitle,pOutFormat)
      } else {
        pTemplate += getTemplate4EditorPath(pEditorPath,vType,vTitle,pOutFormat);
        if (vOutTPL.comment.show == true) {
          pTemplate += "\n " + vOutTPL.comment.prefix + "String Format: " + determineStringFormat4Template(pJSON) + vOutTPL.comment.postfix;
        }
      }
    break;
  //---- NUMBER ------------
    case "number":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pTemplate += getTemplate4EditorPath(pEditorPath,vType,vTitle,pOutFormat)
    break;
    //---- INTEGER ------------
    case "integer":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pTemplate += getTemplate4EditorPath(pEditorPath,vType,vTitle,pOutFormat)
    break;
    //---- BOOLEAN ------------
    case "boolean":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pTemplate += "\n{{#if " + getID4EditorPath(pEditorPath) + "}}";
      pTemplate += "\n       " + vOutTPL.comment.prefix + " "  + pEditorPath + "=true " + vOutTPL.comment.postfix;
      pTemplate += "\n{{else}}";
      pTemplate += "\n       " + vOutTPL.comment.prefix + " " + pEditorPath + "=false " + vOutTPL.comment.postfix;
      pTemplate += "\n{{/if}}";
    break;
    default:
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pTemplate += "\n{{{" + getID4EditorPath(pEditorPath) + "}}}";
    }

    console.log("TemplateGen - Path: '"+pPath+"' Type='"+vType+"'");
    return pTemplate;
}

function getTemplateID4Path(pPath) {
  var vID = pPath;
  if (pPath) {
    // remove last dot
    vID = vID.replace(/\.^/g,'');
    var vSlashPos = vID.lastIndexOf(".");
    if (vSlashPos>0) {
      vID = pPath.substring(vSlashPos+1);
    }
  } else {
    vID = "root"
  }
  switch (vID) {
    case "*":
        vID = "this";
    break;
    case "root":
        vID = ".";
    break;
    default:
        // getID4Path() generic return
  }
  console.log("getTemplateID4Path(" + pPath + ")='" + vID + "'");
  return vID;
}


function convertObject2Template(pJSON,pPath,pTemplate,pEditorPath,pTitle,pOutFormat) {
  // the array of all required keys in the hash/object
  console.log("CALL: getOutTPL('"+pOutFormat+"') in convertObject2Template('" + pPath + "')");
  var vOutTPL = getOutTPL(pOutFormat);
  var vID = getTemplateID4Path(pEditorPath);
  if (vID && vID != ".") {
    pTemplate += "\n{{#with " + vID + "}}"
  }
  for (var key in pJSON) {
    if (pJSON.hasOwnProperty(key)) {
      pTemplate += vOutTPL.item.prefix;
      // now call convertJSON2Schema() on sub-structure of JSON
      var vSubType = getType4JSON(pJSON[key]);
      pTemplate += convertJSON2Template(pJSON[key],pPath+"/properties/"+key, " " ,pEditorPath+"."+key,pTitle,pOutFormat);
      pTemplate += vOutTPL.item.postfix;
    }
  }
  if (vID && vID != ".") {
    pTemplate += "\n{{/with}}";
  }
  return pTemplate
}

function convertArray2Template(pJSON,pPath,pTemplate,pEditorPath,pTitle,pID,pOutFormat) {
  //var vID = pID || "."; // "." means the root element of the JSON is an array
  var vID = getTemplateID4Path(pPath); // "." means the root element of the JSON is an array
  var vItems = [];
  console.log("CALL: getOutTPL('"+pOutFormat+"') in convertArray2Template('" + pPath + "')");
  var vOutTPL = getOutTPL(pOutFormat);
  if (vOutTPL.comment.show == true) {
    pTemplate += "\n" + vOutTPL.comment.prefix + "Array Path: " + pEditorPath + " "+ vOutTPL.comment.postfix;
  };
  for (var i = 0; i < pJSON.length; i++) {
    pTemplate += "\n{{#each " + getTemplateID4Path(pEditorPath) + "}}"
    pTemplate += vOutTPL.item.prefix;
    var vSubType = getType4JSON(pJSON[i]);
    switch (vSubType) {
      case "array":
        pTemplate += "Sub-Type of Array Element: '"+vSubType+"'";
        pTemplate += convertJSON2Template(pJSON[i],pPath+"/items", "",pEditorPath+".*",pTitle,pOutFormat)
      break;
      case "object":
        pTemplate += "Sub-Type of Array Element: '"+vSubType+"'";
        pTemplate += convertJSON2Template(pJSON[i],pPath+"/items", "",pEditorPath+".*",pTitle,pOutFormat)
      break;
      default:
        pTemplate += "{{{this}}}";
        pTemplate += getComment4EditorPath(pEditorPath,vSubType,pTitle,pOutFormat);
    }
    pTemplate += vOutTPL.item.postfix;
    pTemplate += "\n{{/each}}";
  }
  return pTemplate
}


function determineStringFormat4Template(pString) {
  var vColorRegEx = new RegExp("^#[0-9a-fA-F]{6}$");
  var vGeolocRegEx = new RegExp("^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$");
  if (vColorRegEx.test(pString) == true) {
    return "color";
  } else if (pString.indexOf("\n") >= 0) {
    return "textarea";
  } else {
    return "text";
  }
}
