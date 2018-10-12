# hyper-hitachi: Inspire the next
hyper-hitachi is a plugin for [Hyper](https://hyper.is).

This plugin changes the background of the terminal to the TV commercial by HITACHI.
![video](./demo.gif)

If you want to change the video, you can replace it to videos from **YouTube**, **Vimeo**, and so on.

# Installation
## 1. Install Hyper
See here: [https://hyper.is/#installation](https://hyper.is/#installation)

## 2. Install this
```
hyper i hyper-hitachi
```

# Custom
Open `~/.hyper.js` with your editor, and put the below

```
{
   config: {
       hitachi: {
           // Change the movie
           url: "https://www.youtube.com/embed/Zd_PhaKDP0M",
           // Change the opacity (0.0 ~ 1.0)
           opacity: 0.2,
       }
   }
}
```
