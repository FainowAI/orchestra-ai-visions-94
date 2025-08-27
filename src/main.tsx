import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './hooks/use-theme'
import { mediaService } from './services/mediaService'

// Clear deleted carousel images cache on app startup
mediaService.clearDeletedImagesCache();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>
);
