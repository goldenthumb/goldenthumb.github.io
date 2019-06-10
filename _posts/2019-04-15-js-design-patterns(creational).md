---
layout: post
title: 'JS design patterns (creational)'
tags: [es6, design pattern, creational pattern, javascript]
---

## CREATIONAL PATTERNS
---
- [Abstract Factory](#abstract-factory-추상-팩토리)
- [Builder](#builder)
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

### Builder
다양한 객체 생성 문제에 대한 유연한 솔루션을 제공하기 위해 복합 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 패턴입니다.
<br><br>
Builder 패턴 생성자에 들어갈 여러개의 가변 인자(varargs) 매개 변수를 받아들이고 모든 매개 변수를 받은 뒤에 이 변수들을 통합해서 한번에 생성하는 패턴을 말합니다.
<br><br>
Builder를 사용하는 가장 공통적인 동기는 복잡한 객체를 만드는 클라이언트 코드를 단순화하는 것입니다. 클라이언트는 실제 작업의 수행 방법을 모른채 Builder가 수행 한 단계를 계속 지시 할 수 있습니다. 
<br><br>

<pre>
<code class="language-javascript">
class ProductBuilder {
  constructor() {
    this.name = null;
    this.price = 0;
    this.category = 'etc';
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withPrice(price) {
    this.price = price;
    return this;
  }

  withCategory(category) {
    this.category = category;
    return this;
  }

  build() {
    return {
      name: this.name,
      price: this.price,
      category: this.category,
    }
  }
}

(() => {
  const productA = new ProductBuilder()
    .withName('A')
    .withCategory('ABC')
    .build();

  console.log(productA);
})();
</code>
</pre>
