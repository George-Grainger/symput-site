import Link from 'next/link';
import Image from 'next/image';
import Typed from 'react-rotating-text';
import { useContext } from 'react';
import { LandingConext } from '@/lib/context';
import PlayIcon from '../Icons/PlayIcon';

const Hero = () => {
  const { hero_i18n } = useContext(LandingConext);
  const {
    title_i18n,
    subtitle_i18n,
    buttonText_i18n,
    playButtonText_i18nP1,
    playButtonText_i18nP2
  } = hero_i18n;
  return (
    <section className="min-h-1.1v relative section-default-padding flex content-center items-center justify-center text-white font-semibold">
      <div className="absolute h-full w-full top-0">
        <Image
          quality={25}
          alt="Hero image"
          src="/images/heroImage.jpg"
          layout="fill"
          objectFit="cover"
          priority
        />
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-75 bg-black"
        ></span>
      </div>
      <div className="container relative items-center flex flex-wrap">
        <div className="mx-auto text-center">
          <h1 className="font-semibold text-4xl sm:text-6xl">{title_i18n}</h1>
          <h2 className="my-10 text-xl sm:text-3xl">{subtitle_i18n}</h2>
          <Typed
            className="text-xl font-normal"
            items={[
              '∑(n) = ½(n)⋅(n+1)',
              'α ∈ { α, β, γ }',
              'δ ∉ { α, β, γ }',
              'ƒ: x ↦ x² : ℝ → ℝ',
              'a ⊛ b = b ⊛ a',
              '(a ⊛ b) ⊛ c = a ⊛ (b ⊛ c)',
              '∫ tanx dx = - ln|u| + C',
              '∀x, y ∈ ℝ, ∃z(x < z < y)'
            ]}
            typingInterval={60}
            deletingInterval={30}
            pause={2000}
            emptyPause={500}
          />
          <div className="mt-10 flex flex-col md:flex-row justify-center items-center">
            <Link href="/aims">
              <a className="btn btn-yellow-inverted mb-10 md:mb-0 md:mr-10">
                {buttonText_i18n}
              </a>
            </Link>
            <Link href="/">
              <a
                type="button"
                className="flex w-48 h-14 bg-white hover:bg-gray-200 text-black rounded-lg items-center justify-center"
              >
                <div className="mr-3">
                  <PlayIcon width="30" />
                </div>
                <div>
                  <div className="text-xs uppercase">
                    {playButtonText_i18nP1}
                  </div>
                  <div className="text-xl font-semibold font-sans -mt-1">
                    {playButtonText_i18nP2}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
