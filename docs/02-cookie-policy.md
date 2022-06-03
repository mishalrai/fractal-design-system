---
title: Cookie policy
---
This is simple plugin to open the search in popup module.

**[DEMO](http://localhost:3000/components/preview/fst-popup-search)**

## How to intergrate
1. Enqueue ***fst-popup-search*** module file with ***jquery*** and ***bootstrap*** for only reset the browser in this case. ***bootstrap*** is not required here. 
Please check below example
```html
    <head>
        <!-- Not required -->
        <link rel="stylesheet" href="bootstrap.css'">
        <!-- fst-toggle-search style [required]-->
        <link rel="stylesheet" href="fst-popup-search.css">
    </head>

    <body>
        <!-- Button to open the search popup -->
        <button class="fst-toggle-search">Open Search</button>

        <!-- Required -->
        <script src="jquery.min.js"></script>
        <!-- fst-toggle-search script [required] -->
        <script src="fst-popup-search.js"></script>

        <script>
            $(document).ready(function(){
                /* Element selector which open the popup search */
                var $selector = $('.fst-toggle-search');
                if($selector.length){
                    $selector.fstPopupSearch();
                }
            });
        </script>
    </body>
```

2. To initialize the ***fstPopupSearch*** you need call plugin function with element. eg ***$('.fst-toggle-search').fstPopupSearch()***


## API
| Input         | Type          | Default     | Required     | Description                        |
| ------------- | ------------- |-------------|--------------| -----------------------------------|
| action        | string        | ''          | No           | callback function name             |
| method        | string        | get         | No           | Method of search form [get, post]  |
| closeIcon     | string        | svg icon    | No           | Close icon                         |
| clearIcon     | string        | svg icon    | No           | Clear icon                         |
| enterIcon     | string        | svg icon    | No           | Enter icon                         |
| placeholderText| string       | Search...   | No           | Search input placeholder           |
| labelText      | string       | What are you looking for?   | No           | Search label text|