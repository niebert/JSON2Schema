
/*
 --------------------------------------
    CREATE SCHEMA EDITOR
    used in docs/editor4schema.html
    but not in index.html
 --------------------------------------
*/

// schema for  variable is contained in properties of root object.

function get_schema4var(pvar,ppath,pdefault,poptions) {
  var schema4var = {
              "type": "object",
              "id": ppath + "/properties/" + pvar,
              "title": "Editor Setting for '" + pvar + "'",
              "options": {
                  "disable_collapse": false,
                  "disable_edit_json": false,
                  "disable_properties": false,
                  "collapsed": false,
                  "hidden": false
              },
              "defaultProperties": [
                  "edittype",
                  "varname",
                  "label",
                  "description",
                  "hidden",
                  "collapsed",
                  "disable_collapse",
                  "disable_edit_json",
                  "disable_properties"
              ],
              "properties": {
                  "edittype": {
                      "type": "string",
                      "id": ppath + "/properties/" + pvar + "/properties/edittype",
                      "title": "Edittype",
                      "default": "string",
                      "format": "text",
                      "description": "Description for 'edittype' Type: 'string' Path: '/properties/" + pvar + "/properties/edittype'",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 10
                  },
                  "varname": {
                      "type": "string",
                      "id": ppath + "/properties/" + pvar + "/properties/varname",
                      "title": "Varname",
                      "default": "mykey",
                      "format": "text",
                      "description": "Description for 'varname' Type: 'string' Path: '/properties/" + pvar + "/properties/varname'",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 20
                  },
                  "varid": {
                      "type": "string",
                      "id": ppath + "/properties/" + pvar + "/properties/varid",
                      "title": "Varname",
                      "default": "mykey",
                      "format": "text",
                      "description": "The value of 'varid' is the ID path for a JSON-Editor element.",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 20
                  },
                  "label": {
                      "type": "string",
                      "id": ppath + "/properties/" + pvar + "/properties/label",
                      "title": "Label",
                      "default": "Label for Variable",
                      "format": "text",
                      "description": "Description for 'label' Type: 'string' Path: '/properties/" + pvar + "/properties/label'",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 30
                  },
                  "description": {
                      "type": "string",
                      "id": ppath + "/properties/" + pvar + "/properties/description",
                      "title": "Description",
                      "default": "Description for Variable",
                      "format": "text",
                      "description": "This description for the variable '" + pvar + "' will be visible under the editor element.",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 40
                  },
                  "hidden": {
                      "type": "boolean",
                      "id": ppath + "/properties/" + pvar + "/properties/hidden",
                      "title": "Hidden",
                      "format": "checkbox",
                      "default": false,
                      "description": "if 'hidden' set to false the JSON editor element for'" + pvar + "' will not be visible!",
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 50
                  },
                  "collapsed": {
                      "type": "boolean",
                      "id": ppath + "/properties/" + pvar + "/properties/collapsed",
                      "title": "Collapsed",
                      "format": "checkbox",
                      "default": false,
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 60
                  },
                  "disable_collapse": {
                      "type": "boolean",
                      "id": ppath + "/properties/" + pvar + "/properties/disable_collapse",
                      "title": "Disable Collapse",
                      "format": "checkbox",
                      "default": false,
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 70
                  },
                  "disable_edit_json": {
                      "type": "boolean",
                      "id": ppath + "/properties/" + pvar + "/properties/disable_edit_json",
                      "title": "Disable Edit Json",
                      "format": "checkbox",
                      "default": false,
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 80
                  },
                  "disable_properties": {
                      "type": "boolean",
                      "id": ppath + "/properties/" + pvar + "/properties/disable_properties",
                      "title": "Disable Properties",
                      "format": "checkbox",
                      "default": false,
                      "options": {
                          "hidden": false
                      },
                      "propertyOrder": 90
                  }
              },
              "propertyOrder": 10
          };
  for (var key in poptions) {
    if (poptions.hasOwnProperty(key)) {
      schema4var.options[key] = poptions[key];
    }
  };
  return schema4var;
}




function getTitle4SchemaEditor(pPath,pType,pRootTitle) {
  var vTitle = getID4EditorPath(pPath);
  if (vTitle.length>0) {
    vTitle = var2title(vTitle);
  }
  //e.g. pPath = root.* vTitle = "*"
  if (vTitle == "*") {
    pPath = pPath.substr(0,pPath.lastIndexOf("."));
    vTitle = getTitle4EditorPath(pPath);
  }
  if (vTitle == "Root") {
    if (pRootTitle) {
      vTitle = pRootTitle;
    }
  }
  if (vTitle.replace(/\s/g,"") == "") {
    vTitle = "Title "+pPath;
  }
  vTitle = var2title(vTitle);
  return vTitle;
}


function getStringDefault(pString) {
  var vDefault = "";
  var options = getEnumOptions(pString);
  if (options.length > 0) {
    vDefault = options[0];
  }
  return vDefault;
}

function getEnumOptions(pString) {
  var vPrefix = "___SELECT___";
  var options = [];
  if (pString) {
    if (pString.indexOf(vPrefix) == 0) {
      // it is a selectbox
      var opt_str = pString.substr(vPrefix.length,pString.length-vPrefix.length);
      options = opt_str.split("|");
    }
  }
  return options;
}


