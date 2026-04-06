function EmergencyButton() {
  const handleClick = () => {
    window.alert('Emergency triggered');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-200"
    >
      Emergency
    </button>
  );
}

export default EmergencyButton;
