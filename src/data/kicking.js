// Kicking
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.
// Plan B tags: every activity carries "planB" — wet (fine in heavy rain: nobody
// stands still long enough to get cold), indoor (works in a sports hall: no going
// to ground, no punting, no 20m+ pitch), singleCoach (one adult can run it safely
// with a full squad — live tackling is deliberately marked false), and minPlayers
// (fewest players it still works with). Edit them freely; they drive the Plan B button.

export const kicking = {
  "label": "Kicking",
  "emoji": "🦵",
  "ageNote": "Introduce once passing and catching are secure. Lots of space and a clear 'kick zone'.",
  "values": [
    "Discipline"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "The punt: drop and strike",
      "objective": "Drop the ball onto the foot and strike it with control.",
      "coachingPoints": [
        "Hold the ball out, point it slightly down",
        "Drop it, don't throw it up",
        "Strike with the top of the foot (laces)"
      ],
      "activities": [
        {
          "name": "Drop and catch",
          "type": "Warm-up",
          "setup": "Individually, plenty of space, one ball each.",
          "play": "Players practise holding the ball out and dropping it straight down onto an outstretched foot that lifts to meet it (no full kick yet), then catch it again. Builds the drop.",
          "good": "The ball drops straight down onto the laces consistently, not tumbling away.",
          "points": [
            "Ball held out in front",
            "Straight, controlled drop",
            "Meet it with the laces"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "More space per player",
            "Task": "Progress from lift to a gentle kick",
            "Equipment": "Softer/smaller ball",
            "People": "Individual work"
          }
        },
        {
          "name": "Gentle punts",
          "type": "Skill",
          "setup": "Players spread along a line, all kicking the same direction into open space.",
          "play": "Players punt the ball a short, controlled distance, jog to collect it, and repeat. Focus is on a clean strike, not distance.",
          "good": "The strike is clean off the laces and the ball travels roughly straight, under control.",
          "points": [
            "Drop then strike",
            "Laces through the ball",
            "Follow through towards the target"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Short target distance",
            "Task": "Aim at a cone target",
            "Equipment": "Lighter ball to start",
            "People": "Everyone kicks one way together"
          }
        },
        {
          "type": "Gameplay",
          "name": "Territory tennis",
        "diagram": {"size":[34,16],"halfway":true,"zones":[{"x":26,"y":0,"w":8,"h":16,"label":"DEEP","tone":"gold"}],"players":[{"x":5,"y":8,"t":"a","n":"1","ball":true},{"x":8,"y":12,"t":"a","n":"2"},{"x":24,"y":6,"t":"d","n":"1"},{"x":27,"y":11,"t":"d","n":"2"}],"moves":[{"k":"kick","from":[5,8],"to":[28,8],"bend":-6}],"notes":[{"x":8.5,"y":15,"text":"stay in your half"}],"label":"Kick into their half, they gather where it stops and kick back. Teams stay in their own half."},
          "setup": "A long thin area split into two halves by a line of cones. Teams of three or four in each half. Everyone stays in their own half.",
          "play": "Teams take turns punting the ball into the opposition half. The other team gathers it wherever it stops and kicks back from that spot. A point is scored if the ball lands in the far quarter or the other team fails to gather it. Nobody crosses the halfway line, so there is no danger of kicking into people.",
          "condition": "Teams stay in their own half. Every kick is a punt from where the ball was gathered.",
          "good": "Drops are clean and consistent, strikes come off the laces, and the ball travels roughly where it was aimed.",
          "points": [
            "Ball held out, straight drop",
            "Strike with the laces",
            "Follow through towards the target"
          ],
          "questions": [
            "What did your best kick have in common?",
            "What happens when you throw the ball up instead of dropping it?",
            "Where's the best place to aim?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 4 },
          "step": {
            "Space": "Shorten the pitch so success comes quickly",
            "Task": "Allow a drop-kick or a punt, their choice",
            "Equipment": "Lighter ball for younger legs",
            "People": "Small teams so everyone kicks often"
          }
        }
      ],
      "safety": [
        "Everyone kicks the SAME direction — never towards each other.",
        "Big open space, clear kick zone.",
        "Collect only on the coach's call."
      ]
    },
    {
      "week": 2,
      "title": "Accuracy over distance",
      "objective": "Kick the ball accurately towards a target with both control and a little height.",
      "coachingPoints": [
        "Aim before you kick",
        "Steady, balanced body",
        "Follow through towards the target"
      ],
      "activities": [
        {
          "name": "Target zones",
          "type": "Warm-up",
          "setup": "Cone zones set out at short distances; players on a line.",
          "play": "Players aim their punt to land in a target zone rather than kicking as far as possible. Score a point for landing in the zone.",
          "good": "Kicks are aimed and controlled, prioritising accuracy over power.",
          "points": [
            "Pick your target",
            "Controlled strike",
            "Follow through to it"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": false, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Move zones closer or wider",
            "Task": "Add a slightly further zone",
            "Equipment": "Cones mark zones",
            "People": "Take turns on the line"
          }
        },
        {
          "name": "Kick and gather",
          "type": "Skill",
          "setup": "Pairs, well spaced, kicking towards each other's SPACE (not at each other).",
          "play": "One kicks gently into the space near their partner, who moves to gather; then they swap. Emphasise a catchable kick.",
          "good": "The kick is gentle and catchable, landing where the partner can gather it.",
          "points": [
            "Kick to the space",
            "Gentle and catchable",
            "Partner moves to gather"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Closer pairs for control",
            "Task": "Add a small target between them",
            "Equipment": "Softer ball",
            "People": "Well-spaced pairs"
          }
        },
        {
          "type": "Gameplay",
          "name": "Land it in the zone",
        "diagram": {"size":[34,16],"halfway":true,"zones":[{"x":20,"y":1,"w":6,"h":6,"label":"1","tone":"gold"},{"x":27,"y":9,"w":6,"h":6,"label":"3","tone":"gold"}],"players":[{"x":4,"y":8,"t":"a","n":"1","ball":true},{"x":22,"y":4,"t":"d","n":"1"}],"moves":[{"k":"kick","from":[4,8],"to":[30,12],"bend":-7}],"label":"Points only for landing in a marked zone. The harder ones are worth more — pick your target."},
          "setup": "The same split pitch, with two or three cone-marked landing zones in each half — some near, some far.",
          "play": "Territory tennis with targets. Each zone is worth different points, with the trickier ones worth more. Children start choosing an achievable target and aiming at it rather than hammering the ball as far as they can.",
          "condition": "Points only for a ball that lands in a marked zone. Accuracy beats distance every time.",
          "good": "Players pick a zone before they kick and adjust their strike to reach it, rather than kicking flat out.",
          "points": [
            "Choose your target first",
            "Steady, balanced body",
            "Follow through to where you're aiming"
          ],
          "questions": [
            "Which zone did you pick, and why that one?",
            "What did you change when you needed less distance?",
            "Is the furthest zone always the best choice?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": false, "indoor": false, "singleCoach": true, "minPlayers": 4 },
          "step": {
            "Space": "Move zones nearer or make them wider",
            "Task": "Add a bonus zone once they are consistent",
            "Equipment": "Coloured cones for each zone",
            "People": "Take turns; everyone kicks each round"
          }
        }
      ],
      "safety": [
        "Space pairs widely; kick to space, not at people.",
        "One direction where possible.",
        "Clear kick zone."
      ]
    },
    {
      "week": 3,
      "title": "Catch and kick",
      "objective": "Catch a pass, then kick under control while moving.",
      "coachingPoints": [
        "Secure the catch first",
        "Set the feet before kicking",
        "Head steady, eyes on the ball"
      ],
      "activities": [
        {
          "name": "Catch, steady, kick",
          "type": "Warm-up",
          "setup": "Individually or in pairs feeding a gentle pass.",
          "play": "Player receives a pass, takes a step to steady, then punts into open space. Focus on the sequence, not power.",
          "good": "The catch is secured and the body steadied before a controlled strike.",
          "points": [
            "Catch first",
            "Steady the feet",
            "Then strike"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Feed from closer",
            "Task": "Add a jog before the kick",
            "Equipment": "Lighter ball",
            "People": "Pairs feeding"
          }
        },
        {
          "name": "Kick relay",
          "type": "Game",
          "setup": "Teams advance a ball down a big open area with controlled kicks and gathers.",
          "play": "Kick into space, chase and gather, repeat to reach a line. Reward control and teamwork over big boots.",
          "good": "Kicks are controlled and gatherable so the team keeps possession as they advance.",
          "points": [
            "Control over distance",
            "Chase your kick",
            "Communicate to gather"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 4 },
          "step": {
            "Space": "Adjust the distance",
            "Task": "Reward kept-possession chains",
            "Equipment": "Bibs by team",
            "People": "Even teams, one direction"
          }
        },
        {
          "type": "Gameplay",
          "name": "Clear your lines",
        "diagram": {"size":[25,20],"zones":[{"x":0,"y":0,"w":5,"h":20,"label":"OWN 5m","tone":"gold"},{"x":22,"y":0,"w":3,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":10,"t":"a","n":"1","ball":true},{"x":9,"y":7,"t":"d","n":"1"},{"x":10,"y":13,"t":"d","n":"2"}],"moves":[{"k":"kick","from":[3,10],"to":[22,9],"bend":-6}],"notes":[{"x":12,"y":18.5,"text":"catch, steady, strike"}],"label":"Win the ball inside your own zone and you must catch it, set your feet, then kick clear."},
          "setup": "A 25m x 20m pitch with a marked 5m zone in front of each try-line. Teams of four, tag rules.",
          "play": "A normal tag game, except that when a team gets the ball inside their own 5m zone they must catch it and kick it clear from there. It puts the catch-steady-kick sequence into a real moment, under a little pressure, exactly as it happens in a match.",
          "condition": "Ball won inside your own zone must be caught and then kicked clear.",
          "good": "The catch is secured and the feet are set before the strike, rather than a rushed kick at a bouncing ball.",
          "points": [
            "Catch it first",
            "Steady the feet",
            "Then strike"
          ],
          "questions": [
            "What goes wrong if you rush the kick?",
            "How much time do you actually have?",
            "Who can help you by calling?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Deepen the zone to give more time",
            "Task": "Allow a pass out instead if under real pressure",
            "Equipment": "Cones to mark the zones",
            "People": "Rotate so everyone kicks from the zone"
          }
        }
      ],
      "safety": [
        "Kick one direction; clear the kick zone before kicking.",
        "Big space, no crossing kicks.",
        "Rotate to keep fresh."
      ]
    },
    {
      "week": 4,
      "title": "The grubber kick",
      "objective": "Kick the ball along the ground to put it into space behind a defender.",
      "coachingPoints": [
        "Strike the top of the ball to keep it low",
        "A short, stabbing kick, not a big swing",
        "Chase to regather"
      ],
      "activities": [
        {
          "name": "Grubber gates",
          "type": "Warm-up",
          "setup": "Cone gates a few metres ahead; players on a line.",
          "play": "Players grubber-kick the ball along the ground through a gate, then chase and collect. Rewards a low, controlled roll.",
          "good": "The ball stays low along the ground and rolls through the gate rather than bouncing up.",
          "points": [
            "Strike over the top of the ball",
            "Short, firm contact",
            "Keep it low"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": false, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Wider or nearer gates",
            "Task": "Add distance",
            "Equipment": "Cones for gates",
            "People": "Take turns on the line"
          }
        },
        {
          "name": "Grubber and chase (2v1)",
          "type": "Game",
          "setup": "A channel with a defender; two attackers.",
          "play": "When space opens behind the defender, an attacker grubbers into it and the team chases to regather and score. Introduce the idea of kicking as a last option, not a first.",
          "good": "The grubber is used at the right time into real space, and the team chases hard to regather.",
          "points": [
            "Kick into real space",
            "Only when it's on",
            "Chase as a team"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Adjust channel size",
            "Task": "Defender speed controlled",
            "Equipment": "Bibs and cones",
            "People": "2v1, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Into the back zone",
        "diagram": {"size":[25,20],"zones":[{"x":19,"y":0,"w":6,"h":20,"label":"BACK ZONE","tone":"gold"}],"players":[{"x":5,"y":10,"t":"a","n":"1","ball":true},{"x":9,"y":14,"t":"a","n":"2"},{"x":13,"y":7,"t":"d","n":"1"},{"x":14,"y":13,"t":"d","n":"2"}],"moves":[{"k":"kick","from":[5,10],"to":[21,10],"bend":0},{"k":"run","from":[9,14],"to":[20,14],"bend":0}],"notes":[{"x":12,"y":18.8,"text":"grubber low, chase hard"}],"label":"A grubber into the space behind, regathered by your own team, is worth double."},
          "setup": "A 25m x 20m pitch with a 6m zone marked behind each defence. Teams of four, tag rules.",
          "play": "A grubber that rolls into the back zone and is regathered by the kicking team scores double. Children learn to spot when a defence has pushed up and left space behind — and, just as importantly, that a grubber into no space achieves nothing at all.",
          "condition": "A grubber into the back zone, regathered by your own team, is worth two.",
          "good": "The grubber is used at the right moment into genuine space, and the whole team chases to regather.",
          "points": [
            "Strike over the top to keep it low",
            "Kick into real space only",
            "Chase as a team"
          ],
          "questions": [
            "How do you know there's space behind them?",
            "What happens when you grubber with nobody chasing?",
            "Would passing have been better on that one?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Deeper back zone makes the target easier to hit",
            "Task": "Remove the double points once they choose well",
            "Equipment": "Cones marking the back zone",
            "People": "Even teams, rotate often"
          }
        }
      ],
      "safety": [
        "Clear the space ahead before kicking.",
        "Controlled defender speed.",
        "One direction where possible."
      ]
    },
    {
      "week": 5,
      "title": "When to kick in a game",
      "objective": "Make good decisions about when to kick and when to keep the ball.",
      "coachingPoints": [
        "Keep the ball if support is there",
        "Kick only into clear space",
        "A kick is a team decision"
      ],
      "activities": [
        {
          "name": "Kick or keep",
          "type": "Warm-up",
          "setup": "A grid with a coloured zone that is 'clear space'.",
          "play": "On each turn players decide: pass/run if a team-mate is free, or kick if the clear zone is open. Rewards the right choice, not just kicking.",
          "good": "Players choose to keep the ball when support is available and only kick into genuine space.",
          "points": [
            "Read the space first",
            "Keep it if you can",
            "Kick only when it's on"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Adjust the clear zone size",
            "Task": "Add a defender",
            "Equipment": "Cones mark the zone",
            "People": "Small groups, rotate"
          }
        },
        {
          "name": "Small game with kicks",
          "type": "Game",
          "setup": "A small-sided game where kicking is allowed into space beyond a marked line.",
          "play": "Teams play mostly by running and passing, using an occasional controlled kick into space. Celebrate smart decisions.",
          "good": "Kicking is used sparingly and sensibly, with the team chasing to compete for the ball.",
          "points": [
            "Kick as a last option",
            "Into space, then chase",
            "Talk it through"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Right-size the pitch",
            "Task": "Limit kicks per possession",
            "Equipment": "Clear lines and bibs",
            "People": "Even teams, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "One kick rugby",
        "diagram": {"size":[30,20],"zones":[{"x":27,"y":0,"w":3,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":5,"y":10,"t":"a","n":"1","ball":true},{"x":9,"y":6,"t":"a","n":"2"},{"x":11,"y":15,"t":"a","n":"3"},{"x":14,"y":8,"t":"d","n":"1"},{"x":16,"y":14,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[5,10],"to":[9,6]},{"k":"kick","from":[9,6],"to":[25,6],"bend":-4}],"notes":[{"x":10,"y":19,"text":"one kick per possession"}],"label":"One kick per possession. Because it's precious, they start asking whether it's the right moment."},
          "setup": "A 30m x 20m pitch, teams of four or five, tag rules.",
          "play": "Each team gets exactly one kick per possession. They can use it whenever they like — or not at all. Because it is precious, children stop kicking aimlessly and start asking whether this is really the right moment, which is the decision that matters.",
          "condition": "One kick per possession. Use it well or keep the ball in hand.",
          "good": "Kicks are rare, deliberate and into real space, and teams are happy to keep the ball when running is on.",
          "points": [
            "Keep the ball if support is there",
            "Kick only into clear space",
            "A kick is a team decision — talk first"
          ],
          "questions": [
            "Was that the right moment to use your kick?",
            "What did you see that made you kick?",
            "When is keeping the ball the braver choice?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 8 },
          "step": {
            "Space": "Bigger pitch creates more genuine kicking space",
            "Task": "Two kicks per possession for a younger group",
            "Equipment": "Clear lines and bibs",
            "People": "Even teams; rotate the decision-maker"
          }
        }
      ],
      "safety": [
        "Kicks into space only, never at players.",
        "Big enough space; clear zones.",
        "Water and rotation."
      ]
    },
    {
      "week": 6,
      "title": "Game day & celebration",
      "objective": "Show off controlled kicking in fun games and celebrate everyone.",
      "coachingPoints": [
        "Let them play",
        "Praise smart kicking decisions",
        "Recognise every player"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Short stations revisiting favourite kicking drills.",
          "play": "Small groups rotate through quick confidence-builders before the games.",
          "good": "Everyone gets a win and warms up smiling.",
          "points": [
            "Revisit best bits",
            "Everyone succeeds",
            "Keep it light"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Compact stations",
            "Task": "Let players choose",
            "Equipment": "Reuse kit",
            "People": "Small rotating groups"
          }
        },
        {
          "name": "Festival games & awards",
          "type": "Game",
          "setup": "Short small-sided matches finishing with a huddle and awards.",
          "play": "Play for enjoyment. Finish by naming how each player's kicking and decisions have grown and hand out values awards.",
          "good": "Every child plays lots, kicks with control, and leaves proud.",
          "points": [
            "Let them play",
            "Name each player's growth",
            "Thank players and parents"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Right-sized pitches",
            "Task": "Mixed-ability teams",
            "Equipment": "Bibs, lines, badges ready",
            "People": "Rotate so all mix"
          }
        },
        {
          "type": "Gameplay",
          "name": "Invent the kicking game",
        "diagram": {"size":[30,16],"halfway":true,"zones":[{"x":23,"y":4,"w":7,"h":8,"tone":"gold"}],"players":[{"x":6,"y":8,"t":"a","n":"1","ball":true},{"x":9,"y":12,"t":"a","n":"2"},{"x":21,"y":6,"t":"d","n":"1"}],"notes":[{"x":11,"y":2.5,"text":"the players decide"}],"label":"The squad sets the zones and scoring. The coach checks it's safe, then keeps quiet."},
          "setup": "A big open space, mixed teams, all the block's kit available. Huddle first.",
          "play": "The squad designs the final game — zones, scoring, and one kicking rule of their own. Check it is safe, then let them play it and keep quiet.",
          "condition": "The players set the rules. The coach checks the safety and then stays quiet.",
          "good": "Children run a game they invented, keep it safe, and play with genuine enthusiasm.",
          "points": [
            "Let them decide and let them play",
            "Check the space before every kick",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this better for everybody?",
            "Is that safe for everyone on the pitch?",
            "What's the best kick you've hit in six weeks?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Plenty of room; kicks in one direction where possible",
            "Task": "Offer two options if they stall",
            "Equipment": "Bibs, cones and badges ready",
            "People": "Mixed-ability teams so everyone mixes"
          }
        }
      ],
      "safety": [
        "Fair play; kicks into space only.",
        "Water and rest.",
        "Finish calm and positive."
      ]
    }
  ]
};
