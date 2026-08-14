import Image from "next/image";

interface AuthPageDetails {
  image: string;
  title: string;
  text: string
}

export default function AuthPageDetails({ image, title, text }: AuthPageDetails) {
  return (
    <div className="flex flex-col items-center gap-y-4 mb-6 lg:gap-y-1">
      <Image src={image} alt={`${title} icon`} width={100} height={100} className="h-20 w-20 rounded-md md:w-25 md:h-25 lg:w-17.5 lg:h-17.5" />
      <h1 className="capitalize text-amber-600 text-2xl font-bold md:text-4xl lg:text-2xl">{title}</h1>
      <p className="text-center text-xs text-charcoal-black md:text-base lg:text-sm">{text}</p>
    </div>
  );
}
