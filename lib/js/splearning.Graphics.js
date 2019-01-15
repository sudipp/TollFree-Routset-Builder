// SPLearning.Graphics.js
// A Class library to draw connector between two objects(Decision/Destination)
//
// Uses wz_jsgraphics.js library , for graphics 
// Developed by Sudip Purkayastha
// Date : 06-09-2006

SPLearning.Graphics = function (odiv, wnd)
{
	try
	{
		if(odiv.tagName.toLowerCase()!="div") {
			alert("Accept DIV as Canvas");
			return;
		}
		else
		{
			//getting height, width, top and left of the canvas
			this.CanvasId=odiv.id;
			this.CanvasWidth=odiv.offsetWidth;// + odiv.scrollWidth;
			this.CanvasHeight=odiv.offsetHeight;// + odiv.scrollHeight;
			this.CanvasLeft=odiv.offsetLeft;
			this.CanvasTop=odiv.offsetTop;
			this.canvasObj=odiv;
			
			this.dRoutesetCanvas=odiv.parentNode;
		}		
		this.canvas=new jsGraphics(odiv.id,wnd);
		
		//alert(odiv.offsetWidth);
		//drawing grid	
		this.drawGrid();
		
		//alert('here');
		///////////////////////////////////////////	
		var xmlnode=rsxml.insertChildNode(this.ENU_IC,0,"",0,"","","");
		dvIC=this.MakeIncomingCallObj(xmlnode);
		dvIC.style.left='100px' ;
		dvIC.style.top='0px';
		
		var xmlnode=rsxml.insertChildNode(this.ENU_Q,0,"",0,dvIC.id,"","");
		dvQ=this.MakeQuestionMark(xmlnode);
		dvQ.style.left='100px';
		dvQ.style.top='80px';
		slots[slots.length-1] = new YAHOO.util.DDTarget(dvQ.id);
		
		this.connectObjects(dvIC.id,dvQ.id,1);
	}
	catch(e){ alert("Graphics " + e.description); }
}

//Global properties
SPLearning.Graphics.prototype.gridsize=20;
SPLearning.Graphics.prototype.gridColor='#F0EDED';
SPLearning.Graphics.prototype.connectorColor='#000000';

SPLearning.Graphics.prototype.WObject=80;
SPLearning.Graphics.prototype.HObject=40;
SPLearning.Graphics.prototype.foreColorObject='#000000';
SPLearning.Graphics.prototype.backColorObject='transparent';

SPLearning.Graphics.prototype.DecisionObjColor='#6699ff';
SPLearning.Graphics.prototype.DestinationObjColor='#ff5050';
SPLearning.Graphics.prototype.IncomingCallObjColor='#66ff66';
SPLearning.Graphics.prototype.CLASS_GRAPHICS_OBJECT="SPLearning-graphics-objects";

//ENUM of different object with their states
SPLearning.Graphics.prototype.ENU_TMP_DECISION="tDecision";
SPLearning.Graphics.prototype.ENU_TMP_DESTINATION="tDestination";
SPLearning.Graphics.prototype.ENU_DEST="Dest";
SPLearning.Graphics.prototype.ENU_DECISION_CA="DecisionCA";
SPLearning.Graphics.prototype.ENU_DECISION_DOW="DecisionDOW";
SPLearning.Graphics.prototype.ENU_DECISION_DOY="DecisionDOY";
SPLearning.Graphics.prototype.ENU_DECISION_HOL="DecisionHOL";
SPLearning.Graphics.prototype.ENU_DECISION_ID="DecisionID";
SPLearning.Graphics.prototype.ENU_DECISION_TOD="DecisionTOD";
SPLearning.Graphics.prototype.ENU_DECISION_NPANXX="DecisionNPANXX";
SPLearning.Graphics.prototype.ENU_Q="tQ";
SPLearning.Graphics.prototype.ENU_IC="tIC";
///////////////////////////////////////////////////////////////////////

