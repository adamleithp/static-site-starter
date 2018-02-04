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

## Using Github Pages to host your site for free

* Change your provider's CNAME
* Create a repo named `reponame.github.io`
* Build website here; use deploy script from above.
