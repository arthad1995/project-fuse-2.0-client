import Network from '../network'

export const loadFeeds = () =>{
    const network = new Network('LOAD_FEED')
    return network.GET('/feeds')
}
