'use strict';

(function () {
  angular
    .module('cybersponse')
    .factory('recordDistributionService', recordDistributionService);

  recordDistributionService.$inject = ['_'];

  function recordDistributionService(_) {
    var service = {
      getChartData: getChartData,
    };
    return service;

    /*
     * This method is responsible for forming chart data for rendering.
     *
     */
    function getChartData(config, records) {
      var chartData = { "data": [], "edges": [] };
      if (config.pickListField && (config.pickListFieldItems && config.pickListFieldItems.length > 0) && records.length > 0) {
        // Form initial list of pick list items and color
        angular.forEach(config.pickListFieldItems, function (fieldItem) {
          var chartItem = {};
          chartItem.itemValue = fieldItem.itemValue;
          if (fieldItem.color) {
            chartItem.color = fieldItem.color;
          }
          chartItem.json = [];
          // Insert records data as per items
          var itemRecords = _.filter(records, function (record) {
            return record[config.pickListField] && record[config.pickListField].itemValue ? record[config.pickListField].itemValue === fieldItem.itemValue : false;
          });
          // Get picklist details
          if (itemRecords.length > 0) {
            chartItem.picklist = itemRecords[0][config.pickListField];
          }
          angular.forEach(itemRecords, function (itemRecord) {
            var recordJson = {};
            recordJson.name = itemRecord.name ? itemRecord.name : itemRecord.value;
            recordJson.id = itemRecord.id;
            recordJson.uuid = itemRecord.uuid;
            recordJson.image = itemRecord.icon;
            chartItem.json.push(recordJson);

            // Handling for Edge Data
            if (itemRecord[config.resource] && itemRecord[config.resource].length > 0) {
              angular.forEach(itemRecord[config.resource], function (relation) {
                var edge = {};
                edge.from = itemRecord.uuid; // itemRecord['@id'];
                edge.to = relation.uuid; // relation['@id'];
                edge.id = edge.from + '-' + edge.to;
                if (!chartData.edges.some(item => item.id === edge.to + '-' + edge.from)) {
                  chartData.edges.push(edge);
                }
              });
            }
          });
          if (chartItem.json.length > 0) {
            chartData.data.push(chartItem);
          }
        });
      }

      return chartData;
    }
  }
})();