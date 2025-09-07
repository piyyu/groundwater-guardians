import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MapPin, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Droplets, 
  Waves, 
  Container, 
  TreePine,
  Star,
  Users,
  Target
} from 'lucide-react';
import { allStations, communityActivities } from '@/data/mockData';
import { toast } from 'sonner';

export const CommunityLeaderDashboard = () => {
  const [userCredits, setUserCredits] = useState(1850);
  const [userRank, setUserRank] = useState(12);
  const [completedProjects, setCompletedProjects] = useState(7);
  const [waterRecharged, setWaterRecharged] = useState(2400); // in liters

  // Get nearby stations (simulating geolocation)
  const nearbyStations = allStations.slice(0, 5);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'droplets': return Droplets;
      case 'waves': return Waves;
      case 'container': return Container;
      case 'tree-pine': return TreePine;
      default: return Target;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Minus;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-status-good';
      case 'moderate': return 'text-status-moderate';
      case 'critical': return 'text-status-critical';
      default: return 'text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'bg-status-good text-status-good-foreground';
      case 'Medium': return 'bg-status-moderate text-status-moderate-foreground';
      case 'High': return 'bg-status-critical text-status-critical-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-primary text-primary-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'Low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleStartProject = (activity: typeof communityActivities[0]) => {
    toast.success(`Started project: ${activity.title}`, {
      description: `You'll earn ${activity.credits} credits upon completion.`
    });
  };

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-water text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Current Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCredits.toLocaleString()}</div>
            <p className="text-xs opacity-75 mt-1">Available for rewards</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">District Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">#{userRank}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Out of 156 leaders</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-2xl font-bold text-foreground">{completedProjects}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Water Recharged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-foreground">{waterRecharged.toLocaleString()}L</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Nearby Stations and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Nearby DWLR Stations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nearbyStations.map((station) => {
              const TrendIcon = getTrendIcon(station.trend);
              return (
                <div key={station.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{station.location}</span>
                      <Badge variant="outline" className="text-xs">
                        {Math.random() * 5 + 1 | 0} km
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{station.district}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getStatusColor(station.status)}`}>
                      {station.waterLevel}m
                    </div>
                    <div className="flex items-center justify-end space-x-1">
                      <TrendIcon className={`h-3 w-3 ${getStatusColor(station.status)}`} />
                      <span className={`text-xs ${getStatusColor(station.status)}`}>
                        {station.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Progress Tracking */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Community Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>District Goal Progress</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">15,600 / 20,000 liters recharged this month</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your Contribution</span>
                <span>15%</span>
              </div>
              <Progress value={15} className="h-2" />
              <p className="text-xs text-muted-foreground">2,400 liters contributed</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-foreground">43</div>
                <div className="text-xs text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-foreground">28</div>
                <div className="text-xs text-muted-foreground">Projects Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Recommended Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityActivities.map((activity) => {
              const IconComponent = getIcon(activity.icon);
              return (
                <div key={activity.id} className="border rounded-lg p-4 hover:shadow-status transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(activity.difficulty)}>
                        {activity.difficulty}
                      </Badge>
                      <Badge className={getImpactColor(activity.impact)}>
                        {activity.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{activity.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-medium text-primary">{activity.credits} credits</span>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-gradient-water hover:bg-primary-hover">
                          Start Project
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2">
                            <IconComponent className="h-5 w-5" />
                            <span>{activity.title}</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{activity.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <div className="text-sm text-muted-foreground">Credits Reward</div>
                              <div className="text-lg font-bold text-primary">{activity.credits}</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <div className="text-sm text-muted-foreground">Difficulty</div>
                              <div className="text-lg font-bold">{activity.difficulty}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium">Project Requirements:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Community coordination and planning</li>
                              <li>• Local authority permissions</li>
                              <li>• Progress documentation and reporting</li>
                              <li>• Impact measurement and verification</li>
                            </ul>
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-water hover:bg-primary-hover"
                            onClick={() => handleStartProject(activity)}
                          >
                            Confirm and Start Project
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};