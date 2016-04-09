// create module for custom directives
var d3DemoApp = angular.module('d3DemoApp', []);

// controller business logic
d3DemoApp.controller('AppCtrl', function AppCtrl ($scope, $http) {

  // initialize the model
  $scope.user = 'GDPKYPW5A2PYCC2FPBCO7R2G5FHXMQBG6TX6IQYYYMXKCHXF2YNM3BOX';
  $scope.accounts = [];
  $scope.dataMatching = [];
  $scope.msg = "[";
  var hey = [];
  // $scope.udpateJson = function () {
    // helper for reformatting the Github API response into a form we can pass to D3
    var reformatAccountData = function (data) {
      // build up the data to be passed to our d3 visualization
      var formattedData = [];
      var formattedToken = [];
      var records = data._embedded.records;
      var i;
      for (i = 0; i < records.length; i++) {
        formattedData.push(records[i].id);
        formattedToken.push(records[i].paging_token);
      }
      return [formattedData, formattedToken];
    };

    $scope.appendAccountEntry = function(key, entry){
      $scope.dataMatching.push({
          'name': key,
          'size': 1,
          'inputs': [entry]
      });
      hey.push({
          'name': key,
          'size': 1,
          'inputs': [entry]
      });
      // console.log(hey);
      $scope.msg = $scope.msg + JSON.stringify({
          'name': key,
          'size': 1,
          'inputs': [entry]
      }) + ',';
    }
    $scope.getCommitData = function () {
      $http({
        method: 'GET',
        url:'https://horizon-testnet.stellar.org/accounts?limit=200&order=desc'
      }).
      success(function (data) {
        // attach this data to the scope
        $scope.data = reformatAccountData(data)[0];
        $scope.accounts = reformatAccountData(data)[1];

        var m;
        for (m=1; m<$scope.accounts.length; m+=1) {
          $http({
              method: 'GET',
              url:'https://horizon-testnet.stellar.org/accounts/' + $scope.data[m] + '/operations'
            }).
            success(function (data) {
              // attach this data to the scope
              var funder = data._embedded.records[0].funder;
              var key =  data._embedded.records[0].account;
              $scope.appendAccountEntry(key, funder);
            }).
            error(function (data, status) {
              if (status === 404) {
                $scope.error = 'That account does not exist';
              } else {
                $scope.error = 'Error: ' + status;
              }
            });
          }
          // clear the error messages
          $scope.error = '';
      }).
      error(function (data, status) {
        if (status === 404) {
          $scope.error = 'The account does not exist.';
        } else {
          $scope.error = 'Error: ' + status;
        }
      });

      var stateChange = function(newState) {
          setTimeout(function () {
            $scope.msg = $scope.msg + "]";
            console.log($scope.msg);
            var diameter = 960,
                radius = diameter / 2,
                innerRadius = radius - 120;

            var cluster = d3.layout.cluster()
                .size([360, innerRadius])
                .sort(null)
                .value(function(d) { return d.size; });

            var bundle = d3.layout.bundle();

            var line = d3.svg.line.radial()
                .interpolate("bundle")
                .tension(.85)
                .radius(function(d) { return d.y; })
                .angle(function(d) { return d.x / 180 * Math.PI; });

            var svg = d3.select("body").append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
              .append("g")
                .attr("transform", "translate(" + radius + "," + radius + ")");

            d3.json("accountcreation.json", function(error, classes) {
              if (error) throw error;

              console.log(classes);
              var nodes = cluster.nodes(packageHierarchy(classes)),
                  links = packageImports(nodes);

              svg.selectAll(".link")
                  .data(bundle(links))
                .enter().append("path")
                  .attr("class", "link")
                  .attr("d", line);

              svg.selectAll(".node")
                  .data(nodes.filter(function(n) { return !n.children; }))
                .enter().append("g")
                  .attr("class", "node")
                  .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
                .append("text")
                  .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
                  .attr("dy", ".31em")
                  .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
                  .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
                  .text(function(d) { return d.key; });
            });

            d3.select(self.frameElement).style("height", diameter + "px");

            // Lazily construct the package hierarchy from class names.
            function packageHierarchy() {
              var map = {};
              function find(name, data) {
                var node = map[name], i;
                if (!node) {
                  node = map[name] = data || {name: name, children: []};
                  if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                  }
                }
                return node;
              }
              angular.forEach(function(d) {
                find(d.name, d);
              });
              return map[""];
            }

            // Return a list of imports for the given array of nodes.
            function packageImports(nodes) {
              var map = {},
                  imports = [];
              // Compute a map from name to node.
              nodes.forEach(function(d) {
                map[d.name] = d;
              });
              // For each import, construct a link from the source to target node.
              nodes.forEach(function(d) {
                if (d.imports) d.imports.forEach(function(i) {
                  imports.push({source: map[d.name], target: map[i]});
                });
              });
              return imports;
            }

          }, 5000);
      };
      stateChange();
    };
  // }();

  // get the commit data immediately
  $scope.getCommitData();
  // console.log($scope.msg);
  // $scope.$watch(function(){return $scope.msg;}, function(newValue, oldValue){console.log(newValue)});


});
