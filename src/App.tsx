import { useMemo, useState } from 'react'
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
import { motion, useScroll, useTransform } from 'framer-motion'

import './App.css'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel'
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'

const imagePath = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/${fileName}`
const NBSP = '\u00A0'

type Tea = {
  id: string
  name: string
  type: string
  price: number
  image: string
  notes: string
  color: string
  profile: Record<FlavorKey, number>
}

type FlavorKey = 'floral' | 'citrus' | 'spice' | 'earthy' | 'caffeine'

const flavorLabels: Record<FlavorKey, string> = {
  floral: 'Цветы',
  citrus: 'Цитрус',
  spice: 'Пряность',
  earthy: 'Терпкость',
  caffeine: 'Кофеин',
}

const teas: Tea[] = [
  {
    id: 'sencha',
    name: 'Сенча Луг',
    type: 'Японский зеленый',
    price: 990,
    image: imagePath('sencha-meadow.png'),
    notes: 'Весенняя трава, сладкая кукуруза, чистый морской воздух.',
    color: '#7a9f3f',
    profile: { floral: 24, citrus: 38, spice: 8, earthy: 62, caffeine: 56 },
  },
  {
    id: 'earl-grey',
    name: 'Эрл Грей Бархат',
    type: 'Черный чай',
    price: 890,
    image: imagePath('earl-grey-velvet.png'),
    notes: 'Цедра бергамота, василек, мягкий какао-танин.',
    color: '#384235',
    profile: { floral: 42, citrus: 78, spice: 12, earthy: 48, caffeine: 72 },
  },
  {
    id: 'jasmine',
    name: 'Жасмин Серебро',
    type: 'Белый чай',
    price: 1290,
    image: imagePath('jasmine-silver.png'),
    notes: 'Серебристые почки, цветущий жасмин, кожица груши.',
    color: '#b8c5a6',
    profile: { floral: 88, citrus: 26, spice: 4, earthy: 24, caffeine: 34 },
  },
  {
    id: 'masala',
    name: 'Масала Уголь',
    type: 'Пряный чай',
    price: 940,
    image: imagePath('masala-ember.png'),
    notes: 'Кардамон, имбирное тепло, копченая корица.',
    color: '#b35d26',
    profile: { floral: 8, citrus: 18, spice: 92, earthy: 58, caffeine: 68 },
  },
  {
    id: 'hibiscus',
    name: 'Гибискус Роза',
    type: 'Травяной настой',
    price: 760,
    image: imagePath('hibiscus-rose.png'),
    notes: 'Рубиновый гибискус, шиповник, апельсиновая свежесть.',
    color: '#b13e4a',
    profile: { floral: 76, citrus: 72, spice: 18, earthy: 12, caffeine: 0 },
  },
  {
    id: 'matcha',
    name: 'Матча Облако',
    type: 'Церемониальная матча',
    price: 1490,
    image: imagePath('matcha-cloud.png'),
    notes: 'Сливочная зелень, миндальное молоко, умами-финиш.',
    color: '#4e8d35',
    profile: { floral: 18, citrus: 22, spice: 5, earthy: 82, caffeine: 86 },
  },
]

const starterBlend: Record<string, number> = {
  sencha: 35,
  jasmine: 25,
  hibiscus: 15,
}

const testimonials = [
  {
    quote: 'Студия купажа делает подарок личным, но не усложняет покупку.',
    name: 'Мира К.',
    role: 'собирает подарочные купажи',
    image: imagePath('testimonial-mira.png'),
  },
  {
    quote: 'Эрл Грей достаточно строгий для рабочих утр и достаточно мягкий для вечера.',
    name: 'Йонас Р.',
    role: 'выбирает черные чаи',
    image: imagePath('testimonial-jonas.png'),
  },
  {
    quote: 'Живой профиль вкуса помог собрать цветочный купаж с низким кофеином за пару минут.',
    name: 'Алина С.',
    role: 'любит легкие настои',
    image: imagePath('testimonial-alina.png'),
  },
]

function money(value: number) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`
}

