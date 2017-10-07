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
(function(w){
	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
	}
	Game.prototype.start = function () {
		this.food.render(this.map);
		this.snake.render(this.map);
		runSnake(this);
		bindKey(this);
	}
	function runSnake(idx) {
		var timer = setInterval(function () {
			idx.snake.move(idx.food, idx.map);
			var headX = idx.snake.body[0].x * idx.snake.width;
			var headY = idx.snake.body[0].y * idx.snake.height;
			var maxX = idx.map.offsetWidth;
			var maxY = idx.map.offsetHeight;
			if (headX < 0 || headX >= maxX) {
				clearInterval(timer);
				alert("Game Over!");
				return;
			}
			if (headY < 0 || headY >= maxY) {
				clearInterval(timer);
				alert("Game Over!");
				return;
            }
            for(var i=4;i<idx.snake.body.length;i++){
                if(headX==idx.snake.body[i].x*idx.snake.width&&headY==idx.snake.body[i].y * idx.snake.height){
                    clearInterval(timer);
                    alert("Game Over!");
                    return;
                }
            }
			idx.snake.render(idx.map);
		}, 100);
	}
	function bindKey(abc) {
		bind(document, "keydown", function (e) {
            e = e || event;
       var fx=abc.snake.direction;
       if(fx=="right"||fx=="left"){
        switch(e.keyCode){
            case 38:
            abc.snake.direction = "up";
            break;
        case 40:
            abc.snake.direction = "down";
            break;
        }
       }else{
        switch (e.keyCode) {
            case 37:
                abc.snake.direction = "left";
                break;
            case 39:
                abc.snake.direction = "right";
                break;
            
        }
       }
			
		});
	}
	w.Game=Game;
})(window);