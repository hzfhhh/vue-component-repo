<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
import mLoading from "./components/m-loading.vue";

export default {
  name: "App",
  components: {
    mLoading
  }
};
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
center,
u,
b,
i {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-weight: normal;
  font-style: normal;
  font-family: inherit;
  vertical-align: baseline;
}
html {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
html,
body {
  -webkit-overflow-scrolling: touch;
  height: 100%;
  overflow-x: hidden;
}
:focus {
  outline: 0;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
img {
  border: 0;
  width: 100%;
  max-width: 100% !important;
  vertical-align: middle;
}
input,
textarea {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
a:hover,
a:focus {
  outline: none;
}
q:before,
q:after {
  content: "";
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-active {
  text-decoration: none;
  color: #5c6065;
}
.router-link-active .back {
  text-align: left;
  padding-left: 100px;
}
.router-link-active .back:hover {
  color: #4e94ce;
}
</style>
