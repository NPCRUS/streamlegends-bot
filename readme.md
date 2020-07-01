## Bot for Stream Legends twitch extension
We are using this bot for non-stop raids and maps farm. Bot will prioritize raids.

### Controls
- Start flow: if there is any raid available, it will farm first enemy on a map infinetely untill raid is ended. If you session in raid is expired, it will get to Maps List and select raid again. When there's no raid available, it will farm first enemy in first available Map.
- Stop flow: Just stops everything, stop button completely resets state of the bot, so you can press it back and fourth infinetely

### Installation
Open stream legends in pop out window (bot will not work on a stream page). Open developer console in your broswer, then copy and past this code into it: ```fetch('https://raw.githubusercontent.com/NPCRUS/streamlegends-bot/master/index.js').then(r => r.text()).then(eval)```   
Press enter - here you go! Enjoy!