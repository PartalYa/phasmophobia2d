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
let pickKey;
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
let pickingKey = false;
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

];
let focusedKey = null;