
// "click" event handler for each item in the context menu            
function onContextMenuItemClick(p_sType, p_aArguments) {
    switch(this.index) {    
        case 0:// Delete
			
			//var s = this.parent.contextEventTarget.dropContainer.style;
			var s = this.parent.contextEventTarget.parentNode.dropContainer.style;
            //displaying the below object
            s.display = ''; 			
            
			oTarget=this.parent.contextEventTarget.parentNode;
			
			//Deleting the XML tree
			tNode=rsxml.findNodesByAttrib("objHTMLID",oTarget.id);
			rsxml.deleteXMLTree(tNode[0]);			
			//alert(rsxml.Root.childNodes.length + " : " + rsxml.generateXMLStream());
			
			//dont clear canvas on ENU_TMP_DECISION & ENU_TMP_DESTINATION objects
			if (oTarget.rsprop.type!=gr.ENU_TMP_DECISION &&
				oTarget.rsprop.type!=gr.ENU_TMP_DESTINATION)
			{
				gr.clear();            
				gr.drawTree(rsxml.Root);
			}
            
			//destroying Menu
            this.parent.hide();      
            this.parent.destroy();  
        break;
    }
}

// "keydown" event handler for the context menu
function onContextMenuKeyDown(p_sType, p_sArguments, p_oMenu) {
	var oDOMEvent = p_sArguments[0];
    if(oDOMEvent.shiftKey)
    {
		switch(oDOMEvent.keyCode) {
			case 68: // Delete
			
			var s = this.parent.contextEventTarget.parentNode.dropContainer.style;
            //displaying the below object
            s.display = ''; 			
            
			oTarget=this.parent.contextEventTarget.parentNode;
			
			//Deleting the XML tree
			tNode=rsxml.findNodesByAttrib("objHTMLID",oTarget.id);
			rsxml.deleteXMLTree(tNode[0]);
			
			//dont clear canvas on ENU_TMP_DECISION & ENU_TMP_DESTINATION objects
			if (oTarget.rsprop.type!=gr.ENU_TMP_DECISION &&
				oTarget.rsprop.type!=gr.ENU_TMP_DESTINATION)
			{
				gr.clear();            
				gr.drawTree(rsxml.Root);
			}
            
			//destroying Menu
            this.parent.hide();      
            this.parent.destroy();  
			break;
        }
    }
}


function InitObjectContextMenu(divPatt){
	var oContextMenu = new YAHOO.widget.ContextMenu(divPatt + "_contextmenu_", { trigger: divPatt } );
	var oMenuItem = new YAHOO.widget.ContextMenuItem("Delete", { helptext: "Shift + D" });
	// Add a "click" event handler to each ContextMenuItem instance
	oMenuItem.clickEvent.subscribe(onContextMenuItemClick);		
	// Add a "keydown" event handler to the context menu
    oMenuItem.keyDownEvent.subscribe(onContextMenuKeyDown,oMenuItem,true);

	oContextMenu.addItem(oMenuItem);
	oContextMenu.render(document.body);	
}
