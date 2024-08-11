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
