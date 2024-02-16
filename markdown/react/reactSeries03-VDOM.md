---
title: '[시리즈] 리액트 원리 파헤치기 03 - VDOM과 reconciler'
summary: '리액트 파헤치기 시리즈 03 - VDOM과 reconciler'
tag: [리액트 파헤치기 시리즈, REACT]
idx: 7
---

virtual DOM이라고 하는 VDOM과 reconciler에 대해 알아보자.

## VDOM은 리액트의 렌더링 컨셉이다.
UI 정보를 가진 가상 DOM과 실제 DOM을 비교하여(재조정) 업데이트된 부분만 일괄로 브라우저에 반영한다라는 컨셉이다.  
왜 가상에서 하냐면 실제 DOM을 조작하면서 paint하면 가상으로 하는것보다 훨씬 더 비용이 들기 때문이다.  
따라서 리액트는 가상 DOM과 렌더링 과정 최적화(재조정 reconciliation)를 통해 렌더링을 지원하는 라이브러리이다.

그렇다면 리액트의 렌더링 방식은 어떤 설계방식(아키텍쳐)로 이루어져있을까?  
그건 바로 리액트 파이버이다.

## VDOM의 구현
리액트 파이버아키텍쳐에서 VDOM은 FiberNode 생성자 함수로 생성한 객체들의 집합으로 이루어진 트리 구조이다.  
이 파이버 트리는 애플리케이션의 구조와 상태를 나타내며 current트리와 workInProgress 트리 2개가 존재한다.

1. **current 트리**
- 현재 UI 렌더링 정보가 담긴 파이버 트리 

2. **workInProgress 트리**
- 작업중인 상태를 나타내는 트리

왜 2개가 존재하냐면 더블 버퍼링 구조로 설계되어 있기때문에 원본 트리와 작업중 트리를 가지고 있으며,  
렌더링 순서를 유연하게 조작하기 위해서는 원본이 필요하기 때문이다.
즉, 업데이트가 발생하면 current tree를 복제하여 workInProgress tree가 생성되고  
이 workInProgress tree에 변경사항을 업데이트하고 재조정 과정을 거쳐 render phase가 끝나고 commit phase에서 current tree로 교체된다.

## reconciler
reconciler는 업데이트를 감지하여 workInProgress 트리를 만들고  current트리와 workInProgress 트리를 비교하여 실제 DOM에 적용할 업데이트사항을 결정하는 역할을 한다.

## 라이프사이클
리액트에서 라이프사이클 단계는 render phase단계와 commit phase단계로 이루어져있다.  

1. **render phase**
- VDOM을 재조정(reconciliation)하는 단계이다.
- 이 과정은 비동기로 실행될 수 있다.(이전 stack아키텍처는 이부분이 동기적으로 발생되었었음)

2. **commit phase**
- 재조정한 VDOM을 실제 DOM에 일괄 반영하고 라이프사이클 메소드 또는 훅을 실행하는 단계이다.
- 이 과정은 동기적으로 실행된다.

## 마치며
이번에는 VDOM과 reconciler가 무엇인지에 대해 알아보았다.  
복잡하게 생각할 필요없이 결국 리액트는 VDOM과 reconciler라는 컨셉을 통해 렌더링 과정을 최적화하는 라이브러리라는 것을 기억하자.  
다음은 useState를 코드 레벨에서 까보면서 reconciler가 어떤 역할을 하는지 알아보자.