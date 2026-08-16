// Catching
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.
// Plan B tags: every activity carries "planB" — wet (fine in heavy rain: nobody
// stands still long enough to get cold), indoor (works in a sports hall: no going
// to ground, no punting, no 20m+ pitch), singleCoach (one adult can run it safely
// with a full squad — live tackling is deliberately marked false), and minPlayers
// (fewest players it still works with). Edit them freely; they drive the Plan B button.

export const catching = {
  "label": "Catching",
  "emoji": "🤲",
  "ageNote": "Suitable for all ages. Ready hands and watching the ball all the way in.",
  "values": [
    "Discipline"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "Ready hands",
      "objective": "Catch a gently thrown or rolled ball with soft, ready hands.",
      "coachingPoints": [
        "Hands up and ready early, fingers spread",
        "Watch the ball all the way in",
        "Soft hands — give a little as it lands"
      ],
      "activities": [
        {
          "name": "Roll and gather",
          "type": "Warm-up",
          "setup": "Pairs a few metres apart.",
          "play": "One rolls the ball along the ground, the other gets low, watches it into the hands and gathers cleanly. Then progress to gentle underarm throws to the chest.",
          "good": "Player gets into line with the ball, watches it in and gathers softly without fumbling.",
          "points": [
            "Get in line with the ball",
            "Watch it in",
            "Soft, giving hands"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Closer pairs for easier catches",
            "Task": "Progress from roll to throw",
            "Equipment": "Bigger/softer ball first",
            "People": "Pairs, plenty of touches"
          }
        },
        {
          "name": "Target hands",
          "type": "Skill",
          "setup": "Pairs three metres apart.",
          "play": "The catcher holds their hands up as a 'W' target; the thrower aims for the target. Every five clean catches, step back.",
          "good": "Hands are up as a clear target before the ball arrives and catches are clean.",
          "points": [
            "Make a 'W' target",
            "Reach to the ball",
            "Pull it into the chest"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Adjust the distance",
            "Task": "Vary the height of the throw",
            "Equipment": "Lighter ball if needed",
            "People": "Pairs, then small groups"
          }
        },
        {
          "type": "Gameplay",
          "name": "Catch to score",
        "diagram": {"size":[15,12],"zones":[{"x":12,"y":0,"w":3,"h":12,"label":"ZONE","tone":"gold"}],"players":[{"x":3,"y":6,"t":"a","n":"1","ball":true},{"x":13.5,"y":8.5,"t":"a","n":"2"},{"x":8,"y":5,"t":"d","n":"1"}],"moves":[{"k":"pass","from":[3,6],"to":[13.5,8.5],"bend":1.5}],"notes":[{"x":7,"y":11,"text":"drop it = turnover"}],"label":"Only a clean catch inside the zone scores. Hands up early, watch it all the way in."},
          "setup": "A 15m x 12m pitch with a 2m scoring zone at each end. Teams of three or four.",
          "play": "The only way to score is to catch a pass cleanly on the full inside the scoring zone. A dropped ball in the zone is a turnover, so children very quickly learn to get their hands up early and watch the ball right in, even with the game moving around them.",
          "condition": "A try only counts from a clean catch in the zone. Any drop hands the ball over.",
          "good": "Hands are up as a target before the ball is thrown, and catches stay clean under a bit of excitement.",
          "points": [
            "Make a 'W' target with your hands",
            "Watch it all the way in",
            "Soft hands — give a little"
          ],
          "questions": [
            "What do you do before the ball is thrown?",
            "Where are you looking as it arrives?",
            "What made the easy catches easy?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Deeper scoring zone gives more time to adjust",
            "Task": "Allow a bounce for a younger group",
            "Equipment": "Softer, larger ball to build confidence",
            "People": "4v3 to help the attacking team"
          }
        }
      ],
      "safety": [
        "Space pairs apart.",
        "Soft balls to build confidence.",
        "Headcount before you start."
      ]
    },
    {
      "week": 2,
      "title": "Catching a pass",
      "objective": "Catch a sideways pass cleanly at chest height from both sides.",
      "coachingPoints": [
        "Hands ready towards the passer",
        "Watch it into your hands",
        "Catch, then bring it in safe"
      ],
      "activities": [
        {
          "name": "Left and right catches",
          "type": "Warm-up",
          "setup": "Threes in a short line, one ball.",
          "play": "The middle player catches passes coming from each side in turn, reaching towards the ball. Rotate positions.",
          "good": "The catcher reaches for the ball on both sides and secures it before passing on.",
          "points": [
            "Reach to receive",
            "Watch it in",
            "Both sides equally"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Shorten the line",
            "Task": "Vary the pace of passes",
            "Equipment": "Beanbag then ball",
            "People": "Threes for touches"
          }
        },
        {
          "name": "Catch and score",
          "type": "Skill",
          "setup": "Pairs, a try-line a few metres behind the catcher.",
          "play": "The catcher receives a pass, secures it and steps back to place a try. Emphasise catching first, then moving.",
          "good": "The ball is caught cleanly and controlled before the player moves to score.",
          "points": [
            "Catch first, then move",
            "Two hands to secure",
            "Watch it all the way"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Adjust the distance to the line",
            "Task": "Add a slight movement to the catch",
            "Equipment": "Cones for the line",
            "People": "Pairs, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Left then right",
        "diagram": {"size":[15,15],"players":[{"x":7.5,"y":7.5,"t":"a","n":"1"},{"x":3,"y":4,"t":"a","n":"2","ball":true},{"x":12,"y":4,"t":"a","n":"3"},{"x":7.5,"y":13,"t":"a","n":"4"}],"moves":[{"k":"pass","from":[3,4],"to":[7.5,7.5]},{"k":"pass","from":[7.5,7.5],"to":[12,4],"bend":-1}],"notes":[{"x":7.5,"y":2,"text":"alternate the side"}],"label":"Each catch must come from the opposite side to the last, so both hands get equal work."},
          "setup": "A 15m x 15m pitch, teams of four, no running with the ball.",
          "play": "A passing and catching game where each player must alternate the side they receive from — if your last catch came from the left, the next has to come from the right. It stops children turning their strong side to every pass and quietly doubles the practice on the weaker one.",
          "condition": "You must receive from the opposite side to your last catch.",
          "good": "Players reach for the ball equally well on both sides rather than swivelling to protect one hand.",
          "points": [
            "Reach towards the ball",
            "Watch it into your hands",
            "Both sides, equally good"
          ],
          "questions": [
            "Which side is trickier for you?",
            "What do you change when it comes from your weaker side?",
            "How do you let your team-mate know where you want it?"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Smaller pitch shortens the passes",
            "Task": "Drop the alternating rule if it stalls the game",
            "Equipment": "Beanbags first, then a ball",
            "People": "Teams of four for maximum touches"
          }
        }
      ],
      "safety": [
        "Keep groups spaced.",
        "Non-contact.",
        "Watch for collisions."
      ]
    },
    {
      "week": 3,
      "title": "Catching on the move",
      "objective": "Catch a pass while jogging without breaking stride.",
      "coachingPoints": [
        "Hands ready before the ball comes",
        "Run onto the ball",
        "Keep moving after the catch"
      ],
      "activities": [
        {
          "name": "Jog and gather",
          "type": "Warm-up",
          "setup": "Threes jogging across a channel, one ball.",
          "play": "Players pass and catch on the move down the channel, receiving with hands ready and not slowing down.",
          "good": "Catches are made on the move with no stumble, and momentum is kept.",
          "points": [
            "Hands ready early",
            "Run onto it",
            "Don't slow down to catch"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Short channel to start",
            "Task": "Add a cone gate to run through",
            "Equipment": "Lighter ball",
            "People": "Threes"
          }
        },
        {
          "name": "Relay catch",
          "type": "Game",
          "setup": "Teams in relay lines, passing and catching to move a ball to a line and back.",
          "play": "Each player must catch cleanly before passing on; a drop means gather and continue. Friendly, low-pressure races.",
          "good": "Players prioritise a clean catch over speed and keep the ball moving.",
          "points": [
            "Clean catch first",
            "Then pass on",
            "Stay ready in the queue"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 4 },
          "step": {
            "Space": "Adjust the distance",
            "Task": "Reward clean sequences, not just speed",
            "Equipment": "Bibs by team",
            "People": "Even teams"
          }
        },
        {
          "type": "Gameplay",
          "name": "Catch on the run",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":4,"y":10,"t":"a","n":"1","ball":true},{"x":9,"y":5,"t":"a","n":"2"},{"x":12,"y":8,"t":"d","n":"1"}],"moves":[{"k":"run","from":[9,5],"to":[13,3.5],"bend":0},{"k":"pass","from":[4,10],"to":[12,3.8],"bend":-2}],"notes":[{"x":8,"y":13.5,"text":"catch on the move"}],"label":"You must be moving as you catch. Run onto the ball rather than waiting for it."},
          "setup": "A 20m x 15m pitch, teams of four, tag rules.",
          "play": "A flowing tag game with one condition: you must be moving when you catch. Stop to receive and it's a turnover. Children stop drifting to a halt and waiting for the ball, and start running onto it — which is how catching actually happens in a match.",
          "condition": "A stationary catch is a turnover. Feet must be moving.",
          "good": "Catches are taken on the move with no stumble, and momentum carries into the next play.",
          "points": [
            "Hands ready before it arrives",
            "Run onto the ball",
            "Don't slow down to catch"
          ],
          "questions": [
            "Is it harder or easier to catch while moving — why?",
            "When do you get your hands up?",
            "What does your passer need from you?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Bigger pitch gives room to build up speed",
            "Task": "Walking pace first, then jogging",
            "Equipment": "Lighter ball to start",
            "People": "Even teams, rotate often"
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
      "title": "Catching under a little pressure",
      "objective": "Hold onto the catch when a defender is closing in.",
      "coachingPoints": [
        "Watch the ball, not the defender",
        "Secure it, then decide",
        "Stay calm — soft hands still"
      ],
      "activities": [
        {
          "name": "Catch and go",
          "type": "Warm-up",
          "setup": "Pairs with a passive defender a few metres away.",
          "play": "The catcher receives a pass with a defender jogging towards them, secures it, then evades to a line. Defender speed stays controlled.",
          "good": "The catcher keeps their eyes on the ball and secures it despite the approaching defender.",
          "points": [
            "Eyes on the ball",
            "Secure first",
            "Then move"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "More space to reduce pressure",
            "Task": "Defender walks then jogs",
            "Equipment": "Bibs and cones",
            "People": "Rotate roles"
          }
        },
        {
          "name": "Contested short (2v1)",
          "type": "Game",
          "setup": "A small grid, two attackers passing versus one defender.",
          "play": "Attackers keep the ball with clean catches under light pressure and reach the line; a drop or touch turns it over.",
          "good": "Catches stay clean even with a defender near, and the ball keeps moving.",
          "points": [
            "Ready hands under pressure",
            "Catch, then pass early",
            "Support the catcher"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Bigger grid to ease pressure",
            "Task": "Defender's intensity controlled",
            "Equipment": "Bibs by team",
            "People": "2v1, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Shadow endball",
        "diagram": {"size":[15,12],"zones":[{"x":12,"y":0,"w":3,"h":12,"label":"ZONE","tone":"gold"}],"players":[{"x":3,"y":5,"t":"a","n":"1","ball":true},{"x":13.5,"y":8.5,"t":"a","n":"2"},{"x":11,"y":8,"t":"d","n":"1"}],"moves":[{"k":"pass","from":[3,5],"to":[13.5,8.5],"bend":1.2}],"notes":[{"x":7,"y":11,"text":"distract, never touch"}],"label":"A defender waves and shadows as the ball arrives. Watch the ball, not the defender."},
          "setup": "A 15m x 12m pitch with scoring zones. Teams of four. Defenders may shadow but not touch the catcher.",
          "play": "Endball with a defender allowed to stand close and wave their arms as the ball arrives — the kind of distraction that makes children take their eye off it. Learning to watch the ball rather than the defender is the whole point of the game.",
          "condition": "Defenders may shadow and distract the catcher, but never make contact.",
          "good": "Catchers keep their eyes on the ball with a defender in their face, and secure it before deciding what to do next.",
          "points": [
            "Eyes on the ball, not the defender",
            "Secure it first, then decide",
            "Stay calm — soft hands still"
          ],
          "questions": [
            "What were you looking at when you dropped one?",
            "How do you block out the defender?",
            "What helps you stay calm when they're close?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Bigger pitch reduces the pressure",
            "Task": "Defender stands still at first, then moves",
            "Equipment": "Bibs so defenders are clear",
            "People": "Rotate the shadowing role"
          }
        }
      ],
      "safety": [
        "Controlled defender speed.",
        "Touch/tag only.",
        "Matched, short queues."
      ]
    },
    {
      "week": 5,
      "title": "The high ball (gentle)",
      "objective": "Catch a gently lofted ball, calling for it and claiming it safely.",
      "coachingPoints": [
        "Call 'mine!' loud and early",
        "Watch it into the hands above the head",
        "Slightly turn side-on as it lands"
      ],
      "activities": [
        {
          "name": "Call and claim",
          "type": "Warm-up",
          "setup": "Small groups, a coach or player lobs the ball gently upward.",
          "play": "One player calls 'mine!', moves under the ball and catches it above head height. Take turns so everyone claims a few.",
          "good": "The catcher calls early, gets under the ball and catches with hands up, watching it in.",
          "points": [
            "Call early and loud",
            "Get under the ball",
            "Watch it into the hands"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": false, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Lower, softer lobs first",
            "Task": "Add a short run-in",
            "Equipment": "Softer ball to start",
            "People": "Small groups, take turns"
          }
        },
        {
          "name": "Catch and counter",
          "type": "Game",
          "setup": "A small pitch, gentle lofted restart, then a short game.",
          "play": "One team claims the gentle high ball and immediately attacks; if dropped, the other team takes over. Keep the lofts gentle and low.",
          "good": "Players call for and claim the ball confidently, then get straight into the game.",
          "points": [
            "Communicate to claim",
            "Secure before running",
            "Support the catcher"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": false, "indoor": true, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Adjust loft height",
            "Task": "Lower ball for younger groups",
            "Equipment": "Softer ball",
            "People": "Even teams, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Claim the restart",
        "diagram": {"size":[24,16],"halfway":true,"players":[{"x":6,"y":8,"t":"a","n":"1"},{"x":9,"y":5,"t":"a","n":"2"},{"x":15,"y":8,"t":"d","n":"1"},{"x":18,"y":11,"t":"d","n":"2"}],"moves":[{"k":"kick","from":[2,8],"to":[12,8],"bend":-5}],"notes":[{"x":12,"y":14.5,"text":"call \"mine!\" early"}],"label":"Every restart is a gentle lob into the middle. Whoever claims it cleanly attacks."},
          "setup": "A 20m x 15m pitch. The coach or a player restarts every passage with a gentle, low lob.",
          "play": "Every time a try is scored or the ball goes dead, the game restarts with a soft lofted ball into the middle. Whichever team calls for and claims it attacks. Children get many more high-ball catches than a drill would ever give them, and the calling becomes automatic.",
          "condition": "Every restart is a gentle lob. Whoever claims it cleanly gets the attack.",
          "good": "Players call 'mine!' early and loudly, get underneath the ball and claim it with hands up.",
          "points": [
            "Call early and loud",
            "Get right under it",
            "Watch it into your hands"
          ],
          "questions": [
            "What happens when two of you go for the same ball?",
            "Who should call — and how early?",
            "Where do you want to be standing before it's kicked?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": false, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Lower, softer lobs to start",
            "Task": "Restart to a named player to guarantee touches",
            "Equipment": "A softer ball for confidence",
            "People": "Even teams; rotate who competes"
          }
        }
      ],
      "safety": [
        "Keep lofts gentle and low.",
        "Space groups so no collisions under the ball.",
        "Water and rest."
      ]
    },
    {
      "week": 6,
      "title": "Game day & celebration",
      "objective": "Show off safe hands in fun games and celebrate everyone.",
      "coachingPoints": [
        "Let them play",
        "Praise clean catches and communication",
        "Recognise every player"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Short stations revisiting favourite catching drills.",
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
          "planB": { "wet": true, "indoor": true, "singleCoach": false, "minPlayers": 6 },
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
          "play": "Play for enjoyment. Finish by naming how each player's catching and confidence has grown and hand out values awards.",
          "good": "Every child plays lots, catches with confidence, and leaves proud.",
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
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Right-sized pitches",
            "Task": "Mixed-ability teams",
            "Equipment": "Bibs, lines, badges ready",
            "People": "Rotate so all mix"
          }
        },
        {
          "type": "Gameplay",
          "name": "Invent the catching game",
        "diagram": {"size":[18,14],"zones":[{"x":15,"y":0,"w":3,"h":14,"tone":"gold"}],"players":[{"x":5,"y":5,"t":"a","n":"1","ball":true},{"x":6,"y":10,"t":"a","n":"2"},{"x":11,"y":7,"t":"d","n":"1"}],"notes":[{"x":8,"y":2.5,"text":"the players decide"}],"label":"The squad sets the scoring and one catching rule of their own."},
          "setup": "A small pitch, mixed teams, all the block's kit available. Huddle first.",
          "play": "The squad designs the final game — scoring, pitch, and one catching rule of their own. Then let them play it and keep your voice out of it as far as you can.",
          "condition": "The players set the rules. The coach referees lightly and stays quiet.",
          "good": "Children run a game they own, sort out their own disagreements, and play hard.",
          "points": [
            "Let them decide and let them play",
            "Say less than feels natural",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this better for everybody?",
            "Is that fair on both teams?",
            "What's the best catch you've taken in six weeks?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 6 },
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
