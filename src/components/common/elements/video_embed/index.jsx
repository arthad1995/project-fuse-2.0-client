import React from 'react'
import {getEmbedLink} from '../../../../utils/link'

export default function VideoEmbed(props) {
    const {src, className = ''} = props
    return (
        <div className={"video " + className}>
            <div className="video__vid-wrapper">
                <iframe
                    width="560"
                    height="315"
                    src={getEmbedLink(src)}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
        </div>
    )
}
