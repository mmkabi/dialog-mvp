import type {
  AdminStats,
  CastingApplication,
  CastingCall,
  ChildExercise,
  Lesson,
  LessonProgress,
  LocalizedText,
  PracticeApplication,
  PracticeRequest,
  Profile,
  SpeechExercise,
  TeacherAgent,
  User,
} from "@/lib/types";

const text = (fa: string, en: string): LocalizedText => ({ fa, en });

const lesson = (
  id: string,
  titleFa: string,
  titleEn: string,
  summaryFa: string,
  summaryEn: string,
  practiceFa: string,
  practiceEn: string,
  state: Lesson["state"],
  xp = 20,
): Lesson => ({
  id,
  title: text(titleFa, titleEn),
  summary: text(summaryFa, summaryEn),
  durationMinutes: 8,
  xp,
  state,
  practiceTask: text(practiceFa, practiceEn),
  feedback: text(
    "بازخورد نمایشی: تمرکز شما روشن است. یک بار دیگر با مکث کمتر و هدف مشخص‌تر اجرا کنید.",
    "Mock feedback: your focus is clear. Repeat once with fewer pauses and a sharper objective.",
  ),
});

export const mockUsers: User[] = [
  { id: "user-1", email: "nava@example.com", role: "actor", profileId: "actor-nava" },
  { id: "user-2", email: "director@example.com", role: "director" },
  { id: "user-3", email: "coach@example.com", role: "coach" },
  { id: "user-4", email: "parent@example.com", role: "parent" },
  { id: "user-5", email: "admin@example.com", role: "admin" },
];

export const actorProfiles: Profile[] = [
  {
    id: "actor-nava",
    userId: "user-1",
    firstName: text("نوا", "Nava"),
    lastName: text("راد", "Rad"),
    photoTone: "from-rose-200 to-amber-200",
    bio: text(
      "بازیگر تئاتر و صدا با تمرکز بر رئالیسم معاصر، دوبله و مونولوگ‌های روان‌شناختی.",
      "Stage and voice actor focused on contemporary realism, dubbing, and psychological monologues.",
    ),
    city: text("تهران", "Tehran"),
    age: 29,
    gender: "woman",
    heightCm: 168,
    voiceType: text("متسو سوپرانو / گرم", "Mezzo-soprano / warm"),
    actingResume: text(
      "۸ سال تجربه صحنه، سه اجرای عمومی در سالن مستقل تهران، دوبله پادکست روایی و دو فیلم کوتاه.",
      "8 years on stage, three public productions in Tehran independent theatres, narrative podcast dubbing, and two short films.",
    ),
    skills: ["theatre", "voiceActing", "dubbing", "speech", "screenActing"],
    portfolioItems: [
      { id: "p-1", title: text("مونولوگ شهر خاموش", "Silent City monologue"), type: "showreel", year: 2025, url: "#" },
      { id: "p-2", title: text("نمونه صدای روایی", "Narrative voice sample"), type: "voice", year: 2026, url: "#" },
    ],
    availability: "available",
    languages: [text("فارسی", "Persian"), text("انگلیسی", "English")],
    contactPreference: text("پیام داخل پلتفرم و ایمیل کاری", "In-platform message and work email"),
  },
  {
    id: "actor-aram",
    userId: "user-6",
    firstName: text("آرام", "Aram"),
    lastName: text("کیانی", "Kiani"),
    photoTone: "from-sky-200 to-emerald-200",
    bio: text(
      "بازیگر فیزیکال، تمرین‌دیده در حرکت بدن و بداهه‌پردازی، مناسب پروژه‌های تجربی و صحنه‌ای.",
      "Physical performer trained in body movement and improvisation, suitable for experimental and stage projects.",
    ),
    city: text("اصفهان", "Isfahan"),
    age: 34,
    gender: "man",
    heightCm: 181,
    voiceType: text("باریتون", "Baritone"),
    actingResume: text(
      "همکاری با دو گروه تجربی، طراحی حرکت برای سه اجرای دانشجویی و بازی در یک فیلم کوتاه جشنواره‌ای.",
      "Collaborated with two experimental groups, movement design for three student productions, and acted in a festival short film.",
    ),
    skills: ["bodyMovement", "improvisation", "stageActing", "theatre"],
    portfolioItems: [
      { id: "p-3", title: text("اتود حرکت در فضای خالی", "Movement study in empty space"), type: "stage", year: 2024, url: "#" },
    ],
    availability: "limited",
    languages: [text("فارسی", "Persian")],
    contactPreference: text("جلسه آنلاین کوتاه پیش از هماهنگی", "Short online meeting before scheduling"),
  },
  {
    id: "actor-sara",
    userId: "user-7",
    firstName: text("سارا", "Sara"),
    lastName: text("احمدی", "Ahmadi"),
    photoTone: "from-violet-200 to-fuchsia-200",
    bio: text(
      "بازیگر مقابل دوربین با تجربه تبلیغات، سریال کوتاه و تمرین لهجه و بیان.",
      "Screen actor with experience in commercials, short series, accent work, and speech practice.",
    ),
    city: text("شیراز", "Shiraz"),
    age: 26,
    gender: "woman",
    heightCm: 164,
    voiceType: text("سوپرانو روشن", "Bright soprano"),
    actingResume: text(
      "چهار پروژه تبلیغاتی، یک سریال وبی مستقل، دوره بیان و تمرین بازی مقابل دوربین.",
      "Four commercial projects, one independent web series, speech training, and screen acting workshops.",
    ),
    skills: ["cinema", "screenActing", "speech", "singing"],
    portfolioItems: [
      { id: "p-4", title: text("شوروم تبلیغاتی", "Commercial showreel"), type: "showreel", year: 2025, url: "#" },
      { id: "p-5", title: text("عکس پرتره استودیویی", "Studio portrait set"), type: "photo", year: 2026, url: "#" },
    ],
    availability: "available",
    languages: [text("فارسی", "Persian"), text("عربی پایه", "Basic Arabic")],
    contactPreference: text("تماس از طریق مدیر برنامه", "Contact through representative"),
  },
  {
    id: "actor-kian",
    userId: "user-8",
    firstName: text("کیان", "Kian"),
    lastName: text("مهر", "Mehr"),
    photoTone: "from-teal-200 to-cyan-200",
    bio: text(
      "دوبلور و بازیگر جوان با تمرکز روی نقش‌های نوجوان، خوانش متن و تمرین آوا.",
      "Young voice and screen actor focused on teen roles, text reading, and vocal articulation.",
    ),
    city: text("تبریز", "Tabriz"),
    age: 19,
    gender: "man",
    heightCm: 176,
    voiceType: text("تنور جوان", "Young tenor"),
    actingResume: text(
      "دو نمایش مدرسه‌ای، دوره مقدماتی دوبله و نمونه صدای شخصیت‌پردازی شده.",
      "Two school productions, introductory dubbing training, and character voice samples.",
    ),
    skills: ["voiceActing", "dubbing", "speech", "cinema"],
    portfolioItems: [
      { id: "p-6", title: text("سه شخصیت صوتی", "Three character voices"), type: "voice", year: 2026, url: "#" },
    ],
    availability: "limited",
    languages: [text("فارسی", "Persian"), text("ترکی آذری", "Azerbaijani Turkish")],
    contactPreference: text("پیام با تایید والد", "Message with parent approval"),
  },
  {
    id: "actor-roya",
    userId: "user-9",
    firstName: text("رویا", "Roya"),
    lastName: text("فرهمند", "Farahmand"),
    photoTone: "from-amber-200 to-lime-200",
    bio: text(
      "بازیگر باتجربه صحنه و مربی بیان، آماده همکاری محدود در پروژه‌های حرفه‌ای.",
      "Experienced stage actor and speech coach, available selectively for professional projects.",
    ),
    city: text("مشهد", "Mashhad"),
    age: 42,
    gender: "woman",
    heightCm: 170,
    voiceType: text("آلتو عمیق", "Deep alto"),
    actingResume: text(
      "۱۵ سال فعالیت صحنه، کارگاه‌های بیان و بدن، دو اجرای تور شهری و مشاوره بازیگری.",
      "15 years of stage work, speech and body workshops, two city tours, and acting consulting.",
    ),
    skills: ["theatre", "stageActing", "speech", "bodyMovement"],
    portfolioItems: [
      { id: "p-7", title: text("صحنه‌های منتخب", "Selected stage scenes"), type: "showreel", year: 2023, url: "#" },
    ],
    availability: "unavailable",
    languages: [text("فارسی", "Persian"), text("انگلیسی", "English")],
    contactPreference: text("فقط پیشنهادهای رسمی", "Formal offers only"),
  },
];

