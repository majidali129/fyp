import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
}

let loading = false;

const SubmitBtn = ({ children }: ButtonProps) => {
  return (
    <Button disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait{" "}
        </>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};

export default SubmitBtn;

{
  /* <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> */
}
