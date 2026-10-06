<?php
/**
 * Plugin Name: RDC Leitbild
 * Description: Loads the <rdc-leitbild> bubble component. Content goes in a Raw HTML block, see README.
 */

add_action('wp_enqueue_scripts', function () {
    // ponytail: loads on every page (~6KB), restrict to the Leitbild page if that matters
    wp_enqueue_script_module('rdc-leitbild', plugins_url('rdc-leitbild.js', __FILE__), [], filemtime(__DIR__ . '/rdc-leitbild.js'));
});

add_action('wp_head', function () {
    echo "<style>rdc-leitbild:not(:defined) img{display:none}</style>\n";
});
