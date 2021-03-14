import Link from 'next/link';
import Image from 'next/image';

const Hero = ({ title, subtitle, buttonText }) => (
  <section className="min-h-1.1v relative section-default-padding flex content-center items-center justify-center text-white font-semibold">
    <div className="absolute h-full w-full top-0">
      <Image
        quality={25}
        alt="Hero image"
        src="/heroImage.jpg"
        layout="fill"
        objectFit="cover"
        priority
      />
      <span
        id="blackOverlay"
        className="w-full h-full absolute opacity-75 bg-black"
      ></span>
    </div>
    <div className="container relative items-center flex flex-wrap px-4">
      <div className="mx-auto text-center">
        <h1 className="font-semibold text-5xl">{title}</h1>
        <h2 className="mt-10 text-xl">{subtitle}</h2>
        <Link href="/aims">
          <a className="btn btn-yellow-inverted a-btn mt-10">{buttonText}</a>
        </Link>
      </div>
    </div>
  </section>
);
export default Hero;
