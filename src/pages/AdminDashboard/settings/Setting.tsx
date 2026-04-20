import CommonSpace from "@/common/space/CommonSpace";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";
import {
  useGetSettingsQuery,
  usePostSettingsMutation,
} from "@/store/features/adminDashboard/settings/settingApi";
import { Save, Upload } from "lucide-react";
import React, { useEffect } from "react";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import Spinner from "@/common/button/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Zod schema for validation
 */
const settingsSchema = z.object({
  platformName: z
    .string()
    .min(2, "Platform name must be at least 2 characters")
    .max(100, "Platform name is too long"),
  tagline: z.string().max(150),
  description: z.string().max(1000),
  primaryColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Enter a valid HEX color"),
  accentColor: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Enter a valid HEX color"),
  supportEmail: z.string().email("Enter a valid email"),
  websiteUrl: z.string().url("Enter a valid URL"),
  // platformLogo and favicon hold base64 data or data URL strings; optional
  platformLogo: z.string().optional().or(z.literal("")),
  favicon: z.string().optional().or(z.literal("")),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export const inputClass = {
  input:
    "text-sm font-normal  text-[#0F172A]  font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal  text-[#18181B]  font-inter leading-[20px] block mb-2",
  error: "text-red-500 text-sm mt-1",
};

const defaultValues: SettingsFormValues = {
  platformName: "Zvural",
  tagline: "Your AI-Powered Medical Learning Platform",
  description:
    "Empowering medical students and professionals with AI-driven learning tools.",
  primaryColor: "#2563EB",
  accentColor: "#F97316",
  supportEmail: "support@medportal.com",
  websiteUrl: "https://medportal.com",
  platformLogo: "",
  favicon: "",
};

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Problem reading file"));
    };
    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.readAsDataURL(file);
  });

