import { ROUTE } from '@/utils';

export function getServerSideProps() {
  return {
    redirect: {
      destination: ROUTE.BORROW,
      permanent: false,
    },
  };
}

export default function Homepage() {
  return null;
}
