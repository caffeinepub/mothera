import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Baby,
  Heart,
  LogOut,
  Music,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { BabyUserInfo } from "./BabyInfoPage";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeedingEntry {
  id: number;
  type: "Breastfeed" | "Formula";
  amount: string;
  time: string;
}

interface SleepEntry {
  id: number;
  start: string;
  end: string;
}

interface GrowthEntry {
  id: number;
  date: string;
  weight: string;
  height: string;
}

interface Vaccine {
  name: string;
  dueWeeks: number;
  done: boolean;
}

interface Post {
  id: number;
  author: string;
  message: string;
  likes: number;
  time: string;
  liked: boolean;
}

interface Thread {
  id: number;
  emoji: string;
  title: string;
  posts: Post[];
  expanded: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  emoji: string;
  category: string;
  badge?: string;
  wishlisted: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MILESTONES_BY_AGE = [
  {
    range: "0–1 Month",
    items: [
      "Lifts head briefly during tummy time",
      "Responds to sounds and voices",
      "Focuses on faces within 30 cm",
      "Makes tiny fist grips",
    ],
  },
  {
    range: "1–3 Months",
    items: [
      "Smiles socially at caregivers",
      "Follows moving objects with eyes",
      "Holds head steady when upright",
      "Coos and makes gurgling sounds",
    ],
  },
  {
    range: "3–6 Months",
    items: [
      "Rolls from tummy to back",
      "Reaches and grasps toys",
      "Laughs out loud",
      "Recognizes familiar faces",
    ],
  },
  {
    range: "6–9 Months",
    items: [
      "Sits without support",
      "Transfers objects hand to hand",
      "Babbles (ba-ba, ma-ma)",
      "Shows stranger anxiety",
    ],
  },
  {
    range: "9–12 Months",
    items: [
      "Pulls to stand and cruises furniture",
      "Waves bye-bye",
      "Says 1–2 words with meaning",
      "Plays peek-a-boo",
    ],
  },
];

const BASE_VACCINES: Omit<Vaccine, "done">[] = [
  { name: "BCG", dueWeeks: 0 },
  { name: "Hepatitis B (1st)", dueWeeks: 0 },
  { name: "Hepatitis B (2nd)", dueWeeks: 6 },
  { name: "OPV (1st)", dueWeeks: 6 },
  { name: "DTP (1st)", dueWeeks: 6 },
  { name: "Hib (1st)", dueWeeks: 6 },
  { name: "PCV (1st)", dueWeeks: 6 },
  { name: "Rotavirus (1st)", dueWeeks: 6 },
  { name: "OPV (2nd)", dueWeeks: 10 },
  { name: "DTP (2nd)", dueWeeks: 10 },
  { name: "Hib (2nd)", dueWeeks: 10 },
  { name: "PCV (2nd)", dueWeeks: 10 },
  { name: "Rotavirus (2nd)", dueWeeks: 10 },
  { name: "OPV (3rd)", dueWeeks: 14 },
  { name: "DTP (3rd)", dueWeeks: 14 },
  { name: "Hib (3rd)", dueWeeks: 14 },
  { name: "PCV (3rd)", dueWeeks: 14 },
  { name: "IPV (1st)", dueWeeks: 14 },
  { name: "Hepatitis B (3rd)", dueWeeks: 26 },
  { name: "IPV (2nd)", dueWeeks: 26 },
  { name: "MMR (1st)", dueWeeks: 39 },
  { name: "MMR (2nd)", dueWeeks: 65 },
  { name: "Varicella", dueWeeks: 65 },
];

const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    emoji: "\uD83D\uDE34",
    title: "Sleep Training Tips",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Meena R.",
        message:
          "The 4-7-8 soothing method worked wonders for us at 3 months! Give it 5 nights.",
        likes: 14,
        time: "2 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Priya S.",
        message:
          "White noise machine was a game changer. Baby sleeps 6 hours straight now.",
        likes: 9,
        time: "5 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Aisha K.",
        message:
          "Consistent bedtime routine at 7pm made all the difference for us.",
        likes: 7,
        time: "1 day ago",
        liked: false,
      },
    ],
  },
  {
    id: 2,
    emoji: "\uD83E\uDD31",
    title: "Breastfeeding Support",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Divya M.",
        message:
          "Nipple shield saved my breastfeeding journey. Don't give up too early!",
        likes: 22,
        time: "3 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Roopa T.",
        message:
          "Lactation consultant visit at week 2 helped me with latch issues completely.",
        likes: 18,
        time: "6 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Sunita B.",
        message:
          "Fenugreek tea boosted my milk supply noticeably after 3 days.",
        likes: 11,
        time: "2 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 3,
    emoji: "\uD83E\uDD66",
    title: "Baby's First Foods",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Lakshmi P.",
        message:
          "Started with mashed banana at 6 months. Baby loved it from the first bite!",
        likes: 16,
        time: "4 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Rekha G.",
        message:
          "Introduce one new food every 3 days to spot any allergies. Works perfectly.",
        likes: 20,
        time: "1 day ago",
        liked: false,
      },
      {
        id: 3,
        author: "Tara N.",
        message:
          "Sweet potato puree was our baby's absolute favourite first veggie!",
        likes: 13,
        time: "3 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 4,
    emoji: "\uD83D\uDCAA",
    title: "Postpartum Recovery",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Anjali V.",
        message:
          "Pelvic floor exercises starting at week 6 really helped my recovery.",
        likes: 25,
        time: "1 hour ago",
        liked: false,
      },
      {
        id: 2,
        author: "Deepa C.",
        message:
          "Iron-rich foods made a huge difference to my energy levels postpartum.",
        likes: 19,
        time: "8 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Nisha F.",
        message:
          "Don't rush the timeline. Every body heals differently. Be kind to yourself.",
        likes: 30,
        time: "2 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 5,
    emoji: "\uD83E\uDDF4",
    title: "Baby Skin & Care",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Shalini H.",
        message:
          "Coconut oil works brilliantly for cradle cap. Just massage gently and rinse.",
        likes: 17,
        time: "3 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Kavya W.",
        message:
          "Use fragrance-free products only for the first year. Saved us from so many rashes.",
        likes: 21,
        time: "1 day ago",
        liked: false,
      },
      {
        id: 3,
        author: "Usha D.",
        message:
          "Pat dry instead of rubbing after bath. Baby skin stays so much softer.",
        likes: 8,
        time: "4 days ago",
        liked: false,
      },
    ],
  },
  {
    id: 6,
    emoji: "\uD83D\uDC9C",
    title: "Mom Mental Health",
    expanded: false,
    posts: [
      {
        id: 1,
        author: "Pooja L.",
        message:
          "It's okay to not feel okay. Postpartum depression is real and treatable. Ask for help.",
        likes: 45,
        time: "2 hours ago",
        liked: false,
      },
      {
        id: 2,
        author: "Smita A.",
        message:
          "10 minutes of alone time daily for journaling completely changed my mindset.",
        likes: 32,
        time: "6 hours ago",
        liked: false,
      },
      {
        id: 3,
        author: "Radha O.",
        message:
          "Talking to a therapist postpartum was the best decision I made for myself.",
        likes: 38,
        time: "1 day ago",
        liked: false,
      },
    ],
  },
];

