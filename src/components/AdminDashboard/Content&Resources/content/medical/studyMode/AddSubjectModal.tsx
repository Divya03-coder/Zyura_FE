"use client";

import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";
import FormHeader from "@/components/AdminDashboard/reuseable/FormHeader";
import ModalCloseButton from "@/components/AdminDashboard/reuseable/ModalCloseButton";
import {
  usePostStudyModeTreeMutation,
  useUpdateStudyModeTreeMutation,
} from "@/store/features/adminDashboard/ContentResources/MCQ/mcqApi";
import { ContentFor } from "@/store/features/adminDashboard/staticContent/staticContentSlice";
import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { z } from "zod";
import { TOCItem } from "./TableContentForStudy";

// Backend expected types
type SubTopic = string;
type Topic = {
  topicName: string;
  subTopics?: SubTopic[];
};
type System = {
  name: string;
  topics: Topic[];
};
export type PostStudyModeTree = {
  subjectName: string;
  systems: System[];
  profileType: string;
  contentFor: ContentFor;
};

// Zod validation schema
const subTopicSchema = z.string().min(1, "Subtopic name is required");

const topicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required"),
  subTopics: z.array(subTopicSchema).optional(),
});

const systemSchema = z.object({
  name: z.string().min(1, "System name is required"),
  topics: z.array(topicSchema).min(1, "At least one topic is required"),
});

const postStudyModeTreeSchema = z.object({
  subjectName: z.string().min(1, "Subject name is required"),
  systems: z.array(systemSchema).min(1, "At least one system is required"),
});

