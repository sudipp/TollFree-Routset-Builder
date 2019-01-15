// SPLearning.RSXMLParser.js
// A Class library to parse incoming XML, and drawing objects(Decision/Destination)
//
// Developed by Sudip Purkayastha
// Date : 25-09-2006

SPLearning.RSXML=function()
{}

SPLearning.RSXML.prototype.verifySupport=function (){//xDoc,xmlStream) {
	if (window.ActiveXObject) {	//for IE
		try{
			this.xDoc=new ActiveXObject("Microsoft.XMLDOM");
			this.xDoc.async="false";
			if(this.xDoc && typeof this.xDoc.loadXML == "undefined") {alert("Browser doesnt support loadXML();");return false;} 
			if(this.xDoc.loadXML(this.xmlStream)==false){
				alert("Unable to load XML");
				return false;
			}
		}
		catch(e){ alert(e.description);
			return false;
		}
	}
	else {//for Mozilla, Firefox, Opera, etc.
		try{
			var parser=new DOMParser();
			this.xDoc=parser.parseFromString(this.xmlStream,"text/xml");
		}
		catch(e){ alert(e.description);
			return false;
		}
	}
	return true;
}


SPLearning.RSXMLParser = function (xmlStream)
{
	this.xmlStream=xmlStream;
	this.xDoc=null;
	this.oNewAddedNodes=[];
	if (this.verifySupport()==true)	{
		this.parseXML();
	}
}
YAHOO.extend(SPLearning.RSXMLParser, SPLearning.RSXML);

// verify that browser supports XML features and load external .xml file
SPLearning.RSXMLParser.prototype.parseXML=function () {
	try
	{
		//Getting root
		oroot=this.xDoc.getElementsByTagName("rsobject")[0];// documentElement;
		
		for (var i=0; i<oroot.childNodes.length;i++)  //obj
		{
			var type="";var objId=0; var parentID=0;var label="";var relationLabel=""; var parentHTMLID=""; var objHTMLID="";
			rec= oroot.childNodes[i];//obj
			
			reci=rec.getElementsByTagName("type")[0];
				if(reci.childNodes.length>0) type=reci.firstChild.nodeValue;			
			reci=rec.getElementsByTagName("objId")[0];
				if(reci.childNodes.length>0) objId=reci.firstChild.nodeValue;
			reci=rec.getElementsByTagName("parentID")[0];
				if(reci.childNodes.length>0) parentID=reci.firstChild.nodeValue;
			
			reci=rec.getElementsByTagName("parentHTMLID")[0];
				if(reci.childNodes.length>0) parentHTMLID=reci.firstChild.nodeValue;				
			reci=rec.getElementsByTagName("objHTMLID")[0];
				if(reci.childNodes.length>0) objHTMLID=reci.firstChild.nodeValue;
					
			reci=rec.getElementsByTagName("label")[0];
				if(reci.childNodes.length>0) label=reci.firstChild.nodeValue;
			reci=rec.getElementsByTagName("relationLabel")[0];
				if(reci.childNodes.length>0) relationLabel=reci.firstChild.nodeValue;
			
			/////////////////////////////////////
			//insert new child on XML
			dnode=rsxml.insertChildNode(type,objId,objHTMLID,parentID,parentHTMLID,label,relationLabel);
			this.oNewAddedNodes.push(dnode);						
			/////////////////////////////////////			
		}
	}
	catch(e){alert(e.description);}
}

////////////////////////////////////////////////


SPLearning.RSXMLTree = function ()
{
	this.xDoc=null;
	this.xmlStream="<rsobject>" + 	
		/*"<obj>"+
			"<type>tIC</type>"+
			"<objId></objId>"+
			"<parentID></parentID>"+
			"<parentHTMLID></parentHTMLID>"+
			"<objHTMLID></objHTMLID>"+
			"<label></label>"+
			"<relationLabel></relationLabel>" +			
		"</obj>" + */
	"</rsobject>";
		
	this.Root=null;
	try{
		if (this.verifySupport()==true){
			if(this.xDoc!=null)
				this.Root=this.xDoc.getElementsByTagName("rsobject")[0];		
		}
	}
	catch(e){alert(e.description);}	
}
YAHOO.extend(SPLearning.RSXMLTree, SPLearning.RSXML);


