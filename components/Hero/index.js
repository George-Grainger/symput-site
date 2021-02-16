import Link from 'next/link';
import Image from 'next/image';

const Hero = ({ title, subtitle, buttonText }) => (
  <section className="min-h-1.1v relative pt-16 pb-32 flex content-center items-center justify-center">
    <div className="absolute h-full w-full top-0 z-0">
      <Image
        alt="Hero"
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
      <div className="max-w-prose mx-auto text-center">
        <h1 className="text-white font-semibold text-5xl">{title}</h1>
        <p className="mt-6 text-lg text-white">{subtitle}</p>
        <Link href="/aims">
          <button className="btn btn-yellow-inverted mt-6">{buttonText}</button>
        </Link>
      </div>
    </div>
  </section>
);
export default Hero;
