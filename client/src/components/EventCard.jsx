import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ duration: 0.2 }}
            className="rounded-card overflow-hidden bg-white shadow-lg border border-gray-100 flex flex-col h-full"
        >
            <div className="w-full h-48 relative overflow-hidden group">
                <img
                    src={event.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60'}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center justify-center shadow-md min-w-[3.5rem]">
                    <span className="text-xl font-bold text-accent leading-none">{event.dateShort ? event.dateShort.split(' ')[0] : ''}</span>
                    <span className="text-xs font-semibold text-text uppercase">{event.dateShort ? event.dateShort.split(' ')[1] : ''}</span>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                {event.category && (
                    <span className="inline-block px-3 py-1 bg-green-50 text-primary text-xs font-semibold rounded-pill mb-3 w-max">
                        {event.category}
                    </span>
                )}

                <h3 className="text-xl font-bold text-text mb-3 line-clamp-2 leading-tight">
                    {event.title}
                </h3>

                <div className="flex flex-col gap-2 mt-auto mb-5 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span className="truncate">{event.longDate || event.dateShort}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span className="truncate">{event.time || '10:00 AM'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="truncate">{event.location}</span>
                    </div>
                    {event.interested && (
                        <div className="flex items-center gap-2">
                            <span>👥</span>
                            <span className="truncate">{event.interested} interested</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                    {event.ticketsAvailable === false ? (
                        <button
                            disabled
                            className="w-full py-3 bg-gray-300 text-gray-500 font-semibold rounded-button cursor-not-allowed"
                        >
                            Sold Out
                        </button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open(event.bookingUrl, '_blank', 'noopener,noreferrer')}
                            className="w-full py-3 bg-accent text-white font-semibold rounded-button shadow-md hover:bg-orange-600 transition-colors"
                        >
                            Book Tickets →
                        </motion.button>
                    )}

                    <button
                        onClick={() => window.open(event.bookingUrl, '_blank', 'noopener,noreferrer')}
                        className="w-full py-2 bg-transparent text-primary hover:text-green-800 font-medium text-sm transition-colors"
                    >
                        View Full Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
