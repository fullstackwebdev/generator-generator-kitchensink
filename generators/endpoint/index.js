var generators = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');
var genUtils = require('../../util.js'); //  a recusrive directory copying function with templating from Fullstack https://github.com/DaftMonk/generator-angular-fullstack/blob/master/util.js

//this._ = _;


module.exports = generators.Base.extend({
  constructor: function() {
    console.log("Constructor called");
    
    generators.Base.apply(this, arguments);
    
    //Makes 'appname' a required argument
    this.argument('appname', {type: String, required:true});
    //this.appname = this._.camelize(this.appname);
    
    
    this.option('someOption', { type : String, required: false}); // some option ... this.someOption; 
    
    
  },
  initializing: function () {
    console.log('Initializing...');
  },
  prompting: function () {
    console.log('Prompting...');
    var done = this.async();
    
    var prompts = [{
      type    : 'input',  // input,confirm,list,rawlist,password
      name    : 'name',   // answers hash
      message : 'Your project name', // Question to print
      default : this.appname, // Default to current folder name
      store   : true // save in .yo-rc.json
    },
    {
      type    : 'list',
      name    : 'nameList',
      message : 'Select from list',
      default : this.appname, // Default to current folder name
      store   : true, // save in .yo-rc.json
      choices : [ 'oneFish', 'twoFish', 'redFish', 'blueFish'],
      // validate : function(val){return true}
      // filter : function(val) {return val}
      // more docs : https://github.com/SBoudrias/Inquirer.js
    },
    {
      type : 'confirm',
      name : 'sure',
      message : 'Are you sure?',
      default : 'N',
      choices : ['N', 'y'],
      store : true,
    }];
    
    this.prompt(prompts,
     function (answers) {
      this.log(answers.name);
      done();
    }.bind(this));
  },
  configuring: {
    start : function () {
      console.log('Configuring...');
    },
    commonVariables: function() {
      this.appName = this.appName || 'foobar';
      this.root = process.cwd();
      this.baseNameRoot = path.basename(process.cwd());
    },
    setupEnv: function() {
      this.copy('common/sourceFile', 'destinationFile');
      this.directory('common/app', '.', true);
      this.template('common/_someTemplateFile', 'someTemplateFile');
      // do stuff like remove cache files
      // or copy files
      
      // from generator ionic
      // Copies the contents of the generator example app
      // directory into your users new application path
      // this.sourceRoot(path.join(__dirname, '../templates/'));
      // this.directory('common/root', '.', true);
      
      
      // from fullstack generator
      // go through entire directory and either copy or template it
      genUtils.processDirectory(this, './common/processDirTest/', '.');
      
    },
    packageFiles: function() {
      this.npmInstall(['lodash'], {'saveDev':true});
      
    },
  },
  default: function () {
    console.log('Installing defaults...');
  
    
  },
  conflicts: function () {
    console.log('Checking conflicts...');
  },
  install: function () {
    console.log('Installing... ');
  },
  end: function () {
    console.log('End');
  },
});