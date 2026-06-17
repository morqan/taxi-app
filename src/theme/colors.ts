// Бренд-палитра (перенесена из старого App/Themes/Colors.js, тёмная баклажаново-оранжевая).
// Дублируется в tailwind.config.js для className; здесь — для мест, где нужен литерал цвета
// (нативные опции навигации, статус-бар, иконки).
export const colors = {
  background: '#1F0808',
  surface: '#251A34',
  primary: '#FB5F26',
  danger: '#E73536',
  banner: '#5F3E63',
  line: '#451E5D',
  text: '#E0D7E5',
  muted: '#9B8FA6',
  border: '#483F53',
} as const;

export type AppColor = keyof typeof colors;
