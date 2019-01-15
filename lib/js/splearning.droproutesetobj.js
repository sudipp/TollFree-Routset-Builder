
SPLearning.DropRouteSetObj = function(oDD,clickEl,oTextComboData) {
	try
	{
		this.oTextComboData=oTextComboData;		
		this.clickEl =clickEl;		
		
		//insert new child on XML
		var xmlnode=rsxml.insertChildNode(this.clickEl.rsprop.type,this.clickEl.rsprop.objId,this.clickEl.rsprop.objHTMLID,this.clickEl.rsprop.parentID,this.clickEl.rsprop.parentHTMLID,this.clickEl.rsprop.label,this.clickEl.rsprop.relationLabel);
		
		var dProxy;
		//for decision object, make it
		if(this.clickEl.rsprop.type==gr.ENU_TMP_DECISION)
			dProxy=gr.MakeDecisionObj(xmlnode);
		//for destination object, make it
		if(this.clickEl.rsprop.type==gr.ENU_TMP_DESTINATION)
			dProxy=gr.MakeDestinationObj(xmlnode);
		
		//Putting Target reference
		dProxy.dropContainer=oDD.getEl(); 
		//finding the Replacing nodes, parentHTML Id
		qtNode=rsxml.findNodesByAttrib("objHTMLID",oDD.getEl().id);
		qtParentNode=rsxml.findParentNodes(qtNode[0]);
		qtParentNodeId=rsxml.getAttribVal(qtParentNode[0],"objHTMLID");
		//Setting parentHTMLID for newly created node
		dProxy.rsprop.parentHTMLID=qtParentNodeId;
		rsxml.setAttribVal(xmlnode,"parentHTMLID",qtParentNodeId);
	    
		//Saving reference of the copy of the Source
		this.dProxy=dProxy;	    
	    
		//making new down arrow to DIV for Text combo
		this.drawTextComboPullArrow();
	        
		//Moving node to source on Canvas
		YAHOO.util.DDM.moveToEl(dProxy, oDD.getEl());
		
		//alert(oDD.getEl().id + " : " + dProxy.offsetLeft + " : " + dProxy.offsetTop);
		
		return dProxy;
	}
	catch(e){ alert("DropRouteSetObj " + e.description); }
}

SPLearning.DropRouteSetObj.prototype.drawTextComboPullArrow = function(){
	try
	{
		//save a reference to this object	
		var oThis = this;
	    
		//creating the dropdownArrow
		var divDDArrow = document.createElement('DIV');    
		divDDArrow.id = this.dProxy.id + "_DDArrow"; 
		divDDArrow.style.cursor='pointer';
		divDDArrow.style.position='absolute';
		divDDArrow.onclick = function (oEvent) {    
			oThis.createTextCombo(oThis.oTextComboData);
		};
	        
		//Add it the DOM, then set Top and Left, else it will be giving wrong value
		this.dProxy.appendChild(divDDArrow);   
	    
		//Making down arrow
		gr.MakeDownArrow(divDDArrow.id);
	    
		divDDArrow.style.top=parseInt((parseInt(this.clickEl.offsetHeight)/2)- (parseInt(divDDArrow.offsetHeight)/2)+2,10);
		divDDArrow.style.left=parseInt(parseInt(this.clickEl.offsetWidth)-parseInt(divDDArrow.offsetWidth)-10,10);
	}
	catch(e){alert("drawTextComboPullArrow :" + e.description);}
}

SPLearning.DropRouteSetObj.prototype.createTextCombo=function(oTextComboData)
{	
	try
	{
		var tc=new SPLearning.TextCombo(this.dProxy,oTextComboData);
		tc.onListItemClick=this.handleListItemClick;
	}
	catch(e){alert("createTextCombo :" + e.description);}
}

