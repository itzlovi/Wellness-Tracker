import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const inhale = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const exhale = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.5);
    opacity: 0.2;
  }
`;

// New continuous breathing animation
const breathingLoop = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
`;

const BreathingAnimation = styled(Box)`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

interface BreathingCircleProps {
  isActive?: boolean;
}

const BreathingCircle = styled(Box)<BreathingCircleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${props => props.isActive ? 1 : 0.75});
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(30, 30, 47, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  opacity: ${props => props.isActive ? 0.8 : 0.5};
  ${props => props.isActive && css`
    animation: ${breathingLoop} 4s infinite alternate;
  `}
`;

const BreathingRing = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top: 3px solid #8e24aa;
  border-right: 3px solid #e91e63;
  border-bottom: 3px solid #2196f3;
  animation: ${rotate} 8s linear infinite;
`;

interface BreathingPulseProps {
  animation?: string;
}

const BreathingPulse = styled(Box)<BreathingPulseProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(142, 36, 170, 0.3) 0%, rgba(233, 30, 99, 0.1) 70%, rgba(33, 150, 243, 0) 100%);
  opacity: 0;
  animation: ${props => props.animation} 4s forwards;
`;

const BreathingControls = styled(Box)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 16px;
`;

const BreathingExercise = (): React.ReactElement => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'exhale'>('inhale');

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Breathing Exercise</Typography>
        <ButtonGroup size="small">
          <Button variant="contained" color="primary">4-4-4</Button>
          <Button>4-7-8</Button>
          <Button>Box</Button>
        </ButtonGroup>
      </Box>

      <BreathingAnimation>
        <BreathingCircle isActive={isActive}>
          {isActive ? 'Breathe' : 'Start'}
        </BreathingCircle>
        <BreathingRing />
        <BreathingPulse animation={isActive ? 'inhale' : ''} />
      </BreathingAnimation>

      <BreathingControls>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          disabled={isActive}
          startIcon={<span>▶</span>}
        >
          Start Session
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          disabled={!isActive}
          startIcon={<span>↺</span>}
        >
          Reset
        </Button>
      </BreathingControls>
    </Box>
  );
};

export default BreathingExercise; 