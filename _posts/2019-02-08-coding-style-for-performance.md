---
layout: post
title: '성능을 높이는 코드 스타일 [ javascript ]'
tags: [javascript, code style, book, 성능, 자바스크립트, 웹개발, web, frontend, 프론트엔드]
---

## 객체의 생성, 초기화 성능
---

### 스코프 체인 탐색과 성능
배열은 생성자 혹은 리터럴 형식([ ])을 사용해 객체를 생성할 수 있습니다.
<pre>
<code class="language-javascript">
// Array() 생성자를 사용한 배열 생성
var arr = new Array();
  
// 리터럴 형식으로 배열 생성
var arr = [];
</code>
</pre>
리터럴 형식을 사용한 경우에 여러 브라우저에서 좀 더 좋은 성능을 보여 줍니다.<br />
배열의 각 요소에 데이터를 할당하는 방법에는 접근자 [ ]를 사용하는 방법과 push( ) 메서드를 사용하는 방법이 있습니다.
<pre>
<code class="language-javascript">
// 접근자를 사용한 데이터 할당
var arr = [];

for(var i=0; i < 1000; i++) {
 arr[i] = i;
}

// push() 메서드를 사용한 데이터 할당
var arr = [];

for(var i=0; i < 1000; i++) {
 arr.push(i);
}
</code>
</pre>
최적화 방법 : 배열을 사용할 때는 리터럴 형식으로 객체를 생성하고 Array.push( ) 메서드보다는 접근자[ ]를 사용해 데이터를 추가하는 코드를 작성하는 것이 좀 더 최적화된 배열 사용법입니다.

### 오브젝트(Object) 객체의 생성, 초기화 성능 비교
오브젝트 객체도 객체를 생성하고 초기화하는 방법으로 리터럴을 사용하는 방법과 생성자를 사용하는 방법이 있습니다.
<pre>
<code class="language-javascript">
// 리터럴을 사용한 오브젝트 객체 생성
var obj = {};

// 생성자를 사용한 오브젝트 객체 생성
var obj = new Object();
</code>
</pre>
큰 차이는 없지만 리터럴을 사용하는 방법이 약간의 더 좋은 성능을 보여 줍니다.
- new Object( ) 보다는 객체 리터럴 var obj = { }; 을 활용해야 합니다.
- 아래와 같이 생성자에 어떤 인자를 받느냐에 따라 다른 객체가 생성됩니다.
- 아래와 같은 이유로, Object( ) 생성자는 런타임시 결정되는 동적인 값이 생성자에 인자로 전달된 경우 예기치 않은 결과가 반환될 수 있습니다.
<pre>
<code class="language-javascript">
// 일반 객체
var o = new Object();
console.log(o.constructor === Object); // true

// 숫자 객체
var o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2)); // "1.00"

// 스트링 객체
var o = new Object('I am a strong');
console.log(o.constructor === String); // true
console.log(typeof o.substring); // "function"

// boolean 객체
var o = new Object(true);
console.log(o.constructor === Boolean); // true
</code>
</pre>
오브젝트 객체 초기화
- 오브젝트 객체를 초기화할 때는 .연산자를 이용한 방법과 []연산자를 이용한 방법이 있습니다.
- safari를 제외한 대부분의 브라우저에서 비슷한 성능을 보였습니다. 단 safari에서는 .연산자가 더 좋은 성능을 보였습니다.
<pre>
<code class="language-javascript">
// . 연산자를 이용한 데이터 삽입
var obj = {};

obj.a = 1;
obj.b = 2;
obj.c = 3;
obj.d = 4;
obj.e = 5;
obj.f = 6;

// [] 연산자를 이용한 데이터 삽입
var obj = {};
obj['a'] = 1;
obj['b'] = 2;
obj['c'] = 3;
obj['d'] = 4;
obj['e'] = 5;
obj['f'] = 6;
</code>
</pre>
결론 : 배열에서와는 다르게 어느 한 쪽의 코드가 더 성능이 좋다고 말할 수 없을 정도로 비슷한 성능을 보였습니다.

