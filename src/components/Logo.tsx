import Image from "next/image";
import Link from "next/link";

import logo from "../../public/images/logo.png";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        height={50}
        width={130}
        alt="lms-logo"
        priority
        className="object-cover"
      />
    </Link>
  );
};

export default Logo;
