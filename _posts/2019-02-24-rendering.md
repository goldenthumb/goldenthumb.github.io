---
layout: post
title: 'Rendering [browser]'
tags: [browser, javascript, rendering, reflow, repaint, 브라우저 렌더링]
---

## Rendering
---
렌더링이란 요청받은 내용을 브라우저 화면에 표시하는 과정을 말합니다.
일반적인 전체 흐름은 브라우저에 문서가 로딩됨에 따라 DOM 요소와 스타일(CSS Object Model)에 기반을 둔 레이아웃을 계산하고 문서에 요소를 그립니다. <br />

브라우저에서 렌더링 성능은 중요한 요소 중 하나입니다. 
렌더링 성능을 향상시키면 사용자가 느끼는 체감 속도를 개선할 수 있습니다. 
+ 웹 사이트 반응 시간 
    * 0.1초 : 사용자의 동작에 해당 기능이 바로 반응한다고 느끼는 시간 
    * 1초 : 불필요하게 오래 기다리지 않았다고 느끼는 시간 
    * 10초 : 사용자가 집중력을 잃지 않는 최대 시간 

### 렌더링이 진행되는 과정
- 렌더링은 화면에 컨텐츠를 그리는 과정으로, 브라우저들은 각자의 렌더링 엔진으로 이를 구현해놓았습니다.
- 크롬과 사파리는 "Webkit 엔진"을 사용하며 파이어폭스는 "Gecko 엔진"을 사용합니다.
- Webkit 과 Gecko 가 용어를 약간 다르게 사용하고 있지만 동작 과정은 기본적으로 동일하다는 것을 아래 그림에서 알 수 있습니다.

