# CaptchaIt
[Demonstration Site - http://captchait.surge.sh/](http://captchait.surge.sh/)  
[Live API - https://captchait.herokuapp.com/](https://captchait.herokuapp.com/)  

**Captcha It**  
CaptchaIt is an SVG captcha service.  
CaptcahIt can be used from any host/url *(CORS)* and allows for customization of the SVG, such as changing its width, height, background color or character count.

## How to use
1. Send a get request to `host/captcha` to obtain an id and SVG data.  
2. Display the SVG data on a website and obtain user input.
3. Send the user id and user input to `host/captcha` in a JSON body as part of a POST request.
4. The service will respond with a simple JSON object containing a boolean property called `valid`.


# API
## GET `host/captcha`
GET Request to obtain a CAPTCHA image and id.

Accepted URL parameters
* `width`
  * `int`
  * `optional`
  * `default = 150`
  * Width of the SVG
* `height`
  * `int`
  * `optional`
  * `default = 50`
  * Height of the SVG
* `size`
  * `int`
  * `optional`
  * `default = 4`
  * `max = 12`
  * `min = 1`
  * Character count in the image
* `noise`
  * `int`
  * `optional`
  * `default = 1`
  * `max = 12`
  * `min = 0`
  * Amount of noise in the image
* `background`
  * `string`
  * `optional`
  * `default = cc9966`
  * Background color of the image. Must be a hex color **without** the leading # hashtag
* `color`
  * `boolean`
  * `optional`
  * `default = true`
  * If the characters in the image should be colored

Response object has the fallowing properties  
* `id`
  * ID corresponding to the CAPTCHA request. Send it with the POST request
* `data`
  * An `<svg...>...</svg>` HTML string containing the image

*NOTE* SVG ids will expire after 5 minutes.

 ## POST `host/captcha`
 POST request to validate a CAPTCHA against some text. Send parameters as a JSON body. Be sure to set the correct `Content-Type` header in the request.

 Accepted body parameters
* `id`
  * `required`
  * ID of the CAPTCHA request you would like to validate
* `text`
  * `required`
  * Text you would like to validate against the CAPTCHA

 Response object has the following properties
* `valid`
  * Boolean that is `true` if `text` matches the SVG associated with the provided `id`. Is `false` if `text` does not match, or the provided `id` does not exist (or has expired).
