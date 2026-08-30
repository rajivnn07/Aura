/**
 * Aura Gratitude Journal - Core Application Logic (Milestones, Tarot, Manifestation, Meditation)
 */

// Indefinite Journey: Base days seeded for quotes and prompts.
// If dayNum goes beyond 21, prompts and quotes cycle dynamically.
const JOURNAL_DAYS = [
  {
    day: 1,
    title: "Foundations of Gratitude",
    prompt: "Welcome to Aura. Today, reflect on your life as a whole. Write down 10 things you are grateful for, selecting the focus category (Health, Career, Family, Job, Money, Love) for each item.",
    quote: "Gratitude turns what we have into enough.",
    author: "Melody Beattie"
  },
  {
    day: 2,
    title: "The Art of Appreciation",
    prompt: "Look closer at your day. Reflect on 10 positive events, comforts, or interactions you experienced, and categorize each under its core focus area.",
    quote: "Gratitude is not only the greatest of virtues, but the parent of all others.",
    author: "Cicero"
  },
  {
    day: 3,
    title: "Recognizing Small Joys",
    prompt: "Pay attention to the details. Write down 10 simple pleasures (a warm drink, a smile, a task completed) and select their categories.",
    quote: "Enjoy the little things, for one day you may look back and realize they were the big things.",
    author: "Robert Brault"
  },
  {
    day: 4,
    title: "A Mindful Pause",
    prompt: "Slow down and check in. Write 10 reasons you feel grounded, safe, or motivated in this moment, tagging each with its category.",
    quote: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.",
    author: "Melody Beattie"
  },
  {
    day: 5,
    title: "Holistic Abundance",
    prompt: "Reflect on how your needs are met. Record 10 supportive elements in your environment, wellness, or social circle today.",
    quote: "When you are grateful, fear disappears and abundance appears.",
    author: "Tony Robbins"
  },
  {
    day: 6,
    title: "Sparking Joy",
    prompt: "Focus on energy and excitement. Write down 10 things that inspired you, gave you energy, or made you smile today.",
    quote: "Gratitude is a powerful catalyst for happiness. It's the spark that lights a fire of joy in your soul.",
    author: "Amy Collette"
  },
  {
    day: 7,
    title: "The Root of Joy",
    prompt: "Reflect on connection and presence. What 10 elements of comfort, community, or self-care do you appreciate in this practice?",
    quote: "The root of joy is gratefulness.",
    author: "David Steindl-Rast"
  },
  {
    day: 8,
    title: "The Soul's Blossom",
    prompt: "Think about the kindness you've received or shown. Record 10 instances of support, warmth, or progress in your focus quadrants.",
    quote: "Gratitude is the fairest blossom which springs from the soul.",
    author: "Henry Ward Beecher"
  },
  {
    day: 9,
    title: "A New Day",
    prompt: "Every day brings fresh perspectives. List 10 things you are glad to experience, utilize, or appreciate in this unique 24 hours.",
    quote: "This is a wonderful day. I've never seen this one before.",
    author: "Maya Angelou"
  },
  {
    day: 10,
    title: "Opening Doors",
    prompt: "Reflect on learning and opportunities. Write 10 details of your skills, resources, or connections that open doors for you.",
    quote: "Gratitude opens the door to the power, the wisdom, the creativity of the universe.",
    author: "Deepak Chopra"
  },
  {
    day: 11,
    title: "Reciprocating Warmth",
    prompt: "Think of the people, systems, or environments that help you. List 10 structural or emotional blessings in your life.",
    quote: "No duty is more urgent than that of returning thanks.",
    author: "Saint Ambrose"
  },
  {
    day: 12,
    title: "Heartfelt Memory",
    prompt: "Access your memory. Write down 10 past experiences, lessons, or people who shaped your happiness, classifying each one.",
    quote: "Gratitude is when memory is stored in the heart and not in the mind.",
    author: "Lionel Hampton"
  },
  {
    day: 13,
    title: "Mindful Cloak",
    prompt: "Wrap yourself in positivity. Record 10 physical, emotional, or professional things you feel lucky to have in your journey.",
    quote: "Wear gratitude like a cloak and it will feed every corner of your life.",
    author: "Rumi"
  },
  {
    day: 14,
    title: "Attitude of Abundance",
    prompt: "Ponder on the security, wisdom, and health you possess. Document 10 assets (material or immaterial) you value today.",
    quote: "An attitude of gratitude brings great things.",
    author: "Yogi Bhajan"
  },
  {
    day: 15,
    title: "Open Portals",
    prompt: "Notice the flow of good things. List 10 tools, services, relationships, or comforts that make your daily routines pleasant.",
    quote: "Gratitude is the open door to abundance.",
    author: "Yogi Bhajan"
  },
  {
    day: 16,
    title: "Simplicity in Joy",
    prompt: "Reflect on simplicity. What 10 basic, uncomplicated aspects of your day (sunlight, rest, kindness) are you thankful for?",
    quote: "Joy is the simplest form of gratitude.",
    author: "Karl Barth"
  },
  {
    day: 17,
    title: "Tranquil Heart",
    prompt: "Find stillness. Write down 10 thoughts, memories, or environments that bring you peace, specifying their categories.",
    quote: "Gratitude changes the pangs of memory into a tranquil joy.",
    author: "Dietrich Bonhoeffer"
  },
  {
    day: 18,
    title: "Richness of Life",
    prompt: "Look at the balance of giving and receiving. Record 10 gifts (tangible or emotional) you received today.",
    quote: "In ordinary life, we hardly realize that we receive a great deal more than we give, and that it is only with gratitude that life becomes rich.",
    author: "Dietrich Bonhoeffer"
  },
  {
    day: 19,
    title: "Wise Rejoicing",
    prompt: "Celebrate what you already possess. Write down 10 positive states, possessions, or relationships currently active in your life.",
    quote: "He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.",
    author: "Epictetus"
  },
  {
    day: 20,
    title: "Noble Reflections",
    prompt: "Acknowledge the depth of your practice as you near completion. List 10 moments of progress or lessons you are grateful for.",
    quote: "Gratitude is the sign of noble souls.",
    author: "Aesop"
  },
  {
    day: 21,
    title: "Present Blessings",
    prompt: "On this final day of the journey, reflect deeply on all 6 focus areas. Log your 10 culminations of gratitude in health, career, love, and life.",
    quote: "Reflect upon your present blessings—of which every man has many—not on your past misfortunes, of which all men have some.",
    author: "Charles Dickens"
  }
];

