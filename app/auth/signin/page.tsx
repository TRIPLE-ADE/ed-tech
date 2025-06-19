import { AuthLayout, SignInForm } from "@/features/auth/components";

export default function SignInPage() {
  return (
    <AuthLayout
      title='Welcome back'
      subtitle='Sign in to your ThryX AI account'
    >
      <SignInForm />
    </AuthLayout>
  );
}
