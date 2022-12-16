var ngio;

function onLoggedIn() {
    console.log("Welcome " + ngio.user.name + "!");
}

function onLoginFailed() {
    console.log("There was a problem logging in: " . ngio.login_error.message );
}

function onLoginCancelled() {
    console.log("The user cancelled the login.");
}

function ng_request_login() {
	ngio.getValidSession(function() {
		        if (ngio.user) {
            onLoggedIn();
        }
	if (!ngio.user) {
    ngio.requestLogin(onLoggedIn, onLoginFailed, onLoginCancelled);
	}
	});
}

function ng_cancel_login() {
    ngio.cancelLoginRequest();
}

function ng_logOut() {
	if (ngio.user) {
    ngio.logOut();
	}
}

function ng_connect(app_id, encryption_key){
	ngio = new Newgrounds.io.core(app_id, encryption_key);
}

/* medal vars */
var medals, scoreboards;
var medalDOM = document.createElement("div");

/* handle loaded medals */
function onMedalsLoaded(result) {
    if (result.success) medals = result.medals;
}

/* handle loaded scores */
function onScoreboardsLoaded(result) {
    if (result.success) scoreboards = result.scoreboards;
    console.log(scoreboards);
}


function ng_initialize(){

	/*load medals and scoreboards from the server */
	ngio.queueComponent("ScoreBoard.getBoards", {}, onScoreboardsLoaded);
	ngio.queueComponent("Medal.getList", {}, onMedalsLoaded);
	ngio.executeQueue();

    /* setup medalcarrier */
    _createMedalUI();
	
}

/* load our medals  from the server */
var _loadMedals = function(){	
	ngio.queueComponent("Medal.getList", {}, onMedalsLoaded);
	ngio.executeQueue();
}

