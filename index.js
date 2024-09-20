require('./setting')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const path = require('path')
const axios = require('axios')
const FileType = require('file-type')
const readline = require("readline");
const yargs = require('yargs/yargs')
const { HttpsProxyAgent } = require("https-proxy-agent");
const agent = new HttpsProxyAgent("http://proxy:clph123@103.123.63.106:3128");
const _ = require('lodash')
const { Boom } = require('@hapi/boom')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, imageToWebp3, videoToWebp, writeExifImg, writeExifImgAV, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')


const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
/https?:\/\//.test(opts['db'] || '') ?
new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
new mongoDB(opts['db']) :
new JSONFile(`./ShunAi/database/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase()

async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState(`./${global.sessionName}`)
const zynX = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: ["Ubuntu", "Chrome", "20.0.04"],
});
if(usePairingCode && !zynX.authState.creds.registered) {
        await clearConsole();
		console.log(`The process of connecting to ${bottz}`)
		setTimeout(async () => {
          code = await zynX.requestPairingCode(bottz)
          code = code?.match(/.{1,4}/g)?.join("-") || code
          console.log(`Pairing code: ${code.toUpperCase()}`);
        }, 3000)

	}
async function clearConsole() {
    const isWindows = process.platform === 'win32';
    const isLinuxOrMac = process.platform === 'linux' || process.platform === 'darwin';

    return new Promise((resolve, reject) => {
        const command = isWindows ? 'cls' : (isLinuxOrMac ? 'clear' : '');
        if (command) {
            require('child_process').exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.log(stdout);
                    resolve();
                }
            });
        } else {
            console.log('Platform not supported for clearing console.');
            resolve();
        }
    });
}

zynX.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

zynX.ev.on('messages.upsert', async chatUpdate => {
try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!zynX.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(zynX, mek, store)
require("./main")(zynX, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

zynX.ev.on('call', async (celled) => {
let botNumber = await zynX.decodeJid(zynX.user.id)
let koloi = global.anticall
if (!koloi) return
console.log(celled)
for (let kopel of celled) {
if (kopel.isGroup == false) {
if (kopel.status == "offer") {
let nomer = await zynX.sendTextWithMentions(kopel.from, `*${zynX.user.name}* tidak bisa menerima panggilan ${kopel.isVideo ? `video` : `suara`}. Maaf @${kopel.from.split('@')[0]} kamu akan diblokir. Silahkan hubungi Owner membuka blok !`)
zynX.sendContact(kopel.from, owner.map( i => i.split("@")[0]), nomer)
await sleep(8000)
await zynX.updateBlockStatus(kopel.from, "block")
}
}
}
})

zynX.ev.on('group-participants.update', async (anu) => {
if (!wlcm.includes(anu.id)) return
console.log(anu)
try {
let metadata = await zynX.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
// Get Profile Picture User
try {
ppuser = await zynX.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

// Get Profile Picture Group
try {
ppgroup = await zynX.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

if (anu.action == 'add') {
let wel = `Hii @${num.split("@")[0]},\nWelcome To ${metadata.subject}ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 ɪɴᴛʀᴏ 」*
│ *ɴᴀᴍᴀ*             :
│ *ɢᴇɴᴅᴇʀ*          :
│ *ᴜᴍᴜʀ*             : 
│ *ᴀsᴀʟ*               :
│ *ʀᴀɴᴋ*              :
│ *ɪᴅ/ɴɪᴄᴋ ᴍʟ*    :
│ *ʜᴇʀᴏ ғᴀᴠ*       :
│ *ʀᴏʟᴇ*               :
│ *ᴛɪᴇʀ ᴛᴇʀᴛɪɴɢɢɪ*  :
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`
zynX.sendMessage(anu.id, {
                    document: fs.readFileSync('./package.json'), 
                    thumbnailUrl: ppuser,
                    mimetype: 'application/pdf',
                    fileLength: 99999,
                    pageCount: '100',
                    fileName: `Zʏɴxᴢᴏ`,
                    caption: wel,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `© Welcome Message`,
                            body: `${botname}`,
                            thumbnailUrl: ppuser,
                            sourceUrl: global.gr,
                            mediaType: 1,
                            renderLargerThumbnail: true
                    }}})
} else if (anu.action == 'remove') {
let txtLeft = `Hus hus @${num.split("@")[0]} 👋\nGausah balik lu dari gc ${metadata.subject}`
zynX.sendMessage(anu.id, {
                    document: fs.readFileSync('./package.json'), 
                    thumbnailUrl: ppuser,
                    mimetype: 'application/pdf',
                    fileLength: 99999,
                    pageCount: '100',
                    fileName: `Zʏɴxᴢᴏ`,
                    caption: txtLeft,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `© GoodBye Message`,
                            body: `${botname}`,
                            thumbnailUrl: ppuser,
                            sourceUrl: global.gr,
                            mediaType: 1,
                            renderLargerThumbnail: true
                    }}})
} else if (anu.action == 'promote') {
let a = `Congratulations @${num.split("@")[0]}, on being promoted to admin of this group ${metadata.subject} 🎉`
zynX.sendMessage(anu.id, {
                    document: fs.readFileSync('./package.json'), 
                    thumbnailUrl: ppuser,
                    mimetype: 'application/pdf',
                    fileLength: 99999,
                    pageCount: '100',
                    fileName: `Zʏɴxᴢᴏ`,
                    caption: a,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `Promoted In ${metadata.subject}`,
                            body: `${botname}`,
                            thumbnailUrl: ppuser,
                            sourceUrl: global.gr,
                            mediaType: 1,
                            renderLargerThumbnail: true
                    }}})
} else if (anu.action == 'demote') {
let a = `Congratulations @${num.split("@")[0]}, on being demote to admin of this group ${metadata.subject} 🎉`
zynX.sendMessage(anu.id, {
                    document: fs.readFileSync('./package.json'), 
                    thumbnailUrl: ppuser,
                    mimetype: 'application/pdf',
                    fileLength: 99999,
                    pageCount: '100',
                    fileName: `Zʏɴxᴢᴏ`,
                    caption: a,
                    contextInfo: {
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `Demoted In ${metadata.subject}`,
                            body: `${botname}`,
                            thumbnailUrl: ppuser,
                            sourceUrl: global.gr,
                            mediaType: 1,
                            renderLargerThumbnail: true
                    }}})
  }
}
} catch (err) {
console.log(err)
}
})

zynX.ev.on('contacts.update', update => {
for (let contact of update) {
let id = zynX.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }}})

zynX.getName = (jid, withoutContact  = false) => {
id = zynX.decodeJid(jid)
withoutContact = zynX.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = zynX.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === zynX.decodeJid(zynX.user.id) ?
zynX.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')}

zynX.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await zynX.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await zynX.getName(i + '@s.whatsapp.net')}\nFN:${await zynX.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:aplusscell@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://whatsapp.com/channel/0029ValRq0ULikgDaQ5Y0c0L\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`})}

