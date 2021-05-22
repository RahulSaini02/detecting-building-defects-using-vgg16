import Head from "next/head";
import About from "../components/About";
import Defects from "../components/Defects";
import Hero from "../components/Hero";
import Technologies from "../components/Technologies";

export default function Home() {
  return (
    <div className="scrollbar-hide">
      <Head>
        <title>Building Defects Detection</title>
        <meta
          name="description"
          content="Detection of defects including cracks and flakes on wall surface in high-rise buildings using deep learning technologies like VGG16, CNN, KERAS, TENSORFLOW "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        {/* <Technologies /> */}
        <About />
        <Defects />
      </main>
    </div>
  );
}
