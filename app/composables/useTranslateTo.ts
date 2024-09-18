import type {SelectFrom} from "~/types/common";

export const useTranslateFromTo = () => useState<SelectFrom>('configSelect', () => ({
	language: 'zh_CN',
	text: '中文'
}))


export const handleSelectLanguage = (key: string) => {
	changeTranslateFromSelect(key, '点击dropdown切换要翻译语言')
}
export const changeTranslateFromSelect = (key: string, log?: string) => {
	const originSelect = useTranslateFromTo()
	const newSelect = translateFromOptions.find(item => item.key === key)
	if (newSelect) {
		originSelect.value = {language: newSelect.key, text: newSelect.label}
	}
	log && console.log(log)
}

export const addStyle = () => {
	const translate_from_area = document.getElementById('translate_from_area');
	if (translate_from_area) {
		translate_from_area.style.border = '1px solid #00bd58';
		translate_from_area.style.boxShadow = 'none';
	}
}

export const clearStyle = () => {
	const translate_from_area = document.getElementById('translate_from_area');
	if (translate_from_area) {
		translate_from_area.style.border = '1px solid transparent';
		translate_from_area.style.boxShadow = '0 6px 18px #41a36f0f';
	}
}

export const translate2Options = [
	{
		key: 'zh_CN',
		label: '简体中文'
	},
	{
		key: 'en',
		label: '英文'
	}
]
