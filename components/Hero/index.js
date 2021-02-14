import Link from 'next/link';
import Triangle from '@/components/triangle';

const Hero = () => (
  <section className="min-h-1.1v relative pt-16 pb-32 flex content-center items-center justify-center">
    <div
      className="absolute top-0 w-full h-full bg-center bg-cover"
      style={{
        backgroundImage: "url('/heroImage.jpg')"
      }}
    >
      <span
        id="blackOverlay"
        className="w-full h-full absolute opacity-75 bg-black"
      ></span>
    </div>
    <div className="container relative mx-auto items-center flex flex-wrap">
      <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
        <h1 className="text-white font-semibold text-5xl">
          Simplifying the communication of maths
        </h1>
        <p className="mt-6 text-lg text-white">It's logical</p>
        <Link href="/aims">
          <button className="btn btn-yellow-inverted mt-6">
            See an overview
          </button>
        </Link>
      </div>
    </div>
    <Triangle color="text-white" />
  </section>
);
export default Hero;
