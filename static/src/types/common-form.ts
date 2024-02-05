import type { Rule } from 'ant-design-vue/es/form'

interface InputCondition {
  type: 'input'
}

interface TextareaCondition {
  type: 'textarea'
  rows?: number
  showCount?: boolean
}

interface SelectCondition {
  type: 'select'
  mode?: 'multiple' | 'tags' | 'combobox'
  options: Array<{
    value: string | number
    label: string
    disabled?: boolean
    [key: string]: unknown
  }>
}

interface TimeCondition {
  type: 'time'
}

interface SingleTimeCondition {
  type: 'single-time'
}

interface CheckboxCondition {
  type: 'checkbox'
}

interface RadioCondition {
  type: 'radio'
}

interface NullCondition {
  type: ''
}

type ConditionType =
  | InputCondition
  | TextareaCondition
  | SelectCondition
  | TimeCondition
  | SingleTimeCondition
  | CheckboxCondition
  | RadioCondition
  | NullCondition

interface CustomValidator {
  type: 'minLength' | 'maxLength' | 'pattern'
  minLength?: number
  maxLength?: number
  pattern?: string | RegExp
}

interface CustomValidateFun {
  (_rule: Rule, value: unknown): Promise<string | null>
}
export type CommonFromCondition = ConditionType & {
  show?: boolean
  span?: number
  field: string
  label: string
  value?: unknown
  disabled?: boolean
  required?: boolean
  tooltip?: string
  validators?: Array<CustomValidator | CustomValidateFun>
  mode?: string
}
