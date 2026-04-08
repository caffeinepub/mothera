import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Maternity Wear",
  "Baby Clothing",
  "Feeding & Nursing",
  "Nursery & Decor",
  "Toys",
  "Health & Safety",
  "Skincare",
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Maternity Kurta Set",
    description: "Comfortable cotton, free size, 3 colours",
    price: 1299,
    rating: 4.6,
    emoji: "👗",
    category: "Maternity Wear",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 2,
    name: "Nursing Bra Pack",
    description: "Soft, stretchable, easy clip — 2 pack",
    price: 799,
    rating: 4.5,
    emoji: "🩱",
    category: "Maternity Wear",
    wishlisted: false,
  },
  {
    id: 3,
    name: "Maternity Leggings",
    description: "High waist, full panel, breathable fabric",
    price: 549,
    rating: 4.4,
    emoji: "👖",
    category: "Maternity Wear",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 4,
    name: "Belly Support Band",
    description: "Adjustable, relieves back & pelvic pain",
    price: 649,
    rating: 4.7,
    emoji: "🩹",
    category: "Maternity Wear",
    wishlisted: false,
  },
  {
    id: 5,
    name: "Carter's Onesie 5-Pack",
    description: "100% cotton, snap closures, unisex",
    price: 1200,
    rating: 4.6,
    emoji: "👶",
    category: "Baby Clothing",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 6,
    name: "Baby Sleep Sack",
    description: "0.5 TOG, safe sleepwear for newborns",
    price: 799,
    rating: 4.5,
    emoji: "🛌",
    category: "Baby Clothing",
    wishlisted: false,
  },
  {
    id: 7,
    name: "Muslin Swaddle Blanket",
    description: "Breathable, organic muslin, 3-pack",
    price: 649,
    rating: 4.8,
    emoji: "🧣",
    category: "Baby Clothing",
    wishlisted: false,
  },
  {
    id: 8,
    name: "Cotton Mittens & Booties",
    description: "Prevents scratching, keeps toes warm, 3-pair",
    price: 249,
    rating: 4.3,
    emoji: "🧤",
    category: "Baby Clothing",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 9,
    name: "Avent Baby Bottle Set",
    description: "Anti-colic, BPA-free, 4-pack, 125ml",
    price: 899,
    rating: 4.5,
    emoji: "🍼",
    category: "Feeding & Nursing",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 10,
    name: "Medela Breast Pump",
    description: "Double electric, portable & whisper-quiet",
    price: 4500,
    rating: 4.7,
    emoji: "🤱",
    category: "Feeding & Nursing",
    wishlisted: false,
  },
  {
    id: 11,
    name: "Nursing Pillow",
    description: "C-shaped, memory foam, washable cover",
    price: 1199,
    rating: 4.6,
    emoji: "🛋️",
    category: "Feeding & Nursing",
    wishlisted: false,
  },
  {
    id: 12,
    name: "Nuby Silicone Spoon Set",
    description: "Soft-tip, heat-sensitive, 4 colours",
    price: 299,
    rating: 4.4,
    emoji: "🥄",
    category: "Feeding & Nursing",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 13,
    name: "Wooden Crib (4-in-1)",
    description: "Convertible, solid pine wood, natural finish",
    price: 12999,
    rating: 4.8,
    emoji: "🪵",
    category: "Nursery & Decor",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 14,
    name: "Night Light Projector",
    description: "Star projector + lullabies + timer",
    price: 999,
    rating: 4.6,
    emoji: "🌟",
    category: "Nursery & Decor",
    wishlisted: false,
  },
  {
    id: 15,
    name: "Diaper Bag Backpack",
    description: "Waterproof, 14 pockets, unisex",
    price: 1499,
    rating: 4.7,
    emoji: "🎒",
    category: "Nursery & Decor",
    wishlisted: false,
  },
  {
    id: 16,
    name: "Changing Table",
    description: "Foldable, with 2 storage shelves",
    price: 8999,
    rating: 4.5,
    emoji: "🪑",
    category: "Nursery & Decor",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 17,
    name: "Fisher-Price Activity Gym",
    description: "5 activity zones, tummy time mat",
    price: 2199,
    rating: 4.7,
    emoji: "🎯",
    category: "Toys",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 18,
    name: "Soft Rattle Set",
    description: "BPA-free, sensory play, 6-piece set",
    price: 349,
    rating: 4.4,
    emoji: "🔔",
    category: "Toys",
    wishlisted: false,
  },
  {
    id: 19,
    name: "Musical Crib Mobile",
    description: "Rotating animals + lullabies + remote",
    price: 1899,
    rating: 4.6,
    emoji: "🎵",
    category: "Toys",
    wishlisted: false,
  },
  {
    id: 20,
    name: "Baby Monitor",
    description: "720p video, night vision, 2-way audio",
    price: 3499,
    rating: 4.7,
    emoji: "📹",
    category: "Health & Safety",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 21,
    name: "Cabinet Locks 10-Pack",
    description: "Magnetic, adhesive, no tools needed",
    price: 299,
    rating: 4.5,
    emoji: "🔒",
    category: "Health & Safety",
    wishlisted: false,
  },
  {
    id: 22,
    name: "Digital Thermometer",
    description: "Ear & forehead, 1-second reading",
    price: 799,
    rating: 4.6,
    emoji: "🌡️",
    category: "Health & Safety",
    badge: "New",
    wishlisted: false,
  },
  {
    id: 23,
    name: "Johnson's Baby Lotion",
    description: "Clinically proven mild formula, 200ml",
    price: 185,
    rating: 4.5,
    emoji: "🧴",
    category: "Skincare",
    badge: "Best Seller",
    wishlisted: false,
  },
  {
    id: 24,
    name: "Sebamed Baby Wash",
    description: "pH 5.5, dermatologist tested, 200ml",
    price: 499,
    rating: 4.6,
    emoji: "🛁",
    category: "Skincare",
    wishlisted: false,
  },
];

const SORT_OPTIONS = [
  "Popular",
  "Price: Low to High",
  "Price: High to Low",
  "New Arrivals",
];

// ─── ShoppingPage ──────────────────────────────────────────────────────────────
interface ShoppingPageProps {
  onLogout: () => void;
  topNavSlot: React.ReactNode;
  bottomNavSlot: React.ReactNode;
}

export default function ShoppingPage({
  onLogout: _onLogout,
  topNavSlot,
  bottomNavSlot,
}: ShoppingPageProps) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

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
  };

  const updateQty = (id: number, delta: number) =>
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0),
    );

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const filtered = products
    .filter((p) => {
      const matchCat =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "New Arrivals")
        return (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0);
      return (
        (b.badge === "Best Seller" ? 1 : 0) -
        (a.badge === "Best Seller" ? 1 : 0)
      );
    });

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F8F4FB 0%, #EDE4F5 100%)",
        minHeight: "100vh",
      }}
    >
      {topNavSlot}

      <main className="max-w-5xl mx-auto px-4 pt-20 pb-24">
        {/* Promo Banner */}
        <div
          className="rounded-3xl px-8 py-5 mb-8 animate-fade-in flex items-center gap-4"
          style={{
            background:
              "linear-gradient(135deg, #6B21A8 0%, #9B59D0 50%, #C084DE 100%)",
            boxShadow: "0 12px 40px rgba(107,33,168,0.3)",
          }}
        >
          <div className="text-4xl">🛍️</div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">
              Baby & Maternity Shop
            </h1>
            <p className="text-purple-200 text-sm">
              Everything you need for your journey 💜
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-white text-2xl font-bold">Up to 40% off</div>
            <div className="text-purple-200 text-xs">on Baby Essentials</div>
          </div>
        </div>

        {/* Search + Sort + Cart */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1.5px solid #D8C0F0",
                color: "#2B1F3A",
              }}
              data-ocid="shopping.search_input"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-sm font-medium outline-none cursor-pointer hidden sm:block"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1.5px solid #D8C0F0",
              color: "#8E5C9F",
            }}
            data-ocid="shopping.sort_select"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }}
            data-ocid="shopping.cart.open_button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Filters */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-6"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "text-white shadow-sm"
                  : "text-purple-600 border border-purple-200 hover:bg-purple-50"
              }`}
              style={
                selectedCategory === cat
                  ? { background: "linear-gradient(135deg, #8E5C9F, #B07CC6)" }
                  : { background: "rgba(255,255,255,0.85)" }
              }
              data-ocid="shopping.category.filter"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="rounded-2xl p-4 flex flex-col gap-2 relative card-hover"
              style={{
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(192,132,222,0.18)",
                boxShadow: "0 4px 16px rgba(142,92,159,0.08)",
              }}
              data-ocid={`shopping.product.${i + 1}`}
            >
              {product.badge && (
                <span
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-white text-xs font-semibold"
                  style={{
                    background: product.badge === "New" ? "#22C55E" : "#F59E0B",
                  }}
                >
                  {product.badge}
                </span>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 transition-transform hover:scale-110"
                aria-label={
                  product.wishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                data-ocid={`shopping.wishlist.${i + 1}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={product.wishlisted ? "#EC4899" : "none"}
                  stroke={product.wishlisted ? "#EC4899" : "#C084DE"}
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
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
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-purple-700 text-base">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  {product.rating}
                </div>
              </div>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-full py-2 rounded-xl text-white text-xs font-semibold transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #8E5C9F, #B07CC6)",
                }}
                data-ocid={`shopping.add_to_cart.${i + 1}`}
              >
                Add to Cart
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              className="col-span-4 text-center py-16"
              data-ocid="shopping.empty_state"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-purple-400 text-sm">
                No products found for your search.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          data-ocid="shopping.cart.modal"
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
              <div className="font-bold text-purple-800 text-lg">
                Your Cart 🛒
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="text-purple-400 hover:text-purple-700 text-2xl leading-none"
                data-ocid="shopping.cart.close_button"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div
                  className="text-center py-16"
                  data-ocid="shopping.cart.empty_state"
                >
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-purple-300 text-sm">Your cart is empty</p>
                  <p className="text-purple-200 text-xs mt-1">
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white/70 rounded-xl p-3"
                      data-ocid={`shopping.cart.item.${i + 1}`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-purple-800 text-sm truncate">
                          {item.name}
                        </div>
                        <div className="text-purple-500 text-xs">
                          ₹{item.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-200 text-sm font-bold"
                          data-ocid={`shopping.cart.qty_minus.${i + 1}`}
                        >
                          -
                        </button>
                        <span className="text-purple-800 font-bold text-sm w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-200 text-sm font-bold"
                          data-ocid={`shopping.cart.qty_plus.${i + 1}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-purple-100">
                <div className="flex justify-between text-purple-800 font-semibold mb-1">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-purple-400 text-xs mb-4">
                  Free delivery on orders above ₹999
                </p>
                {checkoutDone ? (
                  <div
                    className="text-center py-3 rounded-xl font-semibold text-green-700 text-sm animate-fade-in"
                    style={{ background: "#D1FAE5" }}
                  >
                    🎉 Order placed! Your products are on the way.
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #8E5C9F, #B07CC6)",
                    }}
                    onClick={() => {
                      setCheckoutDone(true);
                      setCart([]);
                      setTimeout(() => {
                        setCheckoutDone(false);
                        setCartOpen(false);
                      }, 3000);
                    }}
                    data-ocid="shopping.cart.checkout_button"
                  >
                    Checkout → ₹{subtotal.toLocaleString("en-IN")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {bottomNavSlot}
    </div>
  );
}