zynX.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })}

//Kalau Mau Self Lu Buat Jadi false
zynX.public = true


zynX.ev.on('creds.update', saveCreds)
 
 zynX.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer} 
 
 zynX.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await zynX.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })}

zynX.sendText = (jid, text, quoted = '', options) => zynX.sendMessage(jid, { text: text, ...options }, { quoted })

zynX.sendTextWithMentions = async (jid, text, quoted, options = {}) => zynX.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
 
zynX.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await zynX.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

zynX.sendImageAsStickerAV = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImgAV(buff, options)
} else {
buffer = await imageToWebp2(buff)}
await zynX.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

zynX.sendImageAsStickerAvatar = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp3(buff)}
await zynX.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
 
zynX.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await zynX.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
 
 zynX.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName}

 zynX.cMod = (jid, copy, text = '', sender = zynX.user.id, options = {}) => {
//let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === zynX.user.id
return proto.WebMessageInfo.fromObject(copy)}
zynX.sendFile = async(jid, PATH, fileName, quoted = {}, options = {}) => {
let types = await zynX.getFile(PATH, true)
let { filename, size, ext, mime, data } = types
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/sticker.js')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: global.packname, author: global.packname2, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await zynX.sendMessage(jid, { [type]: { url: pathFile }, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}
zynX.parseMention = async(text) => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}

zynX.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message}}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo}} : {})} : {})
await zynX.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage}

zynX.sendReact = async (jid, emoticon, keys = {}) => {
let reactionMessage = {
react: {
text: emoticon,
key: keys
}
}
return await zynX.sendMessage(jid, reactionMessage)
}

zynX.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
	size: await getSizeMedia(data),
...type,
data
}
}
zynX.serializeM = (m) => smsg(zynX, m, store)
zynX.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
  let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
  if (reason === DisconnectReason.badSession) {
console.log(`Bad Session File, Please Delete Session and Scan Again`);
process.exit();
  } else if (reason === DisconnectReason.connectionClosed) {
console.log("Connection closed, reconnecting....");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionLost) {
console.log("Connection Lost from Server, reconnecting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.connectionReplaced) {
console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
process.exit();
  } else if (reason === DisconnectReason.loggedOut) {
console.log(`Device Logged Out, Please Delete Folder Session yusril and Scan Again.`);
process.exit();
  } else if (reason === DisconnectReason.restartRequired) {
console.log("Restart Required, Restarting...");
connectToWhatsApp();
  } else if (reason === DisconnectReason.timedOut) {
console.log("Connection TimedOut, Reconnecting...");
connectToWhatsApp();
  } else {
console.log(`Unknown DisconnectReason: ${reason}|${connection}`);
connectToWhatsApp();
  }
} else if (connection === "open") {
  await clearConsole();
console.log(`
Note!! 
Sc ini Bersifat Privat Dan Dalam Masa Pengembangan`)
zynX.sendMessage('6283848391615' + "@s.whatsapp.net", { text: `\`Connected!\`\n     To Zʏɴxᴢᴏ XI ☠️` });
}
// console.log('Connected...', update)
});
return zynX
}
connectToWhatsApp()
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})