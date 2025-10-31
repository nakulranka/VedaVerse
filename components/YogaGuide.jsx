import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Search, SelfImprovement, Timer, FitnessCenter } from '@mui/icons-material';

const yogaPoses = [
  {
    id: 1,
    name: "Child's Pose",
    sanskritName: "Balasana",
    category: "Restorative",
    dosha: ["Vata", "Pitta"],
    difficulty: "Beginner",
    duration: "1-3 minutes",
    benefits: [
      "Calms the nervous system",
      "Relieves stress and anxiety",
      "Stretches hips and thighs",
      "Helps with digestion"
    ],
    instructions: [
      "Kneel on the floor with knees hip-width apart",
      "Sit back on your heels",
      "Fold forward, extending arms in front",
      "Rest forehead on the ground",
      "Breathe deeply and relax"
    ],
    precautions: "Avoid if you have knee injuries",
    description: "A gentle resting pose that promotes introspection and releases tension."
  },
  {
    id: 2,
    name: "Sun Salutation",
    sanskritName: "Surya Namaskara",
    category: "Flow",
    dosha: ["Kapha"],
    difficulty: "Intermediate",
    duration: "5-10 minutes",
    benefits: [
      "Energizes the body",
      "Improves flexibility",
      "Builds strength",
      "Enhances circulation"
    ],
    instructions: [
      "Start in Mountain Pose",
      "Inhale, raise arms overhead",
      "Exhale, fold forward",
      "Step back into plank",
      "Lower to chaturanga",
      "Cobra pose",
      "Downward dog",
      "Step forward, fold",
      "Rise to standing"
    ],
    precautions: "Modify for wrist or back issues",
    description: "A dynamic sequence that honors the sun and builds heat in the body."
  },
  {
    id: 3,
    name: "Warrior II",
    sanskritName: "Virabhadrasana II",
    category: "Standing",
    dosha: ["Pitta", "Kapha"],
    difficulty: "Beginner",
    duration: "30 seconds each side",
    benefits: [
      "Strengthens legs and core",
      "Improves balance",
      "Opens hips and chest",
      "Builds confidence"
    ],
    instructions: [
      "Stand with feet 4 feet apart",
      "Turn right foot out 90 degrees",
      "Bend right knee over ankle",
      "Extend arms parallel to floor",
      "Gaze over right hand",
      "Repeat on other side"
    ],
    precautions: "Avoid if you have knee problems",
    description: "A powerful standing pose that builds strength and determination."
  },
  {
    id: 4,
    name: "Seated Twist",
    sanskritName: "Ardha Matsyendrasana",
    category: "Seated",
    dosha: ["Pitta", "Kapha"],
    difficulty: "Intermediate",
    duration: "1-2 minutes each side",
    benefits: [
      "Aids digestion",
      "Detoxifies organs",
      "Improves spinal mobility",
      "Reduces stress"
    ],
    instructions: [
      "Sit with legs extended",
      "Bend right knee, foot outside left thigh",
      "Twist to the right",
      "Place left elbow against right knee",
      "Look over right shoulder",
      "Repeat on other side"
    ],
    precautions: "Move slowly, don't force the twist",
    description: "A cleansing twist that wrings out toxins and improves digestion."
  },
  {
    id: 5,
    name: "Corpse Pose",
    sanskritName: "Savasana",
    category: "Restorative",
    dosha: ["Vata", "Pitta", "Kapha"],
    difficulty: "Beginner",
    duration: "5-15 minutes",
    benefits: [
      "Deep relaxation",
      "Reduces stress",
      "Lowers blood pressure",
      "Integrates practice"
    ],
    instructions: [
      "Lie on your back",
      "Let arms rest by your sides",
      "Close your eyes",
      "Breathe naturally",
      "Release all tension",
      "Rest in stillness"
    ],
    precautions: "Use props for comfort if needed",
    description: "The ultimate relaxation pose that allows the body to absorb the benefits of practice."
  },
  {
    id: 6,
    name: "Tree Pose",
    sanskritName: "Vrikshasana",
    category: "Standing",
    dosha: ["Vata"],
    difficulty: "Beginner",
    duration: "30 seconds each side",
    benefits: [
      "Improves balance",
      "Strengthens legs",
      "Enhances focus",
      "Grounds scattered energy"
    ],
    instructions: [
      "Stand on left leg",
      "Place right foot on inner left thigh",
      "Press hands together at heart",
      "Find a focal point",
      "Breathe steadily",
      "Repeat on other side"
    ],
    precautions: "Use wall support if needed",
    description: "A balancing pose that cultivates stability and concentration."
  }
];

const pranayama = [
  {
    id: 1,
    name: "Three-Part Breath",
    sanskritName: "Dirga Pranayama",
    dosha: ["Vata", "Pitta"],
    duration: "5-10 minutes",
    benefits: ["Calms nervous system", "Reduces anxiety", "Improves focus"],
    technique: "Breathe into belly, ribs, then chest. Reverse on exhale."
  },
  {
    id: 2,
    name: "Bee Breath",
    sanskritName: "Bhramari Pranayama",
    dosha: ["Vata", "Pitta"],
    duration: "3-5 minutes",
    benefits: ["Reduces stress", "Calms mind", "Improves concentration"],
    technique: "Close ears with thumbs, hum while exhaling."
  },
  {
    id: 3,
    name: "Breath of Fire",
    sanskritName: "Kapalabhati",
    dosha: ["Kapha"],
    duration: "1-3 minutes",
    benefits: ["Energizes body", "Clears mind", "Builds heat"],
    technique: "Sharp exhales through nose, passive inhales."
  }
];

function YogaGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPose, setSelectedPose] = useState(null);
  const [filterDosha, setFilterDosha] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showPranayama, setShowPranayama] = useState(false);

  const categories = [...new Set(yogaPoses.map(pose => pose.category))];

  const filteredPoses = yogaPoses.filter(pose => {
    const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pose.sanskritName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pose.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDosha = !filterDosha || pose.dosha.includes(filterDosha);
    const matchesCategory = !filterCategory || pose.category === filterCategory;
    
    return matchesSearch && matchesDosha && matchesCategory;
  });

  const doshaColors = {
    'Vata': '#8BC34A',
    'Pitta': '#FF9800',
    'Kapha': '#2196F3'
  };

  const difficultyColors = {
    'Beginner': '#4CAF50',
    'Intermediate': '#FF9800',
    'Advanced': '#F44336'
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom color="primary" textAlign="center">
        <SelfImprovement sx={{ mr: 1, verticalAlign: 'middle' }} />
        Yoga & Pranayama Guide
      </Typography>
      
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Practice yoga asanas and breathing techniques tailored to your dosha
      </Typography>

      {/* Toggle between Asanas and Pranayama */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant={!showPranayama ? 'contained' : 'outlined'}
          onClick={() => setShowPranayama(false)}
          sx={{ mr: 2 }}
        >
          Yoga Poses
        </Button>
        <Button
          variant={showPranayama ? 'contained' : 'outlined'}
          onClick={() => setShowPranayama(true)}
        >
          Pranayama
        </Button>
      </Box>

      {!showPranayama ? (
        <>
          {/* Search and Filter */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search poses, benefits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label="All Doshas"
                    onClick={() => setFilterDosha('')}
                    color={filterDosha === '' ? 'primary' : 'default'}
                    variant={filterDosha === '' ? 'filled' : 'outlined'}
                    size="small"
                  />
                  {['Vata', 'Pitta', 'Kapha'].map(dosha => (
                    <Chip
                      key={dosha}
                      label={dosha}
                      onClick={() => setFilterDosha(dosha)}
                      sx={{ 
                        backgroundColor: filterDosha === dosha ? doshaColors[dosha] : 'transparent',
                        color: filterDosha === dosha ? 'white' : doshaColors[dosha],
                        borderColor: doshaColors[dosha]
                      }}
                      variant={filterDosha === dosha ? 'filled' : 'outlined'}
                      size="small"
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  <Chip
                    label="All Categories"
                    onClick={() => setFilterCategory('')}
                    color={filterCategory === '' ? 'secondary' : 'default'}
                    variant={filterCategory === '' ? 'filled' : 'outlined'}
                    size="small"
                  />
                  {categories.map(category => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => setFilterCategory(category)}
                      color={filterCategory === category ? 'secondary' : 'default'}
                      variant={filterCategory === category ? 'filled' : 'outlined'}
                      size="small"
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Poses Grid */}
          <Grid container spacing={3}>
            {filteredPoses.map((pose) => (
              <Grid item xs={12} sm={6} md={4} key={pose.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                      boxShadow: 4
                    }
                  }}
                  onClick={() => setSelectedPose(pose)}
                >
                  <Box
                    sx={{ 
                      height: 150, 
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <SelfImprovement sx={{ fontSize: 60, color: '#4caf50' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      {pose.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {pose.sanskritName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {pose.dosha.map(dosha => (
                        <Chip
                          key={dosha}
                          label={dosha}
                          size="small"
                          sx={{
                            backgroundColor: doshaColors[dosha],
                            color: 'white',
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip 
                        label={pose.category} 
                        size="small" 
                        variant="outlined" 
                        color="secondary"
                      />
                      <Chip
                        label={pose.difficulty}
                        size="small"
                        sx={{
                          backgroundColor: difficultyColors[pose.difficulty],
                          color: 'white'
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <Timer sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption">
                        {pose.duration}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        /* Pranayama Section */
        <Grid container spacing={3}>
          {pranayama.map((technique) => (
            <Grid item xs={12} md={6} key={technique.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {technique.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {technique.sanskritName}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {technique.dosha.map(dosha => (
                      <Chip
                        key={dosha}
                        label={dosha}
                        size="small"
                        sx={{
                          backgroundColor: doshaColors[dosha],
                          color: 'white'
                        }}
                      />
                    ))}
                  </Box>

                  <Typography variant="body2" paragraph>
                    <strong>Technique:</strong> {technique.technique}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Timer sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {technique.duration}
                    </Typography>
                  </Box>

                  <Typography variant="body2">
                    <strong>Benefits:</strong>
                  </Typography>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {technique.benefits.map((benefit, index) => (
                      <li key={index}>
                        <Typography variant="body2">{benefit}</Typography>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pose Detail Dialog */}
      <Dialog
        open={Boolean(selectedPose)}
        onClose={() => setSelectedPose(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedPose && (
          <>
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {selectedPose.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedPose.sanskritName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {selectedPose.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={selectedPose.category} color="secondary" />
                  <Chip 
                    label={selectedPose.difficulty}
                    sx={{
                      backgroundColor: difficultyColors[selectedPose.difficulty],
                      color: 'white'
                    }}
                  />
                  <Chip 
                    label={selectedPose.duration}
                    variant="outlined"
                    icon={<Timer />}
                  />
                  {selectedPose.dosha.map(dosha => (
                    <Chip
                      key={dosha}
                      label={`Good for ${dosha}`}
                      sx={{
                        backgroundColor: doshaColors[dosha],
                        color: 'white'
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Benefits:
                </Typography>
                <ul>
                  {selectedPose.benefits.map((benefit, index) => (
                    <li key={index}>
                      <Typography variant="body2">{benefit}</Typography>
                    </li>
                  ))}
                </ul>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Instructions:
                </Typography>
                <List dense>
                  {selectedPose.instructions.map((instruction, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={`${index + 1}. ${instruction}`}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  Precautions:
                </Typography>
                <Typography variant="body2" color="warning.main">
                  {selectedPose.precautions}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedPose(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {!showPranayama && filteredPoses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No poses found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default YogaGuide;