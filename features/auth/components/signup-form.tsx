"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import {
  Button,
  Separator,
  Checkbox,
  CustomInput,
   PasswordStrength
} from "@/components/ui";

import { useAuth } from "../contexts/auth-context";
import { signUpSchema, type SignUpFormData } from "../validations";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser, googleOAuth } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setError,
    control,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");

  const onSubmit = async (data: SignUpFormData) => {
    console.log("Form submitted with data:", data);
    try {
      setIsLoading(true);
      const fullName = `${data.firstName} ${data.lastName}`;

      await registerUser(data.email, data.password, fullName);

      toast.success("Account created successfully! Welcome to ThryX AI.");
      router.push("/dashboard"); // Redirect to dashboard or onboarding
    } catch (error: any) {
      console.error("Sign up error:", error);

      // Handle specific error types
      if (error.message.includes("email")) {
        setError("email", {
          message: "An account with this email already exists",
        });
      } else if (error.message.includes("password")) {
        setError("password", {
          message: "Password does not meet requirements",
        });
      } else {
        toast.error(
          error.message || "Failed to create account. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

   const handleGoogleSignUp = async () => {
      try {
        setIsGoogleLoading(true);
        await googleOAuth();
        // The OAuth flow will redirect to success/failure pages
      } catch (error: any) {
        console.error("Google sign-in error:", error);
        toast.error(error.message || "Google sign-in failed. Please try again.");
        setIsGoogleLoading(false);
      }
    };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <CustomInput
            {...register("firstName")}
            id='firstName'
            type='text'
            label='First name'
            placeholder='John'
            icon={User}
            error={errors.firstName?.message}
          />

          <CustomInput
            {...register("lastName")}
            id='lastName'
            type='text'
            label='Last name'
            placeholder='Doe'
            error={errors.lastName?.message}
          />
        </div>

        <CustomInput
          {...register("email")}
          id='email'
          type='email'
          label='Email address'
          placeholder='john@example.com'
          icon={Mail}
          error={errors.email?.message}
        />

        <div className='space-y-2'>
          <CustomInput
            {...register("password")}
            id='password'
            type='password'
            label='Password'
            placeholder='Create a strong password'
            icon={Lock}
            showPasswordToggle
            error={errors.password?.message}
          />

          {watchedPassword && (
            <PasswordStrength password={watchedPassword} className='mt-3' />
          )}
        </div>

        <div className='space-y-2'>
          <CustomInput
            {...register("confirmPassword")}
            id='confirmPassword'
            type='password'
            label='Confirm password'
            placeholder='Confirm your password'
            icon={Lock}
            showPasswordToggle
            error={errors.confirmPassword?.message}
          />

          {watchedConfirmPassword &&
            watchedPassword &&
            watchedPassword === watchedConfirmPassword && (
              <div className='flex items-center text-sm text-green-600 dark:text-green-400'>
                <CheckCircle className='w-4 h-4 mr-1' />
                Passwords match
              </div>
            )}
        </div>

        <div className='flex items-start space-x-2'>
          <Controller
            name='agreeToTerms'
            control={control}
            render={({ field }) => (
              <Checkbox
                id='agreeToTerms'
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) clearErrors("agreeToTerms");
                }}
                className='mt-1'
              />
            )}
          />
          <div className='space-y-1'>
            <label
              htmlFor='agreeToTerms'
              className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer'
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
            </label>
            {errors.agreeToTerms && (
              <p className='text-sm text-red-500'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
          disabled={isLoading}
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

      <Button
        variant='outline'
        className='w-full border-slate-300 dark:border-slate-600'
        onClick={handleGoogleSignUp}
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

      <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
        Already have an account?{" "}
        <Link
          href='/signin'
          className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
