import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { buildChatReply } from './api/chat-core.js'
import { buildTopicExplanation } from './api/explain-topic-core.js'
import { generateQuizQuestions } from './api/quiz-core.js'

function localChatApiPlugin() {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          let message = ''

          try {
            const parsed = body ? JSON.parse(body) : {}
            message = typeof parsed.message === 'string' ? parsed.message : ''
          } catch {
            message = ''
          }

          console.log('[Awaaz API] Local Vite /api/chat hit', {
            hasBody: Boolean(body),
            hasMessage: Boolean(message),
            hasGroqKey: Boolean(process.env.GROQ_API_KEY),
          })

          const result = await buildChatReply(message)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        })
      })
    },
  }
}

function localGenerateQuizApiPlugin() {
  return {
    name: 'local-generate-quiz-api',
    configureServer(server) {
      server.middlewares.use('/api/generate-quiz', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          let excludeQuestions = []

          try {
            const parsed = body ? JSON.parse(body) : {}
            excludeQuestions = Array.isArray(parsed?.excludeQuestions) ? parsed.excludeQuestions : []
          } catch {
            excludeQuestions = []
          }

          console.log('[Quiz API] Local Vite /api/generate-quiz hit', {
            hasGroqKey: Boolean(process.env.GROQ_API_KEY),
            excludedCount: excludeQuestions.length,
          })

          const result = await generateQuizQuestions(excludeQuestions)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        })
      })
    },
  }
}

function localExplainTopicApiPlugin() {
  return {
    name: 'local-explain-topic-api',
    configureServer(server) {
      server.middlewares.use('/api/explain-topic', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          let topicId = ''
          let language = 'english'

          try {
            const parsed = body ? JSON.parse(body) : {}
            topicId = typeof parsed?.topicId === 'string' ? parsed.topicId : ''
            language = typeof parsed?.language === 'string' ? parsed.language : 'english'
          } catch {
            topicId = ''
            language = 'english'
          }

          console.log('[Learn API] Local Vite /api/explain-topic hit', {
            hasGroqKey: Boolean(process.env.GROQ_API_KEY),
            topicId,
            language,
          })

          const result = await buildTopicExplanation({ topicId, language })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (env.GROQ_API_KEY && !process.env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = env.GROQ_API_KEY
  }

  console.log('[Awaaz API] Vite config loaded', {
    mode,
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
  })

  return {
    plugins: [react(), localChatApiPlugin(), localGenerateQuizApiPlugin(), localExplainTopicApiPlugin()],
  }
})
