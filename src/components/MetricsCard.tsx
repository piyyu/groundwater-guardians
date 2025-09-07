import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  variant?: 'default' | 'good' | 'moderate' | 'critical';
  className?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: MetricsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'good':
        return 'border-status-good/20 bg-status-good/5';
      case 'moderate':
        return 'border-status-moderate/20 bg-status-moderate/5';
      case 'critical':
        return 'border-status-critical/20 bg-status-critical/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'good':
        return 'text-status-good bg-status-good/10';
      case 'moderate':
        return 'text-status-moderate bg-status-moderate/10';
      case 'critical':
        return 'text-status-critical bg-status-critical/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      case 'stable':
        return '→';
    }
  };

  return (
    <Card className={cn(
      'shadow-card hover:shadow-status transition-all duration-200',
      getVariantStyles(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('p-2 rounded-lg', getIconStyles())}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {trend && (
            <div className="text-right">
              <span className="text-lg">{getTrendIcon()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};