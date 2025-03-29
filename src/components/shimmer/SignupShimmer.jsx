const SignupShimmer = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-md animate-pulse">
        <div className="bg-white/10 rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-8 w-56 bg-white/20 rounded-lg mb-2"></div>
            <div className="h-4 w-64 bg-white/20 rounded"></div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-20 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded-lg"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-32 bg-white/20 rounded"></div>
              <div className="h-12 bg-white/20 rounded-lg"></div>
            </div>

            <div className="h-12 bg-white/20 rounded-lg mt-6"></div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="h-4 w-48 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupShimmer;
