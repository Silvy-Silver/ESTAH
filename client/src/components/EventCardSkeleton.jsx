const EventCardSkeleton = () => {
    return (
        <div className="rounded-card overflow-hidden bg-white shadow-md border border-gray-100 flex flex-col h-full animate-pulse min-h-[400px]">
            <div className="w-full h-48 bg-gray-200 relative">
                <div className="absolute top-4 left-4 w-16 h-12 bg-gray-300 rounded"></div>
            </div>
            <div className="p-5 flex-grow flex flex-col gap-3">
                <div className="w-24 h-6 bg-gray-200 rounded-pill"></div>
                <div className="w-full h-7 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-7 bg-gray-200 rounded mb-2"></div>

                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-200 rounded"></div>

                <div className="mt-4 w-full h-12 bg-gray-200 rounded-button mt-auto"></div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
