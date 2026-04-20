import { useState } from 'react';
import { Info, Activity, Shield, Database, FlaskConical } from 'lucide-react';

interface SimpleTabsProps {
    OverviewTab: () => React.ReactNode;
    ClinicalTab: () => React.ReactNode;
    SafetyTab: () => React.ReactNode;
    RealWorldDataTab: () => React.ReactNode;
    PharmacologyTab: () => React.ReactNode;
}

export default function SimpleTabs({
    OverviewTab,
    ClinicalTab,
    SafetyTab,
    RealWorldDataTab,
    PharmacologyTab
}: SimpleTabsProps) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="w-full mt-8">
            {/* Clean Tab Buttons - Minimal Design */}
            <div className="flex gap-6 border-b border-gray-300 pb-0 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === 'overview'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }`}
                >
                    <Info className="h-5 w-5" />
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('clinical')}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === 'clinical'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }`}
                >
                    <Activity className="h-5 w-5" />
                    Clinical Info
                </button>
                <button
                    onClick={() => setActiveTab('safety')}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === 'safety'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }`}
                >
                    <Shield className="h-5 w-5" />
                    Safety
                </button>
                <button
                    onClick={() => setActiveTab('realworld')}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === 'realworld'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }`}
                >
                    <Database className="h-5 w-5" />
                    Real-World Data
                </button>
                <button
                    onClick={() => setActiveTab('pharmacology')}
                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === 'pharmacology'
                            ? 'text-blue-600 border-blue-600'
                            : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                        }`}
                >
                    <FlaskConical className="h-5 w-5" />
                    Pharmacology
                </button>
            </div>

            {/* Tab Content - Proper Spacing Below */}
            <div className="w-full mt-8 px-1">
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'clinical' && <ClinicalTab />}
                {activeTab === 'safety' && <SafetyTab />}
                {activeTab === 'realworld' && <RealWorldDataTab />}
                {activeTab === 'pharmacology' && <PharmacologyTab />}
            </div>
        </div>
    );
}
