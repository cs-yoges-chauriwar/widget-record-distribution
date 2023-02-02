'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('editRecordDistribution100Ctrl', editRecordDistribution100Ctrl);

  editRecordDistribution100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', '$state', 'Entity', 'FormEntityService'];

  function editRecordDistribution100Ctrl($scope, $uibModalInstance, config, appModulesService, $state, Entity, FormEntityService) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.page = $state.params.page;
    $scope.loadAttributes = loadAttributes;
    $scope.updatePicklistItems = updatePicklistItems;

    $scope.config = angular.extend({
      query: {
        filters: [],
        limit: 100,
        relationships: true
      },
      mapping: {
        assignedToPerson: undefined
      },
      assignedToSetting: 'onlyMe',
      aggregate: true
    }, config);

    appModulesService.load(true).then(function (modules) {
      if ($state.current.name && ($state.current.name.indexOf('viewPanel') !== -1)) {
        var viewPanelEntity = FormEntityService.get();
        var relationshipModules = angular.isDefined(viewPanelEntity) ? viewPanelEntity.getRelationshipFieldsArray() : [];
        var list = [];
        if (angular.isDefined(relationshipModules)) {
          angular.forEach(relationshipModules, function (module) {
            list.push(module.name);
          });
          $scope.modules = _.filter(modules, function(module) {
            return list.includes(module.type);
          });
        }
      } else {
        $scope.modules = modules;
      }
    });

    $scope.$watch('config.resource', function (oldValue, newValue) {
      if ($scope.config.resource && oldValue !== newValue) {
        delete $scope.config.query.filters;
        $scope.loadAttributes();
      }
    });

    if ($scope.config.resource) {
      $scope.loadAttributes();
    }

    function loadAttributes() {
      $scope.pickListFields = [];
      var entity = new Entity($scope.config.resource);
      entity.loadFields().then(function () {
        $scope.fieldsArray = entity.getFormFieldsArray();
        $scope.pickListFields = _.filter($scope.fieldsArray, function (field) {
          return field.type === 'picklist' && field.options;
        });
        $scope.userField = _.filter($scope.fieldsArray, function (field) {
          return field.type !== 'manyToMany' && field.model === 'people';
        });
        if ($scope.config.pickListField) {
          getPicklistItems();
        }
        $scope.fields = entity.getFormFields();
        angular.extend($scope.fields, entity.getRelationshipFields());
      });
    }

    function updatePicklistItems() {
      $scope.config.pickListFieldItems = undefined;
      getPicklistItems();
      $scope.config.pickListFieldItems = $scope.pickListFieldItems;
    }

    function getPicklistItems() {
      $scope.pickListFieldItems = [];
      if ($scope.pickListFields.length > 0 && $scope.config.pickListField) {
        for (var key in $scope.pickListFields) {
          if ($scope.config.pickListField === $scope.pickListFields[key].name) {
            $scope.pickListFieldItems = $scope.pickListFields[key].options;
            break;
          }
        }
      }
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      $uibModalInstance.close($scope.config);
    }

  }
})();
