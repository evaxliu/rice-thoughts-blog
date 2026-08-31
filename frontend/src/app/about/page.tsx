import Image from "next/image";
import keng from "../../../public/Kengdoru.png";
import lilac from "../../../public/LilacPlanet.png";
import { Eyebrow, Page } from "../components/Postfeed";

export default function About() {
  const featured = [
    {
      image: keng,
      author: "Kengli Fu",
      title: "Writer",
      description:
        "A guy who likes rice and thinks. An essay on food, society and politics.",
    },
    {
      image: lilac,
      author: "Eva L",
      title: "Developer",
      description: "Builds and maintains the site.",
    },
  ];

  return (
    <Page>
      <main className="border-t border-line pt-8 md:pt-11">
        <Eyebrow>ABOUT</Eyebrow>
        <h1 className="mt-4 font-serif text-3xl font-normal text-balance text-ink-strong sm:text-4xl md:text-display">
          A guy who likes rice and thinks
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
          Rice Thoughts is an independent blog about food, society and politics, and the
          places where the three run into each other.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Most weeks that means an essay. Some weeks it means a food review, because
          restaurants are politics too, and because we have to eat.
        </p>

        <ul className="mt-10 border-t border-line-soft">
          {featured.map((person) => (
            <li
              key={person.author}
              className="flex items-center gap-4 border-b border-line-soft py-6 sm:gap-5"
            >
              <Image
                className="size-14 shrink-0 rounded-full object-contain sm:size-16"
                width={120}
                height={120}
                src={person.image}
                alt={person.author}
                priority
              />
              <div className="min-w-0">
                <div className="font-serif text-lg text-ink sm:text-xl">{person.author}</div>
                <div className="mt-1 text-sm text-faint">{person.title}</div>
                {person.description && (
                  <p className="mt-2 text-sm leading-normal text-muted sm:text-base">
                    {person.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Page>
  );
}