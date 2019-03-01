---
layout: post
title: '일렉트론 튜토리얼 [electron]'
tags: [일렉트론, electron, 튜토리얼, 시작하기, tutorial, quick starter, starter kit, boilerplate]
---

## 구성 및 안내
---
- electron 소개
- app
- BrowserWindow
- ipcMain
- remote
- etc (tray, dialog, shell)
- starter kit (electron, react, webpack)
- [예제 소스 - https://github.com/goldenthumb/electron-tutorial.git](https://github.com/goldenthumb/electron-tutorial.git)

이 튜토리얼은 [https://electronjs.org/docs](https://electronjs.org/docs) 를 참고하여 만들었습니다. 

## 일렉트론이란?
---
Electron 은 네이티브 애플리케이션이며 자바스크립트, HTML, CSS 로 이루어진 프레임워크입니다. <br />
Node.js 와 OS 의 이벤트 루프를 합쳐 네이티브 UI 를 제어하며, Chromium 을 사용해서 HTML, CSS, 자바스크립트를 이용해 애플리케이션을 만들수 있도록 해줍니다. 
그리고 Electron 을 이용해 작성한 앱은 Mac, Windows, 리눅스용으로 패키지할 수 있습니다.

> Electron 은 웹 기술(Chromium 과 Node.js)을 이용해서 Native Desktop App 을 만드는 기술입니다.

## 일렉트론 시작하기
---

간단하게 app 의 lifecycle 을 살펴보고 BrowserWindow 를 이용해서 창을 띄우는 예제입니다.
<pre>
<code class="language-markup">
$ git clone https://github.com/goldenthumb/electron-tutorial.git
$ cd electron-tutorial/01-app
$ npm install
$ npm start
</code>
</pre>
일렉트론 [공식 문서](https://electronjs.org/docs)가 정말 잘 정리되어 있습니다. 자세한 내용은 공식 문서를 참고하세요.

- [https://electronjs.org/docs/api/app](https://electronjs.org/docs/api/apps)


### package.json
<pre>
<code class="language-javascript">
{
  "name": "app",
  "version": "1.0.0",
  "main": "index.js" 
}
</code>
</pre>
여기서 중요한 부분은 main 부분입니다. 이 필드값을 보고 Electron 이 어떤 js 파일을 실행할지 결정합니다. 

### index.js
<pre>
<code class="language-javascript">
const { app, BrowserWindow } = require('electron');

let win = null;  // BrowserWindow
// 윈도우, tray 와 같은 객체는 전역에 유지 해야합니다.
// 자동으로 메모리가 반환(garbage collection)될 때 창이 멋대로 닫혀버립니다.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management

// app 은 애플리케이션의 이벤트 생명 주기를 제어합니다.

// 애플리케이션이 기본적인 시작 준비를 마치면 발생하는 이벤트입니다.
app.on('will-finish-launching', () => {
  // Windows 와 Linux 는 ready 이벤트와 동일
  // macOS 는 NSApplication > applicationWillFinishLaunching 에
  // 대한 알림으로 표현 됩니다.

  console.log('will-finish-launching');
});

// Electron 이 초기화되어 준비된 상태일 때 발생하는 이벤트입니다
app.on('ready', (launchInfo) => {
  console.log(`ready : ${JSON.stringify(launchInfo)}`);
  console.log(`isReady : ${app.isReady()}`);

  // BrowserWindow 는 브라우저 윈도우를 생성하고 제어합니다.
  win = new BrowserWindow({ width: 800, height: 600 });

  // 로딩할 컨텐츠 삽입
  win.loadURL(`file://${__dirname}/index.html`);

  // 원격 URL 도 로드할 수 있습니다.
  // win.loadURL('https://github.com');

  // process 정보 (https://electronjs.org/docs/api/process)
  const { type, versions } = process;
  console.log(`process type : ${type}`);
  console.log(`process version : ${JSON.stringify(versions)}`);
});

// 모든 윈도우가 종료되었을 때 발생하는 이벤트입니다.
app.on('window-all-closed', () => {
  // 이 이벤트를 구독하지 않고 모든 창이 닫혀있다면, 기본 동작은 앱을 종료시키는 것입니다.
  // (before-quit => will-quit => quit)
  
  console.log('window-all-closed');
  app.quit();  // 애플리케이션을 종료
});

// 앱이 종료가 되면서 앱의 모든 윈도우를 닫기 시작 전에 발생하는 이벤트입니다.
app.on('before-quit', (event) => {
  // 이 이벤트는 이미 닫혀있어도 불립니다.
  // event.preventDefault() 를 호출하면 기본 동작인 어플리케이션 종료를 하지 않습니다.

  console.log('before-quit');
});

// 모든 윈도우가 닫히고 앱이 종료하기 직전에 불립니다.
app.on('will-quit', (event) => {
  // event.preventDefault() 를 호출하면 기본 동작인 어플리케이션 종료를 하지 않습니다.

  console.log('will-quit');
});

// 최종적으로 앱이 종료할 때 발생됩니다.
app.on('quit', (event, exitCode) => {
  // Window 운영체제에서는 시스템 종료, 재시작 또는 로그아웃으로 
  // 앱이 종료되는 경우는 해당 이벤트가 발생하지 않습니다.

  console.log(`quit : ${JSON.stringify(event)}, ${exitCode}`);
});
</code>
</pre>
이 파일이 Electron 애플리케이션의 진입점이 되는 파일로 애플리케이션의 라이프사이클을 관리하는 메인 프로세스에 해당됩니다.
앱을 어떻게 실행할지 전역적으로 어떤 설정이 필요한지를 모두 여기서 지정합니다. 
이 파일에서 중간에 보면 <code class="language-javascript">win.loadURL(`file://${__dirname}/index.html`)</code> 부분이 있는데 여기서 index.html 파일을 로딩해서 화면에 그려줍니다.

### index.html
<pre>
<code class="language-markup">
&lt;html lang="ko"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8" /&gt;
  &lt;title&gt;electron - app<&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h2&gt;app example&lt;/h2&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
<br />
화면을 그려줄 html 을 간단히 만들었으면 모든 준비가 됬습니다.
이제 electron 을 설치하고 애플리케이션을 띄워 보도록 하겠습니다.

<pre>
<code class="language-markup">
$ npm installl electron
$ npx electron .
</code>
</pre>
electron 을 설치하고 실행하고 나면 애플리케이션이 뜨는 걸 확인 하실 수 있습니다.
<br /><br />

나머지 BrowserWindow, ipcMain, remote, tray, dialog, shell 에 대해서는
[예제 소스](https://github.com/goldenthumb/electron-tutorial.git) 를 받아서 하나 하나씩 실행해 보세요. 소스 부분에 주석으로 설명을 달아놓았습니다.
<br />

[예제](https://github.com/goldenthumb/electron-tutorial.git)와 [공식 문서](https://electronjs.org/docs)를 보고 어느 정도 학습이 끝나면 앱을 한번 만들어 보세요. <br />
간단하게 사용할 수 있는 starter kit 도 만들어 놨습니다.

## 일렉트론 Quick Starter Kit
---
Electron, React, Webpack 을 이용해서 개발 및 배포할 수 있는 Boilerplate 입니다. <br />

### 설치
<pre>
<code class="language-markup">
$ git clone https://github.com/goldenthumb/electron-tutorial.git
$ cd electron-tutorial/starter-kit
$ npm install
</code>
</pre>

### 개발
개발 환경에서 앱을 실행합니다. Webpack 과 React Hot Loader 를 사용해서 실시간으로 화면 갱신이 됩니다.
<pre>
<code class="language-markup">
$ npm run dev
</code>
</pre>

### 배포
로컬 플랫폼 용 앱을 패키지하려면 아래와 같이 실행하면 됩니다. 그럼 release 폴더 안에 앱과 installer 가 있는 걸 확인 할 수 있습니다.
앱 아이콘이나 이름 등 패키지 정보를 변경하려면 package.json 의 build 부분을 살펴보시고 수정하시면 됩니다.
<pre>
<code class="language-markup">
$ npm run package
</code>
</pre>

<br /><br /><br />
## Reference
---
- [https://electronjs.org](https://electronjs.org)