const fs = require('fs')
const path = require('path')

const frontMatter = require('front-matter')
const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js/lib/core')

// Load any languages you need
hljs.registerLanguage(
  'javascript',
  require('highlight.js/lib/languages/javascript'),
)

const mdInstance = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 'highlight.js'를 사용하여 코드 블록에 스타일 적용
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch (__) {}
    }
  },
})
const MARKDOWN_DIR = './markdown'
const JSON_DIR = './data'
const extension = '.json'

      
const transferMarkdownToJSON = (filePath) => {
  const files = fs.readdirSync(filePath)
  const posts = files
    .reduce((result, fileName) => {
      const file = fs.readFileSync(path.join(filePath, fileName), 'utf8')
      const { attributes, body } = frontMatter(file)



      const htmlBody = mdInstance.render(body)
      result.push({ attributes, htmlBody })
      return result
    }, [])
    .sort((a, b) => {
      if (a.attributes.idx < b.attributes.idx) {
        return 1
      }
      if (a.attributes.idx > b.attributes.idx) {
        return -1
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
  
function myCustomPlugin(md) {
  // 'fence' 규칙을 위한 기존 렌더러 저장
  const defaultRender =
    md.renderer.rules.fence ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    // 기존 렌더러 함수 호출
    const result = defaultRender(tokens, idx, options, env, self)

    // 결과에 클래스 추가
    return result.replace('<code>', '<code class="language-javascript hljs">')
  }
}

; (() => {
  readMarkdownDir()
})()
