const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const markdownIt = require('markdown-it')
const MARKDOWN_DIR = './markdown'
const JSON_DIR = './data'
const extension = '.json'

const transferMarkdownToJSON = (filePath) => {
  const files = fs.readdirSync(filePath)
  const posts = files
    .reduce((result, fileName) => {
      const file = fs.readFileSync(path.join(filePath, fileName), 'utf8')
      const { attributes, body } = frontMatter(file)
      const htmlBody = markdownIt().render(body)
      result.push({ attributes, htmlBody })
      return result
    }, [])
    .sort((a, b) => {
      if (a.attributes.idx < b.attributes.idx) {
        return -1
      }
      if (a.attributes.idx > b.attributes.idx) {
        return 1
      }
      return 0
    })
  return posts
}

const writeFileJSON = (entry) => {
  const filePath = path.join(MARKDOWN_DIR, entry.name)
  const posts = transferMarkdownToJSON(filePath)

  fs.writeFile(
    path.join(JSON_DIR, entry.name + extension),
    JSON.stringify({ posts }),
    'utf8',
    (err) => {
      if (err) {
        console.error('JSON 파일 생성 시점 에러발생', err)
      } else {
        console.log('JSON 파일 생성 성공')
      }
    },
  )
}

const readMarkdownDir = () => {
  fs.readdir(MARKDOWN_DIR, { withFileTypes: true }, (_, entries) => {
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        writeFileJSON(entry)
      }
    })
  })
}

;(() => {
  readMarkdownDir()
})()
