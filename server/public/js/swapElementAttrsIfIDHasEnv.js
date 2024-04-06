function swapElementAttrsIfIDHasEnv() {
  // given <img id="ENV-src-logo-url" src="notThis.png" /> 
  // will change src to the value of the env "logo-url
  const envEls = document.querySelectorAll('[id^="ENV-"]')
  envEls.forEach(async(el) => {
    const [prefix, attrNm, ...ending] = el?.id?.split('-') || ''
    if (prefix == 'ENV') {
      const env = ending.join('-')
      const value = await getEnv(env)
      if (value) el.setAttribute(attrNm, value)
    }
  })
}