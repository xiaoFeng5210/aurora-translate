import { useTranslateFromSelect } from './useTranslateFromSelect'

function useFetchTranslate() {
  const languageSelected = useTranslateFromSelect()

  const fetchTranslateText = async (textContent: string) => {
    const data = {
      source: [textContent],
      direction: 'auto2zh',
    }

    const { data, status, error, refresh, clear } = await useFetch('api/translate/text', {
      body: data,
    })
  }

  return {
    fetchTranslateText,
  }
}

export default useFetchTranslate
