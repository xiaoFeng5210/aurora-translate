import { useTranslateFromSelect } from './useTranslateFrom'

function useFetchTranslate() {
  const languageSelected = useTranslateFromSelect()
  const fetchTranslateText = async (textContent: string) => {
    const body = {
      source: [textContent],
      direction: 'auto2zh',
    }
    console.log(body)
    const res = await useFetch('api/translate/text', {
      body,
    }).catch((err) => {
      return Promise.reject(err)
    })
    if (res !== undefined) {
      return res.data
    }
  }

  return {
    fetchTranslateText,
  }
}

export default useFetchTranslate
