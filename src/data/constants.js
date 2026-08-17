// Colours, skill levels and award names. Change a colour here and it changes everywhere.

// Glasgow Accies RFC: royal blue and white from the club crest, with the
// crest's gold as the accent. (The pitch diagrams stay green — turf is turf.)
export const C = {
  pine:"#0B2E63", pineDeep:"#071F45", grass:"#0A4DA0", grassSoft:"#E4EBF7",
  gold:"#DFB84A", goldSoft:"#F8F0D8", paper:"#EEF1F7",
  card:"#FFFFFF", ink:"#131E33", mute:"#5B6779", line:"#D8DEE9",
};

export const LEVELS = ["Not Yet Observed","Emerging","Developing","Secure","Excelling"];
export const LEVEL_COLOR = {
  "Not Yet Observed":"#CBD3CE", Emerging:"#7FB0D6", Developing:"#2FA79E",
  Secure:"#3E9E5B", Excelling:"#E8B008",
};
export const AREAS = {
  "Physical Literacy":["Balance","Agility","Coordination","Speed"],
  "Ball Skills":["Carrying","Catching","Passing","Offloading"],
  "Game Awareness":["Support play","Finding space","Communication","Decision making"],
  Defence:["Tag technique","Tracking","Positioning"],
};
export const VALUES = ["Integrity","Passion","Solidarity","Discipline","Respect"];
export const AWARDS = [
  {id:"first-try", label:"First Try", emoji:"🏉", note:"Scored a try in a game"},
  {id:"brave", label:"Brave Defender", emoji:"🛡️", note:"Made a great tackle or tag"},
  {id:"passer", label:"Safe Hands", emoji:"🙌", note:"Passed or caught well under pressure"},
  {id:"supporter", label:"Super Supporter", emoji:"🤝", note:"Backed up a team-mate"},
  {id:"spark", label:"Space Finder", emoji:"⚡", note:"Ran into space brilliantly"},
  {id:"captain", label:"Captain's Spirit", emoji:"⭐", note:"Lifted the whole team"},
];
export const AREA_TO_SKILL = {
  "Physical Literacy":"evasion", "Ball Skills":"passing",
  "Game Awareness":"support", "Defence":"tackling",
};
