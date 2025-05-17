import fastify from "fastify";
import qs from 'qs'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

export const app = fastify({
  querystringParser: (str) => qs.parse(str),
}).withTypeProvider<ZodTypeProvider>()