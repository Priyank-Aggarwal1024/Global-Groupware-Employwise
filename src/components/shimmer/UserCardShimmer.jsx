const UserCardShimmer = () => {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 shadow-xl border border-slate-700/50">
      <div className="flex flex-col sm:hidden space-y-4 animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-slate-700"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-slate-700 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 w-32 bg-slate-700 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-2 bg-slate-800/50 rounded-lg">
              <div className="h-5 w-8 bg-slate-700 rounded mb-1 mx-auto"></div>
              <div className="h-3 w-12 bg-slate-700 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <div className="flex-1 h-8 bg-slate-700 rounded-lg"></div>
          <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between gap-4 animate-pulse">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-slate-700"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-700 rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="h-5 w-32 bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-40 bg-slate-700 rounded mb-2"></div>
            <div className="h-6 w-20 bg-slate-700 rounded-full"></div>
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center px-3">
              <div className="h-6 w-8 bg-slate-700 rounded mb-1 mx-auto"></div>
              <div className="h-3 w-12 bg-slate-700 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-24 h-10 bg-slate-700 rounded-lg"></div>
          <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default UserCardShimmer;