![webkit](https://d2.naver.com/content/images/2015/06/helloworld-59361-3.png){:.center}
<center>Webkit 동작 과정 - https://d2.naver.com/helloworld/59361</center>
<br />
![gecko](https://d2.naver.com/content/images/2015/06/helloworld-59361-4.png){:.center}
<center>Gecko 동작 과정 - https://d2.naver.com/helloworld/59361</center>
<br />

DOM 트리 생성 > 스타일 구조체 생성 > 렌더 트리 생성 > 레이아웃 처리 > 페인트 
- [Step1] 문서 파싱 : HTML 문서를 파싱하여 "Content Tree"에서 태그를 DOM 노드로 변환하고, 외부 CSS 파일을 포함하여 스타일 요소도 파싱합니다.
- [Step2] 렌더트리 생성 : Step1에서 얻은 스타일 정보와 HTML 표시 규칙을 가지고 "렌더트리"를 생성한다. 렌더트리는 색상과 면적과 같은 시각적 속성 정보를 가지고 있습니다.
- [Step3] 렌더트리 배치(Reflow) : Step2에서 생성된 렌더트리를 기반으로 각 노드가 화면에 정확한 위치에 표시되도록 배치하는 과정입니다.
- [Step4] 렌더트리 배치(Repaint) : Step3에서 배치된 노드들을 가로지르며 그리는 과정으로 visibility, outline, background-color 와 같이 시각적 속성에 해당하는 정보를 입힙니다.

렌더링 엔진은 보다 나은 사용자 경험을 위해 위의 과정을 순차적으로 수행하지 않고 점진적으로 수행합니다.
즉, 1번 과정인 HTML 파싱이 끝날때까지 기다리지 않고, 수행되는대로 배치와 그리기 과정을 동시에 수행하도록 되어 있습니다.
단, table 의 경우는 기본적으로 점진적 렌더링이 적용되지 않습니다. (table-layout: fixed 일 경우에만 점진적 렌더링이 적용)
<br /><br />

### 리플로와 리페인트
#### 1. 리플로
렌더트리가 배치되는 과정으로 렌더러가 생성되어 렌더트리에 추가될 때 할당되지 않았던 정보(크기, 위치 등)를 계산합니다.

##### 렌더트리 배치 과정
+ 렌더트리의 각 요소(렌더러)들은 아래와 같은 과정을 거쳐 화면에 배치됩니다.
    * 최상위 렌더러의 위치는 0,0으로 결정되며, 뷰포트(브라우저 창에서 보이는 영역 크기) 만큼의 면적을 가집니다.
    * HTML 문서의 <html> 요소에 해당하는 최상위 렌더로로부터 계층적으로 배치됩니다.
    * 배치는 화면의 왼쪽에서 오른쪽, 그리고 위에서 아래 순으로 이루어집니다.
    * 배치가 순차적으로 진행될 때 나중에 등장하는 요소는 앞서 등장한 요소의 위치나 크기에 영향을 미치지 않습니다.
+ 배치의 종류
    * 전역 배치(Global reflow) : 전체 렌더러를 다시 배치할 필요가 있을 때 수행합니다. 화면 첫 진입 시, 글꼴 크기 변경과 같은 전역 스타일 변경, 화면 사이즈 변경과 같은 상황에서 발생합니다.
+ 위치 결정 방법 
    * Normal : 렌더트리에서의 위치가 DOM 트리에서의 위치와 같고, 문서안의 위치는 박스 유형과 면적에 따라 배치됩니다.
    * Float : Normal 과 같이 배치된 후 왼쪽이나 오른쪽으로 흘러 이동합니다.
    * Absolute : 'position:absolute', 'position:fixed'의 경우로, DOM 트리와는 다른 자리의 렌더트리에 렌더러가 배치됩니다.

#### 2. 리페인트
렌더러의 시각적 요소(visibility, outline, background-color 등)가 표현되는 과정으로 렌더러의 "paint" 메서드가 호출된다.

##### 리페인트 진행 순서
배경색  >  배경이미지  >  테두리  >  자식  >  아웃라인

#### 3. 리플로와 리페인트 발생 요인 
- DOM 노드의 변경 : 추가, 제거 업데이트
- DOM 노드의 노출 속성을 통한 변경 : display: none 은 리플로와 리페인트를 발생, visibility: hidden 은 요소가 차지한 영역을 유지해 레이아웃에 영향을 주지 않으므로 리페인트만 발생
- 스크립트 애니메이션 : 애니메이션은 DOM 노드의 이동과 스타일 변경이 짧은 시간 내에 수차례 반복해 발생되는 작업
- 스타일 : 새로운 스타일시트의 추가 등을 통한 스타일 정보 변경 또는 기존 스타일 규칙의 변경
- 사용자의 액션 : 브라우저 크기 변경, 글꼴 크기 변경 등

#### 4. 렌더링 과정 확인하기
+ 크롬 렌더링의 3가지 단계
    * Recalculate Style : 요소의 스타일 값을 재 계산 하는 단계
    * Layout : 리플로가 발생한 단계
    *  Paint : 변경된 요소를 화면에 표현하는 단계

<pre>
<code class="language-markup">
&lt;html lang="ko"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8" /&gt;
  &lt;title&gt;렌더링 테스트<&lt;/title&gt;
  &lt;style&gt; 
    .box { margin: 10px 10px; width: 100px; height: 100px; float:  left; }
     #box1 { background-color: black; }
     #box2 { background-color: red; } 
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div id="box1" class="box" onmouseover="test1()"&gt;&lt;/div&gt;
&lt;div id="box2" class="box" onmouseover="test2()"&gt;&lt;/div&gt;
  &lt;script&gt;
    function test1() {
      document.getElementById('box1').style.backgroundColor='green';
    }
    
    function test2() {
      document.getElementById('box2').style.width = '300px';
    }
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
- box1 마우스 오버시 
![box1](/assets/images/posts/rendering-box1.png)
- box2 마우스 오버시 
![box2](/assets/images/posts/rendering-box2.png)

#### 5. 리플로 최소화 방법
- 동일 요소에 스타일 변경은 가급적 한번에 처리해야 합니다.
- 노드 복제(cloneNode) 또는 cssText 프로퍼티를 사용하는 방법이 있습니다.
+ 캐쉬를 활용해서 Reflow 최소화 시켜야 합니다.
    * 브라우저는 레이아웃 변경을 큐에 저장했다가 한번에 실행하는 방법으로 Reflow 수를 줄입니다. 하지만 offset, scrollTop, scrollLeft 값과 같은 계산된 스타일 정보를 요청할 때마다 정확한 정보를 제공하기 위해 큐를 비우고 모든 변경을 다시 적용합니다. 즉, 중복되는 수치에 대한 스타일 정보를 변수에 저장(캐쉬)해 요청수를 줄임으로써 Reflow 비용을 최소화 시킵니다. 
+ 클래스 변화에 따른 스타일 변경 시, 최대한 DOM 구조 상 끝단에 위치한 노드에 적용 해야합니다.
    * 가급적 말단에 위치한 노드 수치 변경 시 리플로우 수행 반경을 전체 노드가 아닌 일부 노드로 제한 시킬 수 있습니다. 즉, Reflow 수행 비용을 줄일 수 있다는 말과 같다고 할 수 있습니다.
+ 인라인 스타일을 최대한 배제해야한다.
    * DOM 은 매우 느린 구조체입니다. 게다가 인라인상에 스타일이 주어진 경우, 리플로우는 페이지 전체에 걸쳐 수차례 발생하게 됩니다. 만일 인라인 스타일이 없을 경우, 외부 스타일 클래스의 조합으로 단 한번만 리플로우를 발생시킵니다.
+ 애니메이션이 들어간 엘리먼트는 가급적 position:fixed 또는 position:absolute 로 지정 해야합니다.
    * 일반적으로 JS 나 CSS3 로 width/height 또는 위치 이동을 구현한 애니메이션은 거의 초 단위로 상당한 Reflow 를 불러일으킵니다. 이러한 경우에 해당 개체의 position 속성을 fixed 또는 absolute 로 주게 되면 다른 요소들의 레이아웃에 영향을 끼치지 않으므로 페이지 전체의 Reflow 대신 해당 애니메이션 요소의 Repaint 만을 유발합니다. 이것은 비용적인 측면에서 매우 효율적인 방법입니다.
+ 테이블 레이아웃을 피해야 합니다.
    *  테이블로 구성된 페이지 레이아웃은 점진적(progressive) 페이지렌더링이 적용되지 않으며, 모두 로드되고 계산된 후에야 화면에 뿌려집니다.
 더군다나 Mozilla 에 따르면 테이블 레이아웃에서는 아주 작은 변화마저도 해당 테이블 전체 모든 노드에 대한 Reflow 를 발생시킨다고 합니다.
 또한 YUI data table 위젯의 개발자인 Jenny Donnelly 에 의하면, 레이아웃 용도가 아닌 데이터표시 용도의 올바른 테이블이라 할지라도 해당 테이블에 table-layout: fixed 속성을 주는 것이 디폴트값인 auto 에 비해 성능면에서 더 좋다고 합니다.
 - CSS 하위선택자는 필요한 만큼만 정리하는 게 좋습니다.
 - DOM 사용을 최소화하여 Reflow 비용 줄이는 것도 중요합니다.
 
<br /><br />
## Reference
---
 - [자바스크립트 성능 이야기 NHN은 이렇게 한다!](http://www.yes24.com/24/goods/7516929)
 - [Google Web Fundamentals : 객체 모델 생성](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
 - [Google Web Fundamentals : 스타일 계산의 범위와 복잡성 줄이기](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)
 - [네이버 : 브라우저는 어떻게 동작하는가?](https://d2.naver.com/helloworld/59361)

