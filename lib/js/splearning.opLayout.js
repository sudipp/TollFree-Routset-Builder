/**
 * The SPLearning global namespace
 * @constructor
 */
SPLearning.opLayout=function(tbl,dvDBUpdateBtnPane,dvDBUpdateStatusPane)
{
	this.tblOperation=YAHOO.util.Dom.get(tbl);
	this.dvDBUpdateBtnPane=YAHOO.util.Dom.get(dvDBUpdateBtnPane);
	this.dvDBUpdateStatusPane=YAHOO.util.Dom.get(dvDBUpdateStatusPane);
	
	if (this.tblOperation==null || this.dvDBUpdateBtnPane==null || this.dvDBUpdateStatusPane==null){
		alert("SPLearning.opLayout: Object evaluation unsuccessful");
		return;
	}
}

SPLearning.opLayout.prototype.ChangeLayout=function (opMode)
{
	if (typeof(opMode) !="number"){
		alert("ChangeLayout expects 'opMode' as integer");
		return;
	}
	
	oThis=this;
	//if Dummy table is already there, then delete it first
	TblTFSDummy=document.getElementById(this.tblOperation.id + "_view");
	if(TblTFSDummy) TblTFSDummy.parentNode.removeChild(TblTFSDummy);
		
	if(opMode==0){ //view
		//cloning the table to dummy		
		TblTFSDummy=this.tblOperation.cloneNode(true);			
		TblTFSDummy.id=this.tblOperation.id + "_view";
					
		this.traverseDOMTree(this.tblOperation,TblTFSDummy);
		
		TblTFSDummy.title="Click to edit!";		
		this.tblOperation.parentNode.appendChild(TblTFSDummy);
		this.tblOperation.style.display="none";
		
		/////////////////////////////////////////
		//On clicking, changing Edit mode
		TblTFSDummy.onclick = function () { oThis.ChangeLayout(1); }
		//TblTFSDummy.onblur = function () { opLayout(0); }
						
	}
	else if(opMode==1){ //Edit/add
		this.tblOperation.style.display="";
		
		//displaying the DB Saving buttons pane
		this.dvDBUpdateBtnPane.style.display="";
	}
	
	//hiding the DB Saving alert pane
	this.dvDBUpdateStatusPane.style.display="none";
}
	
	
SPLearning.opLayout.prototype.traverseDOMTree= function (currentElement,currentElementDummy)
{
	if (currentElement){
		var tagName=currentElement.tagName;
		
		if (tagName!=null && tagName!="SELECT"){ //for SELECT, dont traverse the tree
			// Traverse the tree				
			var i=0;				
			var currentElementChild=currentElement.childNodes[i];
			
			var currentElementChildDummy=currentElementDummy.childNodes[i];
			while (currentElementChild){
				// Formatting code (indent the tree so it looks nice on the screen)
				// Recursively traverse the tree structure of the child node
				this.traverseDOMTree(currentElementChild,currentElementChildDummy);
				
				i++;
				currentElementChild=currentElement.childNodes[i];					
				currentElementChildDummy=currentElementDummy.childNodes[i];					
			}
		}
		
		
		var ids=currentElement.id;
		// create text nodes on original Element's value
		if (tagName!=null && ids!=null){
			if(tagName=="INPUT" || tagName=="TEXTAREA" || tagName=="SELECT"){
				this.formObjVal2Str(currentElementDummy,currentElement);
			}
		}
	}
}

SPLearning.opLayout.prototype.formObjVal2Str= function (elDummy,el) {	
	try
	{	
		switch (elDummy.type) {
			case "radio":						
				elDummy.disabled=true;
				break;
			case "checkbox":
				elDummy.disabled=true;
				break;					
			case "select-one":
				dnv=document.createTextNode(el.options[el.selectedIndex].text);
				elDummy.parentNode.replaceChild(dnv,elDummy);
				break;
			case "select-multiple":
				dnv=document.createTextNode(el.options[el.selectedIndex].text);
				elDummy.parentNode.replaceChild(dnv,elDummy);
				break;
			case "text":
				dnv=document.createTextNode(elDummy.value);
				elDummy.parentNode.replaceChild(dnv,elDummy);
				break;
			case "textarea":
				dnv=document.createTextNode(elDummy.value);
				elDummy.parentNode.replaceChild(dnv,elDummy);
				break;
			case "password":
				dnv=document.createTextNode(elDummy.value);
				elDummy.parentNode.replaceChild(dnv,elDummy);
				break;
			/*case "hidden":
				dnv=document.createTextNode(elDummy.value);
				elDummy.parentNode.appendChild(dnv);
				elDummy.parentNode.removeChild(elDummy);
				break;*/
			case "button":
				elDummy.style.display='none';
				break;
			case "submit":
				elDummy.style.display='none';
				break;
			case "reset":
				elDummy.style.display='none';
				break;
			
			default:
		}
	}
	catch(e){alert("formObjVal2Str : " + e.description);}
}

SPLearning.opLayout.prototype.UpdateDB=function()
{
	oThis=this;
	this.dvDBUpdateBtnPane.style.display="none";
	
	this.dvDBUpdateStatusPane.style.display="";
	//AJAX save call to db goes here..
	
	this.dvDBUpdateStatusPane.innerHTML='Please wait while information is being saved...';			
	var t1=setTimeout("oThis.dvDBUpdateStatusPane.innerHTML='Information is successfully saved.'",2500);
	var t1=setTimeout("oThis.dvDBUpdateStatusPane.style.display='none'; oThis.ChangeLayout(0);",4000);
}