SPLearning.Graphics.prototype.connectObjects=function (sourceObj, destObj, connectorWidth)
{
	if (typeof(connectorWidth) !="number"){
		alert("connectObjects expects 'connectorWidth' as integer");
		return;
	}
	
	var _CanvasGrid=YAHOO.util.Dom.get('_RoutesetCanvasGrid_');
	var _sourceObj=YAHOO.util.Dom.get(sourceObj);
	var _destObj=YAHOO.util.Dom.get(destObj);
	
	if(_sourceObj==null || _destObj==null || _CanvasGrid==null) return;
	//if(oThis.CanvasId.length<1) {alert('Accept DIV as Canvas'); return; }
	//var _canvasObj=YAHOO.util.Dom.get(oThis.CanvasId);
	this.canvas.setStroke(connectorWidth); //Stroke.DOTTED
	this.canvas.setColor(this.connectorColor);
	
	var left1,top1,width1,height1,left2,top2,width2,height2;

	left1=_sourceObj.offsetLeft;
	top1=_sourceObj.offsetTop;
	width1=_sourceObj.offsetWidth;
	height1=_sourceObj.offsetHeight;
	if (left1==0 && top1==0 && width1==0 && height1==0){
		alert("Unable to evaluate Source object:" + sourceObj);
		return;
	}

	left2=_destObj.offsetLeft;
	top2=_destObj.offsetTop;
	width2=_destObj.offsetWidth;
	height2=_destObj.offsetHeight;	
	if (left2==0 && top2==0 && width2==0 && height2==0){
		alert("Unable to evaluate Destination object:"  + destObj);
		return;
	}
	
	this.canvas=this.canvas;
	this.sourceObj=_sourceObj;
	this.CanvasGrid=_CanvasGrid;
	this.destObj=_destObj;
	this.mDirection=0;
	
	if (left2>left1 && top2==top1) //Right	
		this.mDirection=1;
	else if (left2<left1 && top2==top1) //LEFT
		this.mDirection=2;
	else if (left2==left1 && top2<top1) //top	
		this.mDirection=3;
	else if(left2==left1 && top2>top1) //DOWN
		this.mDirection=4;
	else if((left2+width2>left1+width1) && (top2+height2<top1+height1)) //rightTOP //ok
		this.mDirection=5;
	else if ((left2+width2<left1+width1) && (top2+height2<top1+height1)) //LEFT-TOP
		this.mDirection=6;
	else if((left2+width2<left1+width1) && (top2+height2>top1+height1)) //DOWN-LEFT
		this.mDirection=7;
	else if((left2+width2>left1+width1) && (top2+height2>top1+height1)) //down right
		this.mDirection=8;
	
	//alert(this.mDirection);
	
	this.drawit();
}

SPLearning.Graphics.prototype.drawit=function ()
{
	var x1,y1;
	XArr=new Array();
	YArr=new Array();
	switch (this.mDirection) {
	
		case 1: //right			
			//pushing the right side coordinate of the source, that is our starting point
			XArr.push(this.sourceObj.offsetLeft + this.sourceObj.offsetWidth + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);
			
			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			
			//jg.fillPolygon(new Array(x1, x1, x1+5), new Array(y1,y1-10,y1-5)); >
			x1=XArr[XArr.length-1]-5;
			y1=YArr[YArr.length-1]+5;
			this.canvas.fillPolygon(new Array(x1, x1, x1+5), new Array(y1,y1-10,y1-5)); 
			this.canvas.paint();
			break;
	
		case 2: //left
			XArr.push(this.sourceObj.offsetLeft + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);
			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			
			//jg.fillPolygon(new Array(x1, x1+5, x1+5), new Array(y1,y1-5,y1+5)); <
			x1=XArr[XArr.length-1];
			y1=YArr[YArr.length-1];
			this.canvas.fillPolygon(new Array(x1, x1+5, x1+5), new Array(y1,y1-5,y1+5));			
			this.canvas.paint();
			break;
			
		case 3: //top
			XArr.push((this.sourceObj.offsetLeft +this.sourceObj.offsetWidth/2) + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.CanvasTop);
			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			//jg.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); ^
			x1=XArr[XArr.length-1]-5;
			y1=YArr[YArr.length-1]+5;
			this.canvas.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); 		
			this.canvas.paint();
			break;
			
		case 4: //down
			XArr.push((this.sourceObj.offsetLeft +this.sourceObj.offsetWidth/2) + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.CanvasTop+ this.sourceObj.offsetHeight);			
			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			x1=XArr[XArr.length-1];
			y1=YArr[YArr.length-1];
			//jg.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); V
			this.canvas.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); 	
			this.canvas.paint();
			break;
		case 5: //righttop
			XArr.push(this.sourceObj.offsetLeft + this.sourceObj.offsetWidth + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);
			XArr.push(this.sourceObj.offsetLeft + this.sourceObj.offsetWidth + this.CanvasLeft+this.gridsize);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);

			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			//jg.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); ^
			x1=XArr[XArr.length-1]-5;
			y1=YArr[YArr.length-1]+5;	
			this.canvas.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); 				
			this.canvas.paint();
			break;
		case 6: //lefttop
			XArr.push(this.sourceObj.offsetLeft + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);			
			XArr.push(this.sourceObj.offsetLeft + this.CanvasLeft-this.gridsize);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);

			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			
			//jg.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); ^
			x1=XArr[XArr.length-1]-5;
			y1=YArr[YArr.length-1]+5;	
			this.canvas.fillPolygon(new Array(x1, x1+5, x1+10), new Array(y1,y1-5,y1)); 
			this.canvas.paint();
			break;
		case 7: //leftdown //error
			XArr.push(this.sourceObj.offsetLeft + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);			
			XArr.push(this.sourceObj.offsetLeft + this.CanvasLeft-this.gridsize);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);

			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			
			//jg.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); ^
			x1=XArr[XArr.length-1];
			y1=YArr[YArr.length-1];
			this.canvas.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); 	
			this.canvas.paint();
			break;	
		case 8://down-right //ok
			XArr.push(this.sourceObj.offsetLeft + this.sourceObj.offsetWidth + this.CanvasLeft);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);
			XArr.push(this.sourceObj.offsetLeft + this.sourceObj.offsetWidth + this.CanvasLeft+this.gridsize);
			YArr.push(this.sourceObj.offsetTop + this.sourceObj.offsetHeight/2+this.CanvasTop);

			this.getPathCordinates(XArr,YArr);
			this.canvas.drawPolyline(XArr, YArr);
			//jg.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); ^
			x1=XArr[XArr.length-1];
			y1=YArr[YArr.length-1];
			this.canvas.fillPolygon(new Array(x1, x1-5, x1+5), new Array(y1,y1-5,y1-5)); 
			this.canvas.paint();
			break;
		default :
	}
}

