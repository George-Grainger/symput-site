import { forwardRef } from 'react';
import Image from 'next/image';

const LinkableAvatar = forwardRef((props, ref) => {
  return (
    <span className="flex items-center" ref={ref}>
      <Image {...props} />
    </span>
  );
});

export default LinkableAvatar;
