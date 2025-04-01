import { ReactNode } from 'react';
import { Modal } from './Modal';

type PageHeaderProps = {
  header: string;
  buttonContent: string;
  children: (closeModal: () => void) => ReactNode;
};

export function PageHeader({
  header,
  buttonContent,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex align-center items-center mb-10">
      <h1 className="text-5xl font-bold">{header}</h1>
      <Modal buttonContent={buttonContent}>
        {(closeModal) => children(closeModal)}
      </Modal>
    </div>
  );
}