SPLearning.Graphics.prototype.getPathCordinates=function (XArr,YArr)
{
	//for righttop/lefttop make top move
	if (this.mDirection==5 || this.mDirection==6) this.mDirection=3;
	//for downleft/downright make down move
	if (this.mDirection==7 || this.mDirection==8) this.mDirection=4;
	
	this.NewMoveDirection=this.mDirection;
		
	switch (this.mDirection) {
		case 1: case 2: case 3: case 4:
			//checking if the destination been reached
			while (!this.isNewPtTouchedNode(this.destObj,XArr,YArr))
			{   
				this.Move(XArr,YArr);
				
				//if((XArr[XArr.length-1]<=objCanvas.CanvasLeft || XArr[XArr.length-1]>=objCanvas.CanvasWidth)
				//	&& (YArr[YArr.length-1]<=objCanvas.CanvasTop || YArr[YArr.length-1]>=objCanvas.CanvasHeight
				//)) break;
				
				//if(YArr[YArr.length-1]<=10 || XArr[XArr.length-1]<=10 || YArr[YArr.length-1]>=400 || XArr[XArr.length-1]>=objCanvas.CanvasWidth) break;
	
			}
			break;
	}
}


SPLearning.Graphics.prototype.Move=function (XArr,YArr)
{
	if (this.NewMoveDirection==1) {//right
		if(this.mDirection==1)
			this.MoveOneGridRight(XArr,YArr);
		else if(this.mDirection==3 || this.mDirection==4)
		{
			var x=XArr[XArr.length-1];
			while(x<(this.destObj.offsetLeft + this.CanvasLeft+ this.destObj.offsetWidth/2))
			{
				this.MoveOneGridRight(XArr,YArr);
				x=XArr[XArr.length-1];
			}
			//back it to original direction
			this.NewMoveDirection=this.mDirection;
		}		
	}
	else if(this.NewMoveDirection==2){ //left
		if(this.mDirection==3 || this.mDirection==4) {//top/down
			var x=XArr[XArr.length-1];
			//for lefttop, we need to keep moving left till, we dont reach Node's Middle of X.
			//else Move left by 1 gridsize only.
			var insidewhile=false;
			while(x>(this.destObj.offsetLeft + this.CanvasLeft+ this.destObj.offsetWidth/2))
			{
				insidewhile=true;
				this.MoveOneGridLeft(XArr,YArr);
				x=XArr[XArr.length-1];
			}	
			if(insidewhile==false) this.MoveOneGridLeft(XArr,YArr);
			//back it to original direction
			this.NewMoveDirection=this.mDirection;
		}
		else if(this.mDirection==2)
			this.MoveOneGridLeft(XArr,YArr);
	}
	else if(this.NewMoveDirection==3){ //top
		if(this.mDirection==1 || this.mDirection==2){ //left/right
			var y=YArr[YArr.length-1];
			while(y>(this.destObj.offsetTop + this.CanvasTop+ this.destObj.offsetHeight/2))
			{
				this.MoveOneGridTop(XArr,YArr);
				y=YArr[YArr.length-1];
			}
			//back it to original direction
			this.NewMoveDirection=this.mDirection;
		}
		else if(this.mDirection==3)
			this.MoveOneGridTop(XArr,YArr);
	}	
	else if(this.NewMoveDirection==4){ //down
		if(this.mDirection==4)
			this.MoveOneGridDown(XArr,YArr);
		else if(this.mDirection==1 || this.mDirection==2)
		{
			this.MoveOneGridDown(XArr,YArr);
			//back it to original direction
			this.NewMoveDirection=this.mDirection;
		}		
	}
	
	//ifany object is touched, other than source/destination
	if(this.isAnyObjectTouched(XArr,YArr))
	{
		//if new point touched then remove it, and give new diretion like
		//(for left/right, go Down) (for top/down go left)
		
		//Removing the last position.
		XArr.pop();
		YArr.pop();
		if(this.mDirection==1 || this.mDirection==2) //left/right
		{
			if(this.mDirection==this.NewMoveDirection) 
				this.NewMoveDirection=4; //Move it to down direction
			else if(this.NewMoveDirection==4) //from down direction, move it back to original direction
				this.NewMoveDirection=this.mDirection;
		}
		
		if(this.mDirection==3 || this.mDirection==4) //top/down
		{
			if(this.mDirection==this.NewMoveDirection){
				this.NewMoveDirection=2; //Move it to left direction
			}
			else if(this.NewMoveDirection==2){ //from left direction, move it back to original direction
				this.NewMoveDirection=this.mDirection;
			}
		}
	}	
	
	//after changing direction once any object is touched other than source/destination, we need to
	//take the other direction, for reacing destination.
	if(this.mDirection==1 || this.mDirection==2) //left/right
	{	//after pushing down, somewhere, we need to change the direction to Top
		//this is for LEFT/RIGHT
		if(this.shouldMoveUp(this.destObj,XArr,YArr))
			this.NewMoveDirection=3; //top
	}
	else if(this.mDirection==3 || this.mDirection==4)//top/down
	{	//after pushing left, somewhere, we need to change the direction to right
		//this is for TOP/DOWN
		if(this.shouldMoveRight(this.destObj,XArr,YArr))
			this.NewMoveDirection=1; //Right
		
		//after pushing down/top, we need to change the dirction to left
		//this is for lefttop/downledt
		if(this.shouldMoveLeft(this.destObj,XArr,YArr))
			this.NewMoveDirection=2; //left
	}
}

