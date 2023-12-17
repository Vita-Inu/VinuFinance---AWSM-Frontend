import {Wrapper, Box} from "./styled"

export function Loader() {
  return (
    <Wrapper>
      <Box>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.75 17C32.7498 20.3261 31.6967 23.5667 29.7416 26.2574C27.7865 28.9481 25.0298 30.9509 21.8665 31.9786C18.7033 33.0063 15.2958 33.0062 12.1326 31.9783C8.96941 30.9504 6.21279 28.9475 4.25784 26.2567C2.30289 23.5658 1.24998 20.3252 1.25 16.9992C1.25002 13.6731 2.30298 10.4325 4.25797 7.74166C6.21296 5.05085 8.96961 3.048 12.1328 2.02017C15.2961 0.992344 18.7035 0.992298 21.8668 2.02004" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </Box>
    </Wrapper>
  )
}