import type { Rule, RuleObject } from 'ant-design-vue/es/form'

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
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year'
}

interface SingleTimeCondition {
  type: 'single-time'
  picker: 'date' | 'week' | 'month' | 'quarter' | 'year'
}

interface CheckboxCondition {
  type: 'checkbox'
}

interface RadioCondition {
  type: 'radio'
  options: Array<{
    value: string
    label: string
    disabled?: boolean
  }>
  optionType?: 'default' | 'button'
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

export interface CustomValidator {
  type: 'minLength' | 'maxLength' | 'pattern'
  minLength?: number
  maxLength?: number
  pattern?: RegExp
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
  placeholder?: string
  validators?: Array<CustomValidator | RuleObject>
  mode?: string
}
