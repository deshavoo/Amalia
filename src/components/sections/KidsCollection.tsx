import Image from "next/image";
import { ArrowLeft, Baby, Gem, Sparkles } from "lucide-react";

import Emblem from "@/components/brand/Emblem";
import MagneticLink from "@/components/ui/MagneticLink";
import Reveal from "@/components/ui/Reveal";

const highlights = [
    {
        icon: Baby,
        title: "تصاميم آمنة ورقيقة",
        text: "قطع خفيفة بحواف ناعمة تناسب الصغار.",
    },
    {
        icon: Gem,
        title: "أولى الهدايا الذهبية",
        text: "للسبوع، وأعياد الميلاد، وكل بداية جميلة.",
    },
    {
        icon: Sparkles,
        title: "روح أماليا بيبي",
        text: "البهجة التي عرفتِنا بها، ضمن هوية واحدة.",
    },
];

export default function KidsCollection() {
    return (
        <section
            id="kids"
            aria-labelledby="kids-title"
            className="relative overflow-hidden bg-[#f7f3ee] py-24 sm:py-32"
        >
            <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
                <Reveal>
                    <p className="amalia-eyebrow">Amalia Baby</p>
                    <h2
                        id="kids-title"
                        className="mt-4 text-3xl leading-[1.35] font-medium text-balance text-forest sm:text-4xl lg:text-5xl"
                    >
                        ذهب الأطفال… حيث بدأت الحكاية
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-forest/70">
                        مجموعة الأطفال تحافظ على إحساسها بالبهجة والرقة، داخل
                        عالم أماليا للمجوهرات الجديد. قطع صغيرة تحمل حبًا كبيرًا،
                        وتبقى ذكرى تكبر معهم.
                    </p>

                    <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                        {highlights.map(({ icon: Icon, title, text }) => (
                            <li
                                key={title}
                                className="amalia-kid-tile rounded-2xl border border-forest/10 bg-white/60 p-5"
                            >
                                <span className="grid size-11 place-items-center rounded-full bg-gold/15 text-gold-deep">
                                    <Icon size={20} strokeWidth={1.5} />
                                </span>
                                <h3 className="mt-4 text-base font-medium text-forest">
                                    {title}
                                </h3>
                                <p className="mt-1.5 text-sm leading-6 text-forest/60">
                                    {text}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10">
                        <MagneticLink href="#featured" variant="forest">
                            تسوقي مجموعة الأطفال
                            <ArrowLeft size={18} strokeWidth={1.5} />
                        </MagneticLink>
                    </div>
                </Reveal>

                <Reveal delay={0.15} className="relative">
                    <div className="relative mx-auto aspect-4/5 max-w-lg">
                        {/* Rotating orbit ring */}
                        <div
                            aria-hidden="true"
                            className="amalia-orbit absolute -inset-6 rounded-full border border-dashed border-gold/40 sm:-inset-10"
                        >
                            <span className="absolute top-1/2 -left-2 size-4 rotate-45 bg-gold" />
                            <span className="absolute -top-1.5 left-1/2 size-3 rotate-45 bg-gold-light" />
                        </div>

                        <div className="amalia-arch relative h-full overflow-hidden bg-forest">
                            <Image
                                src="/images/detail-flowers.webp"
                                alt="زهور بيضاء ناعمة بجانب علبة مجوهرات أماليا الخضراء"
                                fill
                                sizes="(min-width: 1024px) 40vw, 90vw"
                                className="object-cover transition-transform duration-[1.6s] ease-(--ease-luxe) hover:scale-110"
                            />
                        </div>

                        <div className="absolute -bottom-6 -left-4 grid size-28 place-items-center rounded-full bg-forest shadow-2xl ring-8 ring-[#f7f3ee] sm:size-32">
                            <Emblem className="amalia-spin-slow size-14" />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
