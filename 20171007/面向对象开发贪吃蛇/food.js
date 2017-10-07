(function(w){
    var oldFood=[];
function Food(x,y,width,height,color) {
    this.x=x||0;
    this.y=y||0;
    this.width=width||20;
    this.height=height||20;
    this.color=color||"green";
}
Food.prototype.render=function(map){
    if(oldFood[0]){
        remove();
    }
    this.x=parseInt(Math.random()*map.offsetWidth/this.width)*this.width;
    this.y=parseInt(Math.random()*map.offsetHeight/this.height)*this.height;
    var div=document.createElement("div");
    div.style.width=this.width+"px";
    div.style.height=this.height+"px";
    div.style.position="absolute";
    div.style.left=this.x+"px";
    div.style.top=this.y+"px";
    div.style.background=this.color;
    map.appendChild(div);
    oldFood.push(div);
}
function remove(){
    oldFood[0].parentNode.removeChild(oldFood[0]);
    oldFood.splice(0,1);
}
w.Food=Food;
})(window);