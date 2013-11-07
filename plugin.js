/**
 * plugin.js
 *
 * Copyright Adam Scheller, 2013
 * http://adamscheller.com/
 * 
 * Released under LGPL License
 * http://www.gnu.org/licenses/lgpl.html
 *
 * Based on original TinyMCE wordcount plugin,
 * copyright by Moxiecode Systems AB
 * 
 */

/*global tinymce:true */

tinymce.PluginManager.add('charwordcount', function(editor) {
    var self = this, countre, cleanre;

    countre = editor.getParam('wordcount_countregex', /[\w\u2019\x27\-]+/g); // u2019 == &rsquo;
    cleanre = editor.getParam('wordcount_cleanregex', /[0-9.(),;:!?%#$?\x27\x22_+=\\\/\-]*/g);

    function update() {
        editor.theme.panel.find('#wordcount').text(['Words: {0}, Characters: {1}', self.getCount(), self.getCountCharacters()]);
    }

    editor.on('init', function() {
        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];

        if (statusbar) {
            window.setTimeout(function() {
                statusbar.insert({
                    type: 'label',
                    name: 'wordcount',
                    text: ['Words: {0}, Characters: {1}', self.getCount(), self.getCountCharacters()],
                    classes: 'wordcount'
                }, 0);

                editor.on('setcontent beforeaddundo keyup', update);
            }, 0);
        }
    });

    self.getCount = function() {
        var tx = editor.getContent({format: 'raw'});
        var tc = 0;

        if (tx) {
            tx = tx.replace(/\.\.\./g, ' '); // convert ellipses to spaces
            tx = tx.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' '); // remove html tags and space chars

            // deal with html entities
            tx = tx.replace(/(\w+)(&.+?;)+(\w+)/, "$1$3").replace(/&.+?;/g, ' ');
            tx = tx.replace(cleanre, ''); // remove numbers and punctuation

            var wordArray = tx.match(countre);
            if (wordArray) {
                tc = wordArray.length;
            }
        }

        return tc;
    };

    self.getCountCharacters = function() {
        if (editor.settings.charwordcount_include_tags == true) {
            // Return count of ALL characters
            return editor.getContent({format: 'raw'}).length;
        }
        else {
            // First replace: remove HTML tags, ie. <div>, </span>
            // Second replace: swap html entities like &nbsp; into one character
            var strip = editor.getContent({format: 'raw'}).replace(/<.[^<>]*?>/g, "").replace(/&[^;]+;/g, "?");
            return strip.length;
        }
    };
});
