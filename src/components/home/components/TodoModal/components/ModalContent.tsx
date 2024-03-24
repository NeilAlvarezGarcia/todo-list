import { Modal, Fade } from '@mui/material';
import { ModalBaseProps } from '../TodoModal';
import styled from 'styled-components';
import { SelectInput, SubmitButton, TextInput } from '@/commons/forms';
import { Text } from '@/commons/text';
import { PriorityOptions } from '@/components/home/constants/dropdownOptions';

export function ModalContent({ isOpen, onClose }: ModalBaseProps) {
  return (
    <Container>
      <Text type='h2'>Create To-do</Text>

      <TextInput id='title' label='Title' />
      <TextInput id='description' label='description' />
      <SelectInput options={PriorityOptions} id='priority' label='Priority' />

      <SubmitButton text='Create' loadingText='Creating...' />
    </Container>
    // <Modal open={isOpen} onClose={onClose}>
    //   <Fade in={isOpen}>
    //   </Fade>
    // </Modal>
  );
}

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 16px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  padding: 16px;
  width: min(90%, 600px);
  margin: auto;
`;
