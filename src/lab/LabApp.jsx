'use client';

import { SoundProvider } from './sound/SoundProvider';
import App from './App';

// No <StrictMode>: its dev-only double mount makes GradientASCII lose its WebGL
// context on the first cleanup (it calls loseContext()), leaving the hero blank.
export default function LabApp() {
  return (
    <SoundProvider>
      <App />
    </SoundProvider>
  );
}
