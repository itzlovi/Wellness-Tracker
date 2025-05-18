import React, { useState } from 'react';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import styled from 'styled-components';

const MoodCalendar = styled(Box)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-top: 20px;
`;

const MoodDay = styled(Box)<{ hasMood?: boolean }>`
  aspect-ratio: 1/1;
  border-radius: 6px;
  background-color: ${props => props.hasMood ? 'rgba(142, 36, 170, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: ${props => props.hasMood ? '0 2px 8px rgba(142, 36, 170, 0.2)' : 'none'};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const MoodSelector = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const MoodButton = styled(Box)<{ selected?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.selected ? 'linear-gradient(135deg, #8e24aa, #e91e63)' : 'rgba(255, 255, 255, 0.05)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.selected ? '0 4px 12px rgba(142, 36, 170, 0.3)' : 'none'};

  &:hover {
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '☹️', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😓', label: 'Stressed' },
];

const MoodTracker = (): JSX.Element => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [moodMap, setMoodMap] = useState<{ [day: number]: string }>({});

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  const handleMoodSelect = (mood: string) => {
    if (selectedDay !== null) {
      setMoodMap(prev => ({ ...prev, [selectedDay]: mood }));
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Mood Tracker</Typography>
        <Button 
          variant="outlined" 
          size="small" 
          sx={{ 
            background: '#fff', 
            color: '#2d0036', 
            borderColor: '#fff',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            '&:hover': { background: '#f5f5f5', borderColor: '#fff' }
          }}
        >
          May 2025
        </Button>
      </Box>

      <MoodCalendar>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <MoodDay
            key={day}
            hasMood={!!moodMap[day]}
            onClick={() => handleDayClick(day)}
            style={{
              border: selectedDay === day ? '2px solid #8e24aa' : undefined,
              boxShadow: selectedDay === day ? '0 0 0 2px #e91e63' : undefined,
              position: 'relative',
              fontWeight: 600
            }}
          >
            {moodMap[day] ? (
              <span style={{ fontSize: 22 }}>{moodMap[day]}</span>
            ) : (
              day
            )}
          </MoodDay>
        ))}
      </MoodCalendar>

      <MoodSelector>
        {moods.map(mood => (
          <MoodButton
            key={mood.label}
            selected={false}
            onClick={() => handleMoodSelect(mood.emoji)}
            title={mood.label}
            style={{ opacity: selectedDay !== null ? 1 : 0.5, cursor: selectedDay !== null ? 'pointer' : 'not-allowed' }}
          >
            {mood.emoji}
          </MoodButton>
        ))}
      </MoodSelector>
    </Box>
  );
};

export default MoodTracker; 