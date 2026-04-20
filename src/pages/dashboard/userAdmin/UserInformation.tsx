import { useState } from "react";
import { User, X } from "lucide-react";

type UserInformationProps = {
    data: {
        fullName: string;
        email: string;
        phone: string;
        country: string;
        university?: string;
        bio?: string;
        street: string;
        preparing: string;
        degree?: string;
        nid?: string;
        certificate?: string;
        bankName: string;
        accountNumber: string;
    };
    isUserProfile?: boolean; 
};

const UserInformation = ({ data, isUserProfile }: UserInformationProps) => {
    const [modalImage, setModalImage] = useState<string | null>(null);

    const openModal = (imgUrl: string) => setModalImage(imgUrl);
    const closeModal = () => setModalImage(null);

    return (
        <div className="space-y-6 w-full mx-auto">
            {/* Profile Information */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                    <User className="w-5 h-5" />
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <p className="text-base font-medium text-gray-800">Full Name</p>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.fullName}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base font-medium text-gray-800">Email</p>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.email}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base font-medium text-gray-800">Phone</p>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.phone}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base font-medium text-gray-800">Country</p>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.country}</p>
                    </div>
                    {data.university && (
                        <div className="space-y-2">
                            <p className="text-base font-medium text-gray-800">University</p>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.university}</p>
                        </div>
                    )}
                    <div className="space-y-2">
                        <p className="text-base font-medium text-gray-800 space">Preparing For</p>
                        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-[4px]">{data.preparing}</p>
                    </div>
                </div>

                {data.bio && (
                    <div className="mt-4 space-y-2">
                        <p className="text-base font-medium text-gray-800">Bio</p>
                        <p className="text-sm text-gray-700 bg-blue-50 px-3 pt-4 pb-14 rounded-[4px]">{data.bio}</p>
                    </div>
                )}
            </div>

            {/* Educational Info - hide when /admin/user-profile */}
            {!isUserProfile && (
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-4">
                    <h2 className="text-base font-semibold underline">Educational Info</h2>
                    {data.degree && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Degree:</p>
                            <img
                                src={data.degree}
                                alt="Degree"
                                className="w-32 h-20 object-cover cursor-pointer border rounded"
                                onClick={() => openModal(data.degree!)}
                            />
                        </div>
                    )}
                    {data.nid && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium">NID/Passport/Driving License:</p>
                            <img
                                src={data.nid}
                                alt="NID"
                                className="w-32 h-20 object-cover cursor-pointer border rounded"
                                onClick={() => openModal(data.nid!)}
                            />
                        </div>
                    )}
                    {data.certificate && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Certificate:</p>
                            <img
                                src={data.certificate}
                                alt="Certificate"
                                className="w-32 h-20 object-cover cursor-pointer border rounded"
                                onClick={() => openModal(data.certificate!)}
                            />
                        </div>
                    )}

                    <h2 className="text-base font-semibold underline mt-4">Bank Info</h2>
                    <p className="text-sm font-medium">Name: {data.fullName}</p>
                    <p className="text-sm font-medium">Bank Name: {data.bankName}</p>
                    <p className="text-sm font-medium">Account Number: {data.accountNumber}</p>
                </div>
            )}

            {/* Modal */}
            {modalImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img
                            src={modalImage}
                            alt="Preview"
                            className="max-h-[80vh] max-w-[90vw] rounded"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInformation;
