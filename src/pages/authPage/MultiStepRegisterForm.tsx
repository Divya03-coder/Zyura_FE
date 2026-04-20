/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import { Progress } from "@/components/ui/progress";
import AboutYourSelfTab from "./ProfileSetupTab";
import PreparingFor from "./PreparingFor";
import Preferences from "./Preferences";
import UploadProfile from "./UploadProfile";
import VerifyProfession from "./VerifyProfession";
import UpdatePreference from "./UpdatePreference";
import PlatformTraining from "./PlatformTraining";
import PayoutSetup from "./PayoutSetup";
import { MultiStepFormData } from "./schemas";
import { examOptions } from "./constants";
import { useUpdateInitialProfileMutation } from "@/store/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useUploadMentorDocumentMutation,
  useVerifyMentorProfessionMutation,
  useUpdateMentorPaymentInformationMutation,
} from "@/store/features/mentor/mentor.api";

export default function MultiStepRegisterForm() {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});
  const [selectedRole, setSelectedRole] = useState<string | "">("");
  const navigate = useNavigate();

  const [updateInitialProfile] = useUpdateInitialProfileMutation();
  const [uploadMentorDocument] = useUploadMentorDocumentMutation();
  const [verifyMentorProfession] = useVerifyMentorProfessionMutation();
  const [updateMentorPaymentInformation] =
    useUpdateMentorPaymentInformationMutation();

  // Determine steps based on role
  const role = selectedRole || formData.profile?.role;
  const isMentor = role === "mentor";
  const isProfessional = role === "professional";

  const steps = isMentor
    ? [
        "AboutYourSelfTab",
        "VerifyProfession",
        "UpdatePreference",
        "PlatformTraining",
        "PayoutSetup",
        // "UploadProfile", // User requested to remove this for mentor as bio/photo are handled earlier
      ]
    : isProfessional
    ? ["AboutYourSelfTab", "UploadProfile"] // Skip PreparingFor for Professional
    : ["AboutYourSelfTab", "PreparingFor", "UploadProfile"]; // Default Student flow
  const stepCount = steps.length;
  const progressValue = ((step + 1) / stepCount) * 100;

  const handleNext = async (partial: Partial<MultiStepFormData>) => {
    const currentStepName = steps[step];

    // Mentor-specific API calls
    if (isMentor) {
      // Call initial profile API when mentor completes Profile Setup (AboutYourSelfTab)
      if (currentStepName === "AboutYourSelfTab" && "profile" in partial) {
        const profileData = partial.profile as any;
        const payload = {
          role: "MENTOR",
          mentor: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            country: profileData.country,
            currentRole: profileData.currentRole || "",
            hospitalOrInstitute: profileData.hospitalOrInstitute || "",
            specialty: profileData.specialty || "",
            professionalExperience: profileData.experience || "",
            postgraduateDegree: profileData.postgraduateDegree || "",
            isConditionAccepted: true,
            bio: "",
          },
        };

        const formDataToSend = new FormData();
        formDataToSend.append("data", JSON.stringify(payload));

        try {
          await updateInitialProfile(formDataToSend).unwrap();
          toast.success("Profile information saved");
        } catch (err) {
          console.error("Initial profile save failed", err);
          toast.error("Failed to save profile information");
          return; // Stop progress
        }
      }

      if (
        currentStepName === "VerifyProfession" &&
        "verifyProfession" in partial
      ) {
        const files = partial.verifyProfession;
        const fd = new FormData();
        if (files?.photo) fd.append("profile_photo", files.photo);
        if (files?.degree) fd.append("degree", files.degree);
        if (files?.identity) fd.append("identity_card", files.identity);
        if (files?.certificate) fd.append("certificate", files.certificate);

        try {
          await uploadMentorDocument(fd).unwrap();
          toast.success("Documents uploaded successfully");
        } catch (err) {
          console.error("Document upload failed", err);
          toast.error("Failed to upload documents");
          return; // Stop progress
        }
      }

      if (
        currentStepName === "UpdatePreference" &&
        "updatePreference" in partial
      ) {
        const pref = partial.updatePreference!;

        // Transform availability
        // Input: { Monday: { enabled: true, slots: [{ startTime: "10:00 AM", endTime: "11:00 AM" }] }, ... }
        // Output: [{ day: "Monday", time: ["10:00 AM - 11:00 AM"] }]
        const availabilityArray = Object.entries(pref.availability || {})
          .filter(([_, val]: any) => val.enabled)
          .map(([day, val]: any) => ({
            day,
            time: (val.slots || [])
              .filter((slot: any) => slot.startTime && slot.endTime)
              .map((slot: any) => `${slot.startTime} - ${slot.endTime}`),
          }));

        const payload = {
          bio: pref.bio,
          skills: pref.subjects, // Mapping subjects to skills as deduced
          languages: pref.languages,
          hourlyRate: pref.hourlyRate,
          currency: pref.currency,
          availability: availabilityArray,
        };

        try {
          await verifyMentorProfession(payload).unwrap();
          toast.success("Professional info saved");
        } catch (err) {
          console.error("Professional info save failed", err);
          toast.error("Failed to save professional info");
          return;
        }
      }

      if (currentStepName === "PayoutSetup" && "payoutSetup" in partial) {
        // Payload is constructed in PayoutSetup or here.
        // Assuming partial.payoutSetup contains valid structure or needs simple wrapper.
        // User req: { bankInformation: { ... } }
        const pData = partial.payoutSetup as any;
        const payload = {
          bankInformation: {
            accountHolderName: pData.accountHolderName,
            bankName: pData.bankName,
            accountNumber: pData.accountNumber,
            routingNumber: pData.routingNumber,
            accountType: pData.accountType,
          },
        };

        try {
          await updateMentorPaymentInformation(payload).unwrap();
          toast.success("Payout information saved");
          // For mentor, this might be the last step, so we might want to navigate or show success
          navigate("/login"); // or dashboard? User said "completed registration" usually goes to login or dashboard.
          // However, handleNext also updates local state.
        } catch (err) {
          console.error("Payout save failed", err);
          toast.error("Failed to save payout info");
          return;
        }
      }
    }

    setFormData((prev: any) => ({ ...prev, ...partial }));

    // For mentors, PayoutSetup is the last step index 4 (0-based) based on new array (length 5)
    // If it's the last step, we are done.
    if (step < stepCount - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSkip = (key: keyof MultiStepFormData, emptyValue: any = {}) => {
    setFormData((prev) => ({ ...prev, [key]: emptyValue }));
    setStep((s) => Math.min(s + 1, stepCount - 1));
  };

  const handleFinalSubmit = async (partial: Partial<MultiStepFormData>) => {
    const merged = { ...formData, ...partial } as MultiStepFormData;

    console.log("Full collected form data:", merged);

    const currentRole = merged.profile.role;
    let payload: any = {};

    if (currentRole === "student") {
      payload = {
        role: "STUDENT",
        student: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          university: merged.profile.university,
          country: merged.profile.country,
          year_of_study: merged.profile.academicYear,
          studentType: merged.profile.subRole,
          preparingFor: (
            ("preparing" in merged ? (merged.preparing as any)?.exams : []) ||
            []
          )
            .map((id: any) => {
              const option = examOptions.find((opt: any) => opt.id === id);
              return option
                ? {
                    examName: option.examName,
                    description: option.description,
                  }
                : null;
            })
            .filter((item: any) => item !== null),
        },
        preference: {
          subject:
            ("preferences" in merged &&
              merged.preferences?.subjectPreference) ||
            "",
          systemPreference:
            ("preferences" in merged && merged.preferences?.systemPreference) ||
            "",
          topic: ("preferences" in merged && merged.preferences?.topic) || "",
          subTopic:
            ("preferences" in merged && merged.preferences?.subTopic) || "",
        },
        bio: merged.upload?.bio || "",
      };
    } else if (currentRole === "professional") {
      payload = {
        role: "PROFESSIONAL",
        professional: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          professionName: merged.profile.subRole,
          institution: merged.profile.hospital,
          country: merged.profile.country,
          post_graduate: merged.profile.postgraduateYear,
          experience: merged.profile.experience,
          bio: merged.upload?.bio || "",
          // profile_photo: "will be handled by backend from image field"
        },
      };
    } else if (currentRole === "mentor") {
      payload = {
        role: "MENTOR",
        mentor: {
          firstName: merged.profile.firstName,
          lastName: merged.profile.lastName,
          country: merged.profile.country,
          currentRole: (merged.profile as any).currentRole || "",
          hospitalOrInstitute:
            (merged.profile as any).hospitalOrInstitute || "",
          specialty: (merged.profile as any).specialty || "",
          professionalExperience: (merged.profile as any).experience || "",
          postgraduateDegree: (merged.profile as any).postgraduateDegree || "",
          isConditionAccepted: true,
          bio: merged.upload?.bio || "",
        },
      };
    }

    // Console log the full data for backend reference
    console.log("Backend payload structure:", payload);
    /* 
      Full collected data for future use:
      ${JSON.stringify(merged, null, 2)}
    */

    const formDataToSend = new FormData();
    if (merged.upload?.photo) {
      formDataToSend.append("image", merged.upload.photo);
    }
    formDataToSend.append("data", JSON.stringify(payload));

    try {
      const res = await updateInitialProfile(formDataToSend).unwrap();
      console.log("API response:", res);
      if (res.success === true) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <div>
      <div className="border-b-2 border-b-slate-300">
        <CommonWrapper>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-7">
              <img src="/logo.svg" className="h-16" alt="logo" />
              <h2 className="text-xl font-semibold">Medical Student Hub</h2>
            </div>
            <p>
              Step {step + 1} of {stepCount}
            </p>
          </div>
        </CommonWrapper>
      </div>

      <CommonWrapper>
        <div className="max-w-7xl mx-auto mt-4">
          <Progress
            value={progressValue}
            className="h-2 mb-6 [&>div]:bg-[#0D71CF]"
          />

          <div className="min-h-[150px] flex items-center justify-center rounded-lg p-6 mb-6">
            {steps[step] === "AboutYourSelfTab" && (
              <AboutYourSelfTab
                defaultValues={formData.profile ?? undefined}
                onRoleChange={(role: any) => setSelectedRole(role)}
                onNext={(profile) => handleNext({ profile } as any)}
              />
            )}
            {steps[step] === "PreparingFor" && (
              <PreparingFor
                defaultValues={
                  "preparing" in formData ? formData.preparing : undefined
                }
                onBack={handleBack}
                onNext={(preparing) => handleNext({ preparing })}
              />
            )}

            {steps[step] === "Preferences" && (
              <Preferences
                defaultValues={
                  "preferences" in formData ? formData.preferences : undefined
                }
                onBack={handleBack}
                onNext={(preferences) => handleNext({ preferences })}
                onSkip={() =>
                  handleSkip("preferences" as keyof MultiStepFormData, {
                    subjectPreference: "",
                    systemPreference: "",
                    topic: "",
                    subTopic: "",
                  })
                }
              />
            )}

            {steps[step] === "VerifyProfession" && (
              <VerifyProfession
                defaultValues={
                  "verifyProfession" in formData
                    ? formData.verifyProfession
                    : undefined
                }
                onBack={handleBack}
                onNext={(verifyProfession) => handleNext({ verifyProfession })}
                onSkip={() => handleSkip("verifyProfession" as any)}
              />
            )}

            {steps[step] === "UpdatePreference" && (
              <UpdatePreference
                defaultValues={
                  "updatePreference" in formData
                    ? formData.updatePreference
                    : undefined
                }
                onBack={handleBack}
                onNext={(updatePreference) => handleNext({ updatePreference })}
                onSkip={() => handleSkip("updatePreference" as any)}
              />
            )}

            {steps[step] === "PlatformTraining" && (
              <PlatformTraining
                defaultValues={
                  "platformTraining" in formData
                    ? formData.platformTraining
                    : undefined
                }
                onBack={handleBack}
                onNext={(platformTraining) => handleNext({ platformTraining })}
                onSkip={() =>
                  handleSkip("platformTraining" as any, {
                    trainingCompleted: true,
                  })
                }
              />
            )}

            {steps[step] === "PayoutSetup" && (
              <PayoutSetup
                defaultValues={
                  "payoutSetup" in formData ? formData.payoutSetup : undefined
                }
                onBack={handleBack}
                onNext={(payoutSetup) => handleNext({ payoutSetup })}
                onSkip={() => handleSkip("payoutSetup" as any)}
              />
            )}
            {steps[step] === "UploadProfile" && (
              <UploadProfile
                defaultValues={formData.upload ?? undefined}
                onBack={handleBack}
                onNext={(upload) => handleFinalSubmit({ upload })}
                onSkip={() =>
                  handleFinalSubmit({ upload: { photo: null, bio: "" } })
                }
              />
            )}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
