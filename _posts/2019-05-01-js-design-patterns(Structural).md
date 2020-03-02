---
layout: post
title: 'JS design patterns (Structural)'
tags: [es6, design pattern, structural pattern, javascript]
---

## STRUCTURAL PATTERNS
---
- [Adapter](#adapter)

### Adapter
어댑터 패턴은 한 인터페이스 (객체의 속성과 메서드)를 다른 인터페이스로 변환합니다. 어댑터 패턴은 추상 팩토리나 빌더 패턴처럼 객체를 생성하는 패턴이 아닙니다. 어댑터 패턴은 기존 클래스의 인터페이스를 다른 인터페이스에서 사용할 수 있게 하는 소프트웨어 디자인 패턴입니다. 기존에 있던 구조를 새 구조로 유연하게 전환하거나 새 구조에서 기존의 구조로 전환하는 데 사용하는 패턴입니다. 어댑터 패턴은 랩퍼 패턴이라고도 합니다.
<br><br>
<pre>
<code class="language-javascript">
class OldAdapter {
    request() {
        console.log('request');
    }
}

class NewAdapter {
    constructor(adapter) {
        this._adapter = adapter;
    }

    request() {
        this._login();
        this._adapter.request();
    }

    _login() {
        console.log('login');
    }
}

function run() {
    const oldAdapter = new OldAdapter();
    const newAdapter = new NewAdapter(oldAdapter);

    newAdapter.request();
}
</code>
</pre>