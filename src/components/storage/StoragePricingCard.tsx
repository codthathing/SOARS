import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/src/components/ui/card";
import { Check } from "lucide-react";

const pricingDetails = [
  {id: 0, title: "free", price: 0, options: ["10 GB storage", "Unlimited links", "3 collections"]},
  {id: 1, title: "pro", price: 6, options: ["100 GB storage", "Unlimited collections", "Public sharing", "Priority support"]},
  {id: 2, title: "team", price: 15, options: ["1 TB storage", "Shared workspaces", "Admin controls", "SSO"]},
];

export default function StoragePricingCard() {
  const currentSubscrition: string = "free";

  return (
    <div className="grid md:grid-cols-3 gap-y-2 md:gap-x-2">
      {pricingDetails.map(({id, title, price, options}) => {
        return (
          <Card key={id} className={`rounded-2xl shadow-none border ${title === "pro" ? "border-brownish-amber" : "border-soft-lavender"}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <span className="font-bold capitalize">{title}</span>
                {title === "pro" && <span className="bg-brownish-amber text-white py-1.25 px-3 md:py-1 lg:px-2.75 capitalize rounded-3xl text-xs md:text-sm"> popular</span>}
              </div>
              <p className="text-3xl md:text-4xl font-extrabold">${price}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            </CardHeader>
            <CardContent className="space-y-2 flex-1">
              {options.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="size-3.5 lg:size-4 text-brownish-amber" />
                  <span className="text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className={`w-full rounded-lg capitalize text-lg py-5 lg:py-6 ${title === "pro" ? "bg-brownish-amber/70 text-white" : "border border-soft-lavender bg-white text-charcoal-black"}`} disabled>{title === currentSubscrition ? "current" : "upgrade"}</Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}