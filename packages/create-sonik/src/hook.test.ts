import { describe, it, vi, expect } from 'vitest'
import { Hook } from './hook'

describe('Hook', () => {
  it('Should apply hooks', () => {
    const hook = new Hook()
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    hook.addHook('test-template', fn1)
    hook.addHook('test-template', fn2)
    hook.applyHook('test-template', {})
    expect(fn1).toHaveBeenCalled()
    expect(fn2).toHaveBeenCalled()
  })
})
