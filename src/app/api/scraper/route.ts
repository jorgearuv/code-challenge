import chromium from '@sparticuz/chromium-min'
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'

export async function POST(request: Request) {
  const { businessName } = await request.json()

  if (!businessName) {
    return NextResponse.json(
      { error: 'Business name is required' },
      { status: 400 },
    )
  }

  const isLocal = !!process.env.CHROME_EXECUTABLE_PATH

  const browser = await puppeteer.launch({
    args: isLocal ? puppeteer.defaultArgs() : chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH ||
      (await chromium.executablePath(
        'https://builtright.s3.us-west-2.amazonaws.com/Chromium+v126.0.0+pack.tar',
      )),
    headless: chromium.headless,
  })

  const page = await browser.newPage()
  const url = `https://www.google.com/search?q=${businessName.replace(
    /\s+/g,
    '+',
  )}`
  console.log('URL: ', url)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  const selector = 'a.ab_button'
  await page.waitForSelector(selector)

  // Usa evaluate para seleccionar y devolver todos los nodos con el atributo data-pid
  const [node] = await page.evaluate(selector => {
    const nodes = Array.from(document.querySelectorAll(selector))
    return nodes
      .filter(node => node.hasAttribute('data-pid'))
      .map(node => ({
        dataPid: node.getAttribute('data-pid'),
      }))
  }, selector)

  await browser.close()

  return Response.json({
    googlePlaceId: node?.dataPid,
  })
}
