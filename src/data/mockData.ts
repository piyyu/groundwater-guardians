// Mock data for DWLR stations and time series data
export interface DWLRStation {
  id: string;
  lat: number;
  lng: number;
  location: string;
  waterLevel: number;
  status: 'good' | 'moderate' | 'critical';
  trend: 'up' | 'down' | 'stable';
  district: string;
  state: string;
  timestamp: string;
}

export interface TimeSeriesData {
  month: string;
  level: number;
  station: string;
}

export interface ActivityData {
  id: string;
  title: string;
  description: string;
  credits: number;
  difficulty: 'Low' | 'Medium' | 'High';
  impact: 'High' | 'Medium' | 'Low';
  icon: string;
}

// Generate mock DWLR stations across India
export const mockStations: DWLRStation[] = [
  // Delhi Region
  { id: 'DWLR001', lat: 28.6139, lng: 77.2090, location: 'Delhi Central', waterLevel: 15.2, status: 'good', trend: 'up', district: 'New Delhi', state: 'Delhi', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR002', lat: 28.7041, lng: 77.1025, location: 'Delhi North', waterLevel: 8.3, status: 'critical', trend: 'down', district: 'North Delhi', state: 'Delhi', timestamp: '2024-01-15T10:30:00Z' },
  
  // Mumbai Region
  { id: 'DWLR003', lat: 19.0760, lng: 72.8777, location: 'Mumbai Central', waterLevel: 12.1, status: 'moderate', trend: 'stable', district: 'Mumbai', state: 'Maharashtra', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR004', lat: 19.1176, lng: 72.9060, location: 'Mumbai Suburban', waterLevel: 18.7, status: 'good', trend: 'up', district: 'Mumbai Suburban', state: 'Maharashtra', timestamp: '2024-01-15T10:30:00Z' },
  
  // Bangalore Region
  { id: 'DWLR005', lat: 12.9716, lng: 77.5946, location: 'Bangalore Central', waterLevel: 6.8, status: 'critical', trend: 'down', district: 'Bangalore Urban', state: 'Karnataka', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR006', lat: 12.9698, lng: 77.7500, location: 'Bangalore East', waterLevel: 11.2, status: 'moderate', trend: 'stable', district: 'Bangalore Urban', state: 'Karnataka', timestamp: '2024-01-15T10:30:00Z' },
  
  // Chennai Region
  { id: 'DWLR007', lat: 13.0827, lng: 80.2707, location: 'Chennai Central', waterLevel: 14.5, status: 'moderate', trend: 'up', district: 'Chennai', state: 'Tamil Nadu', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR008', lat: 13.0674, lng: 80.2376, location: 'Chennai South', waterLevel: 16.8, status: 'good', trend: 'up', district: 'Chennai', state: 'Tamil Nadu', timestamp: '2024-01-15T10:30:00Z' },
  
  // Kolkata Region
  { id: 'DWLR009', lat: 22.5726, lng: 88.3639, location: 'Kolkata Central', waterLevel: 9.2, status: 'critical', trend: 'down', district: 'Kolkata', state: 'West Bengal', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR010', lat: 22.5675, lng: 88.3918, location: 'Kolkata East', waterLevel: 13.4, status: 'moderate', trend: 'stable', district: 'Kolkata', state: 'West Bengal', timestamp: '2024-01-15T10:30:00Z' },
  
  // Hyderabad Region
  { id: 'DWLR011', lat: 17.3850, lng: 78.4867, location: 'Hyderabad Central', waterLevel: 10.7, status: 'moderate', trend: 'down', district: 'Hyderabad', state: 'Telangana', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR012', lat: 17.4435, lng: 78.3772, location: 'Hyderabad North', waterLevel: 17.2, status: 'good', trend: 'up', district: 'Hyderabad', state: 'Telangana', timestamp: '2024-01-15T10:30:00Z' },
  
  // Pune Region
  { id: 'DWLR013', lat: 18.5204, lng: 73.8567, location: 'Pune Central', waterLevel: 11.8, status: 'moderate', trend: 'stable', district: 'Pune', state: 'Maharashtra', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR014', lat: 18.5679, lng: 73.9143, location: 'Pune East', waterLevel: 19.3, status: 'good', trend: 'up', district: 'Pune', state: 'Maharashtra', timestamp: '2024-01-15T10:30:00Z' },
  
  // Ahmedabad Region
  { id: 'DWLR015', lat: 23.0225, lng: 72.5714, location: 'Ahmedabad Central', waterLevel: 7.4, status: 'critical', trend: 'down', district: 'Ahmedabad', state: 'Gujarat', timestamp: '2024-01-15T10:30:00Z' },
  { id: 'DWLR016', lat: 23.0395, lng: 72.6066, location: 'Ahmedabad North', waterLevel: 14.1, status: 'moderate', trend: 'up', district: 'Ahmedabad', state: 'Gujarat', timestamp: '2024-01-15T10:30:00Z' },
];

// Generate additional stations to simulate 5,260 total
export const generateMockStations = (count: number = 5260): DWLRStation[] => {
  const baseStations = [...mockStations];
  const additionalStations: DWLRStation[] = [];
  
  for (let i = baseStations.length; i < count; i++) {
    const baseStation = baseStations[i % baseStations.length];
    const waterLevel = Math.random() * 25; // 0-25 meters
    let status: 'good' | 'moderate' | 'critical';
    
    if (waterLevel > 15) status = 'good';
    else if (waterLevel > 10) status = 'moderate';
    else status = 'critical';
    
    const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
    const trend = trends[Math.floor(Math.random() * trends.length)];
    
    additionalStations.push({
      ...baseStation,
      id: `DWLR${String(i + 1).padStart(3, '0')}`,
      lat: baseStation.lat + (Math.random() - 0.5) * 2, // Add some random variance
      lng: baseStation.lng + (Math.random() - 0.5) * 2,
      location: `${baseStation.location} ${Math.floor(Math.random() * 100)}`,
      waterLevel: parseFloat(waterLevel.toFixed(1)),
      status,
      trend,
      timestamp: new Date().toISOString(),
    });
  }
  
  return [...baseStations, ...additionalStations];
};

export const allStations = generateMockStations();

// Time series data for charts
export const timeSeriesData: TimeSeriesData[] = [
  { month: 'Jul', level: 12.5, station: 'DWLR001' },
  { month: 'Aug', level: 11.8, station: 'DWLR001' },
  { month: 'Sep', level: 13.2, station: 'DWLR001' },
  { month: 'Oct', level: 14.1, station: 'DWLR001' },
  { month: 'Nov', level: 14.8, station: 'DWLR001' },
  { month: 'Dec', level: 15.2, station: 'DWLR001' },
];

// State-wise data for bar charts
export const stateWiseData = [
  { state: 'Maharashtra', level: 14.2, stations: 856 },
  { state: 'Gujarat', level: 11.8, stations: 672 },
  { state: 'Karnataka', level: 10.5, stations: 543 },
  { state: 'Tamil Nadu', level: 13.7, stations: 489 },
  { state: 'Telangana', level: 12.3, stations: 398 },
  { state: 'West Bengal', level: 15.1, stations: 367 },
  { state: 'Delhi', level: 11.8, stations: 89 }
];

// Community activities data
export const communityActivities: ActivityData[] = [
  {
    id: 'ACT001',
    title: 'Rainwater Harvesting Installation',
    description: 'Install rooftop rainwater harvesting system in residential areas',
    credits: 500,
    difficulty: 'Medium',
    impact: 'High',
    icon: 'droplets'
  },
  {
    id: 'ACT002',
    title: 'Community Well Recharge',
    description: 'Implement groundwater recharge through existing community wells',
    credits: 1000,
    difficulty: 'High',
    impact: 'High',
    icon: 'waves'
  },
  {
    id: 'ACT003',
    title: 'Percolation Tank Construction',
    description: 'Build percolation tanks to enhance groundwater recharge',
    credits: 750,
    difficulty: 'High',
    impact: 'High',
    icon: 'container'
  },
  {
    id: 'ACT004',
    title: 'Tree Plantation Drive',
    description: 'Organize tree plantation to improve groundwater retention',
    credits: 300,
    difficulty: 'Low',
    impact: 'Medium',
    icon: 'tree-pine'
  }
];

// Calculate statistics
export const getStatistics = () => {
  const onlineStations = allStations.length;
  const criticalZones = allStations.filter(s => s.status === 'critical').length;
  const averageWaterLevel = parseFloat((allStations.reduce((sum, s) => sum + s.waterLevel, 0) / allStations.length).toFixed(1));
  const statesMonitored = [...new Set(allStations.map(s => s.state))].length;
  
  return {
    onlineStations,
    criticalZones,
    averageWaterLevel,
    statesMonitored
  };
};