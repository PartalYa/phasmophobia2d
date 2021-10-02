
'use strict';

const socket_config = { transports: ['websocket'], upgrade: false, autoConnect: false };
const {webFrame, ipcRenderer, remote} = require('electron');
const path = require('path')
const ipc = require('electron').ipcRenderer;
let execPath
execPath = path.dirname(remote.app.getPath('exe'))
console.log(execPath);
let execPathSplit = execPath.split('\\');
let pathTo = execPathSplit[0];
for (let i = 1; i < execPathSplit.length; i++) {
	pathTo = pathTo.concat('/', execPathSplit[i])
}
pathTo = pathTo.concat('/','Resources','/','app','/','public','/','keys.json')
console.log(pathTo);
const socket = io(  );
const fs = require('fs');
const keysFileName = './public/keys.json';
const kFJ = fs.readFileSync(keysFileName);
const kF = JSON.parse(kFJ);
const cb = require('clipboardy');
let pathE;
ipcRenderer.on('hello',(a,b)=>{
	console.log(b);
})
ipcRenderer.on('path',(a,b)=>{
	console.log(b);
	pathE = b
})
socket.on('connect', ()=>{
	////console.log( 'socket connected' );
	socket.on('serverFull',(is)=>{
		if(is){
			//console.log('serverFull');
			serverFull = true;
			nameinput.style.visibility = 'hidden';
			namebutton.style.visibility = 'hidden';
			document.getElementById('name').textContent = 'Server is Full';
			document.getElementById('name').style.color = '#4a0000';
		}
		else{
			nameinput.style.visibility = 'visible';
			namebutton.style.visibility = 'visible';
			document.getElementById('name').textContent = 'Enter name';
			document.getElementById('name').style.color = '#000000';
			namebutton.style.visibility = 'visible';
		}
	});
	
	socket.on('sendPlayers',(splayers,smynum)=>{
		//console.log(splayers);
		players = splayers;
		mynum = smynum;
		if(players[mynum].host){
			startbutton.style.display='inline-block';
		}
		for(let i=0;i<players.length;i++){
			if(i<4){
			if(!players[i].disconnected){
					document.getElementById('lobbyplayername'+i).textContent = players[i].name;
					if(i == mynum){
						document.getElementById('lobbyplayername'+i).style.color = 'black';
						//console.log(i + ' is my spot')
					}
					else{
						document.getElementById('lobbyplayername'+i).color = 'gray';
					}
			}
		}
		}
	});
	socket.on('newPlayer',(splayers)=>{
		//console.log('A new player connected')
		//console.log(splayers)
		players = splayers;
			for(let i=0;i<4;i++){
				if(!players[i].disconnected){
					document.getElementById('lobbyplayername'+i).textContent = players[i].name;
					if(i == mynum){
						document.getElementById('lobbyplayername'+i).style.color = 'black';
						//console.log(i + ' is my spot')
					}
					else{
						document.getElementById('lobbyplayername'+i).color = 'gray';
					}
				}
				//createPlayer(players[players.length-1].x,players[players.length-1].y);
			}
	});
	socket.on('removePlayer',(splayers)=>{
		players = splayers;
		//console.log(players)
		for(let i=0;i<4;i++){
				if(players[i].disconnected == false){
					document.getElementById('lobbyplayername'+i).textContent = players[i].name;
				}
				else{
					document.getElementById('lobbyplayername'+i).textContent = '';
				}
				if(i == mynum){
						document.getElementById('lobbyplayername'+i).style.color = 'black';
						//console.log(i + ' is my spot')
					}
					else{
						document.getElementById('lobbyplayername'+i).color = 'gray';
					}
				//createPlayer(players[players.length-1].x,players[players.length-1].y);
			}
	});
	socket.on('startGameS',(room,type)=>{
		ghostRoom = room;
		ghostType = type;
		if (ghostType.freeze){
			freezingTemps = true;
		}
		if (ghostType.emf){
			emf5 = true;
		}
		if (ghostType.writing){
			writing = true;
		}
		if(!serverFull){
			startGame();
		}
		
	});
	socket.on('makeFootprint',(coods, deg, spentSalt)=>{
				let currentDate = new Date();
				let timestamp = currentDate.getTime();
				let f = getRandom(0,10000) + timestamp
				let salt = document.createElement('div');
				salt.classList.add('footprint');
				ufm.push({
				x : coods[0],
				y : coods[1],
				degree : deg,
				t : 1
				});
				uf.append(salt);
				salt.setAttribute('id', f);
				let ufNum = ufm.length-1
				if(spentSalt == null){
					setTimeout(()=>{
						document.getElementById(f).remove();
						ufm.pop();
					},getRandom(2000,4000))
				}
				else{
					itemlist[spentSalt].itemstate = true;
					itemsmap.children[spentSalt].style.backgroundImage = 'url("items/saltf.png")';
				}
				////console.log(slots[slotsel].itemstate)
				slots[slotsel].itemstate--;
	});
	socket.on('ghostPlace',(emfPlace, semfPower)=>{
		ghost = emfPlace;
		emfPower = semfPower;
	});
	socket.on('newHost',(num)=>{
		//console.log(mynum);
		//console.log(num);
		if(mynum == num){
			startbutton.style.display = 'inline-block';
			startbutton.style.visibility = 'visible';
		}
	});
	socket.on('playerMoved',(splayers)=>{
		players = splayers;
	});
	socket.on('spawnedSalt',(x,y,deg,itemst,item,sroom)=>{
		let salt = document.createElement('div');
				salt.classList.add('salt');
				itemlist.push({
				x : x,
				y : y,
				deg : deg,
				t : 1,
				itemstate:itemst,
				item: item,
				room: sroom
				});
				itemsmap.append(salt);
	});
	socket.on('spawnedBook',(x,y,deg,itemst,item,sroom)=>{
		let salt = document.createElement('div');
		salt.classList.add('book');
		itemlist.push({
		x : x,
		y : y,
		deg : deg,
		t : 2,
		itemstate:itemst,
		item: item,
		room: sroom
		});
		if(itemst == true){
			salt.style.backgroundImage = 'url("items/notebooko.png")';
		}
		else{
			salt.style.backgroundImage = 'url("items/notebookf.png")';
		}
		itemsmap.append(salt);
	})
	socket.on('spawnedCamera',(x,y,deg,itemst,item,sroom)=>{
		let salt = document.createElement('div');
		salt.classList.add('camera');
		itemlist.push({
		x : x,
		y : y,
		deg : deg,
		t : 3,
		itemstate:itemst,
		item: item,
		room: sroom
		});
		totalCameras++;
		salt.style.transform = 'scale(0.84) rotate('+deg+'deg)';
		itemsmap.append(salt);
	})
	socket.on('skins',(splayers)=>{
		players = splayers;

	})
	socket.on('holdingCamera',(holding, pid)=>{
		//console.log('Player' + pid + ' ' +holding)
		if(holding){
			totalCameras++;
		}
		else{
			totalCameras--;
			if(cameraModeState == true){
				if(pid == spectatingPlayer){
					lastCameraSelected=0;
					cameraMode(true);
				}
			}
		}
	});
	socket.on('pickedUpItem', (num)=>{
		if(itemlist[num].t == 3 && itemlist[num].itemstate == true){
			if(cameraModeState == true){
				if(cameraMassive[lastCameraSelected].x == itemlist[num].x && cameraMassive[lastCameraSelected].y == itemlist[num].y){
					lastCameraSelected=0;
					cameraMode(true);
				}
			}
		}
		itemsmap.children[num].remove();
		itemlist.splice(num, 1);
	});
	socket.on('myRoom',(num,pnum)=>{
		players[pnum].room = num;
	});
	socket.on('activity', (act)=>{
		activity = act;
		activityCounter.textContent ='Activity: '+act;
	});
	socket.on('writingSend',(n)=>{
		//console.log('Book writing incoming');
		itemlist[n].itemstate = true;
		itemsmap.children[n].style.backgroundImage = 'url("items/notebooko.png")';
	});
	socket.on('freeze',(b)=>{
		frozen = b;
	});
	socket.on('sanityUpdate',(splayers)=>{
		players = splayers;
		mySanity = players[mynum].sanity;
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
	}	});
	socket.on('ghostorb', (n,c)=>{
		if(cameraModeState){
			if(player_x == itemlist[n].x && player_y == itemlist[n].y){
				let salt = document.createElement('div');
				orblist.push({
					x: c[0],
					y: c[1],
					n: n
				});
				let lastpos = orblist.length-1;
				orbTimer = setTimeout(()=>{
					salt.remove();
					orblist.splice(lastpos,1)
				},5000)
				salt.classList.add('orbClass');
				orbmap.append(salt);
			}
		}
	});
	socket.on('ghostAppear', (c, deg, t)=>{
		if(!ghostAppeared){
			ghostAppeared = true;
			//console.log(c);
			ghostM.x = c[0];
			ghostM.y = c[1];
			ghostM.deg = deg;
			document.getElementById('ghost').style.visibility = 'visible';
			document.getElementById('ghost').style.display = 'inline-block';
			setTimeout(()=>{
				document.getElementById('ghost').style.display = 'none';
				document.getElementById('ghost').style.visibility = 'hidden';
				ghostAppeared = false;
			},t)
		}

	});

	socket.on('ghostHunt',(state, c, gdeg, fp)=>{

		if(state){
			if(doorN != true){
				obstacles.push({
					x:-1381,
					y:103,
					x2:-1133,
					y2:128
				});
				doorN = true;
			}
			if(ghostHuntS == false){
				ghostHuntTimer = setTimeout(ghostHuntLight,getRandom(300,1500))
			}
			ghostHuntS = true;
			document.getElementById('ghost').style.visibility = 'visible';
			document.getElementById('ghost').style.display = 'inline-block';
			ghostM.x = c[0];
			ghostM.y = c[1];
			ghostM.deg = gdeg;
			if(fp == mynum){
				
			}
		}
		else{
			clearTimeout(ghostHuntTimer);
			doorN = false
			obstacles.pop();
			ghostHuntS = false;
			document.getElementById('ghost').style.display = 'none';
			document.getElementById('ghost').style.visibility = 'hidden';
		}

	});
	socket.on('killPlayer', (n,splayers)=>{
		players = splayers;
		n = Number(n)
		//console.log('Killing player '+n)
		//console.log('me '+mynum)
		if(n == mynum){
			//console.log("I'm dead")
			gamediv.style.display = 'none';
			logindiv.style.display = 'block';
			lobbydiv.style.display = 'none';
			gameStarted = false;
			logindiv.textContent = 'Ты умер';
			logindiv.style.fontSize = '70px';
			logindiv.style.fontFamily = 'vcr';
			logindiv.style.padding = '30%';
		}
		players[n].dead = true;
	});
	socket.on('myItems',(splayers)=>{
		players = splayers;
	});
	socket.on('shelfs',(s1,s2,m)=>{
		shelfs = s1;
		shelfs2 = s2;
		for(let i = 0; i < shelfs.length; i++){
			if(shelfs[i].taken){
				document.getElementById(shelfs[i].item).style.visibility = 'hidden';
			}
			else{
				document.getElementById(shelfs[i].item).style.visibility = 'visible';
			}
		}
		for(let i = 0; i < shelfs2.length; i++){
			if(shelfs2[i].taken){
				document.getElementById(shelfs2[i].item).style.visibility = 'hidden';
			}
			else{
				document.getElementById(shelfs2[i].item).style.visibility = 'visible';
			}	
		}
	});
	socket.on('playSound',(s,v)=>{
		//console.log('Playing '+s+' with a volume of '+v*100+'%')
		play(s,v);
	});
	socket.on('crucifixBurn',()=>{
		if(slots[slotsel].item == 'shelfcrucifix' || slots[slotsel].item == 'shelfcrucifix2'){
			slots[slotsel].itemstate--;
		}
	});
	socket.on('ip',(ipS)=>{
		ip = ipS;
		ipD.textContent = ipS;
	})
	socket.on('endGame',()=>{
		gamediv.style.display = 'none';
		logindiv.style.display = 'block';
		lobbydiv.style.display = 'none';
		namediv.style.display = 'inline-block';
		nameinput.style.display = 'none';
		namebutton.style.display = 'none';
		idlehouse.stop();
		evploop.stop();
		idlestreet.stop();
		gameStarted = false;
		if(possibleGhostsArray[line4].name == ghostType.name){
			namediv.textContent = 'You guessed the ghost. The ghost was a '+possibleGhostsArray[line4].name;
		}
		else{
			namediv.textContent = "You didn't get the ghost. The ghost was a "+possibleGhostsArray[line4].name;
		}
		
	});
});
for(let i = 0; i<4; i++){
	players.push({
				name:null,
				x:113,
				y:2339,
				rotation:90,
				item:null,
				itemstate:null,
				skin:i,
				id:null,
				host:false,
				disconnected:true,
				room:13,
				dead: false
			});
}
for(let i = 0; i<4; i++){
		if(i == mynum){
			createPlayer(players[i].x,players[i].y, true, players[i].skin);
		}
		else{
			createPlayer(players[i].x,players[i].y, false, players[i].skin);
		}
}
socket.emit('myItems', slots, slotsel);
changeItem();
document.getElementById('slot0').style.backgroundImage = 'url("slot.png")';
for(let i=0; i<=90; i++){
	keys[i] = false;
}