// Weekday Quote database (Rumi/Bible)
const WEEKDAY_QUOTES = [
  { text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.", author: "1 Thessalonians 5:18" },
  { text: "Gratitude is the wine for the soul. Go on, get drunk.", author: "Rumi" },
  { text: "O give thanks to the Lord, for he is good; for his steadfast love endures forever.", author: "1 Chronicles 16:34" },
  { text: "Wear gratitude like a cloak and it will feed every corner of your life.", author: "Rumi" },
  { text: "Enter his gates with thanksgiving, and his courts with praise! Give thanks to him.", author: "Psalm 100:4" },
  { text: "Be grateful for whoever comes, because each has been sent as a guide from beyond.", author: "Rumi" },
  { text: "This is the day that the Lord has made; let us rejoice and be glad in it.", author: "Psalm 118:24" },
  { text: "Thankfulness brings you to the place where the Beloved lives.", author: "Rumi" },
  { text: "And let the peace of Christ rule in your hearts... And be thankful.", author: "Colossians 3:15" },
  { text: "If you are grateful, I will give you more.", author: "Rumi (based on Quran 14:7)" },
  { text: "Every good gift and every perfect gift is from above, coming down from the Father of lights.", author: "James 1:17" },
  { text: "Bring the beauty of gratitude into your heart, and the world will mirror it back to you.", author: "Rumi" },
  { text: "I will give thanks to the Lord with my whole heart; I will tell of all your wonderful deeds.", author: "Psalm 9:1" },
  { text: "Gratitude turns the mind toward the light.", author: "Rumi" }
];

// Tarot Major Arcana Database (0 to 21)
const TAROT_CARDS = [
  { num: "0", name: "The Fool", icon: "🃏", keywords: "Beginnings, Spontaneity, Faith", desc: "The Fool represents the start of a sacred journey. It urges you to step forward with trust and an open heart, embracing new beginnings without fear of the unknown." },
  { num: "I", name: "The Magician", icon: "🪄", keywords: "Manifestation, Willpower, Skill", desc: "The Magician symbols your innate power to transform thoughts into reality. Focus your intentions, utilize your tools, and realize your manifestation potential." },
  { num: "II", name: "The High Priestess", icon: "🌙", keywords: "Intuition, Inner Voice, Mystery", desc: "The High Priestess invites you to look inward and trust your subconscious. Answers lie not in logic, but in listening to the quiet space within." },
  { num: "III", name: "The Empress", icon: "👑", keywords: "Abundance, Creativity, Nature", desc: "The Empress represents the nurturing abundance of the Earth. Today, connect with your creativity, surround yourself with beauty, and allow your life to bloom." },
  { num: "IV", name: "The Emperor", icon: "🏰", keywords: "Structure, Authority, Stability", desc: "The Emperor brings structure, discipline, and grounding stability. Organize your environment, set healthy boundaries, and assume control of your path." },
  { num: "V", name: "The Hierophant", icon: "📜", keywords: "Tradition, Guidance, Wisdom", desc: "The Hierophant represents spiritual wisdom and learning. Today, seek deeper understanding, respect your guiding principles, or seek mentorship." },
  { num: "VI", name: "The Lovers", icon: "❤️", keywords: "Alignment, Harmony, Choice", desc: "The Lovers symbol harmony, core alignment, and choices of the heart. Seek balance in your connections and stand firm in your values." },
  { num: "VII", name: "The Chariot", icon: "🏹", keywords: "Willpower, Focus, Victory", desc: "The Chariot represents focused willpower and victory over obstacles. Maintain direction, coordinate conflicting forces, and charge forward with intent." },
  { num: "VIII", name: "Strength", icon: "🦁", keywords: "Courage, Compassion, Resilience", desc: "Strength represents quiet courage, patience, and compassion. Conquer challenges not with raw force, but with gentle resilience and self-love." },
  { num: "IX", name: "The Hermit", icon: "⏳", keywords: "Introspection, Solitude, Guidance", desc: "The Hermit calls for contemplation and inner search. Take a step back from external noise to find the light of truth shining from within." },
  { num: "X", name: "Wheel of Fortune", icon: "🎡", keywords: "Cycles, Luck, Turning Points", desc: "The Wheel of Fortune represents the natural cycles of change, destiny, and turning points. Embrace impermanence and trust that the wheel is turning in your favor." },
  { num: "XI", name: "Justice", icon: "⚖️", keywords: "Fairness, Truth, Karma", desc: "Justice calls for truth, objective analysis, and karma. Act with integrity, take responsibility, and strive for balance in all decisions." },
  { num: "XII", name: "The Hanged Man", icon: "🧘", keywords: "Surrender, Perspective, Pause", desc: "The Hanged Man invites you to pause, surrender control, and look at things from a completely different perspective. Let go to move forward." },
  { num: "XIII", name: "Death", icon: "💀", keywords: "Transformation, Release, Rebirth", desc: "Death is not physical loss, but profound transformation. Release outdated habits, thoughts, or relationships to clear space for clean rebirth." },
  { num: "XIV", name: "Temperance", icon: "🏺", keywords: "Moderation, Alchemy, Patience", desc: "Temperance calls for moderation, balance, and patience. Blend opposing elements in your life to create a state of peaceful harmony." },
  { num: "XV", name: "The Devil", icon: "⛓️", keywords: "Attachment, Shadow Self, Freedom", desc: "The Devil alerts you to unhealthy dependencies or self-imposed cages. Acknowledge your attachments, embrace your shadow, and reclaim your freedom." },
  { num: "XVI", name: "The Tower", icon: "⚡", keywords: "Sudden Change, Awakening, Revelation", desc: "The Tower represents the breaking of old, unstable foundations. Sudden shifts can be jarring, but they clear space for structures built on truth." },
  { num: "XVII", name: "The Star", icon: "🌟", keywords: "Hope, Faith, Healing", desc: "The Star shines with calm hope, renewal, and deep spiritual healing. Trust that you are guided and protected as you walk your true path." },
  { num: "XVIII", name: "The Moon", icon: "🔮", keywords: "Illusion, Intuition, Subconscious", desc: "The Moon represents navigation through shadows and illusions. Trust your intuition to guide you when your analytical mind cannot see the path." },
  { num: "XIX", name: "The Sun", icon: "☀️", keywords: "Success, Joy, Vitality", desc: "The Sun radiates warmth, vitality, joy, and success. Celebrate your achievements today and let your bright, authentic self shine." },
  { num: "XX", name: "Judgement", icon: "🔔", keywords: "Awakening, Calling, Absolution", desc: "Judgement calls for reflection, self-evaluation, and answering your true calling. Embrace awakening and release past regrets." },
  { num: "XXI", name: "The World", icon: "🌍", keywords: "Completion, Integration, Fulfillment", desc: "The World represents integration, completion, and ultimate fulfillment. Celebrate your wholeness and the successful closure of a cycle." }
];

// Curator of Zen Meditation Tips (30 tips)
const MEDITATION_TIPS = [
  "Sit comfortably. A straight spine allows energy to flow naturally.",
  "Focus on the physical sensation of the air entering your nostrils.",
  "When thoughts arise, observe them like clouds in the sky, then return to breath.",
  "Do not judge your busy mind. Realizing you wandered is the moment of mindfulness.",
  "Soften your shoulders and release any tension in your jaw.",
  "Breathe in deep, fill your belly. Breathe out slowly, release everything.",
  "Meditation is not about stopping thoughts; it's about not getting lost in them.",
  "A single mindful breath is a moment of absolute freedom.",
  "Quiet the mind, and the soul will speak.",
  "Inhale peace. Exhale chaos.",
  "Sit in silence for a few minutes daily. Silence is the ultimate teacher.",
  "Listen to the sounds around you. Do not name them, just listen.",
  "Feel the weight of your body resting on the chair or floor.",
  "Gently close your eyes or hold a soft, unfocused gaze downward.",
  "Let your breath be natural. Do not force or control it.",
  "Anchor your mind to the physical anchor: your breath.",
  "Be patient with yourself. Training the mind takes time and love.",
  "As you sit, notice the space between your thoughts.",
  "Feel gratitude for this time dedicated to your inner peace.",
  "The present moment is the only place where life exists.",
  "You cannot stop the waves, but you can learn to surf.",
  "Breathe in light. Breathe out tension.",
  "Feel the expansion of your lungs. Celebrate the gift of life.",
  "Allow yourself to simply BE, rather than always DO.",
  "Connect with the silent witness inside you who observes all thoughts.",
  "Let go of expectation. There is no 'good' or 'bad' meditation.",
  "If the mind is loud, focus on the physical rise of your chest.",
  "A calm mind brings inner strength and self-confidence.",
  "Ground yourself by imagining roots extending from your spine into the earth.",
  "End your session with a soft smile of appreciation."
];

// Core Application State
let state = {
  currentDayNum: 1,       // Indefinite counting (beyond 21)
  currentStreak: 0,
  longestStreak: 0,
  entries: {},            // Keyed by date string "YYYY-MM-DD"
  lastCompletedDate: null,// Date string "YYYY-MM-DD"
  name: null,             // User's Name
  dob: null,              // User's Date of Birth "YYYY-MM-DD"
  email: null,            // User's Email
  currentJourneyPage: 1,  // For 21-day grid pagination
  manifestations: {},     // Keyed by unique ID
  meditationSessions: [], // Array of { timestamp, duration, note }
  settings: {
    remindersEnabled: true,
    chimeEnabled: true
  }
};

// Date Simulation Globals
let devMode = false;
let simDateOffset = 0; // Days offset from real clock

// Sound synthesis using Web Audio API (Chime)
let audioCtx = null;

// Confetti System Variables
let canvasConfetti = null;
let ctxConfetti = null;
let confettiActive = false;
let confettiParticles = [];

// Meditation Timer Globals
let meditationTimerId = null;
let meditationSecondsLeft = 600; // 10 minutes default
let meditationIsActive = false;
let meditationBoxStep = 0;       // 0=Inhale, 1=Hold, 2=Exhale, 3=Hold Empty
let meditationBoxSecs = 4;       // 4s intervals

// DOM Element Selectors
const select = (id) => document.getElementById(id);

// Load State from LocalStorage
function loadState() {
  const saved = localStorage.getItem("aura_gratitude_journal_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
      
      // Ensure defaults for new fields in old states
      if (!state.manifestations) state.manifestations = {};
      if (!state.meditationSessions) state.meditationSessions = [];
      if (!state.currentJourneyPage) state.currentJourneyPage = Math.ceil(state.currentDayNum / 21);
      
      // Migrate old manifestations from date-string keys to unique IDs
      if (state.manifestations) {
        const migrated = {};
        let needsSave = false;
        Object.entries(state.manifestations).forEach(([key, val]) => {
          if (key.match(/^\d{4}-\d{2}-\d{2}$/) && val && !val.id) {
            const id = 'm_' + key.replace(/-/g, '_') + '_' + Math.random().toString(36).substr(2, 5);
            migrated[id] = {
              id: id,
              intend: val.intend,
              feel: val.feel || "",
              action: val.action || "",
              dateStr: key,
              timestamp: val.timestamp || new Date(key).getTime(),
              manifestedDate: val.manifestedDate || null
            };
            needsSave = true;
          } else {
            migrated[key] = val;
          }
        });
        if (needsSave) {
          state.manifestations = migrated;
          // saveState will run shortly after initialization
        }
      }
    } catch (e) {
      console.error("Error loading state, resetting to default.", e);
    }
  }
  
  // Dev date init
  const savedDev = localStorage.getItem("aura_gratitude_journal_dev");
  if (savedDev) {
    try {
      const devState = JSON.parse(savedDev);
      devMode = false; // Always default to false on load for safety
      simDateOffset = devState.simDateOffset || 0;
    } catch(e) {}
  }
}

// Save State to LocalStorage
function saveState() {
  localStorage.setItem("aura_gratitude_journal_state", JSON.stringify(state));
  localStorage.setItem("aura_gratitude_journal_dev", JSON.stringify({ devMode, simDateOffset }));
  updateSimDetailsPanel();
}

// Time Helper Functions
function getSimulatedDate() {
  const date = new Date();
  if (devMode && simDateOffset !== 0) {
    date.setDate(date.getDate() + simDateOffset);
  }
  return date;
}

function getFormattedDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

// Reset the entire practice to Day 1, keeping history
function triggerPracticeReset() {
  state.currentDayNum = 1;
  state.currentStreak = 0;
  state.currentJourneyPage = 1;
  saveState();
  
  // Update view
  renderJourneyGrid();
  updateTopBarStats();
  
  // Open Streak Reset Modal
  select("reset-modal").classList.add("active");
}

// Streak & Weekday validation
function validateStreakAndDayTransition() {
  const now = getSimulatedDate();
  const todayStr = getFormattedDateString(now);

  if (isWeekend(now)) {
    return;
  }

  if (state.lastCompletedDate) {
    if (state.entries[todayStr]) {
      return;
    }

    const lastDate = new Date(state.lastCompletedDate);
    const currentDate = new Date(todayStr);

    // Calculate the number of weekdays in the gap
    let checkDate = new Date(lastDate);
    checkDate.setDate(checkDate.getDate() + 1);

    let missedWeekdays = 0;
    while (checkDate < currentDate) {
      if (!isWeekend(checkDate)) {
        const dateKey = getFormattedDateString(checkDate);
        if (!state.entries[dateKey]) {
          missedWeekdays++;
        }
      }
      checkDate.setDate(checkDate.getDate() + 1);
    }

    if (missedWeekdays > 0) {
      triggerPracticeReset();
    }
  }
}

// Dynamic Daily Tarot Calculation
function getDailyTarotCard(dobString, dateString) {
  if (!dobString) return TAROT_CARDS[0]; 
  
  // Sum DOB digits
  const dobDigits = dobString.replace(/-/g, "").split("").map(Number);
  const dobSum = dobDigits.reduce((a, b) => a + b, 0);
  
  // Sum Date digits
  const dateDigits = dateString.replace(/-/g, "").split("").map(Number);
  const dateSum = dateDigits.reduce((a, b) => a + b, 0);
  
  // Combine numerologies
  const index = (dobSum + dateSum) % 22;
  return TAROT_CARDS[index];
}

// Check DOB, Name, Email requirement modal
function checkDOBRequirement() {
  if (!state.dob || !state.name || !state.email) {
    select("dob-modal").classList.add("active");
    if (state.name) select("user-name-input").value = state.name;
    if (state.dob) select("user-dob-input").value = state.dob;
    if (state.email) select("user-email-input").value = state.email;
  } else {
    select("dob-modal").classList.remove("active");
  }
}

