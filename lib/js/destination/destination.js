
//library used on Destination management

ROGERS.screenLayout.Destination=function(
	dTollAct,dTollActSch,dCalCont,tSchTm,
	dTmCont,dRSAct,dRSActSch,dCalContActRS,
	tRSSchTm,dTmContActRS,dMvAcc,dCancelToll,
	dCalContCancelTF,tSchCancelTolTm,dTmContCancelToll,tblRoute,
	tDefDNIS,tTollActSchDt,tRSSchDt,
	tCanTollSchDt) 
{	
	try
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
		this.col6HTML=null;
		this.col8HTML=null;
		
		this.tSchTm=tSchTm;
		this.tRSSchTm=tRSSchTm;
		this.tSchCancelTolTm=tSchCancelTolTm;
		
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
			//oThis.setSelectedDate(this,txtScheduleDate);
			ROGERS.screenLayout.Destination.prototype.setSelectedDate(this,txtScheduleDate);
		}
		YAHOO.util.Event.addListener(this.cal, "Select", mousedowndna,this.tTollActSchDt);
		this.cal.render();	
		
		this.tp = new ROGERS.TimePicker(YAHOO.util.Dom.get(tSchTm),30,dTmCont);	
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
			//oThis.setSelectedDate(this,txtRSScheduleDate);
			ROGERS.screenLayout.Destination.prototype.setSelectedDate(this,txtRSScheduleDate);
		}
		YAHOO.util.Event.addListener(this.calRSActivation, "Select", mousedowndna,this.tRSSchDt);								
		this.calRSActivation.render();					
		
		this.tpRSActivation = new ROGERS.TimePicker(YAHOO.util.Dom.get(tRSSchTm),30,dTmContActRS);

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
			//oThis.setSelectedDate(this,txtScheduleDateCancelTollNo);
			ROGERS.screenLayout.Destination.prototype.setSelectedDate(this,txtScheduleDateCancelTollNo);
		}
		YAHOO.util.Event.addListener(this.calCancelTollNo, "Select", mousedowndna,this.tCanTollSchDt);
		this.calCancelTollNo.render();	
					
		this.tpCancelTollNo = new ROGERS.TimePicker(YAHOO.util.Dom.get(tSchCancelTolTm),30,dTmContCancelToll);	
		this.tblRout=new ROGERS.ETableRow(this,YAHOO.util.Dom.get(tblRoute),32,true,1,"Route ");	
		this.tblRout.onClickPlus=this.clicktblRoutePlus;
		
		this.col6HTML=YAHOO.util.Dom.get(tblRoute).rows[0].cells[6].innerHTML;
		this.col8HTML=YAHOO.util.Dom.get(tblRoute).rows[0].cells[8].innerHTML;
	}
	catch(e){ alert("ROGERS.screenLayout.Destination " + e.description); }
}


ROGERS.screenLayout.Destination.prototype.clicktblRoutePlus=function(objtbl,pbtn, rowno)
{	
	try
	{
		lst=objtbl.ETableRows[objtbl.ETableRows.length-1].cells[2].childNodes[0];
		lst.selectedIndex=0;
		
		objtbl.parent.prepareRouteListTable(lst);//objtbl,lst);
		objtbl.parent.applyDefaultDNIS();
	}
	catch(e){ alert("clicktblRoutePlus " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.prepareRouteListTable=function (lstRouteListType)
{
	try
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
	catch(e){ alert("prepareRouteListTable " + e.description); }	
}


ROGERS.screenLayout.Destination.prototype.applyDefaultDNIS=function()
{
	try
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
	catch(e){ alert("applyDefaultDNIS" + e.description); }
}

ROGERS.screenLayout.Destination.prototype.showCalendar=function(txt)
{		
	try
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
	catch(e){ alert("showCalendar " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.hideCalendar=function(oCal)
{	
	try{
		oCal.oDomContainer.style.display='none';
	}
	catch(e){ alert("ROGERS.screenLayout.Destination " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.hideDialog=function(oDialog, oCal)
{	
	try{
		oDialog.cancel();
		this.hideCalendar(oCal);
	}
	catch(e){ alert("ROGERS.screenLayout.Destination " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.showTimePicker=function (txt) {
	try
	{
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
		
		else if(txt.id==this.tSchCancelTolTm)
		{
			this.tpCancelTollNo.oDomContainer.style.display='none';
			var pos = YAHOO.util.Dom.getXY(txt);
			this.tpCancelTollNo.oDomContainer.style.display='block';
			YAHOO.util.Dom.setXY(this.tpCancelTollNo.oDomContainer, [pos[0],pos[1]+txt.offsetHeight+1]);	
			this.tpCancelTollNo.oDomContainer.style.zIndex=1000;
			this.tpCancelTollNo.ShowTimePicker();
		}
	}
	catch(e){ alert("showTimePicker " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.setSelectedDate= function (oCal, txt) 
{
	try
	{
		if(oCal.getSelectedDates().length>0){								
			var date1 = oCal.getSelectedDates()[0];									
			txtDate=YAHOO.util.Dom.get(txt);

			this.setDate(txtDate,date1);
		}					
		this.hideCalendar(oCal);
	}
	catch(e){ alert("setSelectedDate " + e.description); }
}

ROGERS.screenLayout.Destination.prototype.setDate= function (txt, dt) {
	try
	{
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
	catch(e){ alert("setDate " + e.description); }
}

