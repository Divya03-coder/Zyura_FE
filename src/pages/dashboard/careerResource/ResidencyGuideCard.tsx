import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Download, Globe } from "lucide-react";

export default function ResidencyGuideCard() {
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-black/10 px-10 py-7">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-[#FFE2E2]">
                    <Globe className=" w-6 h-6 text-zinc-950" />
                </div>
                <div>
                    <h3 className="text-[#0A0A0A] mb-2">Medical Residency Application Guide - USA</h3>
                    <p className="text-sm text-[#717182]">Complete guide including Approbation process, language requirements, and sample documents</p>
                </div>
            </div>

            <div className="my-11 flex flex-col md:flex-row gap-10 md:gap-40">
                <div className="space-y-4">
                    <h3 className="mt-2 text-sm font-semibold text-[#0A0A0A] line-clamp-1">
                        What's Included:
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Eligibility requirements (language, degree recognition)
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Step-by-step Approbation process
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Timeline with 12-month preparation plan
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        List of required documents with translations
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="mt-2 text-sm font-semibold text-[#0A0A0A] line-clamp-1">
                        Sample Documents:
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        CV template in German
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Cover letter template
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Application letter samples
                    </p>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                        Contact list for Kliniken
                    </p>
                </div>
            </div>

            <PrimaryButton
                className="bg-green-900 w-full mt-4 flex gap-2 hover:bg-green-800 cursor-pointer"
                // onClick={() => navigate(`${buttonLink}`)}
                icon={<Download />}
                iconPosition="left"
            >
                {/* {buttonText} */}
                Download Complete Guide
            </PrimaryButton>
        </div>
    )
}
