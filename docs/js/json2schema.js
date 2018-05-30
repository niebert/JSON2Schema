
function onClickSchema4JSON(pInputID,pOutputID,pTitleID) {
  var vRootTitle = getValueDOM(pTitleID);

  var vStringJSON = getEditorValue(pInputID);
  var vJSON = getJSON4String(vStringJSON);
  if (vJSON) {
    var vSchema = getSchema4JSON(vJSON,vRootTitle);
    vSchema["title"] = vRootTitle;
    vSchema.options.collapsed = false;
    var vStringSchema = JSON.stringify(vSchema,null,4);
    //write2value(pOutputID,vStringSchema);
    setEditorValue(pOutputID,vStringSchema);
    $('#pSchemaOutput').show();
  } else {
    console.log("ERROR: onClickSchema4JSON('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
  }
}

function getSchema4JSON(pJSON,pTitle) {
  // getSchema4JSON is called for the root element of the JSON file
  var vTitle = pTitle || "MyJSON";
  console.log("getSchema4JSON(pJSON,'"+vTitle+"')");
  var vPath = "";
  var vSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "title":vTitle,
    "definitions": {
      "comment": {
          "title": "Comment:",
          "type": "string",
          "format": "textarea",
          "default": ""
      },
      "yesno":{
        "default": "yes",
        "type": "string",
        "enum": [
            "yes",
            "no"
        ]
      }
    }
  };
  var vTypeTree = getTypeTree4JSON(pJSON);
  // vEditorPath is the path to a specific JSON element in the JSON file
  // "root" is the root node of the JSON. "root.name" is addressing the name
  // { "name":"Peter Miller"}. Deeper subelements of the EditorPath will be defined
  // in  a recursive way.
  var vEditorPath = "root";
  // path is keeping track of the JSON schema
  convertJSON2Schema(pJSON,vPath,vSchema,vTypeTree,vEditorPath,vTitle);
  //return vTypeTree;
  return vSchema;
};

function getTypeTree4JSON(pJSON) {
  // clones the original JSON to get the JSON structure of the TypeTree
  var vTypeTree = cloneJSON(pJSON);
  // currently the TypeTree still contains the original default value of pJSON
  // createTypeTree4JSON() replaces the leafs in the TypeTree with the type of leafs
  // arrays and hashes/objects remain untouched
  createTypeTree4JSON(pJSON,vTypeTree);
  return vTypeTree;
};

function toUpperCase1Char(pString) {
  // converts first character to uppercase.
  var vString = pString || "";
  if (vString.indexOf("/")>=0) {
    vString = vString.slice(vString.lastIndexOf("/")+1);
  };
  vString = vString.replace(/[^A-Za-z0-9]/g,"_"); // remove illegial characters in variable name
  return vString.charAt(0).toUpperCase() + vString.slice(1);
};


function getID4EditorPath(pPath) {
  var vID = pPath;
  var vSlashPos = vID.lastIndexOf(".")
  if (vSlashPos>0) {
    vID = pPath.substring(vSlashPos+1);
  };
  return vID;
}

function getTitle4EditorPath(pPath,pType,pRootTitle) {
  var vTitle = getID4EditorPath(pPath);
  if (vTitle.length>0) {
    vTitle = var2title(vTitle);
  };
  //e.g. pPath = root.* vTitle = "*"
  if (vTitle == "*") {
    pPath = pPath.substr(0,pPath.lastIndexOf("."));
    vTitle = getTitle4EditorPath(pPath);
  };
  if (vTitle == "Root") {
    if (pRootTitle) {
      vTitle = pRootTitle;
    };
  };
  if (vTitle.replace(/\s/g,"") == "") {
    vTitle = "Title "+pPath;
  };
  vTitle = var2title(vTitle);
  return vTitle;
}

function var2title(pName) {
  var vName = "undefined var";
  if (pName) {
    vName = pName;
    vName = vName.replace(/[^A-Za-z9-9äöüÄÖÜ]+/g," ");
    var vNameArr = vName.split(" ");
    for (var i = 0; i < vNameArr.length; i++) {
      vNameArr[i] = toUpperCase1Char(vNameArr[i]);
    };
    vName = vNameArr.join(" ");
  };
  return vName;
}

function getDescription4EditorPath(pPath,pType,pDescription) {
  var vDescription = "Description for '"+getID4Path(pPath)+"' Type: '"+pType+"' Path: '"+pPath+"'";
  //vDescription = "";
  if (pDescription) {
    if (pDescription != "") {
      vDescription = pDescription;
    } else {
    };
  };
  return vDescription;
}


function getTitle4JSON(pEditorPath,pType,pTitle) {
  var vTitle = "Title of '"+pEditorPath+"' Type: '"+pType+"'";
  if (pTitle) {
    if (pTitle != "") {
      vTitle = pTitle;
    } else {
      vTitle = getTitle4EditorPath(pEditorPath);
    };
  };
  return vTitle;
};

function createTypeTree4JSON(pJSON,pTypeTree) {
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
            createTypeTree4JSON(pJSON[key],pTypeTree[key])
          } else {
            pTypeTree[key] = vSubType;
          }
        }
      };
    break;
    //---- ARRAY -------------
    case "array":
      for (var i = 0; i < pJSON.length; i++) {
        vSubType = getType4JSON(pJSON[i]);
        if ((vSubType == "array") || (vSubType == "object")) {
          createTypeTree4JSON(pJSON[i],pTypeTree[i]);
        } else {
          pTypeTree[i] = vSubType;
        }
      };
    break;
    default:
      console.log("createTypeTree4JSON() default - do nothing");
  };
};