const Setting: React.FC = () => {
  const [postSettings, { isLoading: isPosting }] = usePostSettingsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const watched = watch();

  useEffect(() => {
    if (watched.primaryColor) {
      setValue("primaryColor", watched.primaryColor.toUpperCase(), {
        shouldValidate: false,
      });
    }
    if (watched.accentColor) {
      setValue("accentColor", watched.accentColor.toUpperCase(), {
        shouldValidate: false,
      });
    }
  }, []);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      const payload = {
        platformName: data.platformName,
        tagline: data.tagline,
        description: data.description,
        platformLogo: data.platformLogo ?? "",
        favicon: data.favicon ?? "",
        primaryColor: data.primaryColor,
        accentColor: data.accentColor,
        supportEmail: data.supportEmail,
        websiteURL: data.websiteUrl,
      };

      await postSettings(payload).unwrap();
    } catch (err) {
      console.error("Save settings failed:", err);
    }
  };

  const handleResetToDefault = async () => {
    try {
      reset(defaultValues);
      const payload = {
        platformName: defaultValues.platformName,
        tagline: defaultValues.tagline,
        description: defaultValues.description,
        platformLogo: defaultValues.platformLogo ?? "",
        favicon: defaultValues.favicon ?? "",
        primaryColor: defaultValues.primaryColor,
        accentColor: defaultValues.accentColor,
        supportEmail: defaultValues.supportEmail,
        websiteURL: defaultValues.websiteUrl,
      };

      await postSettings(payload).unwrap();
    } catch (error) {
      console.error("Failed to reset settings:", error);
    }
  };

  // file input handlers
  const handlePlatformLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setValue("platformLogo", dataUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to read logo file");
    }
  };

  const handleFaviconChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setValue("favicon", dataUrl, { shouldValidate: true, shouldDirty: true });
    } catch (err) {
      console.error(err);
      alert("Failed to read favicon file");
    }
  };

  const removePlatformLogo = () =>
    setValue("platformLogo", "", { shouldValidate: false });
  const removeFavicon = () =>
    setValue("favicon", "", { shouldValidate: false });

  // get values
  const { data: settings, isLoading } = useGetSettingsQuery();

  useEffect(() => {
    if (settings?.success && settings.data) {
      const fetched = settings.data;

      reset({
        platformName: fetched.platformName || defaultValues.platformName,
        tagline: fetched.tagline || defaultValues.tagline,
        description: fetched.description || defaultValues.description,
        primaryColor: fetched.primaryColor || defaultValues.primaryColor,
        accentColor: fetched.accentColor || defaultValues.accentColor,
        supportEmail: fetched.supportEmail || defaultValues.supportEmail,
        websiteUrl: fetched.websiteURL || defaultValues.websiteUrl,
        platformLogo: fetched.platformLogo || "",
        favicon: fetched.favicon || "",
      });
    }
  }, [settings, reset]);

  return (
    <div className="">
      <DashboardTopSection
        title=" White Label Settings"
        description="  Customize your platform branding and identity"
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <CommonSpace className="">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-8">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Platform Identity
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className={inputClass.label}>Platform Name</label>
                      <input
                        {...register("platformName")}
                        type="text"
                        name="platformName"
                        className={inputClass.input}
                      />
                      {errors.platformName && (
                        <p className={inputClass.error}>
                          {errors.platformName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={inputClass.label}>Tagline</label>
                      <input
                        {...register("tagline")}
                        type="text"
                        name="tagline"
                        className={inputClass.input}
                      />
                      {errors.tagline && (
                        <p className={inputClass.error}>
                          {errors.tagline.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={inputClass.label}>Description</label>
                      <textarea
                        {...register("description")}
                        name="description"
                        rows={3}
                        className={inputClass.input}
                      />
                      {errors.description && (
                        <p className={inputClass.error}>
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Branding Assets
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className={inputClass.label}>Platform Logo</label>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer relative">
                        {!watched.platformLogo ? (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG (max. 3MB)
                            </p>

                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handlePlatformLogoChange}
                            />
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <img
                              src={watched.platformLogo}
                              className="w-20 h-20 object-contain rounded"
                              alt="Platform Logo Preview"
                            />

                            <button
                              type="button"
                              onClick={removePlatformLogo}
                              className="px-3 py-1 border border-red-400 text-red-600 text-sm rounded hover:bg-red-50 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      {errors.platformLogo && (
                        <p className={inputClass.error}>
                          {errors.platformLogo.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={inputClass.label}>Favicon</label>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer relative">
                        {!watched.favicon ? (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG (max. 3MB)
                            </p>

                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleFaviconChange}
                            />
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <img
                              src={watched.favicon}
                              className="w-12 h-12 object-contain rounded"
                              alt="Favicon Preview"
                            />

                            <button
                              type="button"
                              onClick={removeFavicon}
                              className="px-3 py-1 border border-red-400 text-red-600 text-sm rounded hover:bg-red-50 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                      {errors.favicon && (
                        <p className={inputClass.error}>
                          {errors.favicon.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Colour Scheme
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={inputClass.label}>Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={watched.primaryColor ?? ""}
                          onChange={(e) =>
                            setValue("primaryColor", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          className="w-14 h-10 rounded cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={watched.primaryColor ?? ""}
                          onChange={(e) =>
                            setValue("primaryColor", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          className="flex-1 text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md uppercase"
                        />
                      </div>
                      {errors.primaryColor && (
                        <p className={inputClass.error}>
                          {errors.primaryColor.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={inputClass.label}>Accent Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={watched.accentColor ?? ""}
                          onChange={(e) =>
                            setValue("accentColor", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          className="w-14 h-10 rounded cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={watched.accentColor ?? ""}
                          onChange={(e) =>
                            setValue("accentColor", e.target.value, {
                              shouldValidate: true,
                            })
                          }
                          className="flex-1 text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md uppercase"
                        />
                      </div>
                      {errors.accentColor && (
                        <p className={inputClass.error}>
                          {errors.accentColor.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-base font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className={inputClass.label}>Support Email</label>
                      <input
                        {...register("supportEmail")}
                        type="email"
                        name="supportEmail"
                        className={inputClass.input}
                      />
                      {errors.supportEmail && (
                        <p className={inputClass.error}>
                          {errors.supportEmail.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={inputClass.label}>Website URL</label>
                      <input
                        {...register("websiteUrl")}
                        type="url"
                        name="websiteUrl"
                        className={inputClass.input}
                      />
                      {errors.websiteUrl && (
                        <p className={inputClass.error}>
                          {errors.websiteUrl.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-200">
                  <CommonButton
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isPosting}
                    className="w-full sm:w-auto !bg-blue-600 !text-white flex items-center justify-center gap-1"
                  >
                    <Save className="w-4 h-4" />

                    {isPosting ? (
                      <ButtonWithLoading title="Saving..." />
                    ) : (
                      " Save Changes"
                    )}
                  </CommonButton>

                  <CommonButton
                    onClick={handleResetToDefault}
                    className="w-full sm:w-auto"
                  >
                    Reset to Default
                  </CommonButton>
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  Preview
                </h2>

                <div className="border border-gray-200 rounded-lg p-6 space-y-6">
                  {/* Logo and Platform Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {settings?.data?.favicon ? (
                        <img
                          src={settings?.data?.favicon ?? defaultValues.favicon}
                          alt="logo"
                          className="w-12 h-12"
                        />
                      ) : (
                        <div className="text-gray-900">
                          {watched.platformName?.charAt(0) ||
                            defaultValues.platformName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {watched.platformName ?? defaultValues.platformName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {watched.tagline ?? defaultValues.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {watched.description ?? defaultValues.description}
                  </p>

                  <div className="space-y-2">
                    <button
                      style={{
                        backgroundColor:
                          watched.primaryColor ?? defaultValues.primaryColor,
                      }}
                      className="w-full py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                    >
                      Primary Button
                    </button>
                    <button
                      style={{
                        backgroundColor:
                          watched.accentColor ?? defaultValues.accentColor,
                        color: "white",
                      }}
                      className="w-full py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90"
                    >
                      Accent Button
                    </button>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Support:</span>
                      <p className="text-gray-900 break-all">
                        {watched.supportEmail ?? defaultValues.supportEmail}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Website:</span>
                      <p className="text-gray-900 break-all">
                        {watched.websiteUrl ?? defaultValues.websiteUrl}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CommonSpace>
      )}
    </div>
  );
};

export default Setting;
