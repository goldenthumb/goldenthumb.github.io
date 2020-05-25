---
layout: post
title: '코딩의 기술'
tags: [code skill, javascript]
---

<br />
- 의미가 명확한 변수 이름 붙이기
<br />

<pre>
<code class="language-javascript">
// bad
const a = new Date();

// good
const date = new Date();
</code>
</pre>

<br />
- 조건식 함수화
<br />

<pre>
<code class="language-javascript">
function isJump() {
    return y > 10;
}

function isDamage() {
  return state === STATE_DAMAGE;
}

function isDash() {
    if (isJump()) return false;
    if (isDamage()) return false;
    if (speed < 20) return false;

    return true;
}
</code>
</pre>

<br />
- 스위치는 스위치의 역할만
<br />

<pre>
<code class="language-javascript">
switch (state) {
    case STATE_WAIT: wait(); break;
    case STATE_WALK: walk(); break;
    case STATE_JUMP: jump(); break;
    default: break;
}
</code>
</pre>

<br />
- 조기 리턴 활용
<br />

<pre>
<code class="language-javascript">
// bad
function bonus(time, hp) {
    let result = 0;

    if (time <= 50) {
        if (hp >= 30) {
            result = 1000;
        } else {
            result = 500;
        }
    } else if (time <= 100) {
        result = 200;
    }

    return result;
}

// good
function bonus(time, hp) {
    if (time > 100) return 0;
    if (time > 50) return 200;
    if (hp < 30) return 500;

    return 1000;
}
</code>
</pre>

<br />
- 중복된 조건식 통합
<br />

<pre>
<code class="language-javascript">
// bad
if (state === STATE_FAIL) {
    if (waitTimer > WAIT_TIME) {
        fall();
    }
}

if (state === STATE_MOVE) {
    if (wait_timer > WAIT_TIME) {
        move();
    }
}

// good
if (wait_timer > WAIT_TIME) {
    if (state === STATE_FAIL) fall();
    if (state === STATE_MOVE) move();
}

// best
if (wait_timer <= WAIT_TIME) return;
if (state === STATE_FAIL) fall();
if (state === STATE_MOVE) move();
</code>
</pre>

<br />
- if 조건문 감축과 단순화
<br />

<pre>
<code class="language-javascript">
// bad
if (x > 10) {
    x = 10;
}

// good
x = Math.min(x, 10);

// bad 
if (x < 10) {
    x = 0
}

// good
x = Math.max(x - 1, 0);

// bad
if (x > 10) {
    x = 10;
} else if (x < 0) {
    x = 0;
}

// good
x = Math.min(Math.max(x, 0), 10);

// bad
if (x >= 10) {
    // 10 이상이면 0 으로 돌아감
    x = 0;
}

// good
x = x % 10;
</code>
</pre>

<br />
- 1개의 함수는 1개의 역할.
<br />
\- 단순한 함수일수록 재사용하기 좋고 개별 테스트가 가능하다.
<br />

- 함수는 크게 계산과 알고리즘을 실행하고 실제 작업을 수행하는 함수와 그 함수들을 조합해서 흐름을 만드는 함수가 있다.
<br />

- 1개의 반복문에 대해서는 1개의 함수를 사용하자.
<br />

- 주석으로 말하지 말고 함수로 말하자.
<br />

- 매개 변수가 많다면 함수를 분할하라는 신호이다.
<br />

- 한번 작성한 것으로 만족하지 말고 문제의 본질을 이해해야한다.
<br />

- 읽는 사람의 입장에서 생각하고 셀프 코드 리뷰를 하자.
<br />

- 함수 이름을 기반으로 클래스 이름 정하기.
<br />
\- updatePlayer, drawPlayer 등의 멤버 함수 이름이 있다면 클래스화를 해야 한다는 신호이다.
<br />
\- 중복 부분 클래스화, 기본 자료형으로 구성된 멤버 변수 클래스화, 함수의 매개 변수 클래스화, 컨테이너 클래스화
<br />

- 클래스의 멤버 변수는 최소한으로 만들고 getter 와 setter 를 되도록 사용하지 말자. 
<br />

- 상속보다는 이양을 우선해야한다.
<br />

