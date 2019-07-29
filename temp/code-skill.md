---
layout: post
title: '코딩의 기술'
tags: []
---

1. 의미가 명확한 변수 이름 붙이기
```javascript
// bad
const d = new Date();

// good
const date = new Date();
```

2. 조건식 함수화
```javascript
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
```

3. 스위치는 스위치의 역할만
```javascript
switch (state) {
  case STATE_WAIT: wait(); break;
  case STATE_WALK: walk(); break;
  case STATE_JUMP: jump(); break;
  default: break;
}
```

4. 조기 리턴 활용
```javascript
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
```

5. 중복된 조건식 통합
```javascript
// bad
if (state === STATE_FALE) {
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
  if (state === STATE_FALE) fall();
  if (state === STATE_MOVE) move();
}

// best
if (wait_timer <= WAIT_TIME) return;

if (state === STATE_FALE) fall();
if (state === STATE_MOVE) move();
```

6. if 조건문 감축과 단순화
```javascript
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
```

7. 1개의 함수는 1개의 역할
=> 단순한 함수일수록 재사용하기 좋고 개별 테스트가 가능하다.

8. 함수는 크게 계산과 알고리즘을 실행하고 실제 작업을 수행하는 함수와 그 함수들을 조합해서 흐름을 만드는 함수가 있다.

9. 1개의 반복문에 대해서는 1개의 함수를 사용

10. 주석으로 말하지 말고 함수로 말하자

11. 매개 변수가 많다면 함수를 분할하라는 신호이다.

12. 한번 작성한 것으로 만족하지 말고 문제의 본질을 이해해야한다.

13. 읽는 사람의 입장에서 생각하고 셀프 코드 리뷰를 하자

14. 함수 이름을 기반으로 클래스 이름 정하기
=> updatePlayer, drawPlayer 등의 멤버 함수 이름이 있다면 클래스화를 해야 한다는 신호이다.
=> 중복 부분 클래스화, 기본 자료형으로 구성된 멤버 변수 클래스화, 함수의 매개 변수 클래스화, 컨테이너 ㅋ클래스화

