const IconButton = ({ icon: Icon, onClick, label, badge }) => (
  <button
    className="flex items-center space-x-1 cursor-pointer"
    onClick={onClick}
    aria-label={label}
  >
    <div className="relative p-2 group">
      <span className="absolute inset-0 bg-gray-100 rounded-full scale-0 transition-transform group-hover:scale-100" />
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-violet-600 relative z-10 transition-colors" />
      {badge && (
        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs font-medium flex items-center justify-center bg-violet-600 text-white rounded-full z-10">
          {badge}
        </div>
      )}
    </div>
    <span className="text-sm font-medium text-gray-700">
      {label}
    </span>
  </button>
);

export default IconButton;