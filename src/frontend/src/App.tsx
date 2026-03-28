import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MonthData {
  month: number;
  fruit: string;
  fruitEmoji: string;
  size: string;
  weight: string;
  bodyChanges: string[];
  tips: string[];
  dietPlan: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
    nutrients: string;
  };
}

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const MONTH_DATA: MonthData[] = [
  {
    month: 1,
    fruit: "Poppy Seed",
    fruitEmoji: "🌱",
    size: "0.1 cm",
    weight: "< 1g",
    bodyChanges: [
      "Implantation occurs in uterus",
      "Hormonal surge begins (hCG rises)",
      "Possible light spotting or cramping",
      "Fatigue may set in early",
    ],
    tips: [
      "Start folic acid 400-800mcg daily",
      "Avoid alcohol, smoking, raw fish",
      "Schedule first prenatal visit",
      "Track your cycle and symptoms",
    ],
    dietPlan: {
      breakfast: "Fortified cereal with milk & berries",
      lunch: "Spinach salad with chickpeas & lemon dressing",
      dinner: "Lentil soup with whole grain bread",
      snacks: "Almonds, orange slices",
      nutrients: "Folic acid, Iron, Vitamin B6",
    },
  },
  {
    month: 2,
    fruit: "Raspberry",
    fruitEmoji: "🫐",
    size: "1.6 cm",
    weight: "1g",
    bodyChanges: [
      "Morning sickness peaks (nausea/vomiting)",
      "Breast tenderness and swelling",
      "Heightened sense of smell",
      "Frequent urination begins",
    ],
    tips: [
      "Eat small, frequent meals every 2-3 hrs",
      "Ginger tea or crackers for nausea",
      "Stay well hydrated (8-10 glasses/day)",
      "Avoid strong odors and greasy foods",
    ],
    dietPlan: {
      breakfast: "Plain crackers with peanut butter & banana",
      lunch: "Chicken broth soup with toast",
      dinner: "Steamed fish with brown rice & veggies",
      snacks: "Yogurt, apple slices with honey",
      nutrients: "Vitamin B6, Magnesium, Zinc",
    },
  },
  {
    month: 3,
    fruit: "Lime",
    fruitEmoji: "🍋",
    size: "7.4 cm",
    weight: "23g",
    bodyChanges: [
      "Nausea begins to ease for many",
      "Energy levels start returning",
      "Uterus size of an orange now",
      "Risk of miscarriage decreases significantly",
    ],
    tips: [
      "Schedule nuchal translucency scan",
      "Begin gentle prenatal yoga or walking",
      "Stay active with light exercise",
      "Share pregnancy news when comfortable",
    ],
    dietPlan: {
      breakfast: "Greek yogurt parfait with granola & fruit",
      lunch: "Whole wheat pasta with tomato & spinach",
      dinner: "Grilled chicken breast with sweet potato",
      snacks: "Walnuts, dried apricots",
      nutrients: "Calcium, Vitamin D, Protein",
    },
  },
  {
    month: 4,
    fruit: "Avocado",
    fruitEmoji: "🥑",
    size: "14 cm",
    weight: "100g",
    bodyChanges: [
      "Baby bump becomes visible",
      "Nausea mostly gone - appetite returns",
      "May feel first flutters of movement",
      "Round ligament pain as uterus grows",
    ],
    tips: [
      "Start sleeping on your side (left preferred)",
      "Use a pregnancy pillow for support",
      "Moisturize belly to prevent stretch marks",
      "Begin prenatal classes research",
    ],
    dietPlan: {
      breakfast: "Avocado toast on whole grain with poached egg",
      lunch: "Quinoa bowl with roasted vegetables & feta",
      dinner: "Salmon with asparagus and brown rice",
      snacks: "Hummus with veggie sticks, dates",
      nutrients: "Omega-3, Iron, Folate, Vitamin C",
    },
  },
  {
    month: 5,
    fruit: "Mango",
    fruitEmoji: "🥭",
    size: "25 cm",
    weight: "300g",
    bodyChanges: [
      "Clearly feel baby kicking and moving",
      "Skin changes - linea nigra appears",
      "Possible leg cramps at night",
      "Nasal congestion due to hormones",
    ],
    tips: [
      "Count fetal movements daily",
      "Do leg stretches before bed",
      "Use a humidifier for nasal congestion",
      "Consider maternity clothes now",
    ],
    dietPlan: {
      breakfast: "Smoothie with mango, spinach & protein powder",
      lunch: "Lentil dal with basmati rice & raita",
      dinner: "Turkey meatballs with zucchini noodles",
      snacks: "Mango slices, boiled eggs",
      nutrients: "Vitamin A, Iron, Potassium, Protein",
    },
  },
  {
    month: 6,
    fruit: "Corn",
    fruitEmoji: "🌽",
    size: "30 cm",
    weight: "660g",
    bodyChanges: [
      "Back pain increases as bump grows",
      "Braxton Hicks practice contractions begin",
      "Heartburn and indigestion common",
      "Swelling in feet and ankles",
    ],
    tips: [
      "Prenatal massage for back pain relief",
      "Sleep with a supportive wedge pillow",
      "Eat smaller meals to reduce heartburn",
      "Elevate feet when resting",
    ],
    dietPlan: {
      breakfast: "Oatmeal with flaxseed, honey & almonds",
      lunch: "Grilled vegetable and cheese wrap",
      dinner: "Beef stew with carrots and potatoes",
      snacks: "Cottage cheese with pineapple, crackers",
      nutrients: "Calcium, Magnesium, Fiber, Vitamin K",
    },
  },
  {
    month: 7,
    fruit: "Eggplant",
    fruitEmoji: "🍆",
    size: "36 cm",
    weight: "900g",
    bodyChanges: [
      "Shortness of breath as baby grows up",
      "More frequent Braxton Hicks",
      "Possible hemorrhoids and varicose veins",
      "Baby's kicks are strong and regular",
    ],
    tips: [
      "Attend childbirth preparation classes",
      "Start preparing your hospital bag",
      "Practice breathing exercises daily",
      "Keep track of kick counts morning & night",
    ],
    dietPlan: {
      breakfast: "Whole grain pancakes with strawberries & cream",
      lunch: "Chickpea and spinach curry with naan",
      dinner: "Grilled tilapia with mashed sweet potato",
      snacks: "Trail mix with nuts & dried berries, milk",
      nutrients: "DHA, Iron, Calcium, Vitamin D",
    },
  },
  {
    month: 8,
    fruit: "Pineapple",
    fruitEmoji: "🍍",
    size: "41 cm",
    weight: "1.8kg",
    bodyChanges: [
      "Baby drops into pelvis (lightening)",
      "Frequent urination intensifies",
      "Pelvic pressure and discomfort",
      "Possible colostrum leaking from breasts",
    ],
    tips: [
      "Finalize birth plan with your doctor",
      "Tour the maternity ward/hospital",
      "Rest as much as possible",
      "Avoid long standing or sitting periods",
    ],
    dietPlan: {
      breakfast: "Scrambled eggs with spinach & whole grain toast",
      lunch: "Bean and vegetable soup with crusty bread",
      dinner: "Baked chicken thigh with roasted broccoli",
      snacks: "Pineapple chunks, cheese and crackers",
      nutrients: "Protein, Iron, Folate, Vitamin C",
    },
  },
  {
    month: 9,
    fruit: "Watermelon",
    fruitEmoji: "🍉",
    size: "46 cm",
    weight: "2.8kg",
    bodyChanges: [
      "Cervix begins to thin and dilate",
      "Strong nesting instinct kicks in",
      "Increased pelvic pressure and pain",
      "Mucus plug may release (bloody show)",
    ],
    tips: [
      "Rest and conserve energy now",
      "Monitor contractions with a timer app",
      "Ensure hospital bag is fully packed",
      "Practice relaxation techniques daily",
    ],
    dietPlan: {
      breakfast: "Banana oat smoothie with almond butter",
      lunch: "Caesar salad with grilled shrimp",
      dinner: "Pasta with marinara, mozzarella & basil",
      snacks: "Watermelon slices, dates with almond butter",
      nutrients: "Complex carbs, Magnesium, B vitamins",
    },
  },
  {
    month: 10,
    fruit: "Pumpkin",
    fruitEmoji: "🎃",
    size: "50 cm",
    weight: "3.4kg",
    bodyChanges: [
      "Baby is full term - ready for birth!",
      "Intense pressure in pelvis and hips",
      "Water may break (amniotic fluid)",
      "True labor contractions begin (5-1-1 rule)",
    ],
    tips: [
      "Watch for 5-1-1 contraction pattern",
      "Head to hospital when contractions 5 min apart",
      "Stay calm and trust your body",
      "Stay hydrated and eat light foods",
    ],
    dietPlan: {
      breakfast: "Light oatmeal with honey - easy to digest",
      lunch: "Clear broth soup with soft vegetables",
      dinner: "Simple rice with steamed chicken",
      snacks: "Toast, bananas, light fruits only",
      nutrients: "Stay hydrated, light carbs for energy",
    },
  },
];

const SEGMENT_COLORS = [
  "#F9C6D0",
  "#FDDCB5",
  "#E8D5F5",
  "#C8E6F9",
  "#F9C6D0",
  "#FDDCB5",
  "#E8D5F5",
  "#C8E6F9",
  "#F9C6D0",
  "#FDDCB5",
];

const CURRENT_MONTH = 7;

const BABY_IMAGES = [
  "/assets/generated/baby-dev-month1-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month2-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month3-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month4-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month5-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month6-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month7-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month8-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month9-transparent.dim_120x120.png",
  "/assets/generated/baby-dev-month10-transparent.dim_120x120.png",
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="#E0524D"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.593c-.525-.438-10.5-8.6-10.5-13.093 0-3.309 2.691-6 6-6 1.893 0 3.568.882 4.5 2.25.932-1.368 2.607-2.25 4.5-2.25 3.309 0 6 2.691 6 6 0 4.493-9.975 12.655-10.5 13.093z" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="9"
        width="18"
        height="6"
        rx="3"
        fill="#8E5C9F"
        opacity="0.15"
        stroke="#8E5C9F"
        strokeWidth="1.5"
      />
      <line x1="12" y1="9" x2="12" y2="15" stroke="#8E5C9F" strokeWidth="1.5" />
      <rect
        x="3"
        y="9"
        width="9"
        height="6"
        rx="3"
        fill="#8E5C9F"
        opacity="0.4"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 6 L44 40 H4 Z"
        fill="rgba(255,255,255,0.15)"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="19"
        x2="24"
        y2="29"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="34" r="2" fill="white" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M15.5 2.5 L1 8.5 L7.5 9.5 L9 16.5 Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Circular Timeline ────────────────────────────────────────────────────────
function getSegmentPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const si = {
    x: cx + innerR * Math.cos(toRad(startAngle)),
    y: cy + innerR * Math.sin(toRad(startAngle)),
  };
  const ei = {
    x: cx + innerR * Math.cos(toRad(endAngle)),
    y: cy + innerR * Math.sin(toRad(endAngle)),
  };
  const so = {
    x: cx + outerR * Math.cos(toRad(startAngle)),
    y: cy + outerR * Math.sin(toRad(startAngle)),
  };
  const eo = {
    x: cx + outerR * Math.cos(toRad(endAngle)),
    y: cy + outerR * Math.sin(toRad(endAngle)),
  };
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${si.x} ${si.y}`,
    `L ${so.x} ${so.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${eo.x} ${eo.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${si.x} ${si.y}`,
    "Z",
  ].join(" ");
}

function MonthDetailCard({
  data,
  onClose,
}: { data: MonthData; onClose: () => void }) {
  const mealItems = [
    { label: "🌅 Breakfast", value: data.dietPlan.breakfast },
    { label: "☀️ Lunch", value: data.dietPlan.lunch },
    { label: "🌙 Dinner", value: data.dietPlan.dinner },
    { label: "🍎 Snacks", value: data.dietPlan.snacks },
  ];

  return (
    <div
      className="animate-fade-in bg-white rounded-2xl p-5"
      style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.15)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold" style={{ color: "#2B1F3A" }}>
          Month {data.month} Details
        </h3>
        <button
          type="button"
          data-ocid="timeline.close_button"
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
          style={{ color: "#7A7386" }}
        >
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M1 1 L13 13 M13 1 L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Baby Size Section */}
      <div
        className="flex items-center gap-4 mb-4 p-4 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #F8F4FB 0%, #EDE0FA 100%)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "white",
            boxShadow: "0 4px 16px rgba(142,92,159,0.18)",
          }}
        >
          <img
            src={BABY_IMAGES[data.month - 1]}
            alt={`Baby at month ${data.month}`}
            width={64}
            height={64}
            style={{ objectFit: "contain" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{data.fruitEmoji}</span>
            <p className="font-bold text-base" style={{ color: "#8E5C9F" }}>
              Size of a {data.fruit}
            </p>
          </div>
          <div className="flex gap-3">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: "#E8D5F5", color: "#8E5C9F" }}
            >
              📏 {data.size}
            </span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: "#E8D5F5", color: "#8E5C9F" }}
            >
              ⚖️ {data.weight}
            </span>
          </div>
        </div>
      </div>

      {/* Body Changes */}
      <div className="mb-4 p-4 rounded-2xl" style={{ background: "#F8F4FB" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#8E5C9F" }}
        >
          <span>🤰</span> Body Changes
        </p>
        <ul className="space-y-2">
          {data.bodyChanges.map((change) => (
            <li key={change} className="flex items-start gap-2">
              <span
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: "#C07FD8" }}
              />
              <span className="text-sm" style={{ color: "#5B5566" }}>
                {change}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Health Tips */}
      <div className="mb-4 p-4 rounded-2xl" style={{ background: "#F0FAF7" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#2A9D6A" }}
        >
          <span>💡</span> Health Tips
        </p>
        <ul className="space-y-2">
          {data.tips.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-green-500 flex-shrink-0 mt-0.5 font-bold">
                ✓
              </span>
              <span className="text-sm" style={{ color: "#5B5566" }}>
                {tip}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Diet Plan */}
      <div className="p-4 rounded-2xl" style={{ background: "#FFF8F0" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "#D4821A" }}
        >
          <span>🥗</span> Monthly Diet Plan
        </p>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {mealItems.map((meal) => (
            <div
              key={meal.label}
              className="p-3 rounded-xl"
              style={{
                background: "white",
                boxShadow: "0 2px 8px rgba(212,130,26,0.08)",
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: "#D4821A" }}
              >
                {meal.label}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#5B5566" }}
              >
                {meal.value}
              </p>
            </div>
          ))}
        </div>
        <div
          className="px-3 py-2 rounded-full text-center"
          style={{
            background: "linear-gradient(90deg, #FDE8C8 0%, #FDDCB5 100%)",
          }}
        >
          <span className="text-xs font-semibold" style={{ color: "#A05A1A" }}>
            🌟 Key Nutrients: {data.dietPlan.nutrients}
          </span>
        </div>
      </div>
    </div>
  );
}

function Baby3DModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const autoSpin = useRef(true);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    const body = groupRef.current.children[1] as THREE.Mesh;
    if (body) {
      body.scale.y = 1 + Math.sin(t * 1.8) * 0.03;
    }

    const head = groupRef.current.children[0] as THREE.Mesh;
    if (head && !isDragging.current) {
      head.rotation.y = Math.sin(t * 0.9) * 0.12;
      head.rotation.z = Math.sin(t * 0.6) * 0.04;
    }

    if (autoSpin.current && !isDragging.current) {
      groupRef.current.rotation.y += 0.008;
    }
  });

  const skin = "#FFDAB9";
  const darkSkin = "#F5C5A3";
  const eyeColor = "#3D2B1F";

  const pointerDown = (e: {
    clientX: number;
    clientY: number;
    pointerId: number;
    target: EventTarget | null;
  }) => {
    isDragging.current = true;
    autoSpin.current = false;
    prevPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
  };

  const pointerMove = (e: { clientX: number; clientY: number }) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - prevPointer.current.x;
    const dy = e.clientY - prevPointer.current.y;
    groupRef.current.rotation.y += dx * 0.012;
    groupRef.current.rotation.x += dy * 0.012;
    groupRef.current.rotation.x = Math.max(
      -1.2,
      Math.min(1.2, groupRef.current.rotation.x),
    );
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const pointerUp = () => {
    isDragging.current = false;
    setTimeout(() => {
      autoSpin.current = true;
    }, 1200);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerLeave={pointerUp}
    >
      {/* Head */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[0.44, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.0, 0]}>
        <capsuleGeometry args={[0.28, 0.55, 16, 32]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Left ear */}
      <mesh position={[-0.44, 0.72, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={darkSkin} roughness={0.6} />
      </mesh>

      {/* Right ear */}
      <mesh position={[0.44, 0.72, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={darkSkin} roughness={0.6} />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.15, 0.78, 0.38]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color={eyeColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Right eye */}
      <mesh position={[0.15, 0.78, 0.38]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial
          color={eyeColor}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0.68, 0.43]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color={darkSkin} roughness={0.7} />
      </mesh>

      {/* Tummy bump */}
      <mesh position={[0, 0.06, 0.24]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.38, 0.18, 0]} rotation={[0, 0, 0.7]}>
        <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.38, 0.18, 0]} rotation={[0, 0, -0.7]}>
        <capsuleGeometry args={[0.09, 0.35, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.16, -0.62, 0]} rotation={[0.15, 0, 0.1]}>
        <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.16, -0.62, 0]} rotation={[0.15, 0, -0.1]}>
        <capsuleGeometry args={[0.1, 0.32, 8, 16]} />
        <meshStandardMaterial color={skin} roughness={0.6} />
      </mesh>

      {/* Left foot */}
      <mesh position={[-0.17, -0.88, 0.08]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={darkSkin} roughness={0.6} />
      </mesh>

      {/* Right foot */}
      <mesh position={[0.17, -0.88, 0.08]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color={darkSkin} roughness={0.6} />
      </mesh>
    </group>
  );
}

function Baby360Viewer() {
  return (
    <div
      className="bg-white rounded-2xl p-5 mb-6"
      style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-bold text-base" style={{ color: "#2B1F3A" }}>
            Baby at Month {CURRENT_MONTH}
          </p>
          <p className="text-xs" style={{ color: "#7A7386" }}>
            Drag to explore 360°
          </p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: "#E8D5F5", color: "#8E5C9F" }}
        >
          360°
        </span>
      </div>
      <div className="flex flex-col items-center select-none">
        <div
          style={{
            width: 240,
            height: 280,
            borderRadius: 20,
            background: "linear-gradient(135deg, #F8F4FB 0%, #EDE0FA 100%)",
            boxShadow: "0 4px 20px rgba(142,92,159,0.2)",
            overflow: "hidden",
            cursor: "grab",
          }}
        >
          <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={1.0} />
            <directionalLight
              position={[-5, 2, -3]}
              intensity={0.3}
              color="#E8D5F5"
            />
            <Baby3DModel />
          </Canvas>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs" style={{ color: "#CDB9E9" }}>
            ← drag to rotate →
          </span>
        </div>
      </div>
    </div>
  );
}

function CircularTimeline({
  selectedMonth,
  setSelectedMonth,
}: {
  selectedMonth: number | null;
  setSelectedMonth: (m: number | null) => void;
}) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const cx = 200;
  const cy = 200;
  const innerR = 90;
  const outerR = 175;
  const labelR = 140;
  const illustR = 118;
  const segmentAngle = 36;
  const startOffset = -90;

  const progressCircumference = 2 * Math.PI * 185;
  const progressDash = progressCircumference * 0.7;

  return (
    <div id="timeline" className="mb-8">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#2B1F3A" }}>
        Pregnancy Timeline
      </h2>
      <div
        className="bg-white rounded-2xl p-4"
        style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          width="100%"
          style={{ display: "block", maxWidth: "400px", margin: "0 auto" }}
        >
          <defs>
            <filter
              id="glowFilter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {SEGMENT_COLORS.map((color, i) => {
              const gradId = `grad${i}`;
              return (
                <radialGradient
                  key={gradId}
                  id={gradId}
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor={color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.6" />
                </radialGradient>
              );
            })}
            {MONTH_DATA.map((md, i) => {
              const toRad = (deg: number) => (deg * Math.PI) / 180;
              const startOffset = -90;
              const segmentAngle = 36;
              const illustR = 118;
              const cx2 = 200;
              const cy2 = 200;
              const midAngle =
                startOffset + i * segmentAngle + segmentAngle / 2;
              const ix = cx2 + illustR * Math.cos(toRad(midAngle));
              const iy = cy2 + illustR * Math.sin(toRad(midAngle));
              const r = md.month === 6 ? 16 : 14;
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: stable index-based SVG clip IDs
                <clipPath key={`clip${i}`} id={`imgClip${i}`}>
                  <circle cx={ix} cy={iy} r={r} />
                </clipPath>
              );
            })}
            <clipPath id="centerClip">
              <circle cx="200" cy="200" r="26" />
            </clipPath>
          </defs>

          {/* Outer progress ring */}
          <circle
            cx={cx}
            cy={cy}
            r={185}
            fill="none"
            stroke="#E8DDF7"
            strokeWidth={4}
          />
          <circle
            cx={cx}
            cy={cy}
            r={185}
            fill="none"
            stroke="#8E5C9F"
            strokeWidth={4}
            strokeDasharray={`${progressDash} ${progressCircumference}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />

          {/* Segments */}
          {MONTH_DATA.map((md, i) => {
            const startAngle = startOffset + i * segmentAngle;
            const endAngle = startAngle + segmentAngle - 1.5;
            const midAngle = startAngle + segmentAngle / 2;
            const toRad = (deg: number) => (deg * Math.PI) / 180;
            const lx = cx + labelR * Math.cos(toRad(midAngle));
            const ly = cy + labelR * Math.sin(toRad(midAngle));
            const ix = cx + illustR * Math.cos(toRad(midAngle));
            const iy = cy + illustR * Math.sin(toRad(midAngle));
            const isCurrent = md.month === CURRENT_MONTH;
            const isHovered = hoveredMonth === i;
            const path = getSegmentPath(
              cx,
              cy,
              innerR,
              outerR,
              startAngle,
              endAngle,
            );
            const scale = isHovered ? 1.04 : 1;

            return (
              <g
                key={md.month}
                tabIndex={0}
                style={{
                  cursor: "pointer",
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: `scale(${scale})`,
                  transition: "transform 0.2s ease",
                }}
                className={isCurrent ? "segment-current" : ""}
                onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedMonth(selectedMonth === i ? null : i);
                }}
                onMouseEnter={() => setHoveredMonth(i)}
                onMouseLeave={() => setHoveredMonth(null)}
                data-ocid={`timeline.item.${i + 1}`}
              >
                <path
                  d={path}
                  fill={`url(#grad${i})`}
                  stroke="white"
                  strokeWidth={isCurrent ? 2.5 : 1.5}
                  filter={isCurrent ? "url(#glowFilter)" : undefined}
                />
                {isCurrent && (
                  <path
                    d={path}
                    fill="none"
                    stroke="#8E5C9F"
                    strokeWidth={2.5}
                    opacity={0.6}
                  />
                )}
                <text
                  x={lx}
                  y={ly + 4}
                  textAnchor="middle"
                  fontSize={isCurrent ? "11" : "9.5"}
                  fontWeight={isCurrent ? "700" : "500"}
                  fill={isCurrent ? "#8E5C9F" : "#5B5566"}
                  style={{ pointerEvents: "none" }}
                >
                  M{md.month}
                </text>
                <circle
                  cx={ix}
                  cy={iy}
                  r={isCurrent ? 16 : 14}
                  fill="white"
                  style={{ pointerEvents: "none" }}
                />
                <image
                  href={BABY_IMAGES[i]}
                  x={isCurrent ? ix - 16 : ix - 14}
                  y={isCurrent ? iy - 16 : iy - 14}
                  width={isCurrent ? 32 : 28}
                  height={isCurrent ? 32 : 28}
                  style={{ pointerEvents: "none" }}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#imgClip${i})`}
                />
              </g>
            );
          })}

          {/* Center circle */}
          <circle
            cx={cx}
            cy={cy}
            r={82}
            fill="white"
            filter="url(#glowFilter)"
          />
          <circle cx={cx} cy={cy} r={78} fill="white" />
          <image
            href={BABY_IMAGES[CURRENT_MONTH - 1]}
            x={cx - 28}
            y={cy - 72}
            width={56}
            height={56}
            preserveAspectRatio="xMidYMid meet"
          />
          <text
            x={cx}
            y={cy - 10}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#8E5C9F"
          >
            Month {CURRENT_MONTH}
          </text>
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fontSize="11"
            fill="#7A7386"
          >
            Week 24
          </text>
          <text
            x={cx}
            y={cy + 26}
            textAnchor="middle"
            fontSize="9.5"
            fill="#CDB9E9"
          >
            112 days left
          </text>
        </svg>

        <p
          className="text-center text-xs mt-2 mb-1"
          style={{ color: "#7A7386" }}
        >
          Tap a segment to see month details
        </p>
      </div>
    </div>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────
function NavBar() {
  return (
    <nav
      className="sticky top-0 z-50 bg-white px-4 py-2"
      style={{ boxShadow: "0 2px 12px rgba(142,92,159,0.1)" }}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/assets/uploads/whatsapp_image_2026-03-27_at_12.21.23_pm-019d34a7-f0a0-7105-9a66-fca6a07c17fc-1.jpeg"
            alt="Mothera – Maternal Health Care"
            className="h-14 w-auto object-contain"
          />
          <span className="font-bold text-xl" style={{ color: "#8E5C9F" }}>
            Mothera
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {["Dashboard", "Timeline", "Wellness", "Connect"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-ocid={`nav.link.${i + 1}`}
              className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                i === 0
                  ? { background: "#E8D5F5", color: "#8E5C9F" }
                  : { color: "#7A7386" }
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Header({
  selectedMonth: _selectedMonth,
}: { selectedMonth: number | null }) {
  return (
    <div id="dashboard" className="mb-6 pt-6">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-3xl font-extrabold" style={{ color: "#2B1F3A" }}>
          Hello, Mom
        </h1>
        <HeartIcon className="w-7 h-7" />
      </div>
    </div>
  );
}

function PregnancyTracker() {
  const [progress, setProgress] = useState(0);
  const targetProgress = 60;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(targetProgress), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-white rounded-2xl p-5 mb-6"
      style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
    >
      <p className="text-sm font-semibold mb-2" style={{ color: "#7A7386" }}>
        Pregnancy Tracker
      </p>
      <p
        className="text-3xl font-extrabold mb-0.5"
        style={{ color: "#8E5C9F" }}
      >
        Week 24 of 40
      </p>
      <p className="text-sm mb-4" style={{ color: "#7A7386" }}>
        112 days remaining
      </p>
      <div
        className="relative h-3 rounded-full overflow-hidden mb-2"
        style={{ background: "#F0E8FA" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #8E5C9F, #C8E6F9)",
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xs" style={{ color: "#CDB9E9" }}>
          Conception
        </span>
        <span className="text-xs font-medium" style={{ color: "#8E5C9F" }}>
          {progress}% complete
        </span>
        <span className="text-xs" style={{ color: "#CDB9E9" }}>
          Due Date
        </span>
      </div>
    </div>
  );
}

// ─── Medicine Reminder Types ─────────────────────────────────────────────────
interface MedicineEntry {
  id: number;
  name: string;
  amount: number | "";
  times: string[];
  whenToTake: "before" | "after" | "";
}

let medicineIdCounter = 1;

function MedicineReminderPanel({
  onSave,
  onSaveWithCount,
}: {
  onSave?: () => void;
  onSaveWithCount?: (entries: MedicineEntry[]) => void;
}) {
  const [entries, setEntries] = useState<MedicineEntry[]>([
    {
      id: medicineIdCounter++,
      name: "",
      amount: "",
      times: [],
      whenToTake: "",
    },
  ]);
  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());

  const markDone = (id: number) => setDoneIds((prev) => new Set([...prev, id]));
  const unmarkDone = (id: number) =>
    setDoneIds((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });

  const addEntry = () => {
    setEntries((prev) => [
      ...prev,
      {
        id: medicineIdCounter++,
        name: "",
        amount: "",
        times: [],
        whenToTake: "",
      },
    ]);
  };

  const removeEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateName = (id: number, name: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, name } : e)));
  };

  const updateAmount = (id: number, amount: number | "") => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, amount } : e)));
  };

  const toggleTime = (id: number, time: string) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              times: e.times.includes(time)
                ? e.times.filter((t) => t !== time)
                : [...e.times, time],
            }
          : e,
      ),
    );
  };

  const setWhen = (id: number, whenToTake: "before" | "after") => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, whenToTake } : e)),
    );
  };

  const timeOptions = ["Morning", "Afternoon", "Night"];

  return (
    <div
      className="rounded-b-2xl px-4 pb-4 pt-3"
      style={{ background: "#F8F2FF", borderTop: "1px solid #E8D5F5" }}
    >
      {entries.map((entry, idx) => (
        <div key={entry.id}>
          {idx > 0 && (
            <div className="my-3" style={{ borderTop: "1px dashed #CDB9E9" }} />
          )}
          {doneIds.has(entry.id) ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <div className="relative" style={{ width: 90, height: 90 }}>
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  aria-hidden="true"
                >
                  <circle
                    cx="45"
                    cy="45"
                    r={36}
                    fill="none"
                    stroke="#E8D5F5"
                    strokeWidth="8"
                  />
                  <circle
                    cx="45"
                    cy="45"
                    r={36}
                    fill="none"
                    stroke="#8E5C9F"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                    strokeDashoffset={2 * Math.PI * 36 * 0.25}
                    style={{ transition: "stroke-dasharray 0.5s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
                  <span
                    className="font-bold leading-tight"
                    style={{
                      color: "#2B1F3A",
                      fontSize:
                        entry.name.length > 8
                          ? "8px"
                          : entry.name.length > 5
                            ? "9px"
                            : "11px",
                      maxWidth: "64px",
                      wordBreak: "break-word",
                    }}
                  >
                    {entry.name || "Medicine"}
                  </span>
                  {typeof entry.amount === "number" && entry.amount > 0 && (
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "#8E5C9F", marginTop: "2px" }}
                    >
                      ×{entry.amount}
                    </span>
                  )}
                </div>
              </div>
              {entry.times.length > 0 && (
                <p className="text-xs text-center" style={{ color: "#7A7386" }}>
                  {entry.times.join(", ")}
                  {entry.whenToTake ? ` · ${entry.whenToTake} food` : ""}
                </p>
              )}
              <button
                type="button"
                onClick={() => unmarkDone(entry.id)}
                className="text-xs font-semibold mt-1"
                style={{ color: "#8E5C9F" }}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "#8E5C9F" }}
                >
                  Medicine {idx + 1}
                </span>
                {entries.length > 1 && (
                  <button
                    type="button"
                    data-ocid={`medicine.delete_button.${idx + 1}`}
                    onClick={() => removeEntry(entry.id)}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "#F0E8FA", color: "#8E5C9F" }}
                    aria-label="Remove medicine"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 2l8 8M10 2l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Medicine name input */}
              <input
                type="text"
                data-ocid={`medicine.input.${idx + 1}`}
                value={entry.name}
                onChange={(e) => updateName(entry.id, e.target.value)}
                placeholder="Medicine name..."
                className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#fff",
                  border: "1.5px solid #E8D5F5",
                  color: "#2B1F3A",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#8E5C9F";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(142,92,159,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E8D5F5";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {/* Amount input */}
              <input
                type="number"
                min="1"
                value={entry.amount}
                onChange={(e) =>
                  updateAmount(
                    entry.id,
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="Amount (e.g. 1, 2)..."
                className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#fff",
                  border: "1.5px solid #E8D5F5",
                  color: "#2B1F3A",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#8E5C9F";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(142,92,159,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E8D5F5";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {/* Time of day checkboxes */}
              <div>
                <p
                  className="text-xs font-semibold mb-1.5"
                  style={{ color: "#7A7386" }}
                >
                  Time of Day
                </p>
                <div className="flex gap-3 flex-wrap">
                  {timeOptions.map((time) => {
                    const checked = entry.times.includes(time);
                    return (
                      <label
                        key={time}
                        data-ocid={`medicine.checkbox.${idx + 1}`}
                        className="flex items-center gap-1.5 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleTime(entry.id, time)}
                          aria-label={time}
                        />
                        <span
                          className="w-4.5 h-4.5 rounded flex items-center justify-center transition-all"
                          style={{
                            width: "18px",
                            height: "18px",
                            background: checked ? "#8E5C9F" : "#fff",
                            border: checked ? "none" : "1.5px solid #CDB9E9",
                            flexShrink: 0,
                          }}
                        >
                          {checked && (
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M1 4l3 3 5-6"
                                stroke="#fff"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{ color: checked ? "#8E5C9F" : "#7A7386" }}
                        >
                          {time}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* When to take radio */}
              <div>
                <p
                  className="text-xs font-semibold mb-1.5"
                  style={{ color: "#7A7386" }}
                >
                  When to Take
                </p>
                <div className="flex gap-4">
                  {(["before", "after"] as const).map((option) => {
                    const selected = entry.whenToTake === option;
                    return (
                      <label
                        key={option}
                        data-ocid={`medicine.radio.${idx + 1}`}
                        className="flex items-center gap-1.5 cursor-pointer select-none"
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          checked={selected}
                          onChange={() => setWhen(entry.id, option)}
                          name={`whenToTake-${entry.id}`}
                          aria-label={`${option} food`}
                        />
                        <span
                          className="rounded-full flex items-center justify-center transition-all"
                          style={{
                            width: "18px",
                            height: "18px",
                            border: selected ? "none" : "1.5px solid #CDB9E9",
                            background: selected ? "#8E5C9F" : "#fff",
                            flexShrink: 0,
                          }}
                        >
                          {selected && (
                            <span
                              className="rounded-full bg-white"
                              style={{ width: "7px", height: "7px" }}
                            />
                          )}
                        </span>
                        <span
                          className="text-xs font-medium capitalize"
                          style={{ color: selected ? "#8E5C9F" : "#7A7386" }}
                        >
                          {option} Food
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  data-ocid={`medicine.save_button.${idx + 1}`}
                  onClick={() => markDone(entry.id)}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#8E5C9F", color: "#fff" }}
                >
                  Done ✓
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add medicine button */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          data-ocid="medicine.primary_button"
          onClick={addEntry}
          className="w-full py-2 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
          style={{
            background: "#F0E8FA",
            color: "#8E5C9F",
            border: "1.5px solid #CDB9E9",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Another Medicine
        </button>
        {onSave && (
          <button
            type="button"
            data-ocid="medicine.save_button"
            onClick={() => {
              onSaveWithCount ? onSaveWithCount(entries) : onSave?.();
            }}
            className="w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #8E5C9F, #CDB9E9)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(142,92,159,0.25)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 7l3.5 3.5L12 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Save Reminders
          </button>
        )}
      </div>
    </div>
  );
}

function MedicineReminderModule() {
  const [enabled, setEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const [savedEntries, setSavedEntries] = useState<MedicineEntry[]>([]);

  const handleSave = (entries: MedicineEntry[]) => {
    setSavedEntries(entries);
    setSaved(true);
  };

  return (
    <div id="medicine-reminder" className="mb-6">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#2B1F3A" }}>
        Medicine Reminder
      </h2>
      <div
        className="bg-white overflow-hidden"
        style={{
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(142,92,159,0.1)",
        }}
      >
        {/* Toggle row */}
        <div className="p-4 flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "#F0E8FA" }}
          >
            <PillIcon />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: "#2B1F3A" }}>
              Medicine Reminder
            </p>
            <p className="text-xs" style={{ color: "#7A7386" }}>
              Track &amp; schedule your medicines
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold"
              style={{ color: enabled ? "#8E5C9F" : "#CDB9E9" }}
            >
              {enabled ? "ON" : "OFF"}
            </span>
            <button
              type="button"
              data-ocid="medicine_reminder.toggle"
              onClick={() => {
                setEnabled((v) => !v);
                setSaved(false);
              }}
              className="relative w-12 h-6 rounded-full transition-all duration-300"
              style={{ background: enabled ? "#8E5C9F" : "#E8D5F5" }}
              aria-label="Toggle Medicine Reminder"
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
                style={{
                  left: enabled ? "calc(100% - 22px)" : "2px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              />
            </button>
          </div>
        </div>

        {/* Expanded content */}
        {enabled && !saved && (
          <MedicineReminderPanelWithCount onSave={handleSave} />
        )}

        {/* Summary view after save - circular trackers */}
        {enabled && saved && (
          <div
            className="px-4 pb-4 pt-3"
            style={{ background: "#F8F2FF", borderTop: "1px solid #E8D5F5" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "#8E5C9F" }}
              >
                Medicine Trackers
              </span>
              <button
                type="button"
                data-ocid="medicine_reminder.edit_button"
                onClick={() => setSaved(false)}
                className="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: "#F0E8FA",
                  color: "#8E5C9F",
                  border: "1.5px solid #CDB9E9",
                }}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {savedEntries.map((med) => {
                const _total =
                  typeof med.amount === "number" && med.amount > 0
                    ? med.amount
                    : 1;
                const r = 36;
                const circ = 2 * Math.PI * r;
                const dashFill = circ;
                const timesLabel =
                  med.times.length > 0 ? med.times.join(", ") : "—";
                const whenLabel = med.whenToTake
                  ? `${med.whenToTake} food`
                  : "";
                return (
                  <div
                    key={med.id}
                    className="flex flex-col items-center gap-2"
                    style={{ minWidth: "90px" }}
                  >
                    <div className="relative" style={{ width: 90, height: 90 }}>
                      <svg
                        width="90"
                        height="90"
                        viewBox="0 0 90 90"
                        aria-hidden="true"
                      >
                        <circle
                          cx="45"
                          cy="45"
                          r={r}
                          fill="none"
                          stroke="#E8D5F5"
                          strokeWidth="8"
                        />
                        <circle
                          cx="45"
                          cy="45"
                          r={r}
                          fill="none"
                          stroke="#8E5C9F"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${dashFill} ${circ}`}
                          strokeDashoffset={circ * 0.25}
                          style={{ transition: "stroke-dasharray 0.5s ease" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
                        <span
                          className="font-bold leading-tight"
                          style={{
                            color: "#2B1F3A",
                            fontSize:
                              med.name.length > 8
                                ? "8px"
                                : med.name.length > 5
                                  ? "9px"
                                  : "11px",
                            maxWidth: "64px",
                            wordBreak: "break-word",
                            lineHeight: "1.2",
                          }}
                        >
                          {med.name || "Medicine"}
                        </span>
                        {typeof med.amount === "number" && med.amount > 0 && (
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "#8E5C9F", marginTop: "2px" }}
                          >
                            ×{med.amount}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#8E5C9F" }}
                      >
                        {timesLabel}
                      </p>
                      {whenLabel && (
                        <p className="text-xs" style={{ color: "#7A7386" }}>
                          {whenLabel}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p
              className="text-xs text-center mt-3"
              style={{ color: "#7A7386" }}
            >
              {savedEntries.length} medicine
              {savedEntries.length !== 1 ? "s" : ""} scheduled · Tap Edit to
              update
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MedicineReminderPanelWithCount({
  onSave,
}: { onSave: (entries: MedicineEntry[]) => void }) {
  return <MedicineReminderPanel onSaveWithCount={onSave} />;
}

function EmergencySOS() {
  return (
    <div
      className="rounded-2xl p-5 mb-6"
      style={{ background: "linear-gradient(135deg, #8E5C9F, #C0392B)" }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <WarningIcon />
        <div>
          <h2 className="text-xl font-bold text-white">Emergency Assistance</h2>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Call ambulance and notify emergency contacts
          </p>
        </div>
        <button
          type="button"
          data-ocid="emergency.primary_button"
          onClick={() => {
            window.location.href = "tel:+917538835169";
          }}
          className="px-8 py-3 rounded-full font-bold text-white text-lg mt-1 animate-pulse-red cursor-pointer transition-transform hover:scale-105"
          style={{ background: "#E0524D" }}
        >
          Call Now
        </button>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
          Or call 108 directly
        </p>
      </div>
    </div>
  );
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hello! I'm Tina, your Mothera Pregnancy Assistant 💜 I'm here to support you through every step of your pregnancy. Ask me about symptoms, nutrition, sleep, exercises, or anything on your mind!",
    timestamp: new Date(),
  },
];

function getAIResponse(input: string): string {
  const msg = input.toLowerCase();
  if (msg.includes("back pain") || msg.includes("backache"))
    return "Back pain is very common in pregnancy, especially after week 20. Try: sleeping on your left side with a pillow between knees, gentle cat-cow stretches, prenatal yoga, and warm compresses. Avoid lying flat on your back. If pain is severe or sharp, consult your doctor.";
  if (
    msg.includes("nausea") ||
    msg.includes("morning sickness") ||
    msg.includes("vomit")
  )
    return "Morning sickness usually peaks around week 8-10 and eases by week 14. Tips: eat small meals every 2-3 hours, keep plain crackers by your bed, try ginger tea or ginger chews, stay hydrated with sips of cold water, and avoid strong smells. If you can't keep food down for 24+ hours, call your doctor.";
  if (
    msg.includes("kick") ||
    msg.includes("movement") ||
    msg.includes("baby moving")
  )
    return "You'll typically feel baby movements (quickening) between weeks 16-25. By week 28, count fetal kicks — you should feel at least 10 movements in 2 hours. Movements may feel like flutters, rolls, or jabs. If you notice a significant decrease in movement, contact your doctor right away.";
  if (
    msg.includes("food") ||
    msg.includes("eat") ||
    msg.includes("diet") ||
    msg.includes("nutrition")
  )
    return "Focus on: 🥦 Leafy greens for folate & iron, 🐟 Fatty fish (salmon, sardines) twice a week for DHA, 🥚 Eggs for protein & choline, 🫘 Legumes for fiber & folate, 🥛 Dairy for calcium, 🌾 Whole grains for energy. Avoid: raw fish, unpasteurized cheese, deli meats, and excess caffeine (max 200mg/day).";
  if (
    msg.includes("sleep") ||
    msg.includes("insomnia") ||
    msg.includes("tired")
  )
    return "Sleep challenges are normal in pregnancy. Tips: sleep on your left side to improve circulation, use a pregnancy pillow (U-shaped works great), keep a cool room (65-68°F), avoid screens 1 hour before bed, try a warm bath before sleeping, and limit fluids 2 hours before bedtime to reduce night trips.";
  if (
    msg.includes("exercise") ||
    msg.includes("yoga") ||
    msg.includes("workout") ||
    msg.includes("swim")
  )
    return "Exercise is safe and beneficial during pregnancy! Recommended: walking (30 min/day), prenatal yoga, swimming, light strength training. Avoid: contact sports, hot yoga, exercises lying flat on back after week 16, heavy lifting. Always warm up, stay hydrated, and stop if you feel dizzy, short of breath, or have pain.";
  if (
    msg.includes("swollen") ||
    msg.includes("swelling") ||
    msg.includes("feet") ||
    msg.includes("ankles")
  )
    return "Mild swelling (edema) in feet and ankles is normal, especially in the third trimester. Help: elevate feet when resting, stay hydrated, avoid standing for long periods, wear comfortable shoes, sleep on your left side. ⚠️ See your doctor immediately if swelling is sudden, severe, or in your face/hands — this can be a sign of preeclampsia.";
  if (
    msg.includes("heartburn") ||
    msg.includes("acid") ||
    msg.includes("indigestion")
  )
    return "Heartburn is very common as your uterus grows and pushes on your stomach. Try: eating small meals, avoiding spicy/fatty foods, not lying down within 2-3 hours of eating, sleeping with head elevated, and antacids (Tums) which are safe in pregnancy. Talk to your doctor if it's severe.";
  if (
    msg.includes("vitamin") ||
    msg.includes("supplement") ||
    msg.includes("folic")
  )
    return "Essential supplements during pregnancy: ✅ Folic acid (400-800mcg) — prevents neural tube defects, ✅ Iron (27mg) — supports blood production, ✅ Calcium (1000mg) — for baby's bones, ✅ Vitamin D (600 IU) — absorbed with calcium, ✅ DHA/Omega-3 — for brain development, ✅ Prenatal multivitamin. Always take with your doctor's guidance.";
  if (
    msg.includes("contraction") ||
    msg.includes("labor") ||
    msg.includes("birth")
  )
    return "Know the 5-1-1 rule for true labor: contractions every 5 minutes, lasting 1 minute each, for at least 1 hour. Before that, you may have Braxton Hicks (practice) contractions — they're irregular and ease with movement. Also watch for: water breaking, bloody show, or strong pelvic pressure. Have your hospital bag ready after week 36!";
  if (
    msg.includes("stress") ||
    msg.includes("anxiety") ||
    msg.includes("worried") ||
    msg.includes("nervous")
  )
    return "It's completely normal to feel anxious during pregnancy. Some helpful strategies: deep breathing (4-7-8 technique), prenatal meditation apps, talking to a therapist, joining pregnancy support groups, journaling your feelings, and sharing concerns with your partner. Chronic stress can affect baby — please reach out to your doctor if anxiety feels overwhelming.";
  if (msg.includes("week") || msg.includes("trimester"))
    return "Pregnancy is divided into 3 trimesters: 🌱 First (weeks 1-12): Baby's organs form, morning sickness peaks. 🌿 Second (weeks 13-26): Energy returns, baby bump shows, feel movements. 🌸 Third (weeks 27-40): Baby grows rapidly, prepare for birth. Each trimester has different challenges and milestones!";
  if (
    msg.includes("doctor") ||
    msg.includes("checkup") ||
    msg.includes("appointment") ||
    msg.includes("visit")
  )
    return "Standard prenatal visit schedule: Weeks 4-28 → monthly visits, Weeks 28-36 → every 2 weeks, Weeks 36-40 → weekly visits. Key tests: first trimester screening (10-13 weeks), anatomy scan (18-20 weeks), glucose test (24-28 weeks), Group B strep (35-37 weeks). Never miss appointments — they're crucial for you and baby's health!";
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey"))
    return "Hello! 👋 I'm Tina, your Mothera Pregnancy Assistant. I'm here to support you through your pregnancy journey. You can ask me about symptoms, nutrition, exercises, what to expect each trimester, or anything else on your mind. How are you feeling today?";
  if (msg.includes("thank") || msg.includes("thanks"))
    return "You're so welcome! 💜 Remember, you're doing an amazing job. Growing a human is hard work! I'm always here whenever you have questions or just need reassurance. Take care of yourself! 🌸";
  if (msg.includes("sleep tip") || msg.includes("sleep tips"))
    return "For better pregnancy sleep: 😴 Use a U-shaped pregnancy pillow, 🌡️ Keep room cool (65-68°F), 📵 No screens 1hr before bed, 🛁 Warm bath before sleeping, 💧 Limit fluids 2hrs before bed, 🧘 Try relaxation breathing. Left-side sleeping improves blood flow to baby!";
  const defaults = [
    "That's a great question! Could you tell me more about what you're experiencing? I want to give you the most helpful advice possible. 💜",
    "Every pregnancy is unique, and it's wonderful that you're being so attentive to your health. For specific medical concerns, always consult your OB or midwife — but I'm here to offer general guidance and support!",
    "I'm here to help! While I can offer general pregnancy guidance, remember that your healthcare provider knows your specific situation best. Is there something particular you'd like to know more about?",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

const QUICK_REPLIES = [
  { label: "😴 Sleep tips", message: "Give me sleep tips for pregnancy" },
  {
    label: "🥗 What to eat",
    message: "What foods should I eat during pregnancy",
  },
  {
    label: "🏃 Safe exercises",
    message: "What exercises are safe during pregnancy",
  },
  {
    label: "🤢 Nausea relief",
    message: "How to relieve nausea and morning sickness",
  },
];

const LOGO_SRC =
  "/assets/uploads/whatsapp_image_2026-03-27_at_12.21.23_pm-019d34a7-f0a0-7105-9a66-fca6a07c17fc-1.jpeg";

function AIChat({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const nextIdRef = useRef(INITIAL_MESSAGES.length + 1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    const userMsg: Message = {
      id: nextIdRef.current,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    nextIdRef.current += 1;
    setInputValue("");
    setHasSentMessage(true);
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: nextIdRef.current,
        role: "ai",
        text: getAIResponse(trimmed),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      nextIdRef.current += 1;
      setIsTyping(false);
      if (voiceEnabled && "speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(aiMsg.text);
        utter.lang = "en-US";
        utter.rate = 0.9;
        utter.pitch = 1.1;
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(
          (v) => v.lang.startsWith("en") && /female/i.test(v.name),
        );
        if (femaleVoice) utter.voice = femaleVoice;
        utter.onstart = () => setIsSpeaking(true);
        utter.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utter);
      }
    }, 1200);
  };

  const startListening = () => {
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setIsListening(false);
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const hasSpeechSupport =
    typeof window !== "undefined" &&
    !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );

  const sendMessage = () => handleSend(inputValue);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef is stable
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: "linear-gradient(135deg, #8E5C9F 0%, #B07CC6 100%)",
        }}
      >
        <div className="relative flex-shrink-0">
          <img
            src={LOGO_SRC}
            alt="Mothera AI"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
          />
          <span
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: "#22C55E" }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-white font-bold text-base leading-tight">
              Tina
            </h2>
          </div>
          <p className="text-white/75 text-xs">
            Mothera Pregnancy Assistant · Online
          </p>
        </div>
        <button
          type="button"
          data-ocid="chat.toggle"
          onClick={() => {
            setVoiceEnabled((v) => !v);
            if (isSpeaking) window.speechSynthesis.cancel();
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer"
          aria-label={voiceEnabled ? "Mute voice" : "Unmute voice"}
          title={voiceEnabled ? "Mute Tina's voice" : "Enable Tina's voice"}
        >
          {voiceEnabled ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSpeaking ? "#FFD700" : "white"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className={isSpeaking ? "animate-pulse" : ""}
            >
              <title>Speaker on</title>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              style={{ opacity: 0.5 }}
            >
              <title>Speaker off</title>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            data-ocid="chat.close_button"
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer"
            aria-label="Close chat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <title>Close</title>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-3 overflow-y-auto px-4 py-4 flex-1"
        data-ocid="chat.panel"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex animate-message-appear items-end gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "ai" && (
              <img
                src={LOGO_SRC}
                alt="Mothera AI"
                className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
              />
            )}
            <div
              className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className="max-w-xs px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #8E5C9F, #B07CC6)",
                        color: "white",
                        borderBottomRightRadius: "4px",
                      }
                    : {
                        background: "#F0E8FA",
                        color: "#2B1F3A",
                        borderBottomLeftRadius: "4px",
                      }
                }
              >
                {msg.text}
              </div>
              <span className="text-xs px-1" style={{ color: "#B0A8B9" }}>
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-end gap-2 animate-message-appear">
            <img
              src={LOGO_SRC}
              alt="Mothera AI"
              className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1"
            />
            <div
              className="px-4 py-3 rounded-2xl"
              style={{ background: "#F0E8FA", borderBottomLeftRadius: "4px" }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {/* Quick reply chips */}
        {!hasSentMessage && (
          <div className="flex flex-wrap gap-2 mt-1">
            {QUICK_REPLIES.map((qr) => (
              <button
                key={qr.label}
                type="button"
                data-ocid="chat.button"
                onClick={() => handleSend(qr.message)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
                style={{
                  background: "#F0E8FA",
                  color: "#8E5C9F",
                  border: "1.5px solid #D4B8ED",
                }}
              >
                {qr.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 px-4 pb-4">
        <input
          type="text"
          data-ocid="chat.input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask anything about your pregnancy..."
          className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none transition-all duration-200"
          style={{
            background: "#F8F4FB",
            border: "1.5px solid #E8D5F5",
            color: "#2B1F3A",
          }}
        />
        {hasSpeechSupport && (
          <button
            type="button"
            data-ocid="chat.button"
            onClick={isListening ? stopListening : startListening}
            disabled={isTyping}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer disabled:opacity-60 ${isListening ? "animate-pulse" : ""}`}
            style={{
              background: isListening
                ? "linear-gradient(135deg, #ef4444, #dc2626)"
                : "linear-gradient(135deg, #C7A8E8, #8E5C9F)",
            }}
            aria-label={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
                aria-hidden="true"
                focusable="false"
              >
                <title>Stop</title>
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <title>Microphone</title>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>
        )}
        <button
          type="button"
          data-ocid="chat.submit_button"
          onClick={sendMessage}
          disabled={isTyping}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

function VideoCard({
  video,
  category,
}: { video: { id: string; title: string }; category: string }) {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) {
    return (
      <div
        style={{
          width: "280px",
          flexShrink: 0,
          background: "#F3EAF9",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(142,92,159,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "190px",
          gap: "8px",
          padding: "16px",
        }}
      >
        <p
          className="text-xs text-center"
          style={{ color: "#8E5C9F", fontWeight: 600 }}
        >
          Video unavailable
        </p>
        <p className="text-xs text-center" style={{ color: "#6B7280" }}>
          {video.title}
        </p>
        <a
          href={`https://www.youtube.com/results?search_query=pregnancy+${encodeURIComponent(category.toLowerCase())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold underline"
          style={{ color: "#8E5C9F" }}
        >
          Search on YouTube →
        </a>
      </div>
    );
  }

  if (playing) {
    return (
      <div
        style={{
          width: "280px",
          flexShrink: 0,
          background: "#000",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(142,92,159,0.12)",
        }}
      >
        <iframe
          width="280"
          height="158"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: "block", border: "none" }}
        />
        <p
          className="text-xs font-semibold px-3 py-2"
          style={{ color: "#2B1F3A" }}
        >
          {video.title}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      style={{
        width: "280px",
        flexShrink: 0,
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(142,92,159,0.12)",
        cursor: "pointer",
        padding: 0,
        border: "none",
        textAlign: "left",
      }}
      onClick={() => setPlaying(true)}
    >
      <div style={{ position: "relative", width: "280px", height: "158px" }}>
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          width={280}
          height={158}
          style={{
            width: "280px",
            height: "158px",
            objectFit: "cover",
            display: "block",
          }}
          onError={() => setUnavailable(true)}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="white"
              aria-label="Play video"
            >
              <title>Play video</title>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>
      <p
        className="text-xs font-semibold px-3 py-2"
        style={{ color: "#2B1F3A" }}
      >
        {video.title}
      </p>
    </button>
  );
}

function HealthWellness() {
  const [activeCategory, setActiveCategory] = useState("Exercise");

  const items = [
    {
      label: "Exercise",
      image: "/assets/generated/pregnant-exercise.dim_600x400.jpg",
      gradient: "linear-gradient(135deg, #E8D5F5, #C8E6F9)",
      videos: [
        { id: "Lk6c0ZgRXes", title: "Prenatal Full Body Workout" },
        { id: "UozlmMkD2OA", title: "Safe Pregnancy Exercises" },
        { id: "7kgZnJqzHOM", title: "1st Trimester Workout" },
        { id: "4hRPdMjYp7A", title: "Prenatal Cardio" },
        { id: "nGFZzCyBwJ4", title: "Pregnancy Fitness Routine" },
      ],
    },
    {
      label: "Yoga",
      image: "/assets/generated/pregnant-yoga.dim_600x400.jpg",
      gradient: "linear-gradient(135deg, #F9C6D0, #E8D5F5)",
      videos: [
        { id: "CLR9e-R-4ko", title: "Yoga for Pregnant Women" },
        { id: "v7AYKMP6rOE", title: "Gentle Pregnancy Yoga" },
        { id: "4pKly2JojMw", title: "Morning Prenatal Yoga" },
        { id: "YZD0g0HuIxI", title: "Third Trimester Yoga" },
        { id: "eMKr9RFNiow", title: "Prenatal Yoga Flow" },
      ],
    },
    {
      label: "Meditation",
      image: "/assets/generated/pregnant-meditation.dim_600x400.jpg",
      gradient: "linear-gradient(135deg, #FDDCB5, #F9C6D0)",
      videos: [
        { id: "inpok4MKVLM", title: "Mindfulness Meditation" },
        { id: "86m4RC_ADEY", title: "Deep Relaxation" },
        { id: "O-6f5wQXSu8", title: "Breathing Meditation" },
        { id: "ZToicYcHIOU", title: "Prenatal Relaxation" },
        { id: "ENYYb5vIMkU", title: "Guided Pregnancy Meditation" },
      ],
    },
  ];

  const activeItem = items.find((item) => item.label === activeCategory)!;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#2B1F3A" }}>
        Health &amp; Wellness
      </h2>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {items.map((item, i) => {
          const isActive = activeCategory === item.label;
          return (
            <button
              key={item.label}
              type="button"
              data-ocid={`wellness.item.${i + 1}`}
              className="rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer card-hover w-full"
              onClick={() => setActiveCategory(item.label)}
              style={{
                background: item.gradient,
                height: "150px",
                padding: "0",
                overflow: "hidden",
                border: isActive
                  ? "2px solid #8E5C9F"
                  : "2px solid transparent",
                boxShadow: isActive
                  ? "0 0 0 2px #8E5C9F, 0 6px 15px rgba(142,92,159,0.2)"
                  : "0 6px 15px rgba(142,92,159,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full object-cover rounded-t-2xl"
                style={{ height: "90px" }}
              />
              <p
                className="text-sm font-semibold text-center px-2 pb-1"
                style={{ color: isActive ? "#8E5C9F" : "#2B1F3A" }}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </div>

      <div
        style={{
          overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#C8A8D8 #F3EAF9",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            width: "max-content",
          }}
        >
          {activeItem.videos.map((video) => (
            <VideoCard key={video.id} video={video} category={activeCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NearbyHelp() {
  const [mapOpen, setMapOpen] = useState(false);

  const address =
    "2/830, Krishna Nagar, Veerapandi, Tirupur-641604, Tamil Nadu, India";
  const previewMapUrl =
    "https://maps.google.com/maps?q=hospital+clinic+medical+pharmacy+nursing+home+near+Veerapandi,Tirupur,Tamil+Nadu,India&output=embed&z=12";
  const fullMapUrl =
    "https://maps.google.com/maps?q=hospital+clinic+medical+pharmacy+nursing+home+near+Veerapandi,Tirupur,Tamil+Nadu,India&output=embed&z=11";

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#2B1F3A" }}>
        Nearby Help
      </h2>

      {/* Preview Card - clickable */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
      >
        {/* Map preview iframe */}
        <div style={{ height: "220px", pointerEvents: "none" }}>
          <iframe
            title="Nearby Help Map Preview"
            src={previewMapUrl}
            width="100%"
            height="220"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Overlay bar with address */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#2B1F3A" }}>
              📍 {address}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#7A7386" }}>
              Nearby hospitals &amp; medical shops
            </p>
          </div>
          <button
            type="button"
            data-ocid="nearby.primary_button"
            onClick={(e) => {
              e.stopPropagation();
              setMapOpen(true);
            }}
            className="px-4 py-2 rounded-full text-sm font-medium text-white cursor-pointer transition-all duration-200 hover:opacity-90 whitespace-nowrap ml-3"
            style={{ background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }}
          >
            View Full Map
          </button>
        </div>
      </div>

      {/* Full-screen Map Modal */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,0,0,0.85)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "#fff" }}
          >
            <div>
              <p
                className="text-base font-semibold"
                style={{ color: "#2B1F3A" }}
              >
                Nearby Hospitals &amp; Medical Shops
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#7A7386" }}>
                📍 {address}
              </p>
            </div>
            <button
              type="button"
              data-ocid="nearby.close_button"
              onClick={() => setMapOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-white text-lg font-bold cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #8E5C9F, #B07CC6)",
              }}
              aria-label="Close map"
            >
              ✕
            </button>
          </div>

          {/* Full map */}
          <div className="flex-1 relative">
            <iframe
              title="Nearby Help Full Map"
              src={fullMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", height: "100%" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Footer hint */}
          <div
            className="px-5 py-3 text-center text-xs"
            style={{ background: "#fff", color: "#7A7386" }}
          >
            Tap any location on the map for directions
          </div>
        </div>
      )}
    </div>
  );
}

function DoctorConnect() {
  const [selected, setSelected] = useState<number | null>(null);

  const doctors = [
    {
      name: "Dr. Priya Sharma",
      specialty: "OB-GYN",
      phone: "+917538835169",
      displayPhone: "+91 98765 43210",
      gradient: "linear-gradient(135deg, #8E5C9F, #C8A6E0)",
      accent: "#8E5C9F",
    },
    {
      name: "Dr. Anita Verma",
      specialty: "Nutritionist",
      phone: "+918765432109",
      displayPhone: "+91 87654 32109",
      gradient: "linear-gradient(135deg, #F9C6D0, #FDDCB5)",
      accent: "#E07898",
    },
    {
      name: "Dr. Raj Kumar",
      specialty: "Physiotherapist",
      phone: "+917654321098",
      displayPhone: "+91 76543 21098",
      gradient: "linear-gradient(135deg, #C8E6F9, #E8D5F5)",
      accent: "#7AAFE0",
    },
  ];

  const selectedDoc = selected !== null ? doctors[selected] : null;

  return (
    <div id="connect" className="mb-6">
      <h2 className="text-lg font-semibold mb-4" style={{ color: "#2B1F3A" }}>
        Doctor Connect
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doc, i) => (
          <button
            key={doc.name}
            type="button"
            data-ocid={`doctors.item.${i + 1}`}
            onClick={() => setSelected(i)}
            className="bg-white rounded-2xl overflow-hidden cursor-pointer card-hover flex items-stretch w-full text-left"
            style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
          >
            <div
              className="w-2 rounded-l-2xl flex-shrink-0"
              style={{ background: doc.gradient }}
            />
            <div className="p-4 flex flex-col gap-1 flex-1">
              <p className="font-bold text-sm" style={{ color: "#2B1F3A" }}>
                {doc.name}
              </p>
              <p className="text-xs" style={{ color: "#7A7386" }}>
                {doc.specialty}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={doc.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Phone"
                  role="img"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.23a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 .5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.06 6.06l1.57-1.57a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span
                  className="text-xs font-medium"
                  style={{ color: doc.accent }}
                >
                  {doc.displayPhone}
                </span>
              </div>
            </div>
            <div className="flex items-center pr-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A6E0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Open"
                role="img"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {selectedDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(43,31,58,0.6)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setSelected(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 mx-4 w-full max-w-sm relative"
            style={{ boxShadow: "0 25px 60px rgba(142,92,159,0.3)" }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              data-ocid="doctors.close_button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ color: "#7A7386" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-label="Close"
                role="img"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div
              className="mb-1"
              style={{
                color: "#8E5C9F",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Contact
            </div>
            <p
              className="text-base font-bold mb-0.5"
              style={{ color: "#2B1F3A" }}
            >
              {selectedDoc.name}
            </p>
            <p className="text-xs mb-5" style={{ color: "#7A7386" }}>
              {selectedDoc.specialty}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                data-ocid="doctors.primary_button"
                href={`tel:${selectedDoc.phone}`}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 no-underline"
                style={{
                  borderColor: selectedDoc.accent,
                  background: `${selectedDoc.accent}10`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: selectedDoc.accent }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="Call"
                    role="img"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.23a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 .5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.06 6.06l1.57-1.57a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: selectedDoc.accent }}
                >
                  Call
                </span>
              </a>
              <a
                data-ocid="doctors.secondary_button"
                href={`https://wa.me/${selectedDoc.phone.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all hover:scale-105 active:scale-95 no-underline"
                style={{ borderColor: "#25D366", background: "#25D36610" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "#25D366" }}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-label="Video Call"
                    role="img"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#25D366" }}
                >
                  Video Call
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckUpReminder() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleDone = () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }
    setError("");
    setDone(true);
  };

  const handleEdit = () => {
    setDone(false);
  };

  const getRemainingDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkup = new Date(date);
    checkup.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (checkup.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff;
  };

  const formatDate = () => {
    const checkup = new Date(date + (time ? `T${time}` : ""));
    const dateStr = checkup.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (time) {
      const timeStr = checkup.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      return `${dateStr} at ${timeStr}`;
    }
    return dateStr;
  };

  const remainingDays = done ? getRemainingDays() : 0;
  const totalDays = done ? Math.min(Math.max(getRemainingDays(), 1), 365) : 1;
  const progress = done
    ? Math.max(0, Math.min(remainingDays / totalDays, 1))
    : 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div
      className="bg-white rounded-2xl p-5 mb-6"
      style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.12)" }}
      data-ocid="checkup_reminder.card"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #C8A6E0, #8E5C9F)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="Calendar"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#2B1F3A" }}>
            Check Up Reminder
          </h2>
          <p className="text-xs" style={{ color: "#7A7386" }}>
            Schedule your next check-up
          </p>
        </div>
      </div>

      {!done ? (
        <div>
          <div className="mb-3">
            <label
              htmlFor="checkup-date"
              className="block text-sm font-medium mb-1"
              style={{ color: "#2B1F3A" }}
            >
              Date
            </label>
            <input
              id="checkup-date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
              className="w-full rounded-xl px-4 py-2 text-sm border outline-none transition-all"
              style={{
                borderColor: "#C8A6E0",
                color: "#2B1F3A",
                background: "#FAF5FF",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#8E5C9F";
                e.target.style.boxShadow = "0 0 0 3px rgba(142,92,159,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#C8A6E0";
                e.target.style.boxShadow = "none";
              }}
              data-ocid="checkup_reminder.input"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="checkup-time"
              className="block text-sm font-medium mb-1"
              style={{ color: "#2B1F3A" }}
            >
              Time
            </label>
            <input
              id="checkup-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl px-4 py-2 text-sm border outline-none transition-all"
              style={{
                borderColor: "#C8A6E0",
                color: "#2B1F3A",
                background: "#FAF5FF",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#8E5C9F";
                e.target.style.boxShadow = "0 0 0 3px rgba(142,92,159,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#C8A6E0";
                e.target.style.boxShadow = "none";
              }}
              data-ocid="checkup_reminder.input"
            />
          </div>
          {error && (
            <p
              className="text-xs mb-3"
              style={{ color: "#e05c7a" }}
              data-ocid="checkup_reminder.error_state"
            >
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleDone}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-98"
            style={{ background: "#8E5C9F" }}
            data-ocid="checkup_reminder.submit_button"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              role="img"
              aria-label="Checkup countdown"
            >
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#E8D5F5"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#8E5C9F"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: "#8E5C9F" }}>
                {remainingDays <= 0 ? "0" : remainingDays}
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#7A7386" }}
              >
                days left
              </span>
            </div>
          </div>
          {remainingDays <= 0 ? (
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "#e05c7a" }}
            >
              Checkup date passed
            </p>
          ) : (
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "#7A7386" }}
            >
              {formatDate()}
            </p>
          )}
          <button
            type="button"
            onClick={handleEdit}
            className="mt-4 w-full py-3 rounded-xl text-sm font-semibold transition-all hover:bg-purple-50"
            style={{
              border: "1.5px solid #8E5C9F",
              color: "#8E5C9F",
              background: "transparent",
            }}
            data-ocid="checkup_reminder.edit_button"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="rounded-t-3xl mt-4 py-10 px-4 text-center"
      style={{ background: "linear-gradient(135deg, #8E5C9F, #6B3A7D)" }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="text-xl font-bold text-white">
          You are doing amazing, Mom
        </p>
        <HeartIcon className="w-6 h-6" />
      </div>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.75)" }}>
        Mothera · Your pregnancy companion
      </p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
        © {year}. Built with love using{" "}
        <a
          href={utmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ─── MusicOverlay ─────────────────────────────────────────────────────────────
const PREGNANCY_MUSIC = [
  {
    id: "lullabies",
    title: "Relaxing Lullabies",
    description: "Gentle lullabies to soothe you and your baby",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLhQCJTkrHOwSX8LUnIMgaTq3chP1tiTut",
    isPlaylist: true,
    videoId: null,
  },
  {
    id: "yoga",
    title: "Prenatal Yoga Music",
    description: "Peaceful music for your yoga and stretching sessions",
    embedUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    isPlaylist: false,
    videoId: "5qap5aO4i9A",
  },
  {
    id: "nature",
    title: "Calming Nature Sounds",
    description: "Natural soundscapes for deep relaxation",
    embedUrl: "https://www.youtube.com/embed/1ZYbU82GVz4",
    isPlaylist: false,
    videoId: "1ZYbU82GVz4",
  },
  {
    id: "classical",
    title: "Classical Music for Baby",
    description: "Classical compositions to stimulate your baby's development",
    embedUrl: "https://www.youtube.com/embed/Wb4kUBBDKdY",
    isPlaylist: false,
    videoId: "Wb4kUBBDKdY",
  },
  {
    id: "meditation",
    title: "Breathing & Meditation",
    description: "Guided breathing music for calm and mindfulness",
    embedUrl: "https://www.youtube.com/embed/SEfs5TJZ6Nk",
    isPlaylist: false,
    videoId: "SEfs5TJZ6Nk",
  },
  {
    id: "piano",
    title: "Gentle Piano for Pregnancy",
    description: "Soft piano melodies to ease stress and anxiety",
    embedUrl: "https://www.youtube.com/embed/77ZozI0rw7w",
    isPlaylist: false,
    videoId: "77ZozI0rw7w",
  },
];

function MusicCard({ item }: { item: (typeof PREGNANCY_MUSIC)[0] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg flex flex-col"
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
    >
      {!playing ? (
        <button
          type="button"
          className="relative w-full aspect-video cursor-pointer group"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${item.title}`}
          style={{ background: "linear-gradient(135deg, #6B3FA0, #9B6DC5)" }}
        >
          {item.isPlaylist ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span style={{ fontSize: "3rem" }}>🎵</span>
              <span className="text-white text-sm font-medium opacity-80">
                Playlist
              </span>
            </div>
          ) : (
            <img
              src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
              style={{ background: "rgba(255,255,255,0.9)" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#8E5C9F"
                aria-hidden="true"
              >
                <title>Play</title>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </button>
      ) : (
        <div className="w-full aspect-video">
          <iframe
            src={`${item.embedUrl}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      )}
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm">{item.title}</h3>
        <p className="text-purple-200 text-xs mt-1 opacity-80">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function MusicOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Music Button */}
      <button
        type="button"
        data-ocid="music.open_modal_button"
        onClick={() => setIsOpen(true)}
        aria-label="Pregnancy Music"
        title="Pregnancy Music"
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <title>Pregnancy Music</title>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </button>

      {/* Full-Screen Music Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          data-ocid="music.modal"
          style={{
            background:
              "linear-gradient(180deg, #3D1560 0%, #6B3FA0 40%, #9B6DC5 100%)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
          >
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🎵 Pregnancy Music
              </h2>
              <p className="text-purple-200 text-xs mt-0.5">
                Soothing music to help you and your baby relax
              </p>
            </div>
            <button
              type="button"
              data-ocid="music.close_button"
              onClick={() => setIsOpen(false)}
              aria-label="Close music"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/20"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <title>Close</title>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Music Grid */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto pb-6">
              {PREGNANCY_MUSIC.map((item) => (
                <MusicCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── TinaChatOverlay ──────────────────────────────────────────────────────────
function TinaChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        type="button"
        data-ocid="chat.open_modal_button"
        onClick={() => setIsOpen(true)}
        aria-label="Chat with Tina"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{ background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <title>Chat with Tina</title>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span
          className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white"
          style={{ background: "#22C55E" }}
        />
      </button>

      {/* Full-Screen Chat Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          data-ocid="chat.modal"
          style={{
            background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
          }}
        >
          <AIChat onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 lg:px-12 pb-0">
        {/* Desktop: Hello Mom + Timeline side-by-side */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start mb-0">
          <div>
            <Header selectedMonth={selectedMonth} />
            <PregnancyTracker />
            <Baby360Viewer />
          </div>
          <div className="lg:pt-6">
            <CircularTimeline
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
        </div>

        {selectedMonth !== null && (
          <div
            className="bg-white rounded-2xl p-6 mb-0"
            style={{ boxShadow: "0 10px 25px rgba(142,92,159,0.1)" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "#2B1F3A" }}
            >
              Month Details
            </h2>
            <MonthDetailCard
              data={MONTH_DATA[selectedMonth]}
              onClose={() => setSelectedMonth(null)}
            />
          </div>
        )}

        <MedicineReminderModule />

        {/* Desktop: Emergency full-width centered */}
        <div className="lg:max-w-2xl lg:mx-auto">
          <EmergencySOS />
        </div>

        <HealthWellness />

        {/* Desktop: CheckUp + Nearby side-by-side */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <CheckUpReminder />
          <NearbyHelp />
        </div>

        <DoctorConnect />
      </main>
      <Footer />
      <MusicOverlay />
      <TinaChatOverlay />
    </div>
  );
}
