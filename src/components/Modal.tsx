import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay } from './ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from './ui/button';

interface ModalProps {
  isOpen: boolean;
  title?:string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="p-6 rounded-lg shadow-md bg-white">
        {title && <DialogHeader className='text-lg font-semibold text-gray-800 !space-y-0'>{title}</DialogHeader>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;