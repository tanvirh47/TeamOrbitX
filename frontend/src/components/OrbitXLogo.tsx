import orbitXLogo from 'figma:asset/a4c51ec688a9b8c26a4baf17fec0fe242bba250a.png';

interface OrbitXLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export function OrbitXLogo({ className = "", size = 'md', showText = true, onClick }: OrbitXLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div 
      className={`flex items-center space-x-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <img 
        src={orbitXLogo} 
        alt="OrbitX Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold text-white`}>
            Orbit<span className="text-orange-500">X</span>
          </span>
        </div>
      )}
    </div>
  );
}