## 스코프 체인 탐색과 성능
---

### 자바스크립트 실행 성능을 저해하는 요인
인터프리터 언어로서 자바스크립트는 JIT(Just-In-Time) 컴파일러 도입 등 자바스크립트의 실행을 최적화하기 위한 여러 가지 방법을 도입하고 있지만 개발자가 작성한 코드 자체의 성능이 런타임 성능에도 많은 영향을 줍니다. 
런타임 환경에서 자바스크립트의 실행 성능을 저해하는 요인은 변수, 객체, 함수 등의 메모리상의 위치를 찾는 탐색 작업입니다. <br />

### 스코프 체인이란?
1. 함수를 실행하면서 어떤 속성(변수, 객체 등)에 접근해야 할 때 객체에 접근하기 위한 객체의 참조를 특정한 공간에 저장해 둡니다. 이 공간이 바로 스코프 체인입니다. <br />
2. 스코프 체인의 구성 요소에는 활성화 객체와 전역 객체가 있습니다. <br /> 
3. 함수 내부에서만 접근할 수 있는 함수의 지역변수나 this, arguments 객체 등은 스코프 체인의 활성화 객체에 포함됩니다. <br />
4. 함수 외부에서도 접근할 수 있는 window, document, 전역함수, 전역변수와 같은 속성은 스코프 체인의 전역 객체에 포함됩니다. <br />
5. window, document 등의 전역객체는 웹페이지의 자바스크립트가 동작하는 모든 시간동안 존재하며, 함수 실행시 함수에서 전역속성을 탐색하는데 사용됩니다. <br />
6. 반면 활성화 객체는 함수가 실행되는 동안에만 존재하며, 함수 내부에서 자주 사용하는 데이터가 모여 있는 만큼 최우선으로 탐색하는 대상 객체가 됩니다. <br />
7. 실행문맥은 함수가 동작하는 환경을 나타내며, 브라우저 내부에서 사용되는 객체입니다. 실행문맥은 함수가 실행될 때 새로 생성되고 함수가 종료될 때 소멸되며 함수의 스코프 체인에 대한 참조를 가지고 있게 됩니다. <br />
8. 함수는 어떤 속성에 접근해야 할 때 실행문맥을 통해 스코프 체인에 접근합니다. <br />
9. 실행문맥은 자신과 연관된 함수의 스코프 체인을 참조하고 있으며, 함수에서 접근해야 할 어떤 속성의 탐색 경로는 '실행문맥 > 스코프체인 > 활성화객체 > 스코프체인 > 전역 객체'와 같이 구성됩니다.

<pre>
<code class="language-javascript">
function isZero(num) {
 var res = (num === 0);
 return res;
}

var result = isZero(0);
</code>
</pre>
- 위의 예제는 파라미터 값이 0인지 판별하는 isZero() 함수의 코드입니다. 
- 위의 isZero() 함수에 있는 구문을 실행할 때 함수의 파라미터 변수인 num과 함수의 지역변수로 선언된 res에 대해 해당 변수의 메모리에 접근해야 합니다.
- 둘 다 활성화 객체에 포함돼 있는 속성이기 때문에 '실행문맥 > 스코프 체인 > 활성화 객체'의 경로로 탐색해 접근합니다. 전역 객체는 탐색하지 않습니다.
- 만약 window, document 등의 전역변수에 접근해야 한다면 '실행문맥 > 스코프 체인 > 활성화 객체 > 스코프 체인 > 전역 객체'의 경로로 속성을 탐색했을 것입니다.
- 즉, 활성화 객체를 먼저 탐색한 후 찾는 속성이 없을 때는 스코프 체인에 참조 되 있는 다음 탐색 대상인 전역 객체를 탐색하게 됩니다.

