'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('editRecordDistribution100Ctrl', editRecordDistribution100Ctrl);

  editRecordDistribution100Ctrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', '$state', 'Entity'];

  function editRecordDistribution100Ctrl($scope, $uibModalInstance, config, appModulesService, $state, Entity) {
    $scope.cancel = cancel;
    $scope.save = save;
    $scope.page = $state.params.page;
    $scope.loadAttributes = loadAttributes;
    $scope.updatePicklistItems = updatePicklistItems;

    appModulesService.load(true).then(function (modules) {
      $scope.modules = modules;
    });

    $scope.$watch('config.resource', function (oldValue, newValue) {
      if ($scope.config.resource && oldValue !== newValue) {
        delete $scope.config.query.filters;
        $scope.loadAttributes();
      }
    });

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
