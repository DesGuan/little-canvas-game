window.onload = function(){
    //loading界面删除
    document.body.removeChild(document.getElementById("loading"));
    //变量
    var c=document.getElementById("myCanvas"); 
    var cxt = c.getContext("2d"); 
    var x = 16;
    var y = 16; 
    var a = Math.ceil(Math.random()*39)*16;
    var b = Math.ceil(Math.random()*39)*16;
    var t = 8; //蛇身长 
    var map = []; //记录蛇运行路径 
    var size = 16; //蛇身单元大小 
    var direction = 2; // 1 向上 2 向右 0 左 3下 
    var score = 0;//分数
    var nowDir = direction;
    var refeed = 0;
    var ifPause = 1;
    var speed = 160;//速度
    var interval = null;//定时器
    //引导删除
    document.getElementById("lead").onclick = function(){
    	this.style.display = "none";
    	ifPause = 0;
        start();
    }
    //开始表演
    function start(){
    	clearInterval(interval);
        interval = window.setInterval(set_game_speed, speed); // 定时器160ms移动16像素 ,蛇开始移动。
    }
    document.getElementById("pause").onclick = function(){//暂停
        clearInterval(interval);
        document.getElementById("lead").style.display = "block";
        ifPause = 1;
    }
    document.getElementById("start").onclick = function(){//开始
        window.location.reload(); 
    }
    function set_game_speed(){ // 移动蛇 
    	if(Math.abs(nowDir-direction) == 2){//避免蛇头往回走时撞到自己
    		direction = nowDir;
	    }
        switch(direction){ 
            case 1://上
                y = y-size;
                break; 
            case 2://右
                x = x+size;
                break; 
            case 0://左
                x = x-size;
                break; 
            case 3://下
                y = y+size;
                break; 
    	}
        if(x>=640 || y>=640 || x<0 || y<0){ 
            alert("你的蛇撞墙啦，本次得分为："+score+"分");
            window.location.reload(); 
        } 
        for(var i=0;i<map.length;i++){ 
            if( parseInt(map[i].x)==x && parseInt(map[i].y)==y){ 
                alert("你的蛇撞着自己啦，本次得分为："+score+"分");
                window.location.reload(); 
            } 
        } 
        if (map.length>t) { //保持蛇身长度 
            var cl = map.shift(); //删除数组第一项，并且返回原元素 
            cxt.clearRect(cl['x'], cl['y'], size, size); 
        }
        map.push({'x':x,'y':y}); //将数据添加到原数组尾部 
        cxt.fillStyle = "rgb(80,119,132)";//内部填充颜色
        cxt.fillRect(x, y, size, size);//绘制矩形 
        if(x==a && y==b){ //吃食物 
            t++;
            score++;
            document.getElementById("score").innerHTML = score;
            rand_frog();
            if (speed > 40) {//随着的分数增加速度越来越快
	        	speed = speed - 2;
	        	start();
	        }
        } 
        nowDir = direction;
    } 
    document.onkeydown = function(e){ //改变蛇方向 
	    if(ifPause == 0){
	        switch(e.keyCode){
	        	//上下左右控制
	            case 38 : 
	                direction = 1;
	                break;//上 
	            case 39 : 
	                direction = 2;
	                break;//右 
	            case 40 : 
	                direction = 3;
	                break;//下 
	            case 37 : 
	                direction = 0;
	                break;//左 
	            //WASD控制
	            case 87 : 
	                direction = 1;
	                break;//上 
	            case 68 : 
	                direction = 2;
	                break;//右 
	            case 83 : 
	                direction = 3;
	                break;//下 
	            case 65 : 
	                direction = 0;
	                break;//左 
	        }
	    } 
        else{
            document.getElementById("lead").style.display = "none";
            ifPause = 0;
            start();
        }
	}
    // 随机放置食物 
    cxt.fillStyle = "#999";//食物填充颜色
	cxt.fillRect(a, b, 16, 16);//绘制矩形
    function rand_frog(){ 
        a = Math.ceil(Math.random()*39)*16;
        b = Math.ceil(Math.random()*39)*16;
    	for(var i=0;i<map.length;i++) {//避免食物生成在蛇身上
    		if (parseInt(map[i].x)==a && parseInt(map[i].y)==b) {
    			refeed = 0;
    			rand_frog();
    			break;
    		}
    		else{
	        	refeed = 1;
    		}
    	}
    	if(refeed == 1){
	    	cxt.fillStyle = "#999";//食物填充颜色
	    	cxt.fillRect(a, b, 16, 16);//绘制矩形
    	}
    }
}