function FpsCtrl(fps, callback) {

    var delay = 1000 / fps,                              
        time = null,                                      
        frame = -1,                                      
        tref;                                            

    function loop(timestamp) {
        if (time === null) time = timestamp;              
        var seg = Math.floor((timestamp - time) / delay); 
        if (seg > frame) {                                
            frame = seg;                                  
            callback({                                   
                time: timestamp,
                frame: frame
            })
        }
        tref = requestAnimationFrame(loop)
    }


this.isPlaying = false;

this.frameRate = function(newfps) {
    if (!arguments.length) return fps;
    fps = newfps;
    delay = 1000 / fps;
    frame = -1;
    time = null;
};

this.start = function() {
    if (!this.isPlaying) {
        this.isPlaying = true;
        tref = requestAnimationFrame(loop);
    }
};

this.pause = function() {
    if (this.isPlaying) {
        cancelAnimationFrame(tref);
        this.isPlaying = false;
        time = null;
        frame = -1;
    }
};
}
let fc = new FpsCtrl(frames, function(e) {
	checkKeys();

	/*playerElem.style.top = player_y + 'px';
	playerElem.style.left = player_x + 'px';*/
	if(spectatingPlayer == 'no'){
		//fogofwar.style.transform = "rotate("+ degree +"deg)";
		if(!cameraModeState){
			light.style.transform = "rotate("+ degree +"deg)";
		}
		else{
			light.style.transform = 'rotate('+cameraMassive[lastCameraSelected].deg+'deg)'
		}
		playerElem.style.transform = "scale(0.84) translate(calc(-50% - 7px), calc(-50% - 10px)) rotate("+ degree +"deg)";
	}
	else{
		light.style.transform = 'rotate('+ players[spectatingPlayer].rotation +'deg)';
	}
	//map.style.transform = "translate(calc(-50% - " +player_x+ "px), calc(-50% - "+player_y+"px))";
	movePlayer();
	coords.textContent = 'X: '+player_x+', Y: '+player_y;
	changeFog();
	for(let i = 0; i<ufm.length;i++){
		let footposx = player_x - ufm[i].x;
		let footposy = player_y - ufm[i].y;
		uf.children[ i ].style.transform = "translate(calc(-50% - "+footposx+"px), calc(-50% - "+footposy+"px)) scale(0.84) rotate("+ufm[i].degree+"deg)";
	}
	for(let i = 0; i<itemlist.length;i++){
		saltposx = player_x - itemlist[i].x;
		saltposy = player_y - itemlist[i].y;
		itemsmap.children[ i ].style.transform = "translate(calc(-50% - "+saltposx+"px), calc(-50% - "+saltposy+"px)) scale(0.84) rotate("+itemlist[i].deg+"deg)";
	}
	if(ghostAppeared || ghostHuntS){
		let ghposx = player_x - ghostM.x
		let ghposy = player_y - ghostM.y;
		document.getElementById('ghost').style.transform = "translate(calc(-50% - "+ghposx+"px), calc(-50% - "+ghposy+"px)) rotate("+ghostM.deg+"deg) scale(0.84)" ;
	}
	
	for(let i = 0; i<orblist.length;i++){
		let orbposx = player_x - orblist[i].x;
		let orbposy = player_y - orblist[i].y;
		orbmap.children[ i ].style.transform = "translate(calc(-50% - "+orbposx+"px), calc(-50% - "+orbposy+"px)) scale(0.84)";

				if(cameraModeState){
					if(player_x == itemlist[orblist[0].n].x && player_y == itemlist[orblist[0].n].y){
						orbmap.children[orblist[0].n].style.visibility = 'visible';
						orbmap.children[orblist[0].n].style.display = 'inline-block';
					}
					else{
						orbmap.children[orblist[0].n].style.visibility = 'hidden';
						orbmap.children[orblist[0].n].style.display = 'none';
					}

				}
				else{
					orbmap.children[orblist[0].n].style.visibility = 'hidden';
					orbmap.children[orblist[0].n].style.display = 'none';
				}
			}
	for(let i = 0; i<players.length;i++){
		playerposx = player_x - players[i].x;
		playerposy = player_y - players[i].y;
		playerMap.children[ i ].style.transform = "translate(calc(-50% - "+playerposx+"px), calc(-50% - "+playerposy+"px)) scale(0.84) rotate("+players[i].rotation+"deg)";
		if(players[i].disconnected || players[i].dead){
			playerMap.children[ i ].style.visibility = 'hidden';
			playerMap.children[ i ].style.display = 'none';	
		}
		else{
			playerMap.children[ i ].style.visibility = 'visible';
			playerMap.children[ i ].style.display = 'inline-block';	
		}
		if(gameStarted){
			if(dontChange){
				playerMap.children[ mynum ].style.visibility = 'visible';
				playerMap.children[ mynum ].style.display = 'inline-block';	
			}
			else{
				playerMap.children[ mynum ].style.visibility = 'hidden';
				playerMap.children[ mynum ].style.display = 'none';
			}
			if(spectatingPlayer != 'no'){
				playerMap.children[ spectatingPlayer ].style.visibility = 'hidden';
				playerMap.children[ spectatingPlayer ].style.display = 'none';
			}
		}
	}

	if(spectatingPlayer != 'no'){
		player_x = players[Number(spectatingPlayer)].x;
		player_y = players[Number(spectatingPlayer)].y;
		playerElem.style.transform = "scale(0.84) translate(calc(-50% - 7px), calc(-50% - 10px)) rotate("+ players[Number(spectatingPlayer)].rotation +"deg)";
	}
	if(gameStarted){
		if(!cameraModeState){
			socket.emit('iMoved',mynum, player_x, player_y, degree, slots[slotsel].item, slots[slotsel].itemstate);
		}
	}
	moveMiniMap();
	room.textContent = fc.frameRate();


});
fc.start();
/*let ie = 0;
setInterval(()=>{
		itemHand.style.backgroundImage = "url('items/e"+ie+".png')";
		ie++;
		if(ie==6){
			ie = 0;
		}
},1000);*/
let truck = {
	x:-825,
	y:2219,
	x2:801,
	y2:2678
};
let curZoom = 1;

