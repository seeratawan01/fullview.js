
# FullView.Js
#### Javascript | JQuery Plugin 
Create full screen pages fast and simple - A simple and easy to use library that creates fullscreen scrolling websites

#### Compatibility
| Android 4.1+ | Safari 7.1+ | IE 9+ | Opera | Chrome | firefox |
| ------------ | ----------- | ----- | ----- | ------ | ------- |

## Get Started
Dependency: jQuery 1.1+
All you will need to include:
-   The JavaScript file `fullpage.js` (or its minified version `fullpage.min.js`)
-   The css file `fullpage.css` (or its minified version `fullpage.min.css`)
### Including files:
```html
<link rel="stylesheet" type="text/css" href="fullview.css" />

<!-- Javascript Files -->
<script  src="https://code.jquery.com/jquery-3.5.1.min.js"  crossorigin="anonymous"></script>

<script type="text/javascript" src="fullview.js"></script>
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
|`dot`|*boolean*|true|true or false
|`dotsPosition`|*string*|"right"|right or left
|`easing`|*string*|"linear"|swing or linear


## License

If you are creating an open source application under a license compatible with the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you may use it under the terms of the GPLv3.