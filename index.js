'use strict';
let ip;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
	console.log('addr: ' + add);
	ip = add;
  })
const { app, BrowserWindow, ipcMain } = require( 'electron' );
const express = require('express');
const ap = express();
let renderWin;
const http = require('http').createServer(ap);
ipcMain.on('show-dialog',(a,b)=>{
	renderWin = a;
	a.reply('hello','Received '+b)
	console.log('Received start server command')
	port = b;
	createServer();	
})
ipcMain.on('hello',(event, arg)=>{
	event.reply('hello',arg);
	console.log(arg)
});
ipcMain.on('path',(event, arg)=>{
	win.webContents.openDevTools()
});
const io = require('socket.io')(http);
let port = 12321;
const players = [];
app.on( 'ready', onAppReady );
app.on('before-quit', ()=>{
	http.close();
})
let gameStarted = false;
let ghostRoom;
let ghostType;
let playerCount = 0;
let itemList = [];
let realActivity = 0;
let activity = 0;
let chance; 
let anger = 0.2;
let win;
let chanceCo = 0;
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
let ghosts = [
	{
		name:"Phantom",
		freeze:true,
		emf:true,
		fingerprints:false,
		writing:false,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Banshee",
		freeze:true,
		emf:true,
		fingerprints:true,
		writing:false,
		spiritbox: false, 
		ghostorb: false
	},
	{
		name:"Jinn",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Revenant",
		freeze:false,
		emf:true,
		fingerprints:true,
		writing:true,
		spiritbox: false, 
		ghostorb: false
	},
	{
		name:"Shadow",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:true,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Oni",
		freeze:false,
		emf:true,
		fingerprints:false,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Wraith",
		freeze:true,
		emf:false,
		fingerprints:true,
		writing:false,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Mare",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Demon",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},
	{
		name:"Yurei",
		freeze:true,
		emf:false,
		fingerprints:false,
		writing:true,
		spiritbox: false, 
		ghostorb: true
	},
	{
		name:"Poltergeist",
		freeze:false,
		emf:false,
		fingerprints:true,
		writing:false,
		spiritbox: true, 
		ghostorb: true
	},
	{
		name:"Spirit",
		freeze:false,
		emf:false,
		fingerprints:true,
		writing:true,
		spiritbox: true, 
		ghostorb: false
	},

]
let footprints = false;
let spiritbox = false;
let ghostorb = false;
let freeze = false;
let writing = false;
let emf = false;
let emfPower = 1;
let ghost;
let rooms = [
	{
		name:'boy',
		x:-2528,
		y:174,
		x2:-1838,
		y2:881
	},
	{
		name:'boy',
		x:-1838,
		y:174,
		x2:-1486,
		y2:516
	},
	{
		name:'corridor',
		x:-1412,
		y:-1372,
		x2:-1089,
		y2:96
	},
	{
		name:'corridor',
		x:-1815,
		y:-1320,
		x2:-1486,
		y2:92
	},
	{
		name:'children',
		x:-2526,
		y:-2080,
		x2:-1892,
		y2:-1007
	},
	{
		name:'bedroom',
		x:-2524,
		y:-2868,
		x2:-1493,
		y2:-2169
	},
	{
		name:'laundry',
		x:-691,
		y:-1713,
		x2:-60,
		y2:-1015
	},
	{
		name:'garage',
		x:-740,
		y:-928,
		x2:933,
		y2:861
	},
	{
		name:'livingroom',
		x:-1421,
		y:-3218,
		x2:-417,
		y2:-1765
	},
	{
		name:'kitchen',
		x:-14,
		y:-3207,
		x2:933,
		y2:-997
	},
	{
		name:'basement',
		x:-4206,
		y:-3215,
		x2:-3415,
		y2:-3022
	},
	{
		name:'basement',
		x:-3565,
		y:-3018,
		x2:-3419,
		y2:-2598
	},
]
let totalPlayers = 0;
function onAppReady(){
	const mainWindow = new BrowserWindow({
		center : true,
		height : 720,
		width : 1280,
		hideMenuBar: true,
		resizable:true,
		fullscreenable:true,
		autoHideMenuBar:true,
		icon: 'icons/icon.ico',
		backgroundColor:'#FFFFFF',
		webPreferences:{
			enableRemoteModule:true,
			nodeIntegration:true
		}
	})
	mainWindow.loadFile('public/main.html');
	mainWindow.setMenu(null);
	// /playSound(coords, 100, true, 'Clicker_idle_26',0.4)
	win = mainWindow;
}
//console.log('Generating player slots')
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
				room: 13,
				sanity: 100,
				dead: false
			});
	//console.log('Created player '+ players.length);
}