SPLearning.Graphics.prototype.isAnyObjectTouched=function (XArr,YArr)
{
	var node=this.canvasObj.firstChild;
	while (node!=null)
	{
		//alert(node.id);
		if(node!=this.destObj && node!=this.sourceObj && node!=this.CanvasGrid && node.id.length>0)
		{
			if (isNewPtTouchedNode(node,XArr,YArr)==true)				
				return true;
		}
		node=node.nextSibling;
	}
	return false;
}

SPLearning.Graphics.prototype.isNewPtTouchedNode= function (node,XArr,YArr)
{
	if(	XArr[XArr.length-1] >=this.CanvasLeft + node.offsetLeft
		&& XArr[XArr.length-1] <=node.offsetLeft+node.offsetWidth + this.CanvasLeft
		&& YArr[YArr.length-1]>=this.CanvasTop + node.offsetTop
		&& YArr[YArr.length-1]<=this.CanvasTop+node.offsetTop+node.offsetHeight
	)
		return true;
	else
		return false;
}

SPLearning.Graphics.prototype.shouldMoveUp =function (node,XArr,YArr)
{
	// we should move up again after moving down, when
	// x==left of Node-gridsize.
	// OR
	// x==left of Node + width of node+gridsize)
	// AND 
	// y>=position of node
	x1=XArr[XArr.length-1];
	y1=YArr[YArr.length-1];
	
	if((x1==node.offsetLeft + this.CanvasLeft-this.gridsize ||
		x1==node.offsetLeft + node.offsetWidth + this.CanvasLeft+this.gridsize)
		&& y1>=this.CanvasTop+node.offsetTop+node.offsetHeight
	)
		return true;
	else
		return false;
}

SPLearning.Graphics.prototype.shouldMoveRight=function (node,XArr,YArr)
{
	// we should move right again after moving left, when
	// y==top of node-gridsize
	// OR
	// y==top of node + height of node + gridsize
	// AND 
	// x<=left of node
	x1=XArr[XArr.length-1];
	y1=YArr[YArr.length-1];

	if((y1==node.offsetTop + this.CanvasTop-this.gridsize || 
		y1==node.offsetTop + node.offsetHeight + this.CanvasTop+this.gridsize)
		&& x1<=this.CanvasLeft+node.offsetLeft 
	)
		return true;
	else
		return false;
}

