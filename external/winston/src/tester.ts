const winston = require("winston");
const stackTrace = require("stack-trace");
const CoralogixTransport = require("./coralogix-winston.transport").CoralogixTransport;
const test_key = "6411e033-3439-d71c-542b-0d45419d6b30";
const prod_key = "6fb78c92-11af-314f-49d6-b6dbaaab17ba";


const config = {
    privateKey: prod_key,
    applicationName: "Winston logger",
    subsystemName: "Winston system",
    debug:true
};

CoralogixTransport.configure(config);


winston.configure({
    transports:[new CoralogixTransport({
        category:"Yoni"
    })]
})


// winston.info("text only");
// winston.info("text with meta",{category:"ZZZZZ",methodName:"MMMMMMMM",threadId:"IIIIIIIII",className:"CCCCCCC"});
winston.info('your message',{category:"ZZZZZ",methodName:"MMMMMMMM",threadId:"IIIIIIIII",className:"CCCCCCC",aaaa:{aaa:'aaaa'}});

// try{
//     const a = bla + bla;
// }
// catch(e){
//     winston.error( e );
// }



// // winston.info("WTFFFFFFFFF");

//
//
// const winston = require("winston");
// const stackTrace = require("stack-trace");
// const CoralogixWinston = require("./coralogix-winston.transport");
//
//
//
// 	let baseLoggerConfig = {
// 		timestamp: function () {
// 			let now = new Date();
// 			return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
// 		},
// 		formatter: function (options) {
// 			let format =
// 				options.timestamp() + " " +
// 				options.level.toUpperCase() + " " +
// 				(options.message ? options.message : "") +
// 				(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "");
// 			if (options.level.toLowerCase() === "error") {
// 				let stack = stackTrace.get();
// 				// format += "\nStacktrace:\n\t" + stack.slice(9, stack.length).join("\n\t");
// 				format += "\nStacktrace:\n\t" + stack.join("\n\t");
// 			}
// 			return format;
// 		},
// 		colorize: false,
// 		json: false,
// 		handleExceptions: true,
// 		humanReadableUnhandledException: true
// 	};
//
// 	let consoleLoggerConfig = Object.assign({}, baseLoggerConfig);
// 	let loggerTransports = [
// 		new (winston.transports.Console)(consoleLoggerConfig)
// 	];
//
//     let coralogixLoggerConfig = Object.assign({}, baseLoggerConfig, {
//         privateKey: '6fb78c92-11af-314f-49d6-b6dbaaab17ba',
//         applicationName: 'aaaaaa',
//         subsystemName: "external-webapp",
//         json: true,
//         stringify: (obj) => JSON.stringify(obj)
//     });
//     CoralogixWinston.CoralogixTransport.configure(coralogixLoggerConfig);
//     let coralogixLoggerConfigCrap = {category: "CORALOGIX"};
//     loggerTransports.push(new CoralogixWinston.CoralogixTransport(coralogixLoggerConfigCrap));
//
//
// 	let logger = new (winston.Logger)({transports: loggerTransports});
//
// 	logger.stream = {
// 		write: function (message, encoding) {
// 			logger.info(message);
// 		}
// 	};
//
//     // logger.error('shrek is gay');
//
//     // logger.info('info with meta',{aa:'aaaa'});
//     logger.error('error with no meta');
//     // logger.error('error with meta', {aaa:'aaaaa'});
//
//     // try{
//     //     throw new Error("Via stream error");
//     // }
//     // catch(e){
//     //     logger.info(e);
//     // }
//
