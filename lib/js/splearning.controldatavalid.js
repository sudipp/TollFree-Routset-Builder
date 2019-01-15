
var TXT_CLASS='redbgtext';
/**
 * An SID fromat checker.
 * @class 
 * @scope public
 */ 
function ControlDataValid(oTextbox,fformat,oEntryMust,oErrorMsg )
{
	var EntryMustRegex = /^[01]$/;
	if(!oEntryMust.match( EntryMustRegex )) {
		alert('Error: Expected oEntryMust=\{1, 0\}');
		return false;
	}
	
	//validating the value entered
	return (validate(oTextbox,fformat,oEntryMust,oErrorMsg));
}



/**
 * Check the format of tollfree # entered
 * @scope private
 */
function validate (textbox,fformat,oEntryMust,oErrorMsg) {
	//save a reference to this object
    //var oThis = this;
	//oThis.textbox.style.backgroundColor='transparent';
	//oThis.textbox.className='';
	textbox.className='';
	
	//if((oThis.EntryMust=='1') && (oThis.textbox.value.length<1))
	if((oEntryMust=='1') && (textbox.value.length<1))
		return displayError(textbox,oErrorMsg);
		//return oThis.displayError();
	
	if(textbox.value.length>0)
	{
		var TollFreeNoRegex = fformat;
		if(!textbox.value.match(TollFreeNoRegex ))
			return displayError(textbox,oErrorMsg);
			//return oThis.displayError();
	}
	
	return true;
}

/**
 * Displays the error message
 * @scope private
 */
function displayError (textbox,oErrorMsg) {
	textbox.focus();
	//var oThis = this;
	//alert(oThis.ErrorMsg);
	//oThis.textbox.value="";
	//oThis.textbox.style.backgroundColor='red';	
	//oThis.textbox.className=oThis.TXT_CLASS;
	textbox.className=TXT_CLASS;
	return false;
}