SPLearning.Graphics.prototype.shouldMoveLeft= function (node,XArr,YArr)
{
	// we should move down/top again after moving left, when
	// y==top of Node-gridsize.
	// OR
	// x==top of Node + height of node+gridsize)
	// AND 
	// x>=left of node
	x1=XArr[XArr.length-1];
	y1=YArr[YArr.length-1];

	if((y1==node.offsetTop + this.CanvasTop-this.gridsize || 
		y1==node.offsetTop + node.offsetHeight + this.CanvasTop+this.gridsize)
		&& x1>=this.CanvasLeft+node.offsetWidth+node.offsetLeft 
	)
		return true;
	else
		return false;
}

SPLearning.Graphics.prototype.MoveOneGridRight= function (XArr,YArr)
{
	//move 1 gridsize right 
	XArr.push(XArr[XArr.length-1]+this.gridsize);
	YArr.push(YArr[YArr.length-1]);
}
SPLearning.Graphics.prototype.MoveOneGridTop=function (XArr,YArr)
{
	//move 1 gridsize top 
	XArr.push(XArr[XArr.length-1]);
	YArr.push(YArr[YArr.length-1]-this.gridsize);
}
SPLearning.Graphics.prototype.MoveOneGridDown= function (XArr,YArr)
{
	//move 1 gridsize down 
	XArr.push(XArr[XArr.length-1]);
	YArr.push(YArr[YArr.length-1]+this.gridsize);
}
SPLearning.Graphics.prototype.MoveOneGridLeft =function (XArr,YArr)
{
	//move 1 gridsize left 
	XArr.push(XArr[XArr.length-1]-this.gridsize);
	YArr.push(YArr[YArr.length-1]);
}

SPLearning.Graphics.prototype.MakeDecisionObj= function(oXMLNode, obj)
{
	try
	{
		if(typeof(obj)=='object')
			_DecisionObj=obj;
		else
			_DecisionObj=this.makeRSObj(oXMLNode);
		
		if(_DecisionObj==null) return;
		this.setRSObjStyle(_DecisionObj);
		
		var jg = new jsGraphics(_DecisionObj.id);	
			
		///////////////////////////////////////////////////////	
		jg.setColor(this.DecisionObjColor);
		//jg.fillPolygon(new Array(0, (_DecisionObj.offsetWidth/2), (_DecisionObj.offsetWidth), (_DecisionObj.offsetWidth/2)), new Array((_DecisionObj.offsetHeight/2),_DecisionObj.offsetHeight,_DecisionObj.offsetHeight/2,0)); 
		jg.fillPolygon(new Array(0, (this.WObject/2), (this.WObject), (this.WObject/2)), new Array((this.HObject/2),this.HObject,this.HObject/2,0)); 
		//for X cordinates, starting from left Clockwise
		//for Y cordinates, starting from left AntiClockwise
		jg.setColor('#000000');
		//jg.drawPolygon(new Array(0, (_DecisionObj.offsetWidth/2), (_DecisionObj.offsetWidth-1), (_DecisionObj.offsetWidth/2)), new Array((_DecisionObj.offsetHeight/2),_DecisionObj.offsetHeight,_DecisionObj.offsetHeight/2,0)); 
		jg.drawPolygon(new Array(0, (this.WObject/2), (this.WObject-1), (this.WObject/2)), new Array((this.HObject/2),this.HObject,this.HObject/2,0)); 
		
		if(_DecisionObj.rsprop!=null)
			if(_DecisionObj.rsprop.label.length>0){
				jg.setColor("#fff");
				jg.setFont("arial","11px");
				jg.drawStringRect(_DecisionObj.rsprop.label,0,_DecisionObj.offsetHeight/3,_DecisionObj.offsetWidth-1,"center");
			}	
		jg.paint();
		///////////////////////////////////////////////////////
		
		return _DecisionObj;
	}
	catch(e){alert("MakeDecisionObj "+ e.description);}
}

