import type { SelectFrom } from '~/types/common'

export const translateFromOptions = [
  {
    key: 'en',
    label: '英文',
  },
  {
    key: 'zh_CN',
    label: '简体中文',
  },
]

export function useCurrentLanguage() {
  return useState<{ text: string }>('currentLanguage', () => ({
    text: '',
  }))
}

export function useTranslateFromSelect() {
  return useState<SelectFrom>('configSelect', () => ({
    language: translateFromOptions[0].key,
    text: translateFromOptions[0].label,
  }))
}

export function handleSelectLanguage(key: string) {
  changeTranslateFromSelect(key)
}

export function changeTranslateFromSelect(key: string) {
  const originSelect = useTranslateFromSelect()
  const newSelect = translateFromOptions.find(item => item.key === key)
  if (newSelect) {
    originSelect.value = { language: newSelect.key, text: newSelect.label }
  }
}

export function addStyle() {
  const translate_from_area = document.getElementById('translate_from_area')
  if (translate_from_area) {
    translate_from_area.style.border = '1px solid #00bd58'
    translate_from_area.style.boxShadow = 'none'
  }
}

export function clearStyle() {
  const translate_from_area = document.getElementById('translate_from_area')
  if (translate_from_area) {
    translate_from_area.style.border = '1px solid transparent'
    translate_from_area.style.boxShadow = '0 6px 18px #41a36f0f'
  }
}
