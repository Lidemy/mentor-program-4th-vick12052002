export const questionArray = [
  {
    title: '暱稱',
    type: 'text',
    desc: null,
    required: true,
    options: null,
    value: '',
    placeholder: '請輸入你的暱稱',
    isValid: false,
  },
  {
    title: '電子郵件',
    type: 'email',
    desc: null,
    required: true,
    options: null,
    value: '',
    placeholder: '請輸入你的電子郵件',
    isValid: false,
  },
  {
    title: '手機號碼',
    type: 'tel',
    desc: null,
    required: true,
    value: '',
    options: null,
    placeholder: '請輸入你的手機號碼',
    isValid: false,
  },
  {
    title: '報名類型',
    type: 'radio',
    desc: null,
    required: true,
    value: '',
    options: [{ id: 1, content: '躺在床上用想像力實作' }, { id: 2, content: '趴在地上滑手機找現成的' }],
    placeholder: '請選擇你的報名類型',
    isValid: false,
  },
  {
    title: '怎麼知道這個活動的？',
    type: 'text',
    desc: null,
    required: true,
    value: '',
    options: null,
    placeholder: '請輸入你的回答',
    isValid: false,
  }, {
    title: '其他',
    type: 'text',
    desc: '對活動的一些建議',
    required: false,
    value: '',
    options: null,
    placeholder: '請輸入你的回答',
    isValid: false,
  },
];
export function checkValid(data) {
  const { type, value } = data;
  // eslint-disable-next-line no-useless-escape
  const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  const phoneRule = /^09\d{8}/;
  if (type === 'email') return emailRule.test(value);
  if (type === 'tel') return phoneRule.test(value);
  return true;
}
