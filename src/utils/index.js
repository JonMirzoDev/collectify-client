export const truncateText = (text, limit) => {
  const words = text.split(' ', limit)
  return words.length < text.split(' ').length ? words.join(' ') + '...' : text
}
