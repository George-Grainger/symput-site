This is the website for the mathematical keyboard Symput [found here](https://github.com/LefalChizzle/X15Symput).

# What is the purpose:
The keyboard is aimed at reducing the difficulty of writing maths through a keyboard. 
There are solutions such as [TeX](https://en.wikipedia.org/wiki/TeX) out there that already solve this problem, however, they're not commonly used on mobiles.

We've decided to focus on this and attempted to create something which not only enables people to communicate maths but is comfortable enough to use day to day.

# The website:
The website is made from [NextJS](https://nextjs.org/), using [Google Firebase](https://firebase.google.com/) as a backend. It was created as a learning project so there are no doubt (many) mistakes in the code. Feel free to let us know or create a pull request if you find any.

## Overview:
* `components/` contains the bulk of the code. Each component is in its own file, and as much as I could is split into logic folders concerning how to component is used on the site.


* `data/` contains the text information for the pages. There are different three supported languages on the site, English (en), Arabic (ar), and simplified Chinese (zh-cn). Each significant section of content is indicated by the folder, then the file name indicates the language. The exception here is the team page, which also has subfolders containing each team member in the three languages, this was done early on and probably should be updated so it's more in line with the rest of the data.


* `functions/` contains the cloud functions used by firebase.


* `Layout/` contains only two components, one of which inherits the other. These (as expected) set a very general page layout, meaning there's less code repetition on each page.
* `lib/` contains useful functions related to fetching data both from the local data file and from firestore, authenticating the user as well as custom react hooks which are used on the site.


*  `pages/` contains all of the routed pages on the site. All the pages but `pages/admin/[slug].js` are [statically generated](https://nextjs.org/docs/basic-features/pages#static-generation-recommended). `pages/admin/[slug].js` is client side rendered.


*  `public/` includes images and SSO related stuff. Note that many of the SVGs are inline and found in `components/Icons`

* `styles/` contains a CSS file containing some custom styles. Most of the styling was done through [Tailwind CSS](https://tailwindcss.com/)

* `/` things in the base directory are mainly config files.  

## License:
MIT License

Copyright (c) 2018 Symput

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
