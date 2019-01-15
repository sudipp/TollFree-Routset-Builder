
//Scripts used on TollfreeMgmt->Assigntollfree#
//ROGERS.TollfreeNoAssignment=function(__btnSubmit)
ROGERS.screenLayout.TollfreeNoAssignment=function(__btnSubmit)
{	
	__btnSubmit=YAHOO.util.Dom.get(__btnSubmit);
	this.btnSubmit=__btnSubmit;
	this.btnSubmit.disabled=true;	
}

//internal array of Tollfreenumbers
ROGERS.screenLayout.TollfreeNoAssignment.prototype.arrtollfree = [];

ROGERS.screenLayout.TollfreeNoAssignment.prototype.insertTollfreeNo=function(TollfreeNo)
{
	this.arrtollfree.push(TollfreeNo);
}

ROGERS.screenLayout.TollfreeNoAssignment.prototype.checkTollfreeAvailability=function(txt,divTollfreenoAvailIndicator)
{	
	div=YAHOO.util.Dom.get(divTollfreenoAvailIndicator);
	
	textObj = YAHOO.util.Dom.get(txt);
	if(textObj.value.length<1) {div.style.display='none'; return;}

	strText = "^"+textObj.value;
	re = new RegExp(strText,"gi");
		
	div.style.display='inline';
	div.style.color='white';
	for(var i = 0; i < this.arrtollfree.length; i++)
	{
		if(this.arrtollfree[i].search(re) != -1){
			div.style.backgroundColor='green';
			div.innerHTML='AVAILABLE';
			return;
		}
	}
	div.style.backgroundColor='red';
	div.innerHTML='UNAVAILABLE';
}

ROGERS.screenLayout.TollfreeNoAssignment.prototype.regenerateNumber=function(generatedTollFreenolist)
{
	list=YAHOO.util.Dom.get(generatedTollFreenolist);
	list.options.length = 0;
	
	for(var i=0; i<this.arrtollfree.sort().length;i++)
		list.options[i] = new Option(this.arrtollfree[i]);
}

ROGERS.screenLayout.TollfreeNoAssignment.prototype.selectTollfreeno= function (lst,DivselectedTollfreeNo,HidselectedTollfreeNo)
{
	selectedTollfreeNo=YAHOO.util.Dom.get(DivselectedTollfreeNo);//'__selectedTollfreeNo');
	if(selectedTollfreeNo!=null)selectedTollfreeNo.innerHTML=lst.options[lst.selectedIndex].text;
	
	HidselectedTollfreeNo=YAHOO.util.Dom.get(HidselectedTollfreeNo);//'__HidselectedTollfreeNo');
	if(HidselectedTollfreeNo!=null)HidselectedTollfreeNo.value=lst.options[lst.selectedIndex].text;	
	
	this.btnSubmit.disabled=false;
}

ROGERS.screenLayout.TollfreeNoAssignment.prototype.vanitySearch= function (txtVanitySearch,ListVanitySrchResult)
{
	txtVanitySearch=YAHOO.util.Dom.get(txtVanitySearch);
	if(txtVanitySearch==null) return;
	
	list=YAHOO.util.Dom.get(ListVanitySrchResult);
	if(list==null) return;
	list.options.length = 0;
	
	uCase=txtVanitySearch.value.toUpperCase();
	for(var i=0; i<uCase.length;i++)
	{
		var charcode=uCase.charCodeAt(i);
		if ((charcode<65 && charcode>90))
		{
			list.options.length = 0;
			txtVanitySearch.className='redbgtext';
			return;
		}			
	}
	txtVanitySearch.className='';
	
	uCase=txtVanitySearch.value.toUpperCase();
	var fStr="";
	for(var i=0; i<uCase.length;i++){
		var charcode=uCase.charCodeAt(i);
		if(charcode==65 || charcode==66 || charcode==67)
			fStr=fStr+"2";
		else if(charcode==68 || charcode==69 || charcode==70)
			fStr=fStr+"3";
		else if(charcode==71 || charcode==72 || charcode==73)
			fStr=fStr+"4";
		else if(charcode==74 || charcode==75 || charcode==76)
			fStr=fStr+"5";
		else if(charcode==77 || charcode==78 || charcode==79)
			fStr=fStr+"6";
		else if(charcode==80 || charcode==81 || charcode==82|| charcode==83)
			fStr=fStr+"7";
		else if(charcode==84 || charcode==85 || charcode==86)
			fStr=fStr+"8";
		else if(charcode==87 || charcode==88 || charcode==89|| charcode==90)
			fStr=fStr+"9";
	}
	
	if(fStr=="") { list.options.length = 0; txtVanitySearch.className='redbgtext';return; } //txtVanitySearch.style.backgroundColor='red'; return; }
	
	strText ="^\\d{3}" + fStr;
	re = new RegExp(strText,"gi");	
	list.options.length = 0;	
	for(var i = 0; i < this.arrtollfree.length; i++)
	{
		if(this.arrtollfree[i].search(re) != -1){
			str=this.arrtollfree[i].substring(0,3);
			str1=this.arrtollfree[i].substring(3,this.arrtollfree[i].length-1);
			list.options[list.options.length] = new Option(str + str1.replace(fStr ,uCase,"gi")); //fStr
		}
	}
	
	if(list.options.length<1) txtVanitySearch.className='redbgtext';
	txtVanitySearch.value=txtVanitySearch.value.toUpperCase();
}
