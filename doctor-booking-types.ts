// Doctor Booking System Types and Interfaces

export interface Doctor {
  id: string;
  name: string;
  title: string; // Dr., BAMS, MD, etc.
  specialization: string[];
  qualifications: string[];
  experience: number; // years
  languages: string[];
  profileImage: string;
  rating: number;
  reviewCount: number;
  consultation: {
    online: boolean;
    inPerson: boolean;
    fees: {
      online: number;
      inPerson: number;
    };
  };
  availability: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
    timeSlots: TimeSlot[];
  };
  clinic: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  about: string;
  education: Education[];
  certifications: string[];
  awards: string[];
}

export interface TimeSlot {
  id: string;
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
  available: boolean;
  date: string; // "2025-11-01"
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Booking {
  id: string;
  patientId: string;
  doctorId: string;
  doctor: Doctor;
  appointmentDate: string;
  timeSlot: TimeSlot;
  type: 'online' | 'in-person';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  symptoms: string;
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;
  meetingLink?: string; // For online consultations
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  bookingId: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  helpful: number; // helpfulness count
}

export interface SearchFilters {
  specialization?: string;
  city?: string;
  consultationType?: 'online' | 'in-person' | 'both';
  availability?: 'today' | 'tomorrow' | 'this-week';
  rating?: number;
  experience?: number;
  language?: string;
  fees?: {
    min: number;
    max: number;
  };
}

export interface DoctorSearchProps {
  onDoctorSelect: (doctor: Doctor) => void;
  filters?: SearchFilters;
}

export interface BookingFormProps {
  doctor: Doctor;
  selectedSlot?: TimeSlot;
  onBookingConfirm: (booking: Booking) => void;
  onCancel: () => void;
}

export interface PaymentDetails {
  amount: number;
  currency: string;
  paymentMethod: 'razorpay' | 'stripe';
  orderId: string;
}

// Ayurvedic Specializations
export const AYURVEDIC_SPECIALIZATIONS = [
  'General Ayurveda',
  'Panchakarma',
  'Rasayana (Anti-aging)',
  'Kayachikitsa (Internal Medicine)',
  'Shalya Tantra (Surgery)',
  'Shalakya Tantra (ENT & Ophthalmology)',
  'Kaumarbhritya (Pediatrics)',
  'Agadtantra (Toxicology)',
  'Bhutavidya (Psychiatry)',
  'Prasutitantra (Gynecology & Obstetrics)',
  'Swasthvritta (Preventive Medicine)',
  'Yoga & Meditation',
  'Marma Therapy',
  'Pulse Diagnosis',
  'Herbal Medicine',
  'Lifestyle Counseling'
];

export const CONSULTATION_TYPES = [
  { value: 'online', label: 'Online Consultation', icon: '💻' },
  { value: 'in-person', label: 'In-Person Visit', icon: '🏥' },
  { value: 'both', label: 'Both Available', icon: '🔄' }
];

export const EXPERIENCE_RANGES = [
  { value: 1, label: '1+ years' },
  { value: 5, label: '5+ years' },
  { value: 10, label: '10+ years' },
  { value: 15, label: '15+ years' },
  { value: 20, label: '20+ years' }
];

export const RATING_FILTERS = [
  { value: 4.5, label: '4.5+ stars' },
  { value: 4.0, label: '4.0+ stars' },
  { value: 3.5, label: '3.5+ stars' },
  { value: 3.0, label: '3.0+ stars' }
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Sanskrit',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Kannada',
  'Marathi',
  'Gujarati',
  'Bengali',
  'Punjabi',
  'Urdu'
];

export const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur',
  'Allahabad', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
  'Madurai', 'Guwahati', 'Chandigarh', 'Hubli-Dharwad', 'Mysore'
];