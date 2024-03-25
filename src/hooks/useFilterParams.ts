import { SelectChangeEvent } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

export function useFilterParams() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterValues = {
    status: searchParams.get('status') ?? '',
    priority: searchParams.get('priority') ?? '',
    search: searchParams.get('search') ?? '',
    createdAt: searchParams.get('created-date') ?? '',
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<unknown>
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const field = e.target.name;
    const value = e.target.value as string;

    if (!value) params.delete(field);
    else params.set(field, value);

    push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => push(pathname);

  return {
    handleFilterChange,
    handleClearFilters,
    filterValues,
    hasFilters: !!searchParams.toString(),
  };
}
