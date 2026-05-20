import { useMemo, useState } from 'react'

export const imagePath = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/${fileName}`
export const NBSP = ' '

export type FlavorKey = 'floral' | 'citrus' | 'spice' | 'earthy' | 'caffeine'

export type Tea = {
  id: string
  name: string
  type: string
  price: number
  image: string
  notes: string
  color: string
  profile: Record<FlavorKey, number>
}

export const flavorLabels: Record<FlavorKey, string> = {
  floral: 'Цветы',
  citrus: 'Цитрус',
  spice: 'Пряность',
  earthy: 'Терпкость',
  caffeine: 'Кофеин',
}

export const teas: Tea[] = [
  {
    id: 'sencha',
    name: 'Сенча Луг',
    type: 'Японский зеленый',
    price: 990,
    image: imagePath('sencha-meadow.webp'),
    notes: 'Весенняя трава, сладкая кукуруза, чистый морской воздух.',
    color: '#7a9f3f',
    profile: { floral: 24, citrus: 38, spice: 8, earthy: 62, caffeine: 56 },
  },
  {
    id: 'earl-grey',
    name: 'Эрл Грей Бархат',
    type: 'Черный чай',
    price: 890,
    image: imagePath('earl-grey-velvet.webp'),
    notes: 'Цедра бергамота, василек, мягкий какао-танин.',
    color: '#384235',
    profile: { floral: 42, citrus: 78, spice: 12, earthy: 48, caffeine: 72 },
  },
  {
    id: 'jasmine',
    name: 'Жасмин Серебро',
    type: 'Белый чай',
    price: 1290,
    image: imagePath('jasmine-silver.webp'),
    notes: 'Серебристые почки, цветущий жасмин, кожица груши.',
    color: '#b8c5a6',
    profile: { floral: 88, citrus: 26, spice: 4, earthy: 24, caffeine: 34 },
  },
  {
    id: 'masala',
    name: 'Масала Уголь',
    type: 'Пряный чай',
    price: 940,
    image: imagePath('masala-ember.webp'),
    notes: 'Кардамон, имбирное тепло, копченая корица.',
    color: '#b35d26',
    profile: { floral: 8, citrus: 18, spice: 92, earthy: 58, caffeine: 68 },
  },
  {
    id: 'hibiscus',
    name: 'Гибискус Роза',
    type: 'Травяной настой',
    price: 760,
    image: imagePath('hibiscus-rose.webp'),
    notes: 'Рубиновый гибискус, шиповник, апельсиновая свежесть.',
    color: '#b13e4a',
    profile: { floral: 76, citrus: 72, spice: 18, earthy: 12, caffeine: 0 },
  },
  {
    id: 'matcha',
    name: 'Матча Облако',
    type: 'Церемониальная матча',
    price: 1490,
    image: imagePath('matcha-cloud.webp'),
    notes: 'Сливочная зелень, миндальное молоко, умами-финиш.',
    color: '#4e8d35',
    profile: { floral: 18, citrus: 22, spice: 5, earthy: 82, caffeine: 86 },
  },
]

export const starterBlend: Record<string, number> = {
  sencha: 35,
  jasmine: 25,
  hibiscus: 15,
}

export const testimonials = [
  {
    quote: 'Студия купажа делает подарок личным, но не усложняет покупку.',
    name: 'Мира К.',
    role: 'собирает подарочные купажи',
    image: imagePath('testimonial-mira.webp'),
  },
  {
    quote: 'Эрл Грей достаточно строгий для рабочих утр и достаточно мягкий для вечера.',
    name: 'Йонас Р.',
    role: 'выбирает черные чаи',
    image: imagePath('testimonial-jonas.webp'),
  },
  {
    quote: 'Живой профиль вкуса помог собрать цветочный купаж с низким кофеином за пару минут.',
    name: 'Алина С.',
    role: 'любит легкие настои',
    image: imagePath('testimonial-alina.webp'),
  },
]

export function money(value: number) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`
}

export type BlendStudio = ReturnType<typeof useBlendStudio>

/**
 * Shared blend-studio state. Lives once in App so the user's blend is
 * preserved when switching between designs.
 */
export function useBlendStudio() {
  const [blend, setBlend] = useState<Record<string, number>>(starterBlend)

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
                (sum, entry) => sum + entry.tea.profile[flavor] * entry.grams,
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

  return { blend, setBlend, updateBlend, blendStats, inquiryMessage }
}
