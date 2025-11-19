import {
  ChapterImage1,
  ChapterImage10,
  ChapterImage2,
  ChapterImage3,
  ChapterImage4,
  ChapterImage5,
  ChapterImage6,
  ChapterImage7,
  ChapterImage8,
  ChapterImage9,
} from "@/assets/Questionnaire/ChapterNavigation";
import { QuestionnaireDataArray } from "@/types/questionnaire";

export const QUESTIONNAIRE_DATA: QuestionnaireDataArray = [
  // mystery-voyage
  {
    slug: "mystery-voyage",
    chapters: [
      {
        id: 1,
        title: "Who's Jumping In?",
        image: ChapterImage1,
        questions: [
          {
            id: "1_1",
            type: "radio",
            ques: "How many humans are joining?",
            options: [
              { value: "solo", label: "Solo" },
              { value: "duo", label: "Duo joining as a unit" },
            ],
          },
          {
            id: "1_2",
            type: "radio",
            ques: "Age group:",
            options: [
              { value: "18-24", label: "18–24" },
              { value: "25-32", label: "25–32" },
              { value: "33-40", label: "33–40" },
              { value: "40+", label: "40+" },
            ],
          },
          {
            id: "1_3",
            type: "radio",
            ques: "When was your last trip & how did it feel?",
            options: [
              { value: "loved", label: "Loved it" },
              { value: "okay", label: "Cute okay" },
              { value: "meh", label: "Meh" },
              { value: "trauma", label: "Trauma but we move" },
            ],
          },
          {
            id: "1_4",
            type: "text",
            ques: "First name? (So we don't say 'Hey person 3')",
          },
        ],
      },

      {
        id: 2,
        title: "Social Vibe Check",
        image: ChapterImage2,
        questions: [
          {
            id: "2_1",
            type: "radio",
            ques: "How comfortable are you traveling with strangers?",
            options: [
              { value: "built", label: "I'm built for this" },
              { value: "neutral", label: "Neutral observation mode" },
              { value: "introvert", label: "Introvert but willing to try" },
              {
                value: "nervous",
                label: "Nervous but romanticizing growth era",
              },
            ],
          },
          {
            id: "2_2",
            type: "radio",
            ques: "Ideal group size:",
            options: [
              { value: "2-4", label: "2–4 (gentle slow bonding)" },
              { value: "5-7", label: "5–7 (balanced social flow)" },
              { value: "8+", label: "8+ (chaotic good energy)" },
            ],
          },
          {
            id: "2_3",
            type: "radio",
            ques: "Preferred interaction energy:",
            options: [
              { value: "deep", label: "Deep heart conversations" },
              { value: "banter", label: "Light playful banter" },
              {
                value: "balanced",
                label: "Balanced depending on vibe + caffeine level",
              },
            ],
          },
        ],
      },

      {
        id: 3,
        title: "Boundaries + Safety *",
        image: ChapterImage3,
        questions: [
          {
            id: "3_1",
            type: "text",
            ques: "Any gender preference for grouping?",
          },
          {
            id: "3_2",
            type: "text",
            ques: "Any red flags or strict hard boundaries?",
          },
          {
            id: "3_3",
            type: "text",
            ques: "Any allergies / medical notes?",
          },
          {
            id: "3_4",
            type: "radio",
            ques: "Food preference:",
            options: [
              { value: "veg", label: "Veg" },
              { value: "non-veg", label: "Non Veg" },
              { value: "vegan", label: "Vegan" },
              { value: "jain", label: "Jain" },
              { value: "allergies", label: "Allergies" },
            ],
          },
        ],
      },

      {
        id: 4,
        title: "What You Want From This Shared Trip",
        image: ChapterImage4,
        questions: [
          {
            id: "4_1",
            type: "radio",
            ques: "What’s your intention?",
            options: [
              { value: "new-people", label: "New people new memories" },
              { value: "break-pattern", label: "Break pattern" },
              { value: "heal", label: "Heal & reset" },
              { value: "content", label: "Content / story creation" },
              { value: "home", label: "Finding people who FEEL like home" },
            ],
          },
          {
            id: "4_2",
            type: "radio",
            ques: "Emotional tone you want:",
            options: [
              { value: "calm", label: "Calm soulful comfort" },
              { value: "fun", label: "Fun social energy" },
              { value: "luxury", label: "Soft luxury weekend" },
              { value: "mixed", label: "Mixed unknown surprise vibe" },
            ],
          },
        ],
      },

      {
        id: 5,
        title: "Exploration Style",
        image: ChapterImage5,
        questions: [
          {
            id: "5_1",
            type: "checkbox",
            ques: "Pick ONLY 2",
            options: [
              { value: "nature", label: "Nature + slow scenic peace" },
              { value: "coffee", label: "Cute slow coffee & hidden corners" },
              { value: "culture", label: "Culture + heritage + story layers" },
              { value: "food", label: "Food hunts + street discovery" },
              { value: "adventure", label: "Light adventure activities" },
              {
                value: "premium",
                label: "Premium comfort + unwind + feel rich",
              },
              {
                value: "content",
                label: "Content / creator aesthetic journey",
              },
            ],
          },
        ],
      },

      {
        id: 6,
        title: "Travel Setup",
        image: ChapterImage6,
        questions: [
          {
            id: "6_1",
            type: "text",
            ques: "Starting city/state:",
          },
          {
            id: "6_2",
            type: "radio",
            ques: "Preferred travel mode:",
            options: [
              { value: "flight", label: "Flight" },
              { value: "train", label: "Train" },
              { value: "road", label: "Road" },
              { value: "any", label: "Whatever fits story" },
            ],
          },
          {
            id: "6_3",
            type: "radio",
            ques: "Weather preference:",
            options: [
              { value: "warm", label: "Warm" },
              { value: "cool", label: "Cool" },
              { value: "surprise", label: "Surprise me" },
            ],
          },
          {
            id: "6_4",
            type: "radio",
            ques: "How long can you travel?",
            options: [
              { value: "weekend", label: "Weekend (2–3 days)" },
              { value: "short-escape", label: "Short escape (4–5 days)" },
              { value: "full", label: "Full (6–8 days)" },
              { value: "flexible", label: "Flexible" },
            ],
          },
        ],
      },

      {
        id: 7,
        title: "Budget",
        image: ChapterImage7,
        questions: [
          {
            id: "7_1",
            type: "text",
            ques: "What is your comfortable budget for this trip?",
          },
        ],
      },

      {
        id: 8,
        title: "International Ready?",
        image: ChapterImage8,

        questions: [
          {
            id: "8_1",
            type: "radio",
            ques: "Passport valid?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "applying", label: "applying soon finally" },
              { value: "story", label: "Whatever fits story" },
            ],
          },
          {
            id: "8_2",
            type: "checkbox",
            ques: "Visa status:",
            options: [
              { value: "schengen", label: "Schengen" },
              { value: "us", label: "US" },
              { value: "uk", label: "UK" },
              {
                value: "asia-me",
                label: "Singapore-Malaysia-Thailand-ME",
              },
              { value: "none", label: "None but dreaming" },
            ],
          },
          {
            id: "8_3",
            type: "radio",
            ques: "Would you want BFT to guide visa if needed?",
            options: [
              { value: "yes", label: "Yes please" },
              { value: "no", label: "No thanks" },
            ],
          },
        ],
      },

      {
        id: 9,
        title: "Personality Filters",
        image: ChapterImage9,

        questions: [
          {
            id: "9_1",
            type: "text",
            ques: "Any destinations you don’t vibe with?",
          },
          {
            id: "9_2",
            type: "text",
            ques: "Any personality type you DON’T vibe with?",
          },
          {
            id: "9_3",
            type: "text",
            ques: "Any personality type you LOVE vibing with?",
          },
        ],
      },

      {
        id: 10,
        title: "Contact & Consent",
        image: ChapterImage10,
        questions: [
          {
            id: "10_1",
            type: "text",
            ques: "WhatsApp number:",
          },
          {
            id: "10_2",
            type: "radio",
            ques: "Want pre-invites for future stranger trip batches?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            id: "10_3",
            type: "text",
            ques: "Where did you hear about BFT?",
          },
          {
            id: "10_4",
            type: "radio",
            ques: "Privacy policy acceptance",
            options: [{ value: "accept", label: "Click to accept policy" }],
          },
        ],
      },
    ],
  },

  //   The Tailored Escape
  {
    slug: "Tailored-escape",
    chapters: [
      {
        id: 1,
        title: "Basic Trip Info",
        image: ChapterImage1,
        questions: [
          {
            id: "1_1",
            type: "radio",
            ques: "What is the main purpose of this work trip?",
            options: [
              { value: "meeting", label: "Meeting" },
              { value: "shoot", label: "Shoot" },
              { value: "event", label: "Event" },
              { value: "assignment", label: "Assignment" },
              { value: "conference", label: "Conference" },
              { value: "business_visit", label: "Business visit" },
            ],
          },
          {
            id: "1_2",
            type: "text",
            ques: "Which city/state are you traveling to for work?",
          },
          {
            id: "1_3",
            type: "radio",
            ques: "How many people are travelling?",
            options: [
              { value: "solo", label: "Solo" },
              { value: "duo", label: "Duo" },
              { value: "group", label: "Group" },
            ],
          },
          {
            id: "1_4",
            type: "text",
            ques: "How many days does your work schedule require there?",
          },
        ],
      },

      {
        id: 2,
        title: "Work Requirements & Timings",
        image: ChapterImage2,
        questions: [
          {
            id: "2_1",
            type: "radio",
            ques: "What are your work timings during this trip?",
            options: [
              { value: "morning", label: "Morning shift" },
              { value: "afternoon", label: "Afternoon shift" },
              { value: "evening", label: "Evening shift" },
              { value: "night", label: "Night shift" },
              { value: "flexible", label: "Flexible / Changes daily" },
            ],
          },
          {
            id: "2_2",
            type: "radio",
            ques: "OR choose specific:",
            options: [
              { value: "9_5", label: "9am–5pm" },
              { value: "10_6", label: "10am–6pm" },
              { value: "12_8", label: "12pm–8pm" },
              { value: "night", label: "Night shift" },
              { value: "8_4", label: "8pm–4am" },
            ],
          },
          {
            id: "2_3",
            type: "text",
            ques: "OR choose specific:",
          },
          {
            id: "2_4",
            type: "radio",
            ques: "Do you need strong high-speed WiFi for work?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "some_hours", label: "Only Some hours" },
            ],
          },
          {
            id: "2_5",
            type: "radio",
            ques: "Do you need a workspace setup?",
            options: [
              { value: "room_desk", label: "Room desk" },
              { value: "balcony", label: "Balcony view" },
              { value: "cafe_friendly", label: "Cafe friendly stay" },
              { value: "coworking", label: "Co-working nearby" },
              { value: "none", label: "No specific need" },
            ],
          },
          {
            id: "2_6",
            type: "radio",
            ques: "Would you like coworking recommendations near your stay?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "maybe", label: "Maybe" },
            ],
          },
        ],
      },

      {
        id: 3,
        title: "How You Want to Explore",
        image: ChapterImage3,
        questions: [
          {
            id: "3_1",
            type: "radio",
            ques: "How would you prefer exploring this place?",
            options: [
              { value: "same_days", label: "Only in the same work days" },
              {
                value: "extend",
                label: "Extend the trip with extra days after work",
              },
              { value: "open", label: "Open to both based on suggestions" },
            ],
          },
          {
            id: "3_2",
            type: "radio",
            ques: "If extending — how many extra days would you like?",
            options: [
              { value: "0", label: "0 days" },
              { value: "2", label: "2 days" },
              { value: "3_4", label: "3–4 days" },
              { value: "5_7", label: "5–7 days" },
              { value: "flexible", label: "Flexible" },
            ],
          },
        ],
      },

      {
        id: 4,
        title: "Exploration Preference Style",
        image: ChapterImage4,
        questions: [
          {
            id: "4_1",
            type: "checkbox",
            ques: "(Pick up to 2)",
            options: [
              { value: "nature", label: "Calm nature escape" },
              { value: "cafes", label: "Slow scenic cafes + city corners" },
              { value: "food", label: "Food culture & local eats" },
              { value: "adventure", label: "Light adventure experiences" },
              { value: "towns", label: "Small beautiful towns nearby" },
              { value: "luxury", label: "Luxury comfort slow time" },
              { value: "content", label: "Content / photo exploration" },
            ],
          },
        ],
      },

      {
        id: 5,
        title: "Comfort + Boundaries",
        image: ChapterImage5,
        questions: [
          {
            id: "5_1",
            type: "radio",
            ques: "Preferred stay comfort:",
            options: [
              { value: "budget", label: "Budget" },
              { value: "mid", label: "Mid" },
              { value: "premium", label: "Premium" },
              { value: "luxury", label: "Luxury" },
            ],
          },
          {
            id: "5_2",
            type: "radio",
            ques: "Food preference:",
            options: [
              { value: "veg", label: "Veg" },
              { value: "non_veg", label: "Non Veg" },
              { value: "vegan", label: "Vegan" },
              { value: "jain", label: "Jain" },
              { value: "allergies", label: "Allergies" },
            ],
          },
          {
            id: "5_3",
            ques: "text",
            label: "Any strict NO activities?",
          },
        ],
      },

      {
        id: 6,
        title: "Travel Setup",
        image: ChapterImage6,
        questions: [
          {
            id: "6_1",
            ques: "text",
            label: "Starting city/state:",
          },
          {
            id: "6_2",
            type: "radio",
            ques: "Preferred travel mode:",
            options: [
              { value: "flight", label: "Flight" },
              { value: "train", label: "Train" },
              { value: "road", label: "Road" },
              { value: "any", label: "Whatever fits story" },
            ],
          },
          {
            id: "6_3",
            ques: "text",
            label: "Work trip dates:",
          },
          {
            id: "6_4",
            type: "radio",
            ques: "Do you need to return to the same home city after this trip ends?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            id: "6_5",
            type: "radio",
            ques: "Passport status:",
            options: [
              { value: "indian", label: "Indian" },
              { value: "other", label: "Other" },
            ],
          },
          {
            id: "6_6",
            type: "radio",
            ques: "Is your passport valid for next 6+ months?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            id: "6_7",
            type: "checkbox",
            ques: "Visa status (tick multiple):",
            options: [
              { value: "schengen", label: "Schengen" },
              { value: "us", label: "US" },
              { value: "uk", label: "UK" },
              {
                value: "sea_me",
                label: "Singapore/Malaysia/Thailand/Middle East",
              },
              { value: "other", label: "Other (write)" },
              { value: "none", label: "No active visa" },
            ],
          },
          {
            id: "6_8",
            type: "radio",
            ques: "Could this trip possibly be international?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "maybe", label: "Maybe" },
            ],
          },
          {
            id: "6_9",
            type: "radio",
            ques: "Would you want BlindFold Trips visa guidance if required?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            id: "6_10",
            type: "text",
            ques: "What is your comfortable budget for this trip?",
          },
        ],
      },

      {
        id: 7,
        title: "Additional Inputs",
        image: ChapterImage7,
        questions: [
          {
            id: "7_1",
            type: "text",
            ques: "Any specific theme or personal interest to include?",
          },
          {
            id: "7_2",
            type: "text",
            ques: "Any must-visit place already in mind?",
          },
        ],
      },

      {
        id: 8,
        title: "Contact + Final Confirmation",
        image: ChapterImage8,
        questions: [
          {
            id: "8_1",
            type: "text",
            ques: "Best WhatsApp number:",
          },
          {
            id: "8_2",
            type: "radio",
            ques: "Would you like future “purpose travel opportunity alerts”?",
            options: [
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ],
          },
          {
            id: "8_3",
            type: "text",
            ques: "Where did you hear about BlindFold Trips?",
          },
          {
            id: "8_4",
            type: "radio",
            ques: "Privacy policy acceptance",
            options: [{ value: "accept", label: "Click to accept policy" }],
          },
        ],
      },
    ],
  },

  // Purpose Retreat
  {
    slug: "purpose-retreat",
    chapters: [
      {
        id: 1,
        name: "The Basics",
        image: ChapterImage1,
        questions: [
          {
            id: "1_1",
            ques: "How many adventurers are in your squad?",
            type: "radio",
            options: [
              { value: "solo", label: "Solo" },
              { value: "duo", label: "Duo" },
              { value: "gang", label: "Gang" },
              { value: "family_pack", label: "Family pack" },
            ],
          },
          {
            id: "1_2",
            ques: "First name, please",
            type: "text",
          },
          {
            id: "1_3",
            ques: "When was your last trip, and how did it go?",
            type: "radio",
            options: [
              { value: "loved_it", label: "Loved it" },
              { value: "meh", label: "Meh" },
              { value: "never_again", label: "Never again" },
            ],
          },
        ],
      },

      {
        id: 2,
        name: "Your Comfort Zone (or Not)",
        image: ChapterImage2,
        questions: [
          {
            id: "2_1",
            ques: "Any fears, phobias, or medical things we should know?",
            type: "text",
          },
          {
            id: "2_2",
            ques: "Any absolute “NOPE” activities?",
            type: "text",
          },
          {
            id: "2_3",
            ques: "Food preferences or dietary restrictions?",
            type: "text",
          },
        ],
      },

      {
        id: 3,
        name: "Pick Your Travel Vibe",
        image: ChapterImage3,
        questions: [
          {
            id: "3_1",
            ques: "Choose up to 3 vibes that feel most you:",
            type: "radio",
            options: [
              { value: "outdoor_adventures", label: "Outdoor adventures" },
              { value: "nature_escapes", label: "Nature escapes" },
              { value: "cute_little_towns", label: "Cute little towns" },
              { value: "famous_landmarks", label: "Famous landmarks" },
              { value: "history_culture", label: "History & culture" },
              { value: "art_museums", label: "Art & museums" },
              {
                value: "street_food_local_eats",
                label: "Street food & local eats",
              },
            ],
          },
        ],
      },

      {
        id: 4,
        name: "What You’re Really After",
        image: ChapterImage4,
        questions: [
          {
            id: "4_1",
            ques: "The #1 thing you’re hoping from this trip?",
            type: "radio",
            options: [
              { value: "peace", label: "Peace" },
              { value: "thrill", label: "Thrill" },
              { value: "memories", label: "Memories" },
              { value: "insta_posts", label: "Insta posts" },
              { value: "finding_yourself", label: "Finding yourself" },
            ],
          },
          {
            id: "4_2",
            ques: "Active or chill?",
            type: "text",
          },
          {
            id: "4_3",
            ques: "Hot or cool weather?",
            type: "text",
          },
          {
            id: "4_4",
            ques: "What kind of vibe are you manifesting?",
            type: "radio",
            options: [
              { value: "romantic", label: "Romantic" },
              { value: "adventure", label: "Adventure" },
              { value: "relaxed", label: "Relaxed" },
              { value: "party", label: "Party" },
              { value: "mix_of_everything", label: "Mix of everything" },
            ],
          },
          {
            id: "4_5",
            ques: "Dream destination or state on your wish list?",
            type: "text",
          },
          {
            id: "4_6",
            ques: "Any 'hard no' destinations for safety/comfort reasons?",
            type: "text",
          },
          {
            id: "4_7",
            ques: "Places you’ve already visited and don’t want to repeat?",
            type: "text",
          },
        ],
      },

      {
        id: 5,
        name: "The Travel Basics",
        image: ChapterImage5,
        questions: [
          {
            id: "5_1",
            ques: "Which state will you be starting from?",
            type: "text",
          },
          {
            id: "5_2",
            ques: "What passport do you hold?",
            type: "text",
          },
          {
            id: "5_3",
            ques: "Do you already have visas? If yes, which ones?",
            type: "text",
          },
          {
            id: "5_4",
            ques: "Pick your ride:",
            type: "checkbox",
            options: [
              { value: "flight", label: "Flight" },
              { value: "train", label: "Train" },
              { value: "road_trip", label: "Road Trip" },
              { value: "surprise_me", label: "Surprise me" },
            ],
          },
          {
            id: "5_5",
            ques: "Airports / train stations / bus depots you can depart from?",
            type: "text",
          },
          {
            id: "5_6",
            ques: "Do you need to return to the same spot?",
            type: "text",
          },
          {
            id: "5_7",
            ques: "How many days are you planning to travel?",
            type: "text",
          },
          {
            id: "5_8",
            ques: "Travel dates: What works best?",
            type: "text",
          },
          {
            id: "5_9",
            ques: "Where would you like to stay?",
            type: "checkbox",
            options: [
              { value: "cozy_apartment", label: "Cozy apartment" },
              { value: "hotel", label: "Hotel" },
              { value: "something_quirky", label: "Something quirky" },
            ],
          },
          {
            id: "5_10",
            ques: "Any special stay requests?",
            type: "text",
          },
        ],
      },

      {
        id: 6,
        sections: [
          {
            name: "Final Touches",
           image: ChapterImage6,
            questions: [
              {
                id: "6_1",
                ques: "What’s the best number to reach you?",
                type: "text",
              },
              {
                id: "6_2",
                ques: "Want us to drop some surprise travel inspo in your inbox?",
                type: "radio",
                options: [
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ],
              },
              {
                id: "6_3",
                ques: "How did you first hear about BlindFold Trips?",
                type: "radio",
                options: [
                  { value: "friend", label: "Friend" },
                  { value: "instagram", label: "Instagram" },
                  { value: "destiny", label: "Destiny" },
                ],
              },
              {
                id: "6_4",
                ques: "Can we get your OK on our Privacy Policy?",
                type: "text",
              },
            ],
          },

          {
            name: "Surprise Comfort Scale (Very Important)",
            questions: [
              {
                id: "6_5",
                ques: "On a scale of 1–10, how comfortable are you with surprises?",
                type: "text",
              },
              {
                id: "6_6",
                ques: "Which parts are you okay keeping blindfolded until the end?",
                type: "radio",
                options: [
                  { value: "destination", label: "Destination" },
                  { value: "activities", label: "Activities" },
                  { value: "accommodation_type", label: "Accommodation type" },
                  { value: "cuisine_experience", label: "Cuisine experience" },
                  { value: "transportation", label: "Transportation" },
                  {
                    value: "everything",
                    label: "EVERYTHING (blindfold me fully)",
                  },
                ],
              },
              {
                id: "6_7",
                ques: "Any non-negotiable or hard boundaries?",
                type: "text",
              },
            ],
          },

          {
            name: "Budget",
            questions: [
              {
                id: "6_8",
                ques: "What is your comfortable budget for this trip?",
                type: "text",
              },
            ],
          },
        ],
      },
    ],
  },

  // Crafted Jounrey
  {
    slug: "crafted-journey",
    chapters: [
      // chapter - 1 "The Basics"
      {
        id: 1,
        name: "The Basics",
        image: ChapterImage1,
        questions: [
          {
            id: "1_1",
            ques: "How many travellers will be joining?",
            type: "radio",
            options: [
              { value: "solo", label: "Solo" },
              { value: "duo", label: "Duo" },
              { value: "friends_group", label: "Friends group" },
              { value: "family_pack", label: "Family pack" },
            ],
          },
          {
            id: "1_2",
            ques: "When was your last trip & how did that experience feel?",
            type: "radio",
            options: [
              { value: "loved_it", label: "Loved it" },
              { value: "mid", label: "Mid" },
              { value: "stressful", label: "Stressful" },
              { value: "didnt_enjoy", label: "Didn't enjoy" },
            ],
          },
          {
            id: "1_3",
            ques: "Tell us your name — it feels nicer than calling you “you”",
            type: "text",
          },
        ],
      },

      // chapter - 2 "Your Comfort Zone"
      {
        id: 2,
        name: "Your Comfort Zone",
        image: ChapterImage2,
        questions: [
          {
            id: "2_1",
            ques: "Any fears, phobias, medical needs or movement limitations we should keep in mind?",
            type: "text",
          },
          {
            id: "2_2",
            ques: "Any strict NO activities?",
            type: "radio",
            options: [
              { value: "deep_water", label: "Deep Water" },
              { value: "extreme_heights", label: "Extreme heights" },
              { value: "long_treks", label: "Long treks" },
              { value: "scary_places", label: "Scary places" },
              { value: "others", label: "Others" },
            ],
          },
          {
            id: "2_3",
            ques: "Food preferences + restrictions",
            type: "radio",
            options: [
              { value: "veg", label: "Veg" },
              { value: "non_veg", label: "Non Veg" },
              { value: "vegan", label: "Vegan" },
              { value: "jain", label: "Jain" },
              { value: "allergies", label: "Allergies" },
              { value: "religious_code", label: "Religious code" },
            ],
          },
        ],
      },

      // chapter - 3 "Pick Your Personal Travel Vibe"
      {
        id: 3,
        name: "Pick Your Personal Travel Vibe",
        image: ChapterImage3,
        questions: [
          {
            id: "3_1",
            ques: "Choose up to 3 that describes YOUR trip mood:",
            type: "radio",
            options: [
              {
                value: "slow_nature_calm_days",
                label: "Slow nature + calm days",
              },
              {
                value: "adventure_outdoors_exciting",
                label: "Adventure outdoors + excitement",
              },
              {
                value: "cute_towns_scenic_corners",
                label: "Cute aesthetic towns + scenic corners",
              },
              {
                value: "cultural_historical",
                label: "Cultural + historical exploring",
              },
              {
                value: "food_discovery",
                label: "Food discovery & street food trails",
              },
              {
                value: "art_museums_local_craft",
                label: "Art + museums + local craft",
              },
              {
                value: "urban_luxury",
                label: "Urban luxury + comfort lifestyle",
              },
            ],
          },
        ],
      },

      // chapter - 4 "What You Want From This Personalised Trip"
      {
        id: 4,
        name: "What You Want From This Personalised Trip",
        image: ChapterImage4,

        questions: [
          {
            id: "4_1",
            ques: "Activity pace preference:",
            type: "radio",
            options: [
              { value: "mostly_chill", label: "Mostly Chill" },
              { value: "balanced", label: "Balanced" },
              { value: "high_activity", label: "High Activity" },
              {
                value: "full_exploration_mode",
                label: "Full exploration mode",
              },
            ],
          },
          {
            id: "4_2",
            ques: "Weather preference:",
            type: "radio",
            options: [
              { value: "warm", label: "Warm" },
              { value: "cool", label: "Cool" },
              { value: "neutral", label: "Neutral" },
            ],
          },
          {
            id: "4_3",
            ques: "Emotional vibe you want",
            type: "radio",
            options: [
              { value: "romantic", label: "Romantic" },
              { value: "peaceful", label: "Peaceful" },
              { value: "fun_playful", label: "Fun playful" },
              { value: "adventure", label: "Adventure" },
              { value: "mixed", label: "Mixed" },
            ],
          },
          {
            id: "4_4",
            ques: "Any dream state / region / country already on your mind? Any dream destination on your mind?",
            type: "text",
          },

          {
            id: "4_5",
            ques: "Any destination you DO NOT want",
            type: "text",
          },
          {
            id: "4_6",
            ques: "Places you’ve already done & don’t want again",
            type: "text",
          },
        ],
      },

      // chapter - 5 "Travel Foundations"
      {
        id: 5,
        name: "Travel Foundations",
        image: ChapterImage5,

        questions: [
          { id: "5_1", ques: "Starting city/state:", type: "text" },
          { id: "5_2", ques: "Passport you hold", type: "text" },
          {
            id: "5_3",
            ques: "Any active visas? If yes, which ones?",
            type: "text",
          },

          {
            id: "5_4",
            ques: "Travel preference:",
            type: "radio",
            options: [
              { value: "flight", label: "Flight" },
              { value: "train", label: "Train" },
              { value: "road_trip", label: "Road Trip" },
              { value: "open_to_any", label: "Open to any" },
            ],
          },

          {
            id: "5_5",
            ques: "Departure airport/station options you can take off from",
            type: "text",
          },
          {
            id: "5_6",
            ques: "Need to return to same city at end?",
            type: "text",
          },
          { id: "5_7", ques: "Trip duration:", type: "text" },
          { id: "5_8", ques: "Budget range for this trip", type: "text" },
          { id: "5_9", ques: "Travel dates: Which works best?", type: "text" },

          {
            id: "5_10",
            ques: "Stay preference:",
            type: "radio",
            options: [
              { value: "cozy_apartment", label: "Cozy apartment" },
              { value: "hotel", label: "Hotel" },
              { value: "boutique_stay", label: "Boutique stay" },
              { value: "unique_themed_stay", label: "Unique themed stay" },
            ],
          },

          {
            id: "5_11",
            ques: "Special stay requests?",
            type: "radio",
            options: [
              { value: "pool", label: "Pool" },
              { value: "mountain_view", label: "Mountain view" },
              { value: "nature_stay", label: "Nature stay" },
              { value: "sea_facing", label: "Sea facing" },
              { value: "wifi_for_work", label: "WiFi for work" },
              { value: "others", label: "Others" },
            ],
          },
        ],
      },

      // chapter - 6 "Personal Touch Layer"
      {
        id: 6,
        name: "Personal Touch Layer",
        image: ChapterImage6,

        questions: [
          {
            id: "6_1",
            ques: "Three things that GUARANTEE you will enjoy a trip?",
            type: "text",
          },
          {
            id: "6_2",
            ques: "Two things that instantly ruin a trip for you?",
            type: "text",
          },
          {
            id: "6_3",
            ques: "Who are you travelling with?",
            type: "radio",
            options: [
              { value: "solo", label: "Solo" },
              { value: "duo", label: "Duo" },
              { value: "sibling", label: "Sibling" },
              { value: "friend", label: "Friend" },
              { value: "group", label: "Group" },
            ],
          },
        ],
      },

      // chapter - 7 "Contact + Final"
      {
        id: 7,
        name: "Contact + Final",
        image: ChapterImage7,
        questions: [
          {
            id: "7_1",
            ques: "Your preferred number — so we know where to send the magic",
            type: "text",
          },
          {
            id: "7_2",
            ques: "Should we send you trip ideas that come out of nowhere (the good kind)?",
            type: "text",
          },
          {
            id: "7_3",
            ques: "Who sent you here first — friend, feed… or fate?",
            type: "text",
          },
          {
            id: "7_4",
            ques: "Final checkbox — can you approve our Privacy Policy before we continue?",
            type: "radio",
            options: [
              { value: "privacy_policy_approved", label: "Yes, I approve" },
            ],
          },
        ],
      },
    ],
  },
];
