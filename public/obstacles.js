'use strict';
let obstacles = 	[
	{
		x: -2532,
		y: 53,
		x2: -1825,
		y2: 170,
	},
	{
		x: -424,
		y: -3221,
		x2: -402,
		y2: -2256,
	},
	{
		x: -555,
		y: -1170,
		x2: -446,
		y2: -1019,
	},
	{
		x: -1825,
		y: 111,
		x2: -1750,
		y2: 170
	},
	{
		x: -1883,
		y: 11,
		x2: -1825,
		y2: 53
	},
	{
		x: -1475,
		y: -264,
		x2: -1425,
		y2: 928
	},
	{
		x: -1550,
		y: 111,
		x2: -1474,
		y2: 171
	},
	{
		x: -1425,
		y: 111,
		x2: -1358,
		y2: 136
	},
	{
		x: -1474,
		y: 111,
		x2: -1418,
		y2: -623
	},
	{
		x: -1825,
		y: -1372,
		x2: -1471,
		y2: -1331
	},
	{
		x: -1474,
		y: -1372,
		x2: -1417,
		y2: -623
	},
	{
		x: -2533,
		y: 896,
		x2: -1426,
		y2: 927
	},
	{
		x: -1141,
		y: 112,
		x2: -1076,
		y2: 136
	},
	{
		x: -1081,
		y: -1004,
		x2: -751,
		y2: 135
	},
	{
		x: -990,
		y: 135,
		x2: -751,
		y2: 919
	},
	{
		x: -753,
		y: 871,
		x2: 1000,
		y2: 919
	},
	{
		x: -751,
		y: -1004,
		x2: -334,
		y2: -940
	},
	{
		x: -866,
		y: -1613,
		x2: -701,
		y2: -1004
	},
	{
		x: -701,
		y: -1754,
		x2: -1,
		y2: -1723
	},
	{
		x: -49,
		y: -1723,
		x2: -2,
		y2: -1666
	},
	{
		x: -57,
		y: -1463,
		x2: -1,
		y2: -940
	},
	{
		x: -123,
		y: -1004,
		x2: -49,
		y2: -940
	},
	{
		x: -2,
		y: -971,
		x2: 1000,
		y2: -940
	},
	{
		x: -1890,
		y: -637,
		x2: -1826,
		y2: -173
	},
	{
		x: -1849,
		y: -696,
		x2: -1826,
		y2: -628
	},
	{
		x: -1873,
		y: -1071,
		x2: -1834,
		y2: -906
	},
	{
		x: -2533,
		y: -996,
		x2: -2043,
		y2: -465
	},
	{
		x: -2043,
		y: -638,
		x2: -1826,
		y2: -465
	},
	{
		x: -1890,
		y: -465,
		x2: -1826,
		y2: -173
	},
	{
		x: -2043,
		y: -996,
		x2: -1872,
		y2: -964
	},
	{
		x: -2533,
		y: -2146,
		x2: -1826,
		y2: -2090
	},
	{
		x: -1882,
		y: -2090,
		x2: -1826,
		y2: -1281
	},
	{
		x: -2533,
		y: -2929,
		x2: -2109,
		y2: -2881
	},
	{
		x: -1890,
		y: -3665,
		x2: -1867,
		y2: -2881
	},
	{
		x: -1867,
		y: -2929,
		x2: -1751,
		y2: -2881
	},
	{
		x: -1548,
		y: -2929,
		x2: -1481,
		y2: -2881
	},
	{
		x: -1482,
		y: -3665,
		x2: -1426,
		y2: -1732
	},
	{
		x: -1432,
		y: -3254,
		x2: 1000,
		y2: -3223
	},
	{
		x: -1081,
		y: -1396,
		x2: -1041,
		y2: -1291
	},
	{
		x: -1081,
		y: -1071,
		x2: -1059,
		y2: -1004
	},
	{
		x: -982,
		y: -1496,
		x2: -809,
		y2: -1373
	},
	{
		x: -1057,
		y: -1421,
		x2: -835,
		y2: -1373
	},
	{
		x: -1826,
		y: -1788,
		x2: -1750,
		y2: -1731
	},
	{
		x: -1557,
		y: -1788,
		x2: -1475,
		y2: -1731
	},
	{
		x: -966,
		y: 962,
		x2: -942,
		y2: 1976
	},
	{
		x: -1074,
		y: 1954,
		x2: -942,
		y2: 1976
	},
	{
		x: -2533,
		y: 1954,
		x2: -1318,
		y2: 1976
	},
	{
		x: -1831,
		y: 522,
		x2: -1425,
		y2: 927
	},
	{
		x: -857,
		y: 2154,
		x2: 932,
		y2: 2219
	},
	{
		x: 801,
		y: 2154,
		x2: -932,
		y2: 2744
	},
	{
		x: -857,
		y: 2678,
		x2: -932,
		y2: 2744
	},
	{
		x: -2560,
		y: -3667,
		x2: -2533,
		y2:3200,
	},
	{
		x: -2535,
		y: -3667,
		x2: -1380,
		y2:-3665,
	},
	{
		x: -16,
		y: -3227,
		x2: 1,
		y2: -2219
	},
	{
		x: 367,
		y: -2847,
		x2: 674,
		y2: -2256
	},
	{
		x: 893,
		y: -2095,
		x2: 1030,
		y2: -1931
	},
	{
		x: 893,
		y: -1763,
		x2: 1043,
		y2: -1017
	},
	{
		x: 0,
		y: -1122,
		x2: 1043,
		y2: -1017
	},
	{
		x: 335,
		y: -1729,
		x2: 582,
		y2: -1232
	},
	{
		x: 335,
		y: -1729,
		x2: 582,
		y2: -1232
	},
	{
		x: 1,
		y: -2971,
		x2: 132,
		y2: -2599
	},
	{
		x: 1,
		y: -2538,
		x2: 115,
		y2: -2273
	},
	{
		x: 926,
		y: -2754,
		x2: 1039,
		y2: -2541
	},
	{
		x: 985,
		y: -3053,
		x2: 1027,
		y2: -2865
	},
	{
		x: 294,
		y: -3230,
		x2: 666,
		y2: -3099
	},
	{
		x: 929,
		y: -3211,
		x2: 1003,
		y2: -3152
	},
	{
		x: -691,
		y: -1713,
		x2: -534,
		y2: -1474
	},
	{
		x: -690,
		y: -1196,
		x2: -384,
		y2: -1032
	},
	{
		x: -48,
		y: -537,
		x2: 316,
		y2: 409
	},
	{
		x: -748,
		y: -270,
		x2: -619,
		y2: -32
	},
	{
		x: -748,
		y: 113,
		x2: -619,
		y2: 484
	},
	{
		x: -730,
		y: 738,
		x2: -358,
		y2: 852
	},
	{
		x: -734,
		y: -946,
		x2: -607,
		y2: -541
	},
	{
		x: -15,
		y: -944,
		x2: 108,
		y2: -858
	},
	{
		x: 260,
		y: -938,
		x2: 382,
		y2: -874
	},
	{
		x: -1423,
		y: -3228,
		x2: -1332,
		y2: -3146
	},
	{
		x: -2532,
		y: 512,
		x2: -2026,
		y2: 880
	},
	{
		x: -2191,
		y: 162,
		x2: -1843,
		y2: 351
	},
	{
		x: -2497,
		y: 162,
		x2: -2209,
		y2: 269
	},
	{
		x: -2530,
		y: 356,
		x2: -2435,
		y2: 500
	},
	{
		x: -2524,
		y: -346,
		x2: -2410,
		y2: -92
	},
	{
		x: -2047,
		y: -421,
		x2: -1904,
		y2: -321
	},
	{
		x: -1824,
		y: -552,
		x2: -1702,
		y2: -248
	},
	{
		x: -2107,
		y: -2063,
		x2: -1943,
		y2: -1782
	},
	{
		x: -1820,
		y: -2045,
		x2: -1775,
		y2: -1857
	},
	{
		x: -1624,
		y: -2733,
		x2: -1482,
		y2: -2252
	},
	{
		x: -2239,
		y: -2579,
		x2: -2026,
		y2: -2165
	},
	{
		x: -2522,
		y: -2278,
		x2: -2350,
		y2: -2167
	},
	{
		x: -2551,
		y: -2891,
		x2: -2159,
		y2: -2758
	},
	{
		x: -2046,
		y: -3295,
		x2: -1908,
		y2: -3190
	},
	{
		x: -1864,
		y: -3671,
		x2: -1486,
		y2: -3573
	},
	{
		x: -1548,
		y: -3479,
		x2: -1486,
		y2: -3100
	},
	{
		x: -1214,
		y: -561,
		x2: -1088,
		y2: -317
	},
	{
		x: -1659,
		y: 912,
		x2: -1542,
		y2: 1945
	},
	{
		x: -1131,
		y: -2445,
		x2: -453,
		y2: -2224
	},
	{
		x: -674,
		y: -2731,
		x2: -453,
		y2: -2224
	},
	{
		x: -723,
		y: -2913,
		x2: -453,
		y2: -2765
	},
	{
		x: -1073,
		y: -2645,
		x2: -710,
		y2: -2481
	},
	{
		x: -596,
		y: -3216,
		x2: -453,
		y2: -3076
	},
	{
		x: -4324,
		y: -3463,
		x2: -4209,
		y2: -1907
	},
	{
		x: -3807,
		y: -3011,
		x2: -3758,
		y2: -1983
	},
	{
		x: -4324,
		y: -3463,
		x2: -3340,
		y2: -3274
	},
	{
		x: -3380,
		y: -3490,
		x2: -3320,
		y2: -2470
	},
	{
		x: -3760,
		y: -2536,
		x2: -3318,
		y2: -2486
	},
	{
		x: -3766,
		y: -2945,
		x2: -3568,
		y2: -2591
	},
	{
		x: 875,
		y: -706,
		x2: 1031,
		y2: 796
	},
	{
		x: -835,
		y: 2719,
		x2: 943,
		y2: 2745
	},
	{
		x: 915,
		y: 2223,
		x2: 1597,
		y2: 2679
	},
	{
		x: -748,
		y: 2223,
		x2: 850,
		y2: 2343
	},
	{
		x:-1106,
		y:155,
		x2:-999,
		y2:702
	}



];
let house=[
	{
		x: -4477,
		y: -3859,
		x2: 1050,
		y2: -9
	},
	{
		x: -780,
		y: 39,
		x2: 1094,
		y2: 765
	},
	{
		x: -2608,
		y: 81,
		x2: -1548,
		y2: 801
	},
]