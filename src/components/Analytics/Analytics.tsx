import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const productionMetrics = {
    totalUnits: 8950,
    efficiencyTrend: '+12.5%',
    qualityRate: 96.8,
    downtimeTrend: '-23%',
    energyOptimization: '+8.2%'
  };

  const machinePerformance = [
    { name: 'Knitting Machine #1', efficiency: 94, utilization: 87, quality: 98 },
    { name: 'Knitting Machine #2', efficiency: 76, utilization: 45, quality: 92 },
    { name: 'Dyeing Unit', efficiency: 65, utilization: 78, quality: 89 },
    { name: 'Cutting Station', efficiency: 91, utilization: 92, quality: 97 },
    { name: 'Packing Unit #1', efficiency: 97, utilization: 94, quality: 99 },
    { name: 'Packing Unit #2', efficiency: 82, utilization: 56, quality: 94 }
  ];

  const productionTrends = [
    { period: 'Week 1', production: 1850, efficiency: 85, downtime: 45 },
    { period: 'Week 2', production: 2100, efficiency: 89, downtime: 32 },
    { period: 'Week 3', production: 2350, efficiency: 92, downtime: 28 },
    { period: 'Week 4', production: 2650, efficiency: 94, downtime: 18 }
  ];

  const insights = [
    {
      type: 'opportunity',
      title: 'Efficiency Optimization Opportunity',
      description: 'Knitting Machine #2 showing 31% below average efficiency. Recommended maintenance check.',
      impact: 'Potential 15% production increase',
      priority: 'high'
    },
    {
      type: 'success',
      title: 'Quality Improvement Achieved',
      description: 'Overall quality rate improved by 4.2% this month through process optimization.',
      impact: '23% reduction in defects',
      priority: 'medium'
    },
    {
      type: 'alert',
      title: 'Energy Usage Spike Detected',
      description: 'Dyeing Unit consuming 18% more energy than baseline. Temperature control issue suspected.',
      impact: '$450 additional monthly cost',
      priority: 'high'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Analytics</h1>
          <p className="text-muted-foreground">Insights and performance analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {['day', 'week', 'month', 'quarter'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Total Production</div>
          <div className="text-3xl font-bold text-primary">{productionMetrics.totalUnits}</div>
          <div className="text-sm text-safety-green">+12.5% vs last period</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Avg Efficiency</div>
          <div className="text-3xl font-bold text-safety-green">87%</div>
          <div className="text-sm text-safety-green">{productionMetrics.efficiencyTrend} improvement</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Quality Rate</div>
          <div className="text-3xl font-bold text-primary">{productionMetrics.qualityRate}%</div>
          <div className="text-sm text-safety-green">+2.1% quality improvement</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Downtime</div>
          <div className="text-3xl font-bold text-warning-orange">2.3h</div>
          <div className="text-sm text-safety-green">{productionMetrics.downtimeTrend} reduction</div>
        </Card>
        <Card className="p-6 surface-gradient">
          <div className="text-sm font-medium text-muted-foreground mb-2">Energy Efficiency</div>
          <div className="text-3xl font-bold text-industrial">92%</div>
          <div className="text-sm text-safety-green">{productionMetrics.energyOptimization} optimization</div>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6 surface-gradient">
            <h2 className="text-xl font-semibold mb-6">Machine Performance Analysis</h2>
            <div className="space-y-4">
              {machinePerformance.map((machine, index) => (
                <div key={index} className="p-4 bg-background/50 rounded border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{machine.name}</h3>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className={
                        machine.efficiency > 90 ? 'border-safety-green text-safety-green' :
                        machine.efficiency > 80 ? 'border-warning-orange text-warning-orange' :
                        'border-danger-red text-danger-red'
                      }>
                        {machine.efficiency > 90 ? 'Excellent' : machine.efficiency > 80 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                      <div className="text-lg font-semibold">{machine.efficiency}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Utilization</div>
                      <div className="text-lg font-semibold">{machine.utilization}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Quality</div>
                      <div className="text-lg font-semibold">{machine.quality}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 surface-gradient">
              <h2 className="text-xl font-semibold mb-4">Production Trends</h2>
              <div className="h-64 flex items-center justify-center bg-background/50 rounded border-2 border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <div className="text-4xl mb-2">📈</div>
                  <div>Trend Analysis Chart</div>
                  <div className="text-sm">Historical performance visualization</div>
                </div>
              </div>
            </Card>
            <Card className="p-6 surface-gradient">
              <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
              <div className="space-y-4">
                {productionTrends.map((week, index) => (
                  <div key={index} className="p-3 bg-background/50 rounded">
                    <div className="font-medium text-sm">{week.period}</div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Production: </span>
                        <span className="font-medium">{week.production}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Efficiency: </span>
                        <span className="font-medium">{week.efficiency}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="p-6 surface-gradient">
            <h2 className="text-xl font-semibold mb-6">AI-Powered Insights</h2>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="p-4 bg-background/50 rounded border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        insight.type === 'opportunity' ? 'bg-primary' :
                        insight.type === 'success' ? 'bg-safety-green' :
                        'bg-warning-orange'
                      }`} />
                      <h3 className="font-medium">{insight.title}</h3>
                    </div>
                    <Badge variant="outline" className={
                      insight.priority === 'high' ? 'border-danger-red text-danger-red' :
                      insight.priority === 'medium' ? 'border-warning-orange text-warning-orange' :
                      'border-primary text-primary'
                    }>
                      {insight.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                  <div className="text-sm font-medium text-foreground">{insight.impact}</div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 surface-gradient">
              <h2 className="text-xl font-semibold mb-4">Predictive Maintenance</h2>
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Dyeing Unit</span>
                    <Badge variant="outline" className="border-warning-orange text-warning-orange">
                      Maintenance Due
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Predicted maintenance needed in 3-5 days based on performance patterns.</p>
                </div>
                <div className="p-4 bg-background/50 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Knitting Machine #2</span>
                    <Badge variant="outline" className="border-safety-green text-safety-green">
                      Healthy
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Operating within normal parameters. Next service in 2 weeks.</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 surface-gradient">
              <h2 className="text-xl font-semibold mb-4">Production Forecast</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2,850</div>
                  <div className="text-sm text-muted-foreground">Projected units next week</div>
                  <div className="text-sm text-safety-green">+7.5% vs this week</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence Level</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Factors</span>
                    <span className="font-medium">Low</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;