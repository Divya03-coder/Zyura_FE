/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FindMentorModal({ open, setOpen }: any) {
  const [mentorName, setMentorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [language, setLanguage] = useState("");
  const [availability, setAvailability] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpen(false);
    navigate("/dashboard/all-mentor")
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Find a Mentor</DialogTitle>
          <DialogDescription>
            Connect with your Peers For Colabretion Learning And Support
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Search Field */}
          <div className="grid gap-2">
            <Label>Mentor Name</Label>
            <Input
              value={mentorName}
              onChange={(e) => setMentorName(e.target.value)}
              placeholder="Type your name"
            />
          </div>

          {/* Specialty */}
          <div className="grid gap-2">
            <Label>Specialty</Label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="general">General Medicine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="grid gap-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">English</SelectItem>
                <SelectItem value="2nd">Bangla</SelectItem>
                <SelectItem value="3rd">Arabic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weekly Availability */}
          <div className="grid gap-2">
            <Label>Weekly Availability</Label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">Saturday</SelectItem>
                <SelectItem value="2nd">Sunday</SelectItem>
                <SelectItem value="3rd">MonDay</SelectItem>
                <SelectItem value="3rd">TuesDay</SelectItem>
                <SelectItem value="3rd">WednesDay</SelectItem>
                <SelectItem value="3rd">ThursDay</SelectItem>
                <SelectItem value="3rd">FriDay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-main text-white cursor-pointer"
          >
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
