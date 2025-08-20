'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export function BookingModal({
  isOpen,
  onClose,
  itemId,
  itemType
}) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: 'selection'
    }
  ]);
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [specialRequests, setSpecialRequests] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [licenseState, setLicenseState] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      itemId,
      itemType,
      dates: dateRange[0],
      guests,
      specialRequests,
      drivingLicenseNumber,
      licenseState,
      dateOfBirth
    });
    onClose();
  };

  // Australian states and territories for the dropdown
  const australianStates = [
    { code: '', name: 'Select State/Territory' },
    { code: 'NSW', name: 'New South Wales' },
    { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' },
    { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' },
    { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' },
    { code: 'NT', name: 'Northern Territory' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(4px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/30"
            onClick={onClose}
          />

          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-primary p-4 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    Book {itemType === 'room' ? 'Room' : itemType === 'caravan' ? 'Caravan' : 'Meal'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm opacity-90 mt-1">ID: {itemId}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white max-h-[80vh] overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dates
                  </label>
                  <div className="shadow rounded-lg p-3 flex justify-center">
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      rangeColors={["#B63D5E"]}
                      minDate={new Date()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Guests
                  </label>
                  <div className="flex justify-between gap-4">
                    <div className='flex items-center gap-4 w-1/2'>
                      <label className="block text-xs text-gray-500 mb-1">Adults</label>
                      <div className="flex-1 flex items-center justify-center shadow rounded-lg p-2">
                        <button
                          type="button"
                          onClick={() => setGuests(prev => ({
                            ...prev,
                            adults: Math.max(1, prev.adults - 1)
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4">{guests.adults}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(prev => ({
                            ...prev,
                            adults: prev.adults + 1
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className='flex items-center gap-4 w-1/2'>
                      <label className="block text-xs text-gray-500 mb-1">Children</label>
                      <div className="flex-1 flex items-center justify-center shadow rounded-lg p-2">
                        <button
                          type="button"
                          onClick={() => setGuests(prev => ({
                            ...prev,
                            children: Math.max(0, prev.children - 1)
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4">{guests.children}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(prev => ({
                            ...prev,
                            children: prev.children + 1
                          }))}
                          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New fields section */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Driving License Number *
                      </label>
                      <input
                        type="text"
                        value={drivingLicenseNumber}
                        onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Enter license number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License State *
                      </label>
                      <select
                        value={licenseState}
                        onChange={(e) => setLicenseState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        required
                      >
                        {australianStates.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                      max={new Date().toISOString().split('T')[0]} // Prevent future dates
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-button text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}