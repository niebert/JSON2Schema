/* ---------------------------------------
 Exported Module Variable: LoadFile4DOM
 Package:  loadfile4dom
 Version:  1.2.2  Date: 2019/07/29 15:52:21
 Homepage: https://gitlab.com/niehausbert/loadfile4dom#readme
 Author:   Engelbert Niehaus
 License:  MIT
 Date:     2019/07/29 15:52:21
 Require Module with:
    const LoadFile4DOM = require('loadfile4dom');
 JSHint: installation with 'npm install jshint -g'
 ------------------------------------------ */

/*jshint  laxcomma: true, asi: true, maxerr: 150 */
/*global alert, confirm, console, prompt */
// #################################################################
// # Javascript Class: LoadFile4DOM()
// #   Class Filename: loadfile4dom.js
// #
//# Author of Class:      Bert Niehaus
//# email:                niebert GitHub
//# Created:              2018/12/12 14:49:10
//# Modified              2018/12/30 9:54:14
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript ClassEditorUML
//#     https://niebert.github.io/ClassEditorUML
//#################################################################

//---------------------------------------------------------------------
//---- USED CLASSES: ----
// Used classes in parameters of methods, return values of methods and attributes

// NodeJS: Require additional Modules

//---------------------------------------------------------------------
// Configuration Code:
// the configuration code will be used to create some constants
//---------------------------------------------------------------------
//---Constructor of Class LoadFile4DOM()
// Call the constructor for creating an instance of class LoadFile4DOM
// by the following command in HTML-file that imports this class
// var vLoadFile4DOM = new LoadFile4DOM();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of LoadFile4DOM in the code for methods, use
// the attribute name with a leading "this." in the definition of method of LoadFile4DOM, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'LoadFile4DOM'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'LoadFile4DOM' will be set by
// use the method's name and extend it with 'LoadFile4DOM'.
//    LoadFile4DOM.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------



function LoadFile4DOM () {
    //---------------------------------------------------------------------
    //---Attributes of Class "LoadFile4DOM()"
    //---------------------------------------------------------------------

    // ------------------------------------------
    // public: aDoc   Class:
    // This attribute stores a reference to the document object of the browser. Reference provided with the init-method
    this.aDoc = null;   // Class:
    // ------------------------------------------
    // public: aOptions   Class:
    // This hash stores the options of the init method - e.g. "id4loadfile" as DIV container for the input elements in the DOM that holds all created file loaders i.e. holding the input-file-tags for load a JSON file
    this.aOptions = null;   // Class:
    // ------------------------------------------
    // public: aFileLoader   Class:
    // This attribute stores the number of file loaders created with instance
    this.aFileLoader = {};   // Class:
    // ------------------------------------------
    // public: aLoadFileHolder   Class:
    // This attribute stores the reference to the DIV node of the file holder node in the DOM that is created by this.create_holder()
    this.aLoadFileHolder = {
      "id": "holder4loadfile",
      "dom": null,
      "var4dom": "undef_call_var",
      "debug": false
    };   // Class:
    // ------------------------------------------
    // public: defaults_options   Class:
    // the attribute stores the default options for LoadFile4DOM
    //
    this.defaults_options = {
      "id": "loadfile_holder_div",
      "dom": null,
      "base64": false,
      "width4thumb": 150,
      "debug": false
    };   // Class:
    // ------------------------------------------
    // public: type2accept   Class:
    // the attribute maps the type of the loaded file
    // to the accepted MIME types of files of
    // the loaded files
    this.type2accept = {
          "all": "*",
          "audio": "audio/*",
          "data": "*",
          "image": "image/*",
          "image_thumb": "image/*",
          "json": "application/json",
          "text": "*",
          "video": "video/*",
          "jszip": "application/zip",
          "zip": "application/zip"
        };   // Class:
    // ------------------------------------------
    // public: type2accept   Class:
    // the attribute maps the type of the loaded file
    // to the return types of loaded file
    // - "file" means just the file
    // - "filehash" means return a hash
    //   - "name" with filename,
    //   - "file" data of the file and
    //   - "mime_type" the MIME-type of the file
    this.type2returntype = {
          "all": "filehash",
          "audio": "filehash",
          "data": "filehash",
          "image": "dom",
          "image_thumb": "dom",
          "json": "file",
          "text": "file",
          "video": "filehash",
          "jszip": "filehash",
          "zip": "filehash"
        };   // Class:
        // ------------------------------------------
    // public: defaults_loader   Class:
    // the attribute stores the default loader tags if not options are provided
    this.defaults_loader = {
      "filetype": "text",
      "id": "loader123456789",
      "name": "defaultloader",
      "value": "Dialog Loader Button",
      "accept": "text/*",
      "onchange": "console.log('open dialog click on 'defaultloader')",
      "multiple": true
    };   // Class:
    // ------------------------------------------
    // public: aLoaderCount   Class:
    // the attribute stores the number of created loaders to create unique loader IDs in the DOM together with the method getTimeStamp()
    this.aLoaderCount = 0;   // Class:
    //---------------------------------------------------------------------
    //---Methods of Class "LoadFile4DOM()"
    //---------------------------------------------------------------------

    // #################################################################
    // # public Method: init()  Class: LoadFile4DOM
    // # Parameter:
    // #    pDoc:
    // #      the parameter contains a reference to the document object of the browser
    // #    pOptions:
    // #      the parameter stores options
    // # Comment:
    // #    the method performs the initialization of the instance of LoadFile4DOM. pOptions contains the ID for the LoadFile4DOM holder, it is in general a DIV element with the HTML-input-tags for uploading a files.
    // #
    // #################################################################

    // #################################################################
    // # public Method: getTimeStamp()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method returns a time string
    // #
    // #################################################################

    // #################################################################
    // # public Method: create_input_tags()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method injects the input-files tags for the loaders in the DOM
    // #    the method is called by LoadFile4DOM.create() with body-onload attribute.
    // #
    // #################################################################

    // #################################################################
    // # public Method: create()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method creates a DOM node for the file in the `window.document`
    // #    of the browser and  adds an object in `this.aFileLoader` the each constructed file loader with the appropriate ID.
    // #
    // #################################################################

    // #################################################################
    // # public Method: get_holder()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method returns the LoadFile4DOM holder as DOM node.
    // #    The id of the LoadFile4DOM holder is stored in this.aOptions.id4loadfile.
    // #    The holder is an existing DIV node in the DOM (Document Object Model) or it will be created by the create_holder
    // #
    // #################################################################

    // #################################################################
    // # public Method: create_load_dialog()  Class: LoadFile4DOM
    // # Parameter:
    // #    pOptions:
    // #      the parameter provides options to the loader,
    // #      that define e.g. which file type (MIME) should be loaded
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: create_holder()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method creates a hidden holder DIV element
    // #    for the input-tags of the load file instance.
    // #    The loader ID of the DIV element is stored in this.aOptions.id4loadfile
    // #
    // #################################################################

    // #################################################################
    // # public Method: open_dialog()  Class: LoadFile4DOM
    // # Parameter:
    // #    pID:
    // #      the parameter provides the ID of the FileLoader
    // #       input tag in the DOM
    // # Comment:
    // #    the method opens the corresponding load dialog with
    // #    the appropriate filter of allowed file extensions e.g. "txt"
    // #    or the allowed MIME types for the loader e.g. images or audio files
    // #
    // #################################################################

    // #################################################################
    // # public Method: set_defaults()  Class: LoadFile4DOM
    // # Parameter:
    // #    options:
    // #      the parameter provides the options that should be defined
    // #     defaults:
    // #      the parameter provides the default values for undefined
    // #      attributes for settings
    // # Comment:
    // #    the method defines the options defined by the parameter "options"
    // #    and assigns missing attributes with default values.
    // #
    // #################################################################

    // #################################################################
    // # public Method: get_loader_options()  Class: LoadFile4DOM
    // # Parameter:
    // #    pID:
    // #      the parameter provides name for DOM input-file  for the loader
    // #    pFileType:
    // #      the parameter provides the type of loader e.g. text, image, file2image, audio, video, zip
    // #    pOptions:
    // #      the parameter provides additional options e.g. style options with width and height for an image
    // # Comment:
    // #    the method returns a hash for loader e.g. the command
    // #    var loader4txt = lf4d.get_loader_options("mytxtfile","text",loader_opts);
    // #    creates the following hash:
    // #        loader4txt={
    // #           "type": "text",
    // #            "id": "mytxtfile1t1545978644012",
    // #            "name": "mytxtfile",
    // #            "value": "Dialog mytxtfile",
    // #            "accept": "text/*",
    // #            "base64": false,
    // #            "onload": "var4dom0t1545978644011.open_dialog('mytxtfile')",
    // #            "multiple": false
    // #        }
    // #    In loadfile4dom.js the call of create_load_dialog(loader_option) creates the loader.
    // #
    // #
    // #################################################################

    // #################################################################
    // # public Method: get_input_attributes()  Class: LoadFile4DOM
    // # Parameter:
    // #    pID:
    // #      the parameter provides ...
    // #    pFileType:
    // #      the parameter provides type of loader e.g. `text`, `image`, `zip`, ...
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: error_file_type()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_text()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_json()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_image()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
      // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_image_thumb()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_data()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
    // # Comment:
    // #    the method handles the file
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_audio()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
      // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_video()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // #    pFileReader:
    // #      the parameter provides the FileReader instance
    // #    pFileToLoad:
    // #      the parameter provides the loaded File
      // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_file_type()  Class: LoadFile4DOM
    // # Parameter:
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
        // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_single_file()  Class: LoadFile4DOM
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_multiple_files()  Class: LoadFile4DOM
    // #    pLoader:
    // #      the parameter provides access to loader in the  DOM
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: handle_file()  Class: LoadFile4DOM
    // # Parameter:
    // #    pID:
    // #      the parameter provides ...
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: log()  Class: LoadFile4DOM
    // # Parameter:
    // #    pMessage:
    // #      the parameter provides ...
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

    // #################################################################
    // # public Method: set_onload()  Class: LoadFile4DOM
    // # Parameter:
    // #
    // # Comment:
    // #    the method performs ...
    // #
    // #################################################################

};
//---------------------------------------------------------------------
//---END Constructor for Call  "new LoadFile4DOM()"
//---------------------------------------------------------------------

