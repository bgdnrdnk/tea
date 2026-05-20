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
  TooltipTrigger,
} from './components/ui/tooltip'
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

function ClassicDesign({ studio }: { studio: BlendStudio }) {
  const { blend, setBlend, updateBlend, blendStats, inquiryMessage } = studio
  const [isInquiryOpen, setInquiryOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroLift = useTransform(scrollYProgress, [0, 0.28], [0, -86])
  const heroDepth = useTransform(scrollYProgress, [0, 0.28], [0, 46])

  return (
    <main className="design-classic">
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
            Премиальные чаи, выразительные ботаникалы и интерактивная студия
            купажа: смешайте сорта сами, настройте характер вкуса и сразу
            увидьте цену будущего купажа.
          </p>
          <div className="hero-actions">
            <Button asChild size="lg" variant="amber">
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
            src={imagePath('hero-tea-table.webp')}
            alt="Чайный стол с фарфоровыми чашками и ботаническими ингредиентами"
            width={1717}
            height={916}
            loading="eager"
            fetchPriority="high"
            decoding="async"
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
              <CarouselItem key={tea.id} className="basis-full xl:basis-1/3">
                <Card className="product-card">
                  <div className="product-image-wrap">
                    <img
                      src={tea.image}
                      alt={`${tea.name}, листовой чай`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <CardHeader>
                    <Badge variant="outline">{tea.type}</Badge>
                    <CardTitle>{tea.name}</CardTitle>
                    <CardDescription>{tea.notes}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-between gap-3">
                    <span className="price">
                      {money(tea.price)} / 100{NBSP}г
                    </span>
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
            src={imagePath('blend-studio.webp')}
            alt="Рабочий стол для смешивания чайного купажа"
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
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
                      <small>
                        {money(tea.price)} / 100{NBSP}г
                      </small>
                    </div>
                    <div className="blend-slider">
                      <Slider
                        value={[blend[tea.id] || 0]}
                        max={80}
                        step={5}
                        onValueChange={([value]) => updateBlend(tea.id, value)}
                        aria-label={`${tea.name}, граммы`}
                      />
                      <span>
                        {blend[tea.id] || 0}{NBSP}г
                      </span>
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
                      .map(
                        (entry) =>
                          `${entry.tea.name} ${entry.grams}${NBSP}г`,
                      )
                      .join(' + ')
                  : 'Добавьте хотя бы один сорт, чтобы собрать купаж.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="summary-price">
                <span>
                  {blendStats.grams}{NBSP}г
                </span>
                <strong>{money(blendStats.price)}</strong>
                <span>
                  {money(blendStats.pricePer100)} / 100{NBSP}г
                </span>
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
                  <Button
                    className="flex-1"
                    variant="amber"
                    disabled={!blendStats.grams}
                  >
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
            [
              '02',
              'Купаж',
              'Взвешиваем основу, акценты и ботаникалы по граммам',
            ],
            [
              '03',
              'Фасовка',
              `Запечатываем банку в течение 48${NBSP}часов после заявки`,
            ],
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
                loading="lazy"
                decoding="async"
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
            <p>Да. Кнопка откроет готовое письмо с выбранным купажом.</p>
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

export default ClassicDesign