function createServer(){


ap.use(express.static(__dirname +'/public'));
io.on('connection', (socket) => {
  //console.log('ioServer : new socket connected');
				
		
		socket.on('disconnect', ()=>{
			console.log( 'socket disconnected' );
			for(let i=0; i<playerCount; i++){
				console.log(players[i].id + ' ' + socket.id);
				if(players[i].id==socket.id){
					players[i].disconnected = true;
					let isHost = false
					//console.log(players[i].name + ' left');
					if(players[i].host){
						isHost = true;
						players[i].host = false;
					}
					playerCount--;
					socket.broadcast.emit('removePlayer',players);
					if(isHost){
						let newHost = i+1;
						if(playerCount>0){
							while(true){
								if(players[newHost].disconnected === true){
									//console.log('New generated host is disconnected. Generating new one. The number was '+newHost)
									newHost++;
									if(newHost >= 4){
										newHost = 0;
									}
								}
								else{
									//console.log('Resuming with a new host #' + newHost);
									players[newHost].host = true;
									io.emit('newHost', newHost);
									break;
								}
							}
							
						}
					}
					break;
				}
			}
		})
		socket.emit('ip', ip+':'+port);
		if(playerCount>=4 || gameStarted){
			socket.emit('serverFull',true);
		}
		else{
			socket.emit('serverFull',false);
		}
		socket.on('playerName',(playerName)=>{
			let num;
			for(let i = 0; i<4; i++){
				if(players[i].disconnected == true){
					num = i;
					players[i].disconnected = false;
					players[i].name = playerName;
					players[i].x=113;
					players[i].y=2339;
					players[i].rotation=90;
					players[i].item = null;
					players[i].itemstate = null;
					players[i].skin = 0;
					players[i].host = false;
					players[i].id = socket.id;
					players[i].sanity = 100;
					break;
				}
			}
			playerCount++;
			if(playerCount == 1){
				players[0].host = true;
			}
			socket.emit('sendPlayers', players, num);
			
			socket.broadcast.emit('newPlayer',players);
			for(let i = 0; i < playerCount; i++){
				//console.log(players[i].name)
			}
		});
		socket.on('startGame',()=>{
			gameStarted = true;
			ghostRoom = getRandom(0,9);
			//console.log(ghostRoom);
			/*switch(ghostRoom){
				case 0:
					console.log('Boy bedroom');
				break;
				case 1:
					console.log('Corridor');
				break;
				case 2:
					console.log("Children's room");
				break;
				case 3:
					console.log('Main bedroom');
				break;
				case 4:
					console.log('Laundry');
				break;
				case 5:
					console.log('Garage');
				break;
				case 6:
					console.log('Living room');
				break;
				case 7:
					console.log('Kitchen');
				break;
				case 8:
					console.log('basement');
				break;
			}*/ // Print room
			ghostType = getRandom(0,10);
			//ghostType = 1
			//console.log(ghosts[ghostType]);
			//console.log(ghosts[ghostType])
			if(ghosts[ghostType].fingerprints){
				footprints = true
			}
			if(ghosts[ghostType].ghostorb){
				ghostorb = true;
			}
			if(ghosts[ghostType].spiritbox){
				spiritbox = true;
			}
			if(ghosts[ghostType].emf){
				emf = true;
			}
			if(ghosts[ghostType].freeze){
				freeze = true;
			}
			if(ghosts[ghostType].writing){
				writing = true;
			}

			io.emit('startGameS',ghostRoom,ghosts[ghostType])
			io.emit('skins', players);
			for(let i = 0; i<4; i++){
				if(!players[i].disconnected){
					totalPlayers++;
				}
			}
			//console.log(totalPlayers);
			setTimeout(()=>{
				setTimeout(activityLoop, getRandom(4000, 30000)) // Вернуть 4000, 30000
			},1000); // Вернуть 60000
		});
		socket.on('iMoved', (num, x, y, deg, pItem, pItemst)=>{
			players[num].x = x;
			players[num].y = y;
			players[num].rotation = deg;
			players[num].item = pItem;
			players[num].itemstate = pItemst;
			socket.broadcast.emit('playerMoved', players);
		});
		socket.on('spawnedSalt',(x,y,deg,itemst,item,sroom)=>{
			itemList.push({
				x : x,
				y : y,
				deg : deg,
				t : 1,
				itemstate:itemst,
				item: item,
				room: sroom
			});
			socket.broadcast.emit('spawnedSalt',x,y,deg,itemst, item, sroom);
		});
		socket.on('spawnedBook',(x,y,deg,itemst, item, sroom)=>{
			itemList.push({
				x : x,
				y : y,
				deg : deg,
				t : 2,
				itemstate:itemst,
				item: item,
				room: sroom
			});
			socket.broadcast.emit('spawnedBook',x,y,deg,itemst, item, sroom);
		})
		socket.on('spawnedCamera',(x,y,deg,itemst, item, sroom)=>{
			itemList.push({
				x : x,
				y : y,
				deg : deg,
				t : 3,
				itemstate:itemst,
				item: item,
				room: sroom
			});
			socket.broadcast.emit('spawnedCamera',x,y,deg,itemst, item, sroom);
		});
		socket.on('holdingCamera',(holding, pid)=>{
			socket.broadcast.emit('holdingCamera',holding, pid);
		});
		socket.on('pickedUpItem', (num)=>{
			itemList.splice(num,1);
			socket.broadcast.emit('pickedUpItem', num)
		});
		socket.on('myRoom',(num,pnum)=>{
			players[pnum].room = num;
			socket.broadcast.emit('myRoom',num,pnum)
		});
		socket.on('writingSend',()=>{
			writingSend();
			newPrint();
			ghostOrbSend();
			//ghostAppear();
			ghostHunt();
		});
		socket.on('myItems', (n, slots, slotsel)=>{
			if(typeof(n) == 'number'){
				players[n].item = slots[slotsel].item;
				players[n].itemstate = slots[slotsel].itemstate;
				io.emit('myItems', players);
			}
		});
		socket.on('atePills', (s, n)=>{
			players[n].santiy = s;
			io.emit('sanityUpdate', players)
		});
		socket.on('shelfs', (s1, s2, m)=>{
			shelfs = s1;
			shelfs2 = s2;
			socket.broadcast.emit('shelfs', s1, s2, m)
		});
		socket.on('testSound',()=>{
			//console.log('received a test sound command')
			//scarySound();
			spiritTalk();
			//playSound([-1191, -673], 400, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1)
		});
		socket.on('photo',(n)=>{
			if(focusArray[focusPlayer] == n && players[n].room != 13 && ghostHuntS){
				ghostHuntS = false;
				io.emit('ghostHunt',ghostHuntS, coords, 90, focusArray[focusPlayer])
				//Ghost 2 (damaged)
				playSound([players[n].x, players[n].x], 500, true, 'Ghost 2 (damaged)',0.4);
				clearTimeout(ghostAppearTimeout);
			}
		});
		socket.on('menu',(a)=>{
			mainWindow.setMenu(a);
		});
		socket.on('exit',(a)=>{
			if(a){
				http.close();
			}
			app.exit(0);
		});
		socket.on('endGame',()=>{
			socket.broadcast.emit('endGame');
			console.log('Game ended. Closing server')
			http.close();
			setTimeout(()=>{
				app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
				app.exit(0)
			},5000)
		})
});


	http.listen( port, () => {
	console.log('listening on : ' + port );
});
}
let peopleInHouse = 0;
let peopleInRoom = 0;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
let realActivityInterval = setInterval(()=>{
	if(realActivity>=0.2){
		realActivity = realActivity - 0.05;

	}
	realActivity = Math.floor(realActivity* 100) / 100
},200)
function activityLoop(){
	chance = 0;
	peopleInHouse = 0;
	for(let i = 0; i<4; i++){
		if(!players[i].disconnected){
			//console.log(players[i].room+' Player '+i+' room')
			if(typeof(players[i].room) == 'number' && players[i].room!= 13){
				if(players[i].room == ghostRoom){
					chance = Math.floor(chance + 60 + ((100 - players[i].sanity)/10));
					peopleInHouse++;
					peopleInRoom++;
					if(players[i].sanity > 0){
						players[i].sanity = players[i].sanity - 1;
					}
					if(players[i].sanity < 0){ 
						players[i].sanity = 0;
					}
					//console.log('A player is inside the ghost room')
				}
				else{
					chance = Math.floor(chance + 45 + ((100 - players[i].sanity)/4));
					peopleInHouse++;
					if(players[i].sanity > 0){
						players[i].sanity = players[i].sanity - 0.5;
					}
					if(players[i].sanity < 0){ 
						players[i].sanity = 0;
					}
					//console.log('A player is inside the house')
				}
			}
		}
	}
	io.emit('sanityUpdate',players);
	if(peopleInHouse==1){
		if(chanceCalc(40)){
			anger = anger+0.1;
		}
	}
	else if(peopleInHouse > 1){
		chance = chance/peopleInHouse + 20;
		anger = anger+0.1;
	}
	else{
		chance = 20;
		anger = anger - 0.2
	}
	if(peopleInRoom>1){
		anger = anger + 0.3
	}
	else if(peopleInRoom==1){
		anger = anger + 0.1
	}
	if(anger>1){
		anger = 1;
	}
	if(anger<0.2){
		anger = 0.2;
	}
	if(chance>100){
			chance = 100;
	}
	chance = Math.floor(chance);
	chance = chance + chanceCo
	//console.log('Chance '+chance*anger);
	while (true){
		if(chanceCalc(chance)){
			if(realActivity<10){
				realActivity++;
			}
			if(realActivity>10){
				realActivity = 10;
			}
		}
		else{
			break;
		}
	}
	activity = Math.ceil(realActivity);
	io.emit('activity', activity);
	if(activity>=0){
		if(chanceCalc(5+activity*2)){
					ghostOrbSend();
				}
		if(chanceCalc(20)){
			startFreeze();
		}
		if(activity>=1){
			if(activity>=2){
				//Звук?
				if(chanceCalc(5+activity)){
					scarySound();
				}
				if(chanceCalc(20)){
					emfNP(2);
				}
				if(activity>=3){
					if(chanceCalc(45)){
						startFreeze();
					}
					if(activity>=4){
						if(peopleInRoom == 1){
							if(chanceCalc(20)){
								spiritTalk();
							}
						}
						if(chanceCalc(10)){
							writingSend();
						}
						if(activity>=5){
							if(chanceCalc(20)){
								emfNP(3);
							}
							if(activity>=6){
								if(chanceCalc(20)){
									ghostAppear();
								}
								startFreeze();
								if(chanceCalc(10)){
									emfNP(4);
								}
								if(activity>=7){
									if(chanceCalc(20)){
										emfNP(4);
									}
									if(peopleInRoom == 1){
										if(chanceCalc(60)){
											spiritTalk();
										}
									}
									else{
										if(chanceCalc(30)){
											spiritTalk();
										}
									}
									
									if(activity>=8){
										if(chanceCalc(50)){
											ghostAppear();
										}
										if(chanceCalc(30)){
											newPrint();
										}
										if(chanceCalc(40)){
											writingSend();
										}
										if(chanceCalc(30)){
											emfNP(4);
										}
										if(activity>=9){
											if(chanceCalc(20)){
												emfNP(5);
											}
											if(activity>=10){
												if(chanceCalc(40)){
													emfNP(5);
												}
												if(chanceCalc(30)){
													ghostHunt(false);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	setTimeout(activityLoop, getRandom(1000, 10001)) // Вернуть 4000, 30001
}
function chanceCalc(num){
	let n = num * anger;

	let randomNum = getRandom(1,101);
	if(randomNum<n){
		//console.log(n+'% '+'true')
		return true;
	}
	//console.log(n+'% '+'false')
	return false;
}
let ghostAppearTimeout
let ghostAppeared = false;
function ghostAppear(){
	if(!ghostHuntS){
		if(!ghostAppeared){
			ghostAppeared = true
			let t = getRandom(1000,5001);
			let c = randomRoomCoords(ghostRoom)
			playSound(c, 400, true, 'Clicker_idle_26',0.2);
			io.emit('ghostAppear', c, getRandom(0,360), t);
			ghostAppearTimeout = setTimeout(()=>{
				ghostAppeared = false;
			},t+1000)
			for(let i = 0; i<4;i++){
				if(players[i].room == ghostRoom){
					players[i].sanity = players[i].sanity - getRandom(5,16);
				}
			}
		}
	}

}
function sanityDrop(){
	for(let i = 0; i<4; i++){
		
	}
}
function writingSend(){
	//console.log('Writing')
	if(writing){
		//console.log('Ghost has writing')
		for(let i = 0; i < itemList.length; i++){
			if(itemList[i].t == 2){
				//console.log('Book found with itemstate '+itemList[i].itemstate)
				if(itemList[i].itemstate == false){
					//console.log('The book is in room '+ itemList[i].room)
					if(itemList[i].room == ghostRoom){
						itemList[i].itemstate = true;
						io.emit('writingSend',i);
						break;
					}
				}
			}
		}
	}
}
let frozen = false;
let emfTimeout = false;
let timeoutVar;
let orbTimeout = false;
let cameraArray = [];
let focusArray = [];
let ghostHuntS = false;
let focusPlayer = 0;
let coords = randomRoomCoords(getRandom(0,9))
function ghostHunt(state){
	let gdeg = getRandom(0,360);
	ghostHuntS = true;
	clearTimeout(ghostAppearTimeout);
	ghostAppeared = true;
	if(!state){
		//console.log('Ghost Hunt Started')
		let focusArray = [];
		for(let i = 0; i<4; i++){
			if(players[i].room != 13){
				focusArray.push(i)
			}
		}
		focusPlayer = getRandom(0,focusArray.length);
	}
	else{
		console.log('Ghost Hunt Continued in room')
	}
	//console.log('FocusArray length '+focusArray.length)
	//console.log(focusArray)
	if(focusArray.length == 0){
		focusArray.push(6)
		coords = randomRoomCoords(getRandom(0,9))
		//console.log(coords);
	}
	else if(focusArray[0] == 6){
		coords = randomRoomCoords(getRandom(0,9))
		//console.log(coords);
	}
	else{
		coords = randomRoomCoords(players[focusArray[focusPlayer]].room)
		//console.log(coords);
	}
	if(focusArray[focusPlayer] != 6 && focusArray.length>0){
		if(players[focusArray[focusPlayer]].item == 'shelfcrucifix' || players[focusArray[focusPlayer]].item == 'shelfcrucifix2'){
			if(players[focusArray[focusPlayer]].itemstate > 0){
				anger = anger+0.2;
				if(anger>1){
					anger = 1;
				}
				ghostHuntS = false;
				players[focusArray[focusPlayer]].itemstate--;
				playSound([players[focusArray[focusPlayer]].x, players[focusArray[focusPlayer]].x], 500, true, 'Ghost 2 (damaged)',0.4);
				io.to(players[focusArray[focusPlayer]].id).emit('crucifixBurn');
				io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
			}
			else{
				if(chanceCalc(5)){
				ghostHuntS = false
				io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
			}
			else{
					io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
					ghostAppearTimeout = setTimeout(()=>{
						if(focusArray[focusPlayer] != 6){
							if(coords[0] < players[focusArray[focusPlayer]].x+100 && players[focusArray[focusPlayer]].x > coords[0]-100 && players[focusArray[focusPlayer]].y < coords[1]+100 && players[focusArray[focusPlayer]].y > coords[1]-100){
								if(chanceCalc(20)){
									players[focusArray[focusPlayer]].dead == true;
									io.emit('killPlayer', focusArray[focusPlayer], players);
									players[focusArray[focusPlayer]].y == -10000;
									players[focusArray[focusPlayer]].x == -10000;
									ghostHuntS = false;
									io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
								}
								else{
									ghostHunt(true);
									playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
									if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
									io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
								}
								
							}
							else{
								ghostHunt(true);
								playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
								if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
								io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
							}
						}
						else{
							ghostHunt(true);
							playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
							if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
							io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
						}
						
					},1000)
					
				}
			}
		}
		else{
			if(chanceCalc(5)){
				ghostHuntS = false
				io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
			}
			else{
				io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
				ghostAppearTimeout = setTimeout(()=>{
					if(focusArray[focusPlayer] != 6){
						if(coords[0] < players[focusArray[focusPlayer]].x+100 && players[focusArray[focusPlayer]].x > coords[0]-100 && players[focusArray[focusPlayer]].y < coords[1]+100 && players[focusArray[focusPlayer]].y > coords[1]-100){
							if(chanceCalc(20)){
								players[focusArray[focusPlayer]].dead == true;
								io.emit('killPlayer', focusArray[focusPlayer], players);
								players[focusArray[focusPlayer]].y == -10000;
								players[focusArray[focusPlayer]].x == -10000;
								ghostHuntS = false;
								io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
							}
							else{
								ghostHunt(true);
								playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
								if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
								io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
							}
							
						}
						else{
							ghostHunt(true);
							playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
							if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
							io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
						}
					}
					else{
						ghostHunt(true);
						playSound(coords, 600, true, 'ghostFootstepCarpet'+getRandom(1,9),0.1);
						if(chanceCalc(15)){playSound(coords, 400, true, 'Clicker_idle_26',0.2);}
						io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
					}
					
				},1000)
				
			}
		}
	}
	else{
		io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
		if(chanceCalc(15)){
			ghostAppearTimeout = setTimeout(()=>{
				ghostHuntS = false
				io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
			},1000);
		}
		else{
			ghostAppearTimeout = setTimeout(()=>{
				if(focusArray[focusPlayer] != 6){
					if(coords[0] < players[focusArray[focusPlayer]].x+50 && players[focusArray[focusPlayer]].x > coords[0]-50 && players[focusArray[focusPlayer]].y < coords[1]+50 && players[focusArray[focusPlayer]].y > coords[1]-50){
						players[focusArray[focusPlayer]].dead == true;
						io.emit('killPlayer', focusArray[focusPlayer], players);
						players[focusArray[focusPlayer]].y == -10000;
						players[focusArray[focusPlayer]].x == -10000;
						ghostHuntS = false;
						io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
					}
					else{
						ghostHunt(true);
						io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
					}
				}
				else{
					ghostHunt(true);
					io.emit('ghostHunt',ghostHuntS, coords, gdeg, focusArray[focusPlayer])
				}
				
			},getRandom(2000,5000))
		}
	}	
	
}
function newPrint(){
	if(footprints){
		//console.log('Creating new footprint')
		let spentSalt = null;
		let newCoords = randomRoomCoords(ghostRoom);
		let newRotation = getRandom(0,360);
		for(let i = 0; i<itemList.length; i++){
			if(itemList[i].t == 1 && itemList[i].room == ghostRoom && itemList[i].itemstate == false){
				itemList[i].itemstate = true;
				newCoords = [itemList[i].x, itemList[i].y];
				newRotation = itemList[i].deg;
				spentSalt = i;

				break;
			}
		}
		io.emit('makeFootprint', newCoords, newRotation, spentSalt);
	}
}
let evpSounds = ['Child', 'Close', 'Dad', 'Daughter', 'Death', 'Die', 'Far', 'Hate', 'Here', 'Hurt', 'Kill', 'Kid', 'Mum', 'Next', 'Old', 'Son', 'Young', 'Adult', 'Attack', 'Away', 'Baby', 'Behind']
function spiritTalk(){
	if(spiritbox){
		for(let i = 0; i<4; i++){
			if(players[i].room = ghostRoom && players[i].item == 'shelfspiritbox' || players[i].item == 'shelfspiritbox2'){
				if(players[i].itemstate){
					let c = [players[i].x, players[i].y];
					let s = evpSounds[getRandom(0,evpSounds.length)];
					playSound(c, 400, false, s,.6);
				}
			}
		}
	}
}
function ghostOrbSend(){
	cameraArray = []
	//console.log('Creating an orb')
	if(ghostorb){
		if(!orbTimeout){
			

			for(let i = 0; i<itemList.length;i++){
				if(itemList[i].t == 3 && itemList[i].room == ghostRoom && itemList[i].itemstate){
					//console.log('Perfect camera')
					cameraArray.push({n:i})
				}
			}
			//console.log(cameraArray);
			orbTimeout = true;
			setTimeout(()=>{orbTimeout = false},5500);

			if(cameraArray.length>0){io.emit('ghostorb', cameraArray[getRandom(0,cameraArray.length)].n, randomRoomCoords(ghostRoom));}	
		}
	}
}
function emfNP(n){
	if(!emf){
		if(n == 5){
			n = 4;
		}
	}
	
	if(n<=emfPower){
		if(!emfTimeout){
			//console.log('Changing emf with power of '+n)
			emfPower = n;
			ghost = randomRoomCoords(ghostRoom);
			io.emit('ghostPlace',ghost, emfPower);
			emfTimeout = true;
			timeoutVar = setTimeout(()=>{
				emfTimeout = false
			},getRandom(10000, 30000));
		}
	}
	else{
		//console.log('Changing emf with power of '+n)
		clearTimeout(timeoutVar);
		emfPower = n;
		ghost = randomRoomCoords(ghostRoom);
		io.emit('ghostPlace',ghost, emfPower);
		emfTimeout = true;
		timeoutVar = setTimeout(()=>{
			emfTimeout = false
		},getRandom(3000, 15000));
	}
	
}
function startFreeze(){
	if(!frozen){
		frozen = true;
		io.emit('freeze', true);
		//console.log('freezing the room')
	}
}
function scarySound(){
	playSound(randomRoomCoords(ghostRoom), 400, true, 'Door handle open 0'+getRandom(1,10),.1);
}
function mapto(x, inmin, inmax, outmin, outmax){
    return (x - inmin) * (outmax - outmin) / (inmax - inmin) + outmin;
}
function playSound(c, p=300,h=false,s , v=0.3){
	//console.log('playSound function started at '+ c[0]+', '+c[1]+' with proximity of '+ p+' and a maximum volume of '+v*100+'%');
	//console.log('playing '+s)
	if(!h){
		for(let i = 0; i < 4; i++){
			let px,py;
			px = players[i].x;
			py = players[i].y;
			let mapX = Math.abs(mapto(px, c[0]-p,c[0]+p,-v,v));
			let mapY = Math.abs(mapto(py, c[1]-p,c[1]+p,-v,v));
			let vol = (mapX + mapY)/2;
			vol = v-vol
			if(vol<0){
				vol = 0;
			}
			let socketid = players[i].id
			//console.log(vol*100+'%')
			io.to(socketid).emit('playSound', s, vol)
		}
	}
	else if(h){
		for(let i = 0; i < 4; i++){
			let px,py;
			px = players[i].x;
			py = players[i].y;
			if(players[i].room != 13){
				//console.log('Found player');
				let mapX = Math.abs(mapto(px, c[0]-p,c[0]+p,-v,v));
				let mapY = Math.abs(mapto(py, c[1]-p,c[1]+p,-v,v));
				let vol = (mapX + mapY)/2;
				vol = v-vol;
				if(vol<0){
					vol = 0;
				}
				//console.log(vol*100+'%');
				let socketid = players[i].id
				io.to(socketid).emit('playSound', s, vol)
			}
		}
	}
	
}
function playSoundP(p,s,v){
	players[p].id.emit('playSound', s, v)
}
function randomRoomCoords(room){
	let ranX;
	let ranY;
	let roomPart
	let oimeter = 0;
	if(room == 14 || room == 13){
		room = getRandom(0,9)
	}
		switch(room){
			case 0:
				roomPart = getRandom(0,3);
				if(roomPart == 2){
					ranX = getRandom(rooms[0].x,rooms[0].x2-80);
					ranY = getRandom(rooms[0].y,rooms[0].y2-80);
				}
				else{
					ranX = getRandom(rooms[1].x,rooms[1].x2-80);
					ranY = getRandom(rooms[1].y,rooms[1].y2-80);
				}
			break;
			case 1:
				roomPart = getRandom(0,2);
				if(roomPart == 1){
					ranX = getRandom(rooms[2].x,rooms[2].x2-80);
					ranY = getRandom(rooms[2].y,rooms[2].y2-80);
				}
				else{
					ranX = getRandom(rooms[3].x,rooms[3].x2-80);
					ranY = getRandom(rooms[3].y,rooms[3].y2-80);
				}
			break;
			case 2:
				ranX = getRandom(rooms[4].x,rooms[4].x2-80);
				ranY = getRandom(rooms[4].y,rooms[4].y2-80);
			break;
			case 3:
				ranX = getRandom(rooms[5].x,rooms[5].x2-80);
				ranY = getRandom(rooms[5].y,rooms[5].y2-80);
			break;
			case 4:
				ranX = getRandom(rooms[6].x,rooms[6].x2-80);
				ranY = getRandom(rooms[6].y,rooms[6].y2-80);
			break;
			case 5:
				ranX = getRandom(rooms[7].x,rooms[7].x2-80);
				ranY = getRandom(rooms[7].y,rooms[7].y2-80);
			break;
			case 6:
				ranX = getRandom(rooms[8].x,rooms[8].x2-80);
				ranY = getRandom(rooms[8].y,rooms[8].y2-80);
			break;
			case 7:
				ranX = getRandom(rooms[9].x,rooms[9].x2-80);
				ranY = getRandom(rooms[9].y,rooms[9].y2-80);
			break;
			case 8:
				roomPart = getRandom(0,2);
				//console.log(roomPart)
				if(roomPart == 1){
					ranX = getRandom(rooms[10].x,rooms[10].x2-80);
					ranY = getRandom(rooms[10].y,rooms[10].y2-80);
				}
				else{
					ranX = getRandom(rooms[11].x,rooms[11].x2-80);
					ranY = getRandom(rooms[11].y,rooms[11].y2-80);
				}
			break;
		
		}
	return [ranX,ranY];
}
