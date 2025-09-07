import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, AlertTriangle, MapPin, TrendingUp, FileText } from 'lucide-react';
import { MetricsCard } from '../MetricsCard';
import { WaterLevelVisualization } from '../WaterLevelVisualization';
import { InteractiveMap } from '../InteractiveMap';
import { Button } from '@/components/ui/button';
import { getStatistics, timeSeriesData, stateWiseData } from '@/data/mockData';

export const PolicyMakerDashboard = () => {
  const stats = getStatistics();

  // Status distribution data
  const statusData = [
    { name: 'Good', value: stats.onlineStations - stats.criticalZones - Math.floor(stats.onlineStations * 0.3), color: 'hsl(var(--status-good))' },
    { name: 'Moderate', value: Math.floor(stats.onlineStations * 0.3), color: 'hsl(var(--status-moderate))' },
    { name: 'Critical', value: stats.criticalZones, color: 'hsl(var(--status-critical))' }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Stations Online"
          value={stats.onlineStations}
          subtitle="DWLR Network"
          icon={Activity}
          trend="up"
          variant="good"
        />
        <MetricsCard
          title="Critical Zones"
          value={stats.criticalZones}
          subtitle="Below Threshold"
          icon={AlertTriangle}
          trend="down"
          variant="critical"
        />
        <MetricsCard
          title="Average Water Level"
          value={`${stats.averageWaterLevel}m`}
          subtitle="National Average"
          icon={TrendingUp}
          trend="stable"
          variant="moderate"
        />
        <MetricsCard
          title="States Monitored"
          value={stats.statesMonitored}
          subtitle="Across India"
          icon={MapPin}
          trend="stable"
          variant="good"
        />
      </div>

      {/* Map and 3D Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Interactive DWLR Station Map</span>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-status-good rounded-full"></div>
                    <span>Good (&gt;15m)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-status-moderate rounded-full"></div>
                    <span>Moderate (10-15m)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-status-critical rounded-full"></div>
                    <span>Critical (&lt;10m)</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveMap />
            </CardContent>
          </Card>
        </div>
        <div>
          <WaterLevelVisualization 
            level={stats.averageWaterLevel} 
            stationId="National Average"
          />
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Water Level Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="level" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Station Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* State-wise Comparison */}
      <Card className="shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>State-wise Water Level Comparison</CardTitle>
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stateWiseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="state" 
                stroke="hsl(var(--muted-foreground))"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar 
                dataKey="level" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};