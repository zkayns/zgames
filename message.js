// hey! this is where all the message stuff happens.
// 8/2/2023 update: added comments to make sure stuff is organized
// initialize date
var politics = false; // ynw melly killed the politics
var date = new Date();
var haha = ["ZGames shuts down on ", date.getMonth()+1, "/", date.getDate()+1, "/", date.getFullYear()];
// splash texts
const messages = [
  "it's just my tech 101 project teacher",
  "launch",
  "Santiago (/ˌsæntiˈɑːɡoʊ/, US also /ˌsɑːn-/; Spanish: [sanˈtjaɣo])",
  "imagine playing 76",
  "10 years of mining and crafting",
  "zmc is no more than a fairytale, let's get you to sleep grandma",
  "kader banned 10 years for pvp",
  "9 + 10 = 21",
  "the curse of march 10th",
  "my username is gaben@valvesoftware.com and my password is MoolyFTW",
  "the fabled heavy update",
  "fortnite esports :troll::troll::troll::troll:",
  "new batch of hot garbage splash text",
  "Archeology is confirmed to be coming to Minecraft with the upcoming 1.2 Update, which will allow players to dig up old pottery from desert biomes.",
  "where funney",
  "Crazy? I was crazy once.",
  "They put me in a room, with rats. Rubber rats.",
  "Minceraft",
  "sherd",
  "i use mongolian keyboard",
  "Why did the Scooby Gang hunt communists during the Second Red Scare?",
  "french invasion of zgames",
  "azerty user jumpscare",
  "function joebiden() { alert('I am president of the united state') }",
  "montreal power grid after i cover the power lines with cheeto dust (not good)",
  "download mp3 here!!!!",
  "Check out my You Tube Channel https://www.youtube.com/@MrBeast",
  "chat 2.2 drooped",
  "dogeminer save editing(the blockchain is mine)",
  "Ceci n'est pas une title screen!",
  "Pollo 👍",
  "what does 600 mean",
  "download MP3 free",
  ":krabs:",
  "spiderman why did you rdm that guy",
  "semaluhtounuyulohowwah",
  "Yes, I made ZGames.",
  "WAITING CHAT MY BELOVED ❤️❤️❤️",
  "docudubery is an amazing youtube channel",
  "https://www.youtube.com/shorts/AEZa-AY-300",
  "ROFLcopter",
  "https://www.youtube.com/watch?v=boh92DrYEWs",
  "esta skirby?",
  "i don't know what you heard",
  "cause i'm the biggest bird",
  "i'm the biggest bird",
  "mr. krabz!!!",
  "6. the dollar",
  "among us",
  "I LOVE AMONG US",
  "What if the spikes are the good guys?",
  "Programmer is sleeping, please wait",
  "Why U have to be mad? It is only game...",
  "welcome to zgame!!!!!!!!!!!!!!!!!!!",
  "2.1 swingcopter > 2.2 swingcopter",
  "MORE SPLASH TEXT MORE SPLASH TEXT",
  "Gravity Field by TheRealDarnoc",
  "To be fair, I'm the only one who actually looks at the title messages.",
  "Click the logo. Do it.",
  "I'm the only one who cares about these stupid easter eggs, and then you troll me like this?",
  "Ogugruhagi teh oyoyum",
  "The ROFL acronym stands for “Rolling On Floor Laughing.”",
  "that's enough splashes!",
  "i love undertime slopper",
  "the waffle house has found its new host",
  "updog convention",
  "updog time",
  "i love updog",
  "updog",
  "mr krabs season approaching",
  "spongebob season approaching",
  "patrick season approaching",
  "squidward season approaching",
  "gary season approaching",
  "bubble bass season approaching",
  "sandy season approaching",
  "ms puffs season approaching",
  "six hundred",
  "600",
  "splurge",
  "the splurge",
  "splurge season approaching",
  "the hash slinging slasher",
  "minecraft legacy console edition",
  "doctor drip",
  "this is a closed waffle house scenario",
  "Would you rather have unlimited bacon but no video games, or games, unlimited games, but no more games?",
  "just clicked the zgames logo, feeling good",
  "you tried",
  "never back down never give up",
  "Kappa!!!!!",
  "resistance is futile",
  "zgames alwayz win!!!",
  "i don't play zgames no more, i don't play zgames",
  "except for a little bit of bloxorz, i don't play zgames",
  "maybe every once in a while, i'll do a little of retro bowl",
  "but that's okay, not right now, i've got things to do",
  "who's joe????? ? ? ? ? ? ? ? ? ?? ? ",
  "everyday i'm zgaming",
  "Wait a second I'm dripping!!!",
  "admin ross",
  "ADD ROCKET BOT omg!!",
  "spob",
  "Additional information: /",
  "No description provided.",
  "Dev #28",
  "never have i ever played rocket bot royale on zgames",
  "stop calling it zgrapes thats just the url bro",
  "titanium network from fortnite probably",
  "Edward where did you go",
  "Spongebob Patrick",
  "we're dripping hard today ladies and gentlemen",
  "Dab me up!!! - Joe biden",
  "zpaynes",
  "I Can't believe You've done this!",
  "z grape",
  "good luck among us joe",
  "among us blessing",
  "i am rather unfunny",
  "the 600 monster has risen",
  "the beast of 600",
  "fortnite, vs...... AMONG US...vs... GRANNY...vs... ICE SCREAM 3",
  "make youtube shorts",
  "Get Rick Rold. Xdxdxdxd",
  "1 2 buckle my shoe (not funny joke alert)",
  "Ninja Quits Fortnite On. March 12, 2024",
  "/!\\ THE FUNGLE RELEASES OCTOBER 2023",
  "i have tried and failed to restore zmc twice in the last week bro",
  "hit the griddy",
  "i am currently hitting the griddy for 3KH0!!!",
  "remove the apostrophe cohen",
  "banshee verified by spaceuk",
  "I CAN'T FIND THE VEX 2 SWF 🤑🤑🤑",
  "ignore the other splash text i found the vex 2 swf",
  "at zgames, have it your way",
  "zgrapes = zgames. same thing, made by the same person.",
  "2.2 in october 2023 yo",
  "eas",
  "it's still called zgames",
  "ronald johnson",
  "randall johnson",
  "ZGAMES ZGAMES ZGAMES",
  "Just because the url says zgrapes doesn't mean it isn't called zgames",
  "IT'S CALLED ZGAMES NOT ZGRAPES",
  "wario land",
  "wario maker",
  "he's stalking us. he is watching the splash texts closely",
  "yo yo yo next splart text uptade",
  "you smelt it you dealt it",
  "zgames esports",
  "The Five Nights At Frederick's Movie Is Out.",
  "it's november 1st 2023 robtop where's my 2.2",
  "why did replit's ai suggest that i write “i am dripping hard” for this splash text",
  "i am dripping hard",
  "Former Eagles Wide Receiver Ronald Johnson:",
  "I AM DRIPPING HARD",
  "the capitalized I AM DRIPPING HARD was also replit ai's work",
  "you should probably expect lag when playing n64 games on a chromebook LOL",
  "warioware games",
  "SNOW RIDER EPIC FAIL",
  "Update: The Fungle is out",
  haha.join(""),
  "hopefully they catch on to the zgames shutdown splash text being A JOKE before it's too late guys",
  "Your cookies have been placed under government surveillance.",
  "Your cookies have been named a part of the world wonders.",
  "blags and wobsites",
  "Do you have all the skibidi rizz baby gronk in ohio",
  "700 new icons",
  "https://www.youtube.com/watch?v=kjctrkklP0s",
  "fungle afterparty on the zgames platform",
  "chat am i a skid",
  "this splatter text is gangsta",
  "tidal wave rated we are so back",
  "j",
  "play ages of conflict awesome it's a good game",
  "reminder to check for updates (they are good)",
  "lets pretend the old splashes aren't trash (they are)",
  "What up Reddit, it's Kendrick Lamar",
  "Pro tip: install PaperMC. The huzz will LOVE YOU.",
  "holy crap lois! he actually fixed 1v1!",
  "no updates november",
  "guyz play zmc zeagler.glitch.me!!"
]
// title messages (no way)
const titlemessages = [
  "nfl video and more",
  "AMONG US online",
  "hi teacher",
  "pls don, t block ):",
  "9 + 10 = 21",
  "smash car 76 no cap",
  "launch",
  "patrick mahomes",
  "amazing Real snooker trick shot #videos #viral #8ballpool #subscribe #1m",
  "10 Things Only cristiano did in football",
  "zee-kayns",
  "sherd",
  "I LOVE const titlemessages!!!!!! const titlemessages is so cool... I WISH I COULD BE PART OF const titlemessages",
  "im not even going to try and say this is educational just please dont block it LOL",
  "Communism has arrived",
  "frtgyhujdefdrvgtbhjdcftvgesagtfsgtefaafeyagfeygyiasfe",
  "it's just my tech 101 project teacher",
  "what does 600 mean",
  "ROFLcopter",
  "https://www.youtube.com/watch?v=boh92DrYEWs",
  "ehhhmazing",
  "Never back down, never give up",
  "I Forgor To Add Title Message!!!",
  "hey guys title message here today we are going to be titlemessaging",
  "idk!!! lol!!! hahahahahaha!!! lol!!!",
  "doctor drip",
  "splurge",
  "the splurge",
  "sponsored by eugene krabs",
  "zgames is so cool we never lose",
  "resistance is futile",
  "Oh No They blocked zgames. So Sad.",
  "seeecret friday",
  "seeecret saturday",
  "seeecret sunday",
  "doober",
  "at zgames, have it your way",
  "2.2 in october 2023 yo",
  "<< look at this duude",
  "eas",
  "which is zgames",
  "i am dripping hard",
  "ronald johnson",
  "Former Eagles Wide Receiver Ronald Johnson:",
  "warioware games",
  "SNOW RIDER EPIC FAIL",
  "ZGames shuts down on October 31st, 2023. ZGames plans to shut down on November 1st, 2023. ZGames is planning to shut down on November 2nd.",
  "blags and wobsites",
  "Do you have all the skibidi rizz baby gronk in ohio"
]
// pick title message
var pickedtitle = titlemessages[Math.floor(Math.random() * titlemessages.length)]
var buildtitle = ["ZGames - ", pickedtitle]
// pick splash text
var message = messages[Math.floor(Math.random() * messages.length)];
// display picked title message
document.title = buildtitle.join('');
// easter eggs
if (date.getMonth()+1 == 1 && date.getDate() == 17) {
  message = "Did you save the date?"
} else if (date.getMonth()+1 == 11 && date.getDate() == 18) {
  message = "Happy birthday, Minecraft 1.0!"
}
// display picked splash
if (!politics) {
  document.getElementById("message").innerHTML = message;
} else {
  document.getElementById("message").innerHTML = "This is the greatest rig of all time";
}
// shh snore mimimimi
var secretchooser = Math.random()
/*if (secretchooser > 0.95)  {
  document.getElementById("zgtitle").innerHTML = "I LOVE AMONG US"
  var buildtitle = ["I LOVE AMONG US - ", pickedtitle]
  document.title = buildtitle.join('')
}
if (secretchooser > 0.9 && secretchooser < 0.95)  {
  document.getElementById("zgtitle").innerHTML = "steve games"
  var buildtitle = ["steve games - ", pickedtitle]
  document.title = buildtitle.join('')
}*/
