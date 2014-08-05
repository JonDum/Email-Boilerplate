
# Email-Boilerplate

### What

Grunt build system to organize emails, newsletters and campaigns.

### Why

Making emails by hand is slow and sucks

### How

Download and unzip the repository.

`cd` into the project folder and run `npm install` to download the necessary build files.

Then run `grunt` to build and use `grunt watch` to rebuild when files change with `livereload` support. The compiled files will be in `build/`.

The directory structure looks like:
  
    ▸ build/ <--- resultant build files
	▾ css/
	  ▸ effects/
	  ▸ elements/
	  ▸ misc/ <--- utils and Stylus variables
	  ▸ polyfill/
	  ▸ scaffolding/ <!-- Ink: Layout, Grid, etc.
	  ▸ typography/
	    common.styl <--- Common styles (@import common from .styl files in /emails).
	▸ emails/
        example-email.html
        example-email.styl
	▸ node_modules/
	▸ pages/ <!--- HTML goes here. Sub folders are supported.
	▸ templates/ <!-- Put your HTML includes or templates here
	  Gruntfile.js
	  package.json
	  README.md



##### Preprocessing

All HTML is preprocessed.

This means you can do neat things like

    <div>
         <!-- @include ../templates/navbar.html -->
    </div>

	<!-- @ifdef PRODUCTION -->
	<script src='analytics.js></script>
	<!-- @endif -->

And the resultant text will be included/discluded according to the build type.











