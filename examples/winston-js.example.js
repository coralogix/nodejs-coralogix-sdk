// var winston = require("winston");
// var CoralogixWinston = require("coralogix-logger-winston");

// // global configuration for coralogix
// var config = {
//     privateKey: "*************",
//     applicationName: "Yoni TEST",
//     subsystemName: "YOUR SUBSYSTEM",
// };

// CoralogixWinston.CoralogixTransport.configure(config);

// // configure winston to user coralogix transport
// winston.configure({
//     transports: [new CoralogixWinston.CoralogixTransport({
//         category: "YOUR CATEGORY"
//     })]
// });

// // use winston
// winston.info("use winston to send your logs to coralogix",{
//     className:"WINSTON CLASS",
//     methodName:"WINSTON METHOD",
//     aaa:'aaaaa'
// });

// const err = new Error('aaaa');

// winston.info(err);

const winston = require("winston");
const stackTrace = require("stack-trace");
const CoralogixWinston = require("coralogix-logger-winston");

// const test_key = "*************";
// const prod_key = "*************";


// const config = {
//     privateKey: prod_key,
//     applicationName: "Winston logger",
//     subsystemName: "Winston system",
//     debug:true
// }

// CoralogixTransport.configure(config);


// winston.configure({
//     transports:[new CoralogixTransport({
//         category:"Yoni"
//     })]
// })


// // winston.info("text only");
// // winston.info("text with meta",{category:"ZZZZZ",methodName:"MMMMMMMM",threadId:"IIIIIIIII",className:"CCCCCCC"});
// // winston.info("text with meta and custom",{category:"ZZZZZ",methodName:"MMMMMMMM",threadId:"IIIIIIIII",className:"CCCCCCC",aaaa:{aaa:'aaaa'}});

// try{
//     const a = bla + bla;
// }
// catch(e){
//     winston.error( e );
// }



// // winston.info("WTFFFFFFFFF");

	let baseLoggerConfig = {
		timestamp: function () {
			let now = new Date();
			return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		},
		formatter: function (options) {
			let format =
				options.timestamp() + " " +
				options.level.toUpperCase() + " " +
				(options.message ? options.message : "") +
				(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "");
			if (options.level.toLowerCase() === "error") {
				let stack = stackTrace.get();
				// format += "\nStacktrace:\n\t" + stack.slice(9, stack.length).join("\n\t");
				format += "\nStacktrace:\n\t" + stack.join("\n\t");
			}
			return format;
		},
		colorize: false,
		json: false,
		handleExceptions: true,
		humanReadableUnhandledException: true
	};

	let consoleLoggerConfig = Object.assign({}, baseLoggerConfig);
	let loggerTransports = [
		new (winston.transports.Console)(consoleLoggerConfig)
	];

    let coralogixLoggerConfig = Object.assign({}, baseLoggerConfig, {
        privateKey: '*************',
        applicationName: 'aaaaaa',
        subsystemName: "external-webapp",
        json: true,
        stringify: (obj) => JSON.stringify(obj)
    });
    CoralogixWinston.CoralogixTransport.configure(coralogixLoggerConfig);
    let coralogixLoggerConfigCrap = Object.assign({}, baseLoggerConfig, {category: "CORALOGIX"});
    loggerTransports.push(new CoralogixWinston.CoralogixTransport(coralogixLoggerConfigCrap));


	let logger = new (winston.Logger)({transports: loggerTransports});

	logger.stream = {
		write: function (message, encoding) {
			logger.info(message);
		}
	};

    logger.info('info with meta v2',{aa:'aaaa'});
    logger.error('error with no meta');
    logger.error('error with meta', {aaa:'aaaaa'});

    try{
        throw new Error("Via stream error");
    }
    catch(e){
        logger.info(e);
    }

