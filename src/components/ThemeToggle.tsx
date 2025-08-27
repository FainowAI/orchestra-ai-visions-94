import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  variant?: 'default' | 'white';
}

export function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const getButtonStyles = () => {
    if (variant === 'white') {
      return 'hover:bg-accent/10 transition-colors duration-200';
    }
    return 'hover:bg-accent/10 transition-colors duration-200';
  };

  const getIconStyles = () => {
    if (variant === 'white') {
      return 'text-white hover:text-white/80 dark:text-white dark:hover:text-white/80';
    }
    return 'text-foreground/70 hover:text-primary';
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`w-9 h-9 ${getButtonStyles()}`}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${getIconStyles()}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${getIconStyles()}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}