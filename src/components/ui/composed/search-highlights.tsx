export function SearchHighlights({
  text,
  query,
  mode = 'contains',
}: {
  text: string
  query: string
  mode?: 'contains' | 'startWith'
}) {
  if (mode === 'startWith') {
    const trimmedHighlight = query.trim()

    if (!trimmedHighlight || !text.toLowerCase().startsWith(trimmedHighlight.toLowerCase())) {
      return <span className="text-qb-mist-60 font-normal">{text}</span>
    }

    const length = trimmedHighlight.length
    const prefix = text.slice(0, length)
    const suffix = text.slice(length)

    return (
      <span>
        {/* The matching prefix is bolded */}
        <span className="text-qb-mist-70 font-bold">{prefix}</span>
        {/* The rest of the word is normal */}
        <span className="text-qb-mist-60 font-normal">{suffix}</span>
      </span>
    )
  }

  if (!query.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="text-qb-mist-70 font-bold">
            {part}
          </span>
        ) : (
          <span key={i} className="text-qb-mist-60 font-normal">
            {part}
          </span>
        ),
      )}
    </span>
  )
}
