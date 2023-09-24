import localFont from 'next/font/local';

export const aeonik = localFont({
  src: [
    {
      path: './AeonikTRIAL-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './AeonikTRIAL-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './AeonikTRIAL-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
