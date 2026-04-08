import { Baby, Heart } from "lucide-react";

interface RoleSelectionPageProps {
  onPregnancy: () => void;
  onBaby: () => void;
}

export default function RoleSelectionPage({
  onPregnancy,
  onBaby,
}: RoleSelectionPageProps) {
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
        className="w-full max-w-lg rounded-3xl p-8 relative"
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

        <h2
          className="text-center text-lg font-bold mb-2"
          style={{ color: "#2B1F3A" }}
        >
          How can Mothera help you today?
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: "#7A7386" }}>
          Choose the option that best describes you
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* I'm in Pregnancy */}
          <button
            type="button"
            onClick={onPregnancy}
            className="flex-1 flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-200 group"
            style={{
              background: "linear-gradient(135deg, #FAF0FF 0%, #F0E2FA 100%)",
              border: "2px solid #D8B4F0",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#8E5C9F";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(142,92,159,0.22)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#D8B4F0";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #8E5C9F 0%, #B07CC6 100%)",
              }}
            >
              <Heart
                className="w-8 h-8"
                style={{ color: "#fff", fill: "#fff" }}
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-base" style={{ color: "#8E5C9F" }}>
                I'm in Pregnancy
              </p>
              <p className="text-xs mt-1" style={{ color: "#9B8AAA" }}>
                Track your pregnancy journey week by week
              </p>
            </div>
          </button>

          {/* Already Having Baby */}
          <button
            type="button"
            onClick={onBaby}
            className="flex-1 flex flex-col items-center gap-4 rounded-2xl p-6 transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #FFF5FA 0%, #FAE8F2 100%)",
              border: "2px solid #F0C8E0",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C8648A";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(200,100,138,0.22)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#F0C8E0";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #C8648A 0%, #D8A0BA 100%)",
              }}
            >
              <Baby className="w-8 h-8" style={{ color: "#fff" }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-base" style={{ color: "#B05070" }}>
                Already Having Baby
              </p>
              <p className="text-xs mt-1" style={{ color: "#C0748A" }}>
                Track your newborn's health and wellness
              </p>
            </div>
          </button>
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
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
