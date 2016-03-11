function path(path, source) {
    if (typeof(source) === 'undefined') {
        path = './bower_components/' + path;
    }
    if (source == 'assets') {
        path = './assets/' + path;
    }
    return path;
}

var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

elixir.config.sourcemaps = false;
elixir.config.assetsPath = 'assets';
elixir.config.publicPath = 'static';

elixir(function(mix) {
    mix
        // Stylesheets
        .sass('drf_vue.scss', 'static/css/', {
            includePaths: [
                path('font-awesome/scss'),
                path('Materialize/sass')
            ]
        })

        // Scripts
        .browserify('drf_vue.js', 'static/js/browserified.js')

        // Script merging
        .scripts([
            path('jquery/dist/jquery.min.js'),
            path('Materialize/dist/js/materialize.min.js'),
            'static/js/browserified.js'
        ], 'static/js/drf_vue.js', './')

        // Versioning
        .version(['static/js/drf_vue.js', 'static/css/drf_vue.css']);
});
