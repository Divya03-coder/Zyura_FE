import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";
import { Link } from "react-router-dom";
import { ArrowLeft, SendHorizontal, X } from "lucide-react";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CreateNewDiscussion() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "All Communities", link: "/dashboard/all-communities" },
    { name: "Create New Discussion", link: "/dashboard/create-new-discussion" },
  ];

  const [postTitle, setPostTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState(""); // input value
  const [tags, setTags] = useState<string[]>([]); // tag array

  // Add tag
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput(""); // clear input
    }
  };

  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    console.log({
      postTitle,
      category,
      description,
      tags,
    });
    // setOpen(false);
  };

  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <div className="flex items-start gap-3">
        <Link to={"/dashboard/all-communities"} className="mt-0.5">
          <ArrowLeft />
        </Link>
        <DashboardHeading
          title="Create New Discussion"
          titleColor="text-[#0A0A0A]"
          titleSize="text-xl"
          description="Connect, learn, and grow with the medical education community"
          descColor="text-[#4A5565]"
          descSize="text-sm"
          className=""
        />
      </div>

      <div className="bg-white  rounded-xl px-16 py-10 mt-8">
        <h3 className="text-lg font-medium mb-2">Post Details</h3>
        <p className="text-sm text-slate-700">
          Add more details to your post for better engagement
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 mt-6">
          <div className="grid gap-2">
            <Label>Post Title</Label>
            <Input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Cardiology Quiz"
            />
          </div>

          <div className="grid gap-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Basic/Clinical/Advanced" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 col-span-2">
            <Label>Detailed Content</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="provide more details about your discussion"
            />
          </div>

          <div className="grid col-span-2 gap-2">
            <label className="font-medium">Tag (optional)</label>

            <div className="flex items-center gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Type your tag"
                className="border border-slate-300 px-3 py-2 rounded-md w-full"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                className="bg-gray-500 text-sm px-3 py-2 text-white rounded-lg"
              >
                Add Tag
              </Button>
            </div>

            {/* Show Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid col-span-2 gap-2 mt-8">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSubmit}
                className="w-[93.5%] bg-violet-700 text-white cursor-pointer"
              >
                <SendHorizontal />
                Post to Forum
              </Button>
              <Button variant="outline" className=" cursor-pointer ">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
