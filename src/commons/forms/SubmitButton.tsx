import { Button } from '@/commons/button';
import { useFormContext } from 'react-hook-form';

interface Props {
  text?: string;
  loadingText?: string;
}

export function SubmitButton({ text, loadingText }: Props) {
  const { formState } = useFormContext() || {};
  const { isSubmitting } = formState || {};

  return <Button type='submit'>{isSubmitting ? loadingText : text}</Button>;
}