function getID4Path(pPath) {
  var vID = pPath;
  var vSlashPos = vID.lastIndexOf("/")
  if (vSlashPos>0) {
    vID = pPath.substring(vSlashPos+1);
  };
  return vID;
}

function convertJSON2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pTitle) {
  //console.log("convertJSON2Schema('"+pPath+"') pTitle='"+pTitle+"'");
  var vTitle = pTitle || "Default Schema Title";
  // pTypeTree is need for checking deep equal for "oneOf" definition in arrays
  var vType = getType4JSON(pJSON);
  //---set Type and ID---
  pSchema["type"] = vType;
  // check if root node of JSON
  if (pPath == "") {
    // replace root ID with a link to JSON
    pSchema["id"] = "https://niebert.github.io/json-editor";
  } else {
    pSchema["id"] = pPath;
  };
  //--- create schema dependent on typo of JSON node ----
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      console.log("Title for Object='"+vTitle+"'");
      pSchema["options"] = {
          "disable_collapse": false,
          "disable_edit_json": false,
          "disable_properties": false,
          "collapsed": true,
          "hidden": false
      };
      convertObject2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath);
    break;
    //---- ARRAY -------------
    case "array":
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["format"] = "tabs";
      pSchema["options"] = {
          "disable_collapse": false,
          "disable_array_add": false,
          "disable_array_delete": false,
          "disable_array_reorder": false,
          "disable_properties": false,
          "collapsed": false,
          "hidden": false
      };
      convertArray2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pSchema["title"]);
    break;
    //---- STRING ------------
    case "string":
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["default"] = pJSON; //"Default text of "+vType+" variable";
      pSchema["format"] = determineFormat4String(pJSON);
      pSchema["description"] = getDescription4EditorPath(pPath,vType);
      //"A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema["options"] = {
          "hidden": false
      };
    break;
    //---- NUMBER ------------
    case "number":
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["default"] = pJSON;
      pSchema["description"] = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema["options"] = {
          "hidden": false
      };
    break;
    //---- INTEGER ------------
    case "integer":
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["default"] = pJSON;
      pSchema["description"] = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema["options"] = {
          "hidden": false
      };
    break;
    //---- BOOLEAN ------------
    case "boolean":
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["format"] = "checkbox";
      pSchema["default"] = pJSON;
      pSchema["description"] = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema["options"] = {
          "hidden": false
      };
    break;
    default:
      //pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["title"] = getTitle4EditorPath(pEditorPath,vType,vTitle);
      pSchema["default"] = null;
      pSchema["description"] = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema["options"] = {
          "hidden": false
      };
    };

    console.log("SchemaGen - Path: '"+pPath+"' Type='"+vType+"' Title='"+pSchema["title"]+"'");
};

function convertObject2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath) {
  // the array of all required keys in the hash/object
  pSchema["defaultProperties"] = [];
  // properties contains one schema for every key
  pSchema["properties"] = {};
  var order_index = 10;
  var order_increment = 10;
  for (var key in pJSON) {
    if (pJSON.hasOwnProperty(key)) {
      // set the key as required property in object/hash
      pSchema["defaultProperties"].push(key);
      // create the hash for all properties
      pSchema["properties"][key] = {};
      // now call convertJSON2Schema() on sub-structure of JSON
      convertJSON2Schema(pJSON[key],pPath+"/properties/"+key,pSchema["properties"][key],pTypeTree[key],pEditorPath+"."+key);
      pSchema["properties"][key]["propertyOrder"] = order_index;
      order_index += order_increment;
    };
  };
};

function convertArray2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pItemTitle) {
  var vItemTitle = pItemTitle || "Record";
  var vID = "";
  pSchema["items"] = {};
  pSchema["items"]["headerTemplate"] = vItemTitle+" {{i1}}";
  var vItems = [];
  var vDefaults = [];
  for (var i = 0; i < pJSON.length; i++) {
    // vSubTypeTree contains the TypeTree for the JSON sub structure of pJSON[i]
    // vHash4ID contains the schema for the JSON sub structure of pJSON[i]
    var vHash4ID = {};
    convertJSON2Schema(pJSON[i],pPath+"/items",vHash4ID,pTypeTree[i],pEditorPath+".*");
    // check if previous elements of array are deep equal
    var vDeepEqual = false;
    console.log("Compare JSON1:\n"+JSON.stringify(pTypeTree[i],null,4));
    /* Deep Equal Check
    for (var k = 0; k < i; k++) {
        console.log("Compare JSON2["+k+"]:\n"+JSON.stringify(pTypeTree[k],null,4));
        if(_.isEqual(pTypeTree[k], pTypeTree[i])){
          vDeepEqual = true;
        };
    };
    // if subTypeTree of vHash4ID is not deep equal to previous array elements
    // push the new schema for the element and store the SubTypeTree
    */
    if (vDeepEqual == false) {
        vItems.push(vHash4ID);
    };
  };
  // if more than one vItems are present in array, use "oneOf" for schema.
  if (vItems.length > 1) {
    for (var i = 0; i < vItems.length; i++) {
      vItems[i]["id"] = pPath+"/oneof"+i;
      vItems[i]["title"] = "oneof "+i+" "+pPath;
    };
    pSchema["items"]["oneOf"] = vItems;
  } else {
    pSchema["items"] = vItems[0];
  };
};


function determineFormat4String(pString) {
  var vColorRegEx = new RegExp("^#[0-9a-fA-F]{6}$");
  var vGeolocRegEx = new RegExp("^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$");
  if (vColorRegEx.test(pString) == true) {
    return "color"
  } else if (pString.indexOf("\n") >= 0) {
    return "textarea"
  } else {
    return "text"
  }
}
