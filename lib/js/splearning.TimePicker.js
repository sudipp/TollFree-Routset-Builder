// SPLearning.TimePicker source code

SPLearning.TimePicker=function (txtBox,stepby,TPcontainer) {

    //The dropdown list layer.
    this.TimePickerPanel = null;
    
    this.oDomContainer=null;
    _TPcontainer=YAHOO.util.Dom.get(TPcontainer);
    if(_TPcontainer!=null) this.oDomContainer=_TPcontainer;
   
    this.TextBox= txtBox;
    
    this.step=stepby;
    
    this.instance=this;
    
    //initialize the control
    this.init();
}

SPLearning.TimePicker.prototype.CLASS_T_PICKER_CONTAINER="SPLearning-timepickercontainer";

SPLearning.TimePicker.prototype.CLASS_T_PICKER_ITEM="SPLearning-timepickeritem";

SPLearning.TimePicker.prototype.CLASS_T_PICKER_ITEM_HOVER="SPLearning-timepickeritemhover";

SPLearning.TimePicker.prototype.CLASS_T_PICKER_ITEM_CONTAINER="SPLearning-timepickeritemcontainer";

SPLearning.TimePicker.prototype.CLASS_T_PICKER_ITEM_SELECTED="SPLearning-timepickeritemselected";

SPLearning.TimePicker.prototype.init= function () {
	//save a reference to this object	
	//var oThis = this;
	//oThis.createTimeDropdown();
	this.createTimeDropdown();
	//this.TextBox.onfocus = function (oEvent) {    
    //   oThis.createTimeDropdown();
    //};    
}

SPLearning.TimePicker.prototype.padZero=function (n) {
	v="";
	if (n<10)
		return ('0'+n);
	else
		return n;
}

SPLearning.TimePicker.prototype.createTimeDropdown= function () {
	//save a reference to this object	
	var oThis = this;
	//this.TextBox=oThis.TextBox;
	
    var aSuggestions = [];         
    for (i=0;i<=11;i++) {
		if (i==0)hr = 12;
		else hr=i;
		for (j=0;j<(60/oThis.step);j++)
			aSuggestions.push(12+(hr%12) + ":" + this.padZero(j*oThis.step));
	}
    
	//create the layer and assign styles
    this.TimePickerPanel = document.createElement("div");
    this.TimePickerPanel.id = this.TextBox.id + "_TimePickerPanel";
    this.TimePickerPanel.className=this.CLASS_T_PICKER_CONTAINER;
    
    if(oThis.oDomContainer==null)this.TimePickerPanel.style.position='absolute';
    else this.TimePickerPanel.style.position='';
        
    this.TimePickerPanel.style.width = this.TextBox.offsetWidth + 5;    
    this.TimePickerPanel.style.top = this.TextBox.offsetTop + this.TextBox.offsetHeight;
    this.TimePickerPanel.style.left = this.TextBox.offsetLeft;
    document.body.appendChild(this.TimePickerPanel); 
        
    this.objList = document.createElement("div");
    this.objList.innerHTML = "";
    this.objList.id = this.TextBox.id + "__FancyComboList";
    this.objList.className=this.CLASS_T_PICKER_ITEM_CONTAINER;
    this.objList.style.height = '100px';
    
    this.TimePickerPanel.appendChild(this.objList);
    
	//Making the Initial List
	for(var i=0; i<aSuggestions.length;i++)
		this.fillData(aSuggestions[i]);
		//oThis.fillData(aSuggestions[i]);
    
    var mousedown=function (e,player){
		if(	YAHOO.util.Event.getTarget(e).parentNode!=player &&
			YAHOO.util.Event.getTarget(e).parentNode.parentNode!=player &&
			YAHOO.util.Event.getTarget(e)!=oThis.TextBox
		)
		oThis.HideTimePicker();		
	}	
	YAHOO.util.Event.addListener(document, "mousedown", mousedown,this.TimePickerPanel,true);
	
	if(oThis.oDomContainer!=null) oThis.oDomContainer.appendChild(this.TimePickerPanel);
	
	if(oThis.oDomContainer==null) this.TimePickerPanel.style.display='none';
};


SPLearning.TimePicker.prototype.HideTimePicker = function () {
	//hiding the parent layer
	//if(this.oDomContainer==null)
	this.TimePickerPanel.style.display = 'none';	
};

SPLearning.TimePicker.prototype.ShowTimePicker = function () {
	if(this.TextBox.value.length>0)
		this.SelectTime(this.TextBox.value);		
		
	//displaying the parent layer
	//if(this.oDomContainer==null)
	this.TimePickerPanel.style.display = '';	
};


SPLearning.TimePicker.prototype.fillData=function(TimeStump){
	oThis=this;
	
	oDiv = document.createElement("div");
    oDiv.appendChild(document.createTextNode(TimeStump));
    oDiv.className = this.CLASS_T_PICKER_ITEM;
    
    var mouseover=function (e,pobj){		
		pobj.highlightTime(YAHOO.util.Event.getTarget(e));
	}	
	YAHOO.util.Event.addListener(oDiv, "mouseover", mouseover,this);
		
	var mousedown=function (e,pobj){
		pobj.onTimeClick(YAHOO.util.Event.getTarget(e));
	}
	YAHOO.util.Event.addListener(oDiv, "mousedown", mousedown,this);
	    
    this.objList.appendChild(oDiv);   
}

SPLearning.TimePicker.prototype.highlightTime = function (oSuggestionNode) {
    for (var i=0; i < this.objList.childNodes.length; i++) {
        var oNode = this.objList.childNodes[i];
        if (oNode == oSuggestionNode) {
			if (oNode.className != this.CLASS_T_PICKER_ITEM_SELECTED)
				oNode.className = this.CLASS_T_PICKER_ITEM_HOVER;
        } else{
            if (oNode.className != this.CLASS_T_PICKER_ITEM_SELECTED)
				oNode.className = this.CLASS_T_PICKER_ITEM;
        }
    }
};

SPLearning.TimePicker.prototype.onTimeClick= function (oSuggestionNode) {
	//selecting the value
    this.TextBox.value=oSuggestionNode.innerHTML;
    this.HideTimePicker();
};


SPLearning.TimePicker.prototype.SelectTime = function (TextBoxvalue) {
	for (var i=0; i < this.objList.childNodes.length; i++) {
        var oNode = this.objList.childNodes[i];
        if (oNode.innerHTML == TextBoxvalue) {
            oNode.className = this.CLASS_T_PICKER_ITEM_SELECTED;
        } else{
            oNode.className = this.CLASS_T_PICKER_ITEM;
        }
    }
};

SPLearning.TimePicker.prototype.isValidTime = function () {
	for (var i=0; i < this.objList.childNodes.length; i++) {
        var oNode = this.objList.childNodes[i];
        if (oNode.innerHTML == this.TextBox.value) {
            return true;
        }        
    }
    return false;
};