export const teacherAgents: TeacherAgent[] = [
  {
    id: "stanislavski",
    name: text("کنستانتین استانیسلاوسکی", "Konstantin Stanislavski"),
    method: text("سیستم استانیسلاوسکی", "Stanislavski System"),
    avatarTone: "from-stone-200 to-red-200",
    description: text(
      "تمرکز روی هدف، شرایط داده‌شده، اگر جادویی و باورپذیری رفتار صحنه.",
      "Focuses on objectives, given circumstances, the magic if, and believable stage behavior.",
    ),
    lessons: [
      lesson("given-circumstances", "شرایط داده‌شده", "Given circumstances", "چطور جهان متن را دقیق بخوانیم.", "How to read the world of the text precisely.", "یک صحنه کوتاه را با سه واقعیت قطعی توصیف کنید.", "Describe a short scene using three concrete facts.", "completed"),
      lesson("objective-action", "هدف و کنش", "Objective and action", "هدف شخصیت را به فعل قابل بازی تبدیل کنید.", "Turn a character objective into playable action.", "برای یک جمله ساده سه کنش متفاوت بسازید.", "Create three different actions for one simple line.", "inProgress"),
      lesson("magic-if", "اگر جادویی", "The magic if", "پلی بین تجربه شخصی و موقعیت نمایشی.", "A bridge between personal experience and dramatic situation.", "با پرسش اگر من بودم چه می‌کردم تمرین کنید.", "Practice with the question what would I do if I were there.", "locked"),
    ],
    exercises: [
      text("دفترچه شرایط صحنه", "Scene circumstance journal"),
      text("تبدیل خواسته به فعل", "Turn want into action"),
      text("اجرای دوباره با اگر متفاوت", "Replay with a different if"),
    ],
  },
  {
    id: "strasberg",
    name: text("لی استراسبرگ", "Lee Strasberg"),
    method: text("بازیگری متد", "Method Acting"),
    avatarTone: "from-neutral-200 to-orange-200",
    description: text(
      "تمرین توجه، آرام‌سازی و حافظه حسی برای نزدیک شدن به تجربه نقش.",
      "Uses attention, relaxation, and sensory memory to approach the character experience.",
    ),
    lessons: [
      lesson("relaxation", "آرام‌سازی کنترل‌شده", "Controlled relaxation", "کاهش تنش پیش از اجرا.", "Reduce tension before performance.", "یک اسکن بدنی دو دقیقه‌ای انجام دهید.", "Do a two-minute body scan.", "completed"),
      lesson("sense-memory", "حافظه حسی", "Sense memory", "بازآفرینی بافت، بو و دما بدون اغراق.", "Recreate texture, smell, and temperature without exaggeration.", "یک فنجان خیالی را با جزئیات حسی نگه دارید.", "Hold an imaginary cup with sensory detail.", "inProgress"),
      lesson("private-moment", "لحظه خصوصی", "Private moment", "تمرین صداقت رفتاری در چارچوب امن.", "Practice behavioral truth inside a safe frame.", "یک عمل روزمره را بدون نمایش‌زدگی اجرا کنید.", "Perform a daily action without theatricality.", "locked"),
    ],
    exercises: [
      text("اسکن تنش بدن", "Body tension scan"),
      text("تمرین شیء خیالی", "Imaginary object practice"),
      text("دفترچه حس‌های روزانه", "Daily senses journal"),
    ],
  },
  {
    id: "meisner",
    name: text("سانفورد مایزنر", "Sanford Meisner"),
    method: text("تکنیک مایزنر", "Meisner Technique"),
    avatarTone: "from-blue-200 to-stone-200",
    description: text(
      "پاسخ لحظه‌ای، تکرار، گوش دادن فعال و زندگی صادقانه در شرایط خیالی.",
      "Builds moment-to-moment response, repetition, active listening, and truthful living under imaginary circumstances.",
    ),
    lessons: [
      lesson("repetition", "تمرین تکرار", "Repetition exercise", "شنیدن و پاسخ دادن بدون طراحی قبلی.", "Listen and respond without pre-planning.", "یک جمله را با تغییر واقعی زیرمتن تکرار کنید.", "Repeat one line with a real subtext shift.", "completed"),
      lesson("independent-activity", "فعالیت مستقل", "Independent activity", "حفظ هدف شخصی هنگام دریافت شریک.", "Keep a personal objective while receiving a partner.", "یک کار ساده با محدودیت زمان انتخاب کنید.", "Choose a simple timed task.", "inProgress"),
      lesson("emotional-prep", "آمادگی عاطفی", "Emotional preparation", "ورود به صحنه با وضعیت روشن و کنترل‌شده.", "Enter a scene with a clear, contained state.", "پیش از یک جمله وضعیت خود را نام‌گذاری کنید.", "Name your state before one line.", "locked"),
    ],
    exercises: [
      text("تکرار با گوش دادن", "Listening repetition"),
      text("فعالیت مستقل زمان‌دار", "Timed independent activity"),
      text("ثبت تغییر زیرمتن", "Subtext shift log"),
    ],
  },
  {
    id: "adler",
    name: text("استلا آدلر", "Stella Adler"),
    method: text("تکنیک استلا آدلر", "Stella Adler Technique"),
    avatarTone: "from-fuchsia-200 to-rose-200",
    description: text(
      "تخیل، تحقیق، شرایط اجتماعی و بزرگ‌تر دیدن جهان نقش.",
      "Emphasizes imagination, research, social context, and the larger world of the role.",
    ),
    lessons: [
      lesson("imagination", "تخیل فعال", "Active imagination", "ساختن جهان نقش فراتر از خاطره شخصی.", "Build the role's world beyond personal memory.", "اتاق شخصیت را با پنج جزئیات بنویسید.", "Write five details of the character's room.", "completed"),
      lesson("social-world", "جهان اجتماعی", "Social world", "شناخت طبقه، زمانه و فشارهای محیطی.", "Understand class, time period, and environmental pressures.", "برای نقش یک جدول زمینه اجتماعی بسازید.", "Create a social context table for the role.", "inProgress"),
      lesson("text-size", "اندازه متن", "Size of the text", "جمله‌ها را با انرژی متن هماهنگ کنید.", "Match delivery to the scale of the writing.", "یک جمله را در سه اندازه انرژی بخوانید.", "Read one line in three energy sizes.", "locked"),
    ],
    exercises: [
      text("نقشه جهان شخصیت", "Character world map"),
      text("تحقیق یک دوره تاریخی", "Historical period research"),
      text("اجرای با اندازه‌های متفاوت", "Scale-shift performance"),
    ],
  },
  {
    id: "hagen",
    name: text("اوتا هاگن", "Uta Hagen"),
    method: text("تکنیک اوتا هاگن", "Uta Hagen Technique"),
    avatarTone: "from-emerald-200 to-lime-200",
    description: text(
      "پرسش‌های عملی، جایگزینی امن و رفتار دقیق انسانی در صحنه.",
      "Practical questions, safe substitution, and precise human behavior on stage.",
    ),
    lessons: [
      lesson("six-steps", "شش پرسش نقش", "Six steps", "پرسش‌های روشن برای ساخت موقعیت.", "Clear questions for building the situation.", "به شش پرسش برای یک صحنه پاسخ دهید.", "Answer six questions for one scene.", "completed"),
      lesson("substitution", "جایگزینی امن", "Safe substitution", "یافتن رابطه قابل اتکا بدون فشار عاطفی ناسالم.", "Find a usable relation without unsafe emotional pressure.", "یک جایگزین ساده و غیرحساس انتخاب کنید.", "Choose a simple non-sensitive substitution.", "inProgress"),
      lesson("object-work", "کار با اشیا", "Object work", "رفتار با وسایل صحنه را باورپذیر کنید.", "Make prop behavior believable.", "با یک وسیله واقعی سه عمل دقیق انجام دهید.", "Perform three precise actions with a real object.", "locked"),
    ],
    exercises: [
      text("شش پرسش قبل از اجرا", "Six pre-scene questions"),
      text("اتود وسیله روزمره", "Daily object etude"),
      text("بازنویسی رابطه صحنه", "Scene relationship rewrite"),
    ],
  },
  {
    id: "michael-chekhov",
    name: text("مایکل چخوف", "Michael Chekhov"),
    method: text("تکنیک مایکل چخوف", "Michael Chekhov Technique"),
    avatarTone: "from-cyan-200 to-sky-200",
    description: text(
      "ژست روان‌شناختی، تخیل بدنی و کیفیت حرکت برای باز کردن نقش.",
      "Uses psychological gesture, embodied imagination, and movement qualities to unlock character.",
    ),
    lessons: [
      lesson("psychological-gesture", "ژست روان‌شناختی", "Psychological gesture", "هدف درونی را به شکل حرکت ببینید.", "See the inner objective as movement.", "برای خواستن، رد کردن و پنهان کردن سه ژست بسازید.", "Create three gestures for wanting, rejecting, and hiding.", "completed"),
      lesson("qualities", "کیفیت حرکت", "Movement qualities", "شناخت سبک، وزن و جهت انرژی.", "Explore style, weight, and energy direction.", "یک جمله را با کیفیت سبک و سنگین اجرا کنید.", "Perform one line with light and heavy qualities.", "inProgress"),
      lesson("imaginary-body", "بدن خیالی", "Imaginary body", "بدن نقش را بدون کاریکاتور پیدا کنید.", "Find the role's body without caricature.", "با مرکز ثقل متفاوت راه بروید.", "Walk with a different center of gravity.", "locked"),
    ],
    exercises: [
      text("ژست هدف درونی", "Inner objective gesture"),
      text("راه رفتن با مرکز متفاوت", "Alternate center walk"),
      text("تغییر کیفیت انرژی", "Energy quality shift"),
    ],
  },
  {
    id: "brecht",
    name: text("برتولت برشت", "Bertolt Brecht"),
    method: text("تئاتر حماسی", "Epic Theatre"),
    avatarTone: "from-yellow-200 to-stone-200",
    description: text(
      "فاصله‌گذاری، نگاه انتقادی و نمایش انتخاب‌های اجتماعی شخصیت.",
      "Uses distancing, critical perspective, and the display of social choices.",
    ),
    lessons: [
      lesson("gestus", "ژست اجتماعی", "Gestus", "رابطه اجتماعی را در یک حرکت روشن کنید.", "Reveal a social relationship in one action.", "یک سلام ساده را با سه جایگاه قدرت اجرا کنید.", "Perform a greeting with three power positions.", "completed"),
      lesson("distance", "فاصله انتقادی", "Critical distance", "شخصیت را نشان دهید، نه اینکه در آن گم شوید.", "Show the character without disappearing into it.", "پس از یک جمله، انگیزه اجتماعی آن را بیان کنید.", "After a line, state its social motive.", "inProgress"),
      lesson("narration", "روایت صحنه", "Stage narration", "چطور روایت می‌تواند معنا را عوض کند.", "How narration can change meaning.", "یک صحنه را با یک جمله روایی قطع کنید.", "Interrupt a scene with one narrative sentence.", "locked"),
    ],
    exercises: [
      text("سلام با جایگاه قدرت", "Power-position greeting"),
      text("قطع روایی", "Narrative interruption"),
      text("تحلیل انتخاب اجتماعی", "Social choice analysis"),
    ],
  },
  {
    id: "lecoq",
    name: text("ژاک لکوک", "Jacques Lecoq"),
    method: text("تئاتر فیزیکال و حرکت", "Physical Theatre and Movement"),
    avatarTone: "from-lime-200 to-teal-200",
    description: text(
      "بدن، ریتم، ماسک، حرکت و مشاهده جهان بیرونی به عنوان منبع بازی.",
      "Centers body, rhythm, mask, movement, and observation of the external world.",
    ),
    lessons: [
      lesson("neutral-mask", "ماسک خنثی", "Neutral mask", "بدن آماده و بی‌داوری پیدا کنید.", "Find a ready, non-judgmental body.", "یک ورود آرام بدون داستان اضافی اجرا کنید.", "Perform a quiet entrance without extra story.", "completed"),
      lesson("rhythm", "ریتم و فضا", "Rhythm and space", "رابطه بدن با سرعت و فاصله.", "The body's relation to speed and distance.", "یک مسیر را در سه ریتم طی کنید.", "Cross a path in three rhythms.", "inProgress"),
      lesson("elements", "عناصر طبیعت", "Natural elements", "کیفیت آب، آتش، خاک و هوا در بدن.", "Water, fire, earth, and air qualities in the body.", "یک جمله را با کیفیت آب اجرا کنید.", "Perform one line with water quality.", "locked"),
    ],
    exercises: [
      text("راه رفتن با ماسک خنثی", "Neutral mask walk"),
      text("سه ریتم در یک مسیر", "Three rhythms on one path"),
      text("کیفیت عناصر در بدن", "Element qualities in the body"),
    ],
  },
  {
    id: "grotowski",
    name: text("یرژی گروتوفسکی", "Jerzy Grotowski"),
    method: text("تئاتر فقیر / تئاتر فیزیکال", "Poor Theatre / Physical Theatre"),
    avatarTone: "from-red-200 to-zinc-200",
    description: text(
      "کاهش ابزارها، حضور بدنی شدید و رابطه مستقیم بازیگر و تماشاگر.",
      "Reduces theatrical tools to intensify embodied presence and the actor-audience relation.",
    ),
    lessons: [
      lesson("actor-presence", "حضور بازیگر", "Actor presence", "بدن و صدا را به مرکز اجرا تبدیل کنید.", "Make body and voice the center of performance.", "یک صحنه را بدون وسیله اجرا کنید.", "Perform a scene without props.", "completed"),
      lesson("physical-score", "امتیاز فیزیکی", "Physical score", "زنجیره دقیق حرکت و صدا بسازید.", "Build a precise chain of movement and sound.", "پنج حرکت ثابت برای یک مونولوگ انتخاب کنید.", "Choose five fixed movements for a monologue.", "inProgress"),
      lesson("impulse", "تکانه", "Impulse", "حرکت را از نیاز درونی آغاز کنید.", "Begin movement from inner necessity.", "پیش از حرکت، نفس و انگیزه را یکی کنید.", "Unify breath and motive before movement.", "locked"),
    ],
    exercises: [
      text("اجرای بدون ابزار", "No-prop performance"),
      text("زنجیره حرکت و صدا", "Movement and sound score"),
      text("تمرین تکانه از نفس", "Impulse from breath"),
    ],
  },
  {
    id: "brook",
    name: text("پیتر بروک", "Peter Brook"),
    method: text("فضای خالی / تئاتر مینیمال", "Empty Space / Minimal Theatre"),
    avatarTone: "from-indigo-200 to-slate-200",
    description: text(
      "سادگی، توجه به لحظه زنده و قدرت صحنه خالی برای ساخت معنا.",
      "Explores simplicity, live attention, and the power of empty space to create meaning.",
    ),
    lessons: [
      lesson("empty-space", "فضای خالی", "The empty space", "هر حرکت کوچک می‌تواند صحنه بسازد.", "Every small action can create a stage.", "یک ورود و خروج را با کمترین ابزار اجرا کنید.", "Perform an entrance and exit with minimal tools.", "completed"),
      lesson("attention", "توجه زنده", "Live attention", "تماشاگر را با حضور، نه شلوغی، نگه دارید.", "Hold attention through presence, not clutter.", "یک دقیقه سکوت معنادار تمرین کنید.", "Practice one minute of meaningful silence.", "inProgress"),
      lesson("simplicity", "سادگی انتخاب", "Simplicity of choice", "انتخاب‌های کمتر اما دقیق‌تر.", "Fewer choices, made more precisely.", "سه حرکت اضافی را از صحنه حذف کنید.", "Remove three unnecessary movements from a scene.", "locked"),
    ],
    exercises: [
      text("ورود در فضای خالی", "Entrance in empty space"),
      text("سکوت معنادار", "Meaningful silence"),
      text("حذف حرکت اضافی", "Remove excess movement"),
    ],
  },
  {
    id: "artaud",
    name: text("آنتونن آرتو", "Antonin Artaud"),
    method: text("تئاتر خشونت", "Theatre of Cruelty"),
    avatarTone: "from-orange-200 to-red-200",
    description: text(
      "زبان حسی، صدا، تصویر و انرژی شدید برای تکان دادن ادراک تماشاگر.",
      "Uses sensory language, sound, image, and intensity to shake audience perception.",
    ),
    lessons: [
      lesson("sensory-image", "تصویر حسی", "Sensory image", "معنا را از مسیر حس و تصویر بسازید.", "Build meaning through sensation and image.", "یک جمله را به سه تصویر حسی تبدیل کنید.", "Turn one line into three sensory images.", "completed"),
      lesson("voice-impact", "اثر صدا", "Voice impact", "صدا را به ابزار فضا تبدیل کنید.", "Turn voice into a spatial force.", "یک واژه را با سه فاصله فضایی اجرا کنید.", "Perform one word at three spatial distances.", "inProgress"),
      lesson("ritual-energy", "انرژی آیینی", "Ritual energy", "تکرار و ریتم را کنترل‌شده نگه دارید.", "Keep repetition and rhythm controlled.", "یک ریتم ساده را بدون فشار فیزیکی تکرار کنید.", "Repeat a simple rhythm without physical strain.", "locked"),
    ],
    exercises: [
      text("نقاشی تصویر حسی", "Sensory image sketch"),
      text("صدا در سه فاصله", "Voice in three distances"),
      text("ریتم کنترل‌شده", "Controlled rhythm"),
    ],
  },
  {
    id: "anton-chekhov",
    name: text("آنتون چخوف", "Anton Chekhov"),
    method: text("رئالیسم روسی / تاثیر درام", "Russian Realism / Dramatic Influence"),
    avatarTone: "from-slate-200 to-emerald-200",
    description: text(
      "زیرمتن، سکوت، میل پنهان و جزئیات رفتار درام رئالیستی.",
      "Explores subtext, silence, hidden desire, and behavioral detail in realist drama.",
    ),
    lessons: [
      lesson("subtext", "زیرمتن", "Subtext", "آنچه گفته نمی‌شود را قابل بازی کنید.", "Make the unsaid playable.", "زیر هر جمله یک خواسته پنهان بنویسید.", "Write a hidden want beneath each line.", "completed"),
      lesson("silence", "سکوت فعال", "Active silence", "سکوت را به کنش تبدیل کنید.", "Turn silence into action.", "ده ثانیه سکوت با هدف روشن اجرا کنید.", "Perform ten seconds of silence with a clear objective.", "inProgress"),
      lesson("daily-detail", "جزئیات روزمره", "Daily detail", "رفتار کوچک می‌تواند درام بسازد.", "Small behavior can create drama.", "یک عادت کوچک برای شخصیت انتخاب کنید.", "Choose one small habit for the character.", "locked"),
    ],
    exercises: [
      text("نوشتن زیرمتن", "Subtext writing"),
      text("سکوت با هدف", "Silence with objective"),
      text("عادت کوچک شخصیت", "Small character habit"),
    ],
  },
  {
    id: "meyerhold",
    name: text("وسولد میرهولد", "Vsevolod Meyerhold"),
    method: text("بیومکانیک", "Biomechanics"),
    avatarTone: "from-zinc-200 to-cyan-200",
    description: text(
      "دقت فیزیکی، ریتم مکانیکی و طراحی کنش بدن در اجرای صحنه.",
      "Develops physical precision, mechanical rhythm, and designed bodily action.",
    ),
    lessons: [
      lesson("precision", "دقت حرکت", "Movement precision", "حرکت را قابل تکرار و روشن بسازید.", "Make movement repeatable and clear.", "یک حرکت سه مرحله‌ای طراحی کنید.", "Design a three-step movement.", "completed"),
      lesson("rhythmic-action", "کنش ریتمیک", "Rhythmic action", "ریتم را به قصد بازیگر وصل کنید.", "Connect rhythm to actor intention.", "یک جمله را با ضرب ثابت اجرا کنید.", "Perform one line with a fixed beat.", "inProgress"),
      lesson("counterbalance", "تعادل متقابل", "Counterbalance", "رابطه وزن، جهت و واکنش را تمرین کنید.", "Practice weight, direction, and reaction.", "با تغییر وزن بدن یک واکنش بسازید.", "Create a reaction through weight shift.", "locked"),
    ],
    exercises: [
      text("حرکت سه مرحله‌ای", "Three-step movement"),
      text("جمله با ضرب ثابت", "Line on a fixed beat"),
      text("واکنش با تغییر وزن", "Reaction through weight shift"),
    ],
  },
  {
    id: "boleslavsky",
    name: text("ریچارد بولسلاوسکی", "Richard Boleslavsky"),
    method: text("آموزش درونی / روان‌شناختی بازیگری", "Inner / Psychological Acting Training"),
    avatarTone: "from-rose-200 to-violet-200",
    description: text(
      "تمرکز، مشاهده، خاطره کنترل‌شده و پرورش انضباط درونی بازیگر.",
      "Builds concentration, observation, controlled memory, and inner discipline for actors.",
    ),
    lessons: [
      lesson("concentration", "تمرکز", "Concentration", "حواس را روی هدف مشخص نگه دارید.", "Keep attention on a clear target.", "یک شیء را یک دقیقه بدون قضاوت مشاهده کنید.", "Observe one object for one minute without judgment.", "completed"),
      lesson("observation", "مشاهده انسان", "Human observation", "جزئیات رفتار را بدون تقلید سطحی ثبت کنید.", "Record behavioral details without shallow imitation.", "سه رفتار روزمره را یادداشت کنید.", "Note three daily behaviors.", "inProgress"),
      lesson("inner-discipline", "انضباط درونی", "Inner discipline", "تکرار تمرین را به عادت حرفه‌ای تبدیل کنید.", "Turn repeated practice into a professional habit.", "برای هفت روز یک تمرین کوتاه تنظیم کنید.", "Set one short exercise for seven days.", "locked"),
    ],
    exercises: [
      text("مشاهده یک شیء", "Object observation"),
      text("دفترچه رفتار انسان", "Human behavior journal"),
      text("تمرین هفت روزه", "Seven-day practice"),
    ],
  },
];

