import { useTranslateFromSelect } from './useTranslateFrom'

function useFetchTranslate() {
  const languageSelected = useTranslateFromSelect()

  const fetchTranslateText = async (textContent: string) => {
    const body = {
      source: [textContent],
      direction: 'auto2zh',
    }

    const { data, status, error, refresh, clear } = await useFetch('api/translate/text', {
      body,
    })
  }

  return {
    fetchTranslateText,
  }
}

export default useFetchTranslate
