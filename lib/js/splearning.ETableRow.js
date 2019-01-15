
SPLearning.ETableRow=function (parent, Tbl, _maxrow,_updown, _AutoIncColumn, _AutoIncColumnText) {
    
    //parent is the container object, here its BasicHancedTollfree
    this.parent = parent;    
    
    //The table.
    this.Tbl = Tbl;

	//saving all other prooerty in referenced Table
    this.Tbl.MaxRow=_maxrow;    
    this.Tbl.updown=_updown; // 0/1    
    this.Tbl.AutoIncColumn=_AutoIncColumn;
    this.Tbl.AutoIncColumnText=_AutoIncColumnText;    
    
	//ETableRows which provides the original table rows
	this.ETableRows=this.Tbl.rows;
		
    //initialize the control
    if(this.Tbl!=null) this.init();	
}

SPLearning.ETableRow.prototype.PlusNMinusBtn=function(_btnPlus,_btnMinus)
{
	this.btnPlus = _btnPlus;
    this.btnMinus = _btnMinus;
};

//plus button event
SPLearning.ETableRow.prototype.onClickPlus=function()
{};
//Minus button event
SPLearning.ETableRow.prototype.onClickMinus=function()
{};

/*SPLearning.ETableRow.prototype.CLASS_ETABLE_A="SPLearning-ETable";
SPLearning.ETableRow.prototype.CLASS_T_COMBO_TXT="SPLearning-TextComboTxtSearch";
SPLearning.ETableRow.prototype.CLASS_T_COMBO_LIST_PANEL="SPLearning-TextComboListPanel";
SPLearning.ETableRow.prototype.CLASS_T_COMBO_LIST_ITEM="SPLearning-TextComboitem";
SPLearning.ETableRow.prototype.CLASS_T_COMBO_LIST_HOVER_ITEM="SPLearning-TextComboitemhover";
*/

