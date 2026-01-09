type FunctionalTagProps = {
  /** 画面标题 */
  title?: string
  /** 画面子元素 */
  children?: any
}

/**
 * 函数式标签（自定义标签）。
 *
 * @param props - 标签属性。
 * @returns TSX 表达式。
 */
export type FunctionalTag = (props: FunctionalTagProps) => string
