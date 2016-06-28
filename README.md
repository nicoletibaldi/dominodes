#DOMinodes
DOMinodes is a library based on jQuery that allows the user to make AJAX requests, handle events, and manipulate the DOM. This is implemented using JavaScript and the native DOM API.

##Technical

###Example:
#####HTML Document
```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOMinodes</title>
  </head>
  <body>
    <h1>Countries:</h1>
    <ul>
      <li class="europe">Germany</li>
      <li class="europe">France</li>
      <li>United States of America</li>
      <li class="europe">Spain</li>
      <li class="europe">Italy</li>
      <li>Australia</li>
      <li>Japan</li>
      <li>China</li>
    </ul>
  </body>
</html>
```
#####Return all DOM elements with class name "europe"
```javascript
$hobbies = $dn(".europe");

  //Returns:
  //DOMinode {nodes: [<li class="hobbies">Germany</li>, <li class="hobbies">France</li>, <li class="hobbies">Spain</li>, <li class="hobbies">Italy</li>, ]}
```

#####Add a class to unordered list
```javascript
$dn("ul").addClass("countries");
```

##Methods
DOMinodes includes several methods:
- ```html:``` allows the user to either set the innerHTML of an element by passing an argument, or returns the innerHTML of the first node in the Array
- ```empty:``` removes all nodes in the internal array
- ```append:``` accepts a DOMinode, HTML element, or a string. It will append the outerHTML of each element in the argument to the innerHTMl of each element in the DOMinode
- ```attr:``` returns the first attribute of the first element
- ```addClass:``` adds a class to elements passed in
- ```removeClass:``` removes a class from elements passed in
- ```children:``` returns a DOMinode containing all the children of all nodes in the array
- ```parent:``` returns a DOMinode containing the parents of each node
- ```find:``` returns a DOMinode of all nodes matching the selector passed in as an argument
- ```remove:``` removes the html of all nodes in the array, and removes all nodes from the array
