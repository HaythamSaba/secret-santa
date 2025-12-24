const Button = ({
  content,
  onClick,
  disabled,
  className,
  size = "medium",
  variant = "primary",
}) => {
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm rounded-lg",
    medium: "px-4 py-2 text-base rounded-xl",
    large: "px-6 py-3 text-lg rounded-xl",
  };

  const variantClasses = {
    primary: "bg-neutral-700 hover:bg-neutral-800 text-neutral-50",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-accent-600 hover:bg-accent-700 text-white",
    outline:
      "border-2 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-50",
  };

  return (
    <button
      className={`
        ${className}
        outline-none focus-none cursor-pointer transition-all
        disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:text-neutral-600
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
