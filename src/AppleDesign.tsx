import { type ReactNode, useEffect, useRef, useState } from 'react'
import { BadgeCheck, Blend, Minus, PackageCheck } from 'lucide-react'

import './AppleDesign.css'
import { Input } from './components/ui/input'
import { Progress } from './components/ui/progress'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './components/ui/sheet'
import { Slider } from './components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import {
  type BlendStudio,
  type FlavorKey,
  flavorLabels,
  imagePath,
  money,
  NBSP,
  teas,
  testimonials,
} from './tea-data'

/* Apple "Retail Gallery" design — same content as the other two designs,
   re-skinned in Apple's language: edge-to-edge tiles alternating white /
   parchment / near-black, one quiet blue accent, photography-first,
   SF Pro typography, exactly one product shadow. Tile content fades and
   rises into view on scroll (the one piece of motion Apple.com itself uses). */

/** Wraps a tile's content so it fades + rises once it scrolls into view. */
function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`apple-reveal${shown ? ' is-shown' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      {children}
    </div>
  )
}

const heroMetrics = [
  { value: '6', label: 'фирменных сортов' },
  { value: `48${NBSP}ч`, label: 'ручная фасовка' },
  { value: `100${NBSP}г`, label: 'минимум купажа' },
]

const marquee = [
  'листья одного происхождения',
  'ботанические настои',
  'цена меняется сразу',
  'подарочная упаковка',
]

const features = [
  { icon: <PackageCheck className="size-7" />, title: 'Подарочная упаковка' },
  { icon: <Blend className="size-7" />, title: 'Карточка состава' },
  { icon: <BadgeCheck className="size-7" />, title: 'Сезонные партии' },
]

const processSteps: [string, string, string][] = [
  ['01', 'Отбор', 'Пробуем лист, аромат и послевкусие до закупки'],
  ['02', 'Купаж', 'Взвешиваем основу, акценты и ботаникалы по граммам'],
  [
    '03',
    'Фасовка',
    `Запечатываем банку в течение 48${NBSP}часов после заявки`,
  ],
]

const faqItems: [string, string][] = [
  [
    'Можно купить прямо на странице?',
    'Да. Кнопка откроет готовое письмо с выбранным купажом.',
  ],
  [
    'Как считается цена купажа?',
    `Каждый грамм считается от цены выбранного сорта за 100${NBSP}г. Итог показывает общую сумму и пересчет за 100${NBSP}г.`,
  ],
  [
    'Можно собрать купаж без кофеина?',
    'Да. Уберите чаи с кофеином и соберите основу на Гибискус Роза.',
  ],
]

function AppleDesign({ studio }: { studio: BlendStudio }) {
  const { blend, setBlend, updateBlend, blendStats, inquiryMessage } = studio
  const [isInquiryOpen, setInquiryOpen] = useState(false)

  return (
    <div className="design-apple min-h-screen bg-white text-apple-ink">
      {/* Global navigation — thin black bar */}
      <header className="fixed top-0 left-0 z-40 w-full bg-black">
        <div className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-6">
          <a
            href="#top"
            className="text-[15px] font-semibold tracking-tight text-white"
          >
            Чайное Ателье
          </a>
          <nav
            className="flex items-center gap-5 text-[12px] text-white/85 sm:gap-7"
            aria-label="Главная навигация"
          >
            <a href="#teas" className="transition-opacity hover:opacity-60">
              Чаи
            </a>
            <a href="#blend" className="transition-opacity hover:opacity-60">
              Купаж
            </a>
            <a href="#origin" className="transition-opacity hover:opacity-60">
              Процесс
            </a>
            <a
              href="#blend"
              className="text-apple-sky transition-opacity hover:opacity-60"
            >
              Собрать купаж
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero tile — white */}
        <section id="top" className="bg-white px-6 pt-[112px] pb-20 text-center">
          <Reveal>
            <p className="text-[14px] text-apple-ink/55">
              Ботанический чай малых партий
            </p>
            <h1 className="mx-auto mt-3 max-w-[820px] text-[40px] font-semibold leading-[1.07] tracking-[-0.02em] text-apple-ink md:text-[56px]">
              Чайные купажи, собранные как аромат
            </h1>
            <p className="mx-auto mt-5 max-w-[600px] text-[19px] leading-[1.45] text-apple-ink/80 md:text-[21px]">
              Премиальные чаи, выразительные ботаникалы и интерактивная студия
              купажа: смешайте сорта сами, настройте характер вкуса и сразу
              увидьте цену будущего купажа.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href="#blend"
                className="rounded-full bg-apple-blue px-[22px] py-[11px] text-[17px] text-white transition active:scale-95"
              >
                Открыть студию
              </a>
              <a
                href="#teas"
                className="rounded-full border border-apple-blue px-[22px] py-[11px] text-[17px] text-apple-blue transition active:scale-95"
              >
                Смотреть сорта
              </a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-x-14 gap-y-5">
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-[28px] font-semibold text-apple-ink">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-[14px] text-apple-ink/55">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto mt-14 max-w-[980px]">
              <img
                src={imagePath('hero-tea-table.webp')}
                alt="Чайный стол с фарфоровыми чашками и ботаническими ингредиентами"
                width={1717}
                height={916}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-[18px] shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
              />
            </div>
          </Reveal>
        </section>

        {/* Marquee — quiet hairline divider strip */}
        <section
          aria-label="Качество и формат чая"
          className="border-y border-apple-hairline bg-white"
        >
          <Reveal className="mx-auto flex max-w-[1024px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-5 text-[13px] text-apple-ink/55">
            {marquee.map((item, index) => (
              <span key={item} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden className="text-apple-ink/25">
                    •
                  </span>
                )}
                {item}
              </span>
            ))}
          </Reveal>
        </section>

        {/* Tea showcase — parchment tile */}
        <section id="teas" className="bg-apple-parchment px-6 py-20">
          <Reveal className="mx-auto max-w-[1024px]">
            <h2 className="mx-auto max-w-[760px] text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-apple-ink md:text-[40px]">
              Конкретные сорта с понятной ценой за 100{NBSP}г
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teas.map((tea) => (
                <article
                  key={tea.id}
                  className="flex flex-col rounded-[18px] border border-apple-hairline bg-white p-6"
                >
                  <div className="overflow-hidden rounded-[8px] bg-apple-parchment">
                    <img
                      src={tea.image}
                      alt={`${tea.name}, листовой чай`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                  <p className="mt-4 text-[13px] text-apple-ink/55">
                    {tea.type}
                  </p>
                  <h3 className="mt-1 text-[17px] font-semibold text-apple-ink">
                    {tea.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[14px] leading-[1.45] text-apple-ink/65">
                    {tea.notes}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[17px] text-apple-ink">
                      {money(tea.price)} / 100{NBSP}г
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateBlend(tea.id, (blend[tea.id] || 0) + 10)
                      }
                      aria-label={`Добавить ${tea.name} в купаж`}
                      className="text-[17px] text-apple-blue transition active:scale-95"
                    >
                      Добавить ›
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Blend studio — white tile */}
        <section id="blend" className="bg-white px-6 py-20">
          <Reveal className="mx-auto max-w-[860px]">
            <p className="text-center text-[14px] text-apple-ink/55">
              Студия купажа
            </p>
            <h2 className="mx-auto mt-2 max-w-[720px] text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-apple-ink md:text-[40px]">
              Смешайте сорта, настройте вкус, следите за ценой
            </h2>
            <div className="mt-12">
              <img
                src={imagePath('blend-studio.webp')}
                alt="Рабочий стол для смешивания чайного купажа"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-full rounded-[18px] shadow-[3px_5px_30px_rgba(0,0,0,0.22)]"
              />
            </div>

            <div className="mt-10 rounded-[18px] border border-apple-hairline p-6 md:p-8">
              <Tabs defaultValue="builder">
                <TabsList className="mx-auto">
                  <TabsTrigger value="builder">Состав</TabsTrigger>
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                </TabsList>
                <TabsContent value="builder">
                  <div className="grid">
                    {teas.map((tea) => (
                      <div
                        key={tea.id}
                        className="grid gap-2 border-b border-apple-hairline py-3.5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center md:gap-6"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: tea.color }}
                            />
                            <span className="text-[15px] font-semibold text-apple-ink">
                              {tea.name}
                            </span>
                          </div>
                          <span className="text-[13px] text-apple-ink/55">
                            {money(tea.price)} / 100{NBSP}г
                          </span>
                        </div>
                        <div className="flex items-center gap-4 md:w-[250px]">
                          <Slider
                            value={[blend[tea.id] || 0]}
                            max={80}
                            step={5}
                            onValueChange={([value]) =>
                              updateBlend(tea.id, value)
                            }
                            aria-label={`${tea.name}, граммы`}
                          />
                          <span className="w-12 text-right text-[15px] font-semibold text-apple-ink">
                            {blend[tea.id] || 0}{NBSP}г
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <div className="grid gap-4">
                    {Object.entries(blendStats.profile).map(([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[90px_1fr_36px] items-center gap-3"
                      >
                        <span className="text-[14px] text-apple-ink">
                          {flavorLabels[key as FlavorKey]}
                        </span>
                        <Progress value={value} />
                        <span className="text-right text-[14px] font-semibold text-apple-ink">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-[12px] bg-apple-parchment p-5">
                <div className="text-[17px] font-semibold text-apple-ink">
                  {blendStats.name}
                </div>
                <p className="mt-1 text-[14px] leading-[1.45] text-apple-ink/60">
                  {blendStats.entries.length
                    ? blendStats.entries
                        .map(
                          (entry) =>
                            `${entry.tea.name} ${entry.grams}${NBSP}г`,
                        )
                        .join(' + ')
                    : 'Добавьте хотя бы один сорт, чтобы собрать купаж.'}
                </p>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 border-t border-apple-hairline pt-4">
                  <span className="text-[14px] text-apple-ink/60">
                    {blendStats.grams}{NBSP}г
                  </span>
                  <span className="text-[28px] font-semibold text-apple-ink">
                    {money(blendStats.price)}
                  </span>
                  <span className="text-[14px] text-apple-ink/60">
                    {money(blendStats.pricePer100)} / 100{NBSP}г
                  </span>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBlend({})}
                    aria-label="Очистить купаж"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-apple-hairline bg-white text-apple-ink transition active:scale-95"
                  >
                    <Minus className="size-4" />
                  </button>
                  <Sheet open={isInquiryOpen} onOpenChange={setInquiryOpen}>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        disabled={!blendStats.grams}
                        className="flex-1 rounded-full bg-apple-blue px-6 py-3 text-[17px] text-white transition active:scale-95 disabled:pointer-events-none disabled:opacity-40"
                      >
                        Оставить заявку
                      </button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Заявка на купаж</SheetTitle>
                        <SheetDescription>
                          Ваша заявка откроется как готовое письмо.
                        </SheetDescription>
                      </SheetHeader>
                      <form className="grid gap-3">
                        <Input placeholder="Ваше имя" />
                        <Input placeholder="Email" type="email" />
                        <textarea
                          readOnly
                          value={inquiryMessage}
                          className="min-h-[290px] rounded-[8px] border border-apple-hairline bg-white p-3.5 text-[14px] leading-relaxed text-apple-ink outline-none"
                        />
                        <a
                          href={`mailto:hello@maisonleaf.example?subject=${encodeURIComponent(
                            `Заявка на купаж: ${blendStats.name}`,
                          )}&body=${encodeURIComponent(inquiryMessage)}`}
                          className="inline-flex items-center justify-center rounded-full bg-apple-blue px-[22px] py-[11px] text-[17px] text-white transition active:scale-95"
                        >
                          Открыть письмо
                        </a>
                      </form>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Gifts & rituals — dark tile */}
        <section className="bg-apple-tile px-6 py-24 text-center">
          <Reveal className="mx-auto max-w-[900px]">
            <p className="text-[14px] text-[#cccccc]">Подарки и ритуалы</p>
            <h2 className="mx-auto mt-3 max-w-[720px] text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-white md:text-[40px]">
              Подобранная банка для спокойного утра и гостевого стола
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="text-apple-sky">{feature.icon}</span>
                  <span className="text-[19px] font-semibold text-white">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Origin & process — white tile */}
        <section id="origin" className="bg-white px-6 py-20">
          <Reveal className="mx-auto max-w-[1024px]">
            <p className="text-center text-[14px] text-apple-ink/55">
              Происхождение и процесс
            </p>
            <h2 className="mx-auto mt-2 max-w-[760px] text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-apple-ink md:text-[40px]">
              Малые партии, быстрая фасовка и честная дегустация
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
              {processSteps.map(([step, title, copy]) => (
                <div key={step} className="text-center">
                  <div className="text-[40px] font-semibold text-apple-ink/15">
                    {step}
                  </div>
                  <h3 className="mt-2 text-[21px] font-semibold text-apple-ink">
                    {title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[280px] text-[15px] leading-[1.5] text-apple-ink/65">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Testimonials — parchment tile */}
        <section className="bg-apple-parchment px-6 py-20">
          <Reveal className="mx-auto grid max-w-[1024px] gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="m-0 flex flex-col rounded-[18px] border border-apple-hairline bg-white p-6"
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, отзыв о Чайном Ателье`}
                  loading="lazy"
                  decoding="async"
                  className="size-14 rounded-full object-cover"
                />
                <blockquote className="m-0 mt-4 flex-1 text-[17px] leading-[1.45] text-apple-ink">
                  «{testimonial.quote}»
                </blockquote>
                <figcaption className="mt-4">
                  <div className="text-[15px] font-semibold text-apple-ink">
                    {testimonial.name}
                  </div>
                  <div className="mt-0.5 text-[13px] text-apple-ink/55">
                    {testimonial.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </section>

        {/* FAQ — white tile */}
        <section className="bg-white px-6 py-20">
          <Reveal className="mx-auto max-w-[800px]">
            <h2 className="text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] text-apple-ink md:text-[40px]">
              Короткие ответы перед первой заваркой
            </h2>
            <div className="mt-10">
              {faqItems.map(([question, answer]) => (
                <details
                  key={question}
                  className="group border-b border-apple-hairline py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[19px] text-apple-ink [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="text-[26px] font-light leading-none text-apple-blue transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-[1.5] text-apple-ink/65">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer — parchment */}
      <footer className="bg-apple-parchment px-6 pt-16 pb-28">
        <Reveal className="mx-auto flex max-w-[1024px] flex-col items-center gap-5 text-center">
          <strong className="text-[17px] font-semibold text-apple-ink">
            Чайное Ателье
          </strong>
          <p className="text-[15px] text-apple-ink/65">
            Премиальные ботанические купажи, собранные онлайн.
          </p>
          <a
            href="#blend"
            className="rounded-full bg-apple-blue px-[22px] py-[11px] text-[17px] text-white transition active:scale-95"
          >
            Собрать купаж
          </a>
          <p className="mt-3 text-[12px] text-apple-ink/45">
            © 2026 Чайное Ателье. Все права защищены.
          </p>
        </Reveal>
      </footer>
    </div>
  )
}

export default AppleDesign