SPLearning.Graphics.prototype.MakeDestinationObj= function (oXMLNode,obj)
{
	try
	{
		if(typeof(obj)=='object')
			_DestinationObj=obj;
		else						
			_DestinationObj=this.makeRSObj(oXMLNode);
			
		if(_DestinationObj==null) return;
		this.setRSObjStyle(_DestinationObj);
		
		///////////////////////////////////////////////////////
		var jg = new jsGraphics(_DestinationObj.id);
		
		jg.setColor(this.DestinationObjColor);	
		//jg.fillRect(0,0,_DestinationObj.offsetWidth,_DestinationObj.offsetHeight);
		jg.fillRect(0,0,this.WObject,this.HObject);
		
		jg.setColor('#000000');
		//jg.drawRect(0,0,_DestinationObj.offsetWidth-1,_DestinationObj.offsetHeight-1);
		jg.drawRect(0,0,this.WObject-1,this.HObject-1);
		
		if(_DestinationObj.rsprop!=null)
			if(_DestinationObj.rsprop.label.length>0){
				jg.setColor("#fff");
				jg.setFont("arial","11px");
				//jg.drawStringRect(_DestinationObj.rsprop.label,0,_DestinationObj.offsetHeight/3,_DestinationObj.offsetWidth-1,"center");
				jg.drawStringRect(_DestinationObj.rsprop.label,0,this.HObject/3,this.WObject-1,"center");
			}
		
		jg.paint();
		///////////////////////////////////////////////////////
		return _DestinationObj;
	}
	catch(e)
	{alert("MakeDestinationObj : " + e.description);}
}

SPLearning.Graphics.prototype.MakeIncomingCallObj= function (oXMLNode)
{
	try
	{
		_incCallObj=this.makeRSObj(oXMLNode);
		if(_incCallObj==null) return;
		this.setRSObjStyle(_incCallObj);
	
		///////////////////////////////////////////////////////	
		var jg = new jsGraphics(_incCallObj.id);
		jg.setColor(this.IncomingCallObjColor)
		//jg.fillPolygon(new Array(_incCallObj.offsetWidth-(this.gridsize/2), 0, this.gridsize/2, _incCallObj.offsetWidth), new Array(_incCallObj.offsetHeight,_incCallObj.offsetHeight, 0, 0)); 
		jg.fillPolygon(new Array(this.WObject-(this.gridsize/2), 0, this.gridsize/2, this.WObject), new Array(this.HObject,this.HObject, 0, 0)); 
		//Here for X, Y cordinates, starting from below right antiClockwise
		//Border drawing
		jg.setColor('#000000');
		//jg.drawPolygon(new Array(_incCallObj.offsetWidth-(this.gridsize/2), 0, (this.gridsize/2), _incCallObj.offsetWidth), new Array(_incCallObj.offsetHeight,_incCallObj.offsetHeight,0 , 0)); 
		jg.drawPolygon(new Array(this.WObject-(this.gridsize/2), 0, (this.gridsize/2), this.WObject), new Array(this.HObject,this.HObject,0 , 0)); 
		//Text drawing with Black color
		jg.setColor("#000000");
		//jg.setFont("arial","10px");
		//jg.drawStringRect("Incoming<BR>Call",this.gridsize/4-4,_incCallObj.offsetHeight/4-4,_incCallObj.offsetWidth,"center");
		jg.drawStringRect("Incoming<BR>Call",this.gridsize/4-4,this.HObject/4-4,this.WObject,"center");
				
		jg.paint();
		///////////////////////////////////////////////////////
		
		return _incCallObj;
	}
	catch(e)
	{	alert("MakeIncomingCallObj " + e.description);
	}
}

SPLearning.Graphics.prototype.MakeQuestionMark= function (oXMLNode)//qMarkObj)
{
	try
	{
		_qMarkObj=this.makeRSObj(oXMLNode);
		if(_qMarkObj==null) return;
		this.setRSObjStyle(_qMarkObj);
		
		///////////////////////////////////////////////////////
		var jgt = new jsGraphics(_qMarkObj.id);
		jgt.setStroke(2);
		jgt.setColor("#FCFC0C");
		jgt.fillEllipse(this.gridsize, 0, this.gridsize*2, this.gridsize*2);	
		jgt.setColor("#CC9900");
		jgt.drawEllipse(this.gridsize, 0, (this.gridsize*2), (this.gridsize*2)); 	
		jgt.setColor("#000000");
		jgt.setFont("arial","36px",Font.BOLD); 
		jgt.drawString("?",this.gridsize + this.gridsize/2,0); 
		
		jgt.paint();
		///////////////////////////////////////////////////////
		return _qMarkObj;
	}
	catch(e)
	{
		alert("MakeQuestionMark " + e.description);
	}
}

SPLearning.Graphics.prototype.setRSObjStyle= function (obj)
{
	//alert(this.backColorObject);
	obj.innerHTML='';
	obj.className = this.CLASS_GRAPHICS_OBJECT;   
	obj.style.border = '0px';
	obj.style.color = this.foreColorObject;
	obj.style.backgroundColor = this.backColorObject;
	obj.style.position='absolute';
	//obj.innerHTML="www";
	obj.style.width=this.WObject;
	obj.style.height=this.HObject;	
}

