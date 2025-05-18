import React, { useState, CSSProperties } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import styled from 'styled-components';
import BreathingExercise from './components/BreathingExercise';
import MoodTracker from './components/MoodTracker';

// Styled components
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #8e24aa, #e91e63);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserTag = styled.span`
  background: #8e24aa;
  color: #fff;
  padding: 6px 18px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 500;
`;

const MainContent = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const LeftColumn = styled.div`
  flex: 2;
  min-width: 0;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ChartSection = styled.div`
  background: linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(57, 0, 29) 60%, rgb(0, 0, 0) 100%);
  border-radius: 18px;
  padding: 28px 24px 24px 24px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px 0 rgba(30, 30, 47, 0.25);
  position: relative;
  overflow: hidden;
`;

const ChartTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 18px;
`;

const TimePeriodGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

const TimeButton = styled.button<{active: boolean}>`
  padding: 6px 18px;
  border-radius: 12px;
  border: none;
  background: ${({active}) => active ? '#8e24aa' : '#393053'};
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #8e24aa;
  }
`;

const ChartRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 18px;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LegendDot = styled.div<{color: string}>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({color}) => color};
`;

const Section = styled.div`
  background: linear-gradient(135deg, rgb(63, 0, 97) 0%, rgb(57, 0, 29) 60%, rgb(0, 0, 0) 100%);
  border-radius: 18px;
  padding: 20px 18px 18px 18px;
  box-shadow: 0 2px 12px rgba(30, 30, 47, 0.12);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

const Th = styled.th`
  text-align: left;
  padding-bottom: 8px;
  color: #bdbdbd;
  font-size: 1rem;
`;

const Td = styled.td`
  padding: 10px 0;
  font-size: 1rem;
  color: #fff;
`;

const MetricRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const MetricName = styled.div`
  width: 110px;
  font-size: 1rem;
  white-space: nowrap;
`;

const MetricBarWrapper = styled.div`
  flex: 1;
  background: #393053;
  height: 8px;
  border-radius: 8px;
  margin-right: 8px;
  overflow: hidden;
`;

const MetricBar = styled.div<{color: string; width: number}>`
  height: 8px;
  border-radius: 8px;
  background: ${({color}) => color};
  width: ${({width}) => width}%;
`;

const MetricValue = styled.div`
  width: 80px;
  text-align: right;
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Mock data for the health overview graph
const data = [
  { date: '15 May', mood: 6, steps: 4000 },
  { date: '16 May', mood: 7, steps: 6500 },
  { date: '17 May', mood: 5, steps: 3000 },
  { date: '18 May', mood: 8, steps: 8000 },
  { date: '19 May', mood: 7, steps: 7000 },
  { date: '20 May', mood: 6, steps: 5000 },
  { date: '21 May', mood: 8, steps: 9000 },
  { date: '22 May', mood: 7, steps: 7500 },
  { date: '23 May', mood: 6, steps: 6000 },
  { date: '24 May', mood: 7, steps: 7200 },
  { date: '25 May', mood: 8, steps: 8500 },
  { date: '26 May', mood: 7, steps: 7000 },
];

const timePeriods = [
  { id: '1D', label: '1D' },
  { id: '1W', label: '1W' },
  { id: '1M', label: '1M', active: true },
  { id: '1Y', label: '1Y' },
];

const barData = [
  { date: '15 May', sleep: 6.5, activity: 30 },
  { date: '16 May', sleep: 7.2, activity: 45 },
  { date: '17 May', sleep: 5.8, activity: 20 },
  { date: '18 May', sleep: 8.0, activity: 60 },
  { date: '19 May', sleep: 7.0, activity: 50 },
];

const trackedMetrics = [
  { name: 'Steps', value: 8500, goal: 10000, color: '#bb5cff' },
  { name: 'Sleep (hrs)', value: 7.2, goal: 8, color: '#10d078' },
  { name: 'Water (L)', value: 1.8, goal: 2.5, color: '#2196f3' },
  { name: 'Calories', value: 1800, goal: 2200, color: '#ffb15c' },
];

const controlsStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  gap: '16px',
  position: 'relative' as React.CSSProperties['position'],
  zIndex: '2',
};

