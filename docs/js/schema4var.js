
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
