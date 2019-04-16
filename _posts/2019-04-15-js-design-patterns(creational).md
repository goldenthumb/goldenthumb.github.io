---
layout: post
title: 'JS design patterns (creational)'
tags: [es6, design pattern, creational pattern, javascript]
---

## CREATIONAL PATTERNS
---
- [Abstract Factory](#abstract-factory-추상-팩토리)
- Builder
- Factory Method
- Prototype
- Singleton


### Abstract Factory (추상 팩토리)
서로 연관되거나 의존적인 객체들의 조합을 생성하기 위한 인터페이스를 제공합니다. 
구상 클래스는 서브클래스에 의해 만들어 집니다.
<br><br>
객체 지향 프로그래밍에 Abstract ('추상적') 단어 구체적으로 어떻게 구현되고 있는지에 대해 생각하지 않고,  인터페이스(API)만을 생각' 하는 상태라는 의미입니다. Factory ('공장') 단어는  '다른 객체를 만드는 객체' 를 의미합니다.
Abstract Factory 패턴에서는 추상적인 공장이 등장하고, 추상적인 부품을 조합해서 추상적인 제품을 만듭니다.
<br><br>
<b>즉, 부품의 구체적인 구현에는 주목하지 않고, 인터페이스(API)에 주목합니다. 그리고 인터페이스(API)만을 사용해서 부품을 조립하고 제품으로 완성합니다.</b>

1. 객체 생성에 관련된 패턴 (Creational Pattern)
2. 관련성 있는 여러 종류의 객체를 일관된 방식으로 생성하는 경우에 유용

<pre>
<code class="language-javascript">
class AbstractFactory {
  createProductA (product) {
    throw new Error('Abstract method!');
  }

  createProductB (product) {
    throw new Error('Abstract method!');
  }
}

class ConcreteFactory1 extends AbstractFactory {
  createProductA (product) {
    return new ProductA1(product);
  }

  createProductB (product) {
    return new ProductB1(product);
  }
}

class ConcreteFactory2 extends AbstractFactory {
  createProductA (product) {
    return new ProductA2(product);
  }

  createProductB (product) {
    return new ProductB2(product);
  }
}

class AbstractProductA {
  getName() {
    throw new Error('Abstract method!');
  }
}

class AbstractProductB {
  getName() {
    throw new Error('Abstract method!');
  }
}

class ProductA1 extends AbstractProductA {
  constructor(name) {
    super();
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

class ProductA2 extends AbstractProductA {
  constructor(name) {
    super();
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

class ProductB1 extends AbstractProductB {
  constructor(name) {
    super();
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

class ProductB2 extends AbstractProductB {
  constructor(name) {
    super();
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

function run() {
  const factory1 = new ConcreteFactory1();
  const factory2 = new ConcreteFactory2();

  const productA1 = factory1.createProductA('a1');
  const productB1 = factory1.createProductB('b1');

  const productA2 = factory2.createProductA('a2');
  const productB2 = factory2.createProductB('b2');
  
  console.log('> product :', productA1.getName());
  console.log('> product :', productB1.getName());
  console.log('> product :', productA2.getName());
  console.log('> product :', productB2.getName());
};

run();
</code>
</pre>
### AbstractFactory
