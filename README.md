#DOMinodes
DOMinodes is a library based on jQuery that allows the user to make AJAX requests, handle events, and manipulate the DOM. This is implemented using JavaScript and the native DOM API.

##Technical

###Example:
#####HTML Document:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOMinodes</title>
  </head>
  <body>
    <h1>Some of my favorite things:</h1>
    <ul>
      <li class="hobbies">Music</li>
      <li class="hobbies">Baseball</li>
      <li>Sushi</li>
      <li class="hobbies">Writing</li>
      <li class="hobbies">Training dogs</li>
      <li>Nature</li>
    </ul>
  </body>
</html>
```
#####Return all DOM elements with class name "hobbies"
```javascript
$hobbies = $dn.(".hobbies");

  //Returns:
  //DOMinode {nodes: [0: li.hobbies, 1: li.hobbies, 2: li.hobbies, 3:li.hobbies]}
```

#####Adds a class to unordered list
```javascript
$dn("ul").addClass("favorites");
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
