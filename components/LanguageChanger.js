import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChinaIcon, UAEIcon, UKIcon } from './Icons/LanguageIcons';

const LanguageChanger = ({ title }) => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      {/*//TODO need to credit images to https://www.flaticon.com/search?word=countries%20flags */}
      <p className="prose-lg w-full">{title}</p>
      <div className="flex my-4">
        <Link href={pathname} locale="en" scroll={false}>
          <button
            aria-label="Switch language to English"
            className="link-standard language-button"
          >
            <UKIcon className="h-10 w-10" />
          </button>
        </Link>
        <Link href={pathname} locale="ar" scroll={false}>
          <button
            aria-label="تبديل اللغة إلى العربية"
            className="link-standard language-button"
          >
            <UAEIcon className="h-10 w-10" />
          </button>
        </Link>
        <Link href={pathname} locale="zh-cn" scroll={false}>
          <button
            aria-label="将语言切换为中文"
            className="link-standard language-button"
          >
            <ChinaIcon className="h-10 w-10" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default LanguageChanger;
