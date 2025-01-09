/**
 * 处理语言
 */
export function language2params(language: { language: string, text: string }) {
  console.log(' language', language)
  if (language.language === 'zh_CN') {
    return 'auto2zh'
  }
  if (language.language === 'en') {
    return 'auto2en'
  }
}
