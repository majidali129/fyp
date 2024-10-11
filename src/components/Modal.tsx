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

  console.log('modal render...')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="rounded shadow bg-white border-none px-0">
        {title && <DialogHeader className='border-b border-b-gray-100 px-4'>
          <DialogTitle className='text-gray-900 font-normal !space-y-0 pb-3'>
          {title}
          </DialogTitle>
        </DialogHeader>}
        <div className='px-4'>
        {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;