함수가 중첩될 경우에는 중첩이 깊어질수록 활성화 객체는 함수의 중첩된 깊이만큼 생성됩니다. 즉, 3번 중첩된 함수에서 가장 안쪽의 함수는 스코프 체인에 3개의 활성화 객체를 갖게 되는 것입니다. <br />
- 가장 안쪽의 함수에서 전역 속성에 접근할 때는 '실행문맥 > 스코프체인 > 활성화객체1 > 스코프체인 > 활성화객체2 > 스코프체인 > 활성화객체3 > 스코프체인 > 전역 객체'와 같이 긴 탐색 경로를 거쳐야 합니다.
- 이러한 탐색 경로를 줄임으로써 실행 시간을 단축하고 자바스크립트 성능을 향상시킬 수 있습니다. 

스코프 체인의 최상위에는 현재 실행 중인 가장 안쪽에 중첩된 함수의 활성화 객체를 참조하며, 그 뒤로 바깥쪽 방향으로 중첩된 함수의 순서대로 각 함수의 활성화 객체를 참조하게 됩니다. 그리고 마지막으로 전역 객체를 참조하게 됩니다.
### 지역변수를 활용한 스코프 체인 탐색 성능 개선
함수 내에서 전역 스코프 변수에 직접 접근하는 예제
- makeList() 함수가 실행되면 함수 내부에서 htmlstring, i 속성에 접근하기 위해 스코프 체인을 탐색합니다.
- 이때 htmlstring 객체를 찾기 위해 활성화 객체에 먼저 접근해서 탐색하지만 찾지 못하고, 다시 전역 객체를 탐색해서 찾아야 합니다. 
<pre>
<code class="language-javascript">
// 함수 내에서 전역 스코프 변수에 직접 접근하는 예제
window.htmlstring = [];

function makeList() {
  htmlstring.push('&lt;ul&gt;');
  for (var i=0; i<100; i++) {
    htmlstring.push('&lt;li&gt;value: ' + i + '&lt;/li&gt;');
  }
  htmlstring.push('&lt;/ul&gt;');
}

makeList();
</code>
</pre>
함수 지역변수로 참조해 전역 스코프 변수에 접근하는 예제
- 아래 코드에서 var htmlstr = htmlstring; 부분이 성능 개선의 핵심입니다. 전역객체에 존재하는 htmlstring 속성을 makeList() 함수의 지역변수에 저장해 활성화 객체에서 바로 찾을 수 있습니다.
- var htmlstr = htmlstring; 구문을 실행할 경우 '실행문맥 > 스코프 체인 > 활성화 객체 > 스코프 체인 > 전역 객체'와 같은 탐색경로를 최초 한 번만 거치게 됩니다.
- 그 이후에는 활성화 객체에 저장된 htmlstr 속성으로 전역변수인 htmlstring 객체에 접근할 수 있으므로 활성화객체를 거쳐 전역 객체까지 탐색할 필요가 없어진다.
<pre>
<code class="language-javascript">
// 함수 지역변수로 참조해 전역 스코프 변수에 접근하는 예제
window.htmlstring = [];

function makeList() {
  var htmlstr = htmlstring;
  htmlstring.push('&lt;ul&gt;');
  for (var i=0; i<100; i++) {
    htmlstring.push('&lt;li&gt;value: ' + i + '&lt;/li&gt;');
  }
  htmlstring.push('&lt;/ul&gt;');
}

makeList();
</code>
</pre>
최적화 방법 :전역객체에 속하는 window, document, 전역함수, 전역변수와 같은 속성은 함수의 지역변수로 저장해 탐색경로를 줄여 성능을 향상 시킬 수 있습니다.
### 프로토타입 체인
자바스크립트의 모든 객체의 인스턴스는 new 연산자로 생성할 수 있으며, 
생성된 인스턴스 객체는 생성자의 프로토타입(prototype)을 참조하게 됩니다. 
이렇게 생성한 인스턴스 객체는 원본 객체 생성자 함수의 프로토타입 속성에 접근할 수 있습니다.
인스턴스 객체가 원본 객체 생성자 함수의 프로토타입 속성을 탐색할 때도 탐색을 위한 체인이 생성되는데, 이를 프로토타입 체인이라 합니다.
obj - 인스턴스 객체, Object - 생성자 함수 <br />
<pre>
<code class="language-javascript">
//obj - 인스턴스 객체, Object - 생성자 함수
var obj = new Object();     
</code>
</pre>
- 위 코드에서 Object는 자신의 프로토타입을 참조하며, var obj = new Object( ); 구문이 실행되면 obj는 Object의 프로토타입을 상속 받습니다.
- 이 과정에서 탐색 경로가 길어질 수 있으며, 탐색 경로의 거리에 따라 프로토타입 체인에서도 스코프 체인에서와 같은 성능 저하가 발생할 수 있습니다.
- 그러므로 프로토 타입에 존재하는 속성을 사용할 때 지역변수에 담아서 사용한다면 불필요한 탐색 과정을 줄여 성능을 높일 수 있습니다.

