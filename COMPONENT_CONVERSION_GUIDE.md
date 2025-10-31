# Component Conversion Guide (JS to TypeScript)

## Quick Conversion Steps

### 1. Header Component Conversion

**Original:** `Header.js`
**Convert to:** `Header.tsx`

```typescript
import React from 'react';
import { User } from 'firebase/auth';
import './Header.css';

type ViewType = 'welcome' | 'quiz' | 'results' | 'herbs' | 'yoga';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  user?: User | null;
  onAuthClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigate, 
  user, 
  onAuthClick 
}) => {
  return (
    <header className="header">
      {/* Your existing header content */}
      <div className="nav-buttons">
        <button 
          className={`nav-btn ${currentView === 'welcome' ? 'active' : ''}`}
          onClick={() => onNavigate('welcome')}
        >
          Home
        </button>
        {/* Add other nav buttons */}
      </div>
      
      {/* Auth button */}
      {!user ? (
        <button onClick={onAuthClick} className="auth-btn">
          Sign In
        </button>
      ) : (
        <div className="user-info">
          Welcome, {user.displayName || user.email}!
        </div>
      )}
    </header>
  );
};

export default Header;
```

### 2. Welcome Component Conversion

**Original:** `Welcome.js`
**Convert to:** `Welcome.tsx`

```typescript
import React from 'react';
import { User } from 'firebase/auth';
import './Welcome.css';

type ViewType = 'welcome' | 'quiz' | 'results' | 'herbs' | 'yoga';

interface WelcomeProps {
  onStartQuiz: () => void;
  onNavigate: (view: ViewType) => void;
  user?: User | null;
  onAuthClick?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ 
  onStartQuiz, 
  onNavigate, 
  user, 
  onAuthClick 
}) => {
  return (
    <div className="welcome-container">
      {/* Your existing welcome content */}
      
      {/* Feature cards with proper navigation */}
      <div className="features-grid">
        <div className="feature-card" onClick={() => onNavigate('herbs')}>
          <div className="feature-icon">🌿</div>
          <h4>Herbs Guide</h4>
          <p>Explore Ayurvedic herbs and their effects</p>
        </div>
        {/* Add other feature cards */}
      </div>
      
      <button className="start-quiz-btn" onClick={onStartQuiz}>
        Start Your Prakriti Analysis
      </button>
    </div>
  );
};

export default Welcome;
```

### 3. Quiz Component Conversion

**Original:** `Quiz.js`
**Convert to:** `Quiz.tsx`

```typescript
import React, { useState } from 'react';
import './Quiz.css';

interface QuizResults {
  vata: number;
  pitta: number;
  kapha: number;
  dominantDosha: 'vata' | 'pitta' | 'kapha';
  percentages: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

interface QuizProps {
  onComplete: (results: QuizResults) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  // Your existing quiz logic here
  
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const calculateResults = (): QuizResults => {
    // Your existing calculation logic
    return {
      vata: 0,
      pitta: 0,
      kapha: 0,
      dominantDosha: 'vata',
      percentages: { vata: 0, pitta: 0, kapha: 0 }
    };
  };
  
  return (
    <div className="quiz-container">
      {/* Your existing quiz UI */}
    </div>
  );
};

export default Quiz;
```

## Automated Conversion Script

Create this PowerShell script to help with conversion:

```powershell
# convert-components.ps1

# Navigate to components directory
cd "c:\Projects\vedaverse-frontend\src\components"

# Function to convert JS to TSX
function Convert-Component {
    param($ComponentName)
    
    if (Test-Path "$ComponentName.js") {
        # Copy JS to TSX
        Copy-Item "$ComponentName.js" "$ComponentName.tsx"
        
        # Add TypeScript imports at the top
        $content = Get-Content "$ComponentName.tsx"
        $newContent = @(
            "import React from 'react';",
            "// TODO: Add proper TypeScript interfaces",
            ""
        ) + $content
        
        $newContent | Set-Content "$ComponentName.tsx"
        
        Write-Host "Converted $ComponentName.js to $ComponentName.tsx"
    }
}

# Convert all components
$components = @("Header", "Welcome", "Quiz", "Results", "HerbsGuide", "YogaGuide", "Footer")

foreach ($component in $components) {
    Convert-Component $component
}

Write-Host "All components converted! Remember to:"
Write-Host "1. Add proper TypeScript interfaces"
Write-Host "2. Update import statements"
Write-Host "3. Add type annotations to functions"
Write-Host "4. Test each component"
```

## Manual Steps After Conversion

### 1. Update Import Statements
```typescript
// Change from:
import Header from './components/Header';

// To:
import Header from './components/Header';
// (TypeScript will automatically recognize .tsx files)
```

### 2. Add Type Annotations
```typescript
// Function parameters
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // ...
};

// State with types
const [loading, setLoading] = useState<boolean>(false);
const [user, setUser] = useState<User | null>(null);
```

### 3. Update Event Handlers
```typescript
// Button clicks
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};

// Input changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
```

### 4. CSS Modules (Optional)
If you want better TypeScript support for CSS:
```typescript
// Instead of: import './Component.css';
// Use: import styles from './Component.module.css';
```

## Testing After Conversion

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```

3. **Test each feature:**
   - Navigation between sections
   - Quiz functionality
   - Authentication
   - Responsive design

## Common Issues and Fixes

### Import Errors
```typescript
// If you get "Cannot find module" errors:
// Make sure file extensions are correct (.tsx, not .js)
// Check that all files are in the right directories
```

### Type Errors
```typescript
// Add explicit types for props:
interface Props {
  title: string;
  onClick: () => void;
}

const Component: React.FC<Props> = ({ title, onClick }) => {
  // ...
};
```

### CSS Import Issues
```typescript
// Make sure CSS files are imported:
import './Component.css';

// Or use CSS modules:
import styles from './Component.module.css';
```

This guide will help you convert your existing components step by step while maintaining all functionality!