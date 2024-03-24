import { ModalContent } from './components/ModalContent';
import AddTodoFormProvider from './providers/AddTodoFormProvider';

export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodoModal(props: ModalBaseProps) {
  return (
    <AddTodoFormProvider>
      <ModalContent {...props} />
    </AddTodoFormProvider>
  );
}
