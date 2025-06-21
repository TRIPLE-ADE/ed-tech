"use client";
import React from "react";
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
  PasswordStrength,
} from "@/components/ui";
import { GoogleOAuthButton } from "./google-auth-buttton";

import { useAuth } from "@/contexts/auth-context";
import { signUpSchema, type SignUpFormData } from "../validations";

export function SignUpForm() {
  const { register: registerUser, googleOAuth, loadingMap } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
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
    try {
      const fullName = `${data.firstName} ${data.lastName}`;
      await registerUser(data.email, data.password, fullName);
      toast.success("Account created successfully! Welcome to ThryX AI.");
      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Sign-up failed. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    await googleOAuth();
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
          disabled={loadingMap.register || loadingMap.googleOAuth}
        >
          {loadingMap.register ? (
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

      <GoogleOAuthButton
        onClick={handleGoogleSignUp}
        loading={loadingMap.googleOAuth}
        disabled={loadingMap.login}
        className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
      />

      <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
        Already have an account?{" "}
        <Link
          href='/auth/signin'
          className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
        >
          Sign in
        </Link>
      </p>
    </>
  );
}