### 그 외 스코프 체인 탐색 성능에 영향을 미치는 요소
with 구문
<pre>
<code class="language-javascript">
var obj = new Object();

obj.name = "test";
obj.age = 28;
obj.address = "seoul";

// with 구문
with (obj) {
  name = "test";
  age = 28;
  address = "seoul";
}
</code>
</pre>
- with 구문을 사용하면 참조하는 멤버가 속한 객체를 지정하는 과정을 생략해서 코드의 용량을 줄일 수 있습니다. 
- 하지만 with 구문 내에서 with 구문이 포함된 영역의 지역변수 등에 접근하는 것조차 탐색경로를 2번 거쳐야 하므로 성능이 저하됩니다.

try-catch 구문도 with와 같은 방식으로 동작하기 때문에 스코프 체인 탐색에서의 성능 저하가 발생할 수 있으므로 성능 문제를 감안해야 합니다.

## 반복문과 성능
---

### 반복문의 성능 비교
[배열을 초기화하는 코드와 성능 비교를 위한 4개의 반복문을 테스트하는 코드](http://jindo.dev.naver.com/jsMatch/index.html?d=35) 
<pre>
<code class="language-javascript">
// 배열을 초기화하는 코드
arr = [];

for (var i = 0; i < 400; i++) {
  arr[i] = i;
}

// Code1 - for 구문
for (var i = 0, len = arr.length; i < len; i++) {
  arr[i]++;
}

// Code2 - for in 구문
for (var i in arr) {
  arr[i]++;
}

// Code3 - while 구문
var i = 0, len = arr.length;
while(i < len) {
  arr[i] = i;
  i++;
}

// Code4 - do while 구문
var i = 0, len = arr.length;

do {
  arr[i] = i;
  i++;
} while (i < len);
</code>
</pre>
- 결과를 보면 for-in 구문은 IE 이외의 브라우저에서는 두드러질 정도로 성능이 좋지 않습니다. 빠른 응답시간을 구현하려면 되도록 for-in 구문을 사용하지 않는 것이 좋습니다. 
- for-in 구문은 인자로 주어진 배열을 배열이 아닌 일반 객체로 취급하며, 반복시점마다 객체의 모든 속성을 무작위로 탐색하여 현저하게 느려집니다.
- for-in 구문은 그 목적 자체가 객체의 속성을 탐색하는 것입니다. 객체의 속성을 탐색하는 데만 사용하길 권장합니다.

### for, while, do-while 구문의 최적화
[for 구문 최적화 코드](http://jindo.dev.naver.com/jsMatch/index.html?d=19&openResult=1)
<pre>
<code class="language-javascript">
// for 구문 최적화 테스트용 사전 코드
arr = [];
for (var i = 0; i < 400; i++) {
  arr[i] = i;
}

// code #1 - 최적화 이전의 for 구문
for (var i = 0; i < arr.length; i++) {
  arr[i]++;
}

// code #2 - 최적화 이후의 for 구문
for (var i = 0; len = arr.length; i < len; i++) {
  arr[i]++;
}
</code>
</pre>

### 효율적인 알고리즘 구현을 통한 성능 개선
반복 횟수를 최소화 하는 효율적인 알고리즘 사용 (퀵 소트, 머지소트, BFS, DFS 등)
반복문을 실행하는 도중 목적을 달성했을때 break 등을 호출해 불필요한 반복문을 호출하지 않고 빠져나오게 합니다.

## 조건문과 성능
---

### [조건문의 성능 비교](http://jindo.dev.naver.com/jsMatch/index.html?d=27&openResult=1)
if-else 구문을 활용한 조건 분기
<pre>
<code class="language-javascript">
// Code #1
function toEnglish(value) {
  var number = 'zero';

  if (value === 1) {
    number = 'one';
  } else if(value === 2) {
    number = 'two';
  } else if(value === 3) {
    number = 'three';
  } else if(value === 4) {
    number = 'four';
  } else if(value === 5) {
    number = 'five';
  } else if(value === 6) {
    number = 'six';
  } else if(value === 7) {
    number = 'seven';
  } else if(value === 8) {
    number = 'eight';
  } else if(value === 9) {
    number = 'nine';
  } else if(value === 10) {
    number = 'ten';
  } else {
    number = 'null';
  }
  
  return number;
}

for(var i = 0; i < 12; i++) {
  toEnglish(i);
}
</code>
</pre>
switch-case구문을 활용한 조건 분기
<pre>
<code class="language-javascript">
// Code #2
function toEnglish(value) {
  var number = 'zero';

  switch (value) {
  case 1:
    number = 'one';
    break;
  case 2:
    number = 'two';
    break;
  case 3:
    number = 'three';
    break;
  case 4:
    number = 'four';
    break;
  case 5:
    number = 'five';
    break;
  case 6:
    number = 'six';
    break;
  case 7:
    number = 'seven';
    break;
  case 8:
    number = 'eight';
    break;
  case 9:
    number = 'nine';
    break;
  case 10:
    number = 'ten';
    break;
  default :
    number = 'null';
    break;
 }

 return number;
}

for (var i = 0; i < 12; i++) {
  toEnglish(i);
}
</code>
</pre>
삼항연산자를 활용한 조건 분기
<pre>
<code class="language-javascript">
// Code #3
function toEnglish(value) {
  var number = false;

  number = (value === 1) ?
    'one' : (value === 2) ?
    'two' : (value === 3) ?
    'three' : (value === 4) ?
    'four' : (value === 5) ?
    'five' : (value === 6) ?
    'six' : (value === 7) ?
    'seven' : (value === 8) ?
    'eight' : (value === 9) ?
    'nine' : (value === 10) ?
    'ten' : 'null';

  return number;
}

for(var i = 0; i < 12; i++) {
  toEnglish(i);
}
</code>
</pre>
사파리를 제외하고 조건문 사이에 성능차이가 크지는 않지만 삼항연산자가 미세하게 성능이 가장 좋고 코드 양도 적으므로 사용에 권장하지만 가독성을 고려해서 사용해야 합니다.

## 문자열 연산과 성능
---

### [문자열 생성 성능 비교](http://jindo.dev.naver.com/jsMatch/index.html?d=26&openResult=1)
String 객체, 리터럴 성능 비교
<pre>
<code class="language-javascript">
// String 객체를 이용한 문자열 생성
var str = new String('abcdefghijklmnopqrstuvwxyz');

// 리터럴을 이용한 문자열 생성
var str = 'abcdefghijklmnopqrstuvwxyz';
</code>
</pre>
- 리터럴을 이용해 문자열을 생성한 것이 String 객체럴 이용한 방법 보다 성능이 훨씬 좋습니다. 리터럴을 사용하는 걸 권장합니다.

### [문자열 연산 성능 비교](http://jindo.dev.naver.com/jsMatch/index.html?d=25&openResult=1)
+= 연산자, Array.join() 성능 비교
<pre>
<code class="language-javascript">
// += 연산자를 이용한 문자열 병합
str = '';
for(var i = 0; i < 100; i++) {
  str += 'test';
}

// Array.join() 메서드를 이용한 문자열 병합
arr = [];
for(var i = 0; i < 100; i++) {
  arr[i] = 'test';
}
arr.join('');
</code>
</pre>

## 요약 및 정리
---

### 성능우위 문법
배열 생성시 : <br />
<pre>
<code class="language-javascript">
var arr = new Array(); 보다 var arr = []; 를 사용해야 합니다. 
</code>
</pre>
배열 접근시 : <br />
<pre>
<code class="language-javascript">
arr.push(i) 보다 arr[i] = value 를 사용해야 합니다.
</code>
</pre>
객체 생성시 :  <br />
<pre>
<code class="language-javascript">
var obj = new Object(); 보다 var obj = {}; 를 사용해야 합니다.
</code>
</pre>
객체 접근시 : <br />
<pre>
<code class="language-javascript">
obj['a'] = 1 보다 obj.a = 1; 를 사용해야 합니다.
</code>
</pre>
문자열 생성시 :  <br />
<pre>
<code class="language-javascript">
var str = new String('aaa'); 보다 var str = 'aaa'; 를 사용해야 합니다.
</code>
</pre>
문자열 연산시 : <br />
loop 문에서 문자열 조작시에 <code class="language-javascript">str += 'test'; 보다 arr = []; loop { arr[i] = 'test'; } arr.join(''');</code> 을 사용해야 합니다. (String과 StringBuffer 개념과 유사)<br /><br />
정규표현식 : <br />
탐색 대상을 축소합니다. loop 문 안에 정규표현식 넣지 말고 밖에 놓아 한번만 컴파일 처리되게 해야 합니다. loop 문에 있으면 계속 컴파일 됩니다. <br />

### 스코프 체인 탐색 줄이기 
스코프 체인 : <br />
탐색 성능을 높이는 것이 본질 (자바스크립트 실행 성능 저하는 변수, 객체, 함수의 메모리상 위치 탐색 작업) <br />
스코프 체인 구성 = 활성화 객체(Activate Object) + 전역 객체(Global Object) <br /><br />
활성화 객체 : <br />
함수 내부 접근시 생성 (지역변수, this, arguments 객체) -> 함수 빠져 나오면 활성화 객체 제거됩니다.
실행 문맥(Execution Context) -> 스코프 체인 (1, 2) -> 활성화 객체 (1) -> 전역 객체 (2) 로 프로그램 수행됩니다. <br /><br />
함수가 전역 속성 참조 순서 :  <br />
실행문맥 > 스코프 체인 > 활성화 객체 (함수) > 스코프 체인 > 전역 객체의 속성 참조 <br /><br />
활성화 객체에서 전역 변수 사용시 :  <br />
함수 내부에 <code class="language-javascript">var LocalVariable = GlobalVariable; </code>식을 첨부 (전역속성 탐색을 제거)

### 프로토타입 체인 탐색 줄이기
<code class="language-javascript">new</code> 연산자로 생성된 인스턴스 객체는 생성자의 프로토타입을 참조하게 됩니다. <br />
<code class="language-javascript">var obj = new Object();</code> obj는 Object의 프로토타입 속성에 접근 할 수 있습니다. <br />
자신의 객체만 접근하고 할 경우는 <code class="language-javascript">hasOwnProperty</code>를 이용해야 합니다. <br />

### 반복문 & 조건문
1. for~in 문은 가급적 쓰지 말아야 합니다.
2. for 문안에 <code class="language-javascript">Array.length</code> 구하는 함수등을 호출하지 말고, 외부에서 <code class="language-javascript">var length = Array.length</code> 를 설정해야 합니다. 스코프체인의 활성화 객체를 찾아가는 탐색 경로를 거치게 되므로 응답성능이 느려집니다.
3. 조건절을 빠른 탐색을 위한 알고리즘을 적절히 적용해야 합니다. <br />
(quick-sort, merge-sort, breadth first search, depth first search 등) <br />
<br /><br /><br />

## Reference
---
- [자바스크립트 성능 이야기 NHN은 이렇게 한다!](http://www.yes24.com/24/goods/7516929)



