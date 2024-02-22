---
title: '[시리즈] 리액트 원리 파헤치기 02 - react element'
summary: '리액트 파헤치기 시리즈 - react element'
tag: [리액트 파헤치기 시리즈, REACT]
idx: 2
---

fiber node 객체에 대해 살펴보기전에 react element가 무엇인지 정확히 알고 넘어갈 필요가 있다.  
react element가 무엇인지에 대해 살펴보자

## react element란?
react element는 컴포넌트 관련 정보를 갖고 있는 객체이다. type, key, props, ref 등의 프로퍼티를 소유하고 있다.  
react element 종류로는 DOM elements와 Component elements가 있다.  

우리가 리액트 컴포넌트를 작성할때 JSX문법으로 작성하면 그것을 트랜스파일링하여 react element 형태를 리턴받게 된다.  
이 과정을 좀더 자세하게 설명하자면 다음과 같다.  

```javascript
컴포넌트를 호출 -> 리턴한 DOM elements (JSX 문법) -> 트랜스파일링 -> react.createElement()를 호출 -> react element를 리턴받음
```

컴포넌트를 호출했을때 Component elements를 리턴받으면 DOM elements를 리턴할때까지 계속해서 순회하여 호출하게 된다. 결국 DOM elements로 구성되어있는 element tree가 완성된다. 

## react element의 종류
종류는 DOM elements, Component elements 2가지 종류가 있다.    
`(type: string | ReactClass, props: object)`  
이때 type이 string이면 DOM elements이며, ReactClass이면 Component elements이다.

1. DOM elements
- type: string
- props: html태그의 attribute
```javascript
<button className="btn-red">
    confirm
</button>

// 트랜스파일링 결과
{
  type: 'button',
    props: {
      className: 'btn-red',
      children: 'confirm'
    }
}
```

2. Component elements
- type: ReactClass
- props: DOM 렌더링에 필요한 정보들
```javascript
<Button color="red">confirm</Button>

// 트랜스파일링 결과
{
    type: Button,
    props: {
        color: 'red',
        children: 'confirm'
    }
}
```

Component elements는 DOM elements를 캡슐화한 것이다.  
해당 컴포넌트를 호출하면 DOM elements를 결국 return 하게 된다.  

```javascript
<Button color="red">confirm</Button>

function Button(props) {
  return (
	<button className={props.color}>
		confirm
	</button>
  )
}
```

## 정리
즉 Component elements로 개발자가 직접 DOM 트리에 전달할 정보를 정의할 수 있고   
각각의 elements들이 elements tree 구조로 이루어 DOM 트리에 전달할 정보를 가지고 있게 되는 자바스크립트 객체인 것이다.

## 마치며
사실 react element는 fiber node로 확장되어 VDOM에 반영되게 된다.  
이는 앞으로 자세하게 알아볼 것이니 react element가 무엇인지에 대해서만 기억하자
