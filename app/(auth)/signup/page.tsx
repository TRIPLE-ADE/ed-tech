"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Brain,
  ArrowLeft,
  Mail,
  Lock,
  User,
  CheckCircle,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Checkbox,
  Separator,
} from "@/components/ui";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    // Handle sign up logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Back to home */}
        <Link
          href='/'
          className='inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to home
        </Link>

        <Card className='border-slate-200 dark:border-slate-700 shadow-xl'>
          <CardHeader className='text-center pb-6'>
            <div className='flex items-center justify-center mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center'>
                <Brain className='w-7 h-7 text-white' />
              </div>
            </div>
            <CardTitle className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
              Create your account
            </CardTitle>
            <p className='text-slate-600 dark:text-slate-400'>
              Start your AI-powered learning journey
            </p>
          </CardHeader>

          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='firstName'
                    className='text-slate-700 dark:text-slate-300'
                  >
                    First name
                  </Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                    <Input
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='John'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='pl-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='lastName'
                    className='text-slate-700 dark:text-slate-300'
                  >
                    Last name
                  </Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    type='text'
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className='border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-slate-700 dark:text-slate-300'
                >
                  Email address
                </Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='john@example.com'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='pl-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='password'
                  className='text-slate-700 dark:text-slate-300'
                >
                  Password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? "text" : "password"}
                    placeholder='Create a strong password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='pl-10 pr-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  >
                    {showPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <div className='flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                            passwordStrength(formData.password)
                          )}`}
                          style={{
                            width: `${
                              (passwordStrength(formData.password) / 5) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <span className='text-xs text-slate-600 dark:text-slate-400'>
                        {getStrengthText(passwordStrength(formData.password))}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className='space-y-2'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-slate-700 dark:text-slate-300'
                >
                  Confirm password
                </Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Confirm your password'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className='pl-10 pr-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
                {formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <p className='text-sm text-red-500'>
                      Passwords do not match
                    </p>
                  )}
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <div className='flex items-center text-sm text-green-600'>
                      <CheckCircle className='w-4 h-4 mr-1' />
                      Passwords match
                    </div>
                  )}
              </div>

              <div className='flex items-start space-x-2'>
                <Checkbox
                  id='terms'
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeToTerms: checked as boolean,
                    }))
                  }
                  className='mt-1'
                />
                <Label
                  htmlFor='terms'
                  className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed'
                >
                  I agree to the{" "}
                  <Link
                    href='/terms'
                    className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href='/privacy'
                    className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type='submit'
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
                disabled={
                  isLoading ||
                  !formData.agreeToTerms ||
                  formData.password !== formData.confirmPassword
                }
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className='relative'>
              <Separator className='bg-slate-200 dark:bg-slate-700' />
              <span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 px-2 text-sm text-slate-500 dark:text-slate-400'>
                Or continue with
              </span>
            </div>

            <div className='grid'>
              <Button
                variant='outline'
                className='border-slate-300 dark:border-slate-600'
              >
                <svg className='w-4 h-4 mr-2' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Google
              </Button>
            </div>

            <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
              Already have an account?{" "}
              <Link
                href='/auth/signin'
                className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
