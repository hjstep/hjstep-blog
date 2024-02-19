---
title: '[시리즈] 리액트 원리 파헤치기 05 - useState의 state는 어떻게 구현되어 있을까?'
summary: '리액트 파헤치기 시리즈 05 - useState 02'
tag: [리액트 파헤치기 시리즈, REACT, useState]
idx: 5
---

바로 이전 포스팅에서 useState가 정의된 곳에 대해 코드레벨에서 살펴보았다.  
그곳은 컴포넌트 상태에 따라 mountState 또는 updateState였다.  
그 중 mountState를 까보자.  
![HooksDispatcherOnMount](../../static/img/series/react/HooksDispatcherOnMount.png)  


## mountState 함수
![mountState](../../static/img/series/react/mountState.png)  

- `const hook = mountStateImpl(initialState)`
  mountStateImpl 함수를 통해 hook을 전달받고 있다.

  ![mountStateImpl](../../static/img/series/react/mountStateImpl.png)  

  - `const hook = mountWorkInProgressHook();`를 호출하고 있다.
  mountWorkInProgressHook 함수는 hook 객체가 정의되어있다.

    ![mountWorkInProgressHook](../../static/img/series/react/mountWorkInProgressHook.png)  

    ```javascript
    const hook: Hook  = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    }
    ```
    - memoizedState 프로퍼티는 마지막으로 기억하고있는 계산된 state값이다.
    - next 프로퍼티는 다음 hook을 가리키는 포인터 역할이다.  
    

    ```javascript
    if (workInProgressHook === null) {
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    } else {
      workInProgressHook = workInProgressHook.next = hook;
    }
    ```
    - 조건절 `workInProgressHook === null` 
        - true : 작업중인 훅이 없다면 currentlyRenderingFiber.memoizedState와 workInProgressHook에 hook을 주입하고
        - false : 작업중인 훅이 존재한다면
        workInProgressHook.next에 hook정보를 주입하고, workInProgressHook은 next에 hook이 주입된 hook이 할당되게된다. (**바로 이 부분으로 인해 링크드 리스트 구조로 next를 통해 hook끼리 연결되게 된다.**)

    - workInProgressHook을 리턴한다.

  - 다시 mountStateImpl을 보자.
    ![mountStateImpl](../../static/img/series/react/mountStateImpl.png)  
    - 인자로 받은 initialState를 hook.memoizedState와 hook.baseState에 저장하고 있다. 
    - 이때 initialState가 함수이면 함수를 호출한 결과값을 저장한다. (**바로 우리가 useState인자로 함수를 넘기면 발생하게 되는 코드이며, 게으른 초기화가 여기서 이루어진다**)

    - queue 객체 : 상태를 업데이트할 때 필요한 정보들을 담고 있는 객체이며, dispatch가 상태를 업데이트하는 함수이다. (다음 포스팅에 자세히 설명하겠다)

    - hook을 리턴한고 함수를 종료한다.

- mountState 나머지 부분을 보자.
  ![mountState02](../../static/img/series/react/mountState02.png)  

  - dispatch는 상태 업데이트 함수이다.
    - dispatch는 dispatchSetState함수를 bind하고있는데, 이때 인자들은 currentlyRenderingFiber(현재 fiber)와 queue이다.
    - 우리가 setState 인자로 받는 부분이 바로 이 코드를 통해 이루어진다.

  - `return [hook.memoizedState, dispatch]`
    - 즉, useState 함수 리턴값 배열의 첫번째 원소는 hook.memoizedState가 들어가게되고(**state**), 두번째 원소는 dispatch가 상태 업데이트 함수(**setState**)로 들어가게된다.


## 정리
우리가 useState 호출을 통해 리턴받는 배열은 바로 `return [hook.memoizedState, dispatch]` 이 부분이며, 첫번째 원소로는 기억하고있는 상태값인 **hook.memoizedState**이고 두번째 원소로는 상태 업데이트 함수인 **dispatch**이다.

## 마치며
이번 포스팅에서는 useState의 state가 어떻게 구현되어있는지 살펴보았고 setState에 대해서도 간략히 살펴보았다.  
다음 포스팅에서 setState에 대해 자세히 알아보자.