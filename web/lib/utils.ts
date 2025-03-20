import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyClipboard(text: string) {
  if (navigator?.clipboard) {
    await navigator.clipboard.writeText(text);
    return Promise.resolve
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
    return Promise.resolve()
  }
}

/**
 * 生成指定范围内的随机整数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @returns 随机整数
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成指定范围内的随机浮点数
 * @param min 最小值（包含）
 * @param max 最大值（包含）
 * @param decimals 小数位数，默认为2
 * @returns 随机浮点数
 */
export function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  const randomValue = Math.random() * (max - min) + min;
  return Number(randomValue.toFixed(decimals));
}

export function getRandomString(length: number, chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string {
  let result = '';
  const charactersLength = chars.length;

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * 获取随机数
 * @description 一个通用的随机数生成方法，可以根据参数生成不同类型的随机数
 * @param options 配置选项
 * @param options.type 随机数类型: 'int' | 'float' | 'boolean' | 'uuid' | 'color'
 * @param options.min 最小值（仅适用于int和float类型）
 * @param options.max 最大值（仅适用于int和float类型）
 * @param options.decimals 小数位数（仅适用于float类型）
 * @returns 根据类型返回对应的随机值
 */
export function getRandom(options: {
  type: 'int' | 'float' | 'boolean' | 'uuid' | 'color';
  min?: number;
  max?: number;
  decimals?: number;
}): number | boolean | string {
  const { type, min = 0, max = 100, decimals = 2 } = options;

  switch (type) {
    case 'int':
      return getRandomInt(min, max);
    case 'float':
      return getRandomFloat(min, max, decimals);
    case 'boolean':
      return Math.random() >= 0.5;
    case 'uuid':
      // 生成符合UUID v4格式的随机字符串
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    case 'color':
      // 生成随机HEX颜色
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    default:
      return Math.random();
  }
}

/**
 * 检测是否是手机端
 */
export function isMobile() {
  const condition1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const condition2 = window.innerWidth < 768;
  return condition1 || condition2;
}

