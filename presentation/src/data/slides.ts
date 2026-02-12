export const slide01 = {
  title: 'Симбиотика',
  subtitle: 'Архитектурный бетон для городской среды и интерьера',
  meta: 'Крым · с 2020 года',
}

export const slide03 = {
  eyebrow: '03 / Контекст',
  title: 'Город — это не только архитектура.',
  body: [
    'Это результат ежедневного взаимодействия человека и пространства.',
    'Когда благоустройство продумано, среда ощущается естественно.',
  ],
  visual: { type: 'none' as const },
}

export const slide02 = {
  left: {
    key: 'ud' as const,
    title: 'Urban Development',
    subtitle: 'Городская среда',
    bg: 'var(--ud)',
    image: '/images/ud.jpg',
  },
  right: {
    key: 'dd' as const,
    title: 'Design Development',
    subtitle: 'Интерьерные изделия',
    bg: 'var(--dd)',
    image: '/images/dd.jpg',
  },
}
