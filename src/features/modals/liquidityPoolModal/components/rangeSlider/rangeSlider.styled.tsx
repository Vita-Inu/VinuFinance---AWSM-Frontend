import { styled } from 'styled-components';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const Wrapper = styled.div``;

export const Value = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.6rem;
`;

export const Label = styled.div`
  color: rgba(255, 255, 255, 0.45);
  font-family: Aeonik, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 180%; /* 25.2px */
`;

export const Bubble = styled.div`
  color: #000;
  font-family: Aeonik, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 180%; /* 21.6px */
  padding: 0 0.6rem;
  border-radius: 10rem;
  background: #dfcefd;
`;

export const Box = styled.div`
  margin-top: 2.2rem;
`;

export const Slider = styled(RcSlider)`
  &.rc-slider-disabled {
    background-color: transparent;
  }
  
  .rc-slider-rail {
    height: 0.6rem;
    background-color: rgb(255 255 255 / 15%);
    border-radius: 0.3rem;
  }

  .rc-slider-track,
  .rc-slider-tracks {
    height: 0.6rem;
    background-color: #dfcefd;
    border-radius: 0.3rem;
  }

  .rc-slider-handle {
    width: 1.8rem;
    height: 1.8rem;
    background-color: #dfcefd;
    border: none;
    opacity: 1;
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: transparent;
    box-shadow: none;
  }
`;