const styles: Record<string, React.CSSProperties> = {
  socket: {
    width: '200px',
    height: '200px',
    position: 'relative' as React.CSSProperties['position'],
    left: '50%',
    marginLeft: '-100px',
    top: '50%',
    marginTop: '-100px',
  },
  hexBrick: {
    background: '#000000',
    width: '30px',
    height: '17px',
    position: 'absolute' as React.CSSProperties['position'],
    top: '5px',
    animationName: 'fade00',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    WebkitAnimationName: 'fade00',
    WebkitAnimationDuration: '2s',
    WebkitAnimationIterationCount: 'infinite',
  },
  h2: {
    transform: 'rotate(60deg)',
    WebkitTransform: 'rotate(60deg)',
  },
  h3: {
    transform: 'rotate(-60deg)',
    WebkitTransform: 'rotate(-60deg)',
  },
  // ...baaki styles
};

// Simple Progress Bar Component
const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div style={{ 
      width: '90px', 
      height: '320px',
      background: '#181c2f',
      borderRadius: '12px',
      border: '2px solid #2196f3',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: `${percent * 100}%`,
        background: 'linear-gradient(to top, #2196f3, #8e24aa)',
        transition: 'height 0.3s ease'
      }} />
    </div>
  );
};

// Water Intake Box
const WaterIntakeBox = () => {
  const cupOptions = [100, 200, 300, 500]; // ml
  const [selected, setSelected] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const dailyGoal = 2500;
  const percent = Math.min(total / dailyGoal, 1);

  // Mock data for water intake history
  const waterHistory = [
    { time: '8:00 AM', amount: 200 },
    { time: '10:30 AM', amount: 300 },
    { time: '1:00 PM', amount: 500 },
    { time: '3:30 PM', amount: 200 },
  ];

  return (
    <ChartSection>
      <ChartTitle>Water Intake</ChartTitle>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', minHeight: '320px' }}>
        {/* Progress Bar */}
        <div style={{ flex: '0 0 90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProgressBar percent={percent} />
        </div>
        {/* Controls and Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          {/* Top Section - Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {cupOptions.map((ml) => (
                <button
                  key={ml}
                  onClick={() => setSelected(ml)}
                  style={{
                    width: 48,
                    height: 64,
                    borderRadius: 12,
                    border: selected === ml ? '2px solid #2196f3' : '2px solid rgba(255,255,255,0.08)',
                    background: selected === ml ? 'linear-gradient(135deg, #2196f3 60%, #8e24aa 100%)' : 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: selected === ml ? '0 2px 8px #2196f3aa' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: 28 }}>🥛</span>
                  <span style={{ fontSize: 13 }}>{ml}ml</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #2196f3, #8e24aa)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 20px',
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: selected ? 'pointer' : 'not-allowed',
                  opacity: selected ? 1 : 0.5,
                  boxShadow: selected ? '0 2px 8px #2196f3aa' : 'none',
                  transition: 'all 0.2s',
                }}
                disabled={!selected}
                onClick={() => selected && setTotal((t) => t + selected)}
              >
                Add
              </button>
              <span style={{ fontSize: 18, color: '#fff', fontWeight: 600 }}>
                Total: {total} ml / {dailyGoal} ml
              </span>
            </div>
          </div>

          {/* Bottom Section - Stats and History */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '24px' }}>
            {/* Quick Stats */}
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '12px' }}>Today's Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '14px' }}>Remaining</span>
                  <span style={{ color: '#2196f3', fontWeight: 600 }}>{dailyGoal - total} ml</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '14px' }}>Intake Count</span>
                  <span style={{ color: '#2196f3', fontWeight: 600 }}>{waterHistory.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: '14px' }}>Avg. per Intake</span>
                  <span style={{ color: '#2196f3', fontWeight: 600 }}>{Math.round(total / (waterHistory.length || 1))} ml</span>
                </div>
              </div>
            </div>

            {/* Recent History */}
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
              <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '12px' }}>Recent Intakes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {waterHistory.map((entry, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px' }}>{entry.time}</span>
                    <span style={{ color: '#2196f3', fontWeight: 600 }}>{entry.amount} ml</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChartSection>
  );
};

// Compact Navbar Components
const Navbar = styled.div`
  max-width: 1200px;
  margin: 0 auto 32px auto;
  background: linear-gradient(135deg, rgb(63, 0, 97) 0%, rgb(57, 0, 29) 60%, rgb(0, 0, 0) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 32px 0 32px;
  border-radius: 0 0 18px 18px;
  box-shadow: 0 2px 12px 0 rgba(30, 30, 47, 0.12);
  min-height: 56px;
  position: relative;
  z-index: 10;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NavLogoCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8e24aa, #e91e63);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Use the original logo SVG
const NavLogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/>
  </svg>
);

const NavGroup = styled.div`
  background: linear-gradient(135deg, rgb(63, 0, 97) 0%, rgb(57, 0, 29) 60%, rgb(0, 0, 0) 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
`;

const NavItem = styled.button<{active?: boolean}>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({active}) => active ? 'linear-gradient(135deg, #8e24aa 60%, #e91e63 100%)' : 'transparent'};
  color: ${({active}) => active ? '#fff' : '#bdbdbd'};
  border: none;
  border-radius: 10px;
  padding: 6px 14px;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  outline: none;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NavIconBtn = styled.button`
  background: #23243a;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdbdbd;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #393053;
    color: #fff;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: #23243a;
  border-radius: 14px;
  padding: 2px 8px 2px 2px;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #8e24aa;
`;

const UserName = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 0.98rem;
`;

const UserEmail = styled.div`
  color: #bdbdbd;
  font-size: 0.8rem;
  line-height: 1;
`;

// Large Gradient Icon for Navbar
const LargeNavIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background: linear-gradient(135deg, #8e24aa 0%, #e91e63 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;
`;

const GlobeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="none" />
    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" fill="none" />
    <path d="M12 3C14.7614 3 17 7.02944 17 12C17 16.9706 14.7614 21 12 21C9.23858 21 7 16.9706 7 12C7 7.02944 9.23858 3 12 3Z" stroke="white" strokeWidth="2" fill="none" />
    <path d="M3 12H21" stroke="white" strokeWidth="2" />
  </svg>
);

// Weekly Overview Box
const WeeklyOverviewBox = () => {
  // Use the last 7 days from the 'data' array for steps percentage (relative to 10,000 goal)
  const weeklyData = data.slice(-7).map((d) => ({
    date: d.date,
    percent: Math.round((d.steps / 10000) * 100),
    steps: d.steps,
  }));
  const gradientColors = [
    'url(#barGradient1)',
    'url(#barGradient2)',
    'url(#barGradient3)',
    'url(#barGradient4)',
    'url(#barGradient5)',
    'url(#barGradient6)',
    'url(#barGradient7)',
  ];
  // Calculate summary stats
  const bestDay = weeklyData.reduce((max, d) => d.percent > max.percent ? d : max, weeklyData[0]);
  const avgPercent = Math.round(weeklyData.reduce((sum, d) => sum + d.percent, 0) / weeklyData.length);
  const totalSteps = weeklyData.reduce((sum, d) => sum + d.steps, 0);
  return (
    <ChartSection style={{ marginTop: 0, background: 'linear-gradient(135deg, #2d0036 0%, #181c2f 100%)', minHeight: 420, padding: '36px 32px 32px 32px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <ChartTitle style={{ fontSize: '1.35rem' }}>Weekly Overview</ChartTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LegendDot color="url(#barGradient1)" />
          <span style={{ color: '#bdbdbd', fontSize: 15 }}>Steps % of Goal</span>
        </div>
      </div>
      {/* Summary Row just below the title/legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '16px 24px' }}>
        <div style={{ color: '#bb5cff', fontWeight: 600, fontSize: 16 }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>⭐</span>Best Day: <span style={{ color: '#fff' }}>{bestDay.date}</span> ({bestDay.percent}%)
        </div>
        <div style={{ color: '#ff5caa', fontWeight: 600, fontSize: 16 }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>📊</span>Avg: <span style={{ color: '#fff' }}>{avgPercent}%</span>
        </div>
        <div style={{ color: '#10d078', fontWeight: 600, fontSize: 16 }}>
          <span style={{ fontSize: 22, marginRight: 8 }}>👣</span>Total Steps: <span style={{ color: '#fff' }}>{totalSteps}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData} barCategoryGap={32} margin={{ left: 8, right: 8, top: 24, bottom: 8 }}>
          <defs>
            <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bb5cff" />
              <stop offset="100%" stopColor="#e91e63" />
            </linearGradient>
            <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8e24aa" />
              <stop offset="100%" stopColor="#ff5caa" />
            </linearGradient>
            <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#bb5cff" />
            </linearGradient>
            <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5caa" />
              <stop offset="100%" stopColor="#8e24aa" />
            </linearGradient>
            <linearGradient id="barGradient5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bb5cff" />
              <stop offset="100%" stopColor="#e91e63" />
            </linearGradient>
            <linearGradient id="barGradient6" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8e24aa" />
              <stop offset="100%" stopColor="#ff5caa" />
            </linearGradient>
            <linearGradient id="barGradient7" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#bb5cff" />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#bdbdbd', fontSize: 15 }} axisLine={false} tickLine={false} />
          <Bar
            dataKey="percent"
            barSize={40}
            radius={[16, 16, 16, 16]}
            isAnimationActive={true}
          >
            {weeklyData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={gradientColors[idx % gradientColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: -220, pointerEvents: 'none', position: 'relative', zIndex: 2 }}>
        {weeklyData.map((entry, idx) => (
          <div key={entry.date} style={{ width: 40, textAlign: 'center', marginLeft: idx === 0 ? 0 : 8, minHeight: 40 }}>
            <div style={{
              background: 'linear-gradient(135deg, #bb5cff 60%, #e91e63 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              borderRadius: 10,
              padding: '3px 0',
              marginBottom: 10,
              boxShadow: '0 2px 8px #181c2f44',
              minWidth: 40,
              margin: '0 auto',
            }}>{entry.percent}%</div>
          </div>
        ))}
      </div>
    </ChartSection>
  );
};

export default function HealthDashboard() {
  const [activePeriod, setActivePeriod] = useState('1M');
  const [activeNav, setActiveNav] = useState('Dashboard');

  const getStatusDot = (status: 'high' | 'medium' | 'low' | 'none') => {
    const colors = {
      high: '#ff5caa',
      medium: '#ffb15c',
      low: '#10d078',
      none: '#ccc',
    };
    return (
      <span style={{ display: 'inline-flex', gap: 4 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: colors[status], display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#888', opacity: (status === 'high') || (status === 'medium') ? "0.6" : "1", display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#888', opacity: (status === 'high') || (status === 'medium') ? "0.6" : "1", display: 'inline-block' }} />
      </span>
    );
  };

  return (
    <>
      {/* Large Icon + Compact Modern Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 32px auto', paddingLeft: 0 }}>
        <LargeNavIcon>
          <GlobeIcon />
        </LargeNavIcon>
        <Navbar style={{ margin: 0, maxWidth: 'unset', flex: 1 }}>
          <NavLeft />
          <NavGroup>
            <NavItem active={activeNav === 'Dashboard'} onClick={() => setActiveNav('Dashboard')}>
              <span style={{fontSize: '1.1em'}}>🏠</span> Dashboard
            </NavItem>
            <NavItem active={activeNav === 'User'} onClick={() => setActiveNav('User')}>
              <span style={{fontSize: '1.1em'}}>👤</span> User
            </NavItem>
            <NavItem active={activeNav === 'Reminders'} onClick={() => setActiveNav('Reminders')}>
              <span style={{fontSize: '1.1em'}}>⏰</span> Reminders
            </NavItem>
            <NavItem active={activeNav === 'Mood'} onClick={() => setActiveNav('Mood')}>
              <span style={{fontSize: '1.1em'}}>😊</span> Mood
            </NavItem>
          </NavGroup>
          <NavRight>
            <NavIconBtn title="Notifications">
              <span role="img" aria-label="bell">🔔</span>
            </NavIconBtn>
            <NavIconBtn title="Settings">
              <span role="img" aria-label="settings">⚙️</span>
            </NavIconBtn>
            <UserProfile>
              <span style={{color: '#bdbdbd', fontSize: '1.1em', marginRight: 8}}>▼</span>
              <div>
                <UserName>Wellness User</UserName>
                <UserEmail>user@wellness.com</UserEmail>
              </div>
            </UserProfile>
          </NavRight>
        </Navbar>
      </div>
      <MainContent>
        <LeftColumn>
          <ChartSection>
            <ChartTitle>Mood & Activity Overview</ChartTitle>
            <TimePeriodGroup>
              {timePeriods.map((period) => (
                <TimeButton
                  key={period.id}
                  active={activePeriod === period.id}
                  onClick={() => setActivePeriod(period.id)}
                >
                  {period.label}
                </TimeButton>
              ))}
            </TimePeriodGroup>
            <ChartRow>
              <Legend>
                <LegendDot color="#bb5cff" />
                <span>Mood</span>
              </Legend>
              <Legend>
                <LegendDot color="#ff5caa" />
                <span>Steps</span>
              </Legend>
            </ChartRow>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bb5cff" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#18181c" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff5caa" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#18181c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#28283a" vertical={false} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 12 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 12 }} domain={[0, 10]} ticks={[0,2,4,6,8,10]} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 12 }} domain={[0, 10000]} ticks={[0,2000,4000,6000,8000,10000]} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(24,24,28,0.95)', border: '1px solid #393053', borderRadius: 12, color: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 600 }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <ReferenceLine x="19 May" yAxisId="right" stroke="#aaa" strokeDasharray="3 3" label={{ value: "Goal", position: "top", fill: "#fff", fontSize: 12 }} />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="mood"
                    stroke="#bb5cff"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#moodGradient)"
                    dot={false}
                    activeDot={false}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="steps"
                    stroke="#ff5caa"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#stepsGradient)"
                    dot={false}
                    activeDot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartSection>
          <ChartSection>
            <BreathingExercise />
          </ChartSection>
          <WaterIntakeBox />
        </LeftColumn>
        <RightColumn>
          <Section>
            <ChartTitle>Health Reminders</ChartTitle>
            <button style={{ background: '#393053', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', marginBottom: 12, cursor: 'pointer' }}>View All</button>
            <Table>
              <thead>
                <tr>
                  <Th>Reminder</Th>
                  <Th>Count</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {([
                  { type: 'Missed Workout', icon: '🏋️', count: 2, status: 'high' },
                  { type: 'Missed Water Intake', icon: '💧', count: 1, status: 'medium' },
                  { type: 'Missed Sleep Goal', icon: '🛌', count: 1, status: 'medium' },
                  { type: 'Missed Steps Goal', icon: '👟', count: 1, status: 'high' },
                ] as { type: string; icon: string; count: number; status: 'high' | 'medium' | 'low' | 'none' }[]).map((reminder, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #393053' }}>
                    <Td><span style={{ marginRight: 8 }}>{reminder.icon}</span>{reminder.type}</Td>
                    <Td>{reminder.count}</Td>
                    <Td>{getStatusDot(reminder.status)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
          <Section>
            <ChartTitle>Sleep & Activity Status</ChartTitle>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Legend>
                <LegendDot color="#bb5cff" />
                <span>Sleep (hrs)</span>
              </Legend>
              <Legend>
                <LegendDot color="#ff5caa" />
                <span>Active (min)</span>
              </Legend>
            </div>
            <div style={{ width: '100%', height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#bb5cff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#bb5cff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff5caa" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ff5caa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} labelStyle={{ color: '#fff' }} />
                  <Area type="monotone" dataKey="sleep" stackId="1" stroke="#bb5cff" strokeWidth={1} fillOpacity={1} fill="url(#sleepGradient)" dot={false} />
                  <Area type="monotone" dataKey="activity" stackId="1" stroke="#ff5caa" strokeWidth={1} fillOpacity={1} fill="url(#activityGradient)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>
          <Section>
            <ChartTitle>Tracked Metrics</ChartTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {trackedMetrics.map((metric) => (
                <MetricRow key={metric.name}>
                  <MetricName>{metric.name}</MetricName>
                  <MetricBarWrapper>
                    <MetricBar color={metric.color} width={Math.min((metric.value / metric.goal) * 100, 100)} />
                  </MetricBarWrapper>
                  <MetricValue>{metric.value}/{metric.goal}</MetricValue>
                </MetricRow>
              ))}
            </div>
          </Section>
          <Section>
            <MoodTracker />
          </Section>
        </RightColumn>
      </MainContent>
    </>
  );
}