interface AddSubjectModalProps {
  onClose: () => void;
  initialContent: TOCItem | null;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  onClose,
  initialContent,
}) => {
  const [subjectName, setSubjectName] = useState("");
  const [systems, setSystems] = useState<System[]>([]);
  const [errors, setErrors] = useState<any>({});
  const { profileType, contentFor } = useAppSelector(
    (state: RootState) => state.staticContent
  );

  const addSystem = () => setSystems([...systems, { name: "", topics: [] }]);
  // const addTopic = (sIdx: number) =>
  //   setSystems((prev) =>
  //     prev.map((sys, idx) =>
  //       idx === sIdx
  //         ? {
  //             ...sys,
  //             topics: [...sys.topics, { topicName: "", subTopics: [""] }],
  //           }
  //         : sys
  //     )
  //   );
  const addTopic = (sIdx: number) =>
    setSystems((prev) =>
      prev.map((sys, idx) =>
        idx === sIdx
          ? {
              ...sys,
              topics: [...sys.topics, { topicName: "", subTopics: [] }],
            }
          : sys
      )
    );

  const addSubtopic = (sIdx: number, tIdx: number) =>
    setSystems((prev) =>
      prev.map((sys, sysIdx) =>
        sysIdx === sIdx
          ? {
              ...sys,
              topics: sys.topics.map((t, topicIdx) =>
                topicIdx === tIdx
                  ? { ...t, subTopics: [...(t.subTopics ?? []), ""] }
                  : t
              ),
            }
          : sys
      )
    );

  const updateSystemName = (sIdx: number, value: string) =>
    setSystems((prev) =>
      prev.map((sys, idx) => (idx === sIdx ? { ...sys, name: value } : sys))
    );
  const updateTopicName = (sIdx: number, tIdx: number, value: string) =>
    setSystems((prev) =>
      prev.map((sys, sysIdx) =>
        sysIdx === sIdx
          ? {
              ...sys,
              topics: sys.topics.map((t, topicIdx) =>
                topicIdx === tIdx ? { ...t, topicName: value } : t
              ),
            }
          : sys
      )
    );
  const updateSubtopicName = (
    sIdx: number,
    tIdx: number,
    subIdx: number,
    value: string
  ) =>
    setSystems((prev) =>
      prev.map((sys, sysIdx) =>
        sysIdx === sIdx
          ? {
              ...sys,
              topics: sys.topics.map((t, topicIdx) =>
                topicIdx === tIdx
                  ? {
                      ...t,
                      subTopics: (t.subTopics ?? []).map((s, sIndex) =>
                        sIndex === subIdx ? value : s
                      ),
                    }
                  : t
              ),
            }
          : sys
      )
    );

  const removeSystem = (sIdx: number) =>
    setSystems((prev) => prev.filter((_, idx) => idx !== sIdx));
  const removeTopic = (sIdx: number, tIdx: number) =>
    setSystems((prev) =>
      prev.map((sys, idx) =>
        idx === sIdx
          ? { ...sys, topics: sys.topics.filter((_, i) => i !== tIdx) }
          : sys
      )
    );
  const removeSubtopic = (sIdx: number, tIdx: number, subIdx: number) =>
    setSystems((prev) =>
      prev.map((sys, sysIdx) =>
        sysIdx === sIdx
          ? {
              ...sys,
              topics: sys.topics.map((t, topicIdx) =>
                topicIdx === tIdx
                  ? {
                      ...t,
                      subTopics: (t.subTopics ?? []).filter(
                        (_, i) => i !== subIdx
                      ),
                    }
                  : t
              ),
            }
          : sys
      )
    );

  const [postStudyModeTree, { isLoading: isPostStudyModeTreeLoading }] =
    usePostStudyModeTreeMutation();
  const [updateStudyModeTree, { isLoading: isUpdating }] =
    useUpdateStudyModeTreeMutation();

  useEffect(() => {
    if (initialContent) {
      setSubjectName(initialContent.title);

      const mappedSystems: System[] = (initialContent.children ?? []).map(
        (systemItem) => ({
          name: systemItem.title,
          topics: (systemItem.children ?? []).map((topicItem) => ({
            topicName: topicItem.title,
            subTopics: (topicItem.children ?? []).map(
              (subItem) => subItem.title
            ),
          })),
        })
      );

      setSystems(mappedSystems);
    } else {
      setSubjectName("");
      setSystems([]);
    }
  }, [initialContent]);
  const handleSave = async () => {
    const payload: PostStudyModeTree = {
      subjectName,
      systems,
      profileType,
      contentFor,
    };
    const validation = postStudyModeTreeSchema.safeParse(payload);

    if (!validation.success) {
      setErrors(validation.error.format());
      return;
    }

    setErrors({});

    try {
      if (initialContent && initialContent._id) {
        await updateStudyModeTree({
          treeId: initialContent._id,
          data: payload,
        });
        onClose();
      } else {
        await postStudyModeTree(payload);
        onClose();
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] rounded-md p-3 outline-none text-[#94A3B8] text-xs  ",
    error: "text-red-500 text-xs mt-1",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
      <CommonBorderWrapper className="w-full max-w-2xl relative max-h-[95vh] overflow-y-auto ">
        <div className="space-y-5">
          <ModalCloseButton onClick={onClose} />
          <FormHeader
            title={initialContent ? "Update Subject" : "Add New Subject"}
            subtitle={
              initialContent
                ? "Edit the hierarchical table of contents for your subject."
                : "Create a hierarchical table of contents for your subject."
            }
          />

          <div className="">
            <label className={inputClass.label}>Subject Name</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="e.g., Anatomy"
              className={`${inputClass.input} bg-blue-600! text-white!`}
            />
            {errors?.subjectName?._errors && (
              <p className={inputClass.error}>
                {errors.subjectName._errors[0]}
              </p>
            )}
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <label className={inputClass.label}>Systems</label>
              <CommonButton onClick={addSystem}>+ Add System</CommonButton>
            </div>

            {systems.map((system, sIdx) => (
              <div
                key={sIdx}
                className="border border-black/10 rounded-lg p-3 mb-3 "
              >
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={system.name}
                    onChange={(e) => updateSystemName(sIdx, e.target.value)}
                    placeholder="System name (e.g., Cardiovascular System)"
                    className={`${inputClass.input} !bg-[#0f0f0f] !text-white`}
                  />
                  <button
                    onClick={() => removeSystem(sIdx)}
                    className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {errors?.systems?.[sIdx]?.name?._errors && (
                  <p className={inputClass.error}>
                    {errors.systems[sIdx].name._errors[0]}
                  </p>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className={inputClass.label}>Topics</label>
                    <CommonButton
                      onClick={() => addTopic(sIdx)}
                      className="flex items-center gap-2"
                    >
                      <GoPlus className="w-4 h-4" /> Add Topic
                    </CommonButton>
                  </div>

                  {system.topics.map((topic, tIdx) => (
                    <div
                      key={tIdx}
                      className="border border-[#CBD5E1] rounded-md p-4"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={topic.topicName}
                          onChange={(e) =>
                            updateTopicName(sIdx, tIdx, e.target.value)
                          }
                          placeholder="Topic name (e.g., Heart)"
                          className={`
                            ${inputClass.input} bg-[#6794c9]! text-white!
                          `}
                        />
                        <button
                          onClick={() => removeTopic(sIdx, tIdx)}
                          className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {errors?.systems?.[sIdx]?.topics?.[tIdx]?.topicName
                        ?._errors && (
                        <p className={inputClass.error}>
                          {
                            errors.systems[sIdx].topics[tIdx].topicName
                              ._errors[0]
                          }
                        </p>
                      )}

                      <div className="">
                        <div className="flex items-center justify-between my-2">
                          <label className={inputClass.label}>Subtopics</label>
                          <CommonButton
                            onClick={() => addSubtopic(sIdx, tIdx)}
                            className="flex items-center gap-2"
                          >
                            <GoPlus className="w-4 h-4" /> Add Subtopic
                          </CommonButton>
                        </div>

                        {(topic.subTopics ?? []).map((sub, subIdx) => (
                          <div
                            key={subIdx}
                            className="flex items-center gap-2 mb-1"
                          >
                            <input
                              type="text"
                              value={sub}
                              onChange={(e) =>
                                updateSubtopicName(
                                  sIdx,
                                  tIdx,
                                  subIdx,
                                  e.target.value
                                )
                              }
                              placeholder="Subtopic name (e.g., Heart)"
                              className={`${inputClass.input} bg-[#baadc9]! text-white! `}
                            />
                            <button
                              onClick={() => removeSubtopic(sIdx, tIdx, subIdx)}
                              className="text-gray-500 border cursor-pointer border-[#CBD5E1] rounded-md p-2 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            {errors?.systems?.[sIdx]?.topics?.[tIdx]
                              ?.subTopics?.[subIdx]?._errors && (
                              <p className={inputClass.error}>
                                {
                                  errors.systems[sIdx].topics[tIdx].subTopics[
                                    subIdx
                                  ]._errors[0]
                                }
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6 gap-2">
            <CommonButton onClick={onClose}>Cancel</CommonButton>
            <CommonButton
              onClick={handleSave}
              type="submit"
              disabled={isPostStudyModeTreeLoading || isUpdating}
              className="!bg-blue-500 !text-white"
            >
              {isPostStudyModeTreeLoading || isUpdating ? (
                <ButtonWithLoading
                  title={initialContent ? "Updating..." : "Saving..."}
                />
              ) : initialContent ? (
                "Update Subject"
              ) : (
                "Save Subject"
              )}
            </CommonButton>
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default AddSubjectModal;
