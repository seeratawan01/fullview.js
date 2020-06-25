
# FullView.Js
#### Javascript | JQuery Plugin 
![preview](https://raw.githubusercontent.com/seeratawan01/fullview.js/master/demo/thumbnail.png)

[FullView.js](https://seeratawan.goprogs.com/fullView/) is a simple, light-weighted and easy to use JavaScript library to create full-screen scrolling websites.

Its enables the visitor to navigate through pages with a smooth full-screen scroll effect. Supports keyboard, mouse wheel on desktop, and swipe up/down/left/right events on touch device.

Also comes with a side navigation dots, containing anchor links that allow the visitor to scroll the page to a specific content section.

#### Compatibility
|  IE 9+ | Opera | Chrome | firefox | Android 4.1+ | Safari 7.1+ |
| ------------ | ----------- | ----- | ----- | ------ | ------- |
---

[![GitHub release](https://img.shields.io/github/package-json/v/seeratawan01/fullview.js?label=fullView.js%20Version%20)](https://github.com/seeratawan01/fullview.js) [![License](https://img.shields.io/badge/License-GPL-red.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

[Demo online](http://seeratawan.goprogs.com/fullView/) | [Codepen](https://codepen.io/someone1218/pen/ZEQyRLM) | [Tutorial](https://medium.com/@seeratsdsking/how-to-build-a-full-screen-scrolling-website-12113bb98088)

---
## Get Started

All you will need to include:
-   The JavaScript file `fullview.js` (or its minified version `fullview.min.js`)
-   The css file `fullview.css` (or its minified version `fullview.min.css`)
- The [JQuery](https://www.google.com/search?client=firefox-b-d&q=jquery) file, must be version 1.2+
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
Start your HTML document with the compulsory [HTML DOCTYPE declaration](http://www.corelangs.com/html/introduction/doctype.html),  must start with a **<! DOCTYPE>** declaration.

Sections should be placed inside a wrapper (`<div id="fullview">` you can change the `id`). Every direct child of `id="fullview"` element will be defined as section.
The active section by default will be the starting point when the page loads.
```html
<div id="fullview">
      <div><!-- Some Section --></div>
      <div><!-- Some Section --></div>
      <div><!-- Some Section --></div>       
</div>
```
You surely can add `active` class to any section for different starting point rather than the first section.
```html
<div class="active">Some section</div>
```

### Initialization
You have to use fullView.js as a jQuery plugin and be sure you place this script in footer.
```javascript
$("#fullview").fullView({
	//Options
	dots:  true,
	dotsPosition:  'right',

	// Callback
	onViewChange:  function (currentView) {
	     console.log(currentView)
	}
})
```
### Creating Navigation to Sections
To activate  naviagtion, `navbar` option would be use. This way the scrolling of the sections will activate the corresponding element in the menu.
In order to link the elements of the navigation with the sections, an `href` attribute of anchor tag will be needed to use with the same anchor links as used within the sections.
```html
<!-- Navigation Menu -->
<div id="navbar">  
   <ul>  
      <li>  
         <a href="#page-one">Section 1</a>  
      </li>  
      <li>  
         <a href="#page-two">Section 2</a>  
      </li>  
      <li>  
         <a href="#page-three">Section 3</a>  
      </li>  
  </ul>  
</div>
```
```html
<!-- Sections -->
<div id="fullview">
      <div id="page-one"><!-- Some Section --></div>
      <div id="page-two"><!-- Some Section --></div>
      <div id="page-three"><!-- Some Section --></div>       
</div>
```
```javascript
/* Script */
$("#fullview").fullView({
	//Navigation
	navbar:  "#navbar",
})
```
Check out the complete working [Menu Example](https://codepen.io/someone1218/pen/jOWmppP)

### Attributes added by fullview.js
fullView.js adds few attibutes including clasees and HTML5 `data` attribute in different elements to keep a record of the status of the webpage:
-   `active` is added the current visible section.
-   `active` is added to the current navbar element (if using the `navbar` option).
-  `data-scroll` attribute is added to the menu items and dots

## All Options
|Option|Type|Default|Values|Description|
|--|--|--|--|--|
|`navbar`|*string*|undefined|selector|To link the elements of the navigation with the sections|
|`dots`|*boolean*|true|true or false|For side dots navigation visibility|
|`dotsPosition`|*string*|right|right or left|Defines side dots navigation positioning|
|`easing`|*string*|linear|swing or linear|Defines the transition effect
|`backToTop`|*boolean*|false|true or false|Defines whether scrolling down in the last section should scroll to the start one or not.
|`keyboardScrolling`|*boolean*|true|true or false|Defines if the scroll can be performed using the keyboard
|`onViewChange`|*function*|null|callback|This callback return the element of current section on every section change


## License

If you are creating an open source application under a license compatible with the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you may use it under the terms of the GPLv3.
