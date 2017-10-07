function bind(obj, evType, evFn) {
	obj.handle = function() {
		evFn.call(obj);
	}
	if(obj.addEventListener) {
		obj.addEventListener(evType, evFn, false);
		obj.handle = evFn;
	} else if(obj.attachEvent) {
		obj.attachEvent("on" + evType, obj.handle);
	} else {
		obj["on" + evType] = evFn;
	}
}

//创建一个整体的游戏对象  将里面的小对象们统一起来
(function(w) {
	
	function Game(map) {
		//将食物构造函数实例化一下 产生一个实例对象 食物 存到当前的游戏Game构造函数里面的this身上
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
	}
	Game.prototype.start = function() {
		this.food.render(this.map);
		this.snake.render(this.map);
		//让蛇自动走起来
		runSnake(this);
		//控制蛇方向的方法
		bindKey(this);
	}

	function runSnake(idx) {
		var timer = setInterval(function() {
			idx.snake.move(idx.food,idx.map);
			//在渲染蛇之前先删除原来页面上渲染的蛇 再去渲染新的蛇
			
			var headX=idx.snake.body[0].x*idx.snake.width;
			var headY=idx.snake.body[0].y*idx.snake.height;
			var maxX=idx.map.offsetWidth;
			var maxY=idx.map.offsetHeight;
			if(headX<0||headX>=maxX){
				clearInterval(timer);
				alert("Game Over!");
				return;
			}
			if(headY<0||headY>=maxY){
				clearInterval(timer);
				alert("Game Over!");
				return;
			}
			idx.snake.render(idx.map);
		}, 100)
	}
	//	键盘绑定事件
	function bindKey(that) {

		//	在整个文档下添加键盘按下事件
		bind(document, "keydown", function(e) {
			e = e || event;
			//		根据按下的键盘编码判断蛇头的走向
			switch(e.keyCode) {
				case 37:
					that.snake.direction = "left";
					break;
				case 39:
					that.snake.direction = "right";
					break;
				case 38:
					that.snake.direction = "up";
					break;
				case 40:
					that.snake.direction = "down";
					break;
			}
		})

	}
	//暴露
	w.Game = Game;
})(window);