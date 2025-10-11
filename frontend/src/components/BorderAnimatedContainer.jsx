function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full min-h-[80vh] rounded-2xl border border-transparent animate-border flex overflow-hidden flex-col md:flex-row">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