//create new child node
SPLearning.RSXMLTree.prototype.insertChildNode = function (type,objId,objHTMLID,parentID,parentHTMLID,label,relationLabel)
{
	dobj=this.createChildNode(this.Root,'obj','');
	this.createChildNode(dobj,'type',type);
	this.createChildNode(dobj,'objId',objId);
	this.createChildNode(dobj,'objHTMLID',objHTMLID);
	
	this.createChildNode(dobj,'parentID',parentID);
	this.createChildNode(dobj,'parentHTMLID',parentHTMLID);
	
	this.createChildNode(dobj,'label',label);
	this.createChildNode(dobj,'relationLabel',relationLabel);
	
	return dobj;
}

//private to class
SPLearning.RSXMLTree.prototype.createChildNode = function (oParentNode,oNode,objVal)
{	
	dn=this.xDoc.createElement(oNode);
	if(objVal.length>0){
		dnv=this.xDoc.createTextNode(objVal);
		dn.appendChild(dnv);
	}
	oParentNode.appendChild(dn);	
	return dn;
}

SPLearning.RSXMLTree.prototype.getAttribVal= function (oNode,att)
{	
	try
	{
		if(oNode.getElementsByTagName(att)[0].childNodes.length>0){ //if there is child
			return oNode.getElementsByTagName(att)[0].childNodes[0].nodeValue;
		}			
		return "";
	}
	catch (e)
	{
		alert("getAttribVal : " + e.description);
	}
}
SPLearning.RSXMLTree.prototype.setAttribVal= function (oNode,att,attval)
{	
	if(oNode.getElementsByTagName(att)[0].childNodes.length<1) //if there is child
	{
		dnv=this.xDoc.createTextNode(attval);
		oNode.getElementsByTagName(att)[0].appendChild(dnv);
	}
	else		
		oNode.getElementsByTagName(att)[0].childNodes[0].nodeValue=attval;
}

SPLearning.RSXMLTree.prototype.findNodesByAttrib = function (att,attVal)
{	
	var fNodes=[];
	for (var i=0;i<this.Root.childNodes.length;i++)
	{
		oNode=this.Root.childNodes[i];
		if(oNode.getElementsByTagName(att)[0].childNodes.length>0) //if there is child
			if(oNode.getElementsByTagName(att)[0].childNodes[0].nodeValue==attVal)
				fNodes.push(oNode);
	}
	return fNodes;
}

SPLearning.RSXMLTree.prototype.findIncomingCallNode = function ()
{	
	var fNodes=[];
	for (var i=0;i<this.Root.childNodes.length;i++)
	{
		oNode=this.Root.childNodes[i];
		if(oNode.getElementsByTagName("type")[0].childNodes.length>0) //if there is child
			if(oNode.getElementsByTagName("type")[0].childNodes[0].nodeValue==gr.ENU_IC)
				fNodes.push(oNode);	
	}
	return fNodes;
}

SPLearning.RSXMLTree.prototype.deleteNodeByAttrib = function (att,attVal)
{	
	oNodes=this.Root.getElementsByTagName(att);
	for (var i=oNodes.length-1; i>=0;i--)
	{
		if(oNodes[i].childNodes.length>0)
			if(oNodes[i].childNodes[0].nodeValue==attVal)
				this.Root.removeChild(oNodes[i].parentNode);
	}
}

SPLearning.RSXMLTree.prototype.deleteXMLTree = function (xmlNode)
{
	try
	{	
		var cNodes=this.findChildNodes(xmlNode);
		for(var i=cNodes.length-1; i>=0;i--)
		{
			var ccxNodes=this.findChildNodes(cNodes[i]);
			if (ccxNodes.length>0)
				this.deleteXMLTree(cNodes[i]);
			else
				this.deleteNode(cNodes[i]);
		}
		//deleting himself
		this.deleteNode(xmlNode);
	}
	catch(e)
	{ alert("deleteXMLTree : " + e.description); }
}