// Audio Engine for Web Audio API Chimes (Singing Bowl & Crystal Bell)
function playChimeSound(isSingingBowl = false) {
  if (!state.settings.chimeEnabled) return;
  
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const playNode = (freq, time, duration, volume, isHarmonic = false) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = isSingingBowl ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, time);
      
      gainNode.gain.setValueAtTime(0, time);
      if (isSingingBowl) {
        gainNode.gain.linearRampToValueAtTime(volume, time + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      } else {
        gainNode.gain.linearRampToValueAtTime(volume, time + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      }
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(time);
      osc.stop(time + duration);
    };

    const now = audioCtx.currentTime;
    
    if (isSingingBowl) {
      // Deep resonant Singing bowl arpeggio
      playNode(180, now, 3.0, 0.4); 
      playNode(270, now + 0.1, 2.5, 0.25);
      playNode(360, now + 0.2, 2.0, 0.15);
    } else {
      // High glass bell chime
      playNode(523.25, now, 1.5, 0.2); // C5
      playNode(659.25, now + 0.12, 1.3, 0.15); // E5
      playNode(783.99, now + 0.24, 1.1, 0.15); // G5
      playNode(1046.50, now + 0.36, 1.8, 0.25); // C6
    }
  } catch (e) {
    console.error("Web Audio Chime Error", e);
  }
}

// Confetti Particle System
function initConfetti() {
  canvasConfetti = select("confetti-canvas");
  ctxConfetti = canvasConfetti.getContext("2d");
  
  window.addEventListener("resize", resizeConfettiCanvas);
  resizeConfettiCanvas();
}

function resizeConfettiCanvas() {
  if (canvasConfetti) {
    canvasConfetti.width = window.innerWidth;
    canvasConfetti.height = window.innerHeight;
  }
}

class ConfettiParticle {
  constructor(x, y, color = null) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.color = color || `hsl(${Math.random() * 360}, 85%, 65%)`;
    this.speedX = Math.random() * 10 - 5;
    this.speedY = Math.random() * -15 - 5;
    this.gravity = 0.3;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
  }

  draw() {
    ctxConfetti.save();
    ctxConfetti.translate(this.x, this.y);
    ctxConfetti.rotate((this.rotation * Math.PI) / 180);
    ctxConfetti.fillStyle = this.color;
    ctxConfetti.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctxConfetti.restore();
  }
}

function triggerCelebrationConfetti(isGoldOnly = false) {
  confettiActive = true;
  confettiParticles = [];
  
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight + 10;
  
  // Custom colors for milestone (gold/purple gradient colors)
  const getGoldColor = () => {
    const tones = ["#fbbf24", "#f59e0b", "#d97706", "#fef08a", "#a855f7", "#c084fc"];
    return tones[Math.floor(Math.random() * tones.length)];
  };

  for (let i = 0; i < 150; i++) {
    const col = isGoldOnly ? getGoldColor() : null;
    confettiParticles.push(new ConfettiParticle(startX, startY, col));
  }
  
  for (let i = 0; i < 50; i++) {
    const col = isGoldOnly ? getGoldColor() : null;
    const p = new ConfettiParticle(0, window.innerHeight - 50, col);
    p.speedX = Math.random() * 12 + 5;
    p.speedY = Math.random() * -12 - 5;
    confettiParticles.push(p);
  }

  for (let i = 0; i < 50; i++) {
    const col = isGoldOnly ? getGoldColor() : null;
    const p = new ConfettiParticle(window.innerWidth, window.innerHeight - 50, col);
    p.speedX = Math.random() * -12 - 5;
    p.speedY = Math.random() * -12 - 5;
    confettiParticles.push(p);
  }
  
  animateConfetti();
}

function animateConfetti() {
  if (!confettiActive) return;
  
  ctxConfetti.clearRect(0, 0, canvasConfetti.width, canvasConfetti.height);
  
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.update();
    p.draw();
    
    if (p.y > window.innerHeight + 20 || p.x < -20 || p.x > window.innerWidth + 20) {
      confettiParticles.splice(i, 1);
    }
  }
  
  if (confettiParticles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiActive = false;
    ctxConfetti.clearRect(0, 0, canvasConfetti.width, canvasConfetti.height);
  }
}

// Web Notifications API Setup
function requestNotificationPermission() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          console.log("Desktop notifications enabled.");
        }
      });
    }
  }
}

// Trigger Notifications
function triggerHourlyReminder() {
  const dateStr = getFormattedDateString(getSimulatedDate());
  if (state.entries[dateStr]) return;
  if (isWeekend(getSimulatedDate())) return;
  
  if (state.settings.remindersEnabled && "Notification" in window && Notification.permission === "granted") {
    new Notification("Aura Gratitude Journal", {
      body: "Take a 2-minute pause to write down your 10 daily moments of gratitude.",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='48' height='48' fill='none' stroke='%238b5cf6' stroke-width='2'><path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'/></svg>"
    });
  }

  playChimeSound();

  const banner = select("reminder-banner");
  banner.classList.remove("hidden");
  
  setTimeout(() => {
    banner.classList.add("hidden");
  }, 10000);
}

// Setup Reminder interval checking
let reminderIntervalId = null;
function setupReminderScheduler(speedUp = false) {
  if (reminderIntervalId) {
    clearInterval(reminderIntervalId);
  }
  
  const intervalTime = speedUp ? 10000 : 3600000;
  
  reminderIntervalId = setInterval(() => {
    if (state.settings.remindersEnabled) {
      triggerHourlyReminder();
    }
  }, intervalTime);
}

// Milestone celebration descriptions database
function getMilestoneDetails(day) {
  const milestones = {
    7: { title: "7-Day Milestone! 🌟", sub: "A full week of consistency. You are building a powerful habit.", quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    14: { title: "14-Day Milestone! 🌸", sub: "Two weeks of consistent reflection. Your awareness is deepening.", quote: "Gratitude is not a temporary feeling, but a permanent state of mind.", author: "Unknown" },
    21: { title: "21-Day Journey Complete! 🏆", sub: "Congratulations! You have completed the classic 21-day practice cycle.", quote: "What we write in gratitude remains etched in the heart forever.", author: "Aura Wisdom" },
    30: { title: "30-Day Zen Milestone! 🧘", sub: "One full month of journaling. You have integrated gratitude into your identity.", quote: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
    60: { title: "60-Day Cosmic Streak! 🌌", sub: "Two months of daily alignment. You are manifesting deep positive shifts.", quote: "Energy flows where attention goes.", author: "Huna Wisdom" },
    90: { title: "90-Day Mastery Milestone! 👑", sub: "Three months of dedication. Gratitude is now your default state of being.", quote: "The miracle is not to walk on water, but to walk on the earth in the present moment.", author: "Thich Nhat Hanh" },
    100: { title: "100-Day Centurion Streak! 💎", sub: "100 days of absolute consistency! You have achieved a legendary milestone.", quote: "Consistency is the true hallmark of spiritual growth.", author: "Aura Wisdom" }
  };
  
  if (day > 100 && day % 100 === 0) {
    return {
      title: `${day}-Day Master Streak! 💎`,
      sub: `Incredible milestone. ${day} days of profound consistency and mindfulness.`,
      quote: "Consistency is the true hallmark of spiritual growth.",
      author: "Aura Wisdom"
    };
  }
  
  return milestones[day] || null;
}

// UI RENDERING ENGINE

// Update top header elements
function updateTopBarStats() {
  const date = getSimulatedDate();
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  select("display-date").textContent = date.toLocaleDateString('en-US', options);
  
  select("streak-value").textContent = state.currentStreak;
  select("journey-badge-text").textContent = `Day ${state.currentDayNum} of 21`;
  
  document.body.className = '';
  
  if (isWeekend(date)) {
    document.body.classList.add("theme-neutral");
    select("journey-badge-text").textContent = "Weekend Break";
    select("journey-badge-container").style.opacity = "0.7";
  } else {
    select("journey-badge-container").style.opacity = "1";
    document.body.classList.add("theme-neutral");
  }
}

// Render Journey Dashboard Cards with pagination
function renderJourneyGrid() {
  const container = select("journey-grid-container");
  container.innerHTML = "";
  
  const date = getSimulatedDate();
  const isTodayWeekend = isWeekend(date);

  // Weekday Quote vs Weekend Pause banner toggle
  if (isTodayWeekend) {
    select("weekend-pause-banner").classList.remove("hidden");
    select("weekday-quote-banner").classList.add("hidden");
    select("active-day-cta").classList.add("hidden");
    
    const msgEl = select("weekend-pause-message");
    if (msgEl) {
      if (state.currentDayNum === 1) {
        msgEl.textContent = "It is currently the weekend. Aura's guided journey is paused so you can rest. You can begin your 21-day practice this coming Monday!";
      } else {
        msgEl.textContent = `It is currently the weekend. Aura is paused so you can rest and be present. Your 21-day practice will resume on Monday (Day ${state.currentDayNum}).`;
      }
    }
  } else {
    select("weekend-pause-banner").classList.add("hidden");
    select("weekday-quote-banner").classList.remove("hidden");
    
    // Set weekday gratitude quote dynamically
    const quoteData = getWeekdayQuoteForDate(date);
    select("weekday-quote-text").textContent = `"${quoteData.text}"`;
    select("weekday-quote-author").textContent = `— ${quoteData.author}`;
    
    if (state.currentDayNum <= 9999) { // Effectively infinite
      select("active-day-cta").classList.remove("hidden");
      
      // Calculate correct active day details (cycle prompts 1 to 21)
      const dayIndex = (state.currentDayNum - 1) % 21;
      const activeDay = JOURNAL_DAYS[dayIndex];
      select("cta-day-tag").textContent = `Day ${state.currentDayNum} Mindfulness`;
      select("cta-theme-title").textContent = activeDay.title;
      select("cta-prompt-desc").textContent = "Record 10 things you are grateful for across all key areas of your life.";
    }
  }

  // Calculate paginated cards: page 1 = Days 1–21, page 2 = Days 22–42, etc.
  const startDay = (state.currentJourneyPage - 1) * 21 + 1;
  const endDay = startDay + 20;

  select("journey-page-title").textContent = `Days ${startDay} - ${endDay}`;

  // Enable/disable page controls
  select("journey-prev-page-btn").disabled = (state.currentJourneyPage === 1);
  // Cannot click next page beyond the page containing activeDay
  const maxAllowedPage = Math.ceil(state.currentDayNum / 21);
  select("journey-next-page-btn").disabled = (state.currentJourneyPage >= maxAllowedPage);

  for (let currentDay = startDay; currentDay <= endDay; currentDay++) {
    const card = document.createElement("div");
    card.classList.add("day-card");
    
    let dotsHtml = "";
    const colorMap = {
      Health: "#10b981",
      Career: "#3b82f6",
      Family: "#f97316",
      Job: "#14b8a6",
      Money: "#eab308",
      Love: "#ec4899"
    };

    const dayIndex = (currentDay - 1) % 21;
    const dayMeta = JOURNAL_DAYS[dayIndex];

    // Find if this day has a completed entry in history
    const matchedEntry = Object.values(state.entries).find(e => e.dayNum === currentDay);

    if (currentDay < state.currentDayNum) {
      card.classList.add("completed");

      if (matchedEntry && matchedEntry.items) {
        matchedEntry.items.forEach(item => {
          const cat = item.category || "Health";
          dotsHtml += `<span style="width: 5px; height: 5px; border-radius: 50%; background: ${colorMap[cat]}; display: inline-block;"></span>`;
        });
      }
    } else if (currentDay === state.currentDayNum && !isTodayWeekend) {
      card.classList.add("active");
      card.classList.add("theme-neutral");
    } else {
      card.classList.add("locked");
    }

    card.innerHTML = `
      <div class="day-card-number">${currentDay}</div>
      <div class="day-card-label">Day</div>
      ${dotsHtml ? `<div style="display: flex; gap: 2px; justify-content: center; position: absolute; bottom: 8px; width: 100%; flex-wrap: wrap; padding: 0 4px;">${dotsHtml}</div>` : `<div class="day-card-category">${dayMeta.category || 'Practice'}</div>`}
    `;

    card.addEventListener("click", () => {
      if (card.classList.contains("active")) {
        navigateToView("journal-view");
      } else if (card.classList.contains("completed")) {
        navigateToView("history-view");
        const searchInput = select("history-search");
        searchInput.value = `Day ${currentDay}`;
        renderHistoryList();
      }
    });

    container.appendChild(card);
  }
}

// Get quote dynamically based on Date components hash
function getWeekdayQuoteForDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const idx = (day + month + year) % WEEKDAY_QUOTES.length;
  return WEEKDAY_QUOTES[idx];
}

// Generate the 10 Journal Form inputs dynamically (with category selector per item)
function setupJournalWorkspace() {
  const dayIndex = (state.currentDayNum - 1) % 21;
  const activeDay = JOURNAL_DAYS[dayIndex];
  if (!activeDay) return;

  // Header & Badges
  select("journal-focus-badge").textContent = `Day ${state.currentDayNum} Theme: ${activeDay.title}`;
  select("journal-focus-badge").className = `focus-indicator-badge tag-health`;
  select("journal-day-title").textContent = `Daily Journal`;
  
  // Set Quote & Author
  select("journal-quote").textContent = `"${activeDay.quote}"`;
  select("journal-quote-author").textContent = `— ${activeDay.author}`;
  
  // Set Focus Prompt text
  select("journal-prompt-text").textContent = `${activeDay.prompt}`;
  
  // Create 10 Inputs
  const container = select("inputs-container");
  container.innerHTML = "";

  const dateStr = getFormattedDateString(getSimulatedDate());
  const existingEntry = state.entries[dateStr];

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("input-row");
    
    let itemVal = { text: "", category: "Health" };
    if (existingEntry && existingEntry.items && existingEntry.items[i]) {
      const val = existingEntry.items[i];
      if (typeof val === 'string') {
        itemVal.text = val;
      } else {
        itemVal = { ...itemVal, ...val };
      }
    }
    
    if (itemVal.text) row.classList.add("filled");

    row.innerHTML = `
      <span class="input-num">${i + 1}</span>
      <div class="input-field-wrapper">
        <input type="text" class="gratitude-input" placeholder="Something you appreciate..." value="${escapeHTML(itemVal.text)}" data-index="${i}">
        <span class="check-icon">✓</span>
      </div>
      <select class="category-select select-${itemVal.category.toLowerCase()}" data-index="${i}">
        <option value="Health" ${itemVal.category === "Health" ? "selected" : ""}>Health</option>
        <option value="Career" ${itemVal.category === "Career" ? "selected" : ""}>Career</option>
        <option value="Family" ${itemVal.category === "Family" ? "selected" : ""}>Family</option>
        <option value="Job" ${itemVal.category === "Job" ? "selected" : ""}>Job</option>
        <option value="Money" ${itemVal.category === "Money" ? "selected" : ""}>Money</option>
        <option value="Love" ${itemVal.category === "Love" ? "selected" : ""}>Love</option>
      </select>
    `;

    container.appendChild(row);
  }

  // Bind input listeners
  const inputs = document.querySelectorAll(".gratitude-input");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const row = input.closest(".input-row");
      if (input.value.trim().length > 0) {
        row.classList.add("filled");
      } else {
        row.classList.remove("filled");
      }
      updateJournalProgress();
    });
  });

  const selects = document.querySelectorAll(".category-select");
  selects.forEach(sel => {
    sel.addEventListener("change", (e) => {
      const val = e.target.value;
      sel.className = `category-select select-${val.toLowerCase()}`;
    });
  });

  updateJournalProgress();
}