SPLearning.Graphics.prototype.drawTree = function (xmlNode)
{	
	for (i=0; i<xmlNode.childNodes.length;i++)
	{
		oNode=xmlNode.childNodes[i];
		objHTMLID="";parentHTMLID="";
		if(oNode.getElementsByTagName("objHTMLID").length>0 && oNode.getElementsByTagName("parentHTMLID").length>0 ){
			if(oNode.getElementsByTagName("objHTMLID")[0].childNodes.length>0)
				objHTMLID=oNode.getElementsByTagName("objHTMLID")[0].childNodes[0].nodeValue;
			
			if(oNode.getElementsByTagName("parentHTMLID")[0].childNodes.length>0)
				parentHTMLID=oNode.getElementsByTagName("parentHTMLID")[0].childNodes[0].nodeValue;
			
			if (objHTMLID.length>0 && parentHTMLID.length>0 && objHTMLID!=parentHTMLID)			
			{
				dvSrc=YAHOO.util.Dom.get(objHTMLID);
				dvDest=YAHOO.util.Dom.get(parentHTMLID);
				
				//if both source and destination are not Hidden
				if(dvSrc.style.display.toLowerCase()!='none' && dvDest.style.display.toLowerCase()!='none')
					this.connectObjects(parentHTMLID,objHTMLID,1);
			}
		}
	}
}

SPLearning.Graphics.prototype.makeRSObj= function (oXMLNode)
{
	//getting all XML attributes
	var type=rsxml.getAttribVal(oXMLNode,"type");
	var objId=rsxml.getAttribVal(oXMLNode,"objId");
	var parentID=rsxml.getAttribVal(oXMLNode,"parentID");
	var parentHTMLID=rsxml.getAttribVal(oXMLNode,"parentHTMLID");
	var objHTMLID=rsxml.getAttribVal(oXMLNode,"objHTMLID");
	var label=rsxml.getAttribVal(oXMLNode,"label");
	var relationLabel=rsxml.getAttribVal(oXMLNode,"relationLabel");
	
	//creating new element
	obj=document.createElement('DIV');
	obj.id = type + "_" + this.getObjDivCount(this.dRoutesetCanvas,type);
	//setting element properties
	this.setObjProperty(obj,type,objId,parentID,label,relationLabel,parentHTMLID,obj.id);
	
	//updating objHTMLID reference on XML
	rsxml.setAttribVal(oXMLNode,"objHTMLID",obj.id);	
	//Appending the element to _RoutesetCanvas_
	this.dRoutesetCanvas.appendChild(obj);
	
	return obj;
}

SPLearning.Graphics.prototype.getObjDivCount=function (oContainer,divPatt){
	re = new RegExp(divPatt);
	var x=1;
	var node=oContainer.firstChild;
	while (node!=null)
	{
		if(re.test(node.id)) x++;
		node=node.nextSibling;
	}
	return x;
}


/*  Routeset object propery for the object
*					Decision					Destination
*	@type			2 to 8 from DB else -2		1 from DB else -1				2 to 8 is different decisions, 1 for destination
*	@objId			from database >0 , else 0	from database >0 , else 0		from database >0 , else 0
*	@parentID		from database >0 , else 0	from database >0 , else 0		ID of the Parent
*	@label			from DB						from DB							Label appeared on Node
*	@relationLabel	from DB						from DB							Label appeared on Relation line
*/
SPLearning.Graphics.prototype.ObjProperty=function(oType,objId,oParentID,oLabel,oRelationLabel,parentClientID,objClientID)
{
	this.type=oType;
	
	this.objId=objId;
	this.objHTMLID=objClientID;
	
	this.parentID=oParentID;
	this.parentHTMLID=parentClientID;
	
	this.label=oLabel;
	this.relationLabel=oRelationLabel;
}
/** 
* Sets Routeset object propery for object
*	@type			{string}	Type of the object
*	@objId			{int}		Object ID from DB
*	@parentID		{int}		Parent ID on relation
*	@label			{string}	Label appeared on object
*	@relationLabel	{string}	Label appeared on Relation line
*/
SPLearning.Graphics.prototype.setObjProperty=function(o,oType,oId,oParentID,oLabel,oRelationLabel,parentHTMLID,objClientID)
{
	if(typeof (o)=='string') o=YAHOO.util.Dom.get(o);
	
	objProp=new this.ObjProperty(oType,oId,oParentID,oLabel,oRelationLabel,parentHTMLID,objClientID);
	o.rsprop=objProp;
}

