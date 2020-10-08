import { useRouter } from 'next/router';

export function getProductId() {
  const router = useRouter();
  const pathname = router.pathname;
  const { id } = router.query;
  console.log(id);

  return {
    id
  };
}