function updateJournalProgress() {
  const inputs = document.querySelectorAll(".gratitude-input");
  let filledCount = 0;
  inputs.forEach(input => {
    if (input.value.trim().length > 0) {
      filledCount++;
    }
  });

  select("completed-inputs-count").textContent = filledCount;
  
  const percentage = (filledCount / 10) * 100;
  select("journal-progress-bar").style.width = `${percentage}%`;

  const saveBtn = select("save-journal-btn");
  if (filledCount === 10) {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
}

// Save active day's journal entries (and trigger milestone celebration OR Daily Tarot Reveal)
function saveActiveJournalEntry() {
  const inputs = document.querySelectorAll(".gratitude-input");
  const selects = document.querySelectorAll(".category-select");
  
  const items = [];
  let allFilled = true;

  inputs.forEach((input, index) => {
    const text = input.value.trim();
    const cat = selects[index].value;
    if (!text) {
      allFilled = false;
    }
    items.push({ text, category: cat });
  });

  if (!allFilled || items.length < 10) {
    alert("Please fill all 10 entries before saving.");
    return;
  }

  const date = getSimulatedDate();
  const dateStr = getFormattedDateString(date);
  
  const dayIndex = (state.currentDayNum - 1) % 21;
  const activeDay = JOURNAL_DAYS[dayIndex];

  // Draw dynamic Daily Tarot Card based on DOB and current date string
  const drawnCard = getDailyTarotCard(state.dob, dateStr);

  // Save entry
  state.entries[dateStr] = {
    dayNum: state.currentDayNum,
    title: activeDay.title,
    quote: activeDay.quote,
    author: activeDay.author,
    prompt: activeDay.prompt,
    items: items,
    tarot: {
      num: drawnCard.num,
      name: drawnCard.name,
      icon: drawnCard.icon,
      keywords: drawnCard.keywords,
      desc: drawnCard.desc
    },
    timestamp: date.getTime()
  };

  const completedDay = state.currentDayNum;

  // Streak & progress updates
  state.lastCompletedDate = dateStr;
  state.currentStreak += 1;
  if (state.currentStreak > state.longestStreak) {
    state.longestStreak = state.currentStreak;
  }

  // Increment to next day
  state.currentDayNum += 1;
  state.currentJourneyPage = Math.ceil(state.currentDayNum / 21);

  saveState();
  playChimeSound();

  // Populate Daily Tarot Card details
  select("tarot-celebration-title").textContent = `Day ${completedDay} Complete!`;
  select("tarot-card-num").textContent = drawnCard.num;
  select("tarot-card-title-text").textContent = drawnCard.name;
  select("tarot-card-icon").textContent = drawnCard.icon;
  select("tarot-card-keywords").textContent = drawnCard.keywords;
  select("tarot-card-description").textContent = "Click on the card to flip and reveal its daily alignment...";
  
  // Ensure card state is unflipped and button is hidden initially
  const cardInner = select("tarot-card-inner");
  cardInner.classList.remove("flipped");
  select("close-tarot-modal").style.display = "none";

  // Check if completedDay is a Milestone
  const milestone = getMilestoneDetails(completedDay);
  if (milestone) {
    // High density gold/purple confetti
    triggerCelebrationConfetti(true);
    
    // Set up milestone celebration modal
    select("milestone-title").textContent = milestone.title;
    select("milestone-subtitle").textContent = milestone.sub;
    select("milestone-glow-count").textContent = completedDay;
    select("milestone-quote-text").textContent = `"${milestone.quote}"`;
    select("milestone-quote-author").textContent = `— ${milestone.author}`;
    
    // Show Milestone Modal
    select("milestone-modal").classList.add("active");
  } else {
    // Standard confetti & go straight to Tarot modal
    triggerCelebrationConfetti(false);
    select("tarot-modal").classList.add("active");
  }

  // Re-sync UI
  updateTopBarStats();
  renderJourneyGrid();
}

// Render Historical Entries
function renderHistoryList() {
  const container = select("history-list-container");
  container.innerHTML = "";

  const query = select("history-search").value.toLowerCase();
  const filterCat = select("history-filter-category").value;

  const entriesArray = Object.keys(state.entries).map(key => {
    return { dateStr: key, ...state.entries[key] };
  }).sort((a, b) => b.timestamp - a.timestamp);

  let matchCount = 0;

  entriesArray.forEach(entry => {
    const matchesCategory = filterCat === "all" || (entry.items && entry.items.some(item => item.category === filterCat));
    if (!matchesCategory) return;

    const matchesQuery = 
      `day ${entry.dayNum}`.includes(query) ||
      entry.title.toLowerCase().includes(query) ||
      (entry.items && entry.items.some(item => item.text.toLowerCase().includes(query) || item.category.toLowerCase().includes(query))) ||
      entry.dateStr.includes(query);

    if (!matchesQuery) return;

    matchCount++;

    const card = document.createElement("div");
    card.classList.add("history-card");

    const dateObj = new Date(entry.timestamp);
    const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateDisplay = dateObj.toLocaleDateString('en-US', dateOptions);

    let bulletsHtml = "";
    if (entry.items) {
      entry.items.forEach((item, index) => {
        bulletsHtml += `
          <li>
            <span class="history-bullet-num">${index + 1}</span> 
            <span class="history-item-tag tag-${item.category.toLowerCase()}">${item.category}</span>
            <span>${escapeHTML(item.text)}</span>
          </li>`;
      });
    }

    // Load static or saved tarot from history entry
    const t = entry.tarot || { num: "IX", name: "The Hermit", icon: "⏳", keywords: "Solitude", desc: "No saved card details." };

    card.innerHTML = `
      <div class="history-card-header">
        <div class="history-card-title">
          <span class="history-day-num">Day ${entry.dayNum}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">(Holistic Journal)</span>
        </div>
        <span class="history-date">${dateDisplay}</span>
      </div>
      <blockquote class="history-quote-excerpt">Daily Alignment: <strong>${t.num} - ${t.name}</strong> (${t.keywords})</blockquote>
      <div class="history-items-summary">
        <span>10 items of gratitude written</span>
        <span class="expand-indicator">▼</span>
      </div>
      <div class="history-details">
        <div style="margin-bottom: 14px; font-size: 0.85rem; color: var(--text-muted);">
          <strong>Theme:</strong> ${entry.title}<br>
          <strong>Drawn Tarot Card:</strong> ${t.name} (${t.icon}) — <em>${t.desc}</em>
        </div>
        <ul class="history-bullets">
          ${bulletsHtml}
        </ul>
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });

    container.appendChild(card);
  });

  if (matchCount === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        No matching journal entries found. Keep writing to populate your history!
      </div>
    `;
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// INSIGHTS VIEW ANALYTICS
function renderInsights() {
  const totalCompleted = Object.keys(state.entries).length;
  select("insights-completed-days").textContent = totalCompleted;
  select("insights-current-streak").textContent = state.currentStreak;
  select("insights-longest-streak").textContent = state.longestStreak;
  
  let totalItemsLogged = 0;
  Object.values(state.entries).forEach(entry => {
    if (entry.items) totalItemsLogged += entry.items.length;
  });
  select("insights-total-items").textContent = totalItemsLogged;

  // Category counts
  const categoryCounts = {
    Health: 0,
    Career: 0,
    Family: 0,
    Job: 0,
    Money: 0,
    Love: 0
  };

  Object.values(state.entries).forEach(entry => {
    if (entry.items) {
      entry.items.forEach(item => {
        const cat = item.category || "Health";
        if (categoryCounts[cat] !== undefined) {
          categoryCounts[cat] += 1;
        }
      });
    }
  });

  const chartVal = select("chart-center-num");
  const percentCompleted = Math.round((totalCompleted / 21) * 100);
  chartVal.textContent = `${percentCompleted}%`;

  const colorMap = {
    Health: "#10b981",
    Career: "#3b82f6",
    Family: "#f97316",
    Job: "#14b8a6",
    Money: "#eab308",
    Love: "#ec4899"
  };

  const segmentsContainer = select("donut-segments");
  const legendContainer = select("chart-legend-container");
  
  segmentsContainer.innerHTML = "";
  legendContainer.innerHTML = "";

  if (totalItemsLogged === 0) {
    legendContainer.innerHTML = `
      <div style="color: var(--text-muted); font-size: 0.85rem;">
        Your distribution will appear here once you save your first entry.
      </div>
    `;
  } else {
    // SVG calculations
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercent = 0;

    Object.entries(categoryCounts).forEach(([cat, count]) => {
      const fraction = totalItemsLogged > 0 ? (count / totalItemsLogged) : 0;
      const strokeDash = fraction * circumference;
      const strokeOffset = circumference - (accumulatedPercent * circumference);

      if (count > 0) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "100");
        circle.setAttribute("cy", "100");
        circle.setAttribute("r", radius.toString());
        circle.setAttribute("class", "donut-segment");
        circle.setAttribute("stroke", colorMap[cat]);
        circle.setAttribute("stroke-dasharray", `${strokeDash} ${circumference - strokeDash}`);
        circle.setAttribute("stroke-dashoffset", strokeOffset.toString());
        circle.setAttribute("style", "transition: stroke-dasharray 0.8s ease;");
        
        segmentsContainer.appendChild(circle);
      }

      accumulatedPercent += fraction;

      const pctVal = Math.round(fraction * 100);
      const legendItem = document.createElement("div");
      legendItem.classList.add("legend-item");
      legendItem.innerHTML = `
        <div class="legend-left">
          <span class="legend-dot" style="background: ${colorMap[cat]}"></span>
          <span class="legend-label">${cat}</span>
        </div>
        <span class="legend-val">${pctVal}% (${count} items)</span>
      `;
      legendContainer.appendChild(legendItem);
    });
  }

  // Calculate profile focus message
  let maxCat = "";
  let maxCount = -1;
  Object.entries(categoryCounts).forEach(([cat, val]) => {
    if (val > maxCount) {
      maxCount = val;
      maxCat = cat;
    }
  });

  const profileSummary = select("reflection-profile-summary");
  
  // Calculate Meditation Stats for Insights Card
  let totalMedMinutes = 0;
  state.meditationSessions.forEach(s => totalMedMinutes += s.duration);
  const totalMedSessions = state.meditationSessions.length;
  const avgMedTime = totalMedSessions > 0 ? Math.round(totalMedMinutes / totalMedSessions) : 0;
  const totalManifestations = Object.keys(state.manifestations).length;

  let meditationStatsHtml = `
    <div style="margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
      <h4 style="font-family:var(--font-serif); font-size: 1.15rem; margin-bottom: 12px; color:#fbbf24;">Mindfulness & Meditation Statistics</h4>
      <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:16px;">
        <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius: var(--border-radius-sm); text-align:center;">
          <span style="display:block; font-size:1.5rem; font-weight:700; color:var(--theme-primary);">${totalMedMinutes}m</span>
          <span style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px;">Total Meditated</span>
        </div>
        <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius: var(--border-radius-sm); text-align:center;">
          <span style="display:block; font-size:1.5rem; font-weight:700; color:var(--theme-primary);">${avgMedTime}m</span>
          <span style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px;">Avg Session</span>
        </div>
        <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius: var(--border-radius-sm); text-align:center;">
          <span style="display:block; font-size:1.5rem; font-weight:700; color:var(--theme-primary);">${totalMedSessions}</span>
          <span style="font-size:0.7rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px;">Sessions</span>
        </div>
      </div>
    </div>
  `;

  if (totalCompleted > 0 && maxCount > 0) {
    let focusAdvice = "";
    switch (maxCat) {
      case "Health":
        focusAdvice = "Your reflections show a strong appreciation for vitality and bodily care. Remember to carry this physical grounding into your professional life too.";
        break;
      case "Career":
        focusAdvice = "You place high value on growth and accomplishments. Balancing this with rest and family gratitude can bring even deeper rewards.";
        break;
      case "Family":
        focusAdvice = "Your heart centers heavily on home and loved ones. Continue nourishing these foundational relationships—they are your source of strength.";
        break;
      case "Job":
        focusAdvice = "You have shown deep mindfulness towards your workspace and team. Cultivating appreciation for your career milestones can elevate your trajectory.";
        break;
      case "Money":
        focusAdvice = "You show practical appreciation for financial security and comfort. Use this mindful abundance to explore creative self-care investments.";
        break;
      case "Love":
        focusAdvice = "You are deeply in tune with love, friendship, and personal connection. Celebrate this open heart, and make space for structural health and goal tracking.";
        break;
    }
    profileSummary.innerHTML = `
      You are currently displaying a <strong>${maxCat}-focused Aura profile</strong>. 
      ${focusAdvice}<br><br>
      <em>Keep writing daily. An evenly distributed profile across all 6 quadrants helps build holistic life satisfaction.</em>
      ${meditationStatsHtml}
    `;
  } else {
    profileSummary.innerHTML = `Complete your first entry to generate your Aura Reflection Profile.${meditationStatsHtml}`;
  }

  // Update Personal Aura Color Orb and suggestions panels
  updatePersonalAura(categoryCounts, totalItemsLogged);
  renderManifestationSuggestions(categoryCounts);
  renderManifestationVortices();
  renderManifestationTracker();
}

// Update the glowing Personal Aura Orb based on Category Counts
function updatePersonalAura(categoryCounts, totalItemsLogged) {
  const orbGlow = select("aura-orb-glow");
  const orbCore = select("aura-orb-core");
  const colorTitle = select("aura-color-title");
  const descText = select("aura-description-text");
  
  if (!orbGlow || !orbCore || !colorTitle || !descText) return;
  
  // Remove all existing aura classes
  orbGlow.className = "aura-orb-glow";
  
  if (totalItemsLogged === 0) {
    orbGlow.classList.add("aura-state-neutral");
    orbCore.textContent = "✨";
    colorTitle.textContent = "Neutral Aura";
    descText.textContent = "Log your daily gratitude entries to activate your personal Aura colors.";
    return;
  }
  
  let maxCat = "";
  let maxCount = -1;
  Object.entries(categoryCounts).forEach(([cat, val]) => {
    if (val > maxCount) {
      maxCount = val;
      maxCat = cat;
    }
  });
  
  const maxPercent = maxCount / totalItemsLogged;
  // If the highest category represents less than 22% of total logged gratitudes
  // and all categories have at least 1 count, this is a balanced/integrated flow.
  const isBalanced = maxPercent < 0.22 && Object.values(categoryCounts).every(v => v > 0);
  
  if (isBalanced) {
    orbGlow.classList.add("aura-state-indigo");
    orbCore.textContent = "🧘";
    colorTitle.textContent = "Indigo Violet Aura";
    descText.textContent = "Your energies are perfectly balanced. You cultivate harmony, spiritual integration, and holistic wisdom in equal measure.";
    return;
  }
  
  const auraMapping = {
    Health: {
      class: "aura-state-health",
      core: "🌿",
      title: "Emerald Green Aura",
      desc: "Representing physical vitality, healing, and somatic grounding. Your focus on bodily care and energy creates a resilient foundation."
    },
    Career: {
      class: "aura-state-career",
      core: "💼",
      title: "Sapphire Blue Aura",
      desc: "Representing professional vision, intellectual growth, and communication. You are alignment-driven and focused on professional purpose."
    },
    Family: {
      class: "aura-state-family",
      core: "🏡",
      title: "Sunset Orange Aura",
      desc: "Representing emotional warmth, root connections, and community care. Your energy thrives on stable, nurturing human bonds."
    },
    Job: {
      class: "aura-state-job",
      core: "🛠️",
      title: "Teal Aura",
      desc: "Representing purpose in service, dedication, and day-to-day coordination. You draw strength from structured productivity and team harmony."
    },
    Money: {
      class: "aura-state-money",
      core: "🪙",
      title: "Golden Amber Aura",
      desc: "Representing material security, abundance flow, and safety. You are building magnetic fields of prosperity and structural comfort."
    },
    Love: {
      class: "aura-state-love",
      core: "💖",
      title: "Rose Pink Aura",
      desc: "Representing heart-centered alignment, unconditional compassion, and emotional resonance. Your heart is an active beacon of attraction."
    }
  };
  
  const aura = auraMapping[maxCat] || auraMapping["Health"];
  orbGlow.classList.add(aura.class);
  orbCore.textContent = aura.core;
  colorTitle.textContent = aura.title;
  descText.textContent = aura.desc;
}

// Generate Areas of Manifestation Recommendations based on lowest gratitude counts
function renderManifestationSuggestions(categoryCounts) {
  const container = select("manifest-suggestions-list");
  if (!container) return;
  container.innerHTML = "";

  const total = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  if (total === 0) {
    container.innerHTML = `
      <div class="suggestion-item-box">
        <span class="suggestion-bullet">✨</span>
        <div>
          <strong>Holistic Intentions:</strong> Start logging gratitude to receive custom manifestation alignment recommendations.
        </div>
      </div>
    `;
    return;
  }

  // Sort categories by counts ascending
  const sorted = Object.entries(categoryCounts).sort((a, b) => a[1] - b[1]);
  
  // Take the top 2 lowest categories
  const low1 = sorted[0];
  const low2 = sorted[1];
  
  const categoryIcons = {
    Health: "🌿",
    Career: "💼",
    Family: "🏡",
    Job: "🛠️",
    Money: "🪙",
    Love: "💖"
  };

  const suggestions = {
    Health: "Direct your intentions toward physical vitality, healing, and rest. Visualize your body operating at peak energy.",
    Career: "Call in new creative milestones, long-term goals, or leadership opportunities. Picture your professional self thriving.",
    Family: "Focus your energy on nurturing your relationships with loved ones. Manifest warmth, patience, and clear boundaries.",
    Job: "Visualize a supportive workspace, daily satisfaction, or harmonious collaboration with your peers and team.",
    Money: "Set intentions for material abundance, unexpected support, or financial peace of mind. Feel the relief of resources flowing.",
    Love: "Invite deep connections, self-compassion, or romantic harmony. Focus on receiving love in its purest, most authentic forms."
  };

  // Create suggestion 1
  const item1 = document.createElement("div");
  item1.classList.add("suggestion-item-box");
  item1.innerHTML = `
    <span class="suggestion-bullet">${categoryIcons[low1[0]]}</span>
    <div>
      <strong>Manifest ${low1[0]}:</strong> ${suggestions[low1[0]]} <span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">(Lowest gratitude area)</span>
    </div>
  `;
  container.appendChild(item1);

  // Create suggestion 2
  const item2 = document.createElement("div");
  item2.classList.add("suggestion-item-box");
  item2.innerHTML = `
    <span class="suggestion-bullet">${categoryIcons[low2[0]]}</span>
    <div>
      <strong>Expand ${low2[0]}:</strong> ${suggestions[low2[0]]} <span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">(Second lowest area)</span>
    </div>
  `;
  container.appendChild(item2);
}

// Scan manifestation entries for keywords and generate tag chips
function renderManifestationVortices() {
  const container = select("manifest-vortices-chips");
  if (!container) return;
  container.innerHTML = "";

  const manifests = Object.values(state.manifestations);
  if (manifests.length === 0) {
    container.innerHTML = `<span class="vortex-chip">✨ Clear Intentions</span>`;
    return;
  }

  const categoryWords = {
    Health: { words: ['health', 'body', 'energy', 'vitality', 'heal', 'cure', 'strength', 'fitness', 'wellness', 'sleep', 'relax'], chip: '🌿 Vitality' },
    Career: { words: ['career', 'goal', 'success', 'growth', 'achievement', 'promote', 'business', 'project', 'client', 'future'], chip: '💼 Career Growth' },
    Family: { words: ['family', 'house', 'home', 'parent', 'sibling', 'child', 'marriage', 'nurture'], chip: '🏡 Home & Family' },
    Job: { words: ['job', 'work', 'office', 'team', 'boss', 'colleague', 'salary', 'co-worker'], chip: '🛠️ Work Alignment' },
    Money: { words: ['money', 'wealth', 'rich', 'abundance', 'finance', 'cash', 'income', 'dollar', 'debt', 'pay', 'receive'], chip: '🪙 Prosperity Flow' },
    Love: { words: ['love', 'partner', 'friend', 'compassion', 'romance', 'trust', 'couple', 'connection', 'care'], chip: '💖 Heart Center' },
    Peace: { words: ['peace', 'calm', 'quiet', 'meditate', 'zen', 'stress', 'anxiety', 'clarity', 'mindful'], chip: '🧘 Inner Peace' }
  };

  const counts = { Health: 0, Career: 0, Family: 0, Job: 0, Money: 0, Love: 0, Peace: 0 };

  manifests.forEach(m => {
    const text = `${m.intend} ${m.feel} ${m.action}`.toLowerCase();
    Object.entries(categoryWords).forEach(([cat, data]) => {
      data.words.forEach(w => {
        if (text.includes(w)) {
          counts[cat]++;
        }
      });
    });
  });

  let chipsAdded = 0;
  Object.entries(counts).forEach(([cat, val]) => {
    if (val > 0) {
      const chip = document.createElement("span");
      chip.classList.add("vortex-chip");
      chip.textContent = categoryWords[cat].chip;
      container.appendChild(chip);
      chipsAdded++;
    }
  });

  if (chipsAdded === 0) {
    container.innerHTML = `<span class="vortex-chip">✨ Alignment Initiated</span>`;
  }
}

// Calculate and render manifestation realization tracker statistics
function renderManifestationTracker() {
  const totalEl = select("tracker-manifest-total");
  const realizedEl = select("tracker-manifest-realized");
  const rateEl = select("tracker-manifest-rate");
  const daysEl = select("tracker-manifest-days");
  const listContainer = select("manifested-accomplishments");
  
  if (!totalEl || !realizedEl || !rateEl || !daysEl || !listContainer) return;
  
  const manifests = Object.values(state.manifestations);
  const totalCount = manifests.length;
  const realizedArray = manifests.filter(m => m.manifestedDate !== null && m.manifestedDate !== undefined);
  const realizedCount = realizedArray.length;
  
  totalEl.textContent = totalCount;
  realizedEl.textContent = realizedCount;
  rateEl.textContent = totalCount > 0 ? `${Math.round((realizedCount / totalCount) * 100)}%` : "0%";
  
  // Calculate average days to realize
  let totalDays = 0;
  let validCalculatedCount = 0;
  
  realizedArray.forEach(m => {
    if (m.manifestedDate) {
      const creationTime = m.timestamp || new Date(m.dateStr).getTime();
      const realizedTime = new Date(m.manifestedDate).getTime();
      const diffTime = realizedTime - creationTime;
      const diffDays = Math.max(0, Math.round(diffTime / (1000 * 3600 * 24)));
      totalDays += diffDays;
      validCalculatedCount++;
    }
  });
  
  daysEl.textContent = validCalculatedCount > 0 ? `${(totalDays / validCalculatedCount).toFixed(1)} days` : "-";
  
  // Render realized accomplishment logs
  listContainer.innerHTML = "";
  
  const sortedRealized = realizedArray.sort((a,b) => new Date(b.manifestedDate).getTime() - new Date(a.manifestedDate).getTime());
  
  sortedRealized.forEach(m => {
    const item = document.createElement("div");
    item.style.cssText = "background:rgba(16, 185, 129, 0.04); border:1px solid rgba(16, 185, 129, 0.12); padding:10px; border-radius: var(--border-radius-sm); display:flex; justify-content:space-between; align-items:center; font-size:0.82rem;";
    item.innerHTML = `
      <div style="flex-grow:1; padding-right:12px;">
        <span style="font-weight:600; color:#fff;">"${escapeHTML(m.intend)}"</span>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Committed on ${m.dateStr}</div>
      </div>
      <span style="font-size:0.78rem; font-weight:700; color:#10b981; white-space:nowrap; display:flex; align-items:center; gap:4px;">
        ✨ Realized ${m.manifestedDate}
      </span>
    `;
    listContainer.appendChild(item);
  });
  
  if (realizedCount === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 12px; color: var(--text-muted); font-size: 0.8rem;">
        No realized desires logged yet. Focus your intentions daily.
      </div>
    `;
  }
}

// Global actions to mark manifestation as manifested or clear status
window.markAsManifested = function(id) {
  const dateInput = select(`realize-date-${id}`);
  if (!dateInput) return;
  const dateVal = dateInput.value;
  if (!dateVal) {
    alert("Please select a valid date of realization.");
    return;
  }
  
  const m = state.manifestations[id];
  if (m) {
    m.manifestedDate = dateVal;
    saveState();
    renderManifestationList();
    renderInsights();
    playChimeSound(false);
    triggerCelebrationConfetti(false);
  }
};

window.clearManifestedStatus = function(id) {
  const m = state.manifestations[id];
  if (m) {
    m.manifestedDate = null;
    saveState();
    renderManifestationList();
    renderInsights();
  }
};

// MANIFESTATION JOURNAL LOGIC
function saveDailyManifestation() {
  const intend = select("manifest-intend").value.trim();
  const feel = select("manifest-feel").value.trim();
  const action = select("manifest-action").value.trim();
  const entryDateVal = select("manifest-entry-date").value;

  if (!intend) {
    alert("Please fill out your core intention to commit.");
    return;
  }
  
  if (!entryDateVal) {
    alert("Please select a valid creation date.");
    return;
  }

  // Generate unique ID
  const id = 'm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  state.manifestations[id] = {
    id: id,
    intend: intend,
    feel: feel,
    action: action,
    dateStr: entryDateVal,
    timestamp: new Date(entryDateVal).getTime(),
    manifestedDate: null
  };

  saveState();
  playChimeSound(false);
  triggerCelebrationConfetti(false);

  // Clear inputs
  select("manifest-intend").value = "";
  select("manifest-feel").value = "";
  select("manifest-action").value = "";

  renderManifestationList();
  alert("Manifestation committed! Keep alignment and trust the universe.");
}

function renderManifestationList() {
  const container = select("manifestation-list-container");
  if (!container) return;
  container.innerHTML = "";

  const query = select("manifestation-search").value.toLowerCase();

  const manifestArray = Object.values(state.manifestations).sort((a, b) => b.timestamp - a.timestamp);

  let matchCount = 0;

  manifestArray.forEach(m => {
    const matchesQuery = 
      m.intend.toLowerCase().includes(query) ||
      m.feel.toLowerCase().includes(query) ||
      m.action.toLowerCase().includes(query) ||
      m.dateStr.includes(query);

    if (!matchesQuery) return;

    matchCount++;

    const dateObj = new Date(m.timestamp);
    const dateDisplay = dateObj.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

    const card = document.createElement("div");
    card.classList.add("manifestation-card");
    
    let completionStatusHtml = `
      <div class="manifestation-completion-status" style="margin-top: 14px; padding-top: 12px; border-top:1px dashed rgba(255,255,255,0.06); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        ${!m.manifestedDate ? `
          <span style="font-size:0.8rem; color:var(--text-secondary); display:flex; align-items:center; gap:4px;">
            ⏳ Awaiting Manifestation
          </span>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="date" class="realize-date-input" id="realize-date-${m.id}" value="${getFormattedDateString(getSimulatedDate())}" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius: var(--border-radius-sm); padding:4px 8px; color:#fff; font-size:0.75rem; font-family:var(--font-ui); outline:none; cursor:pointer;">
            <button class="tiny-btn active" onclick="markAsManifested('${m.id}')" style="padding: 4px 10px; font-size:0.75rem;">Mark Realized</button>
          </div>
        ` : `
          <span style="font-size:0.8rem; color:#eab308; font-weight:600; display:flex; align-items:center; gap:4px;">
            ✨ Manifested on: ${m.manifestedDate}
          </span>
          <button class="tiny-btn danger" onclick="clearManifestedStatus('${m.id}')" style="padding: 4px 8px; font-size:0.75rem; background:rgba(239, 68, 68, 0.1); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.2);">Clear</button>
        `}
      </div>
    `;

    card.innerHTML = `
      <div class="manifestation-card-header">
        <span class="manifestation-card-date">${dateDisplay}</span>
        <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--theme-primary);">Alignment Log</span>
      </div>
      <div class="manifestation-item-q">Intentions</div>
      <p class="manifestation-item-a">"${escapeHTML(m.intend)}"</p>
      ${m.feel ? `<div class="manifestation-item-q">Vibrations & Feelings</div><p class="manifestation-item-a">${escapeHTML(m.feel)}</p>` : ""}
      ${m.action ? `<div class="manifestation-item-q">Inspired Action</div><p class="manifestation-item-a">👉 ${escapeHTML(m.action)}</p>` : ""}
      ${completionStatusHtml}
    `;

    container.appendChild(card);
  });

  if (matchCount === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.9rem;">
        No manifestations found. Log your intentions above to begin!
      </div>
    `;
  }
}

// MEDITATION ROOM LOGIC (Box Breathing Timer)
function setMeditationStopwatch(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  select("meditation-stopwatch").textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function handleMeditationTimerTick() {
  if (meditationSecondsLeft <= 0) {
    completeMeditationSession();
    return;
  }

  meditationSecondsLeft--;
  setMeditationStopwatch(meditationSecondsLeft);

  // Box Breathing cycle checks (4s intervals: Inhale -> Hold Full -> Exhale -> Hold Empty)
  meditationBoxSecs--;
  
  if (meditationBoxSecs <= 0) {
    meditationBoxStep = (meditationBoxStep + 1) % 4;
    meditationBoxSecs = 4;
  }

  const ring = select("breathing-ring");
  const guideText = select("breathing-guide-text");
  
  // Reset all highlighted guidance items
  select("step-inhale").className = "";
  select("step-hold1").className = "";
  select("step-exhale").className = "";
  select("step-hold2").className = "";

  // Apply scales and highlight active guide row
  if (meditationBoxStep === 0) {
    // Inhale: Ring expands from 0.65 to 1.15
    const progress = (4 - meditationBoxSecs) / 4;
    const scale = 0.65 + progress * 0.5;
    ring.style.transform = `scale(${scale})`;
    ring.style.borderColor = "var(--theme-primary)";
    guideText.textContent = "Inhale";
    select("step-inhale").className = "breathing-step-active";
  } else if (meditationBoxStep === 1) {
    // Hold Full: Ring remains at 1.15
    ring.style.transform = `scale(1.15)`;
    ring.style.borderColor = "#f59e0b"; // Golden warning color
    guideText.textContent = "Hold";
    select("step-hold1").className = "breathing-step-active";
  } else if (meditationBoxStep === 2) {
    // Exhale: Ring shrinks from 1.15 to 0.65
    const progress = (4 - meditationBoxSecs) / 4;
    const scale = 1.15 - progress * 0.5;
    ring.style.transform = `scale(${scale})`;
    ring.style.borderColor = "var(--theme-secondary)";
    guideText.textContent = "Exhale";
    select("step-exhale").className = "breathing-step-active";
  } else if (meditationBoxStep === 3) {
    // Hold Empty: Ring remains at 0.65
    ring.style.transform = `scale(0.65)`;
    ring.style.borderColor = "#9ca3af";
    guideText.textContent = "Hold";
    select("step-hold2").className = "breathing-step-active";
  }
}

function startMeditationTimer() {
  if (meditationIsActive) {
    // Pause
    clearInterval(meditationTimerId);
    meditationIsActive = false;
    select("meditation-start-btn").textContent = "Resume";
    select("meditation-reset-btn").style.display = "inline-flex";
    select("breathing-guide-text").textContent = "Paused";
  } else {
    // Start
    meditationIsActive = true;
    select("meditation-start-btn").textContent = "Pause Session";
    select("meditation-reset-btn").style.display = "inline-flex";
    
    // Play singing bowl arpeggio at start
    playChimeSound(true);

    // Initialize Box Breathing step indicators
    meditationBoxStep = 0;
    meditationBoxSecs = 4;

    meditationTimerId = setInterval(handleMeditationTimerTick, 1000);
  }
}

function resetMeditationTimer() {
  clearInterval(meditationTimerId);
  meditationIsActive = false;
  
  // Read selected preset
  const activePreset = document.querySelector(".preset-btn.active");
  const time = activePreset ? parseInt(activePreset.getAttribute("data-time"), 10) : 600;
  
  meditationSecondsLeft = time;
  setMeditationStopwatch(meditationSecondsLeft);

  select("meditation-start-btn").textContent = "Start Session";
  select("meditation-reset-btn").style.display = "none";
  select("breathing-guide-text").textContent = "Focus";
  select("breathing-ring").style.transform = "scale(0.65)";
  select("breathing-ring").style.borderColor = "var(--theme-primary)";

  // Reset highlighted guide lists
  select("step-inhale").className = "";
  select("step-hold1").className = "";
  select("step-exhale").className = "";
  select("step-hold2").className = "";
}

function completeMeditationSession() {
  clearInterval(meditationTimerId);
  meditationIsActive = false;

  // Play Crystal bell ending sound
  playChimeSound(false);
  triggerCelebrationConfetti(false);

  const activePreset = document.querySelector(".preset-btn.active");
  const totalPresetSecs = activePreset ? parseInt(activePreset.getAttribute("data-time"), 10) : 600;
  const loggedMinutes = Math.max(1, Math.round(totalPresetSecs / 60));

  // Log session
  const date = getSimulatedDate();
  state.meditationSessions.push({
    timestamp: date.getTime(),
    duration: loggedMinutes,
    note: "Box Breathing session completed successfully."
  });

  saveState();
  resetMeditationTimer();
  renderMeditationHistory();
  renderInsights();

  alert(`Session complete! You have successfully logged ${loggedMinutes} minutes of meditation. Zen state achieved. 🙏`);
}

function logManualMeditation() {
  const durationInput = select("meditation-manual-duration");
  const noteInput = select("meditation-manual-note");
  
  const duration = parseInt(durationInput.value, 10);
  const note = noteInput.value.trim();

  if (isNaN(duration) || duration < 1 || duration > 180) {
    alert("Please enter a valid duration between 1 and 180 minutes.");
    return;
  }

  const date = getSimulatedDate();
  state.meditationSessions.push({
    timestamp: date.getTime(),
    duration: duration,
    note: note || "Manual log session."
  });

  saveState();
  
  // Clear manual inputs
  noteInput.value = "";
  durationInput.value = 10;

  renderMeditationHistory();
  renderInsights();
  alert(`Successfully logged ${duration} minutes of meditation!`);
}

function renderMeditationHistory() {
  const container = select("meditation-history-list");
  container.innerHTML = "";

  // Sort logs by timestamp desc
  const sortedSessions = [...state.meditationSessions].sort((a, b) => b.timestamp - a.timestamp);

  sortedSessions.forEach(s => {
    const dateObj = new Date(s.timestamp);
    const dateDisplay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const card = document.createElement("div");
    card.classList.add("meditation-log-card");
    card.innerHTML = `
      <div>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">${dateDisplay}</span>
        <div class="meditation-log-note">"${escapeHTML(s.note)}"</div>
      </div>
      <span class="meditation-log-dur">${s.duration}m</span>
    `;
    container.appendChild(card);
  });

  if (sortedSessions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.85rem;">
        No meditation sessions logged yet.
      </div>
    `;
  }
}

// NAVIGATION
function navigateToView(viewId) {
  document.querySelectorAll(".app-view").forEach(view => {
    view.classList.remove("active");
  });
  
  select(viewId).classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-target") === viewId) {
      btn.classList.add("active");
    }
  });

  if (viewId === "journal-view") {
    setupJournalWorkspace();
  } else if (viewId === "history-view") {
    renderHistoryList();
  } else if (viewId === "insights-view") {
    renderInsights();
  } else if (viewId === "journey-view") {
    renderJourneyGrid();
  } else if (viewId === "manifestation-view") {
    select("manifest-entry-date").value = getFormattedDateString(getSimulatedDate());
    renderManifestationList();
  } else if (viewId === "meditation-view") {
    renderMeditationHistory();
    // Choose dynamic daily Zen tip
    const date = getSimulatedDate();
    const tipIndex = (date.getDate() + date.getMonth()) % MEDITATION_TIPS.length;
    select("meditation-daily-tip").textContent = `"${MEDITATION_TIPS[tipIndex]}"`;
  }

  document.querySelector(".main-content").scrollTop = 0;
}