export const lessonProgress: LessonProgress[] = [
  { lessonId: "given-circumstances", completed: true, score: 92, xp: 20 },
  { lessonId: "objective-action", completed: false, score: 64, xp: 12 },
];

export const practiceRequests: PracticeRequest[] = [
  {
    id: "practice-glass-menagerie",
    title: text("تمرین صحنه دو نفره برای باغ‌وحش شیشه‌ای", "Two-person scene rehearsal for The Glass Menagerie"),
    scriptName: text("باغ‌وحش شیشه‌ای", "The Glass Menagerie"),
    roleNeeded: text("تام یا لورا", "Tom or Laura"),
    preferredGender: "any",
    approximateAge: "22-35",
    voiceType: text("صدای طبیعی و بیان آرام", "Natural voice with calm delivery"),
    cityOrOnline: text("آنلاین / تهران", "Online / Tehran"),
    proposedTime: text("سه‌شنبه عصر", "Tuesday evening"),
    description: text(
      "هدف تمرین، خوانش دقیق زیرمتن و ریتم سکوت‌هاست. جلسه اول ۴۵ دقیقه‌ای و آنلاین است.",
      "The goal is detailed subtext reading and silence rhythm. First session is 45 minutes online.",
    ),
    status: "open",
    ownerName: text("نوا راد", "Nava Rad"),
  },
  {
    id: "practice-dubbing-duo",
    title: text("پارتنر دوبله برای دیالوگ انیمیشن", "Dubbing partner for animation dialogue"),
    scriptName: text("سکانس تمرینی انیمیشن", "Animation practice scene"),
    roleNeeded: text("شخصیت کمدی پرانرژی", "High-energy comic character"),
    preferredGender: "any",
    approximateAge: "18-30",
    voiceType: text("انعطاف‌پذیر و روشن", "Flexible and bright"),
    cityOrOnline: text("آنلاین", "Online"),
    proposedTime: text("پنجشنبه ساعت ۱۸", "Thursday at 18:00"),
    description: text(
      "تمرین هماهنگی لب، ریتم جمله و تغییر شخصیت صوتی با بازخورد دوستانه.",
      "Practice lip sync, sentence rhythm, and character voice shifts with friendly feedback.",
    ),
    status: "open",
    ownerName: text("کیان مهر", "Kian Mehr"),
  },
  {
    id: "practice-stage-movement",
    title: text("تمرین حرکت و میزانسن صحنه", "Stage movement and blocking practice"),
    scriptName: text("اتود بدون متن", "Textless etude"),
    roleNeeded: text("همراه حرکت", "Movement partner"),
    preferredGender: "any",
    approximateAge: "25-45",
    voiceType: text("بدون نیاز صوتی", "No vocal requirement"),
    cityOrOnline: text("اصفهان", "Isfahan"),
    proposedTime: text("جمعه صبح", "Friday morning"),
    description: text(
      "تمرین فیزیکال کم‌خطر برای ریتم، فاصله و واکنش. مناسب افراد آشنا با کار بدن.",
      "Low-risk physical practice for rhythm, distance, and reaction. Best for people familiar with body work.",
    ),
    status: "closed",
    ownerName: text("آرام کیانی", "Aram Kiani"),
  },
];

