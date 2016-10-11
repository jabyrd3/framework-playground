# vue-demo

> vue demo for daniel
i know this looks intimidating. Yes there is a lot of boilerplate to support all sorts of fancy build tooling that makes interactive coding possible (and nice). the only bits you have to worry about, once you've gotten nodejs installed, are the files in src, specifically: main.js, App.vue, and anything in the components folder.

## from the top
In modern JS applications pretty much everything is a tree of nested 'components', which is a fancy way to say 'we made a custom HTML tag and bolted some jabbascript onto it, also fuck jquery we'll do it live'. In this case, main.js instantiates an instance of Vuejs using the constructor syntax: `new Vue()` on line 7. It's taking an element id, and then doing some setup boilerplate garbage with that render function so that the Vue instance gets passed to the App variable, which was imported from App.vue on line 4. In App.vue, you can see your first actual component. It has 3 sections: template, script and style. Ignore style and template for now: the cool parts are in the script tag.

Starting with export default (this just tells webpack that this is the default thing to export to other files if they do an `import foo from ./App`), we're in component land. We're defining a component that gets passed to Vue as a regular JS object. components just tells teh app what components this one uses, data is a function for managing component state (there is a huge digression here but i really don't want to scare you), and methods, which are exactly what the sound like. I've also got some miscellany utility functions below this, but we can ignore them for the time being.

if you look at the template section now, you can see there's html-ish stuff that has some weird attributes, and those attributes should look very familiar. Some are from the state variable that the data function returns, some are methodnames, etc. There are a billion of these custom attributes; it's a lot like angular in that way. Here we're using v-on, which sets an event listener ont hat component (events bubble down the tree from child -> parent, or up the tree, depending on how you visualize a tree. child->parent always though.) we've also got the :, which is shortand for v-bind:foo. Foo gets passed into the child component as a 'prop'. These 2 attributes help enforce a one way databinding model, where data is synchronously from parent to child, and any updates a child wants to make have to be $emitted (example in slider.vue), up the change so the parent can handle them. This pattern seems to have become the defacto in application development (it's easier to debug, reason about, etc).

one thing to notice: those custom tags are from our import statements in teh script, and they're also the bits we told the component API we were going to use. one thing to keep in mind is that html is picky af about formatting, so when you define things in JS thatLookLikeThis, the corresponding html tags will look like `&lt;this-is-weird-i-know&gt;`.

## .vue filetype
this particular Vue setup gives us a lot of nice webpack based toys. Specifically, here we get the .vue filetype, which lets package our components very nicely. Webpack will parse everything in the `&lt;template&gt;` tags as markup, etc etc for style and script as well. 

## apiService
probably don't look to hard at this. For the purposes of learning, just think of it as an abastraction to make http requests less heinous. It's a thing i use because jquery is big and dumb, and i can't rely on the fetch API in all environments. 

## lodash
javascript scoping is a fucking nightmare unless you're jabbascript man, so use functional style where you can jam it in. lodash is super fucking good. a good example of a cool thing i'm doing (joining the user to each article), is on line 36 of App.vue.

## caveats
this was generated from a very full featured dev boilerplate for much heavier duty work than we are doing. There is a full blown state management system, hot-reloading, linting on save, etc. If you do `npm run dev` you can actually watch styles, markup, and business logic reload in the current session without reloading the page or fuckign with your components local state. This is obviously a killer feature, and it makes programming this shit a lot more fun. If I have time i'll try and get Vuex working and really piss your pants.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
