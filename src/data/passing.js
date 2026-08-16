// Passing
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.
// Plan B tags: every activity carries "planB" — wet (fine in heavy rain: nobody
// stands still long enough to get cold), indoor (works in a sports hall: no going
// to ground, no punting, no 20m+ pitch), singleCoach (one adult can run it safely
// with a full squad — live tackling is deliberately marked false), and minPlayers
// (fewest players it still works with). Edit them freely; they drive the Plan B button.

export const passing = {
  "label": "Passing",
  "emoji": "🙌",
  "ageNote": "Suitable for all ages. Soft, sideways passes with hands as targets.",
  "values": [
    "Solidarity"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "Soft hands, safe pass",
      "objective": "Give and catch a soft, short pass with a partner, making hands a clear target.",
      "coachingPoints": [
        "Make a 'W' with the hands as a target",
        "Swing the ball across, don't throw it hard",
        "Watch the ball all the way in"
      ],
      "activities": [
        {
          "name": "Name and pass",
          "type": "Warm-up",
          "setup": "Small circles of 4–5 players, one ball per circle.",
          "play": "A player calls a team-mate's name, then passes softly to their hands. The catcher calls the next name and passes on. Add a second ball once the group is confident.",
          "good": "Passes are soft and to the hands, names are called before every pass, and catches are watched in.",
          "points": [
            "Call before you pass",
            "Target the hands",
            "Soft, not hard"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 4 },
          "step": {
            "Space": "Smaller circle for shorter, easier passes",
            "Task": "Add a second ball to raise the challenge",
            "Equipment": "Start with a beanbag, then a ball",
            "People": "Two smaller circles so everyone is busy"
          }
        },
        {
          "name": "Pairs passing gates",
          "type": "Skill",
          "setup": "Pairs standing three metres apart, a cone 'gate' between them.",
          "play": "Partners pass the ball back and forth through the gate, sideways across the body. Every ten clean passes, take a step further apart.",
          "good": "The pass travels sideways and softly through the gate and lands in the catcher's hands.",
          "points": [
            "Pass across the body",
            "Point fingers where it's going",
            "Give a soft target"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Move pairs closer or further apart",
            "Task": "Count a streak of clean passes",
            "Equipment": "Lighter ball if needed",
            "People": "Pairs, then threes"
          }
        },
        {
          "type": "Gameplay",
          "name": "Endball",
        "diagram": {"size":[15,12],"zones":[{"x":0,"y":0,"w":2.5,"h":12,"tone":"gold","label":"ZONE"},{"x":12.5,"y":0,"w":2.5,"h":12,"tone":"gold","label":"ZONE"}],"players":[{"x":5,"y":6,"t":"a","n":"1","ball":true},{"x":8,"y":2.5,"t":"a","n":"2"},{"x":9,"y":9.5,"t":"a","n":"3"},{"x":10,"y":6,"t":"d","n":"1"}],"moves":[{"k":"pass","from":[5,6],"to":[8,2.5]},{"k":"pass","from":[8,2.5],"to":[13.5,4],"bend":-1.2}],"label":"No running with the ball at all — it only travels by pass. Catch it in the zone to score."},
          "setup": "A 15m x 12m pitch with a 2m scoring zone at each end. Teams of three or four, one ball.",
          "play": "A team scores by catching a pass inside the opposition scoring zone. Nobody may run with the ball at all — the ball travels only by passing, so every child has to move into space and offer their hands. Defenders may intercept but not touch the carrier.",
          "condition": "No running with the ball. It moves by pass only.",
          "good": "Passes are soft and to the hands, and players move to support rather than standing and shouting.",
          "points": [
            "Hands up as a target",
            "Soft pass, not a hard throw",
            "Move as soon as you've passed"
          ],
          "questions": [
            "How do you make yourself easy to pass to?",
            "What happens when everybody stands still?",
            "Where's the safest place to stand to receive?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Bigger pitch makes keeping the ball easier",
            "Task": "Allow three steps with the ball if it's too static",
            "Equipment": "A softer or smaller ball for younger hands",
            "People": "4v3 in favour of the attacking team to build success"
          }
        }
      ],
      "safety": [
        "Space pairs so passes don't cross other groups.",
        "Soft balls for close passing.",
        "Headcount before you start."
      ]
    },
    {
      "week": 2,
      "title": "Passing both ways",
      "objective": "Pass smoothly to both the left and the right while standing still.",
      "coachingPoints": [
        "Turn the shoulders towards the target",
        "Same soft swing to either side",
        "Reach to receive, hands ready early"
      ],
      "activities": [
        {
          "name": "Left, right, listen",
          "type": "Warm-up",
          "setup": "Threes in a short line, one ball.",
          "play": "The middle player receives and passes on the call of 'left' or 'right', practising both directions. Rotate positions regularly.",
          "good": "Both left and right passes are smooth and accurate, not favouring one side.",
          "points": [
            "Ready hands early",
            "Turn to the target",
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
            "Space": "Shorten the line for easier passes",
            "Task": "Speed up the calls",
            "Equipment": "Beanbag then ball",
            "People": "Threes to maximise touches"
          }
        },
        {
          "name": "Pass down the line",
          "type": "Skill",
          "setup": "Groups of three or four jogging slowly across the pitch in a short line.",
          "play": "The ball is passed sideways along the line to a try-line. Everyone passes and receives. Start walking, then progress to a jog.",
          "good": "Passes stay sideways, players run onto the ball, and hands are ready before the ball arrives.",
          "points": [
            "Sideways pass, not forward",
            "Run onto the ball",
            "Hands ready early"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Narrow the channel to keep passes short",
            "Task": "Walk first, then jog",
            "Equipment": "Lighter ball to build confidence",
            "People": "Threes rather than fives for more touches"
          }
        },
        {
          "type": "Gameplay",
          "name": "Two-corner ball",
        "diagram": {"size":[15,15],"zones":[{"x":11,"y":0,"w":4,"h":4,"tone":"gold"},{"x":11,"y":11,"w":4,"h":4,"tone":"gold"}],"players":[{"x":4,"y":7.5,"t":"a","n":"1","ball":true},{"x":8,"y":3,"t":"a","n":"2"},{"x":8,"y":12,"t":"a","n":"3"},{"x":10,"y":7.5,"t":"d","n":"1"}],"moves":[{"k":"pass","from":[4,7.5],"to":[8,12]},{"k":"pass","from":[8,12],"to":[12.5,13],"bend":-0.8}],"notes":[{"x":7.5,"y":8.4,"text":"alternate corners"}],"label":"Two targets per team, so the ball has to travel both left and right."},
          "setup": "A 15m x 15m pitch with a small scoring square in the left and right corner at each end.",
          "play": "Same as endball, but each team has two targets — one on each side. Because the defence can only cover one corner properly, the ball has to be moved both left and right, which forces children to pass off both hands instead of favouring one side.",
          "condition": "A team must score in a different corner from their last try.",
          "good": "Passes go both ways with the same smooth swing, and teams shift the ball across rather than forcing one side.",
          "points": [
            "Turn the shoulders to the target",
            "Same soft swing either way",
            "Look across before you pass"
          ],
          "questions": [
            "Which corner was easier to reach, and why?",
            "How did you get the ball to the far side quickly?",
            "Which hand feels stranger — what would help?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Move the corners closer together to shorten the passes",
            "Task": "Drop the alternating rule if it's frustrating them",
            "Equipment": "Coloured cones so corners are obvious",
            "People": "Small teams so everyone touches the ball"
          }
        }
      ],
      "safety": [
        "Keep groups spaced apart.",
        "Check tag belts sit on the hips.",
        "Watch for collisions as groups move."
      ]
    },
    {
      "week": 3,
      "title": "Passing on the move",
      "objective": "Pass accurately while jogging, timing it so a team-mate can run onto it.",
      "coachingPoints": [
        "Pass slightly ahead so they run onto it",
        "Keep moving after you pass",
        "Communicate as you go"
      ],
      "activities": [
        {
          "name": "Follow and pass",
          "type": "Warm-up",
          "setup": "Threes jogging in a channel, one ball.",
          "play": "The carrier jogs, then passes sideways to a support runner who continues; the passer follows to become the new support. Continuous down the channel.",
          "good": "Passes are timed so the receiver doesn't slow down, and everyone keeps moving.",
          "points": [
            "Pass in front of the runner",
            "Follow your pass",
            "Keep the ball moving"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Short channel to keep it simple",
            "Task": "Add a cone gate to pass through",
            "Equipment": "One ball per three",
            "People": "Threes work best for shape"
          }
        },
        {
          "name": "Grid keep-ball",
          "type": "Game",
          "setup": "A ten-metre grid, small teams, no scoring — just keep the ball.",
          "play": "One team keeps possession with passes only (no running with the ball more than a few steps), the other tries to touch the ball-carrier. Count consecutive passes.",
          "good": "Players find space to receive, pass before being reached, and support each other.",
          "points": [
            "Move to support the carrier",
            "Pass early",
            "Talk constantly"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Bigger grid makes keeping the ball easier",
            "Task": "Limit steps with the ball",
            "Equipment": "Bibs by team",
            "People": "3v2 to reward the passing team"
          }
        },
        {
          "type": "Gameplay",
          "name": "Three-second rugby",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":9,"t":"a","n":"1","ball":true},{"x":9,"y":4,"t":"a","n":"2"},{"x":11,"y":8,"t":"d","n":"1"},{"x":13,"y":12,"t":"d","n":"2"}],"moves":[{"k":"run","from":[3,9],"to":[7,8.6]},{"k":"pass","from":[7,8.6],"to":[9,4]},{"k":"run","from":[9,4],"to":[16,3]}],"notes":[{"x":8,"y":13.4,"text":"1… 2… 3 — pass!"}],"label":"Three seconds with the ball, then it must go. Support has to arrive early."},
          "setup": "A 20m x 15m pitch, teams of four, tag or touch rules.",
          "play": "Ordinary touch rugby, except the carrier may only hold the ball for three seconds. Count it out loud with them at first. It stops solo runs, and children very quickly work out that they need to pass while moving and that supporters have to arrive early.",
          "condition": "Three seconds with the ball, then it must be passed. Count aloud.",
          "good": "Passes happen on the move without the carrier stopping first, and support players anticipate rather than react.",
          "points": [
            "Pass while you're still running",
            "Look before the ball reaches you",
            "Support early, not late"
          ],
          "questions": [
            "What has to happen before you get the ball?",
            "Is it easier to pass standing still or running — why?",
            "How can your team-mates make three seconds feel like plenty?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Wider pitch gives more time and space to pass",
            "Task": "Five seconds for younger or newer players",
            "Equipment": "Bibs by team",
            "People": "4v3 to give the passing team a head start"
          }
        }
      ],
      "safety": [
        "Manage spacing so groups don't collide.",
        "Keep it non-contact — touch only.",
        "Rotate to keep everyone fresh."
      ]
    },
    {
      "week": 4,
      "title": "Draw and pass (2v1)",
      "objective": "Commit a defender then pass to a free team-mate — the heart of attacking rugby.",
      "coachingPoints": [
        "Run AT the defender to fix them",
        "Pass just before contact/touch",
        "Put the receiver into space"
      ],
      "activities": [
        {
          "name": "Fix the cone",
          "type": "Warm-up",
          "setup": "Pairs with a cone as a 'defender' between them and a line.",
          "play": "The carrier runs straight at the cone (the 'defender'), then passes sideways to their partner who runs onto it and scores past the line. Swap and repeat.",
          "good": "The carrier attacks the cone first, then passes late so the receiver has clear space.",
          "points": [
            "Run at the defender",
            "Pass late",
            "Receiver into space"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Move the cone closer to make it easier",
            "Task": "Add a second cone to pass around",
            "Equipment": "Cones as defenders",
            "People": "Pairs, then live 2v1"
          }
        },
        {
          "name": "2v1 to the line",
          "type": "Game",
          "setup": "A narrow channel, two attackers versus one passive-then-active defender.",
          "play": "The attackers work the 2v1: the carrier draws the defender and passes to the free player to score. Defender starts walking, then jogging.",
          "good": "The carrier genuinely commits the defender before passing, creating an easy score for the team-mate.",
          "points": [
            "Draw the defender in",
            "Late, soft pass",
            "Support runs hard"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": false, "indoor": true, "singleCoach": true, "minPlayers": 3 },
          "step": {
            "Space": "Widen the channel to make space",
            "Task": "Defender walks first, then jogs",
            "Equipment": "Bibs and cones",
            "People": "2v1 with short queues"
          }
        },
        {
          "type": "Gameplay",
          "name": "Extra-player rugby",
        "diagram": {"size":[22,16],"zones":[{"x":19,"y":0,"w":3,"h":16,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":12,"t":"a","n":"1","ball":true},{"x":8,"y":9,"t":"a","n":"2"},{"x":13,"y":5,"t":"a","n":"3"},{"x":17,"y":2.5,"t":"a","n":"4"},{"x":9,"y":12,"t":"d","n":"1"},{"x":14,"y":9,"t":"d","n":"2"}],"moves":[{"k":"run","from":[3,12],"to":[7.4,11]},{"k":"pass","from":[8,9],"to":[13,5]},{"k":"pass","from":[13,5],"to":[17,2.5]}],"notes":[{"x":9,"y":15,"text":"spare man scores"}],"label":"Attack always has a spare. The try only counts if the free player at the end scores it."},
          "setup": "A 20m x 15m pitch. The attacking team always has one more player than the defence — 4v3 or 5v4.",
          "play": "The attack has a spare player somewhere in the line every single play. The only way to use it is to run at a defender, commit them, and pass to the free player. If they pass too early the defence simply drifts across and the overlap disappears.",
          "condition": "A try only counts if it is scored by the free player at the end of the line.",
          "good": "The carrier genuinely runs at a defender before passing, creating an easy score outside them.",
          "points": [
            "Run at the defender to fix them",
            "Pass late, not early",
            "Put your team-mate into the space"
          ],
          "questions": [
            "How do you know the defender has committed to you?",
            "What happens if you pass too soon?",
            "Where should the free player be standing?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Widen the pitch to make the overlap more obvious",
            "Task": "Defenders walk first, then jog",
            "Equipment": "Bibs and cones",
            "People": "Rotate who gets to be the free player"
          }
        }
      ],
      "safety": [
        "Keep the defender's speed controlled.",
        "Touch/tag only, no contact.",
        "Even, short queues to reduce standing around."
      ]
    },
    {
      "week": 5,
      "title": "Passing in a small game",
      "objective": "Use passing to keep the ball and create tries in a small-sided game.",
      "coachingPoints": [
        "Support on both sides of the carrier",
        "Pass before you're caught",
        "Heads up — see the space"
      ],
      "activities": [
        {
          "name": "Three-pass try",
          "type": "Warm-up",
          "setup": "A small pitch, teams of three, touch rules.",
          "play": "A team must make at least three passes before they can score, encouraging everyone to get involved.",
          "good": "The ball moves through several hands and everyone touches it before a try.",
          "points": [
            "Everyone gets involved",
            "Pass before contact",
            "Find space to receive"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Adjust the pitch and pass target",
            "Task": "Two passes for younger groups",
            "Equipment": "Bibs by team",
            "People": "3v3, rotate often"
          }
        },
        {
          "name": "Corners game",
          "type": "Game",
          "setup": "A small pitch with two scoring corners at each end.",
          "play": "Teams pass to reach either corner and place the ball for a try. No running the ball far — it's a passing game. Celebrate every try.",
          "good": "Teams shift the ball with passes to find the free corner rather than forcing it.",
          "points": [
            "Shift the ball to space",
            "Support the carrier",
            "Celebrate team tries"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Bigger pitch opens up more space",
            "Task": "Sideways passes only",
            "Equipment": "Cones mark the corners",
            "People": "Even teams, frequent rotation"
          }
        },
        {
          "type": "Gameplay",
          "name": "All hands rugby",
        "diagram": {"size":[25,20],"zones":[{"x":21,"y":0,"w":4,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":10,"t":"a","n":"1","ball":true},{"x":8,"y":4,"t":"a","n":"2"},{"x":13,"y":16,"t":"a","n":"3"},{"x":19,"y":9,"t":"a","n":"4"},{"x":11,"y":9,"t":"d","n":"1"},{"x":16,"y":13,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[3,10],"to":[8,4]},{"k":"pass","from":[8,4],"to":[13,16]},{"k":"pass","from":[13,16],"to":[19,9]}],"label":"Everyone in the team must touch the ball before a try counts — nobody gets forgotten."},
          "setup": "A 25m x 20m pitch, teams of four or five, tag rules.",
          "play": "A full small-sided game with one rule that changes everything: a try only counts if every player on the scoring team has touched the ball during that passage of play. Quieter children stop being forgotten, and the loud ones start actively looking for them.",
          "condition": "Everyone on the team must have touched the ball before a try can be scored.",
          "good": "Teams deliberately find their quieter players, and the ball travels through several pairs of hands before a score.",
          "points": [
            "Find the player who hasn't had it yet",
            "Pass before you're caught",
            "Heads up — see the whole team"
          ],
          "questions": [
            "Who on your team hasn't touched it yet?",
            "How did that rule change the way you played?",
            "What did you do to help someone else get involved?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 5 },
          "step": {
            "Space": "Bigger pitch buys time to include everyone",
            "Task": "Three players instead of all of them for a younger group",
            "Equipment": "Bibs by team",
            "People": "Teams of four keep the rule achievable"
          }
        }
      ],
      "safety": [
        "Non-contact throughout.",
        "Plenty of space between groups.",
        "Water breaks and rotation."
      ]
    },
    {
      "week": 6,
      "title": "Game day & celebration",
      "objective": "Play fun games showing off the block's passing, and celebrate everyone.",
      "coachingPoints": [
        "Step back and let them play",
        "Praise good passing decisions",
        "Recognise every player"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Short stations revisiting favourite passing drills from the block.",
          "play": "Small groups rotate through quick, confidence-building stations before the games.",
          "good": "Everyone gets an easy win and arrives smiling.",
          "points": [
            "Revisit the best bits",
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
            "Equipment": "Reuse the block's kit",
            "People": "Small rotating groups"
          }
        },
        {
          "name": "Festival games & awards",
          "type": "Game",
          "setup": "Short small-sided matches, then a team huddle with awards.",
          "play": "Play for fun and fair play. Finish by handing out values awards and naming how each player's passing has grown.",
          "good": "Every child plays lots, passes with confidence, and leaves proud.",
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
          "name": "Invent the passing game",
        "diagram": {"size":[18,14],"players":[{"x":5,"y":4,"t":"a","n":"1","ball":true},{"x":6,"y":10,"t":"a","n":"2"},{"x":12,"y":4,"t":"d","n":"1"},{"x":13,"y":10,"t":"d","n":"2"}],"notes":[{"x":9,"y":7.6,"text":"the players decide"}],"label":"The squad designs the last game of the block. Then the coach stands back."},
          "setup": "A small pitch, mixed teams, cones and bibs available. Squad huddle first.",
          "play": "Hand the block over to the players. They pick the pitch, the scoring and one passing rule of their own — perhaps a bonus for a one-handed pass, or a two-corner try. Then stand on the touchline and let them run it.",
          "condition": "The players set the rules. The coach referees lightly and stays quiet.",
          "good": "Children take charge of their own game, sort out disputes themselves, and play with real energy.",
          "points": [
            "Let them decide and let them play",
            "Say less than feels natural",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this better for everybody?",
            "Is that fair on both teams?",
            "What's the best pass you've made in six weeks?"
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
