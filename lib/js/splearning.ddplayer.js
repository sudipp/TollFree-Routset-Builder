/////////////////////////////////////////////////////////////////////////

/**
 * @class a YAHOO.util.DDFramed implementation. During the drag over event, the
 * dragged element is inserted before the dragged-over element.
 *
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param {String} id the id of the linked element
 * @param {String} sGroup the group of related DragDrop objects
 * @param {String} any config
 * @param {TextComboList} oTextComboList the textcombolist data
 */
SPLearning.DDPlayer = function(id, sGroup, config, oTextComboList) {
    this.initPlayer(id, sGroup,config,oTextComboList);
};

YAHOO.extend(SPLearning.DDPlayer, YAHOO.util.DDProxy);

SPLearning.DDPlayer.TYPE = "DDPlayer";

SPLearning.DDPlayer.prototype.initPlayer = function(id, sGroup, config,oTextComboList) {
    if (!id) { return; }
    
    if(!oTextComboList) {alert("please enter text combo data using \nROGERS.TextComboList.insertDestinationData() or \nROGERS.TextComboList.insertDecisionData()");return;}
    
    //setting TextComboList data
    this.oTextComboList=oTextComboList;

    this.init(id, sGroup, config);
    this.initFrame();

    var s = this.getDragEl().style;
    s.borderColor = "transparent";
    s.opacity = 50;
    s.filter = "alpha(opacity=50)";
    
    // specify that this is not currently a drop target
    this.isTarget = false;

    this.originalStyles = [];

    this.type = SPLearning.DDPlayer.TYPE;
    this.slot = null;

    this.startPos = YAHOO.util.Dom.getXY( this.getEl() );
};

SPLearning.DDPlayer.prototype.startDrag = function(x, y) {
    var dragEl = this.getDragEl();
    var clickEl = this.getEl();
	
    dragEl.innerHTML = clickEl.innerHTML;
    dragEl.className = clickEl.className;
    dragEl.style.color = this.DDM.getStyle(clickEl, "color");;
    dragEl.style.backgroundColor = this.DDM.getStyle(clickEl, "backgroundColor");

    var s = clickEl.style;
    s.opacity = 100;
    s.filter = "alpha(opacity=100)";

    var targets = YAHOO.util.DDM.getRelated(this, true);
    for (var i=0; i<targets.length; i++) {
        
        var targetEl = this.getTargetDomRef(targets[i]);

        if (!this.originalStyles[targetEl.id]) {
            this.originalStyles[targetEl.id] = targetEl.className;
        }

        targetEl.className = "target";
    }
};

SPLearning.DDPlayer.prototype.getTargetDomRef = function(oDD) {
    if (oDD.player) {
        return oDD.player.getEl();
    } else {
        return oDD.getEl();
    }
};

SPLearning.DDPlayer.prototype.endDrag = function(e) {
    // reset the linked element styles
    var s = this.getEl().style;
    s.opacity = 1;
    s.filter = "alpha(opacity=100)";

    //this.resetTargets();
};

/*SPLearning.DDPlayer.prototype.resetTargets = function() {

    // reset the target styles
    var targets = YAHOO.util.DDM.getRelated(this, true);
    for (var i=0; i<targets.length; i++) {
        var targetEl = this.getTargetDomRef(targets[i]);
        var oldStyle = this.originalStyles[targetEl.id];
        if (oldStyle) {
            targetEl.className = oldStyle;
        }
    }
};
*/

SPLearning.DDPlayer.prototype.onDragDrop = function(e, id) {
    // get the drag and drop object that was targeted
    var oDD;
    
    if ("string" == typeof id) {
        oDD = YAHOO.util.DDM.getDDById(id);
    } else {
        oDD = YAHOO.util.DDM.getBestMatch(id);
    }

    var el = this.getEl();
	var div=new SPLearning.DropRouteSetObj(oDD,el,this.oTextComboList);
	
    //Initializing the context menu
    InitObjectContextMenu(div.id);

	//this.resetTargets();

    this.slot = oDD;
    this.slot.player = this;
    
    //Hiding the Target...    
	var s = oDD.getEl().style;
	s.display = 'none';
};


/*SPLearning.DDPlayer.prototype.swap = function(el1, el2) {
    var dom = YAHOO.util.Dom;
    var pos1 = dom.getXY(el1);
    var pos2 = dom.getXY(el2);
    dom.setXY(el1, pos2);
    dom.setXY(el2, pos1);
};*/

SPLearning.DDPlayer.prototype.onDragOver = function(e, id) {};

SPLearning.DDPlayer.prototype.onDrag = function(e, id) {};

