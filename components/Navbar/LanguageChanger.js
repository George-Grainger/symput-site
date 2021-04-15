import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChinaIcon, UAEIcon, UKIcon } from '../Icons/LanguageIcons';

const LanguageChanger = ({ title }) => {
  const router = useRouter();
  const { pathname, query } = router;
  return (
    <>
      <p className="prose-lg w-full">{title}</p>
      <div className="flex my-4">
        <Link href={{ pathname, query }} locale="en" scroll={false}>
          <a
            aria-label="Switch language to English"
            className="link-standard language-button button-on-bg"
          >
            <UKIcon className="h-10 w-10" />
          </a>
        </Link>
        <Link href={{ pathname, query }} locale="ar" scroll={false}>
          <a
            aria-label="تبديل اللغة إلى العربية"
            className="link-standard language-button button-on-bg"
          >
            <UAEIcon className="h-10 w-10" />
          </a>
        </Link>
        <Link href={{ pathname, query }} locale="zh-cn" scroll={false}>
          <a
            aria-label="将语言切换为中文"
            className="link-standard language-button button-on-bg"
          >
            <ChinaIcon className="h-10 w-10" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default LanguageChanger;
