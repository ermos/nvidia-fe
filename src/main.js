const axios = require('axios')
const open = require('open')
const player = require('play-sound')();

call()

async function call() {
    const d = new Date()
    const dateText = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()

    let find = false
    let products = []

    console.log(`\x1b[33m---------------------------------------\x1b[0m`)

    await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=fr-fr&search=NVIDIA%20GEFORCE%20RTX&category=GPU&manufacturer=NVIDIA&manufacturer_filter=NVIDIA~6,ACER~0,ALIENWARE~0,AORUS~0,ASUS~0,DELL~0,EVGA~0,GAINWARD~0,GIGABYTE~0,HP~0,INNO3D~0,MSI~0,PALIT~0,PNY~0,RAZER~0,ZOTAC~0&sorting=lp')
        .then(response => {
            //productDetails => available products
            //suggestedProductDetails => not available products
            products = response.data.searchedProducts.productDetails
        })
        .catch(err => console.log(err))

    if (products.length !== 0) {
        products.forEach(product => {
            if (product.prdStatus !== 'out_of_stock') {
                product.retailers.forEach(retailer => {
                    console.log(`\x1b[32m[${dateText}] ${product.displayName} => STOCK !!!!\x1b[0m`)

                    if (!find) {
                        open(retailer.purchaseLink + "?a")

                        let sound = player.play('./src/alarm.mp3', (err) => {
                            if (err) console.log(`Could not play sound: ${err}`);
                        });
                        setTimeout(() => sound.kill(), 5000)
                    }

                    find = true
                })
            } else {
                console.log(`\x1b[31m[${dateText}] ${product.displayName} => NO STOCK\x1b[0m`)
            }
        })
    }

    if (!find) {
        setTimeout(() => call(), 1000)
    }
}

