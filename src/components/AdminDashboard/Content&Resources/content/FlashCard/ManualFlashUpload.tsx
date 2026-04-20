import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/custom/CommonSelect";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import {
  useAddMoreFlashcardToFlashcardBankMutation,
  useManualUploadFlashCardMutation,
} from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { useUploadSingleImageMutation } from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { setUploadIntoBank } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { difficultyOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import ActionButtons from "../ActionButtons";

const FlashCardSchema = z.object({
  frontText: z.string().min(1, { message: "Front text is required" }),
  backText: z.string().min(1, { message: "Back text is required" }),
  explanation: z.string().optional(),
  image: z.string().optional(),
  difficulty: z.enum(["Basic", "Intermediate", "Advance"]),
});

const FlashCardsFormSchema = z.object({
  flashCards: z.array(FlashCardSchema).min(1),
});

type FlashCardsFormValues = z.infer<typeof FlashCardsFormSchema>;

const inputClass = {
  label: "block text-sm font-normal text-[#020617] font-inter mb-2",
  input:
    "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
  error: "text-red-500 text-sm mt-1",
};

interface FlashCardsFormProps {
  handleCancel: () => void;
}
const ManualFlashUpload: React.FC<FlashCardsFormProps> = ({ handleCancel }) => {
  const { uploadIntoBank, bankId } = useAppSelector(
    (state: RootState) => state.staticContent,
  );

  const [addMoreFlashcardToFlashcardBank, { isLoading: addMoreLoading }] =
    useAddMoreFlashcardToFlashcardBankMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FlashCardsFormValues>({
    resolver: zodResolver(FlashCardsFormSchema),
    defaultValues: {
      flashCards: [
        {
          frontText: "",
          backText: "",
          explanation: "",
          difficulty: "Basic",
          image: "",
        },
      ],
    },
  });

  const watchedFlashCards = useWatch({ control, name: "flashCards" });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "flashCards",
  });

  const { formData, contentType } = useAppSelector(
    (state: RootState) => state.staticContent,
  );
  const [manualUploadFlashCard, { isLoading }] =
    useManualUploadFlashCardMutation();

  const [uploadSingleImage] = useUploadSingleImageMutation();

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const result = await uploadSingleImage(formDataImg).unwrap();
      const imageUrl = result.data.fileUrl;

      setValue(`flashCards.${index}.image`, imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleRemoveImage = (index: number) => {
    setValue(`flashCards.${index}.image`, "");
  };

  const onSubmit = async (data: FlashCardsFormValues) => {
    try {
      if (uploadIntoBank && bankId) {
        const fd = new FormData();
        fd.append("data", JSON.stringify(data.flashCards));

        await addMoreFlashcardToFlashcardBank({
          flashCardBankId: bankId,
          data: fd,
          key: "manual",
        }).unwrap();
        dispatch(setUploadIntoBank(false));
      } else {
        if (formData) {
          const formattedPayload = { ...formData, flashCards: data.flashCards };
          await manualUploadFlashCard(formattedPayload);
        }
      }
      reset();
      navigate(`/admin/content-management/dashboard/${contentType}`);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      className="space-y-6"
    >
      {fields.map((field, index) => (
        <CommonBorderWrapper key={field.id} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Flashcard {index + 1}</h2>
            {fields.length > 1 && (
              <CommonButton
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 !px-3 !py-2 rounded-md"
              >
                <RiDeleteBinLine size={20} className="text-red-500" />
              </CommonButton>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor={`flash-upload-${index}`}
                className="flex items-center gap-2 p-3 text-blue-600 hover:bg-blue-50 rounded-md border border-gray-300 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={20} />
              </label>

              <input
                id={`flash-upload-${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, index)}
              />

              {/* Preview */}
              {/* {control._formValues.flashCards[index].image && (
                <div className="mt-3">
                  <img
                    src={control._formValues.flashCards[index].image}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-md border"
                  />

                  <CommonButton
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 mt-3"
                  >
                    Remove Image
                  </CommonButton>
                </div>
              )} */}

              {/* Preview */}
              {/* replace control._formValues with: watchedFlashCards */}
              {watchedFlashCards[index]?.image && (
                <div className="mt-3">
                  <img
                    src={watchedFlashCards[index].image}
                    alt="preview"
                    className="w-40 h-40 object-cover rounded-md border"
                  />
                  <CommonButton
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 mt-3"
                  >
                    Remove Image
                  </CommonButton>
                </div>
              )}

              {/* Error */}
              {errors.flashCards?.[index]?.image && (
                <p className={inputClass.error}>
                  {errors.flashCards[index]?.image?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Front Text</label>
              <textarea
                {...register(`flashCards.${index}.frontText`)}
                className={inputClass.input}
              />
              {errors.flashCards?.[index]?.frontText && (
                <p className={inputClass.error}>
                  {errors.flashCards[index]?.frontText?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Back Text</label>
              <textarea
                {...register(`flashCards.${index}.backText`)}
                className={inputClass.input}
              />
              {errors.flashCards?.[index]?.backText && (
                <p className={inputClass.error}>
                  {errors.flashCards[index]?.backText?.message}
                </p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Explanation</label>
              <textarea
                {...register(`flashCards.${index}.explanation`)}
                className={inputClass.input}
              />
            </div>

            <div>
              <label className={inputClass.label}>Difficulty</label>

              <Controller
                control={control}
                name={`flashCards.${index}.difficulty`}
                render={({ field }) => (
                  <CommonSelect
                    className="!bg-white border-[#CBD5E1]"
                    value={field.value}
                    item={difficultyOptions}
                    onValueChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>
          </div>
        </CommonBorderWrapper>
      ))}

      <div className="mb-6  flex items-center justify-between ">
        <CommonButton
          type="button"
          onClick={() =>
            append({
              frontText: "",
              backText: "",
              explanation: "",
              difficulty: "Basic",
              image: "",
            })
          }
          className="!text-blue-600"
        >
          + Add Another Flashcard
        </CommonButton>
        <ActionButtons
          importLabel="Save & Publish Flashcards"
          onSavePublish={() => handleSubmit(onSubmit)()}
          onCancel={handleCancel}
          isLoading={isLoading || addMoreLoading}
        />
      </div>
    </form>
  );
};

export default ManualFlashUpload;