function App() {
  const [blend, setBlend] = useState<Record<string, number>>(starterBlend)
  const [isInquiryOpen, setInquiryOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.28], [0, -86])
  const heroDepth = useTransform(scrollYProgress, [0, 0.28], [0, 46])

  const blendStats = useMemo(() => {
    const entries = teas
      .map((tea) => ({ tea, grams: blend[tea.id] || 0 }))
      .filter((entry) => entry.grams > 0)
    const grams = entries.reduce((sum, entry) => sum + entry.grams, 0)
    const price = entries.reduce(
      (sum, entry) => sum + (entry.tea.price / 100) * entry.grams,
      0,
    )
    const profile = Object.fromEntries(
      Object.keys(flavorLabels).map((key) => {
        const flavor = key as FlavorKey
        const weighted =
          grams === 0
            ? 0
            : entries.reduce(
                (sum, entry) =>
                  sum + entry.tea.profile[flavor] * entry.grams,
                0,
              ) / grams

        return [flavor, Math.round(weighted)]
      }),
    ) as Record<FlavorKey, number>
    const lead = entries[0]?.tea.name.split(' ')[0] || 'Авторский'
    const accent = entries[1]?.tea.name.split(' ')[0] || 'Ботанический'

    return {
      entries,
      grams,
      price,
      pricePer100: grams ? (price / grams) * 100 : 0,
      profile,
      name: `${lead} ${accent} — купаж ателье`,
    }
  }, [blend])

  const inquiryMessage = `${blendStats.name}

Состав:
${blendStats.entries
  .map((entry) => `- ${entry.tea.name}: ${entry.grams}${NBSP}г`)
  .join('\n')}

Итого: ${blendStats.grams}${NBSP}г
Расчетная цена: ${money(blendStats.price)} (${money(blendStats.pricePer100)} / 100${NBSP}г)

Пожалуйста, свяжитесь со мной по поводу заказа этого купажа.`

  function updateBlend(id: string, grams: number) {
    setBlend((current) => {
      const next = { ...current }
      if (grams <= 0) {
        delete next[id]
      } else {
        next[id] = grams
      }
      return next
    })
  }

  return (
    <TooltipProvider>
      <main>
        <nav className="site-nav" aria-label="Главная навигация">
          <a className="brand" href="#top" aria-label="Чайное Ателье главная">
            <span>Чайное</span> Ателье
          </a>
          <div className="nav-links">
            <a href="#teas">Чаи</a>
            <a href="#blend">Купаж</a>
            <a href="#origin">Процесс</a>
          </div>
          <Button asChild size="sm" variant="amber">
            <a href="#blend">Собрать купаж</a>
          </Button>
        </nav>

        <section className="hero-section" id="top">
          <div className="hero-copy">
            <Badge variant="amber">Ботанический чай малых партий</Badge>
            <h1>Чайные купажи, собранные как аромат</h1>
            <p>
              Премиальные чаи, выразительные ботаникалы и интерактивная
              студия купажа: смешайте сорта сами, настройте характер вкуса и
              сразу увидьте цену будущего купажа.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <a href="#blend">
                  Открыть студию <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#teas">Смотреть сорта</a>
              </Button>
            </div>
            <div className="hero-metrics" aria-label="Преимущества бренда">
              <span>
                <strong>6</strong> фирменных сортов
              </span>
              <span>
                <strong>48{NBSP}ч</strong> ручная фасовка
              </span>
              <span>
                <strong>100{NBSP}г</strong> минимум купажа
              </span>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            style={{ y: heroLift }}
            onMouseMove={(event) => {
              const target = event.currentTarget
              const rect = target.getBoundingClientRect()
              target.style.setProperty(
                '--mx',
                `${((event.clientX - rect.left) / rect.width - 0.5) * 24}px`,
              )
              target.style.setProperty(
                '--my',
                `${((event.clientY - rect.top) / rect.height - 0.5) * 24}px`,
              )
            }}
          >
            <motion.img
              src={imagePath('hero-tea-table.png')}
              alt="Чайный стол с фарфоровыми чашками и ботаническими ингредиентами"
              style={{ y: heroDepth }}
            />
            <div className="steam steam-one" />
            <div className="steam steam-two" />
            <div className="steam steam-three" />
            <div className="steam steam-four" />
            <div className="steam-field" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="floating-leaf leaf-one" />
            <div className="floating-leaf leaf-two" />
            <div className="floating-leaf leaf-three" />
            <div className="floating-leaf leaf-four" />
            <div className="floating-leaf leaf-five" />
            <div className="floating-leaf leaf-six" />
            <div className="hero-note">
              <Sparkles className="size-4" />
              живая цена купажа
            </div>
          </motion.div>
        </section>

        <section className="marquee" aria-label="Качество и формат чая">
          <span>листья одного происхождения</span>
          <span>ботанические настои</span>
          <span>цена меняется сразу</span>
          <span>подарочная упаковка</span>
        </section>

        <section className="section" id="teas">
          <div className="section-heading">
            <Badge variant="outline">Чайная витрина</Badge>
            <h2>Конкретные сорта с понятной ценой за 100{NBSP}г</h2>
          </div>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="tea-carousel"
          >
            <CarouselContent>
              {teas.map((tea) => (
                <CarouselItem
                  key={tea.id}
                  className="basis-full xl:basis-1/3"
                >
                  <Card className="product-card">
                    <div className="product-image-wrap">
                      <img src={tea.image} alt={`${tea.name}, листовой чай`} />
                    </div>
                    <CardHeader>
                      <Badge variant="outline">{tea.type}</Badge>
                      <CardTitle>{tea.name}</CardTitle>
                      <CardDescription>{tea.notes}</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-between gap-3">
                      <span className="price">{money(tea.price)} / 100{NBSP}г</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() =>
                              updateBlend(tea.id, (blend[tea.id] || 0) + 10)
                            }
                            aria-label={`Добавить ${tea.name} в купаж`}
                          >
                            <Plus className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Добавить 10{NBSP}г</TooltipContent>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
          </Carousel>
        </section>

        <section className="blend-section" id="blend">
          <div className="blend-image">
            <img
              src={imagePath('blend-studio.png')}
              alt="Рабочий стол для смешивания чайного купажа"
            />
          </div>
          <div className="blend-panel">
            <div className="section-heading compact">
              <Badge variant="amber">Студия купажа</Badge>
              <h2>Смешайте сорта, настройте вкус, следите за ценой</h2>
            </div>

            <Tabs defaultValue="builder">
              <TabsList>
                <TabsTrigger value="builder">Состав</TabsTrigger>
                <TabsTrigger value="profile">Профиль</TabsTrigger>
              </TabsList>
              <TabsContent value="builder">
                <div className="blend-controls">
                  {teas.map((tea) => (
                    <div className="blend-row" key={tea.id}>
                      <div>
                        <span
                          className="tea-dot"
                          style={{ backgroundColor: tea.color }}
                        />
                        <strong>{tea.name}</strong>
                        <small>{money(tea.price)} / 100{NBSP}г</small>
                      </div>
                      <div className="blend-slider">
                        <Slider
                          value={[blend[tea.id] || 0]}
                          max={80}
                          step={5}
                          onValueChange={([value]) =>
                            updateBlend(tea.id, value)
                          }
                          aria-label={`${tea.name}, граммы`}
                        />
                        <span>{blend[tea.id] || 0}{NBSP}г</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="profile">
                <div className="profile-grid">
                  {Object.entries(blendStats.profile).map(([key, value]) => (
                    <div className="profile-row" key={key}>
                      <span>{flavorLabels[key as FlavorKey]}</span>
                      <Progress value={value} />
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Card className="blend-summary">
              <CardHeader>
                <CardTitle>{blendStats.name}</CardTitle>
                <CardDescription>
                  {blendStats.entries.length
                    ? blendStats.entries
                        .map((entry) => `${entry.tea.name} ${entry.grams}${NBSP}г`)
                        .join(' + ')
                    : 'Добавьте хотя бы один сорт, чтобы собрать купаж.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="summary-price">
                  <span>{blendStats.grams}{NBSP}г</span>
                  <strong>{money(blendStats.price)}</strong>
                  <span>{money(blendStats.pricePer100)} / 100{NBSP}г</span>
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setBlend({})}
                  aria-label="Очистить купаж"
                >
                  <Minus className="size-4" />
                </Button>
                <Sheet open={isInquiryOpen} onOpenChange={setInquiryOpen}>
                  <SheetTrigger asChild>
                    <Button className="flex-1" disabled={!blendStats.grams}>
                      Оставить заявку <Mail className="size-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Заявка на купаж</SheetTitle>
                      <SheetDescription>
                        Ваша заявка откроется как готовое письмо.
                      </SheetDescription>
                    </SheetHeader>
                    <form className="inquiry-form">
                      <Input placeholder="Ваше имя" />
                      <Input placeholder="Email" type="email" />
                      <textarea readOnly value={inquiryMessage} />
                      <Button asChild variant="amber">
                        <a
                          href={`mailto:hello@maisonleaf.example?subject=${encodeURIComponent(
                            `Заявка на купаж: ${blendStats.name}`,
                          )}&body=${encodeURIComponent(inquiryMessage)}`}
                        >
                          Открыть письмо
                        </a>
                      </Button>
                    </form>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="section split-feature">
          <div>
            <Badge variant="outline">Подарки и ритуалы</Badge>
            <h2>Подобранная банка для спокойного утра и гостевого стола</h2>
          </div>
          <div className="feature-list">
            <Feature icon={<PackageCheck />} title="Подарочная упаковка" />
            <Feature icon={<Blend />} title="Карточка состава" />
            <Feature icon={<BadgeCheck />} title="Сезонные партии" />
          </div>
        </section>

        <section className="section origin" id="origin">
          <div className="section-heading">
            <Badge variant="outline">Происхождение и процесс</Badge>
            <h2>Малые партии, быстрая фасовка и честная дегустация</h2>
          </div>
          <div className="origin-grid">
            {[
              ['01', 'Отбор', 'Пробуем лист, аромат и послевкусие до закупки'],
              ['02', 'Купаж', 'Взвешиваем основу, акценты и ботаникалы по граммам'],
              ['03', 'Фасовка', `Запечатываем банку в течение 48${NBSP}часов после заявки`],
            ].map(([step, title, copy], index) => (
              <div className="process-step" key={step}>
                <Card>
                  <CardHeader>
                    <Badge variant="amber">{step}</Badge>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{copy}</CardDescription>
                  </CardHeader>
                </Card>
                {index < 2 && (
                  <div className="process-arrow" aria-hidden="true">
                    <ArrowRight className="size-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section testimonials">
          {testimonials.map((testimonial) => (
            <Card className="testimonial-card" key={testimonial.name}>
              <CardContent className="pt-5">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, отзыв о Чайном Ателье`}
                />
                <p>“{testimonial.quote}”</p>
                <div className="testimonial-person">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="section faq">
          <div>
            <Badge variant="outline">FAQ</Badge>
            <h2>Короткие ответы перед первой заваркой</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>Можно купить прямо на странице?</summary>
              <p>
                Да. Кнопка откроет готовое письмо с выбранным купажом.
              </p>
            </details>
            <details>
              <summary>Как считается цена купажа?</summary>
              <p>
                Каждый грамм считается от цены выбранного сорта за 100{NBSP}г.
                Итог показывает общую сумму и пересчет за 100{NBSP}г.
              </p>
            </details>
            <details>
              <summary>Можно собрать купаж без кофеина?</summary>
              <p>
                Да. Уберите чаи с кофеином и соберите основу на Гибискус Роза.
              </p>
            </details>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <Sprout className="size-6" />
            <strong>Чайное Ателье</strong>
          </div>
          <p>Премиальные ботанические купажи, собранные онлайн.</p>
          <Button asChild variant="amber">
            <a href="#blend">Собрать купаж</a>
          </Button>
        </footer>
      </main>
    </TooltipProvider>
  )
}

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="feature-item">
      {icon}
      <span>{title}</span>
    </div>
  )
}

export default App
