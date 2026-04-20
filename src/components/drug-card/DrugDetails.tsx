import { ArrowLeft, Bookmark, AlertTriangle, Loader2 } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import { useRef, useState, useEffect } from 'react';
import DrugImage from './DrugImage';
import SimpleTabs from './SimpleTabs';
import { DrugLabel, AdverseEventStats, RecallSummary } from '../../types/fda';
import { getComprehensiveDrugInfo } from '../../services/fdaApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DrugDetailsProps {
  drug: DrugLabel;
  onBack: () => void;
  onSave: (drug: DrugLabel) => void;
  isSaved: boolean;
}

export default function DrugDetails({ drug, onBack, onSave, isSaved }: DrugDetailsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [adverseStats, setAdverseStats] = useState<AdverseEventStats | null>(null);
  const [recallSummary, setRecallSummary] = useState<RecallSummary | null>(null);
  const [isLoadingExtended, setIsLoadingExtended] = useState(true);

  const getDrugName = () => {
    const brandName = drug.openfda?.brand_name?.[0];
    const genericName = drug.openfda?.generic_name?.[0];
    return { brandName, genericName };
  };

  const { brandName, genericName } = getDrugName();

  // Fetch additional drug data
  useEffect(() => {
    const fetchExtendedData = async () => {
      setIsLoadingExtended(true);
      try {
        const searchName = brandName || genericName || '';
        if (searchName) {
          const data = await getComprehensiveDrugInfo(searchName, brandName);
          setAdverseStats(data.adverseStats);
          setRecallSummary(data.recallSummary);
        }
      } catch (error) {
        console.error('Error fetching extended drug data:', error);
      } finally {
        setIsLoadingExtended(false);
      }
    };

    fetchExtendedData();
  }, [drug, brandName, genericName]);

  // const handleDownload = async () => {
  //   if (!contentRef.current) return;

  //   try {
  //     const element = contentRef.current;

  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //       useCORS: true,
  //       logging: false,
  //       backgroundColor: '#ffffff',
  //       onclone: (clonedDoc) => {
  //         const clonedElement = clonedDoc.querySelector('[data-pdf-content]') as HTMLElement;
  //         if (clonedElement) {
  //           clonedElement.querySelectorAll('*').forEach((el) => {
  //             const htmlEl = el as HTMLElement;
  //             const computedStyle = window.getComputedStyle(htmlEl);
  //             htmlEl.style.color = computedStyle.color;
  //             htmlEl.style.backgroundColor = computedStyle.backgroundColor;
  //             htmlEl.style.borderColor = computedStyle.borderColor;
  //           });
  //         }
  //       },
  //     });

  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'portrait',
  //       unit: 'mm',
  //       format: 'a4',
  //     });

  //     const imgWidth = 210;
  //     const pageHeight = 297;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     pdf.save(`${brandName || genericName || 'drug'}_card.pdf`);
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     alert('Error generating PDF. Please try again or use your browser\'s print function (Ctrl/Cmd + P).');
  //   }
  // };

  const Section = ({ title, content, warning = false }: { title: string; content?: string[] | string; warning?: boolean }) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
      <div className={`mb-6 ${warning ? 'border-2 border-red-500 rounded-lg p-4 bg-red-50' : ''}`}>
        <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${warning ? 'text-red-700' : 'text-gray-900'}`}>
          {warning && <AlertTriangle className="h-5 w-5" />}
          {title}
        </h3>
        <div className="prose prose-sm max-w-none">
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <div key={index} className="mb-2 text-gray-700 leading-relaxed">
                {item.split('\n').map((line, i) => (
                  <p key={i} className="mb-1">{line}</p>
                ))}
              </div>
            ))
          ) : (
            <div className="text-gray-700 leading-relaxed">{content}</div>
          )}
        </div>
      </div>
    );
  };

  const InfoGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
      {drug.openfda?.manufacturer_name?.[0] && (
        <div>
          <div className="text-sm font-medium text-gray-600">Manufacturer</div>
          <div className="text-gray-900">{drug.openfda.manufacturer_name[0]}</div>
        </div>
      )}
      {drug.openfda?.product_type?.[0] && (
        <div>
          <div className="text-sm font-medium text-gray-600">Product Type</div>
          <div className="text-gray-900">{drug.openfda.product_type[0]}</div>
        </div>
      )}
      {drug.openfda?.route?.[0] && (
        <div>
          <div className="text-sm font-medium text-gray-600">Route</div>
          <div className="text-gray-900">{drug.openfda.route.join(', ')}</div>
        </div>
      )}
      {drug.openfda?.product_ndc?.[0] && (
        <div>
          <div className="text-sm font-medium text-gray-600">NDC Code</div>
          <div className="text-gray-900 font-mono text-xs">{drug.openfda.product_ndc[0]}</div>
        </div>
      )}
      {drug.dosage_forms_and_strengths?.[0] && (
        <div className="md:col-span-2">
          <div className="text-sm font-medium text-gray-600">Forms & Strengths</div>
          <div className="text-gray-900 text-sm">{drug.dosage_forms_and_strengths[0].substring(0, 200)}...</div>
        </div>
      )}
    </div>
  );

  // Overview Tab Content
  const OverviewTab = () => (
    <div>
      <InfoGrid />

      {drug.boxed_warning && (
        <Section
          title="BOXED WARNING"
          content={drug.boxed_warning}
          warning={true}
        />
      )}

      <Section
        title="Description"
        content={drug.description}
      />

      {drug.openfda?.pharm_class_epc?.[0] && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-purple-900">Pharmacological Class</h3>
          <ul className="list-disc list-inside space-y-1">
            {drug.openfda.pharm_class_epc.map((pharmClass, index) => (
              <li key={index} className="text-purple-800">{pharmClass}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  // Clinical Info Tab
  const ClinicalTab = () => (
    <div>
      <Section
        title="Indications and Usage"
        content={drug.indications_and_usage}
      />

      <Section
        title="Dosage and Administration"
        content={drug.dosage_and_administration}
      />

      <Section
        title="Contraindications"
        content={drug.contraindications}
      />

      {(drug.pregnancy || drug.pediatric_use || drug.geriatric_use) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">
            Use in Specific Populations
          </h3>
          <div className="space-y-4">
            {drug.pregnancy && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Pregnancy</h4>
                <div className="text-gray-700 text-sm">
                  {drug.pregnancy[0].substring(0, 300)}...
                </div>
              </div>
            )}
            {drug.pediatric_use && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Pediatric Use</h4>
                <div className="text-gray-700 text-sm">
                  {drug.pediatric_use[0].substring(0, 300)}...
                </div>
              </div>
            )}
            {drug.geriatric_use && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Geriatric Use</h4>
                <div className="text-gray-700 text-sm">
                  {drug.geriatric_use[0].substring(0, 300)}...
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // Safety Tab
  const SafetyTab = () => (
    <div>
      <Section
        title="Warnings and Precautions"
        content={drug.warnings_and_cautions || drug.warnings_and_precautions}
      />

      <Section
        title="Adverse Reactions"
        content={drug.adverse_reactions}
      />

      <Section
        title="Drug Interactions"
        content={drug.drug_interactions}
      />

      <Section
        title="Overdosage"
        content={drug.overdosage}
      />
    </div>
  );

  // Real-World Data Tab
  const RealWorldDataTab = () => {
    const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

    if (isLoadingExtended) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading real-world data...</span>
        </div>
      );
    }

    return (
      <div>
        {/* Recall Information */}
        {recallSummary && recallSummary.activeRecalls > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recall Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-yellow-900">{recallSummary.activeRecalls}</div>
                <div className="text-sm text-yellow-700">Active Recalls</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{recallSummary.classI}</div>
                <div className="text-sm text-gray-600">Class I (Most Serious)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{recallSummary.classII}</div>
                <div className="text-sm text-gray-600">Class II</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{recallSummary.classIII}</div>
                <div className="text-sm text-gray-600">Class III</div>
              </div>
            </div>
            {recallSummary.recentRecalls.length > 0 && (
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Recent Recalls:</h4>
                {recallSummary.recentRecalls.slice(0, 3).map((recall, index) => (
                  <div key={index} className="mb-2 p-2 bg-white rounded border border-yellow-200">
                    <div className="text-sm font-medium">{recall.reason_for_recall}</div>
                    <div className="text-xs text-gray-500">
                      {recall.classification} • {recall.recall_initiation_date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Adverse Events */}
        {adverseStats && adverseStats.totalReports > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Adverse Event Reports
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{adverseStats.totalReports.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{adverseStats.seriousOutcomes.death}</div>
                <div className="text-sm text-gray-600">Deaths Reported</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">{adverseStats.seriousOutcomes.hospitalization}</div>
                <div className="text-sm text-gray-600">Hospitalizations</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl font-bold text-yellow-600">{adverseStats.seriousOutcomes.lifeThreatening}</div>
                <div className="text-sm text-gray-600">Life-Threatening</div>
              </div>
            </div>

            {/* Common Reactions Chart */}
            {adverseStats.commonReactions.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Most Common Adverse Reactions</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adverseStats.commonReactions.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="reaction" angle={-45} textAnchor="end" height={100} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Age Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-[300px]">
                <h4 className="font-medium text-gray-900 mb-3">Age Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Pediatric (<18)', value: adverseStats.ageDistribution.pediatric },
                        { name: 'Adult (18-64)', value: adverseStats.ageDistribution.adult },
                        { name: 'Elderly (65+)', value: adverseStats.ageDistribution.elderly }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[300px]">
                <h4 className="font-medium text-gray-900 mb-3">Gender Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Male', value: adverseStats.genderDistribution.male },
                        { name: 'Female', value: adverseStats.genderDistribution.female },
                        { name: 'Unknown', value: adverseStats.genderDistribution.unknown }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1, 2].map((index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <strong>Important Note:</strong> Adverse event reports are submitted by healthcare professionals and consumers.
              The existence of a report does not mean the drug caused the event. This data is for educational purposes
              to understand reported patterns and should not be used to make clinical decisions.
            </div>
          </div>
        ) : !isLoadingExtended && (
          <div className="text-center py-8 text-gray-500">
            No adverse event data available for this drug.
          </div>
        )}
      </div>
    );
  };

  // Pharmacology Tab
  const PharmacologyTab = () => (
    <div>
      <Section
        title="Clinical Pharmacology"
        content={drug.clinical_pharmacology}
      />

      {drug.mechanism_of_action && (
        <Section
          title="Mechanism of Action"
          content={drug.mechanism_of_action}
        />
      )}

      <Section
        title="Pharmacodynamics"
        content={drug.pharmacodynamics}
      />

      <Section
        title="Pharmacokinetics"
        content={drug.pharmacokinetics}
      />

      <Section
        title="Nonclinical Toxicology"
        content={drug.nonclinical_toxicology}
      />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Search
        </button>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSave(drug)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${isSaved
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </button>

          {/* <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            <Printer className="h-4 w-4" />
            Print
          </button> */}
        </div>
      </div>

      {/* Drug Card Content */}
      <div ref={contentRef} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-8" data-pdf-content>
        {/* Header with Image */}
        <div className="mb-6 pb-6 border-b border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <DrugImage drug={drug} size="large" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {brandName || genericName || 'Drug Information'}
            </h1>
            {brandName && genericName && (
              <p className="text-lg sm:text-xl text-gray-600">({genericName})</p>
            )}
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
              {drug.openfda?.product_type?.[0] && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                  {drug.openfda.product_type[0]}
                </span>
              )}
              {drug.openfda?.pharm_class_epc?.[0] && (
                 <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-100">
                    {drug.openfda.pharm_class_epc[0]}
                 </span>
              )}
            </div>
          </div>
        </div>

        <SimpleTabs
          OverviewTab={OverviewTab}
          ClinicalTab={ClinicalTab}
          SafetyTab={SafetyTab}
          RealWorldDataTab={RealWorldDataTab}
          PharmacologyTab={PharmacologyTab}
        />

        {/* Footer */}

        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p className="mb-2 italic">
            <strong>Disclaimer:</strong> This information is for educational purposes only.
            Do not rely on this data to make decisions regarding medical care. Always consult
            with a healthcare professional.
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 text-xs">
            {drug.effective_time && (
              <p>Last Updated: {drug.effective_time}</p>
            )}
            <p className="opacity-75">
              Data Source: openFDA - U.S. Food and Drug Administration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
