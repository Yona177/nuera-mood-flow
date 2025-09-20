import { Settings, TrendingUp, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Profile = () => {
  const stats = [
    { label: 'Streak', value: '7 days', icon: TrendingUp, color: 'text-wellness-energy' },
    { label: 'Sessions', value: '42', icon: Calendar, color: 'text-primary' },
    { label: 'Achievements', value: '5', icon: Award, color: 'text-accent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-calm p-6 pb-24">
      <div className="max-w-md mx-auto pt-16">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
            A
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Alex
          </h1>
          <p className="text-muted-foreground">
            On a journey to wellness
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="p-4 text-center bg-card/80 backdrop-blur-sm border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="p-6 mb-6 bg-card/80 backdrop-blur-sm border-border/50">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { activity: 'Completed 5-Minute Mindfulness', time: '2 hours ago' },
              { activity: 'Practiced Box Breathing', time: '1 day ago' },
              { activity: 'Wrote gratitude journal', time: '2 days ago' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-foreground">{item.activity}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Settings Button */}
        <Button 
          variant="outline" 
          className="w-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
        >
          <Settings size={18} className="mr-2" />
          Settings & Preferences
        </Button>
      </div>
    </div>
  );
};

export default Profile;