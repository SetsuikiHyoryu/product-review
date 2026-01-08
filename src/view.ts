/** @jsx html */

type Child = string | number | boolean | null | undefined

function changePropsToAttributes(props: Record<string, any>): string {
  return Object.entries(props)
    .filter(([_, value]) => value !== false && value != null)
    .map(([key, valve]) => ` ${key}="${String(valve)}"`)
    .join('')
}

function changeChildrenToContent(children: Child[]): string {
  return children
    .flat()
    .map((child) => (child == null || child === false ? '' : child))
    .join('')
}

export function html(
  tag: string,
  props: Record<string, any> | null,
  ...children: Child[]
): string {
  const attributes = props ? changePropsToAttributes(props) : ''
  const content = changeChildrenToContent(children)
  return `<${tag}${attributes}>${content}</${tag}>`
}