SPLearning.DropRouteSetObj.prototype.handleListItemClick=function(dProxy,lstNode)
{
	//alert(dProxy.id + " : " + lstNode.value + " : " + lstNode.text + ":" +lstNode.type);
	//read the XML and build the routesets	
	//alert(dProxy + " : " + dProxy.id);
	
	if(lstNode.type==gr.ENU_TMP_DECISION)
	{
		var xmlstr="<rsobject>" +
		"<obj>"+
			"<type>DecisionCA</type>"+
			"<objId>2</objId>"+
			"<parentID>0</parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label>CA1</label>"+
			"<relationLabel></relationLabel>" +			
		"</obj>" + 
		"<obj>"+
			"<type>tQ</type>" +
			"<objId>0</objId>" +
			"<parentID>2</parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label></label>"+
			"<relationLabel>25%</relationLabel>"+
		"</obj>" +
		"<obj>"+
			"<type>tQ</type>" +
			"<objId>0</objId>" +
			"<parentID>2</parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label></label>"+
			"<relationLabel>15%</relationLabel>"+
		"</obj>" +		
		"<obj>"+
			"<type>tQ</type>" +
			"<objId>0</objId>" +
			"<parentID>2</parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label></label>"+
			"<relationLabel>15%</relationLabel>"+
		"</obj>" +
		"</rsobject>";
		
		
		
		//var rsxml=new SPLearning.RSXMLTree();
		var obj=new SPLearning.RSXMLParser(xmlstr);
		for (var i=0; i<obj.oNewAddedNodes.length;i++)
		{
			type=rsxml.getAttribVal(obj.oNewAddedNodes[i],"type");
					
			if(type==gr.ENU_DECISION_CA || type==gr.ENU_DECISION_DOW || type==gr.ENU_DECISION_DOY || type==gr.ENU_DECISION_HOL || type==gr.ENU_DECISION_ID || type==gr.ENU_DECISION_TOD || type==gr.ENU_DECISION_NPANXX)
			{
				//Making decision object
				dv=gr.MakeDecisionObj(obj.oNewAddedNodes[i]);
				
				dv.dropContainer=dProxy; //Putting Target reference
				
				//putting parent id to new object				
				pxmlNode=rsxml.findNodesByAttrib("objHTMLID",dProxy.id);
				parentHTMLID=rsxml.getAttribVal(pxmlNode[0],"parentHTMLID");
				
				dv.rsprop.parentHTMLID=parentHTMLID;//dProxy.id;
				rsxml.setAttribVal(obj.oNewAddedNodes[i],"parentHTMLID",parentHTMLID);//dProxy.id);	
				
				//Moving new decision on old ?object 
				YAHOO.util.DDM.moveToEl(dv, dProxy);    				
				//hiding the old ?object
				dProxy.style.display='none';

				//Initializing the context menu
				InitObjectContextMenu(dv.id);				
			}
			else if(type==gr.ENU_DEST)
			{
				//Making destination object
				dv=gr.MakeDestinationObj(obj.oNewAddedNodes[i]);
				
				dv.dropContainer=dProxy; //Putting Target reference
				
				//putting parent id to new object				
				pxmlNode=rsxml.findNodesByAttrib("objHTMLID",dProxy.id);
				parentHTMLID=rsxml.getAttribVal(pxmlNode[0],"parentHTMLID");
				
				
				dv.rsprop.parentHTMLID=parentHTMLID;//dProxy.id;
				rsxml.setAttribVal(obj.oNewAddedNodes[i],"parentHTMLID",parentHTMLID);//dProxy.id);	

				//Moving new destination on old ?object 
				YAHOO.util.DDM.moveToEl(dv, dProxy);    				
				//hiding the old ?object
				dProxy.style.display='none';
				
				//Initializing the context menu
				InitObjectContextMenu(dv.id);
			}
			else if(type==gr.ENU_Q)
			{
				//Making ? object
				dv=gr.MakeQuestionMark(obj.oNewAddedNodes[i]);
				
				//finding the parentHTML Id
				parentID=rsxml.getAttribVal(obj.oNewAddedNodes[0],"objHTMLID");
				//putting new parent id to new object
				dv.rsprop.parentHTMLID=parentID;
				rsxml.setAttribVal(obj.oNewAddedNodes[i],"parentHTMLID",parentID);
				
				//Making as DD Target
				slots[slots.length-1] = new YAHOO.util.DDTarget(dv.id);				
			}
		}
		
		try	{
			if(obj.oNewAddedNodes.length>0)	positionChildsToCanvas(obj.oNewAddedNodes[0]);
		}
		catch(e){alert(e.description);}
	}
	
	else if(lstNode.type == gr.ENU_TMP_DESTINATION)
	{
		var xmlstr="<rsobject>" +
		"<obj>"+
			"<type>Dest</type>"+
			"<objId>3</objId>"+
			"<parentID>0</parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label>Dest 1</label>"+
			"<relationLabel></relationLabel>" +			
		"</obj>" + 
		"</rsobject>";
		var obj=new SPLearning.RSXMLParser(xmlstr);
		for (var i=0; i<obj.oNewAddedNodes.length;i++)
		{
			type=rsxml.getAttribVal(obj.oNewAddedNodes[i],"type");
			
			if(type==gr.ENU_DEST)
			{
				//Making destination object
				dv=gr.MakeDestinationObj(obj.oNewAddedNodes[i]);
				
				dv.dropContainer=dProxy; //Putting Target reference
				
				//putting parent id to new object				
				pxmlNode=rsxml.findNodesByAttrib("objHTMLID",dProxy.id);
				parentHTMLID=rsxml.getAttribVal(pxmlNode[0],"parentHTMLID");
				
				
				dv.rsprop.parentHTMLID=parentHTMLID;//dProxy.id;
				rsxml.setAttribVal(obj.oNewAddedNodes[i],"parentHTMLID",parentHTMLID);//dProxy.id);	

				//Moving new destination on old ?object 
				YAHOO.util.DDM.moveToEl(dv, dProxy);    				
				//hiding the old ?object
				dProxy.style.display='none';
				
				//Initializing the context menu
				InitObjectContextMenu(dv.id);
			}
		}
	}
	
}

