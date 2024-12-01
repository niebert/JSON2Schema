vDataJSON.schema.jsoninput = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "title": "Input JSON for Schema Generation",
    "definitions": {
        "comment": {
            "title": "Comment:",
            "type": "string",
            "format": "textarea",
            "default": ""
        },
        "yesno": {
            "default": "yes",
            "type": "string",
            "enum": [
                "yes",
                "no"
            ]
        }
    },
    "type": "object",
    "id": "https://niebert.github.io/json-editor",
    "options": {
        "disable_collapse": true,
        "disable_edit_json": true,
        "disable_properties": true,
        "collapsed": false,
        "hidden": false
    },
    "defaultProperties": [
        "schematitle",
        "jsoninput"
    ],
    "properties": {
        "schematitle": {
            "type": "string",
            "id": "/properties/schematitle",
            "title": "Title for Schema",
            "default": "",
            "format": "text",
            "description": "Description for 'schematitle' Type: 'string' Path: '/properties/schematitle'",
            "options": {
                "hidden": false
            },
            "propertyOrder": 10
        },
        "jsoninput": {
            "type": "string",
            "id": "/properties/jsoninput",
            "title": "JSON Input",
            "default": "",
            "format": "json",
            "description": "Replace the input above with your JSON input. The JSON input will be used for the generation of the JSON Schema",
            "options": {
                "hidden": false
            },
            "propertyOrder": 20
        }
    }
}
