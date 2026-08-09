// Running into space
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.

export const evasion = {
  "label": "Running into space",
  "emoji": "⚡",
  "ageNote": "Suitable for all ages. Beating defenders with feet and speed, not force.",
  "values": [
    "Passion"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "Footwork & change of direction",
      "objective": "Move confidently with the ball and change direction sharply.",
      "coachingPoints": [
        "Head up to see where you're going",
        "Small, quick steps to turn",
        "Two hands on the ball"
      ],
      "activities": [
        {
          "name": "Find the gates",
          "type": "Warm-up",
          "setup": "Lots of cone 'gates' scattered across a grid, a ball each.",
          "play": "Players carry the ball and run through as many gates as they can in 60 seconds, changing direction sharply between them.",
          "good": "Heads are up to spot gates and turns are sharp and balanced.",
          "points": [
            "Eyes up for the next gate",
            "Sharp change of direction",
            "Ball tucked in two hands"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "More gates for more choices",
            "Task": "Only count gates run through forwards",
            "Equipment": "Wider gates for younger players",
            "People": "Half watch and cheer, then swap"
          }
        },
        {
          "name": "Traffic lights",
          "type": "Skill",
          "setup": "Players with a ball in an open grid.",
          "play": "Green = jog, amber = walk, red = freeze in a balanced position, plus 'turn!' to change direction. Rewards quick, controlled changes of speed and direction.",
          "good": "Players react quickly and stop or turn under control, staying balanced.",
          "points": [
            "Change speed on the call",
            "Balanced, still stop",
            "Turn sharply"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Wider area for more running",
            "Task": "Add a spin or side-step on 'turn'",
            "Equipment": "Coloured cones as lights",
            "People": "Small groups with a child caller"
          }
        },
        {
          "type": "Gameplay",
          "name": "Four-gate rugby",
        "diagram": {"size":[20,15],"gates":[[19.2,2.6],[19.2,6.4],[19.2,10.2],[19.2,14]],"players":[{"x":4,"y":7.5,"t":"a","n":"1","ball":true},{"x":11,"y":5,"t":"d","n":"1"},{"x":12,"y":10,"t":"d","n":"2"}],"moves":[{"k":"run","from":[4,7.5],"to":[13,7.5],"bend":0},{"k":"run","from":[13,7.5],"to":[19,13],"bend":0}],"notes":[{"x":8,"y":13.5,"text":"which gate is free?"}],"label":"Score by running through any gate. Four of them, two defenders — find the empty one."},
          "setup": "A 20m x 15m pitch. Instead of a try-line, put four 2m cone gates along each end, spread across the width.",
          "play": "Teams score by carrying the ball through any gate. Because there are four of them and only a few defenders, children stop running head-down at the nearest body and start lifting their eyes to find the gate nobody is guarding.",
          "condition": "You must run through a gate to score — a try anywhere else doesn't count.",
          "good": "Heads come up early and players change direction towards the free gate rather than the crowded one.",
          "points": [
            "Eyes up to find the free gate",
            "Change direction sharply",
            "Two hands on the ball"
          ],
          "questions": [
            "Which gate was easiest to score in, and why?",
            "When did you decide which gate to go for?",
            "What does the defence do when you look one way and go the other?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Wider gates and a wider pitch to build early success",
            "Task": "Take a gate away to make the choice harder",
            "Equipment": "Coloured cones for each gate",
            "People": "More attackers than defenders at first"
          }
        }
      ],
      "safety": [
        "Walk the grid for hazards.",
        "Space players so they don't collide.",
        "Water breaks every 10–15 minutes."
      ]
    },
    {
      "week": 2,
      "title": "The side-step",
      "objective": "Learn a simple side-step to move a defender's weight the wrong way.",
      "coachingPoints": [
        "Small step to one side to sell it",
        "Then push off hard the other way",
        "Accelerate away once you've beaten them"
      ],
      "activities": [
        {
          "name": "Step past the cone",
          "type": "Warm-up",
          "setup": "A line of single cones (as 'defenders') a few metres apart.",
          "play": "Players jog with the ball, side-step past each cone alternately left and right, accelerating away after each one.",
          "good": "There's a clear plant-and-push-off, and players speed up after the step rather than drifting.",
          "points": [
            "Plant the outside foot",
            "Push off the other way",
            "Accelerate through"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "step": {
            "Space": "Cones closer for more reps",
            "Task": "Add a change of pace",
            "Equipment": "Cones as defenders",
            "People": "Everyone works at once with own ball"
          }
        },
        {
          "name": "Beat the passive defender",
          "type": "Skill",
          "setup": "A five-metre channel, one carrier, one passive defender standing still.",
          "play": "The carrier uses a side-step to beat the stationary defender and reach the line. Progress the defender to a slow walk.",
          "good": "The carrier commits to one side then changes, beating the defender with footwork not force.",
          "points": [
            "Sell the step",
            "Commit and go",
            "Protect the ball"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Widen the channel to reward stepping",
            "Task": "Defender still, then walking",
            "Equipment": "Cones for the channel",
            "People": "1-on-1, short queues"
          }
        },
        {
          "type": "Gameplay",
          "name": "Double for a step",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":4,"y":7.5,"t":"a","n":"1","ball":true},{"x":10,"y":7.5,"t":"d","n":"1"},{"x":13,"y":4,"t":"d","n":"2"}],"moves":[{"k":"run","from":[4,7.5],"to":[9,6],"bend":0},{"k":"run","from":[9,6],"to":[12,10.5],"bend":0},{"k":"run","from":[12,10.5],"to":[18,11],"bend":0}],"notes":[{"x":9,"y":13.5,"text":"beat one with a step = ×2"}],"label":"A try scored after a clean side-step past a defender is worth double."},
          "setup": "A 20m x 15m pitch, 4v4, tag rules.",
          "play": "A normal tag game where a try is worth one — unless the scorer beat a defender with a clear side-step on the way, in which case it is worth two. Children start hunting for the chance to use their feet instead of running around everybody or straight at them.",
          "condition": "A try scored after a clean side-step past a defender counts double.",
          "good": "Players attack defenders in order to step them, and accelerate away afterwards rather than slowing to admire it.",
          "points": [
            "Sell the step with a small first move",
            "Push off hard the other way",
            "Accelerate once you're past"
          ],
          "questions": [
            "What makes a defender believe your step?",
            "How close do you get before you step?",
            "What do you do straight after beating them?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Wider pitch gives room to step rather than being crowded",
            "Task": "Defenders jog rather than sprint",
            "Equipment": "Bibs and tag belts",
            "People": "Even teams, rotate often"
          }
        }
      ],
      "safety": [
        "Non-contact — evade, don't barge.",
        "Clear run-off space beyond the line.",
        "Even matchups."
      ]
    },
    {
      "week": 3,
      "title": "Reading the space",
      "objective": "Look up and run into the biggest space, not straight at defenders.",
      "coachingPoints": [
        "Find the space, not the person",
        "Attack the gap at pace",
        "Keep your head up"
      ],
      "activities": [
        {
          "name": "Two-gate choice",
          "type": "Warm-up",
          "setup": "Pairs at a start line facing two gates a few metres apart; a coach or player points to one at the last moment.",
          "play": "The runner carries the ball and accelerates through whichever gate is signalled, reacting late.",
          "good": "The runner reads the signal and attacks the correct gap decisively.",
          "points": [
            "Head up, react late",
            "Explode into the gap",
            "Don't slow down"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "step": {
            "Space": "Gates wider apart for a clearer choice",
            "Task": "Add a third gate",
            "Equipment": "Cones for gates",
            "People": "Take turns, rest between reps"
          }
        },
        {
          "name": "Space invaders",
          "type": "Game",
          "setup": "A grid with more attackers than taggers.",
          "play": "Carriers try to reach the far line without being tagged, running into open space rather than crowds. A tag sends them back to the start.",
          "good": "Players scan the grid and choose open routes rather than running into taggers.",
          "points": [
            "Run into space, not people",
            "Keep moving",
            "Change direction to escape"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Bigger grid = easier to find space",
            "Task": "Add a 'safe' rest zone",
            "Equipment": "Bibs to see taggers",
            "People": "More carriers than taggers to build success"
          }
        },
        {
          "type": "Gameplay",
          "name": "Wide is worth two",
        "diagram": {"size":[25,20],"zones":[{"x":0,"y":0,"w":25,"h":5,"label":"×2","tone":"gold"},{"x":0,"y":15,"w":25,"h":5,"label":"×2","tone":"gold"},{"x":22,"y":0,"w":3,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":4,"y":10,"t":"a","n":"1","ball":true},{"x":8,"y":10,"t":"a","n":"2"},{"x":12,"y":10,"t":"a","n":"3"},{"x":11,"y":8,"t":"d","n":"1"},{"x":13,"y":12,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[4,10],"to":[8,10]},{"k":"pass","from":[8,10],"to":[12,10]},{"k":"run","from":[12,10],"to":[21,2.5],"bend":0}],"label":"Middle tries score one, wide tries score two. The defence squeezes in and the edge opens."},
          "setup": "A 25m-wide pitch with a 5m channel marked down each touchline. Teams of four, tag rules.",
          "play": "Tries in the middle are worth one, tries in either wide channel are worth two. The defence naturally squeezes towards the ball, which leaves the edges open — and children learn to spot and attack that space rather than piling into the middle.",
          "condition": "Tries in the wide channels count double.",
          "good": "Attackers spread out and shift the ball to whichever edge the defence has left unguarded.",
          "points": [
            "Run into space, not into people",
            "Use the full width of the pitch",
            "Attack the gap at pace"
          ],
          "questions": [
            "Where was the biggest space on that play?",
            "What happened to the defence when you went wide?",
            "How did you spot the gap before you got there?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Widen the pitch to open up more space",
            "Task": "Remove the double points once they use width naturally",
            "Equipment": "Cones to mark the channels",
            "People": "Even teams, frequent rotation"
          }
        }
      ],
      "safety": [
        "Non-contact, tags only.",
        "Big enough grid to avoid collisions.",
        "Rotate taggers regularly."
      ]
    },
    {
      "week": 4,
      "title": "Beating a defender (1v1)",
      "objective": "Beat an active defender one-on-one using footwork and pace.",
      "coachingPoints": [
        "Attack the defender's space, then change",
        "Commit fully to the beat",
        "Support is coming — don't force it"
      ],
      "activities": [
        {
          "name": "Cat and mouse",
          "type": "Warm-up",
          "setup": "Pairs, a couple of metres apart, in a lane.",
          "play": "The 'mouse' (carrier) tries to reach the end of the lane; the 'cat' shadows and tries to two-hand touch. Short, sharp reps.",
          "good": "The carrier uses changes of pace and direction to create separation.",
          "points": [
            "Change of pace to escape",
            "Sharp footwork",
            "Protect the ball"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Longer lane to reward acceleration",
            "Task": "Cat starts closer or further",
            "Equipment": "Cones for the lane",
            "People": "Even pairs, rotate"
          }
        },
        {
          "name": "1v1 to the line",
          "type": "Game",
          "setup": "A channel with a try-line, one carrier versus one active defender.",
          "play": "The carrier tries to beat the defender to score, using a step or swerve. Reward clever evasion over raw speed.",
          "good": "The carrier reads the defender and beats them with footwork, not by running straight into them.",
          "points": [
            "Read the defender",
            "Step then go",
            "Accelerate to score"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Adjust channel width to the group",
            "Task": "Defender's speed controlled",
            "Equipment": "Bibs and cones",
            "People": "Fair 1-on-1s, short queues"
          }
        },
        {
          "type": "Gameplay",
          "name": "The free zone",
        "diagram": {"size":[20,15],"zones":[{"x":13,"y":0,"w":7,"h":6.4,"label":"FREE","tone":"gold"},{"x":17.5,"y":0,"w":2.5,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":4,"y":9,"t":"a","n":"1","ball":true},{"x":17,"y":3.6,"t":"a","n":"2"},{"x":9,"y":9,"t":"d","n":"1"},{"x":12,"y":12,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[4,9],"to":[17,3.6],"bend":-3}],"notes":[{"x":10,"y":14,"text":"no defender until the pass"}],"label":"One attacker starts in the free zone, so they get a real one-against-one in space."},
          "setup": "A 20m x 15m pitch with a 5m square marked in one corner. 4v4, tag rules.",
          "play": "One attacker starts inside the free zone each play, and no defender may enter it until the ball has been passed. It gives a genuine one-on-one in space — the attacker gets the ball with a single defender arriving, exactly the moment footwork is for.",
          "condition": "Defenders stay out of the free zone until the ball leaves the passer's hands.",
          "good": "The attacker in the zone takes the ball at pace and backs themselves to beat one defender with feet, not force.",
          "points": [
            "Attack the defender's space, then change",
            "Commit fully to the beat",
            "Back yourself — you have room"
          ],
          "questions": [
            "What did the defender show you before you moved?",
            "Was it better to step early or late?",
            "How did having space change what you tried?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Make the free zone larger for more room to work",
            "Task": "Delay the defender by a count of two",
            "Equipment": "Cones to mark the zone clearly",
            "People": "Rotate who starts in the zone every play"
          }
        }
      ],
      "safety": [
        "Tags/touch only, no contact.",
        "Matched sizes and pace.",
        "Room beyond the line to slow down."
      ]
    },
    {
      "week": 5,
      "title": "Using space in a small game",
      "objective": "Attack space as a team in a small-sided game.",
      "coachingPoints": [
        "Spread out to stretch the defence",
        "Attack the space that opens up",
        "Support runs create more space"
      ],
      "activities": [
        {
          "name": "Edge attack (3v2)",
          "type": "Warm-up",
          "setup": "A wide grid, three attackers versus two defenders.",
          "play": "Attackers use width and footwork to find and attack the space the defenders leave, aiming to reach the line.",
          "good": "Attackers spread the defenders then strike into the open space.",
          "points": [
            "Use the width",
            "Attack the gap",
            "Support the carrier"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Wider grid to open space",
            "Task": "3v2, then 3v3",
            "Equipment": "Bibs by team",
            "People": "Rotate defenders in"
          }
        },
        {
          "name": "Line-break game",
          "type": "Game",
          "setup": "A small pitch, tag rules, points for clean line-breaks as well as tries.",
          "play": "Teams attack, earning extra reward for running through a gap in the defence into clear space.",
          "good": "Players consistently spot and attack space rather than running into contact.",
          "points": [
            "See the space early",
            "Attack it at pace",
            "Back up the break"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Right-size the pitch",
            "Task": "Reward line-breaks with points",
            "Equipment": "Clear lines and bibs",
            "People": "Even teams, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Shrinking pitch",
        "diagram": {"size":[30,20],"zones":[{"x":0,"y":0,"w":30,"h":3,"tone":"dark"},{"x":0,"y":17,"w":30,"h":3,"tone":"dark"},{"x":27,"y":0,"w":3,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":5,"y":10,"t":"a","n":"1","ball":true},{"x":10,"y":6,"t":"a","n":"2"},{"x":13,"y":9,"t":"d","n":"1"},{"x":15,"y":13,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[5,10],"to":[10,6]},{"k":"run","from":[10,6],"to":[26,5],"bend":0}],"notes":[{"x":15,"y":1.9,"text":"pitch narrows every 2 min"}],"label":"The pitch narrows as you play, so gaps have to be spotted and taken earlier."},
          "setup": "A 30m x 20m pitch to begin with, cones set so the touchlines can be brought in. Teams of four or five.",
          "play": "Start with plenty of room and play a normal tag game. Every two minutes, bring the touchlines in a couple of metres. As the space disappears, children have to spot and use gaps earlier and earlier, and their decisions get sharper without a word from you.",
          "condition": "The pitch narrows every two minutes. The game never stops while you move the cones.",
          "good": "As space tightens, players scan earlier and commit to gaps sooner instead of running out of room.",
          "points": [
            "See the space early",
            "Attack it before it closes",
            "Support the break"
          ],
          "questions": [
            "What changed about your game as the pitch got smaller?",
            "How much earlier did you have to decide?",
            "Which was more fun — big pitch or small?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "step": {
            "Space": "Stop shrinking once it gets too congested",
            "Task": "Shrink the length instead of the width for a change",
            "Equipment": "Plenty of cones, moved quickly",
            "People": "Even teams; rotate at each shrink"
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
      "objective": "Show off footwork and space in fun games, and celebrate everyone.",
      "coachingPoints": [
        "Let them play and problem-solve",
        "Praise clever running into space",
        "Recognise every player"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Short stations revisiting favourite evasion drills.",
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
          "setup": "Short small-sided matches finishing with a team huddle and awards.",
          "play": "Play for enjoyment. Finish by naming how each player's running and confidence has grown, and hand out values awards.",
          "good": "Every child plays lots, beats defenders with footwork, and leaves proud.",
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
          "name": "Invent the space game",
        "diagram": {"size":[22,16],"gates":[[22,4],[22,12]],"players":[{"x":5,"y":8,"t":"a","n":"1","ball":true},{"x":8,"y":12,"t":"a","n":"2"},{"x":13,"y":6,"t":"d","n":"1"},{"x":14,"y":11,"t":"d","n":"2"}],"notes":[{"x":9,"y":2.5,"text":"the players decide"}],"label":"Six weeks of finding space, then they design the last game themselves."},
          "setup": "A small pitch, mixed teams, all the block's kit available. Huddle first.",
          "play": "Let the players design the final game — pitch shape, gates, scoring zones, bonus points, whatever they fancy. Then get out of the way. Children who have spent six weeks learning to find space will usually build something surprisingly clever.",
          "condition": "The players set the rules. The coach referees lightly and stays quiet.",
          "good": "The squad plays a game of their own invention with real energy and settles its own arguments.",
          "points": [
            "Let them decide and let them play",
            "Say less than feels natural",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this better for everybody?",
            "Is that fair on both teams?",
            "What's the best bit of running you've done in six weeks?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
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
