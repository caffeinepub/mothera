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
import { Heart, Phone, User } from "lucide-react";
import { useState } from "react";

export interface UserInfo {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  bloodGroup: string;
  dueDate: string;
  pregnancyConfirmDate: string;
  pregnancyWeek: string;
  previousPregnancies: string;
  doctorName: string;
  emergencyName: string;
  emergencyPhone: string;
}

interface PersonalInfoPageProps {
  onComplete: (data: UserInfo) => void;
}

export default function PersonalInfoPage({
  onComplete,
}: PersonalInfoPageProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    bloodGroup: "",
    dueDate: "",
    pregnancyConfirmDate: "",
    pregnancyWeek: "",
    previousPregnancies: "",
    doctorName: "",
    emergencyName: "",
    emergencyPhone: "",
  });
  const [warn, setWarn] = useState(false);

  const set = (field: string, value: string) => {
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
            src="/assets/mothera-logo.jpeg"
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
          Welcome to Mothera 💜 — Tell Us About You
        </h1>
        <p className="text-purple-500 text-center mt-2 text-sm md:text-base max-w-md">
          We'll personalise your journey based on your details. You can skip
          fields and fill them later.
        </p>
      </div>

      {warn && (
        <div
          data-ocid="personal_info.error_state"
          className="mb-6 bg-pink-50 border border-pink-200 text-pink-700 rounded-xl px-5 py-3 text-sm text-center max-w-2xl w-full"
        >
          Please fill in at least one field before continuing.
        </div>
      )}

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Section: Personal Details */}
        <section
          className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-sm p-6"
          data-ocid="personal_info.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="text-purple-700 font-semibold text-base">
              Personal Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className={labelClass}>
                First Name
              </Label>
              <Input
                id="firstName"
                data-ocid="personal_info.input"
                placeholder="e.g. Priya"
                className={inputClass}
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName" className={labelClass}>
                Last Name
              </Label>
              <Input
                id="lastName"
                data-ocid="personal_info.input"
                placeholder="e.g. Sharma"
                className={inputClass}
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dob" className={labelClass}>
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                data-ocid="personal_info.input"
                className={inputClass}
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone" className={labelClass}>
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                data-ocid="personal_info.input"
                placeholder="e.g. +91 98765 43210"
                className={inputClass}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bloodGroup" className={labelClass}>
                Blood Group
              </Label>
              <Select onValueChange={(v) => set("bloodGroup", v)}>
                <SelectTrigger
                  id="bloodGroup"
                  data-ocid="personal_info.select"
                  className={`${inputClass} w-full`}
                >
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
              <Label htmlFor="doctorName" className={labelClass}>
                Doctor's Name
              </Label>
              <Input
                id="doctorName"
                data-ocid="personal_info.input"
                placeholder="e.g. Dr. Meena Kapoor"
                className={inputClass}
                value={form.doctorName}
                onChange={(e) => set("doctorName", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section: Pregnancy Details */}
        <section
          className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-sm p-6"
          data-ocid="pregnancy_info.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-500" />
            </div>
            <h2 className="text-purple-700 font-semibold text-base">
              Pregnancy Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate" className={labelClass}>
                Expected Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                data-ocid="pregnancy_info.input"
                className={inputClass}
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pregnancyConfirmDate" className={labelClass}>
                Date of Pregnancy Confirmation
              </Label>
              <Input
                id="pregnancyConfirmDate"
                type="date"
                data-ocid="pregnancy_info.input"
                className={inputClass}
                value={form.pregnancyConfirmDate}
                onChange={(e) => set("pregnancyConfirmDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pregnancyWeek" className={labelClass}>
                Current Pregnancy Week
              </Label>
              <Input
                id="pregnancyWeek"
                type="number"
                min={1}
                max={42}
                data-ocid="pregnancy_info.input"
                placeholder="e.g. 20"
                className={inputClass}
                value={form.pregnancyWeek}
                onChange={(e) => set("pregnancyWeek", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="previousPregnancies" className={labelClass}>
                Number of Previous Pregnancies
              </Label>
              <Input
                id="previousPregnancies"
                type="number"
                min={0}
                data-ocid="pregnancy_info.input"
                placeholder="e.g. 0"
                className={inputClass}
                value={form.previousPregnancies}
                onChange={(e) => set("previousPregnancies", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Section: Emergency Contact */}
        <section
          className="bg-white/60 backdrop-blur-sm border border-purple-100 rounded-2xl shadow-sm p-6"
          data-ocid="emergency_info.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-4 h-4 text-red-500" />
            </div>
            <h2 className="text-purple-700 font-semibold text-base">
              Emergency Contact
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyName" className={labelClass}>
                Emergency Contact Name
              </Label>
              <Input
                id="emergencyName"
                data-ocid="emergency_info.input"
                placeholder="e.g. Rahul Sharma"
                className={inputClass}
                value={form.emergencyName}
                onChange={(e) => set("emergencyName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone" className={labelClass}>
                Emergency Contact Number
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                data-ocid="emergency_info.input"
                placeholder="e.g. +91 98765 43210"
                className={inputClass}
                value={form.emergencyPhone}
                onChange={(e) => set("emergencyPhone", e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <Button
            data-ocid="personal_info.primary_button"
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
            data-ocid="personal_info.secondary_button"
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
