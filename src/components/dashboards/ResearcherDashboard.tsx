import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileText, Database, Search, Filter, Calendar } from 'lucide-react';
import { allStations, timeSeriesData } from '@/data/mockData';
import { toast } from 'sonner';

export const ResearcherDashboard = () => {
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('2023-07-01');
  const [endDate, setEndDate] = useState('2024-01-01');
  const [exportFormat, setExportFormat] = useState('csv');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter stations based on search and status
  const filteredStations = allStations.filter(station => {
    const matchesSearch = station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || station.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).slice(0, 50); // Show first 50 for performance

  const handleStationToggle = (stationId: string) => {
    setSelectedStations(prev => 
      prev.includes(stationId) 
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId]
    );
  };

  const selectAllStations = () => {
    setSelectedStations(filteredStations.map(s => s.id));
  };

  const clearSelection = () => {
    setSelectedStations([]);
  };

  const handleExport = () => {
    const selectedData = allStations.filter(station => selectedStations.includes(station.id));
    
    if (selectedData.length === 0) {
      toast.error('Please select at least one station to export');
      return;
    }

    // Simulate file generation
    const fileName = `dwlr_data_${startDate}_to_${endDate}.${exportFormat}`;
    
    if (exportFormat === 'csv') {
      const csvContent = generateCSV(selectedData);
      downloadFile(csvContent, fileName, 'text/csv');
    } else if (exportFormat === 'json') {
      const jsonContent = JSON.stringify(selectedData, null, 2);
      downloadFile(jsonContent, fileName, 'application/json');
    } else if (exportFormat === 'excel') {
      // Simulate Excel export
      toast.success(`Excel export initiated for ${selectedData.length} stations`);
    }

    toast.success(`Exported ${selectedData.length} stations as ${exportFormat.toUpperCase()}`);
  };

  const generateCSV = (data: typeof allStations) => {
    const headers = ['Station_ID', 'Location', 'District', 'State', 'Water_Level_m', 'Status', 'Trend', 'Timestamp'];
    const rows = data.map(station => [
      station.id,
      station.location,
      station.district,
      station.state,
      station.waterLevel,
      station.status,
      station.trend,
      station.timestamp
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate statistics for selected stations
  const selectedData = allStations.filter(station => selectedStations.includes(station.id));
  const avgLevel = selectedData.length > 0 ? 
    (selectedData.reduce((sum, s) => sum + s.waterLevel, 0) / selectedData.length).toFixed(1) : '0';
  const stdDev = selectedData.length > 0 ? 
    Math.sqrt(selectedData.reduce((sum, s) => sum + Math.pow(s.waterLevel - parseFloat(avgLevel), 2), 0) / selectedData.length).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Data Export Controls */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Data Export Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleExport} 
                className="w-full bg-gradient-water hover:bg-primary-hover"
                disabled={selectedStations.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Station Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Station Selection</span>
              </span>
              <div className="flex items-center space-x-2 text-sm">
                <Button variant="outline" size="sm" onClick={selectAllStations}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter */}
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Station List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStations.map((station) => (
                <div key={station.id} className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedStations.includes(station.id)}
                    onCheckedChange={() => handleStationToggle(station.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{station.id}</span>
                      <Badge variant={
                        station.status === 'good' ? 'default' :
                        station.status === 'moderate' ? 'secondary' : 'destructive'
                      }>
                        {station.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {station.location}, {station.district}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {station.waterLevel}m
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {selectedStations.length} of {filteredStations.length} stations selected
            </div>
          </CardContent>
        </Card>

        {/* Research Tools */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Statistical Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{avgLevel}m</div>
                <div className="text-sm text-muted-foreground">Mean Level</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{stdDev}</div>
                <div className="text-sm text-muted-foreground">Std Deviation</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{selectedData.length}</div>
                <div className="text-sm text-muted-foreground">Stations</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {selectedData.filter(s => s.trend === 'up').length}
                </div>
                <div className="text-sm text-muted-foreground">Improving</div>
              </div>
            </div>

            {/* Quick Analysis Chart */}
            <div className="space-y-2">
              <Label>Quick Analysis - Trend Data</Label>
              <ResponsiveContainer width="100%" height={200}>
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
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};