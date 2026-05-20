import { useState } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Blend,
  Mail,
  Minus,
  PackageCheck,
  Plus,
  Sparkles,
  Sprout,
} from 'lucide-react'

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

/* Stitch "Retail Flagship" design — same content as the studio design,
   re-skinned with the Tea Atelier system: warm ivory canvas, teahouse
   green, glowing amber, porcelain cards, pill buttons, color-block bands. */

const capsLabel =
  'inline-block text-[11px] font-extrabold uppercase tracking-[0.18em] text-teahouse-green'

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
  { icon: <PackageCheck className="size-6" />, title: 'Подарочная упаковка' },
  { icon: <Blend className="size-6" />, title: 'Карточка состава' },
  { icon: <BadgeCheck className="size-6" />, title: 'Сезонные партии' },
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

function AtelierDesign({ studio }: { studio: BlendStudio }) {
  const { blend, setBlend, updateBlend, blendStats, inquiryMessage } = studio
  const [isInquiryOpen, setInquiryOpen] = useState(false)

  return (
    <div className="design-atelier min-h-screen bg-background font-sans text-on-background">
      {/* Floating navigation bar */}
      <header className="fixed top-0 left-0 z-40 w-full border-b border-atelier-ink/10 bg-warm-ivory/80 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-[1180px] items-center justify-between px-6 md:px-12">
          <a
            href="#top"
            className="text-[22px] font-extrabold tracking-tight text-teahouse-green"
          >
            Чайное Ателье
          </a>
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Главная навигация"
          >
            <a
              href="#teas"
              className="text-sm font-semibold text-atelier-ink transition-colors hover:text-teahouse-green"
            >
              Чаи
            </a>
            <a
              href="#blend"
              className="text-sm font-semibold text-atelier-ink transition-colors hover:text-teahouse-green"
            >
              Купаж
            </a>
            <a
              href="#origin"
              className="text-sm font-semibold text-atelier-ink transition-colors hover:text-teahouse-green"
            >
              Процесс
            </a>
          </nav>
          <a
            href="#blend"
            className="rounded-full bg-atelier-ink px-6 py-2.5 text-sm font-semibold text-warm-ivory shadow-[0_1px_2px_rgba(0,0,0,0.1),_0_8px_16px_rgba(26,54,41,0.12)] transition-all duration-300 hover:bg-teahouse-green active:scale-95"
          >
            Собрать купаж
          </a>
        </div>
      </header>

      <main>
        {/* Hero — asymmetric 58/42 split */}
        <section
          id="top"
          className="mx-auto flex max-w-[1180px] flex-col items-center gap-14 px-6 pt-32 pb-20 md:flex-row md:gap-10 md:px-12 md:pt-40 md:pb-28"
        >
          <div className="w-full md:w-[58%]">
            <span className="inline-block rounded-full border border-glowing-amber/30 bg-glowing-amber/12 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-on-tertiary-container">
              Ботанический чай малых партий
            </span>
            <h1 className="mt-6 text-[44px] font-bold leading-[1.08] tracking-tight text-atelier-ink md:text-[56px]">
              Чайные купажи, собранные как аромат
            </h1>
            <p className="mt-6 max-w-lg text-[19px] leading-[1.7] text-on-surface-variant">
              Премиальные чаи, выразительные ботаникалы и интерактивная студия
              купажа: смешайте сорта сами, настройте характер вкуса и сразу
              увидьте цену будущего купажа.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#blend"
                className="group inline-flex items-center gap-2 rounded-full bg-teahouse-green px-8 py-4 text-sm font-semibold text-porcelain shadow-[0_1px_2px_rgba(0,0,0,0.1),_0_12px_24px_rgba(0,98,65,0.22)] transition-all duration-300 hover:bg-atelier-ink active:scale-95"
              >
                Открыть студию
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#teas"
                className="inline-flex items-center rounded-full border border-atelier-ink/15 bg-warm-ivory px-8 py-4 text-sm font-semibold text-atelier-ink transition-all duration-300 hover:bg-surface-container active:scale-95"
              >
                Смотреть сорта
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              {heroMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-extrabold leading-none text-atelier-ink">
                    {metric.value}
                  </div>
                  <div className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-[42%]">
            <div
              className="absolute -bottom-7 -left-7 h-44 w-44 rounded-full bg-surface-container-high opacity-70 blur-3xl"
              aria-hidden="true"
            />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-lift">
              <img
                src={imagePath('hero-tea-table.webp')}
                alt="Чайный стол с фарфоровыми чашками и ботаническими ингредиентами"
                width={1717}
                height={916}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-atelier-ink/5"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-full bg-atelier-ink/92 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-warm-ivory backdrop-blur"
              style={{ animation: 'atelier-float 6s ease-in-out infinite' }}
            >
              <Sparkles className="size-4" />
              живая цена купажа
            </div>
          </div>
        </section>

        {/* Marquee band — color block */}
        <section
          aria-label="Качество и формат чая"
          className="border-y border-atelier-ink/10 bg-surface-container-low"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-y-3 px-6 py-6 md:grid-cols-4 md:px-12">
            {marquee.map((item) => (
              <span
                key={item}
                className="px-2 text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-atelier-ink/65"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Tea showcase */}
        <section
          id="teas"
          className="mx-auto max-w-[1180px] px-6 py-20 md:px-12 md:py-[92px]"
        >
          <div className="mb-12">
            <span className={capsLabel}>Чайная витрина</span>
            <h2 className="mt-4 max-w-2xl text-[32px] font-bold leading-tight tracking-tight text-atelier-ink md:text-[40px]">
              Конкретные сорта с понятной ценой за 100{NBSP}г
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teas.map((tea) => (
              <article
                key={tea.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-surface-variant/60 bg-porcelain shadow-soft transition-all duration-300 hover:shadow-lift"
              >
                <div
                  className="relative aspect-[1.14] overflow-hidden"
                  style={{ backgroundColor: '#f4efdf' }}
                >
                  <img
                    src={tea.image}
                    alt={`${tea.name}, листовой чай`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-porcelain/90 px-3 py-1 text-[12px] font-semibold text-atelier-ink backdrop-blur-sm">
                    {tea.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[22px] font-bold text-atelier-ink">
                    {tea.name}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-on-surface-variant">
                    {tea.notes}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-[18px] font-extrabold text-atelier-ink">
                      {money(tea.price)} / 100{NBSP}г
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateBlend(tea.id, (blend[tea.id] || 0) + 10)
                      }
                      aria-label={`Добавить ${tea.name} в купаж`}
                      title={`Добавить 10${NBSP}г`}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high text-atelier-ink transition-colors duration-300 hover:bg-teahouse-green hover:text-porcelain active:scale-95"
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blend studio */}
        <section id="blend" className="bg-surface-container-low py-20 md:py-[92px]">
          <div className="mx-auto grid max-w-[1180px] items-stretch gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-12">
            <div className="min-h-[420px] overflow-hidden rounded-xl shadow-lift">
              <img
                src={imagePath('blend-studio.webp')}
                alt="Рабочий стол для смешивания чайного купажа"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-xl border border-surface-variant bg-porcelain p-6 shadow-soft md:p-9">
              <span className="inline-block rounded-full border border-glowing-amber/30 bg-glowing-amber/12 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-on-tertiary-container">
                Студия купажа
              </span>
              <h2 className="mt-4 mb-6 text-[28px] font-bold leading-tight tracking-tight text-atelier-ink md:text-[34px]">
                Смешайте сорта, настройте вкус, следите за ценой
              </h2>

              <Tabs defaultValue="builder">
                <TabsList>
                  <TabsTrigger value="builder">Состав</TabsTrigger>
                  <TabsTrigger value="profile">Профиль</TabsTrigger>
                </TabsList>
                <TabsContent value="builder">
                  <div className="grid">
                    {teas.map((tea) => (
                      <div
                        key={tea.id}
                        className="grid gap-3 border-b border-atelier-ink/8 py-3.5 md:grid-cols-[1fr_auto] md:items-center"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="size-2.5 rounded-full"
                              style={{ backgroundColor: tea.color }}
                            />
                            <strong className="text-atelier-ink">
                              {tea.name}
                            </strong>
                          </div>
                          <small className="text-[13px] text-on-surface-variant">
                            {money(tea.price)} / 100{NBSP}г
                          </small>
                        </div>
                        <div className="flex items-center gap-4 md:w-[230px]">
                          <Slider
                            value={[blend[tea.id] || 0]}
                            max={80}
                            step={5}
                            onValueChange={([value]) =>
                              updateBlend(tea.id, value)
                            }
                            aria-label={`${tea.name}, граммы`}
                          />
                          <span className="w-12 text-right font-extrabold text-atelier-ink">
                            {blend[tea.id] || 0}{NBSP}г
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <div className="grid gap-3.5">
                    {Object.entries(blendStats.profile).map(([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-[84px_1fr_36px] items-center gap-3"
                      >
                        <span className="text-[13px] font-bold text-atelier-ink">
                          {flavorLabels[key as FlavorKey]}
                        </span>
                        <Progress value={value} />
                        <strong className="text-right text-[13px] font-bold text-atelier-ink">
                          {value}
                        </strong>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-lg border border-surface-variant bg-warm-ivory p-5">
                <h3 className="text-[20px] font-bold text-atelier-ink">
                  {blendStats.name}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-on-surface-variant">
                  {blendStats.entries.length
                    ? blendStats.entries
                        .map(
                          (entry) =>
                            `${entry.tea.name} ${entry.grams}${NBSP}г`,
                        )
                        .join(' + ')
                    : 'Добавьте хотя бы один сорт, чтобы собрать купаж.'}
                </p>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="text-[14px] text-on-surface-variant">
                    {blendStats.grams}{NBSP}г
                  </span>
                  <strong className="text-[28px] font-extrabold text-atelier-ink">
                    {money(blendStats.price)}
                  </strong>
                  <span className="text-right text-[14px] text-on-surface-variant">
                    {money(blendStats.pricePer100)} / 100{NBSP}г
                  </span>
                </div>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBlend({})}
                    aria-label="Очистить купаж"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border border-atelier-ink/15 bg-warm-ivory text-atelier-ink transition hover:bg-surface-container active:scale-95"
                  >
                    <Minus className="size-4" />
                  </button>
                  <Sheet open={isInquiryOpen} onOpenChange={setInquiryOpen}>
                    <SheetTrigger asChild>
                      <button
                        type="button"
                        disabled={!blendStats.grams}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-teahouse-green px-6 py-3 text-sm font-semibold text-porcelain shadow-[0_1px_2px_rgba(0,0,0,0.1),_0_12px_24px_rgba(0,98,65,0.2)] transition hover:bg-atelier-ink active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                      >
                        Оставить заявку
                        <Mail className="size-4" />
                      </button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Заявка на купаж</SheetTitle>
                        <SheetDescription>
                          Ваша заявка откроется как готовое письмо.
                        </SheetDescription>
                      </SheetHeader>
                      <form className="grid gap-3.5">
                        <Input placeholder="Ваше имя" />
                        <Input placeholder="Email" type="email" />
                        <textarea
                          readOnly
                          value={inquiryMessage}
                          className="min-h-[290px] rounded-lg border border-atelier-ink/12 bg-warm-ivory p-3.5 text-sm leading-relaxed text-atelier-ink outline-none"
                        />
                        <a
                          href={`mailto:hello@maisonleaf.example?subject=${encodeURIComponent(
                            `Заявка на купаж: ${blendStats.name}`,
                          )}&body=${encodeURIComponent(inquiryMessage)}`}
                          className="inline-flex items-center justify-center rounded-full bg-glowing-amber px-6 py-3.5 text-sm font-semibold text-atelier-ink shadow-[0_8px_24px_rgba(216,155,53,0.3)] transition hover:brightness-105 active:scale-95"
                        >
                          Открыть письмо
                        </a>
                      </form>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gifts & rituals — dark color block */}
        <section className="bg-atelier-ink py-20 md:py-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-12">
            <div>
              <span className="inline-block rounded-full border border-warm-ivory/20 bg-warm-ivory/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary-fixed-dim">
                Подарки и ритуалы
              </span>
              <h2 className="mt-5 text-[32px] font-bold leading-tight tracking-tight text-warm-ivory md:text-[40px]">
                Подобранная банка для спокойного утра и гостевого стола
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex min-h-[170px] flex-col justify-between rounded-xl border border-warm-ivory/12 bg-warm-ivory/5 p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-glowing-amber/15 text-glowing-amber">
                    {feature.icon}
                  </span>
                  <span className="text-[17px] font-bold text-warm-ivory">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Origin & process */}
        <section
          id="origin"
          className="mx-auto max-w-[1180px] px-6 py-20 md:px-12 md:py-[92px]"
        >
          <div className="mb-12">
            <span className={capsLabel}>Происхождение и процесс</span>
            <h2 className="mt-4 max-w-2xl text-[32px] font-bold leading-tight tracking-tight text-atelier-ink md:text-[40px]">
              Малые партии, быстрая фасовка и честная дегустация
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map(([step, title, copy]) => (
              <div
                key={step}
                className="rounded-xl border border-surface-variant bg-porcelain p-7 shadow-soft"
              >
                <span className="inline-block rounded-full bg-glowing-amber/15 px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.18em] text-on-tertiary-container">
                  {step}
                </span>
                <h3 className="mt-4 text-[22px] font-bold text-atelier-ink">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface-container-low py-20 md:py-[92px]">
          <div className="mx-auto grid max-w-[1180px] gap-6 px-6 md:grid-cols-3 md:px-12">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="m-0 flex flex-col gap-5 rounded-xl border border-surface-variant bg-porcelain p-6 shadow-soft"
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, отзыв о Чайном Ателье`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <blockquote className="m-0 text-[17px] font-semibold leading-snug text-atelier-ink">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption>
                  <div className="font-bold text-atelier-ink">
                    {testimonial.name}
                  </div>
                  <div className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-on-surface-variant">
                    {testimonial.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[1180px] px-6 py-20 md:px-12 md:py-[92px]">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className={capsLabel}>FAQ</span>
              <h2 className="mt-4 text-[32px] font-bold leading-tight tracking-tight text-atelier-ink md:text-[40px]">
                Короткие ответы перед первой заваркой
              </h2>
            </div>
            <div className="flex flex-col">
              {faqItems.map(([question, answer]) => (
                <details
                  key={question}
                  className="group border-b border-atelier-ink/12 py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-atelier-ink [&::-webkit-details-marker]:hidden">
                    {question}
                    <Plus className="size-5 shrink-0 text-teahouse-green transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-variant bg-porcelain">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-6 py-12 pb-24 md:flex-row md:items-center md:justify-between md:px-12 md:pb-12">
          <div className="flex items-center gap-2.5">
            <Sprout className="size-6 text-teahouse-green" />
            <strong className="text-[20px] font-extrabold tracking-tight text-teahouse-green">
              Чайное Ателье
            </strong>
          </div>
          <p className="text-[15px] text-on-surface-variant">
            Премиальные ботанические купажи, собранные онлайн.
          </p>
          <a
            href="#blend"
            className="rounded-full bg-atelier-ink px-7 py-3.5 text-sm font-semibold text-warm-ivory shadow-[0_1px_2px_rgba(0,0,0,0.1),_0_8px_16px_rgba(26,54,41,0.12)] transition-all duration-300 hover:bg-teahouse-green active:scale-95"
          >
            Собрать купаж
          </a>
        </div>
      </footer>
    </div>
  )
}

export default AtelierDesign
