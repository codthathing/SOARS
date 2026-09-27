import { Bell, ChevronRight, CreditCard, Inbox, Lock, User } from "lucide-react";

const ICONS = {"profile": User, "notification": Bell, "password": Lock, "plan": CreditCard, "storage": Inbox};

type IconName = keyof typeof ICONS;

const settingsDetails: {id: number; title: string; options: {id: number; icon: IconName; text: string }[]}[] = [
  {id: 0, title: "account", options: [{id: 0, icon: "profile", text: "profile"}, {id: 1, icon: "password", text: "password & security"}]},
  {id: 1, title: "preferences", options: [{id: 0, icon: "notification", text: "notifications"}]},
  {id: 2, title: "billing", options: [{id: 0, icon: "plan", text: "plan"}, {id: 1, icon: "storage", text: "storage"}]},
]

export default function SettingsOptions() {
  return (
    <>
      {settingsDetails.map(({id, title, options}) => {
        return (
          <div key={id} className="flex flex-col gap-y-1 md:gap-y-2 lg:gap-y-1.5">
            <h1 className="capitalize text-charcoal-black/50 font-semibold text-sm md:text-lg lg:text-sm">{title}</h1>
            <section className="flex flex-col divide-.5soft-lavender divide-y bg-white rounded-xl border border-soft-lavender">
              {options.map(({id, icon, text}) => {
                const Icon = ICONS[icon];

                return (
                  <div key={id} className="px-3.5 py-3 md:p-4 flex justify-between items-center">
                    <div className="flex items-center gap-x-2 md:gap-x-3 lg::gap-x-2.5">
                      <Icon className="size-3.5 md:size-5.5 lg:size-4.5 text-brownish-amber" />
                      <span className="capitalize text-charcoal-black text-sm md:text-lg lg:text-sm">{text}</span> 
                    </div>
                    <ChevronRight className="text-charcoal-black size-3 md:size-5 lg:size-4" />
                  </div>
                )
              })}
            </section>
          </div>
        )
      })}
    </>
  )
}