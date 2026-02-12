export const slide01 = {
  title: 'Симбиотика',
  subtitle: 'Архитектурный бетон для городской среды и интерьера',
  meta: 'Крым · с 2020 года',
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
