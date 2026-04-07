function EmergencyButton() {
  const handleClick = () => {
    window.alert('Emergency triggered');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(225,29,72,0.35)] transition duration-300 hover:scale-[1.03] hover:from-red-500 hover:to-rose-400 focus:outline-none focus:ring-4 focus:ring-red-200"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      Emergency
    </button>
  );
}

export default EmergencyButton;
