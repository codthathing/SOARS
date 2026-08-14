import Image from "next/image";

const optionsDetails = [
  { id: 0, image: "/google.svg", text: "google" },
  { id: 1, image: "/twitter.svg", text: "twitter" },
];

export default function AuthOption() {
  return (
    <section className="flex flex-col gap-y-3 w-full md:gap-y-6">
      <main className="flex gap-x-4">
        {optionsDetails.map(({ id, image, text }) => {
          return (
            <div key={id} className="py-2.5 rounded-md w-full flex justify-center items-center gap-x-2 bg-light-gray md:py-3.5 lg:py-2.5">
              <Image src={image} width={100} height={100} alt={`${text.toUpperCase()} Option Icon`} className="w-4 h-4 rounded-sm md:w-5 md:h-5 lg:w-3.5 lg:h-3.5" />
              <span className="text-sm capitalize text-charcoal-black md:text-xl lg:text-base">{text}</span>
            </div>
          );
        })}
      </main>
      <div className="flex gap-x-2 items-center">
        <span className="w-full border border-light-gray"></span>
        <span className="text-xs text-charcoal-black md:text-base lg:text-sm">Or</span>
        <span className="w-full border border-light-gray"></span>
      </div>
    </section>
  );
}