// DEVELOPER SIMULATION FUNCTIONS
function updateSimDetailsPanel() {
  const date = getSimulatedDate();
  
  select("sim-state-date").textContent = getFormattedDateString(date);
  
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  select("sim-state-weekday").textContent = weekdays[date.getDay()];
  select("sim-state-isweekend").textContent = isWeekend(date) ? "Yes (App Paused)" : "No";
  select("sim-state-daynum").textContent = state.currentDayNum;
  select("sim-state-lastentry").textContent = state.lastCompletedDate || "None";
  
  const localVal = date.toISOString().split('T')[0];
  select("sim-date-picker").value = localVal;
}

function handleDateChange(newDateVal) {
  const selected = new Date(newDateVal);
  const realNow = new Date();
  
  const timeDiff = selected.getTime() - realNow.getTime();
  simDateOffset = Math.round(timeDiff / (1000 * 3600 * 24));
  
  saveState();
  validateStreakAndDayTransition();
  
  updateTopBarStats();
  renderJourneyGrid();
  updateSimDetailsPanel();
}

function autoFillCurrentJournal() {
  if (state.currentDayNum > 9999) {
    alert("Practice limits exceeded!");
    return;
  }

  const sampleCategories = ["Health", "Career", "Family", "Job", "Money", "Love", "Health", "Love", "Family", "Career"];
  const sampleTexts = [
    "My daily physical energy and strength to get things done.",
    "Successfully learning a new technical concept today.",
    "A warm conversation with a close family member.",
    "A supportive team meeting that saved us time.",
    "Having enough financial savings for emergency peace of mind.",
    "A kind message from someone I care about.",
    "Enjoying a fresh, healthy salad for lunch.",
    "An act of self-care and meditation in the morning.",
    "Looking at old family photos and laughing together.",
    "Getting valuable feedback on my career roadmap."
  ];

  navigateToView("journal-view");

  const inputs = document.querySelectorAll(".gratitude-input");
  const selects = document.querySelectorAll(".category-select");
  inputs.forEach((input, index) => {
    input.value = sampleTexts[index];
    selects[index].value = sampleCategories[index];
    selects[index].className = `category-select select-${sampleCategories[index].toLowerCase()}`;
    const row = input.closest(".input-row");
    row.classList.add("filled");
  });

  updateJournalProgress();
}

