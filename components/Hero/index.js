import Link from 'next/link';
import Image from 'next/image';
import Typed from 'react-rotating-text';

const Hero = ({ title, subtitle, buttonText }) => (
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
        <h1 className="font-semibold text-4xl sm:text-6xl">{title}</h1>
        <h2 className="my-10 text-xl sm:text-3xl">{subtitle}</h2>
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
        <Link href="/aims">
          <a className="btn btn-yellow-inverted a-btn mt-10">{buttonText}</a>
        </Link>
      </div>
    </div>
  </section>
);
export default Hero;