//#################################################################
//# public Method: init()  Class: LoadFile4DOM
//# Parameter:
//#    pDoc:
//#      the parameter contains a reference to the document object of the browser
//#    pOptions:
//#      the parameter stores options
//# Comment:
//#    the method performs the initialization of the instance of LoadFile4DOM. pOptions contains the ID for the LoadFile4DOM holder, it is in general a DIV element with the HTML-input-tags for uploading a files.
//#
//#################################################################

LoadFile4DOM.prototype.init = function (pDoc,pOptions) {
  // ----Debugging------------------------------------------
  //  console.log("loadfile4dom.js - Call: init(pDoc,pOptions)");
  //  alert("loadfile4dom.js - Call: init(pDoc,pOptions)");
  // ----Create Object/Instance of LoadFile4DOM and call init()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.init(pDoc,pOptions);
  // -------------------------------------------------------
  console.log("CALL: init() with options="+JSON.stringify(pOptions,null,4));
  var vOptions = pOptions || {};
  //  save the reference "document" object
  this.aDoc = pDoc;
  //  store options provided as parameter in the init-method
  /*
  this.defaults = {
    "id4loadfile": "loadfile_div",
    "dom": null,
    "var4dom": "loadfile_div"+this.getTimeStamp()
  };
  */
  // console.log("vOptions="+JSON.stringify(vOptions,null,4));
  // set default options and store options as attribute
  this.aOptions = this.set_defaults(vOptions,this.defaults_options);
  console.log("this.aOptions="+JSON.stringify(this.aOptions,null,4));
  // Create var4dom that is unique in DOM for calling the instance
  var var4dom = "var4dom" + this.getTimeStamp();
  this.aLoadFileHolder.var4dom = var4dom;
  this.aDoc[var4dom] = this;

};
// ---- Method: init() Class: LoadFile4DOM ------

//#################################################################
//# public Method: getTimeStamp()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.getTimeStamp = function () {
  // ----Debugging------------------------------------------
  //  console.log("loadfile4dom.js - Call: getTimeStamp()");
  //  alert("loadfile4dom.js - Call: getTimeStamp()");
  // ----Create Object/Instance of LoadFile4DOM and call getTimeStamp()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.getTimeStamp();
  // -------------------------------------------------------
  //  create a time stamp with a number
  var now = new Date();
  var timestamp = this.aLoaderCount + 't' + now.getTime();
  this.aLoaderCount++;
  //  return the integer as time in milli seconds since January 1st, 1970 0:00am
  return timestamp;

};
// ---- Method: getTimeStamp() Class: LoadFile4DOM ------

