import type { Locale } from "@/i18n/config";
import type { LocalizedText } from "@/lib/types";

export type ChildPracticeId = "simple-word" | "sound-imitation" | "picture-choice" | "short-sentence";
export type ParentResponse = "said" | "tried" | "gesture" | "listened" | "noResponse" | "skip" | "tired" | "selected";
export type ChildPracticeStage = "intro" | "settings" | "guide" | "model" | "wait" | "response" | "feedback" | "rest" | "summary";

export interface ChildRoundResult {
  round: number;
  response: ParentResponse;
  correct?: boolean;
  at: string;
}

export interface ChildPracticeProgress {
  exerciseId: ChildPracticeId;
  completedSessions: number;
  completedRounds: number;
  lastActivity?: string;
  level: "easy" | "medium";
  streak: number;
  results: ChildRoundResult[];
}

export const childStoreKey = "dialog:child-practice:v1";

const text = (fa: string, en: string): LocalizedText => ({ fa, en });

export function childText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const childPracticeCopy = {
  parentSafety: text(
    "این فعالیت‌ها آموزشی و حمایتی هستند و جای ارزیابی آسیب‌شناس گفتار و زبان را نمی‌گیرند. اگر نگرانی پایدار درباره گفتار، درک زبان، شنوایی، گرفتگی صدا یا درد وجود دارد، با متخصص مشورت کنید.",
    "These activities are educational and supportive. They do not replace assessment by a speech-language professional. For persistent concerns about speech, language understanding, hearing, hoarseness, or pain, consult a specialist.",
  ),
  consent: text("ضبط صدا اختیاری، موقت و فقط روی همین دستگاه است.", "Audio recording is optional, temporary, and kept only on this device."),
  chooseSettings: text("تنظیم شروع", "Start settings"),
  parentGuide: text("راهنمای کوتاه والد", "Short parent guide"),
  childTurn: text("حالا نوبت کودک است", "Now it is the child's turn"),
  wait: text("چند ثانیه فرصت بدهید؛ پاسخ ندادن شکست نیست.", "Give a few seconds; no response is not a failure."),
  gentleFeedback: text("تلاش کودک را بپذیرید و آرام ادامه دهید.", "Accept the child's attempt and continue calmly."),
  rest: text("استراحت کوتاه", "Short rest"),
  nextRound: text("دور بعد", "Next round"),
  makeEasier: text("ساده‌تر کن", "Make easier"),
  pause: text("توقف موقت", "Pause"),
  resume: text("ادامه", "Resume"),
  finish: text("پایان تمرین", "Finish exercise"),
  start: text("شروع تمرین", "Start exercise"),
  playModel: text("پخش / خواندن نمونه", "Play / read model"),
  noPersianVoice: text("صدای فارسی مرورگر پیدا نشد؛ لطفاً والد نمونه را آرام بخواند.", "No Persian browser voice was found; please have the parent read the model calmly."),
  recordOptional: text("ضبط اختیاری", "Optional recording"),
  stopBecauseTired: text("خسته شد یا ناراحتی دارد", "Tired or uncomfortable"),
  progress: text("پیشرفت بر اساس مشارکت", "Progress based on participation"),
  sessions: text("جلسه کامل", "Completed sessions"),
  rounds: text("دور انجام‌شده", "Rounds completed"),
  selectedCorrect: text("انتخاب‌های هماهنگ این جلسه", "Matching selections this session"),
  noClinicalScore: text("این داده‌ها تشخیص بالینی یا نمره هوش/تلفظ کودک نیستند.", "These data are not a clinical diagnosis or a child intelligence/pronunciation score."),
};

export const parentResponses: Array<{ id: ParentResponse; label: LocalizedText; countsAsParticipation: boolean }> = [
  { id: "said", label: text("واژه/جمله را گفت", "Said the word/sentence"), countsAsParticipation: true },
  { id: "tried", label: text("تلاش کرد", "Tried"), countsAsParticipation: true },
  { id: "gesture", label: text("اشاره یا نگاه کرد", "Gestured or looked"), countsAsParticipation: true },
  { id: "listened", label: text("فقط گوش داد", "Only listened"), countsAsParticipation: true },
  { id: "noResponse", label: text("فعلاً پاسخ نداد", "No response for now"), countsAsParticipation: false },
  { id: "skip", label: text("عبور از این مورد", "Skip this item"), countsAsParticipation: false },
  { id: "tired", label: text("خسته شد یا ناراحتی دارد", "Tired or uncomfortable"), countsAsParticipation: false },
];

export const childPracticeExercises: Array<{
  id: ChildPracticeId;
  cardId: string;
  title: LocalizedText;
  ageBand: string;
  summary: LocalizedText;
  guide: LocalizedText[];
  defaultRounds: number;
  settings: {
    topics?: Array<{ id: string; label: LocalizedText }>;
    rounds: number[];
    levels: Array<{ id: "easy" | "medium"; label: LocalizedText }>;
    choices?: number[];
    modes?: Array<{ id: string; label: LocalizedText }>;
  };
  items: Array<{
    id: string;
    word: LocalizedText;
    expanded?: LocalizedText;
    icon: string;
    alt: LocalizedText;
    choices?: Array<{ id: string; label: LocalizedText; icon: string }>;
    correctChoiceId?: string;
  }>;
}> = [
  {
    id: "simple-word",
    cardId: "word-practice",
    title: text("تمرین واژه ساده", "Simple word practice"),
    ageBand: "4-7",
    summary: text("واژه کوتاه، الگوسازی والد، فرصت پاسخ و افزودن فقط یک واژه.", "Short word, parent modeling, response wait, and adding only one word."),
    guide: [
      text("واژه را آرام بگویید و ۵ تا ۱۰ ثانیه صبر کنید.", "Say the word calmly and wait 5 to 10 seconds."),
      text("اشاره، نگاه، صدا یا تلاش را مشارکت بدانید.", "Treat gestures, gaze, sounds, or attempts as participation."),
      text("اجبار به تکرار نکنید؛ فقط یک واژه به گفته کودک اضافه کنید.", "Do not force repetition; add only one word to what the child says."),
    ],
    defaultRounds: 5,
    settings: {
      topics: [
        { id: "home", label: text("خانه", "Home") },
        { id: "food", label: text("خوراکی", "Food") },
        { id: "animals", label: text("حیوانات", "Animals") },
        { id: "actions", label: text("افعال", "Actions") },
      ],
      rounds: [3, 5, 8],
      levels: [
        { id: "easy", label: text("واژه منفرد", "Single word") },
        { id: "medium", label: text("ترکیب دوواژه‌ای", "Two-word phrase") },
      ],
    },
    items: [
      { id: "water", word: text("آب", "water"), expanded: text("آب سرد", "cold water"), icon: "💧", alt: text("قطره آب", "water drop") },
      { id: "bread", word: text("نان", "bread"), expanded: text("نان تازه", "fresh bread"), icon: "🥖", alt: text("نان", "bread") },
      { id: "apple", word: text("سیب", "apple"), expanded: text("سیب قرمز", "red apple"), icon: "🍎", alt: text("سیب", "apple") },
      { id: "ball", word: text("توپ", "ball"), expanded: text("توپ قرمز", "red ball"), icon: "🔴", alt: text("توپ", "ball") },
      { id: "cat", word: text("گربه", "cat"), expanded: text("گربه خوابید", "cat slept"), icon: "🐱", alt: text("گربه", "cat") },
      { id: "hand", word: text("دست", "hand"), expanded: text("دست من", "my hand"), icon: "✋", alt: text("دست", "hand") },
    ],
  },
  {
    id: "sound-imitation",
    cardId: "sound-repeat",
    title: text("تکرار صدا", "Sound imitation"),
    ageBand: "4-8",
    summary: text("بازی تقلید صدا و نوبت‌گیری؛ بدون ارزیابی تلفظ یا فشار صوتی.", "A sound imitation and turn-taking game; no pronunciation scoring or vocal pressure."),
    guide: [
      text("صدا را کوتاه و در شدت راحت اجرا کنید.", "Keep sounds short and comfortable."),
      text("بین دورها ۸ تا ۱۰ ثانیه استراحت بدهید.", "Rest 8 to 10 seconds between rounds."),
      text("در صورت خستگی، درد، سرفه یا گرفتگی صدا فوراً توقف کنید.", "Stop immediately for fatigue, pain, coughing, or hoarseness."),
    ],
    defaultRounds: 5,
    settings: {
      topics: [
        { id: "environment", label: text("صداهای محیطی", "Environmental sounds") },
        { id: "animals", label: text("صداهای حیوانات", "Animal sounds") },
        { id: "syllables", label: text("هجاهای ساده", "Simple syllables") },
      ],
      rounds: [3, 5, 8],
      levels: [
        { id: "easy", label: text("صدای کوتاه", "Short sound") },
        { id: "medium", label: text("نوبت‌گیری دو بار", "Two-turn imitation") },
      ],
    },
    items: [
      { id: "tick", word: text("تیک‌تاک", "tick tock"), icon: "⏰", alt: text("ساعت", "clock") },
      { id: "beep", word: text("بیپ‌بیپ", "beep beep"), icon: "📟", alt: text("دستگاه کوچک", "small device") },
      { id: "meow", word: text("میو", "meow"), icon: "🐱", alt: text("گربه", "cat") },
      { id: "woof", word: text("هاپ‌هاپ", "woof woof"), icon: "🐶", alt: text("سگ", "dog") },
      { id: "ma", word: text("ما", "ma"), icon: "〰️", alt: text("نشانه صدا", "sound mark") },
      { id: "pa", word: text("پا", "pa"), icon: "🔵", alt: text("دایره آبی", "blue circle") },
    ],
  },
  {
    id: "picture-choice",
    cardId: "image-selection",
    title: text("بازی انتخاب تصویر", "Picture choice game"),
    ageBand: "5-9",
    summary: text("شنیدن واژه یا دستور کوتاه و تطبیق آن با تصویر واضح.", "Hear a word or short instruction and match it to a clear picture."),
    guide: [
      text("با دو تصویر شروع کنید و در صورت آمادگی کودک، تعداد را افزایش دهید.", "Start with two pictures and increase only when the child is ready."),
      text("برای پاسخ ناهماهنگ، پیام تنبیهی نشان ندهید؛ با هم دوباره نگاه کنید.", "For a mismatch, do not punish; look together again."),
      text("جای تصاویر در هر دور تغییر می‌کند.", "Picture positions change each round."),
    ],
    defaultRounds: 5,
    settings: {
      rounds: [5, 8, 10],
      choices: [2, 3, 4],
      levels: [
        { id: "easy", label: text("دستور تک‌واژه‌ای", "One-word instruction") },
        { id: "medium", label: text("جمله کوتاه", "Short sentence") },
      ],
    },
    items: [
      {
        id: "ball-book",
        word: text("توپ را پیدا کن", "Find the ball"),
        icon: "🔴",
        alt: text("توپ", "ball"),
        correctChoiceId: "ball",
        choices: [
          { id: "ball", label: text("توپ", "ball"), icon: "🔴" },
          { id: "book", label: text("کتاب", "book"), icon: "📘" },
          { id: "shoe", label: text("کفش", "shoe"), icon: "👟" },
          { id: "cat", label: text("گربه", "cat"), icon: "🐱" },
        ],
      },
      {
        id: "apple-banana",
        word: text("سیب را پیدا کن", "Find the apple"),
        icon: "🍎",
        alt: text("سیب", "apple"),
        correctChoiceId: "apple",
        choices: [
          { id: "banana", label: text("موز", "banana"), icon: "🍌" },
          { id: "apple", label: text("سیب", "apple"), icon: "🍎" },
          { id: "bird", label: text("پرنده", "bird"), icon: "🐦" },
          { id: "hat", label: text("کلاه", "hat"), icon: "🧢" },
        ],
      },
    ],
  },
  {
    id: "short-sentence",
    cardId: "short-sentence",
    title: text("جمله کوتاه", "Short sentence"),
    ageBand: "6-10",
    summary: text("عبارت دو تا چهارواژه‌ای، انتخاب تصویر، کامل‌کردن جمله و تکرار اختیاری.", "Two-to-four-word phrases, picture choice, sentence completion, and optional repetition."),
    guide: [
      text("از جمله‌های خیلی کوتاه شروع کنید.", "Start with very short sentences."),
      text("اگر کودک یک واژه گفت، فقط یک واژه اضافه کنید.", "If the child says one word, add only one word."),
      text("تکرار جمله اجباری نیست؛ والد نوع پاسخ را ثبت می‌کند.", "Repeating the sentence is optional; the parent logs the response type."),
    ],
    defaultRounds: 4,
    settings: {
      rounds: [4, 5, 6],
      modes: [
        { id: "listen-picture", label: text("گوش‌دادن و انتخاب تصویر", "Listen and choose picture") },
        { id: "complete", label: text("کامل‌کردن جمله", "Complete sentence") },
        { id: "repeat", label: text("تکرار اختیاری", "Optional repeat") },
      ],
      levels: [
        { id: "easy", label: text("دو واژه", "Two words") },
        { id: "medium", label: text("سه تا چهار واژه", "Three to four words") },
      ],
    },
    items: [
      { id: "ball-fell", word: text("توپ افتاد.", "The ball fell."), expanded: text("توپ قرمز افتاد.", "The red ball fell."), icon: "🔴", alt: text("توپ افتاده", "fallen ball") },
      { id: "cat-slept", word: text("گربه خوابید.", "The cat slept."), expanded: text("گربه کوچک خوابید.", "The little cat slept."), icon: "🐱", alt: text("گربه خوابیده", "sleeping cat") },
      { id: "mom-reads", word: text("مامان کتاب می‌خواند.", "Mom reads a book."), expanded: text("مامان کتاب بزرگ می‌خواند.", "Mom reads a big book."), icon: "📘", alt: text("کتاب", "book") },
      { id: "bird-flies", word: text("پرنده پرواز می‌کند.", "The bird flies."), expanded: text("پرنده کوچک پرواز می‌کند.", "The little bird flies."), icon: "🐦", alt: text("پرنده", "bird") },
    ],
  },
];

export function getChildPractice(id: string) {
  return childPracticeExercises.find((exercise) => exercise.id === id);
}

export function emptyProgress(exerciseId: ChildPracticeId): ChildPracticeProgress {
  return { exerciseId, completedSessions: 0, completedRounds: 0, level: "easy", streak: 0, results: [] };
}

export function computeChildProgress(progress: ChildPracticeProgress, defaultRounds: number) {
  const participation = progress.results.filter((item) => ["said", "tried", "gesture", "listened", "selected"].includes(item.response)).length;
  const sessionWeight = Math.min(50, progress.completedSessions * 20);
  const roundWeight = Math.min(40, Math.round((progress.completedRounds / Math.max(defaultRounds, 1)) * 40));
  const participationWeight = Math.min(10, participation * 2);
  return Math.min(100, sessionWeight + roundWeight + participationWeight);
}
