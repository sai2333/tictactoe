$(function(){
	//棋盘，轮流落子，棋子数量，游戏结束/进行中
	var checker = [ [0,0,0],
					[0,0,0],
					[0,0,0]];
	var alternate = true;
	var mark = 0;
	var game =true;

	//游戏规则
	function rule(){
		mark++ ;
		alternate  = !alternate;
		if(checker[0] + '' == '1,1,1' || checker[1] + '' == '1,1,1' || checker[2] + '' == '1,1,1' || 
			checker[0][0] + checker[1][0] + checker[2][0] == 3 || checker[0][1] + checker[1][1] + checker[2][1] == 3 || 
			checker[0][2] + checker[1][2] + checker[2][2] == 3 || checker[0][0] + checker[1][1] + checker[2][2] == 3 || 
			checker[0][2] + checker[1][1] + checker[2][0] == 3){
			game = false;
			mark = 0;
			alternate = true;
			alert('你输了');
		}else if(checker[0] + '' == '-1,-1,-1' || checker[1] + '' == '-1,-1,-1' || checker[2] + '' == '-1,-1,-1' || 
			checker[0][0] + checker[1][0] + checker[2][0] == -3 || checker[0][1] + checker[1][1] + checker[2][1] == -3 || 
			checker[0][2] + checker[1][2] + checker[2][2] == -3 || checker[0][0] + checker[1][1] + checker[2][2] == -3 || 
			checker[0][2] + checker[1][1] + checker[2][0] == -3){
			game = false;
			mark = 0;
			alternate = true;
			alert('恭喜你，你赢了');
		}else if(mark == 9){
			alert('真遗憾，你和机器人打成了平局！');
			game = false;
			alternate = true;
			mark = 0;
		}
	}

	//轮流下子
	function isXorO(){
		if(alternate){
			return 'X';
		}else{
			return 'O';
		}
	};

	function clear(){
		//清除标记
		checker = [[0,0,0],
				   [0,0,0],
				   [0,0,0]];
		//内容全清空
		$('.checkerbox').text('');
	}

	//落子的函数
	function playChess(num){
		//在棋盘上落子
		$('.'+num).text(isXorO());
		//棋盘标记
		// if($('.'+num).text() == 'X'){
			switch(num){
				case '0':
					checker[0][0] = -1;break;
				case '1':
					checker[0][1] = -1;break;
				case '2':
					checker[0][2] = -1;break;
				case '3':
					checker[1][0] = -1;break;
				case '4':
					checker[1][1] = -1;break;
				case '5':
					checker[1][2] = -1;break;
				case '6':
					checker[2][0] = -1;break;
				case '7':
					checker[2][1] = -1;break;
				case '8':
					checker[2][2] = -1;break;
			}
		// }
		//判断
		rule();
	};

	//玩家
	$('.checkerbox').click(function(){
		//获得当前元素的类名，数字类名
		var s = this.className.slice(-1);
		playChess(s);
		//如果游戏还没结束轮到ai，如果结束了清除
		if(!game){
			clear();
			game = true;
		}else{
			aiAttack();
		}
	});
	//玩家选择棋子
	$('button').click(function(){
		var $chess = $(this).attr('value');
		if($chess == 'o'){
			aiAttack();
		}
	})

	//ai落子
	function aiPlay(num){
		$('.'+num).text(isXorO());
		rule();
		if(!game){clear();game = true;};
	}
//防守部分
	function defend(){
		var y1 = '';
		var y2 = '';
		var y3 = '';
		for(var i = 0;i< checker.length;i++){
			var x = checker[i]+'';
			x = x.replace(/,/g,'');
			switch(x){
				case '-1-10':
					checker[i][2] = 1;
					if(i == 0){
						aiPlay(2);
					}else if(i == 1){
						aiPlay(5);
					}else if(i == 2){
						aiPlay(8);
					}
					return false;
				case '-10-1':
					checker[i][1] = 1;
					if(i == 0){
						aiPlay(1);
					}else if(i == 1){
						aiPlay(4);
					}else if(i == 2){
						aiPlay(7);
					}
					return false;
				case '0-1-1':
					checker[i][0] = 1;
					if(i == 0){
						aiPlay(0);
					}else if(i == 1){
						aiPlay(3);
					}else if(i == 2){
						aiPlay(6);
					}
					return false;
			}
			 y1 += checker[i][0];
			 y2 += checker[i][1];
			 y3 += checker[i][2];
		}
		//y轴 还有斜线
		var slash1 = String(checker[0][0]) + checker[1][1] + checker[2][2];
		var slash2 = String(checker[0][2]) + checker[1][1] + checker[2][0];
		if(y1 == '-1-10'){
			checker[2][0] = 1;
			aiPlay(6);
			return ;
		}else if(y1 == '0-1-1'){
			checker[0][0] = 1;
			aiPlay(0);
			return ;
		}else if(y1 == '-10-1'){
			checker[1][0] = 1;
			aiPlay(3);
			return;
		}else if(y2 == '-1-10'){
			checker[2][1] = 1;
			aiPlay(7);
			return;
		}else if(y2 == '0-1-1'){
			checker[0][1] = 1;
			aiPlay(1);
			return;
		}else if(y2 == '-10-1'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(y3 == '-1-10'){
			checker[2][2] = 1;
			aiPlay(8);
			return;
		}else if(y3 == '-10-1'){
			checker[1][2] = 1;
			aiPlay(5);
			return;
		}else if(y3 == '0-1-1'){
			checker[0][2] = 1;
			aiPlay(2);
			return;
		}else if(slash1 == '-1-10'){
			checker[2][2] = 1;
			aiPlay(8);
			return;
		}else if(slash1 == '-10-1'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(slash1 == '0-1-1'){
			checker[0][0] = 1;
			aiPlay(0);
			return;
		}else if(slash2 == '-1-10'){
			checker[2][0] = 1;
			aiPlay(6);
			return;
		}else if(slash2 == '-10-1'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(slash2  == '0-1-1'){
			checker[0][2] = 1;
			aiPlay(2);
			return;
		}/*else{
			//上面的情况全部走完了代表棋盘上对方没有要连接的轴线了，就可以进行进攻了。
			aiAttack();
		}*/

	};

	//进攻
	function aiAttack(){
		var y1 = '';
		var y2 = '';
		var y3 = '';
		for(var i = 0;i< checker.length;i++){
			var x = checker[i]+'';
			x = x.replace(/,/g,'');
			switch(x){
				case '110':
					checker[i][2] = 1;
					if(i == 0){
						aiPlay(2);
					}else if(i == 1){
						aiPlay(5);
					}else if(i == 2){
						aiPlay(8);
					}
					return false;
				case '101':
					checker[i][1] = 1;
					if(i == 0){
						aiPlay(1);
					}else if(i == 1){
						aiPlay(4);
					}else if(i == 2){
						aiPlay(7);
					}
					return false;
				case '011':
					checker[i][0] = 1;
					if(i == 0){
						aiPlay(0);
					}else if(i == 1){
						aiPlay(3);
					}else if(i == 2){
						aiPlay(6);
					}
					return false;
			}
			 y1 += String(checker[i][0]);
			 y2 += String(checker[i][1]);
			 y3 += String(checker[i][2]);
		}
		//y轴 还有斜线
		var slash1 = String(checker[0][0]) + checker[1][1] + checker[2][2];
		var slash2 = String(checker[0][2]) + checker[1][1] + checker[2][0];
		if(y1 == '110'){
			checker[2][0] = 1;
			aiPlay(6);
			return ;
		}else if(y1 == '011'){
			checker[0][0] = 1;
			aiPlay(0);
			return ;
		}else if(y1 == '101'){
			checker[1][0] = 1;
			aiPlay(3);
			return;
		}else if(y2 == '110'){
			checker[2][1] = 1;
			aiPlay(7);
			return;
		}else if(y2 == '011'){
			checker[0][1] = 1;
			aiPlay(1);
			return;
		}else if(y2 == '101'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(y3 == '110'){
			checker[2][2] = 1;
			aiPlay(8);
			return;
		}else if(y3 == '101'){
			checker[1][2] = 1;
			aiPlay(5);
			return;
		}else if(y3 == '011'){
			checker[0][2] = 1;
			aiPlay(2);
			return;
		}else if(slash1 == '110'){
			checker[2][2] = 1;
			aiPlay(8);
			return;
		}else if(slash1 == '101'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(slash1 == '011'){
			checker[0][0] = 1;
			aiPlay(0);
			return;
		}else if(slash2 == '110'){
			checker[2][0] = 1;
			aiPlay(6);
			return;
		}else if(slash2 == '101'){
			checker[1][1] = 1;
			aiPlay(4);
			return;
		}else if(slash2  == '011'){
			checker[0][2] = 1;
			aiPlay(2);
			return;
			//最后如果有玩家要连线的情况下，调用防守函数
		}else if(checker[0][0] + checker[0][1] + checker[0][2] == -2 || 
				checker[1][0] + checker[1][1] + checker[1][2] == -2 ||
				checker[2][0] + checker[2][1] + checker[2][2] == -2 ||
				checker[0][0] + checker[1][0] + checker[2][0] == -2 ||
				checker[0][1] + checker[1][1] + checker[2][1] == -2 ||
				checker[0][2] + checker[1][2] + checker[2][2] == -2 ||
				checker[0][0] + checker[1][1] + checker[2][2] == -2 ||
				checker[0][2] + checker[1][1] + checker[2][0] == -2 ){
			defend();
			}else{
				//没有可以连的情况
				callBack();
			}
		
	};

	//双方没出现连线函数
	function callBack(){
			var r = random();
				if($('.'+r).text() == ''){
					aiPlay(r);
					switch(r){
					case 0:
						checker[0][0] = 1;break;
					case 1:
						checker[0][1] = 1;break;
					case 2:
						checker[0][2] = 1;break;
					case 3:
						checker[1][0] = 1;break;
					case 4:
						checker[1][1] = 1;break;
					case 5:
						checker[1][2] = 1;break;
					case 6:
						checker[2][0] = 1;break;
					case 7:
						checker[2][1] = 1;break;
					case 8:
						checker[2][2] = 1;break;
					}
				}else{
					callBack();
				}
	};

	//随机走
	function random(){
			var min = 0;
  			var max = 8;
  			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
})