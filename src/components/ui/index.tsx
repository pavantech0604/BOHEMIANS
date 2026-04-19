import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'surface' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "font-headline font-black uppercase tracking-tight transition-all duration-300 hover:scale-102 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:shadow-primary/30",
    secondary: "bg-secondary-container text-on-secondary-container",
    surface: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
    ghost: "bg-transparent text-primary hover:bg-primary/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-[10px] rounded-full",
    md: "px-6 py-2.5 text-xs rounded-full",
    lg: "px-8 py-4 text-sm rounded-full",
    xl: "px-10 py-5 text-lg rounded-full",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', variant = 'low' }: { children: React.ReactNode, className?: string, variant?: 'lowest' | 'low' | 'high' | 'highest' }) => {
  const variants = {
    lowest: "bg-surface-container-lowest",
    low: "bg-surface-container-low",
    high: "bg-surface-container-high",
    highest: "bg-surface-container-highest",
  };

  return (
    <div className={`rounded-lg overflow-hidden transition-colors duration-300 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const Badge = ({ children, className = '', variant = 'primary' }: { children: React.ReactNode, className?: string, variant?: 'primary' | 'secondary' | 'tertiary' }) => {
  const variants = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-surface-container-highest text-secondary",
  };

  // Organic shape rule: asymmetrical rounded corners
  return (
    <span className={`rounded-tl-2xl rounded-br-2xl px-4 py-1.5 font-headline text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
