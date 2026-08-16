// Tackling (safe contact)
// Six sessions. Each session has three activities: Warm-up, Skill Zone, Game Zone.
// Edit the words freely — just keep the shape of the object the same.
// Plan B tags: every activity carries "planB" — wet (fine in heavy rain: nobody
// stands still long enough to get cold), indoor (works in a sports hall: no going
// to ground, no punting, no 20m+ pitch), singleCoach (one adult can run it safely
// with a full squad — live tackling is deliberately marked false), and minPlayers
// (fewest players it still works with). Edit them freely; they drive the Plan B button.

export const tackling = {
  "label": "Tackling (safe contact)",
  "emoji": "🛡️",
  "ageNote": "Contact skill for older age-grades (usually U9+). Build up slowly — pads and bags long before any live tackling, and never at full speed early on.",
  "values": [
    "Discipline",
    "Respect"
  ],
  "weeks": [
    {
      "week": 1,
      "title": "Body position & falling safely",
      "objective": "Learn a strong, low athletic position and how to go to ground and get back up safely — no contact yet.",
      "coachingPoints": [
        "Feet shoulder-width, knees bent, back flat and strong",
        "Head up and to the side — never lead with the head",
        "Bounce straight back to your feet, ready to play"
      ],
      "activities": [
        {
          "name": "Ready, set, roll",
          "type": "Warm-up",
          "setup": "Everyone spread out in a big grid with plenty of space, no ball, soft ground.",
          "play": "On 'set', players drop into a low, balanced ready position. On 'roll', they perform a controlled side-roll and pop straight back up. Repeat, alternating sides, gradually lowering from standing to kneeling starts.",
          "good": "Base is low and balanced, head stays up, and players get up quickly and in control rather than scrambling.",
          "points": [
            "Chest up, eyes forward",
            "Land on the side, not the front",
            "Spring back to the ready position"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 3,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "One clear patch of grass per player so no one rolls into anyone",
            "Task": "Begin standing; progress down to a kneeling start to soften the fall",
            "Equipment": "A soft mat or dry grass — nothing hard nearby",
            "People": "Individual work — no partners or opponents yet"
          }
        },
        {
          "name": "Cheek to cheek on the bag",
          "type": "Skill",
          "setup": "Pairs. One player holds a tackle bag or hit-shield upright and braced; the tackler stands two metres away.",
          "play": "The tackler walks in and places the shoulder LOW into the bag — around thigh height, well below where a waist would be — with the head to the side ('cheek to cheek'). Wrap both arms around and drive two short steps. Reset, swap roles. Everything at walking pace.",
          "good": "Contact is shoulder-first with the head clearly to the side, both arms wrap and squeeze, and there is a short controlled leg-drive.",
          "points": [
            "Shoulder low — thigh height, never the chest",
            "Wrap both arms and squeeze",
            "Small, powerful steps — don't lunge"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Short two-metre approach keeps everything slow and controlled",
            "Task": "Start from a kneel into the bag, then progress to standing",
            "Equipment": "A well-padded bag or shield, held firmly by a partner",
            "People": "One tackler to one bag — never live at this stage"
          }
        },
        {
          "type": "Gameplay",
          "name": "Down and up rugby",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":8,"t":"a","n":"1","ball":true},{"x":7,"y":3.5,"t":"a","n":"2"},{"x":11,"y":8,"t":"d","n":"1"},{"x":14,"y":12,"t":"d","n":"2"}],"moves":[{"k":"run","from":[3,8],"to":[9.4,8]},{"k":"pass","from":[9.4,8],"to":[7,3.5]}],"notes":[{"x":10,"y":13.4,"text":"down, up, play on"}],"label":"Two-hand touch. Every carrier goes to ground and springs back up before play restarts."},
          "setup": "A 20m x 15m pitch, two teams of three or four, bibs on. No tackling yet — two-hand touch only.",
          "play": "Normal touch rugby to score tries. The twist: every time a carrier is touched, they place the ball, drop safely to the ground and spring back to their feet before their team can play on. Everyone gets used to going down and getting up while the game is live and their heart rate is high.",
          "condition": "Play only restarts once the touched player is back on their feet in a strong ready position.",
          "good": "Players go to ground under control and pop straight back up without being told, even when the game is quick and noisy.",
          "points": [
            "Land on the side, never the front",
            "Chest up as you rise",
            "Be first back to your feet"
          ],
          "questions": [
            "What helps you get back up quickest?",
            "Where do you land so it doesn't hurt?",
            "How does being slow to get up cost your team?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 6 },
          "step": {
            "Space": "Shrink the pitch so touches happen often and they get lots of reps",
            "Task": "Add a two-second freeze on the ground before rising",
            "Equipment": "Soft, even ground — walk it first",
            "People": "Small teams so nobody stands watching"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "No head contact, ever. Bags and shields only this week — no live tackling.",
        "Match players by size wherever you can.",
        "Soft, even ground free of hazards."
      ]
    },
    {
      "week": 2,
      "title": "The tackle, both shoulders",
      "objective": "Complete a safe side-on tackle at walking pace on a lightly-moving partner, using both left and right shoulders.",
      "coachingPoints": [
        "Track the hips, not the ball or the feet",
        "Shoulder into the thigh, head behind or to the side",
        "Wrap, squeeze, and finish on top ready to get up"
      ],
      "activities": [
        {
          "name": "Grip and wrap",
          "type": "Warm-up",
          "setup": "Pairs kneeling, facing, an arm's length apart.",
          "play": "Players practise the wrap: shoulder to partner's near hip, both arms encircle and give a gentle squeeze, cheek to the side. Hold for two seconds, reset, swap shoulders each go.",
          "good": "Head is always to the side, both arms wrap fully, and the squeeze is firm but gentle — a hug, not a grab.",
          "points": [
            "Ring of steel with the arms",
            "Head safe and to the side",
            "Gentle squeeze, no pulling"
          ],
          "apes": {
            "A": 3,
            "P": 5,
            "E": 3,
            "S": 5
          },
          "planB": { "wet": false, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Kneeling keeps it low and safe",
            "Task": "Add a slow rise to a low standing wrap once secure",
            "Equipment": "No equipment needed",
            "People": "Even pairs, matched by size"
          }
        },
        {
          "name": "Side-on walk-through",
          "type": "Skill",
          "setup": "Pairs in a two-metre channel marked by cones. Ball-carrier at one end, tackler side-on.",
          "play": "The ball-carrier WALKS forward down the channel. The tackler tracks from the side, places the shoulder on the hip/thigh, wraps and lowers the carrier gently to the ground, both landing safely and standing straight back up. Alternate the tackling shoulder each turn.",
          "good": "The tackle is side-on (never head-on), the descent to ground is controlled for both players, and the tackler pops back to their feet.",
          "points": [
            "Come from the side, not head-on",
            "Shoulder low on the hip or thigh — below the waist",
            "Ride them down softly, then get up"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 2 },
          "step": {
            "Space": "Narrow channel guides a clean side-on line",
            "Task": "Walking pace only; jog only when technique is solid",
            "Equipment": "Cones to mark the channel",
            "People": "1-on-1, short queues, rotate often"
          }
        },
        {
          "type": "Gameplay",
          "name": "Call your shoulder",
        "diagram": {"size":[15,15],"zones":[{"x":12,"y":0,"w":3,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":2.5,"y":7.5,"t":"a","n":"1","ball":true},{"x":9,"y":7.5,"t":"d","n":"1"},{"x":2.5,"y":12.5,"t":"a","n":"2"},{"x":9,"y":3,"t":"d","n":"2"}],"moves":[{"k":"run","from":[2.5,7.5],"to":[8.2,7.5]}],"notes":[{"x":7.5,"y":13.6,"text":"call the shoulder"}],"label":"Walking pace only. Side-on, below the waist, and the defender calls the shoulder before contact."},
          "setup": "A 15m x 15m pitch, 3v3, walking pace only. Side-on tackles permitted, matched sizes.",
          "play": "A slow-motion game of rugby where every tackle must be made at walking pace and from the side. Before making the tackle, the defender shouts which shoulder they are using — 'left!' or 'right!'. The game keeps flowing after each tackle with a quick restart.",
          "condition": "No shout, no tackle. Every tackle below the waist, side-on, at walking pace — and each defender must use both shoulders across the game.",
          "good": "Tackles are side-on with the head clearly out of the way, and defenders naturally use their weaker shoulder rather than avoiding it.",
          "points": [
            "Walking pace, always",
            "Shoulder in below the waist, head to the side",
            "Both shoulders, not just the strong one"
          ],
          "questions": [
            "Which shoulder feels less comfortable, and why?",
            "What does the carrier do that tells you which side to go?",
            "How close do you need to be before you commit?"
          ],
          "apes": {
            "A": 4,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Narrow the pitch so contacts are frontal-free and predictable",
            "Task": "Start with the carrier walking, then jogging",
            "Equipment": "Bibs so pairs are obvious",
            "People": "Match sizes carefully and rotate often"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "Walking pace only. Side-on always — no head-on collisions.",
        "Soft ground; pause instantly if technique slips.",
        "Rotate so no one tires."
      ]
    },
    {
      "week": 3,
      "title": "Tracking a moving target",
      "objective": "Track a jogging attacker across space and time a controlled tackle.",
      "coachingPoints": [
        "Move your feet to stay square to the runner",
        "Watch the hips to read the change of direction",
        "Commit at the right moment — patient, then decisive"
      ],
      "activities": [
        {
          "name": "Shadow the runner",
          "type": "Warm-up",
          "setup": "Pairs in a five-metre-wide channel, no contact.",
          "play": "The attacker jogs and jinks gently side to side; the defender mirrors, staying in front and square, keeping an arm's length. Freeze on the whistle to check body position.",
          "good": "The defender keeps their feet moving, stays goal-side and balanced, and never crosses their feet.",
          "points": [
            "Small, quick steps",
            "Stay square and in front",
            "Eyes on the hips"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": true, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Narrow the channel to make tracking easier",
            "Task": "Attacker walks first, then jogs",
            "Equipment": "Cones for the channel",
            "People": "Even 1-on-1s"
          }
        },
        {
          "name": "Channel tackle",
          "type": "Skill",
          "setup": "A five-metre channel. Attacker with ball at one end, defender a few metres in front.",
          "play": "The attacker jogs forward trying to reach the far line; the defender tracks and completes a controlled side-on tackle. Both get up quickly. Emphasise timing — not too early, not too late.",
          "good": "Contact is safe and side-on, timed as the runner commits, and both players are up and ready afterwards.",
          "points": [
            "Patient feet, then commit",
            "Shoulder below the waist, wrap, head safe",
            "Up quickly, back in the game"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 4,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 2 },
          "step": {
            "Space": "Widen the channel to reward good footwork",
            "Task": "Jogging only; increase intent gradually",
            "Equipment": "Belts/bibs to keep it organised",
            "People": "Matched sizes, rotate"
          }
        },
        {
          "type": "Gameplay",
          "name": "Wide channel defence",
        "diagram": {"size":[25,20],"zones":[{"x":0,"y":0,"w":25,"h":4,"label":"×2","tone":"gold"},{"x":0,"y":16,"w":25,"h":4,"label":"×2","tone":"gold"},{"x":22,"y":0,"w":3,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":12,"t":"a","n":"1","ball":true},{"x":8,"y":8,"t":"a","n":"2"},{"x":13,"y":9,"t":"d","n":"1"},{"x":15,"y":14,"t":"d","n":"2"}],"moves":[{"k":"pass","from":[3,12],"to":[8,8]},{"k":"run","from":[8,8],"to":[21,2]}],"label":"Tries in the wide channels count double, so defenders must track their runner across."},
          "setup": "A wide pitch, 25m across, with a 4m channel marked down each touchline. 4v4.",
          "play": "A tag or controlled-tackle game where a try scored in either wide channel counts double. Attackers will keep shifting the ball wide, so defenders have to track their runner across the pitch rather than standing still and waiting.",
          "condition": "Tries in the wide channels are worth two. Each defender picks a runner at the start of every play and stays with them.",
          "good": "Defenders move across with their runner and stay square, instead of drifting or ball-watching.",
          "points": [
            "Pick your runner and stay with them",
            "Feet moving, stay square",
            "Talk — say who you've got"
          ],
          "questions": [
            "How do you know which runner is yours?",
            "What happens to the team when two of you chase the same player?",
            "When is the best moment to commit?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Narrow the pitch if defenders are being stretched too far",
            "Task": "Drop the double-points rule once tracking improves",
            "Equipment": "Cones to mark the channels clearly",
            "People": "Even numbers so nobody is left uncovered"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "Jogging pace; matched sizes.",
        "Stop the moment tackling becomes grabbing or head-on.",
        "Plenty of rest between reps."
      ]
    },
    {
      "week": 4,
      "title": "Tackle and reload",
      "objective": "Tackle with commitment, then regain your feet quickly to be ready for the next moment.",
      "coachingPoints": [
        "Complete the tackle, don't just touch",
        "Get off the ground fast and stay onside",
        "Communicate with your team-mates"
      ],
      "activities": [
        {
          "name": "Tackle and up",
          "type": "Warm-up",
          "setup": "Small groups, one tackle bag per group on the ground.",
          "play": "Player makes a controlled tackle onto the held bag, releases, springs to their feet, touches a cone two metres away and jogs back. Continuous, at a manageable pace.",
          "good": "Every rep finishes with the player quickly back on their feet and balanced, not lying on the ground.",
          "points": [
            "Finish the tackle",
            "Explode back up",
            "Reset and ready"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 4,
            "S": 5
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": true, "minPlayers": 2 },
          "step": {
            "Space": "Short reload distance",
            "Task": "Add a second cone to react to a call",
            "Equipment": "Bag held or grounded",
            "People": "Small groups so rest is built in"
          }
        },
        {
          "name": "Corner defender (1v1)",
          "type": "Skill",
          "setup": "A small square with a try-line. One attacker, one defender guarding the line.",
          "play": "The attacker tries to reach the line; the defender makes a safe tackle to stop them, then reloads to their feet. Swap and rotate. Keep intensity honest but controlled.",
          "good": "The defender stays composed under a bit of pressure, tackles safely, and recovers quickly.",
          "points": [
            "Don't rush — read the runner",
            "Safe, side-on, below the waist",
            "Reload and be ready"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 2 },
          "step": {
            "Space": "Adjust the square to suit the group",
            "Task": "Reduce attacker's start speed if needed",
            "Equipment": "Cones mark the line",
            "People": "1-on-1, fair matchups"
          }
        },
        {
          "type": "Gameplay",
          "name": "First one up",
        "diagram": {"size":[20,15],"zones":[{"x":16,"y":0,"w":4,"h":15,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":7.5,"t":"a","n":"1","ball":true},{"x":10,"y":7.5,"t":"d","n":"1"},{"x":7,"y":3,"t":"a","n":"2"},{"x":14,"y":12,"t":"d","n":"2"}],"moves":[{"k":"run","from":[3,7.5],"to":[9.2,7.5]}],"notes":[{"x":10,"y":13.4,"text":"tackler up first = a point"}],"label":"Defence scores every time the tackler is back on their feet before the ball is played."},
          "setup": "A 20m x 15m pitch, 4v4, controlled side-on tackling at jogging pace.",
          "play": "A normal small-sided game with one extra scoring rule: the defending team earns a point every time the tackler is back on their feet before the ball is played again. Attackers score tries as usual. Two scoreboards run side by side, which keeps the defending team fully switched on after every tackle.",
          "condition": "A point for the defence whenever the tackler beats the ball back to their feet. Tackles stay side-on and below the waist.",
          "good": "Tacklers finish the tackle and reload quickly rather than staying on the ground admiring it.",
          "points": [
            "Complete the tackle, then move",
            "Explode back to your feet",
            "Reset and be ready for the next one"
          ],
          "questions": [
            "What slows you down getting up?",
            "Why does it matter to your team that you're up fast?",
            "What's the first thing you look for once you're on your feet?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 8 },
          "step": {
            "Space": "Keep it compact so the reload distance is short",
            "Task": "Reward the whole team getting set, not just the tackler",
            "Equipment": "Bibs and a visible scoreboard",
            "People": "Rotate frequently so tired players aren't tackling"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "Controlled competition, matched sizes.",
        "Coach can pause any rep instantly.",
        "No head-on, no full sprints into contact."
      ]
    },
    {
      "week": 5,
      "title": "Tackling in a small game",
      "objective": "Apply safe tackling in a 3v3, making good decisions about when to commit.",
      "coachingPoints": [
        "Line-speed together, don't rush out alone",
        "Talk — call who you've got",
        "Tackle low and safe, support the tackler"
      ],
      "activities": [
        {
          "name": "Gate defence (2v2)",
          "type": "Warm-up",
          "setup": "A ten-metre-wide grid with a 'gate' of cones the attackers aim for.",
          "play": "Two attackers try to run through the gate; two defenders work together to stop them with safe tackles, communicating who takes whom. Rotate quickly.",
          "good": "Defenders talk, move up together, and each takes responsibility for a runner.",
          "points": [
            "Communicate early",
            "Move up as a pair",
            "Take your runner"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 4 },
          "step": {
            "Space": "Widen or narrow the gate",
            "Task": "One-tackle turnover to keep it flowing",
            "Equipment": "Bibs by team",
            "People": "Even 2v2, rotate"
          }
        },
        {
          "name": "3v3 to the line",
          "type": "Game",
          "setup": "A small pitch, two teams of three, safe-tackle rules.",
          "play": "Teams attack to score a try; a completed tackle turns the ball over (or gives a set number of plays). Reset quickly after each tackle. Reward good defensive decisions loudly.",
          "good": "Players defend as a small unit, tackle safely, and reload — enjoyment stays high.",
          "points": [
            "Defend together",
            "Safe tackles only",
            "Celebrate good decisions, not big hits"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Right-size the pitch to the group's energy",
            "Task": "Two tackles then turnover to keep pace",
            "Equipment": "Clear lines and bibs",
            "People": "Even teams, frequent rotation"
          }
        },
        {
          "type": "Gameplay",
          "name": "Tries versus tackles",
        "diagram": {"size":[25,20],"zones":[{"x":21,"y":0,"w":4,"h":20,"label":"TRY","tone":"gold"}],"players":[{"x":3,"y":10,"t":"a","n":"1","ball":true},{"x":8,"y":4,"t":"a","n":"2"},{"x":13,"y":10,"t":"d","n":"1"},{"x":16,"y":15,"t":"d","n":"2"}],"moves":[{"k":"run","from":[3,10],"to":[12,10]},{"k":"pass","from":[8,4],"to":[16,3]}],"notes":[{"x":12.5,"y":18.4,"text":"tries v tackles"}],"label":"Attack scores tries. Defence scores a point for every safe tackle, below the waist."},
          "setup": "A 25m x 20m pitch, 4v4 or 5v5, safe-tackle rules established over the block.",
          "play": "Attack scores one point per try. Defence scores one point per completed safe tackle. Both teams are chasing points at the same time, so defending becomes something to want rather than something to endure. Swap the teams over at half time so everyone experiences both sides.",
          "condition": "A tackle only scores if it is side-on, below the waist, safe, and the tackler gets back to their feet.",
          "good": "Defenders compete hard for tackles while keeping technique honest, and celebrate a good tackle as loudly as a try.",
          "points": [
            "Safe technique still scores, rushed ones don't",
            "Defend as a unit, not as four individuals",
            "Celebrate good decisions, not big hits"
          ],
          "questions": [
            "What did your best tackle of the game have in common?",
            "How did your team decide who went first?",
            "Was it easier to score tries or tackles today — why?"
          ],
          "apes": {
            "A": 5,
            "P": 5,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 8 },
          "step": {
            "Space": "Right-size the pitch to the group's energy",
            "Task": "Two tackles then turnover keeps the pace up",
            "Equipment": "Clear lines, bibs, cones",
            "People": "Matched sizes; rotate every few minutes"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "Small numbers in plenty of space.",
        "Same safe-tackle rules throughout; matched sizes.",
        "Rotate often; water breaks."
      ]
    },
    {
      "week": 6,
      "title": "Game day & celebration",
      "objective": "Bring it together in fun, fair games and celebrate everyone's progress.",
      "coachingPoints": [
        "Step back and let them play",
        "Notice and name good, safe decisions",
        "Recognise every player today"
      ],
      "activities": [
        {
          "name": "Best-bits carousel",
          "type": "Warm-up",
          "setup": "Quick stations revisiting favourite drills from weeks 1–5.",
          "play": "Small groups rotate through short, confidence-building stations so everyone gets an easy win before the games.",
          "good": "Everyone succeeds and arrives at the games warmed up and smiling.",
          "points": [
            "Revisit the best bits",
            "Everyone gets a win",
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
            "Space": "Compact stations, short rotations",
            "Task": "Let players choose a station",
            "Equipment": "Reuse the block's kit",
            "People": "Small groups rotate together"
          }
        },
        {
          "name": "Festival games & awards",
          "type": "Game",
          "setup": "Short, small-sided matches with frequent rotation, finishing in a team huddle.",
          "play": "Play for enjoyment and fair play, not the scoreboard. Finish by handing out values awards and recognising how each player's tackling and confidence has grown.",
          "good": "Every child plays plenty, competes safely, and leaves proud of their progress.",
          "points": [
            "Let them play, coach lightly",
            "Name each player's growth",
            "Thank players and parents"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Right-sized pitches",
            "Task": "Mixed-ability teams",
            "Equipment": "Bibs, clear lines, badges ready",
            "People": "Rotate so everyone plays with everyone"
          }
        },
        {
          "type": "Gameplay",
          "name": "Design the defence game",
        "diagram": {"size":[20,15],"players":[{"x":5,"y":5,"t":"a","n":"1","ball":true},{"x":6,"y":11,"t":"a","n":"2"},{"x":13,"y":5,"t":"d","n":"1"},{"x":14,"y":11,"t":"d","n":"2"}],"notes":[{"x":10,"y":8,"text":"the players decide"}],"label":"The squad chooses the pitch, the scoring and one rule. The coach only checks it's safe."},
          "setup": "A small pitch, mixed teams, everything from the block available. Players sit in a huddle first.",
          "play": "Ask the squad to invent the last game of the block. They choose the pitch size, the scoring, and one special rule — as long as it is safe and everyone gets plenty of the ball. Then step right back and let them play it, refereeing lightly and saying as little as you can manage.",
          "condition": "The players write the rules. The coach only steps in for safety.",
          "good": "Children argue happily about rules, sort out their own problems, and play hard at a game they own.",
          "points": [
            "Let them decide and let them play",
            "Referee gently, talk rarely",
            "Name each player's growth at the end"
          ],
          "questions": [
            "What rule would make this more fun for everyone?",
            "Is that fair on both teams?",
            "What was your proudest moment of the whole block?"
          ],
          "apes": {
            "A": 5,
            "P": 4,
            "E": 5,
            "S": 4
          },
          "planB": { "wet": true, "indoor": false, "singleCoach": false, "minPlayers": 6 },
          "step": {
            "Space": "Whatever the players choose, within safe limits",
            "Task": "Offer two rule options if they get stuck",
            "Equipment": "Bibs, cones and badges ready",
            "People": "Mixed-ability teams so everyone mixes"
          }
        }
      ],
      "safety": [
        "Tackle height: waist and below. Check your union's current age grade law variations before the block starts.",
        "Same safe rules throughout.",
        "Water and rest between games.",
        "End calm and positive."
      ]
    }
  ]
};
