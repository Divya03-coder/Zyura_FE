// import { useState } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Search,
//   MessageCircle,
//   Mail,
//   Phone,
//   FileText,
//   Video,
//   Users,
//   Settings,
//   BookOpen,
//   Bot,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";

// const Help = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openFAQs, setOpenFAQs] = useState({});
//   const [activeSection, setActiveSection] = useState("getting-started");

//   const toggleFAQ = (id) => {
//     setOpenFAQs((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const faqCategories = [
//     {
//       id: "getting-started",
//       title: "Getting Started",
//       icon: <BookOpen className="w-5 h-5" />,
//       faqs: [
//         {
//           id: "faq1",
//           question: "How do I access the Medical AI Student Portal?",
//           answer:
//             "You can access the portal through your institution's learning management system or by visiting the direct URL provided by your administrator. Use your student credentials to log in.",
//         },
//         {
//           id: "faq2",
//           question: "What are the system requirements?",
//           answer:
//             "The portal works on any modern web browser (Chrome, Firefox, Safari, Edge). For optimal performance, we recommend having at least 4GB RAM and a stable internet connection of 10 Mbps or higher.",
//         },
//         {
//           id: "faq3",
//           question: "How do I reset my password?",
//           answer:
//             "Click the \"Forgot Password\" link on the login page. Enter your email address, and you'll receive a password reset link within 5 minutes. Check your spam folder if you don't see it in your inbox.",
//         },
//       ],
//     },
//     {
//       id: "ai-features",
//       title: "AI Features",
//       icon: <Bot className="w-5 h-5" />,
//       faqs: [
//         {
//           id: "faq4",
//           question: "How does the AI diagnostic assistant work?",
//           answer:
//             "The AI diagnostic assistant analyzes patient symptoms, medical history, and test results to provide differential diagnoses and treatment suggestions. It uses evidence-based medicine and continuously learns from medical literature.",
//         },
//         {
//           id: "faq5",
//           question: "Can I trust the AI recommendations?",
//           answer:
//             "The AI provides suggestions based on current medical evidence, but it should always be used alongside clinical judgment. All recommendations should be verified with supervising physicians and cross-referenced with established medical protocols.",
//         },
//         {
//           id: "faq6",
//           question: "What types of cases can the AI help with?",
//           answer:
//             "The AI covers a wide range of medical specialties including internal medicine, pediatrics, cardiology, dermatology, and emergency medicine. It's particularly helpful for common conditions and differential diagnosis scenarios.",
//         },
//       ],
//     },
//     {
//       id: "study-tools",
//       title: "Study Tools",
//       icon: <FileText className="w-5 h-5" />,
//       faqs: [
//         {
//           id: "faq7",
//           question: "How do I create custom flashcards?",
//           answer:
//             'Navigate to the Study Tools section and click "Create Flashcards." You can add text, images, and even audio recordings. The AI can also generate flashcards from your notes automatically.',
//         },
//         {
//           id: "faq8",
//           question: "Can I share study materials with classmates?",
//           answer:
//             "Yes! You can create study groups and share flashcards, notes, and practice quizzes. All shared content respects patient privacy and follows HIPAA guidelines.",
//         },
//         {
//           id: "faq9",
//           question: "How does the spaced repetition algorithm work?",
//           answer:
//             "The system tracks your performance on flashcards and adjusts review frequency based on how well you know each concept. Cards you struggle with appear more frequently until you master them.",
//         },
//       ],
//     },
//     {
//       id: "technical-issues",
//       title: "Technical Issues",
//       icon: <Settings className="w-5 h-5" />,
//       faqs: [
//         {
//           id: "faq10",
//           question: "The portal is loading slowly. What should I do?",
//           answer:
//             "Try clearing your browser cache, disabling browser extensions, or switching to an incognito/private browsing window. If issues persist, check your internet connection or contact IT support.",
//         },
//         {
//           id: "faq11",
//           question: "I can't access certain features. Why?",
//           answer:
//             "Feature access depends on your user role and subscription level. Contact your institution's administrator to verify your account permissions or upgrade your access level if needed.",
//         },
//         {
//           id: "faq12",
//           question: "My progress isn't saving. How can I fix this?",
//           answer:
//             "Ensure you're logged in and have a stable internet connection. Try logging out and back in. If the problem persists, export your progress data and contact technical support immediately.",
//         },
//       ],
//     },
//   ];

//   const quickLinks = [
//     {
//       title: "Video Tutorials",
//       icon: <Video className="w-5 h-5" />,
//       description: "Step-by-step guides for using all portal features",
//     },
//     {
//       title: "User Manual",
//       icon: <FileText className="w-5 h-5" />,
//       description: "Comprehensive documentation and best practices",
//     },
//     {
//       title: "Community Forum",
//       icon: <Users className="w-5 h-5" />,
//       description: "Connect with other students and share experiences",
//     },
//     {
//       title: "Feature Requests",
//       icon: <MessageCircle className="w-5 h-5" />,
//       description: "Suggest new features or improvements",
//     },
//   ];

