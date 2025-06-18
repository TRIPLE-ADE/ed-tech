const GradientBackground = () => (
  <div className="absolute inset-0 -z-10">
    {/* Light mode gradients */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:hidden" />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse dark:hidden" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse dark:hidden" style={{ animationDelay: '2s' }} />
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-pulse dark:hidden" style={{ animationDelay: '4s' }} />

    {/* Dark mode gradients */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 hidden dark:block" />
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl animate-pulse hidden dark:block" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/40 rounded-full blur-3xl animate-pulse hidden dark:block" style={{ animationDelay: '2s' }} />
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-900/30 rounded-full blur-3xl animate-pulse hidden dark:block" style={{ animationDelay: '4s' }} />
  </div>
);

export default GradientBackground;