SPLearning.Graphics.prototype.MakeDownArrow =function (qMarkObj)
{
	var _qMarkObj=YAHOO.util.Dom.get(qMarkObj);
	if(_qMarkObj==null) return;
	
	_qMarkObj.style.border = '0px';
	_qMarkObj.style.height = '7px';
	_qMarkObj.style.width = '7px';
	_qMarkObj.style.backgroundColor = 'transparent';
	_qMarkObj.innerHTML='';

	var jg = new jsGraphics(qMarkObj);
	
	var x1=3,y1=5;
	jg.fillPolygon(new Array(x1, x1-3, x1+3), new Array(y1,y1-5,y1-5)); //V
	jg.paint();
}

SPLearning.Graphics.prototype.clear=function(){
	this.canvas.clear();

	//drawing grid again	
	this.drawGrid();
}

SPLearning.Graphics.prototype.createRSObjPalette=function(ObjPaletteContainer){

	var _objTempDecision=document.createElement('div');
	_objTempDecision.id="_objTempDecision";
	ObjPaletteContainer.appendChild(_objTempDecision);
	this.MakeDecisionObj(null, _objTempDecision);
	//****************************************
	_objTempDecision.style.position='relative';
	_objTempDecision.style.cursor='move';
	
	//****************************************
	dbr=document.createElement('div');//createTextNode('');
	dbr.style.height="5px";
	ObjPaletteContainer.appendChild(dbr);
	//****************************************
	
	var _objTempDestination=document.createElement('div');
	_objTempDestination.id="_objTempDestination";
	ObjPaletteContainer.appendChild(_objTempDestination);
	this.MakeDestinationObj(null, _objTempDestination);
	//****************************************
	_objTempDestination.style.position='relative';
	_objTempDestination.style.cursor='move';
	//****************************************
	
	this.setObjProperty('_objTempDecision',gr.ENU_TMP_DECISION,0,0,"","","","");	
	this.setObjProperty('_objTempDestination',gr.ENU_TMP_DESTINATION,0,0,"","","","");	
	
	//
	players[players.length-1] = new SPLearning.DDPlayer("_objTempDecision","","",tcd);
	players[players.length-1] = new SPLearning.DDPlayer("_objTempDestination","","",tcd);
}


//Draw grids on canvas
SPLearning.Graphics.prototype.drawGrid= function ()
{
	var hLines, vLines;
	//vLines=parseInt(this.canvasObj.offsetWidth  / this.gridsize,10); //CanvasWidth
	//hLines=parseInt(this.canvasObj.offsetHeight / this.gridsize,10); //CanvasHeight
	//this.canvasObj.style.width=this.dRoutesetCanvas.scrollWidth;
	//this.canvasObj.style.height=this.dRoutesetCanvas.scrollHeight;
	//alert("www" + this.dRoutesetCanvas.offsetWidth);
	vLines=parseInt(this.dRoutesetCanvas.parentNode.scrollWidth  / this.gridsize,10);
	hLines=parseInt(this.dRoutesetCanvas.parentNode.scrollHeight / this.gridsize,10);
	
	//making the canvas as big as the parent...
	this.canvasObj.style.width=this.dRoutesetCanvas.parentNode.scrollWidth;
	this.canvasObj.style.height=this.dRoutesetCanvas.parentNode.scrollHeight;	
	
	this.canvas.setColor(this.gridColor);
	
	var _gridsize=this.gridsize;
	for(var x=0; x<hLines; x++)
	{
		//this.canvas.drawLine(this.CanvasLeft, this.CanvasTop + _gridsize, this.CanvasLeft+this.CanvasWidth, this.CanvasTop + _gridsize);
		this.canvas.drawLine(this.CanvasLeft, this.CanvasTop + _gridsize, this.CanvasLeft+this.canvasObj.offsetWidth, this.CanvasTop + _gridsize);
		_gridsize +=this.gridsize;
	}
	var _gridsize=this.gridsize;
	for(x=0; x<vLines; x++){
		//this.canvas.drawLine(this.CanvasLeft+_gridsize, this.CanvasTop, this.CanvasLeft+_gridsize,this.CanvasTop+this.CanvasHeight);
		this.canvas.drawLine(this.CanvasLeft+_gridsize, this.CanvasTop, this.CanvasLeft+_gridsize,this.CanvasTop+this.canvasObj.offsetHeight);
		_gridsize +=this.gridsize;
	}	
		
	this.canvas.paint();	
}