//#################################################################
//# public Method: create_input_tags()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method injects the input-files tags for the loaders in the DOM - the method is called by LoadFile4DOM.create() with body-onload attribute.
//#
//#################################################################

LoadFile4DOM.prototype.create_input_tags = function () {
  // ----Debugging------------------------------------------
  // console.log("loadfile4dom.js - Call: create()");
  //  alert("loadfile4dom.js - Call: create()");
  // ----Create Object/Instance of LoadFile4DOM and call create()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.create(pLoaderID);
  // -------------------------------------------------------
  //  create a hidden DOM node and append the DOM node to this.aLoadFileHolder
  var fl = this.aFileLoader;
  var vLoadFileHolder = this.get_holder();
  for (var loadid in fl) {
    console.log("CALL: create_input_tags('"+ loadid +"')");
    if (fl.hasOwnProperty(loadid)) {
      console.log("CALL: create_input_tags('"+ loadid +"') exists");
      // append the created "input" tag to the holder
      if (vLoadFileHolder) {
          if (fl[loadid].dom) {
            console.log("CALL: create_input_tags('" + loadid + "') for DOM node for input-file tag with ID ['" + fl[loadid].id + "'] appended to DOM!");
            vLoadFileHolder.appendChild(fl[loadid].dom);
          } else {
            console.error("ERROR: DOM node for input-file tag with ID ['" + fl[loadid].id + "'] was not created with !");
          }
      } else {
        console.log("LoadFile4DOM.create_input_tags():  LoadFile4DOM holder does not exist - no append Loader Dialog ['" + loadid + "'] to holder possible");
      }
    }
  }

};
// ---- Method: create_input_tags() Class: LoadFile4DOM ------

//#################################################################
//# public Method: create()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method creates a DOM node for the file in the `window.document` of the browser and  adds an object in `this.aFileLoader` the each constructed file loader with the appropriate ID.
//#
//#################################################################

LoadFile4DOM.prototype.create = function () {

  // ----Debugging------------------------------------------
  //  console.log("loadfile4dom.js - Call: create()");
  //  alert("loadfile4dom.js - Call: create()");
  // ----Create Object/Instance of LoadFile4DOM and call create()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.create(pLoaderID);
  // -------------------------------------------------------
  //  create a hidden DOM node and append the DOM node to this.aLoadFileHolder
  if (this.aLoadFileHolder) {
    if (this.aLoadFileHolder.dom) {
      console.log("LoadFile4DOM.create()-Call: aLoadFileHolder.dom exists");
    } else {
      console.log("LoadFile4DOM.create()-Call: Create DIV node in DOM! this.aOptions.debug="+this.aOptions.debug);
      this.create_holder();
    }
  } else {
    console.log("CALL: LoadFile4DOM.create(): Create DIV node for LoadFile input-tagss: LoadFile4DOM.create_holder() because aLoadFileHolder is not defined!");
    this.create_holder();
  }
  this.create_input_tags();

};
// ---- Method: create() Class: LoadFile4DOM ------

//#################################################################
//# public Method: get_holder()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method returns the LoadFile4DOM holder as DOM node. The id of the LoadFile4DOM holder is stored in this.aOptions.id4loadfile. The holder is an existing DIV node in the DOM (Document Object Model) or it will be created by the create_holder
//#
//#################################################################

LoadFile4DOM.prototype.get_holder = function () {

  var vHolder = null;
  if (this.aLoadFileHolder.hasOwnProperty("dom")) {
    vHolder = this.aLoadFileHolder.dom;
    if (vHolder) {
      console.log("CALL: get_holder(): aLoadFileHolder.dom exists with ID=["+this.aLoadFileHolder.id+"]");
    } else {var vID = this.aOptions.id4loadfile;
    //  vLoadFileHolder refers to hidden DIV-node that is used for adding the LoadFile instances.
      vHolder = this.aDoc.getElementById(vID);
      if (vHolder) {
        console.log("CALL: get_holder(): DOM node for Holder with aLoadFileHolder.id exists with ID=["+this.aLoadFileHolder.ide+"] ");
      } else {
        console.log("CALL: get_holder(): DOM node for Holder with aLoadFileHolder.id does not exist with ID=["+this.aLoadFileHolder.ide+"] - Holder generation failed by LoadFile4DOM.create_holder()");
        vHolder = null;
      }
    }
  }
  return vHolder;

};
// ---- Method: get_holder() Class: LoadFile4DOM ------

//#################################################################
//# public Method: create_load_dialog()  Class: LoadFile4DOM
//# Parameter:
//#    pOptions:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.create_load_dialog = function (pOptions) {
  // ----Debugging------------------------------------------
  //  alert("loadfile4dom.js - Call: create_load_dialog(pID)");
  // ----Create Object/Instance of LoadFile4DOM and call create_load_dialog()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.create_load_dialog(pID);
  // -------------------------------------------------------
  //  create a node <input type="file" id="myloaderid" name="myloader" value="Dialog myloaderid" onchange="vJSONEditor.loadJSON(this.id)"/>
  var vID = pOptions.name; // use pOptions.name as ID because it has no time stamp at the end.
  console.log("loadfile4dom.js - Call: create_load_dialog('"+vID+"')"+"\nOptions="+JSON.stringify(pOptions,null,4));
  var doc = this.aDoc;
  // create the file-input element
  var vInput = doc.createElement("input");
  //
  var vAttDef = (pOptions || this.get_input_attributes(vID));
  // if multiple files can be loaded then the "name" attribute needs array brackets for multiple files
  if (vAttDef.multiple === true) {
    vAttDef.name += "[]";
  }
  // now add all attributes to the created "input" tag.
  var a = null;
  for (var key in vAttDef) {
    if ((key != "multiple") && (key != "onload")) {
      if (vAttDef.hasOwnProperty(key)) {
            console.log("create_load_dialog() ['"+vID+"']." + key +  "="+vAttDef[key]);
            a = doc.createAttribute(key);
            a.nodeValue = vAttDef[key];
            vInput.setAttributeNode(a);
      }
    }
  }
  // if we allow multiple file select, add the attribute "multiple" to the input tag
  if (vAttDef.multiple === true) {
    a = doc.createAttribute('multiple');
    a.nodeValue = "multiple";
    vInput.setAttributeNode(a);
  }
  var vNewLoader = {
    "dom": vInput, //  the element of the <input ...> tag in DOM (Document Object Model)
    "onload": pOptions.onload
  };
  vNewLoader = this.set_defaults(vNewLoader,vAttDef);
  console.log('vNewLoader=' + JSON.stringify(vNewLoader,null,4));

  this.aFileLoader[vID] = vNewLoader;
  //console.log('DOM vAttDef:\n' + JSON.stringify(vAttDef,null,4));
  //console.log('DOM vInput:\n' + vInput.outerHTML);


};
// ---- Method: create_load_dialog() Class: LoadFile4DOM ------

