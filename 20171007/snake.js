//蛇对象：属性和方法
//	蛇的属性:
//	width 20
//	height 20
//	body=[蛇头,蛇身1,蛇身2]
//	
//	body=[
//	{x:3,y:2,color:"red"},
//	{x:2,y:2,color:"blue"},
//	{x:1,y:2,color:"blue"}
//	]
//	蛇的身体 三节
//	每一节部分都有这些信息 所以可以用对象json去描述
//	蛇的颜色 
//	蛇的位置
//	让蛇产生并放置到页面上 渲染方法 render
(function(w) {
//	创建一个蛇的数组变量 用来存往页面里添加的蛇节
	var snakeEles=[];
	//创建蛇的构造函数
	function Snake(width, height, direction) {
		// 添加了一些宽高属性 给了一个默认值
		this.width = width || 20;
		this.height = height || 20;
		// 设置蛇的身体
		this.body = [{
				x: 3,
				y: 2,
				color: "red"
			}, //蛇头
			{
				x: 2,
				y: 2,
				color: "orange"
			}, // 蛇身1
			{
				x: 1,
				y: 2,
				color: "orange"
			} // 蛇身2
		];
		// 设置蛇头方向
		this.direction = direction || "right";
	}
	Snake.prototype.render = function(map) {
		//执行一个删除方法 将之前的蛇删除
		remove();
		for(var i = 0; i < this.body.length; i++) {
			var oDiv = document.createElement("div");
			oDiv.style.width = this.width + "px";
			oDiv.style.height = this.height + "px";
			oDiv.style.left = this.body[i].x * this.width + "px";
			oDiv.style.top = this.body[i].y * this.height + "px";
			oDiv.style.position = "absolute";
			oDiv.style.backgroundColor = this.body[i].color;
			map.appendChild(oDiv);
			snakeEles.push(oDiv);
		}
	Snake.prototype.move=function(food,map){
		
		for (var i = this.body.length-1; i>0; i--) {
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}
		switch(this.direction){
			case "right":
			this.body[0].x+=1;
			break;
			case "left":
			this.body[0].x-=1;
			break;
			case "up":
			this.body[0].y-=1;
			break;
			case "down":
			this.body[0].y+=1;
			break;
		}
		//判断在移动的过程中 判断是否和食物的坐标一样
		var headX=this.body[0].x*this.width;
		var headY=this.body[0].y*this.height;
		var foodX=food.x;
		var foodY=food.y;
		if(headX==foodX&&headY==foodY){
			var newSj=this.body[this.body.length-1];
			this.body.push({
				x:newSj.x,
				y:newSj.y,
				color:newSj.color
			});
			food.render(map);
		}
	}
	function remove(){
		for (var i = 0; i < snakeEles.length; i++) {
			snakeEles[i].parentNode.removeChild(snakeEles[i]);
		}
		snakeEles=[];
	}
	}
	w.Snake = Snake;
})(window);