var _createMedalUI = function(){

  // Creates the DOM with a medal carrier that is supposed to resemble the newgrounds version
  document.body.appendChild(medalDOM);
  medalDOM.innerHTML = 
        "<div id='medal_container' style="+
	        "'position:absolute; "+
	        "background-color: rgb(5, 6, 9);"+
	        "border: 7px solid  rgb(185, 163, 105);"+
	        "width:270px; "+
	        "height:70px; "+
	        "top: 51px; "+
	        "left: -310px; "+
	        "overflow:hidden; "+
	        "-webkit-transition:left 0.5s ease;"+
	        " -moz-transition:left 0.5s ease;"+
	        " -ms-transition:left 0.5s ease; "+
	        "-o-transition:left 0.5s ease;"+
	        "<div id = 'inner_medal' style = "+
        		"'left : -1px; "+
        		"position: relative;'>"+
    			"<div id = 'medal_icon' style = "+
    			"'background-color: rgb(5, 6, 9); "+
    			"border: 3.5px ridge  rgb(57, 55, 61);"+
    			"width: 59px; "+
    			"height: 59px; "+ 
    			"left: 3px; "+
    			"top: 3px; "+ 
    			"position: relative;'>"+
                "<img id = 'icon' style = "+
                	"'border: 3px solid "+
                	"rgb(57, 55, 61); "+
                	"width: 48px; "+
                	"height: 48px; "+
                	"left: 1px; "+
                	"top: 1px; "+
                	"position: relative;'"+
                	"src = ''>"+
        		"</div>"+  
    	       	"<div id = 'medal_describer' style = "+
        		"'background-color: rgb(5, 6, 9); " +
	        	"border: 3.5px ridge  rgb(57, 55, 61); "+
	        	"width: 196px; "+
	        	"height: 39px; "+
	        	"left: 66px; "+
	        	"top: -43px; "+
           		"position: relative;'>"+
                	"<div id = 'space' style = "+
	                	"'background-color: rgb(39, 39, 47);"+
	                	" width: 191px; "+
	                	" height: 35px; "+
	                	" line-height: 36px;"+
	                	" text-align: center;"+
	                	" left: 1px;"+
	                	" top: 0px;"+
	                	" position: relative; '> "+ 
					    "<span id = 'medal_description' style = "+
					    	"'/*font*/"+
					    	"font-family: arial;"+
					    	"font-weight: 720;"+
					    	"font-weight: 720;"+
					    	"font-size : 12px;"+
					    	" /*text*/"+
					    	"letter-spacing: 0.5px;"+
					    	"color: rgb(238, 240, 254);'> Sabooo"+
					    "</span>"+       
	                "</div>"+
	            "</div>"+
                "<div id = 'medal_headup' style ="+
					"'background-color: rgb(5, 6, 9);"+
					" border: 3.5px ridge  rgb(57, 55, 61);"+
					" width: 196px;"+
					" height: 22px;"+
					" left: 66px;"+
					" top: -109px;"+
					" position: relative;'>"+ 
	           		" <div id = 'medal_feedback' style = "+
	           			"' background-color: rgb(18, 15, 20);"+
	           			" border: 2px solid  rgb(39, 39, 47);" +
	           			" width: 187px;" +
	 					" height: 15px;"+
	 					" line-height: 12px;"+
	 					" left: 1px;"+
	 					" top: 0px;"+
	 					" position: relative;'>"+
	 					"<span id= 'feedback' style = "+
	 						"'  /*font*/"+
	 						"font-family: arial;"+
	 						"font-weight: 750;"+
	 						"font-size : 11px;"+
	 						"/*text*/"+
	 						"position: relative;"+
	 						"left: 9px;"+
	 						"text-transform: uppercase;"+
	 						"letter-spacing: 0.5px;"+
	 						" color: rgb(224, 192, 9);'>medal get!"+
	 					"</span>"+
						"<span id= 'medal_value' style = "+
							"'/*font*/"+
							"font-family: arial;"+
							"font-weight: 720;"+
							"font-size : 11px;"+
							"/*text*/"+
							"position: relative;"+
							"left: 64px;"+
							"letter-spacing: 0.5px;"+
							"color: rgb(93, 93, 99);'>25pts"+
						"</span>"+
					" </div>"+
				"</div>"+
        	"</div>"+
        "</div>";
};


/*Displays the medal carrier on the screen by transitioning it on the screen
and writes the medal details on the carrier */
var _showMedal = function(medal){

 	var medal_container = document.getElementById('medal_container');
    medal_container.style.left = '10px';
    setTimeout(function(){
        medal_container.style.left = '-310px';
    },2000);
    
    document.getElementById('icon').src = medal.icon;
    document.getElementById('medal_description').innerHTML = medal.name;
    var points = ["bogus", "5", "10", "25", "50", "100"];
    document.getElementById('medal_value').innerHTML = points[medal.difficulty] + "pts";
};


var to_unlock = []

