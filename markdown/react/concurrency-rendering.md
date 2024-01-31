---
title: '동시성 렌더링'
date: 2024-01-29
summary: '리액트 18 동시성 렌더링에 대해서'
---

# 동시성 렌더링을 할 수 있는 리액트 18버전 훅
지연된 렌더링은 중단가능, 사용자의 인터렉션을 차단하지않는다

## 동시성 렌더링을 다룰 수 있는 훅
- **useTransition**
  - 무거운 연산 UI 조각을 렌더링 일으키는 상태 업데이트에 대해 낮은 우선순위를 부여하여 상태 변경을 지연시켜서 렌더링을 지연시킨다.
  - startTransition에 상태를 업데이트 하는 함수를 인수로 받는다
  - 비동기로 처리하므로 startTransition에 비동기함수는 넣을 수 없다. (실행시점이 불확실해지므로 메커니즘과 맞지않음)
  1. 비동기 렌더링 (지연 렌더링) 처리
  2. 로딩 상태 관리
  3. 낮은 렌더링 우선순위
  `const [isPending, startTransition] = useTransition();`

- **useDeferredValue**
  - useTransition과 다르게 상태를 업데이트하는 함수가 아니라 상태 값자체를 인수로 받는다.
  - 디바운스와 비슷, 그러나 디바운스와 달리 고정된 지연시간 없이 첫번째 렌더링이 완료된 후에 지연된 렌더링을 수행한다. 
  - useTransition와 사용하는 방식에만 차이가있을뿐, 지연된 렌더링을 한다는점에서 동일하다.
  `const deferredValue = useDeferredValue(value)`

## 동시성 이슈 - 테어링 현상 발생
같은 상태를 바라보는 UI 조각이 여러개인 경우,  리액트 18의 useTransition, useDeferredValue를 사용한 UI 조각은 상태 변경을 지연시킨다. 이때 이 훅들을 사용하지않은 UI조각은 이전 상태로 렌더링이 되는데, 훅들을 사용한 UI 조각은 무거운 연산이 끝나고 상태변경 및 렌더링이 되므로 
같은 상태를 바라보아도 “화면이 찢어지는(테어링) 현상”이 발생한다.따라서 다른 값을 렌더링하게 된다. 
> 이를 해결하려면 useSyncExternalStore로 외부 상태를 구독해서 상태 동기화를 시켜야한다.

- 동시성 이슈는 보통 외부 상태에서 발생.
  - 보통 리액트에서 관리하는 상태(useState, useReducer)인 경우 발생할 확률이 적지만, 리액트에서 관리하지않는 외부상태인 경우 발생하므로 동시성 처리를 해야한다.

## useSyncExternalStore 훅
외부 상태를 구독해서 상태 동기화를 시켜준다.

```javascript
useSyncExternalStore(
    subscribe: (callback) => Unsubscribe,
    getSnapshot: () => state
) => State
```