// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

//>>built
define([
  "dojo/_base/declare",
  "jimu/BaseWidget",
  "dojo/dom-construct",
  "jimu/dijit/GridLayout",
], function (d, e, b, f) {
  return d([e], {
    baseClass: "jimu-widget-card",
    _hasContent: null,
    postCreate: function () {
      this.inherited(arguments);
      this._initLayout();
    },
    _initLayout: function () {
      var a = [
        {
          id: 1,
          content: b.create("div", {
            innerHTML: "component 1",
            class: "grid-label",
          }),
        },
        {
          id: 2,
          content: b.create("div", {
            innerHTML: "component 2",
            class: "grid-label",
          }),
        },
        {
          id: 3,
          content: b.create("div", {
            innerHTML: "component 3",
            class: "grid-label",
          }),
        },
      ];
      this.layout = new f({
        components: a,
        layoutDefinition: [
          {
            type: "column",
            isClosable: !0,
            content: [
              {
                type: "stack",
                isClosable: !0,
                reorderEnabled: !0,
                content: [
                  {
                    type: "component",
                    isClosable: !0,
                    componentName: "jimu grid",
                    componentState: { id: 1 },
                  },
                ],
              },
              {
                type: "stack",
                isClosable: !0,
                reorderEnabled: !0,
                content: [
                  {
                    type: "component",
                    isClosable: !0,
                    componentName: "jimu grid",
                    componentState: { id: 2 },
                  },
                ],
              },
              {
                type: "stack",
                isClosable: !0,
                reorderEnabled: !0,
                content: [
                  {
                    type: "component",
                    isClosable: !0,
                    componentName: "jimu grid",
                    componentState: { id: 3 },
                  },
                ],
              },
            ],
          },
        ],
        container: this.domNode,
        editable: !1,
      });
    },
    resize: function () {
      this.layout.resize();
      var a = this.layout.getComponentSize(1),
        c = this.layout.getSize();
      console.log("component 1 size: w\x3d" + a.w + ", h\x3d" + a.h);
      console.log("layout size:: w\x3d" + c.w + ", h\x3d" + c.h);
    },
  });
});
