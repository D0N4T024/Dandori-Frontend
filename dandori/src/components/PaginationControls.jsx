'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

export default function PaginationControls({ search, total }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '4'

  const handleChange = (event, value) => {
    router.push(`/search?query=${search}&page=${Number(value)}&per_page=${per_page}`)
  };

  return (
    <div>
      <Pagination count={total} page={Number(page)} onChange={handleChange}/>
    </div>
  )
}