import Image from "next/image";

function Defects() {
  return (
    <div className="contain mb-14">
      <header className="sub-header text-center">
        <h2>defects</h2>
      </header>
      <div className="pt-10 sm:pt-14">
        <div className="defect sm:flex-row">
          <div className="defect-header">
            <h2 className="sub-header-1 mb-4">Cracks</h2>
            <p className="para">
              A building component develops cracks
              <br /> whenever stress in the component
              <br /> exceeds its strength
            </p>
          </div>
          <div className="h-[40%] mt-8">
            <Image
              src="/cracks.jpeg"
              className="object-cover rounded-2xl"
              height={300}
              width={500}
              alt="crack"
            />
          </div>
        </div>
        <div className="defect sm:flex-row-reverse">
          <div className="defect-header">
            <h2 className="sub-header-1 mb-4">Flakes</h2>
            <p className="para">
              A small, flat, very thin piece of
              <br /> something, typically been peeled off
              <br /> from a larger piece.
            </p>
          </div>
          <div className="h-[40%] mt-8">
            <Image
              src="/flakes.jpeg"
              className="object-cover rounded-2xl"
              height={300}
              width={500}
              alt="flakes"
            />
          </div>
        </div>
        <div className="defect sm:flex-row">
          <div className="defect-header">
            <h2 className="sub-header-1 mb-4">Roof</h2>
            <p className="para">
              Defects in roofs are often due to
              <br /> Inappropriate design.
            </p>
          </div>
          <div className="h-[40%] mt-8">
            <Image
              src="/roof.jpeg"
              className="object-cover rounded-2xl"
              height={300}
              width={500}
              alt="roof"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Defects;
