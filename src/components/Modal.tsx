import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ReactNode } from "react"

const Modal = ({children}: {children: ReactNode}) => {
  return (
    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    {children}
  </DialogContent>
</Dialog>

  )
}

export default Modal