export const practiceApplications: PracticeApplication[] = [
  { id: "pa-1", requestId: "practice-glass-menagerie", userId: "user-1", status: "interested" },
];

export const castingCalls: CastingCall[] = [
  {
    id: "casting-shadow-stage",
    projectTitle: text("سایه‌های پشت صحنه", "Backstage Shadows"),
    projectType: "theatre",
    requiredRoles: [text("بازیگر زن ۲۵ تا ۳۵", "Woman actor 25 to 35"), text("بازیگر مرد ۳۰ تا ۴۵", "Man actor 30 to 45")],
    gender: "any",
    ageRange: "25-45",
    city: text("تهران", "Tehran"),
    auditionDate: "2026-07-12",
    description: text(
      "نمایش معاصر درباره گروهی بازیگر در آخرین تمرین پیش از اجرا. نیازمند تجربه صحنه و توانایی خوانش گروهی.",
      "A contemporary play about actors in their final rehearsal before opening. Requires stage experience and ensemble reading ability.",
    ),
    status: "open",
    projectOwner: text("گروه تئاتر روشن", "Roshan Theatre Group"),
  },
  {
    id: "casting-short-rain",
    projectTitle: text("وقتی باران قطع شد", "When the Rain Stopped"),
    projectType: "shortFilm",
    requiredRoles: [text("نقش اصلی نوجوان", "Teen lead"), text("نقش مادر", "Mother role")],
    gender: "any",
    ageRange: "16-45",
    city: text("شیراز", "Shiraz"),
    auditionDate: "2026-07-18",
    description: text(
      "فیلم کوتاه مستقل با تمرکز روی سکوت، نگاه و بازی مینیمال مقابل دوربین.",
      "Independent short film focused on silence, gaze, and minimal screen acting.",
    ),
    status: "open",
    projectOwner: text("استودیو قاب کوچک", "Small Frame Studio"),
  },
  {
    id: "casting-commercial-voice",
    projectTitle: text("صدای برند آموزشی", "Educational brand voice"),
    projectType: "commercial",
    requiredRoles: [text("گوینده گرم و مطمئن", "Warm and confident narrator")],
    gender: "any",
    ageRange: "20-50",
    city: text("آنلاین", "Online"),
    auditionDate: "2026-07-05",
    description: text(
      "ضبط نمونه صدای کوتاه برای کمپین آموزشی. تجربه گویندگی یا دوبله مزیت است.",
      "Short voice sample recording for an education campaign. Narration or dubbing experience is a plus.",
    ),
    status: "closed",
    projectOwner: text("آژانس نگاه نو", "New View Agency"),
  },
];

