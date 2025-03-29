const ViewProfileShimmer = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="h-8 w-24 bg-slate-800 rounded mb-6"></div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 shadow-xl border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-slate-700"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-slate-700 rounded-full"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="h-8 w-64 bg-slate-700 rounded mb-2"></div>
              <div className="h-4 w-48 bg-slate-700 rounded mb-4"></div>
              <div className="h-8 w-32 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4">
              <div className="h-6 w-16 bg-slate-700 rounded mb-2 mx-auto"></div>
              <div className="h-4 w-20 bg-slate-700 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <div className="h-6 w-24 bg-slate-700 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 w-20 bg-slate-700 rounded mb-1"></div>
                <div className="h-4 w-48 bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileShimmer;
