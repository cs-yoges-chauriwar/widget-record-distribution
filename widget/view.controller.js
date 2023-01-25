'use strict';
(function () {
  angular
    .module('cybersponse')
    .controller('recordDistribution100Ctrl', recordDistribution100Ctrl);

  recordDistribution100Ctrl.$inject = ['$scope', 'config', '$state', '_', 'Entity', 'localStorageService', 'Query', 'API', '$resource', 'recordDistributionService', 'ViewTemplateService', 'appModulesService'];

  function recordDistribution100Ctrl($scope, config, $state, _, Entity, localStorageService, Query, API, $resource, recordDistributionService, ViewTemplateService, appModulesService) {
    var entity = null;
    var chartData = {};
    var _config = angular.copy(config);
    $scope.processing = false;
    $scope.assignedFieldName = '';
    $scope.filterByAssignedToPerson = false;
    config.assignedToSetting = config.assignedToSetting || 'onlyMe';
    $scope.filterByMe = config.assignedToSetting === 'onlyMe';
    if ($state.params) {
      $scope.page = $state.params.page;
    }

    function _init() {
      if (entity) {
        var assignedToPerson = config.mapping.assignedToPerson;
        if (!angular.isUndefined(assignedToPerson) && !angular.isUndefined(entity.fields[assignedToPerson])) {
          $scope.filterByAssignedToPerson = true;
          $scope.assignedFieldName = entity.fields[assignedToPerson].title;
        }
      }

      $scope.getList();
    }

    var setFilter = function () {
      _config = angular.copy(config);
      var selfFilter = '';
      if ($scope.filterByAssignedToPerson && $scope.filterByMe) {
        selfFilter = {
          field: config.mapping.assignedToPerson,
          operator: 'eq',
          value: localStorageService.get(API.API_3_BASE + API.CURRENT_ACTOR)
        };
      }
      if (config.query.logic === 'OR') {
        _config.query.logic = 'AND';
        _config.query.filters = [];
        if (selfFilter !== '') {
          _config.query.filters.push(selfFilter);
        }
        _config.query.filters.push({
          logic: config.query.logic,
          filters: config.query.filters
        });
      }
      else {
        if (selfFilter !== '') {
          _config.query.filters.push(selfFilter);
        }
      }
    };

    $scope.getList = function () {
      setFilter();
      $scope.processing = true;
      _config.query.relationships = true;
      var query = new Query(_config.query);

      if (entity) {
        $resource(API.QUERY + _config.resource).save(query.getQueryModifiers(), query.getQuery(true)).$promise.then(function (result) {
          $scope.fieldRows = result['hydra:member'];
          chartData = recordDistributionService.getChartData(_config, $scope.fieldRows);
          ViewTemplateService.getSystemViewTemplates('', 'settings').then(function (response) {
            if (response.data['hydra:member'].length > 0) {
              _.each(response.data['hydra:member'], function (setting) {
                var moduleType = setting.uuid.split('-')[1];
                if (_config.resource === moduleType && setting.config && setting.config.correlationConfig && setting.config.correlationConfig.$image) {
                  $scope.defaultImg = setting.config.correlationConfig.$image;
                }
              });
            }
            renderDistributionChart();
          });
          $scope.processing = false;
        }, angular.noop).finally(function () {
          $scope.processing = false;
        });
      }
    };

    function wrap() {
      var self = d3.select(this),
        textLength = self.node().getComputedTextLength(),
        text = self.text();
      while (textLength > (180) && text.length > 0) {
        text = text.slice(0, -1);
        self.text(text + '...');
        textLength = self.node().getComputedTextLength();
      }
    }

    function updateCoordinates() {
      var self = d3.select(this);
      var x = +self.attr('x') + 20;
      var y = +self.attr('y') + 20;
      var selfData = self.data()[0];
      var edges = chartData.edges;
      angular.forEach(edges, (edge, index) => {
        if (edge.from === selfData.uuid) {
          chartData.edges[index].x1 = x;
          chartData.edges[index].y1 = y;
        } else if (edge.to === selfData.uuid) {
          chartData.edges[index].x2 = x;
          chartData.edges[index].y2 = y;
        }
      });
    }

    function renderDistributionChart() {
      const categoryWidth = 200;
      const barHeight = 100;
      const height = chartData.data.length * barHeight;
      const width = angular.element(document.querySelector('#distributionChart-' + _config.wid))[0].clientWidth;

      d3.select('#distributionChart-' + _config.wid).selectAll("svg").remove();

      const svg = d3.selectAll('#distributionChart-' + _config.wid)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // If color is not provided as a part of data, then scale will be used
      var colorScale = d3.scaleLinear()
        .domain([0, chartData.data.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      var categoryHeight = height / chartData.data.length;

      // Row rendering
      var categoryRect = svg.append('g')
        .selectAll('rect')
        .data(chartData.data)
        .enter();

      // Category Rectangle
      categoryRect.append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * (categoryHeight);
        })
        .attr('width', function (d) {
          return categoryWidth;
        })
        .attr('height', categoryHeight)
        .attr('stroke', '#808080')
        .attr('fill', '#000');

      // Content rectangle
      categoryRect.append('rect')
        .attr('x', categoryWidth + 5)
        .attr('y', function (d, i) {
          return i * (categoryHeight);
        })
        .attr('width', function (d) {
          return width - categoryWidth - 5;
        })
        .attr('height', categoryHeight)
        .attr('stroke', '#000')
        .attr('fill', function (d) {
          if (d.color) {
            return d.color;
          } else {
            for (var i = 0; i < chartData.data.length; i++) {
              if (d.itemValue === chartData.data[i].itemValue) {
                return d3.rgb(colorScale(i));
              }
            }
          }
        })
        .attr('opacity', 0.7);

      // Category Text Rendering
      categoryRect.append('text')
        .text(function (d) {
          return d.itemValue;
        })
        .attr('x', 20)
        .attr('y', function (d, i) {
          return i * (categoryHeight) + (categoryHeight / 2);
        })
        .attr('font-size', 16)
        .attr('text-anchor', 'start')
        .attr('text-height', 20)
        .attr('fill', '#fff');

      var contents = svg.append('g')
        .attr('id', "content-" + _config.wid);

      // Render data in rows
      // Calculate max items in a row can be render
      const itemWidth = 160;
      const maxItems = Math.floor((width - categoryWidth) / itemWidth);
      var state = appModulesService.getState(_config.resource);
      angular.forEach(chartData.data, (data, index) => {
        var filteredData = _.filter(data.json, (item, index) => {
          return index < maxItems;
        });
        var item = contents.append('g')
          .attr('id', "content-" + _config.wid + "-" + data.itemValue)
          .selectAll('g')
          .data(filteredData)
          .enter()
          .append('g')
          .attr('id', function (d) {
            return d.uuid;
          });

        item.append("svg:image")
          .attr('x', function (d, i) {
            return categoryWidth + 60 + i * 150;
          })
          .attr('y', function (d) {
            return index * (categoryHeight) + (categoryHeight / 3) - 20;
          })
          .attr('width', 40)
          .attr('height', 40)
          .attr("xlink:href", function (d) {
            return d.image ? d.image : $scope.defaultImg;
          })
          .each(updateCoordinates)
          .on('mouseover', function (e) {
            var tag = "";

            tag = "Name: " + d3.select(this).data()[0].name + "<br/>" +
              "ID: " + d3.select(this).data()[0].id;
            var output = document.getElementById("tag-" + _config.wid);

            var x = this.x.animVal.value + "px";
            var y = this.y.animVal.value + 50 + "px";

            output.innerHTML = tag;
            output.style.top = y;
            output.style.left = x;
            output.style.display = "block";
            output.style.position = "absolute";
            output.style.pointerEvents = "none";
          })
          .on('mouseout', function () {
            var output = document.getElementById("tag-" + _config.wid);
            output.style.display = "none";
          })
          .on('click', function (d) {
            $state.go(state, {
              module: _config.resource,
              id: d.uuid,
              previousParams: JSON.stringify($state.params),
              previousState: $state.current.name
            });
          });

        // Add Text To Records
        var itemText = item.append('text')
          .text(function (d) {
            return d.name;
          })
          .each(wrap)
          .attr('x', function (d, i) {
            return categoryWidth + 20 + i * 150 + 60; // Middle of Image
          })
          .attr('y', function (d, i) {
            return index * (categoryHeight) + (categoryHeight / 2) + 20; // For labelling below circle
          })
          .attr('font-size', 11)
          .attr('width', 150)
          .attr('text-anchor', 'middle')
          .attr('text-height', 20)
          .attr('fill', '#fff');
      });

      var filteredEdges = _.filter(chartData.edges, (edge) => {
        return edge.x1 && edge.y1 && edge.x2 && edge.y2;
      });

      // Render edges
      svg.append('g').selectAll('line')
        .append('g')
        .data(filteredEdges)
        .enter()
        .append('line')
        .attr('x1', function (d) {
          return d.x1;
        })
        .attr('y1', function (d) {
          return d.y1;
        })
        .attr('x2', function (d) {
          return d.x2;
        })
        .attr('y2', function (d) {
          return d.y2;
        })
        .attr('stroke', '#000');

      // Setting z-index for content to display line below record image and text
      svg.append('use')
        .attr('xlink:href', '#content-' + _config.wid);
    }

    entity = new Entity(config.resource);
    if (entity) {
      entity.loadFields().then(function () {
        _init();
      });
    }
  }
})();