function ng_unlockmedal(medal_name) {

   
	 /* If there is no user attached to our ngio object, it means the user isn't logged in and we can't post anything */
    if (!ngio.user) return;


    for (var i = 0; i < medals.length; i++) {

        var medal = medals[i];

        /* look for a matching medal name */
        if (medal.name == medal_name || medal.id == medal_name) {

    		// Unlock and display if it's not unlocked yet
    		if(!medal.unlocked){
    			to_unlock.push(medal);
				setTimeout(function(){ 
					_showMedal(medal);
					_loadMedals();
					to_unlock.pop(); 
							/* unlock the medal from the server */
			                ngio.callComponent('Medal.unlock', {id:medal.id});   
					}, 

					2500 * (to_unlock.length - 1));	
        	}
  
            // I use this return value inside gamemaker to play the audio effect at the right time
            var sfxTimeout = 2500 * (to_unlock.length - 1);
            if(medal.unlocked) sfxTimeout = -1;
            return sfxTimeout;      	
        }
	}
  }

	function ng_postScore(board_id, score_value) {
		if (!ngio.user) return;

	    var score;

	    for (var i = 0; i < scoreboards.length; i++) {

	        scoreboard = scoreboards[i];
	        if(board_id == scoreboard.id || board_id == scoreboard.name){
	        	ngio.callComponent('ScoreBoard.postScore', {id:scoreboard.id, value:score_value});	        
	    }
	}

function ng_getScores(board_app_id,board_id,board_limit,board_period,board_skip,board_social,board_tag,user_id_or_name){
if (!ngio.user) return "";

	    for (var i = 0; i < scoreboards.length; i++) {

	        scoreboard = scoreboards[i];
	        if(board_id == scoreboard.id || board_id == scoreboard.name){
	        	thescoreboard = ngio.callComponent('ScoreBoard.getScores', {app_id:board_app_id, id:scoreboard.id, limit:board_limit, period:board_period, skip:board_skip, social:board_social, tag:board_tag, user:user_id_or_name});	        
				return thescoreboard;
		}
}
	function ng_check_supporter() {
		if (!ngio.user){
			return "false";
		}
		if (ngio.user){
			return ngio.user.supporter;
		}
	}
	
	function ng_get_username() {
		if (!ngio.user){
			return "";
		}
		if (ngio.user){
			return ngio.user.name;
		}
	}
	
	function ng_get_small_usericon() {
		if (!ngio.user){
			return "";
		}
		if (ngio.user){
			return ngio.user.icons.small;
		}
	}

	function ng_get_medium_usericon() {
		if (!ngio.user){
			return "";
		}
		if (ngio.user){
			return ngio.user.icons.medium;
		}
	}

	function ng_get_large_usericon() {
		if (!ngio.user){
			return "";
		}
		if (ngio.user){
			return ngio.user.icons.large;
		}
	}

function ng_loadReferral(host_url, referralname){
	ngio.callComponent('Loader.loadReferral', {host:host_url, referral_name:referralname});
}

function ng_logEvent(eventname, host_url){
	ngio.callComponent('Event.logEvent', {event_name:eventname, host:host_url});
}

function ng_loadAuthorUrl(host_url){
	ngio.callComponent('Loader.loadAuthorUrl', {host:host_url});
}
function ng_loadNewgrounds(host_url){
	ngio.callComponent('Loader.loadNewgrounds', {host:host_url});
}
function ng_logView(host_url){
	ngio.callComponent('App.logView', {host:host_url});
}
function ng_loadMoreGames(host_url){
	ngio.callComponent('Loader.loadMoreGames', {host:host_url});
}
function ng_loadOfficialUrl(host_url){
	ngio.callComponent('Loader.loadOfficialUrl', {host:host_url});
}

// Cloud save functions begin down here :)
// Credit to Jack on Newgrounds for doin' all this stuff! <3

var slots;

var slotLoadStatus = -1;

function ng_loadSlots() {
	ngio.callComponent('CloudSave.loadSlots', {}, onSlotsLoaded);
	if (slotLoadStatus == -1) slotLoadStatus = 0;
}

function ng_getSlotLoadStatus() {
	return slotLoadStatus;
}

function onSlotsLoaded(result) {
	if (result.success) {
		slots = result.slots;
		slotLoadStatus = 1;
		console.log("Successfully loaded save slots!");
	} else {
		console.log("LOADING ERROR: ", result.error.message);
		slotLoadStatus = -1;
    }
}

function ng_loadSlot(slot_id) {
	for (var i = 0; i < slots.length; i++) {
		slot = slots[i];
		if (slot.id == slot_id) {
			if (slot.url != null) {
				return slot.url;
			} else {
				return "";
            }
        }
	}
}

function ng_setData(save_data, slot_id) {
	ngio.callComponent('CloudSave.setData', { data: save_data, id: slot_id }, function (result) {
		if (result.success) {
			console.log(result);
		} else {
			console.log(result.error.message);
		}
	});
}