window.addEventListener('wheel', function(event)
{
 if (event.deltaY > 0)
 {
  if(keys[17]){
  	if(curZoom>0.4){
  		curZoom = curZoom - 0.2;
  	}
  	webFrame.setZoomFactor(curZoom)
  	socket.emit('zoom', curZoom)
  }
 }
 else if (event.deltaY < 0)
 {
  if(keys[17]){
  	if(curZoom<2.8){
  		curZoom = curZoom + 0.2;
  	}
  	webFrame.setZoomFactor(curZoom)
  	socket.emit('zoom', curZoom)
  }
 }
});
document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
	console.log(e.keyCode);
	if(focusedKey === null){
		if(!gameStarted){
			switch(e.keyCode){
				case 13:
					if(document.getElementById('nameinput') === document.activeElement && playerName === null){
						if(nameinput.value.length<=14 && nameinput.value.length>=2){
							nameinput.placeholder = '';
							playerName = document.getElementById('nameinput').value;
							nameinput.value = ''
							namediv.style.display = 'none';
							lobbydiv.style.display = 'inline-block';
							socket.emit('playerName',playerName);
						}
						else{
							nameinput.value = '';
							nameinput.placeholder = 'from 2 to 14';
						}
					}
					else if(players[mynum].host && playerName != null){
						socket.emit('startGame');
					}
				break;
			}
		}
		if(gameStarted){
			if(pauseMenu){
				switch(e.keyCode){
					case 27:
					case kF.pauseBtn:
						if(pauseMenu){
							resumeGame()
						}
						else{
							pauseGame()
						}
					break;
				}
				return;
			}
			switch(e.keyCode){
				case 27:
				case kF.pauseBtn:
					// 27
					if(!inventoryopen || !miniMapOpen || !sanityMapOpen || !journalopen || cameraModeState){
						inventoryopen = true;
						miniMapOpen = true;
						sanityMapOpen = true;
						journalopen = true;
						stuck = false;
						for(let i = 0; i < shelfs.length; i++){
							if(shelfs[i].taken){
								document.getElementById(shelfs[i].item).style.visibility = 'hidden';
							}
							else{
								document.getElementById(shelfs[i].item).style.visibility = 'visible';
							}
						}
						if(cameraModeState){
							cameraMode(false);
						}
						shelfmenu.style.display = 'none';
						shelfmenu.style.visibility = 'hidden';
						inventoryopen = true;
						shelfmenu2.style.display = 'none';
						shelfmenu2.style.visibility = 'hidden';
						inventoryopen = true;
						miniMap.style.display = 'none';
						miniMap.style.visibility = 'hidden';
						miniMapOpen = true;
						sanityMap.style.display = 'none';
						sanityMap.style.visibility = 'hidden';
						sanityMapOpen = true;
						journalmenu.style.display = 'none';
						journalmenu.style.visibility = 'hidden';
						journalopen = true;
					}
					else{
						if(pauseMenu){
							resumeGame()
						}
						else{
							pauseGame()
						}
					}
					break;
				case kF.arlBtn:
					// 37
					if(!cameraModeState){
						//player_x--;
					}
					else{
						lastCameraSelected--
						if(lastCameraSelected < 0){
							lastCameraSelected = cameraMassive.length-1;
						}
						cameraMode(true)
					}
					break;
				case kF.arrBtn:
					// 39
					if(!cameraModeState){
						//player_x++;
					}
					else{
						lastCameraSelected++
						if(lastCameraSelected == cameraMassive.length || lastCameraSelected >= totalCameras){
							lastCameraSelected = 0;
						}
						cameraMode(true)
					}
					break;
				case kF.fslBtn:
					// 49
					sH();
					slotsel = 0;
					if(holdingCamera){
						holdingCamera = false;
						totalCameras--;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					if(evpOn){
						evpOn = false;
						evploop.pause()
					}
					if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					else if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera2'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					socket.emit('myItems', slots, slotsel);
					changeItem();
					document.getElementById('slot0').style.backgroundImage = 'url("slot.png")';
					document.getElementById('slot1').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot2').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot3').style.backgroundImage = 'url("slot2.png")';
					break;
				case kF.hideBtn:
					// 32
					if (handHidden){
						document.getElementById('itemHand').style.visibility = 'visible'
					}
					else{
						document.getElementById('itemHand').style.visibility = 'hidden'
					}
					handHidden = !handHidden;

					break;
				case kF.sslBtn:
					// 50
					sH();
					slotsel = 1;
					if(holdingCamera){
						holdingCamera = false;
						totalCameras--;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					if(evpOn){
						evpOn = false;
						evploop.pause()
					}
					if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					else if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera2'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					socket.emit('myItems', slots, slotsel);
					changeItem();
					document.getElementById('slot0').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot1').style.backgroundImage = 'url("slot.png")';
					document.getElementById('slot2').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot3').style.backgroundImage = 'url("slot2.png")';
					break;
				case kF.tslBtn:
					// 51
					sH();
					slotsel = 2;
					if(holdingCamera){
						holdingCamera = false;
						totalCameras--;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					if(evpOn){
						evpOn = false;
						evploop.pause()
					}
					if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					else if(slots[slotsel].itemstate == true && slots[slotsel].item == 'shelfcamera2'){
						holdingCamera = true;
						totalCameras++;
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					socket.emit('myItems', slots, slotsel);
					changeItem();
					document.getElementById('slot0').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot1').style.backgroundImage = 'url("slot2.png")';
					document.getElementById('slot2').style.backgroundImage = 'url("slot.png")';
					document.getElementById('slot3').style.backgroundImage = 'url("slot2.png")';
					break;
				case kF.pickBtn:
					// 69
					if(cameraModeState){
						cameraMode(false);
					}
					else{
						pickupItem();
						owidth = -308 + 716
						oheight = 2409 - 2345
						if (player_x < -716 + owidth &&
							player_x + 110 > -716 &&
							player_y < 2345 + oheight &&
							player_y + 110 > 2345) {
							if(inventoryopen){
								stuck = true;
								for(let i = 0; i < shelfs.length; i++){
									if(shelfs[i].taken){
										document.getElementById(shelfs[i].item).style.visibility = 'hidden';
									}
									else{
										document.getElementById(shelfs[i].item).style.visibility = 'visible';
									}
								}
								shelfmenu.style.visibility = 'visible';
								shelfmenu.style.display = 'inline';
								inventoryopen = false;
							}
							else{
								for(let i = 0; i < shelfs.length; i++){
									if(shelfs[i].taken){
										document.getElementById(shelfs[i].item).style.visibility = 'hidden';
									}
									else{
										document.getElementById(shelfs[i].item).style.visibility = 'visible';
									}
								}
								stuck = false;
								shelfmenu.style.display = 'none';
								shelfmenu.style.visibility = 'hidden';
								inventoryopen = true;
							}
						}
						owidth = 169 + 159
						oheight = 2409 - 2345
						if (player_x < -159 + owidth &&
							player_x + 110 > -159 &&
							player_y < 2345 + oheight &&
							player_y + 110 > 2345) {
							if(inventoryopen){
								for(let i = 0; i < shelfs2.length; i++){
									if(shelfs2[i].taken){
										document.getElementById(shelfs2[i].item).style.visibility = 'hidden';
									}
									else{
										document.getElementById(shelfs2[i].item).style.visibility = 'visible';
									}
								}
								stuck = true;
								shelfmenu2.style.visibility = 'visible';
								shelfmenu2.style.display = 'inline';
								inventoryopen = false;
							}
							else{
								stuck = false;
								shelfmenu2.style.display = 'none';
								shelfmenu2.style.visibility = 'hidden';
								inventoryopen = true;
							}
						}
						owidth = -404 + 756;
						oheight = 2610 - 2577;
						if(player_x < -756 + owidth &&
							player_x + 110 > -756 &&
							player_y < 2577 + oheight &&
							player_y + 110 > 2577){
								if(miniMapOpen){
									stuck = true;
									miniMap.style.visibility = 'visible';
									miniMap.style.display = 'inline';
									miniMapOpen = false;
								}
								else{
									stuck = false;
									miniMap.style.display = 'none';
									miniMap.style.visibility = 'hidden';
									miniMapOpen = true;
								}
							}
						owidth = -71 + 391;
						oheight = 2610 - 2577;
						if(player_x < -391 + owidth &&
							player_x + 110 > -391 &&
							player_y < 2577 + oheight &&
							player_y + 110 > 2577){
								//console.log('Noddd')
								if(sanityMapOpen){
									stuck = true;
									sanityMap.style.visibility = 'visible';
									sanityMap.style.display = 'inline';
									sanityMapOpen = false;
								}
								else{
									stuck = false;
									sanityMap.style.display = 'none';
									sanityMap.style.visibility = 'hidden';
									sanityMapOpen = true;
								}
							}
						owidth = 800 - 440;
						oheight = 2419 - 2331;
						if (player_x < 440 + owidth &&
							player_x + 110 > 440 &&
							player_y < 2331 + oheight &&
							player_y + 110 > 2331) {
							cameraMode(false);
						}
					}
					break;
				case kF.jourBtn:
					// 74
						if(journalopen){
							stuck = true;
							journalmenu.style.visibility = 'visible';
							journalmenu.style.display = 'inline';
							journalopen = false;
						}
						else{
							stuck = false;
							journalmenu.style.display = 'none';
							journalmenu.style.visibility = 'hidden';
							journalopen = true;
						}
					
					break;
				case kF.leaveBtn:
					// 76
					owidth = 811 + 825
					oheight = 2613 - 2161
					//console.log('help')
					if (player_x < -825 + owidth &&
						player_x + 110 > -825 &&
						player_y < 2161 + oheight &&
						player_y + 110 > 2161) {
						inTruck = true;
						for(let i = 0; i < 4; i++){
							owidth = 811 + 825
							oheight = 2613 - 2161
							if(i!=mynum){
								if (players[i].x < -825 + owidth &&
									players[i].x + 110 > -825 &&
									players[i].y < 2161 + oheight &&
									players[i].y + 110 > 2161) {
									
								}
								else{
									inTruck = false;
								}
							}
						}
						if(inTruck){
							gamediv.style.display = 'none';
							logindiv.style.display = 'block';
							lobbydiv.style.display = 'none';
							namediv.style.display = 'inline-block';
							nameinput.style.display = 'none';
							namebutton.style.display = 'none';
							idlehouse.stop();
							evploop.stop();
							idlestreet.stop();
							gameStarted = false;
							if(possibleGhostsArray[line4].name == ghostType.name){
								namediv.textContent = 'You guessed the ghost. The ghost was a '+ghostType.name;
							}
							else{
								namediv.textContent = "You didn't guess the ghost. The ghost was a "+ghostType.name;
							}
							socket.emit('endGame');
						}
						
					}
					break;
				case kF.useBtn:
					// 70
					useItem();
					break;
				case kF.dropBtn:
					// 71
					if(evpOn){
						evpOn = false;
						evploop.pause()
					}
					if(slots[slotsel].item!=0){
						if(slots[slotsel].item == 'shelfcamera' || slots[slotsel].item == 'shelfcamera2'){
							if(holdingCamera){
								totalCameras--
								holdingCamera = false;
								socket.emit('holdingCamera', holdingCamera, mynum)
							}
							let salt = document.createElement('div');
							salt.classList.add('camera');
							itemlist.push({
							x : player_x,
							y : player_y,
							deg : degree,
							t : 3,
							itemstate: slots[slotsel].itemstate,
							item: slots[slotsel].item,
							room: curRoom
							});
							if(slots[slotsel].itemstate == true){
								totalCameras++;
							}
							itemsmap.append(salt);
							slots[slotsel].item = 0;
							socket.emit('spawnedCamera',player_x,player_y,degree,slots[slotsel].itemstate, slots[slotsel].item, curRoom);
							slots[slotsel].itemstate = null;
							document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
							document.getElementById('itemHand').style.visibility = 'hidden';
						}
						else if(slots[slotsel].item == 'shelfbook' || slots[slotsel].item == 'shelfbook2'){
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
							socket.emit('spawnedBook',player_x,player_y, degree,slots[slotsel].itemstate, slots[slotsel].itemstate, curRoom);
							slots[slotsel].item = 0;
							slots[slotsel].itemstate = null;
							document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
							document.getElementById('itemHand').style.visibility = 'hidden';
						}
						else{
							switch(slots[slotsel].item){
								case 'shelfsflashlight':
								case 'shelfsflashlight2':
									//fogofwar.style.background = 'radial-gradient(circle, transparent,black 345px)';
									lightMode = false
									break;
								case 'shelfflashlight2':
								case 'shelfflashlight':
									//fogofwar.style.background = 'radial-gradient(circle, transparent,black 345px)';
									lightMode = false
									break;
								case 'shelfufflashlight':
								case 'shelfufflashlight2':
									lightMode = false
									uf.style.display = 'none';
									ufc.style.display = 'none';
									break;
							}
							document.getElementById(slots[slotsel].item).style.visibility = 'visible';
							for(let i=0;i<shelfs.length;i++){
							if(shelfs[i].item == slots[slotsel].item){
								shelfs[i].itemstate = slots[slotsel].itemstate;
								shelfs[i].taken = false;
								socket.emit('shelfs',shelfs, shelfs2, slots[slotsel].item)
								break;
							}
							}
							for(let i=0;i<shelfs2.length;i++){
							if(shelfs2[i].item == slots[slotsel].item){
								shelfs2[i].itemstate = slots[slotsel].itemstate;
								shelfs2[i].taken = false;
								socket.emit('shelfs',shelfs, shelfs2, slots[slotsel].item)
								break;
							}
							}
							itemHand.style.visibility='hidden';
							slots[slotsel].item = 0;
							slots[slotsel].itemstate = null;
							document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
						}
					}
					break;
				case 189:
					if(keys[17]){
						if(curZoom>0.4){
							curZoom = curZoom - 0.2;
						}
						webFrame.setZoomFactor(curZoom)
						socket.emit('zoom', curZoom)
					}
					break;
				case 187:
					if(keys[17]){
						if(curZoom<2.8){
							curZoom = curZoom + 0.2;
						}
						webFrame.setZoomFactor(curZoom)
						socket.emit('zoom', curZoom)
					}
			}
		}
	}
	else{
		console.log(kF[focusedKey]);
		kF[focusedKey] = e.keyCode;
		document.getElementById(focusedKey).textContent = keyboardMap[e.keyCode];
		saveKeys();
		document.getElementById(focusedKey).style.color = 'white';
		focusedKey = null;
	}
});

document.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false;
});
document.addEventListener('mousemove',(e)=>{
	center_x = window.innerWidth/2;
    center_y = window.innerHeight/2;
    mouse_x = e.pageX;
    mouse_y = e.pageY;
    radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    degree = (radians * (180 / Math.PI) * -1) + 180;
});
shelfmenu.addEventListener('click', (e)=>{
	if(e.target.id != "shelfmenu"){
				if(slots[slotsel].item != e.target.id){
					if(slots[slotsel].item!=0){
						if(evpOn){
							slots[slotsel].itemstate = false;
							evpOn = false;
							evploop.pause()
						}
						switch(slots[slotsel].item){
							case 'shelfsflashlight':
							case 'shelfsflashlight2':
							case 'shelfflashlight':
							case 'shelfflashlight2':
								lightMode = false;
								break;
							case 'shelfufflashlight':
							case 'shelfufflashlight2':
								lightMode = false;
								uf.style.display = 'none';
								ufc.style.display = 'none';
								break;
						}
						for(let i = 0; i < shelfs2.length; i++){
							if(slots[slotsel].item == shelfs2[i].item){
								shelfs2[i].taken = false;
							}
						}
						document.getElementById(slots[slotsel].item).style.visibility = 'visible';
						for(let i=0;i<shelfs.length;i++){
						if(shelfs[i].item == slots[slotsel].item){
							shelfs[i].itemstate = slots[slotsel].itemstate;
							break;
						}
					}
					if(holdingCamera){
						holdingCamera = false;
						totalCameras--
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					}
					document.getElementById(e.target.id).style.visibility = 'hidden';
					////console.log(slots[slotsel].item)
					slots[slotsel].item = e.target.id;
					for(let i=0;i<shelfs.length;i++){
						if(shelfs[i].item == e.target.id){
							slots[slotsel].itemstate = shelfs[i].itemstate;
							break;
						}
					}
					switch(e.target.id){
						case 0:
							document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
							break;
						case 'shelfcamera':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/cameraoff.png")';
							
							break;
						case 'shelfemf':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/e0.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '7vh';
							break;
						case 'shelfsflashlight':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/extralightneroff.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
							slots[slotsel].itemstate = false
							break;
						case 'shelfflashlight':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/flashlight.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
							slots[slotsel].itemstate = false
							break;
						case 'shelfbook':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/notebookf.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
							break;
						case 'shelfcrucifix':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/crucifix.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
							break;
						case 'shelfphotocamera':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '9vh';
							break;
						case 'shelfspiritbox':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/spiritboxoff.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '6vh';
							slots[slotsel].itemstate = false
							break;
						case 'shelfpills':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/restful.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
							break;
						case 'shelfsalt':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/salt.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '6vh';
							break;
						case 'shelfthermometer':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/thermometeroff.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '4vh';
							break;
						case 'shelfufflashlight':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/ufoff.png")';
							//document.getElementById('slotitem'+slotsel).style.backgroundSize = '5vh';
							slots[slotsel].itemstate = false;
							lightMode = false;
							uf.style.display='none'
							ufc.style.display='none'
							
							break;
					}
					for(let i = 0; i < shelfs.length; i++){
						if(slots[slotsel].item == shelfs[i].item){
							shelfs[i].taken = true;
							socket.emit('shelfs', shelfs, shelfs2, shelfs[i].item)
						}
					}
					socket.emit('myItems', slots, slotsel);
					changeItem();
				}
	}
});
shelfmenu2.addEventListener('click', (e)=>{
	////console.log(e.target.id);
	if(e.target.id != "shelfmenu2"){
				if(slots[slotsel].item != e.target.id){
					if(slots[slotsel].item!=0){
						if(evpOn){
							slots[slotsel].itemstate = false;
							evpOn = false;
							evploop.pause()
						}
						switch(slots[slotsel].item){
							case 'shelfsflashlight':
							case 'shelfsflashlight2':
								lightMode = false;
								fogSize = 250;
								break;
							case 'shelfflashlight':
							case 'shelfflashlight2':
								lightMode = false
								fogSize = 250;
								break;
							case 'shelfufflashlight':
							case 'shelfufflashlight2':
								lightMode= false
								uf.style.display = 'none';
								ufc.style.display = 'none';
								break;
						}
						for(let i = 0; i < shelfs2.length; i++){
							if(slots[slotsel].item == shelfs2[i].item){
								shelfs2[i].taken = false;
							}
						}
						document.getElementById(slots[slotsel].item).style.visibility = 'visible';
						for(let i=0;i<shelfs2.length;i++){
						if(shelfs2[i].item == slots[slotsel].item){
							shelfs2[i].itemstate = slots[slotsel].itemstate;
							break;
						}
					}
					if(holdingCamera){
						holdingCamera = false;
						totalCameras--
						socket.emit('holdingCamera',holdingCamera, mynum);
					}
					}
					document.getElementById(e.target.id).style.visibility = 'hidden';
					////console.log(slots[slotsel].item)
					slots[slotsel].item = e.target.id;
					for(let i=0;i<shelfs2.length;i++){
						if(shelfs2[i].item == e.target.id){
							slots[slotsel].itemstate = shelfs2[i].itemstate;
							shelfs2[i].taken = true;
							socket.emit('shelfs', shelfs, shelfs2, shelfs2[i].item)
							break;
						}
					}
					switch(e.target.id){
						case 0:
							document.getElementById('slotitem'+slotsel).style.visibility = 'hidden';
							break;
						case 'shelfcamera2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/cameraoff.png")';
							
							break;
						case 'shelfemf2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/e0.png")';
							break;
						case 'shelfsflashlight2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/extralightneroff.png")';
							slots[slotsel].itemstate = false
							break;
						case 'shelfflashlight2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/flashlight.png")';
							slots[slotsel].itemstate = false
							break;
						case 'shelfbook2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/notebookf.png")';
							break;
						case 'shelfcrucifix2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/crucifix.png")';
							break;
						case 'shelfphotocamera2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/photocamera'+slots[slotsel].itemstate+'.png")';
							break;
						case 'shelfspiritbox2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/spiritboxoff.png")';
							slots[slotsel].itemstate = false
							break;
						case 'shelfpills2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/restful.png")';
							break;
						case 'shelfsalt2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/salt.png")';
							break;
						case 'shelfthermometer2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/thermometeroff.png")';
							break;
						case 'shelfufflashlight2':
							document.getElementById('slotitem'+slotsel).style.visibility = 'visible';
							document.getElementById('slotitem'+slotsel).style.backgroundImage = 'url("items/ufoff.png")';
							slots[slotsel].itemstate = false;
							lightMode = false;
							uf.style.display='none'
							ufc.style.display='none'
							
							break;
					}
					for(let i = 0; i < shelfs2.length; i++){
						if(slots[slotsel].item == shelfs2[i].item){
							shelfs2[i].taken = true;
							socket.emit('shelfs', shelfs, shelfs2, shelfs[i].item)
						}
					}
					socket.emit('myItems', slots, slotsel);
					changeItem();
				}
	}
});
let beforeFog = fogSize;
let cameraDeg = 129;

let cameraMassive = [
{
	x: -1424,
	y: 137,
	deg: 129,
	player: 'no',
}
];
let namefocus = false
nameinput.addEventListener('click',()=>{
	namefocus = true;
});
document.getElementById('namebutton').addEventListener('click',()=>{
	if(nameinput.value.length<=14 && nameinput.value.length>=2){
			nameinput.placeholder = '';
			playerName = document.getElementById('nameinput').value;
			nameinput.value = ''
			namediv.style.display = 'none';
			lobbydiv.style.display = 'inline-block';
			////console.log(playerName);
			socket.emit('playerName',playerName);
	}
	else{
		nameinput.value = '';
		nameinput.placeholder = 'from 2 to 14';
	}
});
document.getElementById('startbutton').addEventListener('click',()=>{
	socket.emit('startGame');
});
var idlestreet = new Howl({
	  src: ['sounds/idlestreet.m4a'],
	  loop:true,
	  autoplay:false,
	  volume:.2
	});
var evploop = new Howl({
	  src: ['sounds/EVP White Noise Loop.wav'],
	  loop:true,
	  autoplay:false,
	  volume:.2
});
var idlehouse = new Howl({
	src: ['sounds/idlehouse1.m4a'],
	loop:true,
	autoplay:false,
	volume:.2
});
let thirteen = false;
let line1 = 0,line2 = 0,line3 = 0, line4 = 0;
line1p.textContent = proofs[line1];
line2p.textContent = proofs[line2];
line3p.textContent = proofs[line3];
line1l.addEventListener('click',()=>{
	line1--
	if(line1<0){
		line1 = 6;
	}
	line1p.textContent = proofs[line1];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line2l.addEventListener('click',()=>{
	line2--
	if(line2<0){
		line2 = 6;
	}
	line2p.textContent = proofs[line2];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line3l.addEventListener('click',()=>{
	line3--
	if(line3<0){
		line3 = 6;
	}
	line3p.textContent = proofs[line3];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line1r.addEventListener('click',()=>{
	line1++
	if(line1>6){
		line1 = 0;
	}
	line1p.textContent = proofs[line1];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line2r.addEventListener('click',()=>{
	line2++
	if(line2>6){
		line2 = 0;
	}
	line2p.textContent = proofs[line2];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line3r.addEventListener('click',()=>{
	line3++
	if(line3>6){
		line3 = 0;
	}
	line3p.textContent = proofs[line3];
	play('JournalWritingSound', .2);
	possibleGhosts();
});
line4r.addEventListener('click',()=>{
	line4++
	if(line4>possibleGhostsArray.length-1){
		line4 = 0;
	}
	play('JournalWritingSound', .2);
	line4p.textContent = possibleGhostsArray[line4].name;
})
line4l.addEventListener('click',()=>{
	line4--
	if(line4<0){
		line4 = possibleGhostsArray.length-1;
	}
	play('JournalWritingSound', .2);
	line4p.textContent = possibleGhostsArray[line4].name;
})
backBtn.addEventListener('click',()=>{
	settingsMenu.style.display = 'none';
	document.getElementById('pauseMenu').style.display = 'inline-block';
	if(focusedKey != null){
		document.getElementById(focusedKey).style.color = 'white';
		focusedKey = null;
	}
})
exitBtn.addEventListener('click',()=>{
	if(players[mynum].host){
		socket.emit('exit',true);
		return;
	}
	socket.emit('exit',false);
})
settingsBtn.addEventListener('click',()=>{
	settingsMenu.style.display = 'inline-block';
	document.getElementById('pauseMenu').style.display = 'none';
})
resumeBtn.addEventListener('click',resumeGame);
ipC.addEventListener('click', ()=>{
	cb.writeSync(ip);
})
resetBtn.addEventListener('click',resetKeys);
buttons.addEventListener('click',keyChange);
loadKeys();