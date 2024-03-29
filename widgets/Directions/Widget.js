// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
require({
  cache: {
    "esri/dijit/Directions": function () {
      define(
        "require dojo/_base/declare dojo/_base/lang dojo/_base/kernel dojo/_base/array dojo/_base/Color dijit/a11yclick dijit/_TemplatedMixin dijit/form/Select dijit/form/ValidationTextBox dijit/form/DateTextBox dijit/form/TimeTextBox dojo/store/Memory dojo/data/ObjectStore dojo/keys dojo/has dojo/on dojo/mouse dojo/dom dojo/dom-geometry dojo/dom-style dojo/dom-class dojo/dom-attr dojo/query dojo/number dojo/i18n!../nls/jsapi dojo/text!./templates/Directions.html ./Search dojo/dom-construct dojo/promise/all dojo/Deferred dojo/dnd/Source dojo/json ../kernel ../urlUtils ../graphic ../units ../TimeExtent ../InfoTemplate ../SpatialReference ../layers/ArcGISDynamicMapServiceLayer ../layers/GraphicsLayer ../geometry/webMercatorUtils ../geometry/geodesicUtils ../arcgis/utils ../geometry/Point ../geometry/Extent ../geometry/Polyline ../geometry/mathUtils ../symbols/SimpleMarkerSymbol ../symbols/PictureMarkerSymbol ../symbols/CartographicLineSymbol ../symbols/TextSymbol ../renderers/UniqueValueRenderer ../symbols/Font ./_EventedWidget ../tasks/FeatureSet ../tasks/RouteTask ../tasks/RouteParameters ../tasks/GeometryService ../tasks/DistanceParameters ../tasks/PrintTask ../tasks/PrintParameters ../tasks/PrintTemplate ../toolbars/edit ../toolbars/draw ../config ../tasks/ProjectParameters dojo/uacss".split(
          " "
        ),
        function (
          C,
          R,
          k,
          Z,
          U,
          O,
          I,
          E,
          A,
          m,
          z,
          g,
          f,
          c,
          d,
          q,
          t,
          l,
          y,
          J,
          H,
          T,
          Q,
          M,
          B,
          G,
          ca,
          N,
          F,
          X,
          x,
          da,
          ba,
          v,
          n,
          u,
          V,
          ia,
          ea,
          ka,
          qa,
          pa,
          xa,
          ya,
          Ea,
          e,
          D,
          P,
          L,
          aa,
          ja,
          oa,
          Aa,
          ra,
          wa,
          la,
          ua,
          Ia,
          Ka,
          Ba,
          Pa,
          Sa,
          Va,
          fb,
          Ya,
          Za,
          gb,
          $a
        ) {
          var Ta = n.getProtocolForWebResource(),
            ab = N.createSubclass({
              _setSourcesAttr: function (a) {
                a &&
                  (a = a.map(function (b) {
                    b.locator &&
                      null == b.locationType &&
                      (b = k.mixin({ locationType: "street" }, b));
                    return b;
                  }));
                this.inherited(arguments, [a]);
              },
            });
          R = R("esri.dijit.Directions", [la, E], {
            templateString: ca,
            mapClickActive: !1,
            barrierToolActive: !1,
            _eventMap: {
              activate: !0,
              deactivate: !1,
              load: !0,
              "directions-start": !0,
              "directions-finish": ["result"],
              "directions-clear": !0,
              "segment-select": ["graphic"],
              "segment-highlight": ["graphic"],
              error: ["error"],
              "stops-update": ["stops"],
              "route-item-created": !0,
              "route-item-updated": !0,
              "feature-collection-created": !0,
            },
            _emptyStop: { name: "" },
            constructor: function (a, b) {
              if (!a.map)
                throw Error(
                  'Required "map" parameter is missing. Cannot instantiate Directions Widget.'
                );
              if (!b)
                throw Error(
                  'Required "srcNodeRef" parameter is missing. Cannot instantiate Directions Widget.'
                );
              this._i18n = G;
              this._css = {
                widgetContainerClass: "esriDirectionsContainer",
                searchSourceContainerClass: "esriSearchSourceContainer",
                stopsContainerClass: "esriStopsContainer",
                stopsTableContainerClass: "esriStopsTableContainer",
                stopsTableCoverClass: "esriStopsTableCover",
                reverseStopsClass: "esriStopsReverse",
                addStopsClass: "esriStopsAdd",
                stopsClass: "esriStops",
                stopsRemovableClass: "esriStopsRemovable",
                stopsButtonContainerClass: "esriStopsButtons",
                stopsOptionsButtonClass: "esriStopsOptionsButton",
                stopsAddDestinationClass: "esriStopsAddDestination",
                stopsAddDestinationBtnClass: "esriStopsAddDestinationBtn",
                stopsGetDirectionsContainerClass:
                  "esriStopsGetDirectionsContainer",
                stopsGetDirectionsClass: "esriStopsGetDirections",
                stopsClearDirectionsClass: "esriStopsClearDirections",
                stopsInnerGeocoderClass: "esriInnerGeocoder",
                stopsOptionsOptionsEnabledClass: "esriStopsOptionsEnabled",
                stopsOptionsMenuClass: "esriStopsOptionsMenu",
                stopsFindOptimalOrderClass: "esriFindOptimalOrderOption",
                stopsUseTrafficClass: "esriUseTrafficOption",
                stopsReturnToStartClass: "esriReturnToStartOption",
                stopsOptionsCheckboxesClass: "esriOptionsCheckboxes",
                stopsOptionsToggleContainerClass: "esriOptionsToggleContainer",
                stopsOptionsUnitsContainerClass: "esriOptionsUnitsContainer",
                stopsOptionsUnitsMiClass: "esriOptionsUnitsMi",
                stopsOptionsUnitsKmClass: "esriOptionsUnitsKm",
                stopsOptionsImpedanceContainerClass:
                  "esriOptionsImpedanceContainer",
                stopsOptionsImpedanceTimeClass: "esriOptionsImpedanceTime",
                stopsOptionsImpedanceDistanceClass:
                  "esriOptionsImpedanceDistance",
                stopClass: "esriStop",
                stopOriginClass: "esriStopOrigin",
                stopDestinationClass: "esriStopDestination",
                stopUnreachedFirstOrLastClass: "esriStopUnreachedFirstOrLast",
                stopUnreachedClass: "esriStopUnreached",
                esriStopGeocoderColumnClass: "esriStopGeocoderColumn",
                esriStopReverseColumnClass: "esriStopReverseColumn",
                stopDnDHandleClass: "esriStopDnDHandle",
                stopDnDHandleClassHidden: "esriStopDnDHandleHidden",
                stopIconColumnClass: "esriStopIconColumn",
                stopIconClass: "esriStopIcon",
                stopIconRemoveColumnClass: "esriStopIconRemoveColumn",
                stopIconRemoveClass: "esriStopIconRemove",
                stopIconRemoveClassHidden: "esriStopIconRemoveHidden",
                resultsContainerClass: "esriResultsContainer",
                resultsLoadingClass: "esriResultsLoading",
                resultsPrintClass: "esriResultsPrint",
                resultsSaveClass: "esriResultsSave",
                resultsSummaryClass: "esriResultsSummary",
                routesContainerClass: "esriRoutesContainer",
                routesClass: "esriRoutes",
                routesErrorClass: "esriRoutesError",
                routesInfoClass: "esriRoutesInfo",
                routeClass: "esriRoute",
                routeTextColumnClass: "esriRouteTextColumn",
                routeTextClass: "esriRouteText",
                routeLengthClass: "esriRouteLength",
                routeOriginClass: "esriDMTStopOrigin",
                routeDestinationClass: "esriDMTStopDestination",
                routeInfoClass: "esriRouteInfo",
                routeIconColumnClass: "esriRouteIconColumn",
                routeIconClass: "esriRouteIcon",
                infoWindowRouteClass: "esriInfoWindowRoute",
                routeZoomClass: "esriRouteZoom",
                esriPrintPageClass: "esriPrintPage",
                esriPrintBarClass: "esriPrintBar",
                esriPrintButtonClass: "esriPrintButton",
                esriCloseButtonClass: "esriCloseButton",
                esriPrintMainClass: "esriPrintMain",
                esriPrintHeaderClass: "esriPrintHeader",
                esriPrintLogoClass: "esriPrintLogo",
                esriPrintMapClass: "esriPrintMap",
                esriPrintNameClass: "esriPrintName",
                esriPrintNotesClass: "esriPrintNotes",
                esriPrintLengthClass: "esriPrintLength",
                esriPrintDirectionsClass: "esriPrintDirections",
                esriPrintStopLabelClass: "esriPrintStopLabel",
                clearClass: "esriClear",
                dndDragBodyClass: "esriDndDragDirection",
                stopsButtonClass: "esriDirectionsButton",
                stopsButtonTabClass: "esriDirectionsTabButton",
                stopsButtonTabLastClass: "esriDirectionsTabLastButton",
                stopsPressedButtonClass: "esriDirectionsPressedButton",
                linkButtonClass: "esriLinkButton",
                activateButtonClass: "esriActivateButton",
                lineBarrierButtonClass: "esriLineBarrierButton",
                travelModesContainerClass: "esriTravelModesContainer",
              };
              this.options = {
                map: null,
                autoSolve: !0,
                minStops: 2,
                maxStops: 20,
                theme: "simpleDirections",
                alphabet: "1234567890",
                directions: null,
                returnToStart: !1,
                optimalRoute: !1,
                routeTaskUrl:
                  Ta +
                  "//route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
                printTaskUrl:
                  Ta +
                  "//utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                geometryTaskUrl:
                  Ta +
                  "//utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",
                routeParams: {},
                stops: ["", ""],
                searchOptions: {},
                stopsInfoTemplate: new ea(
                  G.widgets.directions.stop,
                  "${address}${error}"
                ),
                waypointInfoTemplate: new ea(
                  G.widgets.directions.maneuver,
                  G.widgets.directions.waypoint
                ),
                segmentInfoTemplate: new ea(
                  G.widgets.directions.maneuver,
                  '\x3cdiv class\x3d"${maneuverType}"\x3e\x3cdiv class\x3d"' +
                    this._css.routeIconClass +
                    " " +
                    this._css.infoWindowRouteClass +
                    '"\x3e\x3cstrong\x3e${step}.\x3c/strong\x3e ${formattedText}\x3c/div\x3e\x3c/div\x3e'
                ),
                textSymbolFont: new wa(
                  "11px",
                  wa.STYLE_NORMAL,
                  wa.VARIANT_NORMAL,
                  wa.WEIGHT_NORMAL,
                  "Arial, Helvetica, sans-serif"
                ),
                textSymbolColor: new O([255, 255, 255]),
                textSymbolOffset: { x: 0, y: 10.875 },
                fromSymbol: new ja({
                  url: C.toUrl("./images/Directions/greenPoint.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                fromSymbolDrag: new ja({
                  url: C.toUrl("./images/Directions/greenPointMove.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                stopSymbol: new ja({
                  url: C.toUrl("./images/Directions/bluePoint.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                stopSymbolDrag: new ja({
                  url: C.toUrl("./images/Directions/bluePointMove.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                toSymbol: new ja({
                  url: C.toUrl("./images/Directions/redPoint.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                toSymbolDrag: new ja({
                  url: C.toUrl("./images/Directions/redPointMove.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                unreachedSymbol: new ja({
                  url: C.toUrl("./images/Directions/grayPoint.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                unreachedSymbolDrag: new ja({
                  url: C.toUrl("./images/Directions/grayPointMove.png"),
                  height: 21.75,
                  width: 15.75,
                  type: "esriPMS",
                }).setOffset(0, 10.875),
                waypointSymbol: new aa({
                  color: [255, 255, 255, 255],
                  size: 10,
                  type: "esriSMS",
                  style: "esriSMSCircle",
                  outline: {
                    color: [20, 89, 127, 255],
                    width: 2.5,
                    type: "esriSLS",
                    style: "esriSLSSolid",
                  },
                }),
                maneuverSymbol: new aa({
                  color: [255, 255, 255, 255],
                  size: 4,
                  type: "esriSMS",
                  style: "esriSMSCircle",
                  outline: {
                    color: [30, 99, 137, 255],
                    width: 1,
                    type: "esriSLS",
                    style: "esriSLSSolid",
                  },
                }),
                routeSymbol: new oa()
                  .setColor(new O([20, 89, 127, 0.75]))
                  .setWidth(10)
                  .setCap(oa.CAP_ROUND)
                  .setJoin(oa.JOIN_ROUND),
                segmentSymbol: new oa()
                  .setColor(new O([255, 255, 255, 1]))
                  .setWidth(6)
                  .setCap(oa.CAP_ROUND)
                  .setJoin(oa.JOIN_ROUND),
                barrierRenderer: new ra({
                  type: "uniqueValue",
                  field1: "BarrierType",
                  defaultSymbol: {
                    type: "esriPMS",
                    imageData:
                      "PHN2ZyB3aWR0aD0iMjIyIiBoZWlnaHQ9IjIyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGc+CjxlbGxpcHNlIGZpbGw9IiNmZjAwMDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyMCIgY3g9IjExMiIgY3k9IjExMSIgaWQ9InN2Z181IiByeD0iMTAwIiByeT0iMTAwIi8+CjxlbGxpcHNlIGZpbGw9IiNmZjAwMDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyMCIgY3g9IjExMiIgY3k9IjExMSIgaWQ9InN2Z182IiByeD0iOTUiIHJ5PSI5NSIvPgo8cmVjdCBmaWxsPSIjZmYwMDAwIiBzdHJva2Utd2lkdGg9IjIwIiB4PSI2NC41IiB5PSIxMDIiIHdpZHRoPSI5NSIgaGVpZ2h0PSIxOCIgaWQ9InN2Z183IiBzdHJva2U9IiNmZmZmZmYiLz4KPC9nPgo8L3N2Zz4\x3d",
                    contentType: "image/svg+xml",
                    width: 18,
                    height: 18,
                  },
                  uniqueValueInfos: [
                    {
                      value: "2",
                      symbol: {
                        type: "esriPMS",
                        imageData:
                          "PHN2ZyB3aWR0aD0iMjg2IiBoZWlnaHQ9IjI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGc+CjxwYXRoIGZpbGw9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAiIGQ9Im04Ljc0OTk5MiwyNTEuNzQ5OTk3bDEzNC45OTk5OTgsLTI0MS45OTk5OThsMTM0Ljk5OTk5OCwyNDEuOTk5OTk4bC0yNjkuOTk5OTk1LDBsLTAuMDAwMDAxLDB6IiBpZD0ic3ZnXzEiIHN0cm9rZT0iIzAwMCIvPgo8cGF0aCBzdHJva2U9IiNmZmYiIGZpbGw9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMTUiIGQ9Im0yMy41MDAwMDQsMjQyLjUwMDAwNWwxMTkuOTk5OTkyLC0yMTUuOTk5OTk5bDExOS45OTk5OTIsMjE1Ljk5OTk5OWwtMjM5Ljk5OTk4MywwbC0wLjAwMDAwMSwweiIgaWQ9InN2Z18yIi8+Cjx0ZXh0IGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS13aWR0aD0iMCIgeD0iMTA5IiB5PSIyMjIuNzUiIGlkPSJzdmdfNSIgZm9udC1zaXplPSIxODAiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBUaW1lcywgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiE8L3RleHQ+CjwvZz4KPC9zdmc+",
                        contentType: "image/svg+xml",
                        width: 19,
                        height: 18,
                      },
                    },
                  ],
                }),
                polylineBarrierRenderer: new ra({
                  type: "uniqueValue",
                  field1: "BarrierType",
                  defaultSymbol: {
                    color: [255, 0, 0, 184],
                    width: 7.5,
                    type: "esriSLS",
                    style: "esriSLSSolid",
                  },
                  uniqueValueInfos: [
                    {
                      value: "1",
                      symbol: {
                        color: [255, 85, 0, 184],
                        width: 7.5,
                        type: "esriSLS",
                        style: "esriSLSSolid",
                      },
                    },
                  ],
                }),
                polygonBarrierRenderer: new ra({
                  type: "uniqueValue",
                  field1: "BarrierType",
                  defaultSymbol: {
                    color: [255, 0, 0, 156],
                    outline: {
                      color: [255, 0, 0, 153],
                      width: 2.4,
                      type: "esriSLS",
                      style: "esriSLSSolid",
                    },
                    type: "esriSFS",
                    style: "esriSFSSolid",
                  },
                  uniqueValueInfos: [
                    {
                      value: "1",
                      symbol: {
                        color: [255, 170, 0, 156],
                        outline: {
                          color: [255, 0, 0, 153],
                          width: 7.5,
                          type: "esriSLS",
                          style: "esriSLSSolid",
                        },
                        type: "esriSFS",
                        style: "esriSFSSolid",
                      },
                    },
                  ],
                }),
                printPage: "",
                printTemplate: "",
                focusOnNewStop: !0,
                dragging: !0,
                canModifyStops: !0,
                canModifyWaypoints: !0,
                directionsLengthUnits: null,
                directionsLanguage: null,
                traffic: !1,
                trafficLayer: null,
                showPrintPage: !0,
                showSaveButton: !1,
                showSegmentPopup: !1,
                showSegmentHighlight: !0,
                showReverseStopsButton: !0,
                showReturnToStartOption: !0,
                showOptimalRouteOption: !0,
                showTravelModesOption: !0,
                showMilesKilometersOption: !0,
                showClearButton: !1,
                showActivateButton: !0,
                showBarriersButton: !0,
                loaded: !1,
                routeLayer: {
                  itemId: null,
                  title: null,
                  isItemOwner: !0,
                  ownerFolder: null,
                },
                startTime: "now",
              };
              this.userOptions = a;
              this.defaults = k.mixin({}, this.options, a, {
                _waypointName: "DWWP",
                _userDefinedStopName: "UserDefinedStopName",
                _solveInProgress: !1,
                _moveInProgress: !1,
                _stopSequence: 1e3,
              });
              if (!this.defaults.minStops || 2 > this.defaults.minStops)
                this.defaults.minStops = 2;
              if (
                2 < this.defaults.minStops &&
                this.defaults.stops &&
                "," === this.defaults.stops.toString()
              )
                for (a = 2; a < this.defaults.minStops; a++)
                  this.defaults.stops.splice(0, 0, "");
              this.domNode = b;
            },
            postCreate: function () {
              this.inherited(arguments);
              this.own(
                t(
                  this._activateButtonNode,
                  I,
                  k.hitch(this, function () {
                    this.mapClickActive ? this.deactivate() : this.activate();
                  })
                )
              );
              this.own(
                t(
                  this._lineBarrierButtonNode,
                  I,
                  k.hitch(this, function () {
                    this.barrierToolActive
                      ? this.deactivateBarrierTool()
                      : this.activateBarrierTool();
                  })
                )
              );
              this.own(
                t(
                  this._addDestinationNode,
                  I,
                  k.hitch(this, this._addStopButton)
                )
              );
              this.own(
                t(
                  this._optionsButtonNode,
                  I,
                  k.hitch(this, this._toggleOptionsMenu)
                )
              );
              this.own(
                t(this._saveMenuButton, I, k.hitch(this, this._toggleSaveMenu))
              );
              this.own(
                t(
                  this._saveButton,
                  I,
                  k.hitch(this, function () {
                    this._saveButton._enabled && this._storeRouteUI();
                  })
                )
              );
              this.own(
                t(
                  this._saveAsButton,
                  I,
                  k.hitch(this, function () {
                    k.mixin(this.routeLayer, {
                      itemId: null,
                      title: null,
                      ownerFolder: null,
                    });
                    this._storeRouteUI();
                  })
                )
              );
              this.own(
                t(
                  this._findOptimalOrderNode,
                  I,
                  k.hitch(this, this._toggleCheckbox)
                )
              );
              this.own(
                t(
                  this._returnToStartNode,
                  I,
                  k.hitch(this, this._toggleCheckbox)
                )
              );
              this.own(
                t(this._useTrafficNode, I, k.hitch(this, this._toggleCheckbox))
              );
              this.own(
                t(this._useMilesNode, I, k.hitch(this, this._toggleUnits))
              );
              this.own(
                t(this._useKilometersNode, I, k.hitch(this, this._toggleUnits))
              );
              this.own(
                t(
                  this._getDirectionsButtonNode,
                  I,
                  k.hitch(this, this.getDirections)
                )
              );
              this.own(
                t(
                  this._clearDirectionsButtonNode,
                  I,
                  k.hitch(this, function () {
                    this.clearDirections();
                  })
                )
              );
              var a = k.hitch(this, function () {
                clearTimeout(this._startTimeMenu._hideTimer);
                this._startTimeMenu._hideTimer = setTimeout(
                  k.hitch(this, function () {
                    H.set(this._startTimeMenu, "display", "none");
                  }),
                  100
                );
              });
              this.own(
                t(
                  this._startTimeButtonNode,
                  I,
                  k.hitch(this, function () {
                    this._startTimeButtonNode.disabled ||
                    "block" === H.get(this._startTimeMenu, "display")
                      ? H.set(this._startTimeMenu, "display", "none")
                      : (H.set(this._startTimeMenu, "display", "block"),
                        this[
                          "now" === this.startTime
                            ? "_startTimeMenuLeaveNow"
                            : "none" === this.startTime
                            ? "_startTimeMenuNone"
                            : "_startTimeMenuDepartAt"
                        ].focus());
                  })
                )
              );
              this.own(t(this._startTimeMenuLeaveNow, "blur", a));
              this.own(t(this._startTimeMenuDepartAt, "blur", a));
              this.own(t(this._startTimeMenuNone, "blur", a));
              this.own(
                t(
                  this._startTimeMenuLeaveNow,
                  "mousedown",
                  k.hitch(this, function () {
                    this.startTime = "now";
                    this._updateStartTimeUI();
                    this._clearDisplayBeforeSolve();
                  })
                )
              );
              this.own(
                t(
                  this._startTimeMenuDepartAt,
                  "mousedown",
                  k.hitch(this, function () {
                    this.startTime = new Date().getTime();
                    this._updateStartTimeUI();
                    this._clearDisplayBeforeSolve();
                  })
                )
              );
              this.own(
                t(
                  this._startTimeMenuNone,
                  "mousedown",
                  k.hitch(this, function () {
                    this.startTime = "none";
                    this._updateStartTimeUI();
                    this._clearDisplayBeforeSolve();
                  })
                )
              );
              this._symbolEventPaddingDirections = new oa()
                .setColor(new O([0, 255, 0, 0]))
                .setWidth(20)
                .setCap(oa.CAP_ROUND);
              this._stopLayer = new pa({
                id: "directions_stopLayer_" + this.id,
                displayOnPan: !0,
              });
              this._routeLayer = new pa({
                id: "directions_routeLayer_" + this.id,
                displayOnPan: !0,
              });
              this._waypointsEventLayer = new pa({
                id: "directions_waypointsEventLayer_" + this.id,
                displayOnPan: !0,
              });
              this._barriersLayer = new pa({
                id: "directions_barriersLayer_" + this.id,
                displayOnPan: !0,
              });
              this._polylineBarriersLayer = new pa({
                id: "directions_polylineBarriersLayer_" + this.id,
                displayOnPan: !0,
              });
              this._polygonBarriersLayer = new pa({
                id: "directions_polygonBarriersLayer_" + this.id,
                displayOnPan: !0,
              });
              this._barriersLayer.setRenderer(this.defaults.barrierRenderer);
              this._polylineBarriersLayer.setRenderer(
                this.defaults.polylineBarrierRenderer
              );
              this._polygonBarriersLayer.setRenderer(
                this.defaults.polygonBarrierRenderer
              );
              this.map &&
                (this.map.addLayer(this._routeLayer),
                this.map.addLayer(this._polygonBarriersLayer),
                this.map.addLayer(this._polylineBarriersLayer),
                this.map.addLayer(this._barriersLayer),
                this.map.addLayer(this._stopLayer),
                (this._externalTimeExtent = this.map.timeExtent));
              this._snappingManager = this.map.enableSnapping({
                layerInfos: [
                  {
                    layer: this._waypointsEventLayer,
                    snapToVertex: !1,
                    snapToPoint: !0,
                    snapToEdge: !0,
                  },
                ],
                tolerance: 15,
              });
              this._setWidgetProperties();
              var b = new u(null, this.waypointSymbol, {});
              a = k.hitch(this, function () {
                this._moveInProgress ||
                  this._solveInProgress ||
                  !b._isShown() ||
                  (this.editToolbar.deactivate(),
                  this._stopLayer.remove(b),
                  clearTimeout(b._solveTimeout),
                  (b._solveTimeout = null),
                  (b.attributes.isWaypoint = !0),
                  b._isStopIcon &&
                    this.stopGraphics[b._index] &&
                    (this._stopLayer.add(this.stopGraphics[b._index]),
                    this._stopLayer.add(this.textGraphics[b._index])));
                b._showTooltip();
              });
              this._handle = k.mixin(b, {
                _isHandle: !0,
                _tooltip: F.create(
                  "div",
                  {
                    className: this.theme + " esriDirectionsRouteTooltip",
                    onmouseover: a,
                  },
                  this.map.container
                ),
                _showTooltip: k.hitch(this, function (h) {
                  b._tooltip.style.display =
                    !h || h instanceof MouseEvent ? "none" : "inline";
                  h &&
                    ((h =
                      "string" === typeof h
                        ? h
                        : "\x3ctable class\x3d'esriRoutesTooltip'\x3e" +
                          this._renderDirectionsItemTR(h) +
                          "\x3c/table\x3e"),
                    b._tooltip.innerHTML !== h && (b._tooltip.innerHTML = h));
                }),
                _isShown: k.hitch(this, function () {
                  return -1 < U.indexOf(this._stopLayer.graphics, b);
                }),
                _remove: a,
              });
              this._activate(this.mapClickActive);
            },
            startup: function () {
              this.inherited(arguments);
              return this._enqueue(this._init);
            },
            destroy: function () {
              this.deactivate();
              this.map.removeLayer(this._barriersLayer);
              this.map.removeLayer(this._polylineBarriersLayer);
              this.map.removeLayer(this._polygonBarriersLayer);
              this.map.removeLayer(this._routeLayer);
              this.map.removeLayer(this._stopLayer);
              this.map.removeLayer(this._waypointsEventLayer);
              this._disconnectEvents();
              F.empty(this.domNode);
              this.inherited(arguments);
            },
            activate: function () {
              return this._enqueue(function () {
                this.deactivateBarrierTool().then(
                  k.hitch(this, function () {
                    this.set("mapClickActive", !0);
                  })
                );
              });
            },
            deactivate: function () {
              return this._enqueue(function () {
                this.deactivateBarrierTool().then(
                  k.hitch(this, function () {
                    this.set("mapClickActive", !1);
                  })
                );
              });
            },
            activateBarrierTool: function () {
              return this._enqueue(function () {
                this.set("mapClickActive", !1);
                this.set("barrierToolActive", !0);
              });
            },
            deactivateBarrierTool: function () {
              return this._enqueue(function () {
                this.set("mapClickActive", !1);
                this.set("barrierToolActive", !1);
              });
            },
            clearDirections: function () {
              return this._enqueue(function () {
                this.clearMessages();
                return this._clearDirections();
              });
            },
            reset: function () {
              return this._enqueue(this._reset);
            },
            modifyStopSequence: function (a, b) {
              return this._enqueue(function () {
                return this._modifyStopSequence(a, b);
              });
            },
            onActivate: function () {},
            onDeactivate: function () {},
            onActivateBarrierTool: function () {},
            onDeactivateBarrierTool: function () {},
            onLoad: function () {
              this._enableButton(this._getDirectionsButtonNode);
            },
            onDirectionsStart: function () {
              this._clearDisplayBeforeSolve();
              this.set("solving", !0);
              this._showLoadingSpinner(!0);
            },
            onDirectionsFinish: function () {
              this._showLoadingSpinner(!1);
              this.set("solving", !1);
            },
            onDirectionsClear: function () {},
            onSegmentSelect: function () {},
            onSegmentHighlight: function () {},
            onStopsUpdate: function () {},
            onRouteItemCreated: function () {},
            onRouteItemUpdated: function () {},
            onFeatureCollectionCreated: function () {},
            onError: function () {},
            removeStops: function () {
              return this.reset();
            },
            removeStop: function (a, b, h) {
              return this._enqueue(function () {
                this.clearMessages();
                return this._removeStop(a, b, h);
              });
            },
            updateStops: function (a) {
              return this._enqueue(function () {
                return this._updateStops(a);
              });
            },
            addStops: function (a, b) {
              return this._enqueue(function () {
                return this._addStops(a, b);
              }).then(k.hitch(this, this.zoomToFullRoute));
            },
            addStop: function (a, b) {
              return this._enqueue(
                function () {
                  return this._addStop(a, b);
                },
                { _incrementalSolveStopRange: this._incrementalSolveStopRange }
              );
            },
            updateStop: function (a, b, h) {
              return this._enqueue(
                function () {
                  return this._updateStop(a, b, h);
                },
                { _incrementalSolveStopRange: this._incrementalSolveStopRange }
              );
            },
            setBarriers: function (a) {
              this.routeParams.barriers = a;
              return this._getDirections().then(
                k.hitch(this, function () {
                  this.zoomToFullRoute();
                })
              );
            },
            setPolylineBarriers: function (a) {
              this.routeParams.polylineBarriers = a;
              return this._getDirections().then(
                k.hitch(this, function () {
                  this.zoomToFullRoute();
                })
              );
            },
            setPolygonBarriers: function (a) {
              this.routeParams.polygonBarriers = a;
              return this._getDirections().then(
                k.hitch(this, function () {
                  this.zoomToFullRoute();
                })
              );
            },
            clearMessages: function () {
              this.messages = [];
              this._msgNode && (this._msgNode.innerHTML = "");
            },
            getDirections: function (a) {
              return this._enqueue(function () {
                return this._getDirections().then(
                  k.hitch(this, function () {
                    !0 !== a && this.zoomToFullRoute();
                  })
                );
              });
            },
            selectSegment: function (a) {
              if (
                !(
                  !this.directions ||
                  !this.directions.features ||
                  0 > a ||
                  a >= this.directions.features.length
                )
              )
                for (
                  var b = M("[data-segment]", this._resultsNode), h = 0;
                  h < b.length;
                  h++
                ) {
                  var w = parseInt(Q.get(b[h], "data-segment"), 10);
                  if (a === w && b[h] !== this._focusedDirectionsItem) {
                    this._focusedDirectionsItem = b[h];
                    this.centerAtSegmentStart(a);
                    this.onSegmentSelect(this.directions.features[a]);
                    b[h].focus();
                    break;
                  }
                }
            },
            unhighlightSegment: function (a) {
              var b = this._segmentGraphics;
              if (b && (!this._focusedDirectionsItem || a)) {
                for (a = 0; a < b.length; a++) this._routeLayer.remove(b[a]);
                this._segmentGraphics = [];
              }
            },
            highlightSegment: function (a, b) {
              if (
                !(
                  (this._focusedDirectionsItem && !b) ||
                  a >= this.directions.features.length
                )
              ) {
                a = a || 0;
                var h = k.hitch(this, function (ta) {
                    var sa = this.map.toMap({ x: 0, y: 0 });
                    return this.map.toScreen(sa.offset(ta, 0)).x;
                  }),
                  w = k.hitch(this, function (ta) {
                    for (var sa = 0, Ca = 0; Ca < ta.length; Ca++)
                      for (var Ha = 1; Ha < ta[Ca].length; Ha++) {
                        var Qa = ta[Ca][Ha - 1],
                          La = ta[Ca][Ha];
                        sa += h(
                          Math.sqrt(
                            (Qa[0] - La[0]) * (Qa[0] - La[0]) +
                              (Qa[1] - La[1]) * (Qa[1] - La[1])
                          )
                        );
                      }
                    return sa;
                  }),
                  r = k.hitch(this, function (ta) {
                    var sa = this.map.toMap({ x: 0, y: 0 });
                    return this.map.toMap({ x: ta, y: 0 }).x - sa.x;
                  }),
                  K = function (ta, sa, Ca) {
                    sa = Math.max(1, sa);
                    for (
                      var Ha = Ca ? ta[0].length - 1 : 0,
                        Qa = 0,
                        La,
                        Ja,
                        Ga,
                        za = [[ta[0][Ca ? Ha : 0]]];
                      (Ca && 0 < Ha) || (!Ca && Ha < ta[0].length - 1);

                    ) {
                      Ja = ta[0][Ca ? Ha - 1 : Ha];
                      Ga = ta[0][Ca ? Ha : Ha + 1];
                      if (
                        (La = h(
                          Math.sqrt(
                            (Ja[0] - Ga[0]) * (Ja[0] - Ga[0]) +
                              (Ja[1] - Ga[1]) * (Ja[1] - Ga[1])
                          )
                        ))
                      )
                        if (Qa + La < sa)
                          Ca ? za[0].splice(0, 0, Ja) : za[0].push(Ga),
                            (Qa += La);
                        else {
                          sa = (sa - Qa) / La;
                          Ca
                            ? za[0].splice(0, 0, [
                                Ga[0] - (Ga[0] - Ja[0]) * sa,
                                Ga[1] - (Ga[1] - Ja[1]) * sa,
                              ])
                            : za[0].push([
                                Ja[0] + (Ga[0] - Ja[0]) * sa,
                                Ja[1] + (Ga[1] - Ja[1]) * sa,
                              ]);
                          break;
                        }
                      Ha += Ca ? -1 : 1;
                    }
                    return 0 < Qa + La ? za : ta;
                  };
                b = this.get("directions").features[a];
                var S = new P(b.geometry),
                  W = (40 * Math.PI) / 180;
                k.mixin(b.attributes, { _index: a });
                if (a) {
                  var Y = K(
                      this.get("directions").features[a - 1].geometry.paths,
                      25,
                      !0
                    ),
                    fa =
                      "esriDMTStop" !== b.attributes.maneuverType
                        ? K(S.paths, 25, !1)
                        : Y;
                  Y = fa !== Y ? [Y[0].concat(fa[0])] : fa;
                  var ha = new P(fa).getExtent();
                  if (
                    1 < fa[0].length &&
                    15 <= h(Math.max(ha.getWidth(), ha.getHeight()))
                  ) {
                    K = 15 * Math.cos(W / 2);
                    w = 15 * Math.sin(W / 2);
                    var ma = fa[0].length - 2;
                    W = fa[0][ma + 1];
                    for (ha = 0; 0 <= ma && !ha; ) {
                      var na = fa[0][ma];
                      ha = h(
                        Math.sqrt(
                          (na[0] - W[0]) * (na[0] - W[0]) +
                            (na[1] - W[1]) * (na[1] - W[1])
                        )
                      );
                      ma--;
                    }
                    22 > ha &&
                      ((fa = ha + (22 - ha) / 3),
                      (ma = ha + (2 * (22 - ha)) / 3),
                      (ma = [
                        na[0] + (ma / ha) * (W[0] - na[0]),
                        na[1] + (ma / ha) * (W[1] - na[1]),
                      ]),
                      (na = [
                        W[0] - (fa / ha) * (W[0] - na[0]),
                        W[1] - (fa / ha) * (W[1] - na[1]),
                      ]),
                      (W = ma),
                      (ha = 22));
                    K /= ha;
                    fa = [W[0] - (W[0] - na[0]) * K, W[1] - (W[1] - na[1]) * K];
                    na[1] !== W[1]
                      ? ((K = (W[0] - na[0]) / (W[1] - na[1])),
                        (na = r(w / Math.sqrt(1 + K * K))),
                        (r = K * na))
                      : ((na = 0), (r = r(w)));
                    Infinity === Math.abs(na) ||
                      Infinity === Math.abs(r) ||
                      isNaN(na) ||
                      isNaN(r) ||
                      (Y[0].push(W),
                      Y[0].push([fa[0] - na, fa[1] + r]),
                      Y[0].push([fa[0] + na, fa[1] - r]),
                      Y[0].push(W));
                  } else Y = K(Y, 2 * w(fa), !0);
                  S.paths = Y;
                }
                this.unhighlightSegment(
                  this._segmentGraphics && this._segmentGraphics.length
                );
                r = k
                  .clone(this.routeSymbol)
                  .setWidth(this.segmentSymbol.width)
                  .setColor(
                    new O([
                      parseInt(0.9 * this.segmentSymbol.color.r),
                      parseInt(0.9 * this.segmentSymbol.color.g),
                      parseInt(0.9 * this.segmentSymbol.color.b),
                    ])
                  );
                this._segmentGraphics = [
                  new u(
                    b.geometry,
                    r,
                    b.attributes,
                    this.get("segmentInfoTemplate")
                  ),
                  new u(
                    S,
                    this.routeSymbol,
                    b.attributes,
                    this.get("segmentInfoTemplate")
                  ),
                  new u(
                    S,
                    this.segmentSymbol,
                    b.attributes,
                    this.get("segmentInfoTemplate")
                  ),
                ];
                this.get("showSegmentHighlight") &&
                  (this._routeLayer.add(this._segmentGraphics[0]),
                  this._routeLayer.add(this._segmentGraphics[1]),
                  this._routeLayer.add(this._segmentGraphics[2]));
                b = k.hitch(this, function (ta) {
                  if (0 < ta && ta < this.directions.features.length) {
                    ta =
                      this.directions.features[ta]
                        ._associatedFeaturesWithWaypoints;
                    for (var sa = 0; sa < ta.length; sa++)
                      ta[sa]._associatedSnapFeature &&
                        ta[sa]._associatedSnapFeature.getDojoShape() &&
                        ta[sa]._associatedSnapFeature
                          .getDojoShape()
                          .moveToFront();
                  }
                });
                b(a - 1);
                b(a);
                this.onSegmentHighlight(this.directions.features[a]);
              }
            },
            zoomToSegment: function (a) {
              var b = new x();
              if (this.directions && this.directions.features) {
                var h = Math.max(
                  0,
                  Math.min(this.directions.features.length - 1, a || 0)
                );
                this.map
                  .setExtent(
                    this.get("directions").features[h].geometry.getExtent(),
                    !0
                  )
                  .promise.always(
                    k.hitch(this, function () {
                      this.highlightSegment(h);
                      b.resolve();
                    })
                  );
              } else b.reject(Error("No directions."));
              return b.promise;
            },
            centerAtSegmentStart: function (a) {
              var b = new x();
              if (this.directions && this.directions.features) {
                var h = Math.max(
                  0,
                  Math.min(this.directions.features.length - 1, a || 0)
                );
                var w = this.directions.features[h];
                this.map.centerAt(w.geometry.getPoint(0, 0)).promise.always(
                  k.hitch(this, function () {
                    this.highlightSegment(h, !0);
                    this._showSegmentPopup(w, h);
                    b.resolve();
                  })
                );
              } else b.reject(Error("No directions."));
              return b.promise;
            },
            zoomToFullRoute: function () {
              var a = new x();
              this.directions && this.directions.features
                ? (this._clearInfoWindow(),
                  this.unhighlightSegment(),
                  this.get("map")
                    .setExtent(this.get("directions").extent, !0)
                    .promise.always(a.resolve))
                : a.resolve();
              return a.promise;
            },
            setListIcons: function () {
              var a,
                b = this._dnd.getAllNodes();
              for (a = 0; a < b.length; a++) {
                var h = M("." + this._css.stopIconClass, b[a])[0];
                h && (h.innerHTML = this._getLetter(a));
                T.remove(
                  b[a],
                  this._css.stopOriginClass +
                    " " +
                    this._css.stopDestinationClass +
                    " " +
                    this._css.stopUnreachedClass +
                    " " +
                    this._css.stopUnreachedFirstOrLastClass
                );
                h = this._getStopSymbol(this.stops[a]);
                h === this.fromSymbol
                  ? T.add(b[a], this._css.stopOriginClass)
                  : h === this.toSymbol
                  ? T.add(b[a], this._css.stopDestinationClass)
                  : h === this.unreachedSymbol &&
                    T.add(b[a], this._css.stopUnreachedClass);
              }
              a = M("[data-reverse-td]", this._dndNode)[0];
              F.destroy(a);
              this.get("showReverseStopsButton") &&
                F.create(
                  "td",
                  {
                    "data-reverse-td": "true",
                    rowspan: b.length,
                    className: this._css.esriStopReverseColumnClass,
                    innerHTML:
                      '\x3cdiv role\x3d"button" class\x3d"' +
                      this._css.reverseStopsClass +
                      '" data-reverse-stops\x3d"true" title\x3d"' +
                      G.widgets.directions.reverseDirections +
                      '"\x3e\x3c/div\x3e',
                    onmouseover: function (w) {
                      w.stopPropagation();
                    },
                    onmouseout: function (w) {
                      w.stopPropagation();
                    },
                  },
                  b[0]
                );
            },
            addRouteSymbols: function () {
              if (this.stopGraphics.length) {
                this._moveLayersToFront();
                for (var a = 0; a < this.stopGraphics.length; a++)
                  if (
                    this.stopGraphics[a] &&
                    (!this._handle._isShown() ||
                      (this._handle._isShown() && this._handle._index !== a))
                  ) {
                    this._stopLayer.add(this.stopGraphics[a]);
                    var b = this.stopGraphics[a].getDojoShape();
                    b && b.moveToFront();
                    this._stopLayer.add(this.textGraphics[a]);
                    (b = this.textGraphics[a].getDojoShape()) &&
                      b.moveToFront();
                  }
                this._moveInProgress &&
                  !this._handle.attributes.isWaypoint &&
                  this._handle.getDojoShape() &&
                  this._handle.getDojoShape().moveToFront();
              }
            },
            createRouteSymbols: function () {
              this._clearStopGraphics();
              for (
                var a = this.stops,
                  b = function (W) {
                    var Y = {},
                      fa;
                    for (fa in W)
                      W.hasOwnProperty(fa) &&
                        0 === fa.indexOf("Attr_") &&
                        (Y[fa] = W[fa]);
                    return Y;
                  },
                  h = 0;
                h < a.length;
                h++
              ) {
                var w = a[h];
                if (w && w.feature) {
                  var r = w.feature.attributes,
                    K = r ? r.Status : void 0,
                    S = null;
                  this._isStopAWaypoint(w) ||
                    ((S = new Aa(
                      this._getLetter(h),
                      this.get("textSymbolFont"),
                      this.get("textSymbolColor")
                    )),
                    this.get("textSymbolOffset") &&
                      S.setOffset(
                        this.get("textSymbolOffset").x,
                        this.get("textSymbolOffset").y
                      ));
                  S = new u(
                    w.feature.geometry,
                    S,
                    { address: w.name },
                    this.get("stopsInfoTemplate")
                  );
                  S._isStopLabel = !0;
                  S._index = h;
                  w = new u(
                    w.feature.geometry,
                    this._getStopSymbol(w),
                    k.mixin(
                      {
                        address: w.name,
                        Status: void 0 === K ? 0 : K,
                        CurbApproach:
                          r && r.CurbApproach ? r.CurbApproach : null,
                        TimeWindowStart:
                          r && r.TimeWindowStart ? r.TimeWindowStart : null,
                        TimeWindowEnd:
                          r && r.TimeWindowEnd ? r.TimeWindowEnd : null,
                        isWaypoint: this._isStopAWaypoint(w),
                      },
                      b(r)
                    ),
                    this.get(
                      this._isStopAWaypoint(w)
                        ? "waypointInfoTemplate"
                        : "stopsInfoTemplate"
                    )
                  );
                  w._isStopIcon = !0;
                  w._index = h;
                  this.stopGraphics[h] = w;
                  this.textGraphics[h] = S;
                }
              }
              this.set("stopGraphics", this.stopGraphics);
              this.set("textGraphics", this.textGraphics);
              this._showBarriers();
              this.addRouteSymbols();
              this.setListIcons();
            },
            setTravelMode: function (a) {
              return this._enqueue(function () {
                this.clearMessages();
                this._travelModeSelector.setValue(a);
                return this._setTravelMode(a);
              });
            },
            getSupportedTravelModeNames: function () {
              var a = [],
                b = this.serviceDescription;
              if (
                b &&
                b.supportedTravelModes &&
                b.supportedTravelModes.length
              ) {
                b = b.supportedTravelModes;
                for (var h = 0; h < b.length; h++) a.push(b[h].name);
              }
              return a;
            },
            setDirectionsLengthUnits: function () {
              var a =
                1 === arguments.length
                  ? arguments[0]
                  : this.get("directionsLengthUnits");
              return this._enqueue(function () {
                this.clearMessages();
                return this._setDirectionsLengthUnits(a);
              });
            },
            setDirectionsLanguage: function () {
              var a =
                1 === arguments.length
                  ? arguments[0]
                  : this.get("directionsLanguage");
              return this._enqueue(function () {
                this.clearMessages();
                return this._setDirectionsLanguage(a);
              });
            },
            useMyCurrentLocation: function (a) {
              this.clearMessages();
              return this._createLocateButton(this.geocoders[a], !0, !0);
            },
            loadRoute: function (a) {
              return this._enqueue(
                k.hitch(this, function () {
                  return this._loadRoute(a);
                })
              );
            },
            _getStopsAttr: function () {
              return this.returnToStart && this._returnToStartStop
                ? this.stops.concat(this._returnToStartStop)
                : this.stops;
            },
            _getTravelModeNameAttr: function () {
              return (
                this.routeParams &&
                this.routeParams.travelMode &&
                this.routeParams.travelMode.name
              );
            },
            _reset: function () {
              var a = this.mapClickActive || this.barrierToolActive;
              this._clearBarriersGraphics();
              this._setWidgetProperties();
              return this._init().then(
                k.hitch(this, function () {
                  this.mapClickActive = !a;
                  this.set("mapClickActive", a);
                  this._searchSourceSelector &&
                    this._searchSourceSelector.setValue("all");
                })
              );
            },
            _activate: function () {
              var a = this.get("mapClickActive"),
                b = k.hitch(this, function (h) {
                  for (
                    var w = h
                        ? [
                            this.textGraphics,
                            this.stopGraphics,
                            this.displayedManeuverPointGraphics,
                            this.displayedRouteGraphics,
                          ]
                        : [
                            this.displayedRouteGraphics,
                            this.displayedManeuverPointGraphics,
                            this.stopGraphics,
                            this.textGraphics,
                          ],
                      r = 0;
                    r < w.length;
                    r++
                  )
                    for (var K = w[r], S = 0; S < K.length; S++) {
                      var W = K[S].getDojoShape();
                      W && W[h ? "moveToBack" : "moveToFront"].call(W);
                    }
                });
              this.drawToolbar &&
                ((this.barrierToolActive = !1),
                this.drawToolbar.deactivate(),
                T.remove(
                  this._lineBarrierButtonNode,
                  this._css.stopsPressedButtonClass
                ));
              this._addStopOnMapClickListener &&
                this._addStopOnMapClickListener.remove();
              a
                ? (this.map.activeDirectionsWidget &&
                    this.map.activeDirectionsWidget !== this &&
                    this.map.activeDirectionsWidget.deactivate(),
                  (this.map.activeDirectionsWidget = this),
                  (this._addStopOnMapClickListener = t(
                    this.map,
                    "click",
                    k.hitch(this, function (h) {
                      this.canModifyStops &&
                        !this._solveInProgress &&
                        (this.map.infoWindow.hide(),
                        this.addStop(new u(h.mapPoint)));
                    })
                  )),
                  this.map.addLayer(this._waypointsEventLayer),
                  this._moveLayersToFront(),
                  T.add(
                    this._activateButtonNode,
                    this._css.stopsPressedButtonClass
                  ),
                  this.onActivate())
                : (this.map.removeLayer(this._waypointsEventLayer),
                  T.remove(
                    this._activateButtonNode,
                    this._css.stopsPressedButtonClass
                  ),
                  this.onDeactivate());
              b(!a);
              this.emit("map-click-active", {
                mapClickActive: this.mapClickActive,
              });
            },
            _activateBarrierTool: function () {
              this.get("barrierToolActive")
                ? (this.map.activeDirectionsWidget &&
                    this.map.activeDirectionsWidget !== this &&
                    this.map.activeDirectionsWidget.deactivate(),
                  (this.map.activeDirectionsWidget = this),
                  this.drawToolbar.activate(Za.FREEHAND_POLYLINE),
                  T.add(
                    this._lineBarrierButtonNode,
                    this._css.stopsPressedButtonClass
                  ),
                  this.onActivateBarrierTool())
                : (this.drawToolbar.deactivate(),
                  T.remove(
                    this._lineBarrierButtonNode,
                    this._css.stopsPressedButtonClass
                  ),
                  this.onDeactivateBarrierTool());
              this.emit("barrier-tool-active", {
                barrierToolActive: this.barrierToolActive,
              });
            },
            _moveLayersToFront: function () {
              var a = this.get("map"),
                b = a.graphicsLayerIds.length - 1;
              a.reorderLayer(this._routeLayer, b);
              a.reorderLayer(this._polygonBarriersLayer, b);
              a.reorderLayer(this._polylineBarriersLayer, b);
              a.reorderLayer(this._barriersLayer, b);
              a.reorderLayer(this._waypointsEventLayer, b);
              a.reorderLayer(this._stopLayer, b);
            },
            _destroyGeocoders: function () {
              for (; this.geocoders && this.geocoders.length; ) {
                if (this.geocoders[0])
                  try {
                    this.geocoders[0].destroy();
                  } catch (a) {}
                this.geocoders.splice(0, 1);
              }
              this.geocoders = [];
            },
            _disconnectEvents: function () {
              var a = this._clearDirections(!0),
                b;
              if (this._watchEvents && this._watchEvents.length)
                for (b = 0; b < this._watchEvents.length; b++)
                  this._watchEvents[b].unwatch();
              if (this._onEvents && this._onEvents.length)
                for (b = 0; b < this._onEvents.length; b++)
                  this._onEvents[b].remove();
              if (this._geocoderEvents)
                for (b = 0; b < this._geocoderEvents.length; b++)
                  this._geocoderEvents[b].value.unwatch(),
                    this._geocoderEvents[b].blur.remove(),
                    this._geocoderEvents[b].select.remove(),
                    this._geocoderEvents[b].suggest.remove();
              this._onEvents = [];
              this._watchEvents = [];
              this._geocoderEvents = [];
              this._disconnectResults();
              this._destroyGeocoders();
              this._destroyGlobalGeocoder();
              this._destroyDnD();
              return a;
            },
            _getDirections: function () {
              var a = new x();
              this._removeEmptyStops();
              1 < this._getStopCount() + this._getWaypointCount() && this.loaded
                ? (this.onDirectionsStart(),
                  this.clearMessages(),
                  this._dnd.sync(),
                  this._sortGeocoders(),
                  this._getCandidates(this.stops).then(
                    k.hitch(this, function (b) {
                      this.stops = b;
                      this._setStops();
                      this._configureRoute().always(
                        k.hitch(this, function (h) {
                          a.resolve(h);
                        })
                      );
                    }),
                    k.hitch(this, function (b) {
                      this.set("directions", null);
                      this._clearRouteGraphics();
                      a.reject(b);
                      this.onDirectionsFinish(b);
                    })
                  ))
                : this._clearDirections(!0).always(
                    k.hitch(this, function () {
                      this.createRouteSymbols();
                      a.resolve();
                    })
                  );
              return a.promise;
            },
            _clearDirections: function () {
              var a = new x();
              this._handle && this._handle._remove();
              this.get("routeParams") && this.get("routeParams").stops
                ? this.get("routeParams").stops.features.length
                  ? ((this.get("routeParams").stops.features = []),
                    this.onDirectionsClear(),
                    a.resolve())
                  : arguments.length
                  ? a.resolve()
                  : this._reset().then(a.resolve, a.reject)
                : a.resolve();
              this.set("directions", null);
              this._clearDisplayBeforeSolve();
              this._clearDisplayAfterSolve();
              this._routeLayer.clear();
              this._waypointsEventLayer.clear();
              this._stopLayer.clear();
              return a.promise;
            },
            _setTravelMode: function (a) {
              var b = new x(),
                h = this.serviceDescription,
                w = function () {
                  b.resolve(a);
                };
              if (
                h &&
                h.supportedTravelModes &&
                h.supportedTravelModes.length
              ) {
                var r = h.supportedTravelModes,
                  K = !1;
                for (h = 0; h < r.length; h++)
                  if (r[h].name === a) {
                    K = !0;
                    !this.routeParams.travelMode ||
                    (this.routeParams.travelMode &&
                      this.routeParams.travelMode.name !== a)
                      ? ((this.routeParams.travelMode = r[h]
                          .impedanceAttributeName
                          ? r[h]
                          : r[h].itemId),
                        this._checkStartTimeUIAvailability(),
                        this._solveAndZoom().always(w))
                      : w();
                    this._travelModeSelector &&
                      this._travelModeSelector.domNode &&
                      (this._travelModeSelector.domNode.title =
                        r[h].description);
                    break;
                  }
                K || b.reject(a);
              } else b.reject(a);
              return b.promise;
            },
            _setDirectionsLengthUnits: function (a) {
              this._clearDisplayBeforeSolve();
              var b = new x();
              T.remove(this._useMilesNode, this._css.stopsPressedButtonClass);
              T.remove(
                this._useKilometersNode,
                this._css.stopsPressedButtonClass
              );
              a === V.KILOMETERS
                ? T.add(
                    this._useKilometersNode,
                    this._css.stopsPressedButtonClass
                  )
                : a === V.MILES &&
                  T.add(this._useMilesNode, this._css.stopsPressedButtonClass);
              a === V.KILOMETERS ||
              a === V.METERS ||
              a === V.MILES ||
              a === V.FEET ||
              a === V.YARDS ||
              a === V.NAUTICAL_MILES
                ? ((this.directionsLengthUnits = a), b.resolve(a))
                : b.reject(a);
              return b.promise;
            },
            _setDirectionsLanguage: function (a) {
              this._clearDisplayBeforeSolve();
              var b = new x();
              a = this._setDirectionsLanguageByLocale(a);
              this._solveAndZoom().always(function () {
                b.resolve(a);
              }, b.reject);
              return b.promise;
            },
            _showLoadingSpinner: function (a) {
              void 0 === a &&
                (a =
                  (this._requestQueueTail &&
                    !this._requestQueueTail.isFulfilled()) ||
                  this._moveInProgress);
              a
                ? (T.add(this._widgetContainer, this._css.resultsLoadingClass),
                  T.add(this._resultsNode, "esriRoutesContainerBusy"))
                : (T.remove(
                    this._widgetContainer,
                    this._css.resultsLoadingClass
                  ),
                  T.remove(this._resultsNode, "esriRoutesContainerBusy"));
            },
            _enqueue: function (a, b) {
              var h = new x();
              this._requestQueueTail ||
                ((this._requestQueueTail = new x()),
                this._requestQueueTail.resolve());
              this._requestQueueTail.promise.always(
                k.hitch(this, function () {
                  try {
                    k.mixin(this, { _incrementalSolveStopRange: null }, b);
                    var w = a.call(this);
                    w &&
                    "object" === typeof w &&
                    w.hasOwnProperty("isFulfilled")
                      ? w.then(
                          k.hitch(this, function (r) {
                            h.resolve(r);
                            this._showLoadingSpinner();
                          }),
                          k.hitch(this, function (r) {
                            h.reject(r);
                            this._showLoadingSpinner();
                          })
                        )
                      : (h.resolve(w), this._showLoadingSpinner());
                  } catch (r) {
                    h.reject(r), this._showLoadingSpinner();
                  }
                })
              );
              this._requestQueueTail = h;
              this._showLoadingSpinner();
              return h.promise;
            },
            _createDnD: function () {
              this._dnd = new da(this._dndNode, {
                skipForm: !0,
                withHandles: !0,
              });
            },
            _destroyDnD: function () {
              F.empty(this._dndNode);
              this._dnd && (this._dnd.destroy(), (this._dnd = null));
            },
            _createDepartAtControls: function () {
              if (this._departAtTime)
                this.map && this._restoreMapTimeExtent(),
                  (this._useTrafficItemNode.title =
                    G.widgets.directions.trafficLabelLive),
                  T.remove(this._departAtContainer, "departAtContainerVisible"),
                  (this.startTime = "now"),
                  this._updateStartTimeUI();
              else {
                var a = this,
                  b = function () {
                    this._keepDirections || a._clearDisplayBeforeSolve();
                    this._keepDirections = !1;
                  },
                  h = k.hitch(this, function () {
                    this.map && this.map.disableKeyboardNavigation();
                  }),
                  w = k.hitch(this, function () {
                    this.map && this.map.enableKeyboardNavigation();
                  });
                this._departAtTime = new g(
                  {
                    required: !0,
                    value: new Date(),
                    onChange: b,
                    onFocus: h,
                    onBlur: w,
                  },
                  this._departAtTimeContainer
                );
                this._departAtDate = new z(
                  {
                    required: !0,
                    value: new Date(),
                    onChange: b,
                    onFocus: h,
                    onBlur: w,
                    constraints: { min: new Date(864e5) },
                  },
                  this._departAtDateContainer
                );
              }
            },
            _setStartTime: function (a, b, h) {
              if (isNaN(h)) this.startTime = "now" === h ? h : "none";
              else {
                b = h instanceof Date ? h : new Date(h);
                h =
                  this.directions &&
                  this.directions.features &&
                  this.directions.features[0] &&
                  this.directions.features[0].attributes;
                var w = 6e4 * -b.getTimezoneOffset();
                b = new Date(
                  b - w + (h && h.arriveTimeUTC ? h.ETA - h.arriveTimeUTC : w)
                );
                this._departAtTime._keepDirections = !a;
                this._departAtDate._keepDirections = !a;
                this._departAtTime.setValue(b);
                this._departAtDate.setValue(b);
              }
              this._updateStartTimeUI();
            },
            _checkStartTimeUIAvailability: function () {
              var a = this._getImpedanceAttribute();
              a =
                this._isTimeUnits(a ? a.units : "") ||
                (this.serviceDescription &&
                  10.6 <= this.serviceDescription.currentVersion);
              this._startTimeButtonNode.disabled = !a;
              T[a ? "remove" : "add"].apply(this, [
                this._startTimeButtonNodeContainer,
                "esriLinkButtonDisabled",
              ]);
              T[a ? "remove" : "add"].apply(this, [
                this._startTimeDDLArrow,
                "esriDirectionsDDLArrowDisabled",
              ]);
              a || this.set("startTime", "now");
            },
            _usingAGOL: function (a) {
              a || (a = this.routeTaskUrl);
              return -1 < a.search(/^(https?:)*\/\/*[^.]*\.arcgis\.com.*$/i);
            },
            _usingRouteAGOL: function () {
              return (
                -1 <
                this.get("routeTaskUrl").search(
                  /^(https?:)*\/\/route*[^.]*\.arcgis\.com.*$/i
                )
              );
            },
            _setSearchOptions: function () {
              var a = {
                map: this.get("map"),
                autoNavigate: !1,
                enableInfoWindow: !1,
                enableHighlight: !1,
                enableSourcesMenu: !1,
              };
              this.searchOptions = k.mixin(
                { maxResults: 1, locationToAddressDistance: 100 },
                this.defaults.searchOptions,
                a
              );
            },
            _setDefaultUnits: function () {
              if (!this.get("directionsLengthUnits")) {
                var a =
                  "EN-US" === Z.locale.toUpperCase() ? V.MILES : V.KILOMETERS;
                this.defaults.directionsLengthUnits
                  ? (a = this.defaults.directionsLengthUnits)
                  : this.userOptions.routeParams &&
                    this.userOptions.routeParams.directionsLengthUnits &&
                    (a = this.userOptions.routeParams.directionsLengthUnits);
                this.set("directionsLengthUnits", a);
              }
              this._setDirectionsLengthUnits(this.directionsLengthUnits);
            },
            _setTrafficOptions: function () {
              this._usingRouteAGOL() &&
                !this.trafficLayer &&
                (this.trafficLayer = new qa(
                  Ta +
                    "//traffic.arcgis.com/arcgis/rest/services/World/Traffic/MapServer",
                  { opacity: 0.4 }
                ));
              this.trafficLayer &&
                this.trafficLayer.url &&
                this._usingAGOL(this.trafficLayer.url) &&
                (this._trafficAvailabilityButton.style.display =
                  "inline-block");
              this.set(
                "showTrafficOption",
                (this.defaults.showTrafficOption ||
                  !this.defaults.hasOwnProperty("showTrafficOption")) &&
                  !!this.trafficLayer
              );
              this._optionsMenu();
            },
            _updateCanModifyStops: function (a, b) {
              this.canModifyStops ||
                this.canModifyWaypoints ||
                this.set("mapClickActive", !1);
              b ||
                !this.canModifyStops ||
                this.canModifyWaypoints ||
                this.set("mapClickActive", !0);
              this._showAddDestination();
              this._showMapClickActiveButton();
              this._stopsTableCover.style.display = this.canModifyStops
                ? "none"
                : "inline";
            },
            _updateCanAddWaypoints: function (a, b) {
              this.canModifyStops ||
                this.canModifyWaypoints ||
                this.set("mapClickActive", !1);
              b ||
                this.canModifyStops ||
                !this.canModifyWaypoints ||
                this.set("mapClickActive", !0);
              this._showMapClickActiveButton();
              this._handle._remove();
            },
            _updateStartTimeUI: function () {
              isNaN(this.startTime)
                ? ((this._startTimeButtonLabel.innerHTML =
                    "now" == this.startTime
                      ? this._i18n.widgets.directions.leaveNow
                      : this._i18n.widgets.directions.noStartTime),
                  T.remove(
                    this._startTimeButtonNodeContainer,
                    "departAtButton"
                  ),
                  T.remove(this._departAtContainer, "departAtContainerVisible"))
                : (T.add(this._startTimeButtonNodeContainer, "departAtButton"),
                  T.add(this._departAtContainer, "departAtContainerVisible"),
                  (this._startTimeButtonLabel.innerHTML =
                    this._i18n.widgets.directions.departAt));
            },
            _setWidgetProperties: function () {
              this._disconnectEvents();
              this.set(this.defaults);
              this.routeLayer = k.clone(this.defaults.routeLayer);
              this._folderSelector &&
                (this._outputLayer.setValue(""),
                this._outputLayer.set("disabled", !0),
                this._folderSelector.set("disabled", !0));
              this.set("stops", []);
              this._updateCanModifyStops();
            },
            _updateStops: function (a) {
              var b = new x();
              a
                ? this.get("loaded")
                  ? this._reset().then(
                      k.hitch(this, function () {
                        this._addStops(a).then(b.resolve, b.reject);
                      }),
                      b.reject
                    )
                  : this._addStops(a).then(b.resolve, b.reject)
                : b.reject();
              return b.promise;
            },
            _removeStop: function (a, b, h, w) {
              var r = new x(),
                K = k.hitch(this, function (W) {
                  this.stops.splice(W, 1);
                  var Y = this._dnd.getAllNodes()[W],
                    fa = this.get("geocoders");
                  this._geocoderEvents[Y.id] &&
                    (this._geocoderEvents[Y.id].blur.remove(),
                    this._geocoderEvents[Y.id].select.remove(),
                    this._geocoderEvents[Y.id].suggest.remove(),
                    this._geocoderEvents[Y.id].value.unwatch());
                  fa[W].destroy();
                  fa.splice(W, 1);
                  this.set("geocoders", fa);
                  F.destroy(Y);
                  this._dnd.sync();
                  this._stopsRemovable();
                  this._optionsMenu();
                  this._checkMaxStops();
                  this.setListIcons();
                  this._sortGeocoders();
                });
              if (0 > a || a >= this.stops.length || void 0 === a)
                a = this.stops.length - 1;
              var S = !1;
              for (
                w =
                  (this.stopGraphics[a] &&
                    this._isStopAWaypoint(this.stops[a])) ||
                  w;
                !S;

              )
                K(a),
                  w
                    ? (S = !0)
                    : ((a -=
                        0 >= a ||
                        (a < this.stops.length &&
                          this._isStopAWaypoint(this.stops[a]))
                          ? 0
                          : 1),
                      (S = !this._isStopAWaypoint(this.stops[a])));
              for (
                ;
                this.stops.length - this._getWaypointCount() < this.minStops;

              )
                this._addStop();
              this._clearStopsStatusAttr();
              this._setStops();
              this.createRouteSymbols();
              h
                ? (this._clearDisplayBeforeSolve(),
                  this._clearDisplayAfterSolve(),
                  this.createRouteSymbols(),
                  r.resolve())
                : this._solveAndZoom(b).then(r.resolve, r.reject);
              return r.promise;
            },
            _removeTrafficLayer: function () {
              this.trafficLayer &&
                this.map &&
                this.map.removeLayer(this.trafficLayer);
              this._trafficLayerAdded = !1;
            },
            _addStops: function (a, b) {
              var h = new x(),
                w = [],
                r = this.autoSolve;
              this.autoSolve = !1;
              void 0 === b && (b = this._getStopCount());
              for (
                var K = 0;
                K < Math.min(a.length, this.maxStops - this._getStopCount());
                K++
              ) {
                var S = new x();
                this._addStop(a[K], b + K, !0).always(S.resolve);
                w.push(S);
              }
              X(w).always(
                k.hitch(this, function () {
                  this.autoSolve = r;
                  this._getDirections().always(function () {
                    h.resolve(a);
                  });
                })
              );
              return h.promise;
            },
            _addStop: function (a, b, h) {
              var w = new x();
              this._checkMaxStops();
              this.maxStopsReached
                ? (this._showMessage(G.widgets.directions.error.maximumStops),
                  w.reject(Error(G.widgets.directions.error.maximumStops)))
                : (void 0 === a && void 0 === b && (b = this.stops.length),
                  a instanceof u &&
                  a.attributes &&
                  a.attributes.isWaypoint &&
                  (!b || b === this.stops.length || 2 > this._getStopCount()) &&
                  !h
                    ? (this._showMessage(
                        G.widgets.directions.error
                          .waypointShouldBeInBetweenStops
                      ),
                      w.reject(
                        Error(
                          G.widgets.directions.error
                            .waypointShouldBeInBetweenStops
                        )
                      ))
                    : this._getCandidate(a).then(
                        k.hitch(this, function (r) {
                          this._isStopAWaypoint(r) &&
                            r &&
                            r.feature &&
                            (r.feature.attributes = k.mixin(
                              {},
                              r.feature.attributes,
                              { isWaypoint: !0, CurbApproach: 3 }
                            ));
                          this._insertStop(r, b);
                          this.autoSolve && "" !== r.name
                            ? this._getDirections().always(function () {
                                w.resolve(r, b);
                              })
                            : w.resolve(r, b);
                        }),
                        k.hitch(this, function (r) {
                          w.reject(r);
                        })
                      ));
              return w.promise;
            },
            _removeEmptyStops: function () {
              for (
                var a = 0,
                  b =
                    this.stops.length -
                    this._getWaypointCount() -
                    this.minStops;
                a < this.stops.length && 0 < b;

              )
                this.stops[a] && this.stops[a].name
                  ? a++
                  : (this._removeStop(a, !0, !0, !0),
                    b--,
                    this._moveInProgress &&
                      this._handle._index >= a &&
                      this._handle._isStopIcon &&
                      this._handle._index--);
            },
            _setReverseGeocode: function (a, b, h) {
              if (a.feature.geometry && -1 < h) {
                var w = { address: a.name };
                this.stopGraphics[h] &&
                  (k.mixin(this.stopGraphics[h].attributes, w),
                  this.stopGraphics[h].setGeometry(b));
                this.textGraphics[h] &&
                  (k.mixin(this.textGraphics[h].attributes, w),
                  this.textGraphics[h].setGeometry(b));
                this.set("stopGraphics", this.stopGraphics);
                this.set("textGraphics", this.textGraphics);
                (w = this.geocoders[h]) &&
                  w.inputNode &&
                  ((w.value = a.name), (w.inputNode.value = a.name));
                k.mixin(a.feature.attributes, this.stops[h].feature.attributes);
                this.stops[h] = a;
                this.stops[h].feature.setGeometry(b);
                this._setStops();
                return this._enqueue(function () {
                  return this._getDirections();
                });
              }
            },
            _insertStop: function (a, b) {
              var h;
              if (void 0 === b)
                for (h = 0; h < this.geocoders.length; h++) {
                  if (!this.geocoders[h].get("value")) {
                    var w = this.geocoders[h];
                    break;
                  }
                }
              else
                (h = b),
                  this.geocoders[h] &&
                    !this.geocoders[h].get("value") &&
                    (w = this.geocoders[h]);
              !w || (void 0 !== b && b !== h) || this._isStopAWaypoint(a)
                ? (void 0 === b && (b = this.geocoders.length),
                  this.stops.splice(b, 0, a),
                  this._createGeocoder(a, b))
                : ((this.stops[h] = a),
                  w.set("value", a.name),
                  (w._stopReference = a));
              this._optionsMenu();
            },
            _createGeocoder: function (a, b) {
              var h = this._dnd.getAllNodes(),
                w = !1,
                r = !1,
                K = h.length;
              h[b] ? ((r = h[b]), (w = !0)) : (w = r = !1);
              var S = k.hitch(this, function (ha, ma) {
                  var na = ma
                      ? this._css.stopDnDHandleClass
                      : this._css.stopDnDHandleClassHidden,
                    ta = ma
                      ? this._css.stopDnDHandleClassHidden
                      : this._css.stopDnDHandleClass;
                  T.replace(ha.children[0], na, ta);
                  2 < this.geocoders.length &&
                    ((na = ma
                      ? this._css.stopIconRemoveClass
                      : this._css.stopIconRemoveClassHidden),
                    (ta = ma
                      ? this._css.stopIconRemoveClassHidden
                      : this._css.stopIconRemoveClass),
                    T.replace(ha.children[3].children[0], na, ta));
                }),
                W = F.create("tr", {
                  className: this._css.stopClass,
                  style: this._isStopAWaypoint(a) ? "display:none;" : "",
                  onmouseover: function () {
                    S(this, !0);
                  },
                  onmouseout: function () {
                    S(this, !1);
                  },
                });
              F.create(
                "td",
                {
                  className:
                    this._css.stopDnDHandleClassHidden + " dojoDndHandle",
                },
                W
              );
              h = F.create(
                "td",
                { className: this._css.stopIconColumnClass },
                W
              );
              F.create(
                "div",
                {
                  className: this._css.stopIconClass + " dojoDndHandle",
                  innerHTML: this._getLetter(K),
                  "data-center-at": "true",
                },
                h
              );
              K = F.create(
                "td",
                { className: this._css.esriStopGeocoderColumnClass },
                W
              );
              K = F.create("div", {}, K);
              h = F.create(
                "td",
                { className: this._css.stopIconRemoveColumnClass },
                W
              );
              F.create(
                "div",
                {
                  className: this._css.stopIconRemoveClassHidden,
                  role: "button",
                  "data-remove": "true",
                },
                h
              );
              this._dnd.insertNodes(!1, [W], w, r);
              w = k.mixin({}, this.get("searchOptions"), {
                value: a.name,
                activeSourceIndex: this._globalGeocoder.activeSourceIndex,
              });
              var Y = new ab(w, K),
                fa = k.hitch(this, function (ha, ma) {
                  this._enqueue(function () {
                    if (
                      ma !== ha &&
                      Y._stopReference &&
                      Y._stopReference.name !== ma
                    ) {
                      var na = U.indexOf(this.stops, Y._stopReference);
                      this.stops[na] = { name: ma };
                      this._handle._remove();
                      this._removeSomeWaypoints(
                        this._markWPsForRemovalAfterUserChangedStopSequence(na)
                      );
                      this._setStops();
                      this._clearDisplayBeforeSolve();
                      this._clearDisplayAfterSolve();
                      this.createRouteSymbols();
                    }
                  });
                });
              Y._tr = W;
              Y._stopReference = a;
              Y.startup();
              this.geocoders.splice(b, 0, Y);
              this._geocoderEvents[W.id] = {
                blur: Y.on("blur", function () {
                  "" !== this.value &&
                    this._stopReference &&
                    !this._stopReference.feature &&
                    this.search();
                }),
                select: Y.on(
                  "select-result",
                  k.hitch(this, function (ha) {
                    var ma = !0;
                    if (ha && (ha.results || ha.result)) {
                      var na = this._dnd.getAllNodes();
                      na = U.indexOf(na, W);
                      var ta = Y.value,
                        sa =
                          ha.results &&
                          ha.results.results &&
                          ha.results.results.length
                            ? ha.results.results[0]
                            : ha.result;
                      sa
                        ? ((sa.name = ta),
                          (this.stops[na] = this._toPointGeometry(sa)),
                          (this.geocoders[na]._stopReference = this.stops[na]),
                          fa("", ta))
                        : (this.removeStop(na),
                          this.set("directions", null),
                          this._showMessage(
                            G.widgets.directions.error.unknownStop.replace(
                              "\x3cname\x3e",
                              ha.target.get("value")
                            )
                          ),
                          this._clearRouteGraphics(),
                          (ma = !1));
                      ma && this.getDirections();
                    }
                  })
                ),
                suggest: Y.on("suggest-results", function () {
                  if (document.activeElement === this.inputNode)
                    for (
                      var ha = M(
                          "LI[role\x3d'menuitem']",
                          this.suggestionsNode
                        ),
                        ma = 0;
                      ma < ha.length;
                      ma++
                    )
                      Q.set(ha[ma], "tabindex", -1);
                  else this._hideSuggestionsMenu();
                }),
                value: Y.watch("value", function (ha, ma, na) {
                  fa(ma, na);
                }),
              };
              this._checkMaxStops();
              this.setListIcons();
              this._stopsRemovable();
              this._optionsMenu();
              this._sortGeocoders();
            },
            _blurGeocoders: function () {
              if (document.activeElement)
                for (var a = 0; a < this.geocoders.length; a++)
                  if (this.geocoders[a].inputNode === document.activeElement) {
                    this.geocoders[a]._hideSuggestionsMenu();
                    this.geocoders[a].inputNode.blur();
                    1 < this._getStopCount() + this._getWaypointCount() &&
                      this.getDirections(!0);
                    break;
                  }
            },
            _decorateEmptyAGOLGeocoderResponse: function (a) {
              a &&
                ", , " === a.name &&
                (a.name =
                  a.feature &&
                  a.feature.attributes &&
                  a.feature.attributes.Match_addr
                    ? a.feature.attributes.Match_addr +
                      ("POI" === a.feature.attributes.Addr_type &&
                      a.feature.attributes.City &&
                      -1 ===
                        a.feature.attributes.Match_addr.indexOf(
                          a.feature.attributes.City
                        )
                        ? ", " + a.feature.attributes.City
                        : "")
                    : "");
              return a;
            },
            _toPointGeometry: function (a) {
              var b = a.feature.geometry;
              b &&
                (b.getCentroid
                  ? (a.feature.geometry = b.getCentroid())
                  : b.getExtent &&
                    (b = b.getExtent()) &&
                    (a.feature.geometry = b.getCenter()));
              return a;
            },
            _removeLocateButtonVisibilityEvents: function () {
              for (var a = 0; a < this.geocoders.length; a++) {
                var b = this.geocoders[a];
                b._onMouseEnter && b._onMouseEnter.remove();
                b._onMouseOut && b._onMouseOut.remove();
                b._onKeyPress && b._onKeyPress.remove();
                b._locateButton &&
                  (b._locateButton._onMouseEnter &&
                    b._locateButton._onMouseEnter.remove(),
                  b._locateButton._onMouseOut &&
                    b._locateButton._onMouseOut.remove());
              }
            },
            _setLocateButtonVisibilityEvents: function () {
              this._removeLocateButtonVisibilityEvents();
              for (
                var a = this,
                  b = function (Y) {
                    Y instanceof FocusEvent
                      ? (this._geocoder._lbShown_f = !0)
                      : (this._geocoder._lbShown_g = !0);
                    a._createLocateButton(this._geocoder, !0);
                  },
                  h = function (Y) {
                    Y instanceof FocusEvent
                      ? (this._geocoder._lbShown_f = !1)
                      : (this._geocoder._lbShown_g = !1);
                    clearTimeout(this._destroyTimeout);
                    this._destroyTimeout = setTimeout(
                      k.hitch(this, function () {
                        this._geocoder._lbShown_lb ||
                          this._geocoder._lbShown_f ||
                          a._destroyLocateButton(this._locateButton);
                      }),
                      400
                    );
                  },
                  w = function () {
                    this._geocoder._lbShown_g = !0;
                    clearTimeout(this._destroyTimeout);
                    this._destroyTimeout = setTimeout(
                      k.hitch(this, function () {
                        "" === this.value
                          ? a._createLocateButton(this._geocoder, !0)
                          : a._destroyLocateButton(this._locateButton);
                      }),
                      400
                    );
                  },
                  r = function () {
                    this._geocoder._lbShown_lb = !0;
                    clearTimeout(this._geocoder._destroyTimeout);
                  },
                  K = function () {
                    this._geocoder._lbShown_lb = !1;
                    clearTimeout(this._geocoder._destroyTimeout);
                    this._geocoder._destroyTimeout = setTimeout(
                      k.hitch(this, function () {
                        this._geocoder._lbShown_g ||
                          this._geocoder._lbShown_f ||
                          a._destroyLocateButton(
                            this._geocoder.inputNode._locateButton
                          );
                      }),
                      400
                    );
                  },
                  S = 0;
                S < this.geocoders.length;
                S++
              ) {
                var W = this.geocoders[S];
                W &&
                  W.inputNode &&
                  ((W.inputNode._geocoder = W),
                  (W._onMouseEnter = t(W.inputNode, l.enter, b)),
                  (W._onMouseOut = t(W.inputNode, [l.leave, "blur"], h)),
                  (W._onKeyPress = t(W.inputNode, "keydown", w)),
                  W.inputNode._locateButton &&
                    ((W = W.inputNode._locateButton),
                    (W._onMouseEnter = t(W.domNode, l.enter, r)),
                    (W._onMouseOut = t(W.domNode, l.leave, K))));
              }
            },
            _createLocateButton: function (a, b, h) {
              var w = new x();
              a.inputNode._locateButton && a.inputNode._locateButton._locating
                ? w.resolve()
                : C(
                    ["./LocateButton"],
                    k.hitch(this, function (r) {
                      this._destroyLocateButton(a.inputNode._locateButton);
                      if (a && !this._solveInProgress) {
                        var K = F.create("div", {}, a.domNode);
                        T.add(a.domNode, this._css.stopsInnerGeocoderClass);
                        var S = new r(
                          {
                            map: this.map,
                            highlightLocation: !1,
                            centerAt: !1,
                            setScale: !1,
                            useTracking: !1,
                          },
                          K
                        );
                        S.startup();
                        a.inputNode._locateButton = S;
                        S.domNode._geocoder = a;
                        this._setLocateButtonVisibilityEvents();
                        r = k.hitch(this, function () {
                          S._locating = !0;
                          a.set("value", "");
                          a.inputNode.placeholder =
                            G.widgets.directions.retrievingMyLocation.toUpperCase();
                        });
                        S._onBeforeLocate = t(S._locateNode, I, r);
                        S._onLocate = t(
                          S,
                          "locate",
                          k.hitch(this, function (W) {
                            S._locating = !1;
                            W.graphic
                              ? (b &&
                                  this._destroyLocateButton(
                                    a.inputNode._locateButton
                                  ),
                                this.updateStop(
                                  new u(W.graphic.geometry),
                                  U.indexOf(this.geocoders, a)
                                ).then(
                                  k.hitch(this, function () {
                                    1 < this.stopGraphics.length
                                      ? this.getDirections().always(
                                          function () {
                                            w.resolve(W);
                                          }
                                        )
                                      : w.resolve(W);
                                  })
                                ))
                              : (a.set("value", ""),
                                (a.inputNode.placeholder =
                                  G.widgets.directions.myLocationError.toUpperCase()),
                                console.error(W.error),
                                w.reject(W.error));
                          })
                        );
                        h
                          ? (r(), S.locate().then(null, w.reject))
                          : w.resolve();
                      } else w.resolve();
                    })
                  );
              return w.promise;
            },
            _destroyLocateButton: function (a) {
              if (a) {
                var b = a.domNode._geocoder;
                clearTimeout(b._destroyTimeout);
                a._locating
                  ? (b._destroyTimeout = setTimeout(
                      k.hitch(this, function () {
                        b._lbShown_lb ||
                          b._lbShown_f ||
                          this._destroyLocateButton(a);
                      }),
                      100
                    ))
                  : (a.clear(),
                    a._onBeforeLocate.remove(),
                    a._onLocate.remove(),
                    a._onMouseEnter && a._onMouseEnter.remove(),
                    a._onMouseOut && a._onMouseOut.remove(),
                    a.destroy(),
                    b.inputNode &&
                      ((b.inputNode._locateButton = null),
                      b._setPlaceholder(b.activeSourceIndex)));
              }
            },
            _sortStops: function () {
              this.stops.length &&
                (this.stops.sort(
                  k.hitch(this, function (a, b) {
                    for (var h, w, r = 0; r < this.get("geocoders").length; r++)
                      this.geocoders[r]._stopReference === a
                        ? (h = r)
                        : this.geocoders[r]._stopReference === b && (w = r);
                    return h > w ? 1 : w > h ? -1 : 0;
                  })
                ),
                this._setStops());
            },
            _getCandidate: function (a) {
              var b = new x(),
                h = typeof a;
              a
                ? "object" === h &&
                  a.hasOwnProperty("feature") &&
                  a.hasOwnProperty("name")
                  ? (a.feature.attributes &&
                      void 0 !== a.feature.attributes.displayName &&
                      !this._isStopAWaypoint(a) &&
                      ((a.name = a.feature.attributes.displayName),
                      (a.feature.attributes.Name = this._userDefinedStopName)),
                    (a.name = this._isStopAWaypoint(a)
                      ? this._waypointName
                      : String(a.name)),
                    "point" !== a.feature.geometry.type &&
                      (a.feature.geometry = new e(
                        [a.feature.geometry.x, a.feature.geometry.y],
                        this.map.spatialReference
                      )),
                    b.resolve(a))
                  : "object" === h &&
                    a.hasOwnProperty("address") &&
                    a.hasOwnProperty("location")
                  ? ((a = this._globalGeocoder._hydrateResult(a)), b.resolve(a))
                  : "object" !== h ||
                    !a.hasOwnProperty("name") ||
                    (null !== a.name && "" !== a.name)
                  ? a instanceof u &&
                    a.attributes &&
                    (void 0 !== a.attributes.Name || a.attributes.isWaypoint)
                    ? ((h = this._addStopWrapperToGraphic(
                        a,
                        a.attributes.isWaypoint
                          ? this._waypointName
                          : String(a.attributes.Name)
                      )),
                      String(a.attributes.Name) &&
                        (h.feature.attributes.Name = this._userDefinedStopName),
                      b.resolve(h))
                    : ("object" === h &&
                        a.hasOwnProperty("name") &&
                        (a = String(a.name)),
                      this._reverseGeocode(a).then(b.resolve, b.reject))
                  : b.resolve(k.clone(this._emptyStop))
                : b.resolve(k.clone(this._emptyStop));
              return b.promise;
            },
            _reverseGeocode: function (a) {
              var b = new x(),
                h,
                w = a.geometry ? a.geometry : a;
              if (this._globalGeocoder) {
                var r = k.hitch(this, function (Y) {
                    var fa = new x(),
                      ha = 500;
                    if (this.map) {
                      var ma = this.map.toScreen(w);
                      ma.x += Ea._calculateClickTolerance([Y]);
                      this.map.spatialReference.isWebMercator()
                        ? ((ha = Math.abs(this.map.toMap(ma).x - w.x)),
                          fa.resolve(ha))
                        : 4326 === this.map.spatialReference.wkid
                        ? ((ha = Math.abs(
                            xa.geographicToWebMercator(this.map.toMap(ma)).x -
                              xa.geographicToWebMercator(w).x
                          )),
                          fa.resolve(ha))
                        : this._geometryService &&
                          ((Y = new Pa()),
                          (Y.distanceUnit = Ba.UNIT_METER),
                          (Y.geometry1 = w),
                          (Y.geometry2 = this.map.toMap(ma)),
                          this._geometryService.distance(
                            Y,
                            function (na) {
                              ha = na;
                              fa.resolve(ha);
                            },
                            function () {
                              fa.resolve(ha);
                            }
                          ));
                    }
                    return fa.promise;
                  }),
                  K = [],
                  S = this._globalGeocoder.sources,
                  W = function () {
                    S[h].featureLayer &&
                      K.push(
                        r(S[h].featureLayer).then(
                          k.hitch(S[h], function (Y) {
                            this.searchQueryParams = k.mixin(
                              this.searchQueryParams,
                              { distance: Y }
                            );
                          })
                        )
                      );
                  };
                if ("all" === this._globalGeocoder.activeSourceIndex)
                  for (h = 0; h < S.length; h++) W();
                else (h = this._globalGeocoder.activeSourceIndex), W();
                X(K).always(
                  k.hitch(this, function () {
                    this._globalGeocoder.search(w).then(
                      k.hitch(this, function (Y) {
                        var fa = !1;
                        if (Y) {
                          var ha = null;
                          for (
                            h = 0;
                            h < this._globalGeocoder.sources.length;
                            h++
                          )
                            if (Y[h] && Y[h].length) {
                              var ma = Y[h];
                              break;
                            }
                          if (
                            ma.length &&
                            ((fa = !0),
                            (ha = ma[0]),
                            this._globalGeocoder.sources[h].featureLayer)
                          )
                            for (
                              Y = Number.POSITIVE_INFINITY, h = 0;
                              h < ma.length;
                              h++
                            ) {
                              ma[h] = this._toPointGeometry(ma[h]);
                              var na = ya.geodesicLengths(
                                [
                                  new P({
                                    paths: [
                                      [
                                        xa.xyToLngLat(w.x, w.y),
                                        xa.xyToLngLat(
                                          ma[h].feature.geometry.x,
                                          ma[h].feature.geometry.y
                                        ),
                                      ],
                                    ],
                                    spatialReference: {
                                      wkid: this.map.spatialReference.wkid,
                                    },
                                  }),
                                ],
                                "esriMeters"
                              )[0];
                              Y > na && ((Y = na), (ha = ma[h]));
                            }
                          (ha = this._decorateEmptyAGOLGeocoderResponse(ha)) &&
                          "" !== ha.name &&
                          null !== ha.name &&
                          void 0 !== ha.name
                            ? ((ha.name = String(ha.name)),
                              isNaN(w.x) ||
                              isNaN(w.y) ||
                              this.map.spatialReference.wkid !==
                                w.spatialReference.wkid
                                ? !ha.feature.geometry ||
                                  isNaN(ha.feature.geometry.x) ||
                                  isNaN(ha.feature.geometry.y)
                                  ? (this._showMessage(
                                      G.widgets.directions.error.locator
                                    ),
                                    b.reject(
                                      Error(G.widgets.directions.error.locator)
                                    ))
                                  : b.resolve(ha)
                                : ((ha.feature.geometry = w), b.resolve(ha)))
                            : (fa = !1);
                        }
                        fa ||
                          (a instanceof e
                            ? (a = new u(a))
                            : a instanceof Array &&
                              (a = new u(new e(a[0], a[1]))),
                          a instanceof u
                            ? this._decorateUngeocodedStop(a).then(
                                b.resolve,
                                b.reject
                              )
                            : (this._showMessage(
                                G.widgets.directions.error.unknownStop.replace(
                                  "\x3cname\x3e",
                                  a.toString()
                                )
                              ),
                              b.reject(
                                Error(
                                  G.widgets.directions.error.unknownStop.replace(
                                    "\x3cname\x3e",
                                    a.toString()
                                  )
                                )
                              )));
                      })
                    );
                  })
                );
              } else
                this._showMessage(G.widgets.directions.error.locatorUndefined),
                  b.reject(Error(G.widgets.directions.error.locatorUndefined));
              return b.promise;
            },
            _updateStop: function (a, b, h) {
              var w = new x();
              this.stops && this.stops[b]
                ? a instanceof u &&
                  a.attributes &&
                  a.attributes.isWaypoint &&
                  (!b ||
                    b === this.stops.length - 1 ||
                    2 > this._getStopCount())
                  ? (this._showMessage(
                      G.widgets.directions.error.waypointShouldBeInBetweenStops
                    ),
                    w.reject(
                      Error(
                        G.widgets.directions.error
                          .waypointShouldBeInBetweenStops
                      )
                    ))
                  : this._getCandidate(a).then(
                      k.hitch(this, function (r) {
                        var K = r.feature;
                        K = K ? K.geometry : null;
                        var S = this.stops[b].feature;
                        S = S ? S.geometry : null;
                        K =
                          (K && S && (K.x !== S.x || K.y !== S.y)) || (!K && S);
                        this.stops[b] = r;
                        this.geocoders[b] || this._createGeocoder(r, b);
                        S = this.geocoders[b];
                        S._stopReference = r;
                        S._tr.style.display = this._isStopAWaypoint(r)
                          ? "none"
                          : "";
                        S.value = r.name;
                        S.inputNode && (S.inputNode.value = r.name);
                        (K &&
                          this.autoSolve &&
                          1 <
                            this._getStopCount() + this._getWaypointCount()) ||
                        h
                          ? this._getDirections().then(w.resolve, w.reject)
                          : (this._setStops(), w.resolve(r));
                      }),
                      k.hitch(this, function (r) {
                        w.reject(r);
                      })
                    )
                : (this._showMessage(
                    G.widgets.directions.error.couldNotUpdateStop
                  ),
                  w.reject(
                    Error(G.widgets.directions.error.couldNotUpdateStop)
                  ));
              this._optionsMenu();
              return w.promise;
            },
            _renderDirections: function () {
              var a = this.get("directions");
              if (this._resultsNode) {
                var b =
                  '\x3cdiv class\x3d"' +
                  this._css.clearClass +
                  '"\x3e\x3c/div\x3e';
                b += this._renderDirectionsSummary(a);
                b +=
                  '\x3cdiv class\x3d"' +
                  this._css.clearClass +
                  '"\x3e\x3c/div\x3e';
                b += '\x3cdiv class\x3d"' + this._css.routesClass + '"\x3e';
                b += this._renderDirectionsTable(a);
                b += "\x3c/div\x3e";
                this._resultsNode && (this._resultsNode.innerHTML = b);
                this._disconnectResults();
                (a = M("[data-segment]", this._resultsNode)) &&
                  a.length &&
                  U.forEach(
                    a,
                    k.hitch(this, function (h) {
                      this._resultEvents.push(
                        t(
                          h,
                          l.enter,
                          k.hitch(this, function () {
                            if (!this._focusedDirectionsItem) {
                              var w = parseInt(Q.get(h, "data-segment"), 10);
                              this.highlightSegment(w);
                            }
                          })
                        )
                      );
                      this._resultEvents.push(
                        t(
                          h,
                          "focusout",
                          k.hitch(this, function () {
                            this._focusedDirectionsItem = null;
                            this.unhighlightSegment(!0);
                          })
                        )
                      );
                      this._resultEvents.push(
                        t(h, l.leave, this.unhighlightSegment)
                      );
                      this._resultEvents.push(
                        t(
                          h,
                          "click, keydown",
                          k.hitch(this, function (w) {
                            w &&
                              ("click" === w.type ||
                                ("keydown" === w.type &&
                                  w.keyCode === d.ENTER)) &&
                              (this._focusedDirectionsItem !== h
                                ? this.selectSegment(
                                    parseInt(Q.get(h, "data-segment"), 10)
                                  )
                                : (h.blur(),
                                  this.map.infoWindow.hide(),
                                  (this._focusedDirectionsItem = null),
                                  this.unhighlightSegment(!0)));
                          })
                        )
                      );
                    })
                  );
              }
            },
            _renderDirectionsSummary: function (a) {
              var b = "",
                h = k.hitch(this, function () {
                  for (
                    var S = {},
                      W = this._getDirectionsTimeAttribute() || {},
                      Y = this._getTimeNeutralAttribute() || {},
                      fa = 0,
                      ha = 0,
                      ma = this.get("stops"),
                      na = ma.length - 1;
                    0 <= na;
                    na--
                  )
                    if (null !== ma[na].feature.attributes.ArriveCurbApproach) {
                      S = ma[na].feature.attributes;
                      break;
                    }
                  for (var ta in S)
                    S.hasOwnProperty(ta) &&
                      (ta === "Cumul_" + W.name && (fa = S[ta]),
                      ta === "Cumul_" + Y.name && (ha = S[ta]));
                  S = "esriTrafficLabelHidden";
                  ma = G.widgets.directions.noTraffic;
                  na = a.totalTime - a.totalDriveTime;
                  na =
                    (ha - this._convertCostValue(na, W.units, Y.units)) /
                    (fa - na || 1);
                  0 < na && 0.8 > na
                    ? ((S = "esriTrafficLabelHeavy"),
                      (ma = G.widgets.directions.heavyTraffic))
                    : 1 === na
                    ? ((S = "esriTrafficLabelNone"),
                      (ma = G.widgets.directions.noTraffic))
                    : 1.25 < na &&
                      ((S = "esriTrafficLabelLight"),
                      (ma = G.widgets.directions.ligthTraffic));
                  Y = this._formatTime(ha, !1, Y.units);
                  return {
                    label: ma,
                    labelClass: S,
                    ratio: na,
                    noTrafficCostStr:
                      1 !== na && Y
                        ? Y +
                          " " +
                          G.widgets.directions.onAverage +
                          "\x3cbr\x3e"
                        : "",
                    trafficCost: fa,
                    noTrafficCost: ha,
                    timeAtt: W,
                  };
                });
              if (a.totalLength || a.totalTime) {
                h = h();
                var w = this._getImpedanceAttribute();
                b +=
                  "\x3cdiv class\x3d'" +
                  this._css.resultsSummaryClass +
                  "' data-full-route\x3d'true'\x3e\x3cdiv class\x3d'esriImpedanceCost'\x3e";
                if (this._isTimeUnits(w.units))
                  b +=
                    this._formatTime(h.trafficCost, !0, h.timeAtt.units) +
                    "\x3cdiv class\x3d'esriImpedanceCostHrMin'\x3e\x3cdiv class\x3d'esriImpedanceCostHr'\x3e" +
                    G.widgets.directions.time.hr +
                    "\x3c/div\x3e\x3cdiv class\x3d'esriImpedanceCostMin'\x3e" +
                    G.widgets.directions.time.min +
                    "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'esriOtherCosts'\x3e" +
                    (h.noTrafficCost
                      ? "\x3cdiv class\x3d'esriTrafficLabel " +
                        h.labelClass +
                        "'\x3e" +
                        h.label +
                        "\x3c/div\x3e" +
                        h.noTrafficCostStr
                      : "") +
                    this._formatDistance(a.totalLength);
                else {
                  w = (w =
                    G.widgets.directions.units[this.directionsLengthUnits])
                    ? w.name
                    : "";
                  var r =
                      this.serviceDescription &&
                      10.6 <= this.serviceDescription.currentVersion,
                    K = this.directions.features[0].attributes;
                  b +=
                    B.format(a.totalLength, { places: 1 }) +
                    "\x3cdiv class\x3d'esriImpedanceCostDist'\x3e" +
                    w +
                    "\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'esriOtherCosts'\x3e" +
                    (h.noTrafficCost && r
                      ? "\x3cdiv class\x3d'esriTrafficLabel " +
                        h.labelClass +
                        "'\x3e" +
                        h.label +
                        "\x3c/div\x3e" +
                        h.noTrafficCostStr
                      : "") +
                    this._formatTime(a.totalTime) +
                    " " +
                    ("none" !== this.startTime && h.noTrafficCost && r
                      ? G.widgets.directions.atTheMoment +
                        " " +
                        this._toSpatiallyLocalTimeString(K.arriveTimeUTC, K.ETA)
                      : "");
                }
                b += "\x3c/div\x3e\x3c/div\x3e";
              }
              return b;
            },
            _renderDirectionsTable: function (a) {
              for (
                var b = 0,
                  h = 0,
                  w = 0,
                  r =
                    '\x3ctable summary\x3d"' +
                    a.routeName +
                    '"\x3e\x3ctbody role\x3d"menu"\x3e',
                  K = 0;
                K < a.features.length;
                K++
              ) {
                var S = a.features[K].attributes;
                "esriDMTDepart" === S.maneuverType && (h = w = 0);
                w += S.length;
                h += S.time;
                b += S.time;
                r += this._renderDirectionsItemTR(a.features[K], w, h, b);
              }
              return r + "\x3c/tbody\x3e\x3c/table\x3e";
            },
            _renderDirectionsItemTR: function (a, b, h, w) {
              var r = this.directions,
                K = r ? U.indexOf(r.features, a) : -1;
              w = "";
              var S = this._css.routeClass,
                W =
                  a._associatedStopWithReturnToStart &&
                  a._associatedStopWithReturnToStart.attributes,
                Y = a.attributes;
              if (-1 < K) {
                Y && (Y.step = K + 1);
                Y.maneuverType && (S += " " + Y.maneuverType);
                W &&
                null === W.ArriveCurbApproach &&
                null !== W.DepartCurbApproach
                  ? (S += " " + this._css.routeOriginClass)
                  : W &&
                    null !== W.ArriveCurbApproach &&
                    null === W.DepartCurbApproach &&
                    (S +=
                      " " +
                      this._css.routeDestinationClass +
                      " " +
                      this._css.routeLastClass);
                w +=
                  '\x3ctr tabindex\x3d"0" role\x3d"menuitem" class\x3d"' +
                  S +
                  " " +
                  this._css.routeZoomClass +
                  '" data-segment\x3d"' +
                  K +
                  '"\x3e';
                w +=
                  '\x3ctd class\x3d"' +
                  this._css.routeIconColumnClass +
                  '"\x3e';
                w += '\x3cdiv class\x3d"' + this._css.routeIconClass + '"\x3e';
                w += this._getLetter(a._associatedStop);
                w =
                  w +
                  '\x3c/div\x3e\x3c/td\x3e\x3ctd class\x3d"' +
                  (this._css.routeTextColumnClass + '"\x3e');
                w += '\x3cdiv class\x3d"' + this._css.routeInfoClass + '"\x3e';
                w += '\x3cdiv class\x3d"' + this._css.routeTextClass + '"\x3e';
                a = (r.strings[K] || []).slice();
                if (
                  "esriDMTDepart" === Y.maneuverType ||
                  "esriDMTStop" === Y.maneuverType
                )
                  for (r = 0; r < this.stops.length; r++)
                    this.stops[r] &&
                      this.stops[r].name &&
                      a.push({ string: this.stops[r].name });
                if (a) {
                  S = Y.text;
                  for (r = 0; r < a.length; r++)
                    S = this._boldText(S, a[r].string);
                  Y.formattedText = S;
                } else Y.formattedText = Y.text;
                if (
                  ("esriDMTStop" === Y.maneuverType && (b || h)) ||
                  ("esriDMTDepart" === Y.maneuverType && 0 === K)
                )
                  (b = this._formatDistance(b - Y.length, !0)),
                    (h = this._formatTime(h - Y.time)),
                    (K = this._formatTime(Y.time)),
                    (a = this._formatDistance(Y.length, !0)),
                    (Y.formattedText +=
                      "\x3cdiv class\x3d'esriRouteTextColumnCumulative'\x3e" +
                      b +
                      (b && h ? " \x26middot; " : "") +
                      h +
                      (b || h ? "\x3cbr\x3e" : "") +
                      (K
                        ? G.widgets.directions.serviceTime + ":\x26nbsp;" + K
                        : "") +
                      (K && a ? "\x3cbr\x3e" : "") +
                      (a
                        ? G.widgets.directions.serviceDistance +
                          ":\x26nbsp;" +
                          a
                        : "") +
                      "\x3c/div\x3e");
                w +=
                  "\x3cstrong\x3e" +
                  B.format(Y.step) +
                  ".\x3c/strong\x3e " +
                  Y.formattedText;
                w += "\x3c/div\x3e";
                b = this._formatDistance(Y.length, !0);
                h = this._formatTime(Y.time);
                ("esriDMTStop" !== Y.maneuverType &&
                  "esriDMTDepart" !== Y.maneuverType) ||
                !this.routeParams.startTime ||
                -22091616e5 === Y.ETA
                  ? b &&
                    ((w +=
                      '\x3cdiv class\x3d"' +
                      this._css.routeLengthClass +
                      '"\x3e'),
                    (w += b),
                    h && (w += "\x26nbsp;\x26middot;\x3cwbr\x3e\x26nbsp;" + h),
                    (w += "\x3c/div\x3e"))
                  : (w +=
                      '\x3cdiv class\x3d"' +
                      this._css.routeLengthClass +
                      '"\x3e' +
                      this._toSpatiallyLocalTimeString(Y.arriveTimeUTC, Y.ETA) +
                      "\x3c/div\x3e");
                w += "\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e";
              }
              return w;
            },
            _toSpatiallyLocalTimeString: function (a, b) {
              var h = new Date(b),
                w = new Date(h.getTime() + 6e4 * h.getTimezoneOffset());
              w = Z.date.locale.format(w, { selector: "time" });
              var r = "";
              a
                ? ((b = (b - a) / 1e3 / 60 / 60),
                  (a = Math.floor(b)),
                  (b = 60 * (b - a)),
                  (a =
                    G.widgets.directions.GMT +
                    (0 > a ? "" : "+") +
                    B.format(a, { pattern: "00" }) +
                    B.format(b, { pattern: "00" })),
                  (r = w + " " + a))
                : (r =
                    "now" === this.startTime
                      ? Z.date.locale.format(h, { selector: "time" })
                      : w);
              return r;
            },
            _addStopWrapperToGraphic: function (a, b) {
              return {
                extent: new D({
                  xmin: a.geometry.x - 0.25,
                  ymin: a.geometry.y - 0.25,
                  xmax: a.geometry.x + 0.25,
                  ymax: a.geometry.y + 0.25,
                  spatialReference: a.geometry.spatialReference,
                }),
                feature: a,
                name: b,
              };
            },
            _clearBarriersGraphics: function () {
              this._barriersLayer.clear();
              this._polylineBarriersLayer.clear();
              this._polygonBarriersLayer.clear();
            },
            _showBarriers: function () {
              this._clearBarriersGraphics();
              var a = this.routeParams,
                b = (a.polylineBarriers && a.polylineBarriers.features) || [],
                h = (a.polygonBarriers && a.polygonBarriers.features) || [];
              U.forEach(
                (a.barriers && a.barriers.features) || [],
                k.hitch(this, function (w) {
                  this._barriersLayer.add(w);
                })
              );
              U.forEach(
                b,
                k.hitch(this, function (w) {
                  this._polylineBarriersLayer.add(w);
                })
              );
              U.forEach(
                h,
                k.hitch(this, function (w) {
                  this._polygonBarriersLayer.add(w);
                })
              );
              this._barriersLayer.refresh();
              this._polylineBarriersLayer.refresh();
              this._polygonBarriersLayer.refresh();
            },
            _showRoute: function (a) {
              this._clearDisplayAfterSolve();
              var b = a.routeResults[0].directions,
                h = new x();
              if (b) {
                this.set("solveResult", a);
                this.set("directions", b);
                var w = a.routeResults[0].stops,
                  r,
                  K;
                if (w && w.length) {
                  var S = [];
                  for (r = 0; r < w.length; r++) {
                    var W = w[r];
                    W.attributes.isWaypoint =
                      W.attributes.Name === this._waypointName ||
                      W.attributes.isWaypoint;
                    W = this._addStopWrapperToGraphic(W, W.attributes.Name);
                    this.stops[r] &&
                      this.stops[r].feature &&
                      this.stops[r].feature.attributes &&
                      this.stops[r].feature.attributes.Name ===
                        this._userDefinedStopName &&
                      (W.feature.attributes.Name = this._userDefinedStopName);
                    this._returnToStartStop &&
                    this._returnToStartStop._resultsStopIndex === r
                      ? (this._returnToStartStop = W)
                      : S.push(W);
                  }
                  if (this.stops.length > S.length)
                    for (r = 0; r < this.stops.length; r++)
                      this.stops[r].feature ||
                        "" !== this.stops[r].name ||
                        S.splice(r, 0, this._emptyStop);
                  this.stops = S;
                  for (r = 0; r < this.stops.length; r++)
                    this._updateStop(this.stops[r], r);
                  this._setStops();
                  this._setMenuNodeValues();
                }
                this.set(
                  "mergedRouteGraphic",
                  new u(b.mergedGeometry, this.get("routeSymbol"))
                );
                w = [];
                S = [];
                for (r = W = 0; r < b.featuresWithWaypoints.length; r++) {
                  var Y = b.featuresWithWaypoints[r];
                  if ("esriDMTDepart" === Y.attributes.maneuverType)
                    for (K = 0; K < this.stops.length; K++)
                      if (this.stops[K].feature === Y._associatedStop) {
                        W = K + 1;
                        break;
                      }
                  Y.setSymbol(this.get("routeSymbol"));
                  this._routeLayer.add(Y);
                  w.push(Y);
                  (K = Y.getDojoShape()) && K.moveToBack();
                  K = new u(
                    Y.geometry,
                    this._symbolEventPaddingDirections,
                    Y.attributes
                  );
                  K._nextStopIndex = W - 0.5;
                  K._isSnapFeature = !0;
                  Y._associatedSnapFeature = K;
                  this._waypointsEventLayer.add(K);
                  "esriDMTDepart" !== Y.attributes.maneuverType &&
                    (K = Y.geometry.getPoint(0, 0)) &&
                    ((K = new u(K, this.maneuverSymbol)),
                    (K._directionsFeature = Y._associatedFeatureNoWaypoints),
                    S.push(K),
                    this._waypointsEventLayer.add(S[S.length - 1]));
                }
                this.set("displayedRouteGraphics", w);
                this.set("displayedManeuverPointGraphics", S);
                this._renderDirections();
                for (r = 0; r < this.stops.length; r++)
                  if (
                    this._isStopAWaypoint(this.stops[r]) &&
                    this._modifiedWaypointIndex === r
                  ) {
                    for (K = 0; K < b.featuresWithWaypoints.length; K++)
                      if (
                        ((w = b.featuresWithWaypoints[K]),
                        w._associatedStop === this.stops[r].feature)
                      ) {
                        if (
                          "esriDMTStop" === w.attributes.maneuverType ||
                          "esriDMTDepart" === w.attributes.maneuverType
                        )
                          (this.stops[r].feature.geometry.x =
                            w.geometry.paths[0][0][0]),
                            (this.stops[r].feature.geometry.y =
                              w.geometry.paths[0][0][1]);
                        break;
                      }
                    this._modifiedWaypointIndex = null;
                    break;
                  }
                H.set(this._savePrintBtnContainer, "display", "inline-block");
                this.onDirectionsFinish(a);
              } else
                (a = a.routeResults[0].route),
                  a.setSymbol(this.routeSymbol),
                  this._routeLayer.add(a),
                  (this._incrementalRouteSegment = a);
              h.resolve();
              this._moveLayersToFront();
              this.createRouteSymbols();
              return h.promise;
            },
            _setGeocodersStopReference: function () {
              if (this.geocoders)
                for (var a = 0; a < this.geocoders.length; a++)
                  this.geocoders[a] &&
                    this.stops[a] &&
                    (this.geocoders[a]._stopReference = this.stops[a]);
            },
            _setStops: function () {
              this._setGeocodersStopReference();
              this.createRouteSymbols();
              this._set("stops", this.stops);
              this.onStopsUpdate(this.stops);
            },
            _getCandidates: function (a) {
              var b = [];
              if (a && a.length) {
                for (var h = 0; h < a.length; h++)
                  b.push(this._getCandidate(a[h]));
                return X(b);
              }
              a = new x();
              a.resolve([]);
              return a.promise;
            },
            _clearResultsHTML: function () {
              this._resultsNode.innerHTML = "";
              H.set(this._savePrintBtnContainer, "display", "none");
            },
            _showSegmentPopup: function (a) {
              if (
                a &&
                this.get("showSegmentPopup") &&
                this.get("map").infoWindow
              ) {
                var b = a.geometry.getPoint(0, 0);
                a = new u(
                  b,
                  null,
                  a.attributes,
                  this.get("segmentInfoTemplate")
                );
                var h = this.get("map").infoWindow;
                h.setFeatures([a]);
                h.show(b);
              }
            },
            _addStopButton: function () {
              this.addStop().then(
                k.hitch(this, function () {
                  this.get("focusOnNewStop") &&
                    this.geocoders[this.stops.length - 1].focus();
                })
              );
            },
            _sortGeocoders: function () {
              var a = this._dnd.getAllNodes();
              this.geocoders.sort(
                k.hitch(this, function (h, w) {
                  return h.domNode &&
                    h.domNode.parentNode &&
                    h.domNode.parentNode.parentNode &&
                    w.domNode &&
                    w.domNode.parentNode &&
                    w.domNode.parentNode.parentNode
                    ? U.indexOf(a, h.domNode.parentNode.parentNode) >
                      U.indexOf(a, w.domNode.parentNode.parentNode)
                      ? 1
                      : -1
                    : 0;
                })
              );
              this.stops.length === this.geocoders.length && this._sortStops();
              for (var b = 0; b < this.geocoders.length; b++)
                this.geocoders[b] &&
                  this.geocoders[b].inputNode &&
                  (this.geocoders[b].inputNode.title =
                    G.widgets.directions.stopNoTitle + (b + 1));
              this._setLocateButtonVisibilityEvents();
            },
            _disconnectResults: function () {
              if (this._resultEvents && this._resultEvents.length)
                for (var a = 0; a < this._resultEvents.length; a++)
                  this._resultEvents[a] && this._resultEvents[a].remove();
              this._resultEvents = [];
            },
            _formatArbitraryCostsForRouteTooltip: function (a) {
              var b = "",
                h;
              for (h in a)
                if (0 === h.indexOf("Total_") && a.hasOwnProperty(h)) {
                  var w = this._getCostAttribute(h.substr(6));
                  w &&
                    ((b += this._isTimeUnits(w.units)
                      ? this._formatTime(a[h], !1, w.units)
                      : this._formatDistance(a[h], !0, w.units)),
                    (b += b ? " \x26middot; " : ""));
                }
              b &&
                (b =
                  G.widgets.directions.toNearbyStops +
                  ": \x3cb\x3e" +
                  b.substr(0, b.length - 10) +
                  "\x3c/b\x3e");
              return b;
            },
            _formatTime: function (a, b, h) {
              h || (h = (this._getDirectionsTimeAttribute() || {}).units);
              var w = "";
              h = Math.round(this._convertCostValue(a, h, "esriNAUMinutes"));
              a = Math.floor(h / 60);
              h = Math.floor(h % 60);
              b
                ? (w =
                    B.format(a, { pattern: 100 > a ? "00" : "000" }) +
                    ":" +
                    B.format(h, { pattern: "00" }))
                : (a && (w += a + " " + G.widgets.directions.time.hr + " "),
                  (w += a || h ? h + " " + G.widgets.directions.time.min : ""));
              return w;
            },
            _formatDistance: function (a, b, h) {
              h || (h = this.directionsLengthUnits);
              var w = this.directionsLengthUnits,
                r = G.widgets.directions.units[w],
                K = w.replace("esri", "").toLowerCase();
              a = this._convertCostValue(a, h, w);
              r && (K = b ? r.abbr : r.name);
              return a
                ? B.format(a, { locale: "root", places: 2 }) + " " + K
                : "";
            },
            _projectToGeographic: function (a) {
              var b = new x();
              if (!a)
                return (
                  b.reject("Directions:: 'geometry' is not defined.", {
                    geometry: a,
                  }),
                  b.promise
                );
              if (4326 == a.spatialReference.wkid)
                return b.resolve(a), b.promise;
              if (!this._geometryService)
                return (
                  b.reject("Directions:: Geometry service is not defined."),
                  b.promise
                );
              var h = new $a();
              h.outSR = new ka(4326);
              h.geometries = [a];
              this._geometryService.project(h).then(function (w) {
                b.resolve(w && w[0]);
              }, b.reject);
              return b.promise;
            },
            _createToolbars: function () {
              this.editToolbar || (this.editToolbar = new Ya(this.map));
              this.drawToolbar ||
                ((this.drawToolbar = new Za(this.map)),
                (G.toolbars.draw.freehand =
                  G.widgets.directions.lineBarrierFreehand),
                (this.drawToolbar.onDrawComplete = k.hitch(this, function (a) {
                  var b = new u(a.geometry, null, { BarrierType: 0 });
                  this._projectToGeographic(
                    a.geographicGeometry || a.geometry
                  ).then(
                    k.hitch(this, function (h) {
                      1 < ya.geodesicLengths([h], V.METERS)[0] &&
                        (this._polylineBarriersLayer.add(b),
                        this.routeParams.polylineBarriers ||
                          (this.routeParams.polylineBarriers = new ua()),
                        this.routeParams.polylineBarriers.features.push(b),
                        this._clearStopsStatusAttr(),
                        this.getDirections(!0));
                    })
                  );
                })));
            },
            _destroyGlobalGeocoder: function () {
              this._globalGeocoder &&
                (this._globalGeocoder.destroy(), (this._globalGeocoder = null));
            },
            _createGlobalGeocoder: function () {
              var a = new x();
              this._globalGeocoder = new ab(this.get("searchOptions"));
              t.once(this._globalGeocoder, "load", a.resolve, a.reject);
              this._globalGeocoder.startup();
              return a.promise;
            },
            _init: function () {
              var a = new x();
              this.set("loaded", !1);
              this._enableButton(this._getDirectionsButtonNode, !1);
              H.set(this._saveAsButton, "display", "none");
              this.clearMessages();
              if (this.get("map").loaded) this._configure().always(a.resolve);
              else
                t.once(
                  this.get("map"),
                  "load",
                  k.hitch(this, function () {
                    this._configure().always(a.resolve);
                  })
                );
              return a.promise;
            },
            _setDefaultStops: function () {
              var a = new x();
              this.defaults.stops && this.defaults.stops.length
                ? this._updateStops(this.defaults.stops).then(
                    k.hitch(this, function () {
                      this._removeEmptyStops();
                      a.resolve();
                    }),
                    a.reject
                  )
                : a.resolve();
              return a.promise;
            },
            _configure: function () {
              var a = new x();
              this._handle && this._handle._remove();
              this._createDnD();
              this._createDepartAtControls();
              this._setSearchOptions();
              this._createGlobalGeocoder().then(
                k.hitch(this, function () {
                  this._createToolbars();
                  this._usingAGOL() ||
                    (this.printTaskUrl = this.geometryTaskUrl = null);
                  this._createGeometryTask();
                  this._createPrintTask();
                  this._showActivateButton();
                  this._showBarriersButton();
                  this._createTravelModesDDL();
                  this._createSearchSourceDDL();
                  var b = [this._createRouteTask(), this._setDefaultStops()];
                  X(b).then(
                    k.hitch(this, function () {
                      this._setDefaultUnits();
                      this._setTrafficOptions();
                      this._setMenuNodeValues();
                      this._setupEvents();
                      var h =
                        this.directionsLanguage ||
                        (this.userOptions.routeParams &&
                          this.userOptions.routeParams.directionsLanguage) ||
                        Z.locale.toLowerCase();
                      this._setDirectionsLanguageByLocale(h);
                      this._setupTravelModes().then(
                        k.hitch(this, function () {
                          this.set("loaded", !0);
                          this.onLoad();
                          a.resolve(!0);
                        }),
                        function (w) {
                          a.reject(w);
                        }
                      );
                    }),
                    function (h) {
                      a.reject(h);
                    }
                  );
                }),
                function (b) {
                  a.reject(b);
                }
              );
              this._naRouteSharing = null;
              return a.promise;
            },
            _setDirectionsLanguageByLocale: function (a) {
              var b = this.serviceDescription.directionsSupportedLanguages,
                h = function (r) {
                  if (b)
                    for (var K = 0; K < b.length; K++)
                      if (b[K].toLowerCase().substr(0, 2) === r) return b[K];
                  return null;
                },
                w = h(a);
              w || ((a = a.substr(0, 2)), (w = h(a)));
              this.directionsLanguage = w;
              return (this.routeParams.directionsLanguage = w);
            },
            _getStopSymbol: function (a, b) {
              var h =
                  a && ((a.feature && a.feature.attributes) || a.attributes),
                w = this.stopSymbol;
              h &&
                (w = this._isStopAWaypoint(a)
                  ? this.waypointSymbol
                  : void 0 === h.Status || 0 === h.Status || 6 === h.Status
                  ? null === h.ArriveCurbApproach &&
                    null !== h.DepartCurbApproach
                    ? this.get(b ? "fromSymbolDrag" : "fromSymbol")
                    : null !== h.ArriveCurbApproach &&
                      null === h.DepartCurbApproach
                    ? this.get(b ? "toSymbolDrag" : "toSymbol")
                    : this.get(b ? "stopSymbolDrag" : "stopSymbol")
                  : this.get(b ? "unreachedSymbolDrag" : "unreachedSymbol"));
              return w;
            },
            _addTrafficLayer: function () {
              this.trafficLayer &&
                !this._trafficLayerAdded &&
                this.map &&
                (this.map.addLayer(this.trafficLayer),
                this.trafficLayer.show(),
                (this._trafficLayerAdded = !0));
            },
            _toggleUnits: function (a) {
              a.target === this._useMilesNode
                ? this.setDirectionsLengthUnits(V.MILES)
                : a.target === this._useKilometersNode &&
                  this.setDirectionsLengthUnits(V.KILOMETERS);
            },
            _toggleCheckbox: function (a) {
              var b = Q.get(a.target, "checked");
              a.target === this._findOptimalOrderNode
                ? this.set("optimalRoute", b)
                : a.target === this._useTrafficNode
                ? this.set("traffic", b)
                : a.target === this._returnToStartNode &&
                  this.set("returnToStart", b);
            },
            _isStopLocated: function (a) {
              return (
                a &&
                a.feature &&
                a.feature.attributes &&
                (!a.feature.attributes.Status ||
                  6 === a.feature.attributes.Status)
              );
            },
            _configureRouteOptions: function () {
              var a = this.get("routeParams"),
                b;
              this.get("directionsLengthUnits")
                ? (a.directionsLengthUnits = this.get("directionsLengthUnits"))
                : this.set("directionsLengthUnits", a.directionsLengthUnits);
              a.findBestSequence = this.get("optimalRoute");
              if (a.findBestSequence)
                for (
                  a.preserveFirstStop = this._isStopLocated(this.stops[0]),
                    a.preserveLastStop =
                      (!this.returnToStart &&
                        this._isStopLocated(
                          this.stops[this.stops.length - 1]
                        )) ||
                      (this.returnToStart &&
                        this._isStopLocated(this.stops[0])),
                    b = 0;
                  b < this.stops.length;

                )
                  this._isStopAWaypoint(this.stops[b])
                    ? this._removeStop(b, !0, !0)
                    : b++;
              if (
                !this.returnToStart &&
                this.stops.length &&
                this._isStopAWaypoint(this.stops[this.stops.length - 1])
              )
                for (b = this.stops.length - 1; 0 < b; )
                  this._isStopAWaypoint(this.stops[b]) &&
                    this._removeStop(b, !0, !0),
                    b--;
              if (
                this._isTimeUnits(this._getImpedanceAttribute().units) ||
                (this.serviceDescription &&
                  10.6 <= this.serviceDescription.currentVersion)
              )
                if (((a.useTimeWindows = !0), "now" === this.startTime))
                  (a.timeWindowsAreUTC = !0),
                    (a.startTimeIsUTC = !0),
                    (a.startTime = new Date());
                else if ("none" === this.startTime) a.startTime = null;
                else {
                  a.timeWindowsAreUTC = !1;
                  a.startTimeIsUTC = !1;
                  var h = this._departAtTime,
                    w = 6e4 * h.getValue().getTimezoneOffset();
                  h = new Date(
                    h.getValue().getTime() +
                      this._departAtDate.getValue().getTime() -
                      w
                  );
                  h = new Date(h.getTime() - 6e4 * h.getTimezoneOffset());
                  a.startTime = h;
                }
              else (a.startTime = null), (a.useTimeWindows = !1);
              h = this._getImpedanceAttribute();
              w = this._getTimeNeutralAttribute();
              var r = this._getDirectionsTimeAttribute();
              b =
                this.routeParams.accumulateAttributes ||
                this.serviceDescription.accumulateAttributeNames;
              w && -1 === U.indexOf(b, w.name) && b.push(w.name);
              !this._isTimeUnits(h.units) &&
                this.serviceDescription &&
                10.6 <= this.serviceDescription.currentVersion &&
                r &&
                -1 === U.indexOf(b, r.name) &&
                b.push(r.name);
              this.routeParams.accumulateAttributes = b;
              a.returnStops = !0;
              r = [];
              for (b = 0; b < this.stopGraphics.length; b++)
                if (
                  this.stopGraphics[b] &&
                  (r.push(new u(this.stopGraphics[b].toJson())), b)
                ) {
                  var K = r[0].attributes,
                    S = r[b].attributes;
                  for (W in S)
                    S.hasOwnProperty(W) &&
                      !K.hasOwnProperty(W) &&
                      (K[W] = null);
                }
              if (
                this.get("returnToStart") &&
                this.stopGraphics.length &&
                this._isStopLocated(this.stops[0])
              ) {
                var W = new u(this.stopGraphics[0].toJson());
                this._returnToStartStop = this._addStopWrapperToGraphic(
                  W,
                  W.attributes.Name
                );
                r.push(W);
              } else this._returnToStartStop = null;
              a.stops.features = r;
              if (w)
                for (b = 0; b < r.length; b++)
                  r[b].attributes["Attr_" + w.name] = this._convertCostValue(
                    r[b].attributes["Attr_" + h.name],
                    h.units,
                    w.units
                  );
              this.set("routeParams", a);
            },
            _configureRoute: function () {
              var a = new x();
              a.promise.always(
                k.hitch(this, function () {
                  this._checkMaxStops();
                })
              );
              this.createRouteSymbols();
              this._configureRouteOptions();
              if (
                this.routeParams.returnRoutes &&
                this._incrementalSolveStopRange
              ) {
                var b = this._incrementalSolveStopRange;
                b.start < b.end
                  ? (this.routeParams.stops.features =
                      this.routeParams.stops.features.slice(b.start, b.end + 1))
                  : b.start > b.end &&
                    (this.routeParams.stops.features =
                      this.routeParams.stops.features
                        .slice(
                          b.start,
                          this.routeParams.stops.features.length - 1
                        )
                        .concat(
                          this.routeParams.stops.features.slice(0, b.end + 1)
                        ));
              } else this._incrementalSolveStopRange = null;
              var h = {},
                w = this.routeParams.stops.features;
              for (b = 0; b < w.length; b++) {
                var r = w[b].attributes.address;
                var K =
                  (b === this._handle._index &&
                  !this._handle.attributes.isWaypoint &&
                  this._incrementalSolveStopRange
                    ? this._waypointName
                    : r) +
                  "_" +
                  this._stopSequence++;
                w[b].attributes.Name = K;
                h[K] = r;
                delete w[b].attributes.address;
                delete w[b].attributes.isWaypoint;
                delete w[b].attributes.Status;
              }
              this._solveInProgress = !0;
              var S = {
                _incrementalSolveStopRange: this._incrementalSolveStopRange,
              };
              this.routeTask.solve(
                this.routeParams,
                k.hitch(this, function (W) {
                  this._solveResultProcessing(W, h, S).then(
                    a.resolve,
                    a.reject
                  );
                }),
                k.hitch(this, function (W) {
                  k.mixin(this, S);
                  this._solveInProgress = !1;
                  for (var Y = 0; Y < this.stops.length; Y++)
                    this.stops[Y].feature &&
                      (this.stops[Y].feature.attributes = k.mixin(
                        this.stops[Y].feature.attributes,
                        { Status: 5 }
                      ));
                  this.set("directions", null);
                  this._clearDisplayAfterSolve();
                  this.createRouteSymbols();
                  this._routeTaskError(W);
                  a.reject(W);
                })
              );
              return a.promise;
            },
            _solveResultProcessing: function (a, b, h) {
              var w = new x();
              k.mixin(this, h);
              this._solveInProgress = !1;
              h = a.routeResults[0];
              var r = h.directions;
              h = h.stops;
              if (r) {
                this._solverMessages = a.messages;
                var K = function (ha) {
                  for (var ma in b)
                    if (
                      (ha && 0 === r.routeName.indexOf(ma)) ||
                      (!ha && 0 < r.routeName.indexOf(ma))
                    )
                      return b[ma];
                  return "";
                };
                var S = K(!0);
                K = K(!1);
                r.routeName =
                  (S !== this._waypointName
                    ? S
                    : G.widgets.directions.waypoint) +
                  " \u2014 " +
                  (K !== this._waypointName
                    ? K
                    : G.widgets.directions.waypoint);
                for (S = 0; S < r.features.length; S++)
                  if (
                    ((K = r.features[S].attributes),
                    "esriDMTDepart" === K.maneuverType ||
                      "esriDMTStop" === K.maneuverType)
                  )
                    for (var W in b)
                      if (b.hasOwnProperty(W) && -1 < K.text.indexOf(W)) {
                        K.text = K.text.replace(W, b[W]);
                        for (var Y = 0; Y < h.length; Y++) {
                          var fa = h[Y].attributes;
                          if (fa.Name === W) {
                            k.mixin(r.features[S], {
                              _associatedStop:
                                h[
                                  this.returnToStart && Y === h.length - 1
                                    ? 0
                                    : Y
                                ],
                              _associatedStopWithReturnToStart: h[Y],
                            });
                            if (
                              !fa.ArriveTime &&
                              !fa.ArriveTimeUTC &&
                              K.ETA &&
                              K.arriveTimeUTC
                            ) {
                              fa.ArriveTime = K.ETA;
                              fa.ArriveTimeUTC = K.arriveTimeUTC;
                              Y = 0;
                              if (
                                (0 == S &&
                                  "esriDMTDepart" === K.maneuverType) ||
                                (0 < S && "esriDMTStop" === K.maneuverType)
                              )
                                Y = this._convertCostValue(
                                  K.time,
                                  (this._getDirectionsTimeAttribute() || {})
                                    .units,
                                  "milliseconds"
                                );
                              fa.DepartTime = fa.ArriveTime + Y;
                              fa.DepartTimeUTC = fa.ArriveTimeUTC + Y;
                            }
                            break;
                          }
                        }
                      }
                for (S = 0; S < h.length; S++)
                  this._returnToStartStop &&
                    h[S].attributes.Name ===
                      this._returnToStartStop.feature.attributes.Name &&
                    (this._returnToStartStop._resultsStopIndex = S),
                    (h[S].attributes.Name = b[h[S].attributes.Name]);
                this._directionsPostprocessing(r);
                this.traffic && this._updateMapTimeExtent();
              }
              this._showRoute(a).always(
                k.hitch(this, function () {
                  this._incrementalSolveStopRange = null;
                  w.resolve(a);
                })
              );
              return w.promise;
            },
            _directionsPostprocessing: function (a) {
              var b,
                h = function (K, S) {
                  var W = a.features[K]._associatedFeaturesWithWaypoints || [];
                  W.push(a.featuresWithWaypoints[S]);
                  a.features[K]._associatedFeaturesWithWaypoints = W;
                  a.featuresWithWaypoints[S]._associatedFeatureNoWaypoints =
                    a.features[K];
                };
              var w = k.hitch(this, function (K) {
                return (
                  "\x3cdiv class\x3d'" +
                  this.theme +
                  "'\x3e\x3ctable class\x3d'esriRoutesTooltip'\x3e" +
                  this._renderDirectionsItemTR(
                    K._associatedFeatureNoWaypoints
                  ) +
                  "\x3c/table\x3e\x3c/div\x3e"
                );
              });
              a.featuresWithWaypoints = [];
              for (b = 0; b < a.features.length; b++) {
                var r = new u(a.features[b].toJson());
                r.setInfoTemplate(
                  new ea({
                    title: this._i18n.widgets.directions.maneuver,
                    content: w,
                  })
                );
                a.featuresWithWaypoints.push(r);
                a.featuresWithWaypoints[b]._associatedStop =
                  a.features[b]._associatedStop;
                a.featuresWithWaypoints[b]._associatedStopWithReturnToStart =
                  a.features[b]._associatedStopWithReturnToStart;
              }
              a.stringsWithWaypoints = k.mixin([], a.strings);
              a.eventsWithWaypoints = k.mixin([], a.events);
              for (w = b = 0; b < a.features.length; )
                a.features[b]._associatedStop &&
                a.features[b]._associatedStop.attributes.Name ===
                  this._waypointName
                  ? (a.features.splice(b, b ? 2 : 1),
                    a.strings.splice(b, b ? 2 : 1),
                    a.events.splice(b, b ? 2 : 1),
                    b &&
                    a.features[b] &&
                    "esriDMTStraight" === a.features[b].attributes.maneuverType
                      ? ((r = a.features.splice(b, 1)[0]),
                        (a.strings[b - 1] = (a.strings[b - 1] || []).concat(
                          a.strings.splice(b, 1)[0] || []
                        )),
                        a.strings[b - 1].length || (a.strings[b - 1] = void 0),
                        (a.events[b - 1] = (a.events[b - 1] || []).concat(
                          a.events.splice(b, 1)[0] || []
                        )),
                        a.events[b - 1].length || (a.events[b - 1] = void 0),
                        (a.features[b - 1].attributes.length +=
                          r.attributes.length),
                        (a.features[b - 1].attributes.time +=
                          r.attributes.time),
                        (a.features[b - 1].geometry.paths[0] = a.features[
                          b - 1
                        ].geometry.paths[0].concat(r.geometry.paths[0])),
                        h(b - 1, w++),
                        h(b - 1, w++),
                        h(b - 1, w++))
                      : (b && h(b - 1, w++),
                        b < a.features.length && h(b, w++)))
                  : (h(b, w++), b++);
            },
            _boldText: function (a, b) {
              try {
                var h = new RegExp(
                  "[^\x3cstrong\x3e\x26nbsp;]" +
                    b.replace(
                      /(\||\$|\^|\(|\)|\[|\]|\{|\}|\/|\.|\+|\*|\?|\?)/g,
                      "\\$1"
                    ) +
                    "[^\x26nbsp;\x3c/strong\x3e]",
                  "g"
                );
                a = (" " + a + " ").replace(
                  h,
                  "\x3cstrong\x3e\x26nbsp;" + b + "\x26nbsp;\x3c/strong\x3e"
                );
                a = a.trim();
              } catch (w) {}
              return a;
            },
            _clearStopGraphics: function () {
              if (this.stopGraphics && this.stopGraphics.length)
                for (var a = 0; a < this.stopGraphics.length; a++)
                  this._stopLayer.remove(this.stopGraphics[a]),
                    this._stopLayer.remove(this.textGraphics[a]);
              this.set("stopGraphics", []);
              this.set("textGraphics", []);
            },
            _updateMapTimeExtent: function () {
              if (this.map) {
                var a =
                    (this.directions &&
                      this.directions.features[0] &&
                      this.directions.features[0].attributes) ||
                    {},
                  b = new Date().getTime();
                b = "none" == this.startTime ? b : a.arriveTimeUTC || b;
                this._useTrafficItemNode.title =
                  "none" !== this.startTime && a.arriveTimeUTC
                    ? G.widgets.directions.trafficLabelDepartAt +
                      ": " +
                      this._toSpatiallyLocalTimeString(a.arriveTimeUTC, a.ETA)
                    : "";
                this._myTimeExtentUpdate = !0;
                a = new Date(b);
                this.map.setTimeExtent(new ia(a, a));
              }
            },
            _restoreMapTimeExtent: function () {
              this.map &&
                ((this._myTimeExtentUpdate = !0),
                this.map.setTimeExtent(this._externalTimeExtent));
            },
            _clearRouteGraphics: function () {
              for (
                var a = this.displayedRouteGraphics,
                  b = this.displayedManeuverPointGraphics,
                  h = this._routeLayer,
                  w = this._waypointsEventLayer,
                  r = 0,
                  K = 0,
                  S = this._incrementalSolveStopRange
                    ? this._incrementalSolveStopRange
                    : { start: 0, end: this.stops ? this.stops.length : -1 };
                a && K < a.length;

              ) {
                if (a[K]._associatedStop)
                  for (var W = 0; W < this.stops.length; W++)
                    if (this.stops[W].feature === a[K]._associatedStop) {
                      r = W;
                      break;
                    }
                (r >= S.start && r < S.end) ||
                (S.start >= S.end && (r >= S.start || r < S.end))
                  ? (h.remove(a[K]), a.splice(K, 1))
                  : K++;
              }
              h.remove(this._incrementalRouteSegment);
              this.set("displayedRouteGraphics", a ? a : []);
              b &&
                b.length &&
                U.forEach(b, function (Y) {
                  w.remove(Y);
                });
              this.set("displayedManeuverPointGraphics", []);
              this._waypointsEventLayer.clear();
              this.unhighlightSegment(!0);
            },
            _clearInfoWindow: function () {
              var a = this.get("map").infoWindow;
              a && (a.hide(), a.clearFeatures());
            },
            _clearDisplayBeforeSolve: function () {
              this._toggleSaveMenu(!1);
              this._clearInfoWindow();
              this._clearResultsHTML();
            },
            _clearDisplayAfterSolve: function () {
              this._clearStopGraphics();
              this._clearRouteGraphics();
              this._clearBarriersGraphics();
              this.clearMessages();
            },
            _getLetter: function (a) {
              var b = this.alphabet,
                h = "",
                w = function (S) {
                  var W = "";
                  "0123456789" === b || "1234567890" === b
                    ? (W = String(S + 1))
                    : ((S = S || 0),
                      S >= b.length &&
                        ((W = w(Math.floor(S / b.length) - 1)),
                        (S %= b.length)),
                      (W += b[S]));
                  return W;
                },
                r =
                  a instanceof u
                    ? k.hitch(this, function () {
                        for (
                          var S = this.get("returnToStart") ? 0 : -1, W = 0;
                          W < this.stops.length;
                          W++
                        )
                          if (this.stops[W].feature === a) {
                            S = W;
                            break;
                          }
                        return S;
                      })()
                    : a;
              if (-1 < r && b && b.length) {
                b instanceof Array && (b = b.toString().replace(/,/g, ""));
                h = -1;
                for (var K = 0; K <= r; K++)
                  h += this._isStopAWaypoint(this.stops[K]) ? 0 : 1;
                h = w(h);
              }
              return h;
            },
            _solveAndZoom: function (a) {
              if (this.autoSolve)
                return this._getDirections().then(
                  k.hitch(this, function () {
                    a || this.zoomToFullRoute();
                  })
                );
              var b = new x();
              b.resolve();
              return b.promise;
            },
            _setupEvents: function () {
              this._onEvents.push(
                t(this.domNode, "[data-blur-on-click]:click", function () {
                  this.blur();
                })
              );
              this._onEvents.push(
                t(
                  this._dndNode,
                  "[data-reverse-stops]:click, [data-reverse-stops]:keydown",
                  k.hitch(this, function (r) {
                    r &&
                      ("click" === r.type ||
                        ("keydown" === r.type && r.keyCode === d.ENTER)) &&
                      this.modifyStopSequence();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._printButton,
                  "click, keydown",
                  k.hitch(this, function (r) {
                    r &&
                      ("click" === r.type ||
                        ("keydown" === r.type && r.keyCode === d.ENTER)) &&
                      this._printDirections();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._resultsNode,
                  "[data-full-route]:click, [data-full-route]:keydown",
                  k.hitch(this, function (r) {
                    r &&
                      ("click" === r.type ||
                        ("keydown" === r.type && r.keyCode === d.ENTER)) &&
                      this.zoomToFullRoute();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._dndNode,
                  "[data-remove]:click, [data-remove]:keydown",
                  k.hitch(this, function (r) {
                    if (
                      r &&
                      ("click" === r.type ||
                        ("keydown" === r.type && r.keyCode === d.ENTER))
                    ) {
                      var K = M("[data-remove]", this._dndNode);
                      r = U.indexOf(K, r.target);
                      this.removeStop(r);
                    }
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._dndNode,
                  "[data-center-at]:click, [data-center-at]:keydown",
                  k.hitch(this, function (r) {
                    if (
                      r &&
                      ("click" === r.type ||
                        ("keydown" === r.type && r.keyCode === d.ENTER))
                    ) {
                      var K = M("[data-center-at]", this._dndNode);
                      r = U.indexOf(K, r.target);
                      this.stops[r] &&
                        this.stops[r].feature &&
                        this.stops[r].feature.geometry &&
                        this.map.centerAndZoom(this.stops[r].feature.geometry);
                    }
                  })
                )
              );
              this._onEvents.push(
                t(
                  this.map,
                  "zoom-end",
                  k.hitch(this, function () {
                    var r = this._segmentGraphics;
                    r &&
                      r[0] &&
                      void 0 !== r[0].attributes._index &&
                      this.highlightSegment(r[0].attributes._index, !0);
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._dnd,
                  "Drop",
                  k.hitch(this, function () {
                    this._dnd.sync();
                    this.set("optimalRoute", !1);
                    var r,
                      K = !1,
                      S = [],
                      W = this._dnd.getAllNodes();
                    for (r = 0; r < this.geocoders.length; r++) {
                      var Y = U.indexOf(W, this.geocoders[r]._tr);
                      if (-1 < Y && r !== Y && r !== Y - 1) {
                        for (; 0 < Y && this._isStopAWaypoint(this.stops[Y]); )
                          Y--;
                        K = !0;
                        break;
                      }
                    }
                    K &&
                      (S = this._markWPsForRemovalAfterUserChangedStopSequence(
                        r,
                        Y
                      ));
                    this._sortGeocoders();
                    this.setListIcons();
                    this._removeSomeWaypoints(S);
                    this.stops[Y].name && this.getDirections();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._dnd,
                  "DndStart",
                  k.hitch(this, function () {
                    var r = M("body")[0];
                    T.add(r, this._css.dndDragBodyClass);
                    this._removeLocateButtonVisibilityEvents();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this._dnd,
                  "DndDrop, DndCancel",
                  k.hitch(this, function () {
                    var r = M("body")[0];
                    T.remove(r, this._css.dndDragBodyClass);
                    this._setLocateButtonVisibilityEvents();
                  })
                )
              );
              var a = this._handle,
                b = k.hitch(this, function (r) {
                  var K = k.hitch(this, function (W, Y, fa, ha, ma) {
                    var na = a._isShown();
                    a.setGeometry(W);
                    a._tooltip.style.left = r.screenPoint.x + "px";
                    a._tooltip.style.top = r.screenPoint.y + "px";
                    !na ||
                      (a._index === fa && a.attributes.isWaypoint === ha) ||
                      (a._remove(), (na = !1));
                    a.setSymbol(Y);
                    a._index = fa;
                    a._isStopIcon = a._index === Math.floor(a._index);
                    a.attributes.isWaypoint = ha;
                    a._isStopIcon &&
                      ((a.attributes.address =
                        this.stopGraphics[fa].attributes.address),
                      a.setInfoTemplate(this.stopGraphics[fa].infoTemplate));
                    if (this.canModifyWaypoints || a._isStopIcon)
                      na ||
                        (this._stopLayer.add(a),
                        (W = a.getDojoShape()) &&
                          W[ha ? "moveToBack" : "moveToFront"].call(W)),
                        this.editToolbar.activate(Ya.MOVE, a);
                    ha = ha
                      ? a._isStopIcon
                        ? G.widgets.directions.dragWaypoint
                        : this.canModifyWaypoints
                        ? G.widgets.directions.dragRoute
                        : ""
                      : G.widgets.directions.dragStop;
                    a._showTooltip(ma || ha);
                  });
                  this.unhighlightSegment();
                  if (
                    this.mapClickActive &&
                    this.dragging &&
                    !this._solveInProgress &&
                    !this._moveInProgress &&
                    !a._solveTimeout
                  )
                    if (
                      (clearTimeout(a._removeTimeout),
                      ((r.graphic._isStopIcon || r.graphic._isStopLabel) &&
                        !r.graphic.attributes.isWaypoint &&
                        this.canModifyStops) ||
                        (r.graphic._isStopIcon &&
                          r.graphic.attributes.isWaypoint &&
                          this.canModifyWaypoints))
                    ) {
                      var S = r.graphic._isStopLabel
                        ? this.stopGraphics[r.graphic._index]
                        : r.graphic;
                      K(
                        S.geometry,
                        this._getStopSymbol(this.stops[S._index], !0),
                        S._index,
                        !0 === S.attributes.isWaypoint
                      );
                      this._stopLayer.remove(this.stopGraphics[S._index]);
                      this._stopLayer.remove(this.textGraphics[S._index]);
                    } else if (
                      r.graphic._isSnapFeature ||
                      (r.graphic._isHandle && !r.graphic._isStopIcon)
                    )
                      this._snappingManager ||
                        (this._snappingManager = this.map.snappingManager),
                        this._snappingManager
                          .getSnappingPoint(r.screenPoint)
                          .then(
                            k.hitch(this, function (W) {
                              if (
                                !this.maxStopsReached &&
                                !this._moveInProgress &&
                                W
                              ) {
                                for (
                                  var Y = this.displayedManeuverPointGraphics,
                                    fa = null,
                                    ha = 0;
                                  ha < Y.length;
                                  ha++
                                )
                                  if (
                                    Y[ha].geometry.x === W.x &&
                                    Y[ha].geometry.y === W.y
                                  ) {
                                    fa = Y[ha]._directionsFeature;
                                    Y = U.indexOf(this.directions.features, fa);
                                    -1 < Y && this.highlightSegment(Y);
                                    break;
                                  }
                                K(
                                  W,
                                  r.graphic._isHandle
                                    ? a.symbol
                                    : this.waypointSymbol,
                                  r.graphic._isHandle
                                    ? a._index
                                    : r.graphic._nextStopIndex,
                                  r.graphic._isHandle
                                    ? a.attributes.isWaypoint
                                    : !0,
                                  fa
                                );
                              }
                            })
                          );
                }),
                h = k.hitch(this, function () {
                  clearTimeout(a._removeTimeout);
                  a._removeTimeout = setTimeout(a._remove, 100);
                  this.unhighlightSegment();
                }),
                w = k.hitch(this, function (r) {
                  if (this.barrierToolActive) {
                    r = r.graphic;
                    var K = this.routeParams,
                      S = K.barriers ? U.indexOf(K.barriers.features, r) : -1,
                      W = K.polygonBarriers
                        ? U.indexOf(K.polygonBarriers.features, r)
                        : -1,
                      Y = K.polylineBarriers
                        ? U.indexOf(K.polylineBarriers.features, r)
                        : -1;
                    -1 < S && K.barriers.features.splice(S, 1);
                    -1 < W && K.polygonBarriers.features.splice(W, 1);
                    -1 < Y && K.polylineBarriers.features.splice(Y, 1);
                    this._barriersLayer.remove(r);
                    this._polygonBarriersLayer.remove(r);
                    this._polylineBarriersLayer.remove(r);
                    this._clearStopsStatusAttr();
                    this.getDirections(!0);
                  }
                });
              this._onEvents.push(
                this._waypointsEventLayer.on("mouse-move", b)
              );
              this._onEvents.push(this._waypointsEventLayer.on("mouse-out", h));
              this._onEvents.push(this._stopLayer.on("mouse-move", b));
              this._onEvents.push(this._stopLayer.on("mouse-out", h));
              this._onEvents.push(this._barriersLayer.on("click", w));
              this._onEvents.push(this._polylineBarriersLayer.on("click", w));
              this._onEvents.push(this._polygonBarriersLayer.on("click", w));
              this._editToolbarEvents();
              this._watchEvents.push(
                this.watch("theme", this._updateThemeWatch)
              );
              this._watchEvents.push(
                this.watch("canModifyStops", this._updateCanModifyStops)
              );
              this._watchEvents.push(
                this.watch("canModifyWaypoints", this._updateCanAddWaypoints)
              );
              this._watchEvents.push(
                this.watch("showReturnToStartOption", this._optionsMenu)
              );
              this._watchEvents.push(
                this.watch("showOptimalRouteOption", this._optionsMenu)
              );
              this._watchEvents.push(
                this.watch("returnToStart", this._setMenuNodeValues)
              );
              this._watchEvents.push(
                this.watch("optimalRoute", this._setMenuNodeValues)
              );
              this._watchEvents.push(
                this.watch("startTime", this._setStartTime)
              );
              this._watchEvents.push(
                this.watch("traffic", this._setMenuNodeValues)
              );
              this._watchEvents.push(
                this.watch("trafficLayer", this._trafficLayerUpdate)
              );
              this._watchEvents.push(
                this.watch(
                  "routeTaskUrl",
                  k.hitch(this, function () {
                    this._createRouteTask();
                    this._setTrafficOptions();
                  })
                )
              );
              this._watchEvents.push(
                this.watch(
                  "printTaskUrl",
                  k.hitch(this, function () {
                    this._createPrintTask();
                  })
                )
              );
              this._watchEvents.push(
                this.watch(
                  "geometryTaskUrl",
                  k.hitch(this, function () {
                    this._createGeometryTask();
                  })
                )
              );
              this._watchEvents.push(
                this.watch(
                  "routeParams",
                  k.hitch(this, function () {
                    this._createRouteParams();
                    this._setDefaultUnits();
                  })
                )
              );
              this._watchEvents.push(
                this.watch(
                  "searchOptions",
                  k.hitch(this, function () {
                    this._setSearchOptions();
                    this._createGlobalGeocoder();
                    var r = this.get("searchOptions").sources;
                    if (r)
                      for (var K = 0; K < this.geocoders.length; K++)
                        this.geocoders[K].set("sources", r);
                  })
                )
              );
              this._watchEvents.push(
                this.watch("showReverseStopsButton", this.setListIcons)
              );
              this._watchEvents.push(
                this.watch("editToolbar", this._editToolbarEvents)
              );
              this._watchEvents.push(
                this.watch("showTravelModesOption", this._showTravelModesOption)
              );
              this._watchEvents.push(
                this.watch(
                  "showMilesKilometersOption",
                  this._showMilesKilometersOption
                )
              );
              this._watchEvents.push(
                this.watch("showClearButton", this._showClearButton)
              );
              this._watchEvents.push(
                this.watch(
                  "directionsLengthUnits",
                  this.setDirectionsLengthUnits
                )
              );
              this._watchEvents.push(
                this.watch("directionsLanguage", this.setDirectionsLanguage)
              );
              this._watchEvents.push(
                this.watch("mapClickActive", this._activate)
              );
              this._watchEvents.push(
                this.watch("barrierToolActive", this._activateBarrierTool)
              );
              this._watchEvents.push(
                this.watch("showActivateButton", this._showActivateButton)
              );
              this._watchEvents.push(
                this.watch("showBarriersButton", this._showBarriersButton)
              );
              this._watchEvents.push(
                this.watch("showPrintPage", function () {
                  H.set(
                    this._printButton,
                    "display",
                    this.showPrintPage ? "inline-block" : "none"
                  );
                })
              );
              this._watchEvents.push(
                this.watch("showSaveButton", function () {
                  H.set(
                    this._saveMenuButton,
                    "display",
                    this.showSaveButton && this.owningSystemUrl
                      ? "inline-block"
                      : "none"
                  );
                })
              );
            },
            _editToolbarEvents: function () {
              var a = k.hitch(this, function (h) {
                  var w = "";
                  if (
                    (h = h.routeResults ? h.routeResults[0] : null) &&
                    h.route
                  ) {
                    h = h.route.attributes;
                    var r = this.routeParams.travelMode;
                    if (r) {
                      w +=
                        "\x3cb\x3e" +
                        r.name +
                        "\x3c/b\x3e " +
                        G.widgets.directions.toNearbyStops +
                        ": ";
                      var K =
                        void 0 !== h["Total_" + r.timeAttributeName]
                          ? this._formatTime(
                              h["Total_" + r.timeAttributeName],
                              !1,
                              (
                                this._getCostAttribute(r.timeAttributeName) ||
                                {}
                              ).units
                            )
                          : "";
                      w +=
                        (void 0 !== h["Total_" + r.distanceAttributeName]
                          ? this._formatDistance(
                              h["Total_" + r.distanceAttributeName],
                              !0,
                              (
                                this._getCostAttribute(
                                  r.distanceAttributeName
                                ) || {}
                              ).units
                            )
                          : "") + (K ? " \x26middot; " + K : "");
                    } else w = this._formatArbitraryCostsForRouteTooltip(h);
                  }
                  this._handle._showTooltip(w);
                }),
                b = k.hitch(this, function (h, w) {
                  var r = new x(),
                    K = this._handle,
                    S = this.map
                      .toScreen(K._origPoint)
                      .offset(
                        h.transform.dx + K.symbol.xoffset,
                        h.transform.dy + K.symbol.yoffset
                      );
                  h.origMapPoint || (h.origMapPoint = this.map.toMap(S));
                  H.set(K._tooltip, "left", S.x + "px");
                  H.set(K._tooltip, "top", S.y + "px");
                  clearTimeout(K._solveTimeout);
                  if (
                    this._solveInProgress ||
                    !this._requestQueueTail.isFulfilled()
                  )
                    K._solveTimeout = setTimeout(function () {
                      b(h, w).always(r.resolve);
                    }, 100);
                  else if (K._isStopIcon) {
                    S = h.graphic._index;
                    var W = this.stops[S];
                    (W = W
                      ? {
                          name: W.name,
                          extent: W.extent,
                          feature: new u(W.feature.toJson()),
                        }
                      : null)
                      ? (W.feature.setGeometry(h.origMapPoint),
                        (this._modifiedWaypointIndex = this._isStopAWaypoint(
                          this.stops[S]
                        )
                          ? S
                          : null),
                        (this._incrementalSolveStopRange = {
                          start: this.returnToStart
                            ? (this.stops.length + S - 1) % this.stops.length
                            : Math.max(0, S - 1),
                          end: this.returnToStart
                            ? (S + 1) % this.stops.length
                            : Math.min(this.stops.length - 1, S + 1),
                        }),
                        this.updateStop(W, S, w).always(
                          k.hitch(this, function (Y) {
                            K._solveTimeout = null;
                            Y.routeResults && a(Y);
                            r.resolve();
                          })
                        ))
                      : r.resolve();
                  } else r.resolve();
                  return r.promise;
                });
              this._onEvents.push(
                t(
                  this.editToolbar,
                  "graphic-click",
                  k.hitch(this, function (h) {
                    if (h.graphic.attributes.isWaypoint)
                      !h.graphic._isStopIcon ||
                        this._moveInProgress ||
                        this._solveInProgress ||
                        (this._handle._remove(),
                        (this._moveInProgress = !0),
                        this.removeStop(h.graphic._index, !0).always(
                          k.hitch(this, function () {
                            this._moveInProgress = !1;
                          })
                        ));
                    else {
                      var w = this.get("map").infoWindow;
                      w &&
                        (w.setFeatures([h.graphic]),
                        w.show(h.graphic.geometry));
                    }
                  })
                )
              );
              this._onEvents.push(
                t(
                  this.editToolbar,
                  "graphic-move-start",
                  k.hitch(this, function (h) {
                    this._blurGeocoders();
                    this._moveInProgress = !0;
                    this._removeEmptyStops();
                    this.routeParams.returnDirections = !1;
                    this.routeParams.returnRoutes = !0;
                    h = h.graphic;
                    h._origPoint = new e(h.geometry.toJson());
                    h._maxDeviation = 0;
                    h._solveHasHappened = !1;
                    this.map.disableMapNavigation();
                  })
                )
              );
              this._onEvents.push(
                t(
                  this.editToolbar,
                  "graphic-move-stop",
                  k.hitch(this, function (h) {
                    this.map.enableMapNavigation();
                    this.routeParams.returnDirections = !0;
                    this.routeParams.returnRoutes = !1;
                    if (this._handle._isStopIcon)
                      if (this._handle._solveHasHappened)
                        if (this._handle.attributes.isWaypoint)
                          b(h, !0).always(
                            k.hitch(this, function () {
                              this._moveInProgress = !1;
                              this._handle._isStopIcon = !0;
                              this._handle._remove();
                              this._showLoadingSpinner();
                            })
                          );
                        else {
                          clearTimeout(this._handle._solveTimeout);
                          this._handle._solveTimeout = null;
                          var w = this.stops[h.graphic._index],
                            r =
                              (w &&
                                w.feature &&
                                w.feature.attributes &&
                                w.feature.attributes.Name) ===
                              this._userDefinedStopName,
                            K = w && w.name;
                          this._reverseGeocode(new u(h.graphic.toJson())).then(
                            k.hitch(this, function (S) {
                              r &&
                                ((S.name = K),
                                (S.feature.attributes.Name =
                                  this._userDefinedStopName));
                              this._setReverseGeocode(
                                S,
                                S.feature.geometry,
                                h.graphic._index
                              ).always(
                                k.hitch(this, function () {
                                  this._moveInProgress = !1;
                                  this._handle._remove();
                                  this._showLoadingSpinner();
                                })
                              );
                            })
                          );
                        }
                      else this._moveInProgress = !1;
                    else this._moveInProgress = !1;
                  })
                )
              );
              this._onEvents.push(
                t(
                  this.editToolbar,
                  "graphic-move",
                  k.hitch(this, function (h) {
                    var w = this._handle,
                      r = h.transform;
                    r.dx &&
                      r.dy &&
                      (h.graphic._maxDeviation = Math.max(
                        w._maxDeviation,
                        Math.sqrt(r.dx * r.dx + r.dy * r.dy)
                      ));
                    10 < w._maxDeviation &&
                      ((w._solveHasHappened = !0),
                      h.graphic === w &&
                      w.attributes.isWaypoint &&
                      !w._isStopIcon
                        ? (this.set("optimalRoute", !1),
                          (w._index += 0.5),
                          (w._isStopIcon = !0),
                          (h.graphic._stopIndex = w._index),
                          (this._incrementalSolveStopRange = {
                            start: this.returnToStart
                              ? (this.stops.length + w._index - 1) %
                                this.stops.length
                              : Math.max(0, w._index - 1),
                            end: this.returnToStart
                              ? (w._index + 1) % (this.stops.length + 1)
                              : Math.min(this.stops.length, w._index + 1),
                          }),
                          this.addStop(
                            {
                              name: this._waypointName,
                              feature: new u(w.geometry, w.symbol, {
                                isWaypoint: !0,
                                CurbApproach: 3,
                              }),
                            },
                            h.graphic._stopIndex
                          ))
                        : ((w = h.graphic.getDojoShape()) && w.moveToFront(),
                          b(h)));
                  })
                )
              );
            },
            _isStopAWaypoint: function (a) {
              return (
                a &&
                a.feature &&
                a.feature.attributes &&
                a.feature.attributes.isWaypoint
              );
            },
            _getStopCount: function () {
              var a = 0,
                b;
              for (b = 0; b < this.stops.length; b++)
                a +=
                  !this._isStopAWaypoint(this.stops[b]) && this.stops[b].name
                    ? 1
                    : 0;
              return a;
            },
            _getWaypointCount: function () {
              var a = 0,
                b;
              for (b = 0; b < this.stops.length; b++)
                a += this._isStopAWaypoint(this.stops[b]) ? 1 : 0;
              return a;
            },
            _decorateUngeocodedStop: function (a) {
              var b = new x(),
                h = function (r, K) {
                  b.resolve({
                    name:
                      void 0 === r
                        ? G.widgets.directions.unlocatedStop
                        : r.toFixed(6) + " " + K.toFixed(6),
                    feature: a,
                  });
                };
              if (a.geometry)
                if (
                  a.geometry.spatialReference &&
                  4326 !== a.geometry.spatialReference.wkid
                )
                  if (
                    this.map &&
                    this.map.spatialReference &&
                    this.map.spatialReference.isWebMercator()
                  ) {
                    var w = xa.xyToLngLat(a.geometry.x, a.geometry.y);
                    h(w[0], w[1]);
                  } else
                    this._geometryService
                      ? ((w = new $a()),
                        (w.outSR = new ka(4326)),
                        (w.geometries = [a.geometry]),
                        this._geometryService.project(w).then(
                          k.hitch(this, function (r) {
                            r && r.length
                              ? h(r[0].x, r[0].y)
                              : h(a.geometry.x, a.geometry.y);
                          }),
                          k.hitch(this, function () {
                            h();
                          })
                        ))
                      : h(a.geometry.x, a.geometry.y);
                else h(a.geometry.x, a.geometry.y);
              else h();
              return b.promise;
            },
            _trafficLayerUpdate: function (a, b, h) {
              a = this.get("map");
              b &&
                this._trafficLayerAdded &&
                (a.removeLayer(b), (this._trafficLayerAdded = !1));
              h &&
                this.get("traffic") &&
                !this._trafficLayerAdded &&
                (a.addLayer(h), h.show(), (this._trafficLayerAdded = !0));
            },
            _routeTaskError: function (a) {
              var b = G.widgets.directions.error.routeTask,
                h = a.details,
                w = function (r) {
                  return (res = r.match(/(\d+)/)) ? ": " + res[0] : ".";
                };
              h &&
                1 === h.length &&
                ("The distance between any inputs must be less than 50 miles (80 kilometers) when walking." ===
                h[0]
                  ? (b = G.widgets.directions.error.maxWalkingDistance)
                  : "Driving a truck is currently not supported outside of North America and Central America." ===
                    h[0]
                  ? (b = G.widgets.directions.error.nonNAmTruckingMode)
                  : 0 ===
                    h[0].indexOf(
                      "The number of input locations loaded into Barriers"
                    )
                  ? (b = G.widgets.directions.error.tooManyBarriers + w(h[0]))
                  : 0 ===
                    h[0].indexOf(
                      "The number of input locations loaded into PolygonBarriers"
                    )
                  ? (b =
                      G.widgets.directions.error.tooManyPolygonBarriers +
                      w(h[0]))
                  : 0 ===
                      h[0].indexOf(
                        "The number of input locations loaded into PolylineBarriers"
                      ) &&
                    (b =
                      G.widgets.directions.error.tooManyPolylineBarriers +
                      w(h[0])));
              this._showMessage(b);
              this.onDirectionsFinish(a);
            },
            _showMessage: function (a, b) {
              var h = "";
              this.messages.push({ msg: a, error: !b });
              if (this.messages.length) {
                h += "\x3cul\x3e";
                for (var w = 0; w < this.messages.length; w++)
                  h +=
                    '\x3cli class\x3d"' +
                    (this.messages[w].error
                      ? this._css.routesErrorClass
                      : this._css.routesInfoClass) +
                    '"\x3e' +
                    this.messages[w].msg +
                    "\x3c/li\x3e";
                h += "\x3c/ul\x3e";
              }
              this._msgNode && (this._msgNode.innerHTML = h);
              if (!b) this.onError(a);
            },
            _isTimeUnits: function (a) {
              return (
                "milliseconds" === a ||
                "esriNAUSeconds" === a ||
                "esriNAUMinutes" === a ||
                "esriNAUHours" === a ||
                "esriNAUDays" === a
              );
            },
            _getImpedanceAttribute: function () {
              return this._getCostAttribute(
                (this.routeParams &&
                  this.routeParams.travelMode &&
                  this.routeParams.travelMode.impedanceAttributeName) ||
                  this.routeParams.impedanceAttribute ||
                  this.serviceDescription.impedance
              );
            },
            _getDirectionsTimeAttribute: function () {
              return this._getCostAttribute(
                (this.routeParams &&
                  this.routeParams.travelMode &&
                  this.routeParams.travelMode.timeAttributeName) ||
                  this.routeParams.directionsTimeAttribute ||
                  this.serviceDescription.directionsTimeAttribute
              );
            },
            _getTimeNeutralAttribute: function () {
              var a = (this._getDirectionsTimeAttribute() || {})
                .timeNeutralAttributeName;
              return this._getCostAttribute(a);
            },
            _getCostAttribute: function (a) {
              for (
                var b =
                    (this.serviceDescription &&
                      this.serviceDescription.networkDataset
                        .networkAttributes) ||
                    [],
                  h,
                  w = 0;
                w < b.length;
                w++
              )
                if (b[w].name === a && "esriNAUTCost" === b[w].usageType) {
                  h = b[w];
                  break;
                }
              return h;
            },
            _convertCostValue: function (a, b, h) {
              var w = this._isTimeUnits(b),
                r = this._isTimeUnits(h);
              b = w ? this._toMinutes(a, b) : this._toMeters(a, b);
              return w === r
                ? r
                  ? this._fromMinutes(b, h)
                  : this._fromMeters(b, h)
                : a;
            },
            _toMinutes: function (a, b, h) {
              a = a || 0;
              switch (b) {
                case "milliseconds":
                  a /= Math.pow(6e4, h ? -1 : 1);
                  break;
                case "esriNAUSeconds":
                  a /= Math.pow(60, h ? -1 : 1);
                  break;
                case "esriNAUHours":
                  a *= Math.pow(60, h ? -1 : 1);
                  break;
                case "esriNAUDays":
                  a *= Math.pow(1440, h ? -1 : 1);
              }
              return a;
            },
            _fromMinutes: function (a, b) {
              return this._toMinutes(a, b, !0);
            },
            _toMeters: function (a, b, h) {
              a = a || 0;
              switch ((b || "").replace("esriNAU", "esri")) {
                case "esriInches":
                  a *= Math.pow(0.0254, h ? -1 : 1);
                  break;
                case "esriFeet":
                  a *= Math.pow(0.3048, h ? -1 : 1);
                  break;
                case "esriYards":
                  a *= Math.pow(0.9144, h ? -1 : 1);
                  break;
                case "esriMiles":
                  a *= Math.pow(1609.344, h ? -1 : 1);
                  break;
                case "esriNauticalMiles":
                  a *= Math.pow(1851.995396854, h ? -1 : 1);
                  break;
                case "esriMillimeters":
                  a /= Math.pow(1e3, h ? -1 : 1);
                  break;
                case "esriCentimeters":
                  a /= Math.pow(100, h ? -1 : 1);
                  break;
                case "esriKilometers":
                  a *= Math.pow(1e3, h ? -1 : 1);
                  break;
                case "esriDecimeters":
                  a /= Math.pow(10, h ? -1 : 1);
              }
              return a;
            },
            _fromMeters: function (a, b) {
              return this._toMeters(a, b, !0);
            },
            _createRouteTask: function () {
              var a = new x();
              this.set("routeTask", new Ia(this.get("routeTaskUrl")));
              this._createRouteParams();
              this.routeTask
                .getServiceDescription(
                  this.travelModesServiceUrl,
                  this.doNotFetchTravelModesFromOwningSystem
                )
                .then(
                  k.hitch(this, function (b) {
                    b.networkDataset
                      ? (this.set("serviceDescription", b),
                        this.set(
                          "maxStops",
                          parseInt(
                            this.userOptions.maxStops ||
                              (b.serviceLimits &&
                                b.serviceLimits.Route_MaxStops) ||
                              this.defaults.maxStops
                          )
                        ),
                        this.defaults.portalUrl
                          ? ((this.owningSystemUrl = this.defaults.portalUrl),
                            a.resolve())
                          : this.routeTask.getOwningSystemUrl().then(
                              k.hitch(this, function (h) {
                                this.owningSystemUrl = h;
                                a.resolve();
                              }),
                              a.reject
                            ))
                      : (this._showMessage(
                          G.widgets.directions.error
                            .cantFindRouteServiceDescription
                        ),
                        a.reject(
                          Error(
                            G.widgets.directions.error
                              .cantFindRouteServiceDescription
                          )
                        ));
                  }),
                  k.hitch(this, function () {
                    this._showMessage(
                      G.widgets.directions.error.cantFindRouteServiceDescription
                    );
                    a.reject(
                      Error(
                        G.widgets.directions.error
                          .cantFindRouteServiceDescription
                      )
                    );
                    this.mapClickActive = !1;
                    this._activate();
                  })
                );
              return a.promise;
            },
            _createSearchSourceDDL: function () {
              if (
                this._globalGeocoder &&
                this._globalGeocoder.sources &&
                1 < this._globalGeocoder.sources.length
              ) {
                var a = k.hitch(this, function (w) {
                  this._searchSourceSelector.domNode.blur();
                  this._globalGeocoder.set("activeSourceIndex", w);
                  for (var r = 0; r < this.geocoders.length; r++)
                    this.geocoders[r].set("activeSourceIndex", w);
                  this._truncateSearchSourceIfNeeded();
                });
                if (!this._searchSourceSelector) {
                  for (
                    var b = [
                        {
                          value: "all",
                          label: G.widgets.Search.main.all,
                          selected: !0,
                        },
                      ],
                      h = 0;
                    h < this._globalGeocoder.sources.length;
                    h++
                  )
                    b.push({
                      value: String(h),
                      label: this._globalGeocoder.sources[h].name,
                    });
                  this._searchSourceSelector = new A(
                    {
                      className: "esriSearchSourcesDDL",
                      style: "width:100%;",
                      options: b,
                    },
                    this._searchSourceSelectorContainer
                  );
                  this._searchSourceSelector.startup();
                  this._searchSourceSelector.on("change", a);
                  this._searchSourceSelector.domNode.style.width = "";
                }
                a("all");
              } else
                2 > this._globalGeocoder.sources.length &&
                  (this._searchSourceContainerNode.style.display = "none");
            },
            _createTravelModesDDL: function () {
              this._travelModeSelector ||
                ((this._travelModeSelector = new A(
                  { className: "esriTravelModesDDL", style: "width:100%;" },
                  this._travelModeSelectorContainer
                )),
                this._travelModeSelector.startup(),
                (this._travelModeSelector._interractive = !0),
                this._travelModeSelector.on(
                  "change",
                  k.hitch(this, function (a) {
                    this._travelModeSelector._interractive
                      ? this._enqueue(function () {
                          return this._setTravelMode(a).always(
                            k.hitch(this, function () {
                              this._travelModeSelector._interractive = !0;
                            })
                          );
                        })
                      : (this._travelModeSelector._interractive = !0);
                  })
                ));
            },
            _setupTravelModes: function () {
              var a = this.get("serviceDescription"),
                b = a.supportedTravelModes,
                h = new x();
              if (b && b.length && this._travelModeSelector) {
                for (var w = b[0].name, r = [], K = 0; K < b.length; K++) {
                  for (
                    var S =
                        "AUTOMOBILE" === b[K].type
                          ? "Driving"
                          : "TRUCK" === b[K].type
                          ? "Trucking"
                          : "WALK" === b[K].type
                          ? "Walking"
                          : "Other",
                      W = "",
                      Y = a.networkDataset.networkAttributes,
                      fa = 0;
                    fa < Y.length;
                    fa++
                  ) {
                    var ha = Y[fa];
                    if (ha.name === b[K].impedanceAttributeName) {
                      if (
                        "esriNAUCentimeters" === ha.units ||
                        "esriNAUDecimalDegrees" === ha.units ||
                        "esriNAUDecimeters" === ha.units ||
                        "esriNAUFeet" === ha.units ||
                        "esriNAUInches" === ha.units ||
                        "esriNAUKilometers" === ha.units ||
                        "esriNAUMeters" === ha.units ||
                        "esriNAUMiles" === ha.units ||
                        "esriNAUMillimeters" === ha.units ||
                        "esriNAUNauticalMiles" === ha.units ||
                        "esriNAUYards" === ha.units
                      )
                        W = "Distance";
                      else if (
                        "esriNAUDays" === ha.units ||
                        "esriNAUHours" === ha.units ||
                        "esriNAUMinutes" === ha.units ||
                        "esriNAUSeconds" === ha.units
                      )
                        W = "Time";
                      break;
                    }
                  }
                  r.push({
                    id: b[K].name,
                    label:
                      '\x3cdiv class\x3d"esriTravelModesDirectionsIcon esriTravelModesType' +
                      S +
                      W +
                      '"\x3e\x26nbsp;\x3c/div\x3e\x3cdiv class\x3d"esriTravelModesTypeName" title\x3d"' +
                      b[K].description +
                      '"\x3e' +
                      b[K].name +
                      "\x3c/div\x3e",
                  });
                  !a.defaultTravelMode ||
                    (b[K].id !== a.defaultTravelMode &&
                      b[K].itemId !== a.defaultTravelMode) ||
                    (w = b[K].name);
                }
                this._showTravelModesOption();
                this._travelModeSelector.setStore(
                  new c({ objectStore: new f({ data: r }) })
                );
                this._travelModeSelector._interractive = !1;
                this._travelModeSelector.setValue(w);
                this._setTravelMode(w).always(h.resolve);
              } else
                this._checkStartTimeUIAvailability(),
                  this.set("showTravelModesOption", !1),
                  h.resolve();
              return h.promise;
            },
            _createPrintTask: function () {
              this._printService = (this.printTaskUrl = this._usingAGOL()
                ? this.printTaskUrl
                : this.defaults.printTaskUrl)
                ? new Sa(this.printTaskUrl, { async: !1 })
                : null;
              var a = new fb();
              a.exportOptions = { width: 670, height: 750, dpi: 96 };
              a.format = "PNG32";
              a.layout = "MAP_ONLY";
              a.preserveScale = !1;
              a.showAttribution = !1;
              var b = new Va();
              b.map = this.map;
              b.outSpatialReference = this.map.spatialReference;
              b.template = a;
              this._printParams = b;
            },
            _createGeometryTask: function () {
              this._geometryService = null;
              this._usingAGOL()
                ? (this._geometryService = new Ba(this.geometryTaskUrl))
                : (this.geometryTaskUrl = (this._geometryService = this.defaults
                    .geometryTaskUrl
                    ? new Ba(this.defaults.geometryTaskUrl)
                    : gb.defaults.geometryService)
                    ? this._geometryService.url
                    : null);
            },
            _showTravelModesOption: function () {
              var a = this.get("serviceDescription");
              H.set(
                this._travelModeContainerNode,
                "display",
                this.showTravelModesOption &&
                  a &&
                  a.supportedTravelModes &&
                  a.supportedTravelModes.length &&
                  !this.doNotFetchTravelModesFromOwningSystem
                  ? "block"
                  : "none"
              );
            },
            _showMilesKilometersOption: function () {
              H.set(
                this._agolDistanceUnitsNode,
                "display",
                this.showMilesKilometersOption ? "block" : "none"
              );
            },
            _showClearButton: function () {
              H.set(
                this._clearDirectionsButtonNode,
                "display",
                this.showClearButton ? "inline-block" : "none"
              );
            },
            _showActivateButton: function () {
              H.set(
                this._activateButtonNode,
                "display",
                this.showActivateButton ? "inline-block" : "none"
              );
              this.showActivateButton || this.deactivate();
            },
            _showBarriersButton: function () {
              H.set(
                this._lineBarrierButtonNode,
                "display",
                this.showBarriersButton ? "inline-block" : "none"
              );
              this.showBarriersButton || this.deactivateBarrierTool();
            },
            _createRouteParams: function () {
              var a = {
                returnDirections: !0,
                returnRoutes: !1,
                outputLines: "esriNAOutputLineTrueShape",
                preserveFirstStop: !0,
                preserveLastStop: !0,
                directionsOutputType: "complete",
                stops: new ua(),
                ignoreInvalidLocations: !0,
                doNotLocateOnRestrictedElements: !0,
                outSpatialReference: this.get("map").spatialReference,
              };
              this.get("routeParams") || (this.routeParams = {});
              var b = new Ka();
              this.routeParams = k.mixin(
                b,
                {
                  outputGeometryPrecision: 0,
                  outputGeometryPrecisionUnits: "esriMeters",
                  restrictUTurns: "esriNFSBAtDeadEndsOnly",
                },
                this.get("routeParams"),
                a
              );
            },
            _markWPsForRemovalAfterUserChangedStopSequence: function (a, b) {
              for (
                var h = a - 1, w = [];
                0 <= h && this._isStopAWaypoint(this.stops[h]);

              )
                w.push(this.stops[h]), h--;
              for (
                h = a + 1;
                h < this.stops.length && this._isStopAWaypoint(this.stops[h]);

              )
                w.push(this.stops[h]), h++;
              if (b > a)
                for (
                  h = b + 1;
                  h < this.stops.length && this._isStopAWaypoint(this.stops[h]);

                )
                  w.push(this.stops[h]), h++;
              else if (void 0 !== b)
                for (
                  h = b - 1;
                  0 <= h && this._isStopAWaypoint(this.stops[h]);

                )
                  w.push(this.stops[h]), h--;
              else if (this.returnToStart && 0 === a)
                for (
                  h = this.stops.length - 1;
                  0 <= h && this._isStopAWaypoint(this.stops[h]);

                )
                  w.push(this.stops[h]), h--;
              return w;
            },
            _removeSomeWaypoints: function (a) {
              for (var b = new x(), h = [], w = 0; w < a.length; w++) {
                var r = U.indexOf(this.stops, a[w]);
                -1 < r && h.push(this._removeStop(r, !0, !0));
              }
              X(h).always(b.resolve);
              return b.promise;
            },
            _modifyStopSequence: function (a, b) {
              var h = this._dnd.getAllNodes(),
                w = new x(),
                r,
                K = [];
              if (h.length)
                if (
                  (this._removeLocateButtonVisibilityEvents(),
                  arguments.length && void 0 !== a)
                )
                  if (
                    0 <= a &&
                    0 <= b &&
                    a < this.stops.length &&
                    b < this.stops.length &&
                    a !== b
                  ) {
                    h = this._markWPsForRemovalAfterUserChangedStopSequence(
                      a,
                      b
                    );
                    var S = this.stops.splice(a, 1);
                    this.stops.splice(b, 0, S[0]);
                    for (r = 0; r < this.stops.length; r++)
                      K.push(this._updateStop(this.stops[r], r));
                    K.push(this._removeSomeWaypoints(h));
                    X(K).always(
                      k.hitch(this, function () {
                        this._solveAndZoom().always(w.resolve);
                      })
                    );
                  } else w.reject("Invalid From and To values.");
                else {
                  for (r = 0; r < this.stops.length; )
                    this._isStopAWaypoint(this.stops[r])
                      ? K.push(this._removeStop(r, !0, !0))
                      : r++;
                  X(K).always(
                    k.hitch(this, function () {
                      K = [];
                      this.stops.reverse();
                      for (r = 0; r < this.stops.length; r++)
                        K.push(this._updateStop(this.stops[r], r));
                      X(K).always(
                        k.hitch(this, function () {
                          this._solveAndZoom().always(w.resolve);
                        })
                      );
                    })
                  );
                }
              else w.resolve();
              return w.promise;
            },
            _setMenuNodeValues: function (a) {
              "traffic" !== a && this._clearDisplayBeforeSolve();
              a = this.get("optimalRoute");
              this._findOptimalOrderNode &&
                Q.set(this._findOptimalOrderNode, "checked", a);
              this._returnToStartNode &&
                ((a =
                  this.returnToStart &&
                  !this.maxStopsReached &&
                  this.stops[0] &&
                  (!this.stops[0].feature ||
                    this._isStopLocated(this.stops[0]))),
                Q.set(this._returnToStartNode, "checked", a),
                this.set("returnToStart", a),
                this.maxStopsReached &&
                  this.returnToStart &&
                  this._showMessage(G.widgets.directions.error.maximumStops));
              if (
                !this.returnToStart &&
                !this._incrementalSolveStopRange &&
                this.directions
              )
                for (
                  this._incrementalSolveStopRange = {
                    start: this.stops.length - 1,
                    end: this.stops.length,
                  },
                    this._clearRouteGraphics(),
                    this._incrementalSolveStopRange = null,
                    a = this.stops.length;
                  0 < a-- && this._isStopAWaypoint(this.stops[a]);

                )
                  this._removeSomeWaypoints([this.stops[a]]);
              this._useTrafficNode &&
                (Q.set(this._useTrafficNode, "checked", this.traffic),
                this.traffic
                  ? (this._updateMapTimeExtent(), this._addTrafficLayer())
                  : (this._removeTrafficLayer(), this._restoreMapTimeExtent()));
              switch (this.get("directionsLengthUnits")) {
                case V.KILOMETERS:
                  Q.set(this._useKilometersNode, "checked", !0);
                  Q.set(this._useMilesNode, "checked", !1);
                  break;
                case V.MILES:
                  Q.set(this._useKilometersNode, "checked", !1),
                    Q.set(this._useMilesNode, "checked", !0);
              }
              H.set(
                this._printButton,
                "display",
                this.showPrintPage ? "inline-block" : "none"
              );
              H.set(
                this._saveMenuButton,
                "display",
                this.showSaveButton && this.owningSystemUrl
                  ? "inline-block"
                  : "none"
              );
              this._showMilesKilometersOption();
              this._showClearButton();
            },
            _optionsMenu: function () {
              this._useTrafficItemNode &&
                H.set(
                  this._useTrafficItemNode,
                  "display",
                  this.get("showTrafficOption") ? "block" : "none"
                );
              this._returnToStartItemNode &&
                H.set(
                  this._returnToStartItemNode,
                  "display",
                  this.get("showReturnToStartOption") ? "block" : "none"
                );
              this._findOptimalOrderItemNode &&
                H.set(
                  this._findOptimalOrderItemNode,
                  "display",
                  this.get("showOptimalRouteOption") && 3 < this._getStopCount()
                    ? "block"
                    : "none"
                );
              this.stops.length >= this.get("minStops")
                ? T.add(
                    this._widgetContainer,
                    this._css.stopsOptionsOptionsEnabledClass
                  )
                : (T.remove(
                    this._widgetContainer,
                    this._css.stopsOptionsOptionsEnabledClass
                  ),
                  this._optionsMenuNode &&
                    "block" === H.get(this._optionsMenuNode, "display") &&
                    this._toggleOptionsMenu());
            },
            _stopsRemovable: function () {
              2 < this._dnd.getAllNodes().length - this._getWaypointCount()
                ? T.add(this._widgetContainer, this._css.stopsRemovableClass)
                : T.remove(
                    this._widgetContainer,
                    this._css.stopsRemovableClass
                  );
            },
            _checkMaxStops: function () {
              this.set(
                "maxStopsReached",
                this._getStopCount() +
                  this._getWaypointCount() +
                  (this.returnToStart ? 1 : 0) >=
                  this.maxStops
              );
              this._showAddDestination();
            },
            _updateThemeWatch: function (a, b, h) {
              T.remove(this.domNode, b);
              T.add(this.domNode, h);
            },
            _toggleOptionsMenu: function () {
              "block" === H.get(this._optionsMenuNode, "display")
                ? (H.set(this._optionsMenuNode, "display", "none"),
                  T.remove(this._optionsButtonNode, "esriStopsOptionsOpen"),
                  (this._optionsButtonNode.innerHTML =
                    G.widgets.directions.showOptions))
                : (H.set(this._optionsMenuNode, "display", "block"),
                  T.add(this._optionsButtonNode, "esriStopsOptionsOpen"),
                  (this._optionsButtonNode.innerHTML =
                    G.widgets.directions.hideOptions));
            },
            _toggleSaveMenu: function (a) {
              "block" === H.get(this._saveMenuNode, "display") || !1 === a
                ? (H.set(this._saveMenuNode, "display", "none"),
                  T.remove(
                    this._saveMenuButton,
                    this._css.stopsPressedButtonClass
                  ))
                : (this.clearMessages(),
                  H.set(this._saveMenuNode, "display", "block"),
                  T.add(
                    this._saveMenuButton,
                    this._css.stopsPressedButtonClass
                  ),
                  this._enableSharing().then(
                    k.hitch(this, function () {
                      this._outputLayer.setValue(
                        this.routeLayer.title
                          ? this.routeLayer.title
                          : this.directions && this.directions.routeName
                      );
                      if (this.routeLayer.ownerFolder)
                        for (
                          var b = this._folderSelector.store.objectStore.data,
                            h = 0;
                          h < b.length;
                          h++
                        )
                          if (b[h].folderId === this.routeLayer.ownerFolder) {
                            this._folderSelector.getValue() !== b[h].id &&
                              ((this._folderSelector._interractive = !1),
                              this._folderSelector.setValue(b[h].id));
                            break;
                          }
                      this._enableButton(
                        this._saveButton,
                        this.routeLayer.isItemOwner ||
                          !this._userCanCreatePortalItem
                      );
                      this._outputLayer.set("disabled", !1);
                    })
                  ));
            },
            _showToolbar: function () {
              T[
                (this.stops.length < this.maxStops && this.canModifyStops) ||
                this.canModifyWaypoints
                  ? "add"
                  : "remove"
              ].call(F, this._widgetContainer, this._css.addStopsClass);
            },
            _showAddDestination: function () {
              this._showToolbar();
              this._addDestinationNode.style.display =
                this.stops.length < this.maxStops && this.canModifyStops
                  ? "inline"
                  : "none";
            },
            _showMapClickActiveButton: function () {
              this._showToolbar();
              this._activateButtonNode.style.display =
                this.canModifyStops || this.canModifyWaypoints
                  ? "inline-block"
                  : "none";
            },
            _getAbsoluteUrl: function (a) {
              a = C.toUrl(a);
              return /^https?:/i.test(a)
                ? a
                : /^\/\//i.test(a)
                ? Ta + a
                : /^\//i.test(a)
                ? Ta + "//" + window.location.host + a
                : a;
            },
            _getManeuverImage: function (a) {
              return a
                ? "esriDMTStop" === a || "esriDMTDepart" === a
                  ? ""
                  : this._getAbsoluteUrl(
                      "./images/Directions/maneuvers/" + a + ".png"
                    )
                : "";
            },
            _loadPrintDirections: function (a) {
              var b = this.get("printTemplate"),
                h = new x();
              this.directionsLengthUnits !==
              this.routeParams.directionsLengthUnits
                ? this.getDirections().then(h.resolve, h.reject)
                : h.resolve();
              h.then(
                k.hitch(this, function () {
                  if (!b && this.directions) {
                    var w = this._getAbsoluteUrl("./css/Directions.css"),
                      r = this._getAbsoluteUrl("./css/DirectionsPrint.css"),
                      K = this._getAbsoluteUrl(
                        "./images/Directions/print-logo.png"
                      );
                    var S = J.isBodyLtr() ? "ltr" : "rtl";
                    b = "";
                    b += "\x3c!DOCTYPE HTML\x3e";
                    b +=
                      '\x3chtml lang\x3d"en" class\x3d"' +
                      this.get("theme") +
                      '" dir\x3d"' +
                      S +
                      '"\x3e';
                    b += "\x3chead\x3e";
                    b += '\x3cmeta charset\x3d"utf-8"\x3e';
                    b +=
                      '\x3cmeta http-equiv\x3d"X-UA-Compatible" content\x3d"IE\x3dEdge,chrome\x3d1"\x3e';
                    b +=
                      "\x3ctitle\x3e" +
                      this.get("directions").routeName +
                      "\x3c/title\x3e";
                    b +=
                      '\x3clink rel\x3d"stylesheet" media\x3d"screen" type\x3d"text/css" href\x3d"' +
                      w +
                      '" /\x3e';
                    b +=
                      '\x3clink rel\x3d"stylesheet" media\x3d"print" type\x3d"text/css" href\x3d"' +
                      r +
                      '" /\x3e';
                    b += "\x3c/head\x3e";
                    b +=
                      '\x3cbody class\x3d"' +
                      this._css.esriPrintPageClass +
                      '"\x3e';
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriPrintBarClass +
                      '"\x3e';
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriCloseButtonClass +
                      '" title\x3d"' +
                      G.common.close +
                      '" onclick\x3d"window.close();"\x3e' +
                      G.common.close +
                      "\x3c/div\x3e";
                    b +=
                      '\x3cdiv id\x3d"printButton" class\x3d"' +
                      this._css.esriPrintButtonClass +
                      '" title\x3d"' +
                      G.widgets.directions.print +
                      '" onclick\x3d"window.print();"\x3e' +
                      G.widgets.directions.print +
                      "\x3c/div\x3e";
                    b += "\x3c/div\x3e";
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriPrintMainClass +
                      '"\x3e';
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriPrintHeaderClass +
                      '"\x3e';
                    b +=
                      '\x3cimg class\x3d"' +
                      this._css.esriPrintLogoClass +
                      '" src\x3d"' +
                      K +
                      '" /\x3e';
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriPrintNameClass +
                      '"\x3e' +
                      this.get("directions").routeName +
                      "\x3c/div\x3e";
                    b += this._renderDirectionsSummary(this.directions);
                    a &&
                      ((b +=
                        '\x3cdiv id\x3d"divMap" class\x3d"esriPrintMap esriPrintWait"\x3e\x3c/div\x3e'),
                      (b += '\x3chr class\x3d"esriNoPrint"/\x3e'));
                    b += '\x3cdiv id\x3d"print_helper"\x3e\x3c/div\x3e';
                    b +=
                      '\x3ctextarea onkeyup\x3d"document.getElementById(\'print_helper\').innerHTML\x3dthis.value;" id\x3d"print_area" class\x3d"' +
                      this._css.esriPrintNotesClass +
                      '" placeholder\x3d"' +
                      G.widgets.directions.printNotes +
                      '"\x3e\x3c/textarea\x3e';
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.clearClass +
                      '"\x3e\x3c/div\x3e';
                    b += "\x3c/div\x3e";
                    b +=
                      '\x3cdiv class\x3d"' +
                      this._css.esriPrintDirectionsClass +
                      '"\x3e';
                    b += this._renderDirectionsTable(this.directions);
                    b += "\x3c/div\x3e";
                    b += "\x3c/div\x3e";
                    b += "\x3c/div\x3e";
                    b += "\x3c/body\x3e";
                    b += "\x3c/html\x3e";
                  }
                  this._printWindow.document.open("text/html", "replace");
                  this._printWindow.document.write(b);
                  this._printWindow.document.close();
                })
              );
            },
            resize: function () {
              this._truncateSearchSourceIfNeeded();
            },
            _truncateSearchSourceIfNeeded: function () {
              var a = this._searchSourceSelector;
              if (this._searchSourceSelector) {
                var b = a.containerNode.firstChild;
                H.set(b, "width", "");
                a.domNode.clientWidth > this.domNode.clientWidth &&
                  H.set(
                    b,
                    "width",
                    this._searchSourceContainerNode.clientWidth - 20 + "px"
                  );
              }
            },
            _printDirections: function () {
              if (this.directions) {
                var a = screen.width / 2,
                  b = screen.height / 1.5;
                a =
                  "toolbar\x3dno, location\x3dno, directories\x3dno, status\x3dyes, menubar\x3dno, scrollbars\x3dyes, resizable\x3dyes, width\x3d" +
                  a +
                  ", height\x3d" +
                  b +
                  ", top\x3d" +
                  (screen.height / 2 - b / 2) +
                  ", left\x3d" +
                  (screen.width / 2 - a / 2);
                this.get("printPage")
                  ? ((window.directions = this.get("directions")),
                    window.open(
                      this.get("printPage"),
                      "directions_widget_print",
                      a,
                      !0
                    ))
                  : ((this._printWindow = window.open(
                      "",
                      "directions_widget_print",
                      a,
                      !0
                    )),
                    this._loadPrintDirections(!!this._printService),
                    this._printService &&
                      C(
                        ["dojo/_base/window"],
                        k.hitch(this, function (h) {
                          this.zoomToFullRoute().then(
                            k.hitch(this, function () {
                              this._printService.execute(
                                this._printParams,
                                k.hitch(this, function (w) {
                                  h.withDoc(
                                    this._printWindow.document,
                                    function () {
                                      var r = y.byId("divMap");
                                      r &&
                                        (T.remove(r, "esriPrintWait"),
                                        T.add(r, "esriPageBreak"),
                                        F.create(
                                          "img",
                                          {
                                            src: w.url,
                                            class: "esriPrintMapImg",
                                          },
                                          r
                                        ));
                                    }
                                  );
                                }),
                                k.hitch(this, function (w) {
                                  h.withDoc(
                                    this._printWindow.document,
                                    function () {
                                      var r = y.byId("divMap");
                                      r && T.remove(r, "esriPrintWait");
                                    }
                                  );
                                  console.error(
                                    "Error while calling print service:\n " + w
                                  );
                                })
                              );
                            })
                          );
                        })
                      ));
              }
            },
            _enableButton: function (a, b) {
              b = b || void 0 === b;
              T[b ? "remove" : "add"].apply(this, [
                a,
                "esriDisabledDirectionsButton",
              ]);
              a._enabled = b;
            },
            _clearStopsStatusAttr: function () {
              for (var a = 0; a < this.stops.length; a++)
                this.stops[a].feature &&
                  this.stops[a].feature.attributes &&
                  (this.stops[a].feature.attributes.Status = void 0);
            },
            _enableSharing: function () {
              var a = new x();
              !this._naRouteSharing && this.owningSystemUrl
                ? C(
                    ["../tasks/NARouteSharing"],
                    k.hitch(this, function (b) {
                      this._naRouteSharing = new b(
                        this.owningSystemUrl,
                        this.map.spatialReference
                      );
                      this._folderSelector ||
                        ((this._folderSelector = new A(
                          {
                            className: "esriFoldersDDL",
                            style: "width: 100%;",
                            sortByLabel: !1,
                            disabled: !0,
                            _interractive: !0,
                            onChange: k.hitch(this, function () {
                              this._folderSelector._interractive
                                ? this._enableButton(
                                    this._saveButton,
                                    !this.routeLayer.itemId
                                  )
                                : (this._folderSelector._interractive = !0);
                            }),
                          },
                          this._folderSelectorContainer
                        )),
                        this._folderSelector.startup(),
                        (this._outputLayer = new m(
                          {
                            style: "width: 100%",
                            required: !0,
                            trim: !0,
                            regExp: '[^\x26|\x3c|\x3e|%|#|?|\\|"|/|+]+',
                            maxLength: 98,
                            disabled: !0,
                            onKeyPress: k.hitch(this, function () {
                              this._enableButton(
                                this._saveButton,
                                !this.routeLayer.itemId ||
                                  !this._userCanCreatePortalItem
                              );
                            }),
                            onFocus: k.hitch(this, function () {
                              this.map && this.map.disableKeyboardNavigation();
                            }),
                            onBlur: k.hitch(this, function () {
                              this.map && this.map.enableKeyboardNavigation();
                            }),
                          },
                          this._outputLayerContainer
                        )),
                        this._outputLayer.startup());
                      this._naRouteSharing.getFolders().then(
                        k.hitch(this, function (h) {
                          for (var w = [], r = 0; r < h.length; r++)
                            w.push({
                              id: h[r].url,
                              folderId: h[r].id,
                              label: h[r].title,
                            });
                          this._folderSelector.setStore(
                            new c({ objectStore: new f({ data: w }) })
                          );
                          this._naRouteSharing.canCreateItem().then(
                            k.hitch(this, function (K) {
                              this._folderSelector.set("disabled", !K);
                              this._userCanCreatePortalItem = K;
                            })
                          );
                          this._enableButton(this._saveButton);
                          a.resolve();
                        }),
                        k.hitch(this, function (h) {
                          console.log(h);
                          this._naRouteSharing = null;
                          this._toggleSaveMenu(!1);
                          a.reject(h);
                        })
                      );
                    })
                  )
                : this.owningSystemUrl
                ? a.resolve()
                : (a.reject(
                    Error(
                      "Owning system is not defined, or the Directions widget is not done initializing."
                    )
                  ),
                  (this._naRouteSharing = null));
              return a.promise;
            },
            _storeRouteUI: function () {
              var a = new x();
              this._outputLayer && this._outputLayer.isValid()
                ? this._storeRoute(
                    this._outputLayer.getValue(),
                    this._folderSelector.getValue(),
                    this._folderSelector.store.objectStore.get(
                      this._folderSelector.getValue()
                    ).folderId
                  ).then(a.resolve, a.reject)
                : (this._outputLayer && this._outputLayer.focus(),
                  a.reject(Error("Need result layer name specified.")));
              return a.promise;
            },
            _storeRoute: function (a, b, h) {
              var w = new x(),
                r = this.directions;
              if (this._savingRoute || !this._naRouteSharing)
                return (
                  this._saveButton.blur(),
                  w.reject(Error("Not ready to store route.")),
                  w.promise
                );
              this.clearMessages();
              w.then(
                null,
                k.hitch(this, function (va) {
                  console.log("ERR", va);
                  this._showMessage(G.widgets.directions.error.cantSaveRoute);
                })
              );
              w.promise.always(
                k.hitch(this, function () {
                  this._enableButton(this._saveButton);
                  H.set(
                    this._saveAsButton,
                    "display",
                    this.routeLayer.itemId && this._userCanCreatePortalItem
                      ? "inline-block"
                      : "none"
                  );
                  this._showLoadingSpinner();
                  this._savingRoute = !1;
                })
              );
              if (
                r &&
                r.features &&
                r.features.length &&
                this.stops &&
                this.stops.length
              )
                if (this.owningSystemUrl)
                  if (this.routeParams && this.routeParams.travelMode)
                    if (a && b) {
                      var K = k.hitch(this, function (va) {
                        return this._naRouteSharing.getAttributeUnits(
                          va,
                          this.serviceDescription
                        );
                      });
                      var S = this.routeParams.travelMode.timeAttributeName;
                      var W = this.routeParams.travelMode.distanceAttributeName,
                        Y = K(S),
                        fa = K(W),
                        ha =
                          this.routeParams.directionsLengthUnits ||
                          this.serviceDescription.directionsLengthUnits,
                        ma = this._naRouteSharing.toMeters,
                        na = this._naRouteSharing.toMinutes,
                        ta = function (va, Fa, Ma) {
                          var Na;
                          for (Na in va)
                            if (
                              va.hasOwnProperty(Na) &&
                              0 === Na.indexOf(Fa) &&
                              -1 === U.indexOf(Ma, Na.substr(Fa.length))
                            ) {
                              var Wa = Wa || {};
                              Wa[Na.substr(Fa.length)] = va[Na];
                            }
                          return Wa;
                        },
                        sa = [],
                        Ca = [],
                        Ha = [];
                      if (S && Y && W && fa) {
                        var Qa = [],
                          La =
                            this.routeParams.accumulateAttributes ||
                            this.serviceDescription.accumulateAttributeNames ||
                            [],
                          Ja =
                            this.serviceDescription.networkDataset
                              .networkAttributes;
                        for (K = 0; K < Ja.length; K++)
                          "esriNAUTCost" === Ja[K].usageType &&
                            -1 === U.indexOf(La, Ja[K].name) &&
                            Ja[K].name !== S &&
                            Ja[K].name !== W &&
                            Qa.push(Ja[K].name);
                        La = this.get("stops");
                        var Ga = {
                          xmin: Infinity,
                          ymin: Infinity,
                          xmax: -Infinity,
                          ymax: -Infinity,
                        };
                        for (K = 0; K < La.length; K++)
                          if (La[K].feature && La[K].feature.toJson) {
                            Ja = La[K].feature.toJson();
                            var za = Ja.attributes;
                            var Da = Ja.geometry,
                              Oa = this._naRouteSharing.getUTCOffset(
                                za.ArriveTime,
                                za.ArriveTimeUTC
                              ),
                              Ra = this._naRouteSharing.getUTCOffset(
                                za.DepartTime,
                                za.DepartTimeUTC
                              );
                            k.mixin(Ga, {
                              xmin: Ga.xmin > Da.x ? Da.x : Ga.xmin,
                              ymin: Ga.ymin > Da.y ? Da.y : Ga.ymin,
                              xmax: Ga.xmax < Da.x ? Da.x : Ga.xmax,
                              ymax: Ga.ymax < Da.y ? Da.y : Ga.ymax,
                            });
                            Ja.attributes = {
                              __OBJECTID: K + 1,
                              CurbApproach: za.CurbApproach,
                              ArrivalCurbApproach: za.ArriveCurbApproach,
                              DepartureCurbApproach: za.DepartCurbApproach,
                              Name:
                                za.Name === this._waypointName
                                  ? G.widgets.directions.waypoint
                                  : za.Name === this._userDefinedStopName
                                  ? La[K].name
                                  : za.Name,
                              RouteName: r.routeName,
                              Sequence: za.Sequence,
                              Status: za.Status,
                              LocationType: za.isWaypoint ? 1 : 0,
                              TimeWindowStart: za.TimeWindowStart,
                              TimeWindowEnd: za.TimeWindowEnd,
                              TimeWindowStartUTCOffset: Oa,
                              TimeWindowEndUTCOffset: Oa,
                              ServiceMinutes: na(za["Attr_" + S], Y),
                              ServiceMeters: ma(za["Attr_" + W], fa),
                              ServiceCosts: ba.stringify(ta(za, "Attr_", Qa)),
                              CumulativeMinutes: na(za["Cumul_" + S], Y),
                              CumulativeMeters: ma(za["Cumul_" + W], fa),
                              CumulativeCosts: ba.stringify(
                                ta(za, "Cumul_", Qa)
                              ),
                              LateMinutes: na(za["Violation_" + S], Y),
                              WaitMinutes: na(za["Wait_" + S], Y),
                              ArrivalTime: this._naRouteSharing.toUTCTime(
                                za.ArriveTime,
                                Oa
                              ),
                              DepartureTime: this._naRouteSharing.toUTCTime(
                                za.DepartTime,
                                Ra
                              ),
                              ArrivalUTCOffset: Oa,
                              DepartureUTCOffset: Ra,
                            };
                            sa.push(Ja);
                          }
                        W = 0;
                        fa = function (va) {
                          try {
                            va.strings = ba.parse(va.strings);
                          } catch (Ma) {
                            Xa.strings = void 0;
                          }
                          if (va.strings && va.strings.length)
                            for (var Fa = 0; Fa < va.strings.length; Fa++)
                              if (
                                "esriDSTGeneral" === va.strings[Fa].stringType
                              )
                                return va.strings[Fa].string;
                        };
                        La = function (va, Fa) {
                          for (
                            var Ma = [], Na = 0;
                            Na < (va || []).length;
                            Na++
                          )
                            (va[Na].stringType !== Fa && Fa) ||
                              Ma.push(va[Na].string);
                          return Ma.length ? Ma.toString() : void 0;
                        };
                        Ja = function (va) {
                          switch (va) {
                            case "esriDMTStop":
                              return "esriDPTManeuverArrive";
                            case "esriDMTDepart":
                              return "esriDPTManeuverDepart";
                            case "esriDMTDoorPassage":
                              return "esriDPTManeuverDoor";
                            case "esriDMTBearLeft":
                              return "esriDPTManeuverBearLeft";
                            case "esriDMTBearRight":
                              return "esriDPTManeuverBearRight";
                            case "esriDMTElevator":
                              return "esriDPTManeuverElevator";
                            case "esriDMTEscalator":
                              return "esriDPTManeuverEscalator";
                            case "esriDMTFerry":
                              return "esriDPTManeuverFerryOn";
                            case "esriDMTEndOfFerry":
                              return "esriDPTManeuverFerryOff";
                            case "esriDMTForkCenter":
                              return "esriDPTManeuverForkCenter";
                            case "esriDMTForkLeft":
                              return "esriDPTManeuverForkLeft";
                            case "esriDMTForkRight":
                              return "esriDPTManeuverForkRight";
                            case "esriDMTPedestrianRamp":
                              return "esriDPTManeuverPedestrianRamp";
                            case "esriDMTRampLeft":
                              return "esriDPTManeuverRampLeft";
                            case "esriDMTRampRight":
                              return "esriDPTManeuverRampRight";
                            case "esriDMTRoundabout":
                              return "esriDPTManeuverRoundabout";
                            case "esriDMTTurnLeft":
                              return "esriDPTManeuverTurnLeft";
                            case "esriDMTLeftLeft":
                              return "esriDPTManeuverTurnLeftLeft";
                            case "esriDMTLeftRight":
                              return "esriDPTManeuverTurnLeftRight";
                            case "esriDMTTurnRight":
                              return "esriDPTManeuverTurnRight";
                            case "esriDMTRightLeft":
                              return "esriDPTManeuverTurnRightLeft";
                            case "esriDMTRightRight":
                              return "esriDPTManeuverTurnRightRight";
                            case "esriDMTSharpLeft":
                              return "esriDPTManeuverSharpLeft";
                            case "esriDMTSharpRight":
                              return "esriDPTManeuverSharpRight";
                            case "esriDMTStraight":
                              return "esriDPTManeuverStraight";
                            case "esriDMTStrairs":
                              return "esriDPTManeuverStairs";
                            case "esriDMTUTurn":
                              return "esriDPTManeuverUTurn";
                          }
                          return "esriDPTUnknown";
                        };
                        for (K = 0; K < r.featuresWithWaypoints.length; K++) {
                          var Ua = r.featuresWithWaypoints[K];
                          Da = Ua.toJson();
                          Oa = Da.attributes;
                          Ra =
                            (Da.geometry &&
                              Da.geometry.paths &&
                              Da.geometry.paths[0]) ||
                            [];
                          var bb =
                            Da.geometry.hasM || (Ra[0] && 3 === Ra[0].length);
                          za = this._naRouteSharing.getUTCOffset(
                            Oa.ETA,
                            Oa.arriveTimeUTC
                          );
                          Da.attributes = {
                            __OBJECTID: K + 1,
                            Sequence: ++W,
                            StopID: (function () {
                              var va = void 0,
                                Fa =
                                  Ua._associatedStopWithReturnToStart &&
                                  Ua._associatedStopWithReturnToStart.attributes
                                    .Sequence;
                              if (Fa)
                                for (var Ma = 0; Ma < sa.length; Ma++)
                                  if (sa[Ma].attributes.Sequence === Fa) {
                                    va = sa[Ma].attributes.__OBJECTID;
                                    break;
                                  }
                              return va;
                            })(),
                            DirectionPointType: Ja(Oa.maneuverType),
                            DisplayText:
                              Ua._associatedStopWithReturnToStart &&
                              Ua._associatedStopWithReturnToStart.attributes
                                .isWaypoint
                                ? Oa.text.replace(
                                    this._waypointName,
                                    G.widgets.directions.waypoint
                                  )
                                : Oa.text,
                            ArrivalTime: this._naRouteSharing.toUTCTime(
                              Oa.ETA,
                              za
                            ),
                            ArrivalUTCOffset: za,
                            Azimuth: void 0,
                            Name: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTStreetName"
                            ),
                            AlternateName: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTAltName"
                            ),
                            ExitName: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTExit"
                            ),
                            IntersectingName: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTCrossStreet"
                            ),
                            BranchName: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTBranch"
                            ),
                            TowardName: La(
                              r.stringsWithWaypoints[K],
                              "esriDSTToward"
                            ),
                            ShortVoiceInstruction: void 0,
                            VoiceInstruction: void 0,
                            Level: void 0,
                          };
                          delete Da.symbol;
                          delete Da.infoTemplate;
                          Ra.length
                            ? ((Da.geometry = {
                                x: Ra[0][0],
                                y: Ra[0][1],
                                spatialReference: Da.geometry.spatialReference,
                              }),
                              bb && k.mixin(Da.geometry, { m: Ra[0][2] }))
                            : delete Da.geometry;
                          Ca.push(Da);
                          Da = Ua.toJson();
                          Oa = Da.attributes;
                          Ra =
                            (Da.geometry &&
                              Da.geometry.paths &&
                              Da.geometry.paths[0]) ||
                            [];
                          za = !0;
                          for (S = 0; S < Ra.length - 1; S++)
                            if (
                              Ra[S][0] !== Ra[S + 1][0] ||
                              Ra[S][1] !== Ra[S + 1][1]
                            ) {
                              za = !1;
                              break;
                            }
                          za ||
                            ((Da.attributes = {
                              DirectionPointID: K + 1,
                              DirectionLineType: "esriDLTSegment",
                              Meters: ma(Oa.length, ha),
                              Minutes: na(Oa.time, Y),
                              FromLevel: void 0,
                              ToLevel: void 0,
                            }),
                            (Da.geometry.hasM = bb),
                            delete Da.symbol,
                            delete Da.infoTemplate,
                            Ha.push(Da));
                          var Xa =
                            r.eventsWithWaypoints[Da.attributes.Sequence] || [];
                          for (S = 0; S < Xa.length; S++)
                            (Da = Xa[S].toJson()),
                              (Oa = Da.attributes),
                              (za = this._naRouteSharing.getUTCOffset(
                                Oa.ETA,
                                Oa.arriveTimeUTC
                              )),
                              (Da.attributes = {
                                Sequence: ++W,
                                DirectionPointType: "esriDPTEvent",
                                DisplayText: fa(Oa),
                                ArrivalTime: this._naRouteSharing.toUTCTime(
                                  Oa.ETA,
                                  za
                                ),
                                ArrivalUTCOffset: za,
                                Name: Oa.strings,
                              }),
                              Ca.push(Da);
                        }
                        S =
                          (this.routeParams.barriers &&
                            this.routeParams.barriers.features) ||
                          [];
                        var cb = [];
                        for (K = 0; K < S.length; K++)
                          (W = S[K].toJson()),
                            (fa = W.attributes),
                            (W.attributes = {
                              BarrierType: fa.BarrierType || 0,
                              FullEdge: fa.FullEdge || !1,
                              AddedCost:
                                fa[
                                  "Attr_" + this._getImpedanceAttribute().name
                                ] || 0,
                              Costs: ba.stringify(ta(fa, "Attr_", Qa)),
                              CurbApproach: fa.CurbApproach || 0,
                              Name: fa.Name,
                            }),
                            cb.push(W);
                        S =
                          (this.routeParams.polylineBarriers &&
                            this.routeParams.polylineBarriers.features) ||
                          [];
                        var db = [];
                        for (K = 0; K < S.length; K++)
                          (W = S[K].toJson()),
                            (fa = W.attributes),
                            (W.attributes = {
                              BarrierType: fa.BarrierType || 0,
                              ScaleFactor:
                                fa[
                                  "Attr_" + this._getImpedanceAttribute().name
                                ] || 1,
                              Costs: ba.stringify(ta(fa, "Attr_", Qa)),
                              Name: fa.Name,
                            }),
                            db.push(W);
                        S =
                          (this.routeParams.polygonBarriers &&
                            this.routeParams.polygonBarriers.features) ||
                          [];
                        var eb = [];
                        for (K = 0; K < S.length; K++)
                          (W = S[K].toJson()),
                            (fa = W.attributes),
                            (W.attributes = {
                              BarrierType: fa.BarrierType || 0,
                              ScaleFactor:
                                fa[
                                  "Attr_" + this._getImpedanceAttribute().name
                                ] || 1,
                              Costs: ba.stringify(ta(fa, "Attr_", Qa)),
                              Name: fa.Name,
                            }),
                            eb.push(W);
                        var hb = {
                          geometry: r.mergedGeometry,
                          attributes: {
                            RouteName: r.routeName,
                            TotalMinutes: na(r.totalTime, Y),
                            TotalMeters: ma(r.totalLength, ha),
                            TotalLateMinutes: (function () {
                              for (var va = 0, Fa = 0; Fa < sa.length; Fa++)
                                va += sa[Fa].attributes.LateMinutes || 0;
                              return va;
                            })(),
                            TotalWaitMinutes: (function () {
                              for (var va = 0, Fa = 0; Fa < sa.length; Fa++)
                                va += sa[Fa].attributes.WaitMinutes || 0;
                              return va;
                            })(),
                            TotalCosts:
                              sa[sa.length - 1].attributes.CumulativeCosts,
                            StartTime:
                              "none" !== this.startTime
                                ? sa[0].attributes.ArrivalTime
                                : null,
                            EndTime:
                              "none" !== this.startTime
                                ? sa[sa.length - 1].attributes.DepartureTime
                                : null,
                            StartUTCOffset: sa[0].attributes.ArrivalUTCOffset,
                            EndUTCOffset:
                              sa[sa.length - 1].attributes.DepartureUTCOffset,
                            Messages: ba.stringify(this._solverMessages),
                            AnalysisSettings: ba.stringify({
                              travelMode: k.hitch(this, function () {
                                var va = k.clone(this.routeParams.travelMode);
                                "\x26lt;" === va.name.substr(0, 4) &&
                                  "\x26gt;" ===
                                    va.name.substr(va.name.length - 4, 4) &&
                                  (va.name = va.name.substr(
                                    4,
                                    va.name.length - 8
                                  ));
                                return va;
                              })(),
                              directionsLanguage:
                                this.routeParams.directionsLanguage ||
                                this.serviceDescription.directionsLanguage,
                              startTimeIsUTC: this.routeParams.startTimeIsUTC,
                              timeWindowsAreUTC:
                                this.routeParams.timeWindowsAreUTC,
                              findBestSequence:
                                this.routeParams.findBestSequence,
                              preserveFirstStop:
                                this.routeParams.preserveFirstStop,
                              preserveLastStop:
                                this.routeParams.preserveLastStop,
                              accumulateAttributeNames:
                                this.routeParams.accumulateAttributes ||
                                this.serviceDescription
                                  .accumulateAttributeNames,
                            }),
                          },
                        };
                        this._enableButton(this._saveButton, !1);
                        this._savingRoute = !0;
                        this._showLoadingSpinner(!0);
                        k.hitch(this, function () {
                          var va = new x();
                          this._printService
                            ? this.zoomToFullRoute().then(
                                k.hitch(this, function () {
                                  var Fa = this._printParams.template,
                                    Ma = Fa.exportOptions;
                                  Fa.exportOptions = {
                                    width: 200,
                                    height: 133,
                                    dpi: 96,
                                  };
                                  this._printService.execute(
                                    this._printParams,
                                    function (Na) {
                                      Fa.exportOptions = Ma;
                                      va.resolve(Na.url);
                                    },
                                    function (Na) {
                                      Fa.exportOptions = Ma;
                                      console.error(
                                        "Error while calling print service:\n " +
                                          Na
                                      );
                                      va.resolve();
                                    }
                                  );
                                })
                              )
                            : va.resolve();
                          return va.promise;
                        })().then(
                          k.hitch(this, function (va) {
                            var Fa = {
                              folder: b,
                              name: a,
                              stops: sa,
                              directionPoints: Ca,
                              directionLines: Ha,
                              barriers: cb,
                              polylineBarriers: db,
                              polygonBarriers: eb,
                              extent: k.mixin(k.clone(r.extent), {
                                xmin:
                                  Ga.xmin > r.extent.xmin
                                    ? r.extent.xmin
                                    : Ga.xmin,
                                ymin:
                                  Ga.ymin > r.extent.ymin
                                    ? r.extent.ymin
                                    : Ga.ymin,
                                xmax:
                                  Ga.xmax < r.extent.xmax
                                    ? r.extent.xmax
                                    : Ga.xmax,
                                ymax:
                                  Ga.ymax < r.extent.ymax
                                    ? r.extent.ymax
                                    : Ga.ymax,
                              }),
                              routeInfo: hb,
                              thumbnail: va,
                            };
                            this._userCanCreatePortalItem
                              ? this._naRouteSharing
                                  .store(Fa, this.routeLayer.itemId, "1.0.0")
                                  .then(
                                    k.hitch(this, function (Ma) {
                                      if (Ma.success) {
                                        var Na = this._naRouteSharing.portal;
                                        Na =
                                          "//" +
                                          (Na.isPortal
                                            ? Na.portalHostname
                                            : Na.urlKey +
                                              "." +
                                              Na.customBaseUrl);
                                        this._toggleSaveMenu();
                                        this._showMessage(
                                          G.widgets.directions.routeIsSaved +
                                            "\x3cbr/\x3e\x3ca class\x3d'esriLinkButton' target\x3d'_blank' href\x3d'" +
                                            Na +
                                            "/home/item.html?id\x3d" +
                                            Ma.id +
                                            "'\x3e" +
                                            G.widgets.directions.share +
                                            "\x3c/a\x3e",
                                          !0
                                        );
                                        if (this.routeLayer.itemId)
                                          this.onRouteItemUpdated(Ma.id);
                                        else this.onRouteItemCreated(Ma.id);
                                        k.mixin(this.routeLayer, {
                                          itemId: Ma.id,
                                          title: Fa.name,
                                          isItemOwner: !0,
                                          ownerFolder: h,
                                        });
                                        w.resolve(Ma);
                                      } else w.reject(Ma);
                                    }),
                                    w.reject
                                  )
                              : this._naRouteSharing
                                  .createFeatureCollection(Fa, "1.0.0")
                                  .then(
                                    k.hitch(this, function (Ma) {
                                      w.resolve(Ma);
                                      this._toggleSaveMenu();
                                      this.onFeatureCollectionCreated(Ma);
                                    }),
                                    w.reject
                                  );
                          })
                        );
                      } else
                        w.reject(Error("Cannot deduce the impedance used."));
                    } else
                      w.reject(
                        Error(
                          "Missing required parameter: layerName, folder must be specified."
                        )
                      );
                  else
                    w.reject(
                      Error("Shared route must be built using a Travel Mode.")
                    );
                else
                  w.reject(
                    Error(
                      "Cannot store route: owning system to store routes is not defined. Please specify Portal or ArcGIS Online Url in constructor."
                    )
                  );
              else w.reject(Error("No route to share. Build a route first."));
              return w.promise;
            },
            _loadRoute: function (a) {
              var b = new x();
              b.promise.always(
                k.hitch(this, function () {
                  this._showLoadingSpinner(!1);
                  H.set(
                    this._saveAsButton,
                    "display",
                    this.routeLayer.itemId && this._userCanCreatePortalItem
                      ? "inline-block"
                      : "none"
                  );
                  this._enableButton(
                    this._saveButton,
                    this.routeLayer.isItemOwner
                  );
                })
              );
              this._reset().then(
                k.hitch(this, function () {
                  this._showLoadingSpinner(!0);
                  this._enableSharing().then(
                    k.hitch(this, function () {
                      var h = k.clone(this.serviceDescription),
                        w = k.hitch(this, function (Y) {
                          k.mixin(this.routeLayer, {
                            itemId: a,
                            title: Y.title,
                            isItemOwner: Y.isItemOwner,
                            ownerFolder: Y.ownerFolder,
                          });
                        }),
                        r,
                        K,
                        S,
                        W;
                      h.directionsLengthUnits = this.directionsLengthUnits;
                      this._naRouteSharing.load(a, h).then(
                        k.hitch(this, function (Y) {
                          if (Y.routeParameters) {
                            k.mixin(this.routeParams, Y.routeParameters);
                            this.routeParams.accumulateAttributes =
                              Y.routeParameters.accumulateAttributeNames;
                            this.set(
                              "optimalRoute",
                              this.routeParams.findBestSequence
                            );
                            this.startTime = this.routeParams.startTime
                              ? this.routeParams.startTime
                              : "none";
                            this._setStartTime(void 0, void 0, this.startTime);
                            var fa = Y.routeParameters.travelMode,
                              ha = fa
                                ? this._getCostAttribute(
                                    fa.impedanceAttributeName
                                  )
                                : void 0;
                            ha = ha
                              ? this._isTimeUnits(ha.units)
                                ? "Time"
                                : "Distance"
                              : "";
                            W =
                              h.supportedTravelModes &&
                              h.supportedTravelModes.length
                                ? this._travelModeSelector.store.objectStore.data.slice()
                                : [];
                            if (
                              (canUseRouteLayerTM = 1 !== Y.successCode && ha)
                            ) {
                              var ma =
                                "AUTOMOBILE" === fa.type
                                  ? "Driving"
                                  : "TRUCK" === fa.type
                                  ? "Trucking"
                                  : "WALK" === fa.type
                                  ? "Walking"
                                  : "Other";
                              fa.name = "\x26lt;" + fa.name + "\x26gt;";
                              this.serviceDescription.supportedTravelModes = (
                                h.supportedTravelModes || []
                              ).concat(fa);
                              W.push({
                                id: fa.name,
                                label:
                                  '\x3cdiv class\x3d"esriTravelModesDirectionsIcon esriTravelModesType' +
                                  ma +
                                  ha +
                                  '"\x3e\x26nbsp;\x3c/div\x3e\x3cdiv class\x3d"esriTravelModesTypeName"\x3e' +
                                  fa.name +
                                  "\x3c/div\x3e",
                              });
                              this._travelModeSelector.setStore(
                                new c({ objectStore: new f({ data: W }) })
                              );
                              this._travelModeSelector._interractive = !1;
                              this._travelModeSelector.setValue(fa.name);
                            } else {
                              ha = !1;
                              if (fa && fa.name)
                                for (
                                  W = h.supportedTravelModes || [], r = 0;
                                  r < W.length;
                                  r++
                                )
                                  if (W[r].name === fa.name) {
                                    ha = !0;
                                    this._travelModeSelector._interractive = !1;
                                    this._travelModeSelector.setValue(fa.name);
                                    this.routeParams.travelMode = W[r]
                                      .impedanceAttributeName
                                      ? W[r]
                                      : W[r].itemId;
                                    Y.loadMessages.push({
                                      message:
                                        G.widgets.directions.error
                                          .tmFromPortalSameName +
                                        " " +
                                        fa.name,
                                      messageType: "Warning",
                                    });
                                    break;
                                  }
                              if (!ha)
                                if ((fa = h.defaultTravelMode) && W)
                                  for (r = 0; r < W.length; r++) {
                                    if (W[r].id === fa) {
                                      this.routeParams.travelMode = W[r]
                                        .impedanceAttributeName
                                        ? W[r]
                                        : W[r].itemId;
                                      Y.loadMessages.push({
                                        message:
                                          G.widgets.directions.error
                                            .tmFromPortalDefault +
                                          " " +
                                          (W[r].name ? W[r].name : W[r].itemId),
                                        messageType: "Warning",
                                      });
                                      break;
                                    }
                                  }
                                else this.routeParams.travelMode = null;
                            }
                            this._checkStartTimeUIAvailability();
                          }
                          if (Y.solveResult && Y.solveResult.routeResults) {
                            var na = Infinity,
                              ta = -Infinity;
                            fa = Y.solveResult.routeResults[0].stops;
                            var sa =
                              Y.solveResult.routeResults[0].directions.features;
                            ha = {};
                            for (r = 0; r < fa.length; r++) {
                              var Ca = fa[r].attributes;
                              if (Ca.isWaypoint)
                                for (K = 0; K < sa.length; K++)
                                  (ma = sa[K].attributes),
                                    ma._stopSequence === Ca.Sequence &&
                                      (ma.text = ma.text.replace(
                                        Ca.Name,
                                        this._waypointName
                                      ));
                              S = Ca.Name + "_" + this._stopSequence++;
                              ha[S] = Ca.isWaypoint
                                ? this._waypointName
                                : Ca.Name;
                              Ca.Name = S;
                              if (
                                Ca.Sequence < na &&
                                (null !== Ca.ArriveCurbApproach ||
                                  null !== Ca.DepartCurbApproach)
                              ) {
                                var Ha = Ca.Name;
                                na = Ca.Sequence;
                              }
                              if (
                                Ca.Sequence > ta &&
                                (null !== Ca.ArriveCurbApproach ||
                                  null !== Ca.DepartCurbApproach)
                              ) {
                                var Qa = Ca.Name;
                                ta = Ca.Sequence;
                              }
                            }
                            S = Ha + " - " + Qa;
                            Y.solveResult.routeResults[0].routeName = S;
                            Y.solveResult.routeResults[0].directions.routeName =
                              S;
                            for (r = 0; r < sa.length; r++)
                              if (
                                ((ma = sa[r].attributes),
                                void 0 !== ma._stopSequence)
                              )
                                for (K = 0; K < fa.length; K++)
                                  if (
                                    ma._stopSequence ===
                                    fa[K].attributes.Sequence
                                  ) {
                                    S = fa[K].attributes.Name;
                                    ma.text = (ma.text || "").replace(ha[S], S);
                                    delete ma._stopSequence;
                                    break;
                                  }
                            Ha = fa[fa.length - 1];
                            fa[0].geometry.x === Ha.geometry.x &&
                              fa[0].geometry.y === Ha.geometry.y &&
                              ((this._returnToStartStop =
                                this._addStopWrapperToGraphic(
                                  new u(Ha.geometry, null, Ha.attributes),
                                  ha[Ha.attributes.Name]
                                )),
                              this.set("returnToStart", !0));
                            this._solveResultProcessing(Y.solveResult, ha).then(
                              k.hitch(this, function () {
                                this._setStartTime(
                                  void 0,
                                  void 0,
                                  this.startTime
                                );
                                w(Y);
                                this.zoomToFullRoute();
                                b.resolve(Y);
                              }),
                              b.reject
                            );
                          } else {
                            if (Y.routeParameters) {
                              Ha = Y.routeParameters.stops.features;
                              this.stops = [];
                              for (r = 0; r < Ha.length; r++)
                                this.stops.push(
                                  this._addStopWrapperToGraphic(
                                    Ha[r],
                                    Ha[r].attributes.Name
                                  )
                                ),
                                  this._updateStop(this.stops[r], r);
                              this._setStops();
                              Y.loadMessages.push({
                                message:
                                  G.widgets.directions.routeLayerStopsOnly,
                                messageType: "Warning",
                              });
                            } else
                              Y.loadMessages.push({
                                message: G.widgets.directions.routeLayerEmpty,
                                messageType: "Warning",
                              });
                            w(Y);
                            b.resolve(Y);
                          }
                          for (r = 0; r < Y.loadMessages.length; r++)
                            this._showMessage(Y.loadMessages[r].message);
                        }),
                        k.hitch(this, function (Y) {
                          b.reject(Y);
                          this._showMessage(
                            "GWM_0003" === Y.messageCode
                              ? G.widgets.directions.error.accessDenied +
                                  this._naRouteSharing.portal.getPortalUser()
                                    .username
                              : G.widgets.directions.error.loadError
                          );
                        })
                      );
                    }),
                    b.reject
                  );
                }),
                b.reject
              );
              return b.promise;
            },
          });
          q("extend-esri") && k.setObject("dijit.Directions", R, v);
          return R;
        }
      );
    },
    "dojo/data/ObjectStore": function () {
      define(
        "../_base/lang ../Evented ../_base/declare ../_base/Deferred ../promise/all ../_base/array ../_base/connect ../regexp".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E) {
          function A(m) {
            return "*" == m ? ".*" : "?" == m ? "." : m;
          }
          return k("dojo.data.ObjectStore", [R], {
            objectStore: null,
            constructor: function (m) {
              this._dirtyObjects = [];
              m.labelAttribute && (m.labelProperty = m.labelAttribute);
              C.mixin(this, m);
            },
            labelProperty: "label",
            getValue: function (m, z, g) {
              return "function" === typeof m.get ? m.get(z) : z in m ? m[z] : g;
            },
            getValues: function (m, z) {
              m = this.getValue(m, z);
              return m instanceof Array ? m : void 0 === m ? [] : [m];
            },
            getAttributes: function (m) {
              var z = [],
                g;
              for (g in m)
                !m.hasOwnProperty(g) ||
                  ("_" == g.charAt(0) && "_" == g.charAt(1)) ||
                  z.push(g);
              return z;
            },
            hasAttribute: function (m, z) {
              return z in m;
            },
            containsValue: function (m, z, g) {
              return -1 < O.indexOf(this.getValues(m, z), g);
            },
            isItem: function (m) {
              return "object" == typeof m && m && !(m instanceof Date);
            },
            isItemLoaded: function (m) {
              return m && "function" !== typeof m.load;
            },
            loadItem: function (m) {
              var z;
              "function" === typeof m.item.load
                ? Z.when(m.item.load(), function (g) {
                    z = g;
                    var f = g instanceof Error ? m.onError : m.onItem;
                    f && f.call(m.scope, g);
                  })
                : m.onItem && m.onItem.call(m.scope, m.item);
              return z;
            },
            close: function (m) {
              return m && m.abort && m.abort();
            },
            fetch: function (m) {
              function z(l) {
                m.onError && m.onError.call(f, l, m);
              }
              m = C.delegate(m, m && m.queryOptions);
              var g = this,
                f = m.scope || g,
                c = m.query;
              if ("object" == typeof c) {
                c = C.delegate(c);
                for (var d in c) {
                  var q = c[d];
                  "string" == typeof q &&
                    ((c[d] = RegExp(
                      "^" +
                        E.escapeString(q, "*?\\").replace(/\\.|\*|\?/g, A) +
                        "$",
                      m.ignoreCase ? "mi" : "m"
                    )),
                    (c[d].toString = (function (l) {
                      return function () {
                        return l;
                      };
                    })(q)));
                }
              }
              var t = this.objectStore.query(c, m);
              Z.when(
                t.total,
                function (l) {
                  Z.when(
                    t,
                    function (y) {
                      m.onBegin && m.onBegin.call(f, l || y.length, m);
                      if (m.onItem)
                        for (var J = 0; J < y.length; J++)
                          m.onItem.call(f, y[J], m);
                      m.onComplete &&
                        m.onComplete.call(f, m.onItem ? null : y, m);
                      return y;
                    },
                    z
                  );
                },
                z
              );
              m.abort = function () {
                t.cancel && t.cancel();
              };
              t.observe &&
                (this.observing && this.observing.cancel(),
                (this.observing = t.observe(function (l, y, J) {
                  if (-1 == O.indexOf(g._dirtyObjects, l))
                    if (-1 == y) g.onNew(l);
                    else if (-1 == J) g.onDelete(l);
                    else
                      for (var H in l)
                        if (H != g.objectStore.idProperty)
                          g.onSet(l, H, null, l[H]);
                }, !0)));
              this.onFetch(t);
              m.store = this;
              return m;
            },
            getFeatures: function () {
              return {
                "dojo.data.api.Read": !!this.objectStore.get,
                "dojo.data.api.Identity": !0,
                "dojo.data.api.Write": !!this.objectStore.put,
                "dojo.data.api.Notification": !0,
              };
            },
            getLabel: function (m) {
              if (this.isItem(m)) return this.getValue(m, this.labelProperty);
            },
            getLabelAttributes: function (m) {
              return [this.labelProperty];
            },
            getIdentity: function (m) {
              return this.objectStore.getIdentity
                ? this.objectStore.getIdentity(m)
                : m[this.objectStore.idProperty || "id"];
            },
            getIdentityAttributes: function (m) {
              return [this.objectStore.idProperty];
            },
            fetchItemByIdentity: function (m) {
              var z;
              Z.when(
                this.objectStore.get(m.identity),
                function (g) {
                  z = g;
                  m.onItem.call(m.scope, g);
                },
                function (g) {
                  m.onError.call(m.scope, g);
                }
              );
              return z;
            },
            newItem: function (m, z) {
              if (z) {
                var g = this.getValue(z.parent, z.attribute, []);
                g = g.concat([m]);
                m.__parent = g;
                this.setValue(z.parent, z.attribute, g);
              }
              this._dirtyObjects.push({ object: m, save: !0 });
              this.onNew(m);
              return m;
            },
            deleteItem: function (m) {
              this.changing(m, !0);
              this.onDelete(m);
            },
            setValue: function (m, z, g) {
              var f = m[z];
              this.changing(m);
              m[z] = g;
              this.onSet(m, z, f, g);
            },
            setValues: function (m, z, g) {
              if (!C.isArray(g))
                throw Error(
                  "setValues expects to be passed an Array object as its value"
                );
              this.setValue(m, z, g);
            },
            unsetAttribute: function (m, z) {
              this.changing(m);
              var g = m[z];
              delete m[z];
              this.onSet(m, z, g, void 0);
            },
            changing: function (m, z) {
              m.__isDirty = !0;
              for (var g = 0; g < this._dirtyObjects.length; g++) {
                var f = this._dirtyObjects[g];
                if (m == f.object) {
                  z && ((f.object = !1), this._saveNotNeeded || (f.save = !0));
                  return;
                }
              }
              f = m instanceof Array ? [] : {};
              for (g in m) m.hasOwnProperty(g) && (f[g] = m[g]);
              this._dirtyObjects.push({
                object: !z && m,
                old: f,
                save: !this._saveNotNeeded,
              });
            },
            save: function (m) {
              m = m || {};
              var z = [],
                g = [],
                f = this,
                c = this._dirtyObjects;
              try {
                I.connect(m, "onError", function () {
                  if (!1 !== m.revertOnError) {
                    var H = c;
                    c = g;
                    f.revert();
                    f._dirtyObjects = H;
                  } else f._dirtyObjects = c.concat(g);
                });
                var d;
                this.objectStore.transaction &&
                  (d = this.objectStore.transaction());
                for (var q = 0; q < c.length; q++) {
                  var t = c[q],
                    l = t.object,
                    y = t.old;
                  delete l.__isDirty;
                  if (l) {
                    var J = this.objectStore.put(l, { overwrite: !!y });
                    z.push(J);
                  } else
                    "undefined" != typeof y &&
                      ((J = this.objectStore.remove(this.getIdentity(y))),
                      z.push(J));
                  g.push(t);
                  c.splice(q--, 1);
                }
                U(z).then(
                  function (H) {
                    m.onComplete && m.onComplete.call(m.scope, H);
                  },
                  function (H) {
                    m.onError && m.onError.call(m.scope, H);
                  }
                );
                d && d.commit();
              } catch (H) {
                m.onError.call(m.scope, value);
              }
            },
            revert: function () {
              for (var m = this._dirtyObjects, z = m.length; 0 < z; ) {
                z--;
                var g = m[z],
                  f = g.object;
                g = g.old;
                if (f && g) {
                  for (var c in g)
                    g.hasOwnProperty(c) &&
                      f[c] !== g[c] &&
                      (this.onSet(f, c, f[c], g[c]), (f[c] = g[c]));
                  for (c in f)
                    g.hasOwnProperty(c) ||
                      (this.onSet(f, c, f[c]), delete f[c]);
                } else if (g) this.onNew(g);
                else this.onDelete(f);
                delete (f || g).__isDirty;
                m.splice(z, 1);
              }
            },
            isDirty: function (m) {
              return m ? m.__isDirty : !!this._dirtyObjects.length;
            },
            onSet: function () {},
            onNew: function () {},
            onDelete: function () {},
            onFetch: function (m) {},
          });
        }
      );
    },
    "esri/dijit/Search": function () {
      define(
        "require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/Evented dojo/Deferred dojo/keys dojo/on dojo/query dojo/uacss dojo/regexp dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-style dojo/dom-construct dojo/date/locale dojo/i18n!../nls/jsapi dojo/text!./Search/templates/Search.html dijit/_WidgetBase dijit/_TemplatedMixin dijit/_FocusMixin dijit/a11yclick dijit/focus ../lang ../InfoTemplate ../kernel ../SpatialReference ../graphic ../promiseList ../symbols/PictureMarkerSymbol ../symbols/SimpleMarkerSymbol ../symbols/SimpleLineSymbol ../symbols/SimpleFillSymbol ../symbols/TextSymbol ../symbols/Font ../geometry/Point ../geometry/Extent ../geometry/normalizeUtils ../geometry/scaleUtils ../tasks/locator ../tasks/query ../Color ../styles/basic".split(
          " "
        ),
        function (
          C,
          R,
          k,
          Z,
          U,
          O,
          I,
          E,
          A,
          m,
          z,
          g,
          f,
          c,
          d,
          q,
          t,
          l,
          y,
          J,
          H,
          T,
          Q,
          M,
          B,
          G,
          ca,
          N,
          F,
          X,
          x,
          da,
          ba,
          v,
          n,
          u,
          V,
          ia,
          ea,
          ka,
          qa,
          pa,
          xa,
          ya
        ) {
          function Ea(e, D) {
            e && D && ((e._layer = D), (e._sourceLayer = D));
          }
          R = R([J, H, T, U], {
            declaredClass: "esri.dijit.Search",
            templateString: y,
            reHostedFS: /https?:\/\/services.*\.arcgis\.com/i,
            constructor: function (e, D) {
              this.css = {
                searchGroup: "searchGroup",
                searchInput: "searchInput",
                searchInputGroup: "searchInputGroup",
                searchBtn: "searchBtn",
                searchSubmit: "searchSubmit",
                searchIcon: "searchIcon esri-icon-search",
                searchButtonText: "searchButtonText",
                searchToggle: "searchToggle",
                searchToggleIcon: "searchIcon esri-icon-down-arrow",
                searchMenu: "searchMenu",
                searchMenuHeader: "menuHeader",
                searchClear: "searchClear",
                searchClearIcon: "searchIcon esri-icon-close searchClose",
                searchSpinner:
                  "searchIcon esri-icon-loading-indicator searchSpinner",
                searchSourceName: "sourceName",
                suggestionsMenu: "suggestionsMenu",
                sourcesMenu: "sourcesMenu",
                activeSource: "active",
                hasValue: "hasValue",
                hasButtonMode: "hasButtonMode",
                hasMultipleSources: "hasMultipleSources",
                showSuggestions: "showSuggestions",
                showSources: "showSources",
                showNoResults: "showNoResults",
                searchLoading: "searchLoading",
                latLonHeader: "searchLatLongHeader",
                searchMoreResults: "moreResults",
                searchMoreResultsList: "resultsList",
                searchMoreResultsHeader: "moreHeader",
                searchMoreResultsItem: "moreItem",
                searchMoreResultsListHeader: "popupHeader",
                searchShowMoreResults: "showMoreResults",
                searchNoResultsMenu: "noResultsMenu",
                searchNoResultsBody: "noResultsBody",
                searchNoResultsHeader: "noResultsHeader",
                searchNoValueIcon: "noValueIcon esri-icon-notice-triangle",
                searchNoValueText: "noValueText",
                searchNoResultsText: "noResultsText",
                searchExpandContainer: "searchExpandContainer",
                searchAnimateContainer: "searchAnimate",
                searchExpanded: "searchExpanded",
                searchCollapsed: "searchCollapsed",
                searchClearFloat: "searchClearFloat",
              };
              this._allIndex = "all";
              this._objectIdIdentifier = "_objectId";
              this._deferreds = [];
              this._sourceNames = [];
              this.defaultSource = {
                locator: new qa(
                  "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
                ),
                singleLineFieldName: "SingleLine",
                outFields: ["Addr_type", "Match_addr", "StAddr", "City"],
                name: l.widgets.Search.main.esriLocatorName,
                localSearchOptions: { minScale: 3e5, distance: 5e4 },
                placeholder: l.widgets.Search.main.placeholder,
                highlightSymbol: new x(
                  C.toUrl("./Search/images/search-pointer.png"),
                  36,
                  36
                ).setOffset(9, 18),
              };
              this.options = {
                map: null,
                theme: "arcgisSearch",
                visible: !0,
                value: "",
                allPlaceholder: "",
                sources: [this.defaultSource],
                activeSourceIndex: 0,
                suggestionDelay: 350,
                enableSourcesMenu: !0,
                enableSuggestionsMenu: !0,
                enableInfoWindow: !0,
                showInfoWindowOnSelect: !0,
                enableSuggestions: !0,
                enableButtonMode: !1,
                autoNavigate: !0,
                autoSelect: !0,
                addLayersFromMap: !1,
                zoomScale: 1e3,
                graphicsLayer: null,
                enableHighlight: !0,
                highlightGraphic: null,
                enableLabel: !1,
                labelSymbol: new n()
                  .setColor(new xa([181, 56, 46, 0.9]))
                  .setFont(
                    new u(
                      "14px",
                      u.STYLE_NORMAL,
                      u.VARIANT_NORMAL,
                      u.WEIGHT_BOLD,
                      "Arial"
                    )
                  ),
                labelGraphic: null,
                infoTemplate: new G(
                  l.widgets.Search.main.searchResult,
                  '\x3cdiv class\x3d"${searchTheme}"\x3e\x3cdiv id\x3d"${searchMoreResultsId}" class\x3d"${searchMoreResults}"\x3e\x3cdiv class\x3d"${searchMoreResultsItem}"\x3e${searchResult}\x3c/div\x3e\x3cdiv\x3e${searchMoreResultsHtml}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'
                ),
                searchResults: null,
                suggestResults: null,
                selectedResult: null,
                magicKey: null,
                selectedFeatureId: null,
                expanded: !1,
                maxLength: 128,
                maxResults: 6,
                maxSuggestions: 6,
                locationToAddressDistance: 1500,
                minCharacters: 3,
                enableSearchingAll: !0,
              };
              e = k.mixin({}, this.options, e);
              this.set(e);
              this._updateActiveSource();
              this._i18n = l;
              this._defaultSR = new N(4326);
              this.domNode = D;
            },
            startup: function () {
              this.inherited(arguments);
              this.sources || (this.sources = []);
              this._mapLoaded().then(k.hitch(this, this._init));
            },
            postCreate: function () {
              var e = this;
              this.inherited(arguments);
              this._moreResultsId = this.id + "_more_results";
              this.own(
                E(this.submitNode, Q, k.hitch(this, this._searchButton))
              );
              this.own(
                E(
                  this.sourcesBtnNode,
                  Q,
                  k.hitch(this, this._toggleSourcesMenu)
                )
              );
              this.own(E(this.inputNode, Q, k.hitch(this, this._inputClick)));
              this.own(E(this.clearNode, Q, k.hitch(this, this._clearButton)));
              this.own(
                E(
                  this.formNode,
                  "submit",
                  k.hitch(this, function (D) {
                    D.preventDefault();
                    this._cancelSuggest();
                    this.search();
                  })
                )
              );
              this.own(
                E(
                  this.inputNode,
                  "keyup",
                  k.hitch(this, function (D) {
                    this._inputKey(D);
                  })
                )
              );
              this.own(
                E(
                  this.sourcesBtnNode,
                  "keyup",
                  k.hitch(this, function (D) {
                    this._sourceBtnKey(D);
                  })
                )
              );
              this.own(
                E(this.suggestionsNode, "li:click, li:keyup", function (D) {
                  e._suggestionsEvent(D, this);
                })
              );
              this.own(
                E(this.sourcesNode, "li:click, li:keyup", function (D) {
                  e._sourcesEvent(D, this);
                })
              );
              this.own(
                E(
                  this.inputNode,
                  "input, paste",
                  k.hitch(this, function () {
                    this._suggestDelay();
                  })
                )
              );
              this.map &&
                this.map.infoWindow &&
                this.map.infoWindow.domNode &&
                this.enableInfoWindow &&
                (this.own(
                  E(
                    this.map.infoWindow.domNode,
                    "#" + this._moreResultsId + "_show:click",
                    k.hitch(this, function (D) {
                      this._showMoreResultsClick(D);
                    })
                  )
                ),
                this.own(
                  E(
                    this.map.infoWindow.domNode,
                    "#" + this._moreResultsId + "_list li a:click",
                    k.hitch(this, function (D) {
                      this._moreResultsClick(D);
                    })
                  )
                ),
                this.own(
                  E(
                    this.map.infoWindow.domNode,
                    "#" +
                      this._moreResultsId +
                      " [data-switch-coordinates]:click",
                    k.hitch(this, function (D) {
                      this._switchCoordinatesClick(D);
                    })
                  )
                ));
              this.value && this._checkStatus();
              this._hideMenus();
              this._updateVisible();
              this._insertSources(this.sources);
              this._setPlaceholder(this.activeSourceIndex);
              this._updateButtonMode(this.enableButtonMode);
              this.toggle(this.expanded);
            },
            destroy: function () {
              this.clear();
              q.empty(this.domNode);
              this.inherited(arguments);
            },
            clear: function () {
              this.clearGraphics();
              f.get(this.inputNode, "value") &&
                f.set(this.inputNode, "value", "");
              this._changeAttrValue("value", "");
              this.set("searchResults", null);
              this.set("suggestResults", null);
              this.set("selectedResult", null);
              this.set("magicKey", null);
              this.set("selectedFeatureId", null);
              c.remove(this.containerNode, this.css.hasValue);
              f.set(this.clearNode, "title", "");
              this._hideMenus();
              this._closePopup();
              this._hideLoading();
              this.emit("clear-search");
            },
            show: function () {
              d.set(this.domNode, "display", "block");
            },
            hide: function () {
              d.set(this.domNode, "display", "none");
            },
            expand: function () {
              this.enableButtonMode &&
                (c.add(this.containerNode, this.css.searchExpanded),
                c.remove(this.containerNode, this.css.searchCollapsed),
                this._hideMenus(),
                this.set("expanded", !0));
            },
            collapse: function () {
              this.enableButtonMode &&
                (c.remove(this.containerNode, this.css.searchExpanded),
                c.add(this.containerNode, this.css.searchCollapsed),
                this._hideMenus(),
                this.set("expanded", !1));
            },
            toggle: function (e) {
              this.enableButtonMode &&
                ("undefined" === typeof e && (e = !this.expanded),
                e ? this.expand() : this.collapse());
            },
            search: function (e) {
              var D = new O();
              this._mapLoaded().then(
                k.hitch(this, function () {
                  this._searchDeferred(e).then(
                    k.hitch(this, function (P) {
                      var L = P.results;
                      this.set("searchResults", L);
                      0 === P.numResults &&
                        (this._noResults(P.value), this._showNoResultsMenu());
                      this._hideLoading();
                      this.emit("search-results", P);
                      this._selectFirstResult(L, P.activeSourceIndex);
                      D.resolve(L);
                    }),
                    k.hitch(this, function (P) {
                      D.reject(P);
                    })
                  );
                })
              );
              return D.promise;
            },
            suggest: function (e) {
              var D = new O();
              this._mapLoaded().then(
                k.hitch(this, function () {
                  this._suggestDeferred(e).then(
                    k.hitch(this, function (P) {
                      if (P) {
                        var L = P.results;
                        this.set("suggestResults", L);
                        this._insertSuggestions(L, P.value);
                        this.emit("suggest-results", P);
                        D.resolve(L);
                      }
                    }),
                    k.hitch(this, function (P) {
                      D.reject(P);
                    })
                  );
                })
              );
              return D.promise;
            },
            select: function (e) {
              var D = this._getDefaultSymbol(e),
                P = this.labelSymbol,
                L = this.sources,
                aa = this.activeSourceIndex,
                ja = this.enableHighlight,
                oa = this.enableLabel,
                Aa = this.autoNavigate,
                ra = this.showInfoWindowOnSelect,
                wa = this.enableInfoWindow,
                la = this.infoTemplate,
                ua = e.feature ? new F(e.feature.toJson()) : null,
                Ia = ua ? e.feature._sourceLayer : null;
              Ea(ua, Ia);
              if (aa === this._allIndex) {
                var Ka = this._getSourceIndexOfResult(e);
                if (null !== Ka) {
                  var Ba = L[Ka];
                  aa = Ka;
                }
              } else Ba = L[aa];
              Ba &&
                (Ba.hasOwnProperty("highlightSymbol") &&
                  (D = Ba.highlightSymbol),
                Ba.hasOwnProperty("labelSymbol") && (P = Ba.labelSymbol),
                Ba.hasOwnProperty("enableHighlight") &&
                  (ja = Ba.enableHighlight),
                Ba.hasOwnProperty("enableLabel") && (oa = Ba.enableLabel),
                Ba.hasOwnProperty("autoNavigate") && (Aa = Ba.autoNavigate),
                Ba.hasOwnProperty("showInfoWindowOnSelect") &&
                  (ra = Ba.showInfoWindowOnSelect),
                Ba.hasOwnProperty("enableInfoWindow") &&
                  (wa = Ba.enableInfoWindow),
                Ba.hasOwnProperty("infoTemplate")
                  ? (la = Ba.infoTemplate)
                  : Ba.featureLayer &&
                    Ba.featureLayer.infoTemplate &&
                    (la = Ba.featureLayer.infoTemplate));
              this._hideMenus();
              this._hideLoading();
              if (ua) {
                L = this.highlightGraphic;
                var Pa = this.graphicsLayer;
                Ka = this.labelGraphic;
                var Sa = k.mixin({}, ua.attributes, {
                    searchTheme: this.theme,
                    searchResult: this._searchResultHTML(e),
                    searchMoreResults: this.css.searchMoreResults,
                    searchMoreResultsItem: this.css.searchMoreResultsItem,
                    searchMoreResultsId: this._moreResultsId,
                    searchMoreResultsHtml: this._moreResultsHTML(e),
                  }),
                  Va = null;
                wa && (Va = la);
                Ka
                  ? (Ka.setGeometry(ua.geometry),
                    Ka.setAttributes(Sa),
                    Ka.setSymbol(P),
                    P && "textsymbol" === P.type && Ka.symbol.setText(e.name))
                  : ((Ka = new F(ua.geometry, P, Sa)),
                    Ea(Ka, Ia),
                    P && "textsymbol" === P.type && Ka.symbol.setText(e.name),
                    oa &&
                      (Pa
                        ? Pa.add(Ka)
                        : this.map &&
                          this.map.graphics &&
                          this.map.graphics.add(Ka)));
                L
                  ? (L.setGeometry(ua.geometry),
                    L.setAttributes(Sa),
                    L.setInfoTemplate(Va),
                    L.setSymbol(D))
                  : ((L = new F(ua.geometry, D, Sa, Va)),
                    Ea(L, Ia),
                    ja &&
                      (Pa
                        ? Pa.add(L)
                        : this.map &&
                          this.map.graphics &&
                          this.map.graphics.add(L)));
                L &&
                  L.symbol &&
                  "textsymbol" === L.symbol.type &&
                  L.symbol.setText(e.name);
                this.map &&
                  this.map.infoWindow &&
                  wa &&
                  ra &&
                  (this.map.infoWindow.setFeatures([L]),
                  (D = this._getPointFromGeometry(L.geometry)),
                  this.map.infoWindow.show(D));
                this.map &&
                  Aa &&
                  e &&
                  e.hasOwnProperty("extent") &&
                  "function" === typeof this.map.setExtent &&
                  this.map.setExtent(e.extent, !0);
                this.set("highlightGraphic", L);
                this.set("labelGraphic", Ka);
              }
              this.set("selectedResult", e);
              this.emit("select-result", {
                result: e,
                source: Ba,
                sourceIndex: aa,
              });
            },
            focus: function () {
              M.focus(this.inputNode);
            },
            blur: function () {
              this.inputNode.blur();
              M.curNode && M.curNode.blur();
            },
            clearGraphics: function () {
              var e = this.highlightGraphic,
                D = this.graphicsLayer,
                P = this.labelGraphic;
              e &&
                (D
                  ? D.remove(e)
                  : this.map &&
                    this.map.graphics &&
                    this.map.graphics.remove(e));
              P &&
                (D
                  ? D.remove(P)
                  : this.map &&
                    this.map.graphics &&
                    this.map.graphics.remove(P));
              this.set("labelGraphic", null);
              this.set("highlightGraphic", null);
            },
            _mapLoaded: function () {
              var e = new O();
              if (this.map)
                if (this.map.loaded) e.resolve();
                else
                  E.once(
                    this.map,
                    "load",
                    k.hitch(this, function () {
                      e.resolve();
                    })
                  );
              else e.resolve();
              return e.promise;
            },
            _init: function () {
              this._getMapLayers().then(
                k.hitch(this, function () {
                  this.set("loaded", !0);
                  this.emit("load");
                })
              );
            },
            _clearButton: function () {
              this.clear();
              M.focus(this.inputNode);
            },
            _error: function (e) {
              return Error(this.declaredClass + " " + e);
            },
            _searchDeferred: function (e) {
              var D = new O(),
                P = this.value,
                L = this.activeSourceIndex;
              e && e.hasOwnProperty("index") && (L = e.index);
              this._showLoading();
              this._hideMenus();
              this._closePopup();
              this.clearGraphics();
              var aa = { magicKey: this.magicKey, text: P };
              e
                ? "string" === typeof e
                  ? ((aa.text = e), (e = this._searchQueries(aa)))
                  : (e =
                      "object" === typeof e && e.hasOwnProperty("magicKey")
                        ? this._searchQueries(e)
                        : "object" === typeof e && e.hasOwnProperty("geometry")
                        ? this._searchQueries({ geometry: e })
                        : "object" === typeof e &&
                          e.hasOwnProperty(this._objectIdIdentifier)
                        ? this._searchQueries(e)
                        : "object" === typeof e && "point" === e.type
                        ? this._searchQueries({ point: e })
                        : e instanceof Array && 2 === e.length
                        ? this._searchQueries({ latlon: e })
                        : this._searchQueries(aa))
                : (e = this._searchQueries(aa));
              e.always(
                k.hitch(this, function (ja) {
                  ja = this._formatResults(ja, L, P);
                  D.resolve(ja);
                })
              );
              return D.promise;
            },
            _suggestDeferred: function (e) {
              var D = new O();
              this._deferreds.push(D);
              e || (e = this.value);
              var P = this.activeSourceIndex;
              this._suggestQueries({ text: e }).always(
                k.hitch(this, function (L) {
                  var aa;
                  if (L)
                    for (var ja = 0; ja < L.length; ja++) L[ja] && (aa = !0);
                  aa
                    ? ((L = this._formatResults(L, P, e)), D.resolve(L))
                    : D.resolve();
                })
              );
              return D.promise;
            },
            _getDefaultSymbol: function (e) {
              var D;
              this.map && (D = this.map.getBasemap());
              D || (D = "topo");
              if (e && e.feature && e.feature.geometry)
                var P = e.feature.geometry.type;
              "polyline" === P
                ? (P = "line")
                : "circle" === P || "extent" === P
                ? (P = "polygon")
                : "multipoint" === P && (P = "point");
              if (P) {
                if (
                  (e = ya.getSchemes({
                    theme: "default",
                    basemap: D,
                    geometryType: P,
                  }))
                )
                  var L = e.primaryScheme;
                if (L) {
                  L.color &&
                    L.hasOwnProperty("opacity") &&
                    (L.color.a = L.opacity);
                  var aa = L;
                  e = L.color;
                  L = L.size;
                  switch (P) {
                    case "point":
                      var ja = new da();
                      ja.setColor(e);
                      ja.setSize(null !== L ? L : aa.size);
                      P = new ba();
                      P.setColor(aa.outline.color);
                      P.setWidth(aa.outline.width);
                      ja.setOutline(P);
                      break;
                    case "line":
                      ja = new ba();
                      ja.setColor(e);
                      ja.setWidth(null !== L ? L : aa.width);
                      break;
                    case "polygon":
                      (ja = new v()),
                        ja.setColor(e),
                        (P = new ba()),
                        P.setColor(aa.outline.color),
                        P.setWidth(aa.outline.width),
                        ja.setOutline(P);
                  }
                  aa = ja;
                }
              }
              return aa;
            },
            _selectFirstResult: function (e, D) {
              if (this.autoSelect && e) {
                var P;
                D === this._allIndex
                  ? (P = this._getFirstResult(e))
                  : e[D] && e[D][0] && (P = e[D][0]);
                P && this.select(P);
              }
            },
            _getSourceIndexOfResult: function (e) {
              var D = this.searchResults;
              if (D)
                for (var P in D)
                  if (D[P] && D[P].length)
                    for (var L = 0; L < D[P].length; L++)
                      if (D[P][L] === e) return parseInt(P, 10);
              return null;
            },
            _getFirstResult: function (e) {
              if (e) for (var D in e) if (e[D] && e[D][0]) return e[D][0];
              return !1;
            },
            _onFocus: function () {
              this.map &&
                "function" === typeof this.map.disableKeyboardNavigation &&
                this.map.disableKeyboardNavigation();
              this.emit("focus");
              this.inherited(arguments);
            },
            _onBlur: function () {
              this._hideMenus();
              this.map &&
                "function" === typeof this.map.enableKeyboardNavigation &&
                this.map.enableKeyboardNavigation();
              this.enableButtonMode && this.loaded && this.collapse();
              this.emit("blur");
              this.inherited(arguments);
            },
            _getMapLayers: function () {
              var e = new O();
              if (this.addLayersFromMap && this.map) {
                var D = [],
                  P = this.map.graphicsLayerIds;
                if (P && P.length) {
                  for (var L = 0; L < P.length; L++) {
                    var aa = this.map.getLayer(P[L]);
                    aa && D.push(this._featureLayerLoaded(aa));
                  }
                  X(D).always(
                    k.hitch(this, function (ja) {
                      for (
                        var oa, Aa = this.sources, ra = 0;
                        ra < ja.length;
                        ra++
                      )
                        ja[ra] &&
                          ja[ra].loaded &&
                          "Feature Layer" === ja[ra].type &&
                          (Aa.push({
                            featureLayer: ja[ra],
                            enableSuggestions: !0,
                          }),
                          (oa = !0));
                      oa && this.set("sources", Aa);
                      e.resolve();
                    })
                  );
                } else e.resolve();
              } else e.resolve();
              return e.promise;
            },
            _switchCoordinatesClick: function (e) {
              e.preventDefault();
              if ((e = f.get(e.target, "data-switch-coordinates")))
                this._cancelSuggest(), this.set("value", e), this.search();
            },
            _moreResultsClick: function (e) {
              e.preventDefault();
              var D = e.target;
              e = parseInt(f.get(D, "data-source-index"), 10);
              D = parseInt(f.get(D, "data-index"), 10);
              var P = this.searchResults;
              P && P[e] && (e = P[e][D]) && this.select(e);
            },
            _showMoreResultsClick: function (e) {
              e.preventDefault();
              if ((e = g.byId(this._moreResultsId))) {
                c.toggle(e, this.css.searchShowMoreResults);
                var D = g.byId(this._moreResultsId + "_show");
                D &&
                  (c.contains(e, this.css.searchShowMoreResults)
                    ? f.set(
                        D,
                        "textContent",
                        l.widgets.Search.main.hideMoreResults
                      )
                    : f.set(
                        D,
                        "textContent",
                        l.widgets.Search.main.showMoreResults
                      ));
              }
            },
            _featureLayerLoaded: function (e) {
              var D = new O();
              if (e.loaded) D.resolve(e);
              else if (e.loadError)
                D.reject(this._error("Layer failed to load."));
              else {
                var P = E.once(
                  e,
                  "load",
                  k.hitch(this, function () {
                    L.remove();
                    D.resolve(e);
                  })
                );
                var L = E.once(
                  e,
                  "error",
                  k.hitch(this, function () {
                    P.remove();
                    D.reject(this._error("Layer could not be loaded."));
                  })
                );
              }
              return D.promise;
            },
            _getObjectSize: function (e) {
              var D = 0,
                P;
              for (P in e) e.hasOwnProperty(P) && D++;
              return D;
            },
            _sourcesEvent: function (e, D) {
              var P = f.get(D, "data-index"),
                L = A("li", this.sourcesNode);
              D = Z.indexOf(L, D);
              P !== this._allIndex && (P = parseInt(P, 10));
              "click" === e.type || e.keyCode === I.ENTER
                ? (this.set("activeSourceIndex", P),
                  M.focus(this.inputNode),
                  this._hideSourcesMenu())
                : e.keyCode === I.UP_ARROW
                ? (e.stopPropagation(),
                  e.preventDefault(),
                  (e = D - 1),
                  0 > e ? M.focus(this.sourcesBtnNode) : M.focus(L[e]))
                : e.keyCode === I.DOWN_ARROW
                ? (e.stopPropagation(),
                  e.preventDefault(),
                  (e = D + 1),
                  e >= L.length ? M.focus(this.sourcesBtnNode) : M.focus(L[e]))
                : e.keyCode === I.ESCAPE &&
                  (this._hideSourcesMenu(), M.focus(this.inputNode));
            },
            _suggestionsEvent: function (e, D) {
              var P = f.get(D, "data-source-index"),
                L = parseInt(f.get(D, "data-index"), 10),
                aa = A("li", this.suggestionsNode),
                ja = this.sources;
              D = Z.indexOf(aa, D);
              P !== this._allIndex && (P = parseInt(P, 10));
              var oa;
              this._clearQueryTimeout();
              "click" === e.type || e.keyCode === I.ENTER
                ? ((aa = this.suggestResults) &&
                    aa[P] &&
                    aa[P][L] &&
                    (oa = aa[P][L]),
                  oa &&
                    ((oa.index = P),
                    ja[P].featureLayer
                      ? ((P = ja[P].featureLayer.objectIdField),
                        (oa[this._objectIdIdentifier] =
                          oa.feature.attributes[P]),
                        this.set("value", this._getSuggestionName(oa)),
                        this.set("selectedFeatureId", oa.feature.attributes[P]))
                      : oa.magicKey &&
                        oa.text &&
                        (this.set("value", oa.text),
                        this.set("magicKey", oa.magicKey)),
                    this.search(oa),
                    M.focus(this.inputNode)))
                : e.keyCode === I.BACKSPACE || e.keyCode === I.DELETE
                ? M.focus(this.inputNode)
                : e.keyCode === I.UP_ARROW
                ? (e.stopPropagation(),
                  e.preventDefault(),
                  (oa = D - 1),
                  0 > oa ? M.focus(this.inputNode) : M.focus(aa[oa]))
                : e.keyCode === I.DOWN_ARROW
                ? (e.stopPropagation(),
                  e.preventDefault(),
                  (oa = D + 1),
                  oa >= aa.length ? M.focus(this.inputNode) : M.focus(aa[oa]))
                : e.keyCode === I.ESCAPE &&
                  (this._hideMenus(), M.focus(this.inputNode));
            },
            _getResultName: function (e) {
              var D;
              e.hasOwnProperty("name") &&
                null !== e.name &&
                (D = e.name.toString());
              D || (D = l.widgets.Search.main.untitledResult);
              return D;
            },
            _getSuggestionName: function (e) {
              var D;
              e.hasOwnProperty("name") &&
                null !== e.name &&
                (D = e.name.toString());
              e = e.text || D;
              e || (e = l.widgets.Search.main.untitledResult);
              return e;
            },
            _searchResultHTML: function (e) {
              var D = "";
              if (
                e.feature &&
                e.feature.attributes &&
                e.feature.attributes.Addr_type &&
                "LatLong" === e.feature.attributes.Addr_type
              ) {
                var P = e.name.split(" ");
                if (2 === P.length) {
                  var L = P[0];
                  var aa = P[1];
                }
                aa && L
                  ? ((e = parseFloat(L)),
                    (aa = parseFloat(aa)),
                    (P = aa + ", " + e),
                    (D +=
                      '\x3cdiv class\x3d"' +
                      this.css.searchMoreResultsItem +
                      '"\x3e'),
                    (D +=
                      '\x3cdiv class\x3d"' +
                      this.css.latLonHeader +
                      '"\x3e' +
                      l.widgets.Search.main.lonlat +
                      "\x3c/div\x3e"),
                    (D =
                      D +
                      (e + ", " + aa) +
                      '\x3c/div\x3e\x3cdiv class\x3d"' +
                      (this.css.searchMoreResultsItem + '"\x3e')),
                    e === aa ||
                      90 < e ||
                      -90 > e ||
                      180 < aa ||
                      -180 > aa ||
                      ((D +=
                        '\x3cdiv class\x3d"' +
                        this.css.latLonHeader +
                        '"\x3e' +
                        l.widgets.Search.main.reverseLonLatHeader +
                        "\x3c/div\x3e"),
                      (D +=
                        '\x3ca data-switch-coordinates\x3d"' +
                        P +
                        '" tabindex\x3d"0" href\x3d"#"\x3e' +
                        P +
                        "\x3c/a\x3e\x3c/div\x3e")))
                  : (D = e.name);
              } else D = e.name;
              return D;
            },
            _moreResultsHTML: function (e) {
              var D = "",
                P = "",
                L = this.searchResults,
                aa = this.sources,
                ja = 0;
              if (L) {
                P +=
                  '\x3cdiv class\x3d"' +
                  this.css.searchMoreResultsItem +
                  '"\x3e';
                P +=
                  '\x3ca href\x3d"#" id\x3d"' +
                  this._moreResultsId +
                  '_show"\x3e' +
                  l.widgets.Search.main.showMoreResults +
                  "\x3c/a\x3e";
                P =
                  P +
                  '\x3c/div\x3e\x3cdiv class\x3d"' +
                  (this.css.searchMoreResultsList + '"\x3e');
                P += '\x3cdiv id\x3d"' + this._moreResultsId + '_list"\x3e';
                for (var oa in L)
                  if (L[oa]) {
                    var Aa = L[oa].length;
                    if (Aa) {
                      var ra = 1 === Aa && L[oa][0] === e;
                      if (1 < this._getObjectSize(L) && !ra) {
                        var wa = this._getSourceName(oa);
                        P +=
                          '\x3cdiv class\x3d"' +
                          this.css.searchMoreResultsListHeader +
                          '"\x3e' +
                          wa +
                          "\x3c/div\x3e";
                      }
                      if (Aa && !ra) {
                        P += "\x3cul\x3e";
                        wa = aa[oa].maxResults || this.maxResults;
                        for (ra = 0; ra < Aa && ra < wa; ++ra)
                          if (L[oa][ra] !== e) {
                            var la = this._getResultName(L[oa][ra]);
                            P +=
                              '\x3cli\x3e\x3ca tabindex\x3d"0" data-index\x3d"' +
                              ra +
                              '" data-source-index\x3d"' +
                              oa +
                              '" href\x3d"#"\x3e' +
                              la +
                              "\x3c/a\x3e\x3c/li\x3e";
                            ja++;
                          }
                        P += "\x3c/ul\x3e";
                      }
                    }
                  }
                P += "\x3c/div\x3e\x3c/div\x3e";
              }
              ja && (D += P);
              return D;
            },
            _validField: function (e, D) {
              return e.getField(D);
            },
            _validFields: function (e, D) {
              if (e && D && D.length) {
                for (var P = 0; P < D.length; P++)
                  if (!this._validField(e, D[P])) return !1;
                return !0;
              }
              return !1;
            },
            _getCodedName: function (e, D) {
              if (e && e.length)
                for (var P = 0, L = e.length; P < L; P++) {
                  var aa = e[P];
                  if (aa.code === D) return aa.name;
                }
            },
            _getCodedValue: function (e, D, P) {
              if (e && e.length)
                for (var L = 0, aa = e.length; L < aa; L++) {
                  var ja = e[L],
                    oa = ja.name,
                    Aa = D;
                  P || ((oa = oa.toLowerCase()), (Aa = Aa.toLowerCase()));
                  if (oa === Aa) return ja.code;
                }
              return !1;
            },
            _whereClause: function (e, D, P, L, aa) {
              var ja = null;
              if (e) {
                var oa = "",
                  Aa = this.reHostedFS.test(D.url);
                Aa && this._containsNonLatinCharacter(e) && (oa = "N");
                if (P && P.length)
                  for (var ra = 0, wa = P.length; ra < wa; ra++) {
                    var la = "";
                    la = e.replace(/'/g, "''");
                    var ua = P[ra],
                      Ia = D.getField(ua),
                      Ka = D.getDomain(ua);
                    Ka &&
                      "codedValue" === Ka.type &&
                      (la = this._getCodedValue(Ka.codedValues, la, L));
                    !1 !== la &&
                      ((Ia = Ia.type),
                      "esriFieldTypeString" === Ia || "esriFieldTypeDate" === Ia
                        ? L && "search" === aa
                          ? (la = ua + " \x3d " + oa + "'" + la + "'")
                          : ((ua = Aa ? ua : "UPPER(" + ua + ")"),
                            (la = Aa ? la : la.toUpperCase()),
                            (la =
                              ua +
                              " LIKE " +
                              oa +
                              "'" +
                              (L ? la + "%" : "%" + la + "%") +
                              "'"))
                        : "esriFieldTypeOID" === Ia ||
                          "esriFieldTypeSmallInteger" === Ia ||
                          "esriFieldTypeInteger" === Ia ||
                          "esriFieldTypeSingle" === Ia ||
                          "esriFieldTypeDouble" === Ia
                        ? ((la = parseFloat(la)),
                          (la = isNaN(la) ? !1 : ua + " \x3d " + la))
                        : (la = ua + " \x3d " + la),
                      la && ((ja = ja ? ja + " or " : ""), (ja += la)));
                  }
              }
              return ja;
            },
            _suggest: function (e) {
              e || (e = { index: this.activeSourceIndex, text: this.value });
              var D = new O(),
                P = e.index,
                L = this.sources[P],
                aa = this.enableSuggestions;
              L.hasOwnProperty("enableSuggestions") &&
                (aa = L.enableSuggestions);
              var ja = 0;
              if (e.hasOwnProperty("text") && e.text) {
                var oa = k.trim(e.text);
                ja = e.text.length;
              }
              e = L.minCharacters || this.minCharacters;
              if (aa && oa && ja >= e && this._supportsPagination(L)) {
                var Aa = "";
                L.prefix && (Aa += L.prefix);
                Aa += oa;
                L.suffix && (Aa += L.suffix);
                var ra = this._defaultSR;
                this.map && (ra = this.map.spatialReference);
                aa = {};
                L.locator
                  ? (L.categories && (aa.categories = L.categories),
                    (L.locator.outSpatialReference = ra),
                    this.map &&
                      L.localSearchOptions &&
                      L.localSearchOptions.hasOwnProperty("distance") &&
                      L.localSearchOptions.hasOwnProperty("minScale") &&
                      ((ja = this._getScale()),
                      !L.localSearchOptions.minScale ||
                        (ja &&
                          ja <= parseFloat(L.localSearchOptions.minScale))) &&
                      ((aa.location = this.map.extent.getCenter()),
                      (aa.distance = L.localSearchOptions.distance)),
                    (aa.text = Aa),
                    L.useMapExtent &&
                      this.map &&
                      this.map.extent &&
                      (aa.searchExtent = this.map.extent),
                    L.searchExtent && (aa.searchExtent = L.searchExtent),
                    (aa.maxSuggestions =
                      L.maxSuggestions || this.maxSuggestions),
                    L.sourceCountry && (aa.countryCode = L.sourceCountry),
                    L.countryCode && (aa.countryCode = L.countryCode),
                    L.locator.suggestLocations(aa).then(
                      k.hitch(this, function (wa) {
                        D.resolve(wa);
                      }),
                      k.hitch(this, function (wa) {
                        wa ||
                          (wa = this._error(
                            "Locator suggestLocations could not be performed."
                          ));
                        D.reject(wa);
                      })
                    ))
                  : L.featureLayer
                  ? this._featureLayerLoaded(L.featureLayer).then(
                      k.hitch(this, function () {
                        var wa = this._getDisplayField(L),
                          la = L.searchFields || [wa],
                          ua = [];
                        L.suggestionTemplate
                          ? L.suggestionTemplate.replace(
                              /(?:\$\{([^}]+)\})/g,
                              function (Pa, Sa) {
                                ua.push(Sa);
                              }
                            )
                          : (ua = [wa]);
                        -1 === Z.indexOf(ua, L.featureLayer.objectIdField) &&
                          ua.push(L.featureLayer.objectIdField);
                        wa = this._validField(L.featureLayer, wa);
                        var Ia = this._validFields(L.featureLayer, ua),
                          Ka = this._validFields(L.featureLayer, la);
                        if (wa && Ia && Ka) {
                          wa = new pa();
                          L.hasOwnProperty("suggestQueryParams") &&
                            k.mixin(wa, L.suggestQueryParams);
                          wa.outSpatialReference = ra;
                          wa.returnGeometry = !1;
                          wa.num = L.maxSuggestions || this.maxSuggestions;
                          wa.outFields = ua;
                          L.useMapExtent &&
                            this.map &&
                            this.map.extent &&
                            (wa.geometry = this.map.extent);
                          L.searchExtent && (wa.geometry = L.searchExtent);
                          if (
                            (la = this._whereClause(
                              Aa,
                              L.featureLayer,
                              la,
                              L.exactMatch,
                              "suggest"
                            ))
                          ) {
                            wa.where = la;
                            var Ba = !0;
                          }
                          Ba
                            ? L.featureLayer.queryFeatures(
                                wa,
                                k.hitch(this, function (Pa) {
                                  var Sa;
                                  (Pa = Pa.features) &&
                                    (Sa = this._hydrateResults(Pa, P, !0));
                                  D.resolve(Sa);
                                }),
                                k.hitch(this, function (Pa) {
                                  Pa ||
                                    (Pa = this._error(
                                      "FeatureLayer queryFeatures errored with suggestions"
                                    ));
                                  D.reject(Pa);
                                })
                              )
                            : D.resolve();
                        } else D.reject(this._error("Invalid FeatureLayer field"));
                      })
                    )
                  : D.reject(this._error("Invalid source"));
              } else D.resolve();
              return D.promise;
            },
            _supportsPagination: function (e) {
              var D;
              e.locator
                ? (D = !0)
                : e.featureLayer &&
                  e.featureLayer.advancedQueryCapabilities &&
                  e.featureLayer.advancedQueryCapabilities.supportsPagination &&
                  (D = !0);
              return D;
            },
            _suggestQueries: function (e) {
              var D = this.sources,
                P = this.activeSourceIndex,
                L = [];
              if (P === this._allIndex)
                for (P = 0; P < D.length; P++) {
                  var aa = e;
                  aa.index = P;
                  aa = this._suggest(aa);
                  L.push(aa);
                }
              else (e.index = P), (aa = this._suggest(e)), L.push(aa);
              return X(L);
            },
            _getPointFromGeometry: function (e) {
              switch (e.type) {
                case "extent":
                  var D = e.getCenter();
                  break;
                case "multipoint":
                  D = e.getPoint(0);
                  break;
                case "point":
                  D = e;
                  break;
                case "polygon":
                  D = e.getCentroid();
                  break;
                case "polyline":
                  D = e.getPoint(0, 0);
              }
              return D;
            },
            _searchQueries: function (e) {
              e.hasOwnProperty("index") || (e.index = this.activeSourceIndex);
              var D = [];
              if (e.index === this._allIndex)
                for (var P = this.sources, L = 0; L < P.length; L++) {
                  var aa = e;
                  aa.index = L;
                  aa = this._search(aa);
                  D.push(aa);
                }
              else (e = this._search(e)), D.push(e);
              return X(D);
            },
            _searchButton: function () {
              this.enableButtonMode && !this.expanded
                ? (this.expand(), M.focus(this.inputNode))
                : (this._cancelSuggest(), this.search());
            },
            _search: function (e) {
              e ||
                (e = {
                  text: this.value,
                  magicKey: null,
                  geometry: null,
                  point: null,
                  index: this.activeSourceIndex,
                  latlon: null,
                });
              this.selectedFeatureId &&
                ((e.text = null),
                (e[this._objectIdIdentifier] = this.selectedFeatureId));
              var D,
                P = new O(),
                L = e.index,
                aa = this.sources[L],
                ja;
              e.hasOwnProperty("text") && e.text && (ja = k.trim(e.text));
              if (aa) {
                var oa = "";
                aa.prefix && !e.magicKey && (oa += aa.prefix);
                oa += ja;
                aa.suffix && !e.magicKey && (oa += aa.suffix);
                var Aa = this._defaultSR;
                this.map && (Aa = this.map.spatialReference);
                if (aa.locator)
                  if (e.hasOwnProperty("text") && ja) {
                    var ra = {};
                    aa.categories && (ra.categories = aa.categories);
                    aa.locationType && (ra.locationType = aa.locationType);
                    Aa && (aa.locator.outSpatialReference = Aa);
                    if (
                      this.map &&
                      aa.localSearchOptions &&
                      aa.localSearchOptions.hasOwnProperty("distance") &&
                      aa.localSearchOptions.hasOwnProperty("minScale")
                    ) {
                      var wa = this._getScale();
                      if (
                        !aa.localSearchOptions.minScale ||
                        (wa && wa <= parseFloat(aa.localSearchOptions.minScale))
                      )
                        (ra.location = this.map.extent.getCenter()),
                          (ra.distance = aa.localSearchOptions.distance);
                    }
                    ra.address = {};
                    ra.maxLocations = aa.maxResults || this.maxResults;
                    aa.useMapExtent &&
                      this.map &&
                      this.map.extent &&
                      (ra.searchExtent = this.map.extent);
                    aa.searchExtent && (ra.searchExtent = aa.searchExtent);
                    aa.sourceCountry && (ra.countryCode = aa.sourceCountry);
                    aa.countryCode && (ra.countryCode = aa.countryCode);
                    e.magicKey && (ra.magicKey = e.magicKey);
                    aa.singleLineFieldName
                      ? (ra.address[aa.singleLineFieldName] = oa)
                      : (ra.address["Single Line Input"] = oa);
                    aa.outFields && (ra.outFields = aa.outFields);
                    aa.locator.addressToLocations(ra).then(
                      k.hitch(this, function (la) {
                        la = this._hydrateResults(la, L, !1);
                        P.resolve(la);
                      }),
                      k.hitch(this, function (la) {
                        la ||
                          (la = this._error(
                            "Locator addressToLocations could not be performed"
                          ));
                        P.reject(la);
                      })
                    );
                  } else
                    e.geometry
                      ? (D = this._getPointFromGeometry(e.geometry.geometry))
                        ? this._reverseGeocodePoint(L, D).then(
                            function (la) {
                              P.resolve(la);
                            },
                            function (la) {
                              P.reject(la);
                            }
                          )
                        : P.reject(
                            this._error("Invalid point to reverse geocode")
                          )
                      : e.point
                      ? this._reverseGeocodePoint(L, e.point).then(
                          function (la) {
                            P.resolve(la);
                          },
                          function (la) {
                            P.reject(la);
                          }
                        )
                      : e.latlon
                      ? ((ra = new V(e.latlon, this._defaultSR)),
                        this._reverseGeocodePoint(L, ra).then(
                          function (la) {
                            P.resolve(la);
                          },
                          function (la) {
                            P.reject(la);
                          }
                        ))
                      : e.hasOwnProperty("text") && !ja
                      ? P.resolve([])
                      : P.reject(this._error("Invalid query type for Locator"));
                else
                  aa.featureLayer
                    ? this._featureLayerLoaded(aa.featureLayer).then(
                        k.hitch(this, function () {
                          var la = this._getDisplayField(aa),
                            ua = aa.searchFields || [la];
                          la = this._validField(aa.featureLayer, la);
                          var Ia = this._validFields(aa.featureLayer, ua);
                          if (la && Ia) {
                            la = new pa();
                            aa.hasOwnProperty("searchQueryParams") &&
                              k.mixin(la, aa.searchQueryParams);
                            Aa &&
                              ((la.outSpatialReference = Aa),
                              (Ia =
                                (this.map && this.map.getMaxResolution()) ||
                                1 / ka.getUnitValueForSR(Aa))) &&
                              (la.maxAllowableOffset = Ia);
                            la.returnGeometry = !0;
                            aa.outFields && (la.outFields = aa.outFields);
                            if (!e.hasOwnProperty(this._objectIdIdentifier)) {
                              this._supportsPagination(aa) &&
                                (la.num = aa.maxResults || this.maxResults);
                              aa.useMapExtent &&
                                this.map &&
                                this.map.extent &&
                                (la.geometry = this.map.extent);
                              aa.searchExtent &&
                                (la.geometry = aa.searchExtent);
                              var Ka = aa.exactMatch;
                            }
                            e.hasOwnProperty("text") && ja
                              ? (ua = this._whereClause(
                                  oa,
                                  aa.featureLayer,
                                  ua,
                                  Ka,
                                  "search"
                                ))
                                ? ((la.where = ua), (ua = !0))
                                : (ua = !1)
                              : e.hasOwnProperty(this._objectIdIdentifier)
                              ? ((la.objectIds = [e[this._objectIdIdentifier]]),
                                (ua = !0))
                              : e.geometry
                              ? ((la.geometry = e.geometry), (ua = !0))
                              : e.point
                              ? ((la.geometry = e.point), (ua = !0))
                              : e.latlon
                              ? ((D = new V(e.latlon, this._defaultSR)),
                                (la.geometry = D),
                                (ua = !0))
                              : (e.hasOwnProperty("text") && !ja
                                  ? P.resolve([])
                                  : P.reject(
                                      this._error(
                                        "Invalid query type for FeatureLayer"
                                      )
                                    ),
                                (ua = !1));
                            ua
                              ? aa.featureLayer.queryFeatures(
                                  la,
                                  k.hitch(this, function (Ba) {
                                    Ba = Ba.features;
                                    var Pa;
                                    Ba &&
                                      (Pa = this._hydrateResults(Ba, L, !1));
                                    P.resolve(Pa);
                                  }),
                                  k.hitch(this, function (Ba) {
                                    Ba ||
                                      (Ba = this._error(
                                        "FeatureLayer queryFeatures could not be performed"
                                      ));
                                    P.reject(Ba);
                                  })
                                )
                              : P.resolve();
                          } else P.reject(this._error("Invalid FeatureLayer field"));
                        })
                      )
                    : P.reject(this._error("Invalid source"));
              } else P.reject(this._error("Source is undefined"));
              return P.promise;
            },
            _clearQueryTimeout: function () {
              this._queryTimer && clearTimeout(this._queryTimer);
            },
            _formatResults: function (e, D, P) {
              P = {
                activeSourceIndex: D,
                value: P,
                numResults: 0,
                numErrors: 0,
                errors: null,
                results: null,
              };
              var L = {},
                aa = {};
              if (e)
                if (D === this._allIndex)
                  for (D = 0; D < e.length; D++)
                    e[D] &&
                      (e[D] instanceof Error
                        ? ((L[D] = e[D]), P.numErrors++)
                        : ((aa[D] = e[D]), (P.numResults += e[D].length)));
                else
                  e[0] &&
                    (e[0] instanceof Error
                      ? ((L[D] = e[0]), P.numErrors++)
                      : ((aa[D] = e[0]), (P.numResults += e[0].length)));
              P.numErrors && (P.errors = L);
              P.numResults && (P.results = aa);
              return P;
            },
            _reverseGeocodePoint: function (e, D) {
              var P = new O(),
                L = this.sources[e];
              if (D && L) {
                var aa =
                  L.locationToAddressDistance || this.locationToAddressDistance;
                L.locator.outSpatialReference = this._defaultSR;
                this.map &&
                  (L.locator.outSpatialReference = this.map.spatialReference);
                L.locator.locationToAddress(
                  D,
                  aa,
                  k.hitch(this, function (ja) {
                    ja = this._hydrateResults([ja], e, !1);
                    P.resolve(ja);
                  }),
                  k.hitch(this, function (ja) {
                    ja ||
                      (ja = this._error(
                        "Locator locationToAddress could not be performed"
                      ));
                    P.reject(ja);
                  })
                );
              } else
                P.reject(
                  this._error(
                    "No point or source defined for reverse geocoding"
                  )
                );
              return P.promise;
            },
            _cancelDeferreds: function () {
              if (this._deferreds && this._deferreds.length)
                for (var e = 0; e < this._deferreds.length; e++)
                  this._deferreds[e].cancel(
                    this.declaredClass + " cancelling request"
                  );
              this._deferreds = [];
            },
            _sourceBtnKey: function (e) {
              if (e) {
                var D = A("li", this.sourcesNode);
                e.keyCode === I.UP_ARROW
                  ? (e.stopPropagation(),
                    e.preventDefault(),
                    this._showSourcesMenu(),
                    (e = D.length) && M.focus(D[e - 1]))
                  : e.keyCode === I.DOWN_ARROW &&
                    (e.stopPropagation(),
                    e.preventDefault(),
                    this._showSourcesMenu(),
                    D[0] && M.focus(D[0]));
              }
            },
            _inputKey: function (e) {
              if (e) {
                var D = A("li", this.suggestionsNode),
                  P = this.suggestResults;
                if (e.keyCode === I.TAB || e.keyCode === I.ESCAPE)
                  this._cancelSuggest(), this._hideMenus();
                else if (e.keyCode === I.UP_ARROW)
                  e.stopPropagation(),
                    e.preventDefault(),
                    this._cancelSuggest(),
                    P && this._showSuggestionsMenu(),
                    (e = D.length) && M.focus(D[e - 1]);
                else if (e.keyCode === I.DOWN_ARROW)
                  e.stopPropagation(),
                    e.preventDefault(),
                    this._cancelSuggest(),
                    P && this._showSuggestionsMenu(),
                    D[0] && M.focus(D[0]);
                else {
                  if (
                    e.ctrlKey ||
                    e.metaKey ||
                    e.keyCode === I.copyKey ||
                    e.keyCode === I.LEFT_ARROW ||
                    e.keyCode === I.RIGHT_ARROW ||
                    e.keyCode === I.ENTER
                  )
                    return e;
                  this._suggestDelay();
                }
              }
            },
            _cancelSuggest: function () {
              this._cancelDeferreds();
              this._clearQueryTimeout();
            },
            _suggestDelay: function () {
              this._cancelSuggest();
              this._changeValue();
              this._queryTimer = setTimeout(
                k.hitch(this, function () {
                  this.suggest();
                }),
                this.suggestionDelay
              );
            },
            _changeValue: function () {
              this.set("magicKey", null);
              this.set("selectedFeatureId", null);
              this._changeAttrValue("value", this.inputNode.value);
              this._checkStatus();
            },
            _inputClick: function () {
              this._hideSourcesMenu();
              this._hideNoResultsMenu();
            },
            _getSourceName: function (e) {
              return this._sourceNames[e];
            },
            _loadSources: function (e) {
              e = Z.filter(e, function (D) {
                return !!D.featureLayer;
              });
              e = Z.map(
                e,
                function (D) {
                  return this._featureLayerLoaded(D.featureLayer);
                },
                this
              );
              return X(e);
            },
            _createSourceNameMap: function (e) {
              return this._loadSources(e).then(
                k.hitch(this, function () {
                  var D = Z.map(e, function (P) {
                    return (
                      P.name ||
                      (P.featureLayer && P.featureLayer.name) ||
                      l.widgets.Search.main.untitledSource
                    );
                  });
                  this._preventDuplicateSourceNames(e, D);
                  return D;
                })
              );
            },
            _getDuplicateSourceNameIndexes: function (e) {
              var D = {},
                P = [];
              Z.forEach(e, function (L, aa) {
                D.hasOwnProperty(L)
                  ? (-1 === P.indexOf(D[L]) && P.push(D[L]), P.push(aa))
                  : e.lastIndexOf(L) !== aa && (D[L] = aa);
              });
              return P;
            },
            _preventDuplicateSourceNames: function (e, D) {
              if (D && 1 < D.length) {
                var P = this._getDuplicateSourceNameIndexes(D);
                Z.forEach(
                  P,
                  function (L) {
                    D[L] += this._getFieldsString(e[L]);
                  },
                  this
                );
              }
            },
            _getFieldsString: function (e) {
              var D = "",
                P = e.featureLayer;
              if (P) {
                e = e.searchFields || [this._getDisplayField(e)];
                for (var L = 0; L < e.length; L++) {
                  D = 0 === L ? D + ": " : D + ", ";
                  var aa = e[L],
                    ja = P.getFieldLabel(aa);
                  D += ja || aa;
                }
              }
              return D;
            },
            _splitResult: function (e, D) {
              D = z.escapeString(D);
              return e
                .replace(new RegExp("(^|)(" + D + ")(|$)", "ig"), "$1|$2|$3")
                .split("|");
            },
            _insertSuggestions: function (e, D) {
              if (this.enableSuggestionsMenu && this.suggestionsNode) {
                this._hideSourcesMenu();
                this._hideNoResultsMenu();
                var P = this.sources;
                if (e) {
                  var L = q.create("div");
                  for (var aa in e)
                    if (e[aa] && e[aa].length) {
                      var ja = this._getSourceName(aa);
                      1 < P.length &&
                        this.activeSourceIndex === this._allIndex &&
                        q.create(
                          "div",
                          {
                            className: this.css.searchMenuHeader,
                            textContent: ja,
                          },
                          L
                        );
                      ja = q.create("ul", { role: "menu" }, L);
                      for (
                        var oa = P[aa].maxSuggestions || this.maxSuggestions,
                          Aa = 0;
                        Aa < e[aa].length && Aa < oa;
                        ++Aa
                      ) {
                        var ra = q.create(
                            "li",
                            {
                              "data-index": Aa,
                              "data-source-index": aa,
                              role: "menuitem",
                              tabindex: 0,
                            },
                            ja
                          ),
                          wa = this._getSuggestionName(e[aa][Aa]);
                        wa = this._splitResult(wa, D);
                        for (var la = wa.length, ua = 0; ua < la; ua++) {
                          var Ia = wa[ua];
                          Ia.toLowerCase() === D.toLowerCase()
                            ? q.create("strong", { textContent: Ia }, ra)
                            : ((Ia = document.createTextNode(Ia)),
                              q.place(Ia, ra));
                        }
                      }
                    }
                }
                L
                  ? (q.place(L, this.suggestionsNode, "only"),
                    this._showSuggestionsMenu())
                  : (q.empty(this.suggestionsNode),
                    this._hideSuggestionsMenu());
              }
            },
            _insertSources: function (e) {
              if (this.enableSourcesMenu && e && 1 < e.length) {
                var D,
                  P = this.activeSourceIndex,
                  L = q.create("ul", { role: "menu" });
                if (this.enableSearchingAll) {
                  var aa = "";
                  P === this._allIndex && (aa = "active");
                  q.create(
                    "li",
                    {
                      "data-index": this._allIndex,
                      role: "menuitem",
                      className: aa,
                      tabIndex: 0,
                      textContent: l.widgets.Search.main.all,
                    },
                    L
                  );
                }
                for (D = 0; D < e.length; D++) {
                  aa = "";
                  D === P && (aa = this.css.activeSource);
                  var ja = this._getSourceName(D);
                  q.create(
                    "li",
                    {
                      "data-index": D,
                      role: "menuitem",
                      className: aa,
                      tabIndex: 0,
                      textContent: ja,
                    },
                    L
                  );
                }
                c.add(this.containerNode, this.css.hasMultipleSources);
                q.place(L, this.sourcesNode, "only");
              } else
                c.remove(this.containerNode, this.css.hasMultipleSources),
                  q.empty(this.sourcesNode);
            },
            _showLoading: function () {
              c.add(this.containerNode, this.css.searchLoading);
            },
            _hideLoading: function () {
              c.remove(this.containerNode, this.css.searchLoading);
            },
            _checkStatus: function () {
              this.value
                ? (c.add(this.containerNode, this.css.hasValue),
                  f.set(
                    this.clearNode,
                    "title",
                    l.widgets.Search.main.clearButtonTitle
                  ))
                : this.clear();
            },
            _closePopup: function () {
              this.enableInfoWindow &&
                this.map &&
                this.map.infoWindow &&
                this.map.infoWindow.hide();
            },
            _noResults: function (e) {
              var D;
              e && (D = k.trim(e));
              var P = q.create("div", {
                className: this.css.searchNoResultsBody,
              });
              e && D
                ? (q.create(
                    "div",
                    {
                      className: this.css.searchNoResultsHeader,
                      textContent: l.widgets.Search.main.noResults,
                    },
                    P
                  ),
                  q.create(
                    "div",
                    {
                      className: this.css.searchNoResultsText,
                      textContent: B.substitute(
                        { value: '"' + e + '"' },
                        l.widgets.Search.main.noResultsFound
                      ),
                    },
                    P
                  ))
                : ((e = q.create("div", {}, P)),
                  q.create(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: this.css.searchNoValueIcon,
                    },
                    e
                  ),
                  q.create(
                    "span",
                    {
                      className: this.css.searchNoValueText,
                      textContent: l.widgets.Search.main.emptyValue,
                    },
                    e
                  ));
              q.place(P, this.noResultsMenuNode, "only");
            },
            _hideMenus: function () {
              this._hideSourcesMenu();
              this._hideSuggestionsMenu();
              this._hideNoResultsMenu();
            },
            _hideNoResultsMenu: function () {
              c.remove(this.containerNode, this.css.showNoResults);
            },
            _showNoResultsMenu: function () {
              this._hideSourcesMenu();
              this._hideSuggestionsMenu();
              c.add(this.containerNode, this.css.showNoResults);
            },
            _hideSourcesMenu: function () {
              c.remove(this.containerNode, this.css.showSources);
            },
            _hideSuggestionsMenu: function () {
              c.remove(this.containerNode, this.css.showSuggestions);
            },
            _showSourcesMenu: function () {
              this._hideSuggestionsMenu();
              this._hideNoResultsMenu();
              c.add(this.containerNode, this.css.showSources);
            },
            _showSuggestionsMenu: function () {
              this._hideSourcesMenu();
              this._hideNoResultsMenu();
              c.add(this.containerNode, this.css.showSuggestions);
            },
            _toggleSourcesMenu: function () {
              this._hideSuggestionsMenu();
              this._hideNoResultsMenu();
              c.toggle(this.containerNode, this.css.showSources);
            },
            _getFirstStringField: function (e) {
              if (e && (e = e.fields) && e.length)
                for (var D = 0; D < e.length; D++) {
                  var P = e[D];
                  if ("esriFieldTypeString" === P.type) return P.name;
                }
              return "";
            },
            _getDisplayField: function (e) {
              return (
                e.displayField ||
                e.featureLayer.displayField ||
                this._getFirstStringField(e.featureLayer)
              );
            },
            _validLocation: function (e) {
              return e && "number" === typeof e.x && "number" === typeof e.y;
            },
            _validExtent: function (e) {
              return (
                e &&
                "number" === typeof e.xmin &&
                "number" === typeof e.ymin &&
                "number" === typeof e.xmax &&
                "number" === typeof e.ymax
              );
            },
            _hydrateResult: function (e, D, P) {
              var L = {},
                aa = this._defaultSR;
              D = this.sources[D];
              this.map && (aa = this.map.spatialReference);
              if (e.hasOwnProperty("text") && e.hasOwnProperty("magicKey"))
                return e;
              if (e.hasOwnProperty("geometry")) {
                var ja = new F(e.toJson());
                L.feature = ja;
                (ja = L.feature.geometry) && ja.setSpatialReference(aa);
              } else if (
                e.hasOwnProperty("location") &&
                this._validLocation(e.location)
              ) {
                var oa = new V(e.location.x, e.location.y, aa);
                ja = {};
                e.hasOwnProperty("attributes") && (ja = e.attributes);
                e.hasOwnProperty("address") &&
                  "object" === typeof e.address &&
                  k.mixin(ja, e.address);
                e.hasOwnProperty("score") && (ja.score = e.score);
                L.feature = new F(oa, null, ja, null);
              }
              !L.feature &&
                P &&
                ((ja = {}),
                e.hasOwnProperty("attributes") && (ja = e.attributes),
                e.hasOwnProperty("score") && (ja.score = e.score),
                (L.feature = new F(null, null, ja, null)));
              if (L.feature) {
                if (e.hasOwnProperty("extent") && this._validExtent(e.extent))
                  (L.extent = new ia(e.extent)),
                    L.extent.setSpatialReference(aa);
                else if (L.feature && L.feature.geometry)
                  switch (L.feature.geometry.type) {
                    case "extent":
                      L.extent = L.feature.geometry;
                      break;
                    case "multipoint":
                      L.extent = ea.getDenormalizedExtent(L.feature.geometry);
                      break;
                    case "polygon":
                      L.extent = ea.getDenormalizedExtent(L.feature.geometry);
                      break;
                    case "polyline":
                      L.extent = ea.getDenormalizedExtent(L.feature.geometry);
                      break;
                    case "point":
                      this.map
                        ? ((aa = this.zoomScale),
                          D && D.zoomScale && (aa = D.zoomScale),
                          this._getScale() > aa
                            ? (L.extent = ka
                                .getExtentForScale(this.map, aa)
                                .centerAt(L.feature.geometry))
                            : (L.extent = this.map.extent.centerAt(
                                L.feature.geometry
                              )))
                        : (L.extent = new ia({
                            xmin: L.feature.geometry.x - 0.25,
                            ymin: L.feature.geometry.y - 0.25,
                            xmax: L.feature.geometry.x + 0.25,
                            ymax: L.feature.geometry.y + 0.25,
                            spatialReference: this._defaultSR,
                          }));
                  }
                else L.extent = null;
                L.name = "";
                D.featureLayer
                  ? D.suggestionTemplate && P
                    ? (L.name = B.substitute(
                        e.attributes,
                        D.suggestionTemplate
                      ))
                    : D.searchTemplate
                    ? (L.name = B.substitute(e.attributes, D.searchTemplate))
                    : ((ja = this._getDisplayField(D)),
                      (P = D.featureLayer.getField(ja)),
                      (aa = D.featureLayer.getDomain(ja)),
                      ja &&
                        e.hasOwnProperty("attributes") &&
                        e.attributes.hasOwnProperty(ja) &&
                        ((e = e.attributes[ja]),
                        aa && "codedValue" === aa.type
                          ? (L.name = this._getCodedName(aa.codedValues, e))
                          : P && "esriFieldTypeDate" === P.type && !isNaN(e)
                          ? (L.name = t.format(new Date(e)))
                          : (L.name = e)))
                  : e.address && D.searchTemplate
                  ? (L.name = B.substitute(e.address, D.searchTemplate))
                  : e.hasOwnProperty("name")
                  ? (L.name = e.name)
                  : e.hasOwnProperty("attributes") &&
                    "object" === typeof e.attributes &&
                    e.attributes.LongLabel
                  ? (L.name = e.attributes.LongLabel)
                  : e.hasOwnProperty("attributes") &&
                    "object" === typeof e.attributes &&
                    e.attributes.Match_addr
                  ? ((L.name = e.attributes.Match_addr),
                    e.attributes.Addr_type &&
                    "POI" === e.attributes.Addr_type &&
                    e.attributes.StAddr &&
                    e.attributes.City
                      ? (L.name +=
                          " - " +
                          e.attributes.StAddr +
                          ", " +
                          e.attributes.City)
                      : e.attributes.Addr_type &&
                        "POI" === e.attributes.Addr_type &&
                        e.attributes.City &&
                        (L.name += " - " + e.attributes.City))
                  : e.hasOwnProperty("address") && "string" === typeof e.address
                  ? (L.name = e.address)
                  : e.hasOwnProperty("address") &&
                    "object" === typeof e.address &&
                    e.address.hasOwnProperty("Address")
                  ? e.address.hasOwnProperty("Match_addr")
                    ? (L.name = e.address.Match_addr)
                    : e.address.hasOwnProperty("Address") &&
                      (L.name = e.address.Address)
                  : L.feature &&
                    L.feature.geometry &&
                    (L.name =
                      L.feature.geometry.x + "," + L.feature.geometry.y);
                D.featureLayer && L.feature && Ea(L.feature, D.featureLayer);
                return L;
              }
            },
            _getScale: function () {
              var e;
              this.map &&
                "function" === typeof this.map.getScale &&
                (e = this.map.getScale());
              return e;
            },
            _hydrateResults: function (e, D, P, L) {
              L = [];
              var aa = 0;
              if (e && e.length)
                for (aa; aa < e.length; aa++) {
                  var ja = this._hydrateResult(e[aa], D, P);
                  ja && L.push(ja);
                }
              return L;
            },
            _containsNonLatinCharacter: function (e) {
              for (var D = 0; D < e.length; D++)
                if (255 < e.charCodeAt(D)) return !0;
              return !1;
            },
            _setPlaceholder: function (e) {
              var D = "",
                P = this.sources[e];
              e === this._allIndex
                ? (D =
                    this.allPlaceholder || l.widgets.Search.main.allPlaceholder)
                : P && P.placeholder && (D = P.placeholder);
              var L = l.widgets.Search.main.all;
              P && (L = this._getSourceName(e));
              f.set(this.sourceNameNode, "textContent", L);
              f.set(this.inputNode, "placeholder", D);
              f.set(this.inputNode, "title", D);
            },
            _updateActiveSource: function () {
              var e = this.sources,
                D = this.activeSourceIndex,
                P;
              e && e[D] && (P = e[D]);
              P ? this.set("activeSource", P) : this.set("activeSource", null);
            },
            _updateVisible: function () {
              this.visible ? this.show() : this.hide();
            },
            _updateButtonMode: function (e) {
              e
                ? (c.toggle(
                    this.containerNode,
                    this.css.searchExpanded,
                    this.expanded
                  ),
                  c.toggle(
                    this.containerNode,
                    this.css.searchCollapsed,
                    !this.expanded
                  ),
                  c.add(this.containerNode, this.css.hasButtonMode))
                : (c.remove(this.containerNode, this.css.searchExpanded),
                  c.remove(this.containerNode, this.css.searchCollapsed),
                  c.remove(this.containerNode, this.css.hasButtonMode));
            },
            _setDefaultActiveSourceIndex: function (e) {
              (e && 1 === e.length) || !this.enableSearchingAll
                ? this.set("activeSourceIndex", 0)
                : this.set("activeSourceIndex", this._allIndex);
            },
            _setEnableSourcesMenuAttr: function (e) {
              this._set("enableSourcesMenu", e);
              this._created && this._insertSources(this.sources);
            },
            _setEnableSearchingAllAttr: function (e) {
              this._set("enableSearchingAll", e);
              this._created &&
                (this._setDefaultActiveSourceIndex(this.sources),
                this._hideMenus(),
                this._insertSources(this.sources));
            },
            _setSourcesAttr: function (e) {
              this._createSourceNameMap(e).then(
                k.hitch(this, function (D) {
                  this._sourceNames = D;
                  this._created &&
                    (this._setDefaultActiveSourceIndex(e),
                    this._hideMenus(),
                    this._insertSources(e));
                })
              );
              this._set("sources", e);
            },
            _setAllPlaceholderAttr: function (e) {
              this._set("allPlaceholder", e);
              this._created && this._setPlaceholder(this.activeSourceIndex);
            },
            _setActiveSourceIndexAttr: function (e) {
              this._set("activeSourceIndex", e);
              this._updateActiveSource();
              this._created &&
                (this._setPlaceholder(e),
                this._hideMenus(),
                this._insertSources(this.sources));
            },
            _setMaxLengthAttr: function (e) {
              this._set("maxLength", e);
              this._created && f.set(this.inputNode, "maxLength", e);
            },
            _setValueAttr: function (e) {
              this.set("magicKey", null);
              this.set("selectedFeatureId", null);
              this._set("value", e);
              this._created &&
                (f.set(this.inputNode, "value", e), this._checkStatus());
            },
            _setVisibleAttr: function (e) {
              this._set("visible", e);
              this._created && this._updateVisible();
            },
            _setEnableButtonModeAttr: function (e) {
              this._set("enableButtonMode", e);
              this._created && this._updateButtonMode(e);
            },
            _setThemeAttr: function (e) {
              this._created &&
                (c.remove(this.domNode, this.theme), c.add(this.domNode, e));
              this._set("theme", e);
            },
          });
          m("extend-esri") && k.setObject("dijit.Search", R, ca);
          return R;
        }
      );
    },
    "esri/tasks/locator": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/_base/json dojo/has ../kernel ../request ../deferredUtils ./Task ./AddressCandidate".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z) {
          C = C(m, {
            declaredClass: "esri.tasks.Locator",
            _eventMap: {
              "address-to-locations-complete": ["addresses"],
              "addresses-to-locations-complete": ["addresses"],
              "location-to-address-complete": ["address"],
              "suggest-locations-complete": ["suggestions"],
            },
            constructor: function (g) {
              this._geocodeHandler = R.hitch(this, this._geocodeHandler);
              this._geocodeAddressesHandler = R.hitch(
                this,
                this._geocodeAddressesHandler
              );
              this._reverseGeocodeHandler = R.hitch(
                this,
                this._reverseGeocodeHandler
              );
              this.registerConnectEvents();
            },
            outSpatialReference: null,
            setOutSpatialReference: function (g) {
              this.outSpatialReference = g;
            },
            _geocodeHandler: function (g, f, c, d, q) {
              try {
                var t = g.candidates;
                f = [];
                var l,
                  y = t.length,
                  J = g.spatialReference,
                  H;
                for (l = 0; l < y; l++) {
                  var T = t[l];
                  if ((H = T.location)) H.spatialReference = J;
                  f[l] = new z(T);
                }
                this._successHandler([f], "onAddressToLocationsComplete", c, q);
              } catch (Q) {
                this._errorHandler(Q, d, q);
              }
            },
            _geocodeAddressesHandler: function (g, f, c, d, q) {
              try {
                var t = g.locations;
                f = [];
                var l,
                  y = t.length,
                  J = g.spatialReference,
                  H;
                for (l = 0; l < y; l++) {
                  if ((H = t[l].location)) H.spatialReference = J;
                  f[l] = new z(t[l]);
                }
                this._successHandler(
                  [f],
                  "onAddressesToLocationsComplete",
                  c,
                  q
                );
              } catch (T) {
                this._errorHandler(T, d, q);
              }
            },
            addressToLocations: function (g, f, c, d, q) {
              var t;
              if (g.address) {
                d = c;
                c = f;
                f = g.outFields;
                q = g.searchExtent;
                var l = g.countryCode;
                var y = g.magicKey;
                var J = g.distance;
                var H = g.categories;
                g.location &&
                  this.normalization &&
                  (t = g.location.normalize());
                var T = g.locationType;
                var Q = g.maxLocations;
                var M = g.forStorage;
                g = g.address;
              }
              q && (q = q.shiftCentralMeridian());
              var B = this.outSpatialReference;
              g = this._encode(
                R.mixin({}, this._url.query, g, {
                  f: "json",
                  outSR: B && U.toJson(B.toJson()),
                  outFields: (f && f.join(",")) || null,
                  searchExtent: q && U.toJson(q.toJson()),
                  category: (H && H.join(",")) || null,
                  countryCode: l || null,
                  magicKey: y || null,
                  distance: J || null,
                  location: t || null,
                  locationType: T || null,
                  maxLocations: Q || null,
                  forStorage: M || null,
                })
              );
              var G = this._geocodeHandler,
                ca = this._errorHandler,
                N = new Z(A._dfdCanceller);
              N._pendingDfd = E({
                url: this._url.path + "/findAddressCandidates",
                content: g,
                callbackParamName: "callback",
                load: function (F, X) {
                  G(F, X, c, d, N);
                },
                error: function (F) {
                  ca(F, d, N);
                },
              });
              return N;
            },
            suggestLocations: function (g) {
              var f = new Z(A._dfdCanceller);
              g.hasOwnProperty("location") &&
                this.normalization &&
                (g.location = g.location.normalize());
              g.searchExtent &&
                (g.searchExtent = g.searchExtent.shiftCentralMeridian());
              g = this._encode(
                R.mixin(
                  {},
                  this._url.query,
                  {
                    f: "json",
                    text: g.text,
                    maxSuggestions: g.maxSuggestions,
                    searchExtent:
                      g.searchExtent && U.toJson(g.searchExtent.toJson()),
                    category: (g.categories && g.categories.join(",")) || null,
                    countryCode: g.countryCode || null,
                    location: g.location || null,
                    distance: g.distance || null,
                  },
                  { f: "json" }
                )
              );
              g = E({
                url: this._url.path + "/suggest",
                content: g,
                callbackParamName: "callback",
              });
              f._pendingDfd = g;
              g.then(
                R.hitch(this, function (c) {
                  c = c.suggestions || [];
                  this.onSuggestLocationsComplete(c);
                  f.resolve(c);
                }),
                R.hitch(this, function (c) {
                  this._errorHandler(c);
                  f.reject(c);
                })
              );
              return f;
            },
            addressesToLocations: function (g, f, c) {
              var d = this.outSpatialReference,
                q = [],
                t = g.categories,
                l = g.locationType,
                y = g.countryCode;
              k.forEach(g.addresses, function (Q, M) {
                q.push({ attributes: Q });
              });
              g = this._encode(
                R.mixin(
                  {},
                  this._url.query,
                  {
                    category: (t && t.join(",")) || null,
                    locationType: l || null,
                    sourceCountry: y || null,
                  },
                  { addresses: U.toJson({ records: q }) },
                  { f: "json", outSR: d && U.toJson(d.toJson()) }
                )
              );
              var J = this._geocodeAddressesHandler,
                H = this._errorHandler,
                T = new Z(A._dfdCanceller);
              T._pendingDfd = E({
                url: this._url.path + "/geocodeAddresses",
                content: g,
                callbackParamName: "callback",
                load: function (Q, M) {
                  J(Q, M, f, c, T);
                },
                error: function (Q) {
                  H(Q, c, T);
                },
              });
              return T;
            },
            _reverseGeocodeHandler: function (g, f, c, d, q) {
              try {
                var t = new z({
                  address: g.address,
                  location: g.location,
                  score: 100,
                });
                this._successHandler([t], "onLocationToAddressComplete", c, q);
              } catch (l) {
                this._errorHandler(l, d, q);
              }
            },
            locationToAddress: function (g, f, c, d) {
              g && this.normalization && (g = g.normalize());
              var q = this.outSpatialReference;
              g = this._encode(
                R.mixin({}, this._url.query, {
                  outSR: q && U.toJson(q.toJson()),
                  location: g && U.toJson(g.toJson()),
                  distance: f,
                  f: "json",
                })
              );
              var t = this._reverseGeocodeHandler,
                l = this._errorHandler,
                y = new Z(A._dfdCanceller);
              y._pendingDfd = E({
                url: this._url.path + "/reverseGeocode",
                content: g,
                callbackParamName: "callback",
                load: function (J, H) {
                  t(J, H, c, d, y);
                },
                error: function (J) {
                  l(J, d, y);
                },
              });
              return y;
            },
            onSuggestLocationsComplete: function () {},
            onAddressToLocationsComplete: function () {},
            onAddressesToLocationsComplete: function () {},
            onLocationToAddressComplete: function () {},
          });
          O("extend-esri") && R.setObject("tasks.Locator", C, I);
          return C;
        }
      );
    },
    "esri/tasks/AddressCandidate": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
        "../geometry/Point",
      ], function (C, R, k, Z, U) {
        C = C(null, {
          declaredClass: "esri.tasks.AddressCandidate",
          constructor: function (O) {
            R.mixin(this, O);
            this.location = new U(this.location);
          },
        });
        k("extend-esri") && R.setObject("tasks.AddressCandidate", C, Z);
        return C;
      });
    },
    "esri/styles/basic": function () {
      define([
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
        "../Color",
      ], function (C, R, k, Z, U) {
        function O(z, g) {
          if (z) {
            var f = {};
            f.color = new U(z.color);
            f.opacity = z.opacity || 1;
            switch (g) {
              case "point":
                f.outline = {
                  color: new U(z.outline.color),
                  width: z.outline.width,
                };
                f.size = z.size;
                break;
              case "line":
                f.width = z.width;
                break;
              case "polygon":
                f.outline = {
                  color: new U(z.outline.color),
                  width: z.outline.width,
                };
            }
          }
          return f;
        }
        function I(z) {
          if ("esriGeometryPoint" === z || "esriGeometryMultipoint" === z)
            z = "point";
          else if ("esriGeometryPolyline" === z) z = "line";
          else if (
            "esriGeometryPolygon" === z ||
            "esriGeometryMultiPatch" === z
          )
            z = "polygon";
          return z;
        }
        var E = {
            default: {
              name: "default",
              label: "Default",
              description: "Default theme for basic visualization of features.",
              basemapGroups: {
                light:
                  "streets gray topo terrain national-geographic oceans osm gray-vector streets-vector topo-vector streets-relief-vector streets-navigation-vector".split(
                    " "
                  ),
                dark: [
                  "satellite",
                  "hybrid",
                  "dark-gray",
                  "dark-gray-vector",
                  "streets-night-vector",
                ],
              },
              pointSchemes: {
                light: {
                  primary: {
                    color: [77, 77, 77, 1],
                    outline: { color: [255, 255, 255, 0.25], width: 1 },
                    size: 8,
                  },
                  secondary: [
                    {
                      color: [226, 119, 40, 1],
                      outline: { color: [255, 255, 255, 0.25], width: 1 },
                      size: 8,
                    },
                    {
                      color: [255, 255, 255, 1],
                      outline: { color: [51, 51, 51, 0.25], width: 1 },
                      size: 8,
                    },
                  ],
                },
                dark: {
                  primary: {
                    color: [255, 255, 255, 1],
                    outline: { color: [92, 92, 92, 0.25], width: 1 },
                    size: 8,
                  },
                  secondary: [
                    {
                      color: [226, 119, 40, 1],
                      outline: { color: [255, 255, 255, 0.25], width: 1 },
                      size: 8,
                    },
                    {
                      color: [26, 26, 26, 1],
                      outline: { color: [178, 178, 178, 0.25], width: 1 },
                      size: 8,
                    },
                  ],
                },
              },
              lineSchemes: {
                light: {
                  primary: { color: [77, 77, 77, 1], width: 2 },
                  secondary: [
                    { color: [226, 119, 40, 1], width: 2 },
                    { color: [255, 255, 255, 1], width: 2 },
                  ],
                },
                dark: {
                  primary: { color: [255, 255, 255, 1], width: 2 },
                  secondary: [
                    { color: [226, 119, 40, 1], width: 2 },
                    { color: [26, 26, 26, 1], width: 2 },
                  ],
                },
              },
              polygonSchemes: {
                light: {
                  primary: {
                    color: [227, 139, 79, 1],
                    outline: { color: [255, 255, 255, 0.25], width: 1 },
                    opacity: 0.8,
                  },
                  secondary: [
                    {
                      color: [128, 128, 128, 1],
                      outline: { color: [255, 255, 255, 0.25], width: 1 },
                      opacity: 0.8,
                    },
                    {
                      color: [255, 255, 255, 1],
                      outline: { color: [128, 128, 128, 0.25], width: 1 },
                      opacity: 0.8,
                    },
                  ],
                },
                dark: {
                  primary: {
                    color: [227, 139, 79, 1],
                    outline: { color: [92, 92, 92, 0.25], width: 1 },
                    opacity: 0.8,
                  },
                  secondary: [
                    {
                      color: [178, 178, 178, 1],
                      outline: { color: [92, 92, 92, 0.25], width: 1 },
                      opacity: 0.8,
                    },
                    {
                      color: [26, 26, 26, 1],
                      outline: { color: [128, 128, 128, 0.25], width: 1 },
                      opacity: 0.8,
                    },
                  ],
                },
              },
            },
          },
          A = {};
        (function () {
          var z, g, f;
          for (z in E) {
            var c = E[z];
            var d = c.basemapGroups;
            var q = (A[z] = {
              basemaps: [].concat(d.light).concat(d.dark),
              point: {},
              line: {},
              polygon: {},
            });
            for (g in d) {
              var t = d[g];
              for (f = 0; f < t.length; f++) {
                var l = t[f];
                c.pointSchemes && (q.point[l] = c.pointSchemes[g]);
                c.lineSchemes && (q.line[l] = c.lineSchemes[g]);
                c.polygonSchemes && (q.polygon[l] = c.polygonSchemes[g]);
              }
            }
          }
        })();
        var m = {
          getAvailableThemes: function (z) {
            var g = [],
              f;
            for (f in E) {
              var c = E[f];
              var d = A[f];
              (z && -1 === C.indexOf(d.basemaps, z)) ||
                g.push({
                  name: c.name,
                  label: c.label,
                  description: c.description,
                  basemaps: d.basemaps.slice(0),
                });
            }
            return g;
          },
          getSchemes: function (z) {
            var g = z.theme,
              f = z.basemap,
              c = I(z.geometryType);
            z = A[g];
            var d;
            (z = (z = z && z[c]) && z[f]) &&
              (d = {
                primaryScheme: O(z.primary, c),
                secondarySchemes: C.map(z.secondary, function (q) {
                  return O(q, c);
                }),
              });
            return d;
          },
          cloneScheme: function (z) {
            if (z) {
              var g = R.mixin({}, z);
              g.color && (g.color = new U(g.color));
              g.outline &&
                (g.outline = {
                  color: g.outline.color && new U(g.outline.color),
                  width: g.outline.width,
                });
            }
            return g;
          },
        };
        k("extend-esri") && R.setObject("styles.basic", m, Z);
        return m;
      });
    },
    "esri/tasks/RouteTask": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../graphic ../request ../geometry/normalizeUtils ./Task ./RouteResult ./NAMessage ./NAServiceDescription".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g) {
          C = C([A, g], {
            declaredClass: "esri.tasks.RouteTask",
            _eventMap: { "solve-complete": ["result"] },
            constructor: function (f) {
              this._url.orig = this._url.path;
              this._url.path += "/solve";
              this._handler = R.hitch(this, this._handler);
              this.registerConnectEvents();
            },
            __msigns: [
              {
                n: "solve",
                c: 3,
                a: [
                  {
                    i: 0,
                    p: [
                      "stops.features",
                      "barriers.features",
                      "polylineBarriers.features",
                      "polygonBarriers.features",
                    ],
                  },
                ],
                e: 2,
              },
            ],
            _handler: function (f, c, d, q, t) {
              try {
                var l = [],
                  y = [],
                  J = f.directions || [],
                  H = f.routes ? f.routes.features : [],
                  T = f.stops ? f.stops.features : [],
                  Q = f.barriers ? f.barriers.features : [],
                  M = f.polygonBarriers ? f.polygonBarriers.features : [],
                  B = f.polylineBarriers ? f.polylineBarriers.features : [],
                  G = f.messages,
                  ca = k.forEach,
                  N = k.indexOf,
                  F = !0,
                  X,
                  x,
                  da =
                    (f.routes && f.routes.spatialReference) ||
                    (f.stops && f.stops.spatialReference) ||
                    (f.barriers && f.barriers.spatialReference) ||
                    (f.polygonBarriers && f.polygonBarriers.spatialReference) ||
                    (f.polylineBarriers && f.polylineBarriers.spatialReference);
                this._chk = f.checksum;
                ca(J, function (n) {
                  l.push((X = n.routeName));
                  y[X] = { directions: n };
                });
                ca(H, function (n) {
                  -1 === N(l, (X = n.attributes.Name)) &&
                    (l.push(X), (y[X] = {}));
                  y[X].route = n;
                });
                ca(T, function (n) {
                  x = n.attributes;
                  -1 ===
                    N(
                      l,
                      (X =
                        x.RouteName || "esri.tasks.RouteTask.NULL_ROUTE_NAME")
                    ) && (l.push(X), (y[X] = {}));
                  "esri.tasks.RouteTask.NULL_ROUTE_NAME" !== X && (F = !1);
                  void 0 === y[X].stops && (y[X].stops = []);
                  y[X].stops.push(n);
                });
                0 < T.length &&
                  !0 === F &&
                  ((y[l[0]].stops =
                    y["esri.tasks.RouteTask.NULL_ROUTE_NAME"].stops),
                  delete y["esri.tasks.RouteTask.NULL_ROUTE_NAME"],
                  l.splice(
                    k.indexOf(l, "esri.tasks.RouteTask.NULL_ROUTE_NAME"),
                    1
                  ));
                var ba = [];
                ca(l, function (n, u) {
                  y[n].routeName =
                    "esri.tasks.RouteTask.NULL_ROUTE_NAME" === n ? null : n;
                  y[n].spatialReference = da;
                  ba.push(new m(y[n]));
                });
                f = function (n) {
                  ca(n, function (u, V) {
                    u.geometry && (u.geometry.spatialReference = da);
                    n[V] = new O(u);
                  });
                  return n;
                };
                ca(G, function (n, u) {
                  G[u] = new z(n);
                });
                var v = {
                  routeResults: ba,
                  barriers: f(Q),
                  polygonBarriers: f(M),
                  polylineBarriers: f(B),
                  messages: G,
                };
                this._successHandler([v], "onSolveComplete", d, t);
              } catch (n) {
                this._errorHandler(n, q, t);
              }
            },
            solve: function (f, c, d, q) {
              var t = q.assembly;
              f = this._encode(
                R.mixin(
                  {},
                  this._url.query,
                  { f: "json" },
                  f.toJson(t && t[0]),
                  this._chk ? { checksum: this._chk } : {}
                )
              );
              var l = this._handler,
                y = this._errorHandler;
              return I({
                url: this._url.path,
                timeout: 25e4,
                content: f,
                callbackParamName: "callback",
                load: function (J, H) {
                  l(J, H, c, d, q.dfd);
                },
                error: function (J) {
                  y(J, d, q.dfd);
                },
              });
            },
            onSolveComplete: function () {},
          });
          E._createWrappers(C);
          Z("extend-esri") && R.setObject("tasks.RouteTask", C, U);
          return C;
        }
      );
    },
    "esri/tasks/RouteResult": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../graphic ./DirectionsFeatureSet".split(
          " "
        ),
        function (C, R, k, Z, U, O, I) {
          C = C(null, {
            declaredClass: "esri.tasks.RouteResult",
            constructor: function (E) {
              var A = E.spatialReference,
                m = E.route;
              if (E.directions) {
                var z = [],
                  g = [],
                  f = [];
                k.forEach(E.directions.features, function (d, q) {
                  g[q] = d.compressedGeometry;
                  z[q] = d.strings;
                  f[q] = d.events;
                });
                E.directions.strings = z;
                E.directions.events = f;
                this.directions = new I(E.directions, g);
              }
              this.routeName = E.routeName;
              m &&
                (m.geometry && (m.geometry.spatialReference = A),
                (this.route = new O(m)));
              if (E.stops) {
                var c = (this.stops = []);
                k.forEach(E.stops, function (d, q) {
                  d.geometry && (d.geometry.spatialReference = A);
                  c[d.attributes.Sequence - 1] = new O(d);
                });
              }
            },
            routeName: null,
            directions: null,
            route: null,
            stops: null,
          });
          Z("extend-esri") && R.setObject("tasks.RouteResult", C, U);
          return C;
        }
      );
    },
    "esri/tasks/DirectionsFeatureSet": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has dojo/json ../kernel ../geometry/Extent ../geometry/Polyline ../geometry/Point ../graphic ./FeatureSet".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z) {
          C = C(z, {
            declaredClass: "esri.tasks.DirectionsFeatureSet",
            constructor: function (g, f) {
              this.routeId = g.routeId;
              this.routeName = g.routeName;
              R.mixin(this, g.summary);
              this.extent = new I(this.envelope);
              var c = this._fromCompressedGeometry,
                d = this.features,
                q = this.extent.spatialReference,
                t = [];
              k.forEach(f, function (l, y) {
                d[y].setGeometry((t[y] = l ? c(l, q) : d[y].geometry));
              });
              this.mergedGeometry = this._mergePolylinesToSinglePath(t, q);
              this.geometryType = "esriGeometryPolyline";
              k.forEach(g.events, function (l, y) {
                k.forEach(l, function (J, H) {
                  l[H] = new m(new A(J.point.x, J.point.y, q), null, {
                    ETA: J.ETA,
                    strings: U.stringify(J.strings),
                    arriveTimeUTC: J.arriveTimeUTC,
                  });
                });
                g.events[y] = l;
              });
              delete this.envelope;
            },
            _fromCompressedGeometry: function (g, f) {
              var c = 0,
                d = 0,
                q = 0,
                t = 0,
                l = [],
                y = 0,
                J = 0,
                H = 0;
              (g = g.match(/((\+|\-)[^\+\-\|]+|\|)/g)) || (g = []);
              if (0 === parseInt(g[y], 32)) {
                y = 2;
                var T = parseInt(g[y], 32);
                y++;
                var Q = parseInt(g[y], 32);
                y++;
                if (T & 1) {
                  J = k.indexOf(g, "|") + 1;
                  var M = parseInt(g[J], 32);
                  J++;
                }
                if (T & 2) {
                  H = k.indexOf(g, "|", J) + 1;
                  var B = parseInt(g[H], 32);
                  H++;
                }
              } else (Q = parseInt(g[y], 32)), y++;
              for (; y < g.length && "|" !== g[y]; ) {
                T = parseInt(g[y], 32) + c;
                y++;
                c = T;
                var G = parseInt(g[y], 32) + d;
                y++;
                d = G;
                T = [T / Q, G / Q];
                J &&
                  ((G = parseInt(g[J], 32) + q), J++, (q = G), T.push(G / M));
                H &&
                  ((G = parseInt(g[H], 32) + t), H++, (t = G), T.push(G / B));
                l.push(T);
              }
              c = new E({ paths: [l], hasZ: 0 < J, hasM: 0 < H });
              c.setSpatialReference(f);
              return c;
            },
            _mergePolylinesToSinglePath: function (g, f) {
              var c = [],
                d = !1;
              k.forEach(g, function (l) {
                k.forEach(l.paths, function (y) {
                  d = d || l.hasM;
                  c = c.concat(y);
                });
              });
              var q = [],
                t = [0, 0];
              k.forEach(c, function (l) {
                if (l[0] !== t[0] || l[1] !== t[1]) q.push(l), (t = l);
              });
              return new E({ paths: [q], spatialReference: f, hasM: d });
            },
          });
          Z("extend-esri") && R.setObject("tasks.DirectionsFeatureSet", C, O);
          return C;
        }
      );
    },
    "esri/tasks/NAMessage": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.NAMessage",
          constructor: function (U) {
            R.mixin(this, U);
          },
        });
        R.mixin(C, {
          TYPE_INFORMATIVE: 0,
          TYPE_PROCESS_DEFINITION: 1,
          TYPE_PROCESS_START: 2,
          TYPE_PROCESS_STOP: 3,
          TYPE_WARNING: 50,
          TYPE_ERROR: 100,
          TYPE_EMPTY: 101,
          TYPE_ABORT: 200,
        });
        k("extend-esri") && R.setObject("tasks.NAMessage", C, Z);
        return C;
      });
    },
    "esri/tasks/NAServiceDescription": function () {
      define([
        "dojo/_base/declare",
        "dojo/json",
        "dojo/Deferred",
        "dojo/_base/lang",
        "../request",
      ], function (C, R, k, Z, U) {
        return C(null, {
          declaredClass: "esri.tasks._NAServiceDescription",
          _sd: null,
          getServiceDescription: function (O, I) {
            var E = new k();
            if (this._sd) E.resolve(this._sd);
            else if (this._url && this._url.orig) {
              var A = this._url.orig,
                m = (this._url.path.match(/\/solve$/) || []).length
                  ? "Route"
                  : (this._url.path.match(/\/solveClosestFacility$/) || [])
                      .length
                  ? "ClosestFacility"
                  : "ServiceAreas",
                z,
                g = function (f) {
                  U({
                    url:
                      f +
                      ("/" === f[f.length - 1] ? "" : "/") +
                      "GetTravelModes/execute",
                    content: { f: "json", serviceName: m },
                    callbackParamName: "callback",
                  }).then(
                    function (c) {
                      var d = [],
                        q = null;
                      if (c && c.results && c.results.length)
                        for (var t = 0; t < c.results.length; t++)
                          if (
                            "supportedTravelModes" === c.results[t].paramName
                          ) {
                            if (
                              c.results[t].value &&
                              c.results[t].value.features
                            )
                              for (
                                var l = 0;
                                l < c.results[t].value.features.length;
                                l++
                              )
                                if (c.results[t].value.features[l].attributes) {
                                  var y = R.parse(
                                    c.results[t].value.features[l].attributes
                                      .TravelMode
                                  );
                                  d.push(y);
                                }
                          } else
                            "defaultTravelMode" === c.results[t].paramName &&
                              (q = c.results[t].value);
                      z.supportedTravelModes = d;
                      z.defaultTravelMode = q;
                      E.resolve(z);
                    },
                    function (c) {
                      console.log(
                        "Could not read from the routingUtilities service."
                      );
                      E.reject(c);
                    }
                  );
                };
              U({
                url: A,
                content: { f: "json" },
                callbackParamName: "callback",
              }).then(
                function (f) {
                  z = f;
                  z.supportedTravelModes || (z.supportedTravelModes = []);
                  for (f = 0; f < z.supportedTravelModes.length; f++)
                    z.supportedTravelModes[f].id ||
                      (z.supportedTravelModes[f].id =
                        z.supportedTravelModes[f].itemId);
                  I
                    ? E.resolve(z)
                    : O
                    ? g(O)
                    : 10.4 <= z.currentVersion
                    ? U({
                        url:
                          A +
                          ("/" === A[A.length - 1] ? "" : "/") +
                          "retrieveTravelModes",
                        content: { f: "json" },
                        callbackParamName: "callback",
                      }).then(
                        function (c) {
                          z.supportedTravelModes = c.supportedTravelModes;
                          z.defaultTravelMode = c.defaultTravelMode;
                          E.resolve(z);
                        },
                        function (c) {
                          console.log(
                            "Could not get to the NAServer's retrieveTravelModes."
                          );
                          E.reject(c);
                        }
                      )
                    : U({
                        url: A.substring(0, A.indexOf("/rest/") + 6) + "info",
                        content: { f: "json" },
                        callbackParamName: "callback",
                      }).then(
                        function (c) {
                          c.owningSystemUrl
                            ? ((A = c.owningSystemUrl),
                              U({
                                url:
                                  A +
                                  ("/" === A[A.length - 1] ? "" : "/") +
                                  "sharing/rest/portals/self",
                                content: { f: "json" },
                                callbackParamName: "callback",
                              }).then(
                                function (d) {
                                  d &&
                                  d.helperServices &&
                                  d.helperServices.routingUtilities &&
                                  d.helperServices.routingUtilities.url
                                    ? g(d.helperServices.routingUtilities.url)
                                    : (console.log(
                                        "Portal does not have helperServices.routingUtilities defined."
                                      ),
                                      E.resolve(z));
                                },
                                function (d) {
                                  console.log(
                                    "Could not get to the portal's self."
                                  );
                                  E.reject(d);
                                }
                              ))
                            : E.resolve(z);
                        },
                        function (c) {
                          console.log(
                            "Could not get to the NAServer service description."
                          );
                          E.reject(c);
                        }
                      );
                },
                function (f) {
                  E.reject(f);
                }
              );
            } else E.reject("NA Task has no URL specified.");
            E.then(
              Z.hitch(this, function (f) {
                this._sd = f;
              }),
              Z.hitch(this, function () {
                this._sd = null;
              })
            );
            return E.promise;
          },
          getOwningSystemUrl: function () {
            var O = new k();
            if (this._url && this._url.orig) {
              var I = this._url.orig;
              U({
                url: I.substring(0, I.indexOf("/rest/") + 6) + "info",
                content: { f: "json" },
                callbackParamName: "callback",
              }).promise.always(function (E) {
                O.resolve(E.owningSystemUrl);
              });
            } else O.resolve(void 0);
            return O.promise;
          },
        });
      });
    },
    "esri/tasks/RouteParameters": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has ../kernel ../lang ../graphicsUtils ./NATypes".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E) {
          C = C(null, {
            declaredClass: "esri.tasks.RouteParameters",
            accumulateAttributes: null,
            attributeParameterValues: null,
            barriers: null,
            directionsLanguage: null,
            directionsLengthUnits: null,
            directionsOutputType: null,
            directionsStyleName: null,
            directionsTimeAttribute: null,
            doNotLocateOnRestrictedElements: !0,
            findBestSequence: null,
            ignoreInvalidLocations: null,
            impedanceAttribute: null,
            outputLines: "esriNAOutputLineTrueShape",
            outputGeometryPrecision: null,
            outputGeometryPrecisionUnits: null,
            outSpatialReference: null,
            overrides: null,
            polygonBarriers: null,
            polylineBarriers: null,
            preserveFirstStop: null,
            preserveLastStop: null,
            restrictionAttributes: null,
            restrictUTurns: null,
            returnBarriers: !1,
            returnDirections: !1,
            returnPolygonBarriers: !1,
            returnPolylineBarriers: !1,
            returnRoutes: !0,
            returnStops: !1,
            returnZ: !0,
            startTime: null,
            startTimeIsUTC: null,
            timeWindowsAreUTC: null,
            stops: null,
            useHierarchy: null,
            useTimeWindows: null,
            travelMode: null,
            toJson: function (A) {
              var m = {
                  returnDirections: this.returnDirections,
                  returnRoutes: this.returnRoutes,
                  returnZ: this.returnZ,
                  returnStops: this.returnStops,
                  returnBarriers: this.returnBarriers,
                  returnPolygonBarriers: this.returnPolygonBarriers,
                  returnPolylineBarriers: this.returnPolylineBarriers,
                  attributeParameterValues:
                    this.attributeParameterValues &&
                    k.toJson(this.attributeParameterValues),
                  outSR: this.outSpatialReference
                    ? this.outSpatialReference.wkid ||
                      k.toJson(this.outSpatialReference.toJson())
                    : null,
                  outputLines: this.outputLines,
                  overrides: this.overrides,
                  findBestSequence: this.findBestSequence,
                  preserveFirstStop: this.preserveFirstStop,
                  preserveLastStop: this.preserveLastStop,
                  useTimeWindows: this.useTimeWindows,
                  startTime: this.startTime ? this.startTime.getTime() : null,
                  startTimeIsUTC: this.startTimeIsUTC,
                  timeWindowsAreUTC: this.timeWindowsAreUTC,
                  accumulateAttributeNames: this.accumulateAttributes
                    ? this.accumulateAttributes.join(",")
                    : null,
                  ignoreInvalidLocations: this.ignoreInvalidLocations,
                  impedanceAttributeName: this.impedanceAttribute,
                  restrictionAttributeNames: this.restrictionAttributes
                    ? this.restrictionAttributes.join(",")
                    : null,
                  restrictUTurns: this.restrictUTurns,
                  useHierarchy: this.useHierarchy,
                  directionsLanguage: this.directionsLanguage,
                  outputGeometryPrecision: this.outputGeometryPrecision,
                  outputGeometryPrecisionUnits:
                    this.outputGeometryPrecisionUnits,
                  directionsLengthUnits:
                    E.LengthUnit[this.directionsLengthUnits],
                  directionsTimeAttributeName: this.directionsTimeAttribute,
                  directionsStyleName: this.directionsStyleName,
                  travelMode:
                    "object" === typeof this.travelMode
                      ? k.toJson(this.travelMode)
                      : this.travelMode,
                },
                z = this.stops;
              "esri.tasks.FeatureSet" === z.declaredClass &&
              0 < z.features.length
                ? (m.stops = k.toJson({
                    type: "features",
                    features: I._encodeGraphics(
                      z.features,
                      A && A["stops.features"]
                    ),
                    doNotLocateOnRestrictedElements:
                      this.doNotLocateOnRestrictedElements,
                  }))
                : "esri.tasks.DataLayer" === z.declaredClass
                ? (m.stops = z)
                : "esri.tasks.DataFile" === z.declaredClass &&
                  (m.stops = k.toJson({
                    type: "features",
                    url: z.url,
                    doNotLocateOnRestrictedElements:
                      this.doNotLocateOnRestrictedElements,
                  }));
              if (this.directionsOutputType)
                switch (this.directionsOutputType.toLowerCase()) {
                  case "complete":
                    m.directionsOutputType = "esriDOTComplete";
                    break;
                  case "complete-no-events":
                    m.directionsOutputType = "esriDOTCompleteNoEvents";
                    break;
                  case "instructions-only":
                    m.directionsOutputType = "esriDOTInstructionsOnly";
                    break;
                  case "standard":
                    m.directionsOutputType = "esriDOTStandard";
                    break;
                  case "summary-only":
                    m.directionsOutputType = "esriDOTSummaryOnly";
                    break;
                  default:
                    m.directionsOutputType = this.directionsOutputType;
                }
              z = function (g, f) {
                return g
                  ? "esri.tasks.FeatureSet" === g.declaredClass
                    ? 0 < g.features.length
                      ? k.toJson({
                          type: "features",
                          features: I._encodeGraphics(g.features, A && A[f]),
                        })
                      : null
                    : "esri.tasks.DataLayer" === g.declaredClass
                    ? g
                    : "esri.tasks.DataFile" === g.declaredClass
                    ? k.toJson({ type: "features", url: g.url })
                    : k.toJson(g)
                  : null;
              };
              this.barriers &&
                (m.barriers = z(this.barriers, "barriers.features"));
              this.polygonBarriers &&
                (m.polygonBarriers = z(
                  this.polygonBarriers,
                  "polygonBarriers.features"
                ));
              this.polylineBarriers &&
                (m.polylineBarriers = z(
                  this.polylineBarriers,
                  "polylineBarriers.features"
                ));
              return O.filter(m, function (g) {
                if (null !== g) return !0;
              });
            },
          });
          Z("extend-esri") && R.setObject("tasks.RouteParameters", C, U);
          return C;
        }
      );
    },
    "esri/tasks/NATypes": function () {
      define(["dojo/_base/lang", "dojo/has", "../kernel"], function (C, R, k) {
        var Z = {
            esriFeet: "esriNAUFeet",
            esriKilometers: "esriNAUKilometers",
            esriMeters: "esriNAUMeters",
            esriMiles: "esriNAUMiles",
            esriNauticalMiles: "esriNAUNauticalMiles",
            esriYards: "esriNAUYards",
          },
          U = {
            NONE: "esriNAOutputLineNone",
            STRAIGHT: "esriNAOutputLineStraight",
            TRUE_SHAPE: "esriNAOutputLineTrueShape",
            TRUE_SHAPE_WITH_MEASURE: "esriNAOutputLineTrueShapeWithMeasure",
          },
          O = {
            ALLOW_BACKTRACK: "esriNFSBAllowBacktrack",
            AT_DEAD_ENDS_ONLY: "esriNFSBAtDeadEndsOnly",
            NO_BACKTRACK: "esriNFSBNoBacktrack",
            AT_DEAD_ENDS_AND_INTERSECTIONS:
              "esriNFSBAtDeadEndsAndIntersections",
          },
          I = {
            NONE: "esriNAOutputPolygonNone",
            SIMPLIFIED: "esriNAOutputPolygonSimplified",
            DETAILED: "esriNAOutputPolygonDetailed",
          },
          E = {
            FROM_FACILITY: "esriNATravelDirectionFromFacility",
            TO_FACILITY: "esriNATravelDirectionToFacility",
          },
          A = {
            LengthUnit: Z,
            OutputLine: U,
            UTurn: O,
            OutputPolygon: I,
            TravelDirection: E,
          };
        R("extend-esri") &&
          (C.setObject("tasks._NALengthUnit", Z, k),
          C.setObject("tasks.NAOutputLine", U, k),
          C.setObject("tasks.NAUTurn", O, k),
          C.setObject("tasks.NAOutputPolygon", I, k),
          C.setObject("tasks.NATravelDirection", E, k));
        return A;
      });
    },
    "esri/tasks/DistanceParameters": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has ../kernel ../geometry/jsonUtils".split(
          " "
        ),
        function (C, R, k, Z, U, O) {
          C = C(null, {
            declaredClass: "esri.tasks.DistanceParameters",
            geometry1: null,
            geometry2: null,
            distanceUnit: null,
            geodesic: null,
            toJson: function () {
              var I = {},
                E = this.geometry1;
              E &&
                (I.geometry1 = k.toJson({
                  geometryType: O.getJsonType(E),
                  geometry: E,
                }));
              if ((E = this.geometry2))
                I.geometry2 = k.toJson({
                  geometryType: O.getJsonType(E),
                  geometry: E,
                });
              I.sr = k.toJson(this.geometry1.spatialReference.toJson());
              this.distanceUnit && (I.distanceUnit = this.distanceUnit);
              this.geodesic && (I.geodesic = this.geodesic);
              return I;
            },
          });
          Z("extend-esri") && R.setObject("tasks.DistanceParameters", C, U);
          return C;
        }
      );
    },
    "esri/tasks/PrintTask": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/json dojo/_base/Deferred dojo/has ../kernel ../lang ../layerUtils ../deferredUtils ../Color ../request ../urlUtils ../geometry/Polygon ../renderers/SimpleRenderer ../symbols/FillSymbol ./Geoprocessor ./PrintTemplate ./Task dojo/dom-attr dojo/dom-construct dojox/gfx/_base dojox/gfx/canvas dojox/json/query dojo/has!extend-esri?./PrintParameters dojo/has!extend-esri?./LegendLayer".split(
          " "
        ),
        function (
          C,
          R,
          k,
          Z,
          U,
          O,
          I,
          E,
          A,
          m,
          z,
          g,
          f,
          c,
          d,
          q,
          t,
          l,
          y,
          J,
          H,
          T,
          Q,
          M
        ) {
          C = C(y, {
            declaredClass: "esri.tasks.PrintTask",
            constructor: function (B, G) {
              this.url = B;
              this.printGp = new t(this.url);
              this._handler = R.hitch(this, this._handler);
              G && G.async && (this.async = !0);
              this._colorEvaluator = M("$..color");
            },
            async: !1,
            _vtlExtent: null,
            _cimVersion: null,
            _is11xService: !1,
            _loadGpServerMetadata: !0,
            execute: function (B, G, ca) {
              if (!this._loadGpServerMetadata) return this._execute(B, G, ca);
              var N = new U(m._dfdCanceller),
                F = this._url.path,
                X = F.lastIndexOf("/GPServer/");
              0 < X && (F = F.slice(0, X + 9));
              N._pendingDfd = g({
                url: F,
                callbackParamName: "callback",
                content: R.mixin({}, this._url.query, { f: "json" }),
              })
                .then(
                  R.hitch(this, function (x) {
                    this._loadGpServerMetadata = !1;
                    this.async =
                      "esriExecutionTypeAsynchronous" === x.executionType;
                    this._cimVersion = x.cimVersion;
                    this._is11xService = !!this._cimVersion;
                    N._pendingDfd = this._execute(B);
                    return N._pendingDfd;
                  })
                )
                .then(
                  R.hitch(this, function (x) {
                    this._successHandler([x], null, G, N);
                  })
                )
                .otherwise(function (x) {
                  ca && ca(x);
                  N.errback(x);
                });
              return N;
            },
            _handler: function (B, G, ca, N, F) {
              try {
                if (this.async)
                  "esriJobSucceeded" === B.jobStatus
                    ? this.printGp.getResultData(
                        B.jobId,
                        "Output_File",
                        R.hitch(this, function (x) {
                          X = x.value;
                          this._successHandler([X], "onComplete", ca, F);
                        })
                      )
                    : this._errorHandler(Error(B.jobStatus), N, F);
                else {
                  var X = B[0].value;
                  this._successHandler([X], "onComplete", ca, F);
                }
              } catch (x) {
                this._errorHandler(x, N, F);
              }
            },
            _execute: function (B, G, ca) {
              var N = this._handler,
                F = this._errorHandler,
                X = B.template || new l();
              X.hasOwnProperty("showLabels") || (X.showLabels = !0);
              var x = X.exportOptions,
                da;
              x && (da = { outputSize: [x.width, x.height], dpi: x.dpi });
              x = X.layoutOptions;
              var ba = [];
              if (x) {
                this.legendAll = !1;
                x.legendLayers
                  ? k.forEach(x.legendLayers, function (ya) {
                      var Ea = {};
                      Ea.id = ya.layerId;
                      ya.subLayerIds && (Ea.subLayerIds = ya.subLayerIds);
                      ba.push(Ea);
                    })
                  : (this.legendAll = !0);
                if (
                  "Miles" === x.scalebarUnit ||
                  "Kilometers" === x.scalebarUnit
                ) {
                  var v = "esriKilometers";
                  var n = "esriMiles";
                } else if (
                  "Meters" === x.scalebarUnit ||
                  "Feet" === x.scalebarUnit
                )
                  (v = "esriMeters"), (n = "esriFeet");
                var u = {
                  esriMiles: "mi",
                  esriKilometers: "km",
                  esriFeet: "ft",
                  esriMeters: "m",
                };
                u = {
                  titleText: x.titleText,
                  authorText: x.authorText,
                  copyrightText: x.copyrightText,
                  customTextElements: x.customTextElements,
                  scaleBarOptions: {
                    metricUnit: v,
                    metricLabel: u[v],
                    nonMetricUnit: n,
                    nonMetricLabel: u[n],
                  },
                  legendOptions: { operationalLayers: ba },
                };
              }
              v = this._getPrintDefinition(B.map, X);
              B.outSpatialReference &&
                (v.mapOptions.spatialReference =
                  B.outSpatialReference.toJson());
              B.template &&
                E.isDefined(B.template.showAttribution) &&
                (v.mapOptions.showAttribution = B.template.showAttribution);
              R.mixin(v, { exportOptions: da, layoutOptions: u });
              this.allLayerslegend &&
                R.mixin(v.layoutOptions, {
                  legendOptions: { operationalLayers: this.allLayerslegend },
                });
              if (v.operationalLayers) {
                da = v.operationalLayers;
                var V = function (ya) {
                    return E.fixJson(
                      R.mixin(ya, {
                        type: "esriSLS",
                        cap: void 0,
                        join: void 0,
                        meterLimit: void 0,
                      })
                    );
                  },
                  ia =
                    /[\u4E00-\u9FFF\u0E00-\u0E7F\u0900-\u097F\u3040-\u309F\u30A0-\u30FF\u31F0-\u31FF]/,
                  ea = /[\u0600-\u06FF]/,
                  ka = function (ya) {
                    var Ea = ya.text,
                      e =
                        (ya = ya.font) && ya.family && ya.family.toLowerCase();
                    Ea &&
                      ya &&
                      ("arial" === e || "arial unicode ms" === e) &&
                      ((ya.family = ia.test(Ea) ? "Arial Unicode MS" : "Arial"),
                      "normal" !== ya.style &&
                        ea.test(Ea) &&
                        (ya.family = "Arial Unicode MS"));
                  };
                for (u = 0; u < da.length; u++)
                  if (da[u].featureCollection && da[u].featureCollection.layers)
                    for (
                      n = 0;
                      n < da[u].featureCollection.layers.length;
                      n++
                    ) {
                      var qa = da[u].featureCollection.layers[n];
                      if (
                        qa.layerDefinition &&
                        qa.layerDefinition.drawingInfo &&
                        qa.layerDefinition.drawingInfo.renderer &&
                        qa.layerDefinition.drawingInfo.renderer.symbol
                      ) {
                        var pa = qa.layerDefinition.drawingInfo.renderer;
                        "esriCLS" === pa.symbol.type
                          ? (pa.symbol = V(pa.symbol))
                          : "esriTS" === pa.symbol.type
                          ? ka(pa.symbol)
                          : pa.symbol.outline &&
                            "esriCLS" === pa.symbol.outline.type &&
                            (pa.symbol.outline = V(pa.symbol.outline));
                      }
                      if (qa.featureSet && qa.featureSet.features)
                        for (x = 0; x < qa.featureSet.features.length; x++)
                          (pa = qa.featureSet.features[x]),
                            pa.symbol &&
                              ("esriCLS" === pa.symbol.type
                                ? (pa.symbol = V(pa.symbol))
                                : "esriTS" === pa.symbol.type
                                ? ka(pa.symbol)
                                : pa.symbol.outline &&
                                  "esriCLS" === pa.symbol.outline.type &&
                                  (pa.symbol.outline = V(pa.symbol.outline)));
                    }
              }
              X = {
                Web_Map_as_JSON: Z.toJson(E.fixJson(v)),
                Format: X.format,
                Layout_Template: X.layout,
              };
              B.extraParameters && (X = R.mixin(X, B.extraParameters));
              var xa = new U(m._dfdCanceller);
              B = function (ya, Ea) {
                N(ya, Ea, G, ca, xa);
              };
              v = function (ya) {
                F(ya, ca, xa);
              };
              xa._pendingDfd = this.async
                ? this.printGp.submitJob(X, B, null, v)
                : this.printGp.execute(X, B, v);
              return xa;
            },
            onComplete: function () {},
            _createMultipointLayer: function () {
              return {
                layerDefinition: {
                  name: "multipointLayer",
                  geometryType: "esriGeometryMultipoint",
                  drawingInfo: { renderer: null },
                },
                featureSet: {
                  geometryType: "esriGeometryMultipoint",
                  features: [],
                },
              };
            },
            _createPolygonLayer: function () {
              return {
                layerDefinition: {
                  name: "polygonLayer",
                  geometryType: "esriGeometryPolygon",
                  drawingInfo: { renderer: null },
                },
                featureSet: {
                  geometryType: "esriGeometryPolygon",
                  features: [],
                },
              };
            },
            _createPointLayer: function () {
              return {
                layerDefinition: {
                  name: "pointLayer",
                  geometryType: "esriGeometryPoint",
                  drawingInfo: { renderer: null },
                },
                featureSet: { geometryType: "esriGeometryPoint", features: [] },
              };
            },
            _createPolylineLayer: function () {
              return {
                layerDefinition: {
                  name: "polylineLayer",
                  geometryType: "esriGeometryPolyline",
                  drawingInfo: { renderer: null },
                },
                featureSet: {
                  geometryType: "esriGeometryPolyline",
                  features: [],
                },
              };
            },
            _convertSvgSymbol: function (B) {
              if (
                !(
                  8 >= O("ie") ||
                  (!B.path && "image/svg+xml" !== B.contentType)
                )
              ) {
                var G = Q.createSurface(H.create("div"), 1024, 1024);
                var ca =
                  "image/svg+xml" === B.contentType
                    ? G.createObject(Q.Image, {
                        src: "data:image/svg+xml;base64," + B.imageData,
                        width: T.pt2px(B.width),
                        height: T.pt2px(B.height),
                        x: 0,
                        y: 0,
                      })
                    : G.createObject(Q.Path, B.path)
                        .setFill(B.color)
                        .setStroke(B.outline);
                "pendingRender" in G && G._render(!0);
                var N = G.rawNode.getContext("2d"),
                  F = Math.ceil(ca.getBoundingBox().width),
                  X = Math.ceil(ca.getBoundingBox().height);
                ca = N.getImageData(
                  ca.getBoundingBox().x,
                  ca.getBoundingBox().y,
                  F,
                  X
                );
                N.canvas.width = F;
                N.canvas.height = X;
                N.putImageData(ca, 0, 0);
                N = N.canvas.toDataURL("image/png");
                B = {
                  type: "esriPMS",
                  imageData: N.substr(22, N.length),
                  angle: B.angle,
                  contentType: "image/png",
                  height: B.size ? B.size : T.px2pt(X),
                  width: B.size ? (F / X) * B.size : T.px2pt(F),
                  xoffset: B.xoffset,
                  yoffset: B.yoffset,
                };
                G.destroy();
                return B;
              }
            },
            _convertSvgRenderer: function (B) {
              "simple" === B.type &&
              B.symbol &&
              (B.symbol.path || "image/svg+xml" === B.symbol.contentType)
                ? (B.symbol = this._convertSvgSymbol(B.symbol))
                : "uniqueValue" === B.type
                ? (B.defaultSymbol &&
                    (B.defaultSymbol.path ||
                      "image/svg+xml" === B.defaultSymbol.contentType) &&
                    (B.defaultSymbol = this._convertSvgSymbol(B.defaultSymbol)),
                  B.uniqueValueInfos &&
                    k.forEach(
                      B.uniqueValueInfos,
                      function (G) {
                        if (
                          G.symbol.path ||
                          "image/svg+xml" === G.symbol.contentType
                        )
                          G.symbol = this._convertSvgSymbol(G.symbol);
                      },
                      this
                    ))
                : "classBreaks" === B.type &&
                  (B.defaultSymbol &&
                    (B.defaultSymbol.path ||
                      "image/svg+xml" === B.defaultSymbol.contentType) &&
                    (B.defaultSymbol = this._convertSvgSymbol(B.defaultSymbol)),
                  B.classBreakInfos &&
                    k.forEach(
                      B.classBreakInfos,
                      function (G) {
                        if (
                          G.symbol.path ||
                          "image/svg+xml" === G.symbol.contentType
                        )
                          G.symbol = this._convertSvgSymbol(G.symbol);
                      },
                      this
                    ));
            },
            _createFeatureCollection: function (B, G, ca, N) {
              var F = this._createPolygonLayer(),
                X = this._createPolylineLayer(),
                x = this._createPointLayer(),
                da = this._createMultipointLayer(),
                ba = this._createPointLayer();
              ba.layerDefinition.name = "textLayer";
              delete ba.layerDefinition.drawingInfo;
              if (
                "esri.layers.FeatureLayer" === B.declaredClass ||
                "esri.layers.StreamLayer" === B.declaredClass
              )
                F.layerDefinition.name =
                  X.layerDefinition.name =
                  x.layerDefinition.name =
                  da.layerDefinition.name =
                    R.getObject("arcgisProps.title", !1, B) || B.name || B.id;
              var v =
                B.renderer &&
                "esri.renderer.SimpleRenderer" === B.renderer.declaredClass;
              if (
                !B.renderer ||
                B.renderer.valueExpression ||
                R.isFunction(B.renderer.attributeField)
              )
                delete F.layerDefinition.drawingInfo,
                  delete X.layerDefinition.drawingInfo,
                  delete x.layerDefinition.drawingInfo,
                  delete da.layerDefinition.drawingInfo;
              else {
                var n = B.renderer.toJson({ useLegacyRotationProperties: !0 });
                if ("temporal" === n.type) {
                  n = {
                    latestObservationRenderer: n.latestObservationRenderer,
                    trackLinesRenderer: n.trackRenderer,
                    observationAger: n.observationAger,
                    renderer: n.observationRenderer,
                  };
                  var u = {};
                  B._trackIdField && (u.trackIdField = B._trackIdField);
                  B._startTimeField && (u.startTimeField = B._startTimeField);
                  B._endTimeField && (u.endTimeField = B._endTimeField);
                  F.layerDefinition.drawingInfo = n;
                  F.layerDefinition.timeInfo = u;
                  X.layerDefinition.drawingInfo = n;
                  X.layerDefinition.timeInfo = u;
                  x.layerDefinition.drawingInfo = n;
                  x.layerDefinition.timeInfo = u;
                  da.layerDefinition.drawingInfo = n;
                  da.layerDefinition.timeInfo = u;
                } else
                  (F.layerDefinition.drawingInfo.renderer = n),
                    (X.layerDefinition.drawingInfo.renderer = n),
                    (x.layerDefinition.drawingInfo.renderer = n),
                    (da.layerDefinition.drawingInfo.renderer = n);
              }
              n = B.fields;
              n ||
                !B.renderer ||
                B.renderer.valueExpression ||
                R.isFunction(B.renderer.attributeField) ||
                ("esri.renderer.ClassBreaksRenderer" ===
                B.renderer.declaredClass
                  ? ((n = [
                      {
                        name: B.renderer.attributeField,
                        type: "esriFieldTypeDouble",
                      },
                    ]),
                    B.renderer.normalizationField &&
                      n.push({
                        name: B.renderer.normalizationField,
                        type: "esriFieldTypeDouble",
                      }))
                  : "esri.renderer.UniqueValueRenderer" ===
                      B.renderer.declaredClass &&
                    ((n = [
                      {
                        name: B.renderer.attributeField,
                        type: "esriFieldTypeString",
                      },
                    ]),
                    B.renderer.attributeField2 &&
                      n.push({
                        name: B.renderer.attributeField2,
                        type: "esriFieldTypeString",
                      }),
                    B.renderer.attributeField3 &&
                      n.push({
                        name: B.renderer.attributeField3,
                        type: "esriFieldTypeString",
                      })));
              n &&
                ((F.layerDefinition.fields = n),
                (X.layerDefinition.fields = n),
                (x.layerDefinition.fields = n),
                (da.layerDefinition.fields = n));
              n = B.graphics;
              B.isFeatureReductionActive &&
                B.isFeatureReductionActive() &&
                (n = B.getSingleGraphics());
              u = n.length;
              var V;
              for (V = 0; V < u; V++) {
                var ia = n[V];
                if (!1 !== ia.visible && ia.geometry) {
                  var ea = ia.toJson();
                  ea.symbol &&
                    ea.symbol.outline &&
                    ea.symbol.outline.color &&
                    ea.symbol.outline.color[3] &&
                    !this._is11xService &&
                    (ea.symbol.outline.color[3] = 255);
                  if (
                    B.renderer &&
                    !ea.symbol &&
                    (R.isFunction(B.renderer.attributeField) ||
                      B.renderer.valueExpression ||
                      this._isFeatureCollectionRequired(B.renderer, B) ||
                      "esri.renderer.DotDensityRenderer" ===
                        B.renderer.declaredClass ||
                      ca)
                  ) {
                    ca = ca || B.renderer;
                    var ka = null;
                    try {
                      ka = ca.getSymbol(ia);
                    } catch (qa) {}
                    if (!ka) continue;
                    ea.symbol = ka.toJson();
                    this._isFeatureCollectionRequired(ca, B) &&
                      this._applyVisualVariables(ea.symbol, {
                        renderer: ca,
                        graphic: ia,
                        symbol: ka,
                        mapResolution: G && G.getResolutionInMeters(),
                        mapScale: G && G.getScale(),
                      });
                  }
                  ea.symbol &&
                    (ea.symbol.path || "image/svg+xml" === ea.symbol.contentType
                      ? (ea.symbol = this._convertSvgSymbol(ea.symbol))
                      : ea.symbol.text && delete ea.attributes);
                  switch (ia.geometry.type) {
                    case "polygon":
                      F.featureSet.features.push(ea);
                      break;
                    case "polyline":
                      X.featureSet.features.push(ea);
                      break;
                    case "point":
                      ea.symbol && ea.symbol.text
                        ? ba.featureSet.features.push(ea)
                        : x.featureSet.features.push(ea);
                      break;
                    case "multipoint":
                      da.featureSet.features.push(ea);
                      break;
                    case "extent":
                      (ea.geometry = c.fromExtent(ia.geometry).toJson()),
                        F.featureSet.features.push(ea);
                  }
                }
              }
              G = [];
              0 < F.featureSet.features.length && G.push(F);
              0 < X.featureSet.features.length && G.push(X);
              0 < da.featureSet.features.length && G.push(da);
              0 < x.featureSet.features.length && G.push(x);
              0 < ba.featureSet.features.length && G.push(ba);
              if (!G.length) return null;
              k.forEach(G, function (qa) {
                var pa = k.every(qa.featureSet.features, function (xa) {
                  return xa.symbol;
                });
                if (v || pa)
                  (N && N.forceFeatureAttributes) ||
                    k.forEach(qa.featureSet.features, function (xa) {
                      delete xa.attributes;
                    }),
                    N.forceFeatureAttributes ||
                      delete qa.layerDefinition.fields;
                pa && delete qa.layerDefinition.drawingInfo;
              });
              k.forEach(
                G,
                function (qa) {
                  qa.layerDefinition.drawingInfo &&
                    qa.layerDefinition.drawingInfo.renderer &&
                    this._convertSvgRenderer(
                      qa.layerDefinition.drawingInfo.renderer
                    );
                },
                this
              );
              return {
                id: B.id,
                opacity: B.opacity,
                minScale: B.minScale || 0,
                maxScale: B.maxScale || 0,
                featureCollection: { layers: G },
              };
            },
            _getPrintDefinition: function (B, G) {
              var ca = {
                  operationalLayers: this._createOperationalLayers(B, G),
                },
                N = this._vtlExtent || B.extent,
                F = B.spatialReference;
              this._vtlExtent = null;
              B.spatialReference._isWrappable() &&
                ((N = N._normalize(!0)), (F = N.spatialReference));
              N = {
                mapOptions: {
                  showAttribution: B.showAttribution,
                  extent: N.toJson(),
                  spatialReference: F.toJson(),
                },
              };
              G.preserveScale &&
                R.mixin(N.mapOptions, { scale: G.outScale || B.getScale() });
              B.timeExtent &&
                R.mixin(N.mapOptions, {
                  time: [
                    B.timeExtent.startTime.getTime(),
                    B.timeExtent.endTime.getTime(),
                  ],
                });
              B = {};
              R.mixin(B, N, ca);
              return B;
            },
            _createOperationalLayers: function (B, G) {
              var ca,
                N = [],
                F = 0;
              G.preserveScale && (F = G.outScale || B.getScale());
              this.allLayerslegend = this.legendAll ? [] : null;
              this._vtlExtent = null;
              var X = k.map(B.layerIds, B.getLayer, B);
              B._mapImageLyr && X.push(B._mapImageLyr);
              for (ca = 0; ca < X.length; ca++) {
                var x = X[ca];
                if (x.loaded && x.visible && (!F || x.isVisibleAtScale(F))) {
                  var da = x.declaredClass;
                  var ba = {
                    id: x.id,
                    title: R.getObject("arcgisProps.title", !1, x) || x.id,
                    opacity: x.opacity,
                    minScale: x.minScale || 0,
                    maxScale: x.maxScale || 0,
                  };
                  ba = R.mixin(ba, this._getUrlAndToken(x));
                  x.getNode() &&
                    J.get(x.getNode(), "data-reference") &&
                    (ba._isRefLayer = !0);
                  switch (da) {
                    case "esri.layers.ArcGISDynamicMapServiceLayer":
                      var v = [];
                      da = !!x._params.layers;
                      if (x._params.dynamicLayers)
                        (da = G.outScale
                          ? x._getDynLayerObjs(G.outScale)
                          : Z.fromJson(x._params.dynamicLayers)),
                          k.forEach(da, function (ea) {
                            v.push({
                              id: ea.id,
                              name: ea.name,
                              layerDefinition: ea,
                            });
                            delete ea.id;
                            delete ea.name;
                            delete ea.maxScale;
                            delete ea.minScale;
                          }),
                          0 === v.length && (ba.visibleLayers = [-1]);
                      else if (x.supportsDynamicLayers) {
                        if (da || x.layerDefinitions || x.layerTimeOptions) {
                          var n = x.createDynamicLayerInfosFromLayerInfos(),
                            u = null;
                          da && (u = x.visibleLayers);
                          u = A._getVisibleLayers(n, u);
                          var V = A._getLayersForScale(
                            G.outScale || B.getScale(),
                            n
                          );
                          k.forEach(n, function (ea) {
                            if (!ea.subLayerIds) {
                              var ka = ea.id;
                              -1 < k.indexOf(u, ka) &&
                                -1 < k.indexOf(V, ka) &&
                                ((ea = { source: ea.source.toJson() }),
                                x.layerDefinitions &&
                                  x.layerDefinitions[ka] &&
                                  (ea.definitionExpression =
                                    x.layerDefinitions[ka]),
                                x.layerTimeOptions &&
                                  x.layerTimeOptions[ka] &&
                                  (ea.layerTimeOptions =
                                    x.layerTimeOptions[ka].toJson()),
                                v.push({ id: ka, layerDefinition: ea }));
                            }
                          });
                          0 === v.length && (ba.visibleLayers = [-1]);
                        }
                      } else
                        k.forEach(x.layerInfos, function (ea) {
                          var ka = { id: ea.id, layerDefinition: {} };
                          x.layerDefinitions &&
                            x.layerDefinitions[ea.id] &&
                            (ka.layerDefinition.definitionExpression =
                              x.layerDefinitions[ea.id]);
                          x.layerTimeOptions &&
                            x.layerTimeOptions[ea.id] &&
                            (ka.layerDefinition.layerTimeOptions =
                              x.layerTimeOptions[ea.id].toJson());
                          (ka.layerDefinition.definitionExpression ||
                            ka.layerDefinition.layerTimeOptions) &&
                            v.push(ka);
                        }),
                          da &&
                            (ba.visibleLayers = x.visibleLayers.length
                              ? x.visibleLayers
                              : [-1]);
                      v.length && (ba.layers = v);
                      N.push(ba);
                      this.allLayerslegend &&
                        this.allLayerslegend.push({
                          id: x.id,
                          subLayerIds: x.visibleLayers,
                        });
                      break;
                    case "esri.layers.ArcGISImageServiceLayer":
                      ba = R.mixin(ba, {
                        url: x.url,
                        bandIds: x.bandIds,
                        compressionQuality: x.compressionQuality,
                        format: x.format,
                        interpolation: x.interpolation,
                      });
                      x.mosaicRule &&
                        R.mixin(ba, { mosaicRule: x.mosaicRule.toJson() });
                      if (x.renderingRule || x.renderer)
                        this._is11xService
                          ? (x.renderingRule &&
                              (ba.renderingRule = x.renderingRule.toJson()),
                            x.renderer &&
                              ((ba.layerDefinition = ba.layerDefinition || {}),
                              (ba.layerDefinition.drawingInfo =
                                ba.layerDefinition.drawingInfo || {}),
                              (ba.layerDefinition.drawingInfo.renderer =
                                x.renderer.toJson())))
                          : (da = x.getExportImageRenderingRule()) &&
                            R.mixin(ba, { renderingRule: da.toJson() });
                      N.push(ba);
                      this.allLayerslegend &&
                        this.allLayerslegend.push({ id: x.id });
                      break;
                    case "esri.layers.RasterXLayer":
                      this._is11xService &&
                        ((ba = R.mixin(ba, {
                          url: x.url,
                          bandIds: x.bandIds,
                          interpolation: x.interpolation,
                        })),
                        x.renderer &&
                          ((ba.layerDefinition = ba.layerDefinition || {}),
                          (ba.layerDefinition.drawingInfo =
                            ba.layerDefinition.drawingInfo || {}),
                          (ba.layerDefinition.drawingInfo.renderer =
                            x.renderer.toJson())),
                        N.push(ba),
                        this.allLayerslegend &&
                          this.allLayerslegend.push({ id: x.id }));
                      break;
                    case "esri.layers.WMSLayer":
                      ba = R.mixin(ba, {
                        url: x.url,
                        title: x.title,
                        type: "wms",
                        version: x.version,
                        transparentBackground: x.imageTransparency,
                        visibleLayers: x.visibleLayers,
                      });
                      N.push(ba);
                      this.allLayerslegend &&
                        this.allLayerslegend.push({
                          id: x.id,
                          subLayerIds: x.visibleLayers,
                        });
                      break;
                    case "esri.virtualearth.VETiledLayer":
                      da = x.mapStyle;
                      "roadOnDemand" === da
                        ? (da = "Road")
                        : "aerialWithLabelsOnDemand" === da && (da = "Hybrid");
                      ba = R.mixin(ba, {
                        visibility: x.visible,
                        type: "BingMaps" + da,
                        culture: x.culture,
                        key: x.bingMapsKey,
                      });
                      N.push(ba);
                      break;
                    case "esri.layers.OpenStreetMapLayer":
                      ba = R.mixin(ba, {
                        credits: x.copyright,
                        type: "OpenStreetMap",
                        url: f.getAbsoluteUrl(x.tileServers[0]),
                      });
                      N.push(ba);
                      break;
                    case "esri.layers.WMTSLayer":
                      ba = R.mixin(ba, {
                        url: x.url,
                        type: "wmts",
                        layer: x._identifier,
                        style: x._style,
                        format: x.format,
                        tileMatrixSet: x._tileMatrixSetId,
                      });
                      N.push(ba);
                      break;
                    case "esri.layers.MapImageLayer":
                      da = x.getImages();
                      k.forEach(da, function (ea, ka) {
                        ea.visible &&
                          ea.href &&
                          ((ba = {
                            id: x.id + "_image" + ka,
                            type: "image",
                            title: x.id,
                            minScale: x.minScale || 0,
                            maxScale: x.maxScale || 0,
                            opacity: x.opacity * ea.opacity,
                            extent: ea.extent.toJson(),
                          }),
                          "data:image/png;base64," === ea.href.substr(0, 22)
                            ? (ba.imageData = ea.href.substr(22))
                            : (ba.url = ea.href),
                          N.push(ba));
                      });
                      break;
                    case "esri.layers.VectorTileLayer":
                      delete ba.url;
                      delete ba.token;
                      if (
                        this._is11xService &&
                        x.currentStyleInfo.serviceUrl &&
                        x.currentStyleInfo.styleUrl &&
                        ((da =
                          I.id &&
                          I.id.findCredential(x.currentStyleInfo.styleUrl)),
                        (n =
                          I.id &&
                          I.id.findCredential(x.currentStyleInfo.serviceUrl)),
                        (!da && !n) || "2.1.0" !== this._cimVersion)
                      ) {
                        ba.type = "VectorTileLayer";
                        ba.styleUrl = x.currentStyleInfo.styleUrl;
                        da && (ba.token = da.token);
                        n &&
                          n.token !== ba.token &&
                          (ba.additionalTokens = [
                            {
                              url: x.currentStyleInfo.serviceUrl,
                              token: n.token,
                            },
                          ]);
                        N.push(ba);
                        break;
                      }
                      ba.type = "image";
                      da = this._vtlExtent || B.extent.offset(0, 0);
                      var ia = (G.exportOptions && G.exportOptions.dpi) || 96;
                      n = { format: "png", pixelRatio: ia / 96 };
                      "MAP_ONLY" !== G.layout ||
                        !G.preserveScale ||
                        (G.outScale && G.outScale !== B.getScale()) ||
                        96 !== ia ||
                        !G.exportOptions ||
                        (G.exportOptions.width % 2 === B.width % 2 &&
                          G.exportOptions.height % 2 === B.height % 2) ||
                        ((n.area = {
                          x: 0,
                          y: 0,
                          width: B.width,
                          height: B.height,
                        }),
                        G.exportOptions.width % 2 !== B.width % 2 &&
                          --n.area.width,
                        G.exportOptions.height % 2 !== B.height % 2 &&
                          --n.area.height,
                        this._vtlExtent ||
                          ((ia = B.toMap({
                            x: n.area.width,
                            y: n.area.height,
                          })),
                          da.update(
                            da.xmin,
                            ia.y,
                            ia.x,
                            da.ymax,
                            da.spatialReference
                          ),
                          (this._vtlExtent = da)));
                      ba.extent = da._normalize(!0).toJson();
                      da = x.takeScreenshot(n);
                      da.isResolved()
                        ? da.then(function (ea) {
                            "data:image/png;base64," ===
                              ea.dataURL.substr(0, 22) &&
                              (ba.imageData = ea.dataURL.substr(22));
                          })
                        : console.error(
                            "PrintTask: VectorTileLayer.takeScreenshot() returned an unresolved Promise"
                          );
                      ba.imageData && N.push(ba);
                      break;
                    case "esri.layers.WebTiledLayer":
                      da = x.url.replace(/\$\{/g, "{");
                      ba = R.mixin(ba, {
                        type: "WebTiledLayer",
                        urlTemplate: da,
                        credits: x.copyright,
                      });
                      x.subDomains &&
                        0 < x.subDomains.length &&
                        (ba.subDomains = x.subDomains);
                      x._wmtsInfo && (ba.wmtsInfo = x._wmtsInfo);
                      delete ba.url;
                      N.push(ba);
                      break;
                    default:
                      if (x.getTileUrl || x.getImageUrl)
                        (ba = R.mixin(ba, { url: x.url })), N.push(ba);
                  }
                }
              }
              X = k.map(B.graphicsLayerIds, B.getLayer, B);
              for (ca = 0; ca < X.length; ca++)
                (x = X[ca]),
                  x.isFeatureReductionActive &&
                    x.isFeatureReductionActive() &&
                    (x.getSingleGraphics().length
                      ? X.splice(++ca, 0, x.getFeatureReductionLayer())
                      : (X[ca] = x.getFeatureReductionLayer()));
              for (ca = 0; ca < X.length; ca++)
                if (
                  ((x = X[ca]),
                  x.loaded && x.visible && (!F || x.isVisibleAtScale(F)))
                )
                  switch (((da = x.declaredClass), da)) {
                    case "esri.layers.CSVLayer":
                      if (this._is11xService) {
                        ba = {
                          id: x.id,
                          url: x.url,
                          title: x.title,
                          opacity: x.opacity,
                          minScale: x.minScale || 0,
                          maxScale: x.maxScale || 0,
                          type: "CSV",
                          locationInfo: {
                            latitudeFieldName: x.latitudeFieldName,
                            longitudeFieldName: x.longitudeFieldName,
                          },
                          layerDefinition: {
                            drawingInfo: {
                              renderer: x.renderer && x.renderer.toJson(),
                            },
                          },
                        };
                        N.push(ba);
                        break;
                      }
                    case "esri.layers.FeatureLayer":
                    case "esri.layers.LabelLayer":
                    case "esri.layers.StreamLayer":
                      if (
                        ("esri.layers.LabelLayer" === da && !G.showLabels) ||
                        (x.renderer &&
                          "esri.renderer.HeatmapRenderer" ===
                            x.renderer.declaredClass)
                      )
                        continue;
                      da = null;
                      x.url &&
                        x.renderer &&
                        ("esri.renderer.ScaleDependentRenderer" ===
                        x.renderer.declaredClass
                          ? "scale" === x.renderer.rangeType
                            ? (da =
                                x.renderer.getRendererInfoByScale(
                                  B.getScale()
                                ) &&
                                x.renderer.getRendererInfoByScale(B.getScale())
                                  .renderer)
                            : "zoom" === x.renderer.rangeType &&
                              (da =
                                x.renderer.getRendererInfoByZoom(B.getZoom()) &&
                                x.renderer.getRendererInfoByZoom(B.getZoom())
                                  .renderer)
                          : (da = x.renderer));
                      n =
                        da &&
                        "esri.layers.CSVLayer" !== x.declaredClass &&
                        !this._isFeatureCollectionRequired(da, x) &&
                        !da.valueExpression;
                      ia =
                        x.isFeatureReductionActive &&
                        x.isFeatureReductionActive();
                      if (
                        da &&
                        !ia &&
                        "esri.renderer.DotDensityRenderer" !==
                          da.declaredClass &&
                        "esri.layers.StreamLayer" !== x.declaredClass &&
                        (this._is11xService || n) &&
                        ("esri.renderer.SimpleRenderer" === da.declaredClass ||
                          "esri.renderer.TemporalRenderer" ===
                            da.declaredClass ||
                          null == da.attributeField ||
                          (R.isString(da.attributeField) &&
                            x._getField(da.attributeField, !0)))
                      )
                        if (
                          ((ba = {
                            id: x.id,
                            title:
                              R.getObject("arcgisProps.title", !1, x) || x.id,
                            opacity: x.opacity,
                            minScale: x.minScale || 0,
                            maxScale: x.maxScale || 0,
                            layerDefinition: {
                              drawingInfo: {
                                renderer: da.toJson({
                                  useLegacyRotationProperties:
                                    !this._is11xService,
                                }),
                              },
                            },
                          }),
                          (ba = R.mixin(ba, this._getUrlAndToken(x))),
                          "esri.renderer.TemporalRenderer" ===
                            da.declaredClass &&
                            ((n = ba.layerDefinition.drawingInfo),
                            (n.latestObservationRenderer =
                              n.renderer.latestObservationRenderer),
                            (n.trackLinesRenderer = n.renderer.trackRenderer),
                            (n.observationAger = n.renderer.observationAger),
                            (n.renderer = n.renderer.observationRenderer),
                            x._trackIdField &&
                              (ba.layerDefinition.timeInfo = {
                                trackIdField: x._trackIdField,
                              })),
                          this._convertSvgRenderer(
                            ba.layerDefinition.drawingInfo.renderer
                          ),
                          this._is11xService ||
                            1 > x.opacity ||
                            "esri.renderer.TemporalRenderer" ===
                              da.declaredClass ||
                            this._updateLayerOpacity(ba))
                        )
                          if (
                            (x._params.source &&
                              ((da = x._params.source.toJson()),
                              R.mixin(ba.layerDefinition, { source: da })),
                            x.getDefinitionExpression() &&
                              R.mixin(ba.layerDefinition, {
                                definitionExpression:
                                  x.getDefinitionExpression(),
                              }),
                            2 !== x.mode)
                          )
                            0 < x.getSelectedFeatures().length &&
                              ((da = k.map(
                                x.getSelectedFeatures(),
                                function (ea) {
                                  return ea.attributes[x.objectIdField];
                                }
                              )),
                              0 < da.length &&
                                x.getSelectionSymbol() &&
                                R.mixin(ba, {
                                  selectionObjectIds: da,
                                  selectionSymbol: x
                                    .getSelectionSymbol()
                                    .toJson(),
                                }));
                          else {
                            da = k.map(x.getSelectedFeatures(), function (ea) {
                              return ea.attributes[x.objectIdField];
                            });
                            if (0 === da.length || !x._params.drawMode) break;
                            R.mixin(ba.layerDefinition, { objectIds: da });
                            da = null;
                            x.getSelectionSymbol() &&
                              (da = new d(x.getSelectionSymbol()));
                            R.mixin(ba.layerDefinition.drawingInfo, {
                              renderer: da && da.toJson(),
                            });
                          }
                        else ba = this._createFeatureCollection(x, B, null, G);
                      else
                        ba =
                          da &&
                          (da.valueExpression ||
                            this._isFeatureCollectionRequired(da, x) ||
                            "esri.renderer.DotDensityRenderer" ===
                              da.declaredClass)
                            ? this._createFeatureCollection(x, B, da, G)
                            : this._createFeatureCollection(x, B, null, G);
                      if (!ba) continue;
                      N.push(ba);
                      this.allLayerslegend &&
                        this.allLayerslegend.push({ id: x.id });
                      break;
                    case "esri.layers._GraphicsLayer":
                    case "esri.layers.GraphicsLayer":
                    case "esri.layers.WFSLayer":
                      ba = this._createFeatureCollection(x, B, null, G);
                      if (!ba) continue;
                      N.push(ba);
                      this.allLayerslegend &&
                        this.allLayerslegend.push({ id: x.id });
                      break;
                    case "esri.layers.ArcGISImageServiceVectorLayer":
                      (ba = {
                        id: x.id,
                        title: R.getObject("arcgisProps.title", !1, x) || x.id,
                        opacity: x.opacity,
                        minScale: x.minScale || 0,
                        maxScale: x.maxScale || 0,
                        visibility: x.visible,
                        symbolTileSize: x.symbolTileSize,
                        layerDefinition: {
                          drawingInfo: {
                            renderer: x.renderer.toJson({
                              useLegacyRotationProperties: !this._is11xService,
                            }),
                          },
                        },
                      }),
                        (ba = R.mixin(ba, this._getUrlAndToken(x))),
                        x.mosaicRule &&
                          R.mixin(ba, { mosaicRule: x.mosaicRule.toJson() }),
                        N.push(ba),
                        this.allLayerslegend &&
                          this.allLayerslegend.push({ id: x.id });
                  }
              F &&
                k.forEach(N, function (ea) {
                  ea.minScale = 0;
                  ea.maxScale = 0;
                });
              B.graphics &&
                0 < B.graphics.graphics.length &&
                (ba = this._createFeatureCollection(B.graphics, B, null, G)) &&
                N.push(ba);
              B._labels &&
                G.showLabels &&
                (ba = this._createFeatureCollection(B._labels, B, null, G)) &&
                N.push(ba);
              k.forEach(N, function (ea, ka, qa) {
                ea._isRefLayer &&
                  (delete ea._isRefLayer, qa.splice(ka, 1), qa.push(ea));
              });
              return N;
            },
            _getUrlAndToken: function (B) {
              return { token: B._getToken(), url: B._url ? B._url.path : null };
            },
            _updateLayerOpacity: function (B) {
              var G = this._colorEvaluator(B);
              G = k.filter(G, function (X) {
                return R.isArray(X) && 4 === X.length;
              });
              var ca = !0;
              if (G.length) {
                var N = G[0][3],
                  F;
                for (F = 1; F < G.length; F++)
                  if (N !== G[F][3]) {
                    ca = !1;
                    break;
                  }
                if (ca)
                  for (B.opacity = N / 255, F = 0; F < G.length; F++)
                    G[F][3] = 255;
              }
              return ca;
            },
            _isFeatureCollectionRequired: function (B, G) {
              if (
                G &&
                G.isFeatureReductionActive &&
                G.isFeatureReductionActive()
              )
                return !0;
              var ca = !1;
              if ((G = this._getVariable(B, "rotationInfo", !1)))
                ca = ((ca = G.field) && R.isFunction(ca)) || G.valueExpression;
              return (
                B.hasVisualVariables("sizeInfo") ||
                B.hasVisualVariables("colorInfo") ||
                B.hasVisualVariables("opacityInfo") ||
                ca
              );
            },
            _getVariable: function (B, G, ca) {
              if (B) var N = (B = B.getVisualVariablesForType(G, ca)) && B[0];
              return N;
            },
            _applyVisualVariables: function (B, G) {
              var ca = G.renderer,
                N = G.graphic,
                F = G.symbol,
                X = G.mapResolution,
                x = G.mapScale,
                da = F.type;
              if ("textsymbol" !== da && "shieldlabelsymbol" !== da) {
                var ba = this._getVariable(ca, "sizeInfo", !1),
                  v = this._getVariable(ca, "colorInfo", !1),
                  n = this._getVariable(ca, "opacityInfo", !1);
                G = this._getVariable(ca, "rotationInfo", !1);
                F instanceof q &&
                  (ba = this._getVariable(ca, "sizeInfo", "outline") || ba);
                X = ba
                  ? ca.getSize(N, {
                      sizeInfo: ba,
                      shape: "simplemarkersymbol" === da ? F.style : null,
                      resolution: X,
                      scale: x,
                    })
                  : N.size;
                null != X &&
                  ("simplemarkersymbol" === da
                    ? (B.size = T.px2pt(X))
                    : "picturemarkersymbol" === da
                    ? ((x = (F.width / F.height) * X),
                      (B.width = T.px2pt(x)),
                      (B.height = T.px2pt(X)),
                      0 !== F.xoffset &&
                        (B.xoffset = T.px2pt((F.xoffset / F.width) * x)),
                      0 !== F.yoffset &&
                        (B.yoffset = T.px2pt((F.yoffset / F.height) * X)))
                    : "simplelinesymbol" === da
                    ? (B.width = T.px2pt(X))
                    : B.outline && (B.outline.width = T.px2pt(X)));
                v &&
                  (!(F = ca.getColor(N, { colorInfo: v })) ||
                    ("simplemarkersymbol" !== da &&
                      "simplelinesymbol" !== da &&
                      "simplefillsymbol" !== da) ||
                    (B.color = z.toJsonColor(F)));
                n &&
                  ((F = ca.getOpacity(N, { opacityInfo: n })),
                  null != F && B.color && (B.color[3] = Math.round(255 * F)));
                G &&
                  (ca = ca.getRotationAngle(N, { rotationInfo: G })) &&
                  (B.angle = -ca);
              }
            },
          });
          O("extend-esri") && R.setObject("tasks.PrintTask", C, I);
          return C;
        }
      );
    },
    "esri/tasks/Geoprocessor": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/Deferred dojo/_base/json dojo/has dojo/io-query ../kernel ../request ../deferredUtils ../geometry/normalizeUtils ./Task ./FeatureSet ./JobInfo ./GPMessage ./LinearUnit ./DataFile ./RasterData ./Date ./ParameterValue ./GPResultImageLayer ../layers/ArcGISDynamicMapServiceLayer ../layers/MapImage".split(
          " "
        ),
        function (
          C,
          R,
          k,
          Z,
          U,
          O,
          I,
          E,
          A,
          m,
          z,
          g,
          f,
          c,
          d,
          q,
          t,
          l,
          y,
          J,
          H,
          T,
          Q
        ) {
          C = C(g, {
            declaredClass: "esri.tasks.Geoprocessor",
            _eventMap: {
              "execute-complete": ["results", "messages"],
              "get-result-data-complete": ["result"],
              "get-result-image-complete": ["mapImage"],
              "get-result-image-layer-complete": ["layer"],
              "job-cancel": ["jobInfo"],
              "job-complete": ["jobInfo"],
              "status-update": ["jobInfo"],
            },
            constructor: function (M) {
              this._jobUpdateHandler = R.hitch(this, this._jobUpdateHandler);
              this._getJobStatus = R.hitch(this, this._getJobStatus);
              this._getResultDataHandler = R.hitch(
                this,
                this._getResultDataHandler
              );
              this._getResultImageHandler = R.hitch(
                this,
                this._getResultImageHandler
              );
              this._executeHandler = R.hitch(this, this._executeHandler);
              this._updateTimers = [];
              this.registerConnectEvents();
            },
            updateDelay: 1e3,
            processSpatialReference: null,
            outputSpatialReference: null,
            outSpatialReference: null,
            setUpdateDelay: function (M) {
              this.updateDelay = M;
            },
            setProcessSpatialReference: function (M) {
              this.processSpatialReference = M;
            },
            setOutputSpatialReference: function (M) {
              this._setOutSR(M);
            },
            setOutSpatialReference: function (M) {
              this._setOutSR(M);
            },
            __msigns: [
              { n: "execute", c: 3, a: [{ i: 0, p: ["*"] }], e: 2, f: 1 },
              { n: "submitJob", c: 4, a: [{ i: 0, p: ["*"] }], e: 3 },
            ],
            _setOutSR: function (M) {
              this.outSpatialReference = this.outputSpatialReference = M;
            },
            _getOutSR: function () {
              return this.outSpatialReference || this.outputSpatialReference;
            },
            _gpEncode: function (M, B, G) {
              for (var ca in M) {
                var N = M[ca];
                R.isArray(N)
                  ? (M[ca] = U.toJson(
                      k.map(
                        N,
                        function (F) {
                          return this._gpEncode({ item: F }, !0).item;
                        },
                        this
                      )
                    ))
                  : N instanceof Date && (M[ca] = N.getTime());
              }
              return this._encode(M, B, G);
            },
            _decode: function (M) {
              var B = M.dataType,
                G = new J(M);
              if (
                -1 !==
                k.indexOf(["GPBoolean", "GPDouble", "GPLong", "GPString"], B)
              )
                return G;
              if ("GPLinearUnit" === B) G.value = new q(G.value);
              else if ("GPFeatureRecordSetLayer" === B || "GPRecordSet" === B)
                G.value = new f(G.value);
              else if ("GPDataFile" === B) G.value = new t(G.value);
              else if ("GPDate" === B)
                (M = G.value),
                  R.isString(M)
                    ? (G.value = new y({ date: M }))
                    : (G.value = new Date(M));
              else if ("GPRasterData" === B || "GPRasterDataLayer" === B)
                (M = M.value.mapImage),
                  (G.value = M ? new Q(M) : new l(G.value));
              else if (-1 !== B.indexOf("GPMultiValue:")) {
                var ca = B.split(":")[1];
                M = G.value;
                G.value = k.map(
                  M,
                  function (N) {
                    return this._decode({
                      paramName: "_name",
                      dataType: ca,
                      value: N,
                    }).value;
                  },
                  this
                );
              } else
                console.log(
                  this.declaredClass +
                    " : GP Data type not handled. : " +
                    G.dataType
                ),
                  (G = null);
              return G;
            },
            submitJob: function (M, B, G, ca, N) {
              var F = this._getOutSR(),
                X = N.assembly;
              M = this._gpEncode(
                R.mixin(
                  {},
                  this._url.query,
                  {
                    f: "json",
                    "env:outSR": F ? F.wkid || U.toJson(F.toJson()) : null,
                    "env:processSR": this.processSpatialReference
                      ? this.processSpatialReference.wkid ||
                        U.toJson(this.processSpatialReference.toJson())
                      : null,
                  },
                  M
                ),
                null,
                X && X[0]
              );
              var x = this._jobUpdateHandler,
                da = this._errorHandler;
              return A({
                url: this._url.path + "/submitJob",
                content: M,
                callbackParamName: "callback",
                load: function (ba, v) {
                  x(ba, v, !1, B, G, N.dfd);
                },
                error: function (ba) {
                  da(ba, ca, N.dfd);
                },
              });
            },
            _jobUpdateHandler: function (M, B, G, ca, N, F) {
              var X = M.jobId;
              B = new c(M);
              this._successHandler([B], "onStatusUpdate", N, G && F);
              if (!G)
                switch (
                  (clearTimeout(this._updateTimers[X]),
                  (this._updateTimers[X] = null),
                  F && F.progress(B),
                  M.jobStatus)
                ) {
                  case c.STATUS_SUBMITTED:
                  case c.STATUS_EXECUTING:
                  case c.STATUS_WAITING:
                  case c.STATUS_NEW:
                    var x = this._getJobStatus;
                    this._updateTimers[X] = setTimeout(function () {
                      x(X, G, ca, N, F);
                    }, this.updateDelay);
                    break;
                  default:
                    this._successHandler([B], "onJobComplete", ca, F);
                }
            },
            _getJobStatus: function (M, B, G, ca, N) {
              var F = this._jobUpdateHandler;
              A({
                url: this._url.path + "/jobs/" + M,
                content: R.mixin({}, this._url.query, { f: "json" }),
                callbackParamName: "callback",
                load: function (X, x) {
                  F(X, x, B, G, ca, N);
                },
                error: this._errorHandler,
              });
            },
            _getResultDataHandler: function (M, B, G, ca, N) {
              try {
                var F = this._decode(M);
                this._successHandler([F], "onGetResultDataComplete", G, N);
              } catch (X) {
                this._errorHandler(X, ca, N);
              }
            },
            getResultData: function (M, B, G, ca) {
              var N = this._getResultDataHandler,
                F = this._errorHandler,
                X = new Z(m._dfdCanceller);
              X._pendingDfd = A({
                url: this._url.path + "/jobs/" + M + "/results/" + B,
                content: R.mixin({}, this._url.query, {
                  f: "json",
                  returnType: "data",
                }),
                callbackParamName: "callback",
                load: function (x, da) {
                  N(x, da, G, ca, X);
                },
                error: function (x) {
                  F(x, ca, X);
                },
              });
              return X;
            },
            checkJobStatus: function (M, B, G) {
              var ca = this._jobUpdateHandler,
                N = this._errorHandler,
                F = new Z(m._dfdCanceller);
              F._pendingDfd = A({
                url: this._url.path + "/jobs/" + M,
                content: R.mixin({}, this._url.query, { f: "json" }),
                callbackParamName: "callback",
                load: function (X, x) {
                  ca(X, x, !0, null, B, F);
                },
                error: function (X) {
                  N(X, G, F);
                },
              });
              return F;
            },
            cancelJob: function (M, B, G) {
              var ca = this._errorHandler,
                N = new Z(m._dfdCanceller);
              N._pendingDfd = A({
                url: this._url.path + "/jobs/" + M + "/cancel",
                content: R.mixin({}, this._url.query, { f: "json" }),
                callbackParamName: "callback",
                load: R.hitch(this, function (F, X) {
                  this._successHandler([F], "onJobCancel", B, N);
                }),
                error: function (F) {
                  ca(F, G, N);
                },
              });
              return N;
            },
            execute: function (M, B, G, ca) {
              var N = this._getOutSR(),
                F = ca.assembly;
              M = this._gpEncode(
                R.mixin(
                  {},
                  this._url.query,
                  {
                    f: "json",
                    "env:outSR": N ? N.wkid || U.toJson(N.toJson()) : null,
                    "env:processSR": this.processSpatialReference
                      ? this.processSpatialReference.wkid ||
                        U.toJson(this.processSpatialReference.toJson())
                      : null,
                  },
                  M
                ),
                null,
                F && F[0]
              );
              var X = this._executeHandler,
                x = this._errorHandler;
              return A({
                url: this._url.path + "/execute",
                content: M,
                callbackParamName: "callback",
                load: function (da, ba) {
                  X(da, ba, B, G, ca.dfd);
                },
                error: function (da) {
                  x(da, G, ca.dfd);
                },
              });
            },
            _executeHandler: function (M, B, G, ca, N) {
              try {
                var F = M.results,
                  X,
                  x = M.messages;
                var da = 0;
                for (X = F.length; da < X; da++) F[da] = this._decode(F[da]);
                da = 0;
                for (X = x.length; da < X; da++) x[da] = new d(x[da]);
                this._successHandler([F, x], "onExecuteComplete", G, N);
              } catch (ba) {
                this._errorHandler(ba, ca, N);
              }
            },
            _getResultImageHandler: function (M, B, G, ca, N) {
              try {
                var F = this._decode(M);
                this._successHandler([F], "onGetResultImageComplete", G, N);
              } catch (X) {
                this._errorHandler(X, ca, N);
              }
            },
            getResultImage: function (M, B, G, ca, N) {
              var F = this._getResultImageHandler,
                X = this._errorHandler;
              G = this._gpEncode(
                R.mixin({}, this._url.query, { f: "json" }, G.toJson())
              );
              var x = new Z(m._dfdCanceller);
              x._pendingDfd = A({
                url: this._url.path + "/jobs/" + M + "/results/" + B,
                content: G,
                callbackParamName: "callback",
                load: function (da, ba) {
                  F(da, ba, ca, N, x);
                },
                error: function (da) {
                  X(da, N, x);
                },
              });
              return x;
            },
            cancelJobStatusUpdates: function (M) {
              clearTimeout(this._updateTimers[M]);
              this._updateTimers[M] = null;
            },
            getResultImageLayer: function (M, B, G, ca) {
              if (null == B) {
                var N = this._url.path.indexOf("/GPServer/");
                M = this._url.path.substring(0, N) + "/MapServer/jobs/" + M;
              } else M = this._url.path + "/jobs/" + M + "/results/" + B;
              this._url.query && (M += "?" + I.objectToQuery(this._url.query));
              B =
                null == B
                  ? new T(M, { imageParameters: G })
                  : new H(M, { imageParameters: G }, !0);
              this.onGetResultImageLayerComplete(B);
              ca && ca(B);
              return B;
            },
            onStatusUpdate: function () {},
            onJobComplete: function () {},
            onExecuteComplete: function () {},
            onGetResultDataComplete: function () {},
            onGetResultImageComplete: function () {},
            onGetResultImageLayerComplete: function () {},
            onJobCancel: function () {},
          });
          z._createWrappers(C);
          O("extend-esri") && R.setObject("tasks.Geoprocessor", C, E);
          return C;
        }
      );
    },
    "esri/tasks/JobInfo": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
        "./GPMessage",
      ], function (C, R, k, Z, U) {
        C = C(null, {
          declaredClass: "esri.tasks.JobInfo",
          constructor: function (O) {
            this.messages = [];
            R.mixin(this, O);
            O = this.messages;
            var I,
              E = O.length;
            for (I = 0; I < E; I++) O[I] = new U(O[I]);
          },
          jobId: "",
          jobStatus: "",
        });
        R.mixin(C, {
          STATUS_CANCELLED: "esriJobCancelled",
          STATUS_CANCELLING: "esriJobCancelling",
          STATUS_DELETED: "esriJobDeleted",
          STATUS_DELETING: "esriJobDeleting",
          STATUS_EXECUTING: "esriJobExecuting",
          STATUS_FAILED: "esriJobFailed",
          STATUS_NEW: "esriJobNew",
          STATUS_SUBMITTED: "esriJobSubmitted",
          STATUS_SUCCEEDED: "esriJobSucceeded",
          STATUS_TIMED_OUT: "esriJobTimedOut",
          STATUS_WAITING: "esriJobWaiting",
        });
        k("extend-esri") && R.setObject("tasks.JobInfo", C, Z);
        return C;
      });
    },
    "esri/tasks/GPMessage": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.GPMessage",
          constructor: function (U) {
            R.mixin(this, U);
          },
        });
        R.mixin(C, {
          TYPE_INFORMATIVE: "esriJobMessageTypeInformative",
          TYPE_PROCESS_DEFINITION: "esriJobMessageTypeProcessDefinition",
          TYPE_PROCESS_START: "esriJobMessageTypeProcessStart",
          TYPE_PROCESS_STOP: "esriJobMessageTypeProcessStop",
          TYPE_WARNING: "esriJobMessageTypeWarning",
          TYPE_ERROR: "esriJobMessageTypeError",
          TYPE_EMPTY: "esriJobMessageTypeEmpty",
          TYPE_ABORT: "esriJobMessageTypeAbort",
        });
        k("extend-esri") && R.setObject("tasks.GPMessage", C, Z);
        return C;
      });
    },
    "esri/tasks/LinearUnit": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.LinearUnit",
          constructor: function (U) {
            U && R.mixin(this, U);
          },
          distance: 0,
          units: null,
          toJson: function () {
            var U = {};
            this.distance && (U.distance = this.distance);
            this.units && (U.units = this.units);
            return U;
          },
        });
        k("extend-esri") && R.setObject("tasks.LinearUnit", C, Z);
        return C;
      });
    },
    "esri/tasks/DataFile": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.DataFile",
          constructor: function (U) {
            U && R.mixin(this, U);
          },
          url: null,
          itemID: null,
          toJson: function () {
            var U = {};
            this.url && (U.url = this.url);
            this.itemID && (U.itemID = this.itemID);
            return U;
          },
        });
        k("extend-esri") && R.setObject("tasks.DataFile", C, Z);
        return C;
      });
    },
    "esri/tasks/RasterData": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.RasterData",
          constructor: function (U) {
            U && R.mixin(this, U);
          },
          url: null,
          format: null,
          itemID: null,
          toJson: function () {
            var U = {};
            this.url && (U.url = this.url);
            this.format && (U.format = this.format);
            this.itemID && (U.itemID = this.itemID);
            return U;
          },
        });
        k("extend-esri") && R.setObject("tasks.RasterData", C, Z);
        return C;
      });
    },
    "esri/tasks/Date": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/date/locale",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z, U) {
        C = C(null, {
          declaredClass: "esri.tasks.Date",
          constructor: function (O) {
            O &&
              (O.format && (this.format = O.format),
              (this.date = k.parse(O.date, {
                selector: "date",
                datePattern: this.format,
              })));
          },
          date: new Date(),
          format: "EEE MMM dd HH:mm:ss zzz yyyy",
          toJson: function () {
            return {
              date: k.format(this.date, {
                selector: "date",
                datePattern: this.format,
              }),
              format: this.format,
            };
          },
        });
        Z("extend-esri") && R.setObject("tasks.Date", C, U);
        return C;
      });
    },
    "esri/tasks/ParameterValue": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.ParameterValue",
          constructor: function (U) {
            R.mixin(this, U);
          },
        });
        k("extend-esri") && R.setObject("tasks.ParameterValue", C, Z);
        return C;
      });
    },
    "esri/tasks/GPResultImageLayer": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/json dojo/has dojo/io-query ../kernel ../layers/ArcGISDynamicMapServiceLayer".split(
          " "
        ),
        function (C, R, k, Z, U, O, I) {
          C = C(I, {
            declaredClass: "esri.tasks._GPResultImageLayer",
            constructor: function (E, A) {
              A &&
                A.imageParameters &&
                A.imageParameters.extent &&
                ((this.initialExtent = this.fullExtent =
                  A.imageParameters.extent),
                (this.spatialReference = this.initialExtent.spatialReference));
              this.getImageUrl = R.hitch(this, this.getImageUrl);
              this.loaded = !0;
              this.onLoad(this);
            },
            getImageUrl: function (E, A, m, z) {
              var g = E.spatialReference.wkid;
              z(
                this._url.path +
                  "?" +
                  U.objectToQuery(
                    R.mixin(this._params, {
                      f: "image",
                      bbox: k.toJson(E.toJson()),
                      bboxSR: g,
                      imageSR: g,
                      size: A + "," + m,
                    })
                  )
              );
            },
          });
          Z("extend-esri") && R.setObject("tasks._GPResultImageLayer", C, O);
          return C;
        }
      );
    },
    "esri/tasks/PrintTemplate": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.PrintTemplate",
          label: null,
          exportOptions: { width: 800, height: 1100, dpi: 96 },
          layoutOptions: null,
          format: "PNG32",
          layout: "MAP_ONLY",
          outScale: 0,
          preserveScale: !0,
          forceFeatureAttributes: !1,
          showAttribution: null,
          showLabels: !0,
        });
        k("extend-esri") && R.setObject("tasks.PrintTemplate", C, Z);
        return C;
      });
    },
    "dojox/gfx/canvas": function () {
      define(
        "./_base dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/_base/window dojo/dom-geometry dojo/dom ./shape ./path ./arc ./matrix ./decompose ./bezierutils".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g, f) {
          function c(v, n, u, V, ia, ea, ka, qa, pa, xa) {
            var ya = n.length,
              Ea = 0;
            if (xa) {
              var e = xa.l / ia;
              Ea = xa.i;
            } else e = n[0] / ia;
            for (; ea < ka; ) {
              if (ea + e > ka) {
                var D = { l: (ea + e - ka) * ia, i: Ea };
                e = ka - ea;
              }
              Ea % 2 ||
                (v.beginPath(),
                v.arc(u, V, ia, ea, ea + e, qa),
                pa && v.stroke());
              ea += e;
              ++Ea;
              e = n[Ea % ya] / ia;
            }
            return D;
          }
          function d(v, n, u, V) {
            var ia = 0,
              ea = 0,
              ka = 0;
            if (V) {
              var qa = V.l;
              ka = V.i;
            } else qa = n[0];
            for (; 1 > ea; )
              (ea = f.tAtLength(v, qa)),
                1 == ea &&
                  ((ia = f.computeLength(v)), (ia = { l: qa - ia, i: ka })),
                (v = f.splitBezierAtT(v, ea)),
                ka % 2 || u.push(v[0]),
                (v = v[1]),
                ++ka,
                (qa = n[ka % n.length]);
            return ia;
          }
          function q(v, n, u, V) {
            var ia = [n.last.x, n.last.y].concat(u),
              ea = !(v instanceof Array);
            u = 4 === u.length ? "quadraticCurveTo" : "bezierCurveTo";
            var ka = [];
            n = d(ia, n.canvasDash, ka, V);
            for (V = 0; V < ka.length; ++V)
              (ia = ka[V]),
                ea
                  ? (v.moveTo(ia[0], ia[1]), v[u].apply(v, ia.slice(2)))
                  : (v.push("moveTo", [ia[0], ia[1]]), v.push(u, ia.slice(2)));
            return n;
          }
          function t(v, n, u, V, ia, ea, ka) {
            var qa = 0,
              pa = 0,
              xa = 0,
              ya = f.distance(u, V, ia, ea),
              Ea = 0;
            n = n.canvasDash;
            var e = u,
              D = V,
              P = !(v instanceof Array);
            ka ? ((xa = ka.l), (Ea = ka.i)) : (xa += n[0]);
            for (; 0.01 < Math.abs(1 - pa); ) {
              xa > ya && ((qa = { l: xa - ya, i: Ea }), (xa = ya));
              pa = xa / ya;
              ka = u + (ia - u) * pa;
              var L = V + (ea - V) * pa;
              Ea++ % 2 ||
                (P
                  ? (v.moveTo(e, D), v.lineTo(ka, L))
                  : (v.push("moveTo", [e, D]), v.push("lineTo", [ka, L])));
              e = ka;
              D = L;
              xa += n[Ea % n.length];
            }
            return qa;
          }
          var l = (C.canvas = {}),
            y = null,
            J = z.multiplyPoint,
            H = Math.PI,
            T = 2 * H,
            Q = H / 2;
          g = R.extend;
          if (U.global.CanvasRenderingContext2D) {
            U = U.doc.createElement("canvas").getContext("2d");
            var M = "function" == typeof U.setLineDash,
              B = "function" == typeof U.fillText;
          }
          var G = {
            solid: "none",
            shortdash: [4, 1],
            shortdot: [1, 1],
            shortdashdot: [4, 1, 1, 1],
            shortdashdotdot: [4, 1, 1, 1, 1, 1],
            dot: [1, 3],
            dash: [4, 3],
            longdash: [8, 3],
            dashdot: [4, 3, 1, 3],
            longdashdot: [8, 3, 1, 3],
            longdashdotdot: [8, 3, 1, 3, 1, 3],
          };
          l.Shape = Z("dojox.gfx.canvas.Shape", E.Shape, {
            _render: function (v) {
              v.save();
              this._renderTransform(v);
              this._renderClip(v);
              this._renderShape(v);
              this._renderFill(v, !0);
              this._renderStroke(v, !0);
              v.restore();
            },
            _renderClip: function (v) {
              this.canvasClip && (this.canvasClip.render(v), v.clip());
            },
            _renderTransform: function (v) {
              if ("canvasTransform" in this) {
                var n = this.canvasTransform;
                v.translate(n.dx, n.dy);
                v.rotate(n.angle2);
                v.scale(n.sx, n.sy);
                v.rotate(n.angle1);
              }
            },
            _renderShape: function (v) {},
            _renderFill: function (v, n) {
              if ("canvasFill" in this) {
                var u = this.fillStyle;
                if ("canvasFillImage" in this) {
                  var V = u.width,
                    ia = u.height,
                    ea = this.canvasFillImage.width,
                    ka = this.canvasFillImage.height,
                    qa = Math.min(V == ea ? 1 : V / ea, ia == ka ? 1 : ia / ka),
                    pa = (V - qa * ea) / 2,
                    xa = (ia - qa * ka) / 2;
                  y.width = V;
                  y.height = ia;
                  var ya = y.getContext("2d");
                  ya.clearRect(0, 0, V, ia);
                  ya.drawImage(
                    this.canvasFillImage,
                    0,
                    0,
                    ea,
                    ka,
                    pa,
                    xa,
                    qa * ea,
                    qa * ka
                  );
                  this.canvasFill = v.createPattern(y, "repeat");
                  delete this.canvasFillImage;
                }
                v.fillStyle = this.canvasFill;
                n &&
                  ("pattern" !== u.type ||
                    (0 === u.x && 0 === u.y) ||
                    v.translate(u.x, u.y),
                  v.fill());
              } else v.fillStyle = "rgba(0,0,0,0.0)";
            },
            _renderStroke: function (v, n) {
              var u = this.strokeStyle;
              u
                ? ((v.strokeStyle = u.color.toString()),
                  (v.lineWidth = u.width),
                  (v.lineCap = u.cap),
                  "number" == typeof u.join
                    ? ((v.lineJoin = "miter"), (v.miterLimit = u.join))
                    : (v.lineJoin = u.join),
                  this.canvasDash
                    ? M
                      ? (v.setLineDash(this.canvasDash), n && v.stroke())
                      : this._renderDashedStroke(v, n)
                    : n && v.stroke())
                : n || (v.strokeStyle = "rgba(0,0,0,0.0)");
            },
            _renderDashedStroke: function (v, n) {},
            getEventSource: function () {
              return null;
            },
            on: function () {},
            connect: function () {},
            disconnect: function () {},
            canvasClip: null,
            setClip: function (v) {
              this.inherited(arguments);
              var n = v
                ? "width" in v
                  ? "rect"
                  : "cx" in v
                  ? "ellipse"
                  : "points" in v
                  ? "polyline"
                  : "d" in v
                  ? "path"
                  : null
                : null;
              if (v && !n) return this;
              this.canvasClip = v ? ca(n, v) : null;
              this.parent && this.parent._makeDirty();
              return this;
            },
          });
          var ca = function (v, n) {
              switch (v) {
                case "ellipse":
                  return {
                    canvasEllipse: x({ shape: n }),
                    render: function (u) {
                      return l.Ellipse.prototype._renderShape.call(this, u);
                    },
                  };
                case "rect":
                  return {
                    shape: R.delegate(n, { r: 0 }),
                    render: function (u) {
                      return l.Rect.prototype._renderShape.call(this, u);
                    },
                  };
                case "path":
                  return {
                    canvasPath: N(n),
                    render: function (u) {
                      this.canvasPath._renderShape(u);
                    },
                  };
                case "polyline":
                  return {
                    canvasPolyline: n.points,
                    render: function (u) {
                      return l.Polyline.prototype._renderShape.call(this, u);
                    },
                  };
              }
              return null;
            },
            N = function (v) {
              var n = new dojox.gfx.canvas.Path();
              n.canvasPath = [];
              n._setPath(v.d);
              return n;
            },
            F = function (v, n, u) {
              var V = v.prototype[n];
              v.prototype[n] = u
                ? function () {
                    this.parent && this.parent._makeDirty();
                    V.apply(this, arguments);
                    u.call(this);
                    return this;
                  }
                : function () {
                    this.parent && this.parent._makeDirty();
                    return V.apply(this, arguments);
                  };
            };
          F(l.Shape, "setTransform", function () {
            this.matrix
              ? (this.canvasTransform = C.decompose(this.matrix))
              : delete this.canvasTransform;
          });
          F(l.Shape, "setFill", function () {
            var v = this.fillStyle;
            if (v) {
              if ("object" == typeof v && "type" in v) {
                var n = this.surface.rawNode.getContext("2d");
                switch (v.type) {
                  case "linear":
                  case "radial":
                    var u =
                      "linear" == v.type
                        ? n.createLinearGradient(v.x1, v.y1, v.x2, v.y2)
                        : n.createRadialGradient(
                            v.cx,
                            v.cy,
                            0,
                            v.cx,
                            v.cy,
                            v.r
                          );
                    k.forEach(v.colors, function (V) {
                      u.addColorStop(
                        V.offset,
                        C.normalizeColor(V.color).toString()
                      );
                    });
                    break;
                  case "pattern":
                    y || (y = document.createElement("canvas")),
                      (n = new Image()),
                      this.surface.downloadImage(n, v.src),
                      (this.canvasFillImage = n);
                }
              } else u = v.toString();
              this.canvasFill = u;
            } else delete this.canvasFill;
          });
          F(l.Shape, "setStroke", function () {
            var v = this.strokeStyle;
            if (v) {
              var n = this.strokeStyle.style.toLowerCase();
              n in G && (n = G[n]);
              if (n instanceof Array) {
                this.canvasDash = n = n.slice();
                var u;
                for (u = 0; u < n.length; ++u) n[u] *= v.width;
                if ("butt" != v.cap) {
                  for (u = 0; u < n.length; u += 2)
                    (n[u] -= v.width), 1 > n[u] && (n[u] = 1);
                  for (u = 1; u < n.length; u += 2) n[u] += v.width;
                }
              } else delete this.canvasDash;
            } else delete this.canvasDash;
            this._needsDash = !M && !!this.canvasDash;
          });
          F(l.Shape, "setShape");
          l.Group = Z("dojox.gfx.canvas.Group", l.Shape, {
            constructor: function () {
              E.Container._init.call(this);
            },
            _render: function (v) {
              v.save();
              this._renderTransform(v);
              this._renderClip(v);
              for (var n = 0; n < this.children.length; ++n)
                this.children[n]._render(v);
              v.restore();
            },
            destroy: function () {
              E.Container.clear.call(this, !0);
              l.Shape.prototype.destroy.apply(this, arguments);
            },
          });
          l.Rect = Z("dojox.gfx.canvas.Rect", [l.Shape, E.Rect], {
            _renderShape: function (v) {
              var n = this.shape,
                u = Math.min(n.r, n.height / 2, n.width / 2),
                V = n.x,
                ia = V + n.width,
                ea = n.y;
              n = ea + n.height;
              var ka = V + u,
                qa = ia - u,
                pa = ea + u,
                xa = n - u;
              v.beginPath();
              v.moveTo(ka, ea);
              u
                ? (v.arc(qa, pa, u, -Q, 0, !1),
                  v.arc(qa, xa, u, 0, Q, !1),
                  v.arc(ka, xa, u, Q, H, !1),
                  v.arc(ka, pa, u, H, H + Q, !1))
                : (v.lineTo(qa, ea),
                  v.lineTo(ia, xa),
                  v.lineTo(ka, n),
                  v.lineTo(V, pa));
              v.closePath();
            },
            _renderDashedStroke: function (v, n) {
              var u = this.shape,
                V = Math.min(u.r, u.height / 2, u.width / 2),
                ia = u.x,
                ea = ia + u.width,
                ka = u.y,
                qa = ka + u.height,
                pa = ia + V,
                xa = ea - V,
                ya = ka + V,
                Ea = qa - V;
              V
                ? (v.beginPath(),
                  (u = t(v, this, pa, ka, xa, ka)),
                  n && v.stroke(),
                  (u = c(v, this.canvasDash, xa, ya, V, -Q, 0, !1, n, u)),
                  v.beginPath(),
                  (u = t(v, this, ea, ya, ea, Ea, u)),
                  n && v.stroke(),
                  (u = c(v, this.canvasDash, xa, Ea, V, 0, Q, !1, n, u)),
                  v.beginPath(),
                  (u = t(v, this, xa, qa, pa, qa, u)),
                  n && v.stroke(),
                  (u = c(v, this.canvasDash, pa, Ea, V, Q, H, !1, n, u)),
                  v.beginPath(),
                  (u = t(v, this, ia, Ea, ia, ya, u)),
                  n && v.stroke(),
                  c(v, this.canvasDash, pa, ya, V, H, H + Q, !1, n, u))
                : (v.beginPath(),
                  (u = t(v, this, pa, ka, xa, ka)),
                  (u = t(v, this, xa, ka, ea, Ea, u)),
                  (u = t(v, this, ea, Ea, pa, qa, u)),
                  t(v, this, pa, qa, ia, ya, u),
                  n && v.stroke());
            },
          });
          var X = [];
          (function () {
            var v = m.curvePI4;
            X.push(v.s, v.c1, v.c2, v.e);
            for (var n = 45; 360 > n; n += 45) {
              var u = z.rotateg(n);
              X.push(J(u, v.c1), J(u, v.c2), J(u, v.e));
            }
          })();
          var x = function (v) {
            var n = [],
              u = v.shape,
              V = z.normalize([z.translate(u.cx, u.cy), z.scale(u.rx, u.ry)]);
            var ia = J(V, X[0]);
            n.push([ia.x, ia.y]);
            for (u = 1; u < X.length; u += 3) {
              var ea = J(V, X[u]);
              var ka = J(V, X[u + 1]);
              ia = J(V, X[u + 2]);
              n.push([ea.x, ea.y, ka.x, ka.y, ia.x, ia.y]);
            }
            if (v._needsDash) {
              ia = [];
              ea = n[0];
              for (u = 1; u < n.length; ++u)
                (ka = []),
                  d(ea.concat(n[u]), v.canvasDash, ka),
                  (ea = [n[u][4], n[u][5]]),
                  ia.push(ka);
              v._dashedPoints = ia;
            }
            return n;
          };
          l.Ellipse = Z("dojox.gfx.canvas.Ellipse", [l.Shape, E.Ellipse], {
            setShape: function () {
              this.inherited(arguments);
              this.canvasEllipse = x(this);
              return this;
            },
            setStroke: function () {
              this.inherited(arguments);
              M || (this.canvasEllipse = x(this));
              return this;
            },
            _renderShape: function (v) {
              var n = this.canvasEllipse,
                u;
              v.beginPath();
              v.moveTo.apply(v, n[0]);
              for (u = 1; u < n.length; ++u) v.bezierCurveTo.apply(v, n[u]);
              v.closePath();
            },
            _renderDashedStroke: function (v, n) {
              var u = this._dashedPoints;
              v.beginPath();
              for (var V = 0; V < u.length; ++V)
                for (var ia = u[V], ea = 0; ea < ia.length; ++ea) {
                  var ka = ia[ea];
                  v.moveTo(ka[0], ka[1]);
                  v.bezierCurveTo(ka[2], ka[3], ka[4], ka[5], ka[6], ka[7]);
                }
              n && v.stroke();
            },
          });
          l.Circle = Z("dojox.gfx.canvas.Circle", [l.Shape, E.Circle], {
            _renderShape: function (v) {
              var n = this.shape;
              v.beginPath();
              v.arc(n.cx, n.cy, n.r, 0, T, 1);
            },
            _renderDashedStroke: function (v, n) {
              var u = this.shape,
                V = 0,
                ia = this.canvasDash.length;
              for (i = 0; V < T; ) {
                var ea = this.canvasDash[i % ia] / u.r;
                i % 2 ||
                  (v.beginPath(),
                  v.arc(u.cx, u.cy, u.r, V, V + ea, 0),
                  n && v.stroke());
                V += ea;
                ++i;
              }
            },
          });
          l.Line = Z("dojox.gfx.canvas.Line", [l.Shape, E.Line], {
            _renderShape: function (v) {
              var n = this.shape;
              v.beginPath();
              v.moveTo(n.x1, n.y1);
              v.lineTo(n.x2, n.y2);
            },
            _renderDashedStroke: function (v, n) {
              var u = this.shape;
              v.beginPath();
              t(v, this, u.x1, u.y1, u.x2, u.y2);
              n && v.stroke();
            },
          });
          l.Polyline = Z("dojox.gfx.canvas.Polyline", [l.Shape, E.Polyline], {
            setShape: function () {
              this.inherited(arguments);
              var v = this.shape.points,
                n = v[0],
                u;
              this.bbox = null;
              this._normalizePoints();
              if (v.length)
                if ("number" == typeof n) n = v;
                else
                  for (n = [], u = 0; u < v.length; ++u) {
                    var V = v[u];
                    n.push(V.x, V.y);
                  }
              else n = [];
              this.canvasPolyline = n;
              return this;
            },
            _renderShape: function (v) {
              var n = this.canvasPolyline;
              if (n.length) {
                v.beginPath();
                v.moveTo(n[0], n[1]);
                for (var u = 2; u < n.length; u += 2) v.lineTo(n[u], n[u + 1]);
              }
            },
            _renderDashedStroke: function (v, n) {
              var u = this.canvasPolyline,
                V = 0;
              v.beginPath();
              for (var ia = 0; ia < u.length; ia += 2)
                V = t(v, this, u[ia], u[ia + 1], u[ia + 2], u[ia + 3], V);
              n && v.stroke();
            },
          });
          l.Image = Z("dojox.gfx.canvas.Image", [l.Shape, E.Image], {
            setShape: function () {
              this.inherited(arguments);
              var v = new Image();
              this.surface.downloadImage(v, this.shape.src);
              this.canvasImage = v;
              return this;
            },
            _renderShape: function (v) {
              var n = this.shape;
              v.drawImage(this.canvasImage, n.x, n.y, n.width, n.height);
            },
          });
          l.Text = Z("dojox.gfx.canvas.Text", [l.Shape, E.Text], {
            _setFont: function () {
              this.fontStyle
                ? (this.canvasFont = C.makeFontString(this.fontStyle))
                : delete this.canvasFont;
            },
            getTextWidth: function () {
              var v = this.shape,
                n = 0;
              if (v.text) {
                var u = this.surface.rawNode.getContext("2d");
                u.save();
                this._renderTransform(u);
                this._renderFill(u, !1);
                this._renderStroke(u, !1);
                this.canvasFont && (u.font = this.canvasFont);
                n = u.measureText(v.text).width;
                u.restore();
              }
              return n;
            },
            _render: function (v) {
              v.save();
              this._renderTransform(v);
              this._renderFill(v, !1);
              this._renderStroke(v, !1);
              this._renderShape(v);
              v.restore();
            },
            _renderShape: function (v) {
              var n = this.shape;
              n.text &&
                ((v.textAlign = "middle" === n.align ? "center" : n.align),
                this.canvasFont && (v.font = this.canvasFont),
                this.canvasFill && v.fillText(n.text, n.x, n.y),
                this.strokeStyle &&
                  (v.beginPath(),
                  v.strokeText(n.text, n.x, n.y),
                  v.closePath()));
            },
          });
          F(l.Text, "setFont");
          B ||
            l.Text.extend({
              getTextWidth: function () {
                return 0;
              },
              getBoundingBox: function () {
                return null;
              },
              _renderShape: function () {},
            });
          var da = {
            M: "_moveToA",
            m: "_moveToR",
            L: "_lineToA",
            l: "_lineToR",
            H: "_hLineToA",
            h: "_hLineToR",
            V: "_vLineToA",
            v: "_vLineToR",
            C: "_curveToA",
            c: "_curveToR",
            S: "_smoothCurveToA",
            s: "_smoothCurveToR",
            Q: "_qCurveToA",
            q: "_qCurveToR",
            T: "_qSmoothCurveToA",
            t: "_qSmoothCurveToR",
            A: "_arcTo",
            a: "_arcTo",
            Z: "_closePath",
            z: "_closePath",
          };
          l.Path = Z("dojox.gfx.canvas.Path", [l.Shape, A.Path], {
            constructor: function () {
              this.lastControl = {};
            },
            setShape: function () {
              this.canvasPath = [];
              this._dashedPath = [];
              return this.inherited(arguments);
            },
            setStroke: function () {
              this.inherited(arguments);
              M || ((this.segmented = !1), this._confirmSegmented());
              return this;
            },
            _setPath: function () {
              this._dashResidue = null;
              this.inherited(arguments);
            },
            _updateWithSegment: function (v) {
              var n = R.clone(this.last);
              this[da[v.action]](
                this.canvasPath,
                v.action,
                v.args,
                this._needsDash ? this._dashedPath : null
              );
              this.last = n;
              this.inherited(arguments);
            },
            _renderShape: function (v) {
              var n = this.canvasPath;
              v.beginPath();
              for (var u = 0; u < n.length; u += 2) v[n[u]].apply(v, n[u + 1]);
            },
            _renderDashedStroke: M
              ? function () {}
              : function (v, n) {
                  var u = this._dashedPath;
                  v.beginPath();
                  for (var V = 0; V < u.length; V += 2)
                    v[u[V]].apply(v, u[V + 1]);
                  n && v.stroke();
                },
            _moveToA: function (v, n, u, V) {
              v.push("moveTo", [u[0], u[1]]);
              V && V.push("moveTo", [u[0], u[1]]);
              for (n = 2; n < u.length; n += 2)
                v.push("lineTo", [u[n], u[n + 1]]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      u[n - 2],
                      u[n - 1],
                      u[n],
                      u[n + 1],
                      this._dashResidue
                    ));
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
              this.lastControl = {};
            },
            _moveToR: function (v, n, u, V) {
              n =
                "x" in this.last
                  ? [(this.last.x += u[0]), (this.last.y += u[1])]
                  : [(this.last.x = u[0]), (this.last.y = u[1])];
              v.push("moveTo", n);
              V && V.push("moveTo", n);
              for (n = 2; n < u.length; n += 2)
                v.push("lineTo", [
                  (this.last.x += u[n]),
                  (this.last.y += u[n + 1]),
                ]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      this.last.x,
                      this.last.y,
                      this._dashResidue
                    ));
              this.lastControl = {};
            },
            _lineToA: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 2)
                V &&
                  (this._dashResidue = t(
                    V,
                    this,
                    this.last.x,
                    this.last.y,
                    u[n],
                    u[n + 1],
                    this._dashResidue
                  )),
                  v.push("lineTo", [u[n], u[n + 1]]);
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
              this.lastControl = {};
            },
            _lineToR: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 2)
                v.push("lineTo", [
                  (this.last.x += u[n]),
                  (this.last.y += u[n + 1]),
                ]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      this.last.x,
                      this.last.y,
                      this._dashResidue
                    ));
              this.lastControl = {};
            },
            _hLineToA: function (v, n, u, V) {
              for (n = 0; n < u.length; ++n)
                v.push("lineTo", [u[n], this.last.y]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      u[n],
                      this.last.y,
                      this._dashResidue
                    ));
              this.last.x = u[u.length - 1];
              this.lastControl = {};
            },
            _hLineToR: function (v, n, u, V) {
              for (n = 0; n < u.length; ++n)
                v.push("lineTo", [(this.last.x += u[n]), this.last.y]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      this.last.x,
                      this.last.y,
                      this._dashResidue
                    ));
              this.lastControl = {};
            },
            _vLineToA: function (v, n, u, V) {
              for (n = 0; n < u.length; ++n)
                v.push("lineTo", [this.last.x, u[n]]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      this.last.x,
                      u[n],
                      this._dashResidue
                    ));
              this.last.y = u[u.length - 1];
              this.lastControl = {};
            },
            _vLineToR: function (v, n, u, V) {
              for (n = 0; n < u.length; ++n)
                v.push("lineTo", [this.last.x, (this.last.y += u[n])]),
                  V &&
                    (this._dashResidue = t(
                      V,
                      this,
                      V[V.length - 1][0],
                      V[V.length - 1][1],
                      this.last.x,
                      this.last.y,
                      this._dashResidue
                    ));
              this.lastControl = {};
            },
            _curveToA: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 6)
                v.push("bezierCurveTo", u.slice(n, n + 6)),
                  V &&
                    (this._dashResidue = q(
                      V,
                      this,
                      v[v.length - 1],
                      this._dashResidue
                    ));
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
              this.lastControl.x = u[u.length - 4];
              this.lastControl.y = u[u.length - 3];
              this.lastControl.type = "C";
            },
            _curveToR: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 6)
                v.push("bezierCurveTo", [
                  this.last.x + u[n],
                  this.last.y + u[n + 1],
                  (this.lastControl.x = this.last.x + u[n + 2]),
                  (this.lastControl.y = this.last.y + u[n + 3]),
                  this.last.x + u[n + 4],
                  this.last.y + u[n + 5],
                ]),
                  V &&
                    (this._dashResidue = q(
                      V,
                      this,
                      v[v.length - 1],
                      this._dashResidue
                    )),
                  (this.last.x += u[n + 4]),
                  (this.last.y += u[n + 5]);
              this.lastControl.type = "C";
            },
            _smoothCurveToA: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 4) {
                var ia = "C" == this.lastControl.type;
                v.push("bezierCurveTo", [
                  ia ? 2 * this.last.x - this.lastControl.x : this.last.x,
                  ia ? 2 * this.last.y - this.lastControl.y : this.last.y,
                  u[n],
                  u[n + 1],
                  u[n + 2],
                  u[n + 3],
                ]);
                V &&
                  (this._dashResidue = q(
                    V,
                    this,
                    v[v.length - 1],
                    this._dashResidue
                  ));
                this.lastControl.x = u[n];
                this.lastControl.y = u[n + 1];
                this.lastControl.type = "C";
              }
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
            },
            _smoothCurveToR: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 4) {
                var ia = "C" == this.lastControl.type;
                v.push("bezierCurveTo", [
                  ia ? 2 * this.last.x - this.lastControl.x : this.last.x,
                  ia ? 2 * this.last.y - this.lastControl.y : this.last.y,
                  this.last.x + u[n],
                  this.last.y + u[n + 1],
                  this.last.x + u[n + 2],
                  this.last.y + u[n + 3],
                ]);
                V &&
                  (this._dashResidue = q(
                    V,
                    this,
                    v[v.length - 1],
                    this._dashResidue
                  ));
                this.lastControl.x = this.last.x + u[n];
                this.lastControl.y = this.last.y + u[n + 1];
                this.lastControl.type = "C";
                this.last.x += u[n + 2];
                this.last.y += u[n + 3];
              }
            },
            _qCurveToA: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 4)
                v.push("quadraticCurveTo", u.slice(n, n + 4));
              V &&
                (this._dashResidue = q(
                  V,
                  this,
                  v[v.length - 1],
                  this._dashResidue
                ));
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
              this.lastControl.x = u[u.length - 4];
              this.lastControl.y = u[u.length - 3];
              this.lastControl.type = "Q";
            },
            _qCurveToR: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 4)
                v.push("quadraticCurveTo", [
                  (this.lastControl.x = this.last.x + u[n]),
                  (this.lastControl.y = this.last.y + u[n + 1]),
                  this.last.x + u[n + 2],
                  this.last.y + u[n + 3],
                ]),
                  V &&
                    (this._dashResidue = q(
                      V,
                      this,
                      v[v.length - 1],
                      this._dashResidue
                    )),
                  (this.last.x += u[n + 2]),
                  (this.last.y += u[n + 3]);
              this.lastControl.type = "Q";
            },
            _qSmoothCurveToA: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 2) {
                var ia = "Q" == this.lastControl.type;
                v.push("quadraticCurveTo", [
                  (this.lastControl.x = ia
                    ? 2 * this.last.x - this.lastControl.x
                    : this.last.x),
                  (this.lastControl.y = ia
                    ? 2 * this.last.y - this.lastControl.y
                    : this.last.y),
                  u[n],
                  u[n + 1],
                ]);
                V &&
                  (this._dashResidue = q(
                    V,
                    this,
                    v[v.length - 1],
                    this._dashResidue
                  ));
                this.lastControl.type = "Q";
              }
              this.last.x = u[u.length - 2];
              this.last.y = u[u.length - 1];
            },
            _qSmoothCurveToR: function (v, n, u, V) {
              for (n = 0; n < u.length; n += 2) {
                var ia = "Q" == this.lastControl.type;
                v.push("quadraticCurveTo", [
                  (this.lastControl.x = ia
                    ? 2 * this.last.x - this.lastControl.x
                    : this.last.x),
                  (this.lastControl.y = ia
                    ? 2 * this.last.y - this.lastControl.y
                    : this.last.y),
                  this.last.x + u[n],
                  this.last.y + u[n + 1],
                ]);
                V &&
                  (this._dashResidue = q(
                    V,
                    this,
                    v[v.length - 1],
                    this._dashResidue
                  ));
                this.lastControl.type = "Q";
                this.last.x += u[n];
                this.last.y += u[n + 1];
              }
            },
            _arcTo: function (v, n, u, V) {
              n = "a" == n;
              for (var ia = 0; ia < u.length; ia += 7) {
                var ea = u[ia + 5],
                  ka = u[ia + 6];
                n && ((ea += this.last.x), (ka += this.last.y));
                var qa = m.arcAsBezier(
                  this.last,
                  u[ia],
                  u[ia + 1],
                  u[ia + 2],
                  u[ia + 3] ? 1 : 0,
                  u[ia + 4] ? 1 : 0,
                  ea,
                  ka
                );
                k.forEach(qa, function (pa) {
                  v.push("bezierCurveTo", pa);
                });
                V && (this._dashResidue = q(V, this, p, this._dashResidue));
                this.last.x = ea;
                this.last.y = ka;
              }
              this.lastControl = {};
            },
            _closePath: function (v, n, u, V) {
              v.push("closePath", []);
              V &&
                (this._dashResidue = t(
                  V,
                  this,
                  this.last.x,
                  this.last.y,
                  V[1][0],
                  V[1][1],
                  this._dashResidue
                ));
              this.lastControl = {};
            },
          });
          k.forEach(
            "moveTo lineTo hLineTo vLineTo curveTo smoothCurveTo qCurveTo qSmoothCurveTo arcTo closePath".split(
              " "
            ),
            function (v) {
              F(l.Path, v);
            }
          );
          l.TextPath = Z("dojox.gfx.canvas.TextPath", [l.Shape, A.TextPath], {
            _renderShape: function (v) {},
            _setText: function () {},
            _setFont: function () {},
          });
          l.Surface = Z("dojox.gfx.canvas.Surface", E.Surface, {
            constructor: function () {
              E.Container._init.call(this);
              this.pendingImageCount = 0;
              this.makeDirty();
            },
            destroy: function () {
              E.Container.clear.call(this, !0);
              this.inherited(arguments);
            },
            setDimensions: function (v, n) {
              this.width = C.normalizedLength(v);
              this.height = C.normalizedLength(n);
              if (!this.rawNode) return this;
              v = !1;
              this.rawNode.width != this.width &&
                ((this.rawNode.width = this.width), (v = !0));
              this.rawNode.height != this.height &&
                ((this.rawNode.height = this.height), (v = !0));
              v && this.makeDirty();
              return this;
            },
            getDimensions: function () {
              return this.rawNode
                ? { width: this.rawNode.width, height: this.rawNode.height }
                : null;
            },
            _render: function (v) {
              !this.rawNode ||
                (!v && this.pendingImageCount) ||
                ((v = this.rawNode.getContext("2d")),
                v.clearRect(0, 0, this.rawNode.width, this.rawNode.height),
                this.render(v),
                "pendingRender" in this &&
                  (clearTimeout(this.pendingRender),
                  delete this.pendingRender));
            },
            render: function (v) {
              v.save();
              for (var n = 0; n < this.children.length; ++n)
                this.children[n]._render(v);
              v.restore();
            },
            makeDirty: function () {
              this.pendingImagesCount ||
                "pendingRender" in this ||
                this._batch ||
                (this.pendingRender = setTimeout(
                  R.hitch(this, this._render),
                  0
                ));
            },
            downloadImage: function (v, n) {
              var u = R.hitch(this, this.onImageLoad);
              !this.pendingImageCount++ &&
                "pendingRender" in this &&
                (clearTimeout(this.pendingRender), delete this.pendingRender);
              v.onload = u;
              v.onerror = u;
              v.onabort = u;
              v.src = n;
            },
            onImageLoad: function () {
              --this.pendingImageCount ||
                (this.onImagesLoaded(), this._render());
            },
            onImagesLoaded: function () {},
            getEventSource: function () {
              return null;
            },
            connect: function () {},
            disconnect: function () {},
            on: function () {},
          });
          l.createSurface = function (v, n, u) {
            if (!n && !u) {
              var V = O.position(v);
              n = n || V.w;
              u = u || V.h;
            }
            "number" == typeof n && (n += "px");
            "number" == typeof u && (u += "px");
            V = new l.Surface();
            v = I.byId(v);
            var ia = v.ownerDocument.createElement("canvas");
            ia.width = C.normalizedLength(n);
            ia.height = C.normalizedLength(u);
            v.appendChild(ia);
            V.rawNode = ia;
            V._parent = v;
            return (V.surface = V);
          };
          var ba = E.Container;
          Z = {
            openBatch: function () {
              ++this._batch;
              return this;
            },
            closeBatch: function () {
              this._batch = 0 < this._batch ? --this._batch : 0;
              this._makeDirty();
              return this;
            },
            _makeDirty: function () {
              this._batch || this.surface.makeDirty();
            },
            add: function (v) {
              this._makeDirty();
              return ba.add.apply(this, arguments);
            },
            remove: function (v, n) {
              this._makeDirty();
              return ba.remove.apply(this, arguments);
            },
            clear: function () {
              this._makeDirty();
              return ba.clear.apply(this, arguments);
            },
            getBoundingBox: ba.getBoundingBox,
            _moveChildToFront: function (v) {
              this._makeDirty();
              return ba._moveChildToFront.apply(this, arguments);
            },
            _moveChildToBack: function (v) {
              this._makeDirty();
              return ba._moveChildToBack.apply(this, arguments);
            },
          };
          A = {
            createObject: function (v, n) {
              v = new v();
              v.surface = this.surface;
              v.setShape(n);
              this.add(v);
              return v;
            },
          };
          g(l.Group, Z);
          g(l.Group, E.Creator);
          g(l.Group, A);
          g(l.Surface, Z);
          g(l.Surface, E.Creator);
          g(l.Surface, A);
          l.fixTarget = function (v, n) {
            return !0;
          };
          return l;
        }
      );
    },
    "dojox/gfx/shape": function () {
      define(
        "./_base dojo/_base/lang dojo/_base/declare dojo/_base/kernel dojo/_base/sniff dojo/on dojo/_base/array dojo/dom-construct dojo/_base/Color ./matrix".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m) {
          function z(f, c) {
            for (var d = f.length - 1; c < d; ) f[c] = f[++c];
            f.length = d;
          }
          var g = (C.shape = {});
          g.Shape = k("dojox.gfx.shape.Shape", null, {
            constructor: function () {
              this.parentMatrix =
                this.parent =
                this.bbox =
                this.strokeStyle =
                this.fillStyle =
                this.matrix =
                this.shape =
                this.rawNode =
                  null;
              if (U("gfxRegistry")) {
                var f = g.register(this);
                this.getUID = function () {
                  return f;
                };
              }
            },
            destroy: function () {
              U("gfxRegistry") && g.dispose(this);
              this.rawNode &&
                "__gfxObject__" in this.rawNode &&
                (this.rawNode.__gfxObject__ = null);
              this.rawNode = null;
            },
            getNode: function () {
              return this.rawNode;
            },
            getShape: function () {
              return this.shape;
            },
            getTransform: function () {
              return this.matrix;
            },
            getFill: function () {
              return this.fillStyle;
            },
            getStroke: function () {
              return this.strokeStyle;
            },
            getParent: function () {
              return this.parent;
            },
            getBoundingBox: function () {
              return this.bbox;
            },
            getTransformedBoundingBox: function () {
              var f = this.getBoundingBox();
              if (!f) return null;
              var c = this._getRealMatrix();
              return [
                m.multiplyPoint(c, f.x, f.y),
                m.multiplyPoint(c, f.x + f.width, f.y),
                m.multiplyPoint(c, f.x + f.width, f.y + f.height),
                m.multiplyPoint(c, f.x, f.y + f.height),
              ];
            },
            getEventSource: function () {
              return this.rawNode;
            },
            setClip: function (f) {
              this.clip = f;
            },
            getClip: function () {
              return this.clip;
            },
            setShape: function (f) {
              this.shape = C.makeParameters(this.shape, f);
              this.bbox = null;
              return this;
            },
            setFill: function (f) {
              if (!f) return (this.fillStyle = null), this;
              var c = null;
              if ("object" == typeof f && "type" in f)
                switch (f.type) {
                  case "linear":
                    c = C.makeParameters(C.defaultLinearGradient, f);
                    break;
                  case "radial":
                    c = C.makeParameters(C.defaultRadialGradient, f);
                    break;
                  case "pattern":
                    c = C.makeParameters(C.defaultPattern, f);
                }
              else c = C.normalizeColor(f);
              this.fillStyle = c;
              return this;
            },
            setStroke: function (f) {
              if (!f) return (this.strokeStyle = null), this;
              if ("string" == typeof f || R.isArray(f) || f instanceof A)
                f = { color: f };
              f = this.strokeStyle = C.makeParameters(C.defaultStroke, f);
              f.color = C.normalizeColor(f.color);
              return this;
            },
            setTransform: function (f) {
              this.matrix = m.clone(f ? m.normalize(f) : m.identity);
              return this._applyTransform();
            },
            _applyTransform: function () {
              return this;
            },
            moveToFront: function () {
              var f = this.getParent();
              f && (f._moveChildToFront(this), this._moveToFront());
              return this;
            },
            moveToBack: function () {
              var f = this.getParent();
              f && (f._moveChildToBack(this), this._moveToBack());
              return this;
            },
            _moveToFront: function () {},
            _moveToBack: function () {},
            applyRightTransform: function (f) {
              return f ? this.setTransform([this.matrix, f]) : this;
            },
            applyLeftTransform: function (f) {
              return f ? this.setTransform([f, this.matrix]) : this;
            },
            applyTransform: function (f) {
              return f ? this.setTransform([this.matrix, f]) : this;
            },
            removeShape: function (f) {
              this.parent && this.parent.remove(this, f);
              return this;
            },
            _setParent: function (f, c) {
              this.parent = f;
              return this._updateParentMatrix(c);
            },
            _updateParentMatrix: function (f) {
              this.parentMatrix = f ? m.clone(f) : null;
              return this._applyTransform();
            },
            _getRealMatrix: function () {
              for (var f = this.matrix, c = this.parent; c; )
                c.matrix && (f = m.multiply(c.matrix, f)), (c = c.parent);
              return f;
            },
          });
          g._eventsProcessing = {
            on: function (f, c) {
              return O(
                this.getEventSource(),
                f,
                g.fixCallback(this, C.fixTarget, c)
              );
            },
            connect: function (f, c, d) {
              "on" == f.substring(0, 2) && (f = f.substring(2));
              return this.on(f, d ? R.hitch(c, d) : c);
            },
            disconnect: function (f) {
              return f.remove();
            },
          };
          g.fixCallback = function (f, c, d, q) {
            q || ((q = d), (d = null));
            if (R.isString(q)) {
              d = d || Z.global;
              if (!d[q])
                throw [
                  'dojox.gfx.shape.fixCallback: scope["',
                  q,
                  '"] is null (scope\x3d"',
                  d,
                  '")',
                ].join("");
              return function (t) {
                return c(t, f) ? d[q].apply(d, arguments || []) : void 0;
              };
            }
            return d
              ? function (t) {
                  return c(t, f) ? q.apply(d, arguments || []) : void 0;
                }
              : function (t) {
                  return c(t, f) ? q.apply(d, arguments) : void 0;
                };
          };
          R.extend(g.Shape, g._eventsProcessing);
          g.Container = {
            _init: function () {
              this.children = [];
              this._batch = 0;
            },
            openBatch: function () {
              return this;
            },
            closeBatch: function () {
              return this;
            },
            add: function (f) {
              var c = f.getParent();
              c && c.remove(f, !0);
              this.children.push(f);
              return f._setParent(this, this._getRealMatrix());
            },
            remove: function (f, c) {
              for (var d = 0; d < this.children.length; ++d)
                if (this.children[d] == f) {
                  c || ((f.parent = null), (f.parentMatrix = null));
                  z(this.children, d);
                  break;
                }
              return this;
            },
            clear: function (f) {
              for (var c, d = 0; d < this.children.length; ++d)
                (c = this.children[d]),
                  (c.parent = null),
                  (c.parentMatrix = null),
                  f && c.destroy();
              this.children = [];
              return this;
            },
            getBoundingBox: function () {
              if (this.children) {
                var f = null;
                I.forEach(this.children, function (c) {
                  var d = c.getBoundingBox();
                  d &&
                    ((c = c.getTransform()) && (d = m.multiplyRectangle(c, d)),
                    f
                      ? ((f.x = Math.min(f.x, d.x)),
                        (f.y = Math.min(f.y, d.y)),
                        (f.endX = Math.max(f.endX, d.x + d.width)),
                        (f.endY = Math.max(f.endY, d.y + d.height)))
                      : (f = {
                          x: d.x,
                          y: d.y,
                          endX: d.x + d.width,
                          endY: d.y + d.height,
                        }));
                });
                f && ((f.width = f.endX - f.x), (f.height = f.endY - f.y));
                return f;
              }
              return null;
            },
            _moveChildToFront: function (f) {
              for (var c = 0; c < this.children.length; ++c)
                if (this.children[c] == f) {
                  z(this.children, c);
                  this.children.push(f);
                  break;
                }
              return this;
            },
            _moveChildToBack: function (f) {
              for (var c = 0; c < this.children.length; ++c)
                if (this.children[c] == f) {
                  z(this.children, c);
                  this.children.unshift(f);
                  break;
                }
              return this;
            },
          };
          g.Surface = k("dojox.gfx.shape.Surface", null, {
            constructor: function () {
              this._parent = this.rawNode = null;
              this._nodes = [];
              this._events = [];
            },
            destroy: function () {
              I.forEach(this._nodes, E.destroy);
              this._nodes = [];
              I.forEach(this._events, function (f) {
                f && f.remove();
              });
              this._events = [];
              this.rawNode = null;
              if (U("ie"))
                for (; this._parent.lastChild; )
                  E.destroy(this._parent.lastChild);
              else this._parent.innerHTML = "";
              this._parent = null;
            },
            getEventSource: function () {
              return this.rawNode;
            },
            _getRealMatrix: function () {
              return null;
            },
            isLoaded: !0,
            onLoad: function (f) {},
            whenLoaded: function (f, c) {
              var d = R.hitch(f, c);
              if (this.isLoaded) d(this);
              else
                O.once(this, "load", function (q) {
                  d(q);
                });
            },
          });
          R.extend(g.Surface, g._eventsProcessing);
          g.Rect = k("dojox.gfx.shape.Rect", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Rect");
              this.rawNode = f;
            },
            getBoundingBox: function () {
              return this.shape;
            },
          });
          g.Ellipse = k("dojox.gfx.shape.Ellipse", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Ellipse");
              this.rawNode = f;
            },
            getBoundingBox: function () {
              if (!this.bbox) {
                var f = this.shape;
                this.bbox = {
                  x: f.cx - f.rx,
                  y: f.cy - f.ry,
                  width: 2 * f.rx,
                  height: 2 * f.ry,
                };
              }
              return this.bbox;
            },
          });
          g.Circle = k("dojox.gfx.shape.Circle", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Circle");
              this.rawNode = f;
            },
            getBoundingBox: function () {
              if (!this.bbox) {
                var f = this.shape;
                this.bbox = {
                  x: f.cx - f.r,
                  y: f.cy - f.r,
                  width: 2 * f.r,
                  height: 2 * f.r,
                };
              }
              return this.bbox;
            },
          });
          g.Line = k("dojox.gfx.shape.Line", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Line");
              this.rawNode = f;
            },
            getBoundingBox: function () {
              if (!this.bbox) {
                var f = this.shape;
                this.bbox = {
                  x: Math.min(f.x1, f.x2),
                  y: Math.min(f.y1, f.y2),
                  width: Math.abs(f.x2 - f.x1),
                  height: Math.abs(f.y2 - f.y1),
                };
              }
              return this.bbox;
            },
          });
          g.Polyline = k("dojox.gfx.shape.Polyline", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Polyline");
              this.rawNode = f;
            },
            setShape: function (f, c) {
              f && f instanceof Array
                ? (this.inherited(arguments, [{ points: f }]),
                  c &&
                    this.shape.points.length &&
                    this.shape.points.push(this.shape.points[0]))
                : this.inherited(arguments, [f]);
              return this;
            },
            _normalizePoints: function () {
              var f = this.shape.points,
                c = f && f.length;
              if (c && "number" == typeof f[0]) {
                for (var d = [], q = 0; q < c; q += 2)
                  d.push({ x: f[q], y: f[q + 1] });
                this.shape.points = d;
              }
            },
            getBoundingBox: function () {
              if (!this.bbox && this.shape.points.length) {
                for (
                  var f = this.shape.points,
                    c = f.length,
                    d = f[0],
                    q = d.x,
                    t = d.y,
                    l = d.x,
                    y = d.y,
                    J = 1;
                  J < c;
                  ++J
                )
                  (d = f[J]),
                    q > d.x && (q = d.x),
                    l < d.x && (l = d.x),
                    t > d.y && (t = d.y),
                    y < d.y && (y = d.y);
                this.bbox = { x: q, y: t, width: l - q, height: y - t };
              }
              return this.bbox;
            },
          });
          g.Image = k("dojox.gfx.shape.Image", g.Shape, {
            constructor: function (f) {
              this.shape = C.getDefault("Image");
              this.rawNode = f;
            },
            getBoundingBox: function () {
              return this.shape;
            },
            setStroke: function () {
              return this;
            },
            setFill: function () {
              return this;
            },
          });
          g.Text = k(g.Shape, {
            constructor: function (f) {
              this.fontStyle = null;
              this.shape = C.getDefault("Text");
              this.rawNode = f;
            },
            getFont: function () {
              return this.fontStyle;
            },
            setFont: function (f) {
              this.fontStyle =
                "string" == typeof f
                  ? C.splitFontString(f)
                  : C.makeParameters(C.defaultFont, f);
              this._setFont();
              return this;
            },
            getBoundingBox: function () {
              var f = null;
              this.getShape().text &&
                (f = C._base._computeTextBoundingBox(this));
              return f;
            },
          });
          g.Creator = {
            createShape: function (f) {
              switch (f.type) {
                case C.defaultPath.type:
                  return this.createPath(f);
                case C.defaultRect.type:
                  return this.createRect(f);
                case C.defaultCircle.type:
                  return this.createCircle(f);
                case C.defaultEllipse.type:
                  return this.createEllipse(f);
                case C.defaultLine.type:
                  return this.createLine(f);
                case C.defaultPolyline.type:
                  return this.createPolyline(f);
                case C.defaultImage.type:
                  return this.createImage(f);
                case C.defaultText.type:
                  return this.createText(f);
                case C.defaultTextPath.type:
                  return this.createTextPath(f);
              }
              return null;
            },
            createGroup: function () {
              return this.createObject(C.Group);
            },
            createRect: function (f) {
              return this.createObject(C.Rect, f);
            },
            createEllipse: function (f) {
              return this.createObject(C.Ellipse, f);
            },
            createCircle: function (f) {
              return this.createObject(C.Circle, f);
            },
            createLine: function (f) {
              return this.createObject(C.Line, f);
            },
            createPolyline: function (f) {
              return this.createObject(C.Polyline, f);
            },
            createImage: function (f) {
              return this.createObject(C.Image, f);
            },
            createText: function (f) {
              return this.createObject(C.Text, f);
            },
            createPath: function (f) {
              return this.createObject(C.Path, f);
            },
            createTextPath: function (f) {
              return this.createObject(C.TextPath, {}).setText(f);
            },
            createObject: function (f, c) {
              return null;
            },
          };
          return g;
        }
      );
    },
    "dojox/gfx/path": function () {
      define([
        "./_base",
        "dojo/_base/lang",
        "dojo/_base/declare",
        "./matrix",
        "./shape",
      ], function (C, R, k, Z, U) {
        U = k("dojox.gfx.path.Path", U.Shape, {
          constructor: function (O) {
            this.shape = R.clone(C.defaultPath);
            this.segments = [];
            this.tbbox = null;
            this.absolute = !0;
            this.last = {};
            this.rawNode = O;
            this.segmented = !1;
          },
          setAbsoluteMode: function (O) {
            this._confirmSegmented();
            this.absolute = "string" == typeof O ? "absolute" == O : O;
            return this;
          },
          getAbsoluteMode: function () {
            this._confirmSegmented();
            return this.absolute;
          },
          getBoundingBox: function () {
            this._confirmSegmented();
            return this.bbox && "l" in this.bbox
              ? {
                  x: this.bbox.l,
                  y: this.bbox.t,
                  width: this.bbox.r - this.bbox.l,
                  height: this.bbox.b - this.bbox.t,
                }
              : null;
          },
          _getRealBBox: function () {
            this._confirmSegmented();
            if (this.tbbox) return this.tbbox;
            var O = this.bbox,
              I = this._getRealMatrix();
            this.bbox = null;
            for (var E = 0, A = this.segments.length; E < A; ++E)
              this._updateWithSegment(this.segments[E], I);
            I = this.bbox;
            this.bbox = O;
            return (this.tbbox = I
              ? [
                  { x: I.l, y: I.t },
                  { x: I.r, y: I.t },
                  { x: I.r, y: I.b },
                  { x: I.l, y: I.b },
                ]
              : null);
          },
          getLastPosition: function () {
            this._confirmSegmented();
            return "x" in this.last ? this.last : null;
          },
          _applyTransform: function () {
            this.tbbox = null;
            return this.inherited(arguments);
          },
          _updateBBox: function (O, I, E) {
            E && ((I = Z.multiplyPoint(E, O, I)), (O = I.x), (I = I.y));
            this.bbox && "l" in this.bbox
              ? (this.bbox.l > O && (this.bbox.l = O),
                this.bbox.r < O && (this.bbox.r = O),
                this.bbox.t > I && (this.bbox.t = I),
                this.bbox.b < I && (this.bbox.b = I))
              : (this.bbox = { l: O, b: I, r: O, t: I });
          },
          _updateWithSegment: function (O, I) {
            var E = O.args,
              A = E.length,
              m;
            switch (O.action) {
              case "M":
              case "L":
              case "C":
              case "S":
              case "Q":
              case "T":
                for (m = 0; m < A; m += 2) this._updateBBox(E[m], E[m + 1], I);
                this.last.x = E[A - 2];
                this.last.y = E[A - 1];
                this.absolute = !0;
                break;
              case "H":
                for (m = 0; m < A; ++m) this._updateBBox(E[m], this.last.y, I);
                this.last.x = E[A - 1];
                this.absolute = !0;
                break;
              case "V":
                for (m = 0; m < A; ++m) this._updateBBox(this.last.x, E[m], I);
                this.last.y = E[A - 1];
                this.absolute = !0;
                break;
              case "m":
                m = 0;
                "x" in this.last ||
                  (this._updateBBox(
                    (this.last.x = E[0]),
                    (this.last.y = E[1]),
                    I
                  ),
                  (m = 2));
                for (; m < A; m += 2)
                  this._updateBBox(
                    (this.last.x += E[m]),
                    (this.last.y += E[m + 1]),
                    I
                  );
                this.absolute = !1;
                break;
              case "l":
              case "t":
                for (m = 0; m < A; m += 2)
                  this._updateBBox(
                    (this.last.x += E[m]),
                    (this.last.y += E[m + 1]),
                    I
                  );
                this.absolute = !1;
                break;
              case "h":
                for (m = 0; m < A; ++m)
                  this._updateBBox((this.last.x += E[m]), this.last.y, I);
                this.absolute = !1;
                break;
              case "v":
                for (m = 0; m < A; ++m)
                  this._updateBBox(this.last.x, (this.last.y += E[m]), I);
                this.absolute = !1;
                break;
              case "c":
                for (m = 0; m < A; m += 6)
                  this._updateBBox(
                    this.last.x + E[m],
                    this.last.y + E[m + 1],
                    I
                  ),
                    this._updateBBox(
                      this.last.x + E[m + 2],
                      this.last.y + E[m + 3],
                      I
                    ),
                    this._updateBBox(
                      (this.last.x += E[m + 4]),
                      (this.last.y += E[m + 5]),
                      I
                    );
                this.absolute = !1;
                break;
              case "s":
              case "q":
                for (m = 0; m < A; m += 4)
                  this._updateBBox(
                    this.last.x + E[m],
                    this.last.y + E[m + 1],
                    I
                  ),
                    this._updateBBox(
                      (this.last.x += E[m + 2]),
                      (this.last.y += E[m + 3]),
                      I
                    );
                this.absolute = !1;
                break;
              case "A":
                for (m = 0; m < A; m += 7)
                  this._updateBBox(E[m + 5], E[m + 6], I);
                this.last.x = E[A - 2];
                this.last.y = E[A - 1];
                this.absolute = !0;
                break;
              case "a":
                for (m = 0; m < A; m += 7)
                  this._updateBBox(
                    (this.last.x += E[m + 5]),
                    (this.last.y += E[m + 6]),
                    I
                  );
                this.absolute = !1;
            }
            O = [O.action];
            for (m = 0; m < A; ++m) O.push(C.formatNumber(E[m], !0));
            if ("string" == typeof this.shape.path)
              this.shape.path += O.join("");
            else
              for (m = 0, A = O.length; m < A; ++m) this.shape.path.push(O[m]);
          },
          _validSegments: {
            m: 2,
            l: 2,
            h: 1,
            v: 1,
            c: 6,
            s: 4,
            q: 4,
            t: 2,
            a: 7,
            z: 0,
          },
          _pushSegment: function (O, I) {
            this.tbbox = null;
            var E = this._validSegments[O.toLowerCase()];
            "number" == typeof E &&
              (E
                ? I.length >= E &&
                  ((O = {
                    action: O,
                    args: I.slice(0, I.length - (I.length % E)),
                  }),
                  this.segments.push(O),
                  this._updateWithSegment(O))
                : ((O = { action: O, args: [] }),
                  this.segments.push(O),
                  this._updateWithSegment(O)));
          },
          _collectArgs: function (O, I) {
            for (var E = 0; E < I.length; ++E) {
              var A = I[E];
              "boolean" == typeof A
                ? O.push(A ? 1 : 0)
                : "number" == typeof A
                ? O.push(A)
                : A instanceof Array
                ? this._collectArgs(O, A)
                : "x" in A && "y" in A && O.push(A.x, A.y);
            }
          },
          moveTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "M" : "m", O);
            return this;
          },
          lineTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "L" : "l", O);
            return this;
          },
          hLineTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "H" : "h", O);
            return this;
          },
          vLineTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "V" : "v", O);
            return this;
          },
          curveTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "C" : "c", O);
            return this;
          },
          smoothCurveTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "S" : "s", O);
            return this;
          },
          qCurveTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "Q" : "q", O);
            return this;
          },
          qSmoothCurveTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "T" : "t", O);
            return this;
          },
          arcTo: function () {
            this._confirmSegmented();
            var O = [];
            this._collectArgs(O, arguments);
            this._pushSegment(this.absolute ? "A" : "a", O);
            return this;
          },
          closePath: function () {
            this._confirmSegmented();
            this._pushSegment("Z", []);
            return this;
          },
          _confirmSegmented: function () {
            if (!this.segmented) {
              var O = this.shape.path;
              this.shape.path = [];
              this._setPath(O);
              this.shape.path = this.shape.path.join("");
              this.segmented = !0;
            }
          },
          _setPath: function (O) {
            O = R.isArray(O) ? O : O.match(C.pathSvgRegExp);
            this.segments = [];
            this.absolute = !0;
            this.bbox = {};
            this.last = {};
            if (O) {
              for (var I = "", E = [], A = O.length, m = 0; m < A; ++m) {
                var z = O[m],
                  g = parseFloat(z);
                isNaN(g)
                  ? (I && this._pushSegment(I, E), (E = []), (I = z))
                  : E.push(g);
              }
              this._pushSegment(I, E);
            }
          },
          setShape: function (O) {
            this.inherited(arguments, ["string" == typeof O ? { path: O } : O]);
            this.segmented = !1;
            this.segments = [];
            C.lazyPathSegmentation || this._confirmSegmented();
            return this;
          },
          _2PI: 2 * Math.PI,
        });
        k = k("dojox.gfx.path.TextPath", U, {
          constructor: function (O) {
            "text" in this || (this.text = R.clone(C.defaultTextPath));
            "fontStyle" in this || (this.fontStyle = R.clone(C.defaultFont));
          },
          getText: function () {
            return this.text;
          },
          setText: function (O) {
            this.text = C.makeParameters(
              this.text,
              "string" == typeof O ? { text: O } : O
            );
            this._setText();
            return this;
          },
          getFont: function () {
            return this.fontStyle;
          },
          setFont: function (O) {
            this.fontStyle =
              "string" == typeof O
                ? C.splitFontString(O)
                : C.makeParameters(C.defaultFont, O);
            this._setFont();
            return this;
          },
        });
        return (C.path = { Path: U, TextPath: k });
      });
    },
    "dojox/gfx/arc": function () {
      define(["./_base", "dojo/_base/lang", "./matrix"], function (C, R, k) {
        function Z(m) {
          var z = Math.cos(m);
          m = Math.sin(m);
          var g = {
            x: z + (4 / 3) * (1 - z),
            y: m - ((4 / 3) * z * (1 - z)) / m,
          };
          return {
            s: { x: z, y: -m },
            c1: { x: g.x, y: -g.y },
            c2: g,
            e: { x: z, y: m },
          };
        }
        var U = 2 * Math.PI,
          O = Math.PI / 4,
          I = Math.PI / 8,
          E = O + I,
          A = Z(I);
        return (C.arc = {
          unitArcAsBezier: Z,
          curvePI4: A,
          arcAsBezier: function (m, z, g, f, c, d, q, t) {
            c = !!c;
            d = !!d;
            var l = k._degToRad(f);
            f = z * z;
            var y = g * g,
              J = k.multiplyPoint(k.rotate(-l), {
                x: (m.x - q) / 2,
                y: (m.y - t) / 2,
              }),
              H = J.x * J.x,
              T = J.y * J.y;
            f = Math.sqrt((f * y - f * T - y * H) / (f * T + y * H));
            isNaN(f) && (f = 0);
            f = { x: (f * z * J.y) / g, y: (-f * g * J.x) / z };
            c == d && (f = { x: -f.x, y: -f.y });
            f = k.multiplyPoint(
              [k.translate((m.x + q) / 2, (m.y + t) / 2), k.rotate(l)],
              f
            );
            z = k.normalize([
              k.translate(f.x, f.y),
              k.rotate(l),
              k.scale(z, g),
            ]);
            f = k.invert(z);
            m = k.multiplyPoint(f, m);
            t = k.multiplyPoint(f, q, t);
            q = Math.atan2(m.y, m.x);
            f = q - Math.atan2(t.y, t.x);
            d && (f = -f);
            0 > f ? (f += U) : f > U && (f -= U);
            g = I;
            t = A;
            g = d ? g : -g;
            m = [];
            for (c = f; 0 < c; c -= O)
              c < E && ((g = c / 2), (t = Z(g)), (g = d ? g : -g), (c = 0)),
                (J = k.normalize([z, k.rotate(q + g)])),
                d
                  ? ((f = k.multiplyPoint(J, t.c1)),
                    (l = k.multiplyPoint(J, t.c2)),
                    (J = k.multiplyPoint(J, t.e)))
                  : ((f = k.multiplyPoint(J, t.c2)),
                    (l = k.multiplyPoint(J, t.c1)),
                    (J = k.multiplyPoint(J, t.s))),
                m.push([f.x, f.y, l.x, l.y, J.x, J.y]),
                (q += 2 * g);
            return m;
          },
        });
      });
    },
    "dojox/gfx/decompose": function () {
      define(["./_base", "dojo/_base/lang", "./matrix"], function (C, R, k) {
        function Z(A, m) {
          return Math.abs(A - m) <= 1e-6 * (Math.abs(A) + Math.abs(m));
        }
        function U(A, m, z, g) {
          if (!isFinite(A)) return z;
          if (!isFinite(z)) return A;
          m = Math.abs(m);
          g = Math.abs(g);
          return (m * A + g * z) / (m + g);
        }
        function O(A) {
          A = k.normalize(A);
          var m = -A.xx - A.yy,
            z = A.xx * A.yy - A.xy * A.yx,
            g = Math.sqrt(m * m - 4 * z);
          m = -(m + (0 > m ? -g : g)) / 2;
          z /= m;
          g = A.xy / (m - A.xx);
          var f = 1,
            c = A.xy / (z - A.xx),
            d = 1;
          Z(m, z) && ((g = 1), (c = f = 0), (d = 1));
          isFinite(g) ||
            ((g = 1),
            (f = (m - A.xx) / A.xy),
            isFinite(f) ||
              ((g = (m - A.yy) / A.yx),
              (f = 1),
              isFinite(g) || ((g = 1), (f = A.yx / (m - A.yy)))));
          isFinite(c) ||
            ((c = 1),
            (d = (z - A.xx) / A.xy),
            isFinite(d) ||
              ((c = (z - A.yy) / A.yx),
              (d = 1),
              isFinite(c) || ((c = 1), (d = A.yx / (z - A.yy)))));
          A = Math.sqrt(g * g + f * f);
          var q = Math.sqrt(c * c + d * d);
          isFinite((g /= A)) || (g = 0);
          isFinite((f /= A)) || (f = 0);
          isFinite((c /= q)) || (c = 0);
          isFinite((d /= q)) || (d = 0);
          return {
            value1: m,
            value2: z,
            vector1: { x: g, y: f },
            vector2: { x: c, y: d },
          };
        }
        function I(A, m) {
          var z = 0 > A.xx * A.yy || 0 < A.xy * A.yx ? -1 : 1,
            g = (m.angle1 =
              (Math.atan2(A.yx, A.yy) + Math.atan2(-z * A.xy, z * A.xx)) / 2);
          z = Math.cos(g);
          g = Math.sin(g);
          m.sx = U(A.xx / z, z, -A.xy / g, g);
          m.sy = U(A.yy / z, z, A.yx / g, g);
          return m;
        }
        function E(A, m) {
          var z = 0 > A.xx * A.yy || 0 < A.xy * A.yx ? -1 : 1,
            g = (m.angle2 =
              (Math.atan2(z * A.yx, z * A.xx) + Math.atan2(-A.xy, A.yy)) / 2);
          z = Math.cos(g);
          g = Math.sin(g);
          m.sx = U(A.xx / z, z, A.yx / g, g);
          m.sy = U(A.yy / z, z, -A.xy / g, g);
          return m;
        }
        return (C.decompose = function (A) {
          var m = k.normalize(A);
          A = { dx: m.dx, dy: m.dy, sx: 1, sy: 1, angle1: 0, angle2: 0 };
          if (Z(m.xy, 0) && Z(m.yx, 0))
            return R.mixin(A, { sx: m.xx, sy: m.yy });
          if (Z(m.xx * m.yx, -m.xy * m.yy)) return I(m, A);
          if (Z(m.xx * m.xy, -m.yx * m.yy)) return E(m, A);
          var z = new k.Matrix2D(m);
          var g = R.mixin(z, { dx: 0, dy: 0, xy: z.yx, yx: z.xy });
          z = O([m, g]);
          g = O([g, m]);
          z = new k.Matrix2D({
            xx: z.vector1.x,
            xy: z.vector2.x,
            yx: z.vector1.y,
            yy: z.vector2.y,
          });
          g = new k.Matrix2D({
            xx: g.vector1.x,
            xy: g.vector1.y,
            yx: g.vector2.x,
            yy: g.vector2.y,
          });
          m = new k.Matrix2D([k.invert(z), m, k.invert(g)]);
          I(g, A);
          m.xx *= A.sx;
          m.yy *= A.sy;
          E(z, A);
          m.xx *= A.sx;
          m.yy *= A.sy;
          return R.mixin(A, { sx: m.xx, sy: m.yy });
        });
      });
    },
    "dojox/gfx/bezierutils": function () {
      define(["./_base"], function (C) {
        C = C.bezierutils = {};
        C.tAtLength = function (I, E) {
          var A = 0,
            m = 6 == I.length,
            z = 0,
            g = 0,
            f = m ? Z : O,
            c = function (d, q) {
              for (var t = 0, l = 0; l < d.length - 2; l += 2)
                t += k(d[l], d[l + 1], d[l + 2], d[l + 3]);
              l = m ? k(I[0], I[1], I[4], I[5]) : k(I[0], I[1], I[6], I[7]);
              t - l > q || z + t > E + q
                ? (++g,
                  (d = f(d, 0.5)),
                  c(d[0], q),
                  Math.abs(z - E) <= q || c(d[1], q))
                : ((z += t), (A += 1 / (1 << g)));
            };
          E && c(I, 0.5);
          return A;
        };
        var R = (C.computeLength = function (I) {
            for (var E = 6 == I.length, A = 0, m = 0; m < I.length - 2; m += 2)
              A += k(I[m], I[m + 1], I[m + 2], I[m + 3]);
            m = E ? k(I[0], I[1], I[4], I[5]) : k(I[0], I[1], I[6], I[7]);
            return 0.1 < A - m
              ? ((I = E ? Z(I, 0.5) : U(I, 0.5)),
                (A = R(I[0], E)),
                (A += R(I[1], E)))
              : A;
          }),
          k = (C.distance = function (I, E, A, m) {
            return Math.sqrt((A - I) * (A - I) + (m - E) * (m - E));
          }),
          Z = function (I, E) {
            var A = 1 - E,
              m = A * A,
              z = E * E,
              g = I[0],
              f = I[1],
              c = I[2],
              d = I[3],
              q = I[4];
            I = I[5];
            var t = m * g + 2 * A * E * c + z * q;
            m = m * f + 2 * A * E * d + z * I;
            return [
              [g, f, A * g + E * c, A * f + E * d, t, m],
              [t, m, A * c + E * q, A * d + E * I, q, I],
            ];
          },
          U = function (I, E) {
            var A = 1 - E,
              m = A * A,
              z = m * A,
              g = E * E,
              f = g * E,
              c = I[0],
              d = I[1],
              q = I[2],
              t = I[3],
              l = I[4],
              y = I[5],
              J = I[6];
            I = I[7];
            var H = z * c + 3 * m * E * q + 3 * A * g * l + f * J;
            z = z * d + 3 * m * E * t + 3 * A * g * y + f * I;
            return [
              [
                c,
                d,
                A * c + E * q,
                A * d + E * t,
                m * c + 2 * A * E * q + g * l,
                m * d + 2 * A * E * t + g * y,
                H,
                z,
              ],
              [
                H,
                z,
                m * q + 2 * A * E * l + g * J,
                m * t + 2 * A * E * y + g * I,
                A * l + E * J,
                A * y + E * I,
                J,
                I,
              ],
            ];
          },
          O = (C.splitBezierAtT = function (I, E) {
            return 6 == I.length ? Z(I, E) : U(I, E);
          });
        return C;
      });
    },
    "dojox/json/query": function () {
      define([
        "dojo/_base/kernel",
        "dojo/_base/lang",
        "dojox",
        "dojo/_base/array",
      ], function (C, R, k) {
        R.getObject("json", !0, k);
        k.json._slice = function (Z, U, O, I) {
          var E = Z.length,
            A = [];
          O = O || E;
          U = 0 > U ? Math.max(0, U + E) : Math.min(E, U);
          for (O = 0 > O ? Math.max(0, O + E) : Math.min(E, O); U < O; U += I)
            A.push(Z[U]);
          return A;
        };
        k.json._find = function (Z, U) {
          function O(A) {
            U &&
              (!0 !== U || A instanceof Array
                ? A[U] && I.push(A[U])
                : I.push(A));
            for (var m in A) {
              var z = A[m];
              U ? z && "object" == typeof z && O(z) : I.push(z);
            }
          }
          var I = [];
          if (U instanceof Array) {
            if (1 == U.length) return Z[U[0]];
            for (var E = 0; E < U.length; E++) I.push(Z[U[E]]);
          } else O(Z);
          return I;
        };
        k.json._distinctFilter = function (Z, U) {
          for (var O = [], I = {}, E = 0, A = Z.length; E < A; ++E) {
            var m = Z[E];
            U(m, E, Z) &&
              ("object" == typeof m && m
                ? m.__included || ((m.__included = !0), O.push(m))
                : I[m + typeof m] || ((I[m + typeof m] = !0), O.push(m)));
          }
          E = 0;
          for (A = O.length; E < A; ++E) O[E] && delete O[E].__included;
          return O;
        };
        return (k.json.query = function (Z, U) {
          function O(g, f, c, d, q, t, l, y) {
            return E[y].match(/[\*\?]/) || "~" == l
              ? "/^" +
                  E[y]
                    .substring(1, E[y].length - 1)
                    .replace(/\\([btnfr\\"'])|([^\w\*\?])/g, "\\$1$2")
                    .replace(/([\*\?])/g, "[\\w\\W]$1") +
                  ("~" == l ? "$/i" : "$/") +
                  ".test(" +
                  f +
                  ")"
              : g;
          }
          var I = 0,
            E = [];
          Z = Z.replace(
            /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'|[\[\]]/g,
            function (g) {
              I += "[" == g ? 1 : "]" == g ? -1 : 0;
              return "]" == g && 0 < I
                ? "`]"
                : '"' == g.charAt(0) || "'" == g.charAt(0)
                ? "`" + (E.push(g) - 1)
                : g;
            }
          );
          var A = "";
          Z.replace(
            /(\]|\)|push|pop|shift|splice|sort|reverse)\s*\(/,
            function () {
              throw Error("Unsafe function call");
            }
          );
          Z = Z.replace(/([^<>=]=)([^=])/g, "$1\x3d$2")
            .replace(/@|(\.\s*)?[a-zA-Z\$_]+(\s*:)?/g, function (g) {
              return "." == g.charAt(0)
                ? g
                : "@" == g
                ? "$obj"
                : (g.match(/:|^(\$|Math|true|false|null)$/) ? "" : "$obj.") + g;
            })
            .replace(
              /\.?\.?\[(`\]|[^\]])*\]|\?.*|\.\.([\w\$_]+)|\.\*/g,
              function (g, f, c) {
                return (f = g.match(
                  /^\.?\.?(\[\s*\^?\?|\^?\?|\[\s*==)(.*?)\]?$/
                ))
                  ? ((c = ""),
                    g.match(/^\./) &&
                      ((A = "dojox.json._find(" + A), (c = ",true)")),
                    (A =
                      (f[1].match(/=/)
                        ? "dojo.map"
                        : f[1].match(/\^/)
                        ? "dojox.json._distinctFilter"
                        : "dojo.filter") +
                      "(" +
                      A),
                    c + ",function($obj){return " + f[2] + "})")
                  : (f = g.match(/^\[\s*([\/\\].*)\]/))
                  ? ".concat().sort(function(a,b){" +
                    f[1].replace(
                      /\s*,?\s*([\/\\])\s*([^,\\\/]+)/g,
                      function (d, q, t) {
                        return (
                          "var av\x3d " +
                          t.replace(/\$obj/, "a") +
                          ",bv\x3d " +
                          t.replace(/\$obj/, "b") +
                          ";if(av\x3ebv||bv\x3d\x3dnull){return " +
                          ("/" == q ? 1 : -1) +
                          ";}\nif(bv\x3eav||av\x3d\x3dnull){return " +
                          ("/" == q ? -1 : 1) +
                          ";}\n"
                        );
                      }
                    ) +
                    "return 0;})"
                  : (f = g.match(/^\[(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)\]/))
                  ? ((A = "dojox.json._slice(" + A),
                    "," +
                      (f[1] || 0) +
                      "," +
                      (f[2] || 0) +
                      "," +
                      (f[3] || 1) +
                      ")")
                  : g.match(/^\.\.|\.\*|\[\s*\*\s*\]|,/)
                  ? ((A = "dojox.json._find(" + A),
                    ("." == g.charAt(1)
                      ? ",'" + c + "'"
                      : g.match(/,/)
                      ? "," + g
                      : "") + ")")
                  : g;
              }
            )
            .replace(
              /(\$obj\s*((\.\s*[\w_$]+\s*)|(\[\s*`([0-9]+)\s*`\]))*)(==|~)\s*`([0-9]+)/g,
              O
            )
            .replace(
              /`([0-9]+)\s*(==|~)\s*(\$obj\s*((\.\s*[\w_$]+)|(\[\s*`([0-9]+)\s*`\]))*)/g,
              function (g, f, c, d, q, t, l, y) {
                return O(g, d, q, t, l, y, c, f);
              }
            );
          Z =
            A +
            ("$" == Z.charAt(0) ? "" : "$") +
            Z.replace(/`([0-9]+|\])/g, function (g, f) {
              return "]" == f ? "]" : E[f];
            });
          for (
            var m = eval(
                "1\x26\x26function($,$1,$2,$3,$4,$5,$6,$7,$8,$9){var $obj\x3d$;return " +
                  Z +
                  "}"
              ),
              z = 0;
            z < arguments.length - 1;
            z++
          )
            arguments[z] = arguments[z + 1];
          return U ? m.apply(this, arguments) : m;
        });
      });
    },
    "esri/tasks/PrintParameters": function () {
      define([
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/has",
        "../kernel",
      ], function (C, R, k, Z) {
        C = C(null, {
          declaredClass: "esri.tasks.PrintParameters",
          map: null,
          template: null,
          outSpatialReference: null,
          extraParameters: null,
        });
        k("extend-esri") && R.setObject("tasks.PrintParameters", C, Z);
        return C;
      });
    },
    "esri/toolbars/edit": function () {
      define(
        "require dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/_base/Color dojo/has dojo/dom-construct dojo/dom-style ../kernel ../lang ../sniff ./_toolbar ./_Box ./_GraphicMover ./_VertexEditor ./TextEditor ../symbols/SimpleMarkerSymbol ../symbols/SimpleLineSymbol ../symbols/TextSymbol ../graphic".split(
          " "
        ),
        function (
          C,
          R,
          k,
          Z,
          U,
          O,
          I,
          E,
          A,
          m,
          z,
          g,
          f,
          c,
          d,
          q,
          t,
          l,
          y,
          J,
          H
        ) {
          var T = R(f, {
            declaredClass: "esri.toolbars.Edit",
            constructor: function (Q, M) {
              this._map = Q;
              this._tool = 0;
              if (this._map.loaded) this._scratchGL = Q.graphics;
              else
                var B = Z.connect(this._map, "onLoad", this, function () {
                  Z.disconnect(B);
                  B = null;
                  this._scratchGL = this._map.graphics;
                });
              Q = I("esri-mobile");
              this._defaultOptions = k.mixin(
                {
                  vertexSymbol: new l(
                    l.STYLE_CIRCLE,
                    Q ? 20 : 12,
                    new y(y.STYLE_SOLID, new O([0, 0, 0, 0.5]), 1),
                    new O([128, 128, 128])
                  ),
                  ghostVertexSymbol: new l(
                    l.STYLE_CIRCLE,
                    Q ? 18 : 10,
                    new y(y.STYLE_SOLID, new O([0, 0, 0, 0.5]), 1),
                    new O([255, 255, 255, 0.75])
                  ),
                  ghostLineSymbol: new y(
                    y.STYLE_DOT,
                    new O([128, 128, 128]),
                    2
                  ),
                  allowDeleteVertices: !0,
                  allowAddVertices: !0,
                  rotateHandleOffset: Q ? 24 : 16,
                  boxLineSymbol: new y(y.STYLE_DASH, new O([64, 64, 64]), 1),
                  boxHandleSymbol: new l(
                    l.STYLE_SQUARE,
                    Q ? 16 : 9,
                    new y(y.STYLE_SOLID, new O([0, 0, 0, 0.5]), 1),
                    new O([255, 255, 255, 0.75])
                  ),
                  textAnchorSymbol: new l(
                    l.STYLE_CIRCLE,
                    10,
                    null,
                    new O([255, 0, 0])
                  ),
                },
                M || {}
              );
            },
            activate: function (Q, M, B) {
              this.deactivate();
              this._graphic = M;
              this._options = k.mixin(
                k.mixin({}, this._defaultOptions),
                B || {}
              );
              var G = T.MOVE;
              B = T.EDIT_VERTICES;
              var ca = T.SCALE,
                N = T.ROTATE,
                F = T.EDIT_TEXT,
                X = !1,
                x = !1,
                da = !1,
                ba = this._map,
                v = ba.spatialReference,
                n = M.geometry.spatialReference;
              this._geo = !(
                !v ||
                !n ||
                v.equals(n) ||
                !v.isWebMercator() ||
                4326 !== n.wkid
              );
              this._isTextPoint = this._prepareTextSymbolEditing(M, Q);
              (Q & G) === G && (X = this._enableMove(M));
              G = (Q & ca) === ca;
              N = (Q & N) === N;
              if (G || N) da = this._enableBoxEditing(M, G, N);
              (Q & B) === B && (x = this._enableVertexEditing(M));
              (Q & F) === F && this._enableTextEditing(M);
              if (!(X || x || da))
                throw Error(
                  "[esri.toolbars.Edit::activate] Unable to activate the tool. Check if the tool is valid for the given geometry type."
                );
              if ((this._tool = Q))
                (this._mapPanEndHandle = Z.connect(
                  ba,
                  "onPanEnd",
                  this,
                  this._mapPanEndHandler
                )),
                  (this._mapExtChgHandle = Z.connect(
                    ba,
                    "onExtentChange",
                    this,
                    this._mapExtentChangeHandler
                  )),
                  this.onActivate(this._tool, M);
              ba.snappingManager &&
                (X || x) &&
                ba.snappingManager._startSelectionLayerQuery();
            },
            deactivate: function () {
              this._isTextPoint = null;
              var Q = this._tool,
                M = this._graphic;
              if (Q) {
                var B = !!this._modified;
                this._clear();
                Z.disconnect(this._mapPanEndHandle);
                Z.disconnect(this._mapExtChgHandle);
                this._graphic =
                  this._geo =
                  this._mapPanEndHandle =
                  this._mapExtChgHandle =
                    null;
                this.onDeactivate(Q, M, { isModified: B });
                this._map.snappingManager &&
                  this._map.snappingManager._stopSelectionLayerQuery();
              }
            },
            refresh: function () {
              this._refreshMoveables(!0);
            },
            getCurrentState: function () {
              return {
                tool: this._tool,
                graphic: this._graphic,
                isModified: !!this._modified,
              };
            },
            onActivate: function (Q, M) {},
            onDeactivate: function (Q, M, B) {},
            onGraphicMoveStart: function (Q) {},
            onGraphicFirstMove: function (Q) {
              this._modified = !0;
            },
            onGraphicMove: function (Q, M) {},
            onGraphicMoveStop: function (Q, M) {},
            onGraphicClick: function (Q, M) {},
            onVertexMoveStart: function (Q, M) {},
            onVertexFirstMove: function (Q, M) {
              this._modified = !0;
            },
            onVertexMove: function (Q, M, B) {},
            onVertexMoveStop: function (Q, M, B) {},
            onVertexAdd: function (Q, M) {
              this._modified = !0;
            },
            onVertexClick: function (Q, M) {},
            onVertexMouseOver: function (Q, M) {},
            onVertexMouseOut: function (Q, M) {},
            onVertexDelete: function (Q, M) {
              this._modified = !0;
            },
            onTextEditStart: function (Q, M) {},
            onTextEditEnd: function (Q) {},
            onScaleStart: function (Q) {},
            onScaleFirstMove: function (Q) {
              this._modified = !0;
            },
            onScale: function (Q, M) {},
            onScaleStop: function (Q, M) {},
            onRotateStart: function (Q) {},
            onRotateFirstMove: function (Q) {
              this._modified = !0;
            },
            onRotate: function (Q, M) {},
            onRotateStop: function (Q, M) {},
            _eventMap: {
              activate: ["tool", "graphic"],
              deactivate: ["tool", "graphic", "info"],
              "graphic-move-start": ["graphic"],
              "graphic-first-move": ["graphic"],
              "graphic-move": ["graphic", "transform"],
              "graphic-move-stop": ["graphic", "transform"],
              "graphic-click": ["graphic", "info"],
              "vertex-move-start": ["graphic", "vertexinfo"],
              "vertex-first-move": ["graphic", "vertexinfo"],
              "vertex-move": ["graphic", "vertexinfo", "transform"],
              "vertex-move-stop": ["graphic", "vertexinfo", "transform"],
              "vertex-add": ["graphic", "vertexinfo"],
              "vertex-click": ["graphic", "vertexinfo"],
              "vertex-mouse-over": ["graphic", "vertexinfo"],
              "vertex-mouse-out": ["graphic", "vertexinfo"],
              "vertex-delete": ["graphic", "vertexinfo"],
              "scale-start": ["graphic"],
              "scale-first-move": ["graphic"],
              scale: ["graphic", "info"],
              "scale-stop": ["graphic", "info"],
              "rotate-start": ["graphic"],
              "rotate-first-move": ["graphic"],
              rotate: ["graphic", "info"],
              "rotate-stop": ["graphic", "info"],
            },
            _prepareTextSymbolEditing: function (Q, M) {
              if (
                "point" === Q.geometry.type ||
                "multipoint" === Q.geometry.type
              ) {
                var B = Q.getLayer(),
                  G = B.renderer;
                B = Q.symbol || B._getSymbol(Q);
                !B &&
                  (G.hasVisualVariables("sizeInfo", !1) ||
                    G.hasVisualVariables("colorInfo", !1) ||
                    G.hasVisualVariables("opacityInfo", !1)) &&
                  G.addBreak &&
                  G.infos &&
                  1 === G.infos.length &&
                  (B = G.infos[0].symbol || G.defaultSymbol);
                if (B && "textsymbol" === B.type) {
                  if (
                    (M & T.SCALE) === T.SCALE ||
                    (M & T.ROTATE) === T.ROTATE ||
                    (M & T.EDIT_TEXT) === T.EDIT_TEXT
                  ) {
                    Q.setSymbol(new J(B.toJson()));
                    var ca = this;
                    this._textSymbolEditor
                      ? (this._textSymbolEditor.createForm(Q),
                        this._textSymbolEditor.show())
                      : this._options && this._options.textSymbolEditor
                      ? ((this._textSymbolEditor =
                          this._options.textSymbolEditor),
                        this._textSymbolEditor.on("symbol-change", function () {
                          ca._boxEditor && ca._boxEditor.refresh();
                        }))
                      : C(["../dijit/SymbolEditor"], function (N) {
                          if (!ca._textSymbolEditor) {
                            var F = ca._options.textSymbolEditorHolder
                              ? E.create(
                                  "div",
                                  null,
                                  ca._options.textSymbolEditorHolder
                                )
                              : E.create("div", null, ca._map.root);
                            ca._textSymbolEditor = new N({ graphic: Q }, F);
                            N = ca._textSymbolEditor.domNode.parentNode.id;
                            A.set(ca._textSymbolEditor.domNode, {
                              position:
                                "map_root" === N ? "absolute" : "relative",
                              left:
                                "map_root" === N
                                  ? ca._map.width / 2 - 100 + "px"
                                  : "5px",
                              top: "20px",
                              "z-index": 50,
                            });
                            ca._textSymbolEditor.startup();
                            ca._textSymbolEditor.createForm(Q);
                            ca._textSymbolEditor.show();
                            ca._textSymbolEditor.on(
                              "symbol-change",
                              function () {
                                ca._boxEditor && ca._boxEditor.refresh();
                              }
                            );
                          }
                        });
                  }
                  if (
                    (M & T.MOVE) === T.MOVE ||
                    (M & T.ROTATE) === T.ROTATE ||
                    (M & T.SCALE) === T.SCALE
                  )
                    (this._textAnchor = new H(
                      Q.geometry,
                      this._options.textAnchorSymbol
                    )),
                      this._scratchGL.add(this._textAnchor);
                  return !0;
                }
              }
              return !1;
            },
            _enableMove: function (Q) {
              var M = this._map;
              switch (Q.geometry.type) {
                case "point":
                case "polyline":
                case "polygon":
                  return (
                    (this._graphicMover = new d(Q, M, this, this._textAnchor)),
                    !0
                  );
              }
              return !1;
            },
            _enableVertexEditing: function (Q) {
              var M = this._map;
              switch (Q.geometry.type) {
                case "multipoint":
                case "polyline":
                case "polygon":
                  return (this._vertexEditor = q.create(Q, M, this)), !0;
              }
              return !1;
            },
            _enableBoxEditing: function (Q, M, B) {
              var G = this._map,
                ca = Q.geometry.type;
              return "polyline" === ca || "polygon" === ca || this._isTextPoint
                ? ((this._boxEditor = new c(
                    Q,
                    G,
                    this,
                    M,
                    B,
                    this._options.uniformScaling,
                    this._isTextPoint
                  )),
                  !0)
                : !1;
            },
            _enableTextEditing: function (Q) {
              return this._isTextPoint
                ? ((this._textEditor = new t(Q, this._map, this)),
                  Z.connect(
                    this._textEditor,
                    "onEditStart",
                    k.hitch(this, function () {
                      this._textAnchor &&
                        (this._textAnchor.getLayer().remove(this._textAnchor),
                        (this._textAnchor = null));
                      this._map.disableKeyboardNavigation();
                      this._disableMove();
                      this._disableBoxEditing();
                    })
                  ),
                  !0)
                : !1;
            },
            _disableMove: function () {
              var Q = this._graphicMover;
              Q && (Q.destroy(), (this._graphicMover = null));
            },
            _disableVertexEditing: function () {
              var Q = this._vertexEditor;
              Q && (Q.destroy(), (this._vertexEditor = null));
            },
            _disableBoxEditing: function () {
              var Q = this._boxEditor;
              Q && (Q.destroy(), (this._boxEditor = null));
            },
            _disableTextEditing: function () {
              this._textEditor &&
                (this._textEditor.destroy(), (this._textEditor = null));
              this._map.enableKeyboardNavigation();
            },
            _disableSymbolEditing: function () {
              this._textSymbolEditor && this._textSymbolEditor.hide();
            },
            _clear: function () {
              this._disableMove();
              this._disableVertexEditing();
              this._disableBoxEditing();
              this._disableTextEditing();
              this._disableSymbolEditing();
              this._textAnchor &&
                (this._textAnchor.getLayer().remove(this._textAnchor),
                (this._textAnchor = null));
              this._tool = 0;
              this._modified = !1;
            },
            _mapPanEndHandler: function () {
              this._refreshMoveables();
            },
            _mapExtentChangeHandler: function (Q, M, B) {
              B && this._refreshMoveables();
            },
            _refreshMoveables: function (Q) {
              var M = U.filter(
                [this._graphicMover, this._vertexEditor, this._boxEditor],
                z.isDefined
              );
              U.forEach(M, function (B) {
                B.refresh(Q);
              });
            },
            _beginOperation: function (Q) {
              U.forEach(this._getAffectedTools(Q), function (M) {
                M.suspend();
              });
            },
            _endOperation: function (Q) {
              U.forEach(this._getAffectedTools(Q), function (M) {
                M.resume();
              });
            },
            _getAffectedTools: function (Q) {
              var M = [];
              switch (Q) {
                case "MOVE":
                  M = [this._vertexEditor, this._boxEditor];
                  break;
                case "VERTICES":
                  M = [this._boxEditor];
                  break;
                case "BOX":
                  M = [this._vertexEditor];
              }
              return (M = U.filter(M, z.isDefined));
            },
          });
          k.mixin(T, {
            MOVE: 1,
            EDIT_VERTICES: 2,
            SCALE: 4,
            ROTATE: 8,
            EDIT_TEXT: 16,
          });
          I("extend-esri") && k.setObject("toolbars.Edit", T, m);
          return T;
        }
      );
    },
    "esri/toolbars/_Box": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/Color dojo/has dojo/dom-style dojox/gfx/Moveable dojox/gfx/matrix ../kernel ../lang ../geometry/Point ../geometry/Polyline ../symbols/SimpleMarkerSymbol ../geometry/webMercatorUtils ../geometry/jsonUtils ../graphic".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g, f, c, d, q, t) {
          C = C(null, {
            declaredClass: "esri.toolbars._Box",
            constructor: function (l, y, J, H, T, Q, M) {
              this._graphic = l;
              this._map = y;
              this._toolbar = J;
              this._scale = H;
              this._rotate = T;
              this._defaultEventArgs = {};
              this._scaleEvent = "Scale";
              this._rotateEvent = "Rotate";
              this._uniformScaling = Q;
              l = J._options;
              this._markerSymbol = l.boxHandleSymbol;
              this._lineSymbol = l.boxLineSymbol;
              this._moveStartHandler = R.hitch(this, this._moveStartHandler);
              this._firstMoveHandler = R.hitch(this, this._firstMoveHandler);
              this._moveStopHandler = R.hitch(this, this._moveStopHandler);
              this._moveHandler = R.hitch(this, this._moveHandler);
              this._isTextPoint = M;
              this._init();
            },
            destroy: function () {
              this._cleanUp();
              this._graphic =
                this._map =
                this._toolbar =
                this._markerSymbol =
                this._lineSymbol =
                  null;
            },
            refresh: function () {
              this._draw();
            },
            suspend: function () {
              k.forEach(this._getAllGraphics(), function (l) {
                l.hide();
              });
            },
            resume: function () {
              k.forEach(this._getAllGraphics(), function (l) {
                l.show();
              });
              this._draw();
            },
            _init: function () {
              this._draw();
            },
            _cleanUp: function () {
              this._connects && k.forEach(this._connects, Z.disconnect);
              var l = this._toolbar._scratchGL;
              this._anchors &&
                k.forEach(this._anchors, function (y) {
                  l.remove(y.graphic);
                  (y = y.moveable) && y.destroy();
                });
              this._box && l.remove(this._box);
              this._box = this._anchors = this._connects = null;
            },
            _draw: function () {
              if (this._graphic.getDojoShape()) {
                var l = this._map,
                  y = this._toolbar._scratchGL,
                  J = this._getBoxCoords(),
                  H = new f(l.spatialReference),
                  T = R.clone(
                    k.filter(J, function (Q, M) {
                      return 8 !== M && 0 === M % 2;
                    })
                  );
                T[0] && T.push([T[0][0], T[0][1]]);
                H.addPath(T);
                this._rotate && H.addPath([J[1], J[8]]);
                this._box
                  ? this._box.setGeometry(H)
                  : ((this._box = new t(H, this._lineSymbol)),
                    y.add(this._box));
                this._anchors
                  ? k.forEach(
                      this._anchors,
                      function (Q, M) {
                        this._scale || (M = 8);
                        var B = new g(J[M], l.spatialReference);
                        Q.graphic.setGeometry(B);
                        B = Q.moveable;
                        var G = Q.graphic.getDojoShape();
                        G &&
                          (B
                            ? G !== B.shape &&
                              (B.destroy(),
                              (Q.moveable = this._getMoveable(Q.graphic, M)))
                            : (Q.moveable = this._getMoveable(Q.graphic, M)));
                      },
                      this
                    )
                  : ((this._anchors = []),
                    (this._connects = []),
                    k.forEach(
                      J,
                      function (Q, M) {
                        (!this._scale && 8 > M) ||
                          ((Q = new g(Q, l.spatialReference)),
                          (Q = new t(Q, this._markerSymbol)),
                          this._isTextPoint && 1 === M % 2 && Q.hide(),
                          y.add(Q),
                          this._anchors.push({
                            graphic: Q,
                            moveable: this._getMoveable(Q, M),
                          }));
                      },
                      this
                    ));
              } else this._cleanUp();
            },
            _getBoxCoords: function (l) {
              var y = this._map,
                J = [],
                H,
                T,
                Q;
              if (this._isTextPoint) {
                var M = this._graphic.getNode().getBoundingClientRect();
                var B = y.__container.getBoundingClientRect();
                M = [
                  { x: M.left - B.left, y: M.top - B.top },
                  { x: M.right - B.left, y: M.top - B.top },
                  { x: M.right - B.left, y: M.bottom - B.top },
                  { x: M.left - B.left, y: M.bottom - B.top },
                ];
              } else M = this._getTransformedBoundingBox(this._graphic);
              k.forEach(M, function (G, ca, N) {
                H = G;
                (T = N[ca + 1]) || (T = N[0]);
                Q = { x: (H.x + T.x) / 2, y: (H.y + T.y) / 2 };
                l || ((H = y.toMap(H)), (Q = y.toMap(Q)));
                J.push([H.x, H.y]);
                J.push([Q.x, Q.y]);
              });
              this._rotate &&
                ((M = R.clone(J[1])),
                (M = l
                  ? { x: M[0], y: M[1] }
                  : y.toScreen({
                      x: M[0],
                      y: M[1],
                      spatialReference: y.spatialReference,
                    })),
                (M.y -= this._toolbar._options.rotateHandleOffset),
                l || (M = y.toMap(M)),
                J.push([M.x, M.y]));
              return J;
            },
            _getTransformedBoundingBox: function (l) {
              var y = this._map,
                J = l.geometry.getExtent(),
                H = l.geometry.spatialReference;
              l = new g(J.xmin, J.ymax, H);
              J = new g(J.xmax, J.ymin, H);
              l = y.toScreen(l);
              J = y.toScreen(J);
              return [
                { x: l.x, y: l.y },
                { x: J.x, y: l.y },
                { x: J.x, y: J.y },
                { x: l.x, y: J.y },
              ];
            },
            _getAllGraphics: function () {
              var l = [this._box];
              this._anchors &&
                k.forEach(this._anchors, function (y) {
                  l.push(y.graphic);
                });
              return (l = k.filter(l, z.isDefined));
            },
            _getMoveable: function (l, y) {
              var J = l.getDojoShape();
              if (J)
                return (
                  (l = new E(J)),
                  (l._index = y),
                  this._connects.push(
                    Z.connect(l, "onMoveStart", this._moveStartHandler)
                  ),
                  this._connects.push(
                    Z.connect(l, "onFirstMove", this._firstMoveHandler)
                  ),
                  this._connects.push(
                    Z.connect(l, "onMoveStop", this._moveStopHandler)
                  ),
                  (l.onMove = this._moveHandler),
                  (J = J.getEventSource()) &&
                    I.set(J, "cursor", this._toolbar._cursors["box" + y]),
                  l
                );
            },
            _moveStartHandler: function (l) {
              this._toolbar[
                "on" +
                  (8 === l.host._index ? this._rotateEvent : this._scaleEvent) +
                  "Start"
              ](this._graphic);
            },
            _firstMoveHandler: function (l) {
              this._toolbar._deactivateScrollWheel();
              var y = l.host._index,
                J = (this._wrapOffset = l.host.shape._wrapOffsets[0] || 0),
                H = this._graphic.getLayer().getNavigationTransform();
              l = k.map(this._getBoxCoords(!0), function (Q) {
                return { x: Q[0] + J, y: Q[1] };
              });
              var T = this._isTextPoint
                ? this._map.toScreen(this._graphic.geometry)
                : { x: l[1].x, y: l[3].y };
              this._centerCoord = A.multiplyPoint(A.invert(H), T);
              if (8 === y)
                (T = A.multiplyPoint(A.invert(H), l[1])),
                  this._isTextPoint &&
                    (this._centerCoord = this._deNormalizePoint(
                      this._centerCoord,
                      T
                    )),
                  (this._startLine = [this._centerCoord, T]),
                  (this._moveLine = R.clone(this._startLine));
              else if (
                ((T = A.multiplyPoint(A.invert(H), l[y])),
                (H = A.multiplyPoint(A.invert(H), l[(y + 4) % 8])),
                this._isTextPoint &&
                  (this._centerCoord = this._deNormalizePoint(
                    this._centerCoord,
                    T
                  )),
                (this._firstMoverToAnchor = Math.sqrt(
                  (T.x - this._centerCoord.x) * (T.x - this._centerCoord.x) +
                    (T.y - this._centerCoord.y) * (T.y - this._centerCoord.y)
                )),
                (this._startBox = H),
                (this._startBox.width = l[4].x - l[0].x),
                (this._startBox.height = l[4].y - l[0].y),
                (this._moveBox = R.clone(this._startBox)),
                (this._xfactor = T.x > H.x ? 1 : -1),
                (this._yfactor = T.y > H.y ? 1 : -1),
                1 === y || 5 === y)
              )
                this._xfactor = 0;
              else if (3 === y || 7 === y) this._yfactor = 0;
              this._toolbar._beginOperation("BOX");
              this._toolbar[
                "on" +
                  (8 === y ? this._rotateEvent : this._scaleEvent) +
                  "FirstMove"
              ](this._graphic);
            },
            _moveHandler: function (l, y) {
              l = l.host._index;
              var J = this._defaultEventArgs;
              J.angle = 0;
              J.scaleX = 1;
              J.scaleY = 1;
              if (8 === l) {
                var H = this._startLine;
                var T = this._moveLine;
                var Q = T[1];
                Q.x += y.dx;
                Q.y += y.dy;
                y = this._getAngle(H, T);
                this._isTextPoint && (y += this._graphic.symbol.angle);
                T = A.rotategAt(y, H[0]);
                this._graphic.getDojoShape().setTransform(T);
                J.transform = T;
                J.angle = y;
                J.around = H[0];
              } else {
                H = this._startBox;
                T = this._moveBox;
                T.width += y.dx * this._xfactor;
                T.height += y.dy * this._yfactor;
                this._uniformScaling || this._isTextPoint
                  ? ((H = T.x + this._xfactor * T.width),
                    (T = T.y + this._yfactor * T.height),
                    (H = Math.sqrt(
                      (H - this._centerCoord.x) * (H - this._centerCoord.x) +
                        (T - this._centerCoord.y) * (T - this._centerCoord.y)
                    )),
                    (this._scaleRatio = y = Q = H / this._firstMoverToAnchor),
                    (H = this._centerCoord))
                  : ((y = T.width / H.width),
                    (Q = T.height / H.height),
                    (H = { x: H.x, y: H.y }));
                if (isNaN(y) || Infinity === y || -Infinity === y) y = 1;
                if (isNaN(Q) || Infinity === Q || -Infinity === Q) Q = 1;
                T = A.scaleAt(y, Q, H);
                if (this._isTextPoint) {
                  var M = A.rotategAt(this._graphic.symbol.angle, H);
                  this._graphic.getDojoShape().setTransform([M, T]);
                } else this._graphic.getDojoShape().setTransform(T);
                J.transform = T;
                J.scaleX = y;
                J.scaleY = Q;
                J.around = H;
              }
              this._toolbar[
                "on" + (8 === l ? this._rotateEvent : this._scaleEvent)
              ](this._graphic, J);
            },
            _moveStopHandler: function (l) {
              this._toolbar._activateScrollWheel();
              var y = this._graphic,
                J = this._toolbar,
                H = J._geo ? d.geographicToWebMercator(y.geometry) : y.geometry,
                T = H.spatialReference,
                Q = y.getDojoShape(),
                M = Q.getTransform(),
                B = y.getLayer().getNavigationTransform();
              this._isTextPoint
                ? ((y = this._graphic.symbol),
                  8 === l.host._index
                    ? (y.angle += this._getAngle(
                        this._startLine,
                        this._moveLine
                      ))
                    : y.font.setSize(
                        Math.round(y.font.size * this._scaleRatio * 100) / 100
                      ),
                  this._graphic.setSymbol(y))
                : ((H = H.toJson()),
                  this._updateSegments(H.paths || H.rings, M, B, T),
                  Q.setTransform(null),
                  (H = q.fromJson(H)),
                  y.setGeometry(J._geo ? d.webMercatorToGeographic(H, !0) : H));
              this._draw();
              this._startLine =
                this._moveLine =
                this._startBox =
                this._moveBox =
                this._xfactor =
                this._yfactor =
                  null;
              J._endOperation("BOX");
              this._defaultEventArgs.transform = M;
              J[
                "on" +
                  (8 === l.host._index ? this._rotateEvent : this._scaleEvent) +
                  "Stop"
              ](this._graphic, this._defaultEventArgs);
            },
            _updateSegments: function (l, y, J, H) {
              var T = this._map,
                Q = this._wrapOffset || 0;
              k.forEach(
                l,
                function (M) {
                  k.forEach(
                    M,
                    function (B) {
                      this._updatePoint(B, H, Q, A, T, J, y);
                    },
                    this
                  );
                },
                this
              );
            },
            _updatePoint: function (l, y, J, H, T, Q, M) {
              y = T.toScreen({ x: l[0], y: l[1], spatialReference: y }, !0);
              y.x += J;
              y = H.multiplyPoint([Q, M, H.invert(Q)], y);
              y.x -= J;
              J = T.toMap(y);
              l[0] = J.x;
              l[1] = J.y;
            },
            _getAngle: function (l, y) {
              return (
                (180 * Math.atan2(y[0].y - y[1].y, y[0].x - y[1].x)) / Math.PI -
                (180 * Math.atan2(l[0].y - l[1].y, l[0].x - l[1].x)) / Math.PI
              );
            },
            _deNormalizePoint: function (l, y) {
              var J = this._map._getFrameWidth();
              if (-1 === J) return l;
              for (l = { x: l.x, y: l.y }; Math.abs(l.x - y.x) >= J; )
                l.x = l.x < y.x ? l.x + J : l.x - J;
              var H = Math.abs(l.x - y.x);
              Math.abs(l.x - y.x + J) < H
                ? (l.x += J)
                : Math.abs(l.x - y.x - J) < H && (l.x -= J);
              return l;
            },
          });
          O("extend-esri") && R.setObject("toolbars._Box", C, m);
          return C;
        }
      );
    },
    "dojox/gfx/Moveable": function () {
      define(
        "dojo/_base/lang dojo/_base/declare dojo/_base/array dojo/_base/event dojo/topic dojo/touch dojo/dom-class dojo/_base/window ./Mover dojo/mouse".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m) {
          return R("dojox.gfx.Moveable", null, {
            constructor: function (z, g) {
              this.shape = z;
              this.delay = g && 0 < g.delay ? g.delay : 0;
              this.mover = g && g.mover ? g.mover : A;
              this.leftButtonOnly = g && g.leftButtonOnly;
              this.events = [
                this.shape.on(O.press, C.hitch(this, "onMouseDown")),
              ];
            },
            destroy: function () {
              k.forEach(this.events, function (z) {
                z.remove();
              });
              this.events = this.shape = null;
            },
            onMouseDown: function (z) {
              this.delay
                ? (this.events.push(
                    this.shape.on(O.move, C.hitch(this, "onMouseMove")),
                    this.shape.on(O.release, C.hitch(this, "onMouseUp"))
                  ),
                  (this._lastX = z.clientX),
                  (this._lastY = z.clientY))
                : (this.leftButtonOnly && !m.isLeft(z)) ||
                  new this.mover(this.shape, z, this);
              Z.stop(z);
            },
            onMouseMove: function (z) {
              var g = z.clientY;
              if (
                Math.abs(z.clientX - this._lastX) > this.delay ||
                Math.abs(g - this._lastY) > this.delay
              )
                this.onMouseUp(z), new this.mover(this.shape, z, this);
              Z.stop(z);
            },
            onMouseUp: function (z) {
              this.events.pop().remove();
            },
            onMoveStart: function (z) {
              U.publish("/gfx/move/start", z);
              I.add(E.body(), "dojoMove");
            },
            onMoveStop: function (z) {
              U.publish("/gfx/move/stop", z);
              I.remove(E.body(), "dojoMove");
            },
            onFirstMove: function (z) {},
            onMove: function (z, g, f) {
              this.onMoving(z, g, f);
              this.shape.applyLeftTransform(g);
              this.onMoved(z, g);
            },
            onMoving: function (z, g) {},
            onMoved: function (z, g) {},
          });
        }
      );
    },
    "dojox/gfx/Mover": function () {
      define(
        "dojo/_base/lang dojo/_base/array dojo/_base/declare dojo/on dojo/touch dojo/_base/event".split(
          " "
        ),
        function (C, R, k, Z, U, O) {
          return k("dojox.gfx.Mover", null, {
            constructor: function (I, E, A) {
              this.shape = I;
              this.lastX = E.clientX;
              this.lastY = E.clientY;
              I = this.host = A;
              E = document;
              A = Z(E, U.move, C.hitch(this, "onFirstMove"));
              this.events = [
                Z(E, U.move, C.hitch(this, "onMouseMove")),
                Z(E, U.release, C.hitch(this, "destroy")),
                Z(E, "dragstart", C.hitch(O, "stop")),
                Z(E, "selectstart", C.hitch(O, "stop")),
                A,
              ];
              if (I && I.onMoveStart) I.onMoveStart(this);
            },
            onMouseMove: function (I) {
              var E = I.clientX,
                A = I.clientY;
              this.host.onMove(
                this,
                { dx: E - this.lastX, dy: A - this.lastY },
                I
              );
              this.lastX = E;
              this.lastY = A;
              O.stop(I);
            },
            onFirstMove: function () {
              this.host.onFirstMove(this);
              this.events.pop().remove();
            },
            destroy: function () {
              R.forEach(this.events, function (E) {
                E.remove();
              });
              var I = this.host;
              if (I && I.onMoveStop) I.onMoveStop(this);
              this.events = this.shape = null;
            },
          });
        }
      );
    },
    "esri/toolbars/_GraphicMover": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/json dojo/dom-style dojox/gfx/Moveable dojox/gfx/Mover dojox/gfx/matrix ../kernel ../PointerEvents ../sniff ../geometry/webMercatorUtils ../geometry/ScreenPoint ../geometry/Point".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g, f, c) {
          var d = C(null, {
            declaredClass: "esri.toolbars._GraphicMover",
            constructor: function (q, t, l, y) {
              this.graphic = q;
              this.map = t;
              this.toolbar = l;
              this.tempPt = y;
              this._enableGraphicMover();
              this._moved = !1;
            },
            refresh: function (q) {
              var t = this.graphic.getDojoShape();
              !t ||
                (!q && t._hostGraphic) ||
                (this._disableGraphicMover(), this._enableGraphicMover());
            },
            destroy: function () {
              this._disableGraphicMover();
            },
            hasMoved: function () {
              return this._moved;
            },
            _enableGraphicMover: function () {
              var q = this.graphic,
                t = q.getDojoShape();
              t &&
                ((t._hostGraphic = q),
                (this._moveable = new O(t, { mover: d.Mover })),
                (this._moveStartHandle = k.connect(
                  this._moveable,
                  "onMoveStart",
                  this,
                  this._moveStartHandler
                )),
                (this._firstMoveHandle = k.connect(
                  this._moveable,
                  "onFirstMove",
                  this,
                  this._firstMoveHandler
                )),
                (this._movingHandle = k.connect(
                  this._moveable,
                  "onMoving",
                  this,
                  this._movingHandler
                )),
                (this._moveStopHandle = k.connect(
                  this._moveable,
                  "onMoveStop",
                  this,
                  this._moveStopHandler
                )),
                (q = t.getEventSource()) &&
                  U.set(q, "cursor", this.toolbar._cursors.move));
            },
            _disableGraphicMover: function () {
              var q = this._moveable;
              if (q) {
                k.disconnect(this._moveStartHandle);
                k.disconnect(this._firstMoveHandle);
                k.disconnect(this._movingHandle);
                k.disconnect(this._moveStopHandle);
                var t = q.shape;
                t &&
                  ((t._hostGraphic = null),
                  (t = t.getEventSource()) && U.set(t, "cursor", "inherit"));
                q.destroy();
              }
              this._moveable = null;
            },
            _moveStartHandler: function () {
              var q = this.graphic,
                t = this.map;
              this._startTx = q.getDojoShape().getTransform();
              "point" === this.graphic.geometry.type &&
                t.snappingManager &&
                t.snappingManager._setUpSnapping();
              this.toolbar.onGraphicMoveStart(q);
            },
            _firstMoveHandler: function () {
              this.toolbar._beginOperation("MOVE");
              this.toolbar.onGraphicFirstMove(this.graphic);
            },
            _movingHandler: function (q, t, l) {
              q = q.shape.getTransform();
              t = this.map;
              var y;
              z("esri-pointer")
                ? (y = t.navigationManager.pointerEvents._processTouchEvent(
                    l,
                    l
                  ))
                : l &&
                  "pointermove" === l.type &&
                  (y = m.prototype._processTouchEvent.call({ map: t }, l, l));
              y &&
                t.snappingManager &&
                t.snappingManager._onSnappingMouseMoveHandler(y);
              this.tempPt && this.tempPt.getDojoShape().setTransform(q);
              this.toolbar.onGraphicMove(this.graphic, q);
            },
            _moveStopHandler: function (q) {
              var t = this.graphic,
                l = this.toolbar,
                y = this.map,
                J = l._geo ? g.geographicToWebMercator(t.geometry) : t.geometry,
                H = J.type,
                T = t.getDojoShape(),
                Q = T.getTransform();
              if (Z.toJson(Q) !== Z.toJson(this._startTx)) {
                this._moved = !0;
                switch (H) {
                  case "point":
                    H = [Q, E.invert(this._startTx)];
                    if (y.snappingManager)
                      var M = y.snappingManager._snappingPoint;
                    J = M || y.toMap(E.multiplyPoint(H, y.toScreen(J, !0)));
                    y.snappingManager && y.snappingManager._killOffSnapping();
                    break;
                  case "polyline":
                    J = this._updatePolyGeometry(J, J.paths, Q);
                    break;
                  case "polygon":
                    J = this._updatePolyGeometry(J, J.rings, Q);
                }
                T.setTransform(null);
                t.setGeometry(l._geo ? g.webMercatorToGeographic(J, !0) : J);
                this.tempPt &&
                  this.tempPt.setGeometry(new c(t.geometry.toJson()));
              } else this._moved = !1;
              l._endOperation("MOVE");
              l.onGraphicMoveStop(t, Q);
              this._moved ||
                ((q = q.__e),
                (y = this.map.position),
                (q = new f(q.pageX - y.x, q.pageY - y.y)),
                l.onGraphicClick(t, {
                  screenPoint: q,
                  mapPoint: this.map.toMap(q),
                }));
            },
            _updatePolyGeometry: function (q, t, l) {
              var y = this.map,
                J = q.getPoint(0, 0);
              y = y.toMap(y.toScreen(J).offset(l.dx, l.dy));
              l = y.x - J.x;
              J = y.y - J.y;
              var H;
              for (y = 0; y < t.length; y++) {
                var T = t[y];
                for (H = 0; H < T.length; H++) {
                  var Q = q.getPoint(y, H);
                  q.setPoint(y, H, Q.offset(l, J));
                }
              }
              return q;
            },
          });
          d.Mover = C(I, {
            declaredClass: "esri.toolbars._Mover",
            constructor: function (q, t, l) {
              this.__e = t;
            },
          });
          z("extend-esri") &&
            (R.setObject("toolbars._GraphicMover", d, A),
            R.setObject("toolbars._Mover", d.Mover, A));
          return d;
        }
      );
    },
    "esri/toolbars/_VertexEditor": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/array dojo/has dijit/Menu dijit/MenuItem ../kernel ./_VertexMover ../geometry/Point ../geometry/jsonUtils dojo/i18n!../nls/jsapi".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g) {
          var f = C(null, {
            declaredClass: "esri.toolbars._GraphicVertexEditor",
            constructor: function (c, d, q) {
              this.graphic = c;
              this.map = d;
              this.toolbar = q;
              c = q._options;
              this._symbol1 = c.vertexSymbol;
              this._symbol2 = c.ghostVertexSymbol;
              d = c.ghostLineSymbol;
              this._lineStroke = {
                style: d.style,
                width: d.width,
                color: d.color,
              };
              this._canDel = c.allowDeleteVertices;
              this._canAdd = c.allowAddVertices;
              this._addControllers();
            },
            destroy: function () {
              this._removeControllers();
            },
            refresh: function (c) {
              c
                ? (this._removeControllers(), this._addControllers())
                : (this._refresh(this._vertexMovers),
                  this._refresh(this._mpVertexMovers));
            },
            suspend: function () {
              this._suspended || this._removeControllers();
              this._suspended = !0;
            },
            resume: function () {
              this._suspended && this._addControllers();
              this._suspended = !1;
            },
            _addControllers: function () {
              this._firstMoveHandle = k.connect(
                A,
                "onFirstMove",
                this,
                this._firstMoveHandler
              );
              this._moveStopHandle = k.connect(
                A,
                "onMoveStop",
                this,
                this._moveStopHandler
              );
              this._vertexMovers = this._add(
                this._getSegments(this.graphic.geometry),
                this._symbol1
              );
              this._canAdd &&
                (this._mpVertexMovers = this._add(
                  this._getMidpointSegments(this.graphic.geometry),
                  this._symbol2,
                  !0
                ));
              var c = this._getGraphicsLayer();
              this._mouseOverHandle = k.connect(
                c,
                "onMouseOver",
                this,
                this._mouseOverHandler
              );
              this._mouseOutHandle = k.connect(
                c,
                "onMouseOut",
                this,
                this._mouseOutHandler
              );
              this._canDel &&
                ((this._ctxMenu = new O({
                  style: "font-size: 12px; margin-left: 5px; margin-top: 5px;",
                })),
                (c = this._ctxDelete =
                  new I({
                    label: g.toolbars.edit.deleteLabel,
                    iconClass: "vertexDeleteIcon",
                    style: "outline: none;",
                  })),
                (this._deleteHandle = k.connect(
                  c,
                  "onClick",
                  this,
                  this._deleteHandler
                )),
                this._ctxMenu.addChild(c),
                this._ctxMenu.startup());
            },
            _removeControllers: function () {
              k.disconnect(this._firstMoveHandle);
              k.disconnect(this._moveStopHandle);
              k.disconnect(this._mouseOverHandle);
              k.disconnect(this._mouseOutHandle);
              k.disconnect(this._deleteHandle);
              this._ctxMenu &&
                ((this._ctxDelete = null),
                this._unbindCtxNode(),
                this._ctxMenu.destroyRecursive());
              this._remove(this._vertexMovers);
              this._remove(this._mpVertexMovers);
              this._vertexMovers = this._mpVertexMovers = null;
            },
            _add: function (c, d, q) {
              var t,
                l,
                y = this.graphic,
                J = [];
              for (t = 0; t < c.length; t++) {
                var H = c[t],
                  T = [];
                for (l = 0; l < H.length; l++)
                  T.push(new A(H[l], d, y, t, l, H.length, this, q));
                J.push(T);
              }
              return J;
            },
            _remove: function (c) {
              c &&
                Z.forEach(c, function (d) {
                  Z.forEach(d, function (q) {
                    q.destroy();
                  });
                });
            },
            _refresh: function (c) {
              c &&
                Z.forEach(c, function (d) {
                  Z.forEach(d, function (q) {
                    q.refresh();
                  });
                });
            },
            _isNew: function (c) {
              return -1 === Z.indexOf(this._vertexMovers[c.segIndex], c)
                ? !0
                : !1;
            },
            _getGraphicsLayer: function () {
              return this.toolbar._scratchGL;
            },
            _deleteHandler: function (c) {
              c = this._selectedMover;
              this._updateRelatedGraphic(
                c,
                c.relatedGraphic,
                c.graphic.geometry,
                c.segIndex,
                c.ptIndex,
                c.segLength,
                !1,
                !0
              );
              this._canAdd && this._deleteMidpoints(c);
              this._deleteVertex(c);
              this.toolbar._endOperation("VERTICES");
            },
            _mouseOverHandler: function (c) {
              c = c.graphic;
              var d = this._findMover(c);
              d &&
                (this.toolbar.onVertexMouseOver(this.graphic, d._getInfo()),
                d._placeholder ||
                  ((this._selectedMover = d),
                  this._canDel &&
                    this._bindCtxNode(c.getDojoShape().getNode())));
            },
            _mouseOutHandler: function (c) {
              if ((c = this._findMover(c.graphic)))
                this.toolbar.onVertexMouseOut(this.graphic, c._getInfo());
            },
            _bindCtxNode: function (c) {
              this._unbindCtxNode();
              this._ctxDelete.set(
                "disabled",
                this._selectedMover.segLength <= this.minLength ? !0 : !1
              );
              this._ctxMenu.bindDomNode(c);
              this._bindNode = c;
            },
            _unbindCtxNode: function () {
              var c = this._bindNode;
              c && this._ctxMenu.unBindDomNode(c);
            },
            _findMover: function (c) {
              var d = [];
              var q = this._mpVertexMovers;
              Z.forEach(this._vertexMovers, function (l) {
                d = d.concat(l);
              });
              q &&
                Z.forEach(q, function (l) {
                  d = d.concat(l);
                });
              for (q = 0; q < d.length; q++) {
                var t = d[q];
                if (t.graphic === c) return t;
              }
            },
            _firstMoveHandler: function (c) {
              !this._isNew(c) && this._canAdd && this._hideRelatedMidpoints(c);
              this.toolbar._beginOperation("VERTICES");
            },
            _moveStopHandler: function (c, d) {
              var q = this._isNew(c);
              d && (d.dx || d.dy)
                ? (this._updateRelatedGraphic(
                    c,
                    c.relatedGraphic,
                    c.graphic.geometry,
                    c.segIndex,
                    c.ptIndex,
                    c.segLength,
                    q
                  ),
                  this._canAdd &&
                    (q
                      ? this._addMidpoints(c)
                      : (this._repositionRelatedMidpoints(c),
                        this._showRelatedMidpoints(c))),
                  this.toolbar._endOperation("VERTICES"))
                : !q && this._canAdd && this._showRelatedMidpoints(c);
            },
            _showRelatedMidpoints: function (c) {
              var d = this._getAdjacentMidpoints(c.ptIndex, c.segLength),
                q = this._mpVertexMovers[c.segIndex];
              for (c = 0; c < d.length; c++) {
                var t = q[d[c]];
                t.graphic.show();
                t.refresh();
              }
            },
            _hideRelatedMidpoints: function (c) {
              var d = this._getAdjacentMidpoints(c.ptIndex, c.segLength),
                q = this._mpVertexMovers[c.segIndex];
              for (c = 0; c < d.length; c++) q[d[c]].graphic.hide();
            },
            _repositionRelatedMidpoints: function (c) {
              var d,
                q = this._getAdjacentMidpoints(c.ptIndex, c.segLength),
                t = this._mpVertexMovers[c.segIndex];
              for (d = 0; d < q.length; d++) {
                var l = this._getAdjacentVertices(q[d], c.segLength),
                  y = c.relatedGraphic.geometry.getPoint(c.segIndex, l[0]);
                l = c.relatedGraphic.geometry.getPoint(c.segIndex, l[1]);
                y = new m({
                  x: (y.x + l.x) / 2,
                  y: (y.y + l.y) / 2,
                  spatialReference: y.spatialReference.toJson(),
                });
                t[q[d]].graphic.setGeometry(y);
              }
            },
            _addMidpoints: function (c) {
              var d = c.segIndex,
                q = c.ptIndex,
                t = c.segLength,
                l = q + 1,
                y,
                J = t + 1;
              this._mpVertexMovers[d].splice(q, 1);
              var H = this._vertexMovers[d];
              for (y = 0; y < l; y++) H[y].segLength += 1;
              for (y = l; y < H.length; y++)
                (H[y].ptIndex += 1), (H[y].segLength += 1);
              c.ptIndex = l;
              c.segLength = H.length + 1;
              H.splice(l, 0, c);
              c.graphic.setSymbol(this._symbol1);
              H = this._mpVertexMovers[d];
              for (y = 0; y < q; y++) H[y].segLength += 1;
              for (y = q; y < t - 1; y++)
                (H[y].ptIndex += 1), (H[y].segLength += 1);
              l = this._getAdjacentVertices(q, J);
              d = this._getAdjacentVertices(q + 1, J);
              t = c.relatedGraphic.geometry.getPoint(c.segIndex, l[0]);
              y = c.relatedGraphic.geometry.getPoint(c.segIndex, l[1]);
              l = new m({
                x: (t.x + y.x) / 2,
                y: (t.y + y.y) / 2,
                spatialReference: t.spatialReference.toJson(),
              });
              t = c.relatedGraphic.geometry.getPoint(c.segIndex, d[0]);
              y = c.relatedGraphic.geometry.getPoint(c.segIndex, d[1]);
              d = new m({
                x: (t.x + y.x) / 2,
                y: (t.y + y.y) / 2,
                spatialReference: t.spatialReference.toJson(),
              });
              t = new A(
                l,
                this._symbol2,
                this.graphic,
                c.segIndex,
                q,
                J,
                this,
                !0
              );
              c = new A(
                d,
                this._symbol2,
                this.graphic,
                c.segIndex,
                q + 1,
                J,
                this,
                !0
              );
              H.splice(q, 0, t, c);
            },
            _deleteVertex: function (c) {
              var d,
                q = c.ptIndex,
                t = this._vertexMovers[c.segIndex];
              for (d = 0; d < q; d++) --t[d].segLength;
              for (d = q + 1; d < t.length; d++) {
                var l = t[d];
                --l.ptIndex;
                --l.segLength;
              }
              t.splice(q, 1);
              d = c._getInfo();
              c.destroy();
              this.toolbar.onVertexDelete(this.graphic, d);
            },
          });
          R.mixin(f, {
            create: function (c, d, q) {
              switch (c.geometry.type) {
                case "multipoint":
                  return new f.MultipointVertexEditor(c, d, q);
                case "polyline":
                  return new f.PolylineVertexEditor(c, d, q);
                case "polygon":
                  return new f.PolygonVertexEditor(c, d, q);
              }
            },
          });
          f.MultipointVertexEditor = C(f, {
            declaredClass: "esri.toolbars._MultipointVertexEditor",
            minLength: 1,
            constructor: function () {
              this._moveStartHandle = k.connect(
                A,
                "onMoveStart",
                this,
                this._moveStartHandler
              );
              k.disconnect(this._firstMoveHandle);
            },
            destroy: function () {
              this.inherited(arguments);
              k.disconnect(this._moveStartHandle);
            },
            _getSegments: function (c) {
              var d = c.points,
                q = [],
                t = c.spatialReference;
              for (c = 0; c < d.length; c++) {
                var l = d[c];
                q.push(
                  new m({ x: l[0], y: l[1], spatialReference: t.toJson() })
                );
              }
              return [q];
            },
            _getMidpointSegments: function (c) {
              return [];
            },
            _getControlPoints: function (c, d, q, t, l) {
              return [];
            },
            _getGraphicsLayer: function () {
              return this.graphic._graphicsLayer;
            },
            _mouseOverHandler: function (c) {
              var d = c.graphic;
              if ((c = this._findMover(c)))
                this.toolbar.onVertexMouseOver(d, c._getInfo()),
                  (this._selectedMover = c),
                  this._canDel &&
                    this._bindCtxNode(c.graphic.getDojoShape().getNode());
            },
            _mouseOutHandler: function (c) {
              var d = c.graphic;
              if ((c = this._findMover(c)))
                this.toolbar.onVertexMouseOut(d, c._getInfo());
            },
            _findMover: function (c) {
              var d = [].concat(this._vertexMovers[0]),
                q = c.target;
              for (c = 0; c < d.length; c++) {
                var t = d[c];
                if (t.graphic.getDojoShape().getNode() === q) return t;
              }
            },
            _moveStartHandler: function (c) {
              var d = c.ptIndex,
                q = c.segLength - 1,
                t = c.relatedGraphic.geometry.points;
              c = t.splice(d, 1);
              t.push(c[0]);
              t = this._vertexMovers[0];
              for (c = q; c > d; c--) --t[c].ptIndex;
              c = t.splice(d, 1);
              t.push(c[0]);
              c[0].ptIndex = q;
            },
            _moveStopHandler: function (c) {
              this._updateRelatedGraphic(
                c,
                c.relatedGraphic,
                c.graphic.geometry,
                c.segIndex,
                c.ptIndex,
                c.segLength
              );
              this.toolbar._endOperation("VERTICES");
            },
            _updateRelatedGraphic: function (c, d, q, t, l, y, J, H) {
              c = d.geometry;
              H ? c.removePoint(l) : c.setPoint(l, q);
              d.setGeometry(c);
            },
            _deleteMidpoints: function (c) {},
          });
          f.PolylineVertexEditor = C(f, {
            declaredClass: "esri.toolbars._PolylineVertexEditor",
            minLength: 2,
            _getSegments: function (c) {
              var d,
                q,
                t = c.paths,
                l = [];
              for (d = 0; d < t.length; d++) {
                var y = t[d],
                  J = [];
                for (q = 0; q < y.length; q++) J.push(c.getPoint(d, q));
                l.push(J);
              }
              return l;
            },
            _getMidpointSegments: function (c) {
              var d,
                q,
                t = c.paths,
                l = [],
                y = c.spatialReference;
              for (d = 0; d < t.length; d++) {
                var J = t[d],
                  H = [];
                for (q = 0; q < J.length - 1; q++) {
                  var T = c.getPoint(d, q),
                    Q = c.getPoint(d, q + 1);
                  T = new m({
                    x: (T.x + Q.x) / 2,
                    y: (T.y + Q.y) / 2,
                    spatialReference: y.toJson(),
                  });
                  H.push(T);
                }
                l.push(H);
              }
              return l;
            },
            _getControlPoints: function (c, d, q, t, l) {
              var y = this.map,
                J,
                H;
              this._isNew(c)
                ? ((c = t),
                  (t += 1),
                  0 <= c && (J = y.toScreen(d.getPoint(q, c))),
                  t <= l && (H = y.toScreen(d.getPoint(q, t))))
                : ((c = t - 1),
                  (t += 1),
                  0 <= c && (J = y.toScreen(d.getPoint(q, c))),
                  t < l && (H = y.toScreen(d.getPoint(q, t))));
              return [J, H];
            },
            _getAdjacentMidpoints: function (c, d) {
              var q = [],
                t = c - 1;
              0 <= t && q.push(t);
              c < d - 1 && q.push(c);
              return q;
            },
            _getAdjacentVertices: function (c, d) {
              return [c, c + 1];
            },
            _deleteMidpoints: function (c) {
              var d = this._mpVertexMovers[c.segIndex],
                q = d.length - 1,
                t = this._getAdjacentMidpoints(c.ptIndex, c.segLength).sort(),
                l,
                y = t[0];
              for (l = 0; l < y; l++) --d[l].segLength;
              for (l = y + 1; l < d.length; l++) {
                var J = d[l];
                --J.ptIndex;
                --J.segLength;
              }
              if (1 === t.length) d.splice(y, 1)[0].destroy();
              else
                for (
                  J = this._getAdjacentVertices(y, q),
                    l = c.relatedGraphic.geometry.getPoint(c.segIndex, J[0]),
                    J = c.relatedGraphic.geometry.getPoint(c.segIndex, J[1]),
                    l = new m({
                      x: (l.x + J.x) / 2,
                      y: (l.y + J.y) / 2,
                      spatialReference: l.spatialReference.toJson(),
                    }),
                    c = new A(
                      l,
                      this._symbol2,
                      this.graphic,
                      c.segIndex,
                      y,
                      q,
                      this,
                      !0
                    ),
                    d = d.splice(y, t.length, c),
                    l = 0;
                  l < d.length;
                  l++
                )
                  d[l].destroy();
            },
            _updateRelatedGraphic: function (c, d, q, t, l, y, J, H) {
              c = d.geometry;
              J
                ? c.insertPoint(t, l + 1, z.fromJson(q.toJson()))
                : H
                ? c.removePoint(t, l)
                : c.setPoint(t, l, z.fromJson(q.toJson()));
              d.setGeometry(c);
            },
          });
          f.PolygonVertexEditor = C(f, {
            declaredClass: "esri.toolbars._PolygonVertexEditor",
            minLength: 3,
            _getSegments: function (c) {
              var d,
                q,
                t = c.rings,
                l = [];
              for (d = 0; d < t.length; d++) {
                var y = t[d],
                  J = [];
                for (q = 0; q < y.length - 1; q++) J.push(c.getPoint(d, q));
                l.push(J);
              }
              return l;
            },
            _getMidpointSegments: function (c) {
              var d,
                q,
                t = c.rings,
                l = [],
                y = c.spatialReference;
              for (d = 0; d < t.length; d++) {
                var J = t[d],
                  H = [];
                for (q = 0; q < J.length - 1; q++) {
                  var T = c.getPoint(d, q),
                    Q = c.getPoint(d, q + 1);
                  T = new m({
                    x: (T.x + Q.x) / 2,
                    y: (T.y + Q.y) / 2,
                    spatialReference: y.toJson(),
                  });
                  H.push(T);
                }
                l.push(H);
              }
              return l;
            },
            _getControlPoints: function (c, d, q, t, l) {
              var y = this.map;
              this._isNew(c)
                ? (c = t)
                : ((c = t - 1), (c = 0 > c ? (l + c) % l : c));
              t = (t + 1) % l;
              l = y.toScreen(d.getPoint(q, c));
              d = y.toScreen(d.getPoint(q, t));
              return [l, d];
            },
            _getAdjacentMidpoints: function (c, d) {
              var q = c - 1;
              return [0 > q ? (d + q) % d : q, c];
            },
            _getAdjacentVertices: function (c, d) {
              return [c, (c + 1) % d];
            },
            _deleteMidpoints: function (c) {
              var d = c.ptIndex,
                q = this._mpVertexMovers[c.segIndex],
                t = q.length - 1,
                l = this._getAdjacentMidpoints(d, c.segLength).sort();
              var y = l[0];
              var J = l[l.length - 1];
              if (0 === d) {
                var H = this._getAdjacentVertices(t - 1, t);
                d = c.relatedGraphic.geometry.getPoint(c.segIndex, H[0]);
                H = c.relatedGraphic.geometry.getPoint(c.segIndex, H[1]);
                d = new m({
                  x: (d.x + H.x) / 2,
                  y: (d.y + H.y) / 2,
                  spatialReference: d.spatialReference.toJson(),
                });
                c = new A(
                  d,
                  this._symbol2,
                  this.graphic,
                  c.segIndex,
                  t - 1,
                  t,
                  this,
                  !0
                );
                q.splice(J, 1, c)[0].destroy();
                q.splice(y, 1)[0].destroy();
                for (l = 0; l < q.length - 1; l++)
                  (y = q[l]), --y.ptIndex, --y.segLength;
              } else {
                H = this._getAdjacentVertices(y, t);
                d = c.relatedGraphic.geometry.getPoint(c.segIndex, H[0]);
                H = c.relatedGraphic.geometry.getPoint(c.segIndex, H[1]);
                d = new m({
                  x: (d.x + H.x) / 2,
                  y: (d.y + H.y) / 2,
                  spatialReference: d.spatialReference.toJson(),
                });
                c = new A(
                  d,
                  this._symbol2,
                  this.graphic,
                  c.segIndex,
                  y,
                  t,
                  this,
                  !0
                );
                J = q.splice(y, l.length, c);
                for (l = 0; l < J.length; l++) J[l].destroy();
                for (l = 0; l < y; l++) --q[l].segLength;
                for (l = y + 1; l < q.length; l++)
                  (y = q[l]), --y.ptIndex, --y.segLength;
              }
            },
            _updateRelatedGraphic: function (c, d, q, t, l, y, J, H) {
              c = d.geometry;
              J
                ? c.insertPoint(t, l + 1, z.fromJson(q.toJson()))
                : H
                ? (c.removePoint(t, l),
                  0 === l &&
                    c.setPoint(t, y - 1, z.fromJson(c.getPoint(t, 0).toJson())))
                : (c.setPoint(t, l, z.fromJson(q.toJson())),
                  0 === l && c.setPoint(t, y, z.fromJson(q.toJson())));
              d.setGeometry(c);
            },
          });
          U("extend-esri") &&
            (R.setObject("toolbars._GraphicVertexEditor", f, E),
            R.setObject(
              "toolbars._MultipointVertexEditor",
              f.MultipointVertexEditor,
              E
            ),
            R.setObject(
              "toolbars._PolylineVertexEditor",
              f.PolylineVertexEditor,
              E
            ),
            R.setObject(
              "toolbars._PolygonVertexEditor",
              f.PolygonVertexEditor,
              E
            ));
          return f;
        }
      );
    },
    "esri/toolbars/_VertexMover": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/sniff dojo/dom-style dojox/gfx/Moveable dojox/gfx/matrix ../kernel ../PointerEvents ../sniff ../geometry/Point ../graphic ../geometry/webMercatorUtils".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g, f) {
          C = C(null, {
            declaredClass: "esri.toolbars.VertexMover",
            constructor: function (c, d, q, t, l, y, J, H) {
              this.point = c;
              this.symbol = d;
              this.relatedGraphic = q;
              this.segIndex = t;
              this.ptIndex = l;
              this.segLength = y;
              this.editor = J;
              this.map = J.map;
              this._scratchGL = J.toolbar._scratchGL;
              this._placeholder = H || !1;
              this._type = q.geometry.type;
              this._init();
              this._enable();
            },
            refresh: function (c) {
              if (c || this._needRefresh()) this._disable(), this._enable();
            },
            destroy: function () {
              this._disable();
              this.graphic && this._scratchGL.remove(this.graphic);
              this.point =
                this.symbol =
                this.graphic =
                this.relatedGraphic =
                this.segIndex =
                this.ptIndex =
                this.segLength =
                this.editor =
                this.map =
                this._scratchGL =
                  null;
            },
            _init: function () {
              var c = new z(this.point.toJson());
              c = new g(c, this.symbol);
              switch (this._type) {
                case "multipoint":
                  c._shape =
                    this.relatedGraphic.getDojoShape().children[this.ptIndex];
                  break;
                case "polyline":
                case "polygon":
                  this._scratchGL.add(c);
              }
              this.graphic = c;
            },
            _enable: function () {
              var c = this.graphic.getDojoShape();
              c &&
                ((c._hasMover = !0),
                (this._moveable = this._getMoveable(c)),
                (c = c.getEventSource()) &&
                  U.set(
                    c,
                    "cursor",
                    this.editor.toolbar._cursors[
                      this._placeholder ? "move-gv" : "move-v"
                    ]
                  ));
            },
            _disable: function () {
              var c = this._moveable;
              if (c) {
                k.disconnect(this._startHandle);
                k.disconnect(this._firstHandle);
                k.disconnect(this._movingHandle);
                k.disconnect(this._stopHandle);
                var d = c.shape;
                d && (d = d.getEventSource()) && U.set(d, "cursor", "inherit");
                c.destroy();
                this._moveable = null;
              }
            },
            _needRefresh: function () {
              var c = this.graphic.getDojoShape(),
                d = !1;
              if (c)
                switch (this._type) {
                  case "multipoint":
                    var q = this.relatedGraphic.getDojoShape();
                    q &&
                      ((q = q.children[this.ptIndex]),
                      c !== q && ((this.graphic._shape = q), (d = !0)));
                    break;
                  case "polyline":
                  case "polygon":
                    d = !c._hasMover;
                }
              return d;
            },
            _getMoveable: function (c) {
              c = new O(
                c,
                Z("mac") &&
                  Z("ff") &&
                  !m("esri-touch") && { leftButtonOnly: !0 }
              );
              this._startHandle = k.connect(
                c,
                "onMoveStart",
                this,
                this._moveStartHandler
              );
              this._firstHandle = k.connect(
                c,
                "onFirstMove",
                this,
                this._firstMoveHandler
              );
              this._movingHandle = k.connect(
                c,
                "onMoving",
                this,
                this._movingHandler
              );
              this._stopHandle = k.connect(
                c,
                "onMoveStop",
                this,
                this._moveStopHandler
              );
              return c;
            },
            _getPtIndex: function () {
              return this.ptIndex + (this._placeholder ? 1 : 0);
            },
            _getInfo: function () {
              return {
                graphic: this.graphic,
                isGhost: this._placeholder,
                segmentIndex: this.segIndex,
                pointIndex: this._getPtIndex(),
              };
            },
            _moveStartHandler: function (c) {
              var d = this.map;
              d.snappingManager && d.snappingManager._setUpSnapping();
              this.editor.toolbar._deactivateScrollWheel();
              this._startTx = this.graphic.getDojoShape().getTransform();
              c.shape.moveToFront();
              this.constructor.onMoveStart(this);
              this.editor.toolbar.onVertexMoveStart(
                this.relatedGraphic,
                this._getInfo()
              );
            },
            _firstMoveHandler: function (c) {
              var d = c.shape,
                q = this._getControlEdges(),
                t = this._scratchGL._div,
                l,
                y = [],
                J = c.host.shape._wrapOffsets[0] || 0;
              for (l = 0; l < q.length; l++) {
                var H = q[l];
                H.x1 += J;
                H.x2 += J;
                y.push([
                  t
                    .createLine({ x1: H.x1, y1: H.y1, x2: H.x2, y2: H.y2 })
                    .setStroke(this.editor._lineStroke),
                  H.x1,
                  H.y1,
                  H.x2,
                  H.y2,
                ]);
              }
              d._lines = y;
              c.shape.moveToFront();
              this.constructor.onFirstMove(this);
              this.editor.toolbar.onVertexFirstMove(
                this.relatedGraphic,
                this._getInfo()
              );
            },
            _movingHandler: function (c, d, q) {
              d = this.map;
              var t;
              m("esri-pointer")
                ? (t = d.navigationManager.pointerEvents._processTouchEvent(
                    q,
                    q
                  ))
                : q &&
                  "pointermove" === q.type &&
                  (t = A.prototype._processTouchEvent.call({ map: d }, q, q));
              t &&
                d.snappingManager &&
                d.snappingManager._onSnappingMouseMoveHandler(t);
              q = c.shape;
              c = q.getTransform();
              q = q._lines;
              for (t = 0; t < q.length; t++)
                (d = q[t]),
                  d[0].setShape({
                    x1: d[1] + c.dx,
                    y1: d[2] + c.dy,
                    x2: d[3],
                    y2: d[4],
                  });
              this.editor.toolbar.onVertexMove(
                this.relatedGraphic,
                this._getInfo(),
                c
              );
            },
            _moveStopHandler: function (c) {
              c = c.shape;
              var d = this.editor.toolbar,
                q = c.getTransform(),
                t = this.map,
                l = this.graphic,
                y = d._geo ? f.geographicToWebMercator(l.geometry) : l.geometry;
              d._activateScrollWheel();
              var J,
                H = c._lines;
              if (H) {
                for (J = 0; J < H.length; J++) H[J][0].removeShape();
                c._lines = null;
              }
              J = !1;
              H = !0;
              var T = this._getInfo();
              q && (q.dx || q.dy)
                ? this._placeholder && ((this._placeholder = !1), (J = !0))
                : (H = !1);
              if (t.snappingManager) var Q = t.snappingManager._snappingPoint;
              var M = [q, I.invert(this._startTx)];
              Q = Q || t.toMap(I.multiplyPoint(M, t.toScreen(y, !0)));
              t.snappingManager && t.snappingManager._killOffSnapping();
              c.setTransform(null);
              l.setGeometry(d._geo ? f.webMercatorToGeographic(Q, !0) : Q);
              this.constructor.onMoveStop(this, q);
              d.onVertexMoveStop(this.relatedGraphic, T, q);
              if (!H) d.onVertexClick(this.relatedGraphic, T);
              if (J) d.onVertexAdd(this.relatedGraphic, this._getInfo());
            },
            _getControlEdges: function () {
              var c = this.map,
                d = this.relatedGraphic.geometry,
                q = this.segIndex,
                t = this.ptIndex,
                l = this.segLength,
                y = this._scratchGL.getNavigationTransform(),
                J = y.dx;
              y = y.dy;
              var H = c.toScreen(this.graphic.geometry);
              c = H.x - J;
              H = H.y - y;
              var T = [];
              d = this.editor._getControlPoints(this, d, q, t, l);
              d[0] && T.push({ x1: c, y1: H, x2: d[0].x - J, y2: d[0].y - y });
              d[1] && T.push({ x1: c, y1: H, x2: d[1].x - J, y2: d[1].y - y });
              return T;
            },
          });
          m("extend-esri") && R.setObject("toolbars.VertexMover", C, E);
          R.mixin(C, {
            onMoveStart: function () {},
            onFirstMove: function () {},
            onMoveStop: function () {},
          });
          return C;
        }
      );
    },
    "esri/toolbars/TextEditor": function () {
      define(
        "dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/event dojo/has dojo/dom-construct dojo/dom-class dojo/dom-style dojo/keys ../kernel".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m) {
          C = C(null, {
            declaredClass: "esri.toolbars.TextEditor",
            constructor: function (z, g, f) {
              this._graphic = z;
              this._map = g;
              this._toolbar = f;
              this._enable(this._graphic);
            },
            destroy: function () {
              this._disable();
            },
            onEditStart: function () {},
            onEditEnd: function () {},
            _enable: function (z) {
              this._editBox
                ? (k.disconnect(this._addEditBoxHandler),
                  (this._addEditBoxHandler = null))
                : (this._map.navigationManager.setImmediateClick(!0),
                  (this._addEditBoxHandler = k.connect(
                    z.getLayer(),
                    "onDblClick",
                    this,
                    function (g) {
                      this._map.navigationManager.setImmediateClick(!1);
                      g.graphic == z &&
                        (Z.stop(g),
                        k.disconnect(this._addEditBoxHandler),
                        (this._addEditBoxHandler = null),
                        this._addTextBox(z));
                    }
                  )));
            },
            _disable: function () {
              this._applyEdit();
              this._addEditBoxHandler &&
                (k.disconnect(this._addEditBoxHandler),
                (this._addEditBoxHandler = null));
              this._removeTextBox();
              this.onEditEnd(this._graphic);
              this._toolbar.onTextEditEnd(this._graphic);
            },
            _addTextBox: function (z, g) {
              if (!this._editBox) {
                if (!z.symbol.text) {
                  z.symbol.text = "Tempt text";
                  z.setSymbol(z.symbol);
                  var f = "";
                }
                var c = this._createInputTextStyle(z, this._map);
                "" !== f && (f = g || z.symbol.text);
                this._editBox = O.create("input", { type: "text", value: f });
                E.set(this._editBox, c);
                I.add(this._editBox, "esriTextEditorInput");
                this._map.container.appendChild(this._editBox);
                this._editBox.focus();
                this._editBoxKeyHandler = k.connect(
                  this._editBox,
                  "onkeyup",
                  R.hitch(this, function (q) {
                    (q.keyCode != A.ENTER && q.keyCode !== A.TAB) ||
                      this._disable();
                  })
                );
                this._editBoxBlurHandler = k.connect(
                  this._editBox,
                  "onblur",
                  R.hitch(this, function (q) {
                    this._disable();
                  })
                );
                z.symbol.text = "";
                z.setSymbol(z.symbol);
                z.hide();
                var d = this._editBox;
                this._disableBoxHandler ||
                  (this._disableBoxHandler = this._map.on(
                    "zoom-start",
                    R.hitch(this, function () {
                      this._disable();
                    })
                  ));
                this._moveBoxHandler = this._map.on("pan", function (q) {
                  E.set(d, {
                    left: this._editBoxLeft + q.delta.x + "px",
                    top: this._editBoxTop + q.delta.y + "px",
                  });
                });
                this._moveBoxStartHandler = this._map.on(
                  "pan-start",
                  function () {
                    this._editBoxLeft = parseFloat(E.get(d, "left"));
                    this._editBoxTop = parseFloat(E.get(d, "top"));
                  }
                );
                this.onEditStart(z, this._editBox);
                this._toolbar.onTextEditStart(z, this._editBox);
              }
            },
            _removeTextBox: function () {
              this._editBoxBlurHandler &&
                (k.disconnect(this._editBoxBlurHandler),
                (this._editBoxBlurHandler = null));
              this._editBox &&
                (this._editBox.parentNode.removeChild(this._editBox),
                (this._editBox = null));
              this._disableBoxHandler &&
                (this._disableBoxHandler.remove(),
                (this._disableBoxHandler = null));
              this._moveBoxHandler &&
                (this._moveBoxHandler.remove(), (this._moveBoxHandler = null));
              this._moveBoxStartHandler &&
                (this._moveBoxStartHandler.remove(),
                (this._moveBoxStartHandler = null));
              this._editBoxKeyHandler &&
                (k.disconnect(this._editBoxKeyHandler),
                (this._editBoxKeyHandler = null));
            },
            _createInputTextStyle: function (z, g) {
              g = z.getDojoShape().getTransformedBoundingBox();
              var f = z.getLayer();
              f = f.hasLocalNavigationTransform()
                ? { dx: 0, dy: 0 }
                : f.getNavigationTransform();
              var c = z.symbol.font;
              return {
                "font-family": c.family,
                "font-size": c.size + "px",
                "font-style": c.style,
                "font-variant": c.variant,
                "font-weight": c.weight,
                left: g[0].x + f.dx + "px",
                top: g[0].y + f.dy + "px",
                width:
                  Math.abs(g[0].x - g[1].x) /
                    Math.cos((z.symbol.angle / 180) * Math.PI) +
                  "px",
              };
            },
            _applyEdit: function () {
              if (this._editBox)
                if (this._editBox.value) {
                  this._graphic.show();
                  var z = this._graphic.symbol;
                  z.text = this._editBox.value;
                  this._graphic.setSymbol(z);
                } else this._graphic.getLayer().remove(this._graphic);
            },
          });
          U("extend-esri") && R.setObject("toolbars.TextEditor", C, m);
          return C;
        }
      );
    },
    "widgets/Directions/queryUtil": function () {
      define(
        "dojo/Deferred esri/tasks/query esri/tasks/QueryTask jimu/LayerInfos/LayerInfos esri/geometry/Point esri/geometry/Polyline esri/geometry/Polygon esri/graphic esri/tasks/FeatureSet jimu/FilterManager".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m) {
          var z = {
            queryBarriers: function (g) {
              var f = [];
              if (!z.havePresetBarrierLayers(g)) return f;
              var c = g.barrierLayers.pointLayers,
                d = g.barrierLayers.polylineLayers;
              g = g.barrierLayers.polygonLayers;
              this.layerInfosObj = Z.getInstanceSync();
              z.getQueryDef(
                c,
                z.isBarrierLayerInWebmap(c, this.layerInfosObj),
                this.layerInfosObj,
                "point",
                f
              );
              z.getQueryDef(
                d,
                z.isBarrierLayerInWebmap(d, this.layerInfosObj),
                this.layerInfosObj,
                "polyline",
                f
              );
              z.getQueryDef(
                g,
                z.isBarrierLayerInWebmap(g, this.layerInfosObj),
                this.layerInfosObj,
                "polygon",
                f
              );
              return f;
            },
            isBarrierLayerInWebmap: function (g, f) {
              var c = !1,
                d = g[0];
              f.traversal(function (q) {
                q.layerObject.id === d && (c = !0);
              });
              return c;
            },
            getQueryDef: function (g, f, c, d, q) {
              if ((g = g[0]) && f) {
                c = c.getLayerInfoById(g);
                var t = c.layerObject;
                (f = t.url)
                  ? ((d = m.getInstance().getFilterExp(g)),
                    q.push(z.query(f, d)))
                  : !f &&
                    "undefined" !== t.toJson &&
                    t.toJson().featureSet &&
                    t.toJson().featureSet.features
                  ? ((g = c.layerObject.toJson().featureSet.features),
                    (f = new A()),
                    "point" === d
                      ? (f.features = z._getFeatures(g, U))
                      : "polyline" === d
                      ? (f.features = z._getFeatures(g, O))
                      : "polygon" === d && (f.features = z._getFeatures(g, I)),
                    q.push(new C().resolve(f)))
                  : q.push(new C().resolve(null));
              } else q.push(new C().resolve(null));
            },
            _getFeatures: function (g, f) {
              for (var c = [], d = 0, q = g.length; d < q; d++) {
                var t = new E(new f(g[d].geometry), null, { BarrierType: 0 });
                c.push(t);
              }
              return c;
            },
            query: function (g, f) {
              g = new k(g);
              var c = new R(),
                d = "1\x3d1";
              f && (d = f);
              c.where = d;
              c.returnGeometry = !0;
              c.outFields = ["*"];
              return g.execute(c);
            },
            havePresetBarrierLayers: function (g) {
              return g && g.barrierLayers
                ? g.barrierLayers.pointLayers &&
                  "" === g.barrierLayers.pointLayers[0] &&
                  g.barrierLayers.polylineLayers &&
                  "" === g.barrierLayers.polylineLayers[0] &&
                  g.barrierLayers.polygonLayers &&
                  "" === g.barrierLayers.polygonLayers[0]
                  ? !1
                  : !0
                : !1;
            },
            findBarrierLayer: function (g, f) {
              var c = !1;
              if (!1 === z.havePresetBarrierLayers(f)) return c;
              for (var d = 0, q = g.length; d < q; d++) {
                var t = g[0];
                if (
                  t &&
                  t.id &&
                  (f.barrierLayers.pointLayers[0] === t.id ||
                    f.barrierLayers.polylineLayers[0] === t.id ||
                    f.barrierLayers.polygonLayers[0] === t.id)
                ) {
                  c = !0;
                  break;
                }
              }
              return c;
            },
          };
          return z;
        }
      );
    },
    "widgets/Directions/ActiveStateManager": function () {
      define([
        "dojo/Evented",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dijit/_WidgetBase",
      ], function (C, R, k, Z) {
        return R([Z, C], {
          _dijitDirections: null,
          _widget: null,
          mapClickActive: !0,
          constructor: function (U) {
            this._widget = U.widget;
          },
          postCreate: function () {
            this.inherited(arguments);
          },
          startup: function () {
            this.inherited(arguments);
          },
          setDirectionDijit: function (U) {
            this._dijitDirections = U;
          },
          cacheStates: function (U) {
            this._dijitDirections &&
              ((this.barrierToolActive =
                this._dijitDirections.barrierToolActive),
              (this.mapClickActive =
                (U && U.mapClickActive) ||
                this._dijitDirections.mapClickActive));
          },
          revertToLastState: function () {
            this._dijitDirections && (this.activateDijit(), this.cacheStates());
          },
          activateDijit: function () {
            this._dijitDirections &&
              ("function" === typeof this._dijitDirections.activate &&
                this._dijitDirections.activate(),
              this._widget._disableWebMapPopup(),
              this.barrierToolActive
                ? this._dijitDirections.activateBarrierTool()
                : this._dijitDirections.deactivateBarrierTool(),
              this.setMapClickActive(this.mapClickActive));
          },
          deactivateDijit: function () {
            this._dijitDirections &&
              ("function" === typeof this._dijitDirections.deactivate &&
                this._dijitDirections.deactivate(),
              this._widget._enableWebMapPopup(),
              "undefined" !== typeof this._dijitDirections.barrierToolActive &&
                this._dijitDirections.deactivateBarrierTool(),
              this.setMapClickActive(!1));
          },
          setMapClickActive: function (U) {
            this._dijitDirections &&
              this._dijitDirections._enqueue &&
              this._dijitDirections._enqueue(function () {
                this.set("mapClickActive", U);
              });
          },
          setMapClickActiveImmediately: function (U) {
            this._dijitDirections &&
              this._dijitDirections.set("mapClickActive", U);
          },
        });
      });
    },
    "widgets/Directions/a11y/Widget": function () {
      define(
        "dojo/_base/lang dojo/on dojo/query dojo/aspect dojo/_base/array dojo/_base/html jimu/utils dojo/keys".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E) {
          return {
            a11y_init: function () {
              O.setAttr(this.domNode, "aria-label", this.nls._widgetLabel);
            },
            a11y_updateFocusNodes: function (A) {
              if (
                this._dijitDirections &&
                this._dijitDirections._widgetContainer
              ) {
                var m = k(
                  ".esriResultsSummary",
                  this._dijitDirections._resultsNode
                );
                m &&
                  m[0] &&
                  (O.setAttr(m[0], "tabindex", "0"),
                  O.setAttr(m[0], "role", "document"));
                m = k("input", this._dijitDirections._widgetContainer);
                U.some(
                  m,
                  C.hitch(this, function (z) {
                    if (I.isDomFocusable(z))
                      return (
                        I.initFirstFocusNode(this.domNode, z),
                        A && A.isFouceToFirstNode && z.focus(),
                        !0
                      );
                  })
                );
                "none" ===
                O.getStyle(
                  this._dijitDirections._savePrintBtnContainer,
                  "display"
                )
                  ? I.initLastFocusNode(
                      this.domNode,
                      this._dijitDirections._clearDirectionsButtonNode
                    )
                  : ((m = null),
                    (m = k(
                      ".esriPrintFooter",
                      this._dijitDirections._resultsNode
                    )) && m[0]
                      ? (O.setAttr(m[0], "tabindex", "0"), (m = m[0]))
                      : ((m = k(
                          '[tabindex $\x3d"0"]',
                          this._dijitDirections._resultsNode
                        )),
                        (m = m[m.length - 1])),
                    I.initLastFocusNode(this.domNode, m));
                (m = k(
                  "[data-blur-on-click]",
                  this._dijitDirections.domNode
                )) &&
                  !1 === O.hasClass(this._dijitDirections.domNode, "WAB-508") &&
                  (U.forEach(
                    m,
                    C.hitch(this, function (z) {
                      this.own(
                        R(
                          z,
                          "keydown",
                          C.hitch(this, function (g) {
                            (g.keyCode !== E.ENTER && g.keyCode !== E.SPACE) ||
                              this._delayFocus(g.target);
                          })
                        )
                      );
                    })
                  ),
                  this.own(
                    Z.after(
                      this._dijitDirections._travelModeSelector,
                      "openDropDown",
                      C.hitch(this, function () {
                        var z = k(
                          ".dijitMenuItem",
                          this._dijitDirections._travelModeSelector.dropDown
                            .domNode
                        );
                        U.forEach(
                          z,
                          C.hitch(this, function (g) {
                            O.removeAttr(g, "aria-label");
                          })
                        );
                      }),
                      this
                    )
                  ),
                  O.addClass(this._dijitDirections.domNode, "WAB-508"));
              }
            },
            a11y_initEvents: function () {
              this._dijitDirections &&
                this._dijitDirections._clearResultsHTML &&
                this.own(
                  Z.after(
                    this._dijitDirections,
                    "_clearResultsHTML",
                    C.hitch(this, this.a11y_updateFocusNodes),
                    this
                  )
                );
              this.own(
                R(
                  this._dijitDirections._clearDirectionsButtonNode,
                  "keydown",
                  C.hitch(this, function (A) {
                    (A.keyCode !== E.ENTER && A.keyCode !== E.SPACE) ||
                      setTimeout(
                        C.hitch(this, function () {
                          this._dijitDirections._clearDirectionsButtonNode.focus();
                        }),
                        150
                      );
                  })
                )
              );
            },
            a11y_focusWhenFinish: function () {
              var A = k(
                ".esriResultsSummary",
                this._dijitDirections._resultsNode
              );
              A && A[0] && this._delayFocus(A[0]);
            },
            _delayFocus: function (A) {
              setTimeout(
                C.hitch(this, function () {
                  A.focus();
                }),
                80
              );
            },
            a11y_hackAttr: function () {},
          };
        }
      );
    },
    "widgets/Directions/searchUtil": function () {
      define(
        "dojo/_base/lang dojo/_base/array dojo/Deferred dojo/when dojo/promise/all jimu/portalUtils esri/lang esri/request jimu/utils esri/dijit/PopupTemplate esri/graphic esri/geometry/webMercatorUtils esri/tasks/ProjectParameters".split(
          " "
        ),
        function (C, R, k, Z, U, O, I, E, A, m, z, g, f) {
          var c = {
            map: null,
            layerInfosObj: null,
            appConfig: null,
            _esriLocatorRegExp:
              /geocode(.){0,3}\.arcgis.com\/arcgis\/rest\/services\/World\/GeocodeServer/g,
            setMap: function (d) {
              this.map = d;
            },
            setLayerInfosObj: function (d) {
              this.layerInfosObj = d;
            },
            setAppConfig: function (d) {
              this.appConfig = d;
            },
            getConfigInfo: function (d) {
              if (d && d.sources && 0 < d.sources.length) {
                var q = null;
                return this.searchLayer(this.map) && d.upgradeFromGeocoder
                  ? ((q =
                      this.map.itemInfo.itemData.applicationProperties.viewing
                        .search),
                    (q = R.map(
                      q.layers,
                      C.hitch(
                        this,
                        function (t, l) {
                          l.hintText = t;
                          return this._getQueryTypeGeocoder(l);
                        },
                        q.hintText
                      )
                    )),
                    U(q).then(
                      C.hitch(this, function (t) {
                        d.sources = [].concat(t).concat(d.sources);
                        return d;
                      })
                    ))
                  : d;
              }
              return Z(this._getSoucesFromPortalAndWebmap()).then(
                C.hitch(this, function (t) {
                  return {
                    allPlaceholder: "",
                    showInfoWindowOnSelect: !0,
                    sources: t,
                  };
                })
              );
            },
            _getSoucesFromPortalAndWebmap: function () {
              var d = [],
                q = null;
              this.searchLayer(this.map) &&
                ((q =
                  this.map.itemInfo.itemData.applicationProperties.viewing
                    .search),
                R.forEach(
                  q.layers,
                  C.hitch(
                    this,
                    function (t, l) {
                      l.hintText = t;
                      d.push(this._getQueryTypeGeocoder(l));
                    },
                    q.hintText
                  )
                ));
              return O.getPortalSelfInfo(this.appConfig.portalUrl).then(
                C.hitch(this, function (t) {
                  if (
                    (t = t.helperServices && t.helperServices.geocode) &&
                    0 < t.length
                  )
                    for (var l = 0, y = t.length; l < y; l++) {
                      var J = t[l];
                      J && d.push(this._processSingleLine(J));
                    }
                  return U(d).then(
                    C.hitch(this, function (H) {
                      for (var T = [], Q = 0; Q < H.length; Q++) {
                        var M = H[Q];
                        M &&
                          (M && "query" === M.type
                            ? T.push(M)
                            : ((M = {
                                name: M.name || this._getGeocodeName(M.url),
                                url: M.url,
                                singleLineFieldName: M.singleLineFieldName,
                                placeholder: "Find address or place",
                                maxResults: 6,
                                searchInCurrentMapExtent: !1,
                                type: "locator",
                              }),
                              (M.enableLocalSearch = this._isEsriLocator(
                                M.url
                              )),
                              (M.localSearchMinScale = 3e5),
                              (M.localSearchDistance = 5e4),
                              T.push(M)));
                      }
                      return T;
                    })
                  );
                })
              );
            },
            _getQueryTypeGeocoder: function (d) {
              var q = this.map.getLayer(d.id),
                t = null,
                l = null,
                y = null;
              y = I.isDefined(d.subLayer) ? d.id + "_" + d.subLayer : d.id;
              t = this.layerInfosObj.traversal(function (J) {
                return J.id === y ? ((l = J), !0) : !1;
              });
              return q && t && l
                ? ((t = I.isDefined(d.subLayer)
                    ? l.url || q.url + "/" + d.subLayer
                    : l.url || q.url),
                  {
                    name: l.title,
                    layerId: y,
                    url: t,
                    placeholder: d.hintText,
                    searchFields: [d.field.name],
                    displayField: d.field.name,
                    exactMatch: d.field.exactMatch || !1,
                    maxResults: 6,
                    searchInCurrentMapExtent: !1,
                    type: "query",
                  })
                : null;
            },
            _isEsriLocator: function (d) {
              this._esriLocatorRegExp.lastIndex = 0;
              return this._esriLocatorRegExp.test(d);
            },
            _processSingleLine: function (d) {
              if (d.singleLineFieldName) return d;
              if (this._isEsriLocator(d.url))
                return (d.singleLineFieldName = "SingleLine"), d;
              var q = new k();
              E({
                url: d.url,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback",
              }).then(
                C.hitch(this, function (t) {
                  t.singleLineAddressField && t.singleLineAddressField.name
                    ? ((d.singleLineFieldName = t.singleLineAddressField.name),
                      q.resolve(d))
                    : (console.warn(d.url + "has no singleLineFieldName"),
                      q.resolve(null));
                }),
                C.hitch(this, function (t) {
                  console.error(t);
                  q.resolve(null);
                })
              );
              return q.promise;
            },
            _getGeocodeName: function (d) {
              if ("string" !== typeof d) return "geocoder";
              d = d.split("/");
              return d[d.length - 2] || "geocoder";
            },
            getGeocoderName: function (d) {
              return this._getGeocodeName(d);
            },
            hasAppSearchInfo: function (d) {
              return (
                d.itemInfo &&
                d.itemInfo.itemData &&
                d.itemInfo.itemData.applicationProperties &&
                d.itemInfo.itemData.applicationProperties.viewing &&
                d.itemInfo.itemData.applicationProperties.viewing.search
              );
            },
            searchLayer: function (d) {
              if (!this.hasAppSearchInfo(d)) return !1;
              d = d.itemInfo.itemData.applicationProperties.viewing.search;
              return d.enabled && 0 !== d.layers.length ? !0 : !1;
            },
            getSingleLineAddressName: function (d) {
              var q = new k();
              E({
                url: d,
                content: { f: "json" },
                handleAs: "json",
                callbackParamName: "callback",
              }).then(
                C.hitch(this, function (t) {
                  t && t.singleLineAddressField && t.singleLineAddressField.name
                    ? q.resolve(t.singleLineAddressField.name)
                    : q.resolve(null);
                }),
                C.hitch(this, function (t) {
                  console.error(t);
                  q.reject();
                })
              );
              return q;
            },
            version: {
              isConfigBefore63: function (d) {
                var q = !1;
                d && d.geocoderOptions && (q = !0);
                return q;
              },
              upgradeConfig: function (d) {
                d.geocoderOptions && delete d.geocoderOptions;
              },
              getVersionState: function () {},
            },
            config: {
              onLayerInfosFilterChanged: function (d, q) {
                R.some(
                  d,
                  C.hitch(this, function (t) {
                    q.searchOptions &&
                      q.searchOptions.sources &&
                      0 < q.searchOptions.sources.length &&
                      R.forEach(q.searchOptions.sources, function (l) {
                        l._featureLayerId === t.id &&
                          l.featureLayer.setDefinitionExpression(t.getFilter());
                      });
                  })
                );
              },
              getInfoTemplate: function (d, q, t) {
                var l = new k();
                t = t.getLayerInfoById(q.layerId);
                var y;
                if (t) l = t.loadInfoTemplate();
                else {
                  var J = [];
                  R.filter(d.fields, function (H) {
                    "shape" !== H.name.toLowerCase() && J.push(H.name);
                  });
                  (d = A.getDefaultPopupInfo(
                    d,
                    q.name + ": {" + q.displayField + "}",
                    J
                  )) && (y = new m(d));
                  l.resolve(y);
                }
                return l;
              },
              getWayPoints: function (d, q, t) {
                var l = new k();
                q && l.resolve(d.defaultLocations);
                q = [];
                for (var y = 0, J = d.defaultLocations.length; y < J; y++) {
                  var H = d.defaultLocations[y];
                  if ("object" === typeof H && H.feature && H.name) {
                    var T = {};
                    T = H.feature.attributes;
                    H.name && (T.Name = H.name);
                    H = new z(H.feature, null, T);
                    q.push(H);
                  } else "string" === typeof H ? q.push(H) : q.push("");
                }
                c.config.projectGeometriesToMapCoords(q, t).then(
                  C.hitch(this, function (Q) {
                    l.resolve(Q);
                  }),
                  C.hitch(this, function (Q) {
                    l.reject(Q);
                  })
                );
                return l;
              },
              projectGeometriesToMapCoords: function (d, q) {
                var t = new k(),
                  l = [],
                  y = [];
                if (4326 === parseInt(q.spatialReference.wkid, 10))
                  l.push(new k().resolve(d));
                else if (q.spatialReference.isWebMercator()) {
                  for (var J = 0, H = d.length; J < H; J++) {
                    var T = d[J];
                    if ((q = T.geometry))
                      if ((q = g.geographicToWebMercator(q))) T.geometry = q;
                    y.push(T);
                  }
                  l.push(new k().resolve(y));
                } else
                  for (
                    y =
                      esriConfig &&
                      esriConfig.defaults &&
                      esriConfig.defaults.geometryService,
                      (y && "esri.tasks.GeometryService" === y.declaredClass) ||
                        (geoServiceUrl &&
                        "string" === typeof geoServiceUrl &&
                        C.trim(geoServiceUrl)
                          ? ((geoServiceUrl = C.trim(geoServiceUrl)),
                            (y = new GeometryService(geoServiceUrl)))
                          : (y = A.getArcGISDefaultGeometryService())),
                      J = 0,
                      H = d.length;
                    J < H;
                    J++
                  )
                    (T = d[J])
                      ? l.push(c.config.projectedToOthersCoords(T, y, q))
                      : l.push(new k().resolve(""));
                U(l).then(
                  C.hitch(this, function (Q) {
                    var M = [];
                    if (1 < Q.length) {
                      for (var B = 0, G = Q.length; B < G; B++) M.push(Q[B]);
                      return t.resolve(M);
                    }
                    return t.resolve(Q[0]);
                  }),
                  C.hitch(this, function (Q) {
                    return t.reject(Q);
                  })
                );
                return t;
              },
              projectedToOthersCoords: function (d, q, t) {
                var l = new k(),
                  y = new f();
                y.geometries = [d.geometry];
                y.outSR = t.spatialReference;
                q.project(y).then(
                  function (J) {
                    return (J = J && J[0])
                      ? ((d.geometry = J), l.resolve(d))
                      : l.reject("");
                  },
                  function (J) {
                    console.error(J);
                    return l.reject("");
                  }
                );
                return l;
              },
              _toPointGeometry: function (d) {
                var q = d.feature.geometry;
                q &&
                  (q.getCentroid
                    ? (d.feature.geometry = q.getCentroid())
                    : q.getExtent &&
                      (q = q.getExtent()) &&
                      (d.feature.geometry = q.getCenter()));
                return d;
              },
              _getLocationObject: function (d) {
                return {
                  name: d.name,
                  extent: d.extent,
                  feature: {
                    geometry: d.feature.geometry,
                    attributes: { Score: 100, Addr_Type: "PointAddress" },
                  },
                };
              },
            },
          };
          return c;
        }
      );
    },
    "widgets/Directions/_build-generate_module": function () {
      define([
        "dojo/text!./Widget.html",
        "dojo/text!./css/style.css",
        "dojo/i18n!./nls/strings",
      ], function () {});
    },
    "url:esri/dijit/templates/Directions.html":
      '\x3cdiv class\x3d"${options.theme}" role\x3d"presentation"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_widgetContainer" class\x3d"${_css.widgetContainerClass}" role\x3d"presentation"\x3e\r\n        \x3cdiv class\x3d"${_css.stopsContainerClass}" role\x3d"presentation"\x3e\r\n            \x3cdiv id\x3d"search-source-container" class\x3d"${_css.searchSourceContainerClass}" data-dojo-attach-point\x3d"_searchSourceContainerNode"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"_searchSourceSelectorContainer"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"${_css.stopsTableContainerClass}"\x3e\r\n                \x3ctable class\x3d"${_css.stopsClass}" data-dojo-attach-point\x3d"_dndNode"\x3e\x3c/table\x3e\r\n                \x3cdiv class\x3d"${_css.stopsTableCoverClass}" data-dojo-attach-point\x3d"_stopsTableCover"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n            \x3cdiv class\x3d"${_css.stopsButtonContainerClass}"\x3e\r\n                \x3cdiv class\x3d"${_css.stopsAddDestinationClass}"\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" data-dojo-attach-point\x3d"_activateButtonNode" title\x3d"${_i18n.widgets.directions.activate}" class\x3d"${_css.activateButtonClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass} ${_css.stopsPressedButtonClass}" data-blur-on-click\x3d"true"\x3e\x3c/div\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" data-dojo-attach-point\x3d"_lineBarrierButtonNode" title\x3d"${_i18n.widgets.directions.lineBarrier}" class\x3d"${_css.lineBarrierButtonClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass}" data-blur-on-click\x3d"true"\x3e\x3c/div\x3e\r\n                    \x3cdiv role\x3d"button" tabindex\x3d"0" class\x3d"${_css.linkButtonClass} ${_css.stopsAddDestinationBtnClass}" data-dojo-attach-point\x3d"_addDestinationNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.addDestination}\x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"${_css.travelModesContainerClass}" data-dojo-attach-point\x3d"_travelModeContainerNode"\x3e\r\n                    \x3cdiv data-dojo-attach-point\x3d"_travelModeSelectorContainer"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.linkButtonClass} startTimeMenuButton" data-blur-on-click\x3d"true" data-dojo-attach-point\x3d"_startTimeButtonNodeContainer"\x3e\r\n                    \x3cdiv data-dojo-attach-point\x3d"_startTimeButtonNode"\x3e\r\n                        \x3cspan data-dojo-attach-point\x3d"_startTimeButtonLabel"\x3e${_i18n.widgets.directions.leaveNow}\x3c/span\x3e\r\n                        \x3cdiv data-dojo-attach-point\x3d"_startTimeDDLArrow" class\x3d"esriDirectionsDDLArrow"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"startTimeMenu" data-dojo-attach-point\x3d"_startTimeMenu"\x3e\r\n                        \x3cul role\x3d"menu"\x3e\r\n                            \x3cli data-dojo-attach-point\x3d"_startTimeMenuLeaveNow" tabindex\x3d"0" class\x3d"esriRouteZoom startTimeMenuItem" role\x3d"menuitemradio" aria-checked\x3d"true"\x3e${_i18n.widgets.directions.leaveNow}\x3c/li\x3e\r\n                            \x3cli data-dojo-attach-point\x3d"_startTimeMenuDepartAt" tabindex\x3d"0" class\x3d"esriRouteZoom startTimeMenuItem" role\x3d"menuitemradio"\x3e${_i18n.widgets.directions.departAt}\x3c/li\x3e\r\n                            \x3cli data-dojo-attach-point\x3d"_startTimeMenuNone" tabindex\x3d"0" class\x3d"esriRouteZoom startTimeMenuItem" role\x3d"menuitemradio"\x3e${_i18n.widgets.directions.noStartTime}\x3c/li\x3e\r\n                        \x3c/ul\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.linkButtonClass} ${_css.stopsOptionsButtonClass}" data-dojo-attach-point\x3d"_optionsButtonNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.showOptions}\x3c/div\x3e\r\n            \t\x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n                \x3cdiv class\x3d"departAtContainer" data-dojo-attach-point\x3d"_departAtContainer"\x3e\r\n                    \x3cdiv id\x3d"${id}_directionsDepartAtTime" data-dojo-attach-point\x3d"_departAtTimeContainer"\x3e\x3c/div\x3e\r\n                    \x3cdiv id\x3d"${id}_directionsDepartAtDate" data-dojo-attach-point\x3d"_departAtDateContainer"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv role\x3d"presentation" class\x3d"${_css.stopsOptionsMenuClass}" data-dojo-attach-point\x3d"_optionsMenuNode"\x3e\r\n                \x3cdiv class\x3d"${_css.stopsOptionsCheckboxesClass}"\x3e\r\n                    \x3cul\x3e\r\n                        \x3cli class\x3d"${_css.stopsFindOptimalOrderClass}" data-dojo-attach-point\x3d"_findOptimalOrderItemNode"\x3e\x3cinput tabindex\x3d"0" data-dojo-attach-point\x3d"_findOptimalOrderNode" type\x3d"checkbox" id\x3d"${id}_find_optimal_order" /\x3e\x3clabel for\x3d"${id}_find_optimal_order"\x3e${_i18n.widgets.directions.findOptimalOrder}\x3c/label\x3e\x3c/li\x3e\r\n                        \x3cli class\x3d"${_css.stopsReturnToStartClass}" data-dojo-attach-point\x3d"_returnToStartItemNode"\x3e\x3cinput tabindex\x3d"0" data-dojo-attach-point\x3d"_returnToStartNode" type\x3d"checkbox" id\x3d"${id}_stopsReturnToStart" /\x3e\x3clabel for\x3d"${id}_stopsReturnToStart"\x3e${_i18n.widgets.directions.returnToStart}\x3c/label\x3e\x3c/li\x3e\r\n                        \x3cli class\x3d"${_css.stopsUseTrafficClass}" data-dojo-attach-point\x3d"_useTrafficItemNode" title\x3d"${_i18n.widgets.directions.trafficLabelLive}"\x3e\r\n                            \x3cinput tabindex\x3d"0" data-dojo-attach-point\x3d"_useTrafficNode" type\x3d"checkbox" id\x3d"${id}_stopsUseTraffic" /\x3e\x3clabel for\x3d"${id}_stopsUseTraffic"\x3e${_i18n.widgets.directions.useTraffic}\x3c/label\x3e\r\n                            \x3ca data-dojo-attach-point\x3d"_trafficAvailabilityButton" style\x3d"display: none;" href\x3d"http://www.arcgis.com/home/item.html?id\x3db7a893e8e1e04311bd925ea25cb8d7c7" target\x3d"_blank"\x3e\x3cdiv class\x3d"esriTrafficAvailabilityButton" title\x3d"${_i18n.widgets.directions.seeTrafficAvailability}"\x3e\x3c/div\x3e\x3c/a\x3e\r\n                        \x3c/li\x3e\r\n                    \x3c/ul\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"${_css.stopsOptionsToggleContainerClass}"\x3e\r\n                    \x3cdiv class\x3d"${_css.stopsOptionsUnitsContainerClass}"  data-dojo-attach-point\x3d"_agolDistanceUnitsNode"\x3e\r\n                        \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.stopsOptionsUnitsMiClass} ${_css.stopsButtonClass}" data-dojo-attach-point\x3d"_useMilesNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.units.esriMiles.abbr}\x3c/div\x3e\r\n                        \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.stopsOptionsUnitsKmClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabLastClass} ${_css.stopsPressedButtonClass}" data-dojo-attach-point\x3d"_useKilometersNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.units.esriKilometers.abbr}\x3c/div\x3e\r\n                        \x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"${_css.stopsGetDirectionsContainerClass}"\x3e\r\n                \x3cdiv class\x3d"getDirectionsBtnContainer"\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.stopsButtonClass} ${_css.stopsGetDirectionsClass} esriDisabledDirectionsButton" data-dojo-attach-point\x3d"_getDirectionsButtonNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.getDirections}\x3c/div\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.linkButtonClass} ${_css.stopsClearDirectionsClass}" data-dojo-attach-point\x3d"_clearDirectionsButtonNode" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.clearDirections}\x3c/div\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"savePrintBtnContainer" data-dojo-attach-point\x3d"_savePrintBtnContainer"\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.resultsSaveClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass}" data-blur-on-click\x3d"true" data-dojo-attach-point\x3d"_saveMenuButton" title\x3d"${_i18n.widgets.directions.saveTitle}" \x3e\x3c/div\x3e\r\n                    \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.resultsPrintClass} ${_css.stopsButtonClass} ${_css.stopsButtonTabClass}" data-blur-on-click\x3d"true" data-dojo-attach-point\x3d"_printButton" title\x3d"${_i18n.widgets.directions.print}" \x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv role\x3d"presentation" class\x3d"${_css.stopsOptionsMenuClass} esriSaveContainer" data-dojo-attach-point\x3d"_saveMenuNode"\x3e\r\n                \x3cdiv class\x3d"esriLayerNameLabel"\x3e${_i18n.widgets.directions.layerName}\x3c/div\x3e\r\n                \x3cinput type\x3d"text" data-dojo-attach-point\x3d"_outputLayerContainer"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"_folderSelectorContainer"\x3e\x3c/div\x3e\r\n                \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"${_css.stopsButtonClass} esriSaveButton esriDisabledDirectionsButton" data-dojo-attach-point\x3d"_saveButton" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.save}\x3c/div\x3e\r\n                \x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"esriLinkButton esriSaveAsButton" data-dojo-attach-point\x3d"_saveAsButton" data-blur-on-click\x3d"true"\x3e${_i18n.widgets.directions.saveAs}\x3c/div\x3e\r\n            \x3c/div\x3e\r\n    \t\x3c/div\x3e\r\n    \t\x3cdiv class\x3d"${_css.clearClass}"\x3e\x3c/div\x3e\r\n    \t\x3cdiv data-dojo-attach-point\x3d"_msgNode" role\x3d"presentation"\x3e\x3c/div\x3e\r\n    \t\x3cdiv class\x3d"${_css.resultsContainerClass}" role\x3d"presentation"\x3e\r\n        \t\x3cdiv class\x3d"${_css.routesContainerClass}" data-dojo-attach-point\x3d"_resultsNode" role\x3d"presentation"\x3e\x3c/div\x3e\r\n    \t\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\x3c/div\x3e',
    "url:esri/dijit/Search/templates/Search.html":
      '\x3cdiv role\x3d"presentation" class\x3d"${theme}"\x3e\r\n  \x3cdiv role\x3d"presentation" class\x3d"${css.searchGroup}" data-dojo-attach-point\x3d"containerNode"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"expandNode" class\x3d"${css.searchExpandContainer}"\x3e\r\n      \x3cdiv class\x3d"${css.searchAnimateContainer}"\x3e\r\n        \x3cdiv role\x3d"button" title\x3d"${_i18n.widgets.Search.main.searchIn}" id\x3d"${id}_menu_button" class\x3d"${css.searchBtn} ${css.searchToggle}" tabindex\x3d"0" data-dojo-attach-point\x3d"sourcesBtnNode"\x3e\r\n          \x3cspan aria-hidden\x3d"true" role\x3d"presentation" class\x3d"${css.searchToggleIcon}"\x3e\x3c/span\x3e\x3cspan class\x3d"${css.searchSourceName}" data-dojo-attach-point\x3d"sourceNameNode"\x3e\x3c/span\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"${css.searchInputGroup}"\x3e\r\n          \x3cform data-dojo-attach-point\x3d"formNode"\x3e\r\n            \x3cinput maxlength\x3d"${maxLength}" autocomplete\x3d"off" type\x3d"text" tabindex\x3d"0" class\x3d"${css.searchInput}" value\x3d"${value}" aria-haspopup\x3d"true" id\x3d"${id}_input" data-dojo-attach-point\x3d"inputNode" role\x3d"textbox"\x3e\r\n          \x3c/form\x3e\r\n          \x3cdiv role\x3d"button" class\x3d"${css.searchClear}" tabindex\x3d"0" data-dojo-attach-point\x3d"clearNode"\x3e\x3cspan aria-hidden\x3d"true" class\x3d"${css.searchClearIcon}"\x3e\x3c/span\x3e\x3cspan aria-hidden\x3d"true" class\x3d"${css.searchSpinner}"\x3e\x3c/span\x3e\r\n          \x3c/div\x3e\r\n          \x3cdiv data-dojo-attach-point\x3d"suggestionsNode" class\x3d"${css.searchMenu} ${css.suggestionsMenu}"\x3e\x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv role\x3d"button" title\x3d"${_i18n.widgets.Search.main.searchButtonTitle}" class\x3d"${css.searchBtn} ${css.searchSubmit}" tabindex\x3d"0" data-dojo-attach-point\x3d"submitNode"\x3e\r\n      \x3cspan aria-hidden\x3d"true" role\x3d"presentation" class\x3d"${css.searchIcon}"\x3e\x3c/span\x3e\r\n      \x3cspan class\x3d"${css.searchButtonText}"\x3e${_i18n.widgets.Search.main.searchButtonTitle}\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"sourcesNode" class\x3d"${css.searchMenu} ${css.sourcesMenu}"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"noResultsMenuNode" class\x3d"${css.searchMenu} ${css.searchNoResultsMenu}"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"${css.searchClearFloat}"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e',
    "url:widgets/Directions/Widget.html":
      '\x3cdiv style\x3d"width:100%;height:100%;min-width:230px;min-height:136px;"\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"directionController"\x3e\x3c/div\x3e\r\n\t\x3cdiv data-dojo-attach-point\x3d"progress" class\x3d"progress hidden"\x3e\x3c/div\x3e\r\n\x3c/div\x3e',
    "url:widgets/Directions/css/style.css":
      '.jimu-widget-locator .simpleGeocoder .esriGeocoder {border: 1px solid #666;}.jimu-widget-locator .simpleGeocoder .esriGeocoderResults{border: 1px solid #666;}.dj_rtl .jimu-widget-directions .simpleDirections .arcgisSearch .searchGroup .searchInput{width: 100%; box-sizing: border-box; height: 34px; line-height: 34px; padding: 6px 4px;}.dj_rtl .simpleDirections .esriDirectionsTabButton{border-left: 1px solid #A6A6A6;}.jimu-widget-directions input[type\x3d"text"]::-ms-clear{display:none;}.jimu-widget-directions .esriSaveContainer .esriSaveButton,.jimu-widget-directions .esriSaveContainer .esriSaveAsButton{min-width: 72px; height: 36px; line-height: 26px; margin: 10px 0 20px 0;}.jimu-widget-directions .esriSaveContainer .esriSaveAsButton{margin: 15px 10px;}.jimu-widget-directions .esriSaveContainer .dijitValidationTextBox .dijitArrowButtonContainer{height: 28px;}.jimu-widget-directions .esriRoutesInfo{margin-bottom: 20px;}.jimu-widget-directions .esriSearchSourceContainer .esriSearchSourcesDDL {table-layout: auto;}.dart-theme.jimu-widget-directions .simpleDirections .esriResultsContainer {background: transparent;}.dart-theme.jimu-widget-directions .dijitReset.dijitMenuItemLabel .esriTravelModesTypeName,.dart-theme.jimu-widget-directions .esriTravelModesTypeName{color:#a0a0a0;}.dart-theme.jimu-widget-directions .dijitHover .esriTravelModesTypeName{color:#FFF;}.dart-theme.jimu-widget-directions .simpleDirections .esriRouteInfo {color: #a0a0a0;}.dart-theme.jimu-widget-directions .startTimeMenu{background: #333333; border: 1px solid #999999;}.dart-theme.jimu-widget-directions .simpleDirections .esriRouteZoom:hover,.dart-theme.jimu-widget-directions .simpleDirections .esriRouteZoom:focus{background: #444;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsGetDirections,.dart-theme.jimu-widget-directions .simpleDirections .esriStopsClearDirections {background: #666; color: #fff; height: 36px; line-height: 25px; padding: 5px 10px; border-radius: 3px;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsGetDirections{margin: 5px 0;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsClearDirections{margin: 5px 10px;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsGetDirections:hover {background-color: #333 !important;}.dart-theme.jimu-widget-directions .simpleDirections .arcgisSearch .searchGroup .searchInput{border-bottom: 1px solid #666;}.dart-theme.jimu-widget-directions .simpleDirections .esriDirectionsTabButton:not(:first-child){margin: 0 10px;}.dart-theme.jimu-widget-directions .simpleDirections .LocateButton .zoomLocateButton{background-image: url(../images/dartTheme/location.svg); background-size: contain;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsReverse{background: url(../images/dartTheme/reverse.svg) no-repeat 5px center; background-size: contain;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsReverse:hover{background: url(../images/dartTheme/reverse_hover.svg) no-repeat 5px center; background-size: contain;}.dart-theme.jimu-widget-directions .esriOptionsCheckboxes{color:#fff;}.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary{background-color: #444; color: #fff;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsOptionsMenu,.dart-theme.jimu-widget-directions .simpleDirections .departAtContainer.departAtContainerVisible{background-color: #444;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsOptionsMenu.esriSaveContainer{background-color: transparent;}.dart-theme.jimu-widget-directions .simpleDirections .esriSaveContainer .esriLayerNameLabel{color: #999;}.dart-theme.jimu-widget-directions .simpleDirections .esriSaveContainer .dijitSelect .dijitButtonContents{color: #999;}.dart-theme.jimu-widget-directions .simpleDirections .esriDirectionsContainer .esriRoutesInfo {color:#999;}.dart-theme.jimu-widget-directions .simpleDirections .esriStopsOptionsEnabled .esriStopsOptionsOpen{background-color: #666;}.dart-theme.jimu-widget-directions .esriLinkButton.startTimeMenuButton.departAtButton {background-color: #444;}.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary .esriImpedanceCost,.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary .esriOtherCosts,.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary .esriTrafficLabelNone,.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary .esriImpedanceCostHr,.dart-theme.jimu-widget-directions .simpleDirections .esriResultsSummary .esriImpedanceCostMin{color:#FFF !important;}.dart-theme.jimu-widget-directions .esriRouteTextColumn .esriRouteLength{color:#FFF !important; background-color: #444;}.dart-theme.jimu-widget-directions .esriDMTUnknown .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTStraight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTBearLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTBearRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTSharpLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTSharpRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTUTurn .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTFerry .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTRoundabout .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTHighwayMerge .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTHighwayExit .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTHighwayChange .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTForkCenter .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTForkLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTForkRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTripItem .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTEndOfFerry .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTRampRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTRampLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnLeftRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnRightLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnRightRight .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTTurnLeftLeft .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTPedestrianRamp .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTElevator .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTEscalator .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTStairs .esriRouteIcon,.dart-theme.jimu-widget-directions .esriDMTDoorPassage .esriRouteIcon{background-color: #999; background-position-y: 4px; border-radius: 2px;}.dart-theme.jimu-widget-directions .simpleDirections .esriRouteInfo .esriRouteText{color:#FFF;}.dart-theme.jimu-widget-directions .simpleDirections .esriRouteInfo strong{color:#999;}.dart-theme.jimu-widget-directions .simpleDirections .esriRouteIconColumn,.dart-theme.jimu-widget-directions .simpleDirections .esriRouteTextColumn{border-bottom: 1px solid #444;}.dart-theme.jimu-widget-directions .esriStopsTableContainer .arcgisSearch.esriInnerGeocoder {width: 100% !important;}.dart-theme.jimu-widget-directions .esriStopsTableContainer .arcgisSearch,.dart-theme.jimu-widget-directions .esriStopsTableContainer .searchGroup{max-width: 100% !important; width: 100% !important;}.dart-theme.jimu-widget-directions .simpleDirections #search-source-container .dijitInputField {color: #FFF;}.dart-theme.jimu-widget-directions .esriSearchSourcesDDL .dijitMenuItemHover{background-color: #333 !important;}',
    "*now": function (C) {
      C([
        'dojo/i18n!*preload*widgets/Directions/nls/Widget*["ar","bg","bs","ca","cs","da","de","en","el","es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","nb","nl","pl","pt-br","pt-pt","ro","ru","sk","sl","sr","sv","th","tr","zh-cn","uk","vi","zh-hk","zh-tw","ROOT"]',
      ]);
    },
    "*noref": 1,
  },
});
define(
  "dojo/_base/declare jimu/BaseWidget esri/dijit/Directions esri/tasks/locator esri/tasks/RouteParameters esri/request esri/graphicsUtils jimu/LayerInfos/LayerInfos ./queryUtil esri/layers/ArcGISDynamicMapServiceLayer dojo/on dojo/_base/lang dojo/_base/html dojo/_base/array dojo/_base/config dojo/Deferred esri/lang dojo/promise/all dojo/when jimu/portalUtils jimu/utils esri/layers/FeatureLayer ./ActiveStateManager jimu/dijit/Message jimu/dijit/LoadingIndicator ./a11y/Widget ./searchUtil".split(
    " "
  ),
  function (
    C,
    R,
    k,
    Z,
    U,
    O,
    I,
    E,
    A,
    m,
    z,
    g,
    f,
    c,
    d,
    q,
    t,
    l,
    y,
    J,
    H,
    T,
    Q,
    M,
    B,
    G,
    ca
  ) {
    C = C([R], {
      name: "Directions",
      baseClass: "jimu-widget-directions",
      _dijitDirections: null,
      _routeTaskUrl:
        "//route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",
      _locatorUrl:
        "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      _dijitDef: null,
      _trafficLayer: null,
      _barriersFeatureSet: {},
      _isInitDirectionFlag: !1,
      _isInitPresetStopsFlag: !1,
      _updateBarriersFlag: !1,
      activeStateManager: null,
      postCreate: function () {
        this.inherited(arguments);
        this.shelter = new B({ hidden: !0 });
        this.shelter.placeAt(this.domNode);
        this.shelter.startup();
        this.activeStateManager = new Q({ widget: this });
      },
      onOpen: function () {
        this._toggleDartStyleByAppConfig();
        this.widgetManager.activateWidget(this);
        this.a11y_updateFocusNodes({ isFouceToFirstNode: !0 });
        this._show();
      },
      onClose: function () {
        this._hide();
      },
      onNormalize: function () {
        this._show();
      },
      onMinimize: function () {
        this._hide();
      },
      onMaximize: function () {
        this._show();
      },
      onDeActive: function () {
        this._enableWebMapPopup();
      },
      _hide: function () {
        this._dijitDirections &&
          (this.activeStateManager.cacheStates(),
          this.activeStateManager.deactivateDijit());
      },
      _show: function () {
        this._dijitDirections && this.activeStateManager.revertToLastState();
      },
      setStartStop: function (N) {
        this.getDirectionsDijit().then(
          g.hitch(this, function (F) {
            F.reset().then(
              g.hitch(this, function () {
                F.addStop(N);
              }),
              g.hitch(this, function (X) {
                console.error(X);
              })
            );
          }),
          g.hitch(this, function (F) {
            console.error(F);
          })
        );
      },
      addStop: function (N) {
        this.getDirectionsDijit().then(
          g.hitch(this, function (F) {
            F.addStop(N);
          }),
          g.hitch(this, function (F) {
            console.error(F);
          })
        );
      },
      getDirectionsDijit: function () {
        this._dijitDef || (this._dijitDef = new q());
        this._dijitDef.isFulfilled() && (this._dijitDef = new q());
        this._dijitDirections && this._dijitDef.resolve(this._dijitDirections);
        return this._dijitDef;
      },
      _handlePopup: function () {
        this.map.activeDirectionsWidget &&
        this.map.activeDirectionsWidget.mapClickActive
          ? this._disableWebMapPopup()
          : this._enableWebMapPopup();
      },
      _disableWebMapPopup: function () {
        this.map && this.map.setInfoWindowOnClick(!1);
      },
      _enableWebMapPopup: function () {
        this.map && this.map.setInfoWindowOnClick(!0);
      },
      destroy: function () {
        this.map.activeDirectionsWidget === this._dijitDirections &&
          (this.map.activeDirectionsWidget = null);
        this._trafficLayer &&
          (this.map.removeLayer(this._trafficLayer),
          (this._trafficLayer = null));
        this._handlePopup();
        this.inherited(arguments);
      },
      startup: function () {
        this.inherited(arguments);
        this.shelter.show();
        this.a11y_init();
        this.portal = J.getPortal(this.appConfig.portalUrl);
        this._IS_CONFIG_BEFORE_63 = ca.version.isConfigBefore63(this.config);
        this._getLayerInfos().then(
          g.hitch(this, function () {
            var N = this._getOrgPrintServiceURL(this.appConfig.portalUrl),
              F = this._preProcessConfig(),
              X = A.queryBarriers(this.config);
            N = [N, F];
            N = N.concat(X);
            A.havePresetBarrierLayers(this.config) &&
              ((this.layerInfosObj = E.getInstanceSync()),
              this.own(
                z(
                  this.layerInfosObj,
                  "layerInfosFilterChanged",
                  g.hitch(this, function (x) {
                    this._updateBarriersByConfig(x);
                  })
                )
              ));
            l(N).then(
              g.hitch(this, function (x) {
                var da = x[0],
                  ba = new U(),
                  v = this.config.routeOptions;
                v &&
                  ((ba.directionsLanguage = v.directionsLanguage
                    ? v.directionsLanguage
                    : d.locale || "en_us"),
                  (ba.directionsLengthUnits = v.directionsLengthUnits),
                  v.impedanceAttribute &&
                    (ba.impedanceAttribute = v.impedanceAttribute));
                var n = {
                  map: this.map,
                  searchOptions: this.config.searchOptions,
                  routeParams: ba,
                  routeTaskUrl: this.config.routeTaskUrl,
                  dragging: !0,
                  showClearButton: !0,
                  showSaveButton: !0,
                  mapClickActive: this.activeStateManager.mapClickActive,
                  printTaskUrl: da,
                };
                this._barriersFeatureSet.point = x[2];
                this._barriersFeatureSet.polyline = x[3];
                this._barriersFeatureSet.polygon = x[4];
                A.havePresetBarrierLayers(this.config) &&
                  (n.showBarriersButton = !1);
                this.config.routeOptions &&
                  this.config.routeOptions.directionsLengthUnits &&
                  (n.directionsLengthUnits =
                    this.config.routeOptions.directionsLengthUnits);
                this.config.trafficLayerUrl
                  ? ((this._trafficLayer = new m(this.config.trafficLayerUrl)),
                    (n.trafficLayer = this._trafficLayer),
                    (n.traffic = !0))
                  : ((n.traffic = !1), (n.showTrafficOption = !1));
                this.setDoNotFetchTravelModes(n).then(
                  g.hitch(this, function () {
                    f.empty(this.directionController);
                    var u = f.create("div", {}, this.directionController);
                    O({
                      url: n.routeTaskUrl,
                      content: { f: "json" },
                      handleAs: "json",
                      callbackParamName: "callback",
                    })
                      .then(
                        g.hitch(this, function () {
                          this._dijitDirections = new k(n, u);
                          this._dijitDirections.startup();
                          this.activeStateManager.setDirectionDijit(
                            this._dijitDirections
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "load",
                              g.hitch(this, this._onDirectionsLoadedOrCleared)
                            )
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "directions-start",
                              g.hitch(this, this._onDirectionsStart)
                            )
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "directions-finish",
                              g.hitch(this, this._onDirectionsFinish)
                            )
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "directions-clear",
                              g.hitch(this, this._onDirectionsClear)
                            )
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "map-click-active",
                              g.hitch(this, this._handlePopup)
                            )
                          );
                          this.own(
                            z(
                              this._dijitDirections,
                              "error",
                              g.hitch(this, this._handleError)
                            )
                          );
                          this.a11y_initEvents();
                          this.a11y_updateFocusNodes();
                          this._dijitDef &&
                            !this._dijitDef.isFulfilled() &&
                            this._dijitDef.resolve(this._dijitDirections);
                        }),
                        g.hitch(this, function (V) {
                          console.log("Can't access " + n.routeTaskUrl, V);
                        })
                      )
                      .always(
                        g.hitch(this, function () {
                          this.shelter.hide();
                        })
                      );
                  }),
                  g.hitch(this, function (u) {
                    console.error(u);
                  })
                );
              })
            );
          })
        );
      },
      onAppConfigChanged: function (N) {
        this.appConfig = N;
        this._toggleDartStyleByAppConfig();
      },
      _onDirectionsStart: function () {
        this._directionStartFlag = !0;
      },
      _onDirectionsFinish: function (N) {
        var F =
          N &&
          N.result &&
          N.result.stack &&
          -1 < N.result.stack.indexOf("Error");
        if (
          N &&
          N.result &&
          !F &&
          ((N = N.result.routeResults), g.isArrayLike(N) && 0 < N.length)
        ) {
          var X = [];
          c.forEach(N, function (x) {
            x.route && X.push(x.route);
          });
          if (0 < X.length) {
            N = null;
            try {
              (N = I.graphicsExtent(X)) && (N = N.expand(1.3));
            } catch (x) {
              console.log(x);
            }
            N && this.map.setExtent(N);
          }
          this._directionStartFlag &&
            A.havePresetBarrierLayers(this.config) &&
            this._updateBarriersFeatureSet();
          this.a11y_focusWhenFinish();
        }
        this._directionStartFlag = !1;
        this.a11y_updateFocusNodes();
      },
      _onDirectionsClear: function () {
        A.havePresetBarrierLayers(this.config) &&
          this._updateBarriersFlag &&
          (this._clearBarriersFeatureSet(), (this._updateBarriersFlag = !1));
      },
      _handleError: function (N) {
        console.error("Directions Error:" + N.error);
        N.error &&
          -1 < N.error.indexOf("The number of input locations loaded") &&
          N.target.set &&
          N.target.set("canModifyStops", !1);
      },
      _preProcessConfig: function () {
        var N = new q();
        this._IS_CONFIG_BEFORE_63
          ? l([this._getRouteTaskUrl(), this._getLocatorUrl()]).then(
              g.hitch(this, function (F) {
                this.config.routeTaskUrl = F[0];
                this.config.routeTaskUrl =
                  this._replaceRouteTaskUrlWithAppProxy(
                    this.config.routeTaskUrl
                  );
                var X = F[1];
                O({
                  url: X,
                  hanleAs: "json",
                  content: { f: "json" },
                  callbackParamName: "callback",
                }).then(
                  g.hitch(this, function (x) {
                    this._upgradeToSearchOptions(x, X);
                    N.resolve();
                  }),
                  g.hitch(this, function (x) {
                    console.error(x);
                    N.reject();
                  })
                );
              }),
              g.hitch(this, function (F) {
                console.error(F);
                N.reject();
              })
            )
          : (ca.setMap(this.map),
            ca.setLayerInfosObj(this.layerInfosObj),
            ca.setAppConfig(this.appConfig),
            y(ca.getConfigInfo(this.config.searchOptions))
              .then(
                g.hitch(this, function (F) {
                  return l(this._convertConfig(F)).then(function (X) {
                    return c.filter(X, function (x) {
                      return x;
                    });
                  });
                })
              )
              .then(
                g.hitch(this, function (F) {
                  this.config.routeTaskUrl =
                    this._replaceRouteTaskUrlWithAppProxy(
                      this.config.routeTaskUrl
                    );
                  this.config.searchOptions.sources = F;
                  N.resolve();
                })
              ));
        return N;
      },
      _replaceRouteTaskUrlWithAppProxy: function (N) {
        var F = N;
        !window.isBuilder &&
          !this.appConfig.mode &&
          this.appConfig.appProxies &&
          0 < this.appConfig.appProxies.length &&
          c.some(this.appConfig.appProxies, function (X) {
            if (N === X.sourceUrl) return (F = X.proxyUrl), !0;
          });
        return F;
      },
      _getRouteTaskUrl: function () {
        var N = new q();
        this.config.routeTaskUrl
          ? N.resolve(this.config.routeTaskUrl)
          : this.portal.loadSelfInfo().then(
              g.hitch(this, function (F) {
                F && F.helperServices && F.helperServices.route
                  ? N.resolve(F.helperServices.route.url)
                  : N.resolve(this._routeTaskUrl);
              }),
              g.hitch(this, function (F) {
                console.error(F);
                N.resolve(this._routeTaskUrl);
              })
            );
        return N;
      },
      _getLocatorUrl: function () {
        var N = new q();
        this.config.geocoderOptions || (this.config.geocoderOptions = {});
        (this.config.geocoderOptions.geocoders &&
          0 < this.config.geocoderOptions.geocoders.length) ||
          (this.config.geocoderOptions.geocoders = [
            { url: "", placeholder: "" },
          ]);
        var F =
          this.config.geocoderOptions &&
          this.config.geocoderOptions.geocoders &&
          this.config.geocoderOptions.geocoders[0];
        (F = F && F.url)
          ? N.resolve(F)
          : this.portal.loadSelfInfo().then(
              g.hitch(this, function (X) {
                X &&
                X.helperServices &&
                X.helperServices.geocode &&
                0 < X.helperServices.geocode.length
                  ? N.resolve(X.helperServices.geocode[0].url)
                  : N.resolve(this._locatorUrl);
              }),
              g.hitch(this, function (X) {
                console.error(X);
                N.resolve(this._locatorUrl);
              })
            );
        return N;
      },
      setDoNotFetchTravelModes: function (N) {
        var F = new q();
        this.config.travelModesUrl
          ? ((N.travelModesServiceUrl = this.config.travelModesUrl),
            (N.doNotFetchTravelModesFromOwningSystem = !1),
            F.resolve())
          : this._getTravelModesUrlVersion().then(
              g.hitch(this, function (X) {
                N.doNotFetchTravelModesFromOwningSystem =
                  X && 10.4 <= X ? !1 : !0;
                F.resolve();
              }),
              g.hitch(this, function (X) {
                F.reject(X);
              })
            );
        return F;
      },
      _getTravelModesUrlVersion: function () {
        var N = new q();
        O({
          url: this.config.routeTaskUrl,
          content: { f: "json" },
          handleAs: "json",
          callbackParamName: "callback",
        }).then(
          g.hitch(this, function (F) {
            N.resolve(F.currentVersion);
          }),
          g.hitch(this, function (F) {
            console.log("Can't access " + this.config.routeTaskUrl, F);
            N.reject(F);
          })
        );
        return N;
      },
      _onDirectionsLoadedOrCleared: function () {
        this.config.defaultLocations &&
          this.config.defaultLocations.length &&
          0 < this.config.defaultLocations.length &&
          (this.config.defaultLocations[0] ||
            this.config.defaultLocations[1]) &&
          !1 === this._isInitPresetStopsFlag &&
          ((this._isInitPresetStopsFlag = !0),
          ca.config
            .getWayPoints(this.config, this._IS_CONFIG_BEFORE_63, this.map)
            .then(
              g.hitch(this, function (N) {
                N && (N[0] || N[1]) && this._dijitDirections.addStops(N);
              })
            ));
        this._isInitDirectionFlag ||
          (this.activeStateManager.setMapClickActiveImmediately(
            this.activeStateManager.mapClickActive
          ),
          this.activeStateManager.setMapClickActive(
            this.activeStateManager.mapClickActive
          ));
        this.activeStateManager.cacheStates({
          mapClickActive: this.activeStateManager.mapClickActive,
        });
        this._isInitDirectionFlag = !0;
      },
      isHasFrom: function () {
        var N = !1;
        if (this._dijitDirections) {
          var F = this._dijitDirections.stops;
          F &&
            0 <= F.length &&
            ((F = F[0]),
            ("undefined" !== typeof F.name && "" !== F.name) ||
              "undefined" !== typeof F.feature ||
              "undefined" !== typeof F.extent) &&
            (N = !0);
        }
        return N;
      },
      _getRouteItemPortalUrl: function (N) {
        if (!N || !N.indexOf) return null;
        var F = "";
        F = N.indexOf("/home");
        0 > F && (F = N.indexOf("/apps"));
        return (F = N.substring(0, F + 1));
      },
      openRoute: function (N) {
        this.getDirectionsDijit().then(
          g.hitch(this, function (F) {
            var X = this._getRouteItemPortalUrl(N.attributes.RouteLayerItemURL);
            F.defaults.portalUrl = X;
            this._activeBeforReset = this.activeStateManager.mapClickActive;
            F.reset().then(
              g.hitch(this, function () {
                this.activeStateManager.cacheStates({
                  mapClickActive: this._activeBeforReset,
                });
                F.loadRoute(N.attributes.RouteLayerItemID).then(
                  g.hitch(
                    this,
                    function () {
                      this._updateBarriersByConfig();
                    },
                    function (x) {
                      console.log("ERR", x);
                    }
                  )
                );
              }),
              g.hitch(this, function (x) {
                console.error(x);
              })
            );
          }),
          g.hitch(this, function (F) {
            console.error(F);
          })
        );
      },
      actionTo: function (N) {
        this.getDirectionsDijit().then(
          g.hitch(this, function (F) {
            var X = this._getReplaceStops(F, N, "last");
            F.reset().then(
              g.hitch(this, function () {
                F.addStops(X);
              }),
              g.hitch(this, function (x) {
                console.error(x);
              })
            );
          }),
          g.hitch(this, function (F) {
            console.error(F);
          })
        );
      },
      actionFrom: function (N) {
        this.getDirectionsDijit().then(
          g.hitch(this, function (F) {
            var X = this._getReplaceStops(F, N, "first");
            F.reset().then(
              g.hitch(this, function () {
                F.addStops(X);
              }),
              g.hitch(this, function (x) {
                console.error(x);
              })
            );
          }),
          g.hitch(this, function (F) {
            console.error(F);
          })
        );
      },
      _getReplaceStops: function (N, F, X) {
        var x = [];
        N &&
          N.stops &&
          ((x = g.clone(N.stops)),
          "first" === X
            ? (x[0] = F)
            : "last" === X &&
              (!1 === this.isHasFrom() ? (x = ["", F]) : x.push(F)));
        return x;
      },
      _toggleDartStyleByAppConfig: function () {
        var N = this.appConfig.theme.name;
        ("DashboardTheme" === N &&
          ("default" === this.appConfig.theme.styles[0] ||
            "style3" === this.appConfig.theme.styles[0])) ||
        "DartTheme" === N
          ? f.addClass(this.domNode, "dart-theme")
          : f.removeClass(this.domNode, "dart-theme");
      },
      _getOrgPrintServiceURL: function (N) {
        var F = new q();
        if (this.config && this.config.serviceURL)
          return F.resolve(this.config.serviceURL), F;
        J.getPortalSelfInfo(N).then(
          g.hitch(this, function (X) {
            (X =
              X &&
              X.helperServices &&
              X.helperServices.printTask &&
              X.helperServices.printTask.url)
              ? F.resolve(X)
              : F.reject("error");
          }),
          g.hitch(this, function (X) {
            new M({ message: this.nls.portalConnectionError });
            F.reject("error");
            console.error(X);
          })
        );
        return F;
      },
      _updateBarriersByConfig: function (N) {
        var F = !1;
        if (
          (F = N
            ? A.findBarrierLayer(N, this.config)
            : A.havePresetBarrierLayers(this.config))
        )
          this._queryAndUpdateBarriersFeatureSet(),
            (this._updateBarriersFlag = !0);
      },
      _queryAndUpdateBarriersFeatureSet: function () {
        this._dijitDirections.routeParams.barriers = [];
        this._dijitDirections.routeParams.polylineBarriers = [];
        this._dijitDirections.routeParams.polygonBarriers = [];
        this._clearBarriersFeatureSet();
        var N = A.queryBarriers(this.config);
        l(N).then(
          g.hitch(this, function (F) {
            this._barriersFeatureSet.point = F[0];
            this._barriersFeatureSet.polyline = F[1];
            this._barriersFeatureSet.polygon = F[2];
            this._updateBarriersFeatureSet();
            null !== this._activeBeforReset &&
              "undefined" !== typeof this._activeBeforReset &&
              (this.activeStateManager.cacheStates({
                mapClickActive: this._activeBeforReset,
              }),
              (this._activeBeforReset = null));
          })
        );
      },
      _updateBarriersFeatureSet: function () {
        this._dijitDirections &&
          this._barriersFeatureSet &&
          (this._barriersFeatureSet.point &&
            this._barriersFeatureSet.point.features &&
            0 < this._barriersFeatureSet.point.features.length &&
            ((this._updateBarriersFlag = !0),
            this._dijitDirections.setBarriers(this._barriersFeatureSet.point)),
          this._barriersFeatureSet.polyline &&
            this._barriersFeatureSet.polyline.features &&
            0 < this._barriersFeatureSet.polyline.features.length &&
            ((this._updateBarriersFlag = !0),
            this._dijitDirections.setPolylineBarriers(
              this._barriersFeatureSet.polyline
            )),
          this._barriersFeatureSet.polygon &&
            this._barriersFeatureSet.polygon.features &&
            0 < this._barriersFeatureSet.polygon.features.length &&
            ((this._updateBarriersFlag = !0),
            this._dijitDirections.setPolygonBarriers(
              this._barriersFeatureSet.polygon
            )));
      },
      _clearBarriersFeatureSet: function () {
        this._dijitDirections &&
          (this._dijitDirections._clearBarriersGraphics
            ? this._dijitDirections._clearBarriersGraphics()
            : (this._barriersFeatureSet.point &&
                this._dijitDirections.setBarriers([]),
              this._barriersFeatureSet.polyline &&
                this._dijitDirections.setPolylineBarriers([]),
              this._barriersFeatureSet.polygon &&
                this._dijitDirections.setPolygonBarriers([]),
              this._dijitDirections.reset()));
      },
      _upgradeToSearchOptions: function (N, F) {
        if (this._IS_CONFIG_BEFORE_63) {
          var X = this.config.geocoderOptions.geocoders[0].placeholder;
          X || this.config.routeTaskUrl || (X = this.nls.searchPlaceholder);
          this.config.searchOptions = {
            enableSuggestions: this.config.geocoderOptions.autoComplete,
            maxSuggestions: this.config.geocoderOptions.maxLocations,
            minCharacters: this.config.geocoderOptions.minCharacters,
            suggestionDelay: this.config.geocoderOptions.searchDelay,
            sources: [
              {
                locator: null,
                name: "",
                singleLineFieldName: "",
                outFields: ["*"],
                placeholder: X,
              },
            ],
          };
          this.config.geocoderOptions &&
            this.config.geocoderOptions.geocoders &&
            this.config.geocoderOptions.geocoders[0] &&
            this.config.geocoderOptions.geocoders[0].url &&
            -1 ===
              this.config.geocoderOptions.geocoders[0].url.indexOf(
                "arcgis.com"
              ) &&
            (this.config.searchOptions.sources[0].searchTemplate =
              "${Match_addr}");
          this.config.searchOptions.sources[0].locator = new Z(F);
          this.config.searchOptions.sources[0].name =
            N.serviceDescription || "";
          this.config.searchOptions.sources[0].singleLineFieldName =
            (N.singleLineAddressField && N.singleLineAddressField.name) || "";
        }
      },
      _getLayerInfos: function () {
        var N = new q();
        E.getInstance(this.map, this.map.itemInfo).then(
          g.hitch(this, function (F) {
            this.layerInfosObj = F;
            this.own(
              this.layerInfosObj.on(
                "layerInfosFilterChanged",
                g.hitch(this, function (X) {
                  ca.config.onLayerInfosFilterChanged(X, this.config);
                })
              )
            );
            N.resolve();
          })
        );
        return N;
      },
      _convertConfig: function (N) {
        return c.map(
          N.sources,
          g.hitch(this, function (F) {
            var X = new q();
            if (F && F.url && "locator" === F.type) {
              var x = {
                locator: new Z(F.url || ""),
                outFields: ["*"],
                singleLineFieldName: F.singleLineFieldName || "",
                name: H.stripHTML(F.name || ""),
                placeholder: H.stripHTML(F.placeholder || ""),
                countryCode: F.countryCode || "",
                maxSuggestions: F.maxSuggestions,
                useMapExtent: !!F.searchInCurrentMapExtent,
              };
              F.enableLocalSearch &&
                (x.localSearchOptions = {
                  minScale: F.localSearchMinScale,
                  distance: F.localSearchDistance,
                });
              F.zoomScale && (x.autoNavigate = !1);
              X.resolve(x);
            } else
              F && F.url && "query" === F.type
                ? ((x = new T(F.url || null, { outFields: ["*"] })),
                  this.own(
                    z(
                      x,
                      "load",
                      g.hitch(this, function (da) {
                        var ba = da.layer;
                        da = this.map.getLayer(F.layerId);
                        var v = this.layerInfosObj.getLayerInfoById(F.layerId);
                        da
                          ? (v = da = !1)
                          : v
                          ? (v = da = !1)
                          : ((da = t.isDefined(
                              this.config.showInfoWindowOnSelect
                            )
                              ? !!this.config.showInfoWindowOnSelect
                              : !0),
                            (v = !0));
                        var n = null;
                        F.searchFields && 0 < F.searchFields.length
                          ? (n = F.searchFields)
                          : ((n = []),
                            c.forEach(ba.fields, function (V) {
                              "esriFieldTypeOID" !== V.type &&
                                V.name !== ba.objectIdField &&
                                "esriFieldTypeGeometry" !== V.type &&
                                n.push(V.name);
                            }));
                        var u = {
                          featureLayer: ba,
                          outFields: ["*"],
                          searchFields: n,
                          autoNavigate: !1,
                          displayField: F.displayField || "",
                          exactMatch: !!F.exactMatch,
                          name: H.stripHTML(F.name || ""),
                          placeholder: H.stripHTML(F.placeholder || ""),
                          maxSuggestions: F.maxSuggestions || 6,
                          useMapExtent: !!F.searchInCurrentMapExtent,
                          showInfoWindowOnSelect: da,
                          enableInfoWindow: v,
                          _featureLayerId: F.layerId,
                        };
                        u._featureLayerId &&
                          (da = this.layerInfosObj.getLayerInfoById(
                            u._featureLayerId
                          )) &&
                          ba.setDefinitionExpression(da.getFilter());
                        ca.config
                          .getInfoTemplate(ba, F, this.layerInfosObj)
                          .then(
                            g.hitch(this, function (V) {
                              u.infoTemplate = g.clone(V);
                              X.resolve(u);
                            }),
                            g.hitch(this, function () {
                              X.resolve(u);
                            })
                          );
                      })
                    )
                  ),
                  this.own(
                    z(x, "error", function () {
                      X.resolve(null);
                    })
                  ))
                : X.resolve(null);
            return X;
          })
        );
      },
    });
    C.extend(G);
    return C;
  }
);