const INITIAL_PRODUCTS: Product[] = [
  // Feeding
  {
    id: 1,
    name: "Avent Baby Bottle Set",
    description: "Anti-colic, BPA-free, 4-pack",
    price: 899,
    rating: 4.5,
    emoji: "\uD83C\uDF7C",
    category: "Feeding",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 2,
    name: "Medela Breast Pump",
    description: "Double electric, portable & quiet",
    price: 4500,
    rating: 4.7,
    emoji: "\uD83E\uDEB6",
    category: "Feeding",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 3,
    name: "Munchkin Snack Catcher",
    description: "Mess-free toddler snack cup",
    price: 450,
    rating: 4.3,
    emoji: "\uD83E\uDD63",
    category: "Feeding",
    wishlisted: false,
  },
  {
    id: 4,
    name: "Nuby Silicone Spoon Set",
    description: "Soft-tip, heat-sensitive, 4 colors",
    price: 299,
    rating: 4.4,
    emoji: "\uD83E\uDD44",
    category: "Feeding",
    badge: "New",
    wishlisted: false,
  },
  // Clothing
  {
    id: 5,
    name: "Carter's Onesie 5-Pack",
    description: "100% cotton, snap closures, unisex",
    price: 1200,
    rating: 4.6,
    emoji: "\uD83D\uDC76",
    category: "Clothing",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 6,
    name: "Baby Sleep Sack",
    description: "0.5 TOG, safe sleepwear for newborns",
    price: 799,
    rating: 4.5,
    emoji: "\uD83D\uDECC",
    category: "Clothing",
    wishlisted: false,
  },
  {
    id: 7,
    name: "Soft Cotton Mittens",
    description: "Prevents scratching, 3-pair set",
    price: 199,
    rating: 4.2,
    emoji: "\uD83E\uDDE4",
    category: "Clothing",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 8,
    name: "Muslin Swaddle Blanket",
    description: "Breathable, organic muslin, 3-pack",
    price: 649,
    rating: 4.8,
    emoji: "\uD83E\uDDF6",
    category: "Clothing",
    wishlisted: false,
  },
  // Toys
  {
    id: 9,
    name: "Fisher-Price Gym Mat",
    description: "5 activity zones, tummy time mat",
    price: 2199,
    rating: 4.7,
    emoji: "\uD83C\uDFBD",
    category: "Toys",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 10,
    name: "Soft Rattle Set",
    description: "BPA-free, sensory play, 6-piece",
    price: 349,
    rating: 4.4,
    emoji: "\uD83D\uDD14",
    category: "Toys",
    wishlisted: false,
  },
  {
    id: 11,
    name: "Sensory Board Book",
    description: "Touch-and-feel, 0-3 years",
    price: 299,
    rating: 4.5,
    emoji: "\uD83D\uDCDA",
    category: "Toys",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 12,
    name: "Musical Mobile",
    description: "Crib mobile with lullabies & lights",
    price: 1899,
    rating: 4.6,
    emoji: "\uD83C\uDFB5",
    category: "Toys",
    wishlisted: false,
  },
  // Skincare
  {
    id: 13,
    name: "Johnson's Baby Lotion",
    description: "Clinically proven mild, 200ml",
    price: 185,
    rating: 4.5,
    emoji: "\uD83E\uDEA7",
    category: "Skincare",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 14,
    name: "Himalaya Baby Cream",
    description: "Natural olive oil & chickpea extract",
    price: 120,
    rating: 4.3,
    emoji: "\uD83C\uDF3F",
    category: "Skincare",
    wishlisted: false,
  },
  {
    id: 15,
    name: "Sebamed Baby Wash",
    description: "pH 5.5, dermatologist tested, 200ml",
    price: 499,
    rating: 4.6,
    emoji: "\uD83E\uDEFC",
    category: "Skincare",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 16,
    name: "WOW Baby Shampoo",
    description: "Tear-free, sulphate-free formula",
    price: 349,
    rating: 4.4,
    emoji: "\uD83D\uDEBF",
    category: "Skincare",
    wishlisted: false,
  },
  // Safety
  {
    id: 17,
    name: "Baby Monitor",
    description: "720p video, night vision, 2-way audio",
    price: 3499,
    rating: 4.7,
    emoji: "\uD83D\uDCF9",
    category: "Safety",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 18,
    name: "Cabinet Locks 10-Pack",
    description: "Magnetic, adhesive, tool-free install",
    price: 299,
    rating: 4.5,
    emoji: "\uD83D\uDD12",
    category: "Safety",
    wishlisted: false,
  },
  {
    id: 19,
    name: "Corner Guards",
    description: "Silicone, 8-pack, self-adhesive",
    price: 199,
    rating: 4.3,
    emoji: "\uD83D\uDEE1\uFE0F",
    category: "Safety",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 20,
    name: "Baby Gate",
    description: "Pressure-mount, 76-82cm adjustable",
    price: 1799,
    rating: 4.6,
    emoji: "\uD83D\uDEAA",
    category: "Safety",
    wishlisted: false,
  },
  // Nursery
  {
    id: 21,
    name: "Wooden Crib",
    description: "Convertible 4-in-1, solid pine wood",
    price: 12999,
    rating: 4.8,
    emoji: "\uD83D\uDECF\uFE0F",
    category: "Nursery",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 22,
    name: "Changing Table",
    description: "Foldable, with storage shelves",
    price: 8999,
    rating: 4.5,
    emoji: "\uD83E\uDDF8",
    category: "Nursery",
    wishlisted: false,
  },
  {
    id: 23,
    name: "Night Light Projector",
    description: "Star projector + lullabies, timer",
    price: 999,
    rating: 4.6,
    emoji: "\uD83C\uDF1F",
    category: "Nursery",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 24,
    name: "Diaper Bag",
    description: "Waterproof, 12 pockets, unisex",
    price: 1499,
    rating: 4.7,
    emoji: "\uD83C\uDF92",
    category: "Nursery",
    wishlisted: false,
  },
];

const WELLNESS_CARDS = [
  {
    emoji: "\uD83C\uDFC3\u200D\u2640\uFE0F",
    title: "Post-Partum Exercise",
    description: "Gentle exercises to rebuild strength safely after birth.",
    query: "postpartum exercise routine for new moms",
  },
  {
    emoji: "\uD83E\uDDD8\u200D\u2640\uFE0F",
    title: "Yoga & Stretching",
    description: "Calming yoga poses designed for postnatal recovery.",
    query: "postnatal yoga stretching for new mothers",
  },
  {
    emoji: "\uD83E\uDD57",
    title: "Nutrition & Diet",
    description: "Balanced diet tips for breastfeeding and recovery.",
    query: "postpartum nutrition diet for breastfeeding mothers",
  },
  {
    emoji: "\uD83E\uDDE0",
    title: "Mental Health Support",
    description: "Guided tools for postpartum mood and mindfulness.",
    query: "postpartum mental health support for new moms",
  },
];

const SELF_CARE_TIPS = [
  { emoji: "\uD83D\uDCA7", tip: "Drink 8 glasses of water daily" },
  {
    emoji: "\uD83D\uDEB6\u200D\u2640\uFE0F",
    tip: "Take a 10-minute walk outside",
  },
  { emoji: "\uD83D\uDCDE", tip: "Call a friend or loved one" },
  { emoji: "\uD83D\uDCA4", tip: "Rest when your baby rests" },
  { emoji: "\uD83E\uDD69", tip: "Eat iron-rich foods daily" },
  { emoji: "\uD83D\uDE4F", tip: "Practice 5 minutes of gratitude" },
];

const MOOD_OPTIONS = [
  {
    emoji: "\uD83D\uDE14",
    label: "Struggling",
    color: "#EF4444",
    response: "It's okay to have hard days. You're stronger than you know. 💜",
  },
  {
    emoji: "\uD83D\uDE10",
    label: "Okay",
    color: "#F59E0B",
    response: "Every day is progress. You're doing well, Mama. 🌸",
  },
  {
    emoji: "\uD83D\uDE42",
    label: "Good",
    color: "#10B981",
    response: "You're thriving! Keep embracing every moment. ✨",
  },
  {
    emoji: "\uD83D\uDE0A",
    label: "Happy",
    color: "#3B82F6",
    response: "Your joy radiates to your baby. Keep shining! 🌟",
  },
  {
    emoji: "\uD83D\uDE04",
    label: "Wonderful",
    color: "#8B5CF6",
    response: "You are absolutely amazing, Mama! The world sees it. 🦋",
  },
];

const CATEGORIES = [
  "All",
  "Feeding",
  "Clothing",
  "Toys",
  "Skincare",
  "Safety",
  "Nursery",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(isoOrTime: string): string {
  if (!isoOrTime) return "";
  const d = new Date(isoOrTime);
  if (Number.isNaN(d.getTime())) return isoOrTime;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getDueDate(dob: string, weeks: number): string {
  if (!dob) return `+${weeks}w`;
  const d = new Date(dob);
  d.setDate(d.getDate() + weeks * 7);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getBabyAgeMonths(dob: string): number {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const now = new Date();
  return Math.floor(
    (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44),
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{emoji}</span>
      <h2
        style={{ fontFamily: "Fraunces, serif", color: "#2B1F3A" }}
        className="text-xl md:text-2xl font-bold"
      >
        {title}
      </h2>
      <div
        className="flex-1 h-px ml-2"
        style={{
          background: "linear-gradient(90deg, #C084DE 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Baby Care Module ─────────────────────────────────────────────────────────
function BabyCareModule({ babyDob }: { babyDob: string }) {
  const ageMonths = getBabyAgeMonths(babyDob);

  // Milestones
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggleMilestone = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  // Feeding
  const [feedings, setFeedings] = useState<FeedingEntry[]>([
    {
      id: 1,
      type: "Breastfeed",
      amount: "10 min",
      time: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      type: "Formula",
      amount: "90 ml",
      time: new Date(Date.now() - 7200000).toISOString(),
    },
  ]);
  const [feedForm, setFeedForm] = useState({
    type: "Breastfeed" as "Breastfeed" | "Formula",
    amount: "",
    time: new Date().toISOString().slice(0, 16),
  });
  const [showFeedForm, setShowFeedForm] = useState(false);
  const addFeeding = () => {
    if (!feedForm.amount) {
      toast.error("Enter amount or duration");
      return;
    }
    setFeedings((prev) =>
      [{ id: Date.now(), ...feedForm }, ...prev].slice(0, 10),
    );
    setFeedForm({
      type: "Breastfeed",
      amount: "",
      time: new Date().toISOString().slice(0, 16),
    });
    setShowFeedForm(false);
    toast.success("Feeding logged!");
  };

  // Sleep
  const [sleeps, setSleeps] = useState<SleepEntry[]>([
    {
      id: 1,
      start: new Date(Date.now() - 10800000).toISOString().slice(0, 16),
      end: new Date(Date.now() - 7200000).toISOString().slice(0, 16),
    },
  ]);
  const [sleepForm, setSleepForm] = useState({ start: "", end: "" });
  const [showSleepForm, setShowSleepForm] = useState(false);
  const addSleep = () => {
    if (!sleepForm.start || !sleepForm.end) {
      toast.error("Enter both times");
      return;
    }
    setSleeps((prev) =>
      [{ id: Date.now(), ...sleepForm }, ...prev].slice(0, 5),
    );
    setSleepForm({ start: "", end: "" });
    setShowSleepForm(false);
    toast.success("Sleep logged!");
  };
  const totalSleepHours = sleeps.reduce((sum, s) => {
    const diff =
      (new Date(s.end).getTime() - new Date(s.start).getTime()) / 3600000;
    return diff > 0 ? sum + diff : sum;
  }, 0);

  // Vaccines
  const [vaccines, setVaccines] = useState<Vaccine[]>(
    BASE_VACCINES.map((v) => ({ ...v, done: false })),
  );
  const toggleVaccine = (i: number) =>
    setVaccines((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, done: !v.done } : v)),
    );

  // Growth
  const [growthLog, setGrowthLog] = useState<GrowthEntry[]>([
    {
      id: 1,
      date: new Date().toISOString().slice(0, 10),
      weight: "3.5",
      height: "52",
    },
  ]);
  const [growthForm, setGrowthForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: "",
    height: "",
  });
  const [showGrowthForm, setShowGrowthForm] = useState(false);
  const addGrowth = () => {
    if (!growthForm.weight && !growthForm.height) {
      toast.error("Enter weight or height");
      return;
    }
    setGrowthLog((prev) => [{ id: Date.now(), ...growthForm }, ...prev]);
    setGrowthForm({
      date: new Date().toISOString().slice(0, 10),
      weight: "",
      height: "",
    });
    setShowGrowthForm(false);
    toast.success("Growth entry saved!");
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(192,132,222,0.2)",
    borderRadius: "16px",
    padding: "20px",
  };

  return (
    <section id="baby-care" className="mb-10">
      <SectionHeader emoji="\uD83D\uDC76" title="Baby Care" />
      <div className="mb-3 text-purple-600 text-sm font-medium">
        Baby age:{" "}
        <span className="font-bold text-purple-800">
          {ageMonths} month{ageMonths !== 1 ? "s" : ""}
        </span>
      </div>

      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="flex flex-wrap gap-1 h-auto mb-4 bg-purple-50 p-1 rounded-xl">
          {["milestones", "feeding", "sleep", "vaccines", "growth"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-lg text-sm capitalize px-3 py-1.5 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
              data-ocid={`baby-care.${t}.tab`}
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Milestones */}
        <TabsContent value="milestones">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MILESTONES_BY_AGE.map((group) => (
              <div key={group.range} style={cardStyle}>
                <div className="font-semibold text-purple-700 mb-3 text-sm">
                  {group.range}
                </div>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => {
                    const key = `${group.range}|${item}`;
                    return (
                      <div key={key} className="flex items-start gap-2">
                        <Checkbox
                          id={key}
                          checked={!!checked[key]}
                          onCheckedChange={() => toggleMilestone(key)}
                          className="mt-0.5 border-purple-300 data-[state=checked]:bg-purple-600"
                          data-ocid="baby-care.milestones.checkbox"
                        />
                        <label
                          htmlFor={key}
                          className={`text-sm cursor-pointer leading-snug ${
                            checked[key]
                              ? "line-through text-purple-300"
                              : "text-purple-800"
                          }`}
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Feeding */}
        <TabsContent value="feeding">
          <div style={cardStyle}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-purple-700">Feeding Log</div>
              <Button
                size="sm"
                onClick={() => setShowFeedForm(!showFeedForm)}
                style={{
                  background:
                    "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                  color: "#fff",
                  border: "none",
                }}
                data-ocid="baby-care.feeding.open_modal_button"
              >
                + Add Feeding
              </Button>
            </div>
            {showFeedForm && (
              <div className="bg-purple-50 rounded-xl p-4 mb-4 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Type
                    </Label>
                    <Select
                      onValueChange={(v) =>
                        setFeedForm((p) => ({
                          ...p,
                          type: v as "Breastfeed" | "Formula",
                        }))
                      }
                      defaultValue="Breastfeed"
                    >
                      <SelectTrigger className="h-9 text-sm rounded-lg border-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breastfeed">Breastfeed</SelectItem>
                        <SelectItem value="Formula">Formula</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Amount / Duration
                    </Label>
                    <Input
                      placeholder="e.g. 90 ml or 10 min"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={feedForm.amount}
                      onChange={(e) =>
                        setFeedForm((p) => ({ ...p, amount: e.target.value }))
                      }
                      data-ocid="baby-care.feeding.input"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Time
                    </Label>
                    <Input
                      type="datetime-local"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={feedForm.time}
                      onChange={(e) =>
                        setFeedForm((p) => ({ ...p, time: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={addFeeding}
                    style={{
                      background:
                        "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                      color: "#fff",
                      border: "none",
                    }}
                    data-ocid="baby-care.feeding.submit_button"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowFeedForm(false)}
                    data-ocid="baby-care.feeding.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {feedings.slice(0, 5).map((f, i) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-xs border border-purple-50"
                  data-ocid={`baby-care.feeding.item.${i + 1}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {f.type === "Breastfeed"
                        ? "\uD83E\uDD31"
                        : "\uD83C\uDF7C"}
                    </span>
                    <div>
                      <div className="font-medium text-purple-800 text-sm">
                        {f.type}
                      </div>
                      <div className="text-purple-400 text-xs">{f.amount}</div>
                    </div>
                  </div>
                  <div className="text-purple-400 text-xs">
                    {formatTime(f.time)}
                  </div>
                </div>
              ))}
              {feedings.length === 0 && (
                <div
                  className="text-purple-300 text-sm text-center py-4"
                  data-ocid="baby-care.feeding.empty_state"
                >
                  No feedings logged yet
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Sleep */}
        <TabsContent value="sleep">
          <div style={cardStyle}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-purple-700">
                  Sleep Tracker
                </div>
                <div className="text-purple-500 text-sm">
                  Today:{" "}
                  <span className="font-bold text-purple-700">
                    {totalSleepHours.toFixed(1)}h
                  </span>{" "}
                  total
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => setShowSleepForm(!showSleepForm)}
                style={{
                  background:
                    "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                  color: "#fff",
                  border: "none",
                }}
                data-ocid="baby-care.sleep.open_modal_button"
              >
                + Log Sleep
              </Button>
            </div>
            {showSleepForm && (
              <div className="bg-purple-50 rounded-xl p-4 mb-4 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Sleep Start
                    </Label>
                    <Input
                      type="datetime-local"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={sleepForm.start}
                      onChange={(e) =>
                        setSleepForm((p) => ({ ...p, start: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Wake Up
                    </Label>
                    <Input
                      type="datetime-local"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={sleepForm.end}
                      onChange={(e) =>
                        setSleepForm((p) => ({ ...p, end: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={addSleep}
                    style={{
                      background:
                        "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                      color: "#fff",
                      border: "none",
                    }}
                    data-ocid="baby-care.sleep.submit_button"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSleepForm(false)}
                    data-ocid="baby-care.sleep.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {sleeps.map((s, i) => {
                const diff =
                  (new Date(s.end).getTime() - new Date(s.start).getTime()) /
                  3600000;
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-xs border border-purple-50"
                    data-ocid={`baby-care.sleep.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">\uD83D\uDCA4</span>
                      <div>
                        <div className="font-medium text-purple-800 text-sm">
                          {formatTime(s.start)} → {formatTime(s.end)}
                        </div>
                        <div className="text-purple-400 text-xs">
                          {diff > 0 ? `${diff.toFixed(1)}h` : "Invalid"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {sleeps.length === 0 && (
                <div
                  className="text-purple-300 text-sm text-center py-4"
                  data-ocid="baby-care.sleep.empty_state"
                >
                  No sleep logged yet
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Vaccines */}
        <TabsContent value="vaccines">
          <div style={cardStyle}>
            <div className="font-semibold text-purple-700 mb-4">
              Vaccination Schedule
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-purple-500 border-b border-purple-100">
                    <th className="text-left pb-2 font-medium">Vaccine</th>
                    <th className="text-left pb-2 font-medium">Due Date</th>
                    <th className="text-center pb-2 font-medium">Done</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccines.map((v, i) => (
                    <tr
                      key={v.name}
                      className={`border-b border-purple-50 ${v.done ? "opacity-50" : ""}`}
                      data-ocid={`baby-care.vaccines.row.${i + 1}`}
                    >
                      <td
                        className={`py-2 font-medium ${v.done ? "line-through text-purple-300" : "text-purple-800"}`}
                      >
                        {v.name}
                      </td>
                      <td className="py-2 text-purple-500">
                        {getDueDate(babyDob, v.dueWeeks)}
                      </td>
                      <td className="py-2 text-center">
                        <Checkbox
                          checked={v.done}
                          onCheckedChange={() => toggleVaccine(i)}
                          className="border-purple-300 data-[state=checked]:bg-green-500"
                          data-ocid="baby-care.vaccines.checkbox"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Growth */}
        <TabsContent value="growth">
          <div style={cardStyle}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-purple-700">Growth Chart</div>
              <Button
                size="sm"
                onClick={() => setShowGrowthForm(!showGrowthForm)}
                style={{
                  background:
                    "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                  color: "#fff",
                  border: "none",
                }}
                data-ocid="baby-care.growth.open_modal_button"
              >
                + Add Entry
              </Button>
            </div>
            {showGrowthForm && (
              <div className="bg-purple-50 rounded-xl p-4 mb-4 flex flex-col gap-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Date
                    </Label>
                    <Input
                      type="date"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={growthForm.date}
                      onChange={(e) =>
                        setGrowthForm((p) => ({ ...p, date: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Weight (kg)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g. 4.2"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={growthForm.weight}
                      onChange={(e) =>
                        setGrowthForm((p) => ({ ...p, weight: e.target.value }))
                      }
                      data-ocid="baby-care.growth.input"
                    />
                  </div>
                  <div>
                    <Label className="text-purple-700 text-xs font-medium mb-1 block">
                      Height (cm)
                    </Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 54"
                      className="h-9 text-sm rounded-lg border-purple-200"
                      value={growthForm.height}
                      onChange={(e) =>
                        setGrowthForm((p) => ({ ...p, height: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={addGrowth}
                    style={{
                      background:
                        "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                      color: "#fff",
                      border: "none",
                    }}
                    data-ocid="baby-care.growth.submit_button"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowGrowthForm(false)}
                    data-ocid="baby-care.growth.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-purple-500 border-b border-purple-100">
                    <th className="text-left pb-2 font-medium">Date</th>
                    <th className="text-left pb-2 font-medium">Weight</th>
                    <th className="text-left pb-2 font-medium">Height</th>
                  </tr>
                </thead>
                <tbody>
                  {growthLog.map((g, i) => (
                    <tr
                      key={g.id}
                      className="border-b border-purple-50"
                      data-ocid={`baby-care.growth.item.${i + 1}`}
                    >
                      <td className="py-2 text-purple-600">{g.date}</td>
                      <td className="py-2 text-purple-800 font-medium">
                        {g.weight ? `${g.weight} kg` : "—"}
                      </td>
                      <td className="py-2 text-purple-800 font-medium">
                        {g.height ? `${g.height} cm` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

// ─── Mother Wellness Hub ──────────────────────────────────────────────────────
function MotherWellnessHub() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <section id="wellness" className="mb-10">
      <SectionHeader emoji="\uD83D\uDC9A" title="Mother Wellness Hub" />

      {/* Wellness Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {WELLNESS_CARDS.map((card, i) => (
          <div
            key={card.title}
            className="card-hover rounded-2xl p-5 flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(192,132,222,0.25)",
              boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
            }}
            data-ocid={`wellness.card.${i + 1}`}
          >
            <div className="text-3xl">{card.emoji}</div>
            <div className="font-semibold text-purple-800 text-sm leading-snug">
              {card.title}
            </div>
            <div className="text-purple-500 text-xs leading-relaxed flex-1">
              {card.description}
            </div>
            <Button
              size="sm"
              onClick={() =>
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(card.query)}`,
                  "_blank",
                )
              }
              className="mt-auto rounded-xl text-xs"
              style={{
                background: "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                color: "#fff",
                border: "none",
              }}
              data-ocid={`wellness.card.button.${i + 1}`}
            >
              Watch Videos
            </Button>
          </div>
        ))}
      </div>

      {/* Mood Tracker */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(192,132,222,0.25)",
          boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
        }}
      >
        <div className="font-semibold text-purple-700 mb-1">
          How are you feeling today?
        </div>
        <div className="text-purple-400 text-sm mb-4">
          Track your mood daily — your wellbeing matters 💜
        </div>
        <div className="flex gap-3 flex-wrap mb-4">
          {MOOD_OPTIONS.map((m, i) => (
            <button
              type="button"
              key={m.label}
              onClick={() => setSelectedMood(i)}
              className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl transition-all ${
                selectedMood === i
                  ? "bg-purple-100 ring-2 ring-purple-400 shadow-sm"
                  : "bg-white/60 hover:bg-purple-50"
              }`}
              data-ocid={`wellness.mood.button.${i + 1}`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs text-purple-600 font-medium">
                {m.label}
              </span>
            </button>
          ))}
        </div>
        {selectedMood !== null && (
          <div
            className="rounded-xl px-4 py-3 text-sm font-medium animate-fade-in"
            style={{
              background: `${MOOD_OPTIONS[selectedMood].color}15`,
              color: MOOD_OPTIONS[selectedMood].color,
            }}
          >
            {MOOD_OPTIONS[selectedMood].response}
          </div>
        )}
      </div>

      {/* Self-Care Tips */}
      <div>
        <div className="font-semibold text-purple-700 mb-3">
          Self-Care Reminders
        </div>
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {SELF_CARE_TIPS.map((tip, i) => (
            <div
              key={tip.tip}
              className="flex-shrink-0 rounded-2xl px-5 py-4 text-center"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(192,132,222,0.2)",
                minWidth: "140px",
                boxShadow: "0 2px 8px rgba(142,92,159,0.07)",
              }}
              data-ocid={`wellness.self_care.card.${i + 1}`}
            >
              <div className="text-2xl mb-2">{tip.emoji}</div>
              <div className="text-purple-700 text-xs font-medium leading-snug">
                {tip.tip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mothers Community ────────────────────────────────────────────────────────
function MothersCommunity() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [newMessages, setNewMessages] = useState<Record<number, string>>({});

  const toggleThread = (id: number) =>
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, expanded: !t.expanded } : t)),
    );

  const likePost = (threadId: number, postId: number) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              posts: t.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      likes: p.liked ? p.likes - 1 : p.likes + 1,
                      liked: !p.liked,
                    }
                  : p,
              ),
            }
          : t,
      ),
    );

  const addPost = (threadId: number) => {
    const msg = newMessages[threadId]?.trim();
    if (!msg) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              posts: [
                ...t.posts,
                {
                  id: Date.now(),
                  author: "You",
                  message: msg,
                  likes: 0,
                  time: "just now",
                  liked: false,
                },
              ],
            }
          : t,
      ),
    );
    setNewMessages((prev) => ({ ...prev, [threadId]: "" }));
    toast.success("Posted to community!");
  };

  return (
    <section id="community" className="mb-10">
      <SectionHeader
        emoji="\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67"
        title="Mothers Community"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {threads.map((thread, ti) => (
          <div
            key={thread.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(192,132,222,0.2)",
              boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
            }}
            data-ocid={`community.thread.${ti + 1}`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-purple-50/50 transition-colors"
              onClick={() => toggleThread(thread.id)}
              data-ocid={`community.thread.toggle.${ti + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{thread.emoji}</span>
                <div className="text-left">
                  <div className="font-semibold text-purple-800 text-sm">
                    {thread.title}
                  </div>
                  <div className="text-purple-400 text-xs">
                    {thread.posts.length} posts
                  </div>
                </div>
              </div>
              <span className="text-purple-400 text-xs">
                {thread.expanded ? "\u25B2" : "\u25BC"}
              </span>
            </button>

            {thread.expanded && (
              <div className="px-5 pb-5">
                <div className="flex flex-col gap-3 mb-4">
                  {thread.posts.map((post, pi) => (
                    <div
                      key={post.id}
                      className="bg-purple-50/60 rounded-xl p-3"
                      data-ocid={`community.post.${pi + 1}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-purple-700 text-xs">
                          {post.author}
                        </span>
                        <span className="text-purple-400 text-xs">
                          {post.time}
                        </span>
                      </div>
                      <p className="text-purple-800 text-sm leading-relaxed mb-2">
                        {post.message}
                      </p>
                      <button
                        type="button"
                        onClick={() => likePost(thread.id, post.id)}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          post.liked
                            ? "text-pink-500"
                            : "text-purple-400 hover:text-pink-400"
                        }`}
                        data-ocid={`community.like.button.${pi + 1}`}
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          fill={post.liked ? "currentColor" : "none"}
                        />
                        {post.likes}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add your voice..."
                    className="text-sm rounded-xl border-purple-200 resize-none h-16 flex-1"
                    value={newMessages[thread.id] || ""}
                    onChange={(e) =>
                      setNewMessages((prev) => ({
                        ...prev,
                        [thread.id]: e.target.value,
                      }))
                    }
                    data-ocid="community.new_post.textarea"
                  />
                  <Button
                    size="sm"
                    onClick={() => addPost(thread.id)}
                    className="self-end"
                    style={{
                      background:
                        "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                      color: "#fff",
                      border: "none",
                    }}
                    data-ocid="community.new_post.submit_button"
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Baby Products ────────────────────────────────────────────────────────────
function BabyProducts() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleWishlist = (id: number) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, wishlisted: !p.wishlisted } : p)),
    );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === product.id);
      if (existing)
        return prev.map((c) =>
          c.id === product.id ? { ...c, qty: c.qty + 1 } : c,
        );
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          emoji: product.emoji,
        },
      ];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQty = (id: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0),
    );

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const filtered = products.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="products" className="mb-10">
      <SectionHeader emoji="\uD83D\uDECD\uFE0F" title="Baby Products" />

      {/* Search + Cart */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 rounded-xl border-purple-200 bg-white/70 text-purple-900 placeholder:text-purple-300"
            data-ocid="products.search_input"
          />
        </div>
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
          }}
          data-ocid="products.cart.open_modal_button"
        >
          <ShoppingCart className="w-4 h-4" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Category Tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-5"
        style={{ scrollbarWidth: "none" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white/70 text-purple-600 border border-purple-200 hover:bg-purple-50"
            }`}
            data-ocid={"products.category.tab"}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="card-hover rounded-2xl p-4 flex flex-col gap-2 relative"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(192,132,222,0.18)",
              boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
            }}
            data-ocid={`products.item.${i + 1}`}
          >
            {product.badge && (
              <Badge
                className={`absolute top-3 left-3 text-xs ${
                  product.badge === "New" ? "bg-green-500" : "bg-amber-500"
                } text-white border-0`}
              >
                {product.badge}
              </Badge>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 text-lg transition-transform hover:scale-110"
              data-ocid={`products.wishlist.toggle.${i + 1}`}
            >
              <Heart
                className="w-5 h-5"
                fill={product.wishlisted ? "#EC4899" : "none"}
                stroke={product.wishlisted ? "#EC4899" : "#C084DE"}
              />
            </button>

            <div className="text-4xl text-center pt-5 pb-1">
              {product.emoji}
            </div>
            <div className="font-semibold text-purple-800 text-sm leading-snug">
              {product.name}
            </div>
            <div className="text-purple-400 text-xs leading-relaxed flex-1">
              {product.description}
            </div>
            <div className="flex items-center justify-between">
              <div className="font-bold text-purple-700 text-base">
                \u20B9{product.price.toLocaleString("en-IN")}
              </div>
              <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                <Star className="w-3 h-3 fill-amber-500" />
                {product.rating}
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => addToCart(product)}
              className="w-full rounded-xl text-xs mt-1"
              style={{
                background: "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                color: "#fff",
                border: "none",
              }}
              data-ocid={`products.add_to_cart.button.${i + 1}`}
            >
              Add to Cart
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            className="col-span-4 text-purple-300 text-center py-10"
            data-ocid="products.empty_state"
          >
            No products found
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          data-ocid="products.cart.modal"
        >
          <div
            className="flex-1 bg-black/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setCartOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close cart"
          />
          <div
            className="w-full max-w-sm bg-white shadow-2xl flex flex-col"
            style={{
              background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100">
              <div
                className="font-bold text-purple-800 text-lg"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                Your Cart
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="text-purple-400 hover:text-purple-600 text-xl"
                data-ocid="products.cart.close_button"
              >
                \u00D7
              </button>
            </div>
            <ScrollArea className="flex-1 px-6 py-4">
              {cart.length === 0 ? (
                <div
                  className="text-purple-300 text-center py-12"
                  data-ocid="products.cart.empty_state"
                >
                  Your cart is empty 🛒
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white/70 rounded-xl p-3"
                      data-ocid={`products.cart.item.${i + 1}`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="font-medium text-purple-800 text-sm">
                          {item.name}
                        </div>
                        <div className="text-purple-500 text-xs">
                          \u20B9{item.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm flex items-center justify-center hover:bg-purple-200"
                          data-ocid={`products.cart.qty_minus.${i + 1}`}
                        >
                          -
                        </button>
                        <span className="text-purple-800 font-bold text-sm w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-sm flex items-center justify-center hover:bg-purple-200"
                          data-ocid={`products.cart.qty_plus.${i + 1}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-purple-100">
                <div className="flex justify-between text-purple-800 font-semibold mb-3">
                  <span>Subtotal</span>
                  <span>\u20B9{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <Button
                  className="w-full rounded-xl font-bold text-base h-12"
                  style={{
                    background:
                      "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => {
                    toast.success(
                      "Order placed! 🎉 Your baby products are on the way.",
                    );
                    setCart([]);
                    setCartOpen(false);
                  }}
                  data-ocid="products.cart.checkout_button"
                >
                  Checkout →
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({
  onLogout,
  motherName,
  babyName,
}: { onLogout: () => void; motherName: string; babyName: string }) {
  const [activeSection, setActiveSection] = useState("baby-care");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["baby-care", "wellness", "community", "products"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { id: "baby-care", icon: Baby, label: "Baby Care" },
    { id: "wellness", icon: Heart, label: "Wellness" },
    { id: "community", icon: Users, label: "Community" },
    { id: "products", icon: ShoppingCart, label: "Products" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300"
      style={{
        background: "rgba(248,244,251,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(142,92,159,0.15)",
        borderBottom: "1.5px solid rgba(192,132,222,0.2)",
        height: "64px",
      }}
    >
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/assets/uploads/whatsapp_image_2026-03-27_at_12.21.23_pm-019d34a7-f0a0-7105-9a66-fca6a07c17fc-1.jpeg"
            alt="Mothera"
            className="w-8 h-8 rounded-full object-cover border-2 border-purple-200"
          />
          <span
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-base font-bold text-purple-700 hidden sm:block"
          >
            Mothera
          </span>
        </div>

        {/* Nav Links — centered */}
        <div className="flex items-center gap-1 flex-1 justify-center">
          {navLinks.map(({ id, icon: Icon, label }) => (
            <button
              type="button"
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === id
                  ? "bg-purple-100 text-purple-700"
                  : "text-purple-500 hover:bg-purple-50 hover:text-purple-700"
              }`}
              data-ocid={`nav.${id}.link`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden text-xs">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Greeting + Logout */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-right hidden md:block">
            <div className="text-xs font-semibold text-purple-700 leading-tight">
              {motherName || "Mom"} 💜
            </div>
            {babyName && (
              <div className="text-xs text-purple-400">Baby {babyName}</div>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onLogout}
            className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50 text-xs gap-1"
            data-ocid="nav.logout.button"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

// ─── BabyDashboard ────────────────────────────────────────────────────────────
interface BabyDashboardProps {
  babyUserInfo: BabyUserInfo;
  onLogout: () => void;
}

export default function BabyDashboard({
  babyUserInfo,
  onLogout,
}: BabyDashboardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const motherName = babyUserInfo.motherFirstName || "";
  const babyName = babyUserInfo.babyName || "";
  const babyDob = babyUserInfo.babyDateOfBirth || "";

  return (
    <div
      ref={scrollRef}
      style={{
        background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
        minHeight: "100vh",
      }}
    >
      <Toaster position="bottom-right" />

      <NavBar onLogout={onLogout} motherName={motherName} babyName={babyName} />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-24 pb-8">
        {/* Welcome Banner */}
        <div
          className="rounded-3xl px-8 py-6 mb-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-in"
          style={{
            background: "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
            boxShadow: "0 12px 40px rgba(124,58,237,0.25)",
          }}
        >
          <div className="text-5xl">\uD83D\uDC76</div>
          <div className="text-center sm:text-left">
            <h1
              style={{ fontFamily: "Fraunces, serif" }}
              className="text-2xl md:text-3xl font-bold text-white leading-snug"
            >
              Hello, {motherName || "Mama"}! 💜
            </h1>
            <p className="text-purple-200 text-sm mt-1">
              {babyName
                ? `Welcome to Baby ${babyName}'s dashboard — everything you need in one place.`
                : "Your all-in-one baby and wellness dashboard. You are doing amazing!"}
            </p>
          </div>
          {babyDob && (
            <div
              className="sm:ml-auto flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <div className="text-white text-xs opacity-80">Baby's Age</div>
              <div className="text-white font-bold text-xl">
                {getBabyAgeMonths(babyDob)}mo
              </div>
            </div>
          )}
        </div>

        {/* Modules */}
        <BabyCareModule babyDob={babyDob} />
        <MotherWellnessHub />
        <MothersCommunity />
        <BabyProducts />

        {/* Footer */}
        <footer className="text-center py-8 text-purple-300 text-sm">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Music className="w-4 h-4" />
            <span
              style={{ fontFamily: "Fraunces, serif" }}
              className="text-purple-600 font-semibold"
            >
              Mothera
            </span>
          </div>
          <p>Your trusted companion for every milestone 💜</p>
        </footer>
      </main>
    </div>
  );
}