//#################################################################
//# public Method: create_holder()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method creates a hidden holder DIV element for the input-tags of the load file instance. The loader ID of the DIV element is stored in this.aOptions.id4loadfile
//#
//#################################################################

LoadFile4DOM.prototype.create_holder = function () {
  // ----Debugging------------------------------------------
  //  console.log("loadfile4dom.js - Call: create_holder()");
  //  alert("loadfile4dom.js - Call: create_holder()");
  // ----Create Object/Instance of LoadFile4DOM and call create_holder()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.create_holder();
  // -------------------------------------------------------
  //  this.aOptions.id4loadfile contains the ID of the DIV tag of the LoadFile holder.
  //  get the LoadFile holder ID from Options that was defined in the init()-method
  var vHolderID = this.aLoadFileHolder.id || "holder4loadfile";
  this.aLoadFileHolder.dom =  null;
  //this.aLoadFileHolder.var4dom = "onload4inputfile" + this.getTimeStamp();
  var doc = this.aDoc;
  var vBody = doc.getElementsByTagName("body")[0];
  if (vBody) {
    console.log("CALL: create_holder() document.body exists!");
  } else {
    console.log("WARNING: create_holder() document.body does not exist!");
  }
  if (this.aOptions.hasOwnProperty("id4loadfile")) {
      console.log("Options contain a holder ID ["+this.aOptions.id4loadfile+"]");
      vHolderID = this.aOptions.id4loadfile;
  } else {
    // appending a time stamp make the id unique, e.g. 'holder4loadfile'
    // so that it is not in conflict with existing ids in the HTML DOM tree
    vHolderID += this.getTimeStamp();
    console.log("Use default holder name of DIV tag ["+vHolderID+"]");
  }
  // check if DIV element for holder exists
  this.aLoadFileHolder.id = vHolderID;
  this.aLoadFileHolder.dom = doc.getElementById(vHolderID);
  if (this.aLoadFileHolder.dom) {
    console.log("Load Dialog holder DIV tag with ID=["+vHolderID+"] exists");
  } else {
    var lf_holder = doc.createElement('div');
    //  create the "id" attribute
    var att = doc.createAttribute("id");
    //  create a unique ID for the DIV element
    att.nodeValue = vHolderID;
    //  append the DIV holder with the id id4loadfile
    lf_holder.setAttributeNode(att);
    // add "var4dom" variable to DIV tag
    var attvar4dom = doc.createAttribute("var4dom");
    attvar4dom.nodeValue = this.aLoadFileHolder.var4dom;
    lf_holder.setAttributeNode(attvar4dom);
    //--- Hide Holder ---
    if (this.aOptions.debug === false) {
      // Hide Holder "style="display:none" if aOptions.debug=false
      var atthide = doc.createAttribute("style");
      atthide.nodeValue = "display:none";
      lf_holder.setAttributeNode(atthide);
    } else {
      console.log("CALL create_holder(): Holder and input-file tags are visible browser");
    }
    // --- Append Holder to body in DOM ---
    // DOM Node create: <div id="id4loadfile872934878924"></div>
    //  append the LoadFileHolder at the document.body
    vBody.appendChild(lf_holder);
    // store reference to holder node
    this.aLoadFileHolder.dom = lf_holder;
    console.log("CALL create_holder(): LoadFile holder created as DIV element with ID=["+vHolderID+"]");
    //setTimeout(this)
  };
  return this.aLoadFileHolder.dom;

};
// ---- Method: create_holder() Class: LoadFile4DOM ------

//#################################################################
//# public Method: open_dialog()  Class: LoadFile4DOM
//# Parameter:
//#    pID:
//#      the parameter provides the ID of the FileLoader input tag in the DOM
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.open_dialog = function (pID) {
  // ----Debugging------------------------------------------
  //  console.log("loadfile4dom.js - Call: open_dialog(pID)");
  //  alert("loadfile4dom.js - Call: open_dialog(pID)");
  // ----Create Object/Instance of LoadFile4DOM and call open_dialog()----
  //     var vLoadFile4DOM = new LoadFile4DOM();
  //     vLoadFile4DOM.open_dialog(pID);
  // -------------------------------------------------------
  //  get DOM id of the upload <input ...> tag with pID in this.aFileHolder
  var fl = this.aFileLoader;
  if (fl.hasOwnProperty(pID)) {
      console.log("CLICK: File Loader with ID=["+pID+"] will open the file dialog of browser");
      var vLoaderDOM = fl[pID].dom;
      //  trigger a onclick event in the hidden Upload Button of the browser to open Load Dialog
      vLoaderDOM.click();
  } else {
      console.error("ERROR: File Loader with ID=["+pID+"] is not defined");
  }
};
// ---- Method: open_dialog() Class: LoadFile4DOM ------

//#################################################################
//# public Method: set_defaults()  Class: LoadFile4DOM
//# Parameter:
//#    options:
//#      the parameter provides ...
//#     defaults:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.set_defaults = function (options, defaults) {

  var obj = {};
  defaults = defaults || {};
  for (var d in defaults) {
    if (defaults.hasOwnProperty(d)) {
      obj[d] = defaults[d];
    }
  }
  for (var k in options) {
    if (options.hasOwnProperty(k)) {
      obj[k] = options[k];
    }
  }
  return obj;

};
// ---- Method: set_defaults() Class: LoadFile4DOM ------

//#################################################################
//# public Method: overwrite_options()  Class: LoadFile4DOM
//# Parameter:
//#    options:
//#      the parameter provides ...
//#     overwrite_opts:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.overwrite_options = function (options, overwrite_opts) {

  var obj = {};
  for (var k in options) {
    if (options.hasOwnProperty(k)) {
      obj[k] = options[k];
    }
  }
  for (var d in overwrite_opts) {
    if (overwrite_opts.hasOwnProperty(d)) {
      obj[d] = overwrite_opts[d];
    }
  }
  return obj;

};
// ---- Method: overwrite_options() Class: LoadFile4DOM ------

