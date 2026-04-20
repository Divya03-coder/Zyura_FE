import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "../gamified-learning/types";
import Breadcrumb from "@/components/reusable/CommonBreadcrumb";

export default function DiagramDetails() {

    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Diagram Explorer", link: "/dashboard/diagram-explorer" },
    ];

    const [selected, setSelected] = useState("Teres Major");

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <Breadcrumb breadcrumbs={breadcrumbs} />

            <div className="flex items-center gap-3">
                <Link to={'/dashboard/diagram-explorer'} className="mb-20">
                    <ArrowLeft /></Link>
                <DashboardHeading
                    title="Cardiology"
                    titleSize="text-xl"
                    description="Category: Pathophysiology"
                    className="mt- mb-12 space-y-1"
                />
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-72 bg-white border border-slate-300 rounded-lg p-4">
                    {/* Tabs */}
                    <div className="flex gap-2 mb-4">
                        <button className="px-4 py-1 text-sm font-medium rounded bg-blue-600 text-white">
                            Anatomy
                        </button>
                        <button className="px-4 py-1 text-sm font-medium rounded border border-slate-300 text-gray-600">
                            Quiz<span className="ml-1 text-green-500">•</span>
                        </button>
                    </div>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search for a structure"
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Buttons */}
                    <div className="flex items-center gap-2 mb-3">
                        <button className="px-3 py-1 border border-slate-300 rounded text-sm">Tree</button>
                        <button className="px-3 py-1 border border-slate-300 rounded text-sm">+</button>
                        <select className="flex-1 px-3 py-1 border border-slate-300 rounded text-sm">
                            <option>9 structures</option>
                        </select>
                    </div>

                    {/* Anatomy List */}
                    <div>
                        <details open>
                            <summary className="flex items-center gap-1 cursor-pointer text-gray-700 font-medium">
                                <ChevronDown size={16} /> Anatomy
                            </summary>
                            <div className="pl-6 mt-2">
                                <button
                                    onClick={() => setSelected("Teres Major")}
                                    className={`block w-full text-left px-2 py-1 rounded ${selected === "Teres Major"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    Teres Major
                                </button>
                                <button
                                    onClick={() => setSelected("Trapezius")}
                                    className={`block w-full text-left px-2 py-1 rounded ${selected === "Trapezius"
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    Trapezius
                                </button>
                            </div>
                        </details>
                    </div>
                </div>

                {/* Main Viewer */}
                <div className="flex-1 bg-white border border-slate-300 rounded-lg flex items-center justify-center p-6">
                    <div className="border- rounded-md p-2 relative">
                        <img
                            src="https://cdn.britannica.com/20/55620-050-44C0BB00/view-human-muscular-system.jpg"
                            alt="Anatomy Model"
                            className="max-h-[500px] object-contain"
                        />
                        {/* Example labels */}
                        <div className="absolute top-10 left-32 text-xs bg-white px-2 py-1 rounded shadow">
                            Trapezius
                        </div>
                        <div className="absolute top-28 left-56 text-xs bg-white px-2 py-1 rounded shadow">
                            Middle fibers of the deltoid
                        </div>
                        <div className="absolute top-44 left-48 text-xs bg-white px-2 py-1 rounded shadow">
                            Teres major
                        </div>
                        <div className="absolute top-64 left-40 text-xs bg-white px-2 py-1 rounded shadow">
                            Serratus anterior
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