SPLearning.RSXMLTree.prototype.replaceNode = function (newNode,oldNode)
{	
	this.Root.replaceChild(newNode,oldNode);	
}

SPLearning.RSXMLTree.prototype.deleteNode = function (oNode)
{	
	try { 
		//deleting the DOM tree
		var tDV=YAHOO.util.Dom.get(this.getAttribVal(oNode,"objHTMLID"));
		tDV.parentNode.removeChild(tDV);
		//deleting the XML node
		this.Root.removeChild(oNode);
	}
	catch(e) { alert("deleteNode " +e.description); }
}

SPLearning.RSXMLTree.prototype.findChildNodes = function (oNode)
{	
	try
	{
		var fNodes=[];
		if(oNode.getElementsByTagName("objHTMLID")[0].childNodes.length<1) return fNodes;
		objHTMLID=oNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue;
		oNodes=this.Root.getElementsByTagName("parentHTMLID");
		for (var i=0; i<oNodes.length;i++)
		{
			if(oNodes[i].childNodes.length>0) //if there is child
				if(oNodes[i].childNodes[0].nodeValue==objHTMLID)
					fNodes.push(oNodes[i].parentNode);
		}
		return fNodes;
	}
	catch(e) { alert("findChildNodes" + e.description); }
}

SPLearning.RSXMLTree.prototype.getChildNodesId = function (oNode, onlyRSObject)
{	
	//if(onlyRSObject==null) alert("empty");
	
	var fNodes=[];
	if(oNode.getElementsByTagName("objHTMLID")[0].childNodes.length<1) return fNodes;
		
	//if(onlyRSObject==null) {// then get all child nodes, irrespective of node Type
		objHTMLID=oNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue;
		oNodes=this.Root.getElementsByTagName("parentHTMLID");
		for (var i=0; i<oNodes.length;i++)
		{
			if(onlyRSObject==null) {// then get all child nodes, irrespective of node Type
				if(oNodes[i].childNodes.length>0) //if there is child
					if(oNodes[i].childNodes[0].nodeValue==objHTMLID)
						fNodes.push(oNodes[i].parentNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue);
			}
			else
			{
				//then get all child nodes, except type 
				//SPLearning.Graphics.prototype.ENU_TMP_DECISION="tDecision";
				//SPLearning.Graphics.prototype.ENU_TMP_DESTINATION="tDestination";
				//SPLearning.Graphics.prototype.ENU_Q="tQ";
				//SPLearning.Graphics.prototype.ENU_IC="tIC"; 
				if(oNodes[i].childNodes.length>0) //if there is child
					if(oNodes[i].childNodes[0].nodeValue==objHTMLID){
						var oNodeType=oNodes[i].parentNode.getElementsByTagName("type")[0].childNodes[0].nodeValue; 
												
						if(	oNodeType!=gr.ENU_TMP_DECISION && 
							oNodeType!=gr.ENU_TMP_DESTINATION &&
							oNodeType!=gr.ENU_Q && 
							oNodeType!=gr.ENU_IC)
								fNodes.push(oNodes[i].parentNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue);
					}
			}
		}
	//}
	
	
	
	
	/*else	//then get all child nodes, except type 
			//SPLearning.Graphics.prototype.ENU_TMP_DECISION="tDecision";
			//SPLearning.Graphics.prototype.ENU_TMP_DESTINATION="tDestination";
			//SPLearning.Graphics.prototype.ENU_Q="tQ";
			//SPLearning.Graphics.prototype.ENU_IC="tIC"; 
	{
		objHTMLID=oNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue;
		oNodes=this.Root.getElementsByTagName("parentHTMLID");
		for (var i=0; i<oNodes.length;i++)
		{
			if(oNodes[i].childNodes.length>0) //if there is child
				if(oNodes[i].childNodes[0].nodeValue==objHTMLID)
				{
					var oNodeType=oNodes[i].parentNode.getElementsByTagName("type")[0].childNodes[0].nodeValue; 
					
					if(oNodeType!=gr.ENU_TMP_DECISION && oNodeType!=gr.ENU_TMP_DESTINATION &&
					oNodeType!=gr.ENU_Q && oNodeType!=gr.ENU_IC)
						fNodes.push(oNodes[i].parentNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue);
				}
		}
	}*/
	return fNodes;
}


