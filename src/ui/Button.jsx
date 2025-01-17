function Button({ children, onClick, className, disabled }) {
  return (
    <div>
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
}

export default Button;
