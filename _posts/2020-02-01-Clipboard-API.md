---
layout: post
title: '브라우저에서 클립 보드 사용하기 [javascript]'
tags: [clipboard api, execCommand, javascript]
---
브라우저에서 JavaScript를 사용하여 클립보드를 데이터를 쓰거나 읽으려면 ClipboardAPI 또는 execCommand API 를 사용해야 합니다. 일반적으로 웹에서 클립 보드에 텍스트를 복사하는 실질적인 방법은 execCommand 를 사용하는 것이었지만, 이제는 ClipboardAPI 를 이용하여 좀 더 단순하고 쉽게 사용을 할 수 있습니다.

## ClipboardAPI
---

[ClipboardAPI](https://developer.mozilla.org/ko/docs/Web/API/Clipboard)는 Promise 기반으로 클립 보드 내용을 비동기식으로 접근할 수 있는 새로운 API입니다. 하지만 비교적 최신 스펙으로 아직 지원되지 않는 브라우저가 많습니다. 
<br /><br />
Chrome 66 이상에서는 ```'텍스트 복사 / 붙여넣기'``` 만 지원하지만, Chrome 76 이상에서는 ```'read(), write()'```메서드가 추가되어 이미지와 같은 임의의 데이터를 읽거나 쓸 수가 있습니다.
<br/>
<br/>
{% include image-caption.html imageurl="/assets/images/posts/clipboard-api.png" %}
<br/>
<br/>

아래와 같이 간단하게 내가 원하는 시점에 텍스트 데이터를 읽거나 쓸 수 있습니다. 
<br />
단, 권한이 있어야 하고 브라우저가 활성화되어 있는 상태일 때만 사용할 수 있습니다. 

<pre><code class="language-javascript">
// 읽기
navigator.clipboard.readText().then((text) => {
    console.log('Pasted content: ', text);
});

// 쓰기 
navigator.clipboard.writeText(location.href).then(() => {
    console.log('success');
});

</code></pre>

<br />
<br />
<div style="text-align: center;">
<img src="/assets/images/posts/clipboard-permission.png" alt="drawing" style="width:400px;"/>
</div>
그리고 ```'Permissions API'``` 를 활용하여 권한 상태를 확인할 수 있습니다.
<pre><code class="language-javascript">
// { name: 'clipboard-read' } 읽기 권한
// { name: 'clipboard-write' } 쓰기 권한 (브라우저가 활성화되어 있으면 자동으로 권한 부여)
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
<br /><br />

Chrome 76 이상에서의 ```'blob'```은 ```'text()'```와 ```'arrayBuffer()'```가 추가되어 좀 더 간편하게 데이터를 다룰 수 있습니다.
<pre><code class="language-javascript">
const $clipboard = document.getElementById('clipboard-btn');
$clipboard.addEventListener('click', async () => {
    const clipboardItems = await navigator.clipboard.read();
    
    for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
            const blob = await clipboardItem.getType(type);
            
            // text
            if (type === "text/plain") {
                const text = await blob.text();
                console.log(text);
            }

            // binary data
            if (type === "image/png") {
                const imageData = await blob.arrayBuffer();
                console.log(imageData);

                /*
                const reader = new FileReader();
                reader.addEventListener('loadend', (data) => {
                    const imageData = data;
                });
                */
            }
        }
    }
});

</code></pre>

<br/>
<br/>
{% include image-caption.html imageurl="/assets/images/posts/blob.png" %}
<br/>
<br/>

## execCommand API
---
```'navigator.clipboard.writeText()'```를 이용하여 권한 없이 클립보드 데이터를 저장할 수 있지만, 지원 브라우저 스펙이 높기 때문에 exeCommand() 메소드를 이용하여 아래와 같이 사용할 수 있습니다.

<pre><code class="language-javascript">
function copyClipboard(value) {
    const $text = document.createElement('textarea');
    document.body.appendChild($text);
    $text.value = value;
    $text.select();
    document.execCommand('copy!!');
    document.body.removeChild($text);
}

</code></pre>
<br /><br />

그리고 붙여넣기 이벤트에 의존하여 권한 없이 클립보드 데이터를 가져올 수도 있습니다. 붙여넣기(Ctrl + v, Cmd + v)를 하게 되면 창이 포커스되고 이벤트가 트리거됩니다. thePasteEvent 객체를 포함하는 clipboardData 객체에는 items 속성이 있는데 클립 보드의 데이터를 포함하는 배열이므로 반복문을 이용하여 꺼내 쓸 수 있습니다. 클립 보드에 이미지가 있는 경우 컨텐츠는 Blob 으로 변환해서 사용할 수 있습니다.

<pre><code class="language-javascript">
window.addEventListener('paste', ({ clipboardData: { items } }) => {
    for (const item of items) {
        if (item.type.includes('image')) {
            const blob = item.getAsFile();
        }

        if (item.type === 'text/plain') {
            item.getAsString((text) => {
                console.log(text);
            });
        }
    }
});

</code></pre>
<br/><br/>

## Reference
---
- [Clipboard API](https://developer.mozilla.org/ko/docs/Web/API/Clipboard)
- [Unblocking Clipboard Access](https://developers.google.com/web/updates/2018/03/clipboardapi)
- [Clipboard Data](https://w3c.github.io/clipboard-apis/#clipboardevent-clipboarddata)
- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)