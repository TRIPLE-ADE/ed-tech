"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button, Separator, Checkbox, CustomInput } from "@/components/ui";
import { GoogleOAuthButton } from "./google-auth-buttton";

import { useAuth } from "@/contexts/auth-context";
import { signInSchema, type SignInFormData } from "../validations";

export function SignInForm() {
  const { login, googleOAuth, loadingMap } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back! Successfully signed in.");
      router.replace("/dashboard");
    } catch (error: any) {
        toast.error(error.message || "Sign-in failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    await googleOAuth();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <CustomInput
          {...register("email")}
          id='email'
          type='email'
          label='Email address'
          placeholder='Enter your email'
          icon={Mail}
          error={errors.email?.message}
        />

        <CustomInput
          {...register("password")}
          id='password'
          type='password'
          label='Password'
          placeholder='Enter your password'
          icon={Lock}
          showPasswordToggle
          error={errors.password?.message}
        />

        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='rememberMe'
              {...register("rememberMe")}
              className='rounded border-slate-300 dark:border-slate-600'
            />
            <label
              htmlFor='rememberMe'
              className='text-sm text-slate-600 dark:text-slate-400 cursor-pointer'
            >
              Remember me
            </label>
          </div>
          <Link
            href='/auth/forgot-password'
            className='text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type='submit'
          className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200'
          disabled={loadingMap.login || loadingMap.googleOAuth}
        >
          {loadingMap.login ? (
            <div className='flex items-center'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
              Signing in...
            </div>
          ) : (
            "Sign in"
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
        onClick={handleGoogleSignIn}
        loading={loadingMap.googleOAuth}
        disabled={loadingMap.login}
        className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
      />

      <p className='text-center text-sm text-slate-600 dark:text-slate-400'>
        Don't have an account?{" "}
        <Link
          href='/auth/signup'
          className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium'
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
