// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/SmartEditor/setting/RelativeDates.html":'\x3cdiv\x3e\r\n    \x3cdiv\x3e\r\n        \x3cdiv class\x3d"esriCTLabel"\x3e${nls.relativeDates.dateTypeLabel}\x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTRadioButtonContainer"\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTDateTypeLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"fixedRadioButton" checked\r\n                    data-dojo-attach-point\x3d"fixedRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.fixed}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"fixedRadioButton"\x3e\r\n                    ${nls.relativeDates.fixed}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTDateTypeLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"currentRadioButton"  data-dojo-attach-point\x3d"currentRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.current}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"currentRadioButton"\x3e\r\n                    ${nls.relativeDates.current}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTDateTypeLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"PastRadioButton"  data-dojo-attach-point\x3d"PastRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.past}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"PastRadioButton"\x3e\r\n                    ${nls.relativeDates.past}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTDateTypeLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g1\'" type\x3d"radio" name\x3d"jimuradiobtn" id\x3d"futureRadioButton"  data-dojo-attach-point\x3d"futureRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.dateTypeLabel}${nls.relativeDates.future}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"futureRadioButton"\x3e\r\n                    ${nls.relativeDates.future}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTRelativeDatesHint" data-dojo-attach-point\x3d"hintForDateType"\x3e${nls.relativeDates.hintForFixedDateType}\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTLabel" style\x3d"margin-top:10px;" data-dojo-attach-point\x3d"valueLabel"\x3e${nls.relativeDates.valueLabel}\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTFixedDateContent" data-dojo-attach-point\x3d"fixedDateContent"\x3e\r\n        \x3cdiv class\x3d"esriCTFixedContentWrappper"\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTselectValueLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g2\'" type\x3d"radio" name\x3d"jimuradiobtn2" id\x3d"customRadioButton" checked\r\n                data-dojo-attach-point\x3d"customRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.customLabel}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"customRadioButton"\x3e\r\n                    ${nls.relativeDates.customLabel}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRadioBtn esriCTselectValueLabel"\x3e\r\n                \x3cinput data-dojo-type\x3d"jimu/dijit/RadioBtn" data-dojo-props\x3d"group: \'g2\'" type\x3d"radio" name\x3d"jimuradiobtn2" id\x3d"selectValueRadioButton"\r\n                data-dojo-attach-point\x3d"selectValueRadioButton" tabindex\x3d"0" role\x3d"button" aria-label\x3d"${nls.relativeDates.popupTitle}"\x3e\r\n                \x3clabel class\x3d"esriCTRadioLabel" for\x3d"selectValueRadioButton"\x3e\r\n                    ${nls.relativeDates.popupTitle}\r\n                \x3c/label\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"customOptionContentNode"\x3e\r\n        \x3cdiv class\x3d"esriCTWrapper"\x3e\r\n            \x3cdiv class\x3d"esriCTPopUpLabel"\x3e${nls.date}\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                \x3cdiv style\x3d"width:95%" data-dojo-type\x3d"dijit/form/DateTextBox" required\x3d"false" data-dojo-attach-point\x3d"dateTextBox" tabindex\x3d"0" aria-label\x3d"${nls.date}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTWrapper"\x3e\r\n            \x3cdiv class\x3d"esriCTPopUpLabel"\x3e${nls.time}\x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                \x3cdiv style\x3d"width: 95%" data-dojo-type\x3d"dijit/form/TimeTextBox" required\x3d"false" data-dojo-attach-point\x3d"timeTextBox" tabindex\x3d"0" aria-label\x3d"${nls.time}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTHidden"  data-dojo-attach-point\x3d"selectValueOptionContentNode"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"layerSelectorWrapper" class\x3d"esriCTWrapper"\x3e\r\n                \x3cdiv class\x3d"esriCTPopUpLabel"\x3e${nls.layersPage.layerSettingsTable.label}\r\n                \x3c/div\x3e\r\n                \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                    \x3cdiv class\x3d"esriCTLayerSelect" style\x3d"width: 95%" data-dojo-attach-point\x3d"layerSelectorDiv"\r\n                    aria-label\x3d"${nls.layersPage.layerSettingsTable.label}"\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTWrapper"\x3e\r\n                \x3cdiv class\x3d"esriCTPopUpLabel"\x3e${nls.chooseFromLayer.fieldLabel}\x3c/div\x3e\r\n                \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                    \x3cdiv class\x3d"esriCTlayerField" style\x3d"width: 95%" data-dojo-attach-point\x3d"fieldsDropdownDiv"\r\n                    aria-label\x3d"${nls.chooseFromLayer.fieldLabel}"\x3e\r\n                    \x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTWrapper"\x3e\r\n                \x3cdiv class\x3d"esriCTPopUpLabel"\x3e${nls.relativeDates.valueLabel}\x3c/div\x3e\r\n                \x3cdiv class\x3d"esriCTFixedContentDijit"\x3e\r\n                    \x3cdiv class\x3d"esriCTlayerFieldvalue" style\x3d"width: 95%" data-dojo-attach-point\x3d"valueProviderContainer"\r\n                    aria-label\x3d"${nls.relativeDates.valueLabel}"\x3e\r\n                    \x3c/div\x3e\r\n                    \x3cdiv class\x3d"esriCTDomainFieldHint esriCTHidden" data-dojo-attach-point\x3d"domainFieldHint"\x3e\x3c/div\x3e\r\n                \x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTRelativeDatesHint"\x3e${nls.valueProviderHint}\x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTHidden"  data-dojo-attach-point\x3d"noValidLayerContentNode" style\x3d"padding: 20px"\x3e\r\n            ${nls.actionPage.noValidFieldTypeMsg}\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden" style\x3d"width:100%" data-dojo-attach-point\x3d"currentDateContent"\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden esriCTPastOrFutureDateContent" data-dojo-attach-point\x3d"pastOrFutureDateContent"\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.years}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"yearsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.years}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.months}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"monthsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.months}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.days}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"daysTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.days}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel" style\x3d"margin-top: 5px;"\x3e\r\n        \x3c/div\x3e\r\n        \x3cdiv class\x3d"esriCTMarginForLabel"\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.hours}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"hoursTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.hours}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.minutes}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"minutesTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.minutes}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n            \x3cdiv class\x3d"esriCTFloatLeft"\x3e\r\n                \x3cdiv class\x3d"esriCTValueLabel"\x3e${nls.seconds}\x3c/div\x3e\r\n                \x3cdiv style\x3d"width:112px" data-dojo-type\x3d"dijit/form/NumberSpinner" required\x3d"true" value\x3d"0"\r\n                    data-dojo-props\x3d"constraints:{min:0,places:0},intermediateChanges:true" data-dojo-attach-point\x3d"secondsTextBox" tabindex\x3d"0"\r\n                    aria-label\x3d"${nls.seconds}"\x3e\x3c/div\x3e\r\n            \x3c/div\x3e\r\n        \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden esriCTDatesWarningContainer" data-dojo-attach-point\x3d"relativeDateWarningContainer"\x3e${nls.relativeDates.relativeDateWarning}\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/Evented dojo/_base/lang dojo/on dojo/text!./RelativeDates.html dijit/_WidgetsInTemplateMixin jimu/BaseWidgetSetting jimu/dijit/Popup dojo/dom-class jimu/utils dojo/query dijit/focus ../presetUtils dijit/form/Select jimu/dijit/LayerChooserFromMap jimu/dijit/LayerChooserFromMapWithDropbox jimu/dijit/_filter/ValueProviderFactory dojo/_base/array dojo/dom-style dojo/string dojo/dom-attr ../utils dojo/_base/kernel dijit/form/DateTextBox dijit/form/TimeTextBox dijit/form/NumberTextBox jimu/dijit/RadioBtn".split(" "),
function(r,t,e,g,u,v,w,x,d,l,y,z,p,A,k,B,C,m,q,D,E,F,G){return r([w,t,v],{baseClass:"jimu-widget-smartEditor-setting-relativeDates",templateString:u,selectValuePopup:null,_isFirsTime:!0,initialValue:null,postCreate:function(){this._addLayerSelectors();this._eventListener();this._createSelectValuePopUp();this._support508ForSelectValuePopUp();g(window,"resize",e.hitch(this,function(){setTimeout(e.hitch(this,function(){this._setFieldPopupDimensions()}),1E3)}))},_eventListener:function(){this.fixedRadioButton.onStateChange=
e.hitch(this,function(){this.dateTypeChanged()});this.currentRadioButton.onStateChange=e.hitch(this,function(){this.dateTypeChanged()});this.PastRadioButton.onStateChange=e.hitch(this,function(){this.dateTypeChanged()});this.futureRadioButton.onStateChange=e.hitch(this,function(){this.dateTypeChanged()});this.own(g(this.yearsTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(g(this.monthsTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));
this.own(g(this.daysTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(g(this.minutesTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(g(this.hoursTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));this.own(g(this.secondsTextBox,"change",e.hitch(this,function(){this._showOrHideWarningContainer()})));this.customRadioButton.onStateChange=e.hitch(this,function(){this._dateValueOptionChange()});this.selectValueRadioButton.onStateChange=
e.hitch(this,function(){this._dateValueOptionChange()})},dateTypeChanged:function(){d.add(this.fixedDateContent,"esriCTHidden");d.add(this.currentDateContent,"esriCTHidden");d.add(this.pastOrFutureDateContent,"esriCTHidden");d.remove(this.valueLabel,"esriCTHidden");d.add(this.relativeDateWarningContainer,"esriCTHidden");this.fixedRadioButton.checked?(d.remove(this.fixedDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForFixedDateType):this.currentRadioButton.checked?
(d.add(this.valueLabel,"esriCTHidden"),d.remove(this.currentDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForCurrentDateType):this.PastRadioButton.checked?(d.remove(this.pastOrFutureDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForPastDateType):this.futureRadioButton.checked&&(d.remove(this.pastOrFutureDateContent,"esriCTHidden"),this.hintForDateType.innerHTML=this.nls.relativeDates.hintForFutureDateType)},_createSelectValuePopUp:function(){this.selectValuePopup=
new x({titleLabel:this.nls.relativeDates.popupTitle,width:500,maxHeight:450,autoHeight:!0,"class":this.baseClass,content:this,buttons:[{label:this.nls.ok,onClick:e.hitch(this,function(){var a=this._getValues();a&&(!d.contains(this.pastOrFutureDateContent,"esriCTHidden")&&this._checkTextboxesWithZeroValue()?d.remove(this.relativeDateWarningContainer,"esriCTHidden"):(d.add(this.relativeDateWarningContainer,"esriCTHidden"),this.emit("updatePresetValue",a),this.selectValuePopup.close()))})},{label:this.nls.cancel,
classNames:["jimu-btn-vacation"],onClick:e.hitch(this,function(){this.selectValuePopup.close()})}]});this.relativeDates&&this._setValue();this._setFieldPopupDimensions()},_setFieldPopupDimensions:function(){this.selectValuePopup&&(window.appInfo.isRunInMobile&&600>window.innerWidth?this.selectValuePopup.set("width",window.innerWidth-100):this.selectValuePopup.set("width",750))},_validateFixedDate:function(){return this.dateTextBox.isValid()?this.timeTextBox.isValid()?!0:(this.timeTextBox.focus(),
!1):(this.dateTextBox.focus(),!1)},_validatePastOrFutureDate:function(){return this.yearsTextBox.isValid()?this.monthsTextBox.isValid()?this.daysTextBox.isValid()?this.hoursTextBox.isValid()?this.minutesTextBox.isValid()?this.secondsTextBox.isValid()?!0:(this.secondsTextBox.focus(),!1):(this.minutesTextBox.focus(),!1):(this.hoursTextBox.focus(),!1):(this.daysTextBox.focus(),!1):(this.monthsTextBox.focus(),!1):(this.yearsTextBox.focus(),!1)},_getValues:function(){var a=!0,b={value:{}};if(this.fixedRadioButton.checked){if(this.customRadioButton.checked&&
(a=this._validateFixedDate())&&(b.dateType="fixed",b.dateTime=p.getDateFieldValue({type:"esriFieldTypeDate"},[this.dateTextBox,this.timeTextBox])),this.selectValueRadioButton.checked&&(b.dateType="fixed",this._getChooseFromLayerInfo()?b.chooseFromLayerInfo=this._getChooseFromLayerInfo():b.chooseFromLayerInfo=null,b.chooseFromLayerInfo&&b.chooseFromLayerInfo.selectedValue)){var c=b.chooseFromLayerInfo.selectedValue;b.dateTime="Invalid Date"!=new Date(c)?this._convertToEpoch(new Date(c)):parseInt(c)}}else if(this.currentRadioButton.checked)b.dateType=
"current";else if(this.PastRadioButton.checked){if(a=this._validatePastOrFutureDate())b=this._getValuesOfPastOrFutureDijits(),b.dateType="past"}else this.futureRadioButton.checked&&(a=this._validatePastOrFutureDate())&&(b=this._getValuesOfPastOrFutureDijits(),b.dateType="future");return a?b:a},_support508ForSelectValuePopUp:function(){var a=y(".jimu-btn-vacation",this.selectValuePopup.domNode)[0];l.initFirstFocusNode(this.selectValuePopup.domNode,this.selectValuePopup.closeBtnNode);z.focus(this.selectValuePopup.closeBtnNode);
l.initLastFocusNode(this.selectValuePopup.domNode,a)},_setValue:function(){if("fixed"===this.relativeDates.dateType)if(this.fixedRadioButton.domNode.click(),this.relativeDates.hasOwnProperty("chooseFromLayerInfo"))this.selectValueRadioButton.domNode.click();else{this.customRadioButton.domNode.click();var a=new Date(parseInt(this.relativeDates.dateTime,10));this.dateTextBox.set("value",a);this.timeTextBox.set("value",a)}"current"===this.relativeDates.dateType&&this.currentRadioButton.domNode.click();
"past"===this.relativeDates.dateType&&(this.PastRadioButton.domNode.click(),this._setValuesOfPastOrFutureDijits());"future"===this.relativeDates.dateType&&(this.futureRadioButton.domNode.click(),this._setValuesOfPastOrFutureDijits())},_setValuesOfPastOrFutureDijits:function(){this.yearsTextBox.set("value",this.relativeDates.year);this.monthsTextBox.set("value",this.relativeDates.month);this.daysTextBox.set("value",this.relativeDates.day);this.hoursTextBox.set("value",this.relativeDates.hour);this.minutesTextBox.set("value",
this.relativeDates.minute);this.secondsTextBox.set("value",this.relativeDates.second)},_getValuesOfPastOrFutureDijits:function(){var a={};a.year=this.yearsTextBox.value;a.month=this.monthsTextBox.value;a.day=this.daysTextBox.value;a.hour=this.hoursTextBox.value;a.minute=this.minutesTextBox.value;a.second=this.secondsTextBox.value;return a},_checkTextboxesWithZeroValue:function(){return 0!==this.yearsTextBox.value||0!==this.monthsTextBox.value||0!==this.daysTextBox.value||0!==this.hoursTextBox.value||
0!==this.minutesTextBox.value||0!==this.secondsTextBox.value?!1:!0},_showOrHideWarningContainer:function(){this._checkTextboxesWithZeroValue()?d.remove(this.relativeDateWarningContainer,"esriCTHidden"):d.add(this.relativeDateWarningContainer,"esriCTHidden")},_addLayerSelectors:function(){var a=this._createLayerChooserMapArgs();a=new k(a);a.startup();this.layerSelector=new B({layerChooser:a});this.layerSelector.placeAt(this.layerSelectorDiv);this.layerSelector.startup();if(0<this.layerSelector.layerChooser.getAllItems().length)var b=
this.layerSelector.layerChooser.getAllItems()[0].layerInfo.layerObject;this.relativeDates&&this.relativeDates.chooseFromLayerInfo&&this.relativeDates.chooseFromLayerInfo.layerId&&this._isFirsTime&&(a=this.layerInfos.getLayerInfoById(this.relativeDates.chooseFromLayerInfo.layerId))&&(b=a.layerObject);this.layerSelector.setSelectedLayer(b);this._addLayerFieldsOptions()},_createLayerChooserMapArgs:function(){return{multiple:!1,createMapResponse:this.map.webMapResponse,onlyShowWebMapLayers:!0,filter:this._createFiltersForLayerSelector()}},
_createFiltersForLayerSelector:function(){var a=k.createFilterByLayerType(["FeatureLayer","Table"]);var b=k.createImageServiceLayerFilter(!0);a=k.orCombineFilters([a,b]);dateLayerfilter=this._createDateLayerfilter();return k.andCombineFilters([a,dateLayerfilter])},_createDateLayerfilter:function(){return function(a){var b=!1;a.getLayerObject().then(function(c){c&&c.fields&&m.some(c.fields,function(h){if("esriFieldTypeDate"===h.type)return b=!0})});return b}},_addLayerFieldsOptions:function(){this.fieldsDropdown&&
this.fieldsDropdown.destroy();this.valueProviderFactory&&(this.valueProviderFactory=null);this.valueProvider&&this.valueProvider.destroy();this.fieldsDropdown=new A({style:{width:"100%"}});this.fieldsDropdown.placeAt(this.fieldsDropdownDiv);this.fieldsDropdown.startup();this.fieldsDropdown.set("options",this._createFieldsDropDownOpt());this.fieldsDropdown.options&&0<this.fieldsDropdown.options.length&&this.fieldsDropdown.set("value",this.fieldsDropdown.options[0]);this.relativeDates&&this.relativeDates.chooseFromLayerInfo&&
this.relativeDates.chooseFromLayerInfo.field&&this._isFirsTime&&this.fieldsDropdown.set("value",this.relativeDates.chooseFromLayerInfo.field);this._updateLabelForDomainField(this.selectedPresetValue);this.own(g(this.layerSelector,"selection-change",e.hitch(this,function(){this._addLayerFieldsOptions()})));this.own(g(this.fieldsDropdown,"change",e.hitch(this,function(){q.set(this.domainFieldHint,"display","none");this._createValueProvider();this._updateLabelForDomainField("")})))},_createFieldsDropDownOpt:function(){var a=
[];validFieldSet=[];if(this.layerSelector.getSelectedItem()){var b=this.layerSelector.getSelectedItem().layerInfo.layerObject;m.forEach(b.fields,e.hitch(this,function(c){"esriFieldTypeDate"===c.type&&a.push({label:c.alias||c.name,value:c.name})}))}return a},_createValueProvider:function(){var a;this.layerSelector&&(a=this.layerSelector.getSelectedItem());if(a&&a.layerInfo&&a.layerInfo.layerObject){a=a.layerInfo;var b=a.layerObject;this.valueProviderFactory&&(this.valueProviderFactory=null);this.valueProvider&&
this.valueProvider.destroy();this.valueProviderFactory=new C({url:b.url,layerDefinition:b,featureLayerId:a.id});var c;var h=this.fieldsDropdown.getValue();m.some(b.fields,e.hitch(this,function(n){if(n.name===h)return c=n,!0}));if(h&&c){if("esriFieldTypeDate"===c.type){var f="date";var H="dateOperatorIsOn"}f={fieldObj:{name:h,label:h,dateFormat:"",shortType:f,type:c.type},operator:H,interactiveObj:"",caseSensitive:!1,valueObj:{type:"unique"}};this.valueProvider=this.valueProviderFactory.getValueProvider(f,
!1);this.own(g(this.valueProvider,"change",e.hitch(this,function(){var n=this.valueProvider.getPartObject()&&this.valueProvider.getPartObject().valueObj.value;this._updateLabelForDomainField(n)})));this.valueProvider&&(this.valueProvider.placeAt(this.valueProviderContainer),this.relativeDates&&this.relativeDates.chooseFromLayerInfo&&this.relativeDates.chooseFromLayerInfo.selectedValue&&"Invalid Date"!=new Date(this.relativeDates.chooseFromLayerInfo.selectedValue)&&this._isFirsTime&&(f.valueObj.value=
this.relativeDates.chooseFromLayerInfo.selectedValue,this._isFirsTime=!1),this.valueProvider.setValueObject(f.valueObj),this.initialValue=f.valueObj.value?f.valueObj.value:"")}}},_dateValueOptionChange:function(){this.customRadioButton.checked&&(d.remove(this.customOptionContentNode,"esriCTHidden"),d.add(this.selectValueOptionContentNode,"esriCTHidden"),d.add(this.noValidLayerContentNode,"esriCTHidden"));this.selectValueRadioButton.checked&&(0<this.layerSelector.layerChooser.getAllItems().length?
(d.remove(this.selectValueOptionContentNode,"esriCTHidden"),d.add(this.customOptionContentNode,"esriCTHidden"),d.add(this.noValidLayerContentNode,"esriCTHidden")):(d.add(this.customOptionContentNode,"esriCTHidden"),d.remove(this.noValidLayerContentNode,"esriCTHidden")))},_getChooseFromLayerInfo:function(){if(this.valueProvider&&this.valueProvider.checkedNameDiv){var a=this.valueProvider.getPartObject()?this.valueProvider.getPartObject().valueObj.value:"- empty -"!==this.valueProvider.checkedNameDiv.innerHTML&&
this.initialValue?this.initialValue:"";if("ar"===G.locale&&this.layerSelector){var b;if(b=this.layerSelector.getSelectedItem())b=F.getFieldInfosFromWebmap(b.layerInfo),b=p.getFieldInfoByFieldName(b,this.fieldsDropdown.getValue()),"esriFieldTypeDate"===b.type&&(a=l.getDateByDateTimeStr(a),a=l.localizeDateTimeByFieldInfo(a,b))}return{layerId:this.layerSelector.getSelectedItem().layerInfo.layerObject.id,field:this.fieldsDropdown.getValue(),selectedValue:a}}},_convertToEpoch:function(a){return a=(a=a?
new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds()):a||null)&&a.getTime?a.getTime():a&&a.toGregorian?a.toGregorian().getTime():a},_updateLabelForDomainField:function(a){var b,c,h={dateType:"fixed",dateTime:""};(c=this.layerSelector?this.layerSelector.getSelectedItem():null)&&c.layerInfo&&c.layerInfo.layerObject&&(c=c.layerInfo.layerObject,c=c.getField(this.fieldsDropdown.getValue()),c.domain&&"esriFieldTypeDate"===c.type&&m.some(c.domain.codedValues,
e.hitch(this,function(f){if(a==f.code)return f=new Date(a),h.dateTime="Invalid Date"!=f?this._convertToEpoch(f):parseInt(a),b=D.substitute(this.nls.chooseFromLayer.domainFieldHintLabel,{domainValue:p.getDateFromRelativeInfo(h,!0)}),!0})));b?(E.set(this.domainFieldHint,"innerHTML",b),q.set(this.domainFieldHint,"display","block")):q.set(this.domainFieldHint,"display","none")}})});