function unlockAll21Days() {
  // Let developer unlock 21 days
  state.currentDayNum = 22;
  state.currentStreak = 21;
  state.longestStreak = Math.max(state.longestStreak, 21);
  state.currentJourneyPage = Math.ceil(state.currentDayNum / 21);
  
  if (!state.dob) {
    state.dob = "1995-05-15";
  }
  
  const date = getSimulatedDate();
  const sampleCats = ["Health", "Career", "Family", "Job", "Money", "Love"];
  
  for (let i = 1; i <= 21; i++) {
    const pastDate = new Date(date);
    pastDate.setDate(pastDate.getDate() - (22 - i));
    const dateStr = getFormattedDateString(pastDate);
    
    const dayIndex = (i - 1) % 21;
    const dayMeta = JOURNAL_DAYS[dayIndex];
    
    const t = getDailyTarotCard(state.dob, dateStr);

    state.entries[dateStr] = {
      dayNum: i,
      title: dayMeta.title,
      quote: dayMeta.quote,
      author: dayMeta.author,
      prompt: dayMeta.prompt,
      items: Array.from({length: 10}, (_, k) => {
        const cat = sampleCats[(i + k) % 6];
        return {
          text: `Sample gratitude item ${k + 1} for ${cat} on Day ${i}.`,
          category: cat
        };
      }),
      tarot: {
        num: t.num,
        name: t.name,
        icon: t.icon,
        keywords: t.keywords,
        desc: t.desc
      },
      timestamp: pastDate.getTime()
    };
  }

  state.lastCompletedDate = getFormattedDateString(date);
  saveState();
  
  updateTopBarStats();
  renderJourneyGrid();
  updateSimDetailsPanel();
  checkDOBRequirement();
  alert("Unlocked Days 1-21! History populated with mockup entries for review.");
}

