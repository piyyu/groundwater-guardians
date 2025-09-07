import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WaterLevelVisualizationProps {
  level: number;
  maxLevel?: number;
  stationId?: string;
  className?: string;
}

export const WaterLevelVisualization = ({ 
  level, 
  maxLevel = 25, 
  stationId,
  className 
}: WaterLevelVisualizationProps) => {
  const percentage = (level / maxLevel) * 100;
  
  const getStatusColor = () => {
    if (level > 15) return 'bg-status-good';
    if (level > 10) return 'bg-status-moderate';
    return 'bg-status-critical';
  };

  return (
    <Card className={cn('shadow-card', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>3D Water Level</span>
          {stationId && (
            <span className="text-sm text-muted-foreground font-normal">
              {stationId}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 3D Well Visualization */}
        <div className="relative mx-auto w-32 h-48 bg-gradient-to-b from-muted/30 to-muted/60 rounded-lg border-2 border-border shadow-inner">
          {/* Well walls */}
          <div className="absolute inset-0 bg-gradient-to-r from-muted/20 via-transparent to-muted/20 rounded-lg"></div>
          
          {/* Water fill */}
          <div 
            className={cn(
              'absolute bottom-0 left-0 right-0 rounded-b-lg transition-all duration-1000 ease-out',
              getStatusColor(),
              'animate-water-fill opacity-90'
            )}
            style={{ height: `${percentage}%` }}
          >
            {/* Water surface ripples */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 animate-ripple"></div>
          </div>
          
          {/* Measurement markers */}
          <div className="absolute -right-8 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
            <span>{maxLevel}m</span>
            <span>{Math.round(maxLevel * 0.75)}m</span>
            <span>{Math.round(maxLevel * 0.5)}m</span>
            <span>{Math.round(maxLevel * 0.25)}m</span>
            <span>0m</span>
          </div>
          
          {/* Current level indicator */}
          <div 
            className="absolute right-0 w-6 h-0.5 bg-foreground z-10 transition-all duration-1000"
            style={{ bottom: `${percentage}%` }}
          >
            <div className="absolute left-6 -top-2 text-xs font-medium text-foreground whitespace-nowrap">
              {level}m
            </div>
          </div>
        </div>
        
        {/* Level Display */}
        <div className="text-center space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {level}m
          </div>
          <div className="text-sm text-muted-foreground">
            Current Water Level
          </div>
          <div className={cn(
            'inline-flex px-3 py-1 rounded-full text-xs font-medium',
            level > 15 ? 'bg-status-good text-status-good-foreground' :
            level > 10 ? 'bg-status-moderate text-status-moderate-foreground' :
            'bg-status-critical text-status-critical-foreground'
          )}>
            {level > 15 ? 'Good' : level > 10 ? 'Moderate' : 'Critical'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};