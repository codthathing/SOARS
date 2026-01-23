import Image from "next/image";

const optionsDetails = [
  { id: 0, image: "/assets/laptop_subimp.jpg", text: "facebook" },
  { id: 1, image: "/assets/laptop_subimp.jpg", text: "twitter" },
];

export default function AuthOption() {
  return (
    <section className="flex flex-col gap-y-3 w-full">
      <main className="flex gap-x-4">
        {optionsDetails.map(({ id, image, text }) => {
          return (
            <div key={id} className="py-2.5 rounded-md w-full flex justify-center items-center gap-x-3 bg-gray-200">
              <Image src={image} width={100} height={100} alt={`${text.toUpperCase()} Option Icon`} className="w-5 h-5 rounded-sm" />
              <span className="text-base capitalize">{text}</span>
            </div>
          );
        })}
      </main>
      <div className="flex gap-x-2 items-center">
        <span className="w-full border border-gray-200"></span>
        <span className="text-sm">Or</span>
        <span className="w-full border border-gray-200"></span>
      </div>
    </section>
  );
}
