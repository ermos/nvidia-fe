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

## No sound ?

If you are a windows user, you need to install the library [mplay](http://www.mplayerhq.hu/)
