import type { VNode } from 'vue'

export const SHAPE_FLAG_ARRAY_CHILDREN = 16
export const SHAPE_FLAG_TEXT = 8

const inlines = ['b', 'i', 'span', 'strong']

export const is = (node: VNode, type: string) => node.type.toString() === type
export const isComment = (node: VNode) => is(node, 'Symbol(Comment)')
export const isTextual = (node: VNode) => [
  ...inlines,
  'Symbol(Text)',
  'Symbol()',
].some(t => is(node, t)) || node.shapeFlag === SHAPE_FLAG_TEXT

export const normalize = (content: VNode[]): [VNode, boolean][] => {
  const normalized: [VNode, boolean][] = []
  content.forEach(node => {
    if (node.shapeFlag === SHAPE_FLAG_ARRAY_CHILDREN) {
      return normalized.push(...normalize(node.children as VNode[]))
    }

    if (!isComment(node)) {
      normalized.push([node, !isTextual(node)])
    }
  })

  return normalized
}