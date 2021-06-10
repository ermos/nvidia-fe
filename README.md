# NVIDIA FE
> Fast way to buy NVIDIA Founder Edition Cards before out of stock

/!\ This script work only for the french nvidia affiliate shop LDLC /!\

NVIDIA FE checks inventory every second in Founder's Edition cards,
lowest at the highest price.

If it finds a card, it automatically opens a new tab in your default browser
on the right page.

## Install

1) Download this repository :
```bash
git clone git@github.com:ermos/nvidia-fe.git
```

2) Install dependencies :
```bash
cd nvidia-fe
npm install
```

3) Launch script :
```bash
npm run start
```

## Bonus

We can use Tampermonkey for automating action in LDLC website.

First we need to install Tampermonkey for
[chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo/related?hl=fr)
or
[firefox](https://addons.mozilla.org/fr/firefox/addon/tampermonkey/).

We need to create two scripts, one for product page and the second for buy page :

```js
// ==UserScript==
// @name         Auto Buy LDLC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  See the title
// @author       Kilian SMITI
// @match        https://www.ldlc.com/*
// @icon         https://www.google.com/s2/favicons?domain=ldlc.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let step = 0
    if (window.location.search === '?a') {
        setInterval(() => {
            if (document.querySelector('.add-to-cart-oneclic') !== null && step === 0) {
                document.querySelector('.add-to-cart-oneclic').click()
                step = 1
            }
            if (document.querySelector('#removePackServiceClose') !== null && step === 1) {
                document.querySelector('#removePackServiceClose').click()
            }
        }, 1000)
    }
})();
```

```js
// ==UserScript==
// @name         Autofill CB
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autofill CB information and press OK
// @author       Kilian SMITI
// @match        https://secure2.ldlc.com/fr-fr/DeliveryPayment
// @icon         https://www.google.com/s2/favicons?domain=ldlc.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
        document.querySelector("#CardNumber").value = "xxxx xxxx xxxx xxxx"
        document.querySelector("#ExpirationDate").value = "xx/xx"
        document.querySelector("#OwnerName").value = "xxxxx xxxxx"
        document.querySelector("#Cryptogram").value = "xxx"
        document.querySelector(".col-xs-12 .action button").click()
})();
```