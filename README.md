# Newgrounds.io GameMaker Studio 2 API
A GameMaker Studio 2 Plugin for the Newgrounds.io API.

**[EXAMPLE GAME: PISTOL FOR PRESIDENT](https://www.newgrounds.com/portal/view/818229)**

# How to Import Plugin
Open your GameMaker project and go to Tools > Import Local Package.
Select the downloaded .yymps file, Import All, then Import.

# So how do I get my game to properly connect now?
At the very start of your game call **ng_connect** with the proper information. Right after, call **ng_initalize_medals_and_scoreboard**.
Afterwards, you'll wanna decide on when you want your player to be connected using **ng_request_login** (or prompted to log in or register if they're not actually logged in). Do you want a Log In/Log Out button in your game? Do you want the connect attempt to happen right after the API connection? But after that, everything else is pretty much straightforward and dependent on your game.

# Supported API Functions
To get the most out of this plugin, please refer to the [Newgrounds.io API documentation](http://www.newgrounds.io/help/components/) for more information on what some functions do.

* ng_connect
* ng_initialize_medals_and_scoreboard
* ng_request_login
* ng_cancel_login
* ng_logOut
* ng_unlockmedal
* ng_postScore
* ng_get_username
* ng_check_supporter
* ng_get_small_usericon
* ng_get_medium_usericon
* ng_get_large_usericon
* ng_loadReferral
* ng_logEvent
* ng_loadAuthorUrl
* ng_loadNewgrounds
* ng_logView
* ng_loadMoreGames
* ng_loadOfficialUrl
