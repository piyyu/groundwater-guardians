import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets, Users, FileBarChart } from 'lucide-react';
import { PolicyMakerDashboard } from './dashboards/PolicyMakerDashboard';
import { ResearcherDashboard } from './dashboards/ResearcherDashboard';
import { CommunityLeaderDashboard } from './dashboards/CommunityLeaderDashboard';
import { getStatistics } from '@/data/mockData';

export const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('policy');
  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-water rounded-lg">
                <Droplets className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Groundwater Guardians
                </h1>
                <p className="text-muted-foreground">India DWLR Network Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="animate-pulse-glow">
                {stats.onlineStations.toLocaleString()} Stations Online
              </Badge>
              <div className="h-2 w-2 bg-status-good rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-card shadow-card">
            <TabsTrigger 
              value="policy" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileBarChart className="h-4 w-4" />
              <span>Policy Maker</span>
            </TabsTrigger>
            <TabsTrigger 
              value="researcher" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Droplets className="h-4 w-4" />
              <span>Researcher</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4" />
              <span>Community Leader</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="policy" className="space-y-6">
            <PolicyMakerDashboard />
          </TabsContent>

          <TabsContent value="researcher" className="space-y-6">
            <ResearcherDashboard />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <CommunityLeaderDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};