- 객체 지향 설계의 원칙
<br />
1) 단일 책임 원칙
<br />
'클래스를 변경해야할 이유는 한 가지여야 한다'. 하나의 클래스는 하나의 책임만 가져야 한다.
<br /><br />
2) 개방 폐쇄 원칙
<br />
확장에 관해서는 열려있어야 하고, 변경에 대해서는 닫혀있어야 한다. 변화하지 않는 부분과 열린 부분을 분리하자.
<br /><br />
3) 리스코프 치환 원칙
<br />
파생 자료형은 기본 자료형과 치환할 수 있어야 한다. 부모 클래스로 치환한 상태에서도 정상 작동해야 한다.
<br /><br />
4) 인터페이스 분리 원칙
<br />
클라이언트가 사용하지 않는 멤버 함수의 의존을 클라이언트에 강요하면 안 된다. 클래스 사용자에게 불필요한 인터페이스는 공개하지 말라.
<br /><br />
5) 의존 관계 역전 원칙
<br />
상위 모듈(사용하는 측)은 하위모듈(사용되는 측)에 의존하지 않아야 한다. 두 모듈 모두 별도의 추상화된 것에 의존해야 한다.
<br />

- 데메테르 법칙(최소 지식의 원칙)
<br />
직접적인 친구와만 관련한다. 여기서 친구는 클래스를 나타내는데 '자기 자신', '자신이 가지는 클래스', '매개 변수로 전달한 클래스', '멤버 함수 내부에서 실체화한 클래스'를 나타낸다. 직접 하지 말고 명령하라.
<br />

- 디자인 패턴
<br />
1) Template Method 패턴
<br />
부모 클래스에 정형화한 처리 과정을 정의하고, 처리가 다른 부분을 자식 클래스로 구현하는 패턴
<br /><br />
2) Strategy 패턴
<br />
알고리즘이 변화하는 부분을 클래스화해서 교환할 수 있게 하는 패턴 (switch 조건문이 나온다면 전략 패턴으로 해결할 수 없는지 확인 필요)
<br /><br />
3) State 패턴
<br />
객체가 가지는 여러 가지 상태를 클래스화 하는 패턴
<br /><br />
4) Composite 패턴
<br />
트리 구조로 재귀적인 테이터를 만들어 객체를 관리하는 패턴
<br /><br />
5) Iterator 패턴
<br />
반복자를 사용하여 컨테이너의 요소들에 순서대로 접근하는 패턴. 자료 구조의 구현 상세를 캡슐화
<br /><br />
6) Observer 패턴
<br />
어떤 객체의 상태 변화를 다른 객체에 통지해주는 패턴
<br /><br />
7) Singleton 패턴
<br />
객체 인스턴스화를 1개로 제한하고, 전역에서 접근할 수 있게 하는 패턴
<br />

- 디자인 패턴 남용 주의. 객체 지향 설계의 원칙을 중심으로 클래스를 설계하라. (소규모의 단순한 프로그램에서는 오히려 복잡해질 수 있음)
<br />

- 클래스 이름은 담당하는 업무의 역할을 나타내고 하나의 역할에 대해 하나의 책임을 갖게 설계해야한다.
<br />

- 클래스의 역할 
<br />
1) 작업 역할 클래스와 관리 역할 클래스
<br />
작업 역할 클래스는 구체적인 구현을 하는 말단 클래스고 관리 역할 클래스는 작업 역할 클래스를 제어한다.
<br /><br />
2) 중재 역할 클래스 (Mediator 패턴)
<br />
중재 역할 클래스는 객체들의 조정을 전문으로 담당하는 클래스이며 작업중재가 역할이므로 다른 역할은 수행하면 안된다.
<br /><br />
3) 창구 역할 클래스
<br />
창구 역할 클래스는 작업을 의뢰받고, 실질적인 작업을 다른 클래스에 전달하는 역할을 수행한다. 중재 역할은 회사 내부에서 동료들의 조정을 담당하지만, 창구 역할은 외부 회사와의 창구 업무를 담당한다.
<br /><br />
4) 생성 역할 클래스
<br />
생성 역할 클래스는 객체 생성을 전문으로 수행하는 공장과 같은 클래스이다.
<br /><br />
5) 전용 클래스와 범용 클래스
<br />
특정 애플리케이션에서만 사용하는 전용 클래스와 재사용을 목적으로 하는 범용 클래스는 구별해서 설계해야한다.
전용 클래스를 생성할 때는 범용 클래스를 사용하고 클래스 라이브러리로 제공되는 범용 클래스도 필요한 인터페이스만을 추출한 전용 클래스를 사용해 간접적으로 사용하는 것이 좋다. (인터페이스 분리 원칙)
<br /><br />


## Reference
---
- [C 와 C++ 게임 코드로 알아보는 코딩의 기술](http://www.yes24.com/Product/Goods/25245320?scode=029)
