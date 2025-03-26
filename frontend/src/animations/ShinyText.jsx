export const ShinyText = ({
  children,
  className = "",
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span className={`relative inline-block ${className}`} {...props}>
      <span className="text-paleHoney">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-transparent bg-clip-text pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(120deg, transparent, #FFF5E1, transparent)`,
          backgroundSize: `${shimmerWidth}px 100%`,
          animation: 'shiny-text 3s linear infinite',
          mixBlendMode: 'screen',
        }}
      >
        {children}
      </span>
    </span>
  );
};
