import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';

type ModalProps = {
  buttonContent: string;
  children: (closeModal: () => void) => ReactNode;
};

export function Modal({ buttonContent, children }: ModalProps) {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-10">{buttonContent}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {children(closeModal)}
      </DialogContent>
    </Dialog>
  );
}
