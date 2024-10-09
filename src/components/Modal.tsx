import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from './ui/dialog';

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
        {title && <DialogHeader>
          <DialogTitle className='text-gray-900 font-normal !space-y-0'>
          {title}
          </DialogTitle>
        </DialogHeader>}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;