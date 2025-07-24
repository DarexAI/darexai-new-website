import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Building, 
  Phone, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface BookingFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
  timezone: string;
  message: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    selectedDate: '',
    selectedTime: '',
    timezone: '',
    message: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  // Auto-detect timezone
  useEffect(() => {
    if (isOpen) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setFormData(prev => ({ ...prev, timezone }));
    }
  }, [isOpen]);

  // Generate available time slots
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        // Simulate some unavailable slots
        const available = Math.random() > 0.3;
        slots.push({ time, available });
      }
    }
    
    return slots;
  };

  const availableSlots = formData.selectedDate ? generateTimeSlots(formData.selectedDate) : [];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.company.trim()) newErrors.company = 'Company is required';
    }
    
    if (step === 2) {
      if (!formData.selectedDate) newErrors.selectedDate = 'Please select a date';
      if (!formData.selectedTime) newErrors.selectedTime = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsSubmitting(true);

    // Prepare data for insertion
    const insertData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone || null,
      selected_date: formData.selectedDate || null,
      selected_time: formData.selectedTime || null,
      timezone: formData.timezone || null,
      message: formData.message || null,
      created_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const { data, error } = await supabase.from('demo_bookings').insert([insertData]);

    setIsSubmitting(false);

    if (error) {
      console.error('Booking failed:', error);
      alert('Failed to submit booking. Please try again later.');
      return;
    }

    setIsSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        selectedDate: '',
        selectedTime: '',
        timezone: formData.timezone,
        message: '',
      });
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Booking Drawer */}
        <motion.div
          className="relative w-full max-w-[480px] h-full bg-dark-card backdrop-filter backdrop-blur-xl border-l border-ai-slate overflow-y-auto"
          style={{
            background: 'rgba(15, 20, 25, 0.95)',
            backdropFilter: 'blur(12px)'
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-dark-card/80 backdrop-blur-sm border-b border-ai-slate p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">Book Your Demo</h2>
                <p className="text-gray-400 mt-1">30-minute strategy session</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 glass rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center mt-6 space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? 'bg-gradient-to-r from-ai-blue to-ai-indigo text-white' : 'glass text-gray-400'
                }`}>
                  1
                </div>
                <span className={`text-sm ${currentStep >= 1 ? 'text-white' : 'text-gray-400'}`}>
                  Contact Info
                </span>
              </div>
              <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-gradient-to-r from-ai-blue to-ai-indigo' : 'bg-gray-600'}`}></div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-ai-blue to-ai-indigo text-white' : 'glass text-gray-400'
                }`}>
                  2
                </div>
                <span className={`text-sm ${currentStep >= 2 ? 'text-white' : 'text-gray-400'}`}>
                  Schedule
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 bg-ai-emerald rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Demo Booked Successfully!</h3>
                  <p className="text-gray-300 mb-6">
                    We've sent a calendar invite to {formData.email} with the Google Meet link.
                  </p>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-400 mb-2">Your Demo Details:</p>
                    <p className="text-white font-medium">{formData.selectedDate} at {formData.selectedTime}</p>
                    <p className="text-gray-400 text-sm">{formData.timezone}</p>
                  </div>
                </motion.div>
              ) : currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-ai-blue'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-ai-blue'
                        }`}
                        placeholder="your.email@company.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.company ? 'focus:ring-red-500 border-red-500' : 'focus:ring-ai-blue'
                        }`}
                        placeholder="Your company name"
                      />
                    </div>
                    {errors.company && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ai-blue transition-all duration-300"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      What would you like to discuss? (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ai-blue transition-all duration-300 resize-none"
                      placeholder="Tell us about your automation goals..."
                    />
                  </div>

                  <motion.button
                    onClick={handleNext}
                    className="w-full px-6 py-4 bg-gradient-to-r from-ai-blue to-ai-indigo text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-ai-blue/25 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Scheduling
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Select Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.selectedDate}
                        onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                        min={getMinDate()}
                        max={getMaxDate()}
                        className={`w-full pl-12 pr-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.selectedDate ? 'focus:ring-red-500 border-red-500' : 'focus:ring-ai-blue'
                        }`}
                      />
                    </div>
                    {errors.selectedDate && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.selectedDate}
                      </p>
                    )}
                  </div>

                  {formData.selectedDate && (
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Select Time * ({formData.timezone})
                      </label>
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {availableSlots.map((slot, index) => (
                          <motion.button
                            key={index}
                            onClick={() => slot.available && handleInputChange('selectedTime', slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                              formData.selectedTime === slot.time
                                ? 'bg-gradient-to-r from-ai-blue to-ai-indigo text-white'
                                : slot.available
                                ? 'glass text-gray-300 hover:bg-white hover:bg-opacity-10'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                            whileHover={slot.available ? { scale: 1.02 } : {}}
                            whileTap={slot.available ? { scale: 0.98 } : {}}
                          >
                            {slot.time}
                          </motion.button>
                        ))}
                      </div>
                      {errors.selectedTime && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.selectedTime}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <motion.button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 px-6 py-4 glass text-white rounded-xl font-bold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.selectedDate || !formData.selectedTime}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-ai-blue to-ai-indigo text-white rounded-xl font-bold hover:shadow-lg hover:shadow-ai-blue/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Booking...
                        </>
                      ) : (
                        'Book Demo'
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;