function createJSONSchemaEditor(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pTitle) {
  //console.log("convertJSON2Schema('"+pPath+"') pTitle='"+pTitle+"'");
  var vTitle = pTitle || "Default Schema Title";
  // pTypeTree is need for checking deep equal for "oneOf" definition in arrays
  var vType = getType4JSON(pJSON);
  //---set Type and ID---
  pSchema.type = vType;
  // check if root node of JSON
  if (pPath == "") {
    // replace root ID with a link to JSON
    pSchema.id = "https://niebert.github.io/json-editor";
  } else {
    pSchema.id = pPath;
  }
  //--- create schema dependent on typo of JSON node ----
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      console.log("Title for Schema Editor='"+vTitle+"'");
      pSchema.options = {
          "disable_collapse": false,
          "disable_edit_json": false,
          "disable_properties": false,
          "collapsed": false,
          "hidden": false
      };
      createObject4SchemaEditor(pJSON,pPath,pSchema,pTypeTree,pEditorPath);
    break;
    //---- ARRAY -------------
    case "array":
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.format = "tabs";
      pSchema.options = {
          "disable_collapse": false,
          "disable_array_add": false,
          "disable_array_delete": false,
          "disable_array_reorder": false,
          "disable_properties": false,
          "collapsed": false,
          "hidden": false
      };
      createArray4SchemaEditor(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pSchema.title);
    break;
    //---- STRING ------------
    case "string":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.default = getStringDefault(pJSON); //"Default text of "+vType+" variable";
      // check is default value has prefix "___SELECT___"
      var options = getEnumOptions(pJSON);
      if (options.length > 0) {
        pSchema.enum = options;
        //pSchema.enumTitles = options;
      }
      pSchema.format = determineFormat4String(pJSON);
      pSchema.description = getDescription4EditorPath(pPath,vType);
      //"A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema.options = {
          "hidden": false
      };
    break;
    //---- NUMBER ------------
    case "number":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.default = pJSON;
      pSchema.description = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema.options = {
          "hidden": false
      };
    break;
    //---- INTEGER ------------
    case "integer":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.default = pJSON;
      pSchema.description = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema.options = {
          "hidden": false
      };
    break;
    //---- BOOLEAN ------------
    case "boolean":
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.format = "checkbox";
      pSchema.default = pJSON;
      pSchema.description = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema.options = {
          "hidden": false
      };
    break;
    default:
      //pSchema.title = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema.title = getTitle4SchemaEditor(pEditorPath,vType,vTitle);
      pSchema.default = null;
      pSchema.description = "A description for '"+getID4Path(pPath)+"'  Type: '"+vType+"'";
      pSchema.options = {
          "hidden": false
      };
    }

    console.log("SchemaEditor - Path: '"+pPath+"' Type='"+vType+"' Title='"+pSchema.title+"'");
}

function createObject4SchemaEditor(pJSON,pPath,pSchema,pTypeTree,pEditorPath) {
  // the array of all required keys in the hash/object
  pSchema.defaultProperties = [];
  // properties contains one schema for every key
  pSchema.properties = {};
  var order_index = 10;
  var order_increment = 10;
  for (var key in pJSON) {
    if (pJSON.hasOwnProperty(key)) {
      // set the key as required property in object/hash
      pSchema.defaultProperties.push(key);
      // create the hash for all properties
      pSchema.properties[key] = {};
      // now call convertJSON2Schema() on sub-structure of JSON
      createJSONSchemaEditor(pJSON[key],pPath+"/properties/"+key,pSchema.properties[key],pTypeTree[key],pEditorPath+"."+key);
      pSchema.properties[key].propertyOrder = order_index;
      order_index += order_increment;
    }
  }
}

function createArray4SchemaEditor(pJSON,pPath,pSchema,pTypeTree,pEditorPath,pItemTitle) {
  var vItemTitle = pItemTitle || "Record";
  var vID = "";
  pSchema.items = {};
  pSchema.items.headerTemplate = vItemTitle+" {{i1}}";
  var vItems = [];
  var vDefaults = [];
  for (var i = 0; i < pJSON.length; i++) {
    // vSubTypeTree contains the TypeTree for the JSON sub structure of pJSON[i]
    // vHash4ID contains the schema for the JSON sub structure of pJSON[i]
    var vHash4ID = {};
    createJSONSchemaEditor(pJSON[i],pPath+"/items",vHash4ID,pTypeTree[i],pEditorPath+".*");
    // check if previous elements of array are deep equal
    var vDeepEqual = false;
    console.log("Compare JSON1:\n"+JSON.stringify(pTypeTree[i],null,4));
    /* Deep Equal Check
    for (var k = 0; k < i; k++) {
        console.log("Compare JSON2.+k+"]:\n"+JSON.stringify(pTypeTree[k],null,4));
        if(_.isEqual(pTypeTree[k], pTypeTree[i])){
          vDeepEqual = true;
        };
    };
    // if subTypeTree of vHash4ID is not deep equal to previous array elements
    // push the new schema for the element and store the SubTypeTree
    */
    if (vDeepEqual == false) {
        vItems.push(vHash4ID);
    }
  }
  // if more than one vItems are present in array, use "oneOf" for schema.
  if (vItems.length > 1) {
    for (var k = 0; k < vItems.length; k++) {
      vItems[k].id = pPath+"/oneof"+k;
      vItems[k].title = "oneof "+k+" "+pPath;
    }
    pSchema.items.oneOf = vItems;
  } else {
    pSchema.items = vItems[0];
  }
}
