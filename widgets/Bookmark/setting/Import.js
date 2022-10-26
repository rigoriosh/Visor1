// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/Bookmark/setting/Import.html":'\x3cdiv class\x3d"import jimu-widget-bookmark"\x3e\r\n  \x3cdiv class\x3d"import-tips"\x3e${nls.importFromWeb}\x3c/div\x3e\r\n\r\n  \x3cdiv data-dojo-attach-point\x3d"bookmarksInWebmap" class\x3d"bookmarks-in-webmap"\x3e\r\n    \x3cdiv class\x3d"select-all-cb"\x3e\r\n      \x3cdiv type\x3d"checkbox" checked\x3d"false" id\x3d"all" data-dojo-type\x3d"jimu/dijit/CheckBox" data-dojo-attach-point\x3d"all"\x3e\x3c/div\x3e\r\n      \x3clabel class\x3d"all-label" for\x3d"all"\x3e${nls.selectAll}\x3c/label\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"bookMarkerContainer" class\x3d"bookmarker-container editing"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\r\n  \x3cdiv data-dojo-attach-point\x3d"noBookmark" class\x3d"no-bookmark"\x3e${nls.noBookmarkInWebMap}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dojo/on dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/utils ../utils ../ItemNode dojo/text!./Import.html libs/Sortable".split(" "),function(k,c,d,h,f,l,m,n,g,p,q,r){return k([m,l],{baseClass:"jimu-Bookmark-Import",templateString:q,bookmarks:[],_selectedBookMarksNumber:0,postCreate:function(){this.inherited(arguments);this.sortableBookMarkerNodes=r.create(this.bookMarkerContainer,{handle:".drag-masker",sort:!1,
disabled:!this._init_editing,animation:100});this.bookmarks=g.readBookmarksInWebmap(this.map);this.displayBookmarks(this.bookmarks);this.bookmarks&&0===this.bookmarks.length?d.addClass(this.bookmarksInWebmap,"hide"):d.addClass(this.noBookmark,"hide");this.own(f(this.all,"change",c.hitch(this,function(){this._selectOrUnselectAll()})))},startup:function(){this.bookmarksInSetting&&this.bookmarksInSetting.forEach(c.hitch(this,function(a){if((a=g.findBookMarkByNameAndExtent(a,this.bookmarks))&&a.bookmark)a.bookmark.itemNode.onSelected()}))},
getConfig:function(){var a=[];this.bookmarks.forEach(c.hitch(this,function(b){b.itemNode&&b.itemNode.domNode&&d.hasClass(b.itemNode.domNode,"selected")&&(delete b.itemNode,b=c.clone(b),a.push(b))}));return a},_isSelectedAll:function(){return this.bookmarks.length===this._selectedBookMarksNumber},_selectOrUnselectAll:function(){this._isSelectedAll()?(this.bookmarks.forEach(c.hitch(this,function(a){a.itemNode&&a.itemNode.domNode&&d.hasClass(a.itemNode.domNode,"selected")&&d.removeClass(a.itemNode.domNode,
"selected")})),this._selectedBookMarksNumber=0):this.bookmarks.forEach(c.hitch(this,function(a){a.itemNode&&a.itemNode.domNode&&!1===d.hasClass(a.itemNode.domNode,"selected")&&(d.addClass(a.itemNode.domNode,"selected"),this._selectedBookMarksNumber++)}))},destroy:function(){h.forEach(this.bookmarks,function(a){a.itemNode&&a.itemNode.destroy()},this);this.bookmarks=[];this.sortableBookMarkerNodes&&(this.sortableBookMarkerNodes.destroy(),this.sortableBookMarkerNodes=null);this.inherited(arguments)},
displayBookmarks:function(a){a.reverse();h.forEach(a,function(b,e){e=this._createBookMarkNode(b,e);b.itemNode=e},this);a.forEach(c.hitch(this,function(b){b.itemNode&&b.itemNode.domNode&&d.place(b.itemNode.domNode,this.bookMarkerContainer,"first")}))},_createBookMarkNode:function(a,b){var e=a.thumbnail||"undefined"!==typeof a.thumbnail&&""!==a.thumbnail?n.processUrlInWidgetConfig(a.thumbnail,this.folderUrl):this.folderUrl+"images/thumbnail_default.png";a=new p({dataId:b,img:e,label:a.displayName||
a.name,display:{selectedBtn:!0,editBtn:!1,deleteBtn:!1},nls:this.nls});this.own(f(a,"click",c.hitch(this,c.partial(this._onBookmarkClick,a))));this.own(f(a,"selected",c.hitch(this,c.partial(this._onBookmarkSelected,a))));this.own(f(a,"unselected",c.hitch(this,c.partial(this._onBookmarkUnSelected,a))));return a},_onBookmarkClick:function(a){a.onSelected()},_onBookmarkSelected:function(){this._selectedBookMarksNumber++;this._isDisableOK()},_onBookmarkUnSelected:function(){this._selectedBookMarksNumber--;
this._isDisableOK()},_isDisableOK:function(){this.popup&&(0<this._selectedBookMarksNumber?this.popup.enableButton(0):this.popup.disableButton(0),g.setCheckboxWithoutEvent(this.all,this._isSelectedAll()))}})});