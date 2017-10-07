(function(w) {
	var oldFood=[];
			//用户可以自行传入一些自定义设置
			function Food(width, height, x, y, color) {
				this.width = width || 20;
				this.height = height || 20;
				this.color = color || "green";
				this.x = x || 0;
				this.y = y || 0;
			}
			Food.prototype.render = function(map) {
				if (oldFood[0]) {
					remove();
				}
				//因为食物不能放在 23 13这样的位置 按照最小20 的格子单位走
				this.x = parseInt(Math.random() * (map.offsetWidth / this.width))*this.width;
				this.y = parseInt(Math.random() * (map.offsetHeight / this.height))*this.height;
				//我们在渲染方法里面产生一个小方块 将这个小方块进行设置 然后放在页面上 可以通过dom元素节点创建的方式
				var oDiv = document.createElement("div");
				oDiv.style.width = this.width + "px";
				oDiv.style.height = this.height + "px";
				//			给div添加位置
				oDiv.style.left = this.x + "px";
				oDiv.style.top = this.y + "px";
				//想要让食物在页面上根据left值和top值来进行随机放置 就需要让他相对于地图进行绝对定位
				oDiv.style.position = "absolute";
				//添加颜色
				oDiv.style.background = this.color;
				//将创建好的DIV节点放入地图当中
				map.appendChild(oDiv);
				oldFood.push(oDiv);
			}
		function remove(){
			oldFood[0].parentNode.removeChild(oldFood[0]);
			oldFood.splice(0,1);
		}
			w.Food = Food;
		})(window);
		
