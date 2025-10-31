import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Rating,
  Divider,
  IconButton,
  InputAdornment,
  Autocomplete,
  Slider,
  FormControlLabel,
  Checkbox,
  Paper
} from '@mui/material';
import {
  Search,
  LocationOn,
  Language,
  VideoCall,
  LocalHospital,
  Star,
  FilterList,
  Clear
} from '@mui/icons-material';

// Types
interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  experience: number;
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
  clinic: {
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
  };
  availability: {
    nextAvailable: string;
  };
}

interface SearchFilters {
  specialization?: string;
  city?: string;
  consultationType?: 'online' | 'in-person' | 'both';
  rating?: number;
  experience?: number;
  language?: string;
  fees?: [number, number];
}

interface DoctorSearchProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

// Sample doctor data
const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    title: 'BAMS, MD (Ayurveda)',
    specialization: ['Panchakarma', 'Women\'s Health', 'Skin Disorders'],
    experience: 12,
    languages: ['English', 'Hindi', 'Sanskrit'],
    profileImage: '/images/doctor1.jpg',
    rating: 4.8,
    reviewCount: 156,
    consultation: {
      online: true,
      inPerson: true,
      fees: {
        online: 500,
        inPerson: 800
      }
    },
    clinic: {
      name: 'Vedic Wellness Center',
      address: 'Sector 15, Dwarka',
      city: 'Delhi',
      state: 'Delhi',
      phone: '+91 98765 43210'
    },
    availability: {
      nextAvailable: 'Today, 2:00 PM'
    }
  },
  {
    id: '2',
    name: 'Dr. Rajesh Kumar',
    title: 'BAMS, PhD (Kayachikitsa)',
    specialization: ['General Ayurveda', 'Digestive Disorders', 'Stress Management'],
    experience: 18,
    languages: ['English', 'Hindi', 'Tamil'],
    profileImage: '/images/doctor2.jpg',
    rating: 4.9,
    reviewCount: 203,
    consultation: {
      online: true,
      inPerson: true,
      fees: {
        online: 600,
        inPerson: 1000
      }
    },
    clinic: {
      name: 'Ayur Healing Center',
      address: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      phone: '+91 98765 43211'
    },
    availability: {
      nextAvailable: 'Tomorrow, 10:00 AM'
    }
  },
  {
    id: '3',
    name: 'Dr. Meera Patel',
    title: 'BAMS, MS (Prasutitantra)',
    specialization: ['Women\'s Health', 'Fertility', 'Prenatal Care'],
    experience: 15,
    languages: ['English', 'Hindi', 'Gujarati'],
    profileImage: '/images/doctor3.jpg',
    rating: 4.7,
    reviewCount: 128,
    consultation: {
      online: true,
      inPerson: true,
      fees: {
        online: 700,
        inPerson: 1200
      }
    },
    clinic: {
      name: 'Mahila Ayurveda Clinic',
      address: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      phone: '+91 98765 43212'
    },
    availability: {
      nextAvailable: 'Today, 4:30 PM'
    }
  }
];

const SPECIALIZATIONS = [
  'General Ayurveda',
  'Panchakarma',
  'Women\'s Health',
  'Digestive Disorders',
  'Skin Disorders',
  'Stress Management',
  'Joint & Bone Health',
  'Respiratory Disorders',
  'Cardiac Care',
  'Diabetes Management'
];

const CITIES = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore'
];

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Telugu', 'Gujarati', 'Marathi', 'Bengali'];

