# Static Site Starter

A personal static site generation stack.

Nunjucks to HTML, ES2016 to js, SASS to CSS. Put a file in the src folder, and it will be placed in the same place in ```_site/``` folder.


## Installation

* ```git clone https://github.com/basetwo-project/basetwo-project.github.io.git```
* ```npm install```
* ```npm run dev``` to compile code and run local server

Website is then running at http://localhost:3000/

## Deploy to Github Pages
```npm run deploy```

## Customize

#### Add HTML Pages

Create a .njk/.html file in `src/html/pages/` and the file will appear at the route of `_site` folder, which is our route folder (with dev server, and when published to github)

#### Add per page JS files

Create a js file in `src/js/` with filename of the __PAGE_SLUG__ value used in your .njk file.

Modify your `src/html/_layout` file, and add another script tag to the bottom of the <body> tag.
