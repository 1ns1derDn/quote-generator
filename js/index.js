const quoteGenerator = document.querySelector('.quote-generator')
const loader = quoteGenerator.querySelector('[data-quote="loader"]')
const quoteGeneratorContent = quoteGenerator.querySelector('[data-quote="content"]')
const quoteGeneratorText = quoteGenerator.querySelector('[data-quote="quote-text"]')
const quoteGeneratorAuthor = quoteGenerator.querySelector('[data-quote="quote-generator-author"]')
const buttonTwitter = quoteGenerator.querySelector('[data-quote="button-twitter"]')
const buttonNewQuote = quoteGenerator.querySelector('[data-quote="button-new-quote"]')

const getQuoteGenerator = ($toText, $toAuthor, $loading, $content) => {
  fetch('https://stormy-waters-81463.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
    .then(res => res.json())
    .then(quote => {
      const { quoteAuthor, quoteText } = quote
      $toText.innerText = quoteText
      $toAuthor.innerText = quoteAuthor ? quoteAuthor : "I don't know the author"
      $loading.hidden = true
      $content.hidden = false
    })
    .catch(() => {
      getQuoteGenerator($toText, $toAuthor, $loading, $content)
    })
}

const setTwitterQuote = (e) => {
  e.preventDefault()
  window.open(`https://twitter.com/intent/tweet?text=${quoteGeneratorText.innerText}, ©${quoteGeneratorAuthor.innerText}`, "_blank");
}

getQuoteGenerator(quoteGeneratorText, quoteGeneratorAuthor, loader, quoteGeneratorContent)

buttonNewQuote.addEventListener('click', () => {
  quoteGeneratorContent.hidden = true
  loader.hidden = false
  getQuoteGenerator(quoteGeneratorText, quoteGeneratorAuthor, loader, quoteGeneratorContent)
})

buttonTwitter.addEventListener('click', setTwitterQuote)







