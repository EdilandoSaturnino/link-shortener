import fs from 'fs'
import path from 'path'

const filePath = path.resolve('urlDatabase.json')

function saveToFile() {
  fs.writeFileSync(filePath, JSON.stringify(Object.fromEntries(urlDatabase)), 'utf8')
}

function loadFromFile() {
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    urlDatabase = new Map(Object.entries(data))
  }
}

let urlDatabase = new Map<string, string>()
loadFromFile()

export function saveUrl(shortCode: string, originalUrl: string) {
  urlDatabase.set(shortCode, originalUrl)
  saveToFile()
}

export function getOriginalUrl(shortCode: string): string | undefined {
  return urlDatabase.get(shortCode)
}
