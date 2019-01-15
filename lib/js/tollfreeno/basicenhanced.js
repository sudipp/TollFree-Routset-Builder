
//library  used on TollfreeMgmt->basic/Enhanced#

//SPLearning.screenLayout.prototype.BasicEnhancedTollfree=function(dTollAct,dTollActSch,dCalCont,tSchTm,dTmCont,
SPLearning.screenLayout.BasicEnhancedTollfree=function(dTollAct,dTollActSch,dCalCont,tSchTm,dTmCont,
	dRSAct,dRSActSch,dCalContActRS,tRSSchTm,dTmContActRS,
	dMvAcc,dCancelToll,dCalContCancelTF,tSchTmCancelToll,dTmContCancelToll,
	tblInfoDigitSele,tblRoute,tActDt,tDefDNIS,tCancelTolTm,
	tTollActSchDt,tRSSchDt,tCanTollSchDt
) 
{	
	oThis=this;
	
	this.dlgTollNoActivation=null;
	this.dlgTollNoActivationSchedule=null;	
	this.dlgMoveAccounts=null;
	this.dlgCancelTollNo=null;
	this.dlgRSActivation=null;
	this.dlgRSActivationSchedule=null;		
	
	this.cal=null;
	this.tp=null;		
	this.calCancelTollNo=null;
	this.tpCancelTollNo=null;
	this.calRSActivation=null;
	this.tpRSActivation=null;

	this.tblRout=null;
	this.tblInfoDigit=null;		
	this.col6HTML=null;
	this.col8HTML=null;
	
	this.tSchTm=tSchTm;
	this.tRSSchTm=tRSSchTm;
	this.tCancelTolTm=tCancelTolTm;
	
	this.tTollActSchDt=tTollActSchDt;
	this.tRSSchDt=tRSSchDt;
	this.tCanTollSchDt=tCanTollSchDt;	
	
	this.DefaultDNIS=YAHOO.util.Dom.get(tDefDNIS);
	
	this.dlgTollNoActivation = new YAHOO.widget.Dialog(dTollAct, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgTollNoActivation.render();
	this.dlgTollNoActivation.cfg.setProperty('postmethod','none'); 
	this.dlgTollNoActivation.cfg.setProperty('close',false);			
	
	this.dlgTollNoActivationSchedule = new YAHOO.widget.Dialog(dTollActSch, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgTollNoActivationSchedule.render();
	this.dlgTollNoActivationSchedule.cfg.setProperty('postmethod','none'); 
	this.dlgTollNoActivationSchedule.cfg.setProperty('close',false);
	
	this.cal = new YAHOO.widget.Calendar("cal",dCalCont);
	var mousedowndna=function (e,txtScheduleDate){
		oThis.setSelectedDate(this,txtScheduleDate);
	}
	YAHOO.util.Event.addListener(this.cal, "Select", mousedowndna,this.tTollActSchDt);
	this.cal.render();					
	
	this.tp = new SPLearning.TimePicker(YAHOO.util.Dom.get(tSchTm),30,dTmCont);	

	this.dlgRSActivation = new YAHOO.widget.Dialog(dRSAct, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgRSActivation.render();
	this.dlgRSActivation.cfg.setProperty('postmethod','none'); 
	this.dlgRSActivation.cfg.setProperty('close',false);			
	this.dlgRSActivationSchedule = new YAHOO.widget.Dialog(dRSActSch, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgRSActivationSchedule.render();
	this.dlgRSActivationSchedule.cfg.setProperty('postmethod','none'); 
	this.dlgRSActivationSchedule.cfg.setProperty('close',false);
	this.calRSActivation = new YAHOO.widget.Calendar("calRSActivation",dCalContActRS);
	var mousedowndna=function (e,txtRSScheduleDate){
		oThis.setSelectedDate(this,txtRSScheduleDate);
	}
	YAHOO.util.Event.addListener(this.calRSActivation, "Select", mousedowndna,this.tRSSchDt);
								
	this.calRSActivation.render();					
	this.tpRSActivation = new SPLearning.TimePicker(YAHOO.util.Dom.get(tRSSchTm),30,dTmContActRS);

	this.dlgMoveAccounts= new YAHOO.widget.Dialog(dMvAcc, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgMoveAccounts.render();
	this.dlgMoveAccounts.cfg.setProperty('postmethod','none'); 
	this.dlgMoveAccounts.cfg.setProperty('close',false);

	this.dlgCancelTollNo= new YAHOO.widget.Dialog(dCancelToll, { modal:true, visible:false, width:"400px", fixedcenter:true, constraintoviewport:true, draggable:false });
	this.dlgCancelTollNo.render();
	this.dlgCancelTollNo.cfg.setProperty('postmethod','none'); 
	this.dlgCancelTollNo.cfg.setProperty('close',false);

	this.calCancelTollNo = new YAHOO.widget.Calendar("calCancelTollNo",dCalContCancelTF);
	var mousedowndna=function (e,txtScheduleDateCancelTollNo){
		oThis.setSelectedDate(this,txtScheduleDateCancelTollNo);
	}
	YAHOO.util.Event.addListener(this.calCancelTollNo, "Select", mousedowndna,this.tCanTollSchDt);
	this.calCancelTollNo.render();	
				
	this.tpCancelTollNo = new SPLearning.TimePicker(YAHOO.util.Dom.get(tSchTmCancelToll),30,dTmContCancelToll);	
	this.tblInfoDigit=new SPLearning.ETableRow(this,YAHOO.util.Dom.get(tblInfoDigitSele),14,true,0,"Digit ");			
	//tblRoute
	this.tblRout=new SPLearning.ETableRow(this,YAHOO.util.Dom.get(tblRoute),32,true,1,"Route ");	
	this.tblRout.onClickPlus=this.clicktblRoutePlus;
	
	this.col6HTML=YAHOO.util.Dom.get(tblRoute).rows[0].cells[6].innerHTML;
	this.col8HTML=YAHOO.util.Dom.get(tblRoute).rows[0].cells[8].innerHTML;
	
	//for current date display
	this.setDate(YAHOO.util.Dom.get(tActDt),new Date());
}


SPLearning.screenLayout.BasicEnhancedTollfree.prototype.clicktblRoutePlus=function(objtbl,pbtn, rowno)
{	
	lst=objtbl.ETableRows[objtbl.ETableRows.length-1].cells[2].childNodes[0];
	lst.selectedIndex=0;
	
	objtbl.parent.prepareRouteListTable(lst);//objtbl,lst);
	objtbl.parent.applyDefaultDNIS();
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.prepareRouteListTable=function (lstRouteListType)
{
	if(lstRouteListType.selectedIndex==1) { //for PSTN
		for(i=0; i<this.tblRout.ETableRows.length;i++)
		{
			lst=this.tblRout.ETableRows[i].cells[2].childNodes[0];
			
			if(lst.selectedIndex==1 && lstRouteListType!=lst)
			{
				lstRouteListType.selectedIndex=0;
				return;
			}
		}
	}	
	
	if(lstRouteListType.selectedIndex==1)
	{
		row=this.tblRout.ETableRows[lstRouteListType.parentNode.parentNode.rowIndex];
		row.cells[3].innerHTML="Terminating #:";
		row.cells[5].innerHTML="";
		for(var i=0;i<row.cells[6].childNodes.length;i++)
			row.cells[6].removeChild(row.cells[6].childNodes[i]);
	}
	else if(lstRouteListType.selectedIndex==0)
	{
		row=this.tblRout.ETableRows[lstRouteListType.parentNode.parentNode.rowIndex];
		row.cells[3].innerHTML="CLLI:";
		row.cells[5].innerHTML="SW/TK:";
		row.cells[6].innerHTML=this.col6HTML;
	}
	
}


SPLearning.screenLayout.BasicEnhancedTollfree.prototype.applyDefaultDNIS=function()
{
	_tbl=this.tblRout;
	for(var i=0; i<_tbl.ETableRows.length;i++)
	{	
		if(_tbl.ETableRows[i].cells.length==10)
		{
			if (_tbl.ETableRows[i].cells[8].firstChild.nodeType == 1)
			{
				if(_tbl.ETableRows[i].cells[8].firstChild.value.length<1) 
				{
					_tbl.ETableRows[i].cells[8].firstChild.value=this.DefaultDNIS.value;
				}
			}
		}
	}
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.showCalendar=function(txt)
{			
	//txt.value="";
	if(txt.id==this.tTollActSchDt)
	{
		this.cal.oDomContainer.style.display='none';
		var pos = YAHOO.util.Dom.getXY(txt);
		this.cal.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.cal.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);									
		this.cal.oDomContainer.style.zIndex=1000;
	}
	else if(txt.id==this.tRSSchDt)
	{
		this.calRSActivation.oDomContainer.style.display='none';
		var pos = YAHOO.util.Dom.getXY(txt);
		this.calRSActivation.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.calRSActivation.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);									
		this.calRSActivation.oDomContainer.style.zIndex=1000;
	}
	
	else if(txt.id==this.tCanTollSchDt)
	{
		this.calCancelTollNo.oDomContainer.style.display='none';
		var pos = YAHOO.util.Dom.getXY(txt);
		this.calCancelTollNo.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.calCancelTollNo.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);									
		this.calCancelTollNo.oDomContainer.style.zIndex=1000;		
	}
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.hideCalendar=function(oCal)
{		
	oCal.oDomContainer.style.display='none';
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.hideDialog=function(oDialog, oCal)
{		
	oDialog.cancel();
	this.hideCalendar(oCal);
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.showTimePicker=function (txt) {
	//txt.value="";
	if(txt.id==this.tSchTm)
	{
		this.tp.oDomContainer.style.display='none';		
		var pos = YAHOO.util.Dom.getXY(txt);
		this.tp.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.tp.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);	
		this.tp.oDomContainer.style.zIndex=1000;
		this.tp.ShowTimePicker();
	}
	else if(txt.id==this.tRSSchTm)
	{
		this.tpRSActivation.oDomContainer.style.display='none';
		var pos = YAHOO.util.Dom.getXY(txt);
		this.tpRSActivation.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.tpRSActivation.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);	
		this.tpRSActivation.oDomContainer.style.zIndex=1000;
		this.tpRSActivation.ShowTimePicker();
	}
	
	else if(txt.id==this.tCancelTolTm)
	{
		this.tpCancelTollNo.oDomContainer.style.display='none';
		var pos = YAHOO.util.Dom.getXY(txt);
		this.tpCancelTollNo.oDomContainer.style.display='block';
		YAHOO.util.Dom.setXY(this.tpCancelTollNo.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);	
		this.tpCancelTollNo.oDomContainer.style.zIndex=1000;
		this.tpCancelTollNo.ShowTimePicker();
	}
	
}


SPLearning.screenLayout.BasicEnhancedTollfree.prototype.setSelectedDate= function (oCal, txt) {
	if(oCal.getSelectedDates().length>0){								
		var date1 = oCal.getSelectedDates()[0];									
		txtDate=YAHOO.util.Dom.get(txt);
		
		this.setDate(txtDate,date1);
	}					
	this.hideCalendar(oCal);
	//oCal.oDomContainer.style.display='none';
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.setDate= function (txt, dt) {
	var year=dt.getYear();
	if (year < 1000)
		year+=1900
	var day=dt.getDay();
	var month=dt.getMonth()+1;
	if (month<10)
		month="0"+month;
	var daym=dt.getDate();
	if (daym<10)
		daym="0"+daym;	
	txt.value=month + "/" + daym+ "/" + year;  
}


//treeview
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.buildGeographicTree =function (dTree,dCoverageSeleStatus) {
	this.tree = new YAHOO.widget.TreeView(dTree);
	this.dCoverageSeleStatus=YAHOO.util.Dom.get(dCoverageSeleStatus);
	
	this.NodeCanada = new YAHOO.widget.TaskNode("Canada" , this.tree.getRoot(), false);
	this.NodeUS=new YAHOO.widget.TaskNode("USA" , this.tree.getRoot(), false);
	
	oThis=this;
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(this.NodeCanada, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(this.NodeUS, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
		
	this.buildCanadaTree();
	this.buildUSATree();
	
	this.tree.draw();
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.isAnyNodeChecked= function(oNode,dCoverageSeleStatus)
{
	anyNodeChecked=false;
	for(var i=0; i<oNode.parent.children.length;i++)
	{
		if(oNode.parent.children[i].checkState!=0)
		{	
			anyNodeChecked=true;
			break;
		}
	}
	if(anyNodeChecked==false)
		dCoverageSeleStatus.innerHTML="Everything";
	else
		dCoverageSeleStatus.innerHTML="Everything selected in the following list";
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.buildCanadaTree=function (){
	oThis=this;
	n=new YAHOO.widget.TaskNode("AB(Alberta)", this.NodeCanada, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("BC(BritishColumbia)",  this.NodeCanada, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("MB(Manitoba)",  this.NodeCanada, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("NB(New Brunswick)",  this.NodeCanada, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
}
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.buildUSATree=function (){
	oThis=this;
	n=new YAHOO.widget.TaskNode("Alabama", this.NodeUS, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("Alaska", this.NodeUS, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("California", this.NodeUS, false);
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
	n=new YAHOO.widget.TaskNode("Florida", this.NodeUS, false);		 
	var mousedowndna=function (e,_dCoverageSeleStatus){
		oThis.isAnyNodeChecked(this,_dCoverageSeleStatus);
	}
	YAHOO.util.Event.addListener(n, "CheckClick", mousedowndna,this.dCoverageSeleStatus);
}
//treeview


//sort table
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.dsRouteset=function (_SNO,_SCPID,_RSNAME,_DESC,_STATUS)
{
	this.SNO=_SNO;
	this.SCPID=_SCPID;
	this.RSNAME=_RSNAME;
	this.DESC=_DESC;
	this.STATUS=_STATUS;
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.arrRS=[];

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.insertRSTblData=function(SNO,SCPID,RSNAME,DESC,STATUS)
{
	ds=new this.dsRouteset(SNO,SCPID,RSNAME,DESC,STATUS);
	this.arrRS.push(ds);
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortTable= function (link)
{	
	//switch (link.firstChild.nodeValue) {
	switch (link.id) {			
		case "aSNO" :
			this.arrRS.sort(this.sortBySNo);
			break;
		case "aSCPID" :
			this.arrRS.sort(this.sortBySCPID);
			break;
		case "aNAME" :
			this.arrRS.sort(this.sortByNAME);
			break;
		case "aDESC" :
			this.arrRS.sort(this.sortByDESC);
			break;
		case "aSTATUS" :
			this.arrRS.sort(this.sortBySTATUS);
			break;
	}
	
	this.drawRouteSetTable("matchData");
	return false;
}

SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortBySNo= function (a, b) {
	return a.SNO - b.SNO;
}
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortBySCPID=function (a, b) {
	return a.SCPID - b.SCPID;
}
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortByNAME=function (a, b) {
	a = a.RSNAME.toLowerCase( );
	b = b.RSNAME.toLowerCase( );
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));
}
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortByDESC=function (a, b) {
	a = a.DESC.toLowerCase( );
	b = b.DESC.toLowerCase( );
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));
}
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.sortBySTATUS=function (a, b) {
	//a = a.STATUS.toLowerCase( );
	//b = b.STATUS.toLowerCase( );
	//return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	return a.STATUS - b.STATUS;
}

// Draw table from 'arrRS' array of objects
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.drawRouteSetTable=function (tbody)
{
	var tr, td;
	tbody = YAHOO.util.Dom.get(tbody);
	// remove existing rows, if any
	this.clearTable(tbody);
	
	// loop through data source
	var checked="";
	for (var i = 0; i < this.arrRS.length; i++) {
		tr = tbody.insertRow(tbody.rows.length);
		td = tr.insertCell(tr.cells.length);
		td.setAttribute("align", "center");
	
		if(i==0) checked="checked"; else checked="";
		td.innerHTML="<input type=\"radio\" id=\"__rsele" + i + "\" name=\"rseleGroup\"" + checked +" >";
						
		var dst=this.arrRS[i];
		
		td = tr.insertCell(tr.cells.length);
		td.setAttribute("align", "center");
		td.innerHTML = dst.SNO;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = dst.SCPID;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = dst.RSNAME;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = dst.DESC;
		td = tr.insertCell(tr.cells.length);
		td.setAttribute("align", "center");
		
		var _tDiv="";
		if(dst.STATUS==1) //active
			_tDiv="<div style=\"BACKGROUND:green;COLOR:#fff;display:block;width:70px;text-align:center;\">ACTIVE</div>";
		else if(dst.STATUS==0) //Inactive
			_tDiv="<div style=\"BACKGROUND:yellow;COLOR:#000;display:block; width:70px;text-align:center;\">AVAILABLE</div>";
		td.innerHTML = _tDiv;
	}
}

// Remove existing table rows
SPLearning.screenLayout.BasicEnhancedTollfree.prototype.clearTable= function (tbody) {
	while (tbody.rows.length > 0) {
		tbody.deleteRow(0);
	}
}		
//sort table



