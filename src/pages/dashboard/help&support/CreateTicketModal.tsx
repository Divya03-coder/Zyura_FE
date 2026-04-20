import { useState, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";

interface CreateTicketModalProps {
  onClose: () => void;
  onCreate: (data: FormDataType) => void;
}

interface FormDataType {
  title: string;
  issueType: string;
  description: string;
  attachment: File | null;
}

interface FormErrors {
  title?: string;
  description?: string;
}

export default function CreateTicketModal({
  onClose,
  onCreate,
}: CreateTicketModalProps) {
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    issueType: "technical",
    description: "",
    attachment: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const issueTypes = [
    { value: "technical", label: "Technical Issue" },
    { value: "billing", label: "Billing Issue" },
    { value: "feature-request", label: "Feature Request" },
    { value: "other", label: "Other" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, attachment: file }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Create New Ticket
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Describe your issue and we'll get back to you as soon as possible
          </p>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Brief summary of your issue"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-sm ${
                errors.title ? "border-red-500" : "border-border"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Issue Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Issue Type
            </label>
            <select
              value={formData.issueType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, issueType: e.target.value }))
              }
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-sm"
            >
              {issueTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Please provide as much detail as possible..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-sm resize-none ${
                errors.description ? "border-red-500" : "border-border"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Attachment
            </label>
            <label className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition">
              <span className="text-sm text-muted-foreground">
                Upload photo
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
              />
            </label>
            {formData.attachment && (
              <p className="text-xs text-muted-foreground mt-2">
                {formData.attachment.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-gray-50 transition font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