const DoctorSearch: React.FC<DoctorSearchProps> = ({ onDoctorSelect }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(sampleDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(sampleDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    fees: [0, 2000]
  });

  // Filter doctors based on search and filters
  useEffect(() => {
    let filtered = doctors;

    // Text search
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        doctor.clinic.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.specialization) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.includes(filters.specialization!)
      );
    }

    if (filters.city) {
      filtered = filtered.filter(doctor =>
        doctor.clinic.city === filters.city
      );
    }

    if (filters.consultationType) {
      filtered = filtered.filter(doctor => {
        if (filters.consultationType === 'online') return doctor.consultation.online;
        if (filters.consultationType === 'in-person') return doctor.consultation.inPerson;
        return true;
      });
    }

    if (filters.rating) {
      filtered = filtered.filter(doctor => doctor.rating >= filters.rating!);
    }

    if (filters.experience) {
      filtered = filtered.filter(doctor => doctor.experience >= filters.experience!);
    }

    if (filters.language) {
      filtered = filtered.filter(doctor =>
        doctor.languages.includes(filters.language!)
      );
    }

    if (filters.fees) {
      filtered = filtered.filter(doctor =>
        doctor.consultation.fees.online >= filters.fees![0] &&
        doctor.consultation.fees.online <= filters.fees![1]
      );
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, filters, doctors]);

  const clearFilters = () => {
    setFilters({ fees: [0, 2000] });
    setSearchQuery('');
  };

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={doctor.profileImage}
            sx={{ width: 60, height: 60, mr: 2 }}
          >
            {doctor.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {doctor.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {doctor.title}
            </Typography>
            <Box display="flex" alignItems="center" mt={0.5}>
              <Rating value={doctor.rating} precision={0.1} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" ml={1}>
                {doctor.rating} ({doctor.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mb={2}>
          {doctor.specialization.map((spec, index) => (
            <Chip
              key={index}
              label={spec}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {doctor.clinic.city}, {doctor.clinic.state}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <Language fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {doctor.languages.join(', ')}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Experience: {doctor.experience} years
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            {doctor.consultation.online && (
              <Box display="flex" alignItems="center" mb={0.5}>
                <VideoCall fontSize="small" color="primary" />
                <Typography variant="body2" ml={1}>
                  Online: ₹{doctor.consultation.fees.online}
                </Typography>
              </Box>
            )}
            {doctor.consultation.inPerson && (
              <Box display="flex" alignItems="center">
                <LocalHospital fontSize="small" color="primary" />
                <Typography variant="body2" ml={1}>
                  In-person: ₹{doctor.consultation.fees.inPerson}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Typography variant="body2" color="success.main" fontWeight="medium">
          Next Available: {doctor.availability.nextAvailable}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onDoctorSelect(doctor)}
        >
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Find Ayurvedic Doctors
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Connect with certified Ayurvedic practitioners for personalized healthcare
      </Typography>

      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by doctor name, specialization, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "contained" : "outlined"}
          >
            Filters
          </Button>
          <Typography variant="body2" color="text.secondary">
            {filteredDoctors.length} doctors found
          </Typography>
        </Box>

        {/* Filters */}
        {showFilters && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Specialization</InputLabel>
                  <Select
                    value={filters.specialization || ''}
                    onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
                    label="Specialization"
                  >
                    <MenuItem value="">All Specializations</MenuItem>
                    {SPECIALIZATIONS.map((spec) => (
                      <MenuItem key={spec} value={spec}>{spec}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    value={filters.city || ''}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    label="City"
                  >
                    <MenuItem value="">All Cities</MenuItem>
                    {CITIES.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Consultation Type</InputLabel>
                  <Select
                    value={filters.consultationType || ''}
                    onChange={(e) => setFilters({ ...filters, consultationType: e.target.value as any })}
                    label="Consultation Type"
                  >
                    <MenuItem value="">Both</MenuItem>
                    <MenuItem value="online">Online Only</MenuItem>
                    <MenuItem value="in-person">In-Person Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={filters.language || ''}
                    onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    label="Language"
                  >
                    <MenuItem value="">Any Language</MenuItem>
                    {LANGUAGES.map((lang) => (
                      <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Minimum Rating</Typography>
                <Slider
                  value={filters.rating || 0}
                  onChange={(_, value) => setFilters({ ...filters, rating: value as number })}
                  min={0}
                  max={5}
                  step={0.5}
                  marks={[
                    { value: 0, label: 'Any' },
                    { value: 3, label: '3+' },
                    { value: 4, label: '4+' },
                    { value: 5, label: '5' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Experience (Years)</Typography>
                <Slider
                  value={filters.experience || 0}
                  onChange={(_, value) => setFilters({ ...filters, experience: value as number })}
                  min={0}
                  max={30}
                  step={1}
                  marks={[
                    { value: 0, label: 'Any' },
                    { value: 5, label: '5+' },
                    { value: 10, label: '10+' },
                    { value: 20, label: '20+' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button variant="outlined" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Results */}
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} md={6} lg={4} key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>

      {filteredDoctors.length === 0 && (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No doctors found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Try adjusting your search criteria or filters
          </Typography>
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DoctorSearch;