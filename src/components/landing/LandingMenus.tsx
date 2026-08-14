const pageSections = [
  { id: 0, text: "features" },
  { id: 1, text: "pricing" },
  { id: 2, text: "about" },
]

export default function LandingMenus() {
  return (
    <nav role={"menu"} className={"hidden md:flex md:gap-x-8 lg:gap-x-10"}>
      {pageSections.map(({ id, text }) => <span key={id} role={"menuitem"} tabIndex={0} className={"cursor-pointer capitalize md:text-2xl lg:text-base font-light"}>{text}</span>)}
    </nav>
  )
}