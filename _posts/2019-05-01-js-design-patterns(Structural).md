---
layout: post
title: 'JS design patterns (Structural)'
tags: [es6, design pattern, structural pattern, javascript]
---

## STRUCTURAL PATTERNS
---
- [Adapter](#adapter)
- [Bridge](#bridge)

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

### Bridge
이중 어댑터 패턴이라고도 하는 브리지 디자인 패턴은 추상화와 구현을 분리하여 두 개가 독립적으로 변할 수 있는 구조적 디자인 패턴입니다. 고급 아키텍처 패턴이며 주요 목표는 추상화를 통해 더 나은 코드를 작성하는 것입니다. 객체의 느슨한 결합을 추구하며 두 구성 요소가 자체 인터페이스를 갖으면서 각 구성 요소와 함께 작동 할 수 있도록 합니다.
<br><br>
어댑터 패턴은 두 클래스간의 종속성을 미리 예측하지 못하고 개발했을 경우에 필요한 패턴이고 브리지 패턴은 이미 이들 각각이 독립적으로 진화할수 있음을 파악한 상태에서 적용하는 패턴이다.
<br><br>
<pre>
<code class="language-javascript">
class Printer {
    constructor(ink) {
        this.ink = ink;
    }
}

class APrinter extends Printer {
    constructor(ink) {
        super(ink);
    }

    print() {
        return `Printer: A, Ink: ${this.ink.get()}`
    }
}

class BPrinter extends Printer {
    constructor(ink) {
        super(ink);
    }

    print() {
        return `Printer: B, Ink: ${this.ink.get()}`
    }
}

class Ink {
    constructor(type) {
        this.type = type;
    }

    get() {
        return this.type;
    }
}

class AInk extends Ink {
    constructor() {
        super('A-based');
    }
}

class BInk extends Ink {
    constructor() {
        super('B-based');
    }
}

function run() {
    const aInk = new AInk();
    const bInk = new BInk();

    const aPrinter = new APrinter(aInk);
    // const aPrinter = new APrinter(bInk);
    
    const bPrinter = new BPrinter(bInk);
    // const bPrinter = new BPrinter(aInk);

    aPrinter.print();
    bPrinter.print();
}
</code>
</pre>