function resetAllAppData() {
  if (confirm("WARNING: This will permanently wipe all history, DOB info, meditations, and journal progress. Are you sure you want to proceed?")) {
    localStorage.removeItem("aura_gratitude_journal_state");
    localStorage.removeItem("aura_gratitude_journal_dev");
    
    state = {
      currentDayNum: 1,
      currentStreak: 0,
      longestStreak: 0,
      entries: {},
      lastCompletedDate: null,
      name: null,
      dob: null,
      email: null,
      currentJourneyPage: 1,
      manifestations: {},
      meditationSessions: [],
      settings: {
        remindersEnabled: true,
        chimeEnabled: true
      }
    };
    
    devMode = false;
    simDateOffset = 0;
    
    saveState();
    resetMeditationTimer();
    
    updateTopBarStats();
    renderJourneyGrid();
    updateSimDetailsPanel();
    
    select("sim-fast-reminders").checked = false;
    setupReminderScheduler(false);
    
    navigateToView("journey-view");
    checkDOBRequirement();
    alert("App data wiped successfully.");
  }
}

// BIND ACTIONS & EVENT LISTENERS
function setupEventListeners() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      navigateToView(target);
    });
  });

  document.querySelectorAll(".back-to-journey-btn").forEach(btn => {
    btn.addEventListener("click", () => navigateToView("journey-view"));
  });

  select("start-journal-btn").addEventListener("click", () => navigateToView("journal-view"));
  select("save-journal-btn").addEventListener("click", saveActiveJournalEntry);

  // Settings Modal controls
  select("open-settings-btn").addEventListener("click", () => {
    select("settings-notification-toggle").checked = state.settings.remindersEnabled;
    select("settings-chime-toggle").checked = state.settings.chimeEnabled;
    select("settings-name-input").value = state.name || "";
    select("settings-dob-input").value = state.dob || "";
    select("settings-email-input").value = state.email || "";
    select("settings-modal").classList.add("active");
  });

  select("close-settings-modal").addEventListener("click", () => {
    select("settings-modal").classList.remove("active");
  });

  select("settings-notification-toggle").addEventListener("change", (e) => {
    state.settings.remindersEnabled = e.target.checked;
    if (state.settings.remindersEnabled) {
      requestNotificationPermission();
    }
    saveState();
  });

  select("settings-chime-toggle").addEventListener("change", (e) => {
    state.settings.chimeEnabled = e.target.checked;
    saveState();
  });

  select("settings-name-input").addEventListener("change", (e) => {
    state.name = e.target.value.trim();
    saveState();
  });

  select("settings-dob-input").addEventListener("change", (e) => {
    state.dob = e.target.value;
    saveState();
  });

  select("settings-email-input").addEventListener("change", (e) => {
    state.email = e.target.value.trim();
    saveState();
  });

  // DOB Modal controls (Save name, dob, and email)
  select("save-dob-btn").addEventListener("click", () => {
    const nameVal = select("user-name-input").value.trim();
    const dobVal = select("user-dob-input").value;
    const emailVal = select("user-email-input").value.trim();
    
    if (!nameVal || !dobVal || !emailVal) {
      alert("Please enter your Name, Date of Birth, and Email to proceed.");
      return;
    }
    if (!emailVal.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    
    state.name = nameVal;
    state.dob = dobVal;
    state.email = emailVal;
    saveState();
    checkDOBRequirement();
    
    updateTopBarStats();
    renderJourneyGrid();
  });

  // Tarot Modal flip mechanics
  select("tarot-card-inner").addEventListener("click", () => {
    const cardInner = select("tarot-card-inner");
    if (!cardInner.classList.contains("flipped")) {
      cardInner.classList.add("flipped");
      
      const dateStr = state.lastCompletedDate || getFormattedDateString(getSimulatedDate());
      const birthCard = getDailyTarotCard(state.dob, dateStr);
      select("tarot-card-description").textContent = birthCard.desc;
      
      playChimeSound(false);
      
      setTimeout(() => {
        select("close-tarot-modal").style.display = "inline-flex";
      }, 600);
    }
  });

  select("close-tarot-modal").addEventListener("click", () => {
    select("tarot-modal").classList.remove("active");
    navigateToView("journey-view");
  });

  // Milestone Celebration modal closure
  select("close-milestone-btn").addEventListener("click", () => {
    select("milestone-modal").classList.remove("active");
    // Directly launch Tarot Card Reveal modal after milestone popup
    select("tarot-modal").classList.add("active");
  });

  // Pagination grid handlers
  select("journey-prev-page-btn").addEventListener("click", () => {
    if (state.currentJourneyPage > 1) {
      state.currentJourneyPage--;
      renderJourneyGrid();
    }
  });

  select("journey-next-page-btn").addEventListener("click", () => {
    const maxAllowedPage = Math.ceil(state.currentDayNum / 21);
    if (state.currentJourneyPage < maxAllowedPage) {
      state.currentJourneyPage++;
      renderJourneyGrid();
    }
  });

  // Manifestation handlers
  select("save-manifestation-btn").addEventListener("click", saveDailyManifestation);
  select("manifestation-search").addEventListener("input", renderManifestationList);

  // Meditation timer handlers
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (meditationIsActive) return; // Ignore presets while active
      
      document.querySelectorAll(".preset-btn").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      
      const time = parseInt(btn.getAttribute("data-time"), 10);
      meditationSecondsLeft = time;
      setMeditationStopwatch(meditationSecondsLeft);
    });
  });

  select("meditation-start-btn").addEventListener("click", startMeditationTimer);
  select("meditation-reset-btn").addEventListener("click", resetMeditationTimer);
  select("save-meditation-manual-btn").addEventListener("click", logManualMeditation);

  select("history-search").addEventListener("input", renderHistoryList);
  select("history-filter-category").addEventListener("change", renderHistoryList);

  select("open-dev-btn").addEventListener("click", () => {
    select("dev-drawer").classList.add("active");
  });
  
  select("close-dev-btn").addEventListener("click", () => {
    select("dev-drawer").classList.remove("active");
  });

  select("sim-date-picker").addEventListener("change", (e) => {
    devMode = true;
    handleDateChange(e.target.value);
  });

  select("sim-set-today").addEventListener("click", () => {
    devMode = false;
    simDateOffset = 0;
    saveState();
    validateStreakAndDayTransition();
    updateTopBarStats();
    renderJourneyGrid();
    updateSimDetailsPanel();
  });

  select("sim-add-day").addEventListener("click", () => {
    devMode = true;
    simDateOffset += 1;
    saveState();
    validateStreakAndDayTransition();
    updateTopBarStats();
    renderJourneyGrid();
    updateSimDetailsPanel();
  });

  select("sim-sub-day").addEventListener("click", () => {
    devMode = true;
    simDateOffset -= 1;
    saveState();
    validateStreakAndDayTransition();
    updateTopBarStats();
    renderJourneyGrid();
    updateSimDetailsPanel();
  });

  select("sim-jump-weekend").addEventListener("click", () => {
    devMode = true;
    const now = getSimulatedDate();
    const day = now.getDay();
    const diff = 6 - day;
    simDateOffset += diff === 0 ? 7 : diff;
    saveState();
    validateStreakAndDayTransition();
    updateTopBarStats();
    renderJourneyGrid();
    updateSimDetailsPanel();
  });

  select("sim-fast-reminders").addEventListener("change", (e) => {
    setupReminderScheduler(e.target.checked);
  });

  select("sim-trigger-ping").addEventListener("click", () => {
    triggerHourlyReminder();
  });

  select("sim-fill-current").addEventListener("click", autoFillCurrentJournal);
  select("sim-unlock-all").addEventListener("click", unlockAll21Days);
  select("sim-reset-data").addEventListener("click", resetAllAppData);

  select("acknowledge-reset-btn").addEventListener("click", () => {
    select("reset-modal").classList.remove("active");
  });

  select("close-reminder-btn").addEventListener("click", () => {
    select("reminder-banner").classList.add("hidden");
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (modal.id === "dob-modal" || modal.id === "tarot-modal" || modal.id === "milestone-modal") return;
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });
}

// INITIALIZATION
window.addEventListener("DOMContentLoaded", () => {
  loadState();
  initConfetti();
  setupEventListeners();
  
  if (state.settings.remindersEnabled) {
    requestNotificationPermission();
  }

  validateStreakAndDayTransition();

  updateTopBarStats();
  renderJourneyGrid();
  updateSimDetailsPanel();
  
  setupReminderScheduler(false);
  checkDOBRequirement();
});