//   const contactOptions = [
//     {
//       title: "Live Chat Support",
//       description: "Get instant help from our support team",
//       icon: <MessageCircle className="w-6 h-6" />,
//       action: "Start Chat",
//       available: "Available 24/7",
//     },
//     {
//       title: "Email Support",
//       description: "Send us a detailed message about your issue",
//       icon: <Mail className="w-6 h-6" />,
//       action: "Send Email",
//       available: "Response within 4 hours",
//     },
//     {
//       title: "Phone Support",
//       description: "Speak directly with a technical specialist",
//       icon: <Phone className="w-6 h-6" />,
//       action: "Call Now",
//       available: "Mon-Fri 8AM-8PM EST",
//     },
//   ];

//   const filteredFAQs = faqCategories
//     .map((category) => ({
//       ...category,
//       faqs: category.faqs.filter(
//         (faq) =>
//           searchQuery === "" ||
//           faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     }))
//     .filter((category) => category.faqs.length > 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <div className="bg-white shadow-lg border-b border-indigo-100">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Help & Support
//             </h1>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Get the most out of your Medical AI Student Portal with our
//               comprehensive support resources
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Search Bar */}
//         <div className="mb-12">
//           <div className="relative max-w-2xl mx-auto">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search for help articles, FAQs, or tutorials..."
//               className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg shadow-sm"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//             Quick Access
//           </h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {quickLinks.map((link, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 cursor-pointer"
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 bg-indigo-100 rounded-lg">
//                     {link.icon}
//                   </div>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-2">
//                   {link.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{link.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//             Frequently Asked Questions
//           </h2>

//           {/* Category Navigation */}
//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             {faqCategories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveSection(category.id)}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
//                   activeSection === category.id
//                     ? "bg-indigo-600 text-white shadow-lg"
//                     : "bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200"
//                 }`}
//               >
//                 {category.icon}
//                 {category.title}
//               </button>
//             ))}
//           </div>

//           {/* FAQ Content */}
//           <div className="max-w-4xl mx-auto">
//             {(searchQuery
//               ? filteredFAQs
//               : faqCategories.filter((cat) => cat.id === activeSection)
//             ).map((category) => (
//               <div key={category.id} className="mb-8">
//                 {searchQuery && (
//                   <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     {category.icon}
//                     {category.title}
//                   </h3>
//                 )}
//                 <div className="space-y-4">
//                   {category.faqs.map((faq) => (
//                     <div
//                       key={faq.id}
//                       className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//                     >
//                       <button
//                         onClick={() => toggleFAQ(faq.id)}
//                         className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
//                       >
//                         <span className="font-semibold text-gray-900 pr-4">
//                           {faq.question}
//                         </span>
//                         {openFAQs[faq.id] ? (
//                           <ChevronDown className="w-5 h-5 text-indigo-600 flex-shrink-0" />
//                         ) : (
//                           <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                         )}
//                       </button>
//                       {openFAQs[faq.id] && (
//                         <div className="px-6 pb-4 border-t border-gray-100">
//                           <p className="text-gray-700 pt-4">{faq.answer}</p>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Contact Support */}
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
//             Contact Support
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {contactOptions.map((option, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
//               >
//                 <div className="flex justify-center mb-4">
//                   <div className="p-4 bg-indigo-100 rounded-full">
//                     {option.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {option.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{option.description}</p>
//                 <p className="text-sm text-indigo-600 mb-6">
//                   {option.available}
//                 </p>
//                 <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold">
//                   {option.action}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Status and Updates */}
//         <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             System Status & Updates
//           </h2>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-500" />
//                 Current Status
//               </h3>
//               <div className="space-y-3">
//                 <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                   <span className="text-gray-700">Portal Services</span>
//                   <span className="text-green-600 font-semibold">
//                     Operational
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                   <span className="text-gray-700">AI Features</span>
//                   <span className="text-green-600 font-semibold">
//                     Operational
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
//                   <span className="text-gray-700">File Uploads</span>
//                   <span className="text-yellow-600 font-semibold">
//                     Maintenance
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5 text-blue-500" />
//                 Recent Updates
//               </h3>
//               <div className="space-y-3">
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <div className="font-semibold text-gray-900">
//                     Enhanced AI Diagnostics
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     New cardiology and neurology modules added
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     March 15, 2025
//                   </div>
//                 </div>
//                 <div className="p-3 bg-blue-50 rounded-lg">
//                   <div className="font-semibold text-gray-900">
//                     Mobile App Update
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Improved offline study capabilities
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     March 10, 2025
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Help;



const Help = () => {
  return (
    <div>Help</div>
  )
}

export default Help