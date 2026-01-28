import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoom({ src, alt, className }: ImageZoomProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPosition({ x, y });
  };

  return (
    <Dialog>
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden cursor-zoom-in group",
          className
        )}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            isZooming && "scale-150"
          )}
          style={isZooming ? {
            transformOrigin: `${position.x}% ${position.y}%`
          } : undefined}
        />
        
        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="h-4 w-4 text-foreground" />
        </div>

        {/* Fullscreen button */}
        <DialogTrigger asChild>
          <button 
            className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-transparent">
        <div className="relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
