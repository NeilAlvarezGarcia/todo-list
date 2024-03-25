import { Button } from '@/commons/button';
import { DatePicker, InputSearch, SelectInput } from '@/commons/forms';
import { useFilterParams } from '@/hooks';
import { StatusOptions, PriorityOptions } from '@/utils/const/dropdownOptions';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export function Filters() {
  const { filterValues, handleClearFilters, handleFilterChange, hasFilters } = useFilterParams();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const onClearFilters = () => {
    handleClearFilters();
    closeModal();
  };

  return (
    <>
      <MobileContainer>
        <Button variant='outlined' onClick={openModal}>
          <MenuIcon />
        </Button>
      </MobileContainer>

      <Container isOpen={modalOpen} onClick={closeModal}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <DatePicker
            id='created-date'
            name='created-date'
            label='Date'
            onChange={handleFilterChange}
            value={filterValues.createdAt}
          />

          <SelectInput
            options={StatusOptions}
            name='status'
            id='status'
            label='Status'
            onChange={handleFilterChange}
            value={filterValues.status}
          />
          <SelectInput
            options={PriorityOptions}
            name='priority'
            id='priority'
            label='Priority'
            onChange={handleFilterChange}
            value={filterValues.priority}
          />

          <InputSearch
            name='search'
            id='search'
            label='Search'
            onChange={handleFilterChange}
            value={filterValues.search}
          />

          {hasFilters && (
            <Button color='error' variant='text' size='small' onClick={onClearFilters}>
              Clear filters
            </Button>
          )}
        </ModalContainer>
      </Container>
    </>
  );
}

const Container = styled('div').withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen?: boolean }>`
  @media (max-width: 1000px) {
    visibility: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    position: fixed;
    inset: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.lightBlack};

    ${({ isOpen }) =>
      isOpen &&
      `
      visibility: visible;
      opacity: 1;
    `}
  }
`;

const MobileContainer = styled('div')`
  display: none;
  @media (max-width: 1000px) {
    display: flex;
  }
`;
const ModalContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1000px) {
    &::before {
      content: 'Apply filters';
      margin-bottom: 24px;
      font-size: 24px;
      font-weight: 600;
    }

    padding: 32px 16px;
    height: 100vh;
    width: 70%;
    max-width: 350px;
    z-index: 2;
    background-color: ${({ theme }) => theme.white};
    gap: 16px;
    flex-direction: column;
    align-items: unset;
  }
`;
