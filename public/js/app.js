'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
var config=angular.module('law.config',["ui.router"]);
var controller=angular.module('law.controller',["ui.router"]);
var service=angular.module('law.service',["ui.router"]);

// Declare app level module which depends on views, and components
angular.module('law', [
  'ui.router',
  'law.config',
  'law.controller',
  'law.service'
]);