SPLearning.RSXMLTree.prototype.findParentNodes = function (oChildNode)
{	
	try
	{
		var fNodes=[];
		if(oChildNode.getElementsByTagName("parentHTMLID")[0].childNodes.length<1) return fNodes;
		parentHTMLID=oChildNode.getElementsByTagName("parentHTMLID")[0].childNodes[0].nodeValue;

		oNodes=this.Root.getElementsByTagName("objHTMLID");
		for (var i=0; i<oNodes.length;i++)
		{
			if(oNodes[i].childNodes.length>0) //if there is child
				if(oNodes[i].childNodes[0].nodeValue==parentHTMLID)
					fNodes.push(oNodes[i].parentNode);
		}
		return fNodes;
	}
	catch(e){alert("findParentNodes : " + e.description); }
}

SPLearning.RSXMLTree.prototype.getAllRightSiblingNodes = function (oNode)
{	
	var fNodes=[];
	if(oNode.getElementsByTagName("parentHTMLID")[0].childNodes.length<1) return fNodes;
	nodeHTMLID=this.getAttribVal(oNode,"objHTMLID");
	
	var allSiblingNodes=this.findNodesByAttrib("parentHTMLID",oNode.getElementsByTagName("parentHTMLID")[0].childNodes[0].nodeValue)
	
	var isRightNode=false;
	for (var i=0; i<allSiblingNodes.length;i++)
	{
		if (isRightNode==true)		
			fNodes.push(allSiblingNodes[i]);
			
		if(this.getAttribVal(allSiblingNodes[i],"objHTMLID")==nodeHTMLID)
			isRightNode==true;
		
			//fNodes.push(allSiblingNodes[i]);
	}
	return fNodes;
}

SPLearning.RSXMLTree.prototype.getAllRightSiblingNodesIds = function (oNode)
{	
	var fNodes=[];
	if(oNode.getElementsByTagName("parentHTMLID")[0].childNodes.length<1) return fNodes;
	nodeHTMLID=this.getAttribVal(oNode,"objHTMLID");
	
	objnode=YAHOO.util.Dom.get(nodeHTMLID);
	
	var allSiblingNodes=this.findNodesByAttrib("parentHTMLID",oNode.getElementsByTagName("parentHTMLID")[0].childNodes[0].nodeValue)
	//alert(nodeHTMLID + " : " + allSiblingNodes.length);
	//var isRightNode=false;
	for (var i=0; i<allSiblingNodes.length;i++)
	{
		siblingNodeId=this.getAttribVal(allSiblingNodes[i],"objHTMLID");
		
		//if (isRightNode==true)		
		//	fNodes.push(siblingNodeId);
			
		//if(siblingNodeId==nodeHTMLID) isRightNode==true;
		oSibling=YAHOO.util.Dom.get(siblingNodeId);
		//alert(siblingNodeId + " : " + parseInt(oSibling.style.left) + " : " + nodeHTMLID + " : " + parseInt(objnode.style.left));
		
		if(parseInt(oSibling.style.left) > parseInt(objnode.style.left))
		{
			//alert(siblingNodeId);
			fNodes.push(oSibling);//siblingNodeId);
		}
	}
	return fNodes;
}

SPLearning.RSXMLTree.prototype.isRoot= function (oNode)
{	
	if(this.firstChild==oNode)
		return true;
	else
		return false;
}

SPLearning.RSXMLTree.prototype.generateXMLStream=function(){
	var bIE = (YAHOO.widget.Module.prototype.browser == "ie");
	if(bIE==true) {
		this.xmlStream=this.xDoc.xml;		
	}
	else{
		var s = new XMLSerializer();
		var str = s.serializeToString(this.xDoc);
		this.xmlStream=str;
	}		
	return this.xmlStream;
}