function positionChildsToCanvas(oXMLNode){
	try{			
		//finding the objHTML Id
		actorNodeID=rsxml.getAttribVal(oXMLNode,"objHTMLID");		
		oActor=YAHOO.util.Dom.get(actorNodeID);
		//get all child node Ids
		var cnodes=rsxml.getChildNodesId(oXMLNode);
	
		//find the middle child node, depends on the total number of nodes 
		if(cnodes.length%2==0) CenterNode=parseInt(cnodes.length/2);
		else CenterNode=parseInt(cnodes.length/2)+1;

		//determining the TOP of childs		
		ocntop=parseInt(oActor.offsetTop) + parseInt(oActor.offsetHeight) + (2*gr.gridsize);
	
		//determing the first left for middle child node
		if(cnodes.length%2==0) iniNodeLeft=parseInt(oActor.offsetLeft)- (3*gr.gridsize);
		else iniNodeLeft=parseInt(oActor.offsetLeft);
		
		if(SPLearning.DropRouteSetObj.prototype.hasTouchedAnyObject(iniNodeLeft,ocntop)==true)
			ocntop=ocntop + gr.HObject + (2*gr.gridsize);
		
		//determining the initial left of starting node
		for(var i=CenterNode-1; i>=1;i--)
		{
			t=YAHOO.util.Dom.get(cnodes[i]);
			shiftedLeft=iniNodeLeft- (2*gr.gridsize) - parseInt(gr.WObject);
			iniNodeLeft=shiftedLeft;			
			
			//if left of node, has reached the left of Canvas, then,  
			if(shiftedLeft<=0){
				shiftedLeft=20;//iniNodeLeft- (2*gr.gridsize) - parseInt(t.style.width);
				iniNodeLeft=shiftedLeft;
				break;
			}
			//if it has touched other object whle going left, then push it down
			else if(SPLearning.DropRouteSetObj.prototype.hasTouchedAnyObject(shiftedLeft,ocntop)==true)
				ocntop=ocntop + gr.HObject + (2*gr.gridsize);
		}
		
		//placing all the child nodes....
		var xMin=0; var xMax=0;
		for(var i=0; i<cnodes.length;i++){
			odc=YAHOO.util.Dom.get(cnodes[i]);			
			odc.style.top=ocntop;
			odc.style.left=iniNodeLeft;
			//determining the position of first child and last child
			if(i==0)xMin=iniNodeLeft;
			if(i==cnodes.length-1)xMax=iniNodeLeft;
			
			iniNodeLeft=parseInt(odc.style.left) + parseInt(gr.WObject) + (2*gr.gridsize);
		}
		
		
		//start from the actor Object and keep on going towards the topmost IC object
		//Position it(& objects below to it if any) to its childs centre position, push 
		//its right siblings (if any) to rights
		nodeP=oXMLNode;
		while(rsxml.isRoot(nodeP)==false)
		{				
			//finding the objHTML Id
			var htmlID=rsxml.getAttribVal(nodeP,"objHTMLID");
			//finding the obj
			var objNode=YAHOO.util.Dom.get(htmlID);
						
			//get all objects lying below the object, 
			var belowObjs=SPLearning.DropRouteSetObj.prototype.getAllBelowObjects(objNode);			
			//get all right siblings nodes of object	
			var oRightSiblingNodesIds=rsxml.getAllRightSiblingNodesIds(nodeP);
			
			//Move the object (& any object below to it) to the middle of its childs
			if(xMax==0) objNode.style.left=xMin;
			else objNode.style.left=xMin + (xMax-xMin)/2;
			xMin=parseInt(objNode.style.left);
						
			//Move object(s) lying below to it
			for(var i=0; i<belowObjs.length;i++) belowObjs[i].style.left=objNode.style.left;						
			
			//shift all right siblings to the parent node
			iniNodeLeft=parseInt(objNode.style.left);
			for(var i=0; i<oRightSiblingNodesIds.length;i++){
				iniNodeLeft=iniNodeLeft + parseInt(gr.WObject) + (2*gr.gridsize);
				oRightSiblingNodesIds[i].style.left= iniNodeLeft;
			}
			xMax=0;
			
			//alert(rsxml.findParentNodes(nodeP));
			var oParentNodes=rsxml.findParentNodes(nodeP);
			if(oParentNodes.length<1) break;
			nodeP=oParentNodes[0];			
		}
		
		gr.clear();
		gr.drawTree(rsxml.Root);		
	}
	catch(e){alert("positionChildsToCanvas : " + e.description);}
}

SPLearning.DropRouteSetObj.prototype.hasTouchedAnyObject=function (x,y)
{
	try
	{
		//alert(gr.canvasObj.childNodes.length);
		var node=gr.canvasObj.firstChild;
		while (node!=null)
		{
			if(x >=node.offsetLeft
			&& x <=node.offsetLeft+node.offsetWidth
			&& y>=node.offsetTop
			&& y<=node.offsetTop+node.offsetHeight 
			&& node.id.length>0
			)
			{
				alert(node.id);
				return  true;
			}
			node=node.nextSibling;
		}
		return false;
	}
	catch(e)
	{
		alert(e.description);
	}
}


SPLearning.DropRouteSetObj.prototype.getAllBelowObjects=function (oNode)
{
	var fNodes=[];	
	var node=gr.dRoutesetCanvas.firstChild;
	while (node!=null){
		if(node.id != null) //offsetLeft & offsetTop doesnt work on Mozilla, for hidden elements
			if((node.id !=oNode.id) && (oNode.style.left==node.style.left) && (oNode.style.top==node.style.top))			
				fNodes.push(node);
		node=node.nextSibling;
	}
	return fNodes;	
}