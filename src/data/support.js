// Support play
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.

export const support = {
  "label": "Support play",
  "emoji": "🤝",
  "ageNote": "Suitable for all ages. Staying connected and backing up the ball-carrier.",
  "values": [
    "Solidarity",
    "Integrity"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "Stay connected",
      "objective": "Follow the ball-carrier closely and stay ready to help.",
      "coachingPoints": [
        "Never walk when a team-mate has the ball",
        "Stay close, an arm's reach away",
        "Be ready to receive"
      ],
      "activities": [
        {
          "name": "Follow the leader",
          "type": "Warm-up",
          "setup": "Threes, one ball, in a small area.",
          "play": "One player carries; the other two follow close behind. On the whistle the leader changes, so everyone practises supporting and leading.",
          "good": "Supporters stay close and alert rather than drifting away or standing still.",
          "points": [
            "Stay close",
            "Eyes on the carrier",
            "Ready to help"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Tighter area keeps support close",
            "Task": "Add a pass on the whistle",
            "Equipment": "One ball per three",
            "People": "Threes are ideal for support shape"
          }
        },
        {
          "name": "Shadow pairs",
          "type": "Skill",
          "setup": "Pairs, one carrier and one supporter, jogging around a grid.",
          "play": "The supporter mirrors the carrier's movements a step behind and to the side, always in a position to receive a pass.",
          "good": "The supporter holds a useful position — close, slightly behind, and to the side.",
          "points": [
            "A step behind and to the side",
            "Match their movement",
            "Talk to them"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Smaller grid",
            "Task": "Add a pass every few seconds",
            "Equipment": "One ball per pair",
            "People": "Pairs, then threes"
          }
        },
        {
          "type": "Gameplay",
          "name": "Nobody scores alone",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":11,"y":6,"t":"a","n":"1","ball":true},{"x":13,"y":9.5,"t":"a","n":"2"},{"x":9,"y":10,"t":"d","n":"1"},{"x":7,"y":4,"t":"d","n":"2"}],"moves":[{"k":"run","from":[11,6],"to":[17,5],"bend":0},{"k":"run","from":[13,9.5],"to":[17,8.5],"bend":0}],"notes":[{"x":9,"y":14,"text":"team-mate within 5m"}],"label":"A try only counts with a team-mate close by, so nobody runs off on their own."},
          "setup": "A 20m x 15m pitch, teams of four, tag rules.",
          "play": "Ordinary tag rugby with a single rule: a try only counts if a team-mate is within a few metres of the scorer when the ball is grounded. Solo breakaways stop being worth anything, and children start dragging each other along instead of running off on their own.",
          "condition": "A try only counts with a team-mate within about five metres.",
          "good": "Players chase after the carrier instead of watching, and nobody is left running alone.",
          "points": [
            "Never walk when a team-mate has the ball",
            "Stay within reach",
            "Be ready to receive"
          ],
          "questions": [
            "Where should you be when a team-mate breaks away?",
            "What stopped you getting there in time?",
            "How does it feel to score with someone alongside you?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Smaller pitch keeps supporters naturally close",
            "Task": "Widen the required distance if it's too hard",
            "Equipment": "Bibs by team",
            "People": "Teams of four so support is achievable"
          }
        }
      ],
      "safety": [
        "Manage spacing so supporters don't collide.",
        "Non-contact.",
        "Headcount before you start."
      ]
    },
    {
      "week": 2,
      "title": "Depth and angle",
      "objective": "Support at a good depth and angle so a pass is easy to give and take.",
      "coachingPoints": [
        "Support slightly deeper, not flat",
        "Come onto the ball at an angle",
        "Hands ready early"
      ],
      "activities": [
        {
          "name": "Angle run-ins",
          "type": "Warm-up",
          "setup": "Threes in a channel with cones marking a support 'lane' slightly behind.",
          "play": "The carrier jogs; supporters run the marked angled lane to receive, so they arrive onto the ball rather than standing waiting.",
          "good": "Supporters run a slight angle and arrive at pace, not flat or stationary.",
          "points": [
            "Stay a little deeper",
            "Angle onto the ball",
            "Time your run"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Adjust the support lane width",
            "Task": "Vary when the pass comes",
            "Equipment": "Cones to mark lanes",
            "People": "Threes"
          }
        },
        {
          "name": "Pass and support",
          "type": "Skill",
          "setup": "Groups of three jogging across the pitch, passing down the line.",
          "play": "After passing, each player loops or follows to become a support option again, keeping the chain going to the line.",
          "good": "The passer immediately becomes a supporter again rather than stopping.",
          "points": [
            "Pass then support",
            "Keep the chain going",
            "Depth on the pass"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Narrow channel to keep it tight",
            "Task": "Add a defender cone",
            "Equipment": "Lighter ball",
            "People": "Threes"
          }
        },
        {
          "type": "Gameplay",
          "name": "Freeze frame rugby",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":10,"y":7,"t":"a","n":"1","ball":true},{"x":7,"y":10,"t":"a","n":"2"},{"x":6,"y":4,"t":"a","n":"3"},{"x":13,"y":6,"t":"d","n":"1"},{"x":14,"y":11,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[10,7],"to":[7,10],"bend":1}],"notes":[{"x":6,"y":13.5,"text":"support behind the ball"}],"label":"Blow the whistle and everyone freezes. Is anybody behind the ball to receive?"},
          "setup": "A 20m x 15m pitch, teams of four, tag rules. Coach carries a whistle.",
          "play": "A normal game, but every so often you blow the whistle and everybody freezes exactly where they are. Look around together: is there a team-mate behind the ball? Are the supporters flat or deep? Ask, don't tell — then restart from the same spot and play on.",
          "condition": "On the whistle everyone freezes. At least one supporter must be behind the ball.",
          "good": "Supporters hold a useful position — a little deeper and to the side — even when the game is moving quickly.",
          "points": [
            "Support slightly deeper, not flat",
            "Come onto the ball at an angle",
            "Hands ready early"
          ],
          "questions": [
            "Look around — who's behind the ball?",
            "If the carrier passed right now, who could take it?",
            "Are you too flat to be any use there?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Smaller pitch keeps everyone connected",
            "Task": "Freeze less often as their shape improves",
            "Equipment": "A whistle they can hear",
            "People": "Small teams so freezes are quick to read"
          }
        }
      ],
      "safety": [
        "Keep groups spaced.",
        "Non-contact.",
        "Watch for collisions as they loop."
      ]
    },
    {
      "week": 3,
      "title": "Communicate and time it",
      "objective": "Talk to the carrier and time the support run so the pass is easy.",
      "coachingPoints": [
        "Call 'with you!' so the carrier knows",
        "Time your run to arrive as they need you",
        "Loud, clear, early"
      ],
      "activities": [
        {
          "name": "Call for it",
          "type": "Warm-up",
          "setup": "Threes in a grid, one ball.",
          "play": "Supporters must call clearly before the carrier will pass; no call, no pass. Builds the habit of communicating.",
          "good": "Supporters call early and clearly, and the carrier passes to the voice.",
          "points": [
            "Call early and loud",
            "Carrier passes to the voice",
            "Keep talking"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Smaller grid",
            "Task": "Add a second supporter to choose between",
            "Equipment": "One ball",
            "People": "Threes, rotate"
          }
        },
        {
          "name": "Continuity relay",
          "type": "Game",
          "setup": "Teams move a ball to a line and back using passes and support runs only.",
          "play": "Players must support and communicate to keep the ball moving; a dropped chain resets. Friendly races.",
          "good": "Constant talk and well-timed support keep the ball flowing.",
          "points": [
            "Talk constantly",
            "Support arrives on time",
            "Keep it flowing"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Adjust distance",
            "Task": "Reward smooth chains",
            "Equipment": "Bibs by team",
            "People": "Even teams"
          }
        },
        {
          "type": "Gameplay",
          "name": "No call, no pass",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":6,"y":7.5,"t":"a","n":"1","ball":true},{"x":10,"y":4,"t":"a","n":"2"},{"x":10,"y":11,"t":"a","n":"3"},{"x":12,"y":7.5,"t":"d","n":"1"}],"moves":[{"k":"pass","from":[6,7.5],"to":[10,4]}],"notes":[{"x":12.5,"y":3,"text":"\"Ava!\""},{"x":13.5,"y":13.6,"text":"(silent)"}],"label":"The carrier may only pass to someone who has shouted for it. The pitch gets loud."},
          "setup": "A 20m x 15m pitch, teams of four, tag rules.",
          "play": "The carrier is not allowed to pass to anyone who hasn't shouted for it. Silent players don't get the ball. Within a couple of minutes the pitch is loud, and children discover that talking is what makes a team work rather than an optional extra.",
          "condition": "No shout, no pass. The carrier passes to the voice.",
          "good": "Supporters call early, clearly and by name, and the carrier finds them without having to look.",
          "points": [
            "Call early and loud",
            "Use their name",
            "Keep talking the whole play"
          ],
          "questions": [
            "Whose call was easiest to hear — why?",
            "What should you shout so the carrier knows where you are?",
            "How early is early enough?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Smaller pitch makes calls easier to hear",
            "Task": "Require the caller's name to be used",
            "Equipment": "Bibs by team",
            "People": "Teams of three or four, rotate"
          }
        }
      ],
      "safety": [
        "Manage spacing.",
        "Non-contact.",
        "Rotate to keep fresh."
      ]
    },
    {
      "week": 4,
      "title": "Support under pressure (2v1)",
      "objective": "Keep the ball alive by supporting the carrier when a defender arrives.",
      "coachingPoints": [
        "Get to the carrier before the defender does",
        "Take the pass at pace",
        "Communicate through contact/touch"
      ],
      "activities": [
        {
          "name": "Tag and pop",
          "type": "Warm-up",
          "setup": "Pairs in a channel with a passive defender.",
          "play": "When the carrier is tagged/touched, they pop the ball to the arriving supporter who continues. Support must arrive early.",
          "good": "Support arrives before or as the carrier is touched, and the pop keeps the ball moving.",
          "points": [
            "Support early",
            "Pop, don't throw",
            "Keep moving"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Short channel",
            "Task": "Defender walks then jogs",
            "Equipment": "Soft ball for the pop",
            "People": "Pairs then threes"
          }
        },
        {
          "name": "2v1 continuity",
          "type": "Game",
          "setup": "A channel, two attackers versus one defender, touch rules with continuity.",
          "play": "A touch isn't a turnover — the carrier pops to support and play continues to the line. Rewards backing up.",
          "good": "The supporter consistently backs up the carrier so a touch never ends the move.",
          "points": [
            "Back up every carry",
            "Pop to support",
            "Talk it through"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Wider channel to create space",
            "Task": "Defender's speed controlled",
            "Equipment": "Bibs and cones",
            "People": "2v1, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Rolling rugby",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":6,"y":7.5,"t":"a","n":"1","ball":true},{"x":8.5,"y":9.5,"t":"a","n":"2"},{"x":12,"y":6,"t":"a","n":"3"},{"x":9,"y":7,"t":"d","n":"1"},{"x":13,"y":10,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[6,7.5],"to":[8.5,9.5],"bend":0.6},{"k":"pass","from":[8.5,9.5],"to":[12,6],"bend":0.8},{"k":"run","from":[12,6],"to":[18,5],"bend":0}],"notes":[{"x":7,"y":13.5,"text":"tagged → pop → go"}],"label":"A tag doesn't stop play. The carrier pops to support and the game rolls straight on."},
          "setup": "A 20m x 15m pitch, teams of four, tag rules with continuity.",
          "play": "A tag no longer ends the play. The tagged carrier immediately pops the ball to a supporter and the game rolls straight on. If nobody is there to take it, the move dies — which is a far better lesson than any lecture about supporting.",
          "condition": "A tag is not a turnover. The carrier pops to support and play continues.",
          "good": "Someone consistently arrives at the carrier's shoulder before the tag, so attacks flow across several phases.",
          "points": [
            "Get there before the tag does",
            "Pop it, don't throw it",
            "Keep moving after the pop"
          ],
          "questions": [
            "When should you start running to support?",
            "What happens to the attack when nobody arrives?",
            "How close do you need to be for a pop pass?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Smaller pitch makes support distances shorter",
            "Task": "Cap it at four tags then turnover to keep it fair",
            "Equipment": "Soft ball for the pop",
            "People": "Even teams, rotate often"
          }
        }
      ],
      "safety": [
        "Controlled defender speed.",
        "Touch/tag only, no contact.",
        "Matched, short queues."
      ]
    },
    {
      "week": 5,
      "title": "Support in a small game",
      "objective": "Support the ball-carrier throughout a small-sided game to keep attacks alive.",
      "coachingPoints": [
        "Someone always backs up the carrier",
        "Talk the whole time",
        "Depth and angle keep options open"
      ],
      "activities": [
        {
          "name": "Never alone (3v3)",
          "type": "Warm-up",
          "setup": "A small pitch, teams of three, continuity touch rules.",
          "play": "The rule: the carrier must always have a supporter within a few metres or the ball turns over. Encourages constant support.",
          "good": "There is always a supporter close to the carrier, and the ball keeps moving.",
          "points": [
            "Never leave the carrier alone",
            "Constant talk",
            "Keep depth"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Adjust the pitch",
            "Task": "Change the required support distance",
            "Equipment": "Bibs by team",
            "People": "3v3, rotate"
          }
        },
        {
          "name": "Continuous tag",
          "type": "Game",
          "setup": "A small pitch, tag rules where a tag is not a turnover.",
          "play": "The carrier pops to support after each tag and play continues, rewarding teamwork over solo runs.",
          "good": "Support runs and communication keep every attack alive across several tags.",
          "points": [
            "Support every carry",
            "Talk constantly",
            "Team over solo"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Bigger pitch rewards support runs",
            "Task": "Three tags then turnover",
            "Equipment": "Bibs by team",
            "People": "4v4, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Three carriers",
        "diagram": {"size":[25,20],"zones":[{"x":21,"y":0,"w":4,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":4,"y":10,"t":"a","n":"1","ball":true},{"x":9,"y":6,"t":"a","n":"2"},{"x":15,"y":12,"t":"a","n":"3"},{"x":11,"y":9,"t":"d","n":"1"},{"x":16,"y":7,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[4,10],"to":[9,6]},{"k":"run","from":[9,6],"to":[13,6],"bend":0},{"k":"pass","from":[13,6],"to":[15,12],"bend":1.5},{"k":"run","from":[15,12],"to":[22,12],"bend":0}],"label":"Three different players must carry the ball before a try counts."},
          "setup": "A 25m x 20m pitch, teams of four or five, tag rules.",
          "play": "A try only counts if three different players have carried the ball during that passage of play. It cannot be done without genuine support running, and it spreads the ball to children who might otherwise spend the game watching.",
          "condition": "Three different players must carry the ball before a try counts.",
          "good": "The ball moves through several hands, and support runners arrive at pace rather than trailing behind.",
          "points": [
            "Someone always backs up the carrier",
            "Talk the whole time",
            "Depth and angle keep the options open"
          ],
          "questions": [
            "Who still needs a carry?",
            "How did your team keep the ball alive?",
            "What made the good support runs good?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Bigger pitch buys time to get everyone involved",
            "Task": "Two carriers instead of three for a younger group",
            "Equipment": "Bibs by team",
            "People": "Teams of four keep it achievable"
          }
        }
      ],
      "safety": [
        "Non-contact throughout.",
        "Plenty of space; matched teams.",
        "Water and rotation."
      ]
    },
    {
      "week": 6,
      "title": "Game day & celebration",
      "objective": "Show off teamwork in fun games and celebrate everyone.",
      "coachingPoints": [
        "Let them play",
        "Praise selfless support and talk",
        "Recognise every player"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Short stations revisiting favourite support drills.",
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
          "play": "Play for enjoyment. Finish by naming how each player's support play and teamwork have grown and hand out values awards.",
          "good": "Every child plays lots, supports team-mates, and leaves proud.",
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
          "step": {
            "Space": "Right-sized pitches",
            "Task": "Mixed-ability teams",
            "Equipment": "Bibs, lines, badges ready",
            "People": "Rotate so all mix"
          }
        },
        {
          "type": "Gameplay",
          "name": "Invent the teamwork game",
        "diagram": {"size":[20,15],"players":[{"x":5,"y":5,"t":"a","n":"1","ball":true},{"x":7,"y":10,"t":"a","n":"2"},{"x":9,"y":7,"t":"a","n":"3"},{"x":14,"y":6,"t":"d","n":"1"},{"x":15,"y":11,"t":"d","n":"2"}],"notes":[{"x":10,"y":13.6,"text":"the players decide"}],"label":"After six weeks of support play, the squad designs the finale."},
          "setup": "A small pitch, mixed teams, all the block's kit available. Huddle first.",
          "play": "The squad designs the final game and one teamwork rule of their own. Then let them play it. After six weeks of support play they will usually invent something that makes everyone touch the ball.",
          "condition": "The players set the rules. The coach referees lightly and stays quiet.",
          "good": "Children run their own game, include each other, and settle their own disputes.",
          "points": [
            "Let them decide and let them play",
            "Say less than feels natural",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this better for everybody?",
            "Is that fair on both teams?",
            "Who's been the best team-mate this block?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Whatever they choose, within safe limits",
            "Task": "Offer two options if they stall",
            "Equipment": "Bibs, cones and badges ready",
            "People": "Mixed-ability teams so everyone mixes"
          }
        }
      ],
      "safety": [
        "Fair, non-contact play.",
        "Water and rest.",
        "Finish calm and positive."
      ]
    }
  ]
};
