---
layout: post
title: 'JavaScript 에서 클립 보드 사용하기'
tags: [clipboardApi javascript]
---
자바스크립트에서 클립보드를 사용하려 ClipboardAPI 또는 execCommand API 를 사용해야 합니다.

## ClipboardAPI
---

ClipboardAPI는 비교적 최신 스펙으로, 아직 지원되지 않는 브라우저가 많습니다. Chrome 66 이상에서는 ```'텍스트 복사 / 붙여 넣기'``` 만 지원하지만 Chrome 76 이상에서는 ```'read(), write()'```메서드가 추가되어 이미지를 쉽게 복사하거나 붙여 넣을 수 있습니다.
<br/>
<br/>
{% include image-caption.html imageurl="/assets/images/posts/clipboard-api.png" %}
<br/>
<br/>

아래와 같이 간단하게 내가 원하는 시점에 텍스트 데이터를 읽어올 수 있습니다. 단, 권한이 있어야 되고 브라우저가 포커스가 되어 있는 상태일 때만 데이터를 읽어 올 수 있습니다. 

<pre><code class="language-javascript">
navigator.clipboard.readText().then((text) => {
    console.log('Pasted content: ', text);
});
</code></pre>

<br />
<div style="text-align: center;">
<img src="/assets/images/posts/clipboard-permission.png" alt="drawing" style="width:400px;"/>
</div>
<br/>

그리고 ```'Permissions API'``` 를 활용하여 권한이 있는지 확인할 수 있습니다.
<pre><code class="language-javascript">
// { name: 'clipboard-read' } 읽기 권한
// { name: 'clipboard-write' } 쓰기 권한
navigator.permissions.query({ name: 'clipboard-read' }).then((permission) => {
    // 권한을 허용했을 때는 'granted'
    // 권한을 거절했을 때는 'denied'
    // 권한을 요청 중일 때는 'prompt'
    console.log(permission.state);

    // 권한 상태가 변경 됬을 때마다 이벤트 발생
    permission.onchange = () => {
        console.log(permission.state);
    };
});
</code></pre>

