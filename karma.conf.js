var webpackConf = require('./webpack.config.js');

webpackConf.entry = {};
webpackConf.module.postLoaders = [
    {
        test: /\.tsx?$/,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
            'node_modules',
			/test/
        ]
    }
];

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', 'source-map-support'],
		logLevel: config.LOG_INFO,
		browsers: ['PhantomJS'], 
		singleRun: true,
		reporters: ['dots', 'coverage'], 
		files: [
			'node_modules/react/dist/react.js',
			'test/index.tsx'
		],
		webpack: webpackConf,
		preprocessors: {
			'test/index.tsx': ['webpack']
		},
		coverageReporter: {
			reporters: [
				{ type: 'lcovonly', dir: 'coverage/' },
				{ type: 'text-summary' }
			]
		},
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		}
	});
};
