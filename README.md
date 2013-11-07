charwordcount TinyMCE plugin
=======================
                                             
Copyright Adam Scheller, 2013  
<http://adamscheller.com/>
                    
Released under LGPL License  
<http://www.gnu.org/licenses/lgpl.html>  

Based on original TinyMCE wordcount plugin, 
copyrigth by Moxiecode Systems AB


About charwordcount plugin
---------------------

The charwordcount is a plugin for TinyMCE editor which counts
in real time characters and words typed in the editor.

The plugin, by default, ignores all HTML tags and entities like &nbsp;
during counting process. 

Counting of HTML tags and entites can be enabled by specifying
special option in TinyMCE init configration.



Installation
----------
### Step 1
Download zip package from GitHub ("Download ZIP" button at the right sidebar) and extract ***charwordcount*** folder into ***tinymce/plugins/*** directory.

### Step 2
In TinyMCE init configuration `tinymce.init({...})`
add `charwordcount` string to ***plugins*** array, as in example below:

    plugins: [
       "charwordcount advlist link image lists preview pagebreak",
       "searchreplace code nonbreaking"
    ]

### Step 3
The plugin is ready to use. If you want to enable HTML tags and entities
counting, add the following code to TinyMCE init configuration:

    charwordcount_include_tags: true



TinyMCE init configuration example
----------------------------

    tinymce.init({
       selector: "textarea",

       plugins: [
         "charwordcount advlist link image lists preview pagebreak",
         "searchreplace code nonbreaking"
       ],

       toolbar1: "preview code | restoredraft undo redo | cut copy paste searchreplace | link unlink image | table",
       toolbar2: "formatselect fontselect fontsizeselect | bold italic underline strikethrough | forecolor backcolor",

       menubar: false,
       toolbar_items_size: 'small'
    });

