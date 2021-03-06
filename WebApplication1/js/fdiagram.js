﻿(function() {
    'use strict';

    angular
        .module('app')
        .directive('fdiagram', fdiagram);

    fdiagram.$inject = ['$window'];
    
    function fdiagram ($window) {
        // Usage:
        //     <fdiagram></fdiagram>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            template: '<div></div>',
            scope: {model: '=goModel'}
        };
        return directive;

        function link(scope, element, attrs) {

            var $ = go.GraphObject.make;  // for conciseness in defining templates

            myDiagram =
              $(go.Diagram, "myDiagramDiv",  // must name or refer to the DIV HTML element
                {
                    initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
                    contentAlignment: go.Spot.Center,  // align document to the center of the viewport
                    layout:
                      $(ContinuousForceDirectedLayout,  // automatically spread nodes apart while dragging
                        { defaultSpringLength: 30, defaultElectricalCharge: 100 }),
                    // do an extra layout at the end of a move
                    "SelectionMoved": function (e) { e.diagram.layout.invalidateLayout(); }
                });
            // dragging a node invalidates the Diagram.layout, causing a layout during the drag
            myDiagram.toolManager.draggingTool.doMouseMove = function () {
                go.DraggingTool.prototype.doMouseMove.call(this);
                if (this.isActive) { this.diagram.layout.invalidateLayout(); }
            }
            // define each Node's appearance
            myDiagram.nodeTemplate =
              $(go.Node, "Auto",  // the whole node panel
                // define the node's outer shape, which will surround the TextBlock
                $(go.Shape, "Circle",
                  { fill: "CornflowerBlue", stroke: "black", spot1: new go.Spot(0, 0, 5, 5), spot2: new go.Spot(1, 1, -5, -5) }),
                $(go.TextBlock,
                  { font: "bold 10pt helvetica, bold arial, sans-serif", textAlign: "center", maxSize: new go.Size(100, NaN) },
                  new go.Binding("text", "text"))
              );
            // the rest of this app is the same as samples/conceptMap.html
            // replace the default Link template in the linkTemplateMap
            myDiagram.linkTemplate =
              $(go.Link,  // the whole link panel
                $(go.Shape,  // the link shape
                  { stroke: "black" }),
                $(go.Shape,  // the arrowhead
                  { toArrow: "standard", stroke: null }),
                $(go.Panel, "Auto",
                  $(go.Shape,  // the label background, which becomes transparent around the edges
                    {
                        fill: $(go.Brush, "Radial", { 0: "rgb(240, 240, 240)", 0.3: "rgb(240, 240, 240)", 1: "rgba(240, 240, 240, 0)" }),
                        stroke: null
                    }),
                  $(go.TextBlock,  // the label text
                    {
                        textAlign: "center",
                        font: "10pt helvetica, arial, sans-serif",
                        stroke: "#555555",
                        margin: 4
                    },
                    new go.Binding("text", "text"))
                )
              );
            // create the model for the concept map
            var nodeDataArray = [
              { key: 1, text: "Concept Maps" },
              { key: 2, text: "Organized Knowledge" },
              { key: 3, text: "Context Dependent" },
              { key: 4, text: "Concepts" },
              { key: 5, text: "Propositions" },
              { key: 6, text: "Associated Feelings or Affect" },
              { key: 7, text: "Perceived Regularities" },
              { key: 8, text: "Labeled" },
              { key: 9, text: "Hierarchically Structured" },
              { key: 10, text: "Effective Teaching" },
              { key: 11, text: "Crosslinks" },
              { key: 12, text: "Effective Learning" },
              { key: 13, text: "Events (Happenings)" },
              { key: 14, text: "Objects (Things)" },
              { key: 15, text: "Symbols" },
              { key: 16, text: "Words" },
              { key: 17, text: "Creativity" },
              { key: 18, text: "Interrelationships" },
              { key: 19, text: "Infants" },
              { key: 20, text: "Different Map Segments" }
            ];
            var linkDataArray = [
              { from: 1, to: 2, text: "represent" },
              { from: 2, to: 3, text: "is" },
              { from: 2, to: 4, text: "is" },
              { from: 2, to: 5, text: "is" },
              { from: 2, to: 6, text: "includes" },
              { from: 2, to: 10, text: "necessary\nfor" },
              { from: 2, to: 12, text: "necessary\nfor" },
              { from: 4, to: 5, text: "combine\nto form" },
              { from: 4, to: 6, text: "include" },
              { from: 4, to: 7, text: "are" },
              { from: 4, to: 8, text: "are" },
              { from: 4, to: 9, text: "are" },
              { from: 5, to: 9, text: "are" },
              { from: 5, to: 11, text: "may be" },
              { from: 7, to: 13, text: "in" },
              { from: 7, to: 14, text: "in" },
              { from: 7, to: 19, text: "begin\nwith" },
              { from: 8, to: 15, text: "with" },
              { from: 8, to: 16, text: "with" },
              { from: 9, to: 17, text: "aids" },
              { from: 11, to: 18, text: "show" },
              { from: 12, to: 19, text: "begins\nwith" },
              { from: 17, to: 18, text: "needed\nto see" },
              { from: 18, to: 20, text: "between" }
            ];
            myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
        }
    }

})();