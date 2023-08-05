let handler = async (m, {
    usedPrefix,
    command,
    args
}) => {
    if (!args[0]) return m.reply(Func.example(usedPrefix, command, 'https://www.instagram.com/p/CvhKFLaLWXJ/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='))
    if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return m.reply(status.invalid)
    m.reply(status.wait)
    try {
        const json = await Func.fetchJson(API('alya', '/api/ig', { url: args[0] }, 'apikey'))
        if (!json.status) return m.reply(Func.jsonFormat(json))
        for (let v of json.data) {
            await conn.sendFile(m.chat, v.url, '', wm, m)
        }
    } catch (e) {
        console.log(e)
        return m.reply(status.error)
    }
}
handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram)$/i
handler.limit = 1

module.exports = handler