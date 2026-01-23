import Image from "next/image";

export default function AuthPageDetails({ image, title, text }: { image: string; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-y-4 mb-6">
      <Image src={image} alt={`${title} icon`} width={100} height={100} className="h-20 w-20 rounded-md" />
      <h1 className="capitalize text-blue-600 text-2xl font-bold">{title}</h1>
      <p className="text-center text-xs">{text}</p>
    </div>
  );
}
