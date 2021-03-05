import { forwardRef } from 'react';
import Image from 'next/image';

const LinkableAvatar = forwardRef((props, ref) => {
  return (
    <span ref={ref}>
      <Image {...props} />
    </span>
  );
});

export default LinkableAvatar;
