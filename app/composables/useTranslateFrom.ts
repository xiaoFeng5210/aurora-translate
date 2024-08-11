import type {SelectFrom} from "~/types/common";

export const useTranslateFromSelect = () => useState<SelectFrom>('configSelect', () => ({
	language: 'auto',
	text: '自动识别'	
}))

export const changeTranslateFromSelect = (key: string, log?: string) => {
	const originSelect = useTranslateFromSelect()
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

export const translateFromOptions = [
	{
		key: 'auto',
		label: '自动识别'
	},
	{
		key: 'zh_CN',
		label: '简体中文'
	},
	{
		key: 'en',
		label: '英文'
	}
]
