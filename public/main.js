
'use strict';

const socket_config = { transports: ['websocket'], upgrade: false, autoConnect: false };
const {webFrame, ipcRenderer} = require('electron');

const socket = io(  );
ipcRenderer.on('hello',(a)=>{
	//console.log(a);
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

let ghostHuntTimer;
let doorN
let keys = []
let player_x = 113;
let player_y = 2399;
let gameStarted = false;
let serverFull = false;
let movingID = null;
let movingRight = false;
let speedX = 0
let speedY = 0
let maxSpeed = 20;
let degree = 0;
let ghpFog;
let ghState;
let radians;
let mouse_y;
let orbTimer;
let orblist = []
let mouse_x;
let center_y;
let center_x;
let sx = 0;
let sy = 0;
let se = 0;
let pickedGhost;
let ufm = [];
let itemlist = [];
let spectatingPlayer = 'no'
let players = [];
let itemCount = 0;
let sprinting = false;
let saltposx
let saltposy
let playerposx;
let playerposy;
let slotsel=0;
let inventoryopen = true;
let player_xprev = -1305;
let player_yprev = 52;
let player_xnext;
let player_ynext;
let owidth;
let playerName = null;
let pauseMenu = false;
let oheight;
let mynum;
let thermometeron = false;
let emfon = false;
let ghostRoom;
let freezingTemps = false;
let curRoom;
let ghostType;
let ghost = null;
let emf5 = false;
let writing = false;
let journalopen =true;
let freezingProof = false;
let emfProof = false;
let writingProof = false;
let footprintProof = false;
let spiritboxProof = false;
let orbProof = false;
let handHidden = false;
let beforeCameraX;
let beforeCameraY;
let cameraModeState = false;
let allowMoveX = true;
let allowMoveY = true;
let stuck = false;
let lightMode = false;
let mySanity = 100;
let activity = 0;
let ghostHuntS = false;
let totalCameras = 1;
let lastCameraSelected = 0;
let timeInterval;
let holdingCamera = false;
let dontChange = false;
let frames = 60;
let fogSize = 250;
let prevFog = 0;
let emfPower = 1;
let inTruck = false;
let idlePlaying = false;
let idleStreetPlaying = false;
let evpOn = false;
let frozen = false;
let ghostAppeared = false;
let idleId;
let ip;
let flashlightMode = 0;
let sanityMapOpen = true;
let miniMapOpen = true;
let possibleGhostsArray = [{name:'Unknown'}];
let menu = false;
inventoryopen = true;
miniMapOpen = true;
sanityMapOpen = true;
journalopen = true;
let proofs = [
	'Unknown',
	'EMF-5',
	'Freezing temperatures',
	'Ghost Writing',
	'Ghost Orb',
	'Finger Prints',
	'Spirit Box'
];
let ghostM = {
	x: 0,
	y: 0,
	deg: 0
};
let rooms = [
	{
		name:'boy',
		x:-2528,
		y:174,
		x2:-1838,
		y2:881 //Malchik 1
	},
	{
		name:'boy',
		x:-1838,
		y:174,
		x2:-1486,
		y2:516// Malchik 2
	},
	{
		name:'corridor',
		x:-1412,
		y:-1372,
		x2:-1089,
		y2:96 // Koridor 1
	},
	{
		name:'corridor',
		x:-1815,
		y:-1320,
		x2:-1486,
		y2:92 // Koridor 2
	},
	{
		name:'children',
		x:-2526,
		y:-2080,
		x2:-1892,
		y2:-1007 // Detskaya
	},
	{
		name:'bedroom',
		x:-2524,
		y:-2868,
		x2:-1493,
		y2:-2169 // Spalna
	},
	{
		name:'laundry',
		x:-691,
		y:-1713,
		x2:-60,
		y2:-1015 // Прачечная
	},
	{
		name:'garage',
		x:-740,
		y:-928,
		x2:933,
		y2:861 // Гараж
	},
	{
		name:'livingroom',
		x:-1421,
		y:-3218,
		x2:-417,
		y2:-1765 // Гостинная
	},
	{
		name:'kitchen',
		x:-14,
		y:-3207,
		x2:933,
		y2:-997 // kuhna
	},
	{
		name:'stairs',
		x:-402,
		y:-3222,
		x2:-10,
		y2:-2746
	},
	{
		name:'stairs2',
		x:-4259,
		y:-2229,
		x2:-3749,
		y2:-2013
	},
	{
		name:'under',
		x:-4350,
		y:-3491,
		x2:-3338,
		y2:-2463
	}
]
let slots = [
	{
		item:0,
		itemstate:null
	},
	{
		item:0,
		itemstate:null
	},
	{
		item:0,
		itemstate:null
	},
	{
		item:0,
		itemstate:null
	}
];
//console.log('Generating players')
//loadSounds();
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
	//console.log('Created player '+ players.length);
}
for(let i = 0; i<4; i++){
		if(i == mynum){
			createPlayer(players[i].x,players[i].y, true, players[i].skin);
		}
		else{
			createPlayer(players[i].x,players[i].y, false, players[i].skin);
		}
}
let shelfs = [
	{
		item:'shelfcamera',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfemf',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfsflashlight',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfflashlight',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfbook',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfcrucifix',
		itemstate:2,
		taken: false
	},
	{
		item:'shelfphotocamera',
		itemstate:5,
		taken: false
	},
	{
		item:'shelfspiritbox',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfpills',
		itemstate:true,
		taken: false
	},
	{
		item:'shelfsalt',
		itemstate:3,
		taken: false
	},
	{
		item:'shelfthermometer',
		itemstate:0,
		taken: false
	},
	{
		item:'shelfufflashlight',
		itemstate:false,
		taken: false
	}
]
let shelfs2 = [
	{
		item:'shelfcamera2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfemf2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfsflashlight2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfflashlight2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfbook2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfcrucifix2',
		itemstate:2,
		taken: false
	},
	{
		item:'shelfphotocamera2',
		itemstate:5,
		taken: false
	},
	{
		item:'shelfspiritbox2',
		itemstate:false,
		taken: false
	},
	{
		item:'shelfpills2',
		itemstate:true,
		taken: false
	},
	{
		item:'shelfsalt2',
		itemstate:3,
		taken: false
	},
	{
		item:'shelfthermometer2',
		itemstate:0,
		taken: false
	},
	{
		item:'shelfufflashlight2',
		itemstate:false,
		taken: false
	}
]
socket.emit('myItems', slots, slotsel);
changeItem();
document.getElementById('slot0').style.backgroundImage = 'url("slot.png")';
for(let i=0; i<90; i++){
	keys[i] = false;
}

function FpsCtrl(fps, callback) {

    var delay = 1000 / fps,                               // calc. time per frame
        time = null,                                      // start time
        frame = -1,                                       // frame count
        tref;                                             // rAF time reference

    function loop(timestamp) {
        if (time === null) time = timestamp;              // init start time
        var seg = Math.floor((timestamp - time) / delay); // calc frame no.
        if (seg > frame) {                                // moved to next frame?
            frame = seg;                                  // update
            callback({                                    // callback function
                time: timestamp,
                frame: frame
            })
        }
        tref = requestAnimationFrame(loop)
    }

// play status
this.isPlaying = false;

// set frame-rate
this.frameRate = function(newfps) {
    if (!arguments.length) return fps;
    fps = newfps;
    delay = 1000 / fps;
    frame = -1;
    time = null;
};

// enable starting/pausing of the object
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
function checkKeys(){
	if(keys[87]==true){
		speedY = -maxSpeed;
	}
	else if(keys[83]==true){
		speedY = maxSpeed;
	}
	if(keys[68]==true){
		speedX = maxSpeed;
	}
	else if(keys[65]==true){
		speedX = -maxSpeed;
	}
	if(keys[87] == false && keys[83] == false){
		speedY = 0;
	}
	if(keys[68] == false && keys[65] == false){
		speedX = 0;
	}

	if(keys[16] === true){
		maxSpeed = 60;
	}
	if(keys[16] === false){
		maxSpeed = 40;
	}
	if(keys[90] === true){
		maxSpeed = 20;
	}
	if(keys[90] === false){
		maxSpeed = 40;
	}
	if(keys[9]){
		ipD.style.visibility = 'visible';
	}
	else{
		ipD.style.visibility = 'hidden';
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
	//console.log(e.keyCode);
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
					console.log('you')
					if(pauseMenu){
						resumeGame()
					}
					else{
						pauseGame()
					}
				}
				break;
			case 37:
				if(!cameraModeState){
					player_x--;
				}
				else{
					lastCameraSelected--
					if(lastCameraSelected < 0){
						lastCameraSelected = cameraMassive.length-1;
					}
					cameraMode(true)
				}
				break;
			case 39:
				if(!cameraModeState){
					player_x++;
				}
				else{
					lastCameraSelected++
					if(lastCameraSelected == cameraMassive.length || lastCameraSelected >= totalCameras){
						lastCameraSelected = 0;
					}
					cameraMode(true)
				}
				break;
			case 38:
				player_y--;
				break;
			case 40:
				player_y++;
				break;
			case 49:
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
			case 32:
				if (handHidden){
					document.getElementById('itemHand').style.visibility = 'visible'
				}
				else{
					document.getElementById('itemHand').style.visibility = 'hidden'
				}
				handHidden = !handHidden;

				break;
			case 50:
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
			case 51:
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
			case 69:
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
			case 74:
			
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
			case 76:
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
			case 77:
				
				break;
			case 70:
				useItem();
				break;
			case 71:
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
						socket.emit('spawnedCamera',player_x,player_y,degree,slots[slotsel].itemstate, slots[slotsel].itemstate, curRoom);
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
		}
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
let thirteen = false;
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

let ghosts = [
	{
		name:"Фантом",
		freeze:true,
		emf:true,
		fingerprints:false,
		writing:false,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Банши",
		freeze:true,
		emf:true,
		fingerprints:true,
		writing:false,
		spiritbox: false, 
		ghostorb: false
	},
	{
		name:"Джинн",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Ревенант",
		freeze:false,
		emf:true,
		fingerprints:true,
		writing:true,
		spiritbox: false, 
		ghostorb: false
	},
	{
		name:"Тень",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:true,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Они",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Призрак",
		freeze:true,
		emf:false,
		fingerprints:true,
		writing:false,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Мара",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Демон",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Юрей",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:true,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Полтергейст",
		freeze:false,
		emf:false,
		fingerprints:true,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Дух",
		freeze:false,
		emf:false,
		fingerprints:true,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},

]
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
exitBtn.addEventListener('click',()=>{
	if(players[mynum].host){
		socket.emit('exit',true);
		return;
	}
	socket.emit('exit',false);
})
settingsBtn.addEventListener('click',()=>{

})
resumeBtn.addEventListener('click',resumeGame);
function pauseGame(){
	pauseMenu = true;
	stuck = true;
	pauseScreen.style.display = 'inline-block'
}
function resumeGame(){
	pauseMenu = false;
	stuck = true;
	pauseScreen.style.display = 'none'
}