;(() => {
  const e = localStorage.getItem('wtab-color-scheme') || '',
    a = window.matchMedia('(wtab-color-scheme: dark)').matches
  ;(!e || e === 'auto' ? a : e === 'dark') && document.documentElement.setAttribute('theme', 'dark')
})()
