.cmd install uptime.js 
const os = require('os');
const pidusage = require('pidusage');

module.exports = {
		config: {
				name: 'upt',
				version: '2.1.0',
				author: "Cliff", // Do not change credits
				countDown: 5,
				role: 0,
				shortDescription: 'shows how long uptime',
				longDescription: {
						en: ''
				},
				category: 'system',
				guide: {
						en: '{p}uptime'
				}
		},

		byte2mb(bytes) {
				const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
				let l = 0, n = parseInt(bytes, 10) || 0;
				while (n >= 1024 && ++l) n = n / 1024;
				return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
		},

		getUptime(uptime) {
				const days = Math.floor(uptime / (3600 * 24));
				const hours = Math.floor((uptime % (3600 * 24)) / 3600);
				const mins = Math.floor((uptime % 3600) / 60);
				const seconds = Math.floor(uptime % 60);
				const cores = `Cores: ${os.cpus().length}`;

				return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
		},

		onStart: async ({ api, event }) => {
				const time = process.uptime();
				const hours = Math.floor(time / (60 * 60));
				const minutes = Math.floor((time % (60 * 60)) / 60);
				const seconds = Math.floor(time % 60);

				const usage = await pidusage(process.pid);

				const osInfo = {
						platform: os.platform(),
						architecture: os.arch()
				};

				const timeStart = Date.now();
				const returnResult = `             𝗣𝗶𝗸𝗮 - 𝗕𝗼𝘁 🦋\n\n𝗕𝗼𝘁 𝗥𝘂𝗻 𝗧𝗶𝗺𝗲 : ${hours} h ${minutes} min ${seconds} sec.\n\n✅ 》 Cpu usage: ${usage.cpu.toFixed(1)}%\n✅ 》 RAM usage: ${module.exports.byte2mb(usage.memory)}\n✅ 》 Cores: ${os.cpus().length}\n✅ 》 Ping: ${Date.now() - timeStart}ms\n✅ 》 Operating System : ${osInfo.platform}\n✅ 》 CPU Architecture: ${osInfo.architecture}\n\n|￣￣￣￣￣￣￣|
|  ⠀𝗕𝗮𝗱𝗵𝗼𝗻⠀ ⠀|
|＿＿＿＿＿＿＿|
(__/)  ||
(•ㅅ•) ||
/ 　 づ
`;

				return api.sendMessage(returnResult, event.threadID, event.messageID);
		}
};
