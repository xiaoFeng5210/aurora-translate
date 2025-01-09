import { language2params } from '~/utils/help'
import { useTranslateFromSelect } from './useTranslateFrom'

function useFetchTranslate() {
  const languageSelected = useTranslateFromSelect()
  const fetchTranslateText = async (textContent: string): Promise<string[] | undefined> => {
    if (!textContent)
      return
    const direction = language2params(languageSelected.value)
    const body = {
      source: [textContent],
      direction,
    }
    const res = await $fetch<{ code: number, data: string[] }>('/api/translate/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).catch((err) => {
      return Promise.reject(err)
    })
    if (res !== undefined) {
      if (res?.code === 0) {
        return Promise.resolve(res.data)
      }
      else {
        return Promise.reject(new Error('翻译失败，code不为0'))
      }
    }
  }

  return {
    fetchTranslateText,
  }
}

export default useFetchTranslate
