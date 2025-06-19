import { AuthLayout, SignUpForm } from "@/features/auth/components";

export default function SignUpPage() {
  return (
    <AuthLayout
      title='Create your account'
      subtitle='Start your AI-powered learning journey with ThryX'
    >
      <SignUpForm />
    </AuthLayout>
  );
}
