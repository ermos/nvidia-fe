const axios = require('axios')
const open = require('open')
const player = require('play-sound')();

call()

async function call() {
    let products = []
    await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=fr-fr&search=RTX%203070%20ti&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~1,ACER~0,ALIENWARE~0,AORUS~0,ASUS~0,DELL~0,EVGA~0,GAINWARD~0,GIGABYTE~0,HP~0,MSI~0,PALIT~0,PNY~0,RAZER~0,ZOTAC~0')
        .then(response => {
            //productDetails => available products
            //suggestedProductDetails => not available products
            products = response.data.searchedProducts.productDetails
        })
        .catch(err => console.log(err))

    if (products.length !== 0) {
        products[0].retailers.forEach(e => {
            // store 45 = ldlc
            if (e.storeId == '45') {
                open(e.purchaseLink)

                let sound = player.play('./src/alarm.mp3', (err) => {
                    if (err) console.log(`Could not play sound: ${err}`);
                });
                setTimeout(() => sound.kill(), 5000)

                return
            }
        })
    }

    let d = new Date()
    console.log(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds())

    setTimeout(() => call(), 1000)
}

