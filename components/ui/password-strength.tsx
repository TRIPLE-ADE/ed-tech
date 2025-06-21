"use client";
import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
}

const passwordCriteria: PasswordCriteria[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Contains uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'Contains number', test: (p) => /\d/.test(p) },
  { label: 'Contains special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ 
  password, 
  className 
}) => {
  const passedCriteria = passwordCriteria.filter(criteria => criteria.test(password));
  const strength = passedCriteria.length;
  
  const getStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Password strength
          </span>
          <span className={cn(
            "text-sm font-medium",
            strength < 2 && "text-red-500",
            strength >= 2 && strength < 4 && "text-yellow-500",
            strength >= 4 && "text-green-500"
          )}>
            {getStrengthText(strength)}
          </span>
        </div>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-2 flex-1 rounded-full transition-all duration-300",
                index < strength 
                  ? getStrengthColor(strength)
                  : "bg-slate-200 dark:bg-slate-700"
              )}
            />
          ))}
        </div>
      </div>

      {/* Criteria List */}
      <div className="space-y-1">
        {passwordCriteria.map((criteria, index) => {
          const passed = criteria.test(password);
          return (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 text-sm transition-colors",
                passed 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {passed ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
              <span>{criteria.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};