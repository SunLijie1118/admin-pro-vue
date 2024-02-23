import type { Slot } from 'vue'

export interface Params {
  [key: string]: any
}

export type SlotParams = {
  [key: string]: Slot
}
export * from './breadcrumb'
export * from './project'
export * from './common-form'
