import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div className="contain sm:flex sm:justify-evenly sm:items-center">
      <div className="items-start flex flex-col justify-evenly sm:h-[80%] sm:w-[60%] sm:align-center">
        <h1 className="header p-5">
          Detect Defetcs
          <br />
          In Buildings.
        </h1>
        <p className="para p-5">
          Find defects in buildings
          <br />
          using deep learning technologies.
        </p>
        <Link href="/preprocess">
          <button className="cta-solid mx-5">GET STARTED</button>
        </Link>
      </div>
      <div className="h-[50%] w-[100%]">
        <Image
          className="object-cover rounded-xl"
          src="/Hero.png"
          width={500}
          height={300}
          alt="hero-image"
          layout="responsive"
        />
      </div>
    </div>
  );
}

export default Hero;
