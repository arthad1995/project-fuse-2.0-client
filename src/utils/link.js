import v from 'voca'
import urlParser from 'js-video-url-parser'

export const titleName = type => {
    switch(v.lowerCase(type)) {
        case 'youtube':
        case 'youtube_channel':
            return 'YouTube Channel'
        case 'linkedin':
            return 'LinkedIn'
        case 'published_article':
            return 'Published Article'
        default:
            return v.titleCase(type)
    }
}

export const getEmbedLink = link => {
    if (!link) {
        return ''
    }
    try {
        if (!link.match(/^(https?:)?\/\//)) {
            link = `https://${link}`
        }
        return urlParser.create(urlParser.parse(link))
    } catch (_) {
        return ''
    }
}
