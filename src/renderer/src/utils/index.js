const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Shanghai'
})

export const formatDateFromMs = (ms) => dateFormatter.format(ms)
