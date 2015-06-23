'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  templating: function() {
       this.composeWith('node', {});
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the glorious ' + chalk.red('GeneratorKitchensink') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOtherOption',
      message: 'Would you like to enable this option?',
      default: false
    },
    {
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    },
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },



  writing: {
    app: function () {

      this.template(
        './/_package.json',
        'package.json'
      
      );
      
      this.template('_bower.json', 'bower.json');

    }

    // projectfiles: function () {
    //   this.fs.copy(
    //     this.templatePath('editorconfig'),
    //     this.destinationPath('.editorconfig')
    //   );
    //   this.fs.copy(
    //     this.templatePath('jshintrc'),
    //     this.destinationPath('.jshintrc')
    //   );
    // }
  },

  install: function () {
    this.installDependencies();
  }
});