//#################################################################
//# public Method: get_loader_options()  Class: LoadFile4DOM
//# Parameter:
//#    pID:
//#      the parameter provides name for DOM input-file  for the loader
//#    pFileType:
//#      the parameter provides the type of loader e.g. text, image, image_thumb, audio, video, zip
//#    pOptions:
//#      the parameter provides additional options e.g. style options with width and height for an image
//# Comment:
//#    the method returns a hash for loader e.g. the command
//#    var loader4txt = lf4d.get_loader_options("mytxtfile","text",loader_opts);
//#    creates the following hash:
//#        loader4txt={
//#           "type": "text",
//#            "id": "mytxtfile1t1545978644012",
//#            "name": "mytxtfile",
//#            "value": "Dialog mytxtfile",
//#            "accept": "text/*",
//#            "onload": "var4dom0t1545978644011.open_dialog('mytxtfile')",
//#            "multiple": false
//#        }
//#    In loadfile4dom.js the call of create_load_dialog(loader_option) creates the loader.
//#
//#
//#################################################################

LoadFile4DOM.prototype.get_loader_options = function (pID,pFileType,pOptions) {
  var vUniqueID = pID + this.getTimeStamp(); //  has to be uniqued in the DOM
  var vFileType = pFileType || this.defaults_loader.filetype;
  var vOptions = {
    "type": "file",
    "filetype": vFileType,
    "id":vUniqueID,
    "name": pID,
    "value": "Dialog "+pID,
    "accept": this.type2accept[vFileType],
    "returntype": (this.type2returntype[vFileType] || "filehash"),
    //"onload":"console.log('open dialog click '"+pID+"')",
    "onchange": this.aLoadFileHolder.var4dom + ".handle_file('"+pID+"')",
  };
  // set defaults in options if not set by vOptions
  vOptions = this.set_defaults(vOptions,this.defaults_loader);
  vOptions = this.overwrite_options(vOptions,pOptions);
  // return the genrated options
  return vOptions;

};
// ---- Method: get_loader_options() Class: LoadFile4DOM ------



//#################################################################
//# public Method: get_input_attributes()  Class: LoadFile4DOM
//# Parameter:
//#    pID:
//#      the parameter provides ...
//#    pFileType:
//#      the parameter provides type of loader e.g. `text`, `image`, `zip`, ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.get_input_attributes = function (pID,pFileType) {

  console.log("get_input_attributes('"+pID+"')");
  var vUniqueID = pID + this.getTimeStamp(); //  has to be uniqued in the DOM
  var vLoader = null;
  var vFileType = pFileType || "all";
  // the following hash contains all the input attributes
  if (this.aFileLoader.hasOwnProperty(pID)) {
    vLoader = this.aFileLoader[pID];
  } else {
    console.error("CALL: get_input_attributes() - this.aFileLoader['" + pID + "'] does not exist! File handler does not exist");
  }
  var vAtts = {
    "type": "file",
    "filetype": vFileType,
    "id":vUniqueID,
    "name": pID,
    "value": "Dialog "+pID,
    "accept": this.type2accept[vType],
    "returntype": (this.type2returntype[vFileType] || "filehash"),
    "onchange": this.aLoadFileHolder.var4dom + ".handle_file('"+pID+"')",
    "multiple": this.defaults_loader.multiple
  };
  return vAtts;
};
// ---- Method: get_input_attributes() Class: LoadFile4DOM ------

//#################################################################
//# public Method: error_file_type()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.error_file_type = function (pLoader,pFileToLoad) {

  console.log("handle_"+pLoader.filetype+"() LoaderID='"+pLoader.id+"' FileType='"+pLoader.filetype+"' FileName='" + ((pFileToLoad.name) || "?") + "'");
  var mime_type = this.type2accept[pLoader.filetype] || "*";
      var vErrMsg = "";
      var vSep = "";
      //--- Check MIME Type ----------
      if (mime_type === "*") {
        console.log("All MIME-types allowed by loader ['" + pLoader.id + "'] - Filetype='" + pLoader.filetype + "' MIME-Type of File='" + pFileToLoad.type + "'");
      } else {
        //--- Check if MIME Type matches with file type -----
        if (!pFileToLoad.type.match(mime_type)) {
          // early escape function if file type is not an image
          vErrMsg += vSep + "File Type '" + pFileToLoad.type + "' does not match with the mime '" + mime_type + "'";
          vSep = "\n";
        }
      }
      //--- Check if file extension matches with extension of loaded file
      var fn = pFileToLoad.name;
      var ext = "";
      if (pLoader.hasOwnProperty("file_extension")) {
        ext = pLoader.file_extension;
        var found = fn.indexOf(ext);
        // myfile.txt - fn.length=10 - found=6 for file_extension='.txt'
        if ((found > 0) &&  (fn.length - ext.length - 1 >= found)) {
          console.log("Filename '" + fn + "' has extension '" + ext + "'!'");
        } else {
          vErrMsg += vSep + "The filename '" + fn + "' does not have the extension '" + ext + "'";
          vSep = "\n";
        }
      }
      if (vErrMsg === "") {
        vErrMsg = null;
      } else {
        console.error(vErrMsg);
        // ERROR:  send error to onload handler,
        // i.e. call the onload() function with an Error Message
        pLoader.onload(pFileToLoad,vErrMsg);
      }
      return vErrMsg;

};
// ---- Method: error_file_type() Class: LoadFile4DOM ------

LoadFile4DOM.prototype.data_url2base64 = function (uri) {
  console.log("CALL: data_url2base64(uri) uri='" +uri.substr(0,20)+ "...'");
  var idx = uri.indexOf('base64,') + 'base64,'.length; // or = 28 if you're sure about the prefix
  var content = uri.substring(idx);
  // use e.g. for zip file
  // zip.file('a.pdf', content, {base64: true});
  return content;
};

LoadFile4DOM.prototype.handle_return_type = function (pLoader,pFile,pFileToLoad) {
  console.log("handle_return_type('" + pFileToLoad.name + "')");
  if (!pFile) {
    console.error("ERROR: no File provided to handle_return_type(...,pFile,...) in pFile");
  } else {
    // send the file vFile to the defined file handler of the FileLoader
    if (pLoader.hasOwnProperty("returntype"))  {
      console.log("handle_return_type('" + pFileToLoad.name + "') returntype='" + pLoader.returntype + "'");
      switch (pLoader.returntype) {
        case "filehash":
          pLoader.onload({
            "name": pFileToLoad.name,
            "file": pFile,
            "mime_type": pFileToLoad.type
          });
        break;
        case "file":
          pLoader.onload(pFile);
        break;
        default:
          pLoader.onload(pFile);
      }
    } else {
      console.log("handle_return_type('" + pFileToLoad.name + "') undefined returntype - use 'filehash' as return type");
      pLoader.onload({
        "name": pFileToLoad.name,
        "file": pFile,
        "mime_type": pFileToLoad.type
      });
    }
  }
};


//#################################################################
//# public Method: handle_text()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_text = function (pLoader,pFileReader,pFileToLoad) {
  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (!this.error_file_type(pLoader,pFileToLoad)) {
    pFileReader.onload = function(fileLoadedEvent){
      // handle file onload event of the FileReader instance
      var vFile = fileLoadedEvent.target.result;
      // check if the user wants to have just the file
      // or a filehash with more information about the file e.g. mime_type
      vThis.handle_return_type(pLoader,vFile,pFileToLoad);
    };
    var vEncoding = "UTF-8";
    if (pLoader.hasOwnProperty("encoding")) {
      vEncoding = pLoader.encoding;
    }
    pFileReader.readAsText(pFileToLoad, vEncoding);
  }

};
// ---- Method: handle_text() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_json()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_json = function (pLoader,pFileReader,pFileToLoad) {
  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (pLoader) {
      console.log("CALL: handle_json('" + pLoader.id + "','" + pLoader.filetype + "')");
      if (!this.error_file_type(pLoader,pFileToLoad)) {
        pFileReader.onload = function(fileLoadedEvent){
          var vFile = fileLoadedEvent.target.result;
          // send the file vFile to the defined file handler of the FileLoader
          var vJSON = null;
          // Parse JSON and check if syntax is valid.
          // console.log("handle_json() Loaded File:\n"+vFile);
          try {
              vFile = vFile + "";
              vJSON = JSON.parse(vFile);
          } catch (err) {
              vJSON = null; // Init with an empty class
              console.error("ERROR: onload handler with errors - "+err); // error in the above string (in this case, yes)!
              // call onload handler with a ppopulated error err,
              pLoader.onload(vJSON,err);
              return; // early exit function
          }
          // check if the user wants to have just the file
          // or a filehash with more information about the file e.g. mime_type
          vThis.handle_return_type(pLoader,vFile,pFileToLoad);
        };
        var vEncoding = "UTF-8";
        if (pLoader.hasOwnProperty("encoding")) {
          vEncoding = pLoader.encoding;
        }
        pFileReader.readAsText(pFileToLoad, vEncoding);
      }
    } else {
      console.error("CALL: handle_json() pLoader does not exist!");
    }
};
// ---- Method: handle_json() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_image()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_image = function (pLoader,pFileReader,pFileToLoad) {
  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (!this.error_file_type(pLoader,pFileToLoad)) {
    pFileReader.onload = function(event){
      if (pLoader.hasOwnProperty("returntype")) {
        // handle the return types
        switch (pLoader.returntype) {
          case "img":
            var img = new Image();
            img.onload = function(){
              var vWidth = parseInt(img.width);
              var vHeight = parseInt(img.height);
              var vScale = 1.0;
              // proportional scale
              if (pLoader.hasOwnProperty("width")) {
                vWidth = parseInt(pLoader.width);
                vScale = parseInt(pLoader.width)/parseInt(img.width);
                vHeight = parseInt(parseInt(img.height) * vScale);
              }
              if (pLoader.hasOwnProperty("height")) {
                vHeight = parseInt(pLoader.height);
                vScale = parseInt(pLoader.height)/parseInt(img.height);
                vWidth = parseInt(parseInt(img.width) * vScale);
              }
              canvas.width = vWidth;
              canvas.height = vHeight;
              ctx.drawImage(img,0,0);
            };
            img.src = event.target.result;
            // send the image file "img" to the defined file handler of the FileLoader
            var data = {
              "name": pFileToLoad.name,
              "file": vThis.data_url2base64(event.target.result),
              "mime_type": pFileToLoad.type,
              "img": img
            };
            pLoader.onload(data);
          break;
          default:
            // handle other default return types
            var vFile = vThis.data_url2base64(event.target.result);
            vThis.handle_return_type(pLoader,vFile,pFileToLoad);
        }
      } else {
        // without "returntype" return the file
        pLoader.onload(event.target.result);
      }
    };
    pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_image() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_image_thumb()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_image_thumb = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (!this.error_file_type(pLoader,pFileToLoad)) {
    pFileReader.onload = function(event){
      if (pLoader.hasOwnProperty("returntype")) {
        // handle the return types
        var width_missing = false;
        var height_missing = false;
        switch (pLoader.returntype) {
          case "tag":
            var html = '<img class="thumb" ';
            if (pLoader.hasOwnProperty("width")) {
                html += 'width="' + pLoader.width +'" ';
            } else {
              width_missing = true;
            }
            if (pLoader.hasOwnProperty("height")) {
                html += 'height="' + pLoader.height +'" ';
            } else {
              height_missing = true;
            }
            if (width_missing && height_missing) {
              html += 'width="' + vThis.aOptions.width4thumb +'" ';
            }
            var vFilename = pFileToLoad.name;
            vFilename = vFilename.replace(/[^A-Za-z0-9 _\-\.]/g,"_");
            html += 'src="' + event.target.result +'" ';
            html += 'title="' + vFilename + '"/>';
            // send the image file "img" to the defined file handler of the FileLoader
            var data = {
              "name": pFileToLoad.name,
              "file": vThis.data_url2base64(event.target.result),
              "mime_type": pFileToLoad.type,
              "tag": html
            };
            pLoader.onload(data);
          break;
          default:
            // handle other default return types
            var vFile = vThis.data_url2base64(event.target.result);
            vThis.handle_return_type(pLoader,vFile,pFileToLoad);
        }
      } else {
        // without "returntype" return just the file
        pLoader.onload(event.target.result);
      }
    };
    pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_image_thumb() Class: LoadFile4DOM ------


//#################################################################
//# public Method: handle_audio()  Class: LoadFile4DOM
//# Parameter:
//#    pFileToLoad:
//#      the parameter provides access to the loaded file
//# Comment:
//#    the method performs ...
//#
//#################################################################
LoadFile4DOM.prototype.is_textfile = function (pFileToLoad) {
  var vMSG = "CALL: LoadFile4DOM.is_textfile() - File '" + pFileToLoad.name + "' is a text file with MIME-type '" + pFileToLoad.type + "'. ";
  var vBoolean = false;
  if (pFileToLoad.type.match("text/*")) {
    // pFileToLoad is a textfile with the MIME type starting with "text/"
    console.log(vMSG);
    vBoolean = true;
  }
  if (pFileToLoad.type.match("application/json")) {
    // JSON file is also a text file but MIME type does not start with text
    console.log(vMSG + "JSON file was not parsed with JSON.parse() - so the string could contain syntax errors!");
    vBoolean = true;
  }
  return vBoolean;
};
// ---- Method: is_textfile() Class: LoadFile4DOM ------


//#################################################################
//# public Method: handle_data()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      contains the LoadFile4DOM loader with all parameters
//#    pFileReader:
//#      the parameter contains the FileReader
//#    pFileToLoad:
//#      the parameter provides access to the loaded file
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_data = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  // check if file type has no error according to MIME type and extension
  if (!this.error_file_type(pLoader,pFileToLoad)) {
          pFileReader.onload = function(fileLoadedEvent){
            // handle file onload event of the FileReader instance
            var vFile = fileLoadedEvent.target.result;
            // check if the user wants to have just the file
            // or a filehash with more information about the file e.g. mime_type
            // remove mime type from data URL e.g. "data:application/pdf;base64, ..."
            vFile = vThis.data_url2base64(vFile);
            vThis.handle_return_type(pLoader,vFile,pFileToLoad);
          };
          pFileReader.readAsDataURL(pFileToLoad);
          //pFileReader.readAsBinaryString(pFileToLoad);
  }

};
// ---- Method: handle_data() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_audio()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides access to the loaded file
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_audio = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (!this.error_file_type(pLoader,pFileToLoad)) {
          pFileReader.onload = function(fileLoadedEvent){
            // handle file onload event of the FileReader instance
            var vFile = fileLoadedEvent.target.result;
            // check if the user wants to have just the file
            // or a filehash with more information about the file e.g. mime_type
            vFile = vThis.data_url2base64(vFile);
            // removed mime type from data URL e.g. "data:application/pdf;base64, ..."
            vThis.handle_return_type(pLoader,vFile,pFileToLoad);
          };
          pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_audio() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_video()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_video = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  if (!this.error_file_type(pLoader,pFileToLoad)) {
          pFileReader.onload = function(fileLoadedEvent){
            // handle file onload event of the FileReader instance
            var vFile = fileLoadedEvent.target.result;
            // check if the user wants to have just the file
            // or a filehash with more information about the file e.g. MIME type
            vFile = vThis.data_url2base64(vFile);
            // removed mime type from data URL e.g. "data:application/pdf;base64, ..."
            vThis.handle_return_type(pLoader,vFile,pFileToLoad);
          };
          pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_video() Class: LoadFile4DOM ------


//#################################################################
//# public Method: handle_zip()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides access to the loaded file
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_zip = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  var vZIP = null;
  if (!this.error_file_type(pLoader,pFileToLoad)) {
          pFileReader.onload = function(fileLoadedEvent){
            // handle file onload event of the FileReader instance
            var vFile = fileLoadedEvent.target.result;
            // check if the user wants to have just the file
            // or a filehash with more information about the file e.g. mime_type
            /*
            if (JSZip) {
              console.log("JSZip exists return a JSZip instance");
              vZIP = new JSZip();
              vZIP.loadAsync(vFile,{"base64":false}).then(function (zip) {
                zip.forEach(function (relativePath, file){
                    console.log("File in ZIP: ", relativePath);
                    vNode.innerHTML = vNode.innerHTML + "<li>" + relativePath + "</li>";
                });
              });

            } else {
              console.log("JSZip does not exist, return a base64 string");
              vZIP = vThis.data_url2base64(vFile);
              vThis.handle_return_type(pLoader,vZIP,pFileToLoad);
            }
            */
            vZIP = vThis.data_url2base64(vFile);
            vThis.handle_return_type(pLoader,vZIP,pFileToLoad);
            // removed mime type from data URL e.g. "data:application/pdf;base64, ..."
          };
          pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_audio() Class: LoadFile4DOM ------


//#################################################################
//# public Method: handle_zip()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides access to the loaded file
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_jszip = function (pLoader,pFileReader,pFileToLoad) {

  var vThis = this; // map "this" to "vThis" for callback inside pFileReader
  var vZIP = null;
  if (!this.error_file_type(pLoader,pFileToLoad)) {
          pFileReader.onload = function(fileLoadedEvent){
            // handle file onload event of the FileReader instance
            var vFile = fileLoadedEvent.target.result;
            // check if the user wants to have just the file
            // or a filehash with more information about the file e.g. mime_type
            /*
            if (JSZip) {
              console.log("JSZip exists return a JSZip instance");
              vZIP = new JSZip();
              vZIP.loadAsync(vFile,{"base64":false}).then(function (zip) {
                zip.forEach(function (relativePath, file){
                    console.log("File in ZIP: ", relativePath);
                    vNode.innerHTML = vNode.innerHTML + "<li>" + relativePath + "</li>";
                });
              });

            } else {
              console.log("JSZip does not exist, return a base64 string");
              vZIP = vThis.data_url2base64(vFile);
              vThis.handle_return_type(pLoader,vZIP,pFileToLoad);
            }
            */
            vZIP = vThis.data_url2base64(vFile);
            vThis.handle_return_type(pLoader,vZIP,pFileToLoad);
            // removed mime type from data URL e.g. "data:application/pdf;base64, ..."
          };
          pFileReader.readAsDataURL(pFileToLoad);
  }

};
// ---- Method: handle_jszip() Class: LoadFile4DOM ------


//#################################################################
//# public Method: handle_file_type()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//#    pFileReader:
//#      the parameter provides ...
//#    pFileToLoad:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_file_type = function (pLoader,pFileReader,pFileToLoad) {

  console.log("CALL: handle_file_type('" + pLoader.id + "','" + pLoader.filetype + "')");
  switch (pLoader.filetype) {
    case "all":
      // return binary of arbitray loaded files with returntype="alle"
      this.handle_data(pLoader,pFileReader,pFileToLoad);
    break;
    case "text":
      // return just the string of the text file with returntype="file"
      this.handle_text(pLoader,pFileReader,pFileToLoad);
    break;
    case "json":
      // returns a parsed JSON with returntype="file"
      this.handle_json(pLoader,pFileReader,pFileToLoad);
    break;
    case "image":
      this.handle_image(pLoader,pFileReader,pFileToLoad);
    break;
    case "image_thumb":
      this.handle_image_thumb(pLoader,pFileReader,pFileToLoad);
    break;
    case "audio":
      this.handle_audio(pLoader,pFileReader,pFileToLoad);
    break;
    case "video":
      this.handle_audio(pLoader,pFileReader,pFileToLoad);
    break;
    case "zip":
      // returns a filehash with a base64 encoded string of the loaded zip
      this.handle_zip(pLoader,pFileReader,pFileToLoad);
    break;
    case "jszip":
      // returns a JSZip instance populated with the loaded zip
      this.handle_jszip(pLoader,pFileReader,pFileToLoad);
    break;
    default:
      if (this.hasOwnProperty("handle_"+pLoader.filetype)) {
        this["handle_"+pLoader.filetype](pLoader,pFileReader,pFileToLoad);
      } else {
        this.handle_data(pLoader,pFileReader,pFileToLoad);
      }
  }

};
// ---- Method: handle_file_type() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_single_file()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_single_file = function (pLoader) {

  console.log("CALL: handle_single_file('"+pLoader.id+"')");
  if (pLoader.dom.files) {
    var fileToLoad = pLoader.dom.files[0]; //for input type=file
    console.log("CALL: handle_single_file('"+fileToLoad.name+"') - pLoader.dom.files exist");
    if (fileToLoad) {
      console.log("handle_single_file('"+fileToLoad.name+"') loaded.");
      var fileReader = new FileReader();
      // set the onload handler
      this.handle_file_type(pLoader,fileReader,fileToLoad);
    } else {
      console.error("ERROR: fileToLoad does not exist!");
    }
  } else {
    console.error("ERROR: pLoader.dom.files does not exist!");
  }

};
// ---- Method: handle_single_file() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_multiple_files()  Class: LoadFile4DOM
//# Parameter:
//#    pLoader:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_multiple_files = function (pLoader) {

  console.log("CALL: handle_multiple_files('"+pLoader.id+"')");
  if (pLoader.dom.files) {
    console.log("CALL: handle_multiple_files('"+pLoader.id+"') - pLoader.dom.files exist with "+(pLoader.dom.files.length)+" files!");
    //for (var i = 0, f; f = pLoader.dom.files[i]; i++) {
    for (var i = 0; i < pLoader.dom.files.length; i++) {
      var fileToLoad = pLoader.dom.files[i]; //for input type=file
      if (fileToLoad) {
        console.log("handle_multiple_file('"+fileToLoad.name+"') loaded.");
        var fileReader = new FileReader();
        // set the onload handler
        this.handle_file_type(pLoader,fileReader,fileToLoad);
      } else {
        console.error("ERROR: fileToLoad does not exist!");
      }
    }
  } else {
    console.error("ERROR: pLoader.dom.files does not exist!");
  }

};
// ---- Method: handle_multiple_files() Class: LoadFile4DOM ------

//#################################################################
//# public Method: handle_file()  Class: LoadFile4DOM
//# Parameter:
//#    pID:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.handle_file = function (pID) {

  //console.log(this.aFileHolder.var4dom + ".handle_file('" + pID + "')");
  console.log("handle_file() - FileHandler executed for Loader ['" + pID + "']");
  if (this.aFileLoader.hasOwnProperty(pID)) {
    var vLoader = this.aFileLoader[pID];
    console.log("handle_file() - Loader['" + pID + "'] with options=" + JSON.stringify(vLoader,null,4));

    if (vLoader.dom) {
      console.log("handle_file() - DOM Node with ID='" + pID + "' exists in vLoader.dom");
    } else {
      console.log("handle_file() - get DOM Node for ID='" + pID + "' with document.getElementById('"+pID+"')");
      var vNode = this.aDoc.getElementById(vLoader.id);
      console.log("handle_file() - get DOM Node for Loader '" + pID + "' with document.getElementById('"+vLoader.id+"')");
      if (vNode) {
        console.log("handle_file() - Loader Node with ID='"+vLoader.id+"' exists. Update FileLoader['" + pID + "'].dom with vNode");
        this.aFileLoader[pID].dom = vNode;
      } else {
        //--- ERROR ----
        console.error("DOM node for loader does not exist - load operation cancelled");
        return ; // early exist of handle_file() call.
      }
    }
    if (vLoader.multiple === true) {
      console.log("handle_file() - Loading multiple files is allowed - apply handle_file('" + pID + "') to all files");
      this.handle_multiple_files(vLoader);
    } else {
      console.log("handle_file() - Loading single file and apply handle_file('" + pID + "') to file");
      this.handle_single_file(vLoader);
    }
  } else {
    console.error("ERROR: Loader ['"+pID+"'] does not exist in this.aFileLoader");
  }
};
// ---- Method: handle_file() Class: LoadFile4DOM ------

//#################################################################
//# public Method: log()  Class: LoadFile4DOM
//# Parameter:
//#    pMessage:
//#      the parameter provides ...
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.log = function (pMessage) {



        //console.log("debug="+this.aOptions.debug);
        if (this.aOptions.debug === true) {
          console.log(pMessage);
        }

};
// ---- Method: log() Class: LoadFile4DOM ------

//#################################################################
//# public Method: set_onload()  Class: LoadFile4DOM
//# Parameter:
//#
//# Comment:
//#    the method performs ...
//#
//#################################################################

LoadFile4DOM.prototype.set_onload = function () {
  // Do not use if you import <script src="loadfile4dom.js"> before <body> tag exists in DOM
  var self = this;
  var vBody = document.getElementsByTagName("body")[0];

  vBody.addEventListener("load", self.create(), false);

  console.log("LoadFile4DOM.create() call assigned to onload-handler of body-tag");

};
// ---- Method: set_onload() Class: LoadFile4DOM ------

/* NPM Module Export
   The constructor can be exported with "module.exports = LoadFile4DOM;"
   For SCRIPT-tag import in a HTML file for a WebApp remove module.export command
*/