SPLearning.ETableRow.prototype.init= function () {
	//save a reference to this object	
	var oThis = this;
	
	Tbl = this.Tbl; 	
	for(var i=0; i<Tbl.rows.length;i++)
	{
		if(Tbl.updown==true)
		{
			upa = document.createElement("input");
			upa.type="button";			
			upa.id=Tbl.id + "_upa" + i;
			upa.className = 'upArrow';
			Tbl.rows[i].cells[0].appendChild(upa);
			var mousedownupa=function (e){
				oThis.onItemClick("upa",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
			}
			YAHOO.util.Event.addListener(upa, "click", mousedownupa);
			
			dna = document.createElement("input");
			dna.type="button";			
			dna.id=Tbl.id +"_dna"+ i;
			dna.value="   ";
			dna.className = 'downArrow';
			Tbl.rows[i].cells[0].appendChild(dna);	
			var mousedowndna=function (e){
				oThis.onItemClick("dna",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
			}
			YAHOO.util.Event.addListener(dna, "click", mousedowndna);	
		}
		
		//AutoIncColumn, AutoIncColumnText
		if(Tbl.AutoIncColumn>-1)
			Tbl.rows[i].cells[Tbl.AutoIncColumn].innerHTML=Tbl.AutoIncColumnText + Tbl.rows.length + " :";	
			
				
		pla = document.createElement("input");
		pla.type="button";		
		pla.id=Tbl.id +"_pla"+ i;
		pla.value=" + ";
		pla.className = 'SecondryButton';		
		Tbl.rows[i].cells[Tbl.rows[i].cells.length-1].appendChild(pla);
		var mousedownpla=function (e){
			oThis.onItemClick("pla",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
		}
		YAHOO.util.Event.addListener(pla, "click", mousedownpla);
		
		mia = document.createElement("input");
		mia.type="button";		
		mia.id=Tbl.id +"_mia"+ i;
		mia.value=" - ";
		mia.className = 'SecondryButton';
		Tbl.rows[i].cells[Tbl.rows[i].cells.length-1].appendChild(mia);
		var mousedownmia=function (e){
			oThis.onItemClick("mia",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);			
		}
		YAHOO.util.Event.addListener(mia, "click", mousedownmia);
				
		//pusing 2 + - btn objects to PlusMinusBtns property
		Tbl.rows[i].PlusMinusBtns=new SPLearning.ETableRow.prototype.PlusNMinusBtn(pla,mia);
	}
	
	if(Tbl.rows.length==1) this.EnableDisableAddDel(Tbl,"REMOVE");
	if(Tbl.rows.length==Tbl.MaxRow) this.EnableDisableAddDel(Tbl,"ADDNEW");	
};

SPLearning.ETableRow.prototype.onItemClick= function (type,Item, RowID) {
	
	//getting the Item's Parent table
	tbl=Item.parentNode.parentNode.parentNode.parentNode;
	
	if(type=="upa")	
	{
		this.moveUpDown(tbl,"UP",RowID);
	}
    else if(type=="dna"){
		this.moveUpDown(tbl,"DOWN",RowID+1);
    }
    else if(type=="pla"){		
		this.addItem(tbl,RowID);
		this.onClickPlus(this,Item,RowID);
    }
    else if(type=="mia"){
		this.removeItem(tbl,RowID);		
		//this.onClickMinus(Item,RowID);
		this.onClickMinus(this,Item,RowID);
    }
};

SPLearning.ETableRow.prototype.addItem = function (_tbl,RowID) {
	oThis=this;
	
	Tbl = _tbl;	
	if(Tbl.rows.length==Tbl.MaxRow) return;
	
	var row= Tbl.insertRow(-1);
	for(var i=0; i<Tbl.rows[RowID].cells.length;i++)
	{
		var cell = row.insertCell(-1); //insert new cells
		cell.innerHTML=Tbl.rows[RowID].cells[i].innerHTML;
		cell.className=Tbl.rows[RowID].cells[i].className;
		//alert(Tbl.rows[RowID].cells[i].style.paddingLeft);
		cell.style.paddingLeft=Tbl.rows[RowID].cells[i].style.paddingLeft;
		cell.style.borderRight=Tbl.rows[RowID].cells[i].style.borderRight;
		cell.height=Tbl.rows[RowID].cells[i].height;
		cell.width=Tbl.rows[RowID].cells[i].width;
		//cell.style.width=Tbl.rows[RowID].cells[i].style.width;
		//cell.style.height=Tbl.rows[RowID].cells[i].style.height;
			
		if(i==Tbl.rows[0].cells.length-1)//last cell
		{
			pla=null;
			mia=null;
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_pla");	
				if (re.test(cell.childNodes[i1].id)) {
					pla=cell.childNodes[i1];
					pla.id=Tbl.id +"_pla"+ (Tbl.rows.length-1);
					var mousedownpla=function (e){
						oThis.onItemClick("pla",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(pla, "click", mousedownpla);
				}		
				
				re = new RegExp(Tbl.id +"_mia");	
				if (re.test(cell.childNodes[i1].id)) {
					mia=cell.childNodes[i1];
					mia.id=Tbl.id +"_mia"+ (Tbl.rows.length-1);
					var mousedownmia=function (e){
						oThis.onItemClick("mia",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(mia, "click", mousedownmia);
				}
			}	
			//pusing 2 + - btn objects
			row.PlusMinusBtns=new SPLearning.ETableRow.prototype.PlusNMinusBtn(pla,mia);
		}
				
		if(i==0 && Tbl.updown==true) //first cell
		{
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_upa");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];
					n.id=Tbl.id +"_upa"+ (Tbl.rows.length-1);
					var mousedownupa=function (e){
						oThis.onItemClick("upa",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(n, "click", mousedownupa);
				}		
				
				re = new RegExp(Tbl.id +"_dna");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];
					n.id=Tbl.id +"_dna"+ (Tbl.rows.length-1);
					var mousedowndna=function (e){
						oThis.onItemClick("dna",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(n, "click", mousedowndna);
				}
			}	
		}
	}

	if(Tbl.AutoIncColumn>-1){
		row.cells[Tbl.AutoIncColumn].innerHTML=Tbl.AutoIncColumnText + Tbl.rows.length + " :";	
	}
	
	this.EnableDisableAddDel(Tbl,"ADDNEW");
};

SPLearning.ETableRow.prototype.moveUpDown= function (tbl,DIRECTION,RowID) {
	oThis=this;
	
	Tbl=tbl;	
	if(DIRECTION=="DOWN") if(RowID==Tbl.rows.length) return;
	if(DIRECTION=="UP") if(RowID==0) return;
		
	oRow=Tbl.rows[RowID];
	
	//Add new row
	var row= Tbl.insertRow(RowID-1);
	
	for(var i=0; i<oRow.cells.length;i++)
	{
		var cell = row.insertCell(-1);
		cell.innerHTML=oRow.cells[i].innerHTML;
		cell.className=Tbl.rows[RowID].cells[i].className;
	
		if(i==Tbl.rows[0].cells.length-1) //last cell
		{
			var pla=null; var mia=null;
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_pla");	
				if (re.test(cell.childNodes[i1].id)) {
					pla=cell.childNodes[i1];					
					pla.id=Tbl.id +"_pla"+ (Tbl.rows.length-1);					
					var mousedownpla=function (e){
						oThis.onItemClick("pla",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(pla, "click", mousedownpla);
				}		
				
				re = new RegExp(Tbl.id +"_mia");	
				if (re.test(cell.childNodes[i1].id)) {
					mia=cell.childNodes[i1];
					
					mia.id=Tbl.id +"_mia"+ (Tbl.rows.length-1);
					
					var mousedownmia=function (e){
						oThis.onItemClick("mia",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(mia, "click", mousedownmia);
				}
			}	
			
			row.PlusMinusBtns=new SPLearning.ETableRow.prototype.PlusNMinusBtn(pla,mia);
		}		
		
		if(i==0 && Tbl.updown==true) //first cell
		{
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_upa");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];					
					n.id=Tbl.id +"_upa"+ (Tbl.rows.length-1);					
					var mousedownupa=function (e){
						oThis.onItemClick("upa",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(n, "click", mousedownupa);
				}				
				re = new RegExp(Tbl.id +"_dna");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];					
					n.id=Tbl.id +"_dna"+ (Tbl.rows.length-1);					
					var mousedowndna=function (e){
						oThis.onItemClick("dna",YAHOO.util.Event.getTarget(e),YAHOO.util.Event.getTarget(e).parentNode.parentNode.rowIndex);
					}
					YAHOO.util.Event.addListener(n, "click", mousedowndna);
				}
			}	
		}
		
		if(i>0 && i< (oRow.cells.length-1))
		{
			for (var z=0; z<oRow.cells[i].childNodes.length;z++)
			{	
				srcn=oRow.cells[i].childNodes[z];
				destn=cell.childNodes[z];
				this.copyNodeData(destn,srcn);
			}
		}
	}
	
	var row= Tbl.deleteRow(RowID+1);
};


SPLearning.ETableRow.prototype.copyNodeData= function (destNode, srcNode) {
	switch (srcNode.type) 
	{
		case 'radio':
			destNode.checked= srcNode.checked;            
            break;
        case 'checkbox':
			destNode.checked= srcNode.checked;            
            break;
        case 'select-one':
            destNode.selectedIndex = srcNode.selectedIndex;
            break;
        case 'select-multiple':
            destNode.selectedIndex = srcNode.selectedIndex;
            break;
        case 'text':
			destNode.value = srcNode.value;
            break;
        case 'textarea':
			destNode.value = srcNode.value;
            break;
		case 'password':
			destNode.value = srcNode.value;
            break;
		case 'hidden':
			destNode.value = srcNode.value;
            break;		
    }     
};

SPLearning.ETableRow.prototype.removeItem= function (_Tbl,RowID) {
	oThis=this;
	Tbl=_Tbl;
	if(Tbl.rows.length==1) return;
	
	var row= Tbl.deleteRow(RowID);
	oThis.EnableDisableAddDel(Tbl,"REMOVE");
	
	//Recreating the Labels
	if(Tbl.AutoIncColumn>-1)	
	{
		for(var i=0; i<Tbl.rows.length;i++)
			Tbl.rows[i].cells[Tbl.AutoIncColumn].innerHTML=Tbl.AutoIncColumnText + (i+1) + " :";
	}	
};


SPLearning.ETableRow.prototype.EnableDisableAddDel= function (_Tbl,type) {
	oThis=this;
	Tbl=_Tbl;
	
	if(type=="REMOVE"){
		for(var i=0; i<Tbl.rows.length;i++)
		{
			cell=Tbl.rows[i].cells[Tbl.rows[0].cells.length-1];
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_mia");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];	
					if(Tbl.rows.length==1) n.style.display="none";
					else n.style.display="";
				}	
				re = new RegExp(Tbl.id +"_pla");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];	
					n.style.display="";
				}		
			}	
			if(Tbl.updown==true)			
			{
				cell=Tbl.rows[i].cells[0];
				for(var i1=0; i1<cell.childNodes.length;i1++)
				{
					re = new RegExp(Tbl.id +"_upa");	
					if (re.test(cell.childNodes[i1].id)) {
						n=cell.childNodes[i1];	
						if(Tbl.rows.length==1) n.style.display="none";
						else n.style.display="";
					}	
					re = new RegExp(Tbl.id +"_dna");	
					if (re.test(cell.childNodes[i1].id)) {
						n=cell.childNodes[i1];	
						if(Tbl.rows.length==1) n.style.display="none";
						else n.style.display="";
					}		
				}
			}	
		}
	}
	else if(type=="ADDNEW"){
		for(var i=0; i<Tbl.rows.length;i++)
		{
			cell=Tbl.rows[i].cells[Tbl.rows[0].cells.length-1];
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(Tbl.id +"_pla");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];
					if(Tbl.rows.length==Tbl.MaxRow) n.style.display="none";
					else n.style.display="";
				}	
				re = new RegExp(Tbl.id +"_mia");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];
					n.style.display="";
				}			
			}	
			
			cell=Tbl.rows[i].cells[0];
			for(var i1=0; i1<cell.childNodes.length;i1++)
			{
				re = new RegExp(oThis.Tbl.id +"_upa");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];	
					if(Tbl.rows.length>1) n.style.display="";
					else n.style.display="none";
				}	
				re = new RegExp(Tbl.id +"_dna");	
				if (re.test(cell.childNodes[i1].id)) {
					n=cell.childNodes[i1];	
					if(Tbl.rows.length>1) n.style.display="";
					else n.style.display="none";
				}		
			}	
		}
	}
};
