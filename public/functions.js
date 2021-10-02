function checkKeys(){
	if(keys[kF.upBtn]==true){
		speedY = -maxSpeed;
	}
	else if(keys[kF.dwBtn]==true){
		speedY = maxSpeed;
	}
	if(keys[kF.rgBtn]==true){
		speedX = maxSpeed;
	}
	else if(keys[kF.ltBtn]==true){
		speedX = -maxSpeed;
	}
	if(keys[kF.upBtn] == false && keys[kF.dwBtn] == false){
		speedY = 0;
	}
	if(keys[kF.rgBtn] == false && keys[kF.ltBtn] == false){
		speedX = 0;
	}

	if(keys[kF.speBtn] === true){
		maxSpeed = 60;
	}
	if(keys[kF.slBtn] === true){
		maxSpeed = 20;
	}
	if(keys[kF.slBtn] === false && keys[kF.speBtn] === false){
		maxSpeed = 40;
	}
}
function movePlayer(){
	if(player_x>933){
		player_x=933;
	}
	if(player_y>3000){
		player_y=3000;
	}

	player_xnext = player_x + speedX/10;
	player_ynext = player_y + speedY/10;
	allowMoveX = true;
	allowMoveY = true;
	for(let i=0;i<obstacles.length;i++){
		owidth = obstacles[i].x2 - obstacles[i].x
		oheight = obstacles[i].y2 - obstacles[i].y
		if (player_xnext < obstacles[i].x + owidth &&
			player_xnext + 110 > obstacles[i].x &&
			player_y < obstacles[i].y + oheight &&
			player_y + 110 > obstacles[i].y) {
			////console.log(obstacles[i].x + '. '+obstacles[i].y +' '+obstacles[i].x2+', '+obstacles[i].y2)
			allowMoveX = false;
			//console.log(obstacles[i].x+', '+obstacles[i].y+', '+obstacles[i].x2+', '+obstacles[i].y2);
		}
		else{
		}
		if (player_x < obstacles[i].x + owidth &&
			player_x + 110 > obstacles[i].x &&
			player_ynext < obstacles[i].y + oheight &&
			player_ynext + 110 > obstacles[i].y) {
			////console.log(obstacles[i].x + '. '+obstacles[i].y +' '+obstacles[i].x2+', '+obstacles[i].y2)
			allowMoveY = false;
			//console.log(obstacles[i].x+', '+obstacles[i].y+', '+obstacles[i].x2+', '+obstacles[i].y2);
		}
		else{
		}
	}
	let speedRatio = Number(60 / frames);
	//console.log(speedRatio)
	player_xprev = player_x;
	player_yprev = player_y;
	if(!stuck){
		if(allowMoveX){
			player_x= player_x + (speedX/10)*speedRatio;
		}
		if(allowMoveY){
			player_y= player_y + (speedY/10)*speedRatio;
		}
	}
	if(spectatingPlayer == 'no'){
		map.style.transform = "translate(calc(-50% - " +player_x+ "px), calc(-50% - "+player_y+"px))";
	}

	/*else{
		if(spectatingPlayer == 'no'){
			for(let i = 0; i<4; i++){
				let checkPlayerX = player_x+speedX/10;
				let checkPlayerY = player_y+speedY/10;
			}
		}
	}*/
	if(spectatingPlayer != 'no'){
		map.style.transform = "translate(calc(-50% - " +players[spectatingPlayer].x+ "px), calc(-50% - "+players[spectatingPlayer].y+"px))";
	}
	if(emfon){
		if(slots[slotsel].item == 'shelfemf' || slots[slotsel].item == 'shelfemf2'){
			if(ghost!=null){
				let distance = Math.hypot(player_x - ghost[0], player_y - ghost[1]);
				let power = emfPower;
				function checkEmfP(n,m){
					n = n - m;
					if(n<1){
						n = 1;
					}
					return n;
				}
				if(distance <= 100){
					itemHand.style.backgroundImage = "url('items/e"+emfPower+".png')";
				}
				else if(distance<=200){
					itemHand.style.backgroundImage = "url('items/e"+checkEmfP(emfPower,1)+".png')";
				}
				else if(distance<=300){
					itemHand.style.backgroundImage = "url('items/e"+checkEmfP(emfPower,2)+".png')";
				}
				else if(distance<=400){
					itemHand.style.backgroundImage = "url('items/e"+checkEmfP(emfPower,3)+".png')";
				}
				else if(distance>500){
					itemHand.style.backgroundImage = "url('items/e"+checkEmfP(emfPower,4)+".png')";
				}
			}
			else{
				itemHand.style.backgroundImage = "url('items/e1.png')";
			}
		}
	}
	if(gameStarted){
		whatRoom();
	}
	
}
function changeItem(){
	socket.emit('myItems', slots, slotsel);
	switch(slots[slotsel].item){
		case 0:
			itemHand.style.visibility = 'hidden';
			itemHand.style.height = '20vw'
			break;
		case 'shelfcamera':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/cameraoff.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/cameraon.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfemf':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/e0.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/e1.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfsflashlight':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/extralightneroff.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/extralightneron.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfflashlight':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == true){
				itemHand.style.backgroundImage = 'url("items/flashlighton.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/flashlight.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfbook':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/notebookf.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/notebooko.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfcrucifix':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/crucifix.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfphotocamera':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfspiritbox':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/spiritboxoff.png")';
			itemHand.style.height = '35vw'
			
			break;
		case 'shelfpills':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/restful.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfsalt':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/salt.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfthermometer':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/thermometeroff.png")';
			itemHand.style.height = '35vw'
			break;
		case 'shelfufflashlight':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/ufoff.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfcamera2':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/cameraoff.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/cameraon.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfemf2':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/e0.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/e1.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfsflashlight2':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/extralightneroff.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/extralightneron.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfflashlight2':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == true){
				itemHand.style.backgroundImage = 'url("items/flashlighton.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/flashlight.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfbook2':
			itemHand.style.visibility = 'visible';
			if(slots[slotsel].itemstate == false){
				itemHand.style.backgroundImage = 'url("items/notebookf.png")';
			}
			else{
				itemHand.style.backgroundImage = 'url("items/notebooko.png")';
			}
			itemHand.style.height = '20vw'
			break;
		case 'shelfcrucifix2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/crucifix.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfphotocamera2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfspiritbox2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/spiritboxoff.png")';
			itemHand.style.height = '35vw'
			
			break;
		case 'shelfpills2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/restful.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfsalt2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/salt.png")';
			itemHand.style.height = '20vw'
			break;
		case 'shelfthermometer2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/thermometeroff.png")';
			itemHand.style.height = '35vw'
			break;
		case 'shelfufflashlight2':
			itemHand.style.visibility = 'visible';
			itemHand.style.backgroundImage = 'url("items/ufoff.png")';
			itemHand.style.height = '20vw'
			break;
	}
}
function sH(){
    itemHand.style.visibility = 'visible';
    handHidden = false;
}
function cameraMode(state){ // Camera mode
	//console.log(totalCameras);
	if(state === false){
		cameraModeState = !cameraModeState;
	}
	if(lastCameraSelected>=totalCameras){
		lastCameraSelected = 0;
	}
	if(cameraModeState){
		let currentdate = new Date(); 
			let datetime = currentdate.getDate() + "/"
			                + (currentdate.getMonth()+1)  + "/" 
			                + currentdate.getFullYear() + " "  
			                + currentdate.getHours() + ":"  
			                + currentdate.getMinutes() + ":" 
			                + currentdate.getSeconds();
			cameraDate.textContent = datetime;
		timeInterval = setInterval(()=>{
			let currentdate = new Date(); 
			let datetime = currentdate.getDate() + "/"
			                + (currentdate.getMonth()+1)  + "/" 
			                + currentdate.getFullYear() + " "  
			                + currentdate.getHours() + ":"  
			                + currentdate.getMinutes() + ":" 
			                + currentdate.getSeconds();
			cameraDate.textContent = datetime;
		},1000);
		spectatingPlayer = 'no';
		cameraMassive = [
		{
			x: -1424,
			y: 137,
			deg: 129,
			player: 'no'
		}];
		if(state === false){
			beforeCameraX = player_x;
			beforeCameraY = player_y;
		}
		for(let i = 0; i<itemlist.length;i++){
			if(itemlist[i].t == 3 && itemlist[i].itemstate == true){
				cameraMassive.push({
					x:itemlist[i].x,
					y:itemlist[i].y,
					deg:itemlist[i].deg,
					player:'no'
				});
			}
		}
		for(let i = 0; i < 4 ; i++){
			if(players[i].item == 'shelfcamera' || players[i].item == 'shelfcamera2'){
				if(players[i].itemstate == true){
					cameraMassive.push({
						x:players[i].x,
						y:players[i].y,
						deg:players[i].rotation,
						player:i
					});
					//console.log(i+" player")
				}
			}
		}
		light.style.transform = 'rotate('+cameraMassive[lastCameraSelected].deg+'deg)'
		cameraDeg = cameraMassive[lastCameraSelected].deg
		cameraNum.textContent = (lastCameraSelected+1)+'/'+totalCameras;
		cameraNum.style.display = 'inline-block';
		cameraDate.style.display = 'inline-block';
		player_x = cameraMassive[lastCameraSelected].x;
		player_y = cameraMassive[lastCameraSelected].y;
		playerElem.style.visibility = 'hidden';
		itemHand.style.display = 'none';
		inventory.style.display = 'none';
		//console.log(cameraMassive)
		if(cameraMassive[lastCameraSelected].player !== 'no'){
			spectatingPlayer = cameraMassive[lastCameraSelected].player;
			playerElem.style.backgroundImage = 'url("player'+spectatingPlayer+'.png")';
			playerElem.style.visibility = 'visible';
		}
		map.style.transform = "translate(calc(-50% - " +player_x+ "px), calc(-50% - "+player_y+"px))";
		lightMode = true;
		stuck = true;
		dontChange = true;
		players[mynum].x = beforeCameraX;
		players[mynum].y = beforeCameraY;
		players[mynum].rotation = degree;
		//console.log(totalCameras);
		//console.log('Spectating player '+spectatingPlayer);
	}
	else{
		spectatingPlayer = 'no';
		player_x = beforeCameraX;
		player_y = beforeCameraY;
		clearInterval(timeInterval);
		orblist = [];
		clearTimeout(orbTimer);
		if(orbmap.children.length != 0){
			for(let i = 0; i < orbmap.children.length-1;i++){
				orbmap.children[i].remove();
			}
		}
		playerElem.style.backgroundImage = 'url("player'+mynum+'.png")';
		cameraNum.style.display = 'none';
		cameraDate.style.display = 'none';
		playerElem.style.visibility = 'visible';
		itemHand.style.display = 'inline-block';
		inventory.style.display = 'inline-block';
		if(flashlightMode == 0){
			lightMode = false;
		}
		else{
			lightMode = true;
		}
		stuck = false;
		dontChange = false;
	}
}
function useItem(){
	switch(slots[slotsel].item){
		case 0:
			break;
		case 'shelfcamera':
		case 'shelfcamera2':
			if(slots[slotsel].itemstate){
				play('CAMERA_DSLR_Button_Off_02_mono')
				itemHand.style.backgroundImage = 'url("items/cameraoff.png")';
				slots[slotsel].itemstate = false;
				holdingCamera = false;
				totalCameras--;
				socket.emit('holdingCamera',holdingCamera, mynum);
			}
			else{
				play('CAMERA_DSLR_Button_Off_02_mono')
				itemHand.style.backgroundImage = 'url("items/cameraon.png")';
				slots[slotsel].itemstate = true;
				holdingCamera = true;
				totalCameras++;
				socket.emit('holdingCamera',holdingCamera, mynum);
			}
			break;
		case 'shelfemf':
		case 'shelfemf2':
			play('Button Click 1');
			if(slots[slotsel].itemstate){
				itemHand.style.backgroundImage = 'url("items/e0.png")';
				slots[slotsel].itemstate = false;
				emfon = false;
			}
			else{
				itemHand.style.backgroundImage = 'url("items/e1.png")';
				slots[slotsel].itemstate = true;
				emfon = true;
				
			}
			break;
		case 'shelfsflashlight':
		case 'shelfsflashlight2':
			play('Button_on_off_1');
			for(let i = 0; i < slots.length; i++){
				if(slots[i].item == 'shelfflashlight' || slots[i].item == 'shelfflashlight2' || slots[i].item == 'shelfufflashlight' || slots[i].item == 'shelfufflashlight2'){
					slots[i].itemstate = false;
					uf.style.display = 'none';
					ufc.style.display = 'none';
				}
				switch(slots[slotsel].item){
					case 'shelfsflashlight':
						if(slots[i].item == 'shelfsflashlight2'){
							slots[i].itemstate = false;
						}
						break;
					case 'shelfsflashlight2':
						if(slots[i].item == 'shelfsflashlight'){
							slots[i].itemstate = false;
						}
						break;
				}
			}
			if(slots[slotsel].itemstate){
				itemHand.style.backgroundImage = 'url("items/extralightneroff.png")';
				fogSize = 250;
				slots[slotsel].itemstate = false;
				lightMode = false;
				flashlightMode = 0;
			}
			else{
				itemHand.style.backgroundImage = 'url("items/extralightneron.png")';
				fogSize = 600;
				light.style.backgroundSize = '2500px 1700px';
				slots[slotsel].itemstate = true;
				lightMode = true;
				flashlightMode = 2;
			}
			break;
		case 'shelfflashlight':
		case 'shelfflashlight2':
			for(let i = 0; i < slots.length; i++){
				if(slots[i].item == 'shelfsflashlight' || slots[i].item == 'shelfsflashlight2' || slots[i].item == 'shelfufflashlight' || slots[i].item == 'shelfufflashlight2'){
					slots[i].itemstate = false;
					uf.style.display = 'none';
					ufc.style.display = 'none';
				}
				switch(slots[slotsel].item){
					case 'shelfflashlight':
						if(slots[i].item == 'shelfflashlight2'){
							slots[i].itemstate = false;
						}
						break;
					case 'shelfflashlight2':
						if(slots[i].item == 'shelfflashlight'){
							slots[i].itemstate = false;
						}
						break;
				}
			}
			play('Button_on_off_1');
			if(slots[slotsel].itemstate){
				itemHand.style.backgroundImage = 'url("items/flashlight.png")';
				fogSize = 250;
				slots[slotsel].itemstate = false;
				lightMode = false;
				flashlightMode = 0;
			}
			else{
				itemHand.style.backgroundImage = 'url("items/flashlighton.png")';
				fogSize = 600;
				light.style.backgroundSize = '2500px 2200px';
				slots[slotsel].itemstate = true;
				lightMode = true;
				flashlightMode = 1;
			}
			break;
		case 'shelfufflashlight':
		case 'shelfufflashlight2':
			for(let i = 0; i < slots.length; i++){
				if(slots[i].item == 'shelfsflashlight' || slots[i].item == 'shelfsflashlight2' || slots[i].item == 'shelfflashlight' || slots[i].item == 'shelfflashlight2'){
					slots[i].itemstate = false;
				}
				switch(slots[slotsel].item){
					case 'shelfufflashlight':
						if(slots[i].item == 'shelfufflashlight2'){
							slots[i].itemstate = false;
						}
						break;
					case 'shelfufflashlight2':
						if(slots[i].item == 'shelfufflashlight'){
							slots[i].itemstate = false;
						}
						break;
				}
			}
			play('Button_on_off_1');
			if(slots[slotsel].itemstate){
				itemHand.style.backgroundImage = 'url("items/ufoff.png")';
				lightMode = false;
				uf.style.display = 'none';
				ufc.style.display = 'none';
				slots[slotsel].itemstate = false;
				flashlightMode = 0;
			}
			else{
				itemHand.style.backgroundImage = 'url("items/ufon.png")';
				lightMode = true;
				uf.style.display = 'block';
				ufc.style.display = 'block';
				slots[slotsel].itemstate = true;
				flashlightMode = 3;
			}
			break;
		case 'shelfphotocamera':
		case 'shelfphotocamera2':
			if(slots[slotsel].itemstate != 0){
				play('CameraTake')
				slots[slotsel].itemstate--;
				itemHand.style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
				socket.emit('photo', mynum);
				//console.log(slots[slotsel].itemstate)
			}
			else{
				itemHand.style.backgroundImage = 'url("items/photocamera0.png")';
			}
			break;
		case 'shelfspiritbox':
		case 'shelfspiritbox2':
			play('Butto_on_off_2');
			
			if(evpOn){
				evploop.pause()
				evpOn = false;
				itemHand.style.backgroundImage = 'url("items/spiritboxoff.png")';
				slots[slotsel].itemstate = false;
			}
			else{
				evploop.play();
				setVolume('evploop',.2)
				evpOn = true;
				itemHand.style.backgroundImage = 'url("items/spiritboxon.gif")';
				slots[slotsel].itemstate = true;
			}
			break;
		case 'shelfsalt':
		case 'shelfsalt2':
			if(slots[slotsel].itemstate!=0){
				play('Pills 5');
				let salt = document.createElement('div');
				salt.classList.add('salt');
				itemlist.push({
				x : player_x,
				y : player_y,
				deg : degree,
				t : 1,
				itemstate: false,
				item: null,
				room: curRoom
				});
				itemsmap.append(salt);
				slots[slotsel].itemstate--;
				socket.emit('spawnedSalt', player_x, player_y, degree, false, false, curRoom);
			}
			break;
		case 'shelfbook':
		case 'shelfbook2':
				play('page_turn_02')
				let salt = document.createElement('div');
				salt.classList.add('book');
				itemlist.push({
				x : player_x,
				y : player_y,
				deg : degree,
				t : 2,
				itemstate: slots[slotsel].itemstate,
				item: slots[slotsel].item,
				room: curRoom
				});
				if(slots[slotsel].itemstate == true){
					salt.style.backgroundImage = 'url("items/notebooko.png")';
				}
				else{
					salt.style.backgroundImage = 'url("items/notebookf.png")';
				}
				itemsmap.append(salt);
				slots[slotsel].item = 0;
				document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
				document.getElementById('itemHand').style.visibility = 'hidden';
				socket.emit('spawnedBook',player_x,player_y, degree,slots[slotsel].itemstate,'shelfbook', curRoom);
			break;
		case 'shelfpills':
		case 'shelfpills2':
			if(slots[slotsel].itemstate){
				play('Pills 1');
				slots[slotsel].itemstate = false;
				mySanity = mySanity + getRandom(40, 70);
				if(mySanity>100){
					mySanity = 100;
				}
				socket.emit('atePills', mySanity, mynum);
			}
			break;
		case 'shelfthermometer':
		case 'shelfthermometer2':
			play('Button Click 1')
			if(slots[slotsel].itemstate){
				itemHand.style.backgroundImage = 'url("items/thermometeroff.png")';
				thermometeron = false;
				slots[slotsel].itemstate = false;
			}
			else{
				itemHand.style.backgroundImage = 'url("items/thermometer2.png")';
				thermometeron = true;
				slots[slotsel].itemstate = true;
			}
			break;
	}
}
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max-1);
  return Math.floor(Math.random() * (max - min)) + min;
}
function createPlayer(x,y,me,skin){
	const player = document.createElement('div');
	player.classList.add('playerClass');
	if(me){
		player.style.display = 'none';
		player.style.visibility = 'hidden';
	}
	player.style.backgroundImage = 'url("player'+skin+'.png")'
	playerMap.append(player);
}
function startGame(){
	gameStarted = true;
	possibleGhosts();
	logindiv.style.display = 'none';
	gamediv.style.display = 'block';
	playerMap.children[ mynum ].style.display = 'none';
	playerMap.children[ mynum ].style.visibility = 'hidden';
	playerElem.style.backgroundImage = 'url("player'+mynum+'.png")';
	for(let i = 0; i < 4; i++){
		let namestr = i+1
		if(!players[i].disconnected){
			if(players[i].dead){

				document.getElementById('splayersanity'+namestr).textContent = '??%';
			}
			else{
				document.getElementById('splayersanity'+namestr).textContent = Math.floor(players[i].sanity)+'%';
			}
			document.getElementById('splayername'+namestr).textContent = players[i].name;
		}
		else{
			document.getElementById('splayername'+namestr).textContent = '';
			document.getElementById('splayersanity'+namestr).textContent = '??%';
		}
	}
}
function whatRoom(){
	curRoom = 13;
	for(let i=0;i<rooms.length;i++){
		owidth = rooms[i].x2 - rooms[i].x
		oheight = rooms[i].y2 - rooms[i].y
		thirteen = false;
		if (player_xnext < rooms[i].x + owidth &&
			player_xnext + 110 > rooms[i].x &&
			player_ynext < rooms[i].y + oheight &&
			player_ynext + 110 > rooms[i].y) {
			if(i == 0 || i == 1){
				curRoom = 0;
				thirteen = false;
			}
			else if(i == 2 || i == 3){
				curRoom = 1;
				thirteen = false;
			}
			else if(i == 4){
				curRoom = 2;
				thirteen = false;
			}
			else if(i == 5){
				curRoom = 3;
				thirteen = false;
			}
			else if(i == 6){
				curRoom = 4;
				thirteen = false;
			}
			else if(i == 7){
				curRoom = 5;
				thirteen = false;
			}
			else if(i == 8){
				curRoom = 6;
				thirteen = false;
			}
			else if(i == 9){
				curRoom = 7;
				thirteen = false;
			}
			else if(i == 10){
				player_x=-3808+(player_x+17);
				player_y=-2449;

			}
			else if(i == 11){
				player_x =-17+(player_x+3808);
				player_y = -2744;
			}
			else if(i == 12){
				curRoom = 8;
				thirteen = false;
			}
			else{
				curRoom = 13;
				thirteen = true;
			}
			
			if(thermometeron){
				if(slots[slotsel].item == 'shelfthermometer' || slots[slotsel].item == 'shelfthermometer2'){
					if(ghostRoom == curRoom && frozen){
						if(freezingTemps){
							itemHand.style.backgroundImage = 'url("items/thermometercold.png")';
						}
						else{
							itemHand.style.backgroundImage = 'url("items/thermometer3.png")';
						}
					}
					else{
						itemHand.style.backgroundImage = 'url("items/thermometer2.png")';
					}
				}
			}
		}
		else{
			
		}
	}
	if(thirteen){
		curRoom = 13;
	}
	if(curRoom == 13 || curRoom == 14){
		for(let i = 0; i<house.length; i++){
			owidth = house[i].x2 - house[i].x
			oheight = house[i].y2 - house[i].y
			thirteen = false;
			if (player_x < house[i].x + owidth &&
				player_x + 110 > house[i].x &&
				player_y < house[i].y + oheight &&
				player_y + 110 > house[i].y) {
				curRoom = 14;
			}
		}
		if(curRoom != 14){
			idlePlaying = false
			curRoom = 13
		}
	}
	if(curRoom == 13){
		idlePlaying = false;
		
			if(!idleStreetPlaying){
				idlehouse.pause();
				idlestreet.play();
				idleStreetPlaying = true;
			}
		
	}
	else{
		idleStreetPlaying = false;
		if(!idlePlaying){
			idlehouse.play();
			idlestreet.pause();
			idlePlaying = true;
		}
		

	}
	socket.emit('myRoom', curRoom, mynum);
}
function mapto(x, inmin, inmax, outmin, outmax){
    return (x - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
}
function moveMiniMap(){
	for(let i = 0; i<4; i++){
		if(players[i].room == 8){
			miniMap.children[i].style.visibility = 'hidden';
		}
		else{
			miniMap.children[i].style.visibility = 'visible';
		}
		if(players[i].disconnected){
			miniMap.children[i].style.visibility = 'hidden';
		}
		else{
			miniMap.children[i].style.visibility = 'visible';
		}
		
		let miniY = mapto(players[i].x, -2533, 922, 4.18, 33.55);
		let miniX = mapto(players[i].y, -1, -3678, 10.94, 41.96) + 11;
		miniMap.children[i].style.left = miniX+'vw';
		miniMap.children[i].style.top = miniY+'vw';
	}
}
function scarySound(){
	document.getElementById('Door handle open 01').play();
	document.getElementById('Door handle open 01').play();
}
function possibleGhosts(){
	writingProof = false;
	emfProof = false;
	orbProof = false;
	freezingProof = false;
	footprintProof = false;
	spiritboxProof = false;
	possibleGhostsArray = [{name:'Unknown'}]
	let totalProofs = 3
	switch(line1){
		case 0:
			totalProofs--
			break;
		case 1:
			if(emfProof){
				totalProofs--
			}
			emfProof = true;
			//console.log('EMF 5')
			break;
		case 2: 
			if(freezingProof){
				totalProofs--
			}
			freezingProof = true;
			//console.log('Freezing')
			break;
		case 3:
			if(writingProof){
				totalProofs--
			}
			writingProof = true;
			//console.log('Ghost writing')
			break;
		case 4:
			if(orbProof){
				totalProofs--
			}
			orbProof = true;
			//console.log('Ghost orbs')
			break;
		case 5:
			if(footprintProof){
				totalProofs--
			}
			footprintProof = true;
			//console.log('Fingerprints')
			break;
		case 6:
			if(spiritboxProof){
				totalProofs--
			}
			spiritboxProof = true;
			//console.log('Spirit box')
			break;
	}
	switch(line2){
		case 0:
			totalProofs--
			break;
		case 1:
			if(emfProof){
				totalProofs--
			}
			emfProof = true;
			//console.log('EMF 5')
			break;
		case 2: 
			if(freezingProof){
				totalProofs--
			}
			freezingProof = true;
			//console.log('Freezing')
			break;
		case 3:
			if(writingProof){
				totalProofs--
			}
			writingProof = true;
			//console.log('Ghost writing')
			break;
		case 4:
			if(orbProof){
				totalProofs--
			}
			orbProof = true;
			//console.log('Ghost orbs')
			break;
		case 5:
			if(footprintProof){
				totalProofs--
			}
			footprintProof = true;
			//console.log('Fingerprints')
			break;
		case 6:
			if(spiritboxProof){
				totalProofs--
			}
			spiritboxProof = true;
			//console.log('Spirit box')
			break;
	}
	switch(line3){
		case 0:
			totalProofs--
			break;
		case 1:
			if(emfProof){
				totalProofs--
			}
			emfProof = true;
			//console.log('EMF 5')
			break;
		case 2: 
			if(freezingProof){
				totalProofs--
			}
			freezingProof = true;
			//console.log('Freezing')
			break;
		case 3:
			if(writingProof){
				totalProofs--
			}
			writingProof = true;
			//console.log('Ghost writing')
			break;
		case 4:
			if(orbProof){
				totalProofs--
			}
			orbProof = true;
			//console.log('Ghost orbs')
			break;
		case 5:
			if(footprintProof){
				totalProofs--
			}
			footprintProof = true;
			//console.log('Fingerprints')
			break;
			case 6:
			if(spiritboxProof){
				totalProofs--
			}
			spiritboxProof = true;
			//console.log('Spirit box')
			break;
	}

	for(let i = 0; i<ghosts.length; i++){
		if(totalProofs == 0){
			possibleGhostsArray.push(ghosts[i]);
		}
		else if(totalProofs == 1){
			if(writingProof){
				if(writingProof == ghosts[i].writing){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(emfProof){
				if(emfProof == ghosts[i].emf){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(orbProof){
				if(orbProof == ghosts[i].ghostorb){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(freezingProof){
				if(freezingProof == ghosts[i].freeze){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(footprintProof){
				if(footprintProof == ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof){
				if(spiritboxProof == ghosts[i].spiritbox){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
		}
		else if(totalProofs == 2){
			if(writingProof && emfProof){
				if(writingProof == ghosts[i].writing && emfProof == ghosts[i].emf){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(writingProof && orbProof){
				if(ghosts[i].writing && ghosts[i].ghostorb){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(writingProof && freezingProof){
				if(ghosts[i].writing && ghosts[i].freeze){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(writingProof && footprintProof){
				if(ghosts[i].writing && ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(emfProof && orbProof){
				if(ghosts[i].emf && ghosts[i].ghostorb){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(emfProof && freezingProof){
				if(ghosts[i].emf && ghosts[i].freeze){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(emfProof && footprintProof){
				if(ghosts[i].emf && ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(orbProof && freezingProof){
				if(ghosts[i].ghostorb && ghosts[i].freeze){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(orbProof && footprintProof){
				if(ghosts[i].ghostorb && ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(freezingProof && footprintProof){
				if(ghosts[i].freeze && ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof && writingProof){
				if(ghosts[i].spiritbox && ghosts[i].writing){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof && emfProof){
				if(ghosts[i].spiritbox && ghosts[i].emf){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof && orbProof){
				if(ghosts[i].spiritbox && ghosts[i].ghostorb){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof && freezingProof){
				if(ghosts[i].spiritbox && ghosts[i].freeze){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
			if(spiritboxProof && footprintProof){
				if(ghosts[i].spiritbox && ghosts[i].fingerprints){
					possibleGhostsArray.push(ghosts[i]);
				}
			}
		}
		else if(totalProofs == 3){
			if(writingProof == ghosts[i].writing && emfProof == ghosts[i].emf && orbProof == ghosts[i].ghostorb && freezingProof == ghosts[i].freeze && footprintProof == ghosts[i].fingerprints && spiritboxProof == ghosts[i].spiritbox){
				possibleGhostsArray.push(ghosts[i]);
			}
		}
	}
	//console.log(totalProofs)
	line4 = 0;
	line4p.textContent = possibleGhostsArray[line4].name;
}
function pickupItem(){
	if(slots[slotsel].item == 0){
		for(let i = 0; i < itemlist.length; i++){
			let ix = itemlist[i].x;
			let iy = itemlist[i].y;
			if(ix < player_x+50 && ix > player_x-50 && iy < player_y+50 && iy > player_y-50 && itemlist[i].t != 1){
				//console.log('Detected '+itemlist[i].t+' nearby. Trying to pick it up')
				if(itemlist[i].t == 3 && itemlist[i].itemstate){
					holdingCamera == true;
				}
				slots[slotsel].item = itemlist[i].item;
				slots[slotsel].itemstate = itemlist[i].itemstate;
				changeItem();
				switch(slots[slotsel].item){
				case 0:
					document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
					break;
				case 'shelfcamera':
				case 'shelfcamera2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/cameraoff.png")';
					
					break;
				case 'shelfemf':
				case 'shelfemf2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/e0.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '7vh';
					break;
				case 'shelfsflashlight':
				case 'shelfsflashlight2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/extralightneroff.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
					slots[slotsel].itemstate = false
					break;
				case 'shelfflashlight':
				case 'shelfflashlight2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/flashlight.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
					slots[slotsel].itemstate = false
					break;
				case 'shelfbook':
				case 'shelfbook2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/notebookf.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
					break;
				case 'shelfcrucifix':
				case 'shelfcrucifix2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/crucifix.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
					break;
				case 'shelfphotocamera':
				case 'shelfphotocamera2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
					break;
				case 'shelfspiritbox':
				case 'shelfspiritbox2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/spiritboxoff.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '6vh';
					slots[slotsel].itemstate = false
					break;
				case 'shelfpills':
				case 'shelfpills2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/restful.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
					break;
				case 'shelfsalt':
				case 'shelfsalt2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/salt.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '6vh';
					break;
				case 'shelfthermometer':
				case 'shelfthermometer2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/thermometeroff.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '4vh';
					break;
				case 'shelfufflashlight':
				case 'shelfufflashlight2':
					document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
					document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/ufoff.png")';
					//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
					slots[slotsel].itemstate = false;
					uf.style.display='none'
					ufc.style.display='none'
					
					break;
				}
				itemHand.style.visibility = 'visible';
				itemHand.style.display = 'inline-block';
				itemsmap.children[ i ].remove();
				itemlist.splice(i, 1);
				socket.emit('myItems', slots, slotsel);
				socket.emit('pickedUpItem',i)
				break;
			}
		}
	}
	else{
		//console.log('No empty slots');
	}
}
function changeFog(){
	if(!ghostHuntS){
		switch(lightMode){
		case true:
			light.style.visibility = 'visible';
			switch(flashlightMode){
				case 1:
					if(!ghostHuntS){
						fogSize = 450;
					}
				break;
				case 2:
					if(!ghostHuntS){
						fogSize = 600;
					}
					break;
				case 3:
					if(!ghostHuntS){
						fogSize = 300;
					}
			}
			
			break;
		case false:
			if(curRoom == 13){
				fogSize = 500
			}
			else{
				fogSize = 125;
			}
			light.style.visibility = 'hidden';
			break;	
	}
	}
	else{
		if(!lightMode){
			light.style.visibility = 'hidden';
			if(curRoom == 13){
				fogSize = 500
			}
			else{
				fogSize = 125;
			}
		}
		else{
			light.style.visibility = 'visible';
		}
	}
	if(cameraModeState){
		fogSize = 600;
	}
	fogofwar.style.background = 'radial-gradient(circle, transparent,black '+fogSize+'px)';
	prevFog = fogSize;
}
function ghostHuntLight(){
	ghState = !ghState;
	if(ghState){
		fogSize = 250;
	}
	else{
		fogSize = 450;
	}
	setTimeout(ghostHuntLight, getRandom(300,1500));
}
function play(n, v = 0.3){
	//console.log(v);
	let currentDate = new Date();
	let timestamp = currentDate.getTime();
	let f = n + getRandom(0,10000) + timestamp
	let i = 0;
	let xTag = document.createElement('audio');
    let xDiv = document.getElementById('soundSection');
    xTag.classList.add('soundClass')
    xDiv.appendChild(xTag);
    xTag.setAttribute('id', f);
    xTag.setAttribute('preload', 'metadata')
    if(n == 'idlehouse1' || n == 'idlehouse2' || n == 'idlestreet'){
    	idleId = f;
    	xTag.setAttribute('src', 'sounds/'+n+'.m4a');
    }
    else{
    	xTag.setAttribute('src', 'sounds/'+n+'.wav');
    }
    setVolume(f, v);
    playa(f);
    let au = document.getElementById(f);
	au.onloadedmetadata = function() {
	    setTimeout(()=>{
	    	if(document.getElementById(au) != null){
	    		au.remove();
	    		if(au == getElementById(idleId) && idlePlaying){
	    			play('idlehouse1')
	    		}
	    	}
	    },au.duration*1000)
	};
}
function pauseGame(){
	pauseMenu = true;
	stuck = true;
	pauseScreen.style.display = 'inline-block'
}
function resumeGame(){
	pauseMenu = false;
	stuck = false;
	pauseScreen.style.display = 'none';
	settingsMenu.style.display = 'none';
	document.getElementById('pauseMenu').style.display = 'inline-block';
    if(focusedKey != null){
		document.getElementById(focusedKey).style.color = 'white';
		focusedKey = null;
	}
}
function resetKeys(){
	kF.pauseBtn = pauseBtn;
	kF.arlBtn = arlBtn;
	kF.arrBtn = arrBtn;
	kF.fslBtn = fslBtn;
	kF.hideBtn = hideBtn;
	kF.sslBtn = sslBtn;
	kF.tslBtn = tslBtn;
	kF.pickBtn = pickBtn;
	kF.jourBtn = jourBtn;
	kF.leaveBtn = leaveBtn;
	kF.useBtn = useBtn;
	kF.dropBtn = dropBtn;
	kF.upBtn = upBtn;
	kF.dwBtn = dwBtn;
	kF.rgBtn = rgBtn;
	kF.ltBtn = ltBtn;
	kF.speBtn = speBtn;
	kF.slBtn = slBtn;
	saveKeys();
	if(focusedKey != null){
		document.getElementById(focusedKey).style.color = 'white';
		focusedKey = null;
	}
}
function saveKeys(){
	fs.writeFile(pathTo, JSON.stringify(kF, null, 2), function writeJSON(err) {
		if (err) return console.log(err);
		loadKeys();
	});
}
function keyChange(e){
	if(e.target.className == 'keyBtn'){
        if(focusedKey != null){
            document.getElementById(focusedKey).style.color = 'white';
        }
        if(focusedKey === e.target.id){
            document.getElementById(focusedKey).style.color = 'white';
            focusedKey = null;
            return;
        }
        focusedKey = e.target.id;
		e.target.style.color = 'red'
	}
}
function loadKeys(){
	for(e in kF){
		document.getElementById(e).textContent = keyboardMap[kF[e]];
	}
}