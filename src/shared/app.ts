import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import qs from 'qs'

import { env } from '@/env'
import { contextMiddleware } from '@/middlewares/context'
import { appRoutes } from '@/routes'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

export const app = fastify({
  querystringParser: (str) => qs.parse(str),
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'OCPP Server',
      description: 'Especificações da API Rest',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/api/docs',
  theme: {
    title: 'OCPP OpenAPI',
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  exposedHeaders: ['x-total-count', 'Content-Disposition'],
  origin: '*',
})

app.addHook('preValidation', contextMiddleware)

app.register(appRoutes, {
  prefix: '/api',
})
