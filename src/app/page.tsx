import { redirect } from 'next/navigation';

import { ROUTE } from '@/utils';

export default function Home() {
  redirect(ROUTE.BORROW);
}
