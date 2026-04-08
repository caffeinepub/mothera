import { Eye, EyeOff, Heart } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    onLogin();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #F8F4FB 0%, #EDE4F5 50%, #D8C8F0 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(142,92,159,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,164,230,0.22) 0%, transparent 70%)",
        }}
      />

      <div
        className="w-full max-w-md rounded-3xl p-8 relative"
        style={{
          background: "rgba(255,255,255,0.92)",
          boxShadow:
            "0 20px 60px rgba(142,92,159,0.18), 0 4px 20px rgba(142,92,159,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo + Branding */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full overflow-hidden mb-3 flex items-center justify-center"
            style={{ boxShadow: "0 4px 16px rgba(142,92,159,0.25)" }}
          >
            <img
              src="/assets/mothera-logo.jpeg"
              alt="Mothera Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm mt-1" style={{ color: "#7A7386" }}>
            Your pregnancy companion
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(142,92,159,0.2), transparent)",
          }}
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-semibold"
              style={{ color: "#2B1F3A" }}
            >
              Gmail or Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="login.input"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #E0D0F0",
                background: "#FAF7FD",
                color: "#2B1F3A",
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = "1.5px solid #8E5C9F";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(142,92,159,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = "1.5px solid #E0D0F0";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-semibold"
              style={{ color: "#2B1F3A" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-ocid="login.input"
                className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid #E0D0F0",
                  background: "#FAF7FD",
                  color: "#2B1F3A",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1.5px solid #8E5C9F";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(142,92,159,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1.5px solid #E0D0F0";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                style={{ color: "#8E5C9F" }}
                data-ocid="login.toggle"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              className="text-xs font-medium px-3 py-2 rounded-lg"
              style={{
                color: "#C0392B",
                background: "#FDF0EE",
                border: "1px solid #F5C6C6",
              }}
              data-ocid="login.error_state"
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 mt-2"
            style={{
              background: "linear-gradient(135deg, #8E5C9F 0%, #B07CC6 100%)",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(142,92,159,0.35)",
            }}
            data-ocid="login.submit_button"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(142,92,159,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(142,92,159,0.35)";
            }}
          >
            Sign In
          </button>
        </form>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          <Heart
            className="w-3.5 h-3.5"
            style={{ color: "#C8A4E6", fill: "#C8A4E6" }}
          />
          <p className="text-xs" style={{ color: "#B0A0C0" }}>
            Your journey to motherhood begins here
          </p>
          <Heart
            className="w-3.5 h-3.5"
            style={{ color: "#C8A4E6", fill: "#C8A4E6" }}
          />
        </div>
      </div>
    </div>
  );
}
