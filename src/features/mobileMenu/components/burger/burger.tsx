import { Wrapper } from './styled';

type Props = {
  onClick: VoidFunction;
};

export function Burger({ onClick }: Props) {
  return (
    <Wrapper onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='27'
        height='14'
        viewBox='0 0 27 14'
        fill='none'
      >
        <g id='Group_1001'>
          <g id='Rectangle_45'>
            <path id='Vector' d='M27 0.5H0V1.5H27V0.5Z' fill='white' />
          </g>
          <g id='Rectangle_46'>
            <path id='Vector_2' d='M27 6.5H0V7.5H27V6.5Z' fill='white' />
          </g>
          <g id='Rectangle_47'>
            <path id='Vector_3' d='M27 12.5H0V13.5H27V12.5Z' fill='white' />
          </g>
        </g>
      </svg>
    </Wrapper>
  );
}