export const castingApplications: CastingApplication[] = [
  { id: "ca-1", castingCallId: "casting-shadow-stage", userId: "user-1", status: "reviewing" },
];

export const speechExercises: SpeechExercise[] = [
  {
    id: "breathing",
    title: text("تنفس چهار مرحله‌ای", "Four-step breathing"),
    description: text("دم آرام، مکث کوتاه، بازدم کنترل‌شده و استراحت بدون فشار.", "Slow inhale, short pause, controlled exhale, and rest without pressure."),
    durationMinutes: 4,
    progress: 70,
    tone: "calm",
  },
  {
    id: "voice-stretch",
    title: text("کشش ملایم صدا", "Gentle voice stretching"),
    description: text("آواهای کوتاه و نرم برای گرم کردن بیان، بدون فشار به گلو.", "Short soft sounds to warm up articulation without throat strain."),
    durationMinutes: 5,
    progress: 45,
    tone: "focus",
  },
  {
    id: "pronunciation",
    title: text("تمرین تلفظ واژه", "Pronunciation practice"),
    description: text("خواندن آرام چند واژه با مکث و توجه به آغاز و پایان صدا.", "Slowly read a few words while noticing sound starts and endings."),
    durationMinutes: 6,
    progress: 35,
    tone: "focus",
  },
  {
    id: "slow-reading",
    title: text("خواندن آهسته", "Slow reading"),
    description: text("یک پاراگراف کوتاه را با ریتم ثابت و نفس‌های کوتاه بخوانید.", "Read a short paragraph with steady rhythm and small breaths."),
    durationMinutes: 7,
    progress: 55,
    tone: "calm",
  },
  {
    id: "confidence",
    title: text("اعتماد به بیان", "Speaking confidence"),
    description: text("یک جمله ساده را با صدای روشن و سرعت آرام تکرار کنید.", "Repeat one simple sentence with clear voice and calm pace."),
    durationMinutes: 5,
    progress: 62,
    tone: "confidence",
  },
];

export const childExercises: ChildExercise[] = [
  {
    id: "word-practice",
    title: text("تمرین واژه ساده", "Simple word practice"),
    description: text("والد یک واژه کوتاه را می‌خواند و کودک با آرامش تکرار می‌کند.", "The parent reads one short word and the child repeats calmly."),
    ageBand: "4-7",
    progress: 60,
    parentNote: text("هر پاسخ کودک را بدون فشار و با تشویق آرام بپذیرید.", "Accept each response without pressure and with gentle encouragement."),
  },
  {
    id: "sound-repeat",
    title: text("تکرار صدا", "Sound repetition"),
    description: text("تمرین بسته با چند صدای کوتاه و زمان استراحت بین هر تکرار.", "A closed exercise with a few short sounds and rest between repetitions."),
    ageBand: "4-8",
    progress: 40,
    parentNote: text("در صورت خستگی کودک، تمرین را متوقف کنید.", "Stop the exercise if the child is tired."),
  },
  {
    id: "image-selection",
    title: text("بازی انتخاب تصویر", "Image selection game"),
    description: text("کودک با راهنمایی والد تصویر مرتبط با واژه شنیده‌شده را انتخاب می‌کند.", "With parent guidance, the child selects the image matching the heard word."),
    ageBand: "5-9",
    progress: 75,
    parentNote: text("داده شخصی کودک لازم نیست؛ فقط پیشرفت کلی نمایش داده می‌شود.", "No child personal data is needed; only general progress is shown."),
  },
  {
    id: "short-sentence",
    title: text("جمله کوتاه", "Short sentence"),
    description: text("یک جمله بسیار کوتاه با ریتم آرام و تکرار محدود تمرین می‌شود.", "A very short sentence is practiced with calm rhythm and limited repetition."),
    ageBand: "6-10",
    progress: 30,
    parentNote: text("تمرین نباید تبدیل به آزمون یا فشار عملکردی شود.", "The exercise should not become a test or performance pressure."),
  },
];

export const adminStats: AdminStats = {
  totalUsers: 1240,
  totalActors: 386,
  totalCastingCalls: 42,
  totalPracticeRequests: 91,
  reportedContent: 7,
  recentActivity: [
    text("پروفایل نوا راد به‌روزرسانی شد.", "Nava Rad updated her profile."),
    text("فراخوان سایه‌های پشت صحنه منتشر شد.", "Backstage Shadows casting call was published."),
    text("یک درخواست تمرین دوبله ثبت شد.", "A dubbing practice request was created."),
    text("دو گزارش محتوا در صف بازبینی قرار گرفت.", "Two content reports entered moderation queue."),
  ],
};
