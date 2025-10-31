import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
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
  Button
} from '@mui/material';
import { Search, LocalFlorist } from '@mui/icons-material';

const herbs = [
  {
    id: 1,
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "Adaptogen",
    dosha: ["Vata", "Kapha"],
    benefits: [
      "Reduces stress and anxiety",
      "Improves sleep quality",
      "Boosts energy and stamina",
      "Supports immune system"
    ],
    usage: "Take 300-500mg twice daily with warm milk or water",
    precautions: "Avoid during pregnancy. Consult doctor if on thyroid medication.",
    image: "/images/ashwagandha.jpg",
    description: "Known as Indian Winter Cherry, Ashwagandha is one of the most powerful herbs in Ayurvedic healing."
  },
  {
    id: 2,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Anti-inflammatory",
    dosha: ["Pitta", "Kapha"],
    benefits: [
      "Powerful anti-inflammatory",
      "Supports joint health",
      "Aids digestion",
      "Boosts immunity"
    ],
    usage: "1/2 teaspoon with warm milk or in cooking daily",
    precautions: "May increase bleeding risk. Avoid with blood thinners.",
    image: "/images/turmeric.jpg",
    description: "The golden spice of life, turmeric has been used for thousands of years in Ayurvedic medicine."
  },
  {
    id: 3,
    name: "Brahmi",
    scientificName: "Bacopa monnieri",
    category: "Brain tonic",
    dosha: ["Vata", "Pitta"],
    benefits: [
      "Enhances memory and learning",
      "Reduces anxiety and stress",
      "Improves concentration",
      "Supports nervous system"
    ],
    usage: "250-300mg twice daily with food",
    precautions: "May cause drowsiness. Start with lower doses.",
    image: "/images/brahmi.jpg",
    description: "Brahmi is considered the most important nervine tonic in Ayurvedic medicine."
  },
  {
    id: 4,
    name: "Triphala",
    scientificName: "Three fruits combination",
    category: "Digestive",
    dosha: ["Vata", "Pitta", "Kapha"],
    benefits: [
      "Supports healthy digestion",
      "Natural detoxifier",
      "Rich in antioxidants",
      "Promotes regular elimination"
    ],
    usage: "1-2 tablets before bed with warm water",
    precautions: "May cause loose stools initially. Reduce dose if needed.",
    image: "/images/triphala.jpg",
    description: "A combination of three fruits that balances all three doshas and supports overall health."
  },
  {
    id: 5,
    name: "Neem",
    scientificName: "Azadirachta indica",
    category: "Blood purifier",
    dosha: ["Pitta", "Kapha"],
    benefits: [
      "Purifies blood",
      "Supports skin health",
      "Natural antimicrobial",
      "Supports liver function"
    ],
    usage: "2-4 capsules twice daily with water",
    precautions: "Avoid during pregnancy and breastfeeding.",
    image: "/images/neem.jpg",
    description: "Known as the village pharmacy, neem is one of the most versatile medicinal plants."
  },
  {
    id: 6,
    name: "Ginger",
    scientificName: "Zingiber officinale",
    category: "Digestive",
    dosha: ["Vata", "Kapha"],
    benefits: [
      "Improves digestion",
      "Reduces nausea",
      "Anti-inflammatory",
      "Boosts circulation"
    ],
    usage: "Fresh ginger tea or 1/4 teaspoon powder with meals",
    precautions: "May increase Pitta. Use moderately if you have gastric issues.",
    image: "/images/ginger.jpg",
    description: "A warming spice that kindles digestive fire and promotes healthy circulation."
  }
];

function HerbsGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHerb, setSelectedHerb] = useState(null);
  const [filterDosha, setFilterDosha] = useState('');

  const filteredHerbs = herbs.filter(herb => {
    const matchesSearch = herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         herb.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         herb.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDosha = !filterDosha || herb.dosha.includes(filterDosha);
    
    return matchesSearch && matchesDosha;
  });

  const doshaColors = {
    'Vata': '#8BC34A',
    'Pitta': '#FF9800',
    'Kapha': '#2196F3'
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom color="primary" textAlign="center">
        <LocalFlorist sx={{ mr: 1, verticalAlign: 'middle' }} />
        Ayurvedic Herbs Guide
      </Typography>
      
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
        Discover the healing power of traditional Ayurvedic herbs and their therapeutic benefits
      </Typography>

      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search herbs, benefits, or categories..."
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
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="All Doshas"
                onClick={() => setFilterDosha('')}
                color={filterDosha === '' ? 'primary' : 'default'}
                variant={filterDosha === '' ? 'filled' : 'outlined'}
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
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Herbs Grid */}
      <Grid container spacing={3}>
        {filteredHerbs.map((herb) => (
          <Grid item xs={12} sm={6} md={4} key={herb.id}>
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
              onClick={() => setSelectedHerb(herb)}
            >
              <CardMedia
                sx={{ 
                  height: 200, 
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LocalFlorist sx={{ fontSize: 60, color: '#4caf50' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {herb.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {herb.scientificName}
                </Typography>
                <Typography variant="body2" paragraph>
                  {herb.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                  {herb.dosha.map(dosha => (
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
                <Chip 
                  label={herb.category} 
                  size="small" 
                  variant="outlined" 
                  color="secondary"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Herb Detail Dialog */}
      <Dialog
        open={Boolean(selectedHerb)}
        onClose={() => setSelectedHerb(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedHerb && (
          <>
            <DialogTitle sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {selectedHerb.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedHerb.scientificName}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" paragraph>
                  {selectedHerb.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={selectedHerb.category} color="secondary" />
                  {selectedHerb.dosha.map(dosha => (
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
                  Health Benefits:
                </Typography>
                <ul>
                  {selectedHerb.benefits.map((benefit, index) => (
                    <li key={index}>
                      <Typography variant="body2">{benefit}</Typography>
                    </li>
                  ))}
                </ul>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Usage:
                </Typography>
                <Typography variant="body2" paragraph>
                  {selectedHerb.usage}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Precautions:
                </Typography>
                <Typography variant="body2" color="warning.main">
                  {selectedHerb.precautions}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedHerb(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {filteredHerbs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No herbs found matching your search criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or filters
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HerbsGuide;