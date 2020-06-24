
# FullView.Js
#### Javascript | JQuery Plugin 
Create full screen pages fast and simple - A simple and easy to use library that creates fullscreen scrolling websites.

#### Compatibility
| Android 4.1+ | Safari 7.1+ | IE 9+ | Opera | Chrome | firefox |
| ------------ | ----------- | ----- | ----- | ------ | ------- |
---

[![GitHub release](https://img.shields.io/github/package-json/v/seeratawan01/fullview.js?label=fullView.js%20Version%20)](https://github.com/seeratawan01/fullview.js) [![License](https://img.shields.io/badge/License-GPL-red.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

[Demo online](http://seeratawan.goprogs.com/fullView/) | [Codepen](https://codepen.io/someone1218/pen/jOWmppP)

---
## Get Started
Dependency: jQuery 1.1+
All you will need to include:
-   The JavaScript file `fullview.js` (or its minified version `fullview.min.js`)
-   The css file `fullview.css` (or its minified version `fullview.min.css`)
### Including files:
```html
<link rel="stylesheet" type="text/css" href="fullview.css" />

<!-- Javascript Files -->
<script  src="https://code.jquery.com/jquery-3.5.1.min.js"  crossorigin="anonymous"></script>

<script type="text/javascript" src="fullview.js"></script>
```
### Using CDNS
**Optionally**, If you prefer to use a CDN to load the needed files,
```bash
https://unpkg.com/fullview/dist/fullview.min.css
```
```bash
https://unpkg.com/fullview/dist/fullview.min.js
```
### Using NPM
**Optionally**, you can install fullView.js with npm
```bash
npm install fullview
```
## Usage
### HTML Structure
```html
<div id="fullview">
        <div>
            <!-- Your Code -->
        </div>
        <div>
           <!-- Your Code -->
        </div>
        <div>
            <!-- Your Code -->
        </div>
        <div>
            <!-- Your Code -->
        </div>
    </div>

```
### Initialization
```javascript
$("#fullview").fullView({
	//Navigation
	dots:  true,
	dotsPosition:  'right',

	//Scrolling
	easing:  'swing',

	// Callback
	onViewChange:  function (currentView) {
	 console.log(currentView)
	}
})
```
## Options
|Option|Type|Default|Values|
|--|--|--|--|
|`dots`|*boolean*|true|true or false|
|`dotsPosition`|*string*|"right"|right or left|
|`easing`|*string*|"linear"|swing or linear|


## License

If you are creating an open source application under a license compatible with the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you may use it under the terms of the GPLv3.
