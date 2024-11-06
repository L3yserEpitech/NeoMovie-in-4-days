import Marquee from "@/components/ui/marquee";

const logos = [
  {
    name: "wallpaper_1",
    img: "/affiche1.jpg",
  },
  {
    name: "wallpaper_2",
    img: "/affiche2.jpg",
  },
  {
    name: "wallpaper_3",
    img: "/affiche3.jpg",
  },
  {
    name: "wallpaper_4",
    img: "/affiche4.jpg",
  },
  {
    name: "wallpaper_5",
    img: "/affiche5.jpg",
  },
  {
    name: "wallpaper_6",
    img: "/affiche6.jpg",
  },
  {
    name: "wallpaper_7",
    img: "/affiche7.jpg",
  },
  {
    name: "wallpaper_8",
    img: "/affiche8.jpg",
  },
];

export function Marquee3D() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg px-20 md:shadow-xl">
      <div className="flex flex-row gap-4 [perspective:500px]">
        <Marquee
          className="h-full justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
        >
          {logos.map((data, idx) => (
            <img
              key={idx}
              src={data.img}
              alt={data.name}
              className="mx-auto h-full w-3/5 cursor-pointer rounded-xl border border-neutral-700 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
            />
          ))}
        </Marquee>
        <Marquee
          className="h-full justify-center overflow-hidden [--duration:60s] [--gap:1rem]"
          vertical
          style={{
            transform:
              "translateX(0px) translateY(0px) translateZ(-50px) rotateX(0deg) rotateY(-20deg) rotateZ(10deg) scale(1.5)",
          }}
          reverse
        >
          {logos.map((data, idx) => (
            <img
              key={idx}
              src={data.img}
              alt={data.name}
              className="mx-auto h-full w-4/5 cursor-pointer rounded-xl border border-neutral-700 transition-all duration-300 hover:ring-1 hover:ring-neutral-300"
            />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3  from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3  from-white dark:from-background"></div>
    </div>
  );
}
