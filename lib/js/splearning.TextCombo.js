
SPLearning.TextCombo=function (dProxy, oProvider) {
        
    this.dContainer=dProxy;
    
    //alert(this.dContainer.rsprop.type);
    
    //The dropdown list layer.
    this.layer = null;
   
    //Object Data provider for the autosuggest feature.
    this.provider= oProvider;
    
    this.instance=this;
    
    //alert('hi');
    
    //initialize the control
    this.init();
}

//Item click event declaration
SPLearning.TextCombo.prototype.onListItemClick=function()
{};

SPLearning.TextCombo.prototype.CLASS_T_COMBO_CONTAINER="SPLearning-TextComboPanel";
SPLearning.TextCombo.prototype.CLASS_T_COMBO_TXT="SPLearning-TextComboTxtSearch";
SPLearning.TextCombo.prototype.CLASS_T_COMBO_LIST_PANEL="SPLearning-TextComboListPanel";
SPLearning.TextCombo.prototype.CLASS_T_COMBO_LIST_ITEM="SPLearning-TextComboitem";
SPLearning.TextCombo.prototype.CLASS_T_COMBO_LIST_HOVER_ITEM="SPLearning-TextComboitemhover";

SPLearning.TextCombo.prototype.init= function () {
	//save a reference to this object	
	var oThis = this;
	
	var objListData;
	if(this.dContainer.rsprop.type==SPLearning.Graphics.prototype.ENU_TMP_DECISION)
		objListData = this.provider.getDecisionLists();	
	else if(this.dContainer.rsprop.type==SPLearning.Graphics.prototype.ENU_TMP_DESTINATION)
		objListData = this.provider.getDestinationLists();	
		
	var _CanvasScroller_=YAHOO.util.Dom.get('_CanvasScroller_');
	
	//create the layer and assign styles
    this.layer = document.createElement("div");
    this.layer.id = this.dContainer.id + "__txtSearchPanel";
    this.layer.className=this.CLASS_T_COMBO_CONTAINER;
    this.layer.style.height = '100px';
    this.layer.style.width = parseInt(gr.WObject) + (2 * SPLearning.Graphics.prototype.gridsize);
    this.layer.style.top = parseInt(this.dContainer.offsetTop) + parseInt(gr.HObject)/2 +5;
    this.layer.style.left = parseInt(this.dContainer.offsetLeft) - SPLearning.Graphics.prototype.gridsize;
    _CanvasScroller_.appendChild(this.layer); 
    
    this.txtSearch = document.createElement("input");
    this.txtSearch.type = "Text";
    this.txtSearch.id = this.dContainer.id + "__txtSearch";
    this.txtSearch.className=this.CLASS_T_COMBO_TXT;
    var txtkeyup=function (e){
		if(YAHOO.util.Event.getCharCode(e)!=13) oThis.handleKeyUp();
	}	
	YAHOO.util.Event.addListener(this.txtSearch, "keyup", txtkeyup);        
    this.layer.appendChild(this.txtSearch);     
      
    this.objListPanel = document.createElement("div");
    this.objListPanel.innerHTML = "";
    this.objListPanel.id = this.dContainer.id + "__txtSearchList";
    this.objListPanel.className=oThis.CLASS_T_COMBO_LIST_PANEL;
    
    this.objListPanel.style.height = parseInt(this.layer.offsetHeight)-parseInt(this.txtSearch.offsetHeight)-(3* parseInt(YAHOO.util.Dom.getStyle(this.layer, "border-top-width")));
    this.layer.appendChild(this.objListPanel);
    
	//Making the text combo List data
	for(var i=0; i<objListData.length;i++){
		ds=objListData[i];
		this.fillData(ds.objValue,ds.objName);
	}
    
    /*var hideSuggestions=function (e,layer){
		if(	YAHOO.util.Event.getTarget(e).parentNode!=layer && 
			YAHOO.util.Event.getTarget(e).parentNode.parentNode!=layer) 
		oThis.hideSuggestions();
	}*/	
	//YAHOO.util.Event.addListener(document.body, "mousedown", this.hideSuggestionsHandler,this.layer,false);
	YAHOO.util.Event.addListener(document.body, "mousedown", this.hideSuggestionsHandler,this,false);

    this.txtSearch.focus();
};

SPLearning.TextCombo.prototype.hideSuggestionsHandler=function (e,pLayer){
	if(	YAHOO.util.Event.getTarget(e).parentNode!=pLayer.layer && 
		YAHOO.util.Event.getTarget(e).parentNode.parentNode!=pLayer.layer) 
	pLayer.hideSuggestions();
}	


SPLearning.TextCombo.prototype.hideSuggestions = function () {
	//hiding the parent layer
	oParent=this.layer.parentElement;
	this.layer.style.visibility = "hidden";
	
	/*for (var i=0; i < this.layer.childNodes.length; i++) {
        var oNode = this.layer.childNodes[i];
        YAHOO.util.Event.removeListener(oNode, "mouseover");
        this.layer.removeChild(oNode);
    }
    */
    while (this.layer.childNodes.length > 0) {
		YAHOO.util.Event.removeListener(this.layer.firstChild, "mouseover");
		this.layer.removeChild(this.layer.firstChild);
	}
	//YAHOO.util.Event.purgeElement(this.layer,true);
	oParent.removeChild(this.layer);
	YAHOO.util.Event.removeListener(document.body, "mousedown", this.hideSuggestionsHandler);
	
	//alert(this.layer.childNodes.length);
	
	//releasing the object memory
	//YAHOO.util.Event.purgeElement(oThis.objListPanel,true);
    //YAHOO.util.Event.purgeElement(oThis.layer,true);
    //YAHOO.util.Event.purgeElement(this,true);
    //YAHOO.util.Event.purgeElement(oThis.instance,true);    
};


SPLearning.TextCombo.prototype.fillData=function(objValue,objText){
	oThis=this;
	
	dItem = document.createElement("div");
    dItem.appendChild(document.createTextNode(objText));
    dItem.text=objText;
    dItem.value=objValue;
    dItem.type=this.dContainer.rsprop.type;
    dItem.className = oThis.CLASS_T_COMBO_LIST_ITEM;
    
    var mouseover=function (e){//,layer){		
		oThis.highlightItem(YAHOO.util.Event.getTarget(e));
	}	
	YAHOO.util.Event.addListener(dItem, "mouseover", mouseover);//,this.TimePickerPanel,false);
	
	var mousedown=function (e){//,layer){		
		oThis.handleItemClick(YAHOO.util.Event.getTarget(e));
	}	
	YAHOO.util.Event.addListener(dItem, "mousedown", mousedown);//,this.TimePickerPanel,false);
    
    this.objListPanel.appendChild(dItem);   
}

SPLearning.TextCombo.prototype.highlightItem = function (lstNode) {
    for (var i=0; i < this.objListPanel.childNodes.length; i++) {
        var oNode = this.objListPanel.childNodes[i];
        if (oNode == lstNode) {
			oNode.className = this.CLASS_T_COMBO_LIST_HOVER_ITEM;
        } else{
			oNode.className = this.CLASS_T_COMBO_LIST_ITEM;
        }
    }
};

SPLearning.TextCombo.prototype.handleItemClick= function (lstNode) {
	//selecting the value
    //alert(lstNode.value + " : " + lstNode.text);
    
    this.onListItemClick(this.dContainer,lstNode);    
    this.hideSuggestions();
};

// This is the function that refreshes the list after a keypress.
// The function clears the list, and then does a linear search through the
// globally defined array and adds the matches back to the list.
SPLearning.TextCombo.prototype.handleKeyUp=function()
{	
	//var oThis = this;	
	var objListData;
	if(this.dContainer.rsprop.type==SPLearning.Graphics.prototype.ENU_TMP_DECISION)
		objListData = this.provider.getDecisionLists();	
	else if(this.dContainer.rsprop.type==SPLearning.Graphics.prototype.ENU_TMP_DESTINATION)
		objListData = this.provider.getDestinationLists();	
	
	selectObj = this.objListPanel;
	textObj = this.txtSearch;

	strText = "^"+textObj.value;
	re = new RegExp(strText,"gi");
		
	selectObj.innerHTML="";
	for(var i = 0; i < objListData.length; i++)
	{
		ds=objListData[i];
		if(ds.objName.search(re) != -1)
			this.fillData(ds.objValue,ds.objName);
	}
}


SPLearning.TextComboList= function(){
    this.Decisionkeyword = [];    
    this.Destinationkeyword = [];
}

SPLearning.TextComboList.prototype.dsObj=function (oValue,oName)
{
	this.objValue=oValue;
	this.objName=oName;
}

SPLearning.TextComboList.prototype.insertDestinationData=function(oDestinationValue, oDestinationName)
{
	ds=new this.dsObj(oDestinationValue,oDestinationName);
	this.Destinationkeyword.push(ds);
}
SPLearning.TextComboList.prototype.insertDecisionData=function(oDecisionValue,oDecisionName)
{
	ds=new this.dsObj(oDecisionValue,oDecisionName);
	this.Decisionkeyword.push(ds);
}

SPLearning.TextComboList.prototype.sortByObjectName=function (a, b) {
	a = a.objName.toLowerCase( );
	b = b.objName.toLowerCase( );
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));
}

SPLearning.TextComboList.prototype.getDecisionLists = function (){
    return this.Decisionkeyword.sort(this.sortByObjectName);
};

SPLearning.TextComboList.prototype.getDestinationLists = function (){
    return this.Destinationkeyword.sort(this.sortByObjectName);
};
