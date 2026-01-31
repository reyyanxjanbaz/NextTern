# NextTern Mobile App

React Native mobile application for the NextTern talent discovery platform.

## Tech Stack

- **Framework**: React Native + Expo
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Icons**: Lucide React Native
- **State**: React hooks + AsyncStorage for persistence

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

```bash
cd mobile
npm install
```

### Running the App

```bash
npx expo start --clear
```

Then:
- Press `w` to open in web browser
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
mobile/
├── App.tsx                 # Main app entry, navigation
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Landing page
│   │   ├── LoginScreen.tsx     # Authentication
│   │   └── DashboardScreen.tsx # Main dashboard (Student/Recruiter)
│   ├── services/
│   │   └── api.ts              # API client with mock mode
│   └── contexts/
│       └── AuthContext.tsx     # Auth state management
├── tailwind.config.js      # Tailwind/NativeWind config
└── babel.config.js         # Babel config with NativeWind plugin
```

## Mock Mode

For testing without a backend server:

1. Open `src/services/api.ts`
2. Set `MOCK_MODE = true` (default)
3. Run the app

### Demo Login Shortcuts

| Input | Result |
|-------|--------|
| `student` | Instant login as Student |
| `recruiter` | Instant login as Recruiter |
| Any email | Shows "magic link sent" |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `eggshell` | `#FDFBF7` | Primary background |
| `deepBlue` | `#0F172A` | Primary text, buttons |
| `slateBlue` | `#334155` | Secondary text |
| `steelGray` | `#475569` | Muted text |

## API Connection

### For Android Emulator
The app automatically uses `10.0.2.2:3001` which maps to host machine's localhost.

### For iOS Simulator
The app uses `localhost:3001`.

### For Physical Device
Update `API_BASE_URL` in `src/services/api.ts` with your computer's local IP address:
```typescript
return 'http://192.168.1.XXX:3001/api/v1';
```

## Screens

### HomeScreen
- Landing page with branding
- "Find Internships" and "Find Talent" CTAs
- Feature highlights

### LoginScreen
- Email input with role selection (Student/Recruiter)
- Magic link flow (or demo login)
- Mock mode indicator

### DashboardScreen
- Role-aware UI (different for Student vs Recruiter)
- Quick action cards
- Stats overview
- Logout functionality

## Troubleshooting

### "Cannot find module 'babel-preset-expo'"
```bash
npm install --save-dev babel-preset-expo
```

### Styles not applying
```bash
npx expo start --clear
```

### Network request failed
- Ensure backend is running on port 3001
- Check API_BASE_URL matches your setup
- Or enable Mock Mode for testing

## License

MIT
