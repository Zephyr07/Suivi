'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
var config=angular.module('bvs.config',["ui.router"]);
var controller=angular.module('bvs.controller',["ui.router"]);
var service=angular.module('bvs.service',["ui.router"]);

// Declare app level module which depends on views, and components
angular.module('bvs', [
  'ui.router',
  'satellizer',
  'gettext',
  'ngCookies',
  'restangular',
  'textAngular',
  'ngFileUpload',
  'angularUtils.directives.dirPagination',
  'bvs.config',
  'bvs.controller',
  'bvs.service'
]);
