import { forwardRef } from 'react';
import Image from 'next/image';

const LinkableAvatar = forwardRef((props, ref) => {
  return (
    <button className="flex items-center" ref={ref}>
      <Image {...props} />
    </button>
  );
});

export default LinkableAvatar;
