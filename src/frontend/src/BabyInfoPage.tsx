import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Baby, User } from "lucide-react";
import { useState } from "react";

export interface BabyUserInfo {
  motherFirstName: string;
  motherLastName: string;
  motherDob: string;
  motherPhone: string;
  motherBloodGroup: string;
  babyName: string;
  babyGender: string;
  babyDateOfBirth: string;
  babyBloodGroup: string;
  babyWeight: string;
  babyHeight: string;
}

interface BabyInfoPageProps {
  onComplete: (data: BabyUserInfo) => void;
}

export default function BabyInfoPage({ onComplete }: BabyInfoPageProps) {
  const [form, setForm] = useState<BabyUserInfo>({
    motherFirstName: "",
    motherLastName: "",
    motherDob: "",
    motherPhone: "",
    motherBloodGroup: "",
    babyName: "",
    babyGender: "",
    babyDateOfBirth: "",
    babyBloodGroup: "",
    babyWeight: "",
    babyHeight: "",
  });
  const [warn, setWarn] = useState(false);

  const set = (field: keyof BabyUserInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (warn) setWarn(false);
  };

  const handleContinue = () => {
    const hasAny = Object.values(form).some((v) => v.trim() !== "");
    if (!hasAny) {
      setWarn(true);
      return;
    }
    onComplete(form);
  };

  const inputClass =
    "bg-white/70 border-purple-200 focus:border-purple-400 focus:ring-purple-300 rounded-xl h-11 text-purple-900 placeholder:text-purple-300";
  const labelClass = "text-purple-700 font-medium text-sm mb-1 block";

  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, #F8F4FB 0%, #EDE4F5 50%, #E0D4F7 100%)",
        minHeight: "100vh",
      }}
      className="flex flex-col items-center px-4 py-10"
    >
      {/* Logo + Heading */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-5">
          <img
            src="/assets/uploads/whatsapp_image_2026-03-27_at_12.21.23_pm-019d34a7-f0a0-7105-9a66-fca6a07c17fc-1.jpeg"
            alt="Mothera Logo"
            className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-purple-200"
          />
          <span
            style={{ fontFamily: "Fraunces, serif" }}
            className="text-3xl font-bold text-purple-700 tracking-tight"
          >
            Mothera
          </span>
        </div>
        <h1
          style={{ fontFamily: "Fraunces, serif" }}
          className="text-2xl md:text-3xl font-semibold text-purple-800 text-center leading-snug"
        >
          Welcome, Mom 💜 — Tell Us About You & Your Baby
        </h1>
        <p className="text-purple-500 text-center mt-2 text-sm md:text-base max-w-md">
          We'll personalise your experience. All fields are optional — fill what
          you're comfortable with.
        </p>
      </div>

      {warn && (
        <div className="mb-6 bg-pink-50 border border-pink-200 text-pink-700 rounded-xl px-5 py-3 text-sm text-center max-w-2xl w-full">
          Please fill in at least one field before continuing.
        </div>
      )}

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Mother's Details */}
        <section className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="text-purple-700 font-semibold text-base">
              Mother's Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass}>First Name</Label>
              <Input
                placeholder="e.g. Priya"
                className={inputClass}
                value={form.motherFirstName}
                onChange={(e) => set("motherFirstName", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Last Name</Label>
              <Input
                placeholder="e.g. Sharma"
                className={inputClass}
                value={form.motherLastName}
                onChange={(e) => set("motherLastName", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Date of Birth</Label>
              <Input
                type="date"
                className={inputClass}
                value={form.motherDob}
                onChange={(e) => set("motherDob", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Phone Number</Label>
              <Input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                className={inputClass}
                value={form.motherPhone}
                onChange={(e) => set("motherPhone", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label className={labelClass}>Blood Group</Label>
              <Select onValueChange={(v) => set("motherBloodGroup", v)}>
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bg) => (
                      <SelectItem key={bg} value={bg}>
                        {bg}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Baby's Details */}
        <section className="bg-white/60 backdrop-blur-sm border border-pink-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <Baby className="w-4 h-4 text-pink-500" />
            </div>
            <h2 className="text-purple-700 font-semibold text-base">
              Baby's Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className={labelClass}>Baby's Name</Label>
              <Input
                placeholder="e.g. Aarav"
                className={inputClass}
                value={form.babyName}
                onChange={(e) => set("babyName", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Gender</Label>
              <Select onValueChange={(v) => set("babyGender", v)}>
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Boy">Boy</SelectItem>
                  <SelectItem value="Girl">Girl</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={labelClass}>Date of Birth</Label>
              <Input
                type="date"
                className={inputClass}
                value={form.babyDateOfBirth}
                onChange={(e) => set("babyDateOfBirth", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Blood Group</Label>
              <Select onValueChange={(v) => set("babyBloodGroup", v)}>
                <SelectTrigger className={`${inputClass} w-full`}>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (bg) => (
                      <SelectItem key={bg} value={bg}>
                        {bg}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={labelClass}>Weight at Birth (kg)</Label>
              <Input
                type="number"
                step="0.1"
                min={0.5}
                max={6}
                placeholder="e.g. 3.2"
                className={inputClass}
                value={form.babyWeight}
                onChange={(e) => set("babyWeight", e.target.value)}
              />
            </div>
            <div>
              <Label className={labelClass}>Height at Birth (cm)</Label>
              <Input
                type="number"
                step="0.5"
                min={20}
                max={65}
                placeholder="e.g. 50"
                className={inputClass}
                value={form.babyHeight}
                onChange={(e) => set("babyHeight", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <Button
            onClick={handleContinue}
            className="w-full sm:w-auto px-10 h-12 text-base font-semibold rounded-2xl shadow-md"
            style={{
              background: "linear-gradient(135deg, #9B59D0 0%, #7C3AED 100%)",
              color: "#fff",
              border: "none",
            }}
          >
            Continue to Dashboard →
          </Button>
          <button
            type="button"
            onClick={() => onComplete(form)}
            className="text-purple-400 text-sm hover:text-purple-600 underline-offset-2 hover:underline transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
