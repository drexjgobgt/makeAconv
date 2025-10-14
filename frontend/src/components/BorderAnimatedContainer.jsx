function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full min-h-0 rounded-2xl border border-transparent animate-border flex flex-col md:flex-row overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
