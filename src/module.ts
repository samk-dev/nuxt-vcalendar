import type { Defaults } from 'v-calendar/src/utils/defaults'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent
} from '@nuxt/kit'
import { name, version } from '../package.json'

export type VCalendarComponents = {
  DatePicker: boolean
  Calendar: boolean
}
export interface ModuleOptions {
  /**
   * @description prefix instead of v-
   * @default V
   */
  prefix: string
  /**
   * @description load v-calendar styles
   * @default true
   */
  defaultCss: boolean
  /**
   * @description load custom stylesheet
   * @default undefined
   */
  cssPath?: string
  /**
   * @description v-calendar options
   * @see https://vcalendar.io/calendar/api.html#defaults
   */
  calendarOptions?: Defaults
  /**
   * @description auto import v-calendar components
   * @default []
   */
  autoImports: VCalendarComponents
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'vcalendar',
    compatibility: {
      bridge: false,
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    prefix: 'V',
    defaultCss: true,
    autoImports: {
      DatePicker: true,
      Calendar: true
    }
  },
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOptions = nuxt.options

    nuxtOptions.runtimeConfig.public.vcalendar ||= {}
    nuxtOptions.runtimeConfig.public.vcalendar = moduleOptions.calendarOptions

    addPlugin(resolver.resolve('./runtime/plugin.client'))

    nuxtOptions.build.transpile ||= []
    nuxtOptions.build.transpile.push('vcalendar')

    if (moduleOptions.defaultCss) {
      nuxtOptions.css ||= []
      nuxtOptions.css.push(`v-calendar/style.css`)
    }

    if (moduleOptions.cssPath) {
      nuxtOptions.css ||= []
      nuxtOptions.css.push(moduleOptions.cssPath)
    }

    if (moduleOptions.autoImports.DatePicker)
      addComponent({
        name: `${moduleOptions.prefix}DatePicker`,
        export: 'DatePicker',
        filePath: 'v-calendar'
      })

    if (moduleOptions.autoImports.Calendar)
      addComponent({
        name: `${moduleOptions.prefix}Calendar`,
        export: 'Calendar',
        filePath: 